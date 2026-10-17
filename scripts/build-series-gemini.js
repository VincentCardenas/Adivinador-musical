const fs = require('fs');
const path = require('path');
const vm = require('vm');

/*
 * Agrega a js/catalog-series.js las series que propuso Gemini y que pasaron la revisión.
 * Uso: node scripts/build-series-gemini.js
 *
 * Gemini no tenía cómo comprobar el audio y marcó todo con "confianza alta", así que cada serie
 * pasó por una revisión de audio (¿es la entrada?, ¿es la grabación de la tele o un cover?) y otra
 * de público (¿se conoce en México?, ¿el nombre es el de México?). Aquí solo quedan las aprobadas;
 * las descartadas se anotan en DESCARTADAS con el motivo.
 *
 * Nunca se escriben IDs: las fuentes son búsquedas en Apple Music (`buscaTv`) que el juego resuelve
 * en el navegador con las reglas de js/sources.js (título + álbum o artista; descarta covers).
 * Lo que no suene se detecta con "🛠 Verificar catálogo" en el juego.
 * Es reanudable: no vuelve a agregar un id que ya está en el catálogo.
 */
const ROOT = path.join(__dirname, '..');
const CATALOG = path.join(ROOT, 'js', 'catalog-series.js');
const LOTES = ['series-gemini-1.json'];
const TVT = "Television's Greatest Hits"; // recopilaciones de TVT Records con las grabaciones de la tele

/* Por número de Gemini: lo que se usa. `title` es lo que se muestra; `match` son los nombres que
   puede tener la pista en Apple; `artist` y `album` sirven para aceptarla y no aceptar covers. */
