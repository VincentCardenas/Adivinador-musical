#!/usr/bin/env node
'use strict';

/*
 * v2.2: agrega las pistas que faltaron en la 2.1 (Caricaturas, Anime, Videojuegos y Sagas).
 * Uso: node scripts/build-resto-v22.js <caricaturas|anime|juegos|sagas|todos>
 *
 * Las canciones las eligió Claude (scripts/candidatos-v22.json, con consultas y palabras clave);
 * este script hace la parte de red en la computadora del usuario, sin IA:
 * - Busca de verdad en YouTube y en Apple con scripts/lib-v21.js (que guarda la evidencia de cada
 *   ID en scripts/evidencia-v2.1.json). Nunca escribe un ID que no salió de una búsqueda.
 * - Acepta un video solo si se puede reproducir e insertar, su título o canal trae una de las
 *   palabras clave de la pista (must_any), no dice cover/remix/fandub/reacción/etc., dura lo
 *   razonable y, cuando la pista debe ir en español latino, el título lo dice y los subtítulos
 *   automáticos (si el video los trae) no están en otro idioma.
 * - Acepta una pista de Apple solo si tiene preview, el nombre coincide y el artista también.
 * - Inserta al final de cada sección, actualiza las cuentas y para cuando cada categoría llega
 *   a su meta. Es reanudable: lo ya resuelto queda en scripts/.resto-v22-cache.json.
 * Deja scripts/resultado-v22.json con lo aceptado (y qué video/canción se eligió) y lo descartado.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const lib = require('./lib-v21');

const ROOT = path.join(__dirname, '..');
const JS = path.join(ROOT, 'js');
const CANDIDATOS = path.join(__dirname, 'candidatos-v22.json');
const CACHE = path.join(__dirname, '.resto-v22-cache.json');
const RESULTADO = path.join(__dirname, 'resultado-v22.json');

/* Total de pistas que debe tener cada categoría al terminar (lo de antes de la 2.1 + 20 %). */
const META = {
  caricaturas: { 'toon-clasicas': 59, 'toon-80s': 60, 'toon-90s': 76, 'toon-00s': 83, 'toon-1014': 39, 'toon-1519': 34, 'toon-20s': 10 },
  anime: { 'anime-clasicos': 58, 'anime-90s': 59, 'anime-00s': 59, 'anime-10s': 65, 'anime-20s': 62 },
  juegos: { nintendo: 69, xbox: 27, playstation: 41, indie: 50, retro: 29, rpg: 56, accion: 38, online: 32 },
  sagas: { total: 221 },
};

const TEMAS = {
  caricaturas: {
    file: 'catalog-caricaturas.js', prefix: 'toon-',
    secciones: [['toon-clasicas', 'Clásicas (antes de 1980)'], ['toon-80s', 'Años 80'], ['toon-90s', 'Años 90'], ['toon-00s', '2000s'],
      ['toon-1014', '2010 a 2014'], ['toon-1519', '2015 a 2019'], ['toon-20s', '2020 en adelante']],
    fin: /\n  \);\n\n  \/\/ Señuelos/, header: [/Catálogo: Caricaturas \(\d+ pistas\)/, (n) => `Catálogo: Caricaturas (${n} pistas)`],
    orden: ['yt', 'apple'], maxLen: 400, country: ['mx', 'us'],
  },
  anime: {
    file: 'catalog-anime.js', prefix: 'ani-',
    secciones: [['anime-clasicos', 'Clásicos (antes de 1990)'], ['anime-90s', 'Años 90'], ['anime-00s', '2000s'], ['anime-10s', '2010s'], ['anime-20s', '2020 en adelante']],
    fin: /\n  \);\n\n  \/\/ Señuelos/, header: [/Catálogo: Anime \(\d+ pistas\)/, (n) => `Catálogo: Anime (${n} pistas)`],
    orden: ['yt', 'apple'], maxLen: 400, country: ['mx', 'us', 'jp'],
  },
  juegos: {
    file: 'catalog.js', prefix: '',
    secciones: [['nintendo', 'Nintendo'], ['xbox', 'Xbox'], ['playstation', 'PlayStation'], ['indie', 'Indie'], ['retro', 'Retro 8/16 bits'],
      ['rpg', 'RPG y fantasía'], ['accion', 'Acción y aventura'], ['online', 'Online y multijugador']],
    finTras: 'AM.CATALOG = [', orden: ['apple', 'yt'], maxLen: 600, country: ['us', 'mx'],
  },
  sagas: {
    file: 'catalog-sagas.js', prefix: 'saga-', porSaga: true,
    secciones: ['mario', 'zelda', 'pokemon', 'kirby', 'donkey-kong', 'sonic', 'final-fantasy', 'halo', 'mega-man', 'street-fighter'].map((s) => [s, s]),
    finTras: 'AM.SAGA_TRACKS = [', header: [/Archivo generado \(\d+ canciones\)/, (n) => `Archivo generado (${n} canciones)`],
    orden: ['yt', 'apple'], maxLen: 600, country: ['us', 'mx', 'jp'],
  },
};

