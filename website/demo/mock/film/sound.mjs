// Adds the film's sound to its picture: a synthesised score, one designed sound for each event the narration
// names, and the voice.
//   node website/demo/mock/film/sound.mjs [--name=akka-demo] [--wav]
// reads the scene timing from the film's own page (voice.js, pacing.js), the paced voice from durations.json and
// the silent picture render/out/<name>-silent.mp4 (from render/render.mjs --voice --no-mix); writes
// render/out/<name>-sound.wav and render/out/<name>.mp4. --wav stops after the WAV.
// The synthesiser is ../../every-idea/film/synth.js, and the method is in ../../every-idea/README.md ("The sound").
// Every sound is placed on a scene's start or on the moment a word of the narration is spoken, the same clock
// the picture keys its events to (Mock.captionAt), so a sound stays on its event when a line is recorded again.
import { createRequire } from "node:module";
import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const require = createRequire("C:/Users/tyler/ai-console/kalix-console/apps/stories/package.json");
const { chromium } = require("playwright");
const DIR = dirname(fileURLToPath(import.meta.url));
const MOCK = join(DIR, ".."), OUT = join(MOCK, "render", "out");
const NAME = process.argv.find((a) => a.startsWith("--name="))?.slice(7) ?? "akka-demo";
const durations = JSON.parse(readFileSync(join(MOCK, "durations.json"), "utf8"));

// The words the sounds are keyed to, by scene: [word, first word index to search from].
const WORDS = {
  "0.1": [["falls"], ["Demand"], ["gap"]],
  "1.1": [["Specify", 15], ["The", 15], ["Verify", 15], ["Optimize", 15], ["definition"], ["runtime"], ["evidence"]],
  "1.2": [["ships"], ["scales"], ["fails"], ["state"]],
  "2.1": [["specification"], ["builds"], ["nothing"]],
  "2.2": [["checked"], ["ready"], ["proven"]],
  "3.1": [["guardrails"], ["sanitizers"], ["evaluations"], ["policies"], ["people"], ["evidence"]],
  "3.2": [["contract"], ["signed"], ["bound"]],
  "3.3": [["changes"], ["adds"], ["reads"], ["re-opens"]],
  "3.4": [["confirms"], ["evaluation"], ["person"], ["signed"], ["chained"], ["verified"]],
  "4.1": [["gateway"], ["frontier"]],
  "4.2": [["learns"], ["traffic"], ["trains"], ["proposes"], ["The"]],
  "4.3": [["experiment"], ["shadow"], ["growing"], ["limit"]],
  "4.4": [["drops"], ["holds"], ["sends"], ["chose"]],
  "4.5": [["promotes"], ["third"], ["record"]],
  "5.1": [["captured"], ["agent"], ["tool"], ["model"], ["verdict"], ["specification", 38], ["code", 38], ["model", 38], ["same", 38]],
  "6.1": [["actor"], ["millions"], ["As"], ["flat"]],
  "6.2": [["little"], ["billion"], ["lot"], ["fraction"]],
  "6.3": [["flat"], ["not"], ["Optimize"], ["one", 30], ["That"]],
  "6.4": [["Sovereign"], ["AWS"], ["Azure"], ["Google"], ["T-Systems"], ["Alibaba"]],
};

let browser;
try { browser = await chromium.launch(); } catch { browser = await chromium.launch({ channel: "msedge" }); }
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
page.on("pageerror", (e) => console.error(String(e)));
await page.goto(pathToFileURL(join(MOCK, "index.html")).href + "?capture=1&voice=1");
await page.waitForFunction(() => window.mock && window.mock.total > 0, null, { timeout: 60000 });
const { total, scenes, marks, word, clicks } = await page.evaluate((WORDS) => {
  const scenes = window.mock.scenes, word = {};
  for (const sc of scenes) {
    window.mock.seek(sc.start + 0.01);
    const s = Mock.stageInfo.scene;
    word[sc.id] = (WORDS[sc.id] || []).map(([w, from]) => sc.start + (s.cardDur || 0) + Mock.captionAt(s, w, from || 0) * (s.warp || 1));
  }
  // A cursor click is the moment a ripple appears.
  const clicks = []; let was = 0;
  for (let t = 0; t < window.mock.total; t += 1 / 60) {
    window.mock.seek(t);
    const o = Math.max(0, ...[...document.querySelectorAll(".mk-ripple")].map((r) => +r.style.opacity || 0));
    if (o > 0.6 && was <= 0.6) clicks.push(+t.toFixed(3));
    was = o;
  }
  return { total: window.mock.total, scenes, marks: window.MOCK_PACING.marks, word, clicks };
}, WORDS);

