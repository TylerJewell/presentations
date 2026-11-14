// Reads the figures a captured screen shows, as the text it shows them in ("$44.45", "(64.8)%", "2"), keyed by
// label. capture.mjs merges them by scene into captures/figures.json, the file render/figures-check.mjs reads.

/** The page's text lines and table rows (cells trimmed, empty cells dropped). */
async function read(page) {
  return page.evaluate(() => {
    const main = document.querySelector("main") ?? document.body;
    const lines = main.innerText.split("\n").map((l) => l.trim()).filter(Boolean);
    const rows = [...main.querySelectorAll("tr")].map((tr) => [...tr.children].map((c) => c.innerText.replace(/\s+/g, " ").trim()).filter(Boolean));
    return { lines, rows };
  });
}

/** The line after the first line that starts with `label`. */
const after = (d, label, skip = 1) => {
  const i = d.lines.findIndex((l) => l.startsWith(label));
  return i < 0 ? undefined : d.lines[i + skip];
};
const row = (d, first, nth = 0) => d.rows.filter((r) => r[0] === first || r[0]?.startsWith(first + " "))[nth];
const num = (t) => (t === undefined ? NaN : (/^\(|\)/.test(t) ? -1 : 1) * parseFloat(String(t).replace(/[^\d.]/g, "")));
const money = (n) => `$${n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
const put = (o, k, v) => { if (v !== undefined && v !== "") o[k] = v; };

const EXTRACT = {
  usecases: (d) => {
    const o = {};
    for (const r of d.rows) {
      const i = r.findIndex((c) => /^\$/.test(c));
      if (i < 1 || r.length < i + 4) continue;
      const name = r[0].replace(/^[^A-Za-z]+/, "");
      put(o, `${name} prior`, r[i]); put(o, `${name} current`, r[i + 1]); put(o, `${name} change`, r[i + 2]); put(o, `${name} % change`, r[i + 3]);
      const times = num(r[i + 1]) / num(r[i]);
      if (times > 2) put(o, `${name} current as a multiple of prior`, `${times.toFixed(2)}x`);
    }
    return o;
  },
  "usecase-page": (d) => {
    const o = {};
    put(o, "Use case cost", after(d, "Cost"));
    put(o, "Use case cost change", after(d, "Cost", 2));
    const start = d.lines.findIndex((l) => l.startsWith("Cost, current period compared"));
    const lines = d.lines.slice(start + 1);
    for (const k of ["Prior period", "Volume", "Prompt size", "Cache use", "Response size", "Price", "Current period"]) {
      const i = lines.indexOf(k);
      if (i >= 0 && /\$/.test(lines[i + 1] ?? "")) put(o, `Use case bridge ${k}`, lines[i + 1]);
    }
    put(o, "Prompt size change", lines.find((l) => /prompt tokens per request/.test(l)));
    return o;
  },
  overview: (d) => {
    const o = {};
    put(o, "Cost to date", after(d, "Cost to date"));
    put(o, "Cost to date change", after(d, "Cost to date", 2));
    put(o, "Projected cost at period end", after(d, "Projected cost at period end"));
    put(o, "Budget", after(d, "Projected cost at period end", 3)?.replace(/^Budget /, ""));
    put(o, "Realized savings", after(d, "Realized savings"));
    put(o, "Potential savings", after(d, "Potential savings"));
    return o;
  },
  "spend-default": (d) => {
    const o = {};
    for (const r of d.rows) if (r.length >= 4 && /^\$/.test(r[1] ?? "")) put(o, `${r[0]} cost`, r[1]);
    return o;
  },
  "spend-matrix": (d) => {
    const o = {};
    for (const r of d.rows) if (r.length >= 6 && /^\$/.test(r[r.length - 1] ?? "")) put(o, `${r[0]} cost per request`, r[r.length - 1]);
    return o;
  },
  "spend-compare": (d) => {
    const o = {};
    const t = d.rows.find((r) => r[0] === "Total" && r.length > 4);
    if (t) { put(o, "Prior period cost", t[1]); put(o, "Current period cost", t[2]); put(o, "Cost change", t[3]); put(o, "Cost % change", t[4]); }
    return o;
  },
  "spend-bridge": (d) => {
    const o = {};
    const start = d.lines.findIndex((l) => l.startsWith("Change in cost"));
    const lines = d.lines.slice(start + 1);
    for (const k of ["Prior period", "Volume", "Model mix", "Token intensity", "Prompt size", "Cache use", "Response size", "Price", "Other", "Current period"]) {
      const i = lines.indexOf(k);
      if (i >= 0 && /^\$/.test(lines[i + 1] ?? "")) put(o, `Bridge ${k}`, lines[i + 1]);
    }
    // The change itself is the difference of the two ends the bridge shows.
    const change = num(o["Bridge Current period"]) - num(o["Bridge Prior period"]);
    if (!Number.isNaN(change)) put(o, "Bridge change, current less prior", money(change));
    return o;
  },
  "savings-overview": (d) => {
    const o = {};
    put(o, "Potential savings", after(d, "Potential savings"));
    put(o, "Realized savings", after(d, "Realized savings"));
    const kinds = d.rows.filter((r) => r.length >= 4 && /^\$/.test(r[1] ?? "") && /^\$/.test(r[2] ?? ""));
    for (const r of kinds) { put(o, `${r[0]} prior`, r[1]); put(o, `${r[0]} current`, r[2]); }
    put(o, "Avoidable kinds", String(kinds.length));
    return o;
  },
  "savings-opportunity": (d) => {
    const o = {};
    for (const r of d.rows) if (/^(Stop|Lower|Cache|Trim)/.test(r[0] ?? "") && /\$/.test(r.join(" "))) put(o, `Opportunity ${r[0]}`, r.slice(1).join(" | "));
    return o;
  },
  "savings-whatif": (d) => {
    const o = {};
    const t = d.rows.find((r) => r[0] === "Total" && r.length >= 3);
    if (t) put(o, "What-if total", t.slice(1).join(" | "));
    return o;
  },
  frontier: (d) => {
    const o = {};
    const cost = {};
    for (const r of d.rows) {
      const m = r.join(" | ");
      if (!(/Meets the bar|Below the bar|Not enough evidence|Current|Reference/.test(m) && /%/.test(m))) continue;
      const name = r[0].replace(/^[^A-Za-z]+/, "");
      const dollars = (r[2] ?? "").match(/\$[\d.,]+/g) ?? [];
      put(o, `${name} cost per 1,000 requests`, r[2]);
      put(o, `${name} pass rate`, r.find((c) => /^\d+(\.\d+)?%$/.test(c)));
      cost[name] = { low: num(dollars[0]), high: num(dollars.at(-1)) };
    }
    const mini = cost["frontier-mini"], large = cost["frontier-large"];
    if (mini && large) put(o, "frontier-mini high-end cost as a share of frontier-large", (mini.high / large.high).toFixed(3));
    return o;
  },
  "change-staged": (d) => {
    const o = {};
    for (const r of d.rows) if (/^(Shadow|Canary|Fleet)/.test(r[0] ?? "")) put(o, `Stage ${r[0]}`, r.slice(1).join(" | "));
    put(o, "Stop rule", after(d, "Stop rule, every stage"));
    return o;
  },
  "change-preview": (d) => {
    const o = {};
    put(o, "Potential savings per day", after(d, "Potential savings per day at this period's traffic"));
    put(o, "Recorded per day", after(d, "Recorded per day"));
    put(o, "Potential decrease", after(d, "Potential decrease"));
    put(o, "Measured discordance", after(d, "Measured discordance"));
    put(o, "Trial cost", after(d, "Trial cost"));
    return o;
  },
  "savings-ledger": (d) => {
    const o = {};
    for (const r of d.rows) if (r.some((c) => /Within estimate|Short of estimate|Preliminary|Rolled back|Not measured|Beat/.test(c))) put(o, `Ledger ${r[0]}`, r.slice(1).join(" | "));
    const count = (w) => String(d.rows.filter((r) => r.some((c) => c.startsWith(w))).length);
    put(o, "Ledger within estimate", count("Within estimate")); put(o, "Ledger short of estimate", count("Short of estimate"));
    return o;
  },
  budgets: (d) => {
    const o = {};
    put(o, "Budgets cost to date", after(d, "Cost to date"));
    put(o, "Budgets projected cost at period end", after(d, "Projected cost at period end"));
    put(o, "Budgets at risk", after(d, "Budgets at risk"));
    put(o, "Actions armed", after(d, "Actions armed"));
    return o;
  },
  "budget-page": (d) => {
    const o = {};
    put(o, "Budget page cost to date", after(d, "Cost to date"));
    put(o, "Variance to plan", after(d, "Variance to plan"));
    put(o, "Budget page projected cost at period end", after(d, "Projected cost at period end"));
    put(o, "Runs out", after(d, "Runs out"));
    return o;
  },
  hosting: (d) => {
    const o = {};
    put(o, "Assigned price", after(d, "Assigned price"));
    put(o, "Utilization", after(d, "Utilization"));
    put(o, "Compute recovered", after(d, "Compute recovered"));
    put(o, "Break-even tokens a month", after(d, "Break-even"));
    return o;
  },
  "prices-notcosted": (d) => {
    const o = {};
    put(o, "Not costed", after(d, "Not costed"));
    put(o, "Version in force", after(d, "Version in force"));
    put(o, "Assigned prices", after(d, "Assigned prices"));
    return o;
  },
};

export async function figuresFor(state, page) {
  const f = EXTRACT[state.id];
  return f ? f(await read(page)) : null;
}
