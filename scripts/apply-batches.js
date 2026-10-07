const fs = require('fs');
const path = require('path');

const catalogFile = path.join(__dirname, '..', 'js', 'catalog-canciones.js');
let content = fs.readFileSync(catalogFile, 'utf8');

const batches = JSON.parse(fs.readFileSync(path.join(__dirname, 'all-batches.json'), 'utf8'));

function formatTrack(t) {
  const franchise = t.franchise.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  const game = t.game.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  const title = t.title.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  const langPart = t.lang ? `, lang: '${t.lang}'` : '';
  
  return `    {\n      id: '${t.id}', cat: '${t.cat}', franchise: '${franchise}', game: '${game}',\n      title: '${title}', year: ${t.year}${langPart},\n      sources: ${t.sources},\n    },`;
}

function formatBatch(list) {
  return list.map(formatTrack).join('\n');
}

// 1. Rock: insertar antes de /* ───────────── Pop (70) ───────────── */
const rockFormatted = formatBatch(batches['song-rock']);
content = content.replace(
  '    /* ───────────── Pop (70) ───────────── */',
  rockFormatted + '\n    /* ───────────── Pop (100) ───────────── */'
);
content = content.replace(
  '    /* ───────────── Rock (50) ───────────── */',
  '    /* ───────────── Rock (100) ───────────── */'
);

// 2. Pop: insertar antes de /* ───────────── Rap y hip-hop (50) ───────────── */
const popFormatted = formatBatch(batches['song-pop']);
content = content.replace(
  '    /* ───────────── Rap y hip-hop (50) ───────────── */',
  popFormatted + '\n    /* ───────────── Rap y hip-hop (100) ───────────── */'
);

// 3. Rap: insertar antes de /* ───────────── Reggaetón (50) ───────────── */
const rapFormatted = formatBatch(batches['song-rap']);
content = content.replace(
  '    /* ───────────── Reggaetón (50) ───────────── */',
  rapFormatted + '\n    /* ───────────── Reggaetón (100) ───────────── */'
);

// 4. Reggaetón: insertar antes de /* ───────────── Regional mexicano (50) ───────────── */
const reggaetonFormatted = formatBatch(batches['song-reggaeton']);
content = content.replace(
  '    /* ───────────── Regional mexicano (50) ───────────── */',
  reggaetonFormatted + '\n    /* ───────────── Regional mexicano (100) ───────────── */'
);

// 5. Regional: insertar antes de /* ───────────── Baladas (50) ───────────── */
const regionalFormatted = formatBatch(batches['song-regional']);
content = content.replace(
  '    /* ───────────── Baladas (50) ───────────── */',
  regionalFormatted + '\n    /* ───────────── Baladas (100) ───────────── */'
);

// 6. Baladas: insertar antes de /* ───────────── Electrónica (50) ───────────── */
const baladasFormatted = formatBatch(batches['song-baladas']);
content = content.replace(
  '    /* ───────────── Electrónica (50) ───────────── */',
  baladasFormatted + '\n    /* ───────────── Electrónica (100) ───────────── */'
);

// 7. Electrónica: insertar antes de /* ───────────── Cumbia (50) ───────────── */
const electronicaFormatted = formatBatch(batches['song-electronica']);
content = content.replace(
  '    /* ───────────── Cumbia (50) ───────────── */',
  electronicaFormatted + '\n    /* ───────────── Cumbia (100) ───────────── */'
);

// 8. Cumbia: insertar antes de /* ───────────── Salsa (50) ───────────── */
const cumbiaFormatted = formatBatch(batches['song-cumbia']);
content = content.replace(
  '    /* ───────────── Salsa (50) ───────────── */',
  cumbiaFormatted + '\n    /* ───────────── Salsa (100) ───────────── */'
);

// 9. Salsa: insertar antes de /* ───────────── Metal (50) ───────────── */
const salsaFormatted = formatBatch(batches['song-salsa']);
content = content.replace(
  '    /* ───────────── Metal (50) ───────────── */',
  salsaFormatted + '\n    /* ───────────── Metal (100) ───────────── */'
);

// 10. Metal: insertar antes de /* ───────────── K-pop (50) ───────────── */
const metalFormatted = formatBatch(batches['song-metal']);
content = content.replace(
  '    /* ───────────── K-pop (50) ───────────── */',
  metalFormatted + '\n    /* ───────────── K-pop (100) ───────────── */'
);

// 11. K-pop: insertar al final de AM.CATALOG.push( ... );
const kpopFormatted = formatBatch(batches['song-kpop']);
content = content.replace(
  '    },\n  );\n\n  // Señuelos: aparecen como opciones incorrectas',
  '    },\n' + kpopFormatted + '\n  );\n\n  // Señuelos: aparecen como opciones incorrectas'
);

// Actualizar comentario inicial
content = content.replace(
  '* Catálogo: Canciones famosas (570 pistas en 11 géneros).',
  '* Catálogo: Canciones famosas (1100 pistas en 11 géneros).'
);

fs.writeFileSync(catalogFile, content, 'utf8');
console.log('✅ Archivo js/catalog-canciones.js actualizado con las 530 canciones nuevas.');
