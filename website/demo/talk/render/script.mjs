// Writes demo/talk/script.md from the slides: the words Tyler says, per slide and beat, with the planned
// time for each (words at 140 a minute, never less than the beat's animation). The slides are the one
// source of truth; run this after any change to a beat's words.
//   node demo/talk/render/script.mjs
//   node demo/talk/render/script.mjs --deck=demo/talk-v2    another deck built on this engine
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const require = createRequire("C:/Users/tyler/ai-console/kalix-console/apps/stories/package.json");
const { chromium } = require("playwright");
const deckArg = process.argv.find((a) => a.startsWith("--deck="));
const TALK = deckArg ? resolve(deckArg.split("=")[1]) : join(dirname(fileURLToPath(import.meta.url)), "..");

let browser;
try { browser = await chromium.launch(); } catch { browser = await chromium.launch({ channel: "msedge" }); }
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto(pathToFileURL(join(TALK, "index.html")).href + "?capture=1");
await page.waitForFunction(() => window.deck && window.deck.outline, null, { timeout: 60000 });
const { outline, acts } = await page.evaluate(() => ({ outline: window.deck.outline(), acts: window.TALK_ACTS }));
await browser.close();

const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, "0")}`;
const total = outline.reduce((a, s) => a + s.beats.reduce((x, b) => x + b.plan, 0), 0);
const words = outline.reduce((a, s) => a + s.beats.reduce((x, b) => x + b.words, 0), 0);
const actTotals = {};
outline.forEach((s) => { actTotals[s.act] = (actTotals[s.act] || 0) + s.beats.reduce((x, b) => x + b.plan, 0); });

let md = `# Governing AI at the speed it changes: the script\n\n`;
md += `Generated from the slides by \`render/script.mjs\`; edit the words in \`slides/<id>.js\`, not here.\n`;
md += `Each beat is one click. Planned time is the words at 140 a minute, or the beat's animation if longer.\n\n`;
md += `**${words.toLocaleString("en-US")} words · planned ${fmt(total)}**\n\n`;
md += `| Act | Planned |\n|---|---|\n` + Object.entries(actTotals).map(([a, s]) => `| ${(acts[a] && acts[a].name) || a} | ${fmt(s)} |`).join("\n") + "\n";
let act = null;
for (const s of outline) {
  if (s.act !== act) { act = s.act; md += `\n## ${(acts[act] && acts[act].name) || act}\n`; }
  const st = s.beats.reduce((x, b) => x + b.plan, 0);
  md += `\n### ${s.index + 1}. ${s.title} (${fmt(st)})\n\n`;
  s.beats.forEach((b, k) => { md += `**Click ${k + 1}** · ${fmt(b.plan)}\n\n${b.say}\n\n`; });
}
writeFileSync(join(TALK, "script.md"), md);
console.log(`script.md: ${words} words, planned ${fmt(total)}`);
Object.entries(actTotals).forEach(([a, s]) => console.log(`  ${a}: ${fmt(s)}`));
