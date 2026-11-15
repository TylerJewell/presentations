// Records the full Akka demo: the slides, then Build, Run, Govern and Optimize on the live console, with
// captions, spotlights and a cursor, each scene held for its narration (see design.md).
//   node website/demo/full/record.mjs            records out/demo.webm and out/marks.json
//   node website/demo/full/record.mjs --hq       records the production master instead: frames captured from the
//                                        browser at 1920x1080 into out/frames, then master.mjs builds the MP4
//   node website/demo/full/record.mjs --probe    runs every scene without video, a screenshot per scene, and reports
//                                        each step that fails
// Run demo/full/preroll.mjs first; it brings the stack up and writes ids.json.
import { createRequire } from "node:module";
import { mkdirSync, readFileSync, readdirSync, renameSync, rmSync, writeFile, writeFileSync } from "node:fs";
import { join } from "node:path";
import { OVERLAY, narrationSeconds, stage } from "../lib/stage.mjs";

const require = createRequire("C:/Users/tyler/ai-console/kalix-console/apps/stories/package.json");
const { chromium } = require("playwright");

const DIR = "C:/Users/tyler/competition/website/demo/full";
const OUT = join(DIR, "out");
const BASE = process.env.BASE ?? "http://127.0.0.1:9889";
const PROBE = process.argv.includes("--probe");
const HQ = process.argv.includes("--hq");
const ONLY = process.argv.find((a) => a.startsWith("--only="))?.slice(7);
const W = 1600, H = 900;
const ids = JSON.parse(readFileSync(join(DIR, "ids.json"), "utf8"));
const seconds = narrationSeconds(join(DIR, "narration.json"), join(DIR, "durations.json"));

// A chapter card in the Akka Intro deck's style.
const card = (kicker, title, sub = "") => `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;600;700&display=swap" rel="stylesheet">
<style>html,body{margin:0;height:100%;background:#000;color:#F1F1F1;font-family:"Instrument Sans",sans-serif}
.w{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;padding:0 170px}
.k{font-size:17px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#FFCE4A}
h1{font-size:72px;line-height:1.08;font-weight:600;margin:22px 0 0;letter-spacing:-.01em}h1 em{font-style:normal;color:#FFCE4A}
p{font-size:26px;color:#A6A6A6;margin:24px 0 0}.a{position:absolute;left:56px;bottom:46px;font-weight:700;font-size:22px;letter-spacing:.22em}
.f{animation:in .8s ease both}@keyframes in{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}</style></head>
<body><div class="w f"><div class="k">${kicker}</div><h1>${title}</h1>${sub ? `<p>${sub}</p>` : ""}</div><div class="a">AKKA</div></body></html>`;

mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();

// Warm every page the scenes read, so the recording never waits on a cold read.
if (!PROBE) {
  const warm = await browser.newPage({ viewport: { width: W, height: H }, colorScheme: "dark" });
  for (const u of ["/build?view=specs", "/build?view=code&present=1&diagram=1", "/build?view=exit", "/test?view=integration",
    `/activity/replay/workflow/loan-origination/underwriting/${ids.applicationId}`, `/activity/traces/${ids.decisionTraceId}`,
    "/inference/playground/loan-origination/support-answer-judge", "/build/services/loan-origination",
    `/activity/replay/entity/loan-origination/loan-application/${ids.applicationId}`, `/human/events/${ids.humanEventId}`,
    "/controls?view=controls", "/evidence?view=all", "/evidence?view=controls&kind=online-eval", "/human?view=officers",
    "/human?view=halts", "/evidence?view=compliance", `/evidence/verdicts/${ids.verdictId}`,
    "/inference?view=gateway&screen=big&window=1m", "/cost?view=spend", `/cost/changes/${ids.changeId}`, "/training?view=runs",
    "/training?view=datasets", "/training/runs/new", `/activity/replay/training/${ids.trainingRunId}`,
    `/activity/replay/pipeline/${ids.pipelineReplay}`, "/inference?view=serving"]) {
    await warm.goto(BASE + u).catch(() => {});
    await warm.waitForTimeout(4000);
  }
  // The New run wizard reads its base models and datasets only as each step opens, so its steps are walked too.
  await warm.goto(BASE + "/training/runs/new").catch(() => {});
  for (const sel of ["main :text-is(\"refund-request\")", "[data-testid='base-model-choice']", "[data-testid='dataset-choice']"]) {
    const c = warm.locator(sel).first();
    if (!(await c.waitFor({ timeout: 30000 }).then(() => true, () => false))) break;
    await c.click().catch(() => {});
    await warm.locator("[data-testid='step-next']").first().click({ timeout: 5000 }).catch(() => {});
  }
  await warm.close();
}

