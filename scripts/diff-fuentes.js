#!/usr/bin/env node
/*
 * Lista, por pista, las fuentes viejas y nuevas respecto a origin/claude/clever-sagan-5xuvc1,
 * con el título y canal/artista de la evidencia. Sirve para revisar a ojo y para el reporte.
 *   node scripts/diff-fuentes.js [--md] [archivos...]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const BASE = 'origin/claude/clever-sagan-5xuvc1';
const args = process.argv.slice(2);
const md = args.includes('--md');
const files = args.filter((a) => a !== '--md');
const FILES = files.length ? files : [
  'js/catalog.js', 'js/catalog-series.js', 'js/catalog-caricaturas.js', 'js/catalog-anime.js',
  'js/catalog-disney.js', 'js/catalog-musicales.js', 'js/catalog-sagas.js',
];
const evid = JSON.parse(fs.readFileSync(path.join(__dirname, 'evidencia-v2.1.json'), 'utf8'));

function blocks(text) {
  const map = new Map();
  const re = /id:\s*'([^']+)'/g;
  const idx = [];
  let m;
  while ((m = re.exec(text))) idx.push({ id: m[1], at: m.index });
  for (let i = 0; i < idx.length; i++) {
    const end = i + 1 < idx.length ? idx[i + 1].at : text.length;
    const chunk = text.slice(idx[i].at, end);
    const s = /sources:\s*([\s\S]*?)\n\s*\},?\s*(?:\n|$)/.exec(chunk);
    const comp = /composer:\s*(['"])(.*?)\1/.exec(chunk);
    map.set(idx[i].id, { sources: s ? s[1].replace(/\s+/g, ' ').trim() : '', composer: comp ? comp[2] : '' });
  }
  return map;
}

function describe(src) {
  const parts = [];
  const re = /yt\(\s*'([A-Za-z0-9_-]{11})'(?:\s*,\s*(\d+))?\)|apple\(\{([^}]*)\}\)|\bam\(\s*(\d+)\s*\)|amAlbum\([^)]*\)|buscaTv\([^)]*\)|busca\([^)]*\)/g;
  let m;
  while ((m = re.exec(src))) {
    if (m[4]) {
      const e = evid[m[4]];
      parts.push(`am ${m[4]}` + (e ? ` «${e.titulo}» (${e.canal_o_artista} — ${e.album}, ${e.pais})` : ''));
    } else if (m[1]) {
      const e = evid[m[1]];
      parts.push(`yt ${m[1]}${m[2] ? ' t=' + m[2] : ''}` + (e ? ` «${e.titulo}» (${e.canal_o_artista}, ${e.duracion}s)` : ''));
    } else if (m[3] !== undefined) {
      const s = /song:\s*(\d+)/.exec(m[3]);
      const c = /country:\s*'([a-z]{2})'/.exec(m[3]);
      if (s) {
        const e = evid[s[1]];
        parts.push(`apple ${s[1]} ${c ? c[1] : 'us'}` + (e ? ` «${e.titulo}» (${e.canal_o_artista} — ${e.album})` : ''));
      } else parts.push(`apple {${m[3].trim()}}`);
    } else parts.push(m[0]);
  }
  return parts;
}

for (const rel of FILES) {
  const now = fs.readFileSync(path.join(ROOT, rel), 'utf8').replace(/\r\n/g, '\n');
  let before = '';
  try { before = execSync(`git show ${BASE}:${rel}`, { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 << 20 }).replace(/\r\n/g, '\n'); } catch (e) { /* nuevo */ }
  const a = blocks(before);
  const b = blocks(now);
  const rows = [];
  for (const [id, nb] of b) {
    const ob = a.get(id);
    if (!ob) rows.push({ id, tipo: 'nueva', old: [], neu: describe(nb.sources) });
    else if (ob.sources !== nb.sources || ob.composer !== nb.composer) rows.push({ id, tipo: 'cambiada', old: describe(ob.sources), neu: describe(nb.sources), oc: ob.composer, nc: nb.composer });
  }
  for (const [id] of a) if (!b.has(id)) rows.push({ id, tipo: 'quitada', old: describe(a.get(id).sources), neu: [] });
  if (!rows.length) continue;
  console.log(md ? `\n### ${rel}\n` : `\n=== ${rel} (${rows.length}) ===`);
  for (const r of rows) {
    if (md) {
      console.log(`- \`${r.id}\` (${r.tipo})${r.oc !== r.nc && r.tipo === 'cambiada' ? ` — composer: "${r.oc}" → "${r.nc}"` : ''}`);
      if (r.old.length) console.log(`  - antes: ${r.old.join(' · ')}`);
      if (r.neu.length) console.log(`  - ahora: ${r.neu.join(' · ')}`);
    } else {
      console.log(`- ${r.id} [${r.tipo}]${r.oc !== r.nc && r.tipo === 'cambiada' ? ` composer "${r.oc}" → "${r.nc}"` : ''}`);
      if (r.old.length) console.log(`    antes: ${r.old.join(' | ')}`);
      if (r.neu.length) console.log(`    ahora: ${r.neu.join(' | ')}`);
    }
  }
}
