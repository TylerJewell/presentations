#!/usr/bin/env node
// Brings the local demo stack to a recording-ready state for demo/full (design.md, "Pre-roll"), and
// writes the IDs the scenes need to demo/full/ids.json. Safe to run again: each step keeps what is
// already right and only makes what is missing or gone stale.
//
//   node website/demo/full/preroll.mjs            check and prepare everything, then print the IDs
//   node website/demo/full/preroll.mjs --wait     also wait until the traffic has run 15 minutes, and make the
//                                         S1 extension event last, so its 30-minute SLA starts late
//   node website/demo/full/preroll.mjs --fresh-s1 raise a new S1 extension event even if one is open
//   node website/demo/full/preroll.mjs --start-ledger
//                                         start the trace ledger if it is down and nothing is
//                                         maintaining it; without it a down ledger is waited for
//
// Steps:
//   1. every service answers; what is down is started the way optimize-local/stack.py starts it,
//      except the trace ledger, which other sessions stop to compact or back up its database;
//   2. Loan Origination calls its models through the local gateway (LOAN_MODEL_PROVIDER=local-gateway);
//   3. the oversight monitors' events exist (scripts/drive-oversight.mjs in samples/loan-origination);
//   4. the gateway driver runs busy with --arms (30 conversations a minute, 32 workers);
//   5. an underwriting application with retries, a failover, the human-review pause and a decision;
//   6. the remaining IDs, each checked against the API that serves its page;
//   7. the console in Demo mode;
//   8. an open S1 extension event (28 days) with at least --sla-minutes (default 20) of its SLA left.
//
// Environment: PYTHON (default the pythoncore-3.14 install), OPTIMIZE_LOCAL_NEXUS (default the
// nexus-trace-hooks-0.8 checkout).

import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import net from "node:net";

const ROOT = "C:/Users/tyler/ai-console";
const LOCAL = `${ROOT}/optimize-local`;
const LOAN = `${ROOT}/samples/loan-origination`;
const LEDGER_DATA = `${ROOT}/samples/trace-ledger/data`;
const IDS = `${ROOT}/demo/full/ids.json`;
const PYTHON = process.env.PYTHON ?? "C:/Users/tyler/AppData/Local/Python/pythoncore-3.14-64/python.exe";
const NEXUS = process.env.OPTIMIZE_LOCAL_NEXUS ?? "C:/Users/tyler/nexus-trace-hooks-0.8";
const COMPANION = "http://127.0.0.1:9889/api/companion";
const LOAN_URL = "http://127.0.0.1:9089";
const PROFILE = "optimize-local";
const SYSTEM = "loan-origination";

const flags = new Set(process.argv.slice(2));
const option = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > 0 ? Number(process.argv[i + 1]) : fallback;
};
const WAIT = flags.has("--wait");
const SLA_MINUTES = option("sla-minutes", 20);
const TRAFFIC_MINUTES = 15;
const TRAFFIC_ARGS = ["run", "--rate", "30", "--workers", "32", "--arms"];

// The scenes' fixed choices, each checked below against the API its page reads.
const CHOSEN = {
  control: "custom-5a1e00000001", // Deadline extensions beyond policy need the system owner
  verdict: "hv-20261014-00107-1", // that control, upheld: a 28-day extension approved
  change: "2026-10-08-code-review", // proposed model swap: cost down 76-79%, quality bar not yet shown
  trainingRun: "41b5c135709b4d499022075b8ebc372552d6a4674cdd658c0e56290feaad2390", // 130 steps, loss 6.39 to 0.04
  adapter: "refund-request/support-slm:v3", // that run's adapter, off
  endpointBase: "Qwen/Qwen3-0.6B", // the self-hosted endpoint it attaches to
  useCase: "refund-request", // serving policy where the 10% canary is set
  playgroundJudge: "support-answer-judge",
  pipeline: "spider-sql-2f942adc2fb77082be12047a200462d494a40a6180313d61e9b3337e95f807b7",
};

