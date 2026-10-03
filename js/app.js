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

  const ALL_CATS = AM.CATEGORIES.map((c) => c.id);
  const savedMode = Store.get('mode', 'clasico');
  const savedCats = Store.get('cats', ALL_CATS);
  const savedVolume = Number(Store.get('volume', 0.8));
  const settings = {
    mode: AM.MODES[savedMode] ? savedMode : 'clasico',
    cats: Array.isArray(savedCats) ? savedCats.filter((c) => ALL_CATS.indexOf(c) >= 0) : ALL_CATS.slice(),
    volume: isFinite(savedVolume) ? Math.max(0, Math.min(1, savedVolume)) : 0.8,
    sfx: Store.get('sfx', true) !== false,
  };
  if (!settings.cats.length) settings.cats = ALL_CATS.slice();

  let game = null;
  let timerRaf = 0;

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

  function renderModes() {
    const records = Store.get('records', {}) || {};
    $('#modes').innerHTML = Object.keys(AM.MODES).map((id) => {
      const m = AM.MODES[id];
      const sel = id === settings.mode;
      return `
        <button type="button" class="mode-card${sel ? ' is-selected' : ''}" role="radio" aria-checked="${sel}" data-mode="${id}">
          <span class="mode-icon" aria-hidden="true">${m.icon}</span>
          <span class="mode-name">${esc(m.name)}</span>
          <span class="mode-desc">${esc(m.desc)}</span>
          <span class="mode-record">🏆 Récord: <strong>${records[id] ? fmt(records[id]) : '—'}</strong></span>
        </button>`;
    }).join('');
  }

  function renderChips() {
    const counts = {};
    AM.CATALOG.forEach((t) => { counts[t.cat] = (counts[t.cat] || 0) + 1; });
    const all = settings.cats.length === ALL_CATS.length;
    $('#chips').innerHTML =
      `<button type="button" class="chip${all ? ' is-on' : ''}" data-cat="__all" aria-pressed="${all}">✨ Todo <span>${AM.CATALOG.length}</span></button>` +
      AM.CATEGORIES.map((c) => {
        const on = settings.cats.indexOf(c.id) >= 0;
        return `<button type="button" class="chip${on ? ' is-on' : ''}" data-cat="${c.id}" aria-pressed="${on}">${c.icon} ${esc(c.label)} <span>${counts[c.id] || 0}</span></button>`;
      }).join('');
    updatePoolInfo();
  }

  function updatePoolInfo() {
    const pool = AM.Logic.pool(settings.cats);
    const ok = pool.length >= AM.MIN_POOL;
    $('#pool-count').textContent = `${pool.length} pistas`;
    $('#btn-start').disabled = !ok;
    if (!ok) {
      $('#start-hint').textContent = `Elige más categorías: se necesitan al menos ${AM.MIN_POOL} pistas.`;
    } else {
      const names = AM.Logic.sample(Array.from(new Set(pool.map((t) => t.franchise))), 4);
      $('#start-hint').textContent = `Incluye ${names.join(', ')} y más.`;
    }
  }

  function renderHome() {
    renderModes();
    renderChips();
  }

  $('#modes').addEventListener('click', (e) => {
    const card = e.target.closest('[data-mode]');
    if (!card) return;
    settings.mode = card.dataset.mode;
    Store.set('mode', settings.mode);
    sfx('click');
    renderModes();
  });

  $('#chips').addEventListener('click', (e) => {
    const chip = e.target.closest('[data-cat]');
    if (!chip) return;
    const id = chip.dataset.cat;
    if (id === '__all') settings.cats = ALL_CATS.slice();
    else if (settings.cats.indexOf(id) >= 0) settings.cats = settings.cats.filter((c) => c !== id);
    else settings.cats = settings.cats.concat([id]);
    Store.set('cats', settings.cats);
    sfx('click');
    renderChips();
  });

  $('#btn-start').addEventListener('click', startGame);

  /* ═════════ partida ═════════ */

  function startGame() {
    const mode = AM.MODES[settings.mode];
    const pool = AM.Logic.pool(settings.cats);
    if (pool.length < AM.MIN_POOL) return;

    AM.Engine.unlock();
    AM.Sfx.unlock();
    sfx('start');

    game = {
      mode: mode,
      queue: AM.Logic.buildQueue(pool),
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
      }
      if (!cur.answered) setStatus(expert ? `Escuchando ${limit} s…` : '¿De qué juego es?');
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

  function startTimer() {
    const g = game;
    const cur = g.cur;
    cur.startTime = performance.now();
    let lastSec = null;
    cancelAnimationFrame(timerRaf);
    const loop = () => {
      if (game !== g || g.cur !== cur || cur.answered) return;
      const remain = Math.max(0, cur.timeLimit - (performance.now() - cur.startTime) / 1000);
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
    cur.choices = AM.Logic.makeChoices(cur.track, game.mode);
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

    const correctValue = cur.track[g.mode.answer];
    const ok = choice === correctValue;
    const timeout = choice == null;
    let points = 0;

    if (ok) {
      g.streak++;
      g.correct++;
      g.bestStreak = Math.max(g.bestStreak, g.streak);
      const elapsed = (performance.now() - cur.startTime) / 1000;
      points = AM.Logic.timedPoints(1 - elapsed / cur.timeLimit, g.streak);
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
      if (a.type === 'partial') return `<li class="is-partial">🟨 ${esc(a.text)}<span class="tag">saga correcta, otro juego</span></li>`;
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
    const n = AM.Sources.norm(text);
    if (!n) return null;
    return AM.Logic.allGames().find((g) => AM.Sources.norm(g.game) === n) || null;
  }

  function expertGuess() {
    const g = game;
    const cur = g && g.cur;
    if (!cur || cur.answered) return;
    const input = $('#guess-input');
    const hit = findGame(input.value);
    if (!hit) {
      toast('Elige un juego de la lista (escribe y selecciona una sugerencia).');
      input.focus();
      return;
    }
    closeCombo();
    input.value = '';
    if (hit.game === cur.track.game) { finishExpert(true); return; }
    const partial = hit.franchise === cur.track.franchise;
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
    combo.items = AM.Logic.allGames()
      .filter((g) => { const n = AM.Sources.norm(g.game + ' ' + g.franchise); return words.every((w) => n.indexOf(w) >= 0); })
      .slice(0, 8);
    if (combo.active >= combo.items.length) combo.active = combo.items.length - 1;
    list.innerHTML = combo.items.length
      ? combo.items.map((g, i) => `<li id="opt-${i}" role="option" data-i="${i}" aria-selected="${i === combo.active}">${highlight(g.game, q)}</li>`).join('')
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

    $('#reveal-game').textContent = t.game;
    $('#reveal-track').textContent = '♪ ' + (m.trackName || t.title);
    $('#reveal-meta').textContent = [t.composer, t.year, t.platform].filter(Boolean).join(' · ');
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

    const stats = { score: g.score, correct: g.correct, total: g.history.length, bestStreak: g.bestStreak };
    const records = Store.get('records', {}) || {};
    const prev = records[g.mode.id] || 0;
    const isRecord = g.score > prev && g.score > 0;
    if (isRecord) { records[g.mode.id] = g.score; Store.set('records', records); }

    const r = AM.Logic.rank(g.mode, stats);
    const share = AM.Logic.shareText(g.mode, stats, g.history);
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
            <div class="r-game">${esc(h.track.game)}</div>
            <div class="r-track">♪ ${esc(m.trackName || h.track.title)}${link}</div>
          </div>
          <div class="r-res">${AM.Logic.emojiFor(g.mode, h)}<b>${h.points ? '+' + fmt(h.points) : '0'}</b></div>
        </li>`;
    }).join('');

    $('#results-root').innerHTML = `
      <div class="results">
        <p class="kicker">${g.mode.icon} ${esc(g.mode.name)} · fin de la partida</p>
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
        <h3 class="rounds-title">🎵 Lo que sonó (para tu playlist)</h3>
        <ol class="rounds">${rows}</ol>
      </div>`;
    $('#results-root').dataset.share = share;

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

  $('#results-root').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-act]');
    if (!btn) return;
    const act = btn.dataset.act;
    if (act === 'again') startGame();
    else if (act === 'home') { game = null; renderHome(); showScreen('home'); }
    else if (act === 'share') shareResult($('#results-root').dataset.share || '');
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

    const tracks = AM.CATALOG;
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

  $('#btn-diag').addEventListener('click', () => openDialog($('#dlg-diag')));
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

  /* ═════════ arranque ═════════ */

  if (location.protocol === 'file:') $('#file-warning').hidden = false;
  renderHome();
})(window.AM = window.AM || {});
