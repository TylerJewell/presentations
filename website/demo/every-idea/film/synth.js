/* The film's sound, synthesised with the browser's audio engine and rendered offline, so the same script
   always gives the same samples. window.renderSound(job) takes sounds placed in film time and returns the
   length of the 16-bit stereo result, which the caller reads back in pieces with window.soundBytes(a, b).

   Two buses: the score (pads and a quiet pulse), which steps back under each spoken line, and the designed
   sounds, one for each event on screen. Both feed one reverb and one gentle compressor. */
(function () {
  const SR = 48000;
  function mulberry32(a) {
    return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }

  window.renderSound = async function (job) {
    const ctx = new OfflineAudioContext(2, Math.ceil(job.total * SR), SR);
    const rnd = mulberry32(11);

    const noise = ctx.createBuffer(1, 2 * SR, SR);
    noise.getChannelData(0).forEach((_, i, d) => { d[i] = rnd() * 2 - 1; });
    // The room: three seconds of decaying noise, darker towards the end.
    const room = ctx.createBuffer(2, 3 * SR, SR);
    for (let c = 0; c < 2; c++) {
      const d = room.getChannelData(c);
      let low = 0;
      for (let i = 0; i < d.length; i++) { const k = i / d.length; low += (rnd() * 2 - 1 - low) * (0.6 - 0.45 * k); d[i] = low * Math.pow(1 - k, 2.6); }
    }

    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -16; comp.ratio.value = 3; comp.attack.value = 0.012; comp.release.value = 0.3;
    comp.connect(ctx.destination);
    const master = ctx.createGain(); master.connect(comp);
    const reverb = ctx.createConvolver(); reverb.buffer = room;
    const wet = ctx.createGain(); wet.gain.value = 0.55; reverb.connect(wet); wet.connect(master);
    const score = ctx.createGain(), design = ctx.createGain();
    score.connect(master); design.connect(master);

    // The score steps back by 6 dB under each line, and both buses drop before the film's one silence.
    score.gain.setValueAtTime(1, 0);
    job.lines.forEach(([a, b]) => {
      score.gain.setValueAtTime(1, Math.max(0, a - 0.45)); score.gain.linearRampToValueAtTime(0.5, a);
      score.gain.setValueAtTime(0.5, b + 0.15); score.gain.linearRampToValueAtTime(1, b + 0.9);
    });
    master.gain.setValueAtTime(1, 0);
    job.dips.forEach(([a, b]) => {
      master.gain.setValueAtTime(1, a); master.gain.linearRampToValueAtTime(0.12, b - 0.06);
      master.gain.linearRampToValueAtTime(1, b + 0.03);
    });

    /** Sends a source to a bus at a place in the stereo field, with a share to the room. */
    function route(node, bus, pan = 0, send = 0.35) {
      const p = ctx.createStereoPanner(); p.pan.value = pan; node.connect(p); p.connect(bus);
      if (send > 0) { const s = ctx.createGain(); s.gain.value = send; p.connect(s); s.connect(reverb); }
      return p;
    }
    function env(t, peak, attack, decay) {
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(peak, t + attack);
      g.gain.exponentialRampToValueAtTime(0.0001, t + attack + decay);
      return g;
    }
    function osc(type, f, t, stop, to) {
      const o = ctx.createOscillator(); o.type = type; o.frequency.setValueAtTime(f, t);
      if (to) o.frequency.exponentialRampToValueAtTime(to, stop);
      o.start(t); o.stop(stop + 0.05); return o;
    }

    const play = {
      // A struck bell: a pure tone with two quieter partials that die sooner.
      bell({ t, f, g = 0.1, pan = 0, dur = 2.4 }) {
        [[1, 1, dur], [2.76, 0.22, dur * 0.5], [5.4, 0.07, dur * 0.25]].forEach(([m, a, d]) => {
          const e = env(t, g * a, 0.004, d); osc('sine', f * m, t, t + d + 0.1).connect(e); route(e, design, pan, 0.6);
        });
      },
      // A soft mallet note for the rings.
      mallet({ t, f, g = 0.1, pan = 0 }) {
        const e = env(t, g, 0.008, 1.6); osc('triangle', f, t, t + 1.8).connect(e);
        const e2 = env(t, g * 0.3, 0.008, 0.7); osc('sine', f * 2, t, t + 0.9).connect(e2);
        route(e, design, pan, 0.7); route(e2, design, pan, 0.7);
      },
      // A tick: a few milliseconds of filtered noise.
      tick({ t, g = 0.05, pan = 0, f = 4200 }) {
        const s = ctx.createBufferSource(); s.buffer = noise; s.start(t, rnd() * 1.5, 0.05);
        const b = ctx.createBiquadFilter(); b.type = 'bandpass'; b.frequency.value = f; b.Q.value = 2.2;
        const e = env(t, g, 0.001, 0.03); s.connect(b); b.connect(e); route(e, design, pan, 0.25);
      },
      // A short pitched blip, which can fall or rise.
      blip({ t, f, f1, g = 0.05, pan = 0, dur = 0.07 }) {
        const e = env(t, g, 0.003, dur); osc('sine', f, t, t + dur + 0.02, f1).connect(e); route(e, design, pan, 0.3);
      },
      // Two quick rising blips: a command has completed.
      confirm({ t, g = 0.05, pan = -0.45 }) {
        play.blip({ t, f: 880, g, pan, dur: 0.09 }); play.blip({ t: t + 0.09, f: 1174.66, g, pan, dur: 0.16 });
      },
      // Moving air: noise through a filter whose pitch travels. spread sends one copy to each side.
      sweep({ t, to, f0, f1, g = 0.04, pan = 0, spread = false }) {
        (spread ? [-0.8, 0.8] : [pan]).forEach((p) => {
          const s = ctx.createBufferSource(); s.buffer = noise; s.loop = true; s.start(t, rnd()); s.stop(to + 0.3);
          const b = ctx.createBiquadFilter(); b.type = 'bandpass'; b.Q.value = 1.4;
          b.frequency.setValueAtTime(f0, t); b.frequency.exponentialRampToValueAtTime(f1, to);
          const e = ctx.createGain(), mid = t + (to - t) * 0.6;
          e.gain.setValueAtTime(0.0001, t); e.gain.exponentialRampToValueAtTime(g, mid); e.gain.exponentialRampToValueAtTime(0.0001, to + 0.25);
          s.connect(b); b.connect(e); route(e, design, p, 0.5);
        });
      },
      // Low weight: a sine that falls in pitch. No room, so it stays tight.
      sub({ t, f0, f1, dur, g = 0.2 }) {
        const e = env(t, g, 0.012, dur); osc('sine', f0, t, t + dur + 0.05, f1).connect(e); route(e, design, 0, 0);
      },
      // A tone that slides from one pitch to another.
      gliss({ t, to, f0, f1, g = 0.04, pan = 0 }) {
        const e = ctx.createGain(), d = to - t;
        e.gain.setValueAtTime(0.0001, t); e.gain.linearRampToValueAtTime(g, t + d * 0.5); e.gain.linearRampToValueAtTime(0.0001, to + 0.1);
        osc('sine', f0, t, to + 0.1, f1).connect(e); route(e, design, pan, 0.6);
      },
      // A held pure tone.
      tone({ t, to, f, g = 0.03 }) {
        [].concat(f).forEach((x) => {
          const e = ctx.createGain();
          e.gain.setValueAtTime(0.0001, t); e.gain.linearRampToValueAtTime(g, t + 1.2); e.gain.setValueAtTime(g, to - 0.8); e.gain.linearRampToValueAtTime(0.0001, to + 0.6);
          osc('sine', x, t, to + 0.7).connect(e); route(e, design, 0, 0.7);
        });
      },
      // A stamp: a thump with a short burst of low noise.
      stamp({ t, g = 0.15 }) {
        play.sub({ t, f0: 140, f1: 60, dur: 0.16, g });
        const s = ctx.createBufferSource(); s.buffer = noise; s.start(t, rnd(), 0.08);
        const b = ctx.createBiquadFilter(); b.type = 'lowpass'; b.frequency.value = 1400;
        const e = env(t, g * 0.5, 0.002, 0.06); s.connect(b); b.connect(e); route(e, design, 0, 0.2);
      },
      // A pad: two detuned saws a note, through one low-pass filter.
      pad({ t, to, f, g = 0.05, attack = 1.5, release = 2.2 }) {
        const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 850; lp.Q.value = 0.6;
        const e = ctx.createGain();
        e.gain.setValueAtTime(0.0001, t); e.gain.linearRampToValueAtTime(g, t + attack); e.gain.setValueAtTime(g, to); e.gain.linearRampToValueAtTime(0.0001, to + release);
        f.forEach((x) => [-6, 6].forEach((cents) => { const o = osc('sawtooth', x, t, to + release + 0.1); o.detune.value = cents; o.connect(lp); }));
        lp.connect(e); route(e, score, 0, 0.5);
      },
      // The pulse: a quiet plucked note.
      pluck({ t, f, g = 0.03, pan = 0 }) {
        const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 2200;
        const e = env(t, g, 0.004, 0.28); osc('triangle', f, t, t + 0.35).connect(lp); lp.connect(e); route(e, score, pan, 0.45);
      },
    };
    job.sounds.forEach((s) => play[s.type](s));

    const out = await ctx.startRendering();
    const l = out.getChannelData(0), r = out.getChannelData(1), pcm = new Int16Array(l.length * 2);
    let peak = 0;
    for (let i = 0; i < l.length; i++) { peak = Math.max(peak, Math.abs(l[i]), Math.abs(r[i])); }
    const k = peak > 0.98 ? 0.98 / peak : 1;      // never clip; the mix sets the final level
    for (let i = 0; i < l.length; i++) { pcm[2 * i] = Math.round(l[i] * k * 32767); pcm[2 * i + 1] = Math.round(r[i] * k * 32767); }
    window.soundPcm = new Uint8Array(pcm.buffer);
    return { bytes: window.soundPcm.length, peak };
  };

  window.soundBytes = function (a, b) {
    const u = window.soundPcm.subarray(a, b);
    let s = '';
    for (let i = 0; i < u.length; i += 0x8000) s += String.fromCharCode.apply(null, u.subarray(i, i + 0x8000));
    return btoa(s);
  };
})();
