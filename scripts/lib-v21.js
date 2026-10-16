#!/usr/bin/env node
/**
 * scripts/lib-v21.js
 * Biblioteca de búsqueda y comprobación real en red (YouTube y Apple Music) para v2.1.
 *
 * Garantías:
 * - Ningún ID sale de memoria: todos provienen de búsquedas reales ejecutadas ahora.
 * - YouTube: oEmbed 200 + watch?v= (ytInitialPlayerResponse) con playabilityStatus.status === "OK",
 *   playableInEmbed !== false, título/canal y videoDetails.lengthSeconds verificados.
 * - Apple: lookup con el mismo country ('mx' o 'us') devuelve previewUrl y metadatos coherentes.
 * - Registra automáticamente toda comprobación en scripts/evidencia-v2.1.json y actualiza
 *   scripts/.audit-red-cache.json para que audit-red.js no repita peticiones de red.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const EVIDENCIA_PATH = path.join(__dirname, 'evidencia-v2.1.json');
const CACHE_PATH = path.join(__dirname, '.audit-red-cache.json');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function loadJson(filePath, fallback) {
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
  } catch (e) {}
  return fallback;
}

function saveJsonLf(filePath, obj) {
  fs.writeFileSync(filePath, JSON.stringify(obj, null, 2).replace(/\r\n/g, '\n') + '\n', 'utf8');
}

const evidencia = loadJson(EVIDENCIA_PATH, {});
const auditCache = loadJson(CACHE_PATH, { yt: {}, appleSong: {}, itunesResolved: {}, itunesHttp: {} });

function saveEvidencia() {
  saveJsonLf(EVIDENCIA_PATH, evidencia);
}

function saveAuditCache() {
  saveJsonLf(CACHE_PATH, auditCache);
}

function extractBalancedJson(str, startIdx) {
  let depth = 0;
  let inStr = false;
  let esc = false;
  for (let i = startIdx; i < str.length; i++) {
    const ch = str[i];
    if (inStr) {
      if (esc) esc = false;
      else if (ch === '\\') esc = true;
      else if (ch === '"') inStr = false;
    } else {
      if (ch === '"') inStr = true;
      else if (ch === '{') depth++;
      else if (ch === '}') {
        depth--;
        if (depth === 0) return str.slice(startIdx, i + 1);
      }
    }
  }
  return null;
}

function extractJsonAfterMarker(html, marker) {
  const idx = html.indexOf(marker);
  if (idx === -1) return null;
  const braceIdx = html.indexOf('{', idx + marker.length);
  if (braceIdx === -1) return null;
  const raw = extractBalancedJson(html, braceIdx);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

let lastYtSearchAt = 0;
let lastYtCheckAt = 0;
let lastItunesAt = 0;

/**
 * Busca en YouTube y devuelve lista de candidatos [{ id, title, channel, lengthText }].
 * Respeta máximo 1 búsqueda por segundo; si recibe 429 o captcha pausa 5 minutos.
 */
