// Launches headless Edge as the renderers do, screenshots a WebGL2 triangle and reports the GPU strings.
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
const require = createRequire("C:/Users/tyler/ai-console/kalix-console/apps/stories/package.json");
const { chromium } = require("playwright");
const DIR = dirname(fileURLToPath(import.meta.url));
let browser;
try { browser = await chromium.launch(); } catch { browser = await chromium.launch({ channel: "msedge" }); }
const page = await browser.newPage({ viewport: { width: 640, height: 360 } });
await page.goto(pathToFileURL(join(DIR, "capture-check.html")).href);
console.log(JSON.stringify(await page.evaluate(() => window.ready)), "browser", browser.version());
const buf = await page.screenshot({ type: "png" });
await (await import("node:fs")).promises.writeFile(join(DIR, "out", "capture-check.png"), buf);
await browser.close();
