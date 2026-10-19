/**
 * Auditoría de red de todo el catálogo (menos Canciones).
 * Uso: node scripts/audit-red.js <juegos|sagas|series|caricaturas|anime|disney|musicales|todos>
 *
 * Comprueba cada fuente contra la red:
 * - YouTube (yt):
 *   1) oEmbed responde 200.
 *   2) Página watch?v= (ytInitialPlayerResponse): playabilityStatus.status === "OK" y playableInEmbed !== false.
 *   3) Coherencia de título/canal con la pista y duración razonable (20 s <= dur <= 600 s, y >= 20 s desde start).
 * - Apple Music (song):
 *   Lookup por lotes (id=1,2,3..., hasta 100 por consulta) con el mismo country de la fuente,
 *   verificando previewUrl y coherencia de título y artista.
 * - Apple Music dinámico (album / term, incluidos buscaTv, busca y amAlbum):
 *   Usa la lógica REAL de js/sources.js ejecutada dentro de un contexto vm (con el cubo de fichas real
 *   de ~19 consultas por minuto), llamando a AM.Sources.resolve() con una copia de la pista que solo
 *   tiene la fuente evaluada y un id único.
 *
 * Clasifica cada pista según la primera fuente que el juego tocaría:
 * - ok
 * - dudosa (título/canal apuntan a otra serie/juego; dicen cover, fandub, remix, reacción, extended o compilación;
 *           no dicen latino o español cuando debe ser doblaje; o dura < 20 s o > 10 min)
 * - muerta (no queda ninguna fuente que suene)
 *
 * Escribe scripts/audit-red-report.json y guarda caché reanudable en scripts/.audit-red-cache.json.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const JS_DIR = path.join(ROOT, 'js');
const CACHE_PATH = path.join(__dirname, '.audit-red-cache.json');
const REPORT_PATH = path.join(__dirname, 'audit-red-report.json');
const REVISADAS_PATH = path.join(__dirname, 'audit-red-revisadas.json');

const VALID_TARGETS = ['juegos', 'sagas', 'series', 'caricaturas', 'anime', 'disney', 'musicales', 'sonidos', 'todos'];
const target = (process.argv[2] || 'todos').toLowerCase();
if (!VALID_TARGETS.includes(target)) {
  console.error(`Uso: node scripts/audit-red.js <${VALID_TARGETS.join('|')}>`);
  process.exit(1);
}

// Cargar caché reanudable
let cache = { yt: {}, appleSong: {}, itunesHttp: {}, itunesResolved: {} };
try {
  if (fs.existsSync(CACHE_PATH)) {
    const loaded = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8'));
    cache = Object.assign(cache, loaded);
  }
} catch (e) {
  console.warn('⚠️ No se pudo leer caché previa, iniciando caché limpia:', e.message);
}

let revisadas = {};
try {
  if (fs.existsSync(REVISADAS_PATH)) {
    revisadas = JSON.parse(fs.readFileSync(REVISADAS_PATH, 'utf8'));
  }
} catch (e) {
  revisadas = {};
}

let cacheDirty = false;
function saveCache(force = false) {
  if (!cacheDirty && !force) return;
  fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2), 'utf8');
  cacheDirty = false;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Normalización de texto idéntica a js/sources.js
function norm(text) {
  return String(text || '')
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

const STOP = new Set([
  'serie', 'series', 'tema', 'theme', 'main', 'title', 'opening', 'intro', 'entrada',
  'latino', 'latina', 'espanol', 'version', 'oficial', 'official', 'original', 'soundtrack',
  'ost', 'music', 'song', 'from', 'the', 'and', 'for', 'with', 'los', 'las', 'del', 'una',
  'por', 'para', 'con', 'que', 'como', 'mas', 'sus', 'este', 'esta', 'game', 'video',
]);

function tokens(text) {
  return norm(text).split(' ').filter((w) => w.length >= 3 && !STOP.has(w));
}

function compact(text) {
  return norm(text).replace(/ /g, '');
}

// Extraer ytInitialPlayerResponse balanceando llaves
function extractPlayerResponse(html) {
  const markers = ['var ytInitialPlayerResponse = ', 'ytInitialPlayerResponse = ', 'window["ytInitialPlayerResponse"] = '];
  let idx = -1;
  for (const m of markers) {
    idx = html.indexOf(m);
    if (idx >= 0) break;
  }
  if (idx < 0) idx = html.indexOf('ytInitialPlayerResponse');
  if (idx < 0) return null;
  const start = html.indexOf('{', idx);
  if (start < 0) return null;
  let depth = 0;
  let inStr = false;
  let esc = false;
  for (let i = start; i < html.length; i++) {
    const c = html[i];
    if (inStr) {
      if (esc) esc = false;
      else if (c === '\\') esc = true;
      else if (c === '"') inStr = false;
    } else {
      if (c === '"') inStr = true;
      else if (c === '{') depth++;
      else if (c === '}') {
        depth--;
        if (depth === 0) {
          try {
            return JSON.parse(html.slice(start, i + 1));
          } catch (e) {
            return null;
          }
        }
      }
    }
  }
  return null;
}

// Rate limiter para YouTube: máximo 2 consultas de oEmbed o página por segundo (520 ms entre consultas)
let lastYtCall = 0;
async function ytFetchThrottle(url, options = {}) {
  const now = Date.now();
  const wait = Math.max(0, lastYtCall + 520 - now);
  if (wait > 0) await sleep(wait);
  lastYtCall = Date.now();

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const r = await fetch(url, options);
      if (r.status === 429) {
        console.warn(`⚠️ YouTube respondió 429 en ${url}. Pausando 5 minutos...`);
        await sleep(5 * 60 * 1000);
        lastYtCall = Date.now();
        continue;
      }
      return r;
    } catch (e) {
      await sleep(2000);
      lastYtCall = Date.now();
    }
  }
  return null;
}

async function checkYoutubeId(videoId) {
  if (cache.yt[videoId] && cache.yt[videoId].checkedWatchPage) {
    return cache.yt[videoId];
  }

  // 1) oEmbed
  const oembedUrl = 'https://www.youtube.com/oembed?format=json&url=' + encodeURIComponent('https://www.youtube.com/watch?v=' + videoId);
  const oeRes = await ytFetchThrottle(oembedUrl, {
    headers: { 'accept-language': 'es-MX,es;q=0.9', 'user-agent': 'Mozilla/5.0' },
  });

  if (!oeRes || oeRes.status !== 200) {
    const entry = {
      ok: false,
      checkedWatchPage: true,
      oembedStatus: oeRes ? oeRes.status : 'network_error',
      reason: `oEmbed respondió ${oeRes ? oeRes.status : 'error de red'}`,
      checkedAt: new Date().toISOString(),
    };
    cache.yt[videoId] = entry;
    cacheDirty = true;
    return entry;
  }

  let oeJson = {};
  try { oeJson = await oeRes.json(); } catch (e) {}

  // 2) Página watch?v= (ytInitialPlayerResponse)
  const watchUrl = 'https://www.youtube.com/watch?v=' + videoId;
  const watchRes = await ytFetchThrottle(watchUrl, {
    headers: {
      'accept-language': 'es-MX,es;q=0.9',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    },
  });

  if (!watchRes || watchRes.status !== 200) {
    const entry = {
      ok: false,
      checkedWatchPage: true,
      oembedStatus: 200,
      watchStatus: watchRes ? watchRes.status : 'network_error',
      reason: `watch?v= respondió ${watchRes ? watchRes.status : 'error de red'}`,
      checkedAt: new Date().toISOString(),
    };
    cache.yt[videoId] = entry;
    cacheDirty = true;
    return entry;
  }

  const html = await watchRes.text();
  if (html.includes('class="g-recaptcha"') || html.includes('google.com/sorry/index')) {
    console.warn('⚠️ YouTube pidió captcha en watch?v=. Pausando 5 minutos...');
    await sleep(5 * 60 * 1000);
    return checkYoutubeId(videoId);
  }

  const pr = extractPlayerResponse(html);
  if (!pr || !pr.playabilityStatus) {
    const entry = {
      ok: false,
      checkedWatchPage: true,
      oembedStatus: 200,
      reason: 'No se encontró ytInitialPlayerResponse en watch?v=',
      checkedAt: new Date().toISOString(),
    };
    cache.yt[videoId] = entry;
    cacheDirty = true;
    return entry;
  }

  const ps = pr.playabilityStatus;
  const vd = pr.videoDetails || {};
  const loudnessDb = pr.playerConfig && pr.playerConfig.audioConfig && typeof pr.playerConfig.audioConfig.loudnessDb === 'number'
    ? pr.playerConfig.audioConfig.loudnessDb
    : null;

  const statusOk = ps.status === 'OK';
  const embedOk = ps.playableInEmbed !== false;
  const ok = statusOk && embedOk;

  const entry = {
    ok,
    checkedWatchPage: true,
    oembedStatus: 200,
    playabilityStatus: ps.status,
    playableInEmbed: ps.playableInEmbed !== false,
    reason: ok ? null : `playabilityStatus=${ps.status}, playableInEmbed=${ps.playableInEmbed}, reason=${ps.reason || ''}`,
    title: vd.title || oeJson.title || '',
    channel: vd.author || oeJson.author_name || '',
    lengthSeconds: vd.lengthSeconds ? Number(vd.lengthSeconds) : null,
    loudnessDb,
    checkedAt: new Date().toISOString(),
  };

  cache.yt[videoId] = entry;
  cacheDirty = true;
  return entry;
}

// Crear el contexto vm con los archivos reales del juego
function createGameVm() {
  const sandbox = {
    window: {},
    console,
    setTimeout,
    clearTimeout,
    document: {
      createElement() {
        return { remove() {} };
      },
      head: {
        appendChild(script) {
          handleJsonpScript(script, sandbox.window);
        },
      },
    },
  };
  sandbox.window = sandbox;

  const files = [
    'config.js',
    'catalog.js',
    'catalog-series.js',
    'catalog-caricaturas.js',
    'catalog-anime.js',
    'catalog-disney.js',
    'catalog-musicales.js',
    'catalog-canciones.js',
    'catalog-sagas.js',
    'catalog-sonidos.js',
    'themes.js',
    'sources.js',
  ];
  for (const f of files) {
    const code = fs.readFileSync(path.join(JS_DIR, f), 'utf8');
    vm.runInNewContext(code, sandbox, { filename: f });
  }
  return sandbox;
}

// Manejo de JSONP simulado para js/sources.js
async function handleJsonpScript(script, win) {
  try {
    const u = new URL(script.src);
    const cb = u.searchParams.get('callback');
    u.searchParams.delete('callback');
    const cleanUrl = u.toString();

    if (cache.itunesHttp[cleanUrl]) {
      const data = cache.itunesHttp[cleanUrl];
      setImmediate(() => {
        if (cb && typeof win[cb] === 'function') win[cb](data);
      });
      return;
    }

    let data = null;
    for (let attempt = 0; attempt < 4; attempt++) {
      try {
        const r = await fetch(cleanUrl, {
          headers: { 'user-agent': 'Mozilla/5.0' },
        });
        if (r.status === 403 || r.status === 429) {
          console.warn(`⚠️ iTunes respondió ${r.status} en ${cleanUrl}. Esperando 15s y reintentando...`);
          await sleep(15000);
          continue;
        }
        if (r.status === 200) {
          data = await r.json();
          break;
        }
      } catch (e) {
        await sleep(3000);
      }
    }

    if (data) {
      cache.itunesHttp[cleanUrl] = data;
      cacheDirty = true;
      saveCache();
      if (cb && typeof win[cb] === 'function') win[cb](data);
    } else if (typeof script.onerror === 'function') {
      script.onerror();
    }
  } catch (e) {
    if (typeof script.onerror === 'function') script.onerror();
  }
}

// Pre-consultar apple({ song }) en lotes de hasta 100 IDs por país (sin solapar con sources.js)
async function batchCheckAppleSongs(tracks) {
  const byCountry = {};
  for (const t of tracks) {
    for (const s of t.sources || []) {
      if (s.type === 'itunes' && s.song) {
        const c = s.country || 'us';
        const key = `${c}:${s.song}`;
        if (cache.appleSong[key] === undefined) {
          (byCountry[c] = byCountry[c] || new Set()).add(String(s.song));
        }
      }
    }
  }

  for (const [country, idSet] of Object.entries(byCountry)) {
    const ids = Array.from(idSet);
    console.log(`🍎 Consultando ${ids.length} IDs de Apple Music (song) en lotes para country=${country}...`);
    for (let i = 0; i < ids.length; i += 100) {
      const batch = ids.slice(i, i + 100);
      const url = `https://itunes.apple.com/lookup?id=${batch.join(',')}&country=${country}`;
      let json = null;
      for (let attempt = 0; attempt < 4; attempt++) {
        try {
          const r = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0' } });
          if (r.status === 403 || r.status === 429) {
            console.warn(`⚠️ iTunes batch respondió ${r.status}. Esperando 15s...`);
            await sleep(15000);
            continue;
          }
          if (r.status === 200) {
            json = await r.json();
            break;
          }
        } catch (e) {
          await sleep(3000);
        }
      }

      const foundById = new Map();
      if (json && Array.isArray(json.results)) {
        for (const item of json.results) {
          if (item.wrapperType === 'track' && item.trackId) {
            foundById.set(String(item.trackId), item);
          }
        }
      }

      for (const id of batch) {
        const hit = foundById.get(String(id));
        const key = `${country}:${id}`;
        if (hit && hit.previewUrl) {
          cache.appleSong[key] = {
            ok: true,
            trackId: hit.trackId,
            title: hit.trackName || '',
            artist: hit.artistName || '',
            album: hit.collectionName || '',
            previewUrl: hit.previewUrl,
            country,
            checkedAt: new Date().toISOString(),
          };
          cache.itunesHttp[`https://itunes.apple.com/lookup?id=${id}&country=${country}`] = {
            resultCount: 1,
            results: [hit],
          };
        } else {
          cache.appleSong[key] = {
            ok: false,
            reason: 'sin previewUrl en lookup(' + country + ')',
            country,
            checkedAt: new Date().toISOString(),
          };
          cache.itunesHttp[`https://itunes.apple.com/lookup?id=${id}&country=${country}`] = {
            resultCount: 0,
            results: [],
          };
        }
      }
      cacheDirty = true;
      saveCache();
      await sleep(3200);
    }
  }
}

// Firma única de una fuente dinámica para caché de resolución
function dynamicSourceKey(track, src) {
  return JSON.stringify({
    theme: track.theme,
    franchise: track.franchise,
    game: track.game,
    title: track.title,
    composer: track.composer,
    src,
  });
}

let uniqueSeq = 0;
async function checkDynamicAppleSource(sandbox, track, src) {
  const sig = dynamicSourceKey(track, src);
  if (cache.itunesResolved[sig] !== undefined) {
    return cache.itunesResolved[sig];
  }
  const copy = Object.assign({}, track, {
    id: `${track.id}__audit_${++uniqueSeq}`,
    sources: [src],
  });
  const cands = await sandbox.AM.Sources.resolve(copy);
  const first = cands && cands[0];
  const res = first && first.url
    ? {
        ok: true,
        trackId: first.appleId,
        title: (first.meta && first.meta.trackName) || '',
        artist: (first.meta && first.meta.artist) || '',
        album: (first.meta && first.meta.album) || '',
        previewUrl: first.url,
        country: src.country || 'us',
        checkedAt: new Date().toISOString(),
      }
    : {
        ok: false,
        reason: 'AM.Sources.resolve devolvió []',
        country: src.country || 'us',
        checkedAt: new Date().toISOString(),
      };
  cache.itunesResolved[sig] = res;
  cacheDirty = true;
  return res;
}

// Expresiones regulares de heurística para detectar pistas dudosas
const BAD_WORDS_YT_RE = /\b(cover|covers|fandub|fan dub|remix|remixed|reaccion|reaction|reacciona|extended|extendida|extendido|compilacion|compilation|recopilacion|karaoke|8 bit|8bit|chiptune|nightcore|slowed|sped up|parodia|amv|tutorial|piano version|guitar version|metal version|tribute|lullaby|music box|1 hour|1 hora|loop|en vivo|live version|live at|crossover)\b/i;
const BAD_WORDS_APPLE_RE = /\b(cover|covers|fandub|remix|remixed|reaccion|reaction|extended|compilacion|compilation|karaoke|8 bit|8bit|chiptune|nightcore|slowed|sped up|tribute|lullaby|music box|en vivo|in concert|unplugged)\b/i;
const LATINO_RE = /\b(latino|latina|latam|espanol|doblaje|mexico|mexicano)\b/i;
const ESPANA_RE = /\b(castellano|espana)\b/i;

function requiresLatinoDub(track) {
  if (track.theme === 'caricaturas') return true;
  if (track.theme === 'disney') return true;
  if (track.theme === 'anime') {
    if (track.cat === 'anime-clasicos') return true;
    if (/\b(latino|latina|ricardo silva|adrian barba|cesar franco|mauren mendo|marisa de lille|aaron montalvo|gabriela vega|jade|oficial latino)\b/i.test(
      `${track.composer || ''} ${track.title || ''}`
    )) {
      return true;
    }
  }
  return false;
}

function checkCoherenceAndFlags(track, sourceObj, sourceEval, franchiseAkaMap, franchiseTrackCount) {
  const motivos = [];
  const resTitle = sourceEval.title || '';
  const resArtist = sourceEval.channel || sourceEval.artist || '';
  const resAlbum = sourceEval.album || '';
  const combinedNorm = norm(`${resTitle} ${resArtist} ${resAlbum}`);
  const combinedCompact = compact(`${resTitle} ${resArtist} ${resAlbum}`);

  // 1) Coherencia con la serie/juego/canción/compositor
  const franchiseAkas = (franchiseAkaMap && franchiseAkaMap[track.franchise]) || [];
  const refStrings = [
    track.franchise,
    track.game,
    track.title,
    track.composer,
    ...(track.aka || []),
    ...franchiseAkas,
  ].filter(Boolean);

  const kw = new Set(refStrings.flatMap(tokens));
  const resWords = new Set(tokens(`${resTitle} ${resArtist} ${resAlbum}`));
  let hasKeywordOverlap = false;
  for (const w of resWords) {
    if (kw.has(w)) {
      hasKeywordOverlap = true;
      break;
    }
  }
  if (!hasKeywordOverlap) {
    const compactRefs = refStrings.map(compact).filter((s) => s.length >= 3);
    hasKeywordOverlap = compactRefs.some((r) => combinedCompact.includes(r));
  }
  if (!hasKeywordOverlap) {
    motivos.push(`Título/canal/artista sin coincidencia clara con la pista ("${resTitle}" · "${resArtist}")`);
  } else if (franchiseTrackCount > 1) {
    // Si la franquicia tiene varias pistas en el mismo tema, exigir coincidencia con título, compositor, aka o parte específica de game
    const franTokens = new Set([track.franchise, ...franchiseAkas].filter(Boolean).flatMap(tokens));
    const specificStrings = [
      track.title,
      track.composer,
      ...(track.aka || []),
      track.game !== track.franchise ? track.game : '',
    ].filter(Boolean);
    const specificKw = new Set(specificStrings.flatMap(tokens).filter((w) => !franTokens.has(w) && !/^(tema|latino|latina|opening|entrada|main|title|theme|serie|animada|version|original)$/.test(w)));
    if (specificKw.size > 0) {
      let hasSpecific = false;
      for (const w of resWords) {
        if (specificKw.has(w)) {
          hasSpecific = true;
          break;
        }
      }
      if (!hasSpecific) {
        for (const w of specificKw) {
          if (w.length >= 3 && combinedCompact.includes(w)) {
            hasSpecific = true;
            break;
          }
        }
      }
      if (!hasSpecific) {
        motivos.push(`Franquicia con varias pistas pero la fuente no coincide con título/compositor/entrega específica ("${resTitle}" · "${resArtist}")`);
      }
    }
  }

  // 2) Palabras sospechosas (cover, fandub, remix, reacción, extended, compilación...)
  if (sourceObj.type === 'youtube') {
    const m = combinedNorm.match(BAD_WORDS_YT_RE);
    if (m) motivos.push(`Título/canal contiene "${m[0]}"`);
  } else {
    const m = combinedNorm.match(BAD_WORDS_APPLE_RE);
    if (m) motivos.push(`Pista/álbum de Apple contiene "${m[0]}"`);
  }

  // 3) Requisito de español latino cuando debe ser doblaje
  if (requiresLatinoDub(track)) {
    if (ESPANA_RE.test(combinedNorm) && !LATINO_RE.test(combinedNorm)) {
      motivos.push('Dice castellano/España cuando debe ser doblaje latino');
    }
    if (sourceObj.type === 'youtube') {
      const hasLatinoWord = LATINO_RE.test(combinedNorm);
      if (!hasLatinoWord) {
        motivos.push('Debería ser doblaje latino pero el video no dice latino/español');
      }
    } else if (track.theme === 'caricaturas') {
      motivos.push('La primera fuente que suena en Caricaturas es Apple Music en vez de entrada en español latino');
    } else if (track.theme === 'disney') {
      // En Disney con Apple, comprobar que el título resuelto coincida con el título en español o intérprete latino
      const titleTokens = tokens(track.title);
      const resTitleNorm = norm(resTitle);
      const matchesSpanishTitle = titleTokens.length === 0 || titleTokens.some((w) => resTitleNorm.includes(w));
      if (!matchesSpanishTitle && !LATINO_RE.test(combinedNorm)) {
        motivos.push(`En Disney (Apple), el título resuelto ("${resTitle}") no parece ser el doblaje en español ("${track.title}")`);
      }
    }
  }

  // 4) Duración en YouTube (< 20 s o > 10 min)
  if (sourceObj.type === 'youtube') {
    const len = sourceEval.lengthSeconds;
    const start = sourceObj.start || 0;
    if (typeof len === 'number' && len > 0) {
      const effectiveLen = len - start;
      if (track.theme === 'sonidos') {
        // Un efecto de sonido dura de 1 a 30 s.
        if (effectiveLen < 1 || len > 30) motivos.push(`Duración fuera de 1–30 s para un efecto (${len}s, start=${start}s)`);
      } else if (effectiveLen < 20) {
        motivos.push(`Duración efectiva menor a 20 s (${effectiveLen}s, total=${len}s, start=${start}s)`);
      } else if (len > 600) {
        motivos.push(`Duración mayor a 10 min (${len}s)`);
      }
    } else {
      motivos.push('Duración desconocida en YouTube');
    }
  }

  return motivos;
}

(async () => {
  const sandbox = createGameVm();
  const AM = sandbox.AM;
  const franchiseAkaMap = AM.FRANCHISE_AKA || {};

  const allThemes = ['juegos', 'sagas', 'series', 'caricaturas', 'anime', 'disney', 'musicales', 'sonidos'];
  const selectedThemes = target === 'todos' ? allThemes : [target];

  const tracksByTheme = {};
  for (const th of selectedThemes) {
    if (th === 'sagas') {
      tracksByTheme.sagas = (AM.SAGA_TRACKS || []).map((t) => Object.assign({}, t, { theme: 'sagas' }));
    } else if (th === 'sonidos') {
      tracksByTheme.sonidos = (AM.SOUND_TRACKS || []).map((t) => Object.assign({}, t, { theme: 'sonidos' }));
    } else {
      tracksByTheme[th] = AM.CATALOG.filter((t) => t.theme === th);
    }
  }

  const flatTracks = Object.values(tracksByTheme).flat();
  console.log(`🔍 Iniciando audit-red.js para [${selectedThemes.join(', ')}] (${flatTracks.length} pistas)...`);

  // 1) Pre-consultar en lotes todas las fuentes apple({ song })
  await batchCheckAppleSongs(flatTracks);

  // 2) Recolectar todos los IDs de YouTube únicos y tareas dinámicas de iTunes
  const uniqueYtIds = new Set();
  for (const t of flatTracks) {
    for (const s of t.sources || []) {
      if (s.type === 'youtube' && s.id) uniqueYtIds.add(s.id);
    }
  }

  const uncachedYt = Array.from(uniqueYtIds).filter((id) => !cache.yt[id] || !cache.yt[id].checkedWatchPage);
  console.log(`🎬 Videos de YouTube únicos: ${uniqueYtIds.size} (${uncachedYt.length} por consultar en red)...`);

  // Correr en paralelo la cola de YouTube y la cola de iTunes dinámico (dominios distintos)
  const ytWorker = (async () => {
    let count = 0;
    for (const id of uncachedYt) {
      await checkYoutubeId(id);
      count++;
      if (count % 20 === 0) {
        console.log(`  [YouTube] ${count}/${uncachedYt.length} videos comprobados...`);
        saveCache();
      }
    }
    saveCache(true);
  })();

  const itunesWorker = (async () => {
    let dynCount = 0;
    for (const t of flatTracks) {
      let appleFound = false;
      for (const s of t.sources || []) {
        if (s.type !== 'itunes') continue;
        if (appleFound) continue; // js/sources.js solo toma la primera fuente de Apple que responde
        if (s.song) {
          const key = `${s.country || 'us'}:${s.song}`;
          const res = cache.appleSong[key];
          if (res && res.ok) appleFound = true;
        } else if (s.album || s.term) {
          const sig = dynamicSourceKey(t, s);
          const wasCached = cache.itunesResolved[sig] !== undefined;
          const res = await checkDynamicAppleSource(sandbox, t, s);
          if (res && res.ok) appleFound = true;
          if (!wasCached) {
            dynCount++;
            if (dynCount % 15 === 0) {
              console.log(`  [iTunes dinámico] ${dynCount} consultas resueltas vía js/sources.js...`);
              saveCache();
            }
          }
        }
      }
    }
    saveCache(true);
  })();

  await Promise.all([ytWorker, itunesWorker]);

  // 3) Clasificar cada pista según la primera fuente que el juego tocaría
  let existingReport = { generatedAt: null, resumen: {}, temas: {} };
  try {
    if (fs.existsSync(REPORT_PATH)) {
      existingReport = JSON.parse(fs.readFileSync(REPORT_PATH, 'utf8'));
    }
  } catch (e) {}

  for (const th of selectedThemes) {
    const tracks = tracksByTheme[th];
    const stats = { total: tracks.length, ok: 0, dudosas: 0, dudosasRevisadas: 0, muertas: 0 };
    const detalleMuertas = [];
    const detalleDudosas = [];
    const pistas = {};

    const franchiseCounts = {};
    for (const t of tracks) {
      franchiseCounts[t.franchise] = (franchiseCounts[t.franchise] || 0) + 1;
    }

    // Primera pasada: determinar primeraQueSuena por pista y contar repeticiones de fuente primaria en el mismo tema
    const preEval = [];
    const primarySourceOwners = {};
    for (const t of tracks) {
      let appleFound = false;
      const fuentesEval = [];
      let primeraQueSuena = null;

      for (const s of t.sources || []) {
        if (s.type === 'youtube') {
          const ev = cache.yt[s.id] || { ok: false, reason: 'no evaluado' };
          const item = Object.assign({ kind: 'yt', id: s.id, start: s.start || 0 }, ev);
          fuentesEval.push(item);
          if (ev.ok && !primeraQueSuena) {
            primeraQueSuena = { src: s, eval: item, primaryKey: `yt:${s.id}` };
          }
        } else if (s.type === 'itunes') {
          if (appleFound) {
            fuentesEval.push({ kind: 'itunes', skippedAfterAppleHit: true, country: s.country || 'us' });
            continue;
          }
          if (s.song) {
            const key = `${s.country || 'us'}:${s.song}`;
            const ev = cache.appleSong[key] || { ok: false, reason: 'no evaluado' };
            const item = Object.assign({ kind: 'apple-song', song: s.song }, ev);
            fuentesEval.push(item);
            if (ev.ok) {
              appleFound = true;
              if (!primeraQueSuena) primeraQueSuena = { src: s, eval: item, primaryKey: `apple:${ev.trackId || s.song}` };
            }
          } else {
            const sig = dynamicSourceKey(t, s);
            const ev = cache.itunesResolved[sig] || { ok: false, reason: 'no evaluado' };
            const item = Object.assign({ kind: s.album ? 'apple-album' : 'apple-term', query: s.album || s.term }, ev);
            fuentesEval.push(item);
            if (ev.ok) {
              appleFound = true;
              if (!primeraQueSuena) primeraQueSuena = { src: s, eval: item, primaryKey: `apple:${ev.trackId || sig}` };
            }
          }
        }
      }

      if (primeraQueSuena && primeraQueSuena.primaryKey) {
        (primarySourceOwners[primeraQueSuena.primaryKey] = primarySourceOwners[primeraQueSuena.primaryKey] || []).push(t.id);
      }
      preEval.push({ t, fuentesEval, primeraQueSuena });
    }

    for (const { t, fuentesEval, primeraQueSuena } of preEval) {
      if (!primeraQueSuena) {
        stats.muertas++;
        const rec = {
          id: t.id,
          cat: t.cat || t.saga,
          franchise: t.franchise,
          game: t.game,
          title: t.title,
          composer: t.composer,
          estado: 'muerta',
          fuentes: fuentesEval,
        };
        detalleMuertas.push(rec);
        pistas[t.id] = rec;
      } else {
        const motivos = checkCoherenceAndFlags(
          t,
          primeraQueSuena.src,
          primeraQueSuena.eval,
          franchiseAkaMap,
          franchiseCounts[t.franchise] || 1
        );
        const owners = primarySourceOwners[primeraQueSuena.primaryKey] || [];
        if (owners.length > 1) {
          const others = owners.filter((id) => id !== t.id);
          motivos.unshift(`Misma primera fuente (${primeraQueSuena.primaryKey}) que otra pista del tema: ${others.join(', ')}`);
        }
        const rev = revisadas[t.id];
        if (motivos.length === 0) {
          stats.ok++;
        } else {
          stats.dudosas++;
          if (rev) stats.dudosasRevisadas++;
          const rec = {
            id: t.id,
            cat: t.cat || t.saga,
            franchise: t.franchise,
            game: t.game,
            title: t.title,
            composer: t.composer,
            estado: 'dudosa',
            revisada: rev || null,
            motivos,
            primeraFuente: primeraQueSuena.eval,
            fuentes: fuentesEval,
          };
          detalleDudosas.push(rec);
          pistas[t.id] = rec;
        }
      }
    }

    existingReport.resumen[th] = stats;
    existingReport.temas[th] = {
      resumen: stats,
      muertas: detalleMuertas,
      dudosas: detalleDudosas,
    };

    console.log(
      `📊 [${th.toUpperCase()}] Total: ${stats.total} | ✅ OK: ${stats.ok} | ⚠️ Dudosas: ${stats.dudosas}` +
      (stats.dudosasRevisadas ? ` (${stats.dudosasRevisadas} revisadas a mano)` : '') +
      ` | ❌ Muertas: ${stats.muertas}`
    );
  }

  existingReport.generatedAt = new Date().toISOString();
  fs.writeFileSync(REPORT_PATH, JSON.stringify(existingReport, null, 2), 'utf8');
  console.log(`\n📝 Reporte guardado en scripts/audit-red-report.json`);
})();
