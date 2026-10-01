# AI Governance Demo — Presenter Runbook

*Desktop / browser instructions for driving the deck + demos as if presenting live.
Companion to `README.md` (spec), `SPEAKER-NOTES.md` (talk-track).*

Duration budget: ~45 min presentation + ~15 min Q&A (adjust to slot).

For a customer-specific session, work from that customer's own copy of this file at
`~/akka/customers/<name>/PRESENTER-RUNBOOK.md` if one exists — it may carry
engagement-specific timing, blockers, or asks on top of the mechanics below.

---

## 0. Pre-flight — the day before

### 0.1 Machine + software checklist

- [ ] macOS with JDK ≥ 21 (JDK 27 works — cross-compile is fine).
- [ ] Maven 3.9+.
- [ ] `~/.m2/settings.xml` has the Akka token (`https://repo.akka.io/maven/` server +
  repository blocks per `account.akka.io/token`).
- [ ] `chmod 600 ~/.m2/settings.xml` — tighten permissions.
- [ ] Chrome (any recent version) as the presentation browser.
- [ ] Slack + Gmail closed or muted (Do Not Disturb on).
- [ ] External display cable / adapter in bag. Test HDMI/USB-C output at least once.

### 0.2 Warm the Maven cache (do this once, day-of setup is faster)

```bash
cd ~/akka/governance-explainability
mvn -f services/workbench-svc/pom.xml -q -DskipTests dependency:resolve
```

Expected: exit 0, ~5 min first time, seconds thereafter.

### 0.3 Build the deck

```bash
cd ~/akka/presentations/_wip/governance
python3 builder/build.py --mode overview --presenter <name>
```

Output: `generated/overview/index.html` (~60 KB).

---

## 1. Desktop layout — what to have open when the session starts

Arrange these BEFORE joining the call. Use ⌘⇥ / Mission Control to move between:

| # | Window | State | Position |
|---|---|---|---|
| **1** | **Chrome — deck tab** at `file:///.../_wip/governance/generated/overview/index.html` | Fullscreen (F key) | Primary display |
| **2** | **Chrome — Demo 1 workbench tab** at `http://127.0.0.1:8730/` — pre-loaded, survey landing | Regular tab, adjacent | Same window as (1) |
| **3** | **Chrome — Console tab** at `http://127.0.0.1:9889` — pre-loaded to Dashboard | Regular tab | Same window as (1) |
| **4** | **Terminal — service log** running the workbench-svc (see §2.1) | 40-col wide, visible | Second display (or hidden until needed) |
| **5** | **VS Code / editor** with `SPEAKER-NOTES.md` open | Second display or ⌘⇥ target | Secondary display |

Rule of thumb: **only the deck tab is ever shared to the room**. Demo 1 and the console
get their own tab switches (Chrome tab bar visible for a moment is fine — just don't
linger). Terminal and notes never make the shared feed.

---

## 2. Environment setup — the 10 minutes before you dial in

### 2.1 Start Demo 1 workbench

**Terminal window 4** (long-running):

```bash
cd ~/akka/governance-explainability
PROJECT_ROOT=./demo REPO_ROOT=. mvn -f services/workbench-svc/pom.xml -q compile exec:java
```

Wait ~33 seconds. When you see logs steady, verify:

```bash
# separate terminal
curl -s http://127.0.0.1:8730/api/overview | python3 -m json.tool | head -20
```

Should print JSON with a `matrix_id` and control counts. **If it doesn't, do NOT go
live** — see §5.1 recovery.

### 2.2 Smoke-test Demo 1 in the browser (2 min)

Open **Chrome tab 2** at `http://127.0.0.1:8730/`. Click through each of these once:

1. Survey UI loads. **PASS if visible immediately, no "Connecting…" banner.**
2. Answer one survey question — the derived-controls drawer should populate immediately.
   **PASS if no error banner appears.**
3. Click a row's expand caret — the row should reveal a `corpus ref` line showing which
   regulation article the control derives from. **PASS if you see the citation text.**
4. Cycle the tab strip: Derived / Inherited / Custom / Retired. **PASS if each tab
   renders rows.**
5. Click **Sign**. A new `.gcc` bundle should appear under `demo/governance/signed/`.
   **PASS if a bundle file lands on disk.**

*Any FAIL = escalate before dial-in; do not present Demo 1 broken.*

### 2.3 Stage Chrome tab 3 on the console

Open **Chrome tab 3** at `http://127.0.0.1:9889` (start it first per §2.5) and leave it on
**Dashboard**. Navigate to Canvas / Verify / Optimize live during the actual demo beats,
not ahead of time.

### 2.4 Load the deck fullscreen

Open **Chrome tab 1** at
`file:///Users/smittyweygant/akka/presentations/_wip/governance/generated/overview/index.html`.
Press **F** (or ⌃⌘F) for fullscreen. Verify the title slide lands cleanly with your
name/title.