const t0 = Date.now();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const log = (...a) => console.log(`[${((Date.now() - t0) / 1000).toFixed(0).padStart(4)} s]`, ...a);
const ids = existsSync(IDS) ? JSON.parse(readFileSync(IDS, "utf8")) : {};
const save = () => writeFileSync(IDS, JSON.stringify(ids, null, 2) + "\n");
const problems = [];

// ---- helpers ----

function portOpen(port) {
  return new Promise((resolve) => {
    const s = net.connect({ host: "127.0.0.1", port });
    s.setTimeout(800);
    s.on("connect", () => (s.destroy(), resolve(true)));
    s.on("timeout", () => (s.destroy(), resolve(false)));
    s.on("error", () => resolve(false));
  });
}

async function waitPort(port, seconds) {
  for (let i = 0; i < seconds; i++) {
    if (await portOpen(port)) return true;
    await sleep(1000);
  }
  return false;
}

/** Runs optimize-local/stack.py code with the stack's environment; prints its output. */
function stack(args, code) {
  const argv = code ? ["-c", code] : [`${LOCAL}/stack.py`, ...args];
  const r = spawnSync(PYTHON, argv, {
    cwd: LOCAL,
    env: { ...process.env, OPTIMIZE_LOCAL_NEXUS: NEXUS },
    encoding: "utf8",
  });
  const out = (r.stdout + r.stderr).trim();
  if (out) console.log(out.replace(/^/gm, "    "));
  if (r.status !== 0) throw new Error(`stack.py ${code ? "helper" : args.join(" ")} exited ${r.status}`);
}