// Notes of D major, in Hz.
const N = { G1: 49, A1: 55, B1: 61.74, D2: 73.42, E2: 82.41, Fs2: 92.5, A2: 110, B2: 123.47, Cs3: 138.59, D3: 146.83, E3: 164.81, Fs3: 185,
  G3: 196, A3: 220, D4: 293.66, E4: 329.63, Fs4: 369.99, G4: 392, A4: 440, B4: 493.88, D5: 587.33, E5: 659.25, Fs5: 739.99, A5: 880, D6: 1174.66 };
let seed = 5;
const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
const sounds = [];
const at = (t, type, o = {}) => sounds.push({ ...o, type, t });
const many = (n, fn) => { for (let i = 0; i < n; i++) fn(i); };
const start = Object.fromEntries(scenes.map((s) => [s.id, s.start]));
/** Film time at which scene `id` speaks the k-th word of its WORDS list. */
const w = (id, k) => word[id][k];

/* ---------- the score: one chord a scene, so the chord changes when the headline does ---------- */
const CHORD = {
  "0.1": { f: [N.D2, N.A2, N.E3, N.A3], g: 0.045, attack: 3 },                  // the pressure: open, unresolved
  "0.2": { f: [N.D2, N.A2, N.D3, N.Fs3, N.A3, N.E4], g: 0.05 },                 // the title: the major third arrives
  "1.1": { f: [N.G1, N.D2, N.B2, N.D3, N.G3], g: 0.055 },                       // the platform: a lift
  "1.2": { f: [N.D2, N.A2, N.Fs3, N.A3], g: 0.05 },                             // one binary: home
  "2.1": { f: [N.A1, N.E2, N.Cs3, N.E3, N.A3], g: 0.05 },                       // the build: the fifth
  "2.2": { f: [N.B1, N.Fs2, N.D3, N.Fs3, N.A3], g: 0.045 },                     // the conditions
  "3.1": { f: [N.E2, N.B2, N.E3, N.G3], g: 0.05, attack: 2 },                   // governance: a new place, E minor
  "3.2": { f: [N.G1, N.D2, N.B2, N.D3, N.G3], g: 0.05 },                        // the contract
  "3.3": { f: [N.B1, N.Fs2, N.D3, N.A3], g: 0.045 },                            // the code changes: the relative minor
  "3.4": { f: [N.A1, N.E2, N.Cs3, N.E3, N.A3], g: 0.05 },                       // decide and sign: leaning home
  "4.1": { f: [N.G1, N.D2, N.B2, N.D3, N.G3], g: 0.05 },                        // the gateway
  "4.2": { f: [N.D2, N.A2, N.Fs3, N.A3, N.D4], g: 0.05 },                       // a small model
  "4.3": { f: [N.A1, N.E2, N.D3, N.E3, N.A3], g: 0.05 },                        // the experiment: suspended
  "4.4": { f: [N.B1, N.Fs2, N.D3, N.A3], g: 0.045 },                            // a limit is crossed
  "4.5": { f: [N.D2, N.A2, N.D3, N.Fs3, N.A3], g: 0.055 },                      // promoted: home
  "5.1": { f: [N.G1, N.D2, N.B2, N.D3, N.G3], g: 0.05 },                        // the evidence record
  "6.1": { f: [N.E2, N.B2, N.E3, N.G3], g: 0.05 },                              // the actors
  "6.2": { f: [N.A1, N.E2, N.Cs3, N.E3, N.A3], g: 0.05 },                       // every interaction
  "6.3": { f: [N.G1, N.D2, N.B2, N.D3, N.G3], g: 0.055 },                       // one bill
  "6.4": { f: [N.Fs2, N.A2, N.D3, N.A3, N.D4], g: 0.05 },                       // sovereign: home, lightly
  "6.5": { f: [N.D2, N.A2, N.D3, N.Fs3, N.A3, N.D4, N.Fs4], g: 0.075, attack: 0.5, release: 4.5 },   // the close: the full chord
};
scenes.forEach((s, i) => {
  const c = CHORD[s.id], end = i + 1 < scenes.length ? scenes[i + 1].start : total - 3;
  sounds.push({ type: "pad", t: s.start, to: end, f: c.f, g: c.g, attack: c.attack ?? 1.4, release: c.release ?? 2.2 });
});
// The pulse plays the upper notes of the chord in force, three to a second, from the title to the film's one
// silence. It thins to every other note over the console's screens, where the picture is busiest.
const sceneAt = (t) => [...scenes].reverse().find((s) => s.start <= t);
const SILENCE = [start["6.5"] - 0.5, start["6.5"]];
for (let t = start["0.2"] + 0.4, i = 0; t < SILENCE[0]; t += 1 / 3, i++) {
  const s = sceneAt(t);
  if ((s.id[0] === "3" || s.id >= "4.3" && s.id < "5") && i % 2) continue;
  const chord = CHORD[s.id].f.slice(-3);
  sounds.push({ type: "pluck", t, f: chord[i % 3] * 2, g: 0.022, pan: i % 2 ? 0.3 : -0.3 });
}
// Each dissolve is a breath of air, and each new headline arrives on the top note of its chord.
scenes.slice(1, -1).forEach((s) => {
  at(s.start - 0.1, "sweep", { to: s.start + 0.6, f0: 400, f1: 2400, g: 0.016, spread: true });
  at(s.start + 0.4, "bell", { f: CHORD[s.id].f.at(-1) * 2, g: 0.04 });
});
// A cursor click.
clicks.forEach((t) => at(t, "tick", { g: 0.035, f: 2600 }));

