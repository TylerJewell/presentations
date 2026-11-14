// Writes narration.json (one line per scene) and sentences/narration.json (one entry per sentence, ids like
// 2.1.2, for demo/sample/tts.mjs --dir=sentences and film/assemble.mjs) from the timeline in scenes/index.js, so
// the captions and the voice read the same text. Text only: no voice call.
//   node demo/roi/render/narration.mjs
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const FILM = dirname(dirname(fileURLToPath(import.meta.url)));
const src = readFileSync(join(FILM, "scenes", "index.js"), "utf8");
const window = {};
new Function("window", src)(window);
const lines = {}, sentences = {};
window.FILM_SCENES.forEach((s) => {
  lines[s.id] = s.say;
  s.say.split(/(?<=[.!?])\s+/).forEach((sent, k) => (sentences[`${s.id}.${k + 1}`] = sent));
});
writeFileSync(join(FILM, "narration.json"), JSON.stringify(lines, null, 2) + "\n");
mkdirSync(join(FILM, "sentences"), { recursive: true });
writeFileSync(join(FILM, "sentences", "narration.json"), JSON.stringify(sentences, null, 2) + "\n");
const words = Object.values(lines).reduce((a, s) => a + s.split(/\s+/).length, 0);
const secs = window.FILM_SCENES.reduce((a, s) => a + s.duration, 0);
console.log(`${Object.keys(lines).length} lines, ${Object.keys(sentences).length} sentences, ${words} words, ${Math.floor(secs / 60)}:${String(Math.round(secs % 60)).padStart(2, "0")} designed (${secs.toFixed(1)} s)`);
window.FILM_SCENES.forEach((s) => {
  const n = s.say.split(/\s+/).length, fit = Math.max(0, s.duration - 2) * 2.5;
  if (n > fit * 1.1) console.log(`  ${s.id}: ${n} words in ${s.duration} s (about ${Math.round(fit)} fit at 2.5 a second)`);
});
