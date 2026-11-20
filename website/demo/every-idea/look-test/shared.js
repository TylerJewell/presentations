// Choreography constants and helpers shared by the flat (A) and 3D (B) scenes. Positions are in px
// from the frame centre at the end of the pull-back, where the field fills the frame at 1 px per unit.
const W = 1920, H = 1080, YELLOW = [255, 206, 74];
const LABELS = [
  { text: "Loan origination",   x: -480, y: -240 },
  { text: "Fraud monitoring",   x:  336, y: -288 },
  { text: "Claims processing",  x: -384, y:  192 },
  { text: "Payments ledger",    x:  432, y:  144 },
  { text: "Customer loyalty",   x:  -48, y: -432 },
];
const T = { pull: [1.5, 5.0], wave: [5.0, 7.0], word: [7.0, 8.0], fadeOut: [9.0, 10.0] };
const ZOOM = 10;     // field magnification at t = 0 relative to the end of the pull-back

const clamp01 = (x) => Math.min(1, Math.max(0, x));
const prog = (t, a, b) => clamp01((t - a) / (b - a));
const lerp = (a, b, k) => a + (b - a) * k;
const smooth = (x) => x * x * (3 - 2 * x);
const inOutCubic = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const inOutQuad = (x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);
const outCubic = (x) => 1 - Math.pow(1 - x, 3);
const outExpo = (x) => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x));
const outBack = (x, s = 1.9) => 1 + (s + 1) * Math.pow(x - 1, 3) + s * Math.pow(x - 1, 2);
const inOutSine = (x) => -(Math.cos(Math.PI * x) - 1) / 2;
const smoother = (x) => x * x * x * (x * (x * 6 - 15) + 10);

// Seeded PRNG so every render of a frame is identical.
function mulberry32(a) {
  return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

// Brightness of a point: a few are bright, most are faint.
const brightness = (rnd) => (rnd() < 0.05 ? 0.8 + 0.2 * rnd() : 0.15 + 0.2 * rnd());

// Wave front in px from the frame centre, travelling left to right; a point is fully lit once the front
// is WAVE_SOFT px past it.
const WAVE_SOFT = 260;
const waveFront = (t, ease) => lerp(-W / 2 - WAVE_SOFT, W / 2 + WAVE_SOFT, ease(prog(t, T.wave[0], T.wave[1])));
const lit = (x, front) => smooth(clamp01((front - x) / WAVE_SOFT));
// A lit point keeps its own brightness ordering.
const litAlpha = (b) => 0.55 + 0.45 * b;

// Distance of a point from the centre, 0..1: the field is revealed outward from the first point.
const radial = (x, y) => Math.min(1, Math.hypot(x, y) / 1200);
const reveal = (t, rn, ease) => ease(prog(t, T.pull[0] + 0.9 * rn, T.pull[0] + 0.9 * rn + 1.1));

// Word visibility 0..1 for the dark patch behind it: in as the word forms, out over the final second.
const wordAmount = (t) => prog(t, T.word[0], T.word[1] + 0.2) * (1 - prog(t, T.fadeOut[0], T.fadeOut[1]));

// Label start times: distinct per label, each rising over 0.8 s.
const labelStart = (i) => 3.4 + 0.2 * i;
