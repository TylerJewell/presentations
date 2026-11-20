// Cuts each recorded line to its speech and writes durations.json, which the renderer and the sound script read.
//   node website/demo/sample/tts.mjs --dir=website/demo/every-idea/film/voice     records voice/audio/*.mp3
//   node website/demo/every-idea/film/voice.mjs                                    writes voice/cut/*.wav, durations.json
// With --film=4min the folder is voice-4min and the lengths go to durations-4min.json (film/film.mjs).
// The voice opens each clip on an intake and trails off after the last word, and both read as a breath. A
// clip is therefore cut from 45 ms before its first word's attack to 70 ms after its last word's decay, with
// a short fade at each cut, as in tokenomics/film/assemble.mjs.
import { spawnSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FILM } from "./film.mjs";

const DIR = dirname(fileURLToPath(import.meta.url));
const raw = JSON.parse(readFileSync(join(DIR, FILM.voice, "durations.json"), "utf8"));
const CUT = join(DIR, FILM.voice, "cut");
mkdirSync(CUT, { recursive: true });
const HOP = 0.01, ATTACK = 14, DECAY = 40, LEAD = 0.045, AFTER = 0.07, FADE_IN = 0.02, FADE_OUT = 0.09;

/** The span of a clip that holds speech, from 10 ms levels measured against the clip's own loud speech. */
function speech(file, secs) {
  const r = spawnSync("ffmpeg", ["-v", "error", "-i", file, "-ac", "1", "-ar", "22050", "-f", "f32le", "-"], { maxBuffer: 1 << 28 });
  const x = new Float32Array(r.stdout.buffer, r.stdout.byteOffset, Math.floor(r.stdout.length / 4));
  const hop = Math.round(22050 * HOP), db = [];
  for (let i = 0; i + hop <= x.length; i += hop) {
    let e = 0;
    for (let j = i; j < i + hop; j++) e += x[j] * x[j];
    db.push(10 * Math.log10(e / hop + 1e-12));
  }
  const peak = [...db].sort((a, b) => a - b)[Math.floor(db.length * 0.98)];
  let on = -1, off = -1;
  for (let i = 0; i + 2 < db.length; i++) if (db[i] > peak - ATTACK && db[i + 1] > peak - ATTACK && db[i + 2] > peak - ATTACK) { on = i; break; }
  for (let i = db.length - 1; i >= 1; i--) if (db[i] > peak - DECAY && db[i - 1] > peak - DECAY) { off = i; break; }
  return on < 0 || off < on ? [0, secs] : [Math.max(0, on * HOP - LEAD), Math.min(secs, (off + 1) * HOP + AFTER)];
}

const durations = {};
for (const [id, clip] of Object.entries(raw)) {
  const [a, b] = speech(clip.file, clip.seconds), len = b - a, file = join(CUT, `${id}.wav`);
  const r = spawnSync("ffmpeg", ["-y", "-loglevel", "error", "-i", clip.file, "-af",
    `aformat=sample_rates=48000:channel_layouts=mono,atrim=${a.toFixed(4)}:${b.toFixed(4)},asetpts=PTS-STARTPTS,afade=t=in:d=${FADE_IN}:curve=qsin,afade=t=out:st=${Math.max(0, len - FADE_OUT).toFixed(4)}:d=${FADE_OUT}:curve=qsin`,
    "-c:a", "pcm_s16le", file], { encoding: "utf8" });
  if (r.status !== 0) throw new Error(`${id}: ffmpeg failed\n${r.stderr}`);
  durations[id] = { file, seconds: +len.toFixed(3) };
  console.log(`${id}: ${clip.seconds.toFixed(2)} s recorded, ${len.toFixed(2)} s of speech`);
}
writeFileSync(join(DIR, FILM.durations), JSON.stringify(durations, null, 2));
