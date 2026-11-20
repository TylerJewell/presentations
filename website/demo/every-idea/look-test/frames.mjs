// Renders style frames of one variant straight from the scene, without encoding a film.
//   node frames.mjs D 1.0 3.9 6.25 8.6     ->  out/style/D_<t>.png
import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const require = createRequire("C:/Users/tyler/ai-console/kalix-console/apps/stories/package.json");
const { chromium } = require("playwright");
const DIR = dirname(fileURLToPath(import.meta.url));
const OUT = join(DIR, "out", "style");
mkdirSync(OUT, { recursive: true });
const [variant, ...times] = process.argv.slice(2);

let browser;
try { browser = await chromium.launch(); } catch { browser = await chromium.launch({ channel: "msedge" }); }
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
page.on("pageerror", (e) => console.error(String(e)));
await page.goto(pathToFileURL(join(DIR, "scene.html")).href + `?v=${variant}`);
await page.waitForFunction(() => window.ready, null, { timeout: 60000 });
await page.evaluate(() => window.ready);
for (const t of times) {
  const started = Date.now();
  await page.evaluate((s) => window.at(s), Number(t));
  await page.screenshot({ type: "png", path: join(OUT, `${variant}_${t}.png`), clip: { x: 0, y: 0, width: 1920, height: 1080 } });
  console.log(`${variant} t=${t}: ${Date.now() - started} ms`);
}
await browser.close();
