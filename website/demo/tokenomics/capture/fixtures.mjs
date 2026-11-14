// Fixture-served capture mode: answers the console's companion routes with the console's own fixtures
// (kalix-console/apps/local-console/src/modules/optimize/optimize/**/fixtures/*.json), by browser-side
// interception only. Nothing is written to any service.
//
// Every date in a served file moves forward by whole days so the fixture's week ends on the current period's
// last day; no amount, percentage or count is touched. Budgets are assessed for the current calendar month.
// Routes with no entry here (the CLI reads through /query: spend, catalog, models, policies) are answered live.
import { readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = "C:/Users/tyler/ai-console/kalix-console/apps/local-console/src/modules/optimize/optimize";
const load = (dir, name) => JSON.parse(readFileSync(join(ROOT, dir, "fixtures", name), "utf8"));

/* The fixtures' week ends 2026-10-10T16:00Z. */
const FIXTURE_END = Date.parse("2026-10-10T16:00:00Z");
const DAY = 864e5;
const ISO = /^(\d{4}-\d{2}-\d{2})(T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z)?$/;

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const LONG = /(January|February|March|April|May|June|July|August|September|October|November|December) (\d{1,2}), (\d{4})/g;

function shifter(days) {
  const move = (v) => {
    if (typeof v === "string") {
      const m = ISO.exec(v);
      // A date written out in a sentence ("October 10, 2026") moves with the rest.
      if (!m) {
        return v.replace(LONG, (_, mo, d, y) => {
          const t = new Date(Date.UTC(+y, MONTHS.indexOf(mo), +d) + days * DAY);
          return `${MONTHS[t.getUTCMonth()]} ${t.getUTCDate()}, ${t.getUTCFullYear()}`;
        });
      }
      const t = Date.parse(m[2] ? v : v + "T00:00:00Z") + days * DAY;
      const iso = new Date(t).toISOString();
      return m[2] ? iso.replace(".000Z", "Z") : iso.slice(0, 10);
    }
    if (Array.isArray(v)) return v.map(move);
    if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, move(x)]));
    return v;
  };
  return move;
}

/** The whole days from the fixtures' week to the week ending at `to`. */
export function shiftDays(to) {
  return Math.round((Date.parse(to) - FIXTURE_END) / DAY);
}

/** Budgets are kept per calendar month: November 2026 (day 9 of 30), then the usual shift for the series dates. */
function november(json, move) {
  const text = JSON.stringify(json)
    .replaceAll("2026-10-01T07:00:00Z", "2026-11-01T08:00:00Z")
    .replaceAll("2026-11-01T07:00:00Z", "2026-12-01T08:00:00Z")
    .replaceAll("October 2026", "November 2026");
  const out = JSON.parse(text);
  if (out.period) Object.assign(out.period, { day: 9, days: 30 });
  return move(out);
}

const F = {
  budgets: load("budgets", "budgets.json"),
  budget: load("budgets", "budget.json"),
  changes: load("changes", "changes.json"),
  preview: load("changes", "preview.json"),
  efficiency: load("efficiency", "efficiency.json"),
  dismissals: load("efficiency", "dismissals.json"),
  frontier: load("frontier", "frontier.json"),
  frontierSavings: load("frontier", "frontier-savings.json"),
  bar: load("frontier", "bar.json"),
  pools: load("hosting", "pools.json"),
  hosting: load("hosting", "hosting.json"),
  worksheet: load("hosting", "worksheet.json"),
  basis: load("hosting", "basis.json"),
  useCases: load("use-cases", "use-cases.json"),
  detail: load("use-cases", "use-case-detail.json"),
  bridge: load("use-cases", "spend-bridge.json"),
};

/** The fixture that answers `method path` (the part after /api/companion), or undefined to let it through. */
function pick(method, path, move, post) {
  const p = path.split("?")[0];
  const m = (re) => re.exec(p);
  if (p === "/optimize/budgets/assess") return november(F.budgets, move);
  if (m(/^\/optimize\/budgets\/[^/]+$/) && method === "GET") return november(F.budget, move);
  if (p === "/optimize/changes" && method === "GET") return move(F.changes);
  if (p === "/optimize/changes/preview") return move(F.preview);
  let c;
  if ((c = m(/^\/optimize\/changes\/([^/]+)$/)) && method === "GET") {
    const one = F.changes.changes.find((x) => x.id === decodeURIComponent(c[1]));
    return one ? move(one) : undefined;
  }
  if (p === "/optimize/efficiency") return move(F.efficiency);
  if (p === "/optimize/efficiency/dismissals") return move(F.dismissals);
  if (p === "/optimize/frontier/savings") return move(F.frontierSavings);
  if (m(/^\/optimize\/use-cases\/[^/]+\/bar$/) && method === "GET") return move(F.bar);
  if (m(/^\/optimize\/use-cases\/[^/]+\/frontier$/)) return move(F.frontier);
  if (p === "/optimize/hosting/pools") return move(F.pools);
  if (p === "/optimize/hosting/read") return move(F.hosting);
  if (p === "/optimize/hosting/worksheet") return move(F.worksheet);
  if (p === "/optimize/prices/basis") return move(F.basis);
  if (p === "/optimize/use-cases/assess") return move(F.useCases);
  if (p === "/optimize/use-cases/detail") {
    // The detail fixture is chargeback-dispute's; any other use case gets its own row from the assess fixture.
    const id = JSON.parse(post || "{}").useCase;
    const row = F.useCases.useCases.find((r) => r.id === id || r.label === id);
    return move(row ? { ...F.detail, row } : F.detail);
  }
  if (p === "/optimize/spend/bridge") return move(F.bridge);
  return undefined;
}

/** Routes the context's companion calls through the fixtures; `to` is the period's end (ISO). */
export async function serveFixtures(context, to, log = []) {
  const move = shifter(shiftDays(to));
  await context.route("**/api/companion/**", async (route) => {
    const req = route.request();
    const path = req.url().split("/api/companion")[1];
    const body = pick(req.method(), path, move, req.postData());
    if (body === undefined) return route.continue();
    log.push(`${req.method()} ${path.split("?")[0]}`);
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(body) });
  });
}
