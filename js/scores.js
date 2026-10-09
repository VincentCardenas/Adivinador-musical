/*
 * Ranking global (scoreboard) con Supabase.
 *
 * Se habla directo con la API REST de Supabase (sin librerías). La tabla y sus reglas
 * están en supabase/schema.sql y la URL + llave pública van en js/config.js.
 * Si no hay configuración, el juego funciona igual y el ranking se muestra como "no configurado".
 */
(function (AM) {
  'use strict';

  const NICK_CHARS = 'A-Za-z0-9ÁÉÍÓÚÜÑáéíóúüñ _.\\-';
  const NICK_RE = new RegExp('^[' + NICK_CHARS + ']{2,16}$');
  const HAS_ALNUM = /[A-Za-z0-9ÁÉÍÓÚÜÑáéíóúüñ]/;

  function cfg() { return (AM.CONFIG && AM.CONFIG.scoreboard) || {}; }

  function enabled() {
    const c = cfg();
    return !!(c.url && c.key);
  }

  function endpoint() {
    return String(cfg().url).replace(/\/+$/, '') + '/rest/v1/' + (cfg().table || 'scores');
  }

  function headers(extra) {
    const key = String(cfg().key);
    const h = { apikey: key, 'Content-Type': 'application/json' };
    // Las llaves "anon" antiguas son JWT y también van como Authorization;
    // las nuevas "publishable" (sb_publishable_…) solo van en `apikey`.
    if (/^eyJ/.test(key)) h.Authorization = 'Bearer ' + key;
    return Object.assign(h, extra || {});
  }

  async function request(url, opts) {
    const ctrl = typeof AbortController === 'function' ? new AbortController() : null;
    const timer = ctrl ? setTimeout(() => ctrl.abort(), 10000) : 0;
    try {
      const res = await fetch(url, Object.assign(ctrl ? { signal: ctrl.signal } : {}, opts));
      if (!res.ok) {
        let msg = '';
        try { const j = await res.json(); msg = j.message || j.hint || ''; } catch (e) { /* nada */ }
        const err = new Error(msg || 'HTTP ' + res.status);
        err.status = res.status;
        throw err;
      }
      if (res.status === 204) return null;
      const text = await res.text();
      return text ? JSON.parse(text) : null;
    } finally {
      clearTimeout(timer);
    }
  }

  /** Limpia el nickname: espacios de más fuera. Devuelve '' si no es válido. */
  function cleanNick(raw) {
    const nick = String(raw || '').replace(/\s+/g, ' ').trim();
    return NICK_RE.test(nick) && HAS_ALNUM.test(nick) ? nick : '';
  }

  /*
   * Nicknames ofensivos (insultos racistas, homofóbicos o de odio y groserías fuertes): no se pueden
   * guardar y, si alguno se colara, no se muestra. La base de datos tiene la misma regla
   * (supabase/schema.sql → nick_ofensivo y nick_permitido): si cambias estas listas, cámbialas allá igual;
   * scripts/validate-nick-filter.js revisa que coincidan y prueba ejemplos.
   * El nickname se compara en minúsculas, sin acentos, separando las palabras pegadas con mayúscula
   * ("ElPutoAmo" → "el puto amo") y leyendo 0 1 3 4 5 7 como o i e a s t.
   *  - PALABRAS: solo cuentan como palabra completa (así "Computadora", "Maricarmen" o "Vergara" sí se valen).
   *  - PEGADAS: cuentan aunque vayan dentro de otra palabra, con letras repetidas o separadas por puntos.
   */
  const PALABRAS = ' (p+u+t+[oa]+s*|p+u+t+i+t+[oa]+s*|j+o+t+o+s*|m+a+r+i+c+a+s*|v+e+r+g+a+s*|c+u+l+o+s*|c+h+i+n+g+[aeu]+s*|' +
    'f+a+g+s*|c+u+n+t+s*|s+h+i+t+(s+|t+y+)?|s+p+i+c+s*|c+h+i+n+k+s*|g+o+o+k+s*|c+o+o+n+s*|n+a+z+i+s*|h+e+i+l+|k+k+k+|' +
    'r+a+p+e+|r+a+p+i+s+t+s*|r+e+t+a+r+d+(e+d+)?s*|m+a+y+a+t+e+s*|t+r+o+l+o+s*|h+d+p+|p+t+m+) ';
  const PEGADAS = '(n+[iy]+g+g+|f+a+g+g+o+t+|m+a+r+i+c+o+n+|n+e+g+r+a+t+a+|s+u+d+a+c+a+|b+e+a+n+e+r+|w+e+t+b+a+c+k+|t+r+a+n+n+y+|' +
    'h+i+t+l+e+r+|s+i+e+g+h+e+i+l+|w+h+i+t+e+p+o+w+e+r+|k+u+k+l+u+x+|f+u+c+k+|b+u+l+l+s+h+i+t+|s+h+i+t+h+e+a+d+|' +
    'b+i+t+c+h+|w+h+o+r+e+|s+l+u+t+|p+u+s+s+y+|p+o+r+n+|a+s+s+h+o+l+e+|c+o+c+k+s+u+c+k+|d+i+c+k+h+e+a+d+|' +
    'p+e+n+d+e+j+|c+u+l+e+r+[oa]+|m+i+e+r+d+a+|c+h+i+n+g+a+d+|c+h+i+n+g+[aeu]+[st]+u+m+a+d+r+e+|h+i+j+[oa]+s*d+e+p+u+t+a+|' +
    'h+i+j+u+e+p+u+t+[ao]+|p+u+t+a+m+a+d+r+e+|c+o+n+c+h+[ae]+t+u+m+a+d+r+e+|m+a+l+p+a+r+i+d+[oa]+|m+a+m+a+g+u+e+v+o+|' +
    'g+i+l+i+p+o+l+l+a+s+|v+i+o+l+a+d+o+r+|p+e+d+o+f+i+l+|p+e+d+e+r+a+s+t+|s+u+b+n+o+r+m+a+l+|m+o+n+g+o+l+o+|s+i+d+o+s+[oa]+)';
  const PALABRAS_RE = new RegExp(PALABRAS);
  const PEGADAS_RE = new RegExp(PEGADAS);
  const ACENTOS = 'ÁÉÍÓÚÜÑáéíóúüñ';
  const SIN_ACENTO = 'aeiouunaeiouun';

  function isOffensive(nick) {
    const t = String(nick || '')
      .replace(/([a-záéíóúüñ])([A-ZÁÉÍÓÚÜÑ])/g, '$1 $2')
      .toLowerCase()
      .replace(/[ÁÉÍÓÚÜÑáéíóúüñ]/g, (c) => SIN_ACENTO[ACENTOS.indexOf(c)]);
    const leet = t.replace(/[013457]/g, (d) => 'oieast'['013457'.indexOf(d)]);
    const words = (s) => ' ' + s.replace(/[^a-z]+/g, ' ').trim() + ' ';
    return PALABRAS_RE.test(words(t)) || PALABRAS_RE.test(words(leet)) || PEGADAS_RE.test(leet.replace(/[^a-z]+/g, ''));
  }

  /**
   * Guarda un puntaje. `entry` = { nick, tema, modo, puntos, aciertos, rondas, racha }.
   * Devuelve el id de la fila nueva (para resaltarla en la tabla).
   */
  async function submit(entry) {
    const body = Object.assign({}, entry, { version: AM.CONFIG && AM.CONFIG.version });
    const rows = await request(endpoint() + '?select=id', {
      method: 'POST',
      headers: headers({ Prefer: 'return=representation' }),
      body: JSON.stringify(body),
    });
    return rows && rows[0] ? rows[0].id : null;
  }

  /** Los mejores puntajes de un tema + modo. `since` (Date) limita a los recientes. */
  function top(tema, modo, opts) {
    opts = opts || {};
    const p = new URLSearchParams({
      select: 'id,nick,puntos,aciertos,rondas,racha,created_at',
      tema: 'eq.' + tema,
      modo: 'eq.' + modo,
      order: 'puntos.desc,created_at.asc',
      limit: String(opts.limit || 50),
    });
    if (opts.since) p.set('created_at', 'gte.' + opts.since.toISOString());
    return request(endpoint() + '?' + p.toString(), { headers: headers() })
      .then((rows) => (Array.isArray(rows) ? rows.filter((r) => !isOffensive(r.nick)) : rows));
  }

  AM.Scores = {
    enabled: enabled, submit: submit, top: top, cleanNick: cleanNick, isOffensive: isOffensive,
    NICK_RULES: { palabras: PALABRAS, pegadas: PEGADAS },
  };
})(window.AM = window.AM || {});
