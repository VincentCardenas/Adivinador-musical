const fs = require('fs');
const path = require('path');

const catalogFile = path.join(__dirname, '..', 'js', 'catalog-canciones.js');
let content = fs.readFileSync(catalogFile, 'utf8');

const isCrlf = content.includes('\r\n');
const nl = isCrlf ? '\r\n' : '\n';

function formatTrack(t) {
  const franchise = t.franchise.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  const game = t.game.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  const title = t.title.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  const langPart = t.lang ? `, lang: '${t.lang}'` : '';
  
  return `    {${nl}      id: '${t.id}', cat: '${t.cat}', franchise: '${franchise}', game: '${game}',${nl}      title: '${title}', year: ${t.year}${langPart},${nl}      sources: ${t.sources},${nl}    },`;
}

function formatBatch(list) {
  return list.map(formatTrack).join(nl);
}

const rockBatch = JSON.parse(fs.readFileSync('scripts/rock-bilingual-batch.json', 'utf8'));
const popBatch = JSON.parse(fs.readFileSync('scripts/pop-bilingual-batch.json', 'utf8'));
const rapBatch = JSON.parse(fs.readFileSync('scripts/rap-bilingual-batch.json', 'utf8'));
const baladasBatch = JSON.parse(fs.readFileSync('scripts/baladas-bilingual-batch.json', 'utf8'));
const metalBatch = JSON.parse(fs.readFileSync('scripts/metal-bilingual-batch.json', 'utf8'));
const elecBatch = JSON.parse(fs.readFileSync('scripts/electronica-bilingual-batch.json', 'utf8'));

// 1. Rock: insertar antes de Pop (100)
content = content.replace(
  `    /* ───────────── Pop (100) ───────────── */`,
  formatBatch(rockBatch) + `${nl}    /* ───────────── Pop (200) ───────────── */`
);
content = content.replace(
  `    /* ───────────── Rock (100) ───────────── */`,
  `    /* ───────────── Rock (200) ───────────── */`
);

// 2. Pop: insertar antes de Rap y hip-hop (100)
content = content.replace(
  `    /* ───────────── Rap y hip-hop (100) ───────────── */`,
  formatBatch(popBatch) + `${nl}    /* ───────────── Rap y hip-hop (200) ───────────── */`
);

// 3. Rap: insertar antes de Reggaetón (100)
content = content.replace(
  `    /* ───────────── Reggaetón (100) ───────────── */`,
  formatBatch(rapBatch) + `${nl}    /* ───────────── Reggaetón (100) ───────────── */`
);

// 4. Baladas: insertar antes de Electrónica (100)
content = content.replace(
  `    /* ───────────── Electrónica (100) ───────────── */`,
  formatBatch(baladasBatch) + `${nl}    /* ───────────── Electrónica (211) ───────────── */`
);
content = content.replace(
  `    /* ───────────── Baladas (100) ───────────── */`,
  `    /* ───────────── Baladas (200) ───────────── */`
);

// 5. Electrónica: insertar antes de Cumbia (100)
content = content.replace(
  `    /* ───────────── Cumbia (100) ───────────── */`,
  formatBatch(elecBatch) + `${nl}    /* ───────────── Cumbia (100) ───────────── */`
);

// 6. Metal: insertar antes de K-pop (100)
content = content.replace(
  `    /* ───────────── K-pop (100) ───────────── */`,
  formatBatch(metalBatch) + `${nl}    /* ───────────── K-pop (100) ───────────── */`
);
content = content.replace(
  `    /* ───────────── Metal (100) ───────────── */`,
  `    /* ───────────── Metal (205) ───────────── */`
);

// Actualizar cabecera
content = content.replace(
  '* Catálogo: Canciones famosas (1100 pistas en 11 géneros).',
  '* Catálogo: Canciones famosas (1716 pistas en 11 géneros).'
);

fs.writeFileSync(catalogFile, content, 'utf8');
console.log('✅ Catálogo actualizado con las 616 canciones bilingües nuevas.');
