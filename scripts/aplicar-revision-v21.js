#!/usr/bin/env node
'use strict';

/*
 * Aplica las decisiones de la revisión de la 2.1 (scripts/revision-v21.json).
 * Las tomó un árbitro Opus sobre los hallazgos de los revisores Sonnet. Sin internet: solo quita o
 * reordena fuentes que ya estaban comprobadas, corrige datos, mueve de época o quita pistas.
 * Uso: node scripts/aplicar-revision-v21.js [--probar]   (--probar muestra los cambios sin escribir)
 * Lo que se quita va a scripts/pendientes-v2.1.json y lo que hay que oír a scripts/revisar-a-oido.md.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const JS = path.join(ROOT, 'js');
const PROBAR = process.argv.includes('--probar');
const ARCH_DEC = process.argv.slice(2).find((a) => a.endsWith('.json')) || 'revision-v21.json';
const DECISIONES = JSON.parse(fs.readFileSync(path.join(__dirname, ARCH_DEC), 'utf8')).decisiones;

const ARCHIVOS = {
  juegos: 'catalog.js', series: 'catalog-series.js', caricaturas: 'catalog-caricaturas.js', anime: 'catalog-anime.js',
  disney: 'catalog-disney.js', musicales: 'catalog-musicales.js', sagas: 'catalog-sagas.js', sonidos: 'catalog-sonidos.js',
};
const SECCIONES = {
  series: [['tv-clasicas', 'Clásicas (antes de 1990)'], ['tv-90s', 'Años 90'], ['tv-00s', '2000s'], ['tv-10s', '2010s'], ['tv-20s', '2020 en adelante']],
  caricaturas: [['toon-clasicas', 'Clásicas (antes de 1980)'], ['toon-80s', 'Años 80'], ['toon-90s', 'Años 90'], ['toon-00s', '2000s'], ['toon-1014', '2010 a 2014'], ['toon-1519', '2015 a 2019'], ['toon-20s', '2020 en adelante']],
  anime: [['anime-clasicos', 'Clásicos (antes de 1990)'], ['anime-90s', 'Años 90'], ['anime-00s', '2000s'], ['anime-10s', '2010s'], ['anime-20s', '2020 en adelante']],
};
const ENCABEZADO = {
  series: [/Catálogo: Series de TV \(\d+ pistas\)/, (ts) => `Catálogo: Series de TV (${ts.length} pistas)`],
  caricaturas: [/Catálogo: Caricaturas \(\d+ pistas\)/, (ts) => `Catálogo: Caricaturas (${ts.length} pistas)`],
  anime: [/Catálogo: Anime \(\d+ pistas\)/, (ts) => `Catálogo: Anime (${ts.length} pistas)`],
  disney: [/Catálogo: Películas de Disney y Pixar \(\d+ pistas\)/, (ts) => `Catálogo: Películas de Disney y Pixar (${ts.length} pistas)`],
  sagas: [/Archivo generado \(\d+ canciones\)/, (ts) => `Archivo generado (${ts.length} canciones)`],
  sonidos: [/Archivo generado \(\d+ sonidos\)/, (ts) => `Archivo generado (${ts.length} sonidos)`],
  musicales: [/Catálogo: Musicales \(\d+ pistas: \d+ en su grabación original y \d+ en español\)/,
    (ts) => `Catálogo: Musicales (${ts.length} pistas: ${ts.filter((t) => t.lang !== 'es').length} en su grabación original y ${ts.filter((t) => t.lang === 'es').length} en español)`],
};

const q = (s) => "'" + String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function loadAll() {
  const sb = { console, setTimeout, clearTimeout };
  sb.window = sb;
  for (const f of ['config.js', 'catalog.js', 'catalog-series.js', 'catalog-caricaturas.js', 'catalog-anime.js', 'catalog-disney.js',
    'catalog-musicales.js', 'catalog-canciones.js', 'catalog-sagas.js', 'catalog-sonidos.js', 'themes.js']) {
    vm.runInNewContext(fs.readFileSync(path.join(JS, f), 'utf8'), sb, { filename: f });
  }
  return sb.AM;
}

/* Índice del cierre que balancea el paréntesis/corchete/llave en `i` (respeta comillas). */
function cierre(s, i) {
  let depth = 0, quote = null;
  for (let j = i; j < s.length; j++) {
    const c = s[j];
    if (quote) { if (c === '\\') j++; else if (c === quote) quote = null; continue; }
    if (c === "'" || c === '"') quote = c;
    else if ('([{'.includes(c)) depth++;
    else if (')]}'.includes(c)) { depth--; if (depth === 0) return j; }
  }
  throw new Error('paréntesis sin cerrar');
}
/* Divide "a, b(c, d), e" por comas de primer nivel. */
function partir(s) {
  const out = [];
  let depth = 0, quote = null, start = 0;
  for (let j = 0; j < s.length; j++) {
    const c = s[j];
    if (quote) { if (c === '\\') j++; else if (c === quote) quote = null; continue; }
    if (c === "'" || c === '"') quote = c;
    else if ('([{'.includes(c)) depth++;
    else if (')]}'.includes(c)) depth--;
    else if (c === ',' && depth === 0) { out.push(s.slice(start, j).trim()); start = j + 1; }
  }
  if (s.slice(start).trim()) out.push(s.slice(start).trim());
  return out;
}
function clave(tok) {
  let m = tok.match(/^yt\(\s*['"]([A-Za-z0-9_-]{11})['"]/);
  if (m) return 'yt:' + m[1];
  m = tok.match(/^apple\(\{\s*song:\s*(\d+)/) || tok.match(/^am\(\s*(\d+)/);
  if (m) return 'apple:' + m[1];
  return null;
}

/* Ubica el bloque { ... } de una pista por su id dentro del código. */
function bloque(code, id) {
  const m = code.match(new RegExp(`\\n(\\s*)\\{\\n\\s*id: (['"])${esc(id)}\\2`));
  if (!m) return null;
  const start = m.index + 1;
  const open = code.indexOf('{', start);
  const end = cierre(code, open);
  let fin = code[end + 1] === ',' ? end + 2 : end + 1;
  if (code[fin] === '\n') fin++; // el bloque incluye su salto de línea: quitar o mover no deja huecos
  return { start, end: fin, text: code.slice(start, fin) };
}

function editarFuentes(text, fn) {
  const i = text.indexOf('sources:');
  if (i < 0) throw new Error('sin sources');
  let a = i + 'sources:'.length;
  while (text[a] === ' ') a++;
  let expr, b;
  if (text[a] === '[') { b = cierre(text, a); expr = text.slice(a + 1, b); }
  else { const p = text.indexOf('(', a); b = cierre(text, p); expr = text.slice(a, b + 1); }
  const esArreglo = text[a] === '[';
  const toks = esArreglo ? partir(expr) : [expr];
  const nuevos = fn(toks.map((t) => ({ t, k: clave(t) })));
  if (!nuevos.length) throw new Error('quedaría sin fuentes');
  const multilinea = esArreglo && expr.includes('\n');
  const cuerpo = multilinea
    ? '[\n' + nuevos.map((x) => '        ' + x.t + ',').join('\n') + '\n      ]'
    : (!esArreglo && nuevos.length === 1 && nuevos[0].t === expr) ? expr : '[' + nuevos.map((x) => x.t).join(', ') + ']';
  return text.slice(0, a) + cuerpo + text.slice(b + 1);
}

function valorJs(v) {
  if (v === null || v === undefined) return "''"; // dato desconocido: vacío (el juego no muestra campos vacíos)
  if (Array.isArray(v)) return '[' + v.map(q).join(', ') + ']';
  if (typeof v === 'number' || typeof v === 'boolean') return String(v);
  return q(v);
}
function editarCampo(text, campo, valor) {
  const re = new RegExp(`(\\b${campo}: )('(?:[^'\\\\]|\\\\.)*'|"(?:[^"\\\\]|\\\\.)*"|-?\\d+|true|false|\\[[^\\]]*\\])`);
  // valor null: el dato no se conoce, así que el campo se quita (como en las pistas que no lo traen)
  if (valor === null || valor === undefined) return text.replace(new RegExp(re.source + ',[ \\t]*'), '');
  if (re.test(text)) return text.replace(re, (all, pre) => pre + valorJs(valor));
  // campo nuevo: va en su propia línea antes de sources
  return text.replace(/\n(\s*)sources:/, (all, ind) => `\n${ind}${campo}: ${valorJs(valor)},\n${ind}sources:`);
}

function recontar(tema, code) {
  fs.writeFileSync(path.join(JS, ARCHIVOS[tema]), code);
  const AM = loadAll();
  const ts = tema === 'sagas' ? AM.SAGA_TRACKS : tema === 'sonidos' ? AM.SOUND_TRACKS : AM.CATALOG.filter((t) => t.theme === tema);
  if (ENCABEZADO[tema]) code = code.replace(ENCABEZADO[tema][0], ENCABEZADO[tema][1](ts));
  const secs = SECCIONES[tema] || [];
  for (const [cat, label] of secs) code = code.replace(new RegExp(`(/\\* ─+ ${esc(label)} )\\(\\d+\\)`), `$1(${ts.filter((t) => t.cat === cat).length})`);
  if (tema === 'juegos' || tema === 'musicales' || tema === 'disney') {
    // secciones con "(N)" por categoría: se recalculan con las etiquetas de AM.CATEGORIES
    AM.CATEGORIES.filter((c) => (c.theme || 'juegos') === tema).forEach((c) => {
      code = code.replace(new RegExp(`(/\\* ─+ ${esc(c.label)} )\\(\\d+\\)`), `$1(${ts.filter((t) => t.cat === c.id).length})`);
    });
  }
  fs.writeFileSync(path.join(JS, ARCHIVOS[tema]), code);
}

function main() {
  const AM0 = loadAll();
  // Los sonidos tienen theme 'juegos' (para el juego) pero viven en su propio archivo: el mapa los pone al final y gana 'sonidos'.
  const temaDe = new Map(AM0.CATALOG.map((t) => [t.id, t.theme]).concat(AM0.SAGA_TRACKS.map((t) => [t.id, 'sagas']), AM0.SOUND_TRACKS.map((t) => [t.id, 'sonidos'])));
  const codigo = {};
  const pendientes = JSON.parse(fs.readFileSync(path.join(__dirname, 'pendientes-v2.1.json'), 'utf8'));
  const oido = [];
  const log = [];
  // primero las ediciones, al final quitar/mover (cambian posiciones)
  const orden = { cambiar_campo: 0, quitar_fuente: 1, reordenar_fuentes: 1, revisar_a_oido: 2, mover_categoria: 3, quitar_pista: 4, nada: 5 };
  const decs = DECISIONES.slice().sort((a, b) => orden[a.op] - orden[b.op]);
  for (const d of decs) {
    if (d.op === 'nada') continue;
    const tema = temaDe.get(d.id);
    if (!tema || !ARCHIVOS[tema]) { log.push(`✗ ${d.id}: no encontré la pista`); continue; }
    codigo[tema] = codigo[tema] || fs.readFileSync(path.join(JS, ARCHIVOS[tema]), 'utf8');
    let code = codigo[tema];
    const b = bloque(code, d.id);
    if (!b) { log.push(`✗ ${d.id}: no encontré el bloque`); continue; }
    let text = b.text;
    try {
      if (d.op === 'quitar_fuente') {
        text = editarFuentes(text, (xs) => { const r = xs.filter((x) => x.k !== d.fuente); if (r.length === xs.length) throw new Error('no está la fuente ' + d.fuente); return r; });
      } else if (d.op === 'reordenar_fuentes') {
        text = editarFuentes(text, (xs) => {
          const porClave = new Map(xs.filter((x) => x.k).map((x) => [x.k, x]));
          (d.orden || []).forEach((k) => { if (!porClave.has(k)) throw new Error('orden con fuente que no existe: ' + k); });
          return (d.orden || []).map((k) => porClave.get(k)).concat(xs.filter((x) => !x.k));
        });
      } else if (d.op === 'cambiar_campo') {
        if (d.campo === 'start') {
          const v = d.valor || {};
          text = editarFuentes(text, (xs) => xs.map((x) => x.k === 'yt:' + v.yt ? { t: v.segundos ? `yt('${v.yt}', ${v.segundos})` : `yt('${v.yt}')`, k: x.k } : x));
        } else text = editarCampo(text, d.campo, d.valor);
      } else if (d.op === 'revisar_a_oido') {
        oido.push(`| \`${d.id}\` | ${String(d.nota || d.motivo).replace(/\|/g, '/').replace(/yt:([\w-]{11})/g, '[$1](https://www.youtube.com/watch?v=$1)')} |  |`);
        continue;
      } else if (d.op === 'mover_categoria') {
        text = editarCampo(text, 'cat', d.categoria);
        code = code.slice(0, b.start) + code.slice(b.end);
        const secs = SECCIONES[tema];
        const i = secs.findIndex(([c]) => c === d.categoria);
        if (i < 0) throw new Error('categoría destino desconocida ' + d.categoria);
        const next = secs[i + 1];
        const m = next ? code.match(new RegExp(`\\n    /\\* ─+ ${esc(next[1])} \\(\\d+\\) ─+ \\*/`)) : code.match(/\n  \);\n\n  \/\/ Señuelos/);
        if (!m) throw new Error('no encontré la sección destino');
        code = code.slice(0, m.index + 1) + text + code.slice(m.index + 1);
        codigo[tema] = code;
        log.push(`↪ ${d.id}: movida a ${d.categoria}`);
        continue;
      } else if (d.op === 'quitar_pista') {
        pendientes.push({ id: d.id, tema, motivo: d.motivo, bloque: text.trim(), quitada: 'revisión 2.1' });
        codigo[tema] = code.slice(0, b.start) + code.slice(b.end);
        log.push(`− ${d.id}: quitada (${d.motivo.slice(0, 80)})`);
        continue;
      }
    } catch (e) {
      log.push(`✗ ${d.id} ${d.op}: ${e.message}`);
      continue;
    }
    codigo[tema] = code.slice(0, b.start) + text + code.slice(b.end);
    log.push(`✔ ${d.id}: ${d.op}${d.campo ? ' ' + d.campo : ''}${d.fuente ? ' ' + d.fuente : ''}`);
  }
  console.log(log.join('\n'));
  if (PROBAR) { console.log('\n(--probar: no se escribió nada)'); return; }
  for (const [tema, code] of Object.entries(codigo)) recontar(tema, code);
  fs.writeFileSync(path.join(__dirname, 'pendientes-v2.1.json'), JSON.stringify(pendientes, null, 2) + '\n');
  if (oido.length) {
    const p = path.join(__dirname, 'revisar-a-oido.md');
    fs.writeFileSync(p, fs.readFileSync(p, 'utf8').replace(/\s*$/, '\n') + '\n## Revisión de la 2.1 (Sonnet + árbitro Opus)\n\n| Pista | Qué escuchar | |\n|---|---|---|\n' + oido.join('\n') + '\n');
  }
  console.log(`\nEscrito. Quitadas: ${pendientes.filter((p) => p.quitada).length} · para oír: ${oido.length}`);
}

main();
