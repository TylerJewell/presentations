// Slows the film around the cached narration clips without regenerating them.
//   node website/demo/proposal-panel/film/pacing.mjs
// Each clip is cut at its sentence boundaries (the silences nearest the boundaries the text implies) and
// `pause` seconds of silence go between sentences. The paced clips land in audio/paced/, durations.json
// points at them (the unpaced entries are kept in durations.unpaced.json), and pacing.js carries the
// tail lengths and each sentence's word range and time span for the player (window.MOCK_PACING).
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const cfg = JSON.parse(readFileSync(join(ROOT, "film", "pacing.config.json"), "utf8"));
const lines = JSON.parse(readFileSync(join(ROOT, "narration.json"), "utf8"));
const unpaced = join(ROOT, "durations.unpaced.json");
const current = JSON.parse(readFileSync(join(ROOT, "durations.json"), "utf8"));
if (!existsSync(unpaced) || !Object.values(current).some((d) => d.paced)) {
  if (!Object.values(current).some((d) => d.paced)) writeFileSync(unpaced, JSON.stringify(current, null, 2));
}
const src = JSON.parse(readFileSync(unpaced, "utf8"));
const OUT = join(ROOT, "audio", "paced");
mkdirSync(OUT, { recursive: true });

const silences = (f) => {
  const err = spawnSync("ffmpeg", ["-hide_banner", "-i", f, "-af", "silencedetect=n=-35dB:d=0.10", "-f", "null", "-"], { encoding: "utf8" }).stderr;
  const starts = [...err.matchAll(/silence_start: ([\d.]+)/g)].map((m) => +m[1]);
  const ends = [...err.matchAll(/silence_end: ([\d.]+)/g)].map((m) => +m[1]);
  return starts.map((s, i) => ({ s, e: ends[i] ?? Infinity })).filter((x) => x.e !== Infinity);
};


// Breath conditioning. The clips open on a short intake and trail off after the last word; heard on their own after a
// pause, both read as a breath. Each sentence segment is therefore cut from just before its first word's attack to just
// after its last word's decay, with a short fade at each cut. Levels are measured against the clip's own loud speech.
const HOP = 0.01;
const level = (f) => {
  const r = spawnSync("ffmpeg", ["-v", "error", "-i", f, "-ac", "1", "-ar", "22050", "-f", "f32le", "-"], { maxBuffer: 1 << 28 });
  const x = new Float32Array(r.stdout.buffer, r.stdout.byteOffset, Math.floor(r.stdout.length / 4));
  const hop = Math.round(22050 * HOP), db = [];
  for (let i = 0; i + hop <= x.length; i += hop) {
    let e = 0;
    for (let j = i; j < i + hop; j++) e += x[j] * x[j];
    db.push(10 * Math.log10(e / hop + 1e-12));
  }
  const sorted = [...db].sort((a, b) => a - b);
  return { db, peak: sorted[Math.floor(sorted.length * 0.98)] };
};
const PAUSE_DB = 20, PAUSE_MIN = 0.2;
const ATTACK = 14, DECAY = 27, LEAD = 0.045, TAIL_AFTER = 0.07, FADE_IN = 0.02, FADE_OUT = 0.09;
const refine = (env, a, b) => {
  const i0 = Math.floor(a / HOP), i1 = Math.min(env.db.length, Math.ceil(b / HOP));
  let on = -1, off = -1;
  for (let i = i0; i + 2 < i1; i++) if (env.db[i] > env.peak - ATTACK && env.db[i + 1] > env.peak - ATTACK && env.db[i + 2] > env.peak - ATTACK) { on = i; break; }
  for (let i = i1 - 1; i - 1 >= i0; i--) if (env.db[i] > env.peak - DECAY && env.db[i - 1] > env.peak - DECAY) { off = i; break; }
  if (on < 0 || off < on) return [a, b];
  return [Math.max(a, on * HOP - LEAD), Math.min(b, (off + 1) * HOP + TAIL_AFTER)];
};