for (const n of readdirSync(OUT)) if (n.endsWith(".webm")) rmSync(join(OUT, n), { force: true });
const ctx = await browser.newContext({
  viewport: { width: W, height: H }, colorScheme: "dark",
  // The master renders the same 1600x900 layout at 1.2x density, so its frames are a crisp 1920x1080.
  ...(HQ ? { deviceScaleFactor: 1.2 } : PROBE ? {} : { recordVideo: { dir: OUT, size: { width: W, height: H } } })
});
await ctx.addInitScript(OVERLAY);
const p = await ctx.newPage();
const s = stage(p, seconds);

// The master's frames: every frame the browser paints, as JPEG at quality 92, with its paint time.
const FRAMES = join(OUT, "frames");
const frames = [];
if (HQ) {
  rmSync(FRAMES, { recursive: true, force: true }); mkdirSync(FRAMES, { recursive: true });
  const cdp = await ctx.newCDPSession(p);
  cdp.on("Page.screencastFrame", (f) => {
    const file = join(FRAMES, `${String(frames.length).padStart(6, "0")}.jpg`);
    frames.push({ file, t: f.metadata.timestamp * 1000 });
    writeFile(file, Buffer.from(f.data, "base64"), () => {});
    cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }).catch(() => {});
  });
  await cdp.send("Page.startScreencast", { format: "jpeg", quality: 92, maxWidth: 1920, maxHeight: 1080, everyNthFrame: 1 });
}
const { sleep, say, finish, click, caption, hideCaption, spot, unspot, curtain, lift, route, unfade } = s;
const loc = (sel) => p.locator(sel).first();
const text = (t) => p.getByText(t, { exact: false }).first();
const button = (name) => p.getByRole("button", { name }).first();
const ready = (sel, timeout = 60000) => p.waitForSelector(sel, { timeout });

