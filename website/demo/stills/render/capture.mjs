// Captures the home-page stills: each <n>-<id>.html in demo/stills to out/<n>-<id>-2560.png and -1280.png, then
// webp beside them when ffmpeg has libwebp.
//   node website/demo/stills/render/capture.mjs [--only=5-controls-board,8-gateway]
import { createRequire } from "node:module";
import { mkdirSync, readdirSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { spawnSync } from "node:child_process";

const require = createRequire("C:/Users/tyler/ai-console/kalix-console/apps/stories/package.json");
const { chromium } = require("playwright");
const DIR = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(DIR, "out");
mkdirSync(OUT, { recursive: true });
const only = process.argv.find((a) => a.startsWith("--only="))?.slice(7).split(",");
const pages = readdirSync(DIR).filter((f) => /^\d-.+\.html$/.test(f)).map((f) => f.slice(0, -5)).filter((n) => !only || only.includes(n));

const browser = await chromium.launch({ channel: "msedge" });
for (const [scale, size] of [[1, 2560], [0.5, 1280]]) {
  const page = await browser.newPage({ viewport: { width: 2560, height: 1440 }, deviceScaleFactor: scale });
  page.on("pageerror", (e) => console.log("page error:", String(e)));
  for (const n of pages) {
    await page.goto(pathToFileURL(join(DIR, n + ".html")).href);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(250);
    const png = join(OUT, `${n}-${size}.png`);
    await page.locator("#root").screenshot({ path: png });
    const webp = spawnSync("ffmpeg", ["-y", "-loglevel", "error", "-i", png, "-c:v", "libwebp", "-quality", "90", png.replace(/\.png$/, ".webp")]);
    console.log(`${n}-${size}` + (webp.status === 0 ? " png+webp" : " png"));
  }
  await page.close();
}
await browser.close();
