/**
 * Revisa el filtro de nicknames ofensivos del ranking:
 *  - que las listas de js/scores.js (isOffensive) sean idénticas a las de supabase/schema.sql (nick_ofensivo);
 *  - que bloquee los ejemplos de BLOQUEAR y deje pasar los de PERMITIR (palabras normales que contienen
 *    pedazos de groserías, nombres comunes, apodos con números…).
 * Uso: node scripts/validate-nick-filter.js   (con --json imprime los ejemplos para probarlos en la base)
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const sandbox = { window: { AM: {} }, console, URLSearchParams, setTimeout, clearTimeout };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'js', 'scores.js'), 'utf8'), sandbox);
const Scores = sandbox.window.AM.Scores;
const sql = fs.readFileSync(path.join(ROOT, 'supabase', 'schema.sql'), 'utf8');

const BLOQUEAR = [
  'N1gg3rs', 'niggaKing', 'n.i.g.g.a', 'Faggot', 'Maricón', 'Joto', 'ElPutoAmo', 'PUTO', 'put0', 'Puta123',
  'Pendejo', 'P3nd3j0', 'Culero', 'chingatumadre', 'Hijo de puta', 'Hitler', 'H1tl3r', 'Sieg Heil', 'KKK', 'nazi',
  'Verga', 'FuckYou', 'f.u.c.k', 'Fuuuck', 'Bitch', 'Mierda', 'Sudaca', 'beaner', 'Violador', 'Malparido',
  'Gilipollas', 'shit', 'Bullshit', 'pussy', 'whore', 'retard', 'mayate', 'hdp', 'ptm', 'Chinga', 'chingada',
];
const PERMITIR = [
  'Vins', 'Meewi', 'Vincina', 'Meeshis', 'Computadora', 'Maricarmen', 'Vergara', 'Vergüenza', 'Nigeria', 'Niger',
  'Kike', 'Paquita', 'Chingon', 'ElChingon', 'Negro', 'El Negro', 'Pinche Juan', 'Cabron', 'Shitzu', 'Shiitake',
  'Disputa', 'Imputado', 'Calculo', 'Vehiculo', 'Ridiculo', 'Culiacan', 'Culebra', 'Putla', 'Scunthorpe', 'Hancock',
  'Cocktail', 'Dickens', 'Grape', 'Retardo', 'Spice', 'Spicy', 'Raccoon', 'Nazareno', 'Heilig', 'Rapero', 'Troll',
  'Pendragon', 'Masculino', 'Isidoro', 'Assassin', 'Fukushima', 'Mishita', 'Sudamericano', 'Beanie', 'Jota',
  'Juan2007', 'Pro3000', 'Ana1234', 'Xx_Killer_xX', 'Sk8er', 'Naruto', 'Goku', 'La Jefa', 'Don Gato', 'Gay',
];

if (process.argv.includes('--json')) {
  console.log(JSON.stringify({ bloquear: BLOQUEAR, permitir: PERMITIR }));
  process.exit(0);
}

const errors = [];
const { palabras, pegadas } = Scores.NICK_RULES;
if (!sql.includes(`'${palabras}'::text as palabras`)) errors.push('La lista de PALABRAS de js/scores.js no es igual a la de supabase/schema.sql.');
if (!sql.includes(`'${pegadas}'::text as pegadas`)) errors.push('La lista de PEGADAS de js/scores.js no es igual a la de supabase/schema.sql.');
BLOQUEAR.forEach((n) => { if (!Scores.isOffensive(n)) errors.push(`Debería bloquear: ${n}`); });
PERMITIR.forEach((n) => { if (Scores.isOffensive(n)) errors.push(`No debería bloquear: ${n}`); });
[...BLOQUEAR, ...PERMITIR].forEach((n) => { if (!Scores.cleanNick(n)) errors.push(`Ejemplo con caracteres no válidos: ${n}`); });

if (errors.length) {
  console.error('❌ Filtro de nicknames:\n' + errors.map((e) => '  - ' + e).join('\n'));
  process.exit(1);
}
console.log(`✅ Filtro de nicknames: listas iguales en el juego y en la base; ${BLOQUEAR.length} ejemplos bloqueados y ${PERMITIR.length} permitidos.`);
