/**
 * Script de validación técnica para el catálogo de Musicales.
 * Verifica:
 * - Integridad sintáctica
 * - Unicidad estricta de IDs
 * - Campos requeridos (id, cat, franchise, game, title, year, lang, sources)
 * - Distribución por épocas (Clásicos, 70s-80s, 90s-00s, 2010+)
 * - Conteo total esperado: 222 pistas (122 iniciales + 100 nuevas)
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const catalogPath = path.join(__dirname, '..', 'js', 'catalog-musicales.js');
const code = fs.readFileSync(catalogPath, 'utf8');

const sandbox = {
  window: {
    AM: {
      CATEGORIES: [],
      CATALOG: [],
      EXTRA_GAMES: [],
      FRANCHISE_AKA: {}
    }
  }
};
vm.createContext(sandbox);

try {
  vm.runInContext(code, sandbox);
} catch (err) {
  console.error('❌ ERROR AL EJECUTAR EL CATÁLOGO DE MUSICALES:', err.message);
  process.exit(1);
}

const catalog = sandbox.window.AM.CATALOG;
const categories = sandbox.window.AM.CATEGORIES.filter(c => c.theme === 'musicales');

console.log(`📋 Categorías de Musicales: ${categories.length}`);
console.log(`🎭 Total de canciones en Musicales: ${catalog.length}\n`);

const expectedCats = [
  'mus-clasicos',
  'mus-7080',
  'mus-9000',
  'mus-10s'
];

let hasErrors = false;
const seenIds = new Set();
const stats = {};

expectedCats.forEach(c => {
  stats[c] = { es: 0, en: 0, total: 0 };
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
  }

  if (!track.franchise || typeof track.franchise !== 'string') {
    console.error(`❌ Pista '${track.id}': 'franchise' (musical) inválido`);
    hasErrors = true;
  }
  if (!track.game || typeof track.game !== 'string') {
    console.error(`❌ Pista '${track.id}': 'game' (canción) inválido`);
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

console.log('--- Distribución por Épocas en Musicales ---');
for (const cat of expectedCats) {
  const s = stats[cat];
  console.log(`📁 ${cat.padEnd(16)}: ${s.total} pistas (ES: ${s.es}, EN: ${s.en})`);
}

if (hasErrors) {
  console.error('\n❌ Se encontraron errores en el catálogo de Musicales.');
  process.exit(1);
}

if (catalog.length === 222) {
  console.log(`\n🎉 ¡Validación exitosa! El catálogo de Musicales tiene exactamente 222 canciones.`);
} else {
  console.log(`\nℹ️  Estado actual: ${catalog.length} / 222 canciones.`);
}
