// Writes a film's narration.json from its scenes: one entry per scene, in order, with its caption verbatim.
//   node demo/mock/render/narration.mjs [--film=<folder>]   (default: the main film, demo/mock)
// Run it whenever a caption changes, then regenerate the voice (see "Voice" in demo/mock/README.md).
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const require = createRequire("C:/Users/tyler/ai-console/kalix-console/apps/stories/package.json");
const { chromium } = require("playwright");

const MOCK = resolve(process.argv.find((a) => a.startsWith("--film="))?.slice(7) ?? join(dirname(fileURLToPath(import.meta.url)), ".."));
let browser;
try { browser = await chromium.launch(); } catch { browser = await chromium.launch({ channel: "msedge" }); }
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto(pathToFileURL(join(MOCK, "index.html")).href + "?capture=1");
await page.waitForFunction(() => window.mock && window.mock.total > 0, null, { timeout: 60000 });
const lines = await page.evaluate(() => {
  const out = {};
  for (const s of window.mock.scenes) { window.mock.seek(s.start + 0.01); out[s.id] = Mock.stageInfo.scene.caption; }
  return out;
});
await browser.close();
writeFileSync(join(MOCK, "narration.json"), JSON.stringify(lines, null, 2) + "\n");
console.log(Object.entries(lines).map(([id, t]) => `${id}: ${t}`).join("\n"));