const durations = {}, marks = {};
for (const [id, entry] of Object.entries(src)) {
  const sents = lines[id].split(/(?<=[.!?])\s+/);
  const counts = sents.map((x) => x.split(/\s+/).length), total = counts.reduce((a, b) => a + b, 0);
  const secs = entry.seconds;
  const env = level(entry.file);
  let lastIdx = env.db.length - 1;
  while (lastIdx > 0 && env.db[lastIdx] < env.peak - DECAY) lastIdx--;
  let firstIdx = 0;
  while (firstIdx < lastIdx && env.db[firstIdx] < env.peak - ATTACK) firstIdx++;
  const lastSpeech = (lastIdx + 1) * HOP, firstSpeech = firstIdx * HOP;
  // Pauses are runs below the speech level; they include a breath, which is why they are not found as silences.
  const pauses = [];
  for (let i = firstIdx; i <= lastIdx;) {
    if (env.db[i] >= env.peak - PAUSE_DB) { i++; continue; }
    let j = i;
    while (j <= lastIdx && env.db[j] < env.peak - PAUSE_DB) j++;
    if ((j - i) * HOP >= PAUSE_MIN) pauses.push({ s: i * HOP, e: j * HOP });
    i = j;
  }
  // The sentence boundaries are the pauses that make each segment's length best match its word count. A comma
  // pause inside a list can be as long as a sentence pause, so nearness to the expected time is not enough.
  const rate = (lastSpeech - firstSpeech) / total;
  let picks = null, bestCost = Infinity;
  const choose = (from, left, chosen) => {
    if (left === 0) {
      const b = [firstSpeech, ...chosen.map((g) => (g.s + g.e) / 2), lastSpeech];
      let cost = 0;
      for (let k = 0; k < counts.length; k++) cost += (b[k + 1] - b[k] - counts[k] * rate) ** 2;
      if (cost < bestCost) { bestCost = cost; picks = chosen.slice(); }
      return;
    }
    for (let j = from; j <= pauses.length - left; j++) { chosen.push(pauses[j]); choose(j + 1, left - 1, chosen); chosen.pop(); }
  };
  choose(0, sents.length - 1, []);
  if (!picks) throw new Error(`${id}: not enough pauses for ${sents.length} sentences`);
  picks.sort((a, b) => a.s - b.s);
  const cuts = picks.map((g) => (g.s + g.e) / 2);
  const bounds = [0, ...cuts, secs];
  const n = sents.length;
  const segs = Array.from({ length: n }, (_, k) => refine(env, bounds[k], bounds[k + 1]));
  const parts = [];
  for (let k = 0; k < n; k++) {
    const [a, b] = segs[k], len = b - a;
    parts.push(`[0:a]atrim=${a.toFixed(4)}:${b.toFixed(4)},asetpts=PTS-STARTPTS,afade=t=in:d=${FADE_IN}:curve=qsin,afade=t=out:st=${Math.max(0, len - FADE_OUT).toFixed(4)}:d=${FADE_OUT}:curve=qsin[s${k}]`);
    if (k < n - 1) parts.push(`aevalsrc=0:d=${cfg.pause}:s=44100:c=mono[p${k}]`);
  }
  const order = Array.from({ length: n }, (_, k) => (k < n - 1 ? `[s${k}][p${k}]` : `[s${k}]`)).join("");
  const file = join(OUT, `${id}.wav`);
  const r = spawnSync("ffmpeg", ["-y", "-loglevel", "error", "-i", entry.file, "-filter_complex", `${parts.join(";")};${order}concat=n=${2 * n - 1}:v=0:a=1[a]`, "-map", "[a]", "-c:a", "pcm_s16le", file]);
  if (r.status !== 0) throw new Error(`${id}: ffmpeg failed`);
  const dur = +spawnSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", file], { encoding: "utf8" }).stdout;
  let w = 0;
  let clock = 0;
  marks[id] = sents.map((_, k) => {
    const len = segs[k][1] - segs[k][0];
    const t0 = clock, t1 = clock + len;
    clock = t1 + cfg.pause;
    const m = [w, +t0.toFixed(3), +t1.toFixed(3)];
    w += counts[k];
    return m;
  });
  durations[id] = { file, seconds: dur, paced: true };
}
writeFileSync(join(ROOT, "durations.json"), JSON.stringify(durations, null, 2));
writeFileSync(join(ROOT, "pacing.js"),
  "/* Generated by film/pacing.mjs. tail and cardTail are seconds after a line; marks[id] lists each sentence as\n" +
  "   [first word index, speech start, speech end] in seconds from the start of the paced clip. */\n" +
  `window.MOCK_PACING = ${JSON.stringify({ tail: cfg.tail, cardTail: cfg.cardTail, marks })};\n`);

// Running time: each scene is its chapter card, the 0.35 s lead, its clip and its tail; the last scene keeps the player's own fit.
const cards = new Set(["1.1", "2.1", "3.1", "4.1"]);
const ids = Object.keys(durations);
let t = 0;
ids.forEach((id, i) => { t += (cards.has(id) ? 2.6 : 0) + 0.35 + durations[id].seconds + (i === ids.length - 1 ? 1.2 : cards.has(ids[i + 1]) ? cfg.cardTail : cfg.tail); });
console.log(`approx running time ${t.toFixed(1)} s (${Math.floor(t / 60)}:${String(Math.round(t % 60)).padStart(2, "0")})`);
