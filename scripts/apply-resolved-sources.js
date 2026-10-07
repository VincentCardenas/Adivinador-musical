const fs = require('fs');
const path = require('path');

/*
 * Aplica el resultado de resolve-sources.js al catálogo:
 *  - aceptadas: reemplaza `sources` por el video real verificado.
 *  - dudosas y pendientes: se retiran del catálogo y se guardan (con su bloque original) en
 *    scripts/pendientes-<catalogo>.json, para poder revisarlas o restaurarlas.
 * Uso: node scripts/apply-resolved-sources.js <anime|caricaturas> [--incluir-dudosas]
 * Recalcula los conteos de las secciones y de la cabecera.
 */
const name = process.argv[2];
const incluirDudosas = process.argv.includes('--incluir-dudosas');
const FILES = { anime: '../js/catalog-anime.js', caricaturas: '../js/catalog-caricaturas.js' };
if (!FILES[name]) { console.error('Uso: node scripts/apply-resolved-sources.js <anime|caricaturas> [--incluir-dudosas]'); process.exit(1); }

const catalogPath = path.join(__dirname, FILES[name]);
const review = JSON.parse(fs.readFileSync(path.join(__dirname, `source-review-${name}.json`), 'utf8'));
const original = fs.readFileSync(catalogPath, 'utf8');
const crlf = original.indexOf('\r\n') >= 0;
const EOL = crlf ? '\r\n' : '\n';

const arreglar = new Map();
review.aceptadas.forEach((r) => arreglar.set(r.id, r.elegido.id));
if (incluirDudosas) review.dudosas.forEach((r) => arreglar.set(r.id, r.elegido.id));
const retirar = new Set(review.pendientes.map((r) => r.id));
if (!incluirDudosas) review.dudosas.forEach((r) => retirar.add(r.id));

const lines = original.split(/\r?\n/);
const salida = [];
const retirados = [];
let arreglados = 0;
let i = 0;
while (i < lines.length) {
  if (/^\s*\{\s*$/.test(lines[i])) {
    let j = i;
    while (j < lines.length && !/^\s*\},?\s*$/.test(lines[j])) j++;
    const bloque = lines.slice(i, j + 1);
    const id = (bloque.join('\n').match(/id:\s*'([^']+)'/) || [])[1];
    if (id && retirar.has(id)) {
      retirados.push({ id: id, bloque: bloque.join('\n') });
    } else if (id && arreglar.has(id)) {
      const idx = bloque.findIndex((l) => /^\s+sources:\s/.test(l));
      if (idx < 0) throw new Error('Pista sin línea sources: ' + id);
      bloque[idx] = `      sources: [yt('${arreglar.get(id)}')],`;
      arreglados++;
      salida.push(...bloque);
    } else {
      salida.push(...bloque);
    }
    i = j + 1;
  } else {
    salida.push(lines[i]);
    i++;
  }
}

// Recalcular conteos por sección y total
const marcador = /^(\s*\/\* ─+ )(.+?)( \(\d+\))( ─+ \*\/)\s*$/;
let total = 0;
for (let k = 0; k < salida.length; k++) {
  const m = salida[k].match(marcador);
  if (!m) continue;
  let n = 0;
  for (let q = k + 1; q < salida.length && !marcador.test(salida[q]) && salida[q] !== '  );'; q++) if (/^\s*\{\s*$/.test(salida[q])) n++;
  total += n;
  salida[k] = `${m[1]}${m[2]} (${n})${m[4]}`;
}
for (let k = 0; k < 12; k++) {
  if (/^ \* Catálogo: .* \(\d+ pistas\)/.test(salida[k])) salida[k] = salida[k].replace(/\(\d+ pistas\)/, `(${total} pistas)`);
}

fs.writeFileSync(catalogPath, salida.join(EOL), 'utf8');
fs.writeFileSync(path.join(__dirname, `pendientes-${name}.json`), JSON.stringify({ generado: new Date().toISOString(), catalogo: name, nota: 'Pistas retiradas por no tener una fuente verificada. Cada una conserva su bloque original (con IDs que NO eran reales).', revision: { dudosas: review.dudosas, pendientes: review.pendientes }, retiradas: retirados.map((r) => r.id) }, null, 2), 'utf8');
console.log(`${name}: ${arreglados} pistas con fuente real aplicada | ${retirados.length} retiradas | total ahora ${total}`);
