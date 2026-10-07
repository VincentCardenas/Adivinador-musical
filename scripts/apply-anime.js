const fs = require('fs');
const path = require('path');

const catalogPath = path.join(__dirname, '../js/catalog-anime.js');
const batchPath = path.join(__dirname, 'anime-200-batch.json');

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
  let srcStr = song.sources;
  srcStr = srcStr.replace(/apple\((\d+)\)/g, "apple({ song: $1, country: 'mx' })");
  srcStr = srcStr.replace(/appleJp\((\d+)\)/g, "apple({ song: $1, country: 'jp' })");
  parts.push(`      sources: ${srcStr},\n`);
  parts.push(`    },\n`);
  return parts.join('');
}

function formatSection(songs) {
  return songs.map(formatSong).join('');
}

// 1. Reemplazar encabezado
content = content.replace(
  ' * Catálogo: Anime (56 pistas).',
  ' * Catálogo: Anime (256 pistas).'
);

// Marcadores de división
const markerClasicos = '/* ───────────── Clásicos (antes de 1990) (8) ───────────── */';
const marker90s = '/* ───────────── Años 90 (10) ───────────── */';
const marker00s = '/* ───────────── 2000s (11) ───────────── */';
const marker10s = '/* ───────────── 2010s (14) ───────────── */';
const marker20s = '/* ───────────── 2020 en adelante (13) ───────────── */';

const markerCatalogEndLF = '  );\n\n  // Señuelos: aparecen como opciones incorrectas y en el buscador de Experto.';
const markerCatalogEndCRLF = '  );\r\n\r\n  // Señuelos: aparecen como opciones incorrectas y en el buscador de Experto.';

if (!content.includes(markerClasicos)) throw new Error('No se encontró markerClasicos');
if (!content.includes(marker90s)) throw new Error('No se encontró marker90s');
if (!content.includes(marker00s)) throw new Error('No se encontró marker00s');
if (!content.includes(marker10s)) throw new Error('No se encontró marker10s');
if (!content.includes(marker20s)) throw new Error('No se encontró marker20s');

// 2. Insertar lote Clásicos antes de marker90s
content = content.replace(
  markerClasicos,
  '/* ───────────── Clásicos (antes de 1990) (48) ───────────── */'
);
const clasicosBlock = formatSection(batch['anime-clasicos']);
content = content.replace(
  marker90s,
  clasicosBlock + '    ' + marker90s
);

// 3. Insertar lote Años 90 antes de marker00s
content = content.replace(
  marker90s,
  '/* ───────────── Años 90 (50) ───────────── */'
);
const block90s = formatSection(batch['anime-90s']);
content = content.replace(
  marker00s,
  block90s + '    ' + marker00s
);

// 4. Insertar lote 2000s antes de marker10s
content = content.replace(
  marker00s,
  '/* ───────────── 2000s (51) ───────────── */'
);
const block00s = formatSection(batch['anime-00s']);
content = content.replace(
  marker10s,
  block00s + '    ' + marker10s
);

// 5. Insertar lote 2010s antes de marker20s
content = content.replace(
  marker10s,
  '/* ───────────── 2010s (54) ───────────── */'
);
const block10s = formatSection(batch['anime-10s']);
content = content.replace(
  marker20s,
  block10s + '    ' + marker20s
);

// 6. Insertar lote 2020s antes de cierre del catálogo
content = content.replace(
  marker20s,
  '/* ───────────── 2020 en adelante (53) ───────────── */'
);
const block20s = formatSection(batch['anime-20s']);

if (content.includes(markerCatalogEndCRLF)) {
  content = content.replace(markerCatalogEndCRLF, block20s + markerCatalogEndCRLF);
} else if (content.includes(markerCatalogEndLF)) {
  content = content.replace(markerCatalogEndLF, block20s + markerCatalogEndLF);
} else {
  const closingIdx = content.indexOf('  );\n  // Señuelos') !== -1
    ? content.indexOf('  );\n  // Señuelos')
    : content.indexOf('  );\r\n  // Señuelos');
  if (closingIdx === -1) {
    throw new Error('No se encontró el cierre de AM.CATALOG.push en catalog-anime.js');
  }
  content = content.slice(0, closingIdx) + block20s + content.slice(closingIdx);
}

fs.writeFileSync(catalogPath, content, 'utf8');
console.log('✅ Inserción de 200 openings de Anime en js/catalog-anime.js completada con éxito.');
