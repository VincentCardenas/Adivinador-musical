/**
 * Script de validación técnica para el catálogo bilingüe de canciones.
 * Verifica:
 * - Integridad sintáctica
 * - Unicidad estricta de IDs
 * - Campos requeridos (id, cat, franchise, game, title, year, sources)
 * - Cuotas por idioma:
 *   * Rock: 100 ES, 100 EN
 *   * Pop: 100 ES, 100 EN
 *   * Rap: 100 ES, 100 EN
 *   * Baladas: 100 ES, 100 EN
 *   * Metal: 100 ES, 100 EN
 *   * Electrónica: 100 ES, 100 EN
 *   * Reggaetón: 100 ES
 *   * Regional: 100 ES
 *   * Cumbia: 100 ES
 *   * Salsa: 100 ES
 *   * K-pop: 100 total (coreano/global)
 *   * Country: 100 total (en inglés)
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const catalogPath = path.join(__dirname, '..', 'js', 'catalog-canciones.js');
const code = fs.readFileSync(catalogPath, 'utf8');

const sandbox = {
  window: {
    AM: {
      CATEGORIES: [],
      CATALOG: [],
      EXTRA_GAMES: []
    }
  }
};
vm.createContext(sandbox);

try {
  vm.runInContext(code, sandbox);
} catch (err) {
  console.error('❌ ERROR AL EJECUTAR EL CATÁLOGO:', err.message);
  process.exit(1);
}

const catalog = sandbox.window.AM.CATALOG;
const categories = sandbox.window.AM.CATEGORIES;

console.log(`📋 Total de categorías registradas: ${categories.length}`);
console.log(`🎵 Total de canciones en catálogo: ${catalog.length}\n`);

const expectedCats = [
  'song-rock',
  'song-pop',
  'song-rap',
  'song-reggaeton',
  'song-regional',
  'song-baladas',
  'song-electronica',
  'song-cumbia',
  'song-salsa',
  'song-metal',
  'song-kpop',
  'song-country'
];

const bilingualCats = [
  'song-rock',
  'song-pop',
  'song-rap',
  'song-baladas',
  'song-metal',
  'song-electronica'
];

let hasErrors = false;
const seenIds = new Set();
const stats = {};

expectedCats.forEach(c => {
  stats[c] = { es: 0, en: 0, other: 0, total: 0 };
});

catalog.forEach((track, idx) => {
  if (!track.id) {
    console.error(`❌ Pista #${idx}: Falta campo 'id'`);
    hasErrors = true;
  } else if (seenIds.has(track.id)) {
    console.error(`❌ ID Duplicado detectado: ${track.id} (Pista #${idx})`);
    hasErrors = true;
  } else {
    seenIds.add(track.id);
  }

  if (!track.cat || !expectedCats.includes(track.cat)) {
    console.error(`❌ Pista '${track.id}': Categoría inválida o ausente '${track.cat}'`);
    hasErrors = true;
  } else {
    stats[track.cat].total++;
    if (track.lang === 'es') stats[track.cat].es++;
    else if (track.lang === 'en') stats[track.cat].en++;
    else stats[track.cat].other++;
  }

  if (!track.franchise || typeof track.franchise !== 'string') {
    console.error(`❌ Pista '${track.id}': 'franchise' (artista) inválido`);
    hasErrors = true;
  }
  if (!track.game || typeof track.game !== 'string') {
    console.error(`❌ Pista '${track.id}': 'game' (título de canción) inválido`);
    hasErrors = true;
  }
  if (!track.title || typeof track.title !== 'string') {
    console.error(`❌ Pista '${track.id}': 'title' inválido`);
    hasErrors = true;
  }
  if (!track.year || typeof track.year !== 'number') {
    console.error(`❌ Pista '${track.id}': 'year' inválido (${track.year})`);
    hasErrors = true;
  }
  if (!Array.isArray(track.sources) || track.sources.length === 0) {
    console.error(`❌ Pista '${track.id}': 'sources' vacío o inválido`);
    hasErrors = true;
  }
});

console.log('--- Distribución por Género e Idioma ---');
let allQuotasMet = true;

for (const cat of expectedCats) {
  const s = stats[cat];
  const isBilingual = bilingualCats.includes(cat);

  let status = '✅';
  let detail = '';

  if (isBilingual) {
    const esOk = s.es >= 100;
    const enOk = s.en >= 100;
    if (!esOk || !enOk) {
      status = '⚠️ ';
      allQuotasMet = false;
    }
    detail = `[ES: ${s.es}/100, EN: ${s.en}/100, Otros: ${s.other}] Total: ${s.total}`;
  } else {
    const ok = s.total >= 100;
    if (!ok) {
      status = '⚠️ ';
      allQuotasMet = false;
    }
    detail = `[ES: ${s.es}, EN: ${s.en}, Otros: ${s.other}] Total: ${s.total}/100`;
  }

  console.log(`${status} ${cat.padEnd(18)}: ${detail}`);
}

if (hasErrors) {
  console.error('\n❌ Se encontraron errores de integridad en el catálogo.');
  process.exit(1);
}

if (!allQuotasMet) {
  console.log(`\n⚠️  Aún faltan cuotas bilingües por completar en algunas categorías.`);
} else {
  console.log(`\n🎉 ¡Validación exitosa! Todas las cuotas bilingües y categorías están completas (Total: ${catalog.length}).`);
}