const norm = (t) => String(t || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, ' ').trim();
const slug = (t) => norm(t).replace(/ /g, '-');
const q = (s) => "'" + String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
const list = (a) => '[' + a.map(q).join(', ') + ']';
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
/* ¿El texto trae una palabra de `re` que NO es parte del nombre de la pista? ("Live & Learn" no es "en vivo"). */
function malo(texto, re, propio) {
  const ref = ' ' + norm(propio) + ' ';
  const words = new RegExp(re.source.replace(/^\\s\(/, '(?<=\\s)(').replace(/\)\\s$/, ')(?=\\s)'), 'g');
  const t = ' ' + norm(texto) + ' ';
  let m;
  while ((m = words.exec(t)) !== null) {
    if (!ref.includes(' ' + m[1] + ' ')) return m[1];
  }
  return null;
}
function extraerArreglo(html, clave) {
  const i = html.indexOf(clave);
  if (i < 0) return null;
  const start = html.indexOf('[', i);
  let depth = 0, inStr = false, escp = false;
  for (let j = start; j < html.length; j++) {
    const ch = html[j];
    if (inStr) { if (escp) escp = false; else if (ch === '\\') escp = true; else if (ch === '"') inStr = false; continue; }
    if (ch === '"') inStr = true;
    else if (ch === '[' || ch === '{') depth++;
    else if (ch === ']' || ch === '}') { depth--; if (depth === 0) { try { return JSON.parse(html.slice(start, j + 1)); } catch (e) { return null; } } }
  }
  return null;
}

const MALO_YT = /\s(cover|covers|fandub|fan dub|fanmade|remix|remixed|reaccion|reaccionando|reaction|reacts|karaoke|extended|extendido|extendida|1 hora|1 hour|10 hours|loop|tutorial|piano|guitar|ukulele|amv|parodia|parody|8 bit|8bit|chiptune|nightcore|slowed|sped up|en vivo|live|concierto|concert|medley|megamix|mashup|trailer|teaser|gameplay|walkthrough|review|unboxing|lofi|lo fi|orchestral|orquesta|symphonic|sinfonico|epic version|metal version|ai|ia)\s/;
const LATINO = /\s(latino|latina|latam|espanol|spanish|doblaje|mexico|mexicano)\s/;
const ESPANA = /\s(castellano|espana|spain|castilian)\s/;
const NO_ORIGINAL = /\s(latino|latina|espanol|spanish|english|ingles|fandub|doblaje)\s/;
const NO_REMAKE = /\s(remake|remaster|remastered|reorchestrated|hd remaster|definitive edition|reimagined)\s/;
const MALO_APPLE = /\s(cover|covers|karaoke|tribute|made famous|in the style of|tv theme|tv themes|hit crew|theme players|tv sounds|piano|lullaby|music box|orchestral|symphonic|remix|8 bit|chiptune|lofi|instrumental version|acoustic)\s/;

