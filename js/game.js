/*
 * Reglas del juego: modos, selección de pistas, opciones, puntaje y textos de resultado.
 * No toca el DOM; app.js se encarga de la interfaz.
 */
(function (AM) {
  'use strict';

  AM.MODES = {
    clasico: {
      id: 'clasico', name: 'Clásico', icon: '🎯',
      describe: (T) => `10 rondas · 4 opciones · adivina ${T.broadArt}. Responder rápido da más puntos.`,
      rounds: 10, answer: 'franchise', timeLimit: 20,
    },
    experto: {
      id: 'experto', name: 'Experto', icon: '🎧',
      describe: (T) => `Empiezas con 1 segundo. Cada fallo o salto desbloquea más. Escribe ${T.expertGoal}.`,
      rounds: 10, answer: 'game',
      steps: [1, 2, 4, 7, 11, 16],
      points: [500, 400, 300, 200, 150, 100],
    },
    supervivencia: {
      id: 'supervivencia', name: 'Supervivencia', icon: '❤️',
      describe: (T) => `3 vidas · ${T.survivalGoal} · el reloj se acorta mientras más aciertas.`,
      rounds: Infinity, answer: 'game', lives: 3, timeLimit: 15, minTime: 7,
    },
  };

  AM.MIN_POOL = 5;

  function shuffle(list) {
    const a = list.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function sample(list, n) { return shuffle(list).slice(0, n); }

  function unique(list) { return Array.from(new Set(list)); }

  /**
   * "Alcance" de una partida: el tema elegido con sus filtros (Pixar, idioma…).
   * Define qué pistas pueden sonar y qué respuestas aparecen como opciones o en el buscador,
   * para que nunca se mezclen temas (por ejemplo, "Halo" como opción en una pista de Friends).
   */
  const scopes = new Map();
  function scope(themeId, filterValues) {
    const T = AM.theme(themeId);
    const vals = {};
    T.filters.forEach((f) => {
      vals[f.id] = filterValues && f.id in filterValues ? filterValues[f.id] : f.default;
    });
    const key = T.id + '|' + JSON.stringify(vals);
    if (scopes.has(key)) return scopes.get(key);
    const keep = (t) => T.filters.every((f) => f.keep(t, vals[f.id]));
    const s = {
      key: key,
      theme: T,
      values: vals,
      keep: keep,
      tracks: AM.CATALOG.filter((t) => t.theme === T.id && keep(t)),
      extras: AM.EXTRA_GAMES.filter((g) => g.theme === T.id && keep(g)),
      games: null,
    };
    scopes.set(key, s);
    return s;
  }

  /** Pistas de las categorías elegidas, sin las que el jugador ocultó al reportarlas. */
  function pool(cats, hidden, keep) {
    const set = new Set(cats);
    const skip = new Set(hidden || []);
    return AM.CATALOG.filter((t) => set.has(t.cat) && !skip.has(t.id) && (!keep || keep(t)));
  }

  /**
   * Arma la cola de pistas de una partida:
   *  1. primero las que el jugador nunca ha escuchado (en orden aleatorio);
   *  2. después las ya escuchadas, de la más antigua a la más reciente;
   *  3. sin la misma saga dos veces seguidas y con máximo `maxPerFranchise`
   *     pistas de una misma saga por cada bloque de 10 rondas.
   * `seen` es un mapa { idDePista: marcaDeTiempoDeLaÚltimaVez }.
   */
  function buildQueue(tracks, seen, maxPerFranchise) {
    seen = seen || {};
    const fresh = shuffle(tracks.filter((t) => !seen[t.id]));
    const old = tracks.filter((t) => seen[t.id]).sort((a, b) => seen[a.id] - seen[b.id]);
    // Entre las ya escuchadas, mezclamos por tandas para que no salgan siempre en el mismo orden.
    const oldMixed = [];
    for (let i = 0; i < old.length; i += 12) oldMixed.push.apply(oldMixed, shuffle(old.slice(i, i + 12)));
    return diversify(fresh.concat(oldMixed), maxPerFranchise || 2);
  }

  function diversify(list, maxPer) {
    const out = [];
    const pending = list.slice();
    while (pending.length) {
      const blockStart = out.length - (out.length % 10);
      const counts = {};
      for (let i = blockStart; i < out.length; i++) counts[out[i].franchise] = (counts[out[i].franchise] || 0) + 1;
      const prev = out[out.length - 1];
      const notPrev = (t) => !prev || t.franchise !== prev.franchise;
      let idx = pending.findIndex((t) => notPrev(t) && (counts[t.franchise] || 0) < maxPer);
      if (idx < 0) idx = pending.findIndex(notPrev);
      if (idx < 0) idx = 0;
      out.push(pending.splice(idx, 1)[0]);
    }
    return out;
  }

  /** Todas las respuestas exactas del alcance (con pista + señuelos), sin repetir. */
  function allGames(sc) {
    if (sc.games) return sc.games;
    const map = new Map();
    sc.tracks.concat(sc.extras).forEach((g) => {
      const hit = map.get(g.game);
      if (!hit) map.set(g.game, { game: g.game, franchise: g.franchise, cat: g.cat || null, aka: (g.aka || []).slice() });
      else (g.aka || []).forEach((a) => { if (hit.aka.indexOf(a) < 0) hit.aka.push(a); });
    });
    sc.games = Array.from(map.values()).sort((a, b) => a.game.localeCompare(b.game, 'es'));
    return sc.games;
  }

  function franchiseOf(gameName, sc) {
    const hit = allGames(sc).find((g) => g.game === gameName);
    return hit ? hit.franchise : null;
  }

  /**
   * Genera 4 opciones. En Clásico son sagas; en Supervivencia, juegos exactos
   * (con un "primo" de la misma saga para que sea más difícil).
   */
  function makeChoices(track, mode, sc, n) {
    n = n || 4;
    const picked = [];
    const add = (list, max) => {
      for (const v of shuffle(list)) {
        if (picked.length >= n - 1 || max <= 0) break;
        if (v !== track[mode.answer] && picked.indexOf(v) < 0) { picked.push(v); max--; }
      }
    };

    if (mode.answer === 'franchise') {
      const sameCat = unique(sc.tracks.filter((t) => t.cat === track.cat).map((t) => t.franchise));
      const all = unique(sc.tracks.concat(sc.extras).map((t) => t.franchise));
      add(sameCat, 2);
      add(all, n);
      return shuffle(picked.concat([track.franchise]));
    }

    const games = allGames(sc);
    const sameFranchise = games.filter((g) => g.franchise === track.franchise).map((g) => g.game);
    const sameCat = sc.tracks.filter((t) => t.cat === track.cat).map((t) => t.game);
    add(sameFranchise, 1);
    add(unique(sameCat), 1);
    add(games.map((g) => g.game), n);
    return shuffle(picked.concat([track.game]));
  }

  function multiplier(streak) {
    if (streak >= 5) return 2;
    if (streak >= 3) return 1.5;
    return 1;
  }

  /** Puntos de una respuesta correcta en Clásico/Supervivencia. */
  function timedPoints(remainRatio, streak) {
    const base = 100 + Math.round(100 * Math.max(0, Math.min(1, remainRatio)));
    return Math.round(base * multiplier(streak));
  }

  function timeLimit(mode, correctSoFar) {
    if (!mode.timeLimit) return 0;
    if (!mode.minTime) return mode.timeLimit;
    return Math.max(mode.minTime, mode.timeLimit - Math.floor(correctSoFar / 3));
  }

  function rank(mode, stats, T) {
    const ranks = (T || AM.THEMES[0]).ranks;
    if (mode.id === 'supervivencia') {
      const hit = ranks.survival.find((r) => stats.correct >= r[0]) || ranks.survival[ranks.survival.length - 1];
      return [hit[1], hit[2]];
    }
    const ratio = stats.total ? stats.correct / stats.total : 0;
    const hit = ranks.ratio.find((r) => ratio >= r[0]) || ranks.ratio[ranks.ratio.length - 1];
    return [hit[1], hit[2]];
  }

  function emojiFor(mode, h) {
    if (mode.id === 'experto') {
      if (h.result !== 'ok') return '🟥';
      if (h.tries <= 1) return '🟩';
      if (h.tries <= 3) return '🟨';
      return '🟧';
    }
    if (h.result === 'ok') return '🟩';
    if (h.result === 'timeout') return '⬛';
    return '🟥';
  }

  function shareText(mode, stats, history, T) {
    T = T || AM.THEMES[0];
    const grid = history.map((h) => emojiFor(mode, h)).join('');
    const lines = [`${T.icon} ${T.title.join(' ')} — ${mode.name}`, grid];
    if (mode.id === 'supervivencia') {
      lines.push(`Aciertos: ${stats.correct} · ${stats.score} pts · racha máx. ${stats.bestStreak}`);
    } else {
      lines.push(`${stats.correct}/${stats.total} · ${stats.score} pts · racha máx. ${stats.bestStreak}`);
    }
    return lines.join('\n');
  }

  AM.Logic = {
    shuffle: shuffle, sample: sample, scope: scope, pool: pool, buildQueue: buildQueue, allGames: allGames,
    franchiseOf: franchiseOf, makeChoices: makeChoices, multiplier: multiplier,
    timedPoints: timedPoints, timeLimit: timeLimit, rank: rank, emojiFor: emojiFor, shareText: shareText,
  };
})(window.AM = window.AM || {});
