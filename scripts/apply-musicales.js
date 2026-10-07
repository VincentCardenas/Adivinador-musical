const fs = require('fs');
const path = require('path');

const catalogPath = path.join(__dirname, '../js/catalog-musicales.js');
const batchPath = path.join(__dirname, 'musicales-100-batch.json');

const batch = JSON.parse(fs.readFileSync(batchPath, 'utf8'));
let content = fs.readFileSync(catalogPath, 'utf8');

function formatSong(song) {
  const parts = [];
  parts.push(`    {\n`);
  parts.push(`      id: '${song.id}', cat: '${song.cat}', franchise: ${JSON.stringify(song.franchise)}, game: ${JSON.stringify(song.game)},\n`);
  parts.push(`      title: ${JSON.stringify(song.title)}, composer: ${JSON.stringify(song.composer)}, year: ${song.year}, platform: ${JSON.stringify(song.platform)}, lang: '${song.lang}',\n`);
  if (song.aka && Array.isArray(song.aka) && song.aka.length > 0) {
    parts.push(`      aka: ${JSON.stringify(song.aka)},\n`);
  }
  parts.push(`      sources: ${song.sources},\n`);
  parts.push(`    },\n`);
  return parts.join('');
}

function formatSection(songs) {
  return songs.map(formatSong).join('');
}

// 1. Reemplazar encabezado
content = content.replace(
  ' * Catálogo: Musicales (122 pistas: 102 en su grabación original y 20 en español).',
  ' * Catálogo: Musicales (222 pistas: 200 en su grabación original y 22 en español).'
);

// 2. Sección Clásicos (31 -> 56)
const markerClasicos = '/* ───────────── Clásicos (antes de 1970) (31) ───────────── */';
const marker7080 = '/* ───────────── 70s y 80s (36) ───────────── */';
const marker9000 = '/* ───────────── 90s y 2000s (27) ───────────── */';
const marker10s = '/* ───────────── 2010 en adelante (28) ───────────── */';
const markerCatalogEnd = '  );\n\n  // Señuelos: aparecen como opciones incorrectas';
const markerCatalogEndCRLF = '  );\r\n\r\n  // Señuelos: aparecen como opciones incorrectas';

if (!content.includes(markerClasicos)) throw new Error('No se encontró markerClasicos');
if (!content.includes(marker7080)) throw new Error('No se encontró marker7080');
if (!content.includes(marker9000)) throw new Error('No se encontró marker9000');
if (!content.includes(marker10s)) throw new Error('No se encontró marker10s');

content = content.replace(
  markerClasicos,
  '/* ───────────── Clásicos (antes de 1970) (56) ───────────── */'
);

// Insertar lote de clásicos antes de marker7080
const clasicosBlock = formatSection(batch['mus-clasicos']);
content = content.replace(
  marker7080,
  clasicosBlock + '    ' + marker7080
);

content = content.replace(
  marker7080,
  '/* ───────────── 70s y 80s (61) ───────────── */'
);

// Insertar lote de 70s y 80s antes de marker9000
const block7080 = formatSection(batch['mus-7080']);
content = content.replace(
  marker9000,
  block7080 + '    ' + marker9000
);

content = content.replace(
  marker9000,
  '/* ───────────── 90s y 2000s (52) ───────────── */'
);

// Insertar lote de 90s y 2000s antes de marker10s
const block9000 = formatSection(batch['mus-9000']);
content = content.replace(
  marker10s,
  block9000 + '    ' + marker10s
);

content = content.replace(
  marker10s,
  '/* ───────────── 2010 en adelante (53) ───────────── */'
);

// Insertar lote de 2010s antes de cierre de catálogo
const block10s = formatSection(batch['mus-10s']);

if (content.includes(markerCatalogEndCRLF)) {
  content = content.replace(markerCatalogEndCRLF, block10s + markerCatalogEndCRLF);
} else if (content.includes(markerCatalogEnd)) {
  content = content.replace(markerCatalogEnd, block10s + markerCatalogEnd);
} else {
  // Búsqueda flexible de final de push
  const closingIdx = content.indexOf('  );\n  // Señuelos') !== -1 
    ? content.indexOf('  );\n  // Señuelos') 
    : content.indexOf('  );\r\n  // Señuelos');
  if (closingIdx === -1) {
    throw new Error('No se encontró el cierre de AM.CATALOG.push');
  }
  content = content.slice(0, closingIdx) + block10s + content.slice(closingIdx);
}

fs.writeFileSync(catalogPath, content, 'utf8');
console.log('✅ Inserción de las 100 canciones de Musicales completada exitosamente.');
