/*
 * Interfaz y flujo de la partida.
 */
(function (AM) {
  'use strict';

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ESC[c]);
  const fmt = (n) => Number(n || 0).toLocaleString('es');

  /* ── almacenamiento local (opcional: si falla, el juego sigue) ── */
  const Store = {
    get(key, fallback) {
      try {
        const raw = localStorage.getItem('am.' + key);
        return raw == null ? fallback : JSON.parse(raw);
      } catch (e) { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem('am.' + key, JSON.stringify(value)); } catch (e) { /* nada */ }
    },
  };

  const savedTheme = Store.get('theme', 'juegos');
  const savedMode = Store.get('mode', 'clasico');
  const savedVolume = Number(Store.get('volume', 0.8));
  const savedFilters = Store.get('filters', {});
  const savedSaga = Store.get('saga', null) || {};
  const settings = {
    theme: AM.THEMES.some((t) => t.id === savedTheme) ? savedTheme : 'juegos',
    mode: AM.MODES[savedMode] ? savedMode : 'clasico',
    // Modo Sagas: qué saga y, si se eligió, qué juego ('' = toda la saga).
    saga: { id: savedSaga.id, game: typeof savedSaga.game === 'string' ? savedSaga.game : '' },
    cats: {},     // categorías elegidas, por tema
    filters: savedFilters && typeof savedFilters === 'object' ? savedFilters : {}, // { disney: { pixar }, canciones: { lang } }
    volume: isFinite(savedVolume) ? Math.max(0, Math.min(1, savedVolume)) : 0.8,
    sfx: Store.get('sfx', true) !== false,
  };

  // Categorías por tema. Las versiones anteriores guardaban solo las de videojuegos en "cats".
  (function loadCats() {
    const saved = Store.get('catsByTheme', null) || {};
    const legacy = Store.get('cats', null);
    AM.THEMES.forEach((T) => {
      const all = AM.themeCategories(T.id).map((c) => c.id);
      let list = saved[T.id];
      if (!list && T.id === 'juegos' && Array.isArray(legacy)) list = legacy;
      list = Array.isArray(list) ? list.filter((c) => all.indexOf(c) >= 0) : all.slice();
      settings.cats[T.id] = list.length ? list : all.slice();
    });
  })();
  if (!AM.modeAvailable(settings.mode, settings.theme)) settings.mode = 'clasico';
  if (!AM.SAGAS.some((x) => x.id === settings.saga.id)) settings.saga = { id: AM.SAGAS[0].id, game: '' };
  if (settings.saga.game && !sagaPlayableGames().some((g) => g.game === settings.saga.game)) settings.saga.game = '';

  /* ── récords por tema y modo (antes eran solo por modo: pasan a Videojuegos) ── */
  const Records = {
    all: (function () {
      let r = Store.get('records2', null);
      if (!r || typeof r !== 'object') {
        r = {};
        const old = Store.get('records', {}) || {};
        Object.keys(old).forEach((m) => { r['juegos:' + m] = old[m]; });
        Store.set('records2', r);
      }
      return r;
    })(),
    get(theme, mode) { return this.all[theme + ':' + mode] || 0; },
    set(theme, mode, value) { this.all[theme + ':' + mode] = value; Store.set('records2', this.all); },
  };

  function theme() { return AM.theme(settings.theme); }
  function themeCats() { return settings.cats[settings.theme]; }
  function allCats() { return AM.themeCategories(settings.theme).map((c) => c.id); }
  function sagaMode() { return settings.mode === 'sagas' && AM.modeAvailable('sagas', settings.theme); }
  function sagaInfo() { return AM.SAGAS.find((x) => x.id === settings.saga.id) || AM.SAGAS[0]; }
  /** Juegos de la saga elegida que tienen suficientes canciones para jugarlos solos. */
  function sagaPlayableGames() { return AM.Logic.sagaGames(settings.saga.id).filter((g) => g.songs >= AM.MIN_POOL); }
  function sagaRecordKey() { return settings.saga.id + ':' + (settings.saga.game || 'all'); }
  function scope() {
    if (sagaMode()) return AM.Logic.sagaScope(settings.saga.id, settings.saga.game);
    return AM.Logic.scope(settings.theme, settings.filters[settings.theme]);
  }

  let game = null;
  let timerRaf = 0;
  let reportCtx = null; // pista que se está por reportar: { track, meta }

  /* ── historial de pistas escuchadas y pistas ocultas por reportes ── */
  const savedSeen = Store.get('seen', {});
  const savedHidden = Store.get('hidden', []);
  const History = {
    seen: savedSeen && typeof savedSeen === 'object' && !Array.isArray(savedSeen) ? savedSeen : {},
    hidden: Array.isArray(savedHidden) ? savedHidden : [],
    mark(id) { this.seen[id] = Date.now(); Store.set('seen', this.seen); },
    reset() { this.seen = {}; Store.set('seen', {}); },
    hide(id) {
      if (this.hidden.indexOf(id) < 0) { this.hidden.push(id); Store.set('hidden', this.hidden); }
    },
    unhideAll() { this.hidden = []; Store.set('hidden', []); },
  };

  function currentPool() {
    if (sagaMode()) {
      const skip = new Set(History.hidden);
      return scope().tracks.filter((t) => !skip.has(t.id));
    }
    return AM.Logic.pool(themeCats(), History.hidden, scope().keep);
  }

  /** Pregunta que se muestra mientras suena la pista (una categoría puede tener la suya: "¿De qué anime es?"). */
  function question(g) {
    if (g.mode.id === 'sagas') return '¿Qué canción es?';
    const T = g.theme;
    const cat = g.cur && AM.CATEGORIES.find((c) => c.id === g.cur.track.cat);
    if (cat && cat.question) return cat.question;
    return g.mode.answer === 'game' ? (T.questionExact || T.question) : T.question;
  }

  const CJK = /[\u3040-\u30ff\u3400-\u9fff]/;

  /**
   * Línea secundaria de una pista: la canción (♪), en Canciones quién la canta (🎤) y en los temas
   * con `lineIcon` (Musicales) de dónde es la canción (🎭 Wicked).
   * Si Apple da el nombre en japonés (シルエット), se muestra el del catálogo (Silhouette).
   */
  function trackLine(T, t, m) {
    if (T.showArtist) return '🎤 ' + t.franchise;
    if (T.lineIcon) return T.lineIcon + ' ' + t.franchise;
    const name = m && m.trackName;
    return '♪ ' + (name && !CJK.test(name) ? name : t.title);
  }

  /* ═════════ utilidades de interfaz ═════════ */

  let toastTimer = 0;
  function toast(msg, ms) {
    const el = $('#toast');
    el.textContent = msg;
    el.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('is-visible'), ms || 3200);
  }

  function showScreen(name) {
    $$('.screen').forEach((s) => s.classList.toggle('is-active', s.id === 'screen-' + name));
    window.scrollTo(0, 0);
    Viz.setVisible(name === 'game');
  }

  function setStatus(text, loading) {
    const el = $('#status');
    el.textContent = text || '';
    el.classList.toggle('is-loading', !!loading);
  }

  function sfx(name) { AM.Sfx.play(name); }

  function inGame() {
    return !!game && !game.finished && $('#screen-game').classList.contains('is-active');
  }

  function openDialog(dlg) {
    if (typeof dlg.showModal === 'function') dlg.showModal();
    else dlg.setAttribute('open', '');
  }

  /* ═════════ visualizador ═════════ */

  const Viz = (function () {
    const canvas = $('#viz');
    const ctx = canvas.getContext('2d');
    const disc = $('#disc');
    const BARS = 60;
    const vals = new Float32Array(BARS);
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let active = false;
    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;

    function resize() {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    }

    function frame(now) {
      raf = requestAnimationFrame(frame);
      if (!w || !h) resize();
      if (!w || !h) return;
      const t = now / 1000;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      const radius = disc.offsetWidth / 2 + 10;
      const maxLen = Math.max(10, Math.min(h / 2 - radius - 6, 80));
      const beat = 0.78 + 0.22 * Math.pow(Math.max(0, Math.sin(t * Math.PI * 2.1)), 6);
      ctx.lineCap = 'round';
      ctx.lineWidth = Math.max(2.5, (2 * Math.PI * radius) / BARS * 0.42);
      for (let i = 0; i < BARS; i++) {
        let target = 0.04;
        if (active) {
          if (reduce) target = 0.35;
          else {
            const n = (Math.sin(t * 3.1 + i * 0.55) + Math.sin(t * 5.3 + i * 1.7) + Math.sin(t * 1.7 + i * 0.23)) / 3;
            target = (0.3 + 0.55 * (n * 0.5 + 0.5)) * beat + Math.random() * 0.12;
          }
        }
        vals[i] += (target - vals[i]) * (active ? 0.25 : 0.08);
        const ang = (i / BARS) * Math.PI * 2 - Math.PI / 2;
        const len = 3 + vals[i] * maxLen;
        const cos = Math.cos(ang);
        const sin = Math.sin(ang);
        const hue = (190 + (i / BARS) * 150 + t * 25) % 360;
        ctx.strokeStyle = 'hsl(' + hue.toFixed(0) + ', 95%, 62%)';
        ctx.beginPath();
        ctx.moveTo(cx + cos * radius, cy + sin * radius);
        ctx.lineTo(cx + cos * (radius + len), cy + sin * (radius + len));
        ctx.stroke();
      }
    }

    window.addEventListener('resize', resize);

    return {
      setActive(v) {
        active = !!v;
        disc.classList.toggle('is-spinning', active);
      },
      setVisible(v) {
        if (v && !raf) { resize(); raf = requestAnimationFrame(frame); }
        else if (!v && raf) { cancelAnimationFrame(raf); raf = 0; }
      },
    };
  })();

  /* ═════════ pantalla de inicio ═════════ */

  function renderThemes() {
    $('#themes').innerHTML = AM.THEMES.map((T) => {
      const sel = T.id === settings.theme;
      const n = AM.Logic.scope(T.id, settings.filters[T.id]).tracks.length;
      return `
        <button type="button" class="theme-card${sel ? ' is-selected' : ''}" role="radio" aria-checked="${sel}" data-theme="${T.id}">
          <span class="theme-icon" aria-hidden="true">${T.icon}</span>
          <span class="theme-name">${esc(T.label)}</span>
          <span class="theme-count">${n} pistas</span>
        </button>`;
    }).join('');
  }

  function renderHero() {
    const T = theme();
    $('#home-kicker').textContent = T.kicker;
    $('#home-sub').textContent = T.sub;
    $('#brand-icon').textContent = T.icon;
  }

  function renderModes() {
    const T = theme();
    $('#modes').innerHTML = Object.keys(AM.MODES).filter((id) => AM.modeAvailable(id, T.id)).map((id) => {
      const m = AM.MODES[id];
      const sel = id === settings.mode;
      const rec = id === 'sagas' ? Records.get('sagas', sagaRecordKey()) : Records.get(T.id, id);
      return `
        <button type="button" class="mode-card${sel ? ' is-selected' : ''}" role="radio" aria-checked="${sel}" data-mode="${id}">
          <span class="mode-icon" aria-hidden="true">${m.icon}</span>
          <span class="mode-name">${esc(m.name)}</span>
          <span class="mode-desc">${esc(m.describe(T))}</span>
          <span class="mode-record">🏆 Récord: <strong>${rec ? fmt(rec) : '—'}</strong></span>
        </button>`;
    }).join('');
  }

  function renderFilters() {
    const T = theme();
    const vals = scope().values;
    $('#filters').hidden = !T.filters.length;
    $('#filters').innerHTML = T.filters.map((f) => {
      if (f.type === 'toggle') {
        const on = !!vals[f.id];
        return `<button type="button" class="switch${on ? ' is-on' : ''}" data-filter="${f.id}" role="switch" aria-checked="${on}">
            <span class="switch-track" aria-hidden="true"><span class="switch-dot"></span></span>
            <span>${f.icon ? f.icon + ' ' : ''}${esc(f.label)}</span>
          </button>`;
      }
      return `<div class="segmented" role="radiogroup" aria-label="${esc(f.label)}">
          <span class="segmented-label">${esc(f.label)}:</span>
          ${f.options.map((o) => {
            const on = vals[f.id] === o.value;
            return `<button type="button" role="radio" aria-checked="${on}" class="${on ? 'is-on' : ''}" data-filter="${f.id}" data-value="${esc(o.value)}">${esc(o.label)}</button>`;
          }).join('')}
        </div>`;
    }).join('');
  }

  function renderChips() {
    $('#step3-title').textContent = sagaMode() ? 'Elige una saga' : '¿Qué quieres escuchar?';
    if (sagaMode()) { renderSagaPicker(); return; }
    const sc = scope();
    const cats = themeCats();
    const counts = {};
    sc.tracks.forEach((t) => { counts[t.cat] = (counts[t.cat] || 0) + 1; });
    const all = cats.length === allCats().length;
    $('#chips').innerHTML =
      `<button type="button" class="chip${all ? ' is-on' : ''}" data-cat="__all" aria-pressed="${all}">✨ Todo <span>${sc.tracks.length}</span></button>` +
      AM.themeCategories(settings.theme).map((c) => {
        const on = cats.indexOf(c.id) >= 0;
        return `<button type="button" class="chip${on ? ' is-on' : ''}" data-cat="${c.id}" aria-pressed="${on}">${c.icon} ${esc(c.label)} <span>${counts[c.id] || 0}</span></button>`;
      }).join('');
    updatePoolInfo();
  }

  /*
   * Paso 3 del modo Sagas: la saga, "toda la saga / un juego" y, si es un juego, cuál.
   * Solo se puede elegir un juego que tenga al menos AM.MIN_POOL canciones distintas.
   */
  function renderSagaPicker() {
    const sel = sagaInfo();
    const games = sagaPlayableGames();
    const all = !settings.saga.game;
    const sagas = AM.SAGAS.map((x) => {
      const on = x.id === sel.id;
      return `<button type="button" class="chip${on ? ' is-on' : ''}" role="radio" aria-checked="${on}" data-saga="${x.id}">${x.icon} ${esc(x.label)} <span>${AM.Logic.sagaTracks(x.id).length}</span></button>`;
    }).join('');
    const scopeSel = `
      <div class="segmented" role="radiogroup" aria-label="Qué canciones">
        <span class="segmented-label">Canciones de:</span>
        <button type="button" role="radio" aria-checked="${all}" class="${all ? 'is-on' : ''}" data-saga-scope="all">Toda la saga</button>
        <button type="button" role="radio" aria-checked="${!all}" class="${all ? '' : 'is-on'}" data-saga-scope="game"${games.length ? '' : ' disabled'}>Un juego</button>
      </div>`;
    // "The Legend of Zelda: Ocarina of Time" → "Ocarina of Time" (la saga ya está elegida arriba)
    const short = (game) => AM.Logic.sagaGameName(sel, game);
    const gameChips = all ? '' : games.map((g) => {
      const on = g.game === settings.saga.game;
      return `<button type="button" class="chip${on ? ' is-on' : ''}" role="radio" aria-checked="${on}" data-saga-game="${esc(g.game)}" title="${esc(g.game)}">${esc(short(g.game))} <span>${g.songs}</span></button>`;
    }).join('');
    $('#chips').innerHTML = `
      <div class="saga-row" role="radiogroup" aria-label="Saga">${sagas}</div>
      <div class="saga-row">${scopeSel}</div>
      ${gameChips ? `<div class="saga-row" role="radiogroup" aria-label="Juego">${gameChips}</div>` : ''}`;
    updatePoolInfo();
  }

  function updatePoolInfo() {
    const pool = currentPool();
    const saga = sagaMode();
    const ok = pool.length >= AM.MIN_POOL;
    $('#pool-count').textContent = `${pool.length} ${saga ? 'canciones' : 'pistas'}`;
    $('#btn-start').disabled = !ok;
    if (!ok) {
      $('#start-hint').textContent = saga
        ? `Faltan canciones: se necesitan al menos ${AM.MIN_POOL}.`
        : `Elige más categorías${theme().filters.length ? ' o cambia los filtros' : ''}: se necesitan al menos ${AM.MIN_POOL} pistas.`;
    } else if (saga) {
      const names = settings.saga.game
        ? AM.Logic.sample(Array.from(new Set(pool.map((t) => t.title))), 3)
        : AM.Logic.sample(Array.from(new Set(pool.map((t) => t.game))), 3);
      $('#start-hint').textContent = `${settings.saga.game ? 'Canciones como' : 'Incluye'} ${names.join(', ')} y más.`;
    } else {
      const names = AM.Logic.sample(Array.from(new Set(pool.map((t) => t.franchise))), 4);
      $('#start-hint').textContent = `Incluye ${names.join(', ')} y más.`;
    }
    const heard = pool.filter((t) => History.seen[t.id]).length;
    const hidden = History.hidden.length;
    const where = saga ? (settings.saga.game ? 'de este juego' : 'de esta saga') : 'de estas categorías';
    let info = heard
      ? `Has escuchado ${heard} de ${pool.length} pistas ${where}; primero suenan las que te faltan.`
      : 'Todas estas pistas son nuevas para ti.';
    if (hidden) info += ` ${hidden} oculta${hidden === 1 ? '' : 's'} por tus reportes.`;
    $('#seen-info').innerHTML = esc(info) + (heard ? ' <button type="button" class="btn-link" id="btn-reset-seen">Reiniciar historial</button>' : '');
  }

  $('#seen-info').addEventListener('click', (e) => {
    if (!e.target.closest('#btn-reset-seen')) return;
    History.reset();
    updatePoolInfo();
    toast('Historial reiniciado: todas las pistas vuelven a contar como nuevas.');
  });

  function renderHome() {
    renderHero();
    renderThemes();
    renderModes();
    renderFilters();
    renderChips();
  }

  $('#themes').addEventListener('click', (e) => {
    const card = e.target.closest('[data-theme]');
    if (!card || card.dataset.theme === settings.theme) return;
    settings.theme = card.dataset.theme;
    Store.set('theme', settings.theme);
    if (!AM.modeAvailable(settings.mode, settings.theme)) {
      settings.mode = 'clasico';
      Store.set('mode', settings.mode);
    }
    sfx('click');
    renderHome();
  });

  $('#filters').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-filter]');
    if (!btn) return;
    const T = theme();
    const f = T.filters.find((x) => x.id === btn.dataset.filter);
    if (!f) return;
    const vals = Object.assign({}, scope().values);
    vals[f.id] = f.type === 'toggle' ? !vals[f.id] : btn.dataset.value;
    settings.filters[T.id] = vals;
    Store.set('filters', settings.filters);
    sfx('click');
    renderThemes();
    renderFilters();
    renderChips();
  });

  $('#modes').addEventListener('click', (e) => {
    const card = e.target.closest('[data-mode]');
    if (!card) return;
    settings.mode = card.dataset.mode;
    Store.set('mode', settings.mode);
    sfx('click');
    renderModes();
    renderFilters();
    renderChips(); // el paso 3 cambia en el modo Sagas
  });

  $('#chips').addEventListener('click', (e) => {
    const sagaBtn = e.target.closest('[data-saga], [data-saga-scope], [data-saga-game]');
    if (sagaBtn) {
      if (sagaBtn.disabled) return;
      if (sagaBtn.dataset.saga) settings.saga = { id: sagaBtn.dataset.saga, game: '' };
      else if (sagaBtn.dataset.sagaScope === 'all') settings.saga.game = '';
      else if (sagaBtn.dataset.sagaScope === 'game') {
        const games = sagaPlayableGames();
        if (!settings.saga.game && games.length) settings.saga.game = games[0].game;
      } else settings.saga.game = sagaBtn.dataset.sagaGame;
      Store.set('saga', settings.saga);
      sfx('click');
      renderModes(); // el récord del modo Sagas es por saga
      renderChips();
      return;
    }
    const chip = e.target.closest('[data-cat]');
    if (!chip) return;
    const id = chip.dataset.cat;
    const cats = themeCats();
    let next;
    if (id === '__all') next = allCats();
    else if (cats.indexOf(id) >= 0) next = cats.filter((c) => c !== id);
    else next = cats.concat([id]);
    settings.cats[settings.theme] = next;
    Store.set('catsByTheme', settings.cats);
    sfx('click');
    renderChips();
  });

  $('#btn-start').addEventListener('click', startGame);

  /* ═════════ partida ═════════ */

  function startGame() {
    const saga = sagaMode() ? sagaInfo() : null;
    const base = AM.MODES[AM.modeAvailable(settings.mode, settings.theme) ? settings.mode : 'clasico'];
    // En Sagas, el nombre del modo lleva la saga o el juego (se ve en el marcador, resultados y al compartir).
    const mode = saga ? Object.assign({}, base, { name: 'Sagas · ' + (settings.saga.game || saga.label) }) : base;
    const pool = currentPool();
    if (pool.length < AM.MIN_POOL) return;

    AM.Engine.unlock();
    AM.Sfx.unlock();
    sfx('start');

    game = {
      mode: mode,
      theme: theme(),
      scope: scope(),
      // En Sagas se reparten por juego (todas son de la misma saga); con un solo juego, sin restricción.
      queue: saga
        ? AM.Logic.buildQueue(pool, History.seen, 2, settings.saga.game ? 'id' : 'game')
        : AM.Logic.buildQueue(pool, History.seen),
      record: saga ? ['sagas', sagaRecordKey()] : [settings.theme, mode.id],
      total: isFinite(mode.rounds) ? Math.min(mode.rounds, pool.length) : Infinity,
      round: 0,
      score: 0,
      streak: 0,
      bestStreak: 0,
      correct: 0,
      lives: mode.lives || 0,
      history: [],
      token: 0,
      cur: null,
      finished: false,
    };
    AM.Sources.prefetch(game.queue.slice(0, 3));
    setupGameUI();
    showScreen('game');
    nextRound();
  }

  function setupGameUI() {
    const m = game.mode;
    const expert = m.id === 'experto';
    $('#hud-mode').textContent = m.icon + ' ' + m.name;
    $('#hud-extra-label').textContent = m.lives ? 'Vidas' : 'Racha';
    $('#timer').hidden = expert;
    $('#clip-bar').hidden = !expert;
    $('#expert').hidden = !expert;
    $('#options').hidden = expert;
    $('#btn-replay').textContent = '↺ Repetir';
    $('#guess-input').placeholder = game.theme.placeholder;
    if (expert) {
      const steps = m.steps;
      const max = steps[steps.length - 1];
      $$('.clip-mark', $('#clip-bar')).forEach((el) => el.remove());
      steps.slice(0, -1).forEach((s) => {
        const mark = document.createElement('i');
        mark.className = 'clip-mark';
        mark.style.left = (s / max) * 100 + '%';
        $('#clip-bar').appendChild(mark);
      });
    }
    updateHUD();
  }

  function updateHUD(bump) {
    const g = game;
    $('#hud-round').textContent = isFinite(g.total) ? `${g.round}/${g.total}` : `Ronda ${g.round}`;
    const score = $('#hud-score');
    score.textContent = fmt(g.score);
    if (bump) {
      score.classList.remove('bump');
      void score.offsetWidth;
      score.classList.add('bump');
    }
    if (g.mode.lives) {
      const lives = Math.max(0, g.lives);
      $('#hud-extra').innerHTML = `<span class="hearts" aria-label="${lives} vidas">${'❤️'.repeat(lives)}${'🖤'.repeat(g.mode.lives - lives)}</span>`;
    } else {
      $('#hud-extra').textContent = '🔥 ' + g.streak;
    }
    const mult = AM.Logic.multiplier(g.streak);
    const multEl = $('#mult');
    multEl.hidden = g.mode.id === 'experto' || mult <= 1;
    multEl.textContent = 'Racha x' + mult;
  }

  function resetRoundUI() {
    cancelAnimationFrame(timerRaf);
    $('#reveal').hidden = true;
    $('#btn-tap').hidden = true;
    $('#btn-replay').disabled = true;
    const label = $('#disc-label');
    label.classList.remove('has-art');
    label.style.backgroundImage = '';
    $('#disc-q').classList.remove('is-hidden');
    Viz.setActive(false);
    renderTimer(1, null);
    $('#options').innerHTML = '';
    $('#guess-input').value = '';
    $('#guess-input').disabled = false;
    $('#btn-guess').disabled = false;
    $('#btn-skip').disabled = false;
    closeCombo();
    $('#attempts').innerHTML = '';
    $('#clip-unlocked').style.width = '0';
    $('#clip-progress').style.width = '0';
  }

  async function nextRound() {
    const g = game;
    if (!g || g.finished) return;
    if (g.round >= g.total || (g.mode.lives && g.lives <= 0)) { endGame(); return; }

    const token = ++g.token;
    AM.Engine.stop();
    resetRoundUI();
    g.cur = null;
    setStatus('Cargando pista', true);

    for (;;) {
      const track = g.queue.shift();
      if (!track) { endGame(true); return; }
      AM.Sources.prefetch(g.queue.slice(0, 2));
      let cands = [];
      try { cands = await AM.Sources.resolve(track); } catch (e) { cands = []; }
      if (token !== g.token) return;
      for (let i = 0; i < cands.length; i++) {
        try {
          await AM.Engine.load(cands[i]);
          if (token !== g.token) return;
          beginRound(track, cands[i], cands.slice(i + 1));
          return;
        } catch (e) {
          if (token !== g.token) return;
        }
      }
      console.warn('[Adivinador] Pista no disponible, se salta:', track.id);
      setStatus('Esa pista no está disponible, buscando otra', true);
    }
  }

  function beginRound(track, cand, rest) {
    const g = game;
    g.round++;
    History.mark(track.id);
    g.cur = {
      track: track,
      cand: cand,
      rest: rest,
      answered: false,
      started: false,
      startTime: 0,
      timeLimit: AM.Logic.timeLimit(g.mode, g.correct),
      step: 0,
      attempts: [],
      choices: null,
    };
    updateHUD();
    if (g.mode.id === 'experto') renderAttempts();
    else renderOptions();
    playClip();
  }

  /** Reproduce el fragmento de la ronda actual. */
  function playClip() {
    const g = game;
    const cur = g && g.cur;
    if (!cur) return;
    const expert = g.mode.id === 'experto';
    const limit = expert && !cur.answered ? g.mode.steps[Math.min(cur.step, g.mode.steps.length - 1)] : Infinity;
    $('#btn-tap').hidden = true;
    if (!cur.started) setStatus('Cargando audio', true);

    AM.Engine.play(limit).then(() => {
      if (game !== g || g.cur !== cur) return;
      $('#btn-replay').disabled = false;
      if (!cur.started) {
        cur.started = true;
        if (!expert) { enableOptions(); startTimer(); }
      } else {
        unfreezeTimer(cur); // volvió a sonar (otra fuente o "Escuchar otra vez") después de trabarse
      }
      if (!cur.answered) setStatus(expert ? `Escuchando ${limit} s…` : question(g));
    }).catch((e) => {
      if (game !== g || g.cur !== cur || !e || e.code === 'cancelled') return;
      if (e.code === 'blocked') {
        $('#btn-tap').hidden = false;
        setStatus('Tu navegador pausó el audio. Toca el botón verde para escuchar.');
        return;
      }
      switchCandidate();
    });
  }

  /** La fuente actual falló: prueba la siguiente o cambia de pista. */
  async function switchCandidate() {
    const g = game;
    const cur = g && g.cur;
    if (!cur) return;
    setStatus('Esa fuente falló, probando otra', true);
    while (cur.rest.length) {
      const cand = cur.rest.shift();
      try {
        await AM.Engine.load(cand);
        if (game !== g || g.cur !== cur) return;
        cur.cand = cand;
        playClip();
        return;
      } catch (e) {
        if (game !== g || g.cur !== cur) return;
      }
    }
    if (cur.answered) { setStatus(''); return; }
    // Ninguna fuente sirve: esta ronda no cuenta y pasamos a otra pista.
    cancelAnimationFrame(timerRaf);
    g.round--;
    toast('Esa pista no está disponible. ¡Va otra!');
    nextRound();
  }

  /* ── temporizador (Clásico y Supervivencia) ── */

  function renderTimer(ratio, remain) {
    $('#timer-fill').style.transform = `scaleX(${Math.max(0, Math.min(1, ratio))})`;
    $('#timer').classList.toggle('is-low', remain != null && ratio < 0.25);
    $('#timer-text').textContent = remain == null ? '' : Math.ceil(remain) + 's';
  }

  /** Segundos de la ronda que ya corrieron (sin contar lo que el audio estuvo trabado). */
  function elapsed(cur) {
    return ((cur.stallAt || performance.now()) - cur.startTime) / 1000;
  }

  /*
   * Si el audio se queda cargando a media ronda (YouTube lento, red mala), el reloj se pausa:
   * no es justo que se acabe el tiempo sin haber escuchado nada. Si sigue trabado después de
   * STALL_GIVE_UP_MS, se prueba la siguiente fuente (y si no hay, la ronda no cuenta).
   */
  const STALL_GIVE_UP_MS = 8000;

  function freezeTimer(cur, since) {
    if (cur.stallAt) return;
    // Desde que el audio dejó de avanzar, no desde que nos dimos cuenta.
    cur.stallAt = Math.max(cur.startTime, Math.min(since || Infinity, performance.now()));
    setStatus('El audio se está cargando… el tiempo está en pausa', true);
    clearTimeout(cur.stallTimer);
    cur.stallTimer = setTimeout(() => {
      if (!game || game.cur !== cur || cur.answered || !cur.stallAt) return;
      switchCandidate();
    }, STALL_GIVE_UP_MS);
  }

  function unfreezeTimer(cur) {
    clearTimeout(cur.stallTimer);
    if (!cur.stallAt) return;
    cur.startTime += performance.now() - cur.stallAt;
    cur.stallAt = 0;
  }

  function startTimer() {
    const g = game;
    const cur = g.cur;
    cur.startTime = performance.now();
    cur.stallAt = 0;
    let lastSec = null;
    cancelAnimationFrame(timerRaf);
    const loop = () => {
      if (game !== g || g.cur !== cur || cur.answered) return;
      const remain = Math.max(0, cur.timeLimit - elapsed(cur));
      renderTimer(remain / cur.timeLimit, remain);
      const sec = Math.ceil(remain);
      if (sec !== lastSec) {
        if (lastSec !== null && sec <= 5 && sec > 0) sfx('tick');
        lastSec = sec;
      }
      if (remain <= 0) { answer(null); return; }
      timerRaf = requestAnimationFrame(loop);
    };
    loop();
  }

  /* ── opciones (Clásico y Supervivencia) ── */

  function renderOptions() {
    const cur = game.cur;
    cur.choices = AM.Logic.makeChoices(cur.track, game.mode, game.scope);
    const box = $('#options');
    box.classList.add('is-waiting');
    box.innerHTML = cur.choices.map((c, i) =>
      `<button type="button" class="option" data-i="${i}" disabled><span class="key">${i + 1}</span><span>${esc(c)}</span></button>`
    ).join('');
  }

  function enableOptions() {
    const box = $('#options');
    box.classList.remove('is-waiting');
    $$('.option', box).forEach((b) => { b.disabled = false; });
  }

  $('#options').addEventListener('click', (e) => {
    const btn = e.target.closest('.option');
    if (!btn || btn.disabled || !game || !game.cur) return;
    answer(game.cur.choices[Number(btn.dataset.i)]);
  });

  function answer(choice) {
    const g = game;
    const cur = g && g.cur;
    if (!cur || cur.answered) return;
    cur.answered = true;
    cancelAnimationFrame(timerRaf);
    unfreezeTimer(cur);

    const correctValue = cur.track[g.mode.answer];
    const ok = choice === correctValue;
    const timeout = choice == null;
    let points = 0;

    if (ok) {
      g.streak++;
      g.correct++;
      g.bestStreak = Math.max(g.bestStreak, g.streak);
      points = AM.Logic.timedPoints(1 - elapsed(cur) / cur.timeLimit, g.streak);
      g.score += points;
      sfx('correct');
    } else {
      g.streak = 0;
      if (g.mode.lives) g.lives--;
      sfx(timeout ? 'timeout' : 'wrong');
    }

    g.history.push({ track: cur.track, meta: cur.cand.meta, result: ok ? 'ok' : (timeout ? 'timeout' : 'bad'), points: points, guess: choice });

    $$('.option', $('#options')).forEach((b) => {
      const value = cur.choices[Number(b.dataset.i)];
      b.disabled = true;
      if (value === correctValue) b.classList.add('is-correct');
      else if (value === choice) b.classList.add('is-wrong');
      else b.classList.add('is-dim');
    });

    AM.Engine.setLimit(Infinity); // que la canción siga sonando durante la revelación
    updateHUD(ok);
    showReveal(ok, points, { timeout: timeout, guess: choice, mult: AM.Logic.multiplier(g.streak) });
  }

  /* ── modo Experto ── */

  function renderAttempts() {
    const g = game;
    const cur = g.cur;
    const steps = g.mode.steps;
    $('#attempts').innerHTML = steps.map((s, i) => {
      const a = cur.attempts[i];
      if (!a) {
        const now = i === cur.step && !cur.answered;
        return `<li>${now ? '▸ ' : ''}Intento ${i + 1}<span class="tag">${s} s</span></li>`;
      }
      if (a.type === 'skip') return '<li class="is-skip">⏭ Saltado</li>';
      if (a.type === 'partial') return `<li class="is-partial">🟨 ${esc(a.text)}<span class="tag">${esc(g.theme.partial)}</span></li>`;
      if (a.type === 'ok') return `<li class="is-ok">✅ ${esc(a.text)}</li>`;
      return `<li class="is-wrong">❌ ${esc(a.text)}</li>`;
    }).join('');
    const step = Math.min(cur.step, steps.length - 1);
    const next = steps[cur.step + 1];
    $('#btn-skip').textContent = next ? `Saltar (+${next - steps[cur.step]} s)` : 'Rendirse';
    $('#btn-replay').textContent = cur.answered ? '↺ Repetir' : `▶ Escuchar (${steps[step]} s)`;
    $('#clip-unlocked').style.width = (cur.answered ? 100 : (steps[step] / steps[steps.length - 1]) * 100) + '%';
  }

  function updateClipBar(t) {
    const steps = game.mode.steps;
    const max = steps[steps.length - 1];
    $('#clip-progress').style.width = Math.max(0, Math.min(1, t / max)) * 100 + '%';
  }

  function findGame(text) {
    const raw = String(text || '').trim();
    const n = AM.Sources.norm(raw);
    if (!n || !game) return null;
    const games = AM.Logic.allGames(game.scope);
    const exact = games.find((g) => g.game === raw);
    if (exact) return exact;
    // Dos respuestas que solo cambian en signos ("What Is Love" de Haddaway y "What is Love?" de TWICE):
    // si no se eligió de la lista, no se adivina cuál era.
    const same = games.filter((g) => AM.Sources.norm(g.game) === n);
    if (same.length) return same.length === 1 ? same[0] : null;
    return games.find((g) => g.aka.some((a) => AM.Sources.norm(a) === n)) || null;
  }

  function expertGuess() {
    const g = game;
    const cur = g && g.cur;
    if (!cur || cur.answered) return;
    const input = $('#guess-input');
    const hit = findGame(input.value);
    if (!hit) {
      toast('Elige una opción de la lista (escribe y selecciona una sugerencia).');
      input.focus();
      return;
    }
    closeCombo();
    input.value = '';
    // También vale el otro título de la misma canción ("Gethsemane" cuando suena "Getsemaní").
    if (hit.game === cur.track.game || AM.Logic.sameAnswer(g.scope, hit.game, cur.track.game)) { finishExpert(true); return; }
    const partial = g.theme.showArtist
      ? AM.Logic.sameArtist(hit.franchise, cur.track.franchise)
      : hit.franchise === cur.track.franchise;
    cur.attempts.push({ type: partial ? 'partial' : 'wrong', text: hit.game });
    sfx('wrong');
    advanceExpert();
  }

  function expertSkip() {
    const cur = game && game.cur;
    if (!cur || cur.answered) return;
    cur.attempts.push({ type: 'skip' });
    sfx('skip');
    advanceExpert();
  }

  function advanceExpert() {
    const g = game;
    const cur = g.cur;
    cur.step++;
    if (cur.step >= g.mode.steps.length) { finishExpert(false); return; }
    renderAttempts();
    playClip();
  }

  function finishExpert(ok) {
    const g = game;
    const cur = g.cur;
    cur.answered = true;
    const tries = cur.attempts.length + 1;
    let points = 0;
    if (ok) {
      points = g.mode.points[Math.min(cur.attempts.length, g.mode.points.length - 1)];
      cur.attempts.push({ type: 'ok', text: cur.track.game });
      g.streak++;
      g.correct++;
      g.bestStreak = Math.max(g.bestStreak, g.streak);
      g.score += points;
      sfx('correct');
    } else {
      g.streak = 0;
      sfx('timeout');
    }
    g.history.push({ track: cur.track, meta: cur.cand.meta, result: ok ? 'ok' : 'bad', points: points, tries: ok ? tries : 0 });
    renderAttempts();
    $('#guess-input').disabled = true;
    $('#btn-guess').disabled = true;
    $('#btn-skip').disabled = true;
    closeCombo();
    updateHUD(ok);
    playClip(); // ahora suena el fragmento completo
    showReveal(ok, points, { gaveUp: !ok, tries: tries });
  }

  /* Autocompletado del modo Experto */
  const combo = { items: [], active: -1 };

  function closeCombo() {
    combo.items = [];
    combo.active = -1;
    $('#guess-list').hidden = true;
    $('#guess-input').setAttribute('aria-expanded', 'false');
    $('#guess-input').removeAttribute('aria-activedescendant');
  }

  function highlight(name, query) {
    const i = name.toLowerCase().indexOf(query.toLowerCase());
    if (!query || i < 0) return esc(name);
    return esc(name.slice(0, i)) + '<mark>' + esc(name.slice(i, i + query.length)) + '</mark>' + esc(name.slice(i + query.length));
  }

  function renderCombo() {
    const input = $('#guess-input');
    const q = input.value.trim();
    const nq = AM.Sources.norm(q);
    const list = $('#guess-list');
    if (!nq) { closeCombo(); return; }
    const words = nq.split(' ');
    if (!game) { closeCombo(); return; }
    const showArtist = game.theme.showArtist;
    const showFranchise = !!game.theme.lineIcon;
    const franchiseAka = AM.FRANCHISE_AKA || {};
    combo.items = AM.Logic.allGames(game.scope)
      .filter((g) => {
        const n = AM.Sources.norm([g.game, g.franchise].concat(g.aka, franchiseAka[g.franchise] || []).join(' '));
        return words.every((w) => n.indexOf(w) >= 0);
      })
      .slice(0, 8);
    if (combo.active >= combo.items.length) combo.active = combo.items.length - 1;
    list.innerHTML = combo.items.length
      ? combo.items.map((g, i) => {
        // En Canciones se muestra el artista y en Musicales el musical (más el título con el que
        // coincidió, si fue por el otro nombre de la canción); en los demás, el nombre alterno.
        const alias = g.aka.find((a) => AM.Sources.norm(a).indexOf(nq) >= 0) || '';
        const viaAlias = alias && AM.Sources.norm(g.game).indexOf(nq) < 0;
        const sub = showArtist ? g.franchise
          : showFranchise ? g.franchise + (viaAlias ? ' · ' + alias : '')
            : alias;
        return `<li id="opt-${i}" role="option" data-i="${i}" aria-selected="${i === combo.active}">${highlight(g.game, q)}${sub ? `<small>${esc(sub)}</small>` : ''}</li>`;
      }).join('')
      : '<li class="empty">Sin coincidencias</li>';
    list.hidden = false;
    input.setAttribute('aria-expanded', 'true');
    if (combo.active >= 0) input.setAttribute('aria-activedescendant', 'opt-' + combo.active);
    else input.removeAttribute('aria-activedescendant');
  }

  function pickCombo(i) {
    const item = combo.items[i];
    if (!item) return;
    $('#guess-input').value = item.game;
    closeCombo();
  }

  $('#guess-input').addEventListener('input', () => { combo.active = -1; renderCombo(); });
  $('#guess-input').addEventListener('keydown', (e) => {
    const open = !$('#guess-list').hidden && combo.items.length > 0;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      if (!open) { renderCombo(); return; }
      e.preventDefault();
      const d = e.key === 'ArrowDown' ? 1 : -1;
      combo.active = (combo.active + d + combo.items.length) % combo.items.length;
      renderCombo();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (open) pickCombo(combo.active >= 0 ? combo.active : 0);
      else expertGuess();
    } else if (e.key === 'Escape') {
      closeCombo();
    }
  });
  $('#guess-input').addEventListener('blur', () => setTimeout(closeCombo, 150));
  $('#guess-list').addEventListener('mousedown', (e) => {
    const li = e.target.closest('[data-i]');
    if (!li) return;
    e.preventDefault();
    pickCombo(Number(li.dataset.i));
    $('#guess-input').focus();
  });
  $('#btn-guess').addEventListener('click', expertGuess);
  $('#btn-skip').addEventListener('click', expertSkip);

  /* ── revelación ── */

  function showReveal(ok, points, opts) {
    const g = game;
    const cur = g.cur;
    const t = cur.track;
    const m = cur.cand.meta || {};
    opts = opts || {};

    const head = $('#reveal-head');
    head.className = 'reveal-head ' + (ok ? 'is-ok' : 'is-bad');
    if (ok) {
      let extra = '';
      if (opts.mult > 1) extra = `<small>Bonus de racha x${opts.mult}</small>`;
      if (opts.tries) extra = `<small>${opts.tries === 1 ? '¡A la primera!' : `En ${opts.tries} intentos`}</small>`;
      head.innerHTML = `¡Correcto! +${fmt(points)}${extra}`;
    } else if (opts.timeout) {
      head.innerHTML = '¡Se acabó el tiempo!';
    } else if (opts.gaveUp) {
      head.innerHTML = 'Se acabaron los intentos';
    } else {
      head.innerHTML = 'Incorrecto' + (opts.guess ? `<small>Elegiste: ${esc(opts.guess)}</small>` : '');
    }

    // En Sagas la respuesta es la canción: va grande, y el juego abajo.
    const songMode = g.mode.id === 'sagas';
    $('#reveal-game').textContent = songMode ? t.title : t.game;
    $('#reveal-track').textContent = songMode ? '🎮 ' + t.game : trackLine(g.theme, t, m);
    $('#reveal-meta').textContent = [t.composer, t.year, t.platform].filter(Boolean).join(' · ');
    reportCtx = { track: t, meta: m };
    const link = $('#reveal-link');
    link.hidden = !m.link;
    if (m.link) { link.href = m.link; link.textContent = (m.linkLabel || 'Escuchar') + ' ↗'; }

    const art = $('#reveal-art');
    if (m.artwork) art.src = m.artwork; else art.removeAttribute('src');
    if (m.artwork) {
      const label = $('#disc-label');
      label.style.backgroundImage = `url("${m.artwork}")`;
      label.classList.add('has-art');
      $('#disc-q').classList.add('is-hidden');
    }

    const last = (isFinite(g.total) && g.round >= g.total) || (g.mode.lives && g.lives <= 0);
    $('#btn-next').textContent = last ? 'Ver resultados ▶' : 'Siguiente ▶';
    $('#reveal').hidden = false;
    setStatus('');
    requestAnimationFrame(() => {
      $('#reveal').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      $('#btn-next').focus({ preventScroll: true });
    });
  }

  $('#btn-next').addEventListener('click', () => {
    sfx('click');
    nextRound();
  });

  $('#btn-report').addEventListener('click', () => { if (reportCtx) openReport(reportCtx); });

  $('#btn-replay').addEventListener('click', () => playClip());
  $('#btn-tap').addEventListener('click', () => playClip());

  /* ── eventos del motor de audio ── */

  AM.Engine.on('start', () => { if (inGame()) Viz.setActive(true); });
  AM.Engine.on('stop', (e) => {
    if (!inGame()) return;
    Viz.setActive(false);
    const cur = game.cur;
    if (!cur || cur.answered || e.reason === 'manual') return;
    if (game.mode.id === 'experto') setStatus('¿Lo reconoces? Adivina, salta o vuelve a escuchar.');
    else if (e.reason === 'end') setStatus('Se acabó el fragmento. ¡Responde antes de que acabe el tiempo!');
  });
  AM.Engine.on('progress', (e) => {
    if (inGame() && game.mode.id === 'experto') updateClipBar(e.t);
  });
  AM.Engine.on('error', () => { if (inGame()) switchCandidate(); });
  AM.Engine.on('stall', (e) => {
    const cur = inGame() && game.cur;
    if (cur && cur.started && !cur.answered && game.mode.timeLimit) freezeTimer(cur, e.since);
  });
  AM.Engine.on('resume', () => {
    const cur = inGame() && game.cur;
    if (!cur || !cur.stallAt || cur.answered) return;
    unfreezeTimer(cur);
    setStatus(question(game));
  });

  /* ── fin de partida ── */

  function endGame(exhausted) {
    const g = game;
    if (!g || g.finished) return;
    g.finished = true;
    g.token++;
    cancelAnimationFrame(timerRaf);
    AM.Engine.stop();
    Viz.setActive(false);

    if (!g.history.length) {
      game = null;
      showScreen('home');
      renderHome();
      toast('No se pudo cargar ninguna pista. Revisa tu conexión o prueba otras categorías.', 6000);
      return;
    }
    if (exhausted && g.mode.lives && g.lives > 0) toast('¡Escuchaste todas las pistas disponibles!', 4000);

    const T = g.theme;
    const stats = { score: g.score, correct: g.correct, total: g.history.length, bestStreak: g.bestStreak };
    const prev = Records.get(g.record[0], g.record[1]);
    const isRecord = g.score > prev && g.score > 0;
    if (isRecord) Records.set(g.record[0], g.record[1], g.score);
    const songMode = g.mode.id === 'sagas';

    const r = AM.Logic.rank(g.mode, stats, T);
    const share = AM.Logic.shareText(g.mode, stats, g.history, T);
    const pct = stats.total ? Math.round((stats.correct / stats.total) * 100) : 0;
    const grid = g.history.map((h) => AM.Logic.emojiFor(g.mode, h)).join('');

    const rows = g.history.map((h, i) => {
      const m = h.meta || {};
      const art = m.artwork ? `<img src="${esc(m.artwork)}" alt="" loading="lazy" referrerpolicy="no-referrer">` : '<img alt="">';
      const link = m.link ? ` · <a href="${esc(m.link)}" target="_blank" rel="noopener">${m.source === 'YouTube' ? 'YouTube' : 'Apple Music'} ↗</a>` : '';
      return `
        <li class="round-row">
          <span class="r-num">${i + 1}</span>
          ${art}
          <div>
            <div class="r-game">${esc(songMode ? h.track.title : h.track.game)}</div>
            <div class="r-track">${esc(songMode ? '🎮 ' + h.track.game : trackLine(T, h.track, m))}${link}</div>
          </div>
          <div class="r-res">${AM.Logic.emojiFor(g.mode, h)}<b>${h.points ? '+' + fmt(h.points) : '0'}</b></div>
          <button type="button" class="row-report" data-report="${i}" title="Reportar esta canción" aria-label="Reportar ${esc(h.track.game)}">🚩</button>
        </li>`;
    }).join('');

    $('#results-root').innerHTML = `
      <div class="results">
        <p class="kicker">${T.icon} ${esc(T.label)} · ${g.mode.icon} ${esc(g.mode.name)} · fin de la partida</p>
        <h2 class="results-title">${esc(r[0])}</h2>
        <p class="results-sub">${esc(r[1])}</p>
        ${isRecord ? '<div class="record-badge">★ ¡Nuevo récord! ★</div>' : ''}
        <div class="score-big" id="score-big">0</div>
        <div class="score-label">puntos${prev && !isRecord ? ` · récord: ${fmt(prev)}` : ''}</div>
        <div class="stats">
          <div class="stat"><b>${stats.correct}/${stats.total}</b><span>aciertos</span></div>
          <div class="stat"><b>${pct}%</b><span>precisión</span></div>
          <div class="stat"><b>🔥 ${stats.bestStreak}</b><span>mejor racha</span></div>
        </div>
        <p class="share-grid" aria-label="Resumen de rondas">${grid}</p>
        <div class="results-actions">
          <button type="button" class="btn btn-primary" data-act="again">↺ Jugar de nuevo</button>
          <button type="button" class="btn btn-ghost" data-act="share">📋 Compartir</button>
          <button type="button" class="btn btn-ghost" data-act="home">⌂ Menú</button>
        </div>
        ${g.mode.ranked === false ? '' : `<section class="board" aria-labelledby="board-title">
          <h3 class="rounds-title" id="board-title">🏆 Ranking global · ${esc(T.label)} · ${esc(g.mode.name)}</h3>
          <div id="board-root"></div>
        </section>`}
        <h3 class="rounds-title">🎵 Lo que sonó (para tu playlist)</h3>
        <ol class="rounds">${rows}</ol>
      </div>`;
    $('#results-root').dataset.share = share;
    resultsHistory = g.history;
    if (g.mode.ranked !== false) renderResultBoard(g, stats);

    showScreen('results');
    sfx(isRecord ? 'record' : 'end');
    countUp($('#score-big'), g.score);
  }

  function countUp(el, value) {
    const start = performance.now();
    const dur = Math.min(1600, 400 + value / 3);
    const step = (now) => {
      const p = Math.min(1, (now - start) / dur);
      el.textContent = fmt(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  async function shareResult(text) {
    try {
      if (navigator.share && window.matchMedia('(pointer: coarse)').matches) {
        await navigator.share({ text: text });
        return;
      }
    } catch (e) {
      if (e && e.name === 'AbortError') return;
    }
    try {
      await navigator.clipboard.writeText(text);
      toast('¡Resultado copiado! Pégalo donde quieras.');
    } catch (e) {
      window.prompt('Copia tu resultado:', text);
    }
  }

  let resultsHistory = [];
  $('#results-root').addEventListener('click', (e) => {
    const rep = e.target.closest('[data-report]');
    if (rep) {
      const h = resultsHistory[Number(rep.dataset.report)];
      if (h) openReport({ track: h.track, meta: h.meta || {} });
      return;
    }
    const btn = e.target.closest('[data-act]');
    if (!btn) return;
    const act = btn.dataset.act;
    if (act === 'again') startGame();
    else if (act === 'home') { game = null; renderHome(); showScreen('home'); }
    else if (act === 'share') shareResult($('#results-root').dataset.share || '');
  });

  /* ═════════ ranking global ═════════ */

  let boardCtx = null; // { entry, savedId, saving } de la partida que acaba de terminar
  const MEDALS = ['🥇', '🥈', '🥉'];

  function boardRow(r, i, mine, modeId) {
    const pos = i < 3 ? MEDALS[i] : String(i + 1);
    const detail = modeId === 'supervivencia'
      ? `${r.aciertos} aciertos`
      : `${r.aciertos}/${r.rondas}`;
    return `<li class="${mine ? 'is-me' : ''}">
        <span class="b-pos">${pos}</span>
        <span class="b-nick">${esc(r.nick)}${mine ? ' <em>(tú)</em>' : ''}</span>
        <span class="b-detail">${esc(detail)}</span>
        <b class="b-score">${fmt(r.puntos)}</b>
      </li>`;
  }

  /** Carga y dibuja una tabla del ranking. Devuelve las filas (o null si falló). */
  async function loadBoard(listEl, tema, modo, opts) {
    opts = opts || {};
    listEl.innerHTML = '<li class="empty">Cargando ranking…</li>';
    try {
      const rows = (await AM.Scores.top(tema, modo, { since: opts.since, limit: 50 })) || [];
      if (!listEl.isConnected) return rows;
      listEl.innerHTML = rows.length
        ? rows.map((r, i) => boardRow(r, i, opts.highlight != null && r.id === opts.highlight, modo)).join('')
        : '<li class="empty">Todavía nadie ha guardado un puntaje aquí. ¡Estrena el ranking!</li>';
      return rows;
    } catch (e) {
      console.warn('[Adivinador] Ranking no disponible:', e);
      if (listEl.isConnected) listEl.innerHTML = '<li class="empty">No se pudo cargar el ranking. Revisa tu conexión e inténtalo más tarde.</li>';
      return null;
    }
  }

  function renderResultBoard(g, stats) {
    const root = $('#board-root');
    boardCtx = {
      entry: { tema: g.theme.id, modo: g.mode.id, puntos: g.score, aciertos: stats.correct, rondas: stats.total, racha: stats.bestStreak },
      savedId: null,
      saving: false,
    };
    if (!AM.Scores.enabled()) {
      root.innerHTML = '<p class="board-msg">El ranking global todavía no está activado en este sitio.</p>';
      return;
    }
    const canSave = g.score > 0;
    root.innerHTML = `
      ${canSave ? `<form class="board-form" id="board-form" autocomplete="off" novalidate>
        <label class="sr-only" for="board-nick">Tu nickname</label>
        <input id="board-nick" type="text" maxlength="16" placeholder="Tu nickname" value="${esc(Store.get('nick', ''))}" spellcheck="false" autocapitalize="off">
        <button type="submit" class="btn btn-primary" id="board-save">Guardar en el ranking</button>
      </form>` : ''}
      <p class="board-msg" id="board-msg">${canSave
        ? 'Escribe tu nickname (de 2 a 16 letras o números) y guarda tu puntaje.'
        : 'Haz al menos un punto para entrar al ranking.'}</p>
      <ol class="board-list" id="board-list"></ol>`;
    loadBoard($('#board-list'), boardCtx.entry.tema, boardCtx.entry.modo);
  }

  $('#results-root').addEventListener('submit', async (e) => {
    if (e.target.id !== 'board-form') return;
    e.preventDefault();
    const ctx = boardCtx;
    if (!ctx || ctx.saving || ctx.savedId) return;
    const input = $('#board-nick');
    const msg = $('#board-msg');
    const nick = AM.Scores.cleanNick(input.value);
    if (!nick) {
      msg.textContent = 'Ese nickname no sirve: usa de 2 a 16 letras o números (también se valen espacios, puntos y guiones).';
      input.focus();
      return;
    }
    ctx.saving = true;
    input.disabled = true;
    $('#board-save').disabled = true;
    msg.textContent = 'Guardando…';
    try {
      const id = await AM.Scores.submit(Object.assign({ nick: nick }, ctx.entry));
      ctx.savedId = id || true;
      Store.set('nick', nick);
      sfx('correct');
      const form = $('#board-form');
      if (form) form.hidden = true;
      const rows = await loadBoard($('#board-list'), ctx.entry.tema, ctx.entry.modo, { highlight: id });
      const pos = rows ? rows.findIndex((r) => r.id === id) : -1;
      msg.textContent = pos >= 0
        ? `¡Listo, ${nick}! Quedaste en el lugar #${pos + 1}.`
        : `¡Listo, ${nick}! Tu puntaje quedó guardado (por ahora, fuera del top 50).`;
    } catch (err) {
      ctx.saving = false;
      input.disabled = false;
      $('#board-save').disabled = false;
      const why = err && err.message ? err.message : 'error desconocido';
      // Un tema nuevo necesita que la base acepte su nombre (supabase/schema.sql → tema_valido).
      msg.textContent = /tema_valido/.test(why)
        ? `El ranking global de ${AM.theme(ctx.entry.tema).label} todavía no está activado, así que tu puntaje no se pudo subir.`
        : 'No se pudo guardar: ' + why + '. Inténtalo de nuevo.';
    }
  });

  /* Diálogo "Ranking" desde el inicio */
  const boardView = { theme: null, mode: null, period: 'siempre' };

  function renderBoardDialog() {
    $('#board-themes').innerHTML = AM.THEMES.map((T) =>
      `<button type="button" role="tab" aria-selected="${T.id === boardView.theme}" class="${T.id === boardView.theme ? 'is-on' : ''}" data-board-theme="${T.id}">${T.icon} ${esc(T.label)}</button>`
    ).join('');
    $('#board-modes').innerHTML = Object.keys(AM.MODES).filter((id) => AM.MODES[id].ranked !== false).map((id) => {
      const m = AM.MODES[id];
      return `<button type="button" role="tab" aria-selected="${id === boardView.mode}" class="${id === boardView.mode ? 'is-on' : ''}" data-board-mode="${id}">${m.icon} ${esc(m.name)}</button>`;
    }).join('');
    $$('#board-period [data-period]').forEach((b) => {
      const on = b.dataset.period === boardView.period;
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-checked', String(on));
    });
    const list = $('#board-dlg-list');
    if (!AM.Scores.enabled()) {
      list.innerHTML = '<li class="empty">El ranking global todavía no está activado en este sitio.</li>';
      return;
    }
    const since = boardView.period === 'semana' ? new Date(Date.now() - 7 * 24 * 3600 * 1000) : null;
    loadBoard(list, boardView.theme, boardView.mode, { since: since });
  }

  $('#btn-board').addEventListener('click', () => {
    boardView.theme = settings.theme;
    boardView.mode = AM.MODES[settings.mode].ranked === false ? 'clasico' : settings.mode;
    renderBoardDialog();
    openDialog($('#dlg-board'));
  });
  $('#dlg-board').addEventListener('click', (e) => {
    const t = e.target.closest('[data-board-theme]');
    const m = e.target.closest('[data-board-mode]');
    const p = e.target.closest('[data-period]');
    if (t) boardView.theme = t.dataset.boardTheme;
    else if (m) boardView.mode = m.dataset.boardMode;
    else if (p) boardView.period = p.dataset.period;
    else return;
    renderBoardDialog();
  });

  /* ── abandonar ── */

  function quitGame() {
    if (game) { game.finished = true; game.token++; }
    cancelAnimationFrame(timerRaf);
    AM.Engine.stop();
    Viz.setActive(false);
    game = null;
    renderHome();
    showScreen('home');
  }

  let quitArmed = false;
  let quitTimer = 0;
  $('#btn-quit').addEventListener('click', (e) => {
    const btn = e.currentTarget;
    if (!quitArmed) {
      quitArmed = true;
      btn.textContent = '¿Seguro? Toca otra vez para salir';
      quitTimer = setTimeout(() => { quitArmed = false; btn.textContent = '✕ Abandonar partida'; }, 3000);
      return;
    }
    clearTimeout(quitTimer);
    quitArmed = false;
    btn.textContent = '✕ Abandonar partida';
    quitGame();
  });

  $('#brand').addEventListener('click', () => {
    if (inGame()) {
      if (window.confirm('¿Abandonar la partida actual?')) quitGame();
      return;
    }
    game = null;
    renderHome();
    showScreen('home');
  });

  /* ── teclado ── */

  document.addEventListener('keydown', (e) => {
    if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
    if (document.querySelector('dialog[open]')) return;
    if (!inGame() || !game.cur) return;
    const tag = (e.target && e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea') return;
    const onButton = tag === 'button' || tag === 'a';

    if (!$('#reveal').hidden) {
      if ((e.key === 'Enter' || e.key === ' ') && !onButton) { e.preventDefault(); $('#btn-next').click(); }
      return;
    }
    if (/^[1-4]$/.test(e.key) && game.mode.id !== 'experto') {
      const btn = $$('.option', $('#options'))[Number(e.key) - 1];
      if (btn && !btn.disabled) btn.click();
    } else if (e.key === ' ' && !onButton) {
      e.preventDefault();
      if (!$('#btn-replay').disabled || !$('#btn-tap').hidden) playClip();
    }
  });

  /* ═════════ ajustes: volumen, efectos, ayuda ═════════ */

  const volumeInput = $('#volume');
  volumeInput.value = Math.round(settings.volume * 100);
  AM.Engine.setVolume(settings.volume);
  AM.Sfx.setLevel(settings.volume);
  volumeInput.addEventListener('input', () => {
    settings.volume = Number(volumeInput.value) / 100;
    AM.Engine.setVolume(settings.volume);
    AM.Sfx.setLevel(settings.volume);
    Store.set('volume', settings.volume);
  });

  function renderSfxButton() {
    const btn = $('#btn-sfx');
    btn.setAttribute('aria-pressed', String(settings.sfx));
    btn.textContent = settings.sfx ? '🔔' : '🔕';
    btn.title = settings.sfx ? 'Efectos de sonido: activados' : 'Efectos de sonido: desactivados';
  }
  AM.Sfx.setEnabled(settings.sfx);
  renderSfxButton();
  $('#btn-sfx').addEventListener('click', () => {
    settings.sfx = !settings.sfx;
    AM.Sfx.setEnabled(settings.sfx);
    Store.set('sfx', settings.sfx);
    renderSfxButton();
    sfx('click');
  });

  $('#btn-help').addEventListener('click', () => openDialog($('#dlg-help')));

  /* ═════════ verificación del catálogo ═════════ */

  const diag = { running: false, abort: false, report: [] };

  async function testTrack(track) {
    let cands = [];
    try { cands = await AM.Sources.resolve(track); } catch (e) { cands = []; }
    const fails = [];
    for (const c of cands) {
      if (diag.abort) break;
      try {
        await AM.Engine.load(c);
        if (diag.abort) break;
        await AM.Engine.play(2);
        AM.Engine.stop();
        return { ok: true, cand: c, fails: fails };
      } catch (e) {
        AM.Engine.stop();
        fails.push(c.kind === 'audio' ? 'Apple' : 'YouTube ' + c.id);
      }
    }
    return { ok: false, fails: fails, none: !cands.length };
  }

  async function runDiagnostics() {
    if (diag.running) return;
    if (game && !game.finished) { toast('Termina o abandona la partida antes de verificar.'); return; }
    diag.running = true;
    diag.abort = false;
    diag.report = [];
    $('#btn-diag-run').disabled = true;
    $('#btn-diag-copy').disabled = true;
    AM.Engine.unlock();
    AM.Engine.setMuted(true);

    const tracks = verifyPool();
    const list = $('#diag-list');
    list.innerHTML = tracks.map((t, i) =>
      `<li id="diag-${i}"><span class="d-name">${esc(t.game)} — ${esc(t.title)}</span><span class="d-status">en espera</span></li>`
    ).join('');

    let okCount = 0;
    let done = 0;
    for (let i = 0; i < tracks.length && !diag.abort; i++) {
      const li = $('#diag-' + i);
      const status = $('.d-status', li);
      li.className = 'is-run';
      status.textContent = '⏳ probando…';
      li.scrollIntoView({ block: 'nearest' });
      const res = await testTrack(tracks[i]);
      if (diag.abort) break;
      done++;
      let text;
      if (res.ok) {
        okCount++;
        text = '✅ ' + res.cand.meta.source + (res.fails.length ? ` (fallaron: ${res.fails.join(', ')})` : '');
      } else {
        text = res.none ? '❌ sin fuentes' : `❌ fallaron: ${res.fails.join(', ')}`;
      }
      li.className = res.ok ? 'is-ok' : 'is-bad';
      status.textContent = text;
      diag.report.push(`${tracks[i].id} | ${tracks[i].game} — ${tracks[i].title} | ${text}`);
      $('#diag-summary').textContent = `${okCount}/${done} pistas suenan`;
    }

    AM.Engine.stop();
    AM.Engine.setMuted(false);
    diag.running = false;
    $('#btn-diag-run').disabled = false;
    $('#btn-diag-copy').disabled = !diag.report.length;
    if (!diag.abort) $('#diag-summary').textContent = `Listo: ${okCount} de ${tracks.length} pistas suenan`;
  }

  /** Pistas que revisa el verificador: las del modo Sagas (saga o juego elegido) o las categorías elegidas. */
  function verifyPool() {
    return sagaMode() ? scope().tracks : AM.Logic.pool(themeCats(), [], scope().keep);
  }

  $('#btn-diag').addEventListener('click', () => {
    if (!diag.running) {
      const n = verifyPool().length;
      $('#diag-scope').textContent = sagaMode()
        ? `Se verificarán las ${n} pistas de ${settings.saga.game || 'la saga ' + sagaInfo().label} (modo Sagas).`
        : `Se verificarán las ${n} pistas de ${theme().label} en las categorías que tienes elegidas en el inicio (elige "Todo" para revisar el tema completo).`;
    }
    openDialog($('#dlg-diag'));
  });
  $('#btn-diag-run').addEventListener('click', runDiagnostics);
  $('#btn-diag-copy').addEventListener('click', () => {
    const text = ['Reporte del catálogo — ' + new Date().toLocaleString('es')].concat(diag.report).join('\n');
    navigator.clipboard.writeText(text).then(
      () => toast('Reporte copiado.'),
      () => window.prompt('Copia el reporte:', text)
    );
  });
  $('#dlg-diag').addEventListener('close', () => {
    if (diag.running) diag.abort = true;
    AM.Engine.stop();
    AM.Engine.setMuted(false);
  });

  /* ═════════ reportes de canciones ═════════ */

  const REASONS = {
    'otro-juego': 'Es de otro juego',
    'otra-cancion': 'Es otra canción del mismo juego',
    'cover': 'Es un cover, remix o versión no oficial',
    'no-suena': 'No sonó, se cortó o era un anuncio',
    'otro': 'Otro problema',
  };

  /** Texto del motivo según el tema de la pista ("Es de otra serie", "Es otra canción"…). */
  function reasonText(r) {
    const T = AM.theme(r.theme || 'juegos');
    if (r.reason === 'otro-juego') return T.otherReason;
    if (r.reason === 'otra-cancion') return T.sameReason;
    return REASONS[r.reason] || r.reason;
  }

  const savedReports = Store.get('reports', []);
  const Reports = {
    list: Array.isArray(savedReports) ? savedReports : [],
    save() {
      Store.set('reports', this.list);
      renderReportsButton();
    },
  };

  function renderReportsButton() {
    const n = Reports.list.length;
    $('#btn-my-reports').textContent = n ? `🚩 Mis reportes (${n})` : '🚩 Mis reportes';
  }

  let gamesListTheme = null;
  function fillGamesDatalist(themeId) {
    if (gamesListTheme === themeId) return;
    gamesListTheme = themeId;
    $('#report-games').innerHTML = AM.Logic.allGames(AM.Logic.scope(themeId)).map((g) => `<option value="${esc(g.game)}"></option>`).join('');
  }

  function selectedReason() {
    const el = $('#report-form').querySelector('input[name="reason"]:checked');
    return el ? el.value : 'otro';
  }

  function updateReportFields() {
    const reason = selectedReason();
    $('#field-real-game').hidden = !(reason === 'otro-juego' || reason === 'otro');
    $('#field-real-song').hidden = reason === 'no-suena';
  }

  function openReport(ctx) {
    reportCtx = ctx;
    const t = ctx.track;
    const m = ctx.meta || {};
    const T = AM.theme(t.theme);
    $('#report-form').reset();
    fillGamesDatalist(T.id);
    $('#reason-other').textContent = T.otherReason;
    $('#reason-same').textContent = T.sameReason;
    $('#report-real-game-label').textContent = T.realLabel;
    $('#report-real-game').placeholder = T.realPlaceholder;
    $('#report-real-song-label').innerHTML = esc(T.realSongLabel || '¿Qué canción era?') + ' <span class="muted">(si la sabes)</span>';
    $('#report-real-song').placeholder = T.songExample ? 'Ej.: ' + T.songExample : '';
    $('#report-game-shown').textContent = t.game;
    $('#report-song-shown').textContent = trackLine(T, t, m);
    $('#report-src').textContent = m.source ? `Sonó desde ${m.source}` : '';
    const art = $('#report-art');
    if (m.artwork) { art.src = m.artwork; art.hidden = false; } else { art.removeAttribute('src'); art.hidden = true; }
    updateReportFields();
    openDialog($('#dlg-report'));
  }

  function reportUrl(r) {
    const params = new URLSearchParams({
      template: AM.CONFIG.reportTemplate,
      title: `[Reporte] ${r.game} — ${r.title}`,
      tema: AM.theme(r.theme || 'juegos').label,
      pista: r.trackId,
      mostrado: `${r.game} — ${r.title}`,
      problema: reasonText(r),
      juego_real: r.realGame || '',
      cancion_real: r.realSong || '',
      fuente: [r.source, r.link].filter(Boolean).join(' · '),
      comentario: r.comment || '',
    });
    return `https://github.com/${AM.CONFIG.repo}/issues/new?${params.toString()}`;
  }

  function reportText(r) {
    const lines = [
      `• ${r.game} — ${r.title} [${r.trackId}]`,
      `  Problema: ${reasonText(r)}`,
    ];
    if (r.realGame) lines.push(`  Juego real: ${r.realGame}`);
    if (r.realSong) lines.push(`  Canción real: ${r.realSong}`);
    if (r.comment) lines.push(`  Comentario: ${r.comment}`);
    if (r.link) lines.push(`  Fuente: ${r.source} ${r.link}`);
    return lines.join('\n');
  }

  function submitReport(send) {
    if (!reportCtx) return;
    const t = reportCtx.track;
    const m = reportCtx.meta || {};
    const r = {
      id: 'r' + Date.now().toString(36),
      date: new Date().toISOString(),
      trackId: t.id,
      theme: t.theme || 'juegos',
      game: t.game,
      title: m.trackName || t.title,
      source: m.source || '',
      link: m.link || '',
      reason: selectedReason(),
      realGame: $('#report-real-game').value.trim(),
      realSong: $('#report-real-song').value.trim(),
      comment: $('#report-comment').value.trim(),
      hidden: $('#report-hide').checked,
      sent: !!send,
    };
    // window.open dentro del clic: así el navegador no lo bloquea como ventana emergente.
    if (send) window.open(reportUrl(r), '_blank', 'noopener');
    Reports.list.unshift(r);
    Reports.save();
    if (r.hidden) {
      History.hide(r.trackId);
      if (game && game.queue) game.queue = game.queue.filter((x) => x.id !== r.trackId);
    }
    $('#dlg-report').close();
    toast(send
      ? '¡Gracias! Termina de enviarlo en la pestaña de GitHub que se abrió.'
      : 'Reporte guardado. Puedes enviarlo después desde "Mis reportes".', 4500);
    if ($('#screen-home').classList.contains('is-active')) updatePoolInfo();
  }

  $('#report-form').addEventListener('change', updateReportFields);
  $('#report-form').addEventListener('submit', (e) => { e.preventDefault(); submitReport(true); });
  $('#report-form').addEventListener('keydown', (e) => {
    // Enter en un campo de texto no debe enviar el reporte por accidente.
    if (e.key === 'Enter' && e.target.tagName === 'INPUT') e.preventDefault();
  });
  $('#btn-report-save').addEventListener('click', () => submitReport(false));

  /* Mis reportes */

  function renderReports() {
    const list = $('#reports-list');
    if (!Reports.list.length) {
      list.innerHTML = '<li class="empty">Todavía no has reportado ninguna canción.</li>';
    } else {
      list.innerHTML = Reports.list.map((r, i) => {
        const extra = [
          esc(reasonText(r)),
          r.realGame ? `era de: ${esc(r.realGame)}` : '',
          r.realSong ? `canción: «${esc(r.realSong)}»` : '',
        ].filter(Boolean).join(' · ');
        return `
          <li>
            <div class="r-main"><strong>${esc(r.game)}</strong> — ${esc(r.title)}<br><span class="muted">${extra}</span></div>
            <div class="r-side">
              ${r.sent ? '<span class="tag-ok">Enviado</span>' : ''}
              <button type="button" class="btn-link" data-send="${i}">${r.sent ? 'Reenviar' : 'Enviar ↗'}</button>
            </div>
          </li>`;
      }).join('');
    }
    const hidden = History.hidden.length;
    $('#btn-reports-unhide').textContent = `👁 Volver a mostrar pistas ocultas (${hidden})`;
    $('#btn-reports-unhide').disabled = !hidden;
    $('#btn-reports-copy').disabled = !Reports.list.length;
    $('#btn-reports-clear').hidden = !Reports.list.length;
  }

  $('#btn-my-reports').addEventListener('click', () => { renderReports(); openDialog($('#dlg-reports')); });
  $('#reports-list').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-send]');
    if (!btn) return;
    const r = Reports.list[Number(btn.dataset.send)];
    if (!r) return;
    window.open(reportUrl(r), '_blank', 'noopener');
    r.sent = true;
    Reports.save();
    renderReports();
  });
  $('#btn-reports-copy').addEventListener('click', () => {
    const text = ['Reportes del Adivinador musical'].concat(Reports.list.map(reportText)).join('\n');
    navigator.clipboard.writeText(text).then(
      () => toast('Reportes copiados.'),
      () => window.prompt('Copia tus reportes:', text)
    );
  });
  $('#btn-reports-unhide').addEventListener('click', () => {
    History.unhideAll();
    renderReports();
    updatePoolInfo();
    toast('Las pistas ocultas vuelven a estar en juego.');
  });
  $('#btn-reports-clear').addEventListener('click', () => {
    if (!window.confirm('¿Borrar la lista de reportes? (Las pistas ocultas siguen ocultas.)')) return;
    Reports.list = [];
    Reports.save();
    renderReports();
  });

  /* ═════════ arranque ═════════ */

  renderReportsButton();
  if (AM.CONFIG && AM.CONFIG.version) $('#app-version').textContent = 'v' + AM.CONFIG.version;

  if (location.protocol === 'file:') $('#file-warning').hidden = false;
  renderHome();
})(window.AM = window.AM || {});