async function searchYoutube(query, limit = 8) {
  const wait = Math.max(0, lastYtSearchAt + 1100 - Date.now());
  if (wait > 0) await sleep(wait);
  lastYtSearchAt = Date.now();

  const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}&hl=es-MX&gl=MX`;
  let html = '';
  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetch(url, {
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'accept-language': 'es-MX,es;q=0.9,en;q=0.8',
      },
    });
    if (res.status === 429) {
      console.warn('⚠️ YouTube search respondió 429. Pausando 5 minutos...');
      await sleep(300000);
      lastYtSearchAt = Date.now();
      continue;
    }
    html = await res.text();
    if (html.includes('class="g-recaptcha"') || html.includes('Our systems have detected unusual traffic')) {
      console.warn('⚠️ YouTube search detectó captcha. Pausando 5 minutos...');
      await sleep(300000);
      lastYtSearchAt = Date.now();
      continue;
    }
    break;
  }

  const out = [];
  const seen = new Set();
  const re = /"videoRenderer":\{"videoId":"([A-Za-z0-9_-]{11})"/g;
  let m;
  while ((m = re.exec(html)) !== null && out.length < limit) {
    const id = m[1];
    if (seen.has(id)) continue;
    seen.add(id);
    out.push(id);
  }
  return out;
}

/**
 * Comprueba un ID de YouTube con oEmbed (200) y página watch?v= (ytInitialPlayerResponse).
 * Registra el resultado en scripts/evidencia-v2.1.json si pasa todas las comprobaciones.
 */
async function verifyYoutubeId(id, queryUsed = 'verificación directa') {
  const wait = Math.max(0, lastYtCheckAt + 550 - Date.now());
  if (wait > 0) await sleep(wait);
  lastYtCheckAt = Date.now();

  const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${encodeURIComponent(id)}&format=json`;
  const oRes = await fetch(oembedUrl, {
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'accept-language': 'es-MX,es;q=0.9',
    },
  });
  if (oRes.status === 429) {
    console.warn('⚠️ YouTube oEmbed 429. Pausando 5 minutos...');
    await sleep(300000);
    return verifyYoutubeId(id, queryUsed);
  }
  if (oRes.status !== 200) {
    const fail = {
      ok: false,
      oembedStatus: oRes.status,
      reason: `oEmbed respondió ${oRes.status}`,
      checkedWatchPage: true,
      checkedAt: new Date().toISOString(),
    };
    auditCache.yt[id] = fail;
    return fail;
  }
  const oData = await oRes.json();

  const wait2 = Math.max(0, lastYtCheckAt + 550 - Date.now());
  if (wait2 > 0) await sleep(wait2);
  lastYtCheckAt = Date.now();

  const watchUrl = `https://www.youtube.com/watch?v=${encodeURIComponent(id)}&hl=es-MX&gl=MX`;
  const wRes = await fetch(watchUrl, {
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      'accept-language': 'es-MX,es;q=0.9,en;q=0.8',
    },
  });
  if (wRes.status === 429) {
    console.warn('⚠️ YouTube watch 429. Pausando 5 minutos...');
    await sleep(300000);
    return verifyYoutubeId(id, queryUsed);
  }
  const html = await wRes.text();
  let pr = extractJsonAfterMarker(html, 'var ytInitialPlayerResponse =');
  if (!pr) pr = extractJsonAfterMarker(html, 'ytInitialPlayerResponse =');

  if (!pr || !pr.playabilityStatus) {
    const fail = {
      ok: false,
      oembedStatus: 200,
      reason: 'Sin ytInitialPlayerResponse',
      checkedWatchPage: true,
      checkedAt: new Date().toISOString(),
    };
    auditCache.yt[id] = fail;
    return fail;
  }

  const ps = pr.playabilityStatus;
  const vd = pr.videoDetails || {};
  const audioCfg = (pr.playerConfig && pr.playerConfig.audioConfig) || {};
  const playableInEmbed = ps.playableInEmbed !== false;
  const statusOk = ps.status === 'OK';
  const lengthSeconds = vd.lengthSeconds ? Number(vd.lengthSeconds) : null;
  const title = vd.title || oData.title || '';
  const channel = vd.author || oData.author_name || '';
  const loudnessDb = typeof audioCfg.loudnessDb === 'number' ? audioCfg.loudnessDb : null;

  const entry = {
    ok: statusOk && playableInEmbed,
    oembedStatus: 200,
    playabilityStatus: ps.status,
    playableInEmbed,
    reason: !statusOk
      ? `playabilityStatus=${ps.status}${ps.reason ? ' (' + ps.reason + ')' : ''}`
      : !playableInEmbed
      ? 'playableInEmbed=false'
      : 'OK',
    title,
    channel,
    lengthSeconds,
    loudnessDb,
    checkedWatchPage: true,
    checkedAt: new Date().toISOString(),
  };

  auditCache.yt[id] = entry;
  saveAuditCache();

  if (entry.ok) {
    evidencia[id] = {
      tipo: 'youtube',
      id,
      consulta: queryUsed,
      titulo: title,
      canal_o_artista: channel,
      album: null,
      duracion: lengthSeconds,
      pais: 'mx',
      loudnessDb,
      resultado: {
        oembed: 200,
        playabilityStatus: ps.status,
        playableInEmbed,
      },
      fecha: entry.checkedAt,
    };
    saveEvidencia();
  }

  return entry;
}

/**
 * Busca en YouTube y devuelve los primeros N candidatos que pasen verifyYoutubeId y un filtro opcional.
 */
async function searchAndVerifyYoutube(query, opts = {}) {
  const maxCandidates = opts.maxCandidates || 6;
  const wantCount = opts.wantCount || 1;
  const minLength = opts.minLength !== undefined ? opts.minLength : 20;
  const maxLength = opts.maxLength !== undefined ? opts.maxLength : 600;
  const filterFn = opts.filterFn || (() => true);

  const ids = await searchYoutube(query, maxCandidates);
  const valid = [];
  for (const id of ids) {
    const info = await verifyYoutubeId(id, query);
    if (!info.ok) continue;
    if (info.lengthSeconds !== null && (info.lengthSeconds < minLength || info.lengthSeconds > maxLength)) continue;
    if (!filterFn(info)) continue;
    valid.push(info.id ? info : Object.assign({ id }, info));
    if (valid.length >= wantCount) break;
  }
  return valid;
}

/**
 * Busca en iTunes Search API respetando ~19 consultas/minuto.
 */
