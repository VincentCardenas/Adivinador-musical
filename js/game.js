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
      describe: (T) => `3 vidas · ${T.survivalGoal} · el reloj se acorta mientras más aciertas. Cada 5 canciones hay ronda bonus ⭐: si aciertas, recuperas una vida.`,
      // bonusEvery: cada cuántas rondas toca una ronda bonus (acertarla devuelve una vida; fallarla no la quita).
      rounds: Infinity, answer: 'game', lives: 3, timeLimit: 15, minTime: 7, bonusEvery: 5,
    },
    // Solo en Videojuegos: eliges una saga (o un juego de ella) y adivinas qué canción es.
    sagas: {
      id: 'sagas', name: 'Sagas', icon: '🗂️',
      describe: () => '10 rondas · 4 opciones · elige una saga (o uno de sus juegos) y adivina qué canción es.',
      rounds: 10, answer: 'label', timeLimit: 20, themes: ['juegos'], ranked: false,
    },
  };

  /** ¿El modo existe en este tema? (Sagas solo en Videojuegos). */
  AM.modeAvailable = (modeId, themeId) => {
    const m = AM.MODES[modeId];
    return !!m && (!m.themes || m.themes.indexOf(themeId) >= 0);
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
      let v = filterValues && f.id in filterValues ? filterValues[f.id] : f.default;
      // Un valor guardado que ya no existe (opción renombrada o quitada) vuelve al de siempre.
      if (f.type === 'choice' && !f.options.some((o) => o.value === v)) v = f.default;
      vals[f.id] = v;
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
  function buildQueue(tracks, seen, maxPerFranchise, groupKey) {
    seen = seen || {};
    const fresh = shuffle(tracks.filter((t) => !seen[t.id]));
    const old = tracks.filter((t) => seen[t.id]).sort((a, b) => seen[a.id] - seen[b.id]);
    // Entre las ya escuchadas, mezclamos por tandas para que no salgan siempre en el mismo orden.
    const oldMixed = [];
    for (let i = 0; i < old.length; i += 12) oldMixed.push.apply(oldMixed, shuffle(old.slice(i, i + 12)));
    return diversify(fresh.concat(oldMixed), maxPerFranchise || 2, groupKey || 'franchise');
  }

  /** `key`: campo por el que se reparten las pistas (la saga; en el modo Sagas, el juego). */
  function diversify(list, maxPer, key) {
    const out = [];
    const pending = list.slice();
    while (pending.length) {
      const blockStart = out.length - (out.length % 10);
      const counts = {};
      for (let i = blockStart; i < out.length; i++) counts[out[i][key]] = (counts[out[i][key]] || 0) + 1;
      const prev = out[out.length - 1];
      const notPrev = (t) => !prev || t[key] !== prev[key];
      let idx = pending.findIndex((t) => notPrev(t) && (counts[t[key]] || 0) < maxPer);
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
      if (!hit) map.set(g.game, { game: g.game, franchise: g.franchise, cat: g.cat || null, lang: g.lang || '', aka: (g.aka || []).slice() });
      else (g.aka || []).forEach((a) => { if (hit.aka.indexOf(a) < 0) hit.aka.push(a); });
    });
    sc.games = Array.from(map.values()).sort((a, b) => a.game.localeCompare(b.game, 'es'));
    return sc.games;
  }

  /** Artistas de un crédito ("Shakira y Maluma" → ["shakira", "maluma"]). */
  function artistsOf(credit) {
    return String(credit || '').split(/\s*(?:,|&|\by\b|\bfeat\.?|\bft\.?)\s*/i)
      .map((a) => AM.Sources.norm(a)).filter(Boolean);
  }

  /** ¿Comparten al menos un artista? (para que "Shakira" no salga como opción falsa de "Shakira y Maluma"). */
  function sameArtist(a, b) {
    const list = artistsOf(a);
    return artistsOf(b).some((x) => list.indexOf(x) >= 0);
  }

  /**
   * ¿Son la misma respuesta con otro nombre? Pasa con las versiones en español de una canción:
   * "Getsemaní" lleva "Gethsemane" en `aka` (y al revés), así que en Experto vale cualquiera de los dos
   * y en Supervivencia nunca salen juntas como opciones.
   */
  function sameAnswer(sc, a, b) {
    if (a === b) return true;
    if (!sc.aliases) {
      sc.aliases = new Map();
      allGames(sc).forEach((g) => { if (g.aka.length) sc.aliases.set(g.game, new Set(g.aka.map(AM.Sources.norm))); });
    }
    const ha = sc.aliases.get(a);
    const hb = sc.aliases.get(b);
    return !!((ha && ha.has(AM.Sources.norm(b))) || (hb && hb.has(AM.Sources.norm(a))));
  }

  function franchiseOf(gameName, sc) {
    const hit = allGames(sc).find((g) => g.game === gameName);
    return hit ? hit.franchise : null;
  }

  /**
   * Genera 4 opciones. En Clásico son sagas; en Supervivencia, juegos exactos
   * (con un "primo" de la misma saga para que sea más difícil).
   */
  /*
   * Grupo de opciones falsas de una categoría (`decoyGroup`): los openings de anime solo
   * compiten contra anime, y las caricaturas contra caricaturas (si no, se descartan solas).
   */
  const groups = {};
  function groupOf(item) {
    const cat = item && item.cat;
    if (!cat) return '';
    if (!(cat in groups)) {
      const c = AM.CATEGORIES.find((x) => x.id === cat);
      groups[cat] = (c && c.decoyGroup) || '';
    }
    return groups[cat];
  }

  /** ¿Son versiones del mismo juego (`AM.VERSIONS`: remake, edición, expansión aparte)? */
  let versionFamily = null;
  function sameVersion(a, b) {
    if (!versionFamily) {
      versionFamily = new Map();
      (AM.VERSIONS || []).forEach((list, i) => list.forEach((name) => versionFamily.set(name, i)));
    }
    return versionFamily.has(a) && versionFamily.get(a) === versionFamily.get(b);
  }

  function makeChoices(track, mode, sc, n) {
    n = n || 4;
    if (mode.answer === 'label') return songChoices(track, sc, n);
    const group = groupOf(track);
    const inGroup = (t) => groupOf(t) === group;
    // En Canciones, las opciones falsas van en el idioma de la que suena (inglés con inglés).
    const lang = track.lang || '';
    const fits = (t) => inGroup(t) && (!lang || t.lang === lang);
    const answer = track[mode.answer];
    const picked = [];
    // En Canciones la respuesta amplia es el artista: las opciones falsas no pueden compartir
    // artista con la correcta ni entre ellas (si no, "Shakira" sería "incorrecto" en un dueto suyo).
    // Tampoco salen juntas dos versiones del mismo juego (Persona 3 y Persona 3 Reload) ni los dos
    // títulos de una misma canción (Gethsemane y Getsemaní).
    const byArtist = mode.answer === 'franchise' && sc.theme.showArtist;
    const byAlias = mode.answer === 'game';
    const clash = (v) => [answer].concat(picked).some((p) => sameVersion(p, v) || (byAlias && sameAnswer(sc, p, v)) || (byArtist && sameArtist(p, v)));
    const add = (list, max) => {
      for (const v of shuffle(list)) {
        if (picked.length >= n - 1 || max <= 0) break;
        if (v !== answer && picked.indexOf(v) < 0 && !clash(v)) { picked.push(v); max--; }
      }
    };

    // Canciones (`optionsByCat`): las opciones falsas son del mismo género que la que suena (una cumbia
    // contra cumbias, metal contra metal) y, si no alcanzan, de otros géneros. Los demás temas solo
    // toman una o dos de la misma categoría.
    const byCat = !!sc.theme.optionsByCat;
    const sameCat = sc.tracks.filter((t) => t.cat === track.cat);

    if (mode.answer === 'franchise') {
      const all = sc.tracks.concat(sc.extras);
      add(unique(sameCat.filter(fits).map((t) => t.franchise)), byCat ? n : 2);
      if (byCat) add(unique(sameCat.map((t) => t.franchise)), n);
      add(unique(all.filter(fits).map((t) => t.franchise)), n);
      add(unique(all.filter(inGroup).map((t) => t.franchise)), n); // por si el idioma dejó muy pocas
      return shuffle(picked.concat([answer]));
    }

    const games = allGames(sc).filter(inGroup);
    const same = games.filter(fits);
    add(same.filter((g) => g.franchise === track.franchise).map((g) => g.game), 1);
    add(unique(sameCat.filter(fits).map((t) => t.game)), byCat ? n : 1);
    if (byCat) add(unique(sameCat.map((t) => t.game)), n);
    add(same.map((g) => g.game), n);
    add(games.map((g) => g.game), n); // por si el idioma dejó muy pocas
    return shuffle(picked.concat([answer]));
  }

  /* ═════════ modo Sagas ═════════ */

  const sagaCache = new Map();

  /** Todas las pistas de una saga: las del catálogo normal de sus sagas + las exclusivas del modo (AM.SAGA_TRACKS). */
  function sagaTracks(sagaId) {
    if (sagaCache.has(sagaId)) return sagaCache.get(sagaId);
    const saga = (AM.SAGAS || []).find((s) => s.id === sagaId);
    if (!saga) return [];
    const seen = new Set();
    const skip = saga.excludeGames || [];
    const list = AM.CATALOG.filter((t) => t.theme === 'juegos' && saga.franchises.indexOf(t.franchise) >= 0 && skip.indexOf(t.game) < 0)
      .concat((AM.SAGA_TRACKS || []).filter((t) => t.saga === sagaId))
      .filter((t) => {
        const k = t.game + '|' + AM.Sources.norm(t.title);
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      });
    sagaCache.set(sagaId, list);
    return list;
  }

  /** Juegos de una saga en orden de salida, con cuántas canciones distintas tiene cada uno. */
  function sagaGames(sagaId) {
    const map = new Map();
    sagaTracks(sagaId).forEach((t) => {
      const g = map.get(t.game) || { game: t.game, year: t.year || 9999, titles: new Set() };
      g.year = Math.min(g.year, t.year || 9999);
      g.titles.add(AM.Sources.norm(t.title));
      map.set(t.game, g);
    });
    return Array.from(map.values())
      .map((g) => ({ game: g.game, year: g.year, songs: g.titles.size }))
      .sort((a, b) => a.year - b.year || a.game.localeCompare(b.game));
  }

  /**
   * Nombre corto de un juego dentro de su saga, para las opciones y los botones de juego:
   * `short` lo da tal cual y `prefix` se quita ("The Legend of Zelda: Ocarina of Time" → "Ocarina of Time").
   */
  function sagaGameName(saga, game) {
    if (saga && saga.short && saga.short[game]) return saga.short[game];
    return saga && saga.prefix && game.indexOf(saga.prefix) === 0 ? game.slice(saga.prefix.length) : game;
  }

  /**
   * Alcance de una partida de Sagas: toda la saga o un solo juego. Las pistas son copias con `label`
   * (la respuesta): "juego - título" con toda la saga ("Halo 3 - One Final Effort") y solo el título
   * con un juego, porque ahí todas las opciones son del mismo.
   */
  function sagaScope(sagaId, gameName) {
    const key = 'saga|' + sagaId + '|' + (gameName || '');
    if (scopes.has(key)) return scopes.get(key);
    const saga = (AM.SAGAS || []).find((x) => x.id === sagaId);
    const tracks = sagaTracks(sagaId).filter((t) => !gameName || t.game === gameName).map((t) => Object.assign({}, t, {
      theme: 'juegos',
      label: gameName ? t.title : `${sagaGameName(saga, t.game)} - ${t.title}`,
    }));
    const s = {
      key: key, theme: AM.theme('juegos'), values: {}, keep: () => true,
      tracks: tracks, extras: [], games: null,
      saga: saga, game: gameName || '',
    };
    scopes.set(key, s);
    return s;
  }

  /** Opciones del modo Sagas: otras canciones del alcance (una del mismo juego, si hay). */
  function songChoices(track, sc, n) {
    const picked = [];
    const add = (list, max) => {
      for (const v of shuffle(list)) {
        if (picked.length >= n - 1 || max <= 0) break;
        if (v !== track.label && picked.indexOf(v) < 0) { picked.push(v); max--; }
      }
    };
    add(unique(sc.tracks.filter((t) => t.game === track.game).map((t) => t.label)), 1);
    add(unique(sc.tracks.map((t) => t.label)), n);
    return shuffle(picked.concat([track.label]));
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

  /** ¿La ronda número `round` (la primera es 1) es ronda bonus? En Supervivencia: la 5, la 10, la 15… */
  function isBonusRound(mode, round) {
    return !!mode.bonusEvery && round > 0 && round % mode.bonusEvery === 0;
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
    if (h.result === 'ok') return h.bonus ? '⭐' : '🟩';
    if (h.result === 'timeout') return '⬛';
    return '🟥';
  }

  function shareText(mode, stats, history, T) {
    T = T || AM.THEMES[0];
    const grid = history.map((h) => emojiFor(mode, h)).join('');
    const lines = [`${T.icon} ¿Qué suena? · ${T.label} — ${mode.name}`, grid];
    if (mode.id === 'supervivencia') {
      const lives = stats.livesWon ? ` · ❤️ +${stats.livesWon}` : '';
      lines.push(`Aciertos: ${stats.correct} · ${stats.score} pts · racha máx. ${stats.bestStreak}${lives}`);
    } else {
      lines.push(`${stats.correct}/${stats.total} · ${stats.score} pts · racha máx. ${stats.bestStreak}`);
    }
    return lines.join('\n');
  }

  AM.Logic = {
    shuffle: shuffle, sample: sample, scope: scope, pool: pool, buildQueue: buildQueue, allGames: allGames,
    sameArtist: sameArtist, sameVersion: sameVersion, sameAnswer: sameAnswer,
    sagaTracks: sagaTracks, sagaGames: sagaGames, sagaScope: sagaScope, sagaGameName: sagaGameName,
    franchiseOf: franchiseOf, makeChoices: makeChoices, multiplier: multiplier,
    timedPoints: timedPoints, timeLimit: timeLimit, isBonusRound: isBonusRound, rank: rank, emojiFor: emojiFor, shareText: shareText,
  };
})(window.AM = window.AM || {});
