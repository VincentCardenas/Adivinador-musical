/*
 * Reglas del juego: modos, selección de pistas, opciones, puntaje y textos de resultado.
 * No toca el DOM; app.js se encarga de la interfaz.
 */
(function (AM) {
  'use strict';

  AM.MODES = {
    clasico: {
      id: 'clasico', name: 'Clásico', icon: '🎯',
      desc: '10 rondas · 4 opciones · adivina la saga. Responder rápido da más puntos.',
      rounds: 10, answer: 'franchise', timeLimit: 20,
    },
    experto: {
      id: 'experto', name: 'Experto', icon: '🎧',
      desc: 'Empiezas con 1 segundo. Cada fallo o salto desbloquea más. Escribe el juego exacto.',
      rounds: 10, answer: 'game',
      steps: [1, 2, 4, 7, 11, 16],
      points: [500, 400, 300, 200, 150, 100],
    },
    supervivencia: {
      id: 'supervivencia', name: 'Supervivencia', icon: '❤️',
      desc: '3 vidas · juego exacto · el reloj se acorta mientras más aciertas.',
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

  function pool(cats) {
    const set = new Set(cats);
    return AM.CATALOG.filter((t) => set.has(t.cat));
  }

  /** Mezcla las pistas evitando, si se puede, dos seguidas del mismo juego. */
  function buildQueue(tracks) {
    const a = shuffle(tracks);
    for (let i = 1; i < a.length; i++) {
      if (a[i].game !== a[i - 1].game) continue;
      const j = a.findIndex((t, k) => k > i && t.game !== a[i - 1].game);
      if (j > 0) { const t = a[i]; a[i] = a[j]; a[j] = t; }
    }
    return a;
  }

  let gamesCache = null;
  /** Todos los juegos conocidos (con pista + señuelos), sin repetir. */
  function allGames() {
    if (gamesCache) return gamesCache;
    const map = new Map();
    AM.CATALOG.concat(AM.EXTRA_GAMES).forEach((g) => {
      if (!map.has(g.game)) map.set(g.game, { game: g.game, franchise: g.franchise, cat: g.cat || null });
    });
    gamesCache = Array.from(map.values()).sort((a, b) => a.game.localeCompare(b.game, 'es'));
    return gamesCache;
  }

  function franchiseOf(gameName) {
    const hit = allGames().find((g) => g.game === gameName);
    return hit ? hit.franchise : null;
  }

  /**
   * Genera 4 opciones. En Clásico son sagas; en Supervivencia, juegos exactos
   * (con un "primo" de la misma saga para que sea más difícil).
   */
  function makeChoices(track, mode, n) {
    n = n || 4;
    const picked = [];
    const add = (list, max) => {
      for (const v of shuffle(list)) {
        if (picked.length >= n - 1 || max <= 0) break;
        if (v !== track[mode.answer] && picked.indexOf(v) < 0) { picked.push(v); max--; }
      }
    };

    if (mode.answer === 'franchise') {
      const sameCat = unique(AM.CATALOG.filter((t) => t.cat === track.cat).map((t) => t.franchise));
      const all = unique(AM.CATALOG.concat(AM.EXTRA_GAMES).map((t) => t.franchise));
      add(sameCat, 2);
      add(all, n);
      return shuffle(picked.concat([track.franchise]));
    }

    const games = allGames();
    const sameFranchise = games.filter((g) => g.franchise === track.franchise).map((g) => g.game);
    const sameCat = AM.CATALOG.filter((t) => t.cat === track.cat).map((t) => t.game);
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

  function rank(mode, stats) {
    if (mode.id === 'supervivencia') {
      const c = stats.correct;
      if (c >= 25) return ['Leyenda del soundtrack', 'Tus oídos tienen el 100% de logros.'];
      if (c >= 15) return ['Jefe final', 'Pocos llegan tan lejos. ¡Impresionante!'];
      if (c >= 8) return ['Veterano gamer', 'Tienes buen oído. ¿Otra partida?'];
      if (c >= 3) return ['Aventurero', 'Vas por buen camino.'];
      return ['Novato', 'Todos empezamos en el nivel 1-1.'];
    }
    const r = stats.total ? stats.correct / stats.total : 0;
    if (r >= 0.9) return ['Leyenda del soundtrack', 'Reconoces los juegos con los ojos cerrados.'];
    if (r >= 0.7) return ['Gran oído gamer', '¡Casi perfecto!'];
    if (r >= 0.4) return ['Nada mal, jugador', 'Sigue practicando y subirás de nivel.'];
    return ['A seguir practicando', 'Hay mucho soundtrack por descubrir.'];
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

  function shareText(mode, stats, history) {
    const grid = history.map((h) => emojiFor(mode, h)).join('');
    const lines = [`🎮 ¿Qué juego suena? — ${mode.name}`, grid];
    if (mode.id === 'supervivencia') {
      lines.push(`Aciertos: ${stats.correct} · ${stats.score} pts · racha máx. ${stats.bestStreak}`);
    } else {
      lines.push(`${stats.correct}/${stats.total} · ${stats.score} pts · racha máx. ${stats.bestStreak}`);
    }
    return lines.join('\n');
  }

  AM.Logic = {
    shuffle: shuffle, sample: sample, pool: pool, buildQueue: buildQueue, allGames: allGames,
    franchiseOf: franchiseOf, makeChoices: makeChoices, multiplier: multiplier,
    timedPoints: timedPoints, timeLimit: timeLimit, rank: rank, emojiFor: emojiFor, shareText: shareText,
  };
})(window.AM = window.AM || {});
