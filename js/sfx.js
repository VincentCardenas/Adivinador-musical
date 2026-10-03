/*
 * Efectos de sonido de la interfaz, sintetizados con Web Audio (no usan archivos).
 */
(function (AM) {
  'use strict';

  let ctx = null;
  let master = null;
  let enabled = true;
  let level = 0.8;

  function ensure() {
    if (!ctx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return null;
      ctx = new Ctx();
      master = ctx.createGain();
      master.gain.value = 0.16 * level;
      master.connect(ctx.destination);
    }
    if (ctx.state === 'suspended') ctx.resume().catch(() => {});
    return ctx;
  }

  function tone(freq, at, dur, opts) {
    opts = opts || {};
    const c = ctx;
    const t0 = c.currentTime + at;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = opts.type || 'square';
    osc.frequency.setValueAtTime(freq, t0);
    if (opts.slide) osc.frequency.exponentialRampToValueAtTime(opts.slide, t0 + dur);
    const peak = opts.gain == null ? 1 : opts.gain;
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(peak, t0 + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(gain).connect(master);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }

  const SOUNDS = {
    click: () => tone(740, 0, 0.05, { gain: 0.35 }),
    start: () => [392, 523.25, 659.25, 783.99].forEach((f, i) => tone(f, i * 0.07, 0.12, { gain: 0.6 })),
    correct: () => {
      tone(659.25, 0, 0.09, { gain: 0.7 });
      tone(880, 0.08, 0.09, { gain: 0.7 });
      tone(1318.5, 0.16, 0.22, { gain: 0.6, type: 'triangle' });
    },
    wrong: () => tone(196, 0, 0.32, { type: 'sawtooth', gain: 0.55, slide: 98 }),
    timeout: () => { tone(330, 0, 0.12, { gain: 0.5 }); tone(247, 0.13, 0.25, { gain: 0.5, slide: 165 }); },
    skip: () => tone(520, 0, 0.08, { type: 'triangle', gain: 0.5, slide: 780 }),
    tick: () => tone(1250, 0, 0.03, { gain: 0.25 }),
    end: () => [523.25, 392, 523.25, 659.25].forEach((f, i) => tone(f, i * 0.11, 0.16, { gain: 0.55, type: 'triangle' })),
    record: () => [523.25, 659.25, 783.99, 1046.5, 783.99, 1046.5].forEach((f, i) => tone(f, i * 0.09, 0.14, { gain: 0.6 })),
  };

  function play(name) {
    if (!enabled || !SOUNDS[name]) return;
    if (!ensure()) return;
    try { SOUNDS[name](); } catch (e) { /* nada */ }
  }

  AM.Sfx = {
    play: play,
    unlock: ensure,
    setEnabled: (v) => { enabled = !!v; },
    isEnabled: () => enabled,
    setLevel: (v) => {
      level = Math.max(0, Math.min(1, v));
      if (master) master.gain.value = 0.16 * level;
    },
  };
})(window.AM = window.AM || {});
