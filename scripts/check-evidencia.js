#!/usr/bin/env node
/*
 * Comprueba, sin internet, que cada ID de audio nuevo o cambiado respecto a
 * la base (2d85042, de donde salió la 2.1) tenga su comprobación en scripts/evidencia-v2.1.json.
 *
 *   node scripts/check-evidencia.js            → revisa todos los catálogos (menos Canciones)
 *   node scripts/check-evidencia.js js/catalog.js js/catalog-anime.js
 *
 * - yt('ID'): debe existir evidencia tipo youtube con playabilityStatus OK y playableInEmbed true.
 * - apple({ song: N, country: 'xx' }): evidencia tipo apple con previewUrl y el mismo país
 *   (si la fuente no trae country, js/sources.js usa 'us').
 * Sale con código 1 si falta alguna.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
// Base fija: el commit de donde salió la 2.1 (la rama remota se mueve al subir). Se cambia con BASE=<commit>.
const BASE = process.env.BASE || '2d85042';
const DEFAULT_FILES = [
  'js/catalog.js', 'js/catalog-series.js', 'js/catalog-caricaturas.js', 'js/catalog-anime.js',
  'js/catalog-disney.js', 'js/catalog-musicales.js', 'js/catalog-sagas.js',
];

const files = process.argv.slice(2).length ? process.argv.slice(2) : DEFAULT_FILES;
const evid = JSON.parse(fs.readFileSync(path.join(__dirname, 'evidencia-v2.1.json'), 'utf8'));

function sourcesIn(text) {
  const out = [];
  const ytRe = /\byt\(\s*'([A-Za-z0-9_-]{11})'/g;
  let m;
  while ((m = ytRe.exec(text))) out.push({ tipo: 'youtube', id: m[1], key: 'yt:' + m[1] });
  const apRe = /apple\(\{([^}]*)\}\)/g;
  while ((m = apRe.exec(text))) {
    const body = m[1];
    const s = /song:\s*(\d+)/.exec(body);
    if (!s) continue;
    const c = /country:\s*'([a-z]{2})'/.exec(body);
    const country = c ? c[1] : 'us';
    out.push({ tipo: 'apple', id: s[1], country, key: 'ap:' + s[1] + ':' + country });
  }
  // am(N) de Musicales = [apple mx, apple us]: basta evidencia en uno de los dos países.
  const amRe = /\bam\(\s*(\d+)\s*\)/g;
  while ((m = amRe.exec(text))) out.push({ tipo: 'apple', id: m[1], country: 'mx|us', key: 'am:' + m[1] });
  return out;
}

let missing = 0;
let checked = 0;
for (const rel of files) {
  const now = fs.readFileSync(path.join(ROOT, rel), 'utf8').replace(/\r\n/g, '\n');
  let before = '';
  try {
    before = execSync(`git show ${BASE}:${rel}`, { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 << 20 });
  } catch (e) {
    before = '';
  }
  const old = new Set(sourcesIn(before).map((s) => s.key));
  const seen = new Set();
  for (const s of sourcesIn(now)) {
    if (old.has(s.key) || seen.has(s.key)) continue;
    seen.add(s.key);
    checked++;
    const e = evid[s.id];
    let problem = null;
    if (!e) problem = 'sin evidencia';
    else if (s.tipo === 'youtube') {
      if (e.tipo !== 'youtube') problem = 'evidencia de otro tipo';
      else if (!e.resultado || e.resultado.playabilityStatus !== 'OK' || e.resultado.playableInEmbed === false) problem = 'evidencia no OK';
    } else {
      if (e.tipo !== 'apple') problem = 'evidencia de otro tipo';
      else if (!e.resultado || !e.resultado.previewUrl) problem = 'sin previewUrl';
      else if (!s.country.split('|').includes(e.pais)) problem = `país distinto (evidencia ${e.pais}, fuente ${s.country})`;
    }
    if (problem) {
      missing++;
      console.log(`❌ ${rel}: ${s.tipo} ${s.id}${s.country ? ' (' + s.country + ')' : ''} → ${problem}`);
    }
  }
}
console.log(`${checked} IDs nuevos o cambiados revisados; ${missing} sin evidencia válida.`);
process.exit(missing ? 1 : 0);