function loadAll() {
  const sb = { console, setTimeout, clearTimeout };
  sb.window = sb;
  for (const f of ['config.js', 'catalog.js', 'catalog-series.js', 'catalog-caricaturas.js', 'catalog-anime.js', 'catalog-disney.js',
    'catalog-musicales.js', 'catalog-canciones.js', 'catalog-sagas.js', 'themes.js']) {
    vm.runInNewContext(fs.readFileSync(path.join(JS, f), 'utf8'), sb, { filename: f });
  }
  return sb.AM;
}

/* Idiomas de los subtítulos automáticos del video (el audio). Vacío si el video no trae. */
let lastCaptionAt = 0;
async function captionLangs(id) {
  const wait = Math.max(0, lastCaptionAt + 650 - Date.now());
  if (wait) await lib.sleep(wait);
  lastCaptionAt = Date.now();
  try {
    const r = await fetch(`https://www.youtube.com/watch?v=${encodeURIComponent(id)}&hl=es-MX&gl=MX`, {
      headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36', 'accept-language': 'es-MX,es;q=0.9' },
    });
    const html = await r.text();
    const tracks = extraerArreglo(html, '"captionTracks":');
    if (!Array.isArray(tracks)) return [];
    return tracks.filter((t) => t.kind === 'asr').map((t) => String(t.languageCode || '').slice(0, 2));
  } catch (e) {
    return [];
  }
}

async function buscarYoutube(c, tema, cfg) {
  const elegidos = [];
  const vistos = new Set();
  const claves = (c.must_any || []).map(norm).filter((k) => k.length >= 3);
  for (const consulta of c.yt_queries || []) {
    if (elegidos.length >= 2) break;
    const ids = await lib.searchYoutube(consulta, 6);
    for (const id of ids) {
      if (elegidos.length >= 2 || vistos.has(id)) continue;
      vistos.add(id);
      const info = await lib.verifyYoutubeId(id, consulta);
      if (!info.ok) continue;
      const texto = `${info.title} ${info.channel}`;
      const t = ' ' + norm(texto) + ' ';
      if (!claves.some((k) => t.includes(' ' + k + ' '))) continue;
      const propio = `${c.title} ${c.game} ${c.franchise} ${(c.aka || []).join(' ')}`;
      if (malo(texto, MALO_YT, propio)) continue;
      if (info.lengthSeconds !== null && (info.lengthSeconds < 20 || info.lengthSeconds > cfg.maxLen)) continue;
      if (c.latino) {
        if (!LATINO.test(t) || malo(texto, ESPANA, propio)) continue;
        const langs = await captionLangs(id);
        if (langs.length && !langs.includes('es')) continue;
        info.captions = langs;
      } else if (tema === 'anime' && malo(texto, NO_ORIGINAL, propio)) {
        continue;
      }
      if (tema === 'sagas' && malo(texto, NO_REMAKE, propio)) continue;
      elegidos.push({ id, titulo: info.title, canal: info.channel, dur: info.lengthSeconds, loudnessDb: info.loudnessDb, captions: info.captions || null, consulta });
    }
  }
  if (tema === 'sagas') elegidos.sort((a, b) => (b.loudnessDb ?? -99) - (a.loudnessDb ?? -99)); // el más fuerte primero
  return elegidos;
}

async function buscarApple(c, cfg) {
  if (!c.apple || !c.apple.term) return null;
  const match = norm(c.apple.match || c.title);
  const artista = norm(c.apple.artist || '').split(' ').filter((w) => w.length >= 3);
  for (const country of cfg.country) {
    const items = await lib.searchApple(c.apple.term, country, 25, 'song');
    for (const it of items) {
      if (!it.previewUrl) continue;
      const tn = ' ' + norm(it.trackName) + ' ';
      const todo = ' ' + norm(`${it.trackName} ${it.collectionName} ${it.artistName}`) + ' ';
      if (!match || !tn.includes(' ' + match + ' ') && !tn.trim().startsWith(match)) continue;
      if (artista.length && !artista.some((w) => norm(it.artistName).includes(w))) continue;
      if (malo(todo, MALO_APPLE, `${c.title} ${c.game} ${c.franchise}`)) continue;
      lib.recordAppleTrackEvidence(it, country, c.apple.term);
      return { song: it.trackId, country, titulo: it.trackName, artista: it.artistName, album: it.collectionName };
    }
  }
  return null;
}