/** Opens a console page behind a chapter card, which lifts once the page has what the scene needs. */
/** Opens a console page behind a chapter card; `behind` runs on the page while the card still covers it. */
async function chapterTo(kicker, title, sub, path, readySel, line, behind) {
  await hideCaption().catch(() => {});
  await curtain(card(kicker, title, sub)).catch(() => {});
  if (line) say(line);
  const at = Date.now();
  // Inside the app the card moves without a reload, so the page keeps what it remembers (a review's start).
  if (p.url().startsWith(BASE))
    await p.evaluate((u) => { history.pushState({}, "", u); dispatchEvent(new PopStateEvent("popstate")); }, path);
  else await p.goto(BASE + path);
  const t0 = Date.now();
  await ready(readySel);
  const t1 = Date.now();
  await settled();
  const t2 = Date.now();
  if (behind) await behind();
  if (process.env.DEMO_TIMING) console.log(`card ${kicker}: ready ${t1 - t0} ms, settled ${t2 - t1} ms, behind ${Date.now() - t2} ms`);
  await sleep(Math.max(0, 3200 - (Date.now() - at)));
  if (line) await finish();
  await lift();
}
/** Moves to another page inside the app and waits for it. */
async function go(path, readySel) {
  await unspot().catch(() => {});
  // The old page is marked before moving, and the new one counts as rendered once most of it is gone: until
  // then the old page, with no placeholders, would pass for a loaded one.
  const marked = await p.evaluate(() => {
    const els = document.querySelectorAll("main *");
    els.forEach((e) => e.setAttribute("data-demo-old", ""));
    return els.length;
  }).catch(() => 0);
  // Inside the app it moves without a reload; from anywhere else (a probe of one scene) it loads the page.
  if (p.url().startsWith(BASE)) {
    await route(path);
    if (marked) await p.waitForFunction((n) => document.querySelectorAll("[data-demo-old]").length < n * 0.3, marked, { timeout: 15000 })
      .catch(() => console.warn("old page still showing:", path));
  }
  else { await p.goto(BASE + path); }
  // The page loads entirely under the fade, however long it takes: master.mjs shortens the black to 0.8 s, so a
  // slow load costs recording time, never screen time, and the narration starts on a finished page.
  await ready(readySel).catch(() => console.warn("not ready:", readySel, p.url()));
  await settled();
  await quiet();
  await unfade();
  await sleep(600);
}
/** Waits until the page's loading placeholders and spinners are gone, so no scene shows a half-loaded page. */
async function settled(timeout = 20000) {
  await p.waitForFunction(() => !document.querySelector(
    "main [class*='skeleton'], main [data-testid*='skeleton'], main .animate-pulse, main .animate-spin, main [aria-busy='true'], main [role='progressbar']:not([aria-valuenow])"
  ) && !/^\s*Loading\b/m.test(document.querySelector("main")?.innerText ?? ""), null, { timeout }).catch(() => console.warn("still loading:", p.url()));
}
/** Waits until no rows or text have arrived in the page for `still` ms; a live page that never stops is cut off at `max`. */
async function quiet(still = 700, max = 8000) {
  await p.evaluate(([still, max]) => new Promise((done) => {
    const root = document.querySelector("main") ?? document.body;
    let timer = setTimeout(finish, still);
    const cap = setTimeout(finish, max);
    const o = new MutationObserver(() => { clearTimeout(timer); timer = setTimeout(finish, still); });
    o.observe(root, { childList: true, subtree: true, characterData: true });
    function finish() { o.disconnect(); clearTimeout(timer); clearTimeout(cap); done(); }
  }), [still, max]).catch(() => {});
}

