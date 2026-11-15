// Writes narration.json (one line per scene), sentences/narration.json (one entry per sentence, ids like 3.1.2, the
// input to the voice step) and durations.json (each scene's designed seconds) from the timeline in scenes/index.js,
// so the captions and the voice read the same text. Text only: no voice call. The voice step later replaces
// durations.json with the measured clip lengths.
//   node website/demo/modernize/render/narration.mjs
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const FILM = dirname(dirname(fileURLToPath(import.meta.url)));
const src = readFileSync(join(FILM, "scenes", "index.js"), "utf8");
const window = {};
new Function("window", src)(window);
const lines = {}, sentences = {}, durations = {};
window.FILM_SCENES.forEach((s) => {
  lines[s.id] = s.say;
  durations[s.id] = s.duration;
  s.say.split(/(?<=[.!?])\s+/).forEach((sent, k) => (sentences[`${s.id}.${k + 1}`] = sent));
});
writeFileSync(join(FILM, "narration.json"), JSON.stringify(lines, null, 2) + "\n");
writeFileSync(join(FILM, "durations.json"), JSON.stringify(durations, null, 2) + "\n");
mkdirSync(join(FILM, "sentences"), { recursive: true });
writeFileSync(join(FILM, "sentences", "narration.json"), JSON.stringify(sentences, null, 2) + "\n");
const words = Object.values(lines).reduce((a, s) => a + s.split(/\s+/).length, 0);
const secs = window.FILM_SCENES.reduce((a, s) => a + s.duration, 0);
console.log(`${Object.keys(lines).length} lines, ${Object.keys(sentences).length} sentences, ${words} words, ${Math.floor(secs / 60)}:${String(Math.round(secs % 60)).padStart(2, "0")} designed (${secs} s)`);
/* the storyboard's pace: 2.6 words a second, 1.0 s between sentences, a 1.6 s tail */
window.FILM_SCENES.forEach((s) => {
  const n = s.say.split(/\s+/).length, k = s.say.split(/(?<=[.!?])\s+/).length;
  const need = n / 2.6 + (k - 1) * 1.0 + 1.6 + 0.35;
  if (need > s.duration) console.log(`  ${s.id}: ${n} words need about ${need.toFixed(1)} s at the storyboard's pace; designed ${s.duration} s`);
});