/* ---------- the designed sounds, scene by scene ---------- */
// The pressure: the cost line falls, demand rises, and the gap opens with a low weight.
at(w("0.1", 0), "gliss", { to: w("0.1", 0) + 2.0, f0: 880, f1: 220, g: 0.025 });
at(w("0.1", 1), "gliss", { to: w("0.1", 1) + 1.6, f0: 220, f1: 660, g: 0.028 });
at(w("0.1", 2), "sub", { f0: 82, f1: 55, dur: 1.2, g: 0.12 });
at(w("0.1", 2), "tone", { to: w("0.1", 2) + 2.0, f: [N.D4, N.A4], g: 0.02 });
// The title: two notes, the fifth and the home note. They return under the end card with the third.
at(start["0.2"] + 0.45, "bell", { f: N.A4, g: 0.11 });
at(start["0.2"] + 0.7, "bell", { f: N.D5, g: 0.12, dur: 3.2 });
// The four solutions take a rising chord, one note as each card glows, and the three things they share take three bells.
[N.D4, N.Fs4, N.A4, N.D5].forEach((f, k) => at(w("1.1", k), "mallet", { f, g: 0.09, pan: -0.45 + 0.3 * k }));
[N.A4, N.D5, N.Fs5].forEach((f, k) => at(w("1.1", 4 + k), "bell", { f, g: 0.06, pan: -0.3 + 0.3 * k }));
// One binary: it scales out, a node fails, and no state is lost.
at(w("1.2", 0), "bell", { f: N.D5, g: 0.05 });
at(w("1.2", 1), "gliss", { to: w("1.2", 1) + 1.4, f0: 220, f1: 440, g: 0.025 });
at(w("1.2", 2), "sub", { f0: 82, f1: 55, dur: 0.8, g: 0.1 });
at(w("1.2", 3), "confirm", {});
// The build: the specification, the agent at work, and the rule that nothing ships.
at(w("2.1", 0), "bell", { f: N.E5, g: 0.05 });
many(6, (i) => at(w("2.1", 1) + 0.09 * i, "tick", { g: 0.03, f: 3200 + 200 * i, pan: 0.2 }));
at(w("2.1", 2), "tone", { to: w("2.1", 2) + 1.6, f: [N.E4, N.A4], g: 0.02 });
// The conditions pass in a rising run, the system is ready to ship, and the home chord sounds on "proven".
many(17, (j) => at(w("2.2", 0) + (2.2 * j) / 17, "blip", { f: 900 * Math.pow(2, (j / 17) * 1.4), g: 0.02, dur: 0.05, pan: 0.2 + 0.03 * j }));
at(w("2.2", 1), "confirm", {});
[N.D4, N.Fs4, N.A4].forEach((f, k) => at(w("2.2", 2) + 0.15 * k, "mallet", { f, g: 0.08 }));
// The five kinds of control take five rising notes.
[N.E4, N.G4, N.A4, N.B4, N.D5].forEach((f, k) => at(w("3.1", k), "mallet", { f, g: 0.075, pan: -0.4 + 0.2 * k }));
at(w("3.1", 5), "bell", { f: N.E5, g: 0.05 });
// The contract, signed and bound.
at(w("3.2", 0), "bell", { f: N.D5, g: 0.05 });
at(w("3.2", 1), "tick", { g: 0.04, f: 2200 });
at(w("3.2", 2), "confirm", {});
// The code changes, Akka reads it, and the contract re-opens on an unresolved pair of notes.
at(w("3.3", 0), "sub", { f0: 110, f1: 73, dur: 0.7, g: 0.09 });
at(w("3.3", 1), "tick", { g: 0.04, f: 1800, pan: 0.3 });
at(w("3.3", 2), "sweep", { to: w("3.3", 2) + 1.2, f0: 600, f1: 3600, g: 0.02 });
at(w("3.3", 3), "tone", { to: w("3.3", 3) + 1.6, f: [N.D4, N.E4], g: 0.022 });
// Two controls are added, and version four is signed: a stamp, then the home chord.
at(w("3.4", 0), "tick", { g: 0.04, f: 2200 });
[N.Fs4, N.A4].forEach((f, k) => at(w("3.4", 1 + k), "mallet", { f, g: 0.08, pan: k ? 0.3 : -0.3 }));
at(w("3.4", 3), "stamp", { g: 0.13 });
[N.D4, N.Fs4, N.A4].forEach((f, k) => at(w("3.4", 3) + 0.2 + 0.15 * k, "mallet", { f, g: 0.08 }));
at(w("3.4", 4), "tick", { g: 0.035, f: 2600, pan: 0.3 });
at(w("3.4", 5), "confirm", {});
// The gateway.
at(w("4.1", 0), "bell", { f: N.D5, g: 0.05 });
at(w("4.1", 1), "tick", { g: 0.035, f: 2400, pan: 0.5 });
// Observe, route, train and serve take four notes, and the owner's decision is left open.
[N.D4, N.E4, N.Fs4, N.A4].forEach((f, k) => at(w("4.2", k), "mallet", { f, g: 0.07, pan: -0.45 + 0.3 * k }));
at(w("4.2", 4), "tone", { to: w("4.2", 4) + 1.4, f: [N.E4, N.A4], g: 0.02 });
// The experiment: shadow copies, then a growing share of traffic.
at(w("4.3", 0), "bell", { f: N.E5, g: 0.05 });
at(w("4.3", 1), "sweep", { to: w("4.3", 1) + 1.2, f0: 1800, f1: 5200, g: 0.016, spread: true });
at(w("4.3", 2), "gliss", { to: w("4.3", 2) + 1.5, f0: 220, f1: 330, g: 0.025 });
at(w("4.3", 3), "tick", { g: 0.035, f: 2200 });
// Quality drops in one region, the experiment holds, and that region goes back to the frontier model.
at(w("4.4", 0), "sub", { f0: 82, f1: 55, dur: 1.0, g: 0.13 });
at(w("4.4", 1), "tick", { g: 0.04, f: 1800 });
at(w("4.4", 2), "sweep", { to: w("4.4", 2) + 1.0, f0: 900, f1: 300, g: 0.025 });
at(w("4.4", 3), "confirm", {});
// The owner promotes the small model.
at(w("4.5", 0), "confirm", {});
at(w("4.5", 0) + 0.3, "bell", { f: N.D5, g: 0.07 });
at(w("4.5", 1), "bell", { f: N.A5, g: 0.05 });
at(w("4.5", 2), "tick", { g: 0.035, f: 2600 });
// One conversation, captured: its calls, its verdicts, and the three changes sounding the home chord.
at(w("5.1", 0), "sweep", { to: w("5.1", 0) + 1.6, f0: 500, f1: 3200, g: 0.02 });
many(3, (k) => at(w("5.1", 1 + k), "tick", { g: 0.035, f: 2400 + 300 * k, pan: -0.3 + 0.3 * k }));
many(4, (j) => at(w("5.1", 4) + 0.14 * j, "blip", { f: 900 * Math.pow(2, ((30 + j) / 40) * 1.4), g: 0.022, dur: 0.05, pan: 0.3 }));
[N.D4, N.Fs4, N.A4].forEach((f, k) => at(w("5.1", 5 + k), "mallet", { f, g: 0.09, pan: -0.3 + 0.3 * k }));
at(w("5.1", 8), "bell", { f: N.D5, g: 0.07, dur: 2.4 });
// The actors: one, then millions to a core, and latency staying flat as load grows.
at(w("6.1", 0), "bell", { f: N.E5, g: 0.05 });
many(36, () => at(w("6.1", 1) + 1.8 * Math.pow(rnd(), 0.7), "bell", { f: [N.D5, N.E5, N.Fs5, N.A5, N.D6][Math.floor(rnd() * 5)] * 2, g: 0.011, pan: rnd() * 1.6 - 0.8, dur: 0.8 }));
at(w("6.1", 2), "gliss", { to: w("6.1", 2) + 1.5, f0: 220, f1: 440, g: 0.025 });
at(w("6.1", 3), "tone", { to: w("6.1", 3) + 1.5, f: [N.E4, N.B4], g: 0.02 });
// A little less on each interaction, and a billion of them.
at(w("6.2", 0), "tick", { g: 0.035, f: 2400 });
at(w("6.2", 1), "gliss", { to: w("6.2", 1) + 2.0, f0: 220, f1: 880, g: 0.03 });
at(w("6.2", 2), "bell", { f: N.A5, g: 0.06 });
at(w("6.2", 3), "confirm", {});
// The flat bill, the metered stack's spike, the forecast, and one bill.
at(w("6.3", 0), "tone", { to: w("6.3", 0) + 1.6, f: [N.G3, N.D4], g: 0.02 });
at(w("6.3", 1), "sub", { f0: 110, f1: 73, dur: 0.5, g: 0.09 });
at(w("6.3", 2), "tick", { g: 0.035, f: 2400 });
at(w("6.3", 3), "bell", { f: N.D5, g: 0.06 });
at(w("6.3", 4), "bell", { f: N.G4 * 2, g: 0.05 });
// The five clouds take five rising notes, from the left of the frame to the right.
at(w("6.4", 0), "tone", { to: w("6.4", 0) + 1.6, f: [N.D4, N.A4], g: 0.02 });
[N.D4, N.E4, N.Fs4, N.A4, N.B4].forEach((f, k) => at(w("6.4", 1 + k), "bell", { f: f * 2, g: 0.065, pan: -0.6 + 0.3 * k, dur: 1.6 }));
// The close: every sound stops for half a second, and the title's two notes return with the third.
at(start["6.5"], "sub", { f0: 82, f1: 55, dur: 1.2, g: 0.16 });
at(start["6.5"], "sweep", { to: start["6.5"] + 2.2, f0: 1800, f1: 7000, g: 0.04, spread: true });
[[N.A4, 0.12], [N.D5, 0.13], [N.Fs5, 0.13]].forEach(([f, g], k) => at(start["6.5"] + 0.4 + 0.25 * k, "bell", { f, g, dur: 3.4 }));

