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

const kpopFormatted = batches['song-kpop'].map(formatTrack).join('\n');

// Detect line ending
const isCrlf = content.includes('\r\n');
const nl = isCrlf ? '\r\n' : '\n';

content = content.replace(
  /\/\* ───────────── K-pop \(50\) ───────────── \*\//,
  '/* ───────────── K-pop (100) ───────────── */'
);

const target = `    sources: [...am(1770545875, 1781140575, 1773694544), ...busca('aespa', 'Supernova')],${nl}    },`;
const replacement = target + nl + kpopFormatted;

if (!content.includes(target)) {
  console.error('Target not found for K-pop insertion!');
  process.exit(1);
}

content = content.replace(target, replacement);

fs.writeFileSync(catalogFile, content, 'utf8');
console.log('✅ K-pop insertado exitosamente (50 nuevas pistas añadidas).');