// ---------------------------------------------------------------- scenes
const scenes = [
  ["slides", async () => {
    await p.goto("file:///C:/Users/tyler/competition/website/demo/full/slides.html");
    await sleep(800);
    const slides = [["opening", 6000], ["slide-four-things", 9000], ["slide-integrate", 9000], ["slide-shared", 9000], ["slide-spine", 9000], ["slide-binary", 8000]];
    for (const [i, [id, min]] of slides.entries()) {
      await p.evaluate((k) => document.querySelectorAll("section")[k].scrollIntoView({ behavior: "smooth" }), i);
      say(id); const at = Date.now();
      await finish(); await sleep(Math.max(0, min - (Date.now() - at)));
    }
  }],

  // ------------------------------------------------ Build: AI factories (Akka Specify)
  ["build-spec", async () => {
    await chapterTo("Build · AI factories", "Akka <em>Specify</em>", "From a specification to a tested, documented service.", "/build?view=specs", "main", "card-build");
    say("build-spec");
    await caption("Build › Specs", "It starts as a specification: user stories, requirements and the conditions to meet before it ships.");
    const spec = text("loan-intake-underwriting");
    if (await spec.count()) await click(spec);
    await sleep(1500);
    await spot(loc("main"), 0);
    await finish(); await unspot();
  }],
  ["build-docs", async () => {
    await go("/build?view=code&present=1&diagram=underwriting-one-loan-application", "main iframe");
    say("build-docs");
    await caption("Generated documentation", "How one loan application is underwritten, across agents, workflows and entities.", true);
    await finish();
    await go("/build?view=code&present=1&diagram=intake-and-underwriting-components", "main iframe");
    say("build-components");
    await caption("Generated documentation", "The components, and how they connect.", true);
    await finish();
    await go("/build?view=code&present=1&diagram=loan-application-lifecycle", "main iframe");
    say("build-lifecycle");
    await caption("Generated documentation", "Every state an application moves through.", true);
    await finish();
    await go("/build?view=code&present=1&diagram=raising-and-deciding-a-human-event", "main iframe");
    say("build-oversight");
    await caption("Generated documentation", "How a person is brought in: raised, routed, decided or escalated.", true);
    await finish();
  }],
  ["build-exit", async () => {
    await go("/build?view=exit", "main");
    say("build-exit");
    await caption("Build › Exit conditions", "Every condition the spec sets is checked by a test, before anything is deployed.");
    const stages = button(/Stages/);
    if (await stages.count()) { await click(stages); await sleep(1200); }
    await spot(loc("main table, main [role='grid'], main"), 6);
    await sleep(2500);
    await go("/test?view=integration", "main");
    const run = button(/^Run/);
    if (await run.count()) { await click(run); await sleep(2500); }
    await finish(); await unspot();
  }],

  // ------------------------------------------------ Run: agents (Akka SDK)
  ["run-replay", async () => {
    await chapterTo("Run · Agents", "Akka <em>Agent SDK</em>", "Agents, orchestration and state, in one runtime that scales and recovers.",
      `/activity/replay/workflow/loan-origination/underwriting/${ids.applicationId}`, "main", "card-run");
    say("run-replay");
    await caption("Replay · underwriting workflow", "Identity, credit, affordability and an AI assessor, with a durable pause for a person, retries and a safe failover.");
    const play = button(/play/i);
    if (await play.count()) await click(play);
    await sleep(1000);
    await spot(loc("main"), 0);
    await finish(); await unspot();
  }],
  ["run-trace", async () => {
    await go(`/activity/traces/${ids.decisionTraceId}`, "main");
    say("run-trace");
    await caption("One request, end to end", "The endpoint, the workflow, the agent and its model call, and a guardrail stopping an answer.");
    await spot(loc("main"), 0);
    await sleep(2500);
    const flow = button(/^Flow$/);
    if (await flow.count()) { await click(flow); await sleep(1500); }
    await finish(); await unspot();
  }],
  ["run-agent", async () => {
    await go("/inference/playground/loan-origination/support-answer-judge", "main textarea, main input");
    say("run-agent");
    await caption("Playground · applicant support", "The agent looks the application up, calls a tool, answers, and a judge scores the answer.");
    const box = loc("main textarea, main input[type='text']");
    await click(box);
    await box.type(`Could I have 28 more days for application ${ids.applicationId}? I am abroad until November.`, { delay: 8 });
    await p.keyboard.press("Enter");
    // The reply arrives while the line is spoken; the judge's score shows if it is ready by then.
    await p.waitForFunction(() => document.querySelector("[data-testid='turn-reply-card']")
      && !document.querySelector("[data-testid='turn-pending']"), null, { timeout: 20000 }).catch(() => {});
    await spot(loc("main"), 0);
    await finish(); await unspot();
  }],

  // ------------------------------------------------ Govern: governance (Akka Verify)
  ["run-components", async () => {
    await go("/build/services/loan-origination", "main");
    say("run-components");
    await caption("The Akka runtime", "Entities, workflows, views, agents and endpoints, compiled into one binary that clusters, scales and recovers.");
    await sleep(1200);
    await spot(loc("main [data-grid-table], main table, main"), 6);
    await finish(); await unspot();
  }],
  ["run-entity", async () => {
    // Under the fade: the human event is shown claimed now, so its minimum review time has passed by its scene.
    if (p.url().startsWith(BASE)) {
      await route(`/human/events/${ids.humanEventId}`);
      const start = p.getByRole("button", { name: /Start review/ }).first();
      if (await start.waitFor({ timeout: 15000 }).then(() => true, () => false)) {
        await start.evaluate((b) => b.click());
        await p.getByText(/You can submit in/).first().waitFor({ timeout: 15000 }).catch(() => {});
      }
    }
    await go(`/activity/replay/entity/loan-origination/loan-application/${ids.applicationId}`, "main");
    say("run-entity");
    await caption("Replay · an event-sourced entity", "One loan application's history, event by event, with its state at each step.");
    const play = button(/play/i);
    if (await play.count()) await click(play);
    await sleep(800);
    await spot(loc("main"), 0);
    await finish(); await unspot();
  }],
  ["govern-human", async () => {
    await chapterTo("Govern · Governance", "Akka <em>Verify</em>", "Controls enforced on every AI interaction, with evidence that they hold.",
      `/human/events/${ids.humanEventId}`, "main", "card-govern",
      // The page counts the decision's minimum review time from Start review, so it starts under the card.
      async () => {
        // Claimed already under an earlier fade, the panel shows the answer at once; otherwise claim it now.
        const start = p.getByRole("button", { name: /Start review/ }).first();
        await start.or(p.getByText("Your answer").first()).waitFor({ timeout: 15000 }).catch(() => {});
        if (await start.isVisible().catch(() => false)) {
          await start.evaluate((b) => b.click());
          // The clock starts once the claim lands and the event shows as claimed.
          await p.getByText(/You can submit in/).first().waitFor({ timeout: 15000 }).catch(() => {});
        }
      });
    say("govern-human");
    await caption("Human · a deadline extension", "In front of an officer, with the evidence, the judge's view and a deadline.");
    await spot(loc("main"), 0);
    const start = button(/Start review/);
    if (await start.count()) { await click(start); await sleep(800); }
    const approve = text("Approve");
    if (await approve.count()) { await click(approve); await sleep(800); }
    const why = loc("main textarea");
    if (await why.count()) await why.fill("Applicant is abroad until November; 28 days is within the policy's extension limit.");
    // A probe leaves the event undecided, so the recording can decide it.
    const submit = button(/Submit/);
    if (!PROBE && await submit.count()) {
      await p.waitForFunction(() => [...document.querySelectorAll("button")].some((b) => /Submit/.test(b.textContent ?? "") && !b.disabled), null, { timeout: 45000 }).catch(() => {});
      await click(submit);
    }
    await finish(); await unspot();
  }],
  ["govern-controls", async () => {
    await go("/controls?view=controls", "main");
    say("govern-controls");
    await caption("Controls in force", "From the regulations that apply, and enforced in the running system.");
    const row = text("Deadline extensions beyond policy");
    if (await row.count()) { await click(row); await sleep(1500); }
    await spot(loc("[data-testid='tray'], aside, main"), 4);
    await finish(); await unspot();
  }],
  ["govern-kinds", async () => {
    await p.keyboard.press("Escape").catch(() => {});
    say("govern-kinds");
    await caption("Kinds of control", "Gates, sanitizers, guardrails, evaluations and human decisions, each enforced in the running system.");
    await spot(loc("main [data-grid-table], main table, main"), 6);
    await finish(); await unspot();
  }],
  ["govern-sanitizer", async () => {
    await p.keyboard.press("Escape").catch(() => {});
    say("govern-sanitizer");
    await caption("A sanitizer and its verdicts", "Personal information dropped before the agent takes it in; each verdict records that it held.");
    const san = text("Drop unsolicited personal information");
    if (await san.count()) { await click(san); await sleep(1800); }
    await spot(loc("[data-testid='tray'], [data-grid-details], main"), 4);
    await finish(); await unspot();
  }],
  ["govern-evals", async () => {
    await p.keyboard.press("Escape").catch(() => {});
    await go("/evidence?view=controls&kind=online-eval", "[data-testid='evaluations-groups'], [data-testid='evaluations-totals']");
    say("govern-evals");
    await caption("Online evaluations", "Every live answer scored, so quality is measured continuously, not just before release.");
    await spot(loc("[data-testid='evaluations-groups'], [data-testid='evaluations-totals']"), 6);
    await finish(); await unspot();
  }],
  ["govern-officers", async () => {
    await go("/human?view=officers", "[data-testid='human-quality']");
    say("govern-officers");
    await caption("Human › Officers", "Decision times against the minimum, agreement between officers, and escalations.");
    await spot(loc("[data-testid='quality-histogram'], [data-testid='quality-weekly'], [data-testid='human-quality']"), 6);
    await sleep(3500);
    await spot(loc("[data-testid='quality-heatmap']"), 6);
    await finish(); await unspot();
  }],
  ["govern-halt", async () => {
    await go("/human?view=halts", "[data-testid='halt-tile'], main");
    say("govern-halt");
    await caption("Human › Halts", "An officer halts a scope; work goes to people until a second officer lifts it.");
    await spot(loc("[data-testid='halt-tile']"), 6);
    await finish(); await unspot();
  }],
  ["govern-evidence", async () => {
    await go("/evidence?view=compliance", "main");
    say("govern-evidence");
    await caption("Evidence · compliance over time", "A hundred and twenty days of verdicts, every change of controls marked.");
    await spot(loc("main svg, main canvas, main"), 6);
    await sleep(4000);
    await go(`/evidence/verdicts/${ids.verdictId}`, "main");
    await spot(loc("main"), 0);
    await finish(); await unspot();
  }],

  // ------------------------------------------------ Optimize: models (Akka Optimize)
  ["optimize-gateway", async () => {
    await chapterTo("Optimize · Models", "Akka <em>Optimize</em>", "Every request routed to the right model, for cost and quality.",
      "/inference?view=gateway&screen=big&window=1m", "canvas, svg", "card-optimize");
    say("optimize-gateway");
    await caption("Gateway · live", "Callers on the left, models on the right; each stream's width is the tokens flowing.", true);
    await finish();
  }],
  ["optimize-costs", async () => {
    await go("/cost?view=spend", "[data-grid-table] [data-grid-row]");
    say("optimize-costs");
    await caption("Cost › Costs", "What the AI system cost this week against last, by use case, with its footnotes.");
    await spot(loc("main [data-testid='cards'], main"), 6);
    await sleep(2500);
    const pct = p.locator("th").filter({ hasText: "% Change" }).first();
    if (await pct.count()) await click(pct.locator("[data-testid='grid-sort']").first());
    await sleep(1200);
    const row = loc("[data-grid-row]");
    await click(row); await sleep(800);
    await spot(loc("[data-grid-details]"), 4);
    await finish(); await unspot();
  }],
  ["optimize-price", async () => {
    say("optimize-price");
    await caption("Cost if served on another model", "Price this week's traffic on a cheaper model, then propose it as a change.");
    const price = button(/Price on another model/);
    if (await price.count()) { await click(price); await sleep(1400); await spot(loc("[role='dialog']"), 4); await sleep(1600); await p.keyboard.press("Escape"); }
    await go(`/cost/changes/${ids.changeId}`, "main");
    await spot(loc("main"), 0);
    await finish(); await unspot();
  }],
  ["optimize-train", async () => {
    await go("/training?view=runs", "main");
    say("optimize-train");
    await caption("Training", "Train your own small models on your proprietary datasets, on your own GPUs.");
    await spot(loc("[data-grid-table], main table, main"), 6);
    await finish(); await unspot();
  }],
  ["optimize-datasets", async () => {
    await go("/training?view=datasets", "main");
    say("optimize-datasets");
    await caption("Training › Datasets", "Your proprietary data, versioned in your own registry; nothing leaves your environment.");
    const row = loc("[data-grid-row], main tbody tr");
    if (await row.count()) { await click(row); await sleep(1800); }
    await spot(loc("[data-testid='tray'], [data-grid-details], main"), 4);
    await finish(); await unspot();
  }],
  ["optimize-newrun", async () => {
    await go("/training/runs/new", "main :text-is(\"refund-request\")");
    say("optimize-newrun");
    await caption("Training › New run", "A base model, a dataset and its settings, checked against the plan and the GPUs before it starts.");
    // Step by step: the project, a base model, its dataset and settings, to the plan's check.
    const pick = async (sel) => { const c = loc(sel); if (await c.count()) { await click(c); await sleep(200); } };
    const next = async () => { const n = loc("[data-testid='step-next']"); if (await n.count() && await n.isEnabled()) { await click(n); await sleep(400); } };
    const project = p.getByText("refund-request", { exact: true }).first();
    await project.waitFor({ timeout: 30000 }).catch(() => {});
    if (await project.count()) { await click(project); await sleep(300); }
    await next();
    await loc("[data-testid='base-model-choice']").waitFor({ timeout: 20000 }).catch(() => {});
    await pick("[data-testid='base-model-choice']"); await next();
    await loc("[data-testid='dataset-choice']").waitFor({ timeout: 20000 }).catch(() => {});
    await pick("[data-testid='dataset-choice']"); await next();
    // It stops at Settings and shows the run's plan: the start checks need a training quota the demo stack lacks.
    await sleep(600);
    const plan = p.getByRole("button", { name: /^Plan$/ }).or(p.getByRole("tab", { name: /^Plan$/ })).first();
    if (await plan.count()) { await click(plan); await sleep(500); }
    await spot(loc("main"), 0);
    await finish(); await unspot();
  }],
  ["optimize-replay", async () => {
    await go(`/activity/replay/training/${ids.trainingRunId}`, "main");
    say("optimize-replay");
    await caption("Replay · a training run", "The loss falling step by step as the model learns.");
    const play = button(/play/i);
    if (await play.count()) await click(play);
    await spot(loc("main svg, main canvas, main"), 6);
    await finish(); await unspot();
  }],
  ["optimize-scores", async () => {
    await go(`/activity/replay/pipeline/${ids.pipelineReplay}`, "main");
    say("optimize-scores");
    await caption("Candidate scores", "Each candidate scored against the model it would replace, before it serves a single request.");
    const play = button(/play/i);
    if (await play.count()) await click(play);
    await sleep(800);
    await spot(loc("main"), 0);
    await finish(); await unspot();
  }],
  ["optimize-serve", async () => {
    await go("/inference?view=serving", "main");
    say("optimize-serve");
    await caption("Serving · self-hosted inference", "Serve the model on your own inference, and send it a canary of one request in ten.");
    const on = button(/Turn on an adapter/);
    if (await on.count()) { await click(on); await sleep(2500); await spot(loc("[role='dialog']"), 4); await sleep(2000); await p.keyboard.press("Escape"); }
    await unspot();
    await go("/inference?view=gateway&screen=big&window=1m", "canvas, svg");
    await caption("Gateway · live", "The small model taking its share of live traffic.", true);
    await sleep(5000);
    await finish();
  }],

  ["close", async () => {
    await hideCaption();
    await curtain(card("Akka", "Scale AI, <em>efficiently.</em>", "Specify · Agent SDK · Verify · Optimize"));
    say("close"); await finish(); await sleep(1500);
  }]
];