const APROBADAS = {
  1: {
    3: { serie: 'La isla de Gilligan', aka: ["Gilligan's Island"], title: "The Ballad of Gilligan's Isle", composer: 'The Wellingtons', match: ["The Ballad of Gilligan's Isle", "Gilligan's Island"], artist: ['The Wellingtons', 'The Eligibles'], album: [TVT] },
    4: { serie: 'Mi bella genio', aka: ['I Dream of Jeannie'], title: 'Jeannie', composer: 'Hugo Montenegro', match: ['Jeannie', 'I Dream of Jeannie'], artist: ['Hugo Montenegro'], album: [TVT] },
    5: { serie: 'El superagente 86', aka: ['Get Smart'], title: 'Get Smart Theme', composer: 'Irving Szathmary', match: ['Theme from Get Smart', 'Get Smart Theme', 'Get Smart'], artist: ['Irving Szathmary'], album: [TVT] },
    6: { serie: 'El show de Benny Hill', aka: ['The Benny Hill Show', 'Benny Hill'], title: 'Yakety Sax', composer: 'Boots Randolph', match: ['Yakety Sax'], artist: ['Boots Randolph'], album: ['Yakety Sax'] },
    7: { serie: 'La familia Ingalls', aka: ['Little House on the Prairie', 'La pequeña casa en la pradera'], title: 'Little House on the Prairie Theme', composer: 'David Rose', match: ['Little House on the Prairie Main Title', 'Little House on the Prairie Theme', 'Little House on the Prairie'], artist: ['David Rose'], album: [TVT, 'Little House on the Prairie'] },
    8: { serie: 'El hombre nuclear', aka: ['The Six Million Dollar Man', 'El hombre de los seis millones de dólares'], title: 'The Six Million Dollar Man Theme', composer: 'Oliver Nelson', match: ['Theme from The Six Million Dollar Man', 'The Six Million Dollar Man Theme', 'The Six Million Dollar Man'], artist: ['Oliver Nelson'], album: [TVT] },
    9: { serie: 'La mujer maravilla', aka: ['Wonder Woman'], title: 'Wonder Woman', composer: 'Charles Fox y Norman Gimbel', match: ['Wonder Woman', 'Wonder Woman Theme', 'Theme from Wonder Woman'], artist: ['Charles Fox'], album: [TVT] },
    10: { serie: 'Los ángeles de Charlie', aka: ["Charlie's Angels"], title: "Charlie's Angels Theme", composer: 'Jack Elliott y Allyn Ferguson', match: ["Theme from Charlie's Angels", "Charlie's Angels Theme", "Charlie's Angels"], artist: ['Jack Elliott', 'Allyn Ferguson'], album: [TVT] },
    12: { serie: 'El increíble Hulk (1977)', aka: ['The Incredible Hulk', 'El increíble Hulk'], title: 'The Lonely Man', composer: 'Joe Harnell', match: ['The Lonely Man Theme', 'The Lonely Man'], artist: ['Joe Harnell'], album: ['The Incredible Hulk'] },
    13: { serie: 'CHiPs', aka: ['CHiPs: Patrulla motorizada', 'Patrulla motorizada'], title: 'CHiPs Theme', composer: 'John Parker', match: ['Theme from CHiPs', 'CHiPs Theme', 'CHiPs'], artist: ['John Parker'], album: [TVT] },
    14: { serie: 'Blanco y negro', aka: ["Diff'rent Strokes", 'Arnold'], title: "It Takes Diff'rent Strokes", composer: 'Alan Thicke', match: ["It Takes Diff'rent Strokes", "It Takes a Diff'rent Strokes", "Diff'rent Strokes"], artist: ['Alan Thicke'], album: [TVT] },
    16: { serie: 'Los Duques de Hazzard', aka: ['The Dukes of Hazzard'], title: "Good Ol' Boys", composer: 'Waylon Jennings', match: ["Theme from The Dukes of Hazzard (Good Ol' Boys)", "Good Ol' Boys"], artist: ['Waylon Jennings'], album: ['Music Man', 'The Dukes of Hazzard'] },
    17: { serie: 'Magnum', aka: ['Magnum, P.I.', 'Magnum P.I.'], title: 'Theme from Magnum P.I.', composer: 'Mike Post', match: ['Theme from Magnum P.I.', 'Magnum P.I.', 'Magnum, P.I.'], artist: ['Mike Post'], album: ['Television Theme Songs', TVT] },
    20: { serie: 'Luz de luna', aka: ['Moonlighting'], title: 'Moonlighting', composer: 'Al Jarreau', match: ['Moonlighting (Theme)', 'Moonlighting'], artist: ['Al Jarreau'], album: ['Moonlighting'] },
    21: { serie: 'Alf', aka: ['ALF'], title: 'ALF Theme', composer: 'Alf Clausen', match: ['Theme from ALF', 'ALF Theme', 'ALF'], artist: ['Alf Clausen'], album: [TVT] },
    24: { serie: 'Beverly Hills 90210', aka: ['Beverly Hills, 90210', 'Sensación de vivir'], title: 'Beverly Hills, 90210 Theme', composer: 'John E. Davis', match: ['Theme from Beverly Hills, 90210', 'Beverly Hills, 90210 Theme', 'Beverly Hills 90210'], artist: ['John E. Davis'], album: [TVT, 'Beverly Hills, 90210'] },
    25: { serie: 'Mr. Bean', aka: ['Mister Bean'], title: 'Ecce homo qui est faba', composer: 'Howard Goodall', match: ['Ecce homo qui est faba', 'Mr. Bean Theme', 'Mr. Bean'], artist: ['Howard Goodall', 'Southwark Cathedral', 'Christ Church'], album: ['Mr. Bean'] },
    26: { serie: 'Dinosaurios', aka: ['Dinosaurs'], title: 'Dinosaurs Theme', composer: 'Bruce Broughton', match: ['Dinosaurs Main Title', 'Dinosaurs Theme', 'Dinosaurs'], artist: ['Bruce Broughton'], album: [TVT] },
    28: { serie: 'Highlander', aka: ['Highlander: The Series', 'Highlander: El inmortal'], title: 'Princes of the Universe', composer: 'Queen', platform: 'Sindicación', match: ['Princes of the Universe'], artist: ['Queen'], album: ['A Kind of Magic'] },
    29: { serie: 'La niñera', aka: ['The Nanny'], title: 'The Nanny Named Fran', composer: 'Ann Hampton Callaway', match: ['The Nanny Named Fran', 'The Nanny'], artist: ['Ann Hampton Callaway'], album: [TVT] },
    32: { serie: 'Corazón salvaje', aka: [], title: 'Corazón salvaje', composer: 'Mijares', match: ['Corazón salvaje'], artist: ['Mijares'], album: ['Encadenado'] },
    33: { serie: 'Marimar', aka: [], title: 'Marimar', composer: 'Thalía', match: ['Marimar'], artist: ['Thalía'], album: ['En éxtasis'] },
    35: { serie: 'María la del barrio', aka: [], title: 'María la del barrio', composer: 'Thalía', match: ['María la del barrio'], artist: ['Thalía'], album: ['En éxtasis'] },
    36: { serie: 'Escalofríos', aka: ['Goosebumps', 'Pesadillas'], title: 'Goosebumps Theme', composer: 'Jack Lenz', match: ['Goosebumps Theme', 'Theme from Goosebumps', 'Goosebumps Main Title'], artist: ['Jack Lenz'], album: ['Goosebumps'] },
    37: { serie: 'Xena: la princesa guerrera', aka: ['Xena: Warrior Princess', 'Xena'], title: 'Xena: Warrior Princess Main Title', composer: 'Joseph LoDuca', platform: 'Sindicación', match: ['Main Title (from "Xena: Warrior Princess")', 'Xena: Warrior Princess Main Title', 'Xena: Warrior Princess Theme', 'Xena: Warrior Princess'], artist: ['Joseph LoDuca'], album: ['Xena: Warrior Princess', 'Xena'] },
    41: { serie: 'La usurpadora', aka: [], title: 'La usurpadora', composer: 'Pandora', match: ['La usurpadora'], artist: ['Pandora'], album: [] },
    42: { serie: 'Muñeca brava', aka: [], title: 'Cambio dolor', composer: 'Natalia Oreiro', match: ['Cambio dolor'], artist: ['Natalia Oreiro'], album: ['Natalia Oreiro'] },
    45: { serie: 'Gilmore Girls', aka: ['Las chicas Gilmore', 'Tal para cual'], title: 'Where You Lead', composer: 'Carole King y Louise Goffin', match: ['Where You Lead', 'Where You Lead I Will Follow'], artist: ['Carole King', 'Louise Goffin'], album: ['Our Little Corner of the World', 'Gilmore Girls'] },
    46: { serie: 'CSI: En la escena del crimen', aka: ['CSI', 'CSI: Crime Scene Investigation', 'CSI: Las Vegas'], title: 'Who Are You', composer: 'The Who', match: ['Who Are You'], artist: ['The Who'], album: ['Who Are You'] },
    48: { serie: 'Monk', aka: [], title: "It's a Jungle Out There", composer: 'Randy Newman', match: ["It's a Jungle Out There"], artist: ['Randy Newman'], album: ['Monk'] },
  },
};

