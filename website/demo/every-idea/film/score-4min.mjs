// The four-minute film's score and designed sounds. Every time is a time on the slide's own clock, the clock
// slides/every-idea-4min.js uses for the picture's events; `at` and `film` map it into the film. Returns the
// spans of film time in which every sound is silent.
export function score({ film, total, sounds, at, many, N, rnd }) {
  const G4 = 392, B3 = 246.94, Cs5 = 554.37;
  // The scale of the six stations, low to high. A light sounds a station's note when it reaches the station.
  const STATION = [N.D4, N.E4, N.Fs4, N.A4, N.B4, N.D5];
  // When each of the nine words and each of the six stations is spoken: WORD_T and STATION_T in the slide.
  const WORD_T = [52.79, 53.38, 54.03, 54.77, 55.26, 55.81, 56.39, 57.15, 57.64], STATION_T = [129.98, 130.73, 131.54, 132.16, 132.79, 133.57];

  /* ---------- the score: one chord for each step of the argument ---------- */
  const CHORDS = [
    { t: 0.3, f: [N.D2, N.A2, N.E3, N.A3], g: 0.045, attack: 3 },                    // ideas waiting: open, unresolved
    { t: 5.8, f: [N.D2, N.A2, N.D3, N.Fs3, N.A3, N.E4], g: 0.05 },                   // AI arrives: the major third
    { t: 9.6, f: [N.B1, N.Fs2, N.D3, N.A3], g: 0.045 },                              // code alone: the relative minor
    { t: 16.6, f: [N.G1, N.D2, N.B2, N.D3, N.G3], g: 0.055 },                        // the promise: a lift
    { t: 23.3, f: [N.D2, N.A2, N.Fs3, N.A3], g: 0.05 },                              // the three parts: home
    { t: 32.1, f: [N.A1, N.E2, N.Cs3, N.E3, N.A3], g: 0.05 },                        // the runtime is known: the fifth
    { t: 39.2, f: [N.B1, N.Fs2, N.D3, N.Fs3, N.A3], g: 0.045 },                      // the components
    { t: 50.8, f: [N.G1, N.D2, N.B2, N.D3, N.G3], g: 0.055 },                        // the runtime's nine requirements
    { t: 59.8, f: [N.A1, N.E2, N.D3, N.E3, N.A3], g: 0.05 },                         // the exit conditions: suspended
    { t: 74.4, f: [N.D2, N.A2, N.D3, N.Fs3, N.A3], g: 0.055 },                       // the receipt: home
    { t: 80.0, f: [N.G1, N.D2, N.B2, N.D3], g: 0.05 },                               // one runtime
    { t: 88.0, f: [N.E2, N.B2, N.E3, N.G3], g: 0.05, attack: 2 },                    // after the build: a new place, E minor
    { t: 92.7, f: [N.G1, N.D2, N.B2, N.D3, N.G3], g: 0.05 },                         // the controls
    { t: 99.5, f: [N.B1, N.Fs2, N.D3, N.Fs3, N.A3], g: 0.045 },                      // the receipts
    { t: 107.2, f: [N.E2, N.B2, N.E3, N.G3], g: 0.05 },                              // the evidence trail
    { t: 114.6, f: [N.A1, N.E2, N.Cs3, N.E3, N.A3], g: 0.05 },                       // production feeds the specification: leaning home
    { t: 121.4, f: [N.Fs2, N.A2, N.D3, N.A3, N.D4], g: 0.05 },                       // wherever it runs: home, lightly
    { t: 128.3, f: [N.D2, N.A2, N.D3, N.Fs3, N.A3], g: 0.055 },                      // the factory: home
    { t: 135.0, f: [N.G1, N.D2, N.B2, N.D3, N.G3], g: 0.05 },                        // the records
    { t: 139.6, f: [N.B1, N.Fs2, N.D3, N.A3], g: 0.045 },                            // a person is asked
    { t: 146.8, f: [N.D2, N.A2, N.Fs3, N.A3, N.D4], g: 0.055 },                      // the portfolio
    { t: 151.4, f: [N.G1, N.D2, N.B2, N.D3, N.G3], g: 0.05 },                        // existing systems
    { t: 161.6, f: [N.A1, N.E2, N.Cs3, N.E3, N.A3], g: 0.05 },                       // which idea goes next
    { t: 166.8, f: [N.G1, N.D2, N.B2, N.D3, N.G3], g: 0.055 },                       // the roadmap
    { t: 173.0, f: [N.A1, N.E2, N.Cs3, N.E3, N.A3], g: 0.055 },                      // the liabilities: held on the fifth
    { t: 179.5, f: [N.D2, N.A2, N.D3, N.Fs3, N.A3, N.D4, N.Fs4], g: 0.075, attack: 0.5, release: 4.5 },   // every idea: the full chord
  ];
  CHORDS.forEach((c, i) => {
    const end = i + 1 < CHORDS.length ? film(CHORDS[i + 1].t) : total - 4.5;
    sounds.push({ type: "pad", t: film(c.t), to: end, f: c.f, g: c.g, attack: c.attack ?? 1.4, release: c.release ?? 2.2 });
  });
  // The pulse plays the upper notes of the chord in force, three to a second. It thins to every other note
  // while the camera is at the runtime, and stops for the film's silence.
  for (let t = film(16.8), i = 0; t < total - 9; t += 1 / 3, i++) {
    if (t > film(178.9) && t < film(179.5)) continue;
    if (t > film(88.0) && t < film(128.0) && i % 2) continue;
    const chord = [...CHORDS].reverse().find((c) => film(c.t) <= t).f.slice(-3);
    sounds.push({ type: "pluck", t, f: chord[i % 3] * 2, g: t >= film(179.5) ? 0.034 : 0.024, pan: i % 2 ? 0.3 : -0.3 });
  }

  /* ---------- every idea: the one-minute film's opening ---------- */
  at(0.6, "bell", { f: N.A5, g: 0.09, dur: 3.2 });
  at(1.0, "tick", { g: 0.04 });
  at(1.2, "sweep", { to: 5.3, f0: 240, f1: 1500, g: 0.03 });
  many(4, (i) => at(3.8 + 0.2 * i, "tick", { g: 0.045, pan: [0.45, -0.55, 0.6, -0.3][i] }));
  // The fifteen further names, each from its own side of the plain.
  [3, -4, -10, 5, -1, -11, 2, 24, -28, -10, 12, -7, -22, 15, 9].forEach((ix, j) => at(3.3 + 0.1 * j, "tick", { g: 0.028, pan: ix / 30 }));
  // AI takes the place of the "a": two notes, the fifth and the home note. They return under the mark.
  at(5.8, "bell", { f: N.A4, g: 0.12 });
  at(6.05, "bell", { f: N.D5, g: 0.13, dur: 3.4 });
  at(5.7, "sweep", { to: 8.1, f0: 1800, f1: 7000, g: 0.045, spread: true });
  many(44, () => at(5.9 + 2.2 * Math.pow(rnd(), 0.7), "bell", { f: [N.D5, N.E5, N.Fs5, N.A5, N.D6][Math.floor(rnd() * 5)] * 2, g: 0.012, pan: rnd() * 1.6 - 0.8, dur: 0.8 }));
  at(9.6, "sweep", { to: 11.8, f0: 900, f1: 190, g: 0.035 });
  many(7, (i) => at(10.9 + 0.07 * i, "tick", { g: 0.05, f: 5200, pan: -0.4 }));
  // Three rings, three notes that leave the chord open: the trust is still to be earned.
  [N.D4, N.E4, N.A4].forEach((f, k) => at(11.6 + 0.7 * k, "mallet", { f, g: 0.1 }));
  at(19.4, "tone", { to: 21.8, f: [N.D4, N.A4], g: 0.03 });
  at(19.4, "sweep", { to: 21.6, f0: 2600, f1: 6000, g: 0.018, spread: true });
  at(21.6, "bell", { f: N.D5, g: 0.07 });
  // The factory line: a note as each of its three parts arrives.
  [[26.2, N.Fs4], [28.4, N.A4], [31.0, N.D5]].forEach(([t, f]) => at(t, "bell", { f, g: 0.07 }));

  /* ---------- delivery gets faster ---------- */
  // The camera comes down to the line, and light runs along the horizon.
  at(31.9, "sweep", { to: 36.0, f0: 1200, f1: 260, g: 0.03 });
  at(33.0, "sweep", { to: 34.4, f0: 2400, f1: 8000, g: 0.04, spread: true });
  // The commands: a tick when one starts, two rising blips when it completes.
  [34.4, 43.4, 50.8, 63.6, 75.5].forEach((t) => at(t, "tick", { g: 0.04, f: 2600, pan: -0.45 }));
  [36.8, 46.4, 57.6, 75.0, 76.3].forEach((t) => at(t, "confirm", {}));
  // The seven components take their places on the shelf, and six of them join into a system on a rising chord.
  many(7, (i) => at(39.6 + (3.0 * i) / 7, "tick", { g: 0.04, f: 3200 + 200 * i, pan: 0.35 }));
  [N.D4, N.Fs4, N.A4, N.D5, N.Fs5, N.A5].forEach((f, k) => at(43.5 + (2.7 * (k + 1)) / 7.4, "mallet", { f, g: 0.07, pan: 0.4 }));
  [46.5, 47.4].forEach((t, k) => at(t, "blip", { f: [N.E5, N.A5][k], g: 0.045, pan: 0.5 }));
  // The nine requirements: one note of a rising scale for each word, from the left of the horizon to the right.
  [N.D4, N.E4, N.Fs4, G4, N.A4, N.B4, Cs5, N.D5, N.E5].forEach((f, i) => at(WORD_T[i], "bell", { f, g: 0.075, pan: -0.7 + 0.175 * i, dur: 1.6 }));
  at(51.0, "tone", { to: 53.0, f: [N.G3, N.D4], g: 0.02 });
  at(57.9, "tick", { g: 0.03, pan: 0.4 });
  // The exit conditions appear, and pass group by group in a rising run. The runtime's three sound the home chord.
  many(8, (g) => at(60.2 + 0.27 * g, "tick", { g: 0.03, f: 5200, pan: 0.5 }));
  [N.D5, N.Fs5, N.A5].forEach((f, k) => at(63.9 + 0.2 * k, "bell", { f, g: 0.085, pan: 0.4 }));
  let passed = 3;
  [13, 12, 2, 2, 3, 1].forEach((n, g) => many(n, (j) => { at(64.6 + 0.7 * g + (0.6 * j) / n, "blip", { f: 900 * Math.pow(2, (passed / 40) * 1.4), g: 0.02, dur: 0.05, pan: 0.2 + 0.04 * (j % 10) }); passed++; }));
  // The enterprise's own condition.
  at(70.0, "bell", { f: N.E5, g: 0.06, pan: 0.4 });
  at(70.6, "tick", { g: 0.035, f: 2200, pan: 0.4 });
  many(4, (j) => at(74.2 + 0.15 * j, "blip", { f: 900 * Math.pow(2, ((36 + j) / 40) * 1.4), g: 0.022, dur: 0.05, pan: 0.4 }));
  at(74.9, "bell", { f: N.D6, g: 0.05 });
  // The receipt: a stamp, and the three places of the rings as the home chord.
  at(76.7, "stamp", { g: 0.15 });
  [N.D4, N.Fs4, N.A4].forEach((f, k) => at(76.9 + 0.15 * k, "mallet", { f, g: 0.09 }));
  // The laptop's outline opens into three replicas.
  at(80.4, "tick", { g: 0.035, f: 1800, pan: 0.4 });
  at(83.6, "gliss", { to: 85.4, f0: 220, f1: 440, g: 0.028 });
  [85.0, 85.25].forEach((t) => at(t, "tick", { g: 0.03, f: 2400, pan: 0.45 }));
  at(86.0, "bell", { f: N.D5, g: 0.05, pan: 0.4 });

  /* ---------- it stays trustworthy: the horizon opens into the runtime ---------- */
  at(87.9, "sub", { f0: 82, f1: 55, dur: 1.2, g: 0.16 });
  at(87.9, "sweep", { to: 89.8, f0: 600, f1: 5200, g: 0.035, spread: true });
  at(87.9, "tone", { to: 90.2, f: [N.E4, N.B4], g: 0.028 });
  // The four things that hold at build time and in production: a chord, one note a word.
  [92.6, 92.8].forEach((t, k) => at(t, "tick", { g: 0.03, f: 1800, pan: k ? 0.5 : -0.5 }));
  [N.E4, G4, N.B4, N.E5].forEach((f, i) => at([93.0, 93.73, 94.38, 94.87][i], "mallet", { f, g: 0.085 }));
  // Each change lands, and its receipt falls.
  many(5, (i) => { at(100.4 + 1.2 * i, "tick", { g: 0.04, f: 3000, pan: -0.6 + 0.3 * i }); at(101.0 + 1.2 * i, "stamp", { g: 0.07, pan: -0.6 + 0.3 * i }); });
  // One requirement is traced: asked, implemented, verified.
  at(108.0, "gliss", { to: 112.6, f0: N.B2, f1: N.B2 * 2, g: 0.016 });
  [[108.55, N.B4], [110.0, N.D5], [111.7, N.Fs5]].forEach(([t, f]) => at(t, "bell", { f, g: 0.075 }));
  // Traces, evaluations and cost leave production and run back down the line to the specification.
  many(3, (k) => at([115.42, 115.9, 116.9][k], "tick", { g: 0.04, f: 2600, pan: -0.4 + 0.4 * k }));
  many(14, (i) => at(117.5 + 0.17 * i, "blip", { f: 1800 * Math.pow(2, -i / 10), g: 0.018, dur: 0.05, pan: 0.1 * ((i % 3) - 1) }));
  at(118.7, "confirm", {});
  // The three places a system runs.
  [N.D4, N.Fs4, N.A4].forEach((f, k) => at([122.97, 123.89, 124.92][k], "mallet", { f, g: 0.085, pan: -0.5 + 0.5 * k }));

  /* ---------- the factory ---------- */
  // The band closes and the camera rises: air falling, then rising, and bright air as every line is drawn.
  at(127.9, "sweep", { to: 129.2, f0: 4200, f1: 700, g: 0.03, spread: true });
  at(128.0, "sweep", { to: 132.6, f0: 240, f1: 1500, g: 0.03 });
  at(130.0, "sweep", { to: 133.5, f0: 2000, f1: 7000, g: 0.02, spread: true });
  // Six stations, six notes.
  STATION.forEach((f, k) => at(STATION_T[k], "bell", { f, g: 0.08, pan: -0.5, dur: 1.8 }));
  // The named ideas set out. Loan origination passes every station; the others reach theirs.
  STATION.forEach((f, k) => at(136.0 + 0.5 * k, "bell", { f, g: 0.035, dur: 0.7 }));
  [[137.2, 1, 0.3], [138.8, 3, -0.3], [137.4, 0, 0.4], [138.9, 2, -0.2]].forEach(([t, k, pan]) => at(t, "bell", { f: STATION[k], g: 0.055, pan }));
  many(9, (i) => at(136.2 + 0.3 * i, "tick", { g: 0.018, f: 4200 }));
  // A person is asked: a held question, an answer, and the idea moves on.
  at(140.2, "tone", { to: 143.0, f: [B3, N.E4], g: 0.02 });
  at(143.0, "confirm", {});
  at(145.4, "bell", { f: STATION[2], g: 0.055, pan: 0.3 });
  // The whole portfolio: a scatter of station notes as the other ideas arrive.
  many(40, () => at(147.2 + 3.8 * rnd(), "bell", { f: STATION[Math.floor(rnd() * 6)] * 2, g: 0.012, pan: rnd() * 1.6 - 0.8, dur: 0.8 }));
  // Four existing systems are named and enter at Discovery.
  many(4, (j) => { at(151.9 + 0.2 * j, "tick", { g: 0.035, f: 2000 }); at(154.2 + 0.5 * j, "bell", { f: STATION[0], g: 0.05, pan: [-0.6, 0.5, -0.2, 0.7][j] }); });
  // Each existing system is marked as the answer key: four notes of the home chord, rising.
  [N.D4, N.Fs4, N.A4, N.D5].forEach((f, j) => at(157.7 + 0.35 * j, "mallet", { f, g: 0.06, pan: [-0.6, 0.5, -0.2, 0.7][j] }));
  // The remaining ideas set out in turn, and one is held.
  many(9, (j) => at(162.2 + 0.22 * j, "blip", { f: N.A4 * Math.pow(2, j / 12), g: 0.02, dur: 0.06, pan: rnd() * 1.2 - 0.6 }));
  at(164.2, "blip", { f: 300, f1: 220, g: 0.05, dur: 0.2, pan: 0.2 });

  /* ---------- the measures ---------- */
  // Each named idea runs to the runtime, and its year becomes 2027.
  [168.0, 169.6, 170.2, 171.0, 171.8].forEach((t, i) => { at(t - 0.9, "gliss", { to: t, f0: 440, f1: 1320, g: 0.022 }); at(t, "bell", { f: [N.D5, N.Fs5, N.A5, N.Fs5, N.D6][i], g: 0.07 }); });
  // Each existing system runs to the runtime: a low weight lifts, and a note answers.
  many(4, (j) => at(173.1 + 0.12 * j, "tick", { g: 0.03, f: 2200 }));
  many(4, (j) => { const t = 175.5 + 0.9 * j; at(t - 0.9, "gliss", { to: t, f0: 330, f1: 990, g: 0.02 }); at(t, "sub", { f0: 110, f1: 55, dur: 0.5, g: 0.1 }); at(t, "bell", { f: [N.A4, N.D5, N.Fs5, N.A5][j], g: 0.07 }); });

  /* ---------- the close ---------- */
  // A beat of silence, then every idea at once: low weight, bright air, a scatter of notes, a tone that rises.
  const dips = [[film(179.05), film(179.5)]];
  at(179.5, "sub", { f0: 82, f1: 36.7, dur: 1.6, g: 0.3 });
  at(179.5, "sweep", { to: 182.8, f0: 1500, f1: 9000, g: 0.06, spread: true });
  at(179.5, "gliss", { to: 182.4, f0: N.D3, f1: N.D4, g: 0.03 });
  many(70, () => at(179.6 + 3.2 * Math.pow(rnd(), 0.8), "bell", { f: [N.D5, N.Fs5, N.A5, N.D6][Math.floor(rnd() * 4)] * 2, g: 0.012, pan: rnd() * 1.8 - 0.9, dur: 0.9 }));
  // The mark: the two notes from the word, and the third that completes them. One more note for the ask.
  at(184.4, "bell", { f: N.A4, g: 0.11 });
  at(184.56, "bell", { f: N.D5, g: 0.12 });
  at(184.72, "bell", { f: N.Fs5, g: 0.14, dur: 4.5 });
  at(184.4, "sub", { f0: N.D2, f1: N.D2, dur: 2.5, g: 0.11 });
  at(187.4, "bell", { f: N.A5, g: 0.06, dur: 3.5 });
  return dips;
}