async function json(url, init) {
  const r = await fetch(url, init);
  const text = await r.text();
  if (!r.ok) throw new Error(`${init?.method ?? "GET"} ${url}: ${r.status} ${text.slice(0, 300)}`);
  return text ? JSON.parse(text) : null;
}
const companion = (path, init) => json(COMPANION + path, init);
const post = (body) => ({ method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
const optimize = (...cmd) =>
  companion("/query", post({ cmd: ["akka-optimize", ...cmd, "-o", "json"], profile: PROFILE })).then((r) => r.data);

// Unsigned tokens, as the sample accepts them locally (its README, "Dev tokens").
function token(sub, role) {
  const enc = (v) => Buffer.from(JSON.stringify(v)).toString("base64url");
  return `${enc({ alg: "none" })}.${enc({ iss: "loan-origination-idp", sub, role })}`;
}
const UNDERWRITER = token("uw-lars", "underwriter");

async function loan(method, path, bearer, body, headers = {}) {
  const r = await fetch(LOAN_URL + path, {
    method,
    headers: { Authorization: `Bearer ${bearer}`, "Content-Type": "application/json", ...headers },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const text = await r.text();
  let parsed = null;
  try {
    parsed = text ? JSON.parse(text) : null;
  } catch {
    parsed = text;
  }
  return { status: r.status, body: parsed };
}

function application(name, nationalId, good) {
  return {
    identity: {
      fullName: name,
      dateOfBirth: "1988-04-12",
      nationalId,
      email: "anna@example.eu",
      address: { street: "Keizersgracht 1", postalCode: "1015 CJ", city: "Amsterdam", countryCode: "NL" },
    },
    netMonthlyIncome: good ? "3200.00" : "1500.00",
    employmentStatus: "EMPLOYED",
    existingDebts: [{ type: "credit-card", monthlyPayment: good ? "150.00" : "450.00", outstandingBalance: "1800.00" }],
    amount: "12000.00",
    termMonths: 48,
    purpose: "CAR",
  };
}

async function submit(applicant, body) {
  const created = await loan("POST", "/applications", applicant, body);
  if (created.status !== 201) throw new Error(`submit: ${created.status} ${JSON.stringify(created.body)}`);
  return created.body.applicationId;
}

async function untilStatus(id, applicant, wanted, seconds) {
  for (let i = 0; i < seconds; i++) {
    const { body } = await loan("GET", `/applications/${id}`, applicant);
    if (wanted.includes(body?.status)) return body.status;
    await sleep(1000);
  }
  throw new Error(`application ${id} did not reach ${wanted.join(" or ")} within ${seconds} s`);
}

/** The process command line and start time of a pid, from Windows. */
function processInfo(pid) {
  try {
    const out = execFileSync(
      "powershell",
      ["-NoProfile", "-Command",
        `Get-CimInstance Win32_Process -Filter 'ProcessId=${Number(pid)}' | ` +
        `Select-Object CommandLine,@{n='Started';e={$_.CreationDate.ToUniversalTime().ToString('o')}} | ConvertTo-Json -Compress`],
      { encoding: "utf8" },
    ).trim();
    return out ? JSON.parse(out) : null;
  } catch {
    return null;
  }
}

const pids = () => {
  try {
    return JSON.parse(readFileSync(`${LOCAL}/data/pids.json`, "utf8"));
  } catch {
    return {};
  }
};

// ---- 1. services ----

const SERVICES = [
  ["console (akka daemon)", 9889],
  ["loan-origination", 9089],
  ["optimize", 9090],
  ["portfolio", 9091],
  ["gateway-router", 9092],
  ["capture-refinery", 9093],
  ["trainer", 9094],
  ["registry", 9095],
  ["trace-ledger", 9096],
  ["agentgateway", 8390],
  ["stub models", 8391],
];

/**
 * Signs that another session is compacting or backing up the trace ledger: an H2 tool running on
 * its database, H2's compaction temp file, a backup in the last hour, a database write in the last
 * two minutes, or a
 * pids.json entry for the ledger that is not the service's own. Between stopping the ledger and
 * starting its tool such a session leaves no sign at all, which is why a down ledger is only
 * started on --start-ledger.
 */
function ledgerMaintenance() {
  const recent = (path, minutes) => existsSync(path) && Date.now() - statSync(path).mtimeMs < minutes * 60_000;
  const files = existsSync(LEDGER_DATA) ? readdirSync(LEDGER_DATA) : [];
  const signs = [
    ...files.filter((n) => /backup/i.test(n) && recent(join(LEDGER_DATA, n), 60)).map((n) => `recent backup ${n}`),
    ...files.filter((n) => n.endsWith(".tempFile")).map((n) => `H2 temp file ${n}`),
    ...files.filter((n) => n.endsWith(".mv.db") && recent(join(LEDGER_DATA, n), 2)).map((n) => `${n} written in the last 2 minutes`),
    ...Object.keys(pids()).filter((k) => /ledger|compact|backup/i.test(k) && k !== "svc-trace-ledger").map((k) => `pids.json entry ${k}`),
  ];
  try {
    const tools = execFileSync("powershell", ["-NoProfile", "-Command",
      "@(Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -match 'org\\.h2\\.tools' -and $_.CommandLine -match 'trace-ledger' }).Count"],
    { encoding: "utf8" }).trim();
    if (Number(tools) > 0) signs.push("an H2 tool is running on the ledger's database");
  } catch {
    // no process list: the other signs stand
  }
  return signs;
}

async function services() {
  log("1. services");
  const down = [];
  for (const [name, port] of SERVICES) {
    const up = await portOpen(port);
    log(`   ${name.padEnd(22)} :${port}  ${up ? "up" : "DOWN"}`);
    if (!up) down.push(port);
  }
  if (down.includes(9889)) {
    throw new Error("the console daemon is down: start it with `python optimize-local/stack.py console-restart` " +
      "(it leaves the Java services running), then run this again");
  }
  if (down.includes(8390) || down.includes(8391)) {
    log("   starting the stub models and agentgateway: stack.py up");
    stack(["up"]);
  }
  if ([9090, 9091, 9092, 9093, 9094, 9095].some((p) => down.includes(p))) {
    log("   starting the akka-optimize services that are down: stack.py services-direct (mvn compile exec:java each)");
    stack(["services-direct"]);
  }
  if (down.includes(9096)) {
    const busy = ledgerMaintenance();
    if (flags.has("--start-ledger") && busy.length === 0) {
      log("   starting the trace ledger as stack.py restart does (mvn compile exec:java, logs/trace-ledger.log)");
      startSample("trace-ledger", 9096, {});
    } else {
      log(`   trace ledger down${busy.length ? ` and being maintained (${busy.join("; ")})` : ""}: waiting up to ` +
        "30 minutes for it to come back, not starting it (--start-ledger starts it when nothing maintains it)");
      if (!(await waitPort(9096, 30 * 60))) throw new Error("the trace ledger did not come back within 30 minutes");
      log("   trace ledger back");
    }
  }
  if (down.includes(9089)) {
    log("   starting Loan Origination on the local gateway as stack.py restart does");
    startSample("loan-origination", 9089, { LOAN_MODEL_PROVIDER: "local-gateway" });
  }
}

function startSample(name, port, extra) {
  const env = JSON.stringify({ MAVEN_OPTS: "-Djava.net.preferIPv4Stack=true", ...extra });
  stack([], [
    "import json, os, stack",
    `stack.start_maven_service(${JSON.stringify(name)}, os.path.join(stack.SAMPLES, ${JSON.stringify(name)}), ${port}, json.loads(${JSON.stringify(env)}))`,
  ].join("\n"));
}

// ---- 2. Loan Origination on the local gateway ----

/**
 * Asks the support assistant a question and checks that its model calls crossed the gateway: the
 * turn's flow in the ledger counts gateway exchanges only for calls agentgateway carried.
 */
async function loanOnGateway() {
  log("2. Loan Origination's model calls go through the local gateway");
  const turn = await loan("POST", `/playground/judges/${CHOSEN.playgroundJudge}/turns`, UNDERWRITER, {
    sessionId: null,
    message: "What documents do I need to send for a car loan?",
  });
  if (turn.status !== 200) throw new Error(`playground turn: ${turn.status} ${JSON.stringify(turn.body)}`);
  for (let i = 0; i < 30; i++) {
    const flows = await companion(`/traces/flows?period=15m&service=${SYSTEM}&session=${turn.body.sessionId}&limit=10`);
    const flow = flows.rows.find((r) => r.modelCalls > 0);
    if (flow) {
      if ((flow.gateway?.exchanges ?? 0) > 0) {
        log(`   yes: ${flow.modelCalls} model calls, ${flow.gateway.exchanges} gateway exchanges (models ${flow.models.join(", ")})`);
        return turn.body.sessionId;
      }
      if (i > 10) break;
    }
    await sleep(2000);
  }
  // Calls that reach the stub models only through agentgateway have exchanges; none means another provider.
  log("   NO: restarting Loan Origination with LOAN_MODEL_PROVIDER=local-gateway");
  const listener = pids()["svc-loan-origination"];
  if (listener) stack([], `import stack; stack.kill_tree(${Number(listener)})`);
  for (let i = 0; i < 60 && (await portOpen(9089)); i++) await sleep(1000);
  if (await portOpen(9089)) {
    throw new Error("Loan Origination is not on the local gateway and :9089 is held by a process stack.py did not " +
      "start: run it with akka_local_run_service and LOAN_MODEL_PROVIDER=local-gateway");
  }
  startSample("loan-origination", 9089, { LOAN_MODEL_PROVIDER: "local-gateway" });
  return loanOnGateway();
}

// ---- 3. oversight ----

async function humanEvents(query) {
  return (await companion(`/human/events?system=${SYSTEM}&${query}`)).rows;
}

async function oversight() {
  log("3. oversight events and workflows");
  const today = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  const live = (await humanEvents("state=pending")).filter((e) => !e.simulated && e.id.includes(today));
  const monitors = ["custom-5a1e00000002", "custom-5a1e00000003", "custom-5a1e00000004"];
  if (monitors.every((c) => live.some((e) => e.control.rowId === c))) {
    log(`   already raised today: ${live.length} live events, every monitor among them`);
    return;
  }
  log("   running scripts/drive-oversight.mjs (about 3 minutes)");
  const r = spawnSync(process.execPath, ["scripts/drive-oversight.mjs"], { cwd: LOAN, encoding: "utf8" });
  console.log((r.stdout + r.stderr).trim().replace(/^/gm, "    "));
  if (r.status !== 0) throw new Error(`drive-oversight.mjs exited ${r.status}`);
  log("   waiting for the monitors (they evaluate once a minute)");
  for (let i = 0; i < 24; i++) {
    const now = (await humanEvents("state=pending")).filter((e) => !e.simulated && e.id.includes(today));
    const raised = monitors.filter((c) => now.some((e) => e.control.rowId === c));
    if (raised.length === monitors.length) {
      log(`   raised: ${now.length} live events`);
      return;
    }
    await sleep(5000);
  }
  problems.push("the oversight monitors had not raised all of S2, S3 and S4 within 2 minutes of drive-oversight.mjs");
}

// ---- 4. traffic ----

async function traffic() {
  log("4. gateway traffic");
  const pid = pids().traffic;
  const info = pid ? processInfo(pid) : null;
  const running = info?.CommandLine && TRAFFIC_ARGS.every((a) => info.CommandLine.includes(a));
  if (running) {
    ids.trafficStartedAt = info.Started;
    log(`   driver already running with ${TRAFFIC_ARGS.join(" ")} (pid ${pid}, since ${info.Started})`);
  } else {
    log(`   starting drive.py ${TRAFFIC_ARGS.join(" ")} in place of the stack's driver (pid in pids.json as "traffic")`);
    stack([], [
      "import os, sys, stack",
      "stack.traffic_stop()",
      `pid = stack.spawn("traffic", [sys.executable, "-u", os.path.join(stack.HERE, "drive.py"), ${TRAFFIC_ARGS.map((a) => JSON.stringify(a)).join(", ")}], stack.HERE)`,
      "print('traffic driver pid', pid, '(logs/traffic.log)')",
    ].join("\n"));
    ids.trafficStartedAt = new Date().toISOString();
  }
  save();
  const readyAt = Date.parse(ids.trafficStartedAt) + TRAFFIC_MINUTES * 60_000;
  log(readyAt <= Date.now()
    ? `   ready: running ${((Date.now() - Date.parse(ids.trafficStartedAt)) / 60000).toFixed(0)} minutes`
    : `   ready at ${new Date(readyAt).toLocaleTimeString()} (${TRAFFIC_MINUTES} minutes after it started)`);
  return readyAt;
}

// ---- 5. the underwriting application ----

/**
 * An application whose credit report is unavailable (a national ID starting UNAVAILABLE): the
 * workflow retries the bureau three times, fails over to a referral without a recommendation,
 * pauses for an underwriter, and resumes on the decision. The decline's rationale mentions the
 * applicant's health, which the notice writer's draft repeats and its guardrail blocks, so the
 * decision's trace runs endpoint, workflow, agent, model call and guardrail. (A decline the stub
 * answers with prose fails over to the standard letter in a later trace, outside the decision's.)
 * The decision sends no traceparent: a request that brings its own is not traced through to the
 * consumers and workflows it sets off.
 */
async function underwriting() {
  log("5. underwriting application: retries, failover, human review, decision");
  if (ids.applicationId && ids.decisionTraceId) {
    const c = await loan("GET", `/underwriting/cases/${ids.applicationId}`, UNDERWRITER);
    if (c.status === 200 && (await deepTrace(ids.decisionTraceId)).length === 0) {
      log(`   kept ${ids.applicationId} (decision trace ${ids.decisionTraceId})`);
      return;
    }
  }
  const run = Date.now().toString(36);
  const applicant = token(`preroll-${run}`, "applicant");
  const id = await submit(applicant, application(`Demo Applicant ${run}`, `UNAVAILABLE-${run}`, true));
  for (const type of ["PAYSLIP", "BANK_STATEMENT"]) {
    await loan("POST", `/applications/${id}/documents`, applicant, { type, reference: `dms://preroll/${id}/${type.toLowerCase()}.pdf` });
  }
  log(`   submitted ${id}; waiting for the bureau retries and the failover to refer it`);
  const status = await untilStatus(id, applicant, ["AWAITING_HUMAN_REVIEW", "APPROVED", "DECLINED"], 180);
  if (status !== "AWAITING_HUMAN_REVIEW") throw new Error(`application ${id} went to ${status}, not to review`);
  const opened = await loan("GET", `/underwriting/cases/${id}`, UNDERWRITER);
  if (opened.status !== 200) throw new Error(`open case ${id}: ${opened.status}`);
  log("   referred; the underwriter opens the case and decides after the minimum review time");
  await sleep(12_000);
  const decision = {
    outcome: "DECLINE",
    reasonCodes: ["ADVERSE_CREDIT_HISTORY"],
    rationale: "The bank statement shows two missed card payments. The applicant mentioned a health problem on the call.",
  };
  let decided;
  let sentAt;
  for (let attempt = 0; attempt < 3; attempt++) {
    sentAt = Date.now();
    decided = await loan("POST", `/underwriting/cases/${id}/decision`, UNDERWRITER, decision);
    const minimum = /at least (\d+) s/.exec(JSON.stringify(decided.body));
    if (decided.status !== 409 || !minimum) break;
    await sleep(Number(minimum[1]) * 1000);
  }
  if (decided.status !== 202) throw new Error(`decision on ${id}: ${decided.status} ${JSON.stringify(decided.body)}`);
  ids.applicationId = id;
  ids.applicant = `preroll-${run}`;
  ids.decisionTraceId = await decisionTrace(sentAt - 1000);
  save();
  log(`   decided; trace ${ids.decisionTraceId}`);
}

/** The decision flow started since `since` (the only one: the pre-roll decides one case at a time). */
async function decisionTrace(since) {
  let flow;
  for (let i = 0; i < 45; i++) {
    const flows = (await companion(`/traces/flows?period=15m&service=${SYSTEM}&limit=100`)).rows;
    flow = flows.find((f) => f.title.startsWith("POST /underwriting/cases") && Date.parse(f.startedAt) >= since);
    if (flow && (await deepTrace(flow.traceIds[0])).length === 0) return flow.traceIds[0];
    await sleep(2000);
  }
  if (!flow) throw new Error("the decision's flow did not reach the ledger within 90 s");
  return flow.traceIds[0];
}

/** What a decision trace lacks of endpoint, workflow, agent, model call and guardrail. */
async function deepTrace(traceId) {
  const names = (await companion(`/traces/${traceId}`)).spans.map((s) => s.name ?? "");
  const want = [/^POST \/underwriting/, /^Workflow: underwriting/, /^Agent: notice-writer/, /^LLM call/, /^Guardrail/];
  return want.filter((re) => !names.some((n) => re.test(n))).map(String);
}

// ---- 6. the other IDs ----

async function check(name, fn) {
  try {
    const note = await fn();
    log(`   ${name}: ok${note ? ` (${note})` : ""}`);
  } catch (e) {
    problems.push(`${name}: ${e.message}`);
    log(`   ${name}: FAILED ${e.message}`);
  }
}

async function otherIds(sessionId) {
  log("6. the IDs the scenes need");
  ids.supportSessionId = sessionId;
  await check("decision trace (endpoint, workflow, agent, model call, guardrail)", async () => {
    const missing = await deepTrace(ids.decisionTraceId);
    if (missing.length) throw new Error(`decision trace lacks ${missing.join(", ")}`);
  });
  await check("control", async () => {
    const controls = await companion(`/policies/${SYSTEM}/controls`);
    const row = controls.rows.find((r) => r.row_id === CHOSEN.control);
    if (!row) throw new Error(`${CHOSEN.control} is not in the bundle`);
    ids.controlId = CHOSEN.control;
    return row.name;
  });
  await check("verdict", async () => {
    const v = await companion(`/verdicts/${SYSTEM}/verdict/${CHOSEN.verdict}`);
    ids.verdictId = CHOSEN.verdict;
    return `${v.verdict.conclusion} ${v.verdict.outcome}`;
  });
  await check("change", async () => {
    const c = await companion(`/optimize/changes/${CHOSEN.change}?profile=${PROFILE}`);
    ids.changeId = CHOSEN.change;
    return `${c.kind ?? c.change?.kind} ${c.state ?? c.change?.state}`;
  });
  await check("training run with a replay", async () => {
    const run = await optimize("training", "runs", "get", CHOSEN.trainingRun);
    const points = await optimize("training", "runs", "metrics", CHOSEN.trainingRun);
    if (run.phase !== "COMPLETED" || points.length < 20) throw new Error(`${run.phase}, ${points.length} steps`);
    ids.trainingRunId = CHOSEN.trainingRun;
    ids.trainingRunModel = run.modelId;
    return `${run.modelId}, ${points.length} steps`;
  });
  await check("captured pipeline replay (candidate scores)", async () => {
    await companion(`/replay/training-runs/${CHOSEN.pipeline}`);
    ids.pipelineReplay = CHOSEN.pipeline;
  });
  await check("serving endpoint and adapter", async () => {
    const { endpoints } = await optimize("training", "endpoints", "list");
    const endpoint = endpoints.find((e) => e.phase === "READY" && e.baseModel === CHOSEN.endpointBase);
    if (!endpoint) throw new Error(`no ready endpoint serves ${CHOSEN.endpointBase}`);
    ids.servingEndpoint = endpoint.endpointId;
    ids.adapter = CHOSEN.adapter;
    const on = endpoint.models.some((m) => m.model === CHOSEN.adapter);
    return `${CHOSEN.adapter} is ${on ? "already ON (turn it off before recording 4.6)" : "off"} at ${endpoint.endpointId}`;
  });
  await check("routing use case for the canary", async () => {
    const t = Buffer.from(JSON.stringify({ alg: "none" })).toString("base64url") + "." +
      Buffer.from(JSON.stringify({ sub: "dev/optimize-local" })).toString("base64url");
    const policy = await json(`http://127.0.0.1:9090/v1/optimize/policy/${CHOSEN.useCase}`, { headers: { Authorization: `Bearer ${t}` } });
    const latest = policy.versions.at(-1);
    ids.canaryUseCase = CHOSEN.useCase;
    return `v${policy.versions.length}: ` + latest.destinations.map((d) => `${d.model} ${d.mode} ${d.sharePercent}%`).join(", ");
  });
  save();
}

// ---- 7. console mode ----

async function mode() {
  log("7. console mode");
  const now = await companion("/mode");
  if (now.mode !== "demo") await companion("/mode", { ...post({ mode: "demo" }), method: "PUT" });
  log(`   ${now.mode === "demo" ? "already Demo" : "set to Demo"}; the theme is the browser's: see the notes below`);
}

// ---- 8. the S1 extension event ----

async function s1() {
  log(`8. an open S1 extension event with at least ${SLA_MINUTES} minutes of its SLA left`);
  const open = (await humanEvents(`state=OPEN&control=${CHOSEN.control}`)).filter(
    (e) => !e.simulated && /by 28 days/.test(e.subject.summary) && Date.parse(e.sla.dueAt) - Date.now() > SLA_MINUTES * 60_000,
  );
  if (open.length > 0 && !flags.has("--fresh-s1")) {
    ids.humanEventId = open[0].id;
    ids.humanEventDueAt = open[0].sla.dueAt;
    save();
    log(`   kept ${open[0].id}, due ${new Date(open[0].sla.dueAt).toLocaleTimeString()}`);
    return;
  }
  const run = Date.now().toString(36);
  const applicant = token(`preroll-abroad-${run}`, "applicant");
  const id = await submit(applicant, application(`Demo Applicant ${run}`, `NL-${run}0001`, true));
  await untilStatus(id, applicant, ["DOCUMENTS_REQUESTED"], 60);
  const turn = await loan("POST", `/playground/judges/${CHOSEN.playgroundJudge}/turns`, UNDERWRITER, {
    sessionId: null,
    message: `Could I have 28 more days for application ${id}? I am abroad until November.`,
  });
  if (turn.status !== 200) throw new Error(`S1 turn: ${turn.status} ${JSON.stringify(turn.body)}`);
  const ref = /he-\d{8}-[0-9a-f]+/.exec(turn.body.reply ?? "")?.[0];
  if (!ref) throw new Error(`S1: the assistant raised no event: ${turn.body.reply}`);
  const event = await companion(`/human/events/${ref}`);
  ids.humanEventId = ref;
  ids.humanEventDueAt = event.sla.dueAt;
  ids.s1SessionId = turn.body.sessionId;
  ids.s1TraceId = event.subject.traceId;
  save();
  log(`   raised ${ref} on ${id}, due ${new Date(event.sla.dueAt).toLocaleTimeString()}`);
}

// ---- the run ----

try {
  await services();
  const sessionId = await loanOnGateway();
  await oversight();
  const readyAt = await traffic();
  await underwriting();
  await otherIds(sessionId);
  await mode();
  if (WAIT && readyAt > Date.now()) {
    log(`waiting ${((readyAt - Date.now()) / 60000).toFixed(1)} minutes for the traffic`);
    await sleep(readyAt - Date.now());
  }
  await s1();
  ids.preparedAt = new Date().toISOString();
  save();
} catch (e) {
  problems.push(e.message);
}

const routes = {
  "2.1 workflow replay": `/activity/replay/workflow/${SYSTEM}/underwriting/${ids.applicationId}`,
  "2.2 trace": `/activity/traces/${ids.decisionTraceId}`,
  "2.3 playground": `/inference/playground/${SYSTEM}/${CHOSEN.playgroundJudge}`,
  "3.1 human event": `/human/events/${ids.humanEventId}`,
  "3.2 controls": "/controls?view=controls",
  "3.3 verdict": `/evidence/verdicts/${ids.verdictId}`,
  "4.3 change": `/cost/changes/${ids.changeId}`,
  "4.5 training replay": `/activity/replay/training/${ids.trainingRunId}`,
  "4.6 serving / routing": "/inference?view=serving, /inference?view=routing",
};
console.log("\nIDs (demo/full/ids.json):");
console.log(JSON.stringify(ids, null, 2));
console.log("\nRoutes:");
for (const [k, v] of Object.entries(routes)) console.log(`  ${k.padEnd(22)} ${v}`);
console.log(`
Notes for the recorder:
  - Theme: the console follows the browser (next-themes, "system"); record with colorScheme "dark",
    or set localStorage "theme" to "dark" in an init script.
  - ${ids.humanEventId} times out to DENY at ${ids.humanEventDueAt ? new Date(ids.humanEventDueAt).toLocaleTimeString() : "?"}; record scene 3.1 before then, or rerun with --fresh-s1.
  - Traffic ready at ${ids.trafficStartedAt ? new Date(Date.parse(ids.trafficStartedAt) + TRAFFIC_MINUTES * 60_000).toLocaleTimeString() : "?"}.`);
console.log(`\npre-roll took ${((Date.now() - t0) / 1000).toFixed(0)} s`);
if (problems.length) {
  console.log("\nPROBLEMS:");
  for (const p of problems) console.log(`  - ${p}`);
  process.exit(1);
}