// ---------------------------------------------------------------- run
const failures = [];
for (const [name, run] of scenes) {
  if (ONLY && !ONLY.split(",").some((o) => name.startsWith(o))) continue;
  const at = Date.now();
  try { await run(); }
  catch (e) { failures.push(`${name}: ${String(e.message ?? e).split("\n")[0]}`); console.warn("scene failed:", name, String(e.message ?? e).split("\n")[0]); }
  if (PROBE) await p.screenshot({ path: join(OUT, `probe-${name}.png`) }).catch(() => {});
  console.log(`${name}  ${((Date.now() - at) / 1000).toFixed(1)} s`);
}
if (HQ) {
  await sleep(1500);
  // A still page paints nothing, so the last frame is held to the moment the recording ends.
  if (frames.length) frames.push({ file: frames.at(-1).file, t: Date.now() });
  writeFileSync(join(OUT, "frames.json"), JSON.stringify(frames));
  writeFileSync(join(OUT, "marks-abs.json"), JSON.stringify(s.at, null, 2));
}
await ctx.close(); await browser.close();
if (HQ) console.log(`captured ${frames.length} frames`);
else if (!PROBE) {
  const f = readdirSync(OUT).find((n) => n.endsWith(".webm"));
  renameSync(join(OUT, f), join(OUT, "demo.webm"));
  writeFileSync(join(OUT, "marks.json"), JSON.stringify(s.marks, null, 2));
  console.log("wrote", join(OUT, "demo.webm"));
}
if (failures.length) console.log("\nfailed steps:\n" + failures.join("\n"));