async function resolver(c, tema, cache) {
  if (cache[c.key]) return cache[c.key];
  const cfg = TEMAS[tema];
  const yts = await buscarYoutube(c, tema, cfg);
  const ap = await buscarApple(c, cfg);
  let res;
  if (c.latino && !yts.length) res = { ok: false, motivo: 'no se encontró la entrada en español latino en YouTube' };
  else if (!yts.length && !ap) res = { ok: false, motivo: 'no se encontró ninguna fuente que pase los filtros' };
  else res = { ok: true, yt: yts, apple: ap };
  cache[c.key] = res;
  fs.writeFileSync(CACHE, JSON.stringify(cache, null, 1) + '\n');
  lib.saveAuditCache();
  lib.saveEvidencia();
  return res;
}

function fuentes(res, cfg) {
  const out = [];
  for (const k of cfg.orden) {
    if (k === 'yt') res.yt.forEach((y) => out.push(`yt('${y.id}')`));
    if (k === 'apple' && res.apple) out.push(`apple({ song: ${res.apple.song}, country: '${res.apple.country}' })`);
  }
  return out;
}

function bloque(c, tema, id, srcs) {
  const head = TEMAS[tema].porSaga
    ? `      id: ${q(id)}, saga: ${q(c.saga)}, franchise: ${q(c.franchise)}, game: ${q(c.game)},`
    : `      id: ${q(id)}, cat: ${q(c.cat)}, franchise: ${q(c.franchise)}, game: ${q(c.game)},`;
  const lines = ['    {', head, `      title: ${q(c.title)}, composer: ${q(c.composer)}, year: ${c.year}, platform: ${q(c.platform)},`];
  if (c.aka && c.aka.length) lines.push(`      aka: ${list(c.aka)},`);
  lines.push(`      sources: [${srcs.join(', ')}],`, '    },');
  return lines.join('\n');
}

/* Inserta los bloques al final de cada sección y actualiza las cuentas. */
function insertar(tema, porSeccion) {
  const cfg = TEMAS[tema];
  const file = path.join(JS, cfg.file);
  let code = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  cfg.secciones.forEach(([key], i) => {
    const blocks = porSeccion[key] || [];
    if (!blocks.length) return;
    const next = cfg.secciones[i + 1];
    let at = -1;
    if (next) {
      const m = code.match(new RegExp(`\\n    /\\* ─+ ${esc(next[1])}( \\(\\d+\\))? ─+ \\*/`));
      if (m) at = m.index;
    } else if (cfg.fin) {
      const m = code.match(cfg.fin);
      if (m) at = m.index;
    } else {
      const start = code.indexOf(cfg.finTras);
      at = code.indexOf('\n  ];', start);
    }
    if (at < 0) throw new Error(`No encontré dónde termina la sección ${key} en ${cfg.file}`);
    code = code.slice(0, at) + '\n' + blocks.join('\n') + code.slice(at);
  });
  fs.writeFileSync(file, code);
  // Cuentas
  const AM = loadAll();
  if (cfg.porSaga) {
    code = code.replace(cfg.header[0], cfg.header[1](AM.SAGA_TRACKS.length));
  } else {
    const tracks = AM.CATALOG.filter((t) => t.theme === tema);
    if (cfg.header) code = code.replace(cfg.header[0], cfg.header[1](tracks.length));
    for (const [cat, label] of cfg.secciones) {
      const n = tracks.filter((t) => t.cat === cat).length;
      code = code.replace(new RegExp(`(/\\* ─+ ${esc(label)} )\\(\\d+\\)`), `$1(${n})`);
    }
  }
  fs.writeFileSync(file, code);
}

