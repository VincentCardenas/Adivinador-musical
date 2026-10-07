const fs = require('fs');
const path = require('path');
const vm = require('vm');

/*
 * Resolución REAL de fuentes: busca en YouTube cada pista cuya fuente no es correcta (según
 * audit-sources-report.json), puntúa los candidatos y confirma con oEmbed que el video existe y es
 * incrustable. Nunca inventa IDs: todo ID sale de una búsqueda real.
 * Uso: node scripts/resolve-sources.js <anime|caricaturas>
 * Salida: scripts/source-review-<catalogo>.json (aceptadas, dudosas y pendientes).
 * Es reanudable: las búsquedas se guardan en scripts/.yt-cache.json.
 */
const name = process.argv[2];
const FILES = { anime: '../js/catalog-anime.js', caricaturas: '../js/catalog-caricaturas.js' };
if (!FILES[name]) { console.error('Uso: node scripts/resolve-sources.js <anime|caricaturas>'); process.exit(1); }

const ACEPTAR = 8;
const DUDOSA = 5;
const PAUSA_MS = 1200;
const cachePath = path.join(__dirname, '.yt-cache.json');
let cache = {};
try { cache = JSON.parse(fs.readFileSync(cachePath, 'utf8')); } catch (e) { cache = {}; }

function load(file) {
  const sandbox = { window: {}, AM: { CATEGORIES: [], CATALOG: [], EXTRA_GAMES: [], VERSIONS: [], FRANCHISE_AKA: {} }, console };
  sandbox.window.AM = sandbox.AM;
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, file), 'utf8'), sandbox);
  return sandbox.AM.CATALOG;
}
const norm = (t) => String(t || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
const STOP = new Set(['serie', 'tema', 'entrada', 'intro', 'espanol', 'the', 'and', 'con', 'una', 'por', 'para', 'del', 'los', 'las']);
const tokens = (t) => norm(t).split(' ').filter((w) => w.length >= 3 && !STOP.has(w));
const compact = (t) => norm(t).replace(/ /g, '');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function parseLength(text) {
  if (!text) return null;
  const p = text.split(':').map(Number);
  if (p.some(isNaN)) return null;
  return p.reduce((a, n) => a * 60 + n, 0);
}
function decode(s) { try { return JSON.parse('"' + s + '"'); } catch (e) { return s; } }

async function search(query) {
  if (cache[query]) return cache[query];
  let html = '';
  for (let intento = 0; intento < 3 && !html; intento++) {
    try {
      const r = await fetch('https://www.youtube.com/results?search_query=' + encodeURIComponent(query), {
        headers: { 'accept-language': 'es-MX,es;q=0.9', 'user-agent': 'Mozilla/5.0' },
      });
      if (r.status === 200) html = await r.text(); else await sleep(4000);
    } catch (e) { await sleep(4000); }
  }
  const out = [];
  html.split('"videoRenderer":{').slice(1).forEach((chunk) => {
    const id = (chunk.match(/^"videoId":"([A-Za-z0-9_-]{11})"/) || [])[1];
    if (!id) return;
    const title = (chunk.match(/"title":\{"runs":\[\{"text":"((?:[^"\\]|\\.)*)"/) || [])[1];
    const len = (chunk.match(/"lengthText":.*?"simpleText":"([0-9:]+)"/) || [])[1];
    const channel = (chunk.match(/"ownerText":\{"runs":\[\{"text":"((?:[^"\\]|\\.)*)"/) || [])[1];
    if (title) out.push({ id: id, title: decode(title), seconds: parseLength(len), channel: channel ? decode(channel) : '' });
  });
  const top = out.slice(0, 10);
  if (top.length) { cache[query] = top; fs.writeFileSync(cachePath, JSON.stringify(cache), 'utf8'); }
  await sleep(PAUSA_MS);
  return top;
}

async function embebible(id) {
  try {
    const r = await fetch('https://www.youtube.com/oembed?format=json&url=' + encodeURIComponent('https://www.youtube.com/watch?v=' + id));
    return r.status === 200;
  } catch (e) { return false; }
}

const MALOS = /\b(reaction|reaccion|reacciona|cover|remix|karaoke|extended|extendido|capitulo completo|episodio|episode|loop|1 hour|1 hora|nightcore|piano|8 bit|8bit|tutorial|review|analisis|explicacion|ranking|top \d+|parodia|fandub|amv|compilation|recopilacion)\b/;

function fraccion(tks, tituloNorm, tituloCompacto) {
  if (!tks.length) return 0;
  const hit = tks.filter((w) => tituloNorm.split(' ').includes(w) || tituloCompacto.indexOf(w) >= 0).length;
  return hit / tks.length;
}

function puntuar(track, cand, posicion) {
  const tn = norm(cand.title);
  const tc = compact(cand.title);
  const nombres = [track.franchise, track.game].concat(track.aka || []);
  const frac = Math.max(...nombres.map((n) => fraccion(tokens(n), tn, tc)));
  const compactoCoincide = nombres.some((n) => compact(n).length >= 3 && tc.indexOf(compact(n)) >= 0);
  let score = Math.max(frac, compactoCoincide ? 1 : 0) * (name === 'anime' ? 5 : 6);
  if (name === 'caricaturas') {
    score += /\b(latino|latina|latam|espanol|castellano mexicano|doblaje)\b/.test(tn) ? 3 : -4;
    if (/\b(intro|tema|opening|entrada|apertura|cabecera|inicio|theme|intro oficial)\b/.test(tn)) score += 1;
  } else {
    const song = tokens(track.title.replace(/\(.*?\)/g, ' '));
    score += fraccion(song, tn, tc) * 4;
    if (tokens(track.composer || '').some((w) => tn.split(' ').includes(w))) score += 1;
    if (/\bopening\b|\bop\b|\bop \d/.test(tn)) score += 1;
    if (/crunchyroll/i.test(cand.channel)) score += 1;
  }
  if (cand.seconds === null) score -= 2;
  else if (cand.seconds < 15 || cand.seconds > 400) score -= 6;
  else score += 1;
  if (MALOS.test(tn)) score -= 10;
  score -= posicion * 0.15;
  return Math.round(score * 100) / 100;
}

function consultas(track) {
  const f = track.franchise;
  if (name === 'caricaturas') {
    const g = track.game && track.game !== f ? track.game : '';
    return [`${f} intro español latino`, `${g || f} tema de entrada latino`, `${f} ${(track.aka || [])[0] || ''} opening latino`.trim()];
  }
  const t = track.title.replace(/\(.*?\)/g, ' ').trim();
  return [`${f} opening ${t} ${track.composer || ''}`.trim(), `${f} ${t} opening`, `${f} opening ${track.year}`];
}

(async () => {
  const catalog = load(FILES[name]);
  const reportPath = path.join(__dirname, 'audit-sources-report.json');
  const audit = JSON.parse(fs.readFileSync(reportPath, 'utf8'))[name];
  if (!audit) { console.error('Primero ejecuta: node scripts/audit-sources.js ' + name); process.exit(1); }
  const pendientesDeResolver = catalog.filter((t) => audit.detalle[t.id] && audit.detalle[t.id].estado !== 'ok');
  console.log(`${name}: ${pendientesDeResolver.length} pistas por resolver de ${catalog.length}`);

  const review = { generado: new Date().toISOString(), catalogo: name, aceptadas: [], dudosas: [], pendientes: [] };
  let n = 0;
  for (const track of pendientesDeResolver) {
    n++;
    let mejor = null;
    const vistos = new Set();
    for (const q of consultas(track)) {
      const resultados = await search(q);
      for (let i = 0; i < resultados.length; i++) {
        const c = resultados[i];
        if (vistos.has(c.id)) continue;
        vistos.add(c.id);
        const score = puntuar(track, c, i);
        if (!mejor || score > mejor.score) mejor = Object.assign({}, c, { score: score, consulta: q });
      }
      if (mejor && mejor.score >= ACEPTAR) break;
    }
    const base = { id: track.id, franchise: track.franchise, title: track.title };
    if (mejor && mejor.score >= DUDOSA) {
      const existe = await embebible(mejor.id);
      if (!existe) { review.pendientes.push(Object.assign(base, { motivo: 'el mejor candidato no es incrustable', candidato: mejor })); }
      else if (mejor.score >= ACEPTAR) review.aceptadas.push(Object.assign(base, { elegido: mejor }));
      else review.dudosas.push(Object.assign(base, { elegido: mejor }));
    } else {
      review.pendientes.push(Object.assign(base, { motivo: 'sin candidato confiable', candidato: mejor }));
    }
    if (n % 10 === 0) console.log(`  ${n}/${pendientesDeResolver.length} | aceptadas ${review.aceptadas.length} | dudosas ${review.dudosas.length} | pendientes ${review.pendientes.length}`);
  }
  fs.writeFileSync(path.join(__dirname, `source-review-${name}.json`), JSON.stringify(review, null, 2), 'utf8');
  console.log(`\nResultado ${name}: aceptadas ${review.aceptadas.length} | dudosas ${review.dudosas.length} | pendientes ${review.pendientes.length}`);
  console.log(`Detalle en scripts/source-review-${name}.json`);
})();
