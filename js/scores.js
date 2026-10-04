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
    return request(endpoint() + '?' + p.toString(), { headers: headers() });
  }

  AM.Scores = { enabled: enabled, submit: submit, top: top, cleanNick: cleanNick };
})(window.AM = window.AM || {});
