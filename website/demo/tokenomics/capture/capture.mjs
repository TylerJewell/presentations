// Captures the console's Cost screens for "Tokenomics in Akka" as 1920x1080 PNGs (viewport 1600x900 at scale 1.2),
// and writes the figures on screen to captures/figures.json.
//   node demo/tokenomics/capture/capture.mjs                 every state
//   node demo/tokenomics/capture/capture.mjs --only=overview,frontier
//   BASE=http://127.0.0.1:9889 PERIOD=2026-11-02 node demo/tokenomics/capture/capture.mjs
// PERIOD is the first day of the seven-day period (local midnight); the default is seven full days ending
// yesterday. See README.md for the stack it needs.
//
// A state is captured only when it is loaded: its ready text is on the page, nothing is a skeleton, spinner or
// "Loading", and the page has held still for 0.7 s (the rule in demo/README.md).
import { createRequire } from "node:module";
import { mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { figuresFor } from "./figures.mjs";
import { serveFixtures } from "./fixtures.mjs";

const require = createRequire("C:/Users/tyler/ai-console/kalix-console/apps/stories/package.json");
const { chromium } = require("playwright");

const LIVE = process.argv.includes("--live");
const OUT = join(dirname(dirname(fileURLToPath(import.meta.url))), "captures", LIVE ? "live" : "");
const BASE = process.env.BASE ?? "http://127.0.0.1:9889";
const W = 1600, H = 900, SCALE = 1.2;
const ONLY = process.argv.find((a) => a.startsWith("--only="))?.slice(7).split(",");

/* The period: seven local days from midnight, as an ISO instant pair. The prior period is the seven days before. */
const dayStart = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const first = process.env.PERIOD
  ? (([y, m, d]) => new Date(y, m - 1, d))(process.env.PERIOD.split("-").map(Number))
  : new Date(dayStart(new Date()).getTime() - 7 * 864e5 + 3.6e6 * 0); // today minus 7 days
export const PERIOD = { from: first.toISOString(), to: new Date(first.getFullYear(), first.getMonth(), first.getDate() + 7).toISOString() };
const R = `from=${encodeURIComponent(PERIOD.from)}&to=${encodeURIComponent(PERIOD.to)}`;

/* The use case, change, budget and model the film follows. */
const USE_CASE = process.env.USE_CASE ?? (LIVE ? "sql-report" : "e17d05ac");
const CHANGE = process.env.CHANGE ?? (LIVE ? "2026-10-09-sql-report" : "2026-10-09-ticket-triage");
const BUDGET = process.env.BUDGET ?? "team-support";
const HOSTED = process.env.HOSTED ?? (LIVE ? "support-slm-v1" : "gpt-oss-20b");

const click = (name, opts = {}) => async (p) => { await p.getByRole(opts.role ?? "button", { name, exact: opts.exact ?? false }).first().click(); };
const text = (t) => async (p) => { await p.getByText(t, { exact: false }).first().click(); };

/* id, url, ready (text that must be on the page), then optional steps: `act` runs after load, `ready2` is the
   text it must produce, `scroll` brings a heading to the top of the page. `scene` names the film scene whose
   figures it feeds. */
const scroll = (h) => async (p) => { await scrollTo(p, h); };
const THEN = (...fs) => async (p, u) => { for (const f of fs) await f(p, u); };

export const STATES = [
  { id: "overview", scene: "1.1", url: `/cost/overview?${R}`, ready: "Potential savings" },
  { id: "spend-default", scene: "1.2", url: `/cost/spend?by=useCase&${R}`, ready: "Cost by use case" },
  { id: "spend-matrix", scene: "1.2", url: `/cost/spend?q=4&${R}`, ready: "Cost per request by model and team" },
  { id: "spend-compare", scene: "1.3", url: `/cost/spend?by=useCase&compare=prior&${R}`, ready: "compared with the prior period" },
  { id: "spend-bridge", scene: "1.3", crop: ["Change in cost", "Current period"], url: `/cost/spend?by=useCase&compare=prior&${R}`, ready: "Change in cost",
    steps: THEN(scroll("Change in cost"), async (p) => { await p.mouse.click(267, 389); await p.mouse.move(1500, 30); await p.waitForTimeout(700); }) },
  { id: "spend-compare-row", scene: "1.3", url: `/cost/spend?by=useCase&compare=prior&${R}`, ready: "compared with the prior period",
    steps: async (p) => {
      const grid = p.getByRole("grid").last();
      const row = (await grid.count()) ? grid.getByRole("row", { name: /sql-report/ }).first() : p.getByRole("row", { name: /sql-report/ }).last();
      await row.click().catch(() => {});
      await p.waitForTimeout(900);
      await row.evaluate((e) => e.scrollIntoView({ block: "start" }));
      await p.waitForTimeout(500);
    } },
  { id: "usecases", scene: "1.3", url: `/inference/use-cases?${R}`, ready: "Cost by use case", steps: scroll("Cost by use case") },
  { id: "usecase-page", scene: "1.3", url: `/inference/use-cases/c41e8a07?${R}`, ready: "What changed" },
  { id: "savings-overview", scene: "2.1", url: `/cost/savings?${R}`, ready: "Avoidable cost by kind", steps: scroll("Avoidable cost by kind") },
  { id: "savings-opportunity", scene: "2.1", url: `/cost/savings?${R}`, ready: "Opportunities",
    steps: THEN(scroll("Opportunities"), async (p) => { await p.getByText("Cache refund-agent's stable prompt prefix").first().click(); await p.waitForTimeout(1200); }) },
  { id: "savings-whatif-menu", scene: "2.2", url: `/cost/savings?${R}`, ready: "Cost if served on another model",
    steps: THEN(scroll("Cost if served on another model"), async (p) => { await p.getByTestId("savings-whatif-target").click(); await p.getByRole("menuitem").first().waitFor(); await p.waitForTimeout(400); }) },
  { id: "savings-whatif", scene: "2.2", url: `/cost/savings?${R}`, ready: "Cost if served on another model",
    steps: THEN(scroll("Cost if served on another model"), async (p, u) => {
      await p.getByTestId("savings-whatif-target").click();
      await p.getByRole("menuitem", { name: "frontier-mini" }).click();
      await u.loaded(p, "would have cost an estimated");
      await scrollTo(p, "Cost if served on another model");
    }) },
  { id: "prices-preview", scene: "2.2", url: `/cost/prices?${R}`, ready: "Versions",
    steps: async (p, u) => {
      await p.getByTestId("catalog-publish").click();
      await p.getByTestId("catalog-edit").click();
      const box = p.getByTestId("catalog-document");
      const doc = JSON.parse(await box.inputValue());
      for (const m of doc.models ?? []) if (m.servedName === "frontier-large") { m.output = 10.8; m.reasoning = 10.8; m.input = 2.2; }
      await box.fill(JSON.stringify(doc, null, 2));
      await u.loaded(p, "Increase/(decrease)");
      await p.getByTestId("action-dialog").evaluate((d) => { const b = d.querySelector("[data-testid=catalog-document]"); b?.scrollIntoView({ block: "end" }); });
      await p.waitForTimeout(500);
    } },
  { id: "frontier", scene: "2.3", url: `/inference/use-cases/${USE_CASE}?${R}`, ready: "Models for this use case", steps: scroll("Models for this use case") },
  { id: "frontier-bar", scene: "2.3", url: `/inference/use-cases/${USE_CASE}?${R}`, ready: "Models for this use case",
    steps: THEN(scroll("Models for this use case"), async (p) => { await p.getByTestId("frontier-edit-bar").click(); await p.getByText("Quality bar for").first().waitFor(); await p.waitForTimeout(600); }) },
  { id: "change-preview", scene: "3.1", url: `/cost/changes/${CHANGE}?${R}`, ready: "The trial" },
  { id: "change-staged", scene: "3.1", url: `/cost/changes/${CHANGE}?${R}`, ready: "Recommended rollout", steps: scroll("Recommended rollout") },
  { id: "savings-ledger", scene: "3.2", url: `/cost/savings?${R}`, ready: "Ledger", steps: scroll("Ledger") },
  { id: "budgets", scene: "4.1", url: `/cost/budgets?${R}`, ready: "Support team", limit: 90000 },
  { id: "budget-page", scene: "4.1", url: `/cost/budgets/${BUDGET}?${R}`, ready: "Thresholds", limit: 90000 },
  { id: "hosting", scene: "4.2", url: `/inference/models/${HOSTED}?${R}`, ready: "Break-even", limit: 90000, steps: scroll("Hosting") },
  { id: "prices-notcosted", scene: "4.2", url: `/cost/prices?${R}`, ready: "Not costed" },
];

/* Waits until the page is loaded and still: the ready text shown, no skeleton, spinner or "Loading", and the
   page's text unchanged for 0.7 s. */
async function loaded(p, ready, limit = Number(process.env.LIMIT ?? 45000)) {
  const t0 = Date.now();
  await p.getByText(ready, { exact: false }).first().waitFor({ timeout: limit });
  let last = "", since = Date.now();
  while (Date.now() - t0 < limit) {
    const busy = await p.evaluate(() => {
      const main = document.querySelector("main") ?? document.body;
      const bad = main.querySelectorAll('[aria-busy="true"], [data-skeleton], .animate-pulse, [role="progressbar"]').length;
      const loading = /\bLoading\b|This page could not be shown|Something went wrong/.test(main.innerText);
      return { bad, loading, text: main.innerText + document.querySelectorAll("main tr, main [role=row]").length };
    });
    if (busy.bad || busy.loading) { last = ""; since = Date.now(); }
    else if (busy.text !== last) { last = busy.text; since = Date.now(); }
    else if (Date.now() - since >= 700) return;
    await p.waitForTimeout(100);
  }
  throw new Error(`not loaded within ${limit} ms`);
}

async function scrollTo(p, heading) {
  const h = p.getByRole("heading", { name: heading }).first();
  const at = (await h.count()) ? h : p.getByText(heading, { exact: false }).first();
  await at.evaluate((e) => e.scrollIntoView({ block: "start" }));
  await p.waitForTimeout(400);
}

/* States whose core read is a CLI spend, catalog or what-if answer with no fixture at this scale: in the
   fixture-served set they would show the live traffic beside fixture figures, so they are not captured there. */
const MOCK = new Set(["overview", "spend-default", "spend-matrix", "spend-compare", "spend-compare-row", "savings-whatif", "savings-whatif-menu", "prices-preview", "prices-notcosted"]);

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: SCALE, colorScheme: "dark" });
if (!LIVE) await serveFixtures(ctx, PERIOD.to);
const page = await ctx.newPage();
mkdirSync(OUT, { recursive: true });
const report = [];
const figures = {};

