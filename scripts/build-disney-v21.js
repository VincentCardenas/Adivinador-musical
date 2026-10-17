/**
 * Fase 3 — Expansión de Películas de Disney y Pixar (+21 pistas: 71 -> 92)
 * Categorías:
 *   - dis-clasica: 13 -> +5 = 18
 *   - dis-renacimiento: 19 -> +4 = 23
 *   - dis-2000s: 15 -> +3 = 18
 *   - dis-2010s: 16 -> +4 = 20
 *   - dis-2020s: 8 -> +5 = 13
 *
 * Reanudable, comprueba cada fuente en vivo con lib-v21.js (Apple Music MX + YouTube MX embeddable)
 * y guarda evidencia en scripts/evidencia-v2.1.json.
 */
const fs = require('fs');
const path = require('path');
const {
  searchAndVerifyYoutube,
  searchApple,
  recordAppleTrackEvidence,
} = require('./lib-v21');

const CATALOG_PATH = path.join(__dirname, '..', 'js', 'catalog-disney.js');
const CACHE_PATH = path.join(__dirname, '.disney-v21-resolved.json');

const NEW_DISNEY = [
  // ───────────── Clásicos (1937–1988) (+5: 13 -> 18) ─────────────
  {
    id: 'dis-dumbo-cuando-veo-un-elefante-volar',
    cat: 'dis-clasica',
    franchise: 'Dumbo',
    game: 'Dumbo',
    title: 'Cuando veo un elefante volar',
    composer: 'Doblaje latino',
    year: 1941,
    ytQuery: 'Dumbo Cuando veo un elefante volar español latino oficial',
    ytTitleRe: /elefante volar|dumbo/i,
  },
  {
    id: 'dis-bambi-la-cancion-de-la-lluvia',
    cat: 'dis-clasica',
    franchise: 'Bambi',
    game: 'Bambi',
    title: 'La canción de la lluvia',
    composer: 'Doblaje latino',
    year: 1942,
    ytQuery: 'Bambi La cancion de la lluvia gotitas español latino',
    ytTitleRe: /bambi|lluvia|gotitas/i,
  },
  {
    id: 'dis-cenicienta-sonar-es-desear',
    cat: 'dis-clasica',
    franchise: 'Cenicienta',
    game: 'Cenicienta',
    title: 'Soñar es desear',
    composer: 'Evangelina Elizondo',
    year: 1950,
    aka: ['La Cenicienta'],
    appleTerm: 'Cenicienta Sonar es desear',
    appleTitleRe: /so[ñn]ar es desear/i,
    appleArtistRe: /evangelina|cenicienta|ilse|disney/i,
    ytQuery: 'Cenicienta Soñar es desear español latino Disney',
    ytTitleRe: /so[ñn]ar es desear|cenicienta/i,
  },
  {
    id: 'dis-mary-poppins-con-un-poco-de-azucar',
    cat: 'dis-clasica',
    franchise: 'Mary Poppins',
    game: 'Mary Poppins',
    title: 'Con un poco de azúcar',
    composer: 'Doblaje latino',
    year: 1964,
    ytQuery: 'Mary Poppins Con un poco de azucar español latino',
    ytTitleRe: /poco de az[uú]car|mary poppins/i,
  },
  {
    id: 'dis-el-libro-de-la-selva-quiero-ser-como-tu',
    cat: 'dis-clasica',
    franchise: 'El libro de la selva',
    game: 'El libro de la selva',
    title: 'Quiero ser como tú',
    composer: 'Germán Valdés "Tin Tan"',
    year: 1967,
    ytQuery: 'El libro de la selva Quiero ser como tu Tin Tan español latino',
    ytTitleRe: /quiero ser como t[uú]|libro de la selva/i,
  },

  // ───────────── Renacimiento (1989–1999) (+4: 19 -> 23) ─────────────
  {
    id: 'dis-aladdin-un-amigo-fiel-en-mi',
    cat: 'dis-renacimiento',
    franchise: 'Aladdín',
    game: 'Aladdín',
    title: 'Un amigo fiel en mí',
    composer: 'Ruben Trujillo',
    year: 1992,
    appleTerm: 'Ruben Trujillo Un amigo fiel en mi Aladdin',
    appleTitleRe: /amigo fiel/i,
    appleArtistRe: /rub[eé]n trujillo/i,
    ytQuery: 'Aladdin Un amigo fiel en mi español latino Ruben Trujillo',
    ytTitleRe: /amigo fiel|aladd[ií]n/i,
  },
  {
    id: 'dis-el-rey-leon-esta-noche-es-para-amar',
    cat: 'dis-renacimiento',
    franchise: 'El rey león',
    game: 'El rey león',
    title: 'Esta noche es para amar',
    composer: 'Renato López y Claudia Pizá',
    year: 1994,
    appleTerm: 'El rey leon Esta noche es para amar Renato Lopez',
    appleTitleRe: /esta noche es para amar/i,
    appleArtistRe: /renato|claudia|rey le[oó]n/i,
    ytQuery: 'El rey leon Esta noche es para amar español latino',
    ytTitleRe: /esta noche es para amar|rey le[oó]n/i,
  },
  {
    id: 'dis-hercules-no-hablare-de-mi-amor',
    cat: 'dis-renacimiento',
    franchise: 'Hércules',
    game: 'Hércules',
    title: 'No hablaré de mi amor',
    composer: 'Tatiana',
    year: 1997,
    ytQuery: 'Hercules No hablare de mi amor Tatiana español latino',
    ytTitleRe: /no hablar[eé]|h[eé]rcules/i,
  },
  {
    id: 'dis-tarzan-hijo-de-hombre',
    cat: 'dis-renacimiento',
    franchise: 'Tarzán',
    game: 'Tarzán',
    title: 'Hijo de hombre',
    composer: 'Phil Collins',
    year: 1999,
    appleTerm: 'Phil Collins Hijo de hombre Tarzan',
    appleTitleRe: /hijo de hombre/i,
    appleArtistRe: /phil collins/i,
    ytQuery: 'Tarzan Hijo de hombre Phil Collins español latino',
    ytTitleRe: /hijo de hombre|tarz[aá]n/i,
  },

  // ───────────── 2000–2009 (+3: 15 -> 18) ─────────────
  {
    id: 'dis-monsters-inc-si-no-estoy-contigo',
    cat: 'dis-2000s',
    franchise: 'Monsters, Inc.',
    game: 'Monsters, Inc.',
    title: 'Si no estoy contigo',
    composer: 'Doblaje latino',
    year: 2001,
    pixar: true,
    ytQuery: 'Monsters Inc Si no estoy contigo español latino',
    ytTitleRe: /si no estoy contigo|monsters/i,
  },
  {
    id: 'dis-tierra-de-osos-en-marcha-estoy',
    cat: 'dis-2000s',
    franchise: 'Tierra de osos',
    game: 'Tierra de osos',
    title: 'En marcha estoy',
    composer: 'Phil Collins',
    year: 2003,
    aka: ['Hermano oso', 'Brother Bear'],
    appleTerm: 'Phil Collins En marcha estoy',
    appleTitleRe: /en marcha estoy/i,
    appleArtistRe: /phil collins/i,
    ytQuery: 'Tierra de osos En marcha estoy Phil Collins español latino',
    ytTitleRe: /en marcha estoy|tierra de osos|hermano oso/i,
  },
  {
    id: 'dis-la-princesa-y-el-sapo-amigos-del-mas-alla',
    cat: 'dis-2000s',
    franchise: 'La princesa y el sapo',
    game: 'La princesa y el sapo',
    title: 'Amigos del más allá',
    composer: 'Mauricio Pérez',
    year: 2009,
    appleTerm: 'Amigos del mas alla La princesa y el sapo',
    appleTitleRe: /amigos del m[aá]s all[aá]/i,
    appleArtistRe: /mauricio|princesa|sapo|disney/i,
    ytQuery: 'La princesa y el sapo Amigos del mas alla español latino',
    ytTitleRe: /amigos del m[aá]s all[aá]|princesa y el sapo/i,
  },

  // ───────────── 2010–2019 (+4: 16 -> 20) ─────────────
  {
    id: 'dis-toy-story-3-hay-un-amigo-en-mi',
    cat: 'dis-2010s',
    franchise: 'Toy Story',
    game: 'Toy Story 3',
    title: 'Hay un amigo en mí (para Buzz Español)',
    composer: 'Gipsy Kings',
    year: 2010,
    pixar: true,
    appleTerm: 'Gipsy Kings Hay un amigo en mi Toy Story 3',
    appleTitleRe: /amigo en m[ií]|you've got a friend in me/i,
    appleArtistRe: /gipsy kings/i,
    ytQuery: 'Toy Story 3 Hay un amigo en mi Gipsy Kings',
    ytTitleRe: /amigo en m[ií]|gipsy kings|toy story/i,
  },
  {
    id: 'dis-frozen-una-aventura-congelada-por-primera-vez-en-anos',
    cat: 'dis-2010s',
    franchise: 'Frozen',
    game: 'Frozen: Una aventura congelada',
    title: 'Por primera vez en años',
    composer: 'Romina Marroquín Payró y Carmen Sarahi',
    year: 2013,
    aka: ['Frozen'],
    appleTerm: 'Por primera vez en anos Romina Marroquin Carmen Sarahi',
    appleTitleRe: /por primera vez en a[ñn]os/i,
    appleArtistRe: /romina|carmen sarahi/i,
    ytQuery: 'Frozen Por primera vez en años español latino Romina Marroquin',
    ytTitleRe: /por primera vez en a[ñn]os|frozen/i,
  },
  {
    id: 'dis-moana-un-mar-de-aventuras-brillo',
    cat: 'dis-2010s',
    franchise: 'Moana',
    game: 'Moana: Un mar de aventuras',
    title: 'Brillo',
    composer: 'Mauricio Pérez',
    year: 2016,
    aka: ['Moana'],
    appleTerm: 'Mauricio Perez Brillo Moana',
    appleTitleRe: /^brillo$/i,
    appleArtistRe: /mauricio p[eé]rez/i,
    ytQuery: 'Moana Brillo español latino Tamatoa',
    ytTitleRe: /brillo|moana/i,
  },
  {
    id: 'dis-coco-el-latido-de-mi-corazon',
    cat: 'dis-2010s',
    franchise: 'Coco',
    game: 'Coco',
    title: 'El latido de mi corazón',
    composer: 'Luis Ángel Gómez Jaramillo',
    year: 2017,
    pixar: true,
    appleTerm: 'Luis Angel Gomez Jaramillo El latido de mi corazon Coco',
    appleTitleRe: /latido de mi coraz[oó]n/i,
    appleArtistRe: /luis [aá]ngel g[oó]mez/i,
    ytQuery: 'Coco El latido de mi corazon español latino',
    ytTitleRe: /latido de mi coraz[oó]n|coco/i,
  },

  // ───────────── 2020 en adelante (+5: 8 -> 13) ─────────────
  {
    id: 'dis-soul-it-s-all-right',
    cat: 'dis-2020s',
    franchise: 'Soul',
    game: 'Soul',
    title: 'It\'s All Right',
    composer: 'Jon Batiste y Celeste',
    year: 2020,
    pixar: true,
    appleTerm: 'Jon Batiste Celeste It\'s All Right Soul',
    appleTitleRe: /it's all right/i,
    appleArtistRe: /jon batiste|celeste/i,
    ytQuery: 'Jon Batiste Celeste It\'s All Right Soul Disney',
    ytTitleRe: /it's all right|jon batiste|soul/i,
  },
  {
    id: 'dis-raya-y-el-ultimo-dragon-hasta-vencer',
    cat: 'dis-2020s',
    franchise: 'Raya y el último dragón',
    game: 'Raya y el último dragón',
    title: 'Hasta vencer',
    composer: 'Danna Paola',
    year: 2021,
    appleTerm: 'Danna Paola Hasta vencer Raya',
    appleTitleRe: /hasta vencer/i,
    appleArtistRe: /danna paola/i,
    ytQuery: 'Danna Paola Hasta vencer Raya y el ultimo dragon',
    ytTitleRe: /hasta vencer|raya/i,
  },
  {
    id: 'dis-encanto-inspiracion',
    cat: 'dis-2020s',
    franchise: 'Encanto',
    game: 'Encanto',
    title: 'Inspiración',
    composer: 'Olga Lucía Vives e Isabel Garcés',
    year: 2021,
    appleTerm: 'Olga Lucia Vives Inspiracion Encanto',
    appleTitleRe: /inspiraci[oó]n/i,
    appleArtistRe: /olga luc[ií]a vives/i,
    ytQuery: 'Encanto Inspiracion español latino Isabela',
    ytTitleRe: /inspiraci[oó]n|encanto/i,
  },
  {
    id: 'dis-elementos-steal-the-show',
    cat: 'dis-2020s',
    franchise: 'Elementos',
    game: 'Elementos',
    title: 'Steal the Show',
    composer: 'Lauv',
    year: 2023,
    pixar: true,
    aka: ['Elemental'],
    appleTerm: 'Lauv Steal the Show Elemental',
    appleTitleRe: /steal the show/i,
    appleArtistRe: /lauv/i,
    ytQuery: 'Lauv Steal the Show Elemental Official',
    ytTitleRe: /steal the show|lauv|elemental/i,
  },
  {
    id: 'dis-mufasa-el-rey-leon-yo-siempre-quise-un-hermano',
    cat: 'dis-2020s',
    franchise: 'El rey león',
    game: 'Mufasa: El rey león',
    title: 'Yo siempre quise un hermano',
    composer: 'Doblaje latino',
    year: 2024,
    appleTerm: 'Mufasa Yo siempre quise un hermano',
    appleTitleRe: /siempre quise un hermano/i,
    appleArtistRe: /mufasa|rey le[oó]n|disney|sergio|lorenzo/i,
    ytQuery: 'Mufasa Yo siempre quise un hermano español latino Disney',
    ytTitleRe: /siempre quise un hermano|mufasa/i,
  },
];

