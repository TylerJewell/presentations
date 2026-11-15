// Records a ~45 s sample: two title slides, then a scripted walk through the live console with
// captions, a spotlight on what is being explained, and a visible cursor.
// Run: node website/demo/sample/record.mjs   (needs the console on BASE and Playwright from kalix-console)
import { createRequire } from "node:module";
import { existsSync, mkdirSync, readFileSync, readdirSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const require = createRequire("C:/Users/tyler/ai-console/kalix-console/apps/stories/package.json");
const { chromium } = require("playwright");

const BASE = process.env.BASE ?? "http://localhost:3000";
const OUT = "C:/Users/tyler/competition/website/demo/sample/out";
const DURATIONS = "C:/Users/tyler/competition/website/demo/sample/durations.json";
const DUR = existsSync(DURATIONS) ? JSON.parse(readFileSync(DURATIONS, "utf8")) : {};
const W = 1600, H = 900; // recorded at its own size, so the console fills the frame and reads larger full screen

// ---------- the overlay: caption, spotlight and cursor, installed on every page ----------
const OVERLAY = () => {
  const css = `
  #demo-cursor{position:fixed;left:960px;top:540px;width:26px;height:26px;z-index:2147483647;pointer-events:none;
    transition:left .7s cubic-bezier(.4,0,.2,1),top .7s cubic-bezier(.4,0,.2,1);filter:drop-shadow(0 2px 4px rgba(0,0,0,.6))}
  #demo-ripple{position:fixed;width:44px;height:44px;margin:-22px 0 0 -22px;border-radius:50%;border:2px solid rgb(40,215,229);
    z-index:2147483646;pointer-events:none;opacity:0}
  #demo-ripple.go{animation:demoRipple .55s ease-out}
  @keyframes demoRipple{0%{opacity:.9;transform:scale(.3)}100%{opacity:0;transform:scale(1.4)}}
  #demo-spot{position:fixed;z-index:2147483640;pointer-events:none;border-radius:8px;opacity:0;
    box-shadow:0 0 0 2px rgb(40,215,229),0 0 0 9999px rgba(4,6,10,.55);
    transition:left .5s ease,top .5s ease,width .5s ease,height .5s ease,opacity .35s ease}
  #demo-cap{position:fixed;left:64px;bottom:72px;max-width:820px;z-index:2147483645;pointer-events:none;
    background:rgba(12,13,16,.92);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.08);border-radius:12px;
    padding:18px 24px 20px;font-family:"Instrument Sans Variable","Instrument Sans",system-ui,sans-serif;
    opacity:0;transform:translateY(12px);transition:opacity .4s ease,transform .4s ease;box-shadow:0 12px 40px rgba(0,0,0,.45)}
  #demo-cap.on{opacity:1;transform:none}
  #demo-cap .eb{font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:rgb(40,215,229);font-weight:600;margin-bottom:6px}
  #demo-cap .tx{font-size:24px;line-height:1.35;color:#f4f3ef;font-weight:500}
  #demo-step{position:fixed;right:40px;top:76px;z-index:2147483645;pointer-events:none;font:600 13px "Instrument Sans Variable",system-ui;
    color:rgba(255,255,255,.75);background:rgba(12,13,16,.8);border-radius:20px;padding:6px 12px;opacity:0;transition:opacity .4s}`;
  const install = () => {
    if (document.getElementById("demo-cursor")) return;
    const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
    const c = document.createElement("div"); c.id = "demo-cursor";
    c.innerHTML = '<svg viewBox="0 0 24 24" width="26" height="26"><path d="M4 2l15 9-6.5 1.5L9.5 19z" fill="#fff" stroke="#111" stroke-width="1.2" stroke-linejoin="round"/></svg>';
    const r = document.createElement("div"); r.id = "demo-ripple";
    const s = document.createElement("div"); s.id = "demo-spot";
    const cap = document.createElement("div"); cap.id = "demo-cap"; cap.innerHTML = '<div class="eb"></div><div class="tx"></div>';
    const step = document.createElement("div"); step.id = "demo-step";
    document.body.append(s, cap, step, r, c);
    const last = sessionStorage.getItem("demo-cursor");
    if (last) { const [x, y] = last.split(","); c.style.transition = "none"; c.style.left = x + "px"; c.style.top = y + "px"; c.offsetWidth; c.style.transition = ""; }
  };
  // A full-screen card that covers the page while it loads: set through window.name, which survives a
  // navigation, so it is up before the console paints.
  // Runs before the root element exists on a navigation, so the early work waits for it.
  const whenRoot = (fn) => {
    if (document.documentElement) return fn();
    new MutationObserver((_, o) => { if (document.documentElement) { o.disconnect(); fn(); } }).observe(document, { childList: true });
  };
  const curtain = () => {
    let html; try { html = JSON.parse(window.name || "{}").curtain; } catch { html = undefined; }
    if (!html || document.getElementById("demo-curtain")) return;
    const f = document.createElement("iframe"); f.id = "demo-curtain"; f.srcdoc = html;
    Object.assign(f.style, { position: "fixed", inset: "0", width: "100vw", height: "100vh", border: "0", zIndex: "2147483647", background: "#07080a", transition: "opacity .6s ease" });
    (document.body || document.documentElement).appendChild(f);
  };
  whenRoot(() => { document.documentElement.style.background = "#07080a"; curtain(); });
  document.addEventListener("DOMContentLoaded", curtain);
  window.__demo = {
    curtain(html) { window.name = JSON.stringify({ curtain: html }); document.getElementById("demo-curtain")?.remove(); curtain(); },
    lift() { window.name = ""; const f = document.getElementById("demo-curtain"); if (f) { f.style.opacity = "0"; setTimeout(() => f.remove(), 700); } },
    install,
    caption(eyebrow, text) { install(); const cap = document.getElementById("demo-cap");
      cap.classList.remove("on"); setTimeout(() => { cap.querySelector(".eb").textContent = eyebrow; cap.querySelector(".tx").textContent = text; cap.classList.add("on"); }, 180); },
    hideCaption() { document.getElementById("demo-cap")?.classList.remove("on"); },
    step(t) { install(); const s = document.getElementById("demo-step"); s.textContent = t; s.style.opacity = t ? 1 : 0; },
    spot(sel, pad = 8) { install(); const el = typeof sel === "string" ? document.querySelector(sel) : sel; const s = document.getElementById("demo-spot");
      if (!el) { s.style.opacity = 0; return; } const b = el.getBoundingClientRect();
      // The spotlight stops above the caption, so the caption sits on the dimmed page, never on what is shown.
      const cap = document.getElementById("demo-cap");
      const floor = cap && cap.classList.contains("on") ? innerHeight - cap.offsetHeight - 72 - 16 : innerHeight - 8;
      const top = Math.max(b.top - pad, 8), bottom = Math.min(b.bottom + pad, floor);
      Object.assign(s.style, { left: b.left - pad + "px", top: top + "px", width: b.width + pad * 2 + "px", height: Math.max(0, bottom - top) + "px", opacity: 1 }); },
    // Scrolls every scroller around an element so the element sits at the top of the screen, just under a
    // table's sticky header row when it is inside one.
    reveal(el, top = 64) {
      el.scrollIntoView({ block: "start", behavior: "smooth" });
      setTimeout(() => {
        const head = el.closest("table")?.querySelector("thead");
        const by = el.getBoundingClientRect().top - Math.max(top, head ? head.getBoundingClientRect().bottom : 0);
        let sc = el.parentElement;
        while (sc && !(/(auto|scroll)/.test(getComputedStyle(sc).overflowY) && sc.scrollHeight > sc.clientHeight)) sc = sc.parentElement;
        (sc ?? document.scrollingElement).scrollBy({ top: by, behavior: "smooth" });
      }, 650);
    },
    unspot() { const s = document.getElementById("demo-spot"); if (s) s.style.opacity = 0; },
    move(x, y) { install(); const c = document.getElementById("demo-cursor"); c.style.left = x + "px"; c.style.top = y + "px"; sessionStorage.setItem("demo-cursor", x + "," + y); },
    ripple(x, y) { const r = document.getElementById("demo-ripple"); r.style.left = x + "px"; r.style.top = y + "px"; r.classList.remove("go"); r.offsetWidth; r.classList.add("go"); },
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", install); else install();
};

// ---------- slides ----------
const slide = (kicker, title, sub, n) => `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>html,body{margin:0;height:100%;background:#07080a;color:#f4f3ef;font-family:"Instrument Sans",system-ui,sans-serif;overflow:hidden}
.wrap{position:absolute;inset:0;padding:120px 160px;display:flex;flex-direction:column;justify-content:center;
background:radial-gradient(1200px 700px at 85% 15%,rgba(40,215,229,.16),transparent 60%),radial-gradient(900px 600px at 10% 95%,rgba(245,197,24,.10),transparent 60%)}
.k{font-size:22px;letter-spacing:.14em;text-transform:uppercase;color:rgb(40,215,229);font-weight:600;margin-bottom:28px}
h1{font-size:84px;line-height:1.05;margin:0 0 28px;font-weight:700;max-width:1400px}
p{font-size:32px;line-height:1.4;color:rgba(244,243,239,.75);margin:0;max-width:1200px}
.logo{position:absolute;left:160px;bottom:90px;font-weight:700;font-size:34px;letter-spacing:.18em}
.n{position:absolute;right:160px;bottom:96px;font-size:20px;color:rgba(244,243,239,.45)}
.fade{animation:in .8s ease both}.fade2{animation:in .8s .25s ease both}.fade3{animation:in .8s .5s ease both}
@keyframes in{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}</style></head>
<body><div class="wrap"><div class="k fade">${kicker}</div><h1 class="fade2">${title}</h1><p class="fade3">${sub}</p></div>
<div class="logo">AKKA</div><div class="n">${n}</div></body></html>`;

const SLIDES = [
  slide("Sample slide · Company", "Agentic systems that run like the rest of your business", "Placeholder slide. Your company overview goes here: who we are, who we serve, and why it matters.", "01"),
  slide("Sample slide · Product", "Akka Optimize: see, govern and reduce the cost of every AI agent", "Placeholder slide. One gateway for every model call, with cost, quality and controls in a single console.", "02"),
];

// ---------- helpers ----------
const chapter = (kicker, title) => slide(kicker, title, "", "");

const sleep = (p, ms) => p.waitForTimeout(ms);
async function cursorTo(p, locator) {
  const b = await locator.boundingBox();
  const x = Math.round(b.x + Math.min(b.width / 2, 60)), y = Math.round(b.y + b.height / 2);
  await p.evaluate(([x, y]) => window.__demo.move(x, y), [x, y]);
  await sleep(p, 750);
  return { x, y };
}
async function click(p, locator) {
  const { x, y } = await cursorTo(p, locator);
  await p.evaluate(([x, y]) => window.__demo.ripple(x, y), [x, y]);
  await locator.click();
}
const caption = (p, eb, tx) => p.evaluate(([a, b]) => window.__demo.caption(a, b), [eb, tx]);
const spot = (p, sel, pad) => p.evaluate(([s, d]) => window.__demo.spot(s, d), [sel, pad ?? 8]);
// The stage is the screen between the console's top bar and the caption. Whatever is highlighted is first
// scrolled onto it, so the caption keeps one place and never covers the subject.
const STAGE_TOP = 64;
const spotEl = async (p, locator, pad = 8) => {
  if (!(await locator.count())) { console.warn("no element to spotlight:", String(locator)); return; }
  const h = await locator.elementHandle({ timeout: 5000 });
  const off = await p.evaluate(([el, top]) => {
    const b = el.getBoundingClientRect();
    const cap = document.getElementById("demo-cap");
    const floor = innerHeight - (cap ? cap.offsetHeight : 120) - 72 - 16;
    return b.top < top || b.bottom > floor;
  }, [h, STAGE_TOP]);
  if (off) await reveal(p, locator, STAGE_TOP + 16);
  await p.evaluate(([el, d]) => window.__demo.spot(el, d), [h, pad]);
};
const reveal = async (p, locator, top) => { const h = await locator.elementHandle(); await p.evaluate(([el, t]) => window.__demo.reveal(el, t), [h, top ?? 64]); await sleep(p, 1500); };
const unspot = (p) => p.evaluate(() => window.__demo.unspot());
const step = (p, t) => p.evaluate((t) => window.__demo.step(t), t);

// ---------- warm the pages so the recording never waits on a cold read ----------
const browser = await chromium.launch();
{
  const warm = await browser.newPage({ viewport: { width: W, height: H }, colorScheme: "dark" });
  for (const u of ["/cost?view=spend", "/activity?view=traces"]) {
    await warm.goto(BASE + u); await warm.waitForSelector("[data-grid-table] [data-grid-row]", { timeout: 120000 });
  }
  await warm.close();
}

// Only the old recording goes: a finished cut may be open in a player.
mkdirSync(OUT, { recursive: true });
for (const n of readdirSync(OUT)) if (n.endsWith(".webm")) rmSync(join(OUT, n), { force: true });
const ctx = await browser.newContext({ viewport: { width: W, height: H }, colorScheme: "dark", recordVideo: { dir: OUT, size: { width: W, height: H } } });
await ctx.addInitScript(OVERLAY);
const p = await ctx.newPage();
// Narration: each scene starts its clip with say(), and finish() holds the scene until the clip ends.
// The marks are where each clip starts in the video; mux.mjs lays the audio there.
const t0 = Date.now(); const marks = {}; let endsAt = 0;
const say = (id) => { marks[id] = Date.now() - t0; endsAt = Date.now() + (DUR[id]?.seconds ?? 0) * 1000 + 250; };
const finish = (pg) => sleep(pg, Math.max(0, endsAt - Date.now()));

// ---------- slides: the second covers the console while it loads ----------
await p.setContent(SLIDES[0], { waitUntil: "networkidle" }); say("slide-company");
await sleep(p, 4500); await finish(p);
await p.evaluate((html) => { window.name = JSON.stringify({ curtain: html }); }, SLIDES[1]);
const shownAt = Date.now(); say("slide-product");
// ---------- scene 1: Cost › Spend ----------
await p.goto(BASE + "/cost?view=spend");
await p.waitForSelector("[data-grid-table] [data-grid-row]", { timeout: 90000 });
// Every card has its figure before the curtain lifts.
await p.waitForFunction(() => !document.querySelector("main [class*='skeleton'], main [data-testid*='skeleton']"), null, { timeout: 60000 }).catch(() => {});
await sleep(p, Math.max(0, 4500 - (Date.now() - shownAt))); await finish(p);
await p.evaluate(() => { window.__demo.install(); window.__demo.lift(); });
await sleep(p, 700);
await step(p, "1 / 3  Cost");
say("spend-cards");
await caption(p, "Cost › Spend", "What the AI system cost this week, against last week, from every call through the gateway.");
// The cards row: the nearest ancestor of the first card's label that spans most of the page.
await p.evaluate(() => {
  const label = [...document.querySelectorAll("main *")].find((e) => e.childElementCount === 0 && /Gateway spend/.test(e.textContent ?? ""));
  let el = label; while (el && el.getBoundingClientRect().width < 1000) el = el.parentElement;
  window.__demo.spot(el, 6);
});
await sleep(p, 1500); await finish(p);

const table = p.locator("[data-grid-table]").first();
await table.scrollIntoViewIfNeeded();
await spotEl(p, table, 6);
say("spend-table");
await caption(p, "Where the money went", "Every use case's cost, period against period. Sort any column, filter, or download it as a spreadsheet.");
await sleep(p, 1200);
const pctTh = p.locator("th").filter({ hasText: "% Change" }).first();
const pctSort = pctTh.locator("[data-testid='grid-sort']").first();
await click(p, (await pctSort.count()) ? pctSort : pctTh);
await sleep(p, 1200); await finish(p);

// ---------- scene 2: open a row ----------
const row = p.locator("[data-grid-row]").first();
say("spend-row");
await caption(p, "Open a row", "A use case opens into its cost by model, so you see which models drove the change.");
await click(p, row);
await sleep(p, 600);
await reveal(p, row, 120);
await spotEl(p, p.locator("[data-grid-details]").first(), 4);
await sleep(p, 1200); await finish(p);

// ---------- scene 3: footnotes ----------
await unspot(p);
const notes = p.locator("[data-testid='grid-notes']").first();
await notes.scrollIntoViewIfNeeded();
await spotEl(p, notes, 6);
say("spend-notes");
await caption(p, "Footnotes", "Figures are qualified the way a financial statement is: what is preliminary, and what is excluded.");
await sleep(p, 1400);
const mark = notes.locator("[data-testid='grid-note']").nth(2);
if (await mark.count()) { await click(p, mark); await sleep(p, 1500); await finish(p); await p.keyboard.press("Escape"); } else await finish(p);
await unspot(p);

// ---------- scene 4: Activity › Traces ----------
await p.evaluate(() => window.__demo.hideCaption());
await p.evaluate((html) => window.__demo.curtain(html), chapter("Chapter 2 · Activity", "Every agent run, end to end"));
const chapterAt = Date.now();
// Inside the app, so the page never reloads.
await p.evaluate(() => { history.pushState({}, "", "/activity?view=traces"); dispatchEvent(new PopStateEvent("popstate")); });
await p.waitForSelector("[data-grid-table] [data-grid-row]", { timeout: 90000 });
await sleep(p, Math.max(0, 2500 - (Date.now() - chapterAt)));
await p.evaluate(() => window.__demo.lift());
await sleep(p, 700);
await step(p, "2 / 3  Activity");
say("traces");
await caption(p, "Activity › Traces", "Every agent run, end to end. Sort by cost to find the expensive ones, and open one to see its flow.");
await sleep(p, 1000);
const costTh = p.locator("th").filter({ hasText: /^Cost/ }).first();
const costSort = costTh.locator("[data-testid='grid-sort']").first();
await click(p, (await costSort.count()) ? costSort : costTh);
// The list re-sorts on the server: open a run only once the new order is on screen.
await p.waitForFunction(() => /sorted by cost/i.test(document.querySelector("[data-testid='grid-status']")?.textContent ?? ""), null, { timeout: 20000 }).catch(() => {});
await sleep(p, 1200);
const run = p.locator("[data-grid-row]").first();
await click(p, run);
await p.waitForSelector("[data-testid='flow-expanded']", { timeout: 20000 });
await sleep(p, 600);
// The run's flow opens under its row: bring the open row to the top so the flow fills the screen.
await reveal(p, p.locator("[data-grid-row][aria-expanded='true']").first(), 70);
await spotEl(p, p.locator("[data-testid='flow-expanded']").first(), 4);
await finish(p); say("trace-open");
await caption(p, "A single run", "Each step the agent took, the model it called, and what that call cost.");
await sleep(p, 1500); await finish(p);
await unspot(p);

// ---------- end card ----------
await step(p, "");
await p.evaluate(() => window.__demo.hideCaption());
await p.evaluate((html) => window.__demo.curtain(html), slide("Sample end card", "Akka Optimize", "akka.io", "")); say("end");
await sleep(p, 2000); await finish(p);

await ctx.close(); await browser.close();
const f = readdirSync(OUT).find((n) => n.endsWith(".webm"));
renameSync(join(OUT, f), join(OUT, "sample.webm"));
writeFileSync(join(OUT, "marks.json"), JSON.stringify(marks, null, 2));
console.log("wrote", join(OUT, "sample.webm"));