/* Qué se escribe en el buscador de Apple (por número de Gemini). Va corto, con el artista o con el
   recopilatorio, porque si el término trae palabras que la pista no tiene ("Theme from"), Apple no la devuelve. */
const TGH = (serie) => `${serie} Television's Greatest Hits`;
const TERMINOS = {
  1: {
    3: ["The Wellingtons Gilligan's Isle", TGH("Gilligan's Island")],
    4: ['Hugo Montenegro Jeannie', TGH('I Dream of Jeannie')],
    5: ['Irving Szathmary Get Smart', TGH('Get Smart')],
    6: ['Boots Randolph Yakety Sax'],
    7: ['David Rose Little House on the Prairie'],
    8: ['Oliver Nelson Six Million Dollar Man', TGH('Six Million Dollar Man')],
    9: ['Charles Fox Wonder Woman', TGH('Wonder Woman')],
    10: ["Jack Elliott Allyn Ferguson Charlie's Angels", TGH("Charlie's Angels")],
    12: ['Joe Harnell Lonely Man'],
    13: ['John Parker CHiPs', TGH('CHiPs')],
    14: ["Alan Thicke Diff'rent Strokes", TGH("Diff'rent Strokes")],
    16: ["Waylon Jennings Good Ol' Boys"],
    17: ['Mike Post Magnum'],
    20: ['Al Jarreau Moonlighting'],
    21: ['Alf Clausen ALF', TGH('ALF')],
    24: ['John E. Davis Beverly Hills 90210', TGH('Beverly Hills 90210')],
    25: ['Howard Goodall Mr. Bean', 'Ecce homo qui est faba'],
    26: ['Bruce Broughton Dinosaurs', TGH('Dinosaurs')],
    28: ['Queen Princes of the Universe'],
    29: ['Ann Hampton Callaway Nanny', TGH('The Nanny')],
    32: ['Mijares Corazón salvaje'],
    33: ['Thalía Marimar'],
    35: ['Thalía María la del barrio'],
    36: ['Jack Lenz Goosebumps'],
    37: ['Joseph LoDuca Xena'],
    41: ['Pandora La usurpadora'],
    42: ['Natalia Oreiro Cambio dolor'],
    45: ['Carole King Louise Goffin Where You Lead', 'Carole King Where You Lead'],
    46: ['The Who Who Are You'],
    48: ["Randy Newman It's a Jungle Out There"],
  },
};

