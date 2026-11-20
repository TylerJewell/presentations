// The one-minute film's score and designed sounds. Every time is a time on the slide's own clock; `at` and
// `film` map it into the film. Returns the spans of film time in which every sound is silent.
export function score({ film, total, sounds, at, many, N, rnd }) {
  /* ---------- the score: one chord for each part of the argument, and a quiet pulse from the promise on ---------- */
  const CHORDS = [
    { t: 0.3, f: [N.D2, N.A2, N.E3, N.A3], g: 0.045, attack: 3 },                    // ideas waiting: open, unresolved
    { t: 5.8, f: [N.D2, N.A2, N.D3, N.Fs3, N.A3, N.E4], g: 0.05 },                   // AI arrives: the major third
    { t: 9.6, f: [N.B1, N.Fs2, N.D3, N.A3], g: 0.045 },                              // code alone: the relative minor
    { t: 16.6, f: [N.G1, N.D2, N.B2, N.D3, N.G3], g: 0.055 },                        // the promise: a lift
    { t: 23.3, f: [N.D2, N.A2, N.Fs3, N.A3], g: 0.05 },                              // the three parts: home
    { t: 33.0, f: [N.A1, N.E2, N.Cs3, N.E3, N.A3], g: 0.05 },                        // the runtime is known: held on the fifth
    { t: 38.4, f: [N.G1, N.D2, N.B2, N.D3], g: 0.055 },                              // the checks pass: building
    { t: 42.0, f: [N.D2, N.A2, N.D3, N.Fs3, N.A3, N.D4, N.Fs4], g: 0.075, attack: 0.5, release: 4.5 },   // every idea: the full chord
  ];
  CHORDS.forEach((c, i) => {
    const end = i + 1 < CHORDS.length ? film(CHORDS[i + 1].t) : total - 4.5;
    sounds.push({ type: "pad", t: film(c.t), to: end, f: c.f, g: c.g, attack: c.attack ?? 1.4, release: c.release ?? 2.2 });
  });
  // The pulse plays the upper notes of the chord in force, three to a second, and stops for the film's silence.
  for (let t = film(16.8), i = 0; t < total - 6; t += 1 / 3, i++) {
    if (t > film(41.4) && t < film(42.0)) continue;
    const chord = [...CHORDS].reverse().find((c) => film(c.t) <= t).f.slice(-3);
    sounds.push({ type: "pluck", t, f: chord[i % 3] * 2, g: t >= film(42.0) ? 0.034 : 0.024, pan: i % 2 ? 0.3 : -0.3 });
  }

  /* ---------- the designed sounds, in the order the picture shows their events ---------- */
  // The lone idea, and its name.
  at(0.6, "bell", { f: N.A5, g: 0.09, dur: 3.2 });
  at(1.0, "tick", { g: 0.04 });
  // The crane: air rising as the plain comes up, and a tick for each idea that takes a name.
  at(1.2, "sweep", { to: 5.3, f0: 240, f1: 1500, g: 0.03 });
  many(4, (i) => at(3.8 + 0.2 * i, "tick", { g: 0.045, pan: [0.45, -0.55, 0.6, -0.3][i] }));
  // AI takes the place of the "a": two notes, the fifth and the home note. They return under the mark.
  at(5.8, "bell", { f: N.A4, g: 0.12 });
  at(6.05, "bell", { f: N.D5, g: 0.13, dur: 3.4 });
  // The white wave: bright air, and a scatter of high notes as the lights turn.
  at(5.7, "sweep", { to: 8.1, f0: 1800, f1: 7000, g: 0.045, spread: true });
  many(44, () => at(5.9 + 2.2 * Math.pow(rnd(), 0.7), "bell", { f: [N.D5, N.E5, N.Fs5, N.A5, N.D6][Math.floor(rnd() * 5)] * 2, g: 0.012, pan: rnd() * 1.6 - 0.8, dur: 0.8 }));
  // The push-in, and the code that arrives at once.
  at(9.6, "sweep", { to: 11.8, f0: 900, f1: 190, g: 0.035 });
  many(7, (i) => at(10.9 + 0.07 * i, "tick", { g: 0.05, f: 5200, pan: -0.4 }));
  // Three rings, three notes that leave the chord open: the trust is still to be earned.
  [N.D4, N.E4, N.A4].forEach((f, k) => at(12.2 + 0.7 * k, "mallet", { f, g: 0.1 }));
  // The horizon draws: a held pure tone, and a note when it is whole.
  at(19.4, "tone", { to: 21.8, f: [N.D4, N.A4], g: 0.03 });
  at(19.4, "sweep", { to: 21.6, f0: 2600, f1: 6000, g: 0.018, spread: true });
  at(21.6, "bell", { f: N.D5, g: 0.07 });
  // The factory line: a note as each part arrives.
  [[26.2, N.Fs4], [28.6, N.A4], [31.4, N.D5]].forEach(([t, f]) => at(t, "bell", { f, g: 0.07 }));
  // The commands: a tick when one starts, two rising blips when it completes.
  [25.4, 27.0, 28.2, 29.6, 39.6].forEach((t) => at(t, "tick", { g: 0.04, f: 2600, pan: -0.45 }));
  [26.6, 28.0, 29.4, 39.45, 40.2].forEach((t) => at(t, "confirm", {}));
  // The matrix and the cluster appear.
  many(20, (i) => at(28.8 + 1.1 * (i / 20), "tick", { g: 0.02, f: 6000, pan: 0.5 }));
  many(3, (k) => at(30.5 + 0.22 * k, "tick", { g: 0.035, f: 1800, pan: 0.5 }));
  // The runtime is known: light runs along the horizon, and its three conditions sound the home chord.
  at(33.6, "sweep", { to: 35.0, f0: 2400, f1: 8000, g: 0.045, spread: true });
  [N.D5, N.Fs5, N.A5].forEach((f, k) => at(34.0 + 0.25 * k, "bell", { f, g: 0.09, pan: 0.4 }));
  // A replica fails, and its sessions resume on the others; a new replica joins and takes its share.
  at(35.0, "sub", { f0: 95, f1: 48, dur: 0.35, g: 0.2 });
  at(35.0, "blip", { f: 260, f1: 150, g: 0.06, dur: 0.18, pan: 0.45 });
  many(6, (i) => at(35.35 + 0.14 * i, "tick", { g: 0.03, f: 3000 + 300 * i, pan: 0.45 }));
  at(36.6, "blip", { f: N.E5, g: 0.05, pan: 0.5 });
  at(36.72, "blip", { f: N.A5, g: 0.05, pan: 0.5 });
  many(6, (i) => at(37.05 + 0.14 * i, "tick", { g: 0.03, f: 3600 + 300 * i, pan: 0.55 }));
  // The other conditions pass in a rising run.
  many(37, (j) => at(38.4 + 0.9 * ((0.85 * j) / 37), "blip", { f: 900 * Math.pow(2, (j / 37) * 1.4), g: 0.02, dur: 0.05, pan: 0.2 + 0.05 * (j % 10) }));
  // The rings close: the same three places, now the home chord. The idea turns yellow, and the receipt is stamped.
  [N.D4, N.Fs4, N.A4].forEach((f, k) => at(39.2 + 0.3 * k, "mallet", { f, g: 0.1 }));
  at(39.5, "bell", { f: N.D6, g: 0.05 });
  at(39.9, "stamp", { g: 0.15 });
  at(40.2, "gliss", { to: 41.0, f0: 330, f1: 1320, g: 0.035 });
  at(41.0, "bell", { f: N.D6, g: 0.045 });
  // A beat of silence, then every idea at once: low weight, bright air, a scatter of notes, a tone that rises.
  const dips = [[film(41.55), film(42.0)]];
  at(42.0, "sub", { f0: 82, f1: 36.7, dur: 1.6, g: 0.3 });
  at(42.0, "sweep", { to: 44.8, f0: 1500, f1: 9000, g: 0.06, spread: true });
  at(42.0, "gliss", { to: 44.6, f0: N.D3, f1: N.D4, g: 0.03 });
  many(60, () => at(42.1 + 2.8 * Math.pow(rnd(), 0.8), "bell", { f: [N.D5, N.Fs5, N.A5, N.D6][Math.floor(rnd() * 4)] * 2, g: 0.012, pan: rnd() * 1.8 - 0.9, dur: 0.9 }));
  // The mark: the two notes from the word, and the third that completes them.
  at(46.2, "bell", { f: N.A4, g: 0.11 });
  at(46.36, "bell", { f: N.D5, g: 0.12 });
  at(46.52, "bell", { f: N.Fs5, g: 0.14, dur: 4.5 });
  at(46.2, "sub", { f0: N.D2, f1: N.D2, dur: 2.5, g: 0.11 });
  return dips;
}