for (const s of STATES) {
  if (ONLY && !ONLY.includes(s.id)) continue;
  if (!LIVE && MOCK.has(s.id)) { report.push(`${s.id}: mock needed (no fixture; live only)`); continue; }
  try {
    await page.goto(BASE + s.url);
    await loaded(page, s.ready, s.limit);
    if (s.steps) await s.steps(page, { loaded });
    await page.waitForTimeout(500);
    await page.screenshot({ path: join(OUT, `${s.id}.png`) });
    if (s.crop) {
      const top = await page.getByText(s.crop[0], { exact: false }).first().boundingBox();
      const end = await page.getByText(s.crop[1], { exact: true }).last().boundingBox();
      await page.screenshot({ path: join(OUT, `${s.id}-crop.png`), clip: { x: 268, y: Math.max(0, top.y - 12), width: W - 268, height: end.y + end.height + 24 - Math.max(0, top.y - 12) } });
    }
    const got = await figuresFor(s, page);
    if (got) Object.assign((figures[s.scene] ??= {}), got);
    report.push(`${s.id}: ok`);
  } catch (e) {
    await page.screenshot({ path: join(OUT, `${s.id}.FAILED.png`) }).catch(() => {});
    report.push(`${s.id}: FAILED ${String(e.message).split("\n")[0]}`);
  }
}
await browser.close();
writeFileSync(join(OUT, ONLY ? "figures.partial.json" : "figures.json"), JSON.stringify({ period: PERIOD, ...figures }, null, 2));
console.log(report.join("\n"));
