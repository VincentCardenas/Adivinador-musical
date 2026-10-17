// Uso: node scripts/edit-literal.js <archivo.json con [{file, pairs:[[a,b],...]}]>
// Reemplaza texto literal (cada "a" debe aparecer exactamente una vez). Mantiene LF.
'use strict';
const fs = require('fs');
const spec = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
for (const { file, pairs } of spec) {
  let t = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  for (const [a, b] of pairs) {
    const n = t.split(a).length - 1;
    if (n !== 1) throw new Error(`${file}: "${a.slice(0, 80)}" aparece ${n} veces`);
    t = t.replace(a, () => b);
  }
  fs.writeFileSync(file, t);
  console.log(`✔ ${file}: ${pairs.length} cambios`);
}