async function searchApple(term, country = 'mx', limit = 15, entity = 'song') {
  const wait = Math.max(0, lastItunesAt + 3250 - Date.now());
  if (wait > 0) await sleep(wait);
  lastItunesAt = Date.now();

  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&country=${country}&media=music&entity=${entity}&limit=${limit}`;
  for (let attempt = 0; attempt < 4; attempt++) {
    const res = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0' } });
    if (res.status === 403 || res.status === 429) {
      console.warn(`⚠️ iTunes Search respondió ${res.status}. Esperando 15s...`);
      await sleep(15000);
      lastItunesAt = Date.now();
      continue;
    }
    if (res.status === 200) {
      const data = await res.json();
      return data.results || [];
    }
    break;
  }
  return [];
}

/**
 * Comprueba uno o varios IDs de Apple Music con lookup en el país indicado y registra en evidencia-v2.1.json.
 */
async function verifyAppleSongIds(songIds, country = 'mx', queryUsed = 'lookup') {
  const ids = (Array.isArray(songIds) ? songIds : [songIds]).map(String);
  const wait = Math.max(0, lastItunesAt + 3250 - Date.now());
  if (wait > 0) await sleep(wait);
  lastItunesAt = Date.now();

  const url = `https://itunes.apple.com/lookup?id=${ids.join(',')}&country=${country}`;
  let results = [];
  for (let attempt = 0; attempt < 4; attempt++) {
    const res = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0' } });
    if (res.status === 403 || res.status === 429) {
      console.warn(`⚠️ iTunes Lookup respondió ${res.status}. Esperando 15s...`);
      await sleep(15000);
      lastItunesAt = Date.now();
      continue;
    }
    if (res.status === 200) {
      const data = await res.json();
      results = data.results || [];
      break;
    }
    break;
  }

  const byId = new Map();
  for (const r of results) {
    if (r.wrapperType === 'track' && r.trackId) {
      byId.set(String(r.trackId), r);
    }
  }

  const out = {};
  for (const id of ids) {
    const hit = byId.get(id);
    const cacheKey = `${country}:${id}`;
    if (hit && hit.previewUrl) {
      const dur = hit.trackTimeMillis ? Math.round(hit.trackTimeMillis / 1000) : null;
      const entry = {
        ok: true,
        trackId: hit.trackId,
        title: hit.trackName || '',
        artist: hit.artistName || '',
        album: hit.collectionName || '',
        previewUrl: hit.previewUrl,
        durationSeconds: dur,
        country,
        checkedAt: new Date().toISOString(),
      };
      auditCache.appleSong[cacheKey] = entry;
      auditCache.itunesHttp[`https://itunes.apple.com/lookup?id=${id}&country=${country}`] = {
        resultCount: 1,
        results: [hit],
      };
      evidencia[String(hit.trackId)] = {
        tipo: 'apple',
        id: hit.trackId,
        consulta: queryUsed,
        titulo: hit.trackName || '',
        canal_o_artista: hit.artistName || '',
        album: hit.collectionName || '',
        duracion: dur,
        pais: country,
        resultado: {
          ok: true,
          previewUrl: hit.previewUrl,
        },
        fecha: entry.checkedAt,
      };
      out[id] = entry;
    } else {
      const fail = {
        ok: false,
        reason: `sin previewUrl en lookup(${country})`,
        country,
        checkedAt: new Date().toISOString(),
      };
      auditCache.appleSong[cacheKey] = fail;
      out[id] = fail;
    }
  }
  saveAuditCache();
  saveEvidencia();
  return Array.isArray(songIds) ? out : out[String(songIds)];
}

/**
 * Registra en evidencia-v2.1.json una pista de Apple obtenida por searchApple (que ya trae previewUrl).
 */
function recordAppleTrackEvidence(item, country, queryUsed) {
  if (!item || !item.trackId || !item.previewUrl) return null;
  const id = String(item.trackId);
  const dur = item.trackTimeMillis ? Math.round(item.trackTimeMillis / 1000) : null;
  const now = new Date().toISOString();
  const entry = {
    ok: true,
    trackId: item.trackId,
    title: item.trackName || '',
    artist: item.artistName || '',
    album: item.collectionName || '',
    previewUrl: item.previewUrl,
    durationSeconds: dur,
    country,
    checkedAt: now,
  };
  auditCache.appleSong[`${country}:${id}`] = entry;
  auditCache.itunesHttp[`https://itunes.apple.com/lookup?id=${id}&country=${country}`] = {
    resultCount: 1,
    results: [item],
  };
  evidencia[id] = {
    tipo: 'apple',
    id: item.trackId,
    consulta: queryUsed,
    titulo: item.trackName || '',
    canal_o_artista: item.artistName || '',
    album: item.collectionName || '',
    duracion: dur,
    pais: country,
    resultado: {
      ok: true,
      previewUrl: item.previewUrl,
    },
    fecha: now,
  };
  saveAuditCache();
  saveEvidencia();
  return entry;
}

module.exports = {
  ROOT,
  EVIDENCIA_PATH,
  CACHE_PATH,
  evidencia,
  auditCache,
  saveEvidencia,
  saveAuditCache,
  sleep,
  searchYoutube,
  verifyYoutubeId,
  searchAndVerifyYoutube,
  searchApple,
  verifyAppleSongIds,
  recordAppleTrackEvidence,
};
