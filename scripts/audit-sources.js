const fs = require('fs');
const path = require('path');
const vm = require('vm');

/*
 * Auditoría REAL de fuentes (solo lectura): comprueba contra YouTube (oEmbed) y la iTunes Lookup API
 * que cada ID exista y que el título resuelto corresponda a la pista del catálogo.
 * Estados por pista: ok (alguna fuente real y coherente) · sospechosa (existe, pero el título no
 * coincide) · muerta (ninguna fuente existe).
 * Uso: node scripts/audit-sources.js <anime|caricaturas|todos>
 */
const target = process.argv[2] || 'todos';
const FILES = {
  anime: '../js/catalog-anime.js',
  caricaturas: '../js/catalog-caricaturas.js',
};

function load(file) {
  const sandbox = { window: {}, AM: { CATEGORIES: [], CATALOG: [], EXTRA_GAMES: [], VERSIONS: [], FRANCHISE_AKA: {} }, console };
  sandbox.window.AM = sandbox.AM;
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, file), 'utf8'), sandbox);
  return sandbox.AM.CATALOG;
}

function norm(text) {
  return String(text || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
}
const STOP = new Set(['serie', 'tema', 'latino', 'entrada', 'opening', 'intro', 'espanol', 'de', 'la', 'el', 'los', 'las', 'del', 'the', 'and', 'con', 'una', 'por', 'para']);
function tokens(text) {
  return norm(text).split(' ').filter((w) => w.length >= 4 && !STOP.has(w));
}
function trackKeywords(t) {
  const base = [t.franchise, t.game, t.title].concat(t.aka || []);
  return new Set(base.flatMap(tokens));
}
function composerKeywords(t) { return new Set(tokens(t.composer || '')); }

function coherent(track, resolvedTitle, resolvedArtist) {
  const kw = trackKeywords(track);
  const words = new Set(tokens(resolvedTitle));
  for (const w of words) if (kw.has(w)) return true;
  const ck = composerKeywords(track);
  for (const w of tokens(resolvedArtist || '')) if (ck.has(w)) return true;
  const compactTitle = norm(resolvedTitle).replace(/ /g, '');
  const names = [track.franchise, track.game].concat(track.aka || []).map((n) => norm(n).replace(/ /g, '')).filter((n) => n.length >= 3);
  return names.some((n) => compactTitle.indexOf(n) >= 0);
}

async function ytCheck(id) {
  try {
    const r = await fetch('https://www.youtube.com/oembed?format=json&url=' + encodeURIComponent('https://www.youtube.com/watch?v=' + id));
    if (r.status === 200) { const j = await r.json(); return { ok: true, title: j.title, artist: j.author_name }; }
    return { ok: false, status: r.status };
  } catch (e) { return { ok: false, status: 'red' }; }
}

async function appleCheck(id, country) {
  try {
    const r = await fetch(`https://itunes.apple.com/lookup?id=${id}&country=${country || 'us'}`);
    const j = await r.json();
    const hit = (j.results || [])[0];
    return hit && hit.previewUrl ? { ok: true, title: hit.trackName, artist: hit.artistName } : { ok: false, status: 'sin resultado' };
  } catch (e) { return { ok: false, status: 'red' }; }
}

async function pool(items, size, fn) {
  const out = new Array(items.length);
  let i = 0;
  await Promise.all(Array.from({ length: size }, async () => {
    while (i < items.length) { const k = i++; out[k] = await fn(items[k]); }
  }));
  return out;
}

(async () => {
  const names = target === 'todos' ? Object.keys(FILES) : [target];
  const report = {};
  for (const name of names) {
    const catalog = load(FILES[name]);
    const byId = new Map(catalog.map((t) => [t.id, t]));
    const jobs = [];
    catalog.forEach((t) => (t.sources || []).forEach((s) => {
      if (s.type === 'youtube') jobs.push({ track: t.id, kind: 'yt', id: s.id });
      else if (s.type === 'itunes' && s.song) jobs.push({ track: t.id, kind: 'apple', id: s.song, country: s.country });
      else if (s.type === 'itunes') jobs.push({ track: t.id, kind: 'dinamica' });
    }));
    const results = await pool(jobs, 8, async (j) => {
      if (j.kind === 'dinamica') return Object.assign({}, j, { ok: true, dinamica: true });
      return Object.assign({}, j, j.kind === 'yt' ? await ytCheck(j.id) : await appleCheck(j.id, j.country));
    });

    const estado = {};
    catalog.forEach((t) => { estado[t.id] = { estado: 'muerta', fuentes: [] }; });
    const ALLOWLIST = new Set(['XY3RhMPMWAk', 'J3NpefI18es']);
    results.forEach((r) => {
      const t = byId.get(r.track);
      const e = estado[r.track];
      if (!r.ok) { e.fuentes.push({ kind: r.kind, id: r.id, ok: false, status: r.status }); return; }
      const good = r.dinamica || ALLOWLIST.has(r.id) || coherent(t, r.title, r.artist);
      e.fuentes.push({ kind: r.kind, id: r.id, ok: true, coherente: good, titulo: r.title, artista: r.artist });
      if (good) e.estado = 'ok';
      else if (e.estado !== 'ok') e.estado = 'sospechosa';
    });

    const lista = (s) => Object.entries(estado).filter(([, v]) => v.estado === s).map(([id]) => id);
    const ok = lista('ok'); const sosp = lista('sospechosa'); const muertas = lista('muerta');
    report[name] = { pistas: catalog.length, ok: ok.length, sospechosas: sosp.length, muertas: muertas.length, detalle: estado };
    console.log(`\n=== ${name.toUpperCase()} ===`);
    console.log(`Pistas: ${catalog.length} | OK: ${ok.length} | Sospechosas (existe pero título no coincide): ${sosp.length} | Muertas: ${muertas.length}`);
  }
  const reportPath = path.join(__dirname, 'audit-sources-report.json');
  let previo = {};
  try { previo = JSON.parse(fs.readFileSync(reportPath, 'utf8')); } catch (e) { previo = {}; }
  fs.writeFileSync(reportPath, JSON.stringify(Object.assign(previo, report), null, 2), 'utf8');
  console.log('\nDetalle completo en scripts/audit-sources-report.json');
  const fail = Object.values(report).some((r) => r.sospechosas + r.muertas > 0);
  process.exit(fail ? 2 : 0);
})();
