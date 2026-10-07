const fs = require('fs');
const path = require('path');
const vm = require('vm');

const catalogPath = path.join(__dirname, '../js/catalog-caricaturas.js');
const code = fs.readFileSync(catalogPath, 'utf8');

const sandbox = {
  window: {},
  AM: {
    CATEGORIES: [],
    CATALOG: [],
    EXTRA_GAMES: [],
    VERSIONS: [],
  },
  console: console,
};
sandbox.window.AM = sandbox.AM;

try {
  vm.runInNewContext(code, sandbox);
} catch (err) {
  console.error('❌ Error de sintaxis o ejecución al evaluar js/catalog-caricaturas.js:', err);
  process.exit(1);
}

const categories = sandbox.AM.CATEGORIES.filter((c) => c.theme === 'caricaturas');
const catalog = sandbox.AM.CATALOG.filter((c) =>
  ['toon-clasicas', 'toon-80s', 'toon-90s', 'toon-00s', 'toon-10s'].includes(c.cat)
);

console.log(`📋 Categorías de Caricaturas: ${categories.length}`);
console.log(`🧸 Total de caricaturas en catálogo: ${catalog.length}`);

// Validar unicidad de IDs y campos obligatorios
const ids = new Set();
const duplicates = [];
const missingFields = [];
const invalidSources = [];

catalog.forEach((item, index) => {
  if (ids.has(item.id)) {
    duplicates.push({ index, id: item.id, title: item.title });
  } else {
    ids.add(item.id);
  }

  const required = ['id', 'cat', 'franchise', 'game', 'title', 'year', 'platform', 'sources'];
  for (const field of required) {
    if (item[field] === undefined || item[field] === null || item[field] === '') {
      missingFields.push({ index, id: item.id, missing: field });
    }
  }

  if (!Array.isArray(item.sources) || item.sources.length === 0) {
    invalidSources.push({ index, id: item.id, reason: 'sources vacío o no es array' });
  } else {
    item.sources.forEach((s) => {
      if (!s.type || (s.type !== 'youtube' && s.type !== 'itunes')) {
        invalidSources.push({ index, id: item.id, reason: `tipo de fuente inválido: ${s.type}` });
      }
    });
  }
});

if (duplicates.length > 0) {
  console.error('❌ Se encontraron IDs duplicados:', duplicates);
}
if (missingFields.length > 0) {
  console.error('❌ Caricaturas con campos faltantes:', missingFields);
}
if (invalidSources.length > 0) {
  console.error('❌ Caricaturas con fuentes inválidas:', invalidSources);
}

// Estadísticas por época
const byCat = {};
categories.forEach((cat) => {
  byCat[cat.id] = catalog.filter((c) => c.cat === cat.id);
});

console.log('\n--- Distribución por Épocas en Caricaturas ---');
Object.entries(byCat).forEach(([catId, items]) => {
  console.log(`📁 ${catId.padEnd(16)}: ${items.length} pistas`);
});

const totalErrors = duplicates.length + missingFields.length + invalidSources.length;
if (totalErrors > 0) {
  console.error(`\n❌ Se encontraron ${totalErrors} errores en la validación estructural.`);
  process.exit(1);
}

console.log(`\n🎉 ¡Validación estructural exitosa! Todas las pistas tienen metadatos íntegros y fuentes formalmente válidas.`);

if (!process.argv.includes('--offline')) {
  console.log('\n🔍 Realizando auditoría de fuentes reales contra la red...');
  const { execSync } = require('child_process');
  try {
    execSync('node ' + path.join(__dirname, 'audit-sources.js') + ' caricaturas', { stdio: 'inherit' });
    console.log('\n✅ Auditoría de red pasada. Las fuentes existen y los títulos coinciden.');
  } catch (e) {
    console.error('\n❌ La auditoría de fuentes falló. Revisa el reporte para ver qué IDs están rotos o tienen títulos incorrectos.');
    process.exit(1);
  }
} else {
  console.log('⚠️ Auditoría de red omitida por flag --offline.');
}