async function main() {
  const pedido = (process.argv[2] || '').toLowerCase();
  const temas = pedido === 'todos' ? Object.keys(TEMAS) : [pedido];
  if (!temas.every((t) => TEMAS[t])) {
    console.error('Uso: node scripts/build-resto-v22.js <caricaturas|anime|juegos|sagas|todos>');
    process.exit(1);
  }
  const candidatos = JSON.parse(fs.readFileSync(CANDIDATOS, 'utf8'));
  let cache = {};
  try { cache = JSON.parse(fs.readFileSync(CACHE, 'utf8')); } catch (e) { cache = {}; }
  const resultado = (() => { try { return JSON.parse(fs.readFileSync(RESULTADO, 'utf8')); } catch (e) { return { aceptadas: [], descartadas: [] }; } })();

  for (const tema of temas) {
    const AM = loadAll();
    const ids = new Set(AM.CATALOG.map((t) => t.id).concat(AM.SAGA_TRACKS.map((t) => t.id)));
    const enTema = tema === 'sagas' ? AM.SAGA_TRACKS.concat(AM.CATALOG.filter((t) => t.theme === 'juegos')) : AM.CATALOG.filter((t) => t.theme === tema);
    const yaCanciones = new Set(enTema.map((t) => norm(t.game) + '|' + norm(t.title)));
    const cuenta = {};
    if (tema === 'sagas') cuenta.total = AM.SAGA_TRACKS.length;
    else AM.CATALOG.filter((t) => t.theme === tema).forEach((t) => { cuenta[t.cat] = (cuenta[t.cat] || 0) + 1; });
    const porSeccion = {};
    const lista = candidatos.filter((c) => c.tema === tema);
    console.log(`\n▶ ${tema}: ${lista.length} candidatos`);
    for (const c of lista) {
      const metaKey = tema === 'sagas' ? 'total' : c.cat;
      const meta = META[tema][metaKey];
      if (meta === undefined) { console.log(`  ✗ ${c.key}: categoría desconocida ${metaKey}`); continue; }
      if (ids.has(c.id) || yaCanciones.has(norm(c.game) + '|' + norm(c.title))) continue; // ya está
      if ((cuenta[metaKey] || 0) >= meta) continue; // la categoría ya llegó a su meta
      const res = await resolver(c, tema, cache);
      if (!res.ok) {
        console.log(`  ✗ ${c.game} — ${c.title}: ${res.motivo}`);
        if (!resultado.descartadas.some((d) => d.key === c.key)) resultado.descartadas.push({ key: c.key, tema, cat: c.cat || c.saga, game: c.game, title: c.title, motivo: res.motivo });
        continue;
      }
      const srcs = fuentes(res, TEMAS[tema]);
      const seccion = tema === 'sagas' ? c.saga : c.cat;
      (porSeccion[seccion] = porSeccion[seccion] || []).push(bloque(c, tema, c.id, srcs));
      ids.add(c.id);
      yaCanciones.add(norm(c.game) + '|' + norm(c.title));
      cuenta[metaKey] = (cuenta[metaKey] || 0) + 1;
      resultado.aceptadas = resultado.aceptadas.filter((a) => a.key !== c.key);
      resultado.aceptadas.push({ key: c.key, id: c.id, tema, cat: seccion, game: c.game, title: c.title, latino: !!c.latino, youtube: res.yt, apple: res.apple });
      console.log(`  ✔ ${c.game} — ${c.title} → ${srcs.join(', ')}`);
    }
    insertar(tema, porSeccion);
    const faltan = Object.entries(META[tema]).map(([k, m]) => [k, m - (cuenta[k] || 0)]).filter(([, f]) => f > 0);
    console.log(`  ${tema}: ${Object.values(porSeccion).flat().length} pistas nuevas.` + (faltan.length ? ` Faltan para la meta: ${faltan.map(([k, f]) => `${k} ${f}`).join(', ')}` : ' Todas las metas cumplidas.'));
    resultado.generado = new Date().toISOString();
    fs.writeFileSync(RESULTADO, JSON.stringify(resultado, null, 1) + '\n');
  }
  console.log('\nListo. Revisa scripts/resultado-v22.json y corre node scripts/audit-red.js todos.');
}

main().catch((err) => {
  console.error('❌ build-resto-v22.js:', err);
  process.exit(1);
});
