// Extracts full-resolution stills from each variant's MP4 at t = 1, 3.5, 6 and 8 s into out/stills/, then
// lays them out as out/compare.png (rows are times, columns are variants), rendered in headless Chromium.
//   node stills.mjs
import { createRequire } from "node:module";
import { spawnSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const require = createRequire("C:/Users/tyler/ai-console/kalix-console/apps/stories/package.json");
const { chromium } = require("playwright");
const DIR = dirname(fileURLToPath(import.meta.url));
const OUT = join(DIR, "out");
const TIMES = [1.0, 3.5, 6.0, 8.0];
const VARIANTS = ["A", "B", "C"];

for (const v of VARIANTS) for (const t of TIMES) {
  // The frame whose interval contains t; frame n covers n/30 .. (n+1)/30 s.
  const n = Math.round(t * 30);
  const r = spawnSync("ffmpeg", ["-y", "-loglevel", "error", "-i", join(OUT, `${v}.mp4`), "-vf", `select=eq(n\\,${n})`, "-frames:v", "1",
    join(OUT, "stills", `${v}_${t.toFixed(1)}s.png`)], { stdio: "inherit" });
  if (r.status !== 0) process.exit(1);
}

const CELL_W = 640, CELL_H = 360;
const cells = TIMES.map((t) => `<div class="row">${VARIANTS.map((v) =>
  `<figure><img src="stills/${v}_${t.toFixed(1)}s.png"><figcaption>${v} &nbsp; t = ${t.toFixed(1)} s</figcaption></figure>`).join("")}</div>`).join("");
const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
  body { margin: 0; background: #000; font: 500 16px 'Instrument Sans', Arial, sans-serif; color: #fff; }
  .row { display: flex; gap: 8px; margin-bottom: 8px; }
  figure { margin: 0; position: relative; width: ${CELL_W}px; height: ${CELL_H}px; outline: 1px solid #333; }
  img { width: ${CELL_W}px; height: ${CELL_H}px; display: block; }
  figcaption { position: absolute; left: 10px; top: 8px; padding: 2px 8px; background: #000; color: #FFCE4A; }
</style></head><body>${cells}</body></html>`;
writeFileSync(join(OUT, "compare.html"), html);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 3 * CELL_W + 16, height: 4 * CELL_H + 24 } });
await page.goto(pathToFileURL(join(OUT, "compare.html")).href);
await page.waitForFunction(() => [...document.images].every((i) => i.complete));
await page.screenshot({ path: join(OUT, "compare.png") });
await browser.close();
