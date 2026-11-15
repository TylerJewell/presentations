// Review stills at full 1920x1080. For each scene: a frame at the start of each caption line (a beat) and at
// the middle of each beat, plus the scene's final hold. Writes review/<scene>_<n>.png and prints any console
// errors the page logged.
//   node website/demo/proposal-panel/render/shots.mjs [--only=1.2,1.3] [--t=125.5,130] [--out=<folder>]
// --only limits it to those scenes; --t adds frames at absolute film times (written as t<secs>.png).
import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const require = createRequire("C:/Users/tyler/ai-console/kalix-console/apps/stories/package.json");
const { chromium } = require("playwright");

const FILM = dirname(dirname(fileURLToPath(import.meta.url)));
const arg = (k, d) => process.argv.find((a) => a.startsWith(`--${k}=`))?.slice(k.length + 3) ?? d;
const ONLY = arg("only", "") ? arg("only").split(",") : null;
const TIMES = arg("t", "") ? arg("t").split(",").map(Number) : [];
const OUT = resolve(arg("out", join(FILM, "review")));
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ channel: "msedge" });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
const errors = [];
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
page.on("pageerror", (e) => errors.push(String(e)));
await page.goto(pathToFileURL(join(FILM, "index.html")).href + "?capture=1");
await page.waitForFunction(() => window.mock && window.mock.scenes && window.mock.scenes.length);
await page.evaluate(() => document.fonts.ready);

/* the beats: where each caption line starts, on the caption's own clock */
const scenes = await page.evaluate(() => window.mock.scenes.map((s) => {
  const def = window.FILM_SCENES.find((x) => x.id === s.id);
  const lines = Mock.splitCaption(def.say);
  const words = lines.map((c) => c.split(/\s+/).length), total = words.reduce((a, b) => a + b, 0);
  const t0 = s.card + 0.35, t1 = s.duration - 0.6;
  let acc = 0;
  const beats = lines.map((_, i) => { const a = t0 + ((t1 - t0) * acc) / total; acc += words[i]; return a; });
  return { id: s.id, start: s.start, duration: s.duration, card: s.card || 0, beats };
}));

const shots = [];
for (const s of scenes) {
  if (ONLY && !ONLY.includes(s.id)) continue;
  const pts = [];
  s.beats.forEach((b, i) => {
    const next = i + 1 < s.beats.length ? s.beats[i + 1] : s.duration - 0.6;
    pts.push(b + 0.9, (b + next) / 2);
  });
  pts.push(s.duration - 0.7);
  [...new Set(pts.map((p) => Math.round(p * 10) / 10))].sort((a, b) => a - b).forEach((p, i) => shots.push([`${s.id}_${String(i + 1).padStart(2, "0")}`, s.start + p]));
}
TIMES.forEach((t) => shots.push([`t${t.toFixed(1).replace(".", "-")}`, t]));

for (const [name, t] of shots) {
  await page.evaluate((t) => window.mock.seek(t), t);
  await page.waitForTimeout(60);
  await page.screenshot({ path: join(OUT, `${name}.png`) });
  console.log(`${name}.png  t=${t.toFixed(1)}`);
}
const total = await page.evaluate(() => window.mock.total);
console.log(`running time ${Math.floor(total / 60)}:${String(Math.round(total % 60)).padStart(2, "0")}`);
if (errors.length) console.log("console errors:\n" + [...new Set(errors)].join("\n"));
await browser.close();