/* Lo que no entra, para no volver a revisarlo. */
const DESCARTADAS = {
  1: {
    1: 'Bonanza: la grabación de Al Caiola es un cover; la de la tele no se sabe cómo aparece en Apple. Sigue como señuelo.',
    2: 'Hechizada: Steve Lawrence grabó la versión cantada; en la tele era instrumental. Sigue como señuelo.',
    11: 'La mujer biónica: poco conocida en México y el nombre de la pista parece supuesto.',
    15: 'Los ricos también lloran: no se pudo confirmar que "Aprendí a llorar" sea la entrada.',
    18: 'Dinastía: poco conocida en México.',
    19: 'Lobo del aire: poco conocida en México; además Gemini inventó el nombre "Helicóptero del amor".',
    22: 'Cuna de lobos: pista y álbum genéricos ("Tema de Cuna de lobos", "Temas de Telenovelas"), probablemente inventados.',
    23: 'La ley y el orden: poco conocida en México y la grabación es otra versión.',
    27: 'Paso a paso: poco conocida en México.',
    30: 'Walker, Texas Ranger: no está en Apple Music; falta un video real de YouTube.',
    31: 'Aprendiendo a vivir: poco conocida en México.',
    34: 'Chiquititas: poco conocida en México y la entrada no se pudo confirmar.',
    38: 'Kenan y Kel: poco conocida en México.',
    39: 'Sabrina, la bruja adolescente: no está en Apple Music; falta un video real de YouTube. Sigue como señuelo.',
    40: 'Tercera roca desde el Sol: casi nadie la conoce en México.',
    43: 'Soñadoras: no se pudo confirmar quién canta la entrada.',
    44: 'Felicity: casi nadie la conoce en México y el compositor está mal.',
    47: 'Cuéntame cómo pasó: casi nadie la conoce en México y es una regrabación.',
    49: 'Aquí no hay quien viva: casi nadie la conoce en México y no está en Apple Music.',
    50: 'Dos hombres y medio: no está en Apple Music; falta un video real de YouTube.',
  },
};

const SECCIONES = [
  { cat: 'tv-clasicas', label: 'Clásicas (antes de 1990)', hasta: 1989 },
  { cat: 'tv-90s', label: 'Años 90', hasta: 1999 },
  { cat: 'tv-00s', label: '2000s', hasta: 2009 },
  { cat: 'tv-10s', label: '2010s', hasta: 2019 },
  { cat: 'tv-20s', label: '2020 en adelante', hasta: Infinity },
];

const slug = (t) => String(t).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const q = (s) => "'" + String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
const list = (a) => '[' + a.map(q).join(', ') + ']';

function load(code) {
  const AM = { CATEGORIES: [], CATALOG: [], EXTRA_GAMES: [], VERSIONS: [], FRANCHISE_AKA: {} };
  vm.runInNewContext(code, { window: { AM }, AM, console });
  return AM;
}

let code = fs.readFileSync(CATALOG, 'utf8');
const before = load(code);
const ids = new Set(before.CATALOG.map((t) => t.id));
const nombres = new Set(before.CATALOG.map((t) => slug(t.game)));

// Ayudante de fuentes: la misma búsqueda en la tienda de México y, si no aparece, en la de EE. UU.
if (code.indexOf('const buscaTv') < 0) {
  code = code.replace(
    "  const yt = (id, start) => ({ type: 'youtube', id: id, start: start || 0 });\n",
    "  const yt = (id, start) => ({ type: 'youtube', id: id, start: start || 0 });\n" +
    '  // Busca la pista en Apple Music con cada término, en México y luego en EE. UU.; `match`, `artist` y `album_hint` la validan.\n' +
    "  const buscaTv = (terms, o) => [].concat(terms).reduce((out, term) =>\n" +
    "    out.concat(['mx', 'us'].map((country) => apple(Object.assign({ term: term, country: country }, o)))), []);\n"
  );
}