/* ---------- synthesise ---------- */
// The score steps back under each spoken sentence.
const lines = scenes.flatMap((s) => (marks[s.id] || []).map(([, a, b]) => [s.start + s.card + 0.35 + a, s.start + s.card + 0.35 + b]));
await page.addScriptTag({ path: join(MOCK, "..", "every-idea", "film", "synth.js") });
const made = await page.evaluate((job) => window.renderSound(job), { total, sounds, lines, dips: [SILENCE] });
const chunks = [];
for (let a = 0; a < made.bytes; a += 3 << 20) chunks.push(Buffer.from(await page.evaluate(([x, y]) => window.soundBytes(x, y), [a, Math.min(made.bytes, a + (3 << 20))]), "base64"));
await browser.close();
const pcm = Buffer.concat(chunks), head = Buffer.alloc(44);
head.write("RIFF", 0); head.writeUInt32LE(36 + pcm.length, 4); head.write("WAVEfmt ", 8); head.writeUInt32LE(16, 16); head.writeUInt16LE(1, 20);
head.writeUInt16LE(2, 22); head.writeUInt32LE(48000, 24); head.writeUInt32LE(48000 * 4, 28); head.writeUInt16LE(4, 32); head.writeUInt16LE(16, 34);
head.write("data", 36); head.writeUInt32LE(pcm.length, 40);
const wav = join(OUT, `${NAME}-sound.wav`);
writeFileSync(wav, Buffer.concat([head, pcm]));
console.log(`${sounds.length} sounds, ${(pcm.length / 192000).toFixed(1)} s, peak ${made.peak.toFixed(2)}, ${clicks.length} clicks`);
if (process.argv.includes("--wav")) process.exit(0);

