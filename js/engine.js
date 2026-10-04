/*
 * Motor de audio unificado: reproduce un candidato (preview de Apple con <audio>
 * o video de YouTube con la IFrame API oculta) con la misma interfaz.
 *
 *   load(candidato)  → prepara la fuente (rechaza si no existe / no se puede incrustar)
 *   play(limite)     → resuelve cuando el audio REALMENTE empieza a sonar;
 *                      rechaza con code 'blocked' (el navegador pide un toque) o 'error'
 *   eventos          → 'start', 'progress' {t, limit}, 'stop' {reason}, 'error'
 */
(function (AM) {
  'use strict';

  const audio = new Audio();
  audio.preload = 'auto';
  audio.setAttribute('playsinline', '');

  let volume = 0.8;
  let muted = false;
  let current = null;
  let loadToken = 0;
  let playToken = 0;
  let playState = 'idle'; // idle | starting | playing
  let limit = Infinity;
  let pending = null;
  let pollTimer = null;
  let startAt = 0;
  let seekPending = false;
  let unlocked = false;

  let ytPlayer = null;
  let ytPromise = null;
  let ytWatch = null; // callbacks temporales mientras se carga un video

  /* ── eventos ── */
  const handlers = {};
  function on(ev, fn) { (handlers[ev] = handlers[ev] || []).push(fn); }
  function off(ev, fn) { handlers[ev] = (handlers[ev] || []).filter((f) => f !== fn); }
  function emit(ev, data) {
    (handlers[ev] || []).slice().forEach((fn) => {
      try { fn(data); } catch (e) { console.error(e); }
    });
  }

  function err(code, detail) {
    const e = new Error(detail || code);
    e.code = code;
    return e;
  }

  /* ── desbloqueo para móviles (iOS solo deja sonar un <audio> que ya se tocó) ── */
  function silentWavUrl() {
    const samples = 800;
    const buf = new ArrayBuffer(44 + samples);
    const v = new DataView(buf);
    const str = (o, s) => { for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i)); };
    str(0, 'RIFF'); v.setUint32(4, 36 + samples, true); str(8, 'WAVE');
    str(12, 'fmt '); v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true);
    v.setUint32(24, 8000, true); v.setUint32(28, 8000, true); v.setUint16(32, 1, true); v.setUint16(34, 8, true);
    str(36, 'data'); v.setUint32(40, samples, true);
    for (let i = 0; i < samples; i++) v.setUint8(44 + i, 128);
    return URL.createObjectURL(new Blob([buf], { type: 'audio/wav' }));
  }

  function unlock() {
    if (unlocked) return;
    unlocked = true;
    try {
      if (!audio.src) {
        audio.src = silentWavUrl();
        const p = audio.play();
        if (p && p.then) p.then(() => audio.pause()).catch(() => {});
      }
    } catch (e) { /* nada */ }
    // Cargar YouTube desde ya acelera la primera pista de Nintendo.
    loadYouTube().catch(() => {});
  }

  /* ── precarga de previews ── */
  const warmed = new Map();
  function warm(url) {
    if (!url || warmed.has(url)) return;
    const a = new Audio();
    a.preload = 'auto';
    a.muted = true;
    a.src = url;
    warmed.set(url, a);
    if (warmed.size > 4) {
      const oldest = warmed.keys().next().value;
      const el = warmed.get(oldest);
      el.removeAttribute('src');
      try { el.load(); } catch (e) { /* nada */ }
      warmed.delete(oldest);
    }
  }

  /* ── YouTube ── */
  function loadYouTube() {
    if (ytPromise) return ytPromise;
    ytPromise = new Promise((resolve, reject) => {
      if (location.protocol === 'file:') {
        reject(err('error', 'YouTube no funciona abriendo el archivo directamente (file://)'));
        return;
      }
      const timer = setTimeout(() => reject(err('error', 'YouTube no respondió')), 15000);
      const previous = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = function () {
        if (typeof previous === 'function') { try { previous(); } catch (e) { /* nada */ } }
        ytPlayer = new window.YT.Player('yt-player', {
          width: 200,
          height: 200,
          playerVars: {
            controls: 0, disablekb: 1, fs: 0, iv_load_policy: 3, modestbranding: 1,
            playsinline: 1, rel: 0, origin: location.origin,
          },
          events: {
            onReady: () => {
              clearTimeout(timer);
              ytPlayer.setVolume(ytVolume());
              resolve(ytPlayer);
            },
            onStateChange: (e) => { if (ytWatch && ytWatch.state) ytWatch.state(e.data); },
            onError: (e) => onYouTubeError(e.data),
          },
        });
      };
      const s = document.createElement('script');
      s.src = 'https://www.youtube.com/iframe_api';
      s.onerror = () => { clearTimeout(timer); reject(err('error', 'No se pudo cargar YouTube')); };
      document.head.appendChild(s);
    });
    ytPromise.catch(() => {});
    return ytPromise;
  }

  function ytAvailable() {
    return loadYouTube().then(() => true, () => false);
  }

  function onYouTubeError(code) {
    if (ytWatch && ytWatch.error) { ytWatch.error(code); return; }
    if (!current || current.kind !== 'youtube') return;
    if (playState === 'starting') failPending('error');
    else if (playState === 'playing') {
      stopPolling();
      playState = 'idle';
      emit('error', { code: code });
    }
  }

  function cueYouTube(player, cand) {
    return new Promise((resolve, reject) => {
      let done = false;
      const finish = (fn, value) => {
        if (done) return;
        done = true;
        clearTimeout(timer);
        ytWatch = null;
        fn(value);
      };
      // Algunos navegadores no avisan el estado "cued"; si no hubo error, seguimos.
      const timer = setTimeout(() => finish(resolve), 6000);
      ytWatch = {
        state: (s) => { if (s === 5) finish(resolve); },
        error: (code) => finish(reject, err('error', 'yt-' + code)),
      };
      player.cueVideoById({ videoId: cand.id, startSeconds: cand.start || 0 });
    });
  }

  /* ── <audio> ── */
  function loadAudio(url) {
    return new Promise((resolve, reject) => {
      const cleanup = () => {
        clearTimeout(timer);
        audio.removeEventListener('canplay', ok);
        audio.removeEventListener('loadedmetadata', ok);
        audio.removeEventListener('error', bad);
      };
      const ok = () => { cleanup(); resolve(); };
      const bad = () => { cleanup(); reject(err('error', 'audio-error')); };
      // iOS no precarga sin un toque: seguimos y se valida al reproducir.
      const timer = setTimeout(ok, 3500);
      audio.addEventListener('canplay', ok);
      audio.addEventListener('loadedmetadata', ok);
      audio.addEventListener('error', bad);
      audio.src = url;
      audio.load();
    });
  }

  audio.addEventListener('error', () => {
    if (!current || current.kind !== 'audio' || !audio.src || audio.src.indexOf('blob:') === 0) return;
    if (playState === 'starting') failPending('error');
    else if (playState === 'playing') {
      stopPolling();
      playState = 'idle';
      emit('error', { code: 'audio' });
    }
  });

  /* ── API pública ── */
  async function load(cand) {
    stop();
    const token = ++loadToken;
    current = cand;
    if (cand.kind === 'audio') {
      if (ytPlayer && ytPlayer.stopVideo) { try { ytPlayer.stopVideo(); } catch (e) { /* nada */ } }
      await loadAudio(cand.url);
    } else {
      audio.pause();
      const player = await loadYouTube();
      if (token !== loadToken) throw err('cancelled');
      await cueYouTube(player, cand);
    }
    if (token !== loadToken) throw err('cancelled');
  }

  function time() {
    if (!current) return 0;
    if (current.kind === 'audio') return (audio.currentTime || 0) - (current.start || 0);
    if (ytPlayer && ytPlayer.getCurrentTime) return (ytPlayer.getCurrentTime() || 0) - (current.start || 0);
    return 0;
  }

  function mediaPlaying() {
    if (!current) return false;
    if (current.kind === 'audio') return !audio.paused;
    return !!ytPlayer && ytPlayer.getPlayerState && ytPlayer.getPlayerState() === 1;
  }

  function mediaEnded() {
    if (!current) return true;
    if (current.kind === 'audio') return audio.ended;
    return !!ytPlayer && ytPlayer.getPlayerState && ytPlayer.getPlayerState() === 0;
  }

  function pauseMedia() {
    try { audio.pause(); } catch (e) { /* nada */ }
    if (ytPlayer && ytPlayer.pauseVideo && current && current.kind === 'youtube') {
      try { ytPlayer.pauseVideo(); } catch (e) { /* nada */ }
    }
  }

  function stopPolling() {
    if (pollTimer) clearInterval(pollTimer);
    pollTimer = null;
  }

  function failPending(code) {
    stopPolling();
    playState = 'idle';
    pauseMedia();
    if (pending) {
      const p = pending;
      pending = null;
      p.reject(err(code));
    }
  }

  function startTimeout() {
    if (current && current.kind === 'youtube' && ytPlayer && ytPlayer.getPlayerState) {
      const st = ytPlayer.getPlayerState();
      // reproduciendo o cargando (p. ej. un anuncio): le damos más margen
      if (st === 1 || st === 3) return 25000;
    }
    return 9000;
  }

  function tick() {
    const t = time();
    if (playState === 'starting') {
      if (seekPending) {
        if (Math.abs(t) < 0.6 || performance.now() - startAt > 2000) seekPending = false;
        else return;
      }
      if (t > 0.05 && t < limit && mediaPlaying()) {
        playState = 'playing';
        if (pending) { const p = pending; pending = null; p.resolve(); }
        emit('start', { t: t });
      } else if (performance.now() - startAt > startTimeout()) {
        failPending('blocked');
      }
      return;
    }
    if (playState === 'playing') {
      emit('progress', { t: t, limit: limit });
      if (t >= limit) {
        pauseMedia();
        stopPolling();
        playState = 'idle';
        emit('stop', { reason: 'limit', t: t });
      } else if (mediaEnded()) {
        stopPolling();
        playState = 'idle';
        emit('stop', { reason: 'end', t: t });
      }
    }
  }

  /** Reproduce desde el inicio del clip hasta `limitSec` segundos (Infinity = sin corte). */
  function play(limitSec) {
    const cand = current;
    if (!cand) return Promise.reject(err('error'));
    if (pending) { const p = pending; pending = null; p.reject(err('cancelled')); }
    stopPolling();
    limit = limitSec == null ? Infinity : limitSec;
    playState = 'starting';
    startAt = performance.now();
    const token = ++playToken;
    const promise = new Promise((resolve, reject) => { pending = { resolve: resolve, reject: reject }; });

    if (cand.kind === 'audio') {
      seekPending = false;
      audio.muted = false;
      audio.volume = muted ? 0 : volume;
      try { audio.currentTime = cand.start || 0; } catch (e) { /* nada */ }
      const p = audio.play();
      if (p && p.catch) {
        p.catch((e) => {
          if (token !== playToken || playState !== 'starting') return;
          failPending(e && e.name === 'NotAllowedError' ? 'blocked' : 'error');
        });
      }
    } else if (ytPlayer) {
      seekPending = true;
      ytPlayer.setVolume(ytVolume());
      ytPlayer.unMute();
      ytPlayer.seekTo(cand.start || 0, true);
      ytPlayer.playVideo();
    } else {
      failPending('error');
      return promise;
    }
    pollTimer = setInterval(tick, 80);
    return promise;
  }

  /** Cambia el corte del clip mientras suena (p. ej. dejarlo sonar completo al revelar). */
  function setLimit(sec) { limit = sec; }

  function stop() {
    playToken++;
    stopPolling();
    const wasActive = playState !== 'idle';
    playState = 'idle';
    pauseMedia();
    if (pending) { const p = pending; pending = null; p.reject(err('cancelled')); }
    if (wasActive) emit('stop', { reason: 'manual', t: time() });
  }

  /*
   * "Silenciar" = volumen 0 (no mute()), tanto en YouTube como en <audio>: Chrome pausa
   * los medios silenciados que reproducen sin interacción o en segundo plano, y eso
   * arruinaría la verificación del catálogo.
   */
  function ytVolume() { return muted ? 0 : Math.round(volume * 100); }

  function setVolume(v) {
    volume = Math.max(0, Math.min(1, v));
    audio.volume = muted ? 0 : volume;
    if (ytPlayer && ytPlayer.setVolume) { try { ytPlayer.setVolume(ytVolume()); } catch (e) { /* nada */ } }
  }

  function setMuted(m) {
    muted = !!m;
    audio.muted = false;
    audio.volume = muted ? 0 : volume;
    if (ytPlayer && ytPlayer.setVolume) { try { ytPlayer.setVolume(ytVolume()); } catch (e) { /* nada */ } }
  }

  AM.Engine = {
    on: on, off: off, unlock: unlock, warm: warm, load: load, play: play, stop: stop,
    setLimit: setLimit, setVolume: setVolume, setMuted: setMuted, time: time,
    isPlaying: () => playState === 'playing',
    getVolume: () => volume,
    ytAvailable: ytAvailable,
  };
})(window.AM = window.AM || {});
