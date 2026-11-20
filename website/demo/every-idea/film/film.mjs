// Which film a script works on: the one-minute film, or the four-minute film when run with --film=4min.
// Each film has its own deck page, voice folder, measured line lengths, timeline, stills folder and score.
// stretch: a beat's animation slows to fill the whole beat, so no beat ends on a held frame (see clock).
const four = process.argv.includes("--film=4min");
export const FILM = four
  ? { page: "four-minute.html", name: "every-idea-4min", voice: "voice-4min", durations: "durations-4min.json", timeline: "timeline-4min.json",
      stills: "stills-4min", wav: "sound-4min.wav", score: "./score-4min.mjs", stretch: true }
  : { page: "index.html", name: "every-idea-1min", voice: "voice", durations: "durations.json", timeline: "timeline.json",
      stills: "stills", wav: "sound.wav", score: "./score-1min.mjs", stretch: false };

/** A film's clock, from its timeline's segments. slideAt maps a film time to a time on the slide's own clock,
    and filmAt maps a slide time back. Without stretch, each beat's animation plays at full pace and then
    holds until the beat ends. With stretch, slide time is one smooth rising curve through the beats'
    boundaries, so anything that moves across a boundary changes pace gradually and never in a step. */
export function clock(segs, stretch) {
  const seg = (pick) => segs.find(pick) ?? segs[segs.length - 1];
  if (!stretch) return {
    slideAt: (f) => { const s = seg((x) => f < x.start + x.len); return s.t0 + Math.min(s.anim, Math.max(0, f - s.start - s.fadeIn)); },
    filmAt: (t) => { const s = seg((x) => t <= x.t1 + 1e-6); return s.start + s.fadeIn + (t - s.t0); },
  };
  const last = segs[segs.length - 1];
  const X = segs.map((s) => s.start + s.fadeIn).concat(last.start + last.len - last.fadeOut), Y = segs.map((s) => s.t0).concat(last.t1);
  const n = X.length - 1, h = X.slice(1).map((x, i) => x - X[i]), d = h.map((w, i) => (Y[i + 1] - Y[i]) / w);
  // A cubic through each pair of boundaries. The pace at a boundary is the weighted harmonic mean of the
  // paces of the two beats it joins (Fritsch and Carlson), which keeps the curve rising everywhere.
  const m = X.map((_, i) => (i === 0 ? d[0] : i === n ? d[n - 1] : (3 * (h[i - 1] + h[i])) / ((2 * h[i] + h[i - 1]) / d[i - 1] + (h[i] + 2 * h[i - 1]) / d[i])));
  const slideAt = (f) => {
    if (f <= X[0]) return Y[0];
    if (f >= X[n]) return Y[n];
    const i = X.findLastIndex((x) => f >= x), u = (f - X[i]) / h[i], u2 = u * u, u3 = u2 * u;
    return (2 * u3 - 3 * u2 + 1) * Y[i] + (u3 - 2 * u2 + u) * h[i] * m[i] + (3 * u2 - 2 * u3) * Y[i + 1] + (u3 - u2) * h[i] * m[i + 1];
  };
  const filmAt = (t) => {
    let a = X[0], b = X[n];
    for (let k = 0; k < 50; k++) { const c = (a + b) / 2; if (slideAt(c) < t) a = c; else b = c; }
    return (a + b) / 2;
  };
  return { slideAt, filmAt };
}