### 2.5 Start the local console (Specify / Verify / Optimize / Canvas)

The console lives in `~/akka/akka-console-ai-canvas` (Tyler's repo) and drives a complete
local Akka console — Specify, Verify (Controls/Risk/Traces/Replay/Verdicts), Optimize, and
the **Canvas** NL-question flow that backs the live-query demo beat.

**One-time machine setup** (skip once already done on a given machine):

1. Repos nested inside `~/akka/akka-console-ai-canvas/`: `kalix-console`
   (branch `ai-canvas-prototype`), `akka-cli` (branch `console-companion`), `nexus`
   (branch `local/trace-hooks`, with `migration/nexus-local-config.patch` applied).
   Restore from `migration/README.md` if these ever need re-cloning on another machine.
2. `~/.akka/local/canvas/profiles.json` — machine-specific paths (this machine's
   explainability checkout, `ask.cwd`, `projects.roots`, etc). Copy
   `canvas-bridge/profiles.example.json` and fill in per `docs/setup.md` §2 if missing.
3. `python3 -m pip install --user PyYAML` — the governance adapter's only Python
   dependency.
4. Toolchain: Node 22+, pnpm 10+ (`npm install -g pnpm@10.24.0`), Go 1.24+, protoc
   (`brew install protobuf`), jq.
5. One-time builds:
   ```bash
   cd ~/akka/akka-console-ai-canvas/akka-cli
   make generate-proto PROTOC_GEN_GO="$(go tool -n protoc-gen-go)" \
     PROTOC_GEN_GO_GRPC="$(go tool -n protoc-gen-go-grpc)"
   make download-local-console-assets build-reliability-dashboard
   cd ../kalix-console && pnpm install
   cd ../nexus && go -C cli build -o target/akka-optimize ./cmd/akka-optimize
   ```

**Every time you want to run it** — rebuild the embedded console + CLI (picks up any new
commits) and start the daemon:

```bash
cd ~/akka/akka-console-ai-canvas
bash scripts/build-akka-with-console.sh
akka-cli/build/akka local stop        # no-op if not running
akka-cli/build/akka local start       # backgrounds itself; daemonizes
akka-cli/build/akka local status      # confirm: HTTP localhost:9889
```

Open **`http://localhost:9889`**. Left nav: Dashboard / **Canvas** / Services / Specify
(Specs, Docs, Auditors, Exit conditions) / Verify (Risk, Controls, Evaluations, Red
teaming, Traces, Replay, Verdicts, Compliance). Canvas ships starter questions — good for
a first smoke test.

**`optimize-local` synthetic stack** backs the Optimize pages. Bring it up from a cold
machine:

```bash
cd ~/akka/akka-console-ai-canvas/nexus
mvn -pl .,optimize,portfolio,trainer,registry,gateway-router,capture-refinery \
  -am install -DskipTests -Dnon-akka-service=true -Dspotless.skip=true
```

`-Dspotless.skip=true` works around a real bug, not a preference: the repo's formatting
check reflects into javac internals that newer JDKs removed, so a couple of services fail
to build without it.

```bash
cd ~/akka/akka-console-ai-canvas/optimize-local
python3 stack.py up                       # stub backends + agentgateway
python3 stack.py services-direct --discover   # 6 services, ~1-2 min cold
python3 seed.py all                       # catalog, routing, training, ~7 min
```

Then restart `gateway-router` **without** discovery (discovery-on grows its H2 file fast
and is only needed for the seed's `discovery`/`manifest`/`traffic` steps):

```bash
python3 -c "import json; p=json.load(open('data/pids.json')); \
import os,signal; os.kill(p.pop('svc-gateway-router'),signal.SIGTERM); \
json.dump(p, open('data/pids.json','w'))"
python3 stack.py services-direct          # no --discover; only relaunches gateway-router
python3 stack.py traffic 3                # ongoing traffic, 3 conversations/min
python3 check.py                          # verify — every Optimize-page command, one line each
```

Spend pages read "Not measured" / 0 exchanges until traffic has run long enough to
complete a conversation (5 idle minutes) and cross into the next whole UTC hour — this is
expected, not a failure.

**If the Optimize page shows a JWT / token-validation error**: the tab's Environment
dropdown (top right, next to Period) is on a real hosted cluster profile instead of
`optimize-local`. Switch it via that dropdown. `profiles.json` should list
`optimize-local` first among any "optimize"-named keys
(`curl -s http://localhost:9889/api/companion/profiles`).

### 2.6 Deck navigation controls

Deck is driven by keyboard — never the mouse, never a clicker unless tested against this
deck's key bindings.

| Action | Keys |
|---|---|
| Next slide | **PgDn**, **→**, **↓**, or **Space** |
| Previous slide | **PgUp**, **←**, or **↑** |
| Jump to title | scroll to top (⌘↑) |

`shell/nav.js` handles PgDn with smooth scroll to the next registered wrapper — do NOT
resize the window mid-deck; layout shifts break the section rail's active-slide
detection. **Keep this file's `views` list in sync with `builder/slide-registry.json` by
hand any time slides are added, removed, or renamed** — `getElementById` silently drops a
stale id instead of erroring, so the symptom of drift is "arrow keys jump past slides,"
not a build failure.

---

## 3. Slide-by-slide walk

Read talk-tracks from `SPEAKER-NOTES.md` — the notes are the source of truth; this table
is just cues + timing. Word budgets are enforced (≤70 words visible per slide) so the
audience has time to look at *you*, not the screen.

**Note:** this table reflects the deck as currently built. `README.md`'s "Known gaps"
section lists two corrections (slide 04's five vs. six control types; a missing
Principle-9 slide) not yet applied — update this table and the row below once those land.

| # | Slide title | Time | Key cue / action |
|---|---|---|---|
| 00 | Title | 1 min | Present the frame — governance-first operating model. |
| 01 | Your posture already exists; uniform enforcement doesn't | 3 min | Read Today / Akka / Result rows aloud. |
| 02 | Postures have a lifecycle | 3 min | Trace the cycle live. Demo 1 cue → tab-switch to workbench, **risk survey only — do not mention controls yet.** |
| 03 | What is a control? | 1 min | Provability-first definition, no analogy. No demo — sets up 04. |
| 04 | Control types | 3 min | **Currently shows six types including Policy — wrong, see README "Known gaps."** One grounded example per type. |
| 05 | Controls come from three sources | 3 min | Regulatory (badges), corporate, project-scoped. |
| 06 | Controls managed like software | 3 min | Bundle → Sign → Enforce → Release. Name who signs and what happens on a new release. |
| 07 | Every control execution produces a verdict | 3 min | Upheld/Breached/Inconclusive/Error, tamper-evident log. Canvas walkthrough live (§4.2). |
| 08 | Environments keep the lifecycle continuous | 3 min | Pre-production / Documents / Production. Frame around continuity, not just a taxonomy. |
| — | *(no slide — Principle 9, gateway enforces Akka + non-Akka agents)* | — | See README "Known gaps." |
| 09 | Drift is a pattern change in the verdict ledger | 3 min | Real console vocabulary and grounding examples. Verdicts/Replay walkthrough (§4.3). |
| 10 | The AI gateway makes every token observable | 3 min | Govern / Optimize / Iterate. Optimize walkthrough live (§4.4). |
| zz | Thank you | 1 min | Open the floor. |

**Total speaking + demo time**: ~33 min at pace above (leaves ~12 min for Q&A on a 45-min
slot).

---

## 4. Demo runbooks

### 4.1 Demo 1 — Risk survey → derived controls → signed bundle *(after Slide 02)*

**Precondition**: workbench-svc up (§2.1), Tab 2 pre-loaded, smoke test passed.

**Beats (target ~5 min)**:

1. **Tab-switch to Tab 2.** Introduce the demo system under governance.
2. **Answer one survey question** — pick any. Point out: "One answer, controls
   auto-derived — sourced by article from the regulatory corpus."
3. **Expand a row.** Point at the `corpus ref` line: "Every derived control carries the
   exact citation it came from. When the corpus rolls, we know which controls to
   re-verify."
4. **Cycle the tab strip.** "Derived, Inherited, Custom, Retired — same model, different
   provenance."
5. **Click Sign.** Point at the timestamp badge ticking up. Say the honest integrity
   paragraph from `SPEAKER-NOTES.md` Slide 06 — you're previewing a beat a few slides
   ahead.
6. **Tab-switch back to the deck.** Continue to Slide 03.

**Fallback (if the workbench doesn't respond)**: skip live, describe verbally, use a
pre-seeded bundle under `demo/governance/signed/` — open in a text editor if pressed.

### 4.2–4.4 Console demo track — one running console, three cues

All three demo beats below use the same running console at `http://127.0.0.1:9889`
(build/start steps: §2.5), different pages, different points in the deck.

#### 4.2 Canvas walkthrough *(after Slide 07)*

**Precondition**: Console running, left nav on **Canvas**, starter questions smoke-tested
this session.

**Beats (target ~3 min)**:

1. **Tab-switch to the console, Canvas.** Say: "Instead of a static dashboard, we ask the
   platform directly — it generates the view."
2. **Ask a starter question** (or a pre-tested ad-hoc one) that touches controls or
   evidence.
3. **Confirm a live policy violation is visible** somewhere in the result or a follow-up
   question — this is the key thing to show, not optional flavor.
4. **Tab-switch back to the deck.** Continue to Slide 08.

#### 4.3 Verdicts/Replay walkthrough (drift) *(after Slide 09)*

Query the same control live in **Verify → Verdicts** across two time points, then open
**Verify → Replay** on the session behind an anomalous verdict to show *why* it happened,
not just that it did.

#### 4.4 Optimize walkthrough (cost) *(after Slide 10)*

**Precondition**: `optimize-local` synthetic stack running AND seeded with traffic —
check `cd ~/akka/akka-console-ai-canvas/optimize-local && python3 stack.py status` for
service health, then confirm the Spend page shows non-zero exchanges before the session.

**Beats (target ~2 min)**:

1. **Tab-switch to the console, Optimize → Spend.** Say: "Every token, every model,
   tagged by business construct — department, use case, region."
2. **Ask Canvas a cost question live** — pre-test any variant before relying on it in the
   room.
3. **Tab-switch back to the deck** for the close.

**Fallback (no seeded traffic, or Optimize errors)**: narrate the page structure without a
live number, and land the cost-governance point verbally on Slide 10 using the
Govern/Optimize/Iterate framing already in the slide copy.

---

## 5. Recovery from common failure modes

### 5.1 Workbench-svc won't start

```bash
# 1. Is port 8730 already bound?
lsof -ti:8730

# 2. If yes, whose PID? (probably a stale Java from earlier)
ps -o pid,command -p $(lsof -ti:8730)

# 3. Kill it and retry
lsof -ti:8730 | xargs kill
```

If Maven can't resolve dependencies — verify `~/.m2/settings.xml` still has the akka-repo
token and try `mvn -q -DskipTests dependency:resolve` alone before `exec:java`.

### 5.2 Deck won't build

`python3 builder/build.py --mode overview 2>&1 | tail -20` — if a slide's `meta.json` is
malformed, the traceback names the file.

### 5.3 A slide lands with content clipped

Every slide is designed to fit at 860px usable height. If content still clips in your
projector's resolution, that's a projector aspect ratio mismatch — press **⌘0** to reset
zoom, or **F** to toggle fullscreen off/on. Do NOT edit CSS live.

### 5.4 You lose the deck to a screen sleep / lock

`⌘⇧F` toggles fullscreen back. `⌘R` reloads without losing progress (deck is stateless —
starts at the title slide again; PgDn until you're back).

### 5.5 A demo hangs mid-click

Never wait longer than 5 seconds. Say the punchline verbally and move on. The audience
will forgive a slow tab far less than a silent presenter watching a spinner.

---

## 6. Post-session cleanup

```bash
# 1. Stop the workbench-svc
lsof -ti:8730 | xargs kill 2>/dev/null

# 2. Any test .gcc bundles produced during the demo
cd ~/akka/governance-explainability
git status demo/governance/signed/
# If new bundles are demo artifacts you don't want to commit:
#   git checkout -- demo/governance/signed/       # discards them

# 3. Close Chrome tabs.
```

---

## 7. One-page cheat sheet (print or keep on a phone)

```
DECK             file:///Users/smittyweygant/akka/presentations/_wip/governance/generated/overview/index.html
DEMO 1 URL       http://127.0.0.1:8730/
DEMO 1 START     cd ~/akka/governance-explainability
                 PROJECT_ROOT=./demo REPO_ROOT=. mvn -f services/workbench-svc/pom.xml -q compile exec:java
DEMO 1 STOP      lsof -ti:8730 | xargs kill
CONSOLE          http://localhost:9889  (Canvas / Verify / Optimize in left nav)
CONSOLE START    cd ~/akka/akka-console-ai-canvas && bash scripts/build-akka-with-console.sh \
                 && akka-cli/build/akka local stop; akka-cli/build/akka local start
CONSOLE STOP     cd ~/akka/akka-console-ai-canvas && akka-cli/build/akka local stop
OPTIMIZE STATUS  cd ~/akka/akka-console-ai-canvas/optimize-local && python3 stack.py status
OPTIMIZE RESTART cd ~/akka/akka-console-ai-canvas/optimize-local && python3 stack.py up \
                 && python3 stack.py services-direct && python3 stack.py traffic 3
OPTIMIZE STOP    cd ~/akka/akka-console-ai-canvas/optimize-local && python3 stack.py down \
                 && python3 stack.py services-direct-stop
NEXT SLIDE       PgDn / → / Space
PREV SLIDE       PgUp / ←
FULLSCREEN       F  (⌘⇧F to toggle)
BUILD DECK       cd ~/akka/presentations/_wip/governance && python3 builder/build.py --mode overview
```

---

*Reconstituted 2026-10-01 as the generic companion to `README.md`, split out of the
customer-specific runbook so every customer deck has a presenter runbook to start from.
Living doc.*