const nuevas = {};
const agregadas = [];
LOTES.forEach((archivo, i) => {
  const lote = i + 1;
  const datos = JSON.parse(fs.readFileSync(path.join(__dirname, archivo), 'utf8'));
  datos.forEach((g) => {
    const a = (APROBADAS[lote] || {})[g.n];
    if (!a) {
      if (!(DESCARTADAS[lote] || {})[g.n]) throw new Error(`Lote ${lote} #${g.n} (${g.serie}) no está ni aprobada ni descartada`);
      return;
    }
    const sec = SECCIONES.find((s) => g.estreno <= s.hasta);
    const id = `tv-${slug(a.serie)}-${slug(a.title)}`;
    if (ids.has(id)) return; // ya agregada antes
    if (nombres.has(slug(a.serie))) throw new Error(`${a.serie} ya está en el catálogo con otro id`);
    ids.add(id);
    nombres.add(slug(a.serie));
    const terms = (TERMINOS[lote] || {})[g.n];
    if (!terms) throw new Error(`Lote ${lote} #${g.n} (${a.serie}) no tiene términos de búsqueda`);
    const opts = [`match: ${list(a.match)}`, `artist: ${list(a.artist)}`];
    if (a.album.length) opts.push(`album_hint: ${list(a.album)}`);
    const lines = [
      '    {',
      `      id: ${q(id)}, cat: ${q(sec.cat)}, franchise: ${q(a.serie)}, game: ${q(a.serie)},`,
      `      title: ${q(a.title)}, composer: ${q(a.composer)}, year: ${g.estreno}, platform: ${q(a.platform || g.cadena)},`,
    ];
    if (a.aka.length) lines.push(`      aka: ${list(a.aka)},`);
    lines.push(`      sources: buscaTv(${terms.length === 1 ? q(terms[0]) : list(terms)}, { ${opts.join(', ')} }),`, '    },');
    (nuevas[sec.cat] = nuevas[sec.cat] || []).push({ year: g.estreno, text: lines.join('\n') });
    agregadas.push(a.serie);
  });
});

// Inserta cada pista al final de su sección (antes del encabezado de la siguiente o del cierre).
SECCIONES.forEach((s, i) => {
  const items = (nuevas[s.cat] || []).sort((x, y) => x.year - y.year);
  if (!items.length) return;
  const next = SECCIONES[i + 1];
  const marker = next ? new RegExp(`\\n    /\\* ─+ ${next.label.replace(/[()]/g, '\\$&')} \\(\\d+\\) ─+ \\*/`) : /\n  \);\n\n  \/\/ Señuelos/;
  const m = code.match(marker);
  if (!m) throw new Error('No encontré el final de la sección ' + s.label);
  code = code.slice(0, m.index) + '\n' + items.map((x) => x.text).join('\n') + code.slice(m.index);
});

// Las series que ahora suenan dejan de ser señuelos.
agregadas.forEach((serie) => {
  const re = new RegExp(`\\n    \\{ theme: 'series', franchise: '[^']*', game: ${q(serie).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')} \\},`);
  code = code.replace(re, '');
});

// Cuentas en el encabezado y en cada sección.
const after = load(code);
const series = after.CATALOG;
code = code.replace(/Catálogo: Series de TV \(\d+ pistas\)/, `Catálogo: Series de TV (${series.length} pistas)`);
SECCIONES.forEach((s) => {
  const n = series.filter((t) => t.cat === s.cat).length;
  code = code.replace(new RegExp(`(/\\* ─+ ${s.label.replace(/[()]/g, '\\$&')} )\\(\\d+\\)`), `$1(${n})`);
});

fs.writeFileSync(CATALOG, code);
const final = load(code);
console.log(`Agregadas: ${agregadas.length} (${agregadas.join(', ')})`);
console.log(`Catálogo de Series: ${before.CATALOG.length} → ${final.CATALOG.length} pistas; señuelos: ${before.EXTRA_GAMES.length} → ${final.EXTRA_GAMES.length}`);
SECCIONES.forEach((s) => console.log(`  ${s.label}: ${final.CATALOG.filter((t) => t.cat === s.cat).length}`));
