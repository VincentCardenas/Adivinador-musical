/**
 * Verificador automatizado de los pasos 1 a 3 de la Fase 4 (obligatorios antes de cada commit):
 * 1. node --check en cada archivo de js/
 * 2. Carga todos los catálogos en un vm y comprueba:
 *    - 0 IDs repetidos en AM.CATALOG + AM.SAGA_TRACKS;
 *    - cuentas de encabezados y de cada sección coinciden con las pistas reales;
 *    - fuera de Canciones, ningún `game` tiene dos `franchise` distintos dentro de su tema (incluyendo EXTRA_GAMES);
 *    - node scripts/validate-catalog.js sigue dando 1816;
 *    - git diff origin/main -- js/catalog-canciones.js sale vacío.
 * 3. Pasan:
 *    - node scripts/validate-anime.js --offline
 *    - node scripts/validate-caricaturas.js --offline
 *    - node scripts/validate-musicales.js
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { execSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const JS_DIR = path.join(ROOT, 'js');

let failed = false;
function fail(msg) {
  console.error('❌ ' + msg);
  failed = true;
}
function ok(msg) {
  console.log('✅ ' + msg);
}

// 1. node --check en cada archivo de js/
const jsFiles = fs.readdirSync(JS_DIR).filter((f) => f.endsWith('.js')).sort();
for (const f of jsFiles) {
  const full = path.join(JS_DIR, f);
  try {
    execSync(`node --check "${full}"`, { stdio: 'pipe' });
  } catch (e) {
    fail(`node --check falló en js/${f}: ${e.stderr ? e.stderr.toString() : e.message}`);
  }
}
if (!failed) ok(`Paso 1: node --check pasó en los ${jsFiles.length} archivos de js/.`);

// 2. Cargar todos los catálogos en un vm en el orden de index.html
const sandbox = {
  window: {},
  console,
  setTimeout,
  clearTimeout,
};
sandbox.window = sandbox;

const loadOrder = [
  'config.js',
  'catalog.js',
  'catalog-series.js',
  'catalog-caricaturas.js',
  'catalog-anime.js',
  'catalog-disney.js',
  'catalog-musicales.js',
  'catalog-canciones.js',
  'catalog-sagas.js',
  'themes.js',
];

for (const file of loadOrder) {
  const code = fs.readFileSync(path.join(JS_DIR, file), 'utf8');
  vm.runInNewContext(code, sandbox, { filename: file });
}

const AM = sandbox.AM;
const allTracks = AM.CATALOG.concat(AM.SAGA_TRACKS || []);

// 2a. 0 IDs repetidos en AM.CATALOG + AM.SAGA_TRACKS
const seenIds = new Map();
for (const t of allTracks) {
  if (!t.id) {
    fail(`Pista sin id en categoría ${t.cat || t.saga}`);
  } else if (seenIds.has(t.id)) {
    fail(`ID duplicado: "${t.id}" (${t.cat || t.saga} vs ${seenIds.get(t.id)})`);
  } else {
    seenIds.set(t.id, t.cat || t.saga);
  }
}
if (!failed) ok(`Paso 2a: 0 IDs repetidos entre ${AM.CATALOG.length} pistas de CATALOG y ${(AM.SAGA_TRACKS || []).length} de SAGA_TRACKS.`);

// 2b. Verificar cuentas de encabezados y secciones
const catalogConfigs = [
  {
    file: 'catalog.js',
    theme: 'juegos',
    headerRe: null,
    cats: ['nintendo', 'xbox', 'playstation', 'indie', 'retro', 'rpg', 'accion', 'online'],
  },
  {
    file: 'catalog-series.js',
    theme: 'series',
    headerRe: /Catálogo: Series de TV \((\d+) pistas\)/,
    cats: ['tv-clasicas', 'tv-90s', 'tv-00s', 'tv-10s', 'tv-20s'],
  },
  {
    file: 'catalog-caricaturas.js',
    theme: 'caricaturas',
    headerRe: /Catálogo: Caricaturas \((\d+) pistas\)/,
    cats: ['toon-clasicas', 'toon-80s', 'toon-90s', 'toon-00s', 'toon-1014', 'toon-1519', 'toon-20s'],
  },
  {
    file: 'catalog-anime.js',
    theme: 'anime',
    headerRe: /Catálogo: Anime \((\d+) pistas\)/,
    cats: ['anime-clasicos', 'anime-90s', 'anime-00s', 'anime-10s', 'anime-20s'],
  },
  {
    file: 'catalog-disney.js',
    theme: 'disney',
    headerRe: /Catálogo: Películas de Disney y Pixar \((\d+) pistas\)/,
    cats: ['dis-clasica', 'dis-renacimiento', 'dis-2000s', 'dis-2010s', 'dis-2020s'],
  },
  {
    file: 'catalog-musicales.js',
    theme: 'musicales',
    headerRe: /Catálogo: Musicales \((\d+) pistas: (\d+) en su grabación original y (\d+) en español\)/,
    cats: ['mus-clasicos', 'mus-7080', 'mus-9000', 'mus-10s'],
  },
];

for (const cfg of catalogConfigs) {
  const raw = fs.readFileSync(path.join(JS_DIR, cfg.file), 'utf8');
  if (raw.includes('\r\n')) {
    fail(`${cfg.file} contiene saltos de línea CRLF (\\r\\n); debe mantener LF.`);
  }
  const tracks = AM.CATALOG.filter((t) => t.theme === cfg.theme);
  if (cfg.headerRe) {
    const m = raw.match(cfg.headerRe);
    if (!m) {
      fail(`No se encontró el encabezado de conteo en ${cfg.file}`);
    } else {
      const headerTotal = Number(m[1]);
      if (headerTotal !== tracks.length) {
        fail(`${cfg.file}: encabezado dice ${headerTotal} pistas pero hay ${tracks.length}`);
      }
      if (cfg.theme === 'musicales') {
        const origCount = Number(m[2]);
        const esCount = Number(m[3]);
        const realEs = tracks.filter((t) => t.lang === 'es').length;
        const realOrig = tracks.filter((t) => t.lang !== 'es').length;
        if (origCount !== realOrig || esCount !== realEs) {
          fail(`${cfg.file}: encabezado dice (${origCount} orig / ${esCount} es) pero hay (${realOrig} orig / ${realEs} es)`);
        }
      }
    }
  }
  // Verificar conteo (N) de cada sección en orden
  const secMatches = [...raw.matchAll(/\/\* ─+ (.+?) \((\d+)\) ─+ \*\//g)];
  if (secMatches.length !== cfg.cats.length) {
    fail(`${cfg.file}: se esperaban ${cfg.cats.length} encabezados de sección y se encontraron ${secMatches.length}`);
  } else {
    cfg.cats.forEach((catId, idx) => {
      const expected = tracks.filter((t) => t.cat === catId).length;
      const found = Number(secMatches[idx][2]);
      if (found !== expected) {
        fail(`${cfg.file} sección ${catId} (${secMatches[idx][1]}): dice (${found}) pero hay ${expected}`);
      }
    });
  }
}

// Verificar encabezado de Sagas
const sagasRaw = fs.readFileSync(path.join(JS_DIR, 'catalog-sagas.js'), 'utf8');
if (sagasRaw.includes('\r\n')) {
  fail('catalog-sagas.js contiene saltos de línea CRLF (\\r\\n); debe mantener LF.');
}
const sagasHeader = sagasRaw.match(/Archivo generado \((\d+) canciones\)\./);
if (!sagasHeader) {
  fail('catalog-sagas.js: no se encontró "Archivo generado (N canciones)."');
} else if (Number(sagasHeader[1]) !== AM.SAGA_TRACKS.length) {
  fail(`catalog-sagas.js: encabezado dice ${sagasHeader[1]} canciones pero hay ${AM.SAGA_TRACKS.length}`);
}
if (!failed) ok('Paso 2b: Todas las cuentas de encabezados y secciones coinciden y usan LF.');

// 2c. Fuera de Canciones, ningún game tiene dos franchise en su tema
const gameFranchiseByTheme = {};
for (const t of AM.CATALOG) {
  if (t.theme === 'canciones') continue;
  const key = `${t.theme}::${t.game}`;
  if (!gameFranchiseByTheme[key]) {
    gameFranchiseByTheme[key] = t.franchise;
  } else if (gameFranchiseByTheme[key] !== t.franchise) {
    fail(`Tema "${t.theme}": game "${t.game}" tiene dos franchises distintos: "${gameFranchiseByTheme[key]}" y "${t.franchise}"`);
  }
}
for (const s of AM.SAGA_TRACKS || []) {
  const key = `juegos::${s.game}`;
  if (!gameFranchiseByTheme[key]) {
    gameFranchiseByTheme[key] = s.franchise;
  } else if (gameFranchiseByTheme[key] !== s.franchise) {
    fail(`SAGA_TRACKS "${s.id}": game "${s.game}" tiene franchise "${s.franchise}" distinto a "${gameFranchiseByTheme[key]}"`);
  }
}
if (!failed) ok('Paso 2c: Fuera de Canciones, cada game tiene una única franchise en su tema.');

// 2d. node scripts/validate-catalog.js sigue dando 1816 y git diff de catalog-canciones.js vacío
try {
  const out = execSync('node scripts/validate-catalog.js', { cwd: ROOT, encoding: 'utf8' });
  if (!out.includes('Total de canciones en catálogo: 1816')) {
    fail('validate-catalog.js no reportó 1816 canciones.');
  } else {
    ok('Paso 2d: validate-catalog.js reporta 1816 canciones intactas.');
  }
} catch (e) {
  fail('validate-catalog.js falló: ' + (e.stdout || e.message));
}

try {
  const diff = execSync('git diff origin/main -- js/catalog-canciones.js', { cwd: ROOT, encoding: 'utf8' });
  if (diff.trim().length > 0) {
    fail('js/catalog-canciones.js tiene diferencias respecto a origin/main.');
  } else {
    ok('Paso 2e: git diff origin/main -- js/catalog-canciones.js está vacío.');
  }
} catch (e) {
  fail('No se pudo ejecutar git diff sobre js/catalog-canciones.js: ' + e.message);
}

// 3. Validadores offline de Anime, Caricaturas y Musicales
const validators = [
  'node scripts/validate-anime.js --offline',
  'node scripts/validate-caricaturas.js --offline',
  'node scripts/validate-musicales.js',
];
for (const cmd of validators) {
  try {
    execSync(cmd, { cwd: ROOT, stdio: 'pipe' });
    ok(`Paso 3: ${cmd} pasó.`);
  } catch (e) {
    fail(`${cmd} falló:\n${e.stdout ? e.stdout.toString() : ''}\n${e.stderr ? e.stderr.toString() : e.message}`);
  }
}

if (failed) {
  console.error('\n❌ La comprobación de Fase 4 (pasos 1-3) FALLÓ.');
  process.exit(1);
} else {
  console.log('\n🎉 Todos los controles de Fase 4 (pasos 1-3) pasaron exitosamente.');
}
