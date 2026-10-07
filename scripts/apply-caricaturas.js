const fs = require('fs');
const path = require('path');

const catalogPath = path.join(__dirname, '../js/catalog-caricaturas.js');
const batchPath = path.join(__dirname, 'caricaturas-200-batch.json');

const batch = JSON.parse(fs.readFileSync(batchPath, 'utf8'));
let content = fs.readFileSync(catalogPath, 'utf8');

function formatSong(song) {
  const parts = [];
  parts.push(`    {\n`);
  parts.push(`      id: '${song.id}', cat: '${song.cat}', franchise: ${JSON.stringify(song.franchise)}, game: ${JSON.stringify(song.game)},\n`);
  parts.push(`      title: ${JSON.stringify(song.title)}, composer: ${JSON.stringify(song.composer)}, year: ${song.year}, platform: ${JSON.stringify(song.platform)},\n`);
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
  ' * Catálogo: Caricaturas (106 pistas).',
  ' * Catálogo: Caricaturas (306 pistas).'
);

// Marcadores de división
const markerClasicas = '/* ───────────── Clásicas (antes de 1980) (12) ───────────── */';
const marker80s = '/* ───────────── Años 80 (11) ───────────── */';
const marker90s = '/* ───────────── Años 90 (28) ───────────── */';
const marker00s = '/* ───────────── 2000s (31) ───────────── */';
const marker10s = '/* ───────────── 2010 en adelante (24) ───────────── */';

const markerCatalogEndLF = '  );\n\n  // Señuelos: aparecen como opciones incorrectas y en el buscador de Experto.';
const markerCatalogEndCRLF = '  );\r\n\r\n  // Señuelos: aparecen como opciones incorrectas y en el buscador de Experto.';

if (!content.includes(markerClasicas)) throw new Error('No se encontró markerClasicas');
if (!content.includes(marker80s)) throw new Error('No se encontró marker80s');
if (!content.includes(marker90s)) throw new Error('No se encontró marker90s');
if (!content.includes(marker00s)) throw new Error('No se encontró marker00s');
if (!content.includes(marker10s)) throw new Error('No se encontró marker10s');

// 2. Insertar lote Clásicas antes de marker80s
content = content.replace(
  markerClasicas,
  '/* ───────────── Clásicas (antes de 1980) (52) ───────────── */'
);
const clasicasBlock = formatSection(batch['toon-clasicas']);
content = content.replace(
  marker80s,
  clasicasBlock + '    ' + marker80s
);

// 3. Insertar lote Años 80 antes de marker90s
content = content.replace(
  marker80s,
  '/* ───────────── Años 80 (51) ───────────── */'
);
const block80s = formatSection(batch['toon-80s']);
content = content.replace(
  marker90s,
  block80s + '    ' + marker90s
);

// 4. Insertar lote Años 90 antes de marker00s
content = content.replace(
  marker90s,
  '/* ───────────── Años 90 (68) ───────────── */'
);
const block90s = formatSection(batch['toon-90s']);
content = content.replace(
  marker00s,
  block90s + '    ' + marker00s
);

// 5. Insertar lote 2000s antes de marker10s
content = content.replace(
  marker00s,
  '/* ───────────── 2000s (71) ───────────── */'
);
const block00s = formatSection(batch['toon-00s']);
content = content.replace(
  marker10s,
  block00s + '    ' + marker10s
);

// 6. Insertar lote 2010s antes de cierre del catálogo
content = content.replace(
  marker10s,
  '/* ───────────── 2010 en adelante (64) ───────────── */'
);
const block10s = formatSection(batch['toon-10s']);

if (content.includes(markerCatalogEndCRLF)) {
  content = content.replace(markerCatalogEndCRLF, block10s + markerCatalogEndCRLF);
} else if (content.includes(markerCatalogEndLF)) {
  content = content.replace(markerCatalogEndLF, block10s + markerCatalogEndLF);
} else {
  const closingIdx = content.indexOf('  );\n  // Señuelos') !== -1
    ? content.indexOf('  );\n  // Señuelos')
    : content.indexOf('  );\r\n  // Señuelos');
  if (closingIdx === -1) {
    throw new Error('No se encontró el cierre de AM.CATALOG.push en catalog-caricaturas.js');
  }
  content = content.slice(0, closingIdx) + block10s + content.slice(closingIdx);
}

fs.writeFileSync(catalogPath, content, 'utf8');
console.log('✅ Inserción de 200 caricaturas en español latino completada exitosamente.');
