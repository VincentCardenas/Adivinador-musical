const fs = require('fs');
const path = require('path');
const vm = require('vm');

/*
 * Auditoría de solo lectura para Canciones y Musicales:
 * Evalúa las pistas que usan `busca(...)` o dinámica de Apple Music
 * y verifica contra la iTunes Search API que devuelvan un preview válido
 * respetando las reglas de `js/sources.js` (scoreSong).
 */

const target = process.argv[2] || 'todos';
const FILES = {
  musicales: '../js/catalog-musicales.js',
  canciones: '../js/catalog-canciones.js',
};

function load(file) {
  const sandbox = { window: {}, AM: { CATEGORIES: [], CATALOG: [], EXTRA_GAMES: [], VERSIONS: [], FRANCHISE_AKA: {} }, console };
  sandbox.window.AM = sandbox.AM;
  // Interceptar busca(...) para guardar los términos
  sandbox.busca = (artist, title, opts) => { return { type: 'busca', artist, title, opts }; };
  sandbox.apple = (obj) => { return Object.assign({ type: 'apple' }, obj); };
  sandbox.am = (...ids) => { return ids.map(id => ({ type: 'apple', song: id, country: 'mx' })); };
  sandbox.disco = (album, match) => { return { type: 'apple', album, match }; };
  sandbox.yt = (id, start) => { return { type: 'yt', id, start }; };

  vm.runInNewContext(fs.readFileSync(path.join(__dirname, file), 'utf8'), sandbox);
  return sandbox.AM.CATALOG;
}

const norm = (t) => String(t || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
const STOP = new Set(['the', 'and', 'con', 'una', 'por', 'para', 'del', 'los', 'las', 'de', 'la', 'el', 'en', 'un']);
const tokens = (t) => norm(t).split(' ').filter(w => w.length > 2 && !STOP.has(w));
const fraccion = (tks, fullNorm) => {
  if (!tks.length) return 0;
  const hit = tks.filter(w => fullNorm.split(' ').includes(w)).length;
  return hit / tks.length;
};

// Recreación de scoreSong de js/sources.js
function scoreSong(track, cand, isBusca) {
  const cn = norm(cand.trackName);
  const ca = norm(cand.artistName);
  const tn = norm(track.title);
  const ta = norm(track.composer || track.franchise);

  let score = fraccion(tokens(tn), cn) * 6;
  score += fraccion(tokens(ta), ca) * 4;

  const m = cand.trackName.toLowerCase();
  if (/\b(karaoke|tribute|cover|instrumental|lullaby|piano|8-bit)\b/.test(m) && !/\b(instrumental|karaoke|piano)\b/.test(track.title.toLowerCase())) {
    score -= 10;
  }
  if (/\b(live|en vivo)\b/.test(m) && !/\b(live|en vivo)\b/.test(track.title.toLowerCase())) {
    score -= 5;
  }
  return score;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchItunes(term, country) {
  for (let i = 0; i < 3; i++) {
    try {
      const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(term)}&country=${country || 'us'}&media=music&limit=15`);
      if (res.status === 200) {
        return (await res.json()).results || [];
      } else if (res.status === 403) {
        await sleep(3000); // rate limit
      }
    } catch (e) {
      await sleep(2000);
    }
  }
  return [];
}

async function resolveBusca(track, src) {
  const q = `${src.artist} ${src.title}`.trim();
  const cands = await fetchItunes(q, 'mx');
  let best = null;
  for (const c of cands) {
    if (!c.previewUrl) continue;
    const s = scoreSong(track, c, true);
    if (!best || s > best.score) best = Object.assign({}, c, { score: s });
  }
  return best;
}

(async () => {
  const names = target === 'todos' ? Object.keys(FILES) : [target];
  const report = {};
  
  for (const name of names) {
    const catalog = load(FILES[name]);
    console.log(`\n=== Evaluando ${name.toUpperCase()} ===`);
    let totales = 0, ok = 0, fallas = 0;
    const fallidas = [];

    for (let i = 0; i < catalog.length; i++) {
      const track = catalog[i];
      const sources = Array.isArray(track.sources) ? track.sources.flat() : [track.sources];
      const dyn = sources.find(s => s && s.type === 'itunes' && s.term);
      
      if (!dyn) continue;
      totales++;
      
      // dyn contiene term, artist, match
      const dynMock = { type: 'busca', artist: dyn.artist, title: dyn.match[0] };
      const best = await resolveBusca(track, dynMock);
      if (best && best.score >= 5) {
        ok++;
      } else {
        fallas++;
        fallidas.push({
          id: track.id,
          title: track.title,
          artist: track.composer || track.franchise,
          busca: dyn,
          bestCandidate: best ? { title: best.trackName, artist: best.artistName, score: best.score } : 'Ninguno'
        });
      }
      
      if (totales % 20 === 0) {
        console.log(`  Procesadas ${totales}... OK: ${ok} | Fallas: ${fallas}`);
      }
      await sleep(1500); // 1.5s entre peticiones para no ser baneados por iTunes
    }
    
    report[name] = { totales, ok, fallas, fallidas };
    console.log(`\n=== RESULTADO ${name.toUpperCase()} ===`);
    console.log(`Auditoría dinámica completa. Totales evaluadas: ${totales} | OK: ${ok} | Fallas: ${fallas}`);
  }
  
  fs.writeFileSync(path.join(__dirname, 'audit-dynamic-report.json'), JSON.stringify(report, null, 2), 'utf8');
  console.log('\nReporte guardado en scripts/audit-dynamic-report.json');
})();
