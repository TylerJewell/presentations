// Screenshots the reliability tester's HA/DR tab (active-active across two regions) under load, for still 4.
//   node website/demo/stills/render/reliability.mjs [--app=PATH] [--teams=5] [--wait=8000] [--offline] [--dpr=2.8]
//   writes src/reliability-hadr-akka.png at the page's 1280 px layout times --dpr (2.8 shows a 914 px region per 2560 px)
// --app defaults to apps/reliability-akka.html, the tester restyled in the console's colours.
// --offline takes eu-west-1 offline just before the shot, to catch the failover.
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const require = createRequire("C:/Users/tyler/ai-console/kalix-console/apps/stories/package.json");
const { chromium } = require("playwright");
const DIR = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const arg = (k, d) => process.argv.find((a) => a.startsWith(`--${k}=`))?.slice(k.length + 3) ?? d;
const APP = resolve(arg("app", join(DIR, "apps", "reliability-akka.html")));
const TEAMS = +arg("teams", 5), WAIT = +arg("wait", 8000), DPR = +arg("dpr", 2.8), OFFLINE = process.argv.includes("--offline");

const b = await chromium.launch({ channel: "msedge" });
const p = await b.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: DPR });
await p.goto(pathToFileURL(APP).href);
await p.getByRole("button", { name: /HA|DR|region/i }).first().click().catch(async () => {
  await p.locator(".tab-btn").nth(1).click();
});
for (let i = 0; i < TEAMS; i++) { await p.getByRole("button", { name: /Launch New Agent Team/ }).click(); await p.waitForTimeout(900); }
await p.waitForTimeout(WAIT);
if (OFFLINE) { await p.getByRole("button", { name: /eu-west-1/ }).first().click().catch(() => console.log("no eu-west-1 button")); await p.waitForTimeout(1800); }
await p.screenshot({ path: join(DIR, "src", "reliability-hadr-akka.png"), fullPage: true });
console.log("tabs:", await p.locator(".tab-btn").allTextContents(), "page height", await p.evaluate(() => document.documentElement.scrollHeight));
await b.close();