function esc(s) {
  return String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function formatEntry(item, sourcesCode) {
  const akaPart = item.aka && item.aka.length
    ? `\n      aka: [${item.aka.map((a) => `'${esc(a)}'`).join(', ')}],`
    : '';
  const pixarPart = item.pixar ? ', pixar: true' : '';
  return [
    '    {',
    `      id: '${esc(item.id)}', cat: '${esc(item.cat)}', franchise: '${esc(item.franchise)}', game: '${esc(item.game)}',`,
    `      title: '${esc(item.title)}', composer: '${esc(item.composer)}', year: ${item.year}${pixarPart},${akaPart}`,
    `      sources: [${sourcesCode.join(', ')}],`,
    '    },',
  ].join('\n');
}

async function resolveItem(item) {
  const sources = [];

  if (item.appleTerm) {
    for (const country of ['mx', 'us']) {
      const results = await searchApple(item.appleTerm, country, 10);
      const match = results.find((r) => {
        if (!r.previewUrl || !r.trackId) return false;
        const t = r.trackName || '';
        const a = r.artistName || '';
        if (/karaoke|tribute|8-bit|ringtone|cover|instrumental|piano/i.test(t + ' ' + a)) return false;
        const titleOk = item.appleTitleRe ? item.appleTitleRe.test(t) : true;
        const artistOk = item.appleArtistRe ? item.appleArtistRe.test(a + ' ' + (r.collectionName || '')) : true;
        return titleOk && artistOk;
      });
      if (match) {
        recordAppleTrackEvidence(match, country, `apple-search:${country}:${item.appleTerm}`);
        sources.push(`apple({ song: ${match.trackId}, country: '${country}' })`);
        break;
      }
    }
  }

  if (item.ytQuery) {
    const candidates = await searchAndVerifyYoutube(item.ytQuery, {
      maxCandidates: 8,
      accept: (info) => {
        if (info.lengthSeconds < 25 || info.lengthSeconds > 480) return false;
        if (/cover|guitar|piano|tutorial|reaction|reacci[oó]n|8-bit|remix|amv|nightcore|fandub/i.test(info.title)) return false;
        return item.ytTitleRe ? item.ytTitleRe.test(info.title + ' ' + info.author) : true;
      },
    });
    for (const c of candidates.slice(0, 2)) {
      sources.push(`yt('${c.id}')`);
    }
  }

  if (sources.length === 0) {
    throw new Error(`No se encontró fuente válida para ${item.id} (${item.game} - ${item.title})`);
  }
  return sources;
}

async function main() {
  let resolved = {};
  if (fs.existsSync(CACHE_PATH)) {
    resolved = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8'));
  }

  console.log(`🚀 Resolviendo ${NEW_DISNEY.length} pistas nuevas de Disney para v2.1...`);
  for (let i = 0; i < NEW_DISNEY.length; i++) {
    const item = NEW_DISNEY[i];
    if (resolved[item.id] && resolved[item.id].length > 0) {
      console.log(`[${i + 1}/${NEW_DISNEY.length}] (caché) ${item.id} -> ${resolved[item.id].join(', ')}`);
      continue;
    }
    const sources = await resolveItem(item);
    resolved[item.id] = sources;
    fs.writeFileSync(CACHE_PATH, JSON.stringify(resolved, null, 2) + '\n', 'utf8');
    console.log(`[${i + 1}/${NEW_DISNEY.length}] ✔ ${item.id} -> ${sources.join(', ')}`);
  }

  let content = fs.readFileSync(CATALOG_PATH, 'utf8').replace(/\r\n/g, '\n');

  const sections = [
    { cat: 'dis-clasica', nextMarker: '    /* ───────────── Renacimiento (1989–1999)' },
    { cat: 'dis-renacimiento', nextMarker: '    /* ───────────── 2000–2009' },
    { cat: 'dis-2000s', nextMarker: '    /* ───────────── 2010–2019' },
    { cat: 'dis-2010s', nextMarker: '    /* ───────────── 2020 en adelante' },
    { cat: 'dis-2020s', nextMarker: '  );\n\n  // Señuelos:' },
  ];

  let addedCount = 0;
  for (const sec of sections) {
    const items = NEW_DISNEY.filter((x) => x.cat === sec.cat && !content.includes(`id: '${x.id}'`));
    if (items.length === 0) continue;
    const blocks = items.map((item) => formatEntry(item, resolved[item.id])).join('\n');
    const idx = content.indexOf(sec.nextMarker);
    if (idx === -1) throw new Error(`No se encontró marcador para ${sec.cat}: ${sec.nextMarker}`);
    content = content.slice(0, idx) + blocks + '\n' + content.slice(idx);
    addedCount += items.length;
  }

  // Quitar señuelos de películas que ahora tienen pista propia
  const decoysToRemove = [
    "    { theme: 'disney', franchise: 'Bambi', game: 'Bambi' },\n",
    "    { theme: 'disney', franchise: 'Dumbo', game: 'Dumbo' },\n",
    "    { theme: 'disney', franchise: 'Toy Story', game: 'Toy Story 3', pixar: true },\n",
    "    { theme: 'disney', franchise: 'Raya y el último dragón', game: 'Raya y el último dragón' },\n",
    "    { theme: 'disney', franchise: 'El rey león', game: 'Mufasa: El rey león' },\n",
  ];
  for (const d of decoysToRemove) {
    content = content.replace(d, '');
  }

  // Actualizar cuentas de encabezado y secciones
  const vm = require('vm');
  const sandbox = { window: {} };
  sandbox.window = sandbox;
  sandbox.AM = { CATEGORIES: [], CATALOG: [], EXTRA_GAMES: [], VERSIONS: [] };
  vm.runInNewContext(content, sandbox);

  const total = sandbox.AM.CATALOG.length;
  content = content.replace(
    /Catálogo: Películas de Disney y Pixar \(\d+ pistas\)/,
    `Catálogo: Películas de Disney y Pixar (${total} pistas)`
  );

  const catLabels = [
    { cat: 'dis-clasica', label: 'Clásicos (1937–1988)' },
    { cat: 'dis-renacimiento', label: 'Renacimiento (1989–1999)' },
    { cat: 'dis-2000s', label: '2000–2009' },
    { cat: 'dis-2010s', label: '2010–2019' },
    { cat: 'dis-2020s', label: '2020 en adelante' },
  ];

  for (const c of catLabels) {
    const count = sandbox.AM.CATALOG.filter((t) => t.cat === c.cat).length;
    const escLabel = c.label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`(\\/\\* ─+ ${escLabel} \\()\\d+(\\) ─+ \\*\\/)`);
    content = content.replace(re, `$1${count}$2`);
  }

  fs.writeFileSync(CATALOG_PATH, content, 'utf8');
  console.log(`✅ js/catalog-disney.js actualizado (+${addedCount} pistas nuevas, total: ${total}).`);
}

main().catch((e) => {
  console.error('❌ Error:', e);
  process.exit(1);
});
