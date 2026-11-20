// Adds a film's sound to its picture: a synthesised score, one designed sound for each event on screen, and
// the voice when it has been recorded.
//   node website/demo/every-idea/film/sound.mjs [--film=4min]
// reads the film's timeline and silent picture (both from render.mjs) and its measured line lengths (from
// voice.mjs, when present); writes the sound as a WAV and out/<film>.mp4. film/film.mjs names each film's files.
// Every sound is placed at a time on the slide's own timeline, the same clock the picture's events use, and
// the timeline maps it into the film. A sound therefore stays on its event when a line's length changes.
import { createRequire } from "node:module";
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FILM, clock } from "./film.mjs";

const require = createRequire("C:/Users/tyler/ai-console/kalix-console/apps/stories/package.json");
const { chromium } = require("playwright");
const DIR = dirname(fileURLToPath(import.meta.url));
const OUT = join(DIR, "out");
const timeline = JSON.parse(readFileSync(join(OUT, FILM.timeline), "utf8"));
const durations = existsSync(join(DIR, FILM.durations)) ? JSON.parse(readFileSync(join(DIR, FILM.durations), "utf8")) : {};

/** Film time of a moment on the slide's timeline. */
const film = clock(timeline.segs, FILM.stretch).filmAt;

// Notes of D major, in Hz.
const N = { G1: 49, A1: 55, B1: 61.74, D2: 73.42, E2: 82.41, Fs2: 92.5, A2: 110, B2: 123.47, Cs3: 138.59, D3: 146.83, E3: 164.81, Fs3: 185,
  G3: 196, A3: 220, D4: 293.66, E4: 329.63, Fs4: 369.99, A4: 440, B4: 493.88, D5: 587.33, E5: 659.25, Fs5: 739.99, A5: 880, D6: 1174.66 };
let seed = 5;
const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };

const sounds = [];
/** Places a sound at slide time t; `to`, when given, is also a slide time. */
const at = (t, type, o = {}) => sounds.push({ ...o, type, t: film(t), ...(o.to != null ? { to: film(o.to) } : {}) });
const many = (n, fn) => { for (let i = 0; i < n; i++) fn(i); };

// The score and the designed sounds are the film's own (score-1min.mjs, score-4min.mjs). They place every
// sound at a slide time and return the spans of film time that are silent.
const { score } = await import(FILM.score);
const dips = score({ film, total: timeline.total, sounds, at, many, N, rnd });

/* ---------- synthesise ---------- */
const lines = timeline.segs.map((s) => [s.from, s.to]);
let browser;
try { browser = await chromium.launch(); } catch { browser = await chromium.launch({ channel: "msedge" }); }
const page = await browser.newPage();
page.on("pageerror", (e) => console.error(String(e)));
await page.addScriptTag({ path: join(DIR, "synth.js") });
const made = await page.evaluate((job) => window.renderSound(job), { total: timeline.total, sounds, lines, dips });
const chunks = [];
for (let a = 0; a < made.bytes; a += 3 << 20) chunks.push(Buffer.from(await page.evaluate(([x, y]) => window.soundBytes(x, y), [a, Math.min(made.bytes, a + (3 << 20))]), "base64"));
await browser.close();
const pcm = Buffer.concat(chunks), head = Buffer.alloc(44);
head.write("RIFF", 0); head.writeUInt32LE(36 + pcm.length, 4); head.write("WAVEfmt ", 8); head.writeUInt32LE(16, 16); head.writeUInt16LE(1, 20);
head.writeUInt16LE(2, 22); head.writeUInt32LE(48000, 24); head.writeUInt32LE(48000 * 4, 28); head.writeUInt16LE(4, 32); head.writeUInt16LE(16, 34);
head.write("data", 36); head.writeUInt32LE(pcm.length, 40);
const wav = join(OUT, FILM.wav);
writeFileSync(wav, Buffer.concat([head, pcm]));
console.log(`${sounds.length} sounds, ${(pcm.length / 192000).toFixed(1)} s, peak ${made.peak.toFixed(2)}`);

/* ---------- mix ---------- */
// With a voice, the sound sits 13 dB under it and the whole mix is levelled to -16 LUFS. Without one, the
// sound alone is levelled to -20 LUFS so the review cut is not loud.
const lufs = (f) => +/I:\s+(-?[\d.]+) LUFS/.exec(spawnSync("ffmpeg", ["-hide_banner", "-i", f, "-af", "ebur128", "-f", "null", "-"], { encoding: "utf8" }).stderr.split("Summary")[1])[1];
const voiced = timeline.segs.filter((s) => durations[`b${s.k + 1}`]).map((s) => ({ file: durations[`b${s.k + 1}`].file, ms: Math.round(s.from * 1000) }));
const args = ["-y", "-hide_banner", "-loglevel", "info", "-i", join(OUT, `${FILM.name}-silent.mp4`), "-i", wav];
voiced.forEach((v) => args.push("-i", v.file));
let bus, target;
if (voiced.length) {
  const voiceL = voiced.reduce((a, v) => a + lufs(v.file), 0) / voiced.length;
  bus = `${voiced.map((v, i) => `[${i + 2}:a]adelay=${v.ms}|${v.ms}[v${i}]`).join(";")};${voiced.map((_, i) => `[v${i}]`).join("")}amix=inputs=${voiced.length}:normalize=0:dropout_transition=0[vb];` +
    `[1:a]volume=${(voiceL - 13 - lufs(wav)).toFixed(1)}dB[sb];[vb][sb]amix=inputs=2:normalize=0:dropout_transition=0,apad`;
  target = -16;
} else { bus = "[1:a]apad"; target = -20; }
const LN = `loudnorm=I=${target}:TP=-1.8:LRA=11`;
const pass1 = spawnSync("ffmpeg", [...args, "-filter_complex", `${bus},${LN}:print_format=json[a]`, "-map", "[a]", "-t", timeline.total.toFixed(2), "-f", "null", "-"], { encoding: "utf8" });
const js = JSON.parse(pass1.stderr.slice(pass1.stderr.lastIndexOf("{"), pass1.stderr.lastIndexOf("}") + 1));
const mix = `${bus},${LN}:measured_I=${js.input_i}:measured_TP=${js.input_tp}:measured_LRA=${js.input_lra}:measured_thresh=${js.input_thresh}:offset=${js.target_offset}:linear=true[a]`;
const final = join(OUT, `${FILM.name}.mp4`);
const m = spawnSync("ffmpeg", [...args.map((x) => (x === "info" ? "error" : x)), "-filter_complex", mix, "-map", "0:v", "-map", "[a]",
  "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-movflags", "+faststart", "-shortest", final], { stdio: "inherit" });
if (m.status !== 0) { console.error("ffmpeg (mix) failed"); process.exit(1); }
console.log(`out/${FILM.name}.mp4: ${voiced.length ? "voice and sound" : "sound only"}, ${lufs(final).toFixed(1)} LUFS`);
