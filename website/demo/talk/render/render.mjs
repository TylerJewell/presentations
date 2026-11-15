// Screenshots every beat hold of the deck into demo/talk/review/, writes a contact sheet, and exports the
// PDF backup to demo/talk/out/akka-ai-governance.pdf.
//   node website/demo/talk/render/render.mjs                 every hold, contact sheet, PDF
//   node website/demo/talk/render/render.mjs --only=rules,capability   just those slides (no PDF)
//   node website/demo/talk/render/render.mjs --mid            also a frame half way through each beat's animation
//   node website/demo/talk/render/render.mjs --trans          also frames inside each slide-to-slide transition
//   node website/demo/talk/render/render.mjs --no-pdf | --pdf-only
import { createRequire } from "node:module";
import { mkdirSync, writeFileSync, readdirSync, unlinkSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const require = createRequire("C:/Users/tyler/ai-console/kalix-console/apps/stories/package.json");
const { chromium } = require("playwright");

const arg = (k) => process.argv.find((a) => a === `--${k}` || a.startsWith(`--${k}=`));
/* --deck=<folder> renders another deck built on this engine (its index.html, review/ and out/);
   --pdf=<name> names its PDF. */
const TALK = arg("deck") ? resolve(arg("deck").split("=")[1]) : join(dirname(fileURLToPath(import.meta.url)), "..");
const PDF_NAME = arg("pdf") ? arg("pdf").split("=")[1] : "akka-ai-governance.pdf";
const REVIEW = join(TALK, "review"), OUT = join(TALK, "out");
mkdirSync(REVIEW, { recursive: true });
mkdirSync(OUT, { recursive: true });
const only = arg("only") ? arg("only").split("=")[1].split(",") : null;
const MID = !!arg("mid"), TRANS = !!arg("trans");
const PDF = !arg("no-pdf") && !only, PDF_ONLY = !!arg("pdf-only");

let browser;
try { browser = await chromium.launch(); } catch { browser = await chromium.launch({ channel: "msedge" }); }
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
const errors = [];
page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errors.push(m.text()); });
page.on("pageerror", (e) => errors.push(String(e)));

const url = pathToFileURL(join(TALK, "index.html")).href;
const shot = async (name) => page.screenshot({ path: join(REVIEW, name), clip: { x: 0, y: 0, width: 1920, height: 1080 } });

if (!PDF_ONLY) {
  await page.goto(url + "?capture=1");
  await page.waitForFunction(() => window.deck && window.deck.outline, null, { timeout: 60000 });
  const fontsOk = await page.evaluate(async () => { await document.fonts.load("700 80px 'Instrument Sans'"); return document.fonts.check("700 80px 'Instrument Sans'"); });
  if (!fontsOk) console.error("Instrument Sans did not load");
  const outline = await page.evaluate(() => window.deck.outline());
  const pick = outline.filter((s) => !only || only.includes(s.id));
  for (const s of pick) {
    for (const f of readdirSync(REVIEW)) if (f.startsWith(`${String(s.index + 1).padStart(2, "0")}-`)) unlinkSync(join(REVIEW, f));
  }
  const cells = [];
  for (const s of pick) {
    const pre = `${String(s.index + 1).padStart(2, "0")}-${s.id}`;
    for (let b = 0; b < s.beats.length; b++) {
      if (MID) {
        await page.evaluate(([i, k]) => window.deck.peek(i, k, 0.5), [s.index, b]);
        await page.waitForTimeout(30);
        await shot(`${pre}-b${b + 1}-mid.png`);
      }
      await page.evaluate(([i, k]) => window.deck.snap(i, k), [s.index, b]);
      await page.waitForTimeout(40);
      await page.evaluate(() => window.deck.frame());
      const name = `${pre}-b${b + 1}.png`;
      await shot(name);
      cells.push({ name, s, b });
    }
    if (TRANS && s.index > 0) {
      await page.evaluate((i) => { window.deck.snap(i - 1, window.deck.outline()[i - 1].beats.length - 1); window.deck.next(); }, s.index);
      for (const dt of [0.2, 0.25, 0.3, 0.5]) { await page.evaluate((d) => window.deck.tick(d), dt); await shot(`${pre}-t${Math.round(dt * 100)}.png`); }
    }
  }
  console.log(`${cells.length} holds captured`);

  if (!only) {
    /* the contact sheet: every hold, small, in order, with its slide and beat */
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
      body { margin: 0; background: #111; color: #ddd; font: 14px/1.3 sans-serif; padding: 16px; }
      .g { display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px; }
      figure { margin: 0; } img { width: 100%; display: block; border: 1px solid #333; } figcaption { padding: 3px 0; }
    </style></head><body><div class="g">${cells.map((c) => `<figure><img src="${c.name}"><figcaption>${c.s.index + 1} ${c.s.id} · ${c.b + 1}/${c.s.beats.length}</figcaption></figure>`).join("")}</div></body></html>`;
    writeFileSync(join(REVIEW, "contact.html"), html);
    const cp = await browser.newPage({ viewport: { width: 1800, height: 1000 } });
    await cp.goto(pathToFileURL(join(REVIEW, "contact.html")).href);
    await cp.waitForTimeout(500);
    await cp.screenshot({ path: join(REVIEW, "contact.png"), fullPage: true });
    await cp.close();
    console.log("contact sheet: review/contact.png");
  }
}

if (PDF || PDF_ONLY) {
  const pp = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  pp.on("pageerror", (e) => errors.push(String(e)));
  await pp.goto(url + "?print=1");
  await pp.waitForFunction(() => window.deck && window.deck.printed, null, { timeout: 180000 });
  await pp.pdf({ path: join(OUT, PDF_NAME), width: "1920px", height: "1080px", printBackground: true, preferCSSPageSize: true });
  console.log(`PDF: out/${PDF_NAME}`);
}

await browser.close();
const uniq = [...new Set(errors)];
if (uniq.length) console.log("Console errors and warnings:\n" + uniq.slice(0, 40).join("\n"));
