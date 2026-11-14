// Writes narration.json (one line per scene, in order) from the timeline in scenes/index.js, so the
// narration the player captions and the narration the voice reads are the same text. Text only: no voice call.
//   node demo/tokenomics/render/narration.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const FILM = dirname(dirname(fileURLToPath(import.meta.url)));
const src = readFileSync(join(FILM, "scenes", "index.js"), "utf8");
const window = {};
new Function("window", src)(window);
const out = {};
window.FILM_SCENES.forEach((s) => (out[s.id] = s.say));
writeFileSync(join(FILM, "narration.json"), JSON.stringify(out, null, 2) + "\n");
const words = Object.values(out).reduce((a, s) => a + s.split(/\s+/).length, 0);
const secs = window.FILM_SCENES.reduce((a, s) => a + s.duration, 0);
console.log(`${Object.keys(out).length} lines, ${words} words, ${Math.floor(secs / 60)}:${String(Math.round(secs % 60)).padStart(2, "0")} designed (${secs.toFixed(1)} s)`);
const CARD = 2.6;
window.FILM_SCENES.forEach((s, i) => {
  const prev = window.FILM_SCENES[i - 1];
  const card = (!prev || prev.act !== s.act) && window.MOCK_ACTS[s.act]?.card ? CARD : 0;
  const n = s.say.split(/\s+/).length, fit = Math.max(0, s.duration - card - 3) * 2.2;
  if (n > fit * 1.15) console.log(`  ${s.id}: ${n} words in ${s.duration - card} s (about ${Math.round(fit)} fit at 2.2 a second)`);
});