/* ---------- mix ---------- */
// The sound sits 13 dB under the voice, and the whole mix is levelled to -16 LUFS with a true peak of -1.8 dB.
const lufs = (f) => +/I:\s+(-?[\d.]+) LUFS/.exec(spawnSync("ffmpeg", ["-hide_banner", "-i", f, "-af", "ebur128", "-f", "null", "-"], { encoding: "utf8" }).stderr.split("Summary")[1])[1];
const voiced = scenes.map((s) => ({ file: durations[s.id].file, ms: Math.round((s.start + s.card + 0.35) * 1000) }));
const args = ["-y", "-hide_banner", "-loglevel", "info", "-i", join(OUT, `${NAME}-silent.mp4`), "-i", wav];
voiced.forEach((v) => args.push("-i", v.file));
const voiceL = voiced.reduce((a, v) => a + lufs(v.file), 0) / voiced.length;
const bus = `${voiced.map((v, i) => `[${i + 2}:a]adelay=${v.ms}|${v.ms}[v${i}]`).join(";")};${voiced.map((_, i) => `[v${i}]`).join("")}amix=inputs=${voiced.length}:normalize=0:dropout_transition=0[vb];` +
  `[1:a]volume=${(voiceL - 13 - lufs(wav)).toFixed(1)}dB[sb];[vb][sb]amix=inputs=2:normalize=0:dropout_transition=0,apad`;
const LN = "loudnorm=I=-16:TP=-1.8:LRA=11";
const pass1 = spawnSync("ffmpeg", [...args, "-filter_complex", `${bus},${LN}:print_format=json[a]`, "-map", "[a]", "-t", total.toFixed(2), "-f", "null", "-"], { encoding: "utf8" });
const js = JSON.parse(pass1.stderr.slice(pass1.stderr.lastIndexOf("{"), pass1.stderr.lastIndexOf("}") + 1));
const mix = `${bus},${LN}:measured_I=${js.input_i}:measured_TP=${js.input_tp}:measured_LRA=${js.input_lra}:measured_thresh=${js.input_thresh}:offset=${js.target_offset}:linear=true[a]`;
const final = join(OUT, `${NAME}.mp4`);
const m = spawnSync("ffmpeg", [...args.map((x) => (x === "info" ? "error" : x)), "-filter_complex", mix, "-map", "0:v", "-map", "[a]", "-map_metadata", "0", "-map_chapters", "0",
  "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-movflags", "+faststart", "-shortest", final], { stdio: "inherit" });
if (m.status !== 0) { console.error("ffmpeg (mix) failed"); process.exit(1); }
console.log(`${final}: voice and sound, ${lufs(final).toFixed(1)} LUFS`);
