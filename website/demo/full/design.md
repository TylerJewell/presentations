# Akka platform demo: design, draft 1

**Sources:**
- [positioning-brief.md](positioning-brief.md), from the competition folder;
- the survey of what the console can show live (its key routes are in the appendix).

**Length:** about 90 s of slides, presented by Tyler, then about 6:15 of live demo narrated in Tyler's
Professional voice.

**The idea: one application, carried end to end.** Loan Origination, a regulated lending system built on Akka,
goes from its specification, to the running system, to proof that it behaves, to running it efficiently. Every
past Akka demo told governance through the CLI and none showed one app through all four parts (the brief, §7).
The arc is the platform's own: *Specify → the SDK runtime → Verify → Optimize*, joined by one evidence record.
It ends on the promise: **Scale AI, Efficiently.**

The video has two must-have anchors: the self-documenting diagrams (Specify) and the live gateway on the big
screen (Optimize).

---

## Part 0 · Slides (0:00–1:30), Tyler presents

The slides come from the internal **Akka Intro** deck (`competition/_internal/console-demo-intro/index.html`), not the
sales deck.

| # | Slide | Its line | Time |
|---|---|---|---|
| 1 | Four things | "Safe, efficient AI needs four things": Factories, Agents, Governance, Models | 15 s |
| 2 | Integration today | "Today you integrate the AI parts": eight separate tools, and a question mark | 15 s |
| 3 | Shared constructs | "In Akka, AI constructs are shared." The Agentic AI Platform: Agents, Controls, Evals, Traces, Models, Runtime | 20 s |
| 4 | **The spine** | "Build, run, govern and optimize AI": Specify (AI factories), the SDK (agents), Verify (governance), Optimize (models) | 25 s |
| 5 | One binary | "An entire AI system in one binary": start, scale, recover | 15 s |

- **The handoff:** Tyler ends slide 5 with "Let me show you one system, through all four."
- **Kept back for Q&A:** slides 6 ("Deploy AI systems to any cloud") and 7 ("Akka works with what you run").
- **One wording fix:** slide 3 says "HITL"; the approved positioning says "Human". Change it before recording.

**How the demo follows slide 4:** each part opens on a chapter card in that slide's words. The four chapters are
**Build: AI factories (Specify)**, **Run: agents (SDK)**, **Govern: governance (Verify)** and **Optimize: models
(Optimize)**.

---

## Part 1 · Build: AI factories, Akka Specify (1:30–2:45)

**1.1 The spec** · `/build?view=specs`, spec 001 loan-intake-underwriting
- **Narration:** "This is a lending system: intake, underwriting, adverse-action notices, contests. It started as a
  specification, with user stories, requirements and the conditions it has to meet before it ships."
- **Shown:** the spec's user stories, then the folder: plan, tasks, data model, contracts.

**1.2 The system documents itself** · `/build?view=code`, the generated docs, **must-have**
- **Narration:** "Akka's harness agents built, tested and documented this service from that spec. Here is the
  documentation they generated. This is how an
  application is underwritten, step by step, across the agents, workflows and entities that do it."
- **Shown, full screen:** the Interaction diagram ("Underwriting one loan application"), then the Component graph,
  then the loan application lifecycle state machine.

**1.3 Conditions to ship** · `/build?view=exit` (Stages board), then `/test?view=integration`
- **Narration:** "Every condition the spec sets, like *a human decides every adverse action*, is checked by a test. I
  run it, and the condition turns green: specification to proof, before anything is deployed."
- **Shown:** the exit conditions board; run one auditor class with the live Maven panel; back to see Passed.

## Part 2 · Run: agents, the Akka SDK (2:45–4:00)

**2.1 Orchestration** · Replay the underwriting workflow
- **Narration:** "Here it is running. The underwriting workflow orchestrates identity, credit, affordability and an
  AI assessor. It pauses durably for a human, retries, and fails over safely, in one runtime, with state in memory
  and durable."
- **Shown:** the replay scrubber stepping through, including the human-review pause and the failover.

**2.2 One request, end to end** · a Loan Origination trace: waterfall, then Flow
- **Narration:** "One request: the endpoint, the workflow, the agent and its model call, and a guardrail stopping an
  answer it shouldn't give."
- **Shown:** the waterfall, then the Flow tab's component cards.

**2.3 An agent at work** · Playground, applicant-support with its judge
- **Narration:** "An applicant asks for more time. The agent looks up the application, calls a tool, answers,
  and a judge scores the answer. Because extending a deadline is a lending decision, it goes to a person."
- **Shown:** the reply, the tool-call card, the judge's verdict, and the new human event it raised.

## Part 3 · Govern: governance, Akka Verify (4:00–5:15)

**3.1 A person decides** · `/human/events/{id}`, the 28-day extension
- **Narration:** "That request is now in front of an officer, with the evidence, the judge's view and a deadline.
  The decision is recorded against the control that required it."
- **Shown:** the Journey, the case, then Start review → Approve → Submit, and the Journey closes.

**3.2 Controls enforced** · `/controls?view=controls`, one control's tray
- **Narration:** "Controls come from the regulations that apply, EU AI Act, fair lending and more, and they're
  enforced in the running system, not just watched."
- **Shown:** controls in force; one control's tray: obligations, human configuration, verdicts.

**3.3 Proof over time** · `/evidence?view=compliance`, then one verdict
- **Narration:** "And every verdict, every day, is evidence. Here's 120 days of it, with every change of controls
  marked: ready for an auditor."
- **Shown:** the compliance chart; click a day; open one verdict.

## Part 4 · Optimize: models, Akka Optimize (5:15–8:45)

**4.1 The gateway, live** · `/inference?view=gateway`, big-screen mode, **must-have**
- **Narration:** "Every model call goes through one gateway. This is it, live: callers on the left, models on the
  right, the width of each stream is the tokens flowing, and every exchange is captured as evidence."
- **Shown:** the animated flow, full frame. Select a destination; the canary fork to the small model.

**4.2 Where the money went** · `/cost?view=costs`
- **Narration:** "So cost is exact: what the AI system cost this week against last, by use case, laid out like a
  financial statement, with footnotes an auditor would expect."
- **Shown:** the cards, the table sorted by change, one row opened by model, the footnotes.

**4.3 Spend less, keep quality** · Price on another model → Preview as a change
- **Narration:** "And I can price this week's traffic on a cheaper model, then propose it as a change. Optimize
  trials it on real traffic and checks quality against the bar before anything rolls out."
- **Shown:** the If column, then the change page's cost and quality side by side.

**4.4 Train on your own data** · Training › Runs
- **Narration:** "You can also train your own small models on your proprietary datasets, on your own GPUs."
- **Shown:** the Runs list. No run is started: the demo shows a finished run (decided 2026-10-17).

**4.5 Replay the training** · `/activity/replay/training/{runId}`, run `41b5c135…` from `ids.json`
- **Narration:** "Here's a training run, replayed: the loss falling step by step as the model learns, until it's
  ready to evaluate against the model it would replace."
- **Shown:** the training replay's scrubber over the loss curve, 120 steps, with the loss going from 6.39 to 0.04.

**4.6 Serve it on our own inference** · Inference › Serving, then the refund-request policy's Route
- **Narration:** "When a model passes, we serve it on our own inference and send it a canary of one request in ten.
  Back on the gateway, there it is: the small model taking its share of live traffic."
- **Shown:** Serving, turning the adapter on, on a self-hosted endpoint (real); the refund-request policy's canary to
  the small model (already 10%); then a cut back to the big-screen gateway with the canary fork to support-slm.
  The trained adapter can't reach the gateway on the local stack, so the fork shown is the small-model family's.

## Close (8:45–9:00)

- **Narration:** "Specified, built, verified and optimized, on one platform. That's Akka: Scale AI, Efficiently."
- **Shown:** an end card.

**Running time:** about 7:30 of demo plus 1:30 of slides, about 9:00 in all, at the longer length as Tyler chose.

---

## What has to be built or prepared before recording

| # | Item | Why | Size |
|---|---|---|---|
| 1 | **A big-screen mode for the gateway's live view**: the flow canvas filling the frame, no page chrome, with a minimal legend | The canvas is fixed at 640 px inside the page; there's no fullscreen mode | about 1–2 h |
| 2 | **A presentation view for the generated docs**: wider than 1080 px, a diagram opened by itself full frame | The docs column is 1080 px with dark margins, and every section starts collapsed | about 1 h |
| 3 | **Regenerate Loan Origination's docs** (`/akka:docs`) | Generated 2026-09-27; they miss HumanEvent, Halt, ApplicantSupportAgent and the oversight components | minutes, writes `docs/` |
| 4 | **Pre-roll script:** the ledger up, Loan Origination on the local gateway, `drive-oversight.mjs`, traffic at 20–30/min for 15 min ahead, Demo mode, dark, nav collapsed, and the IDs captured (application, trace, event, session) | Human events are 0 now; the gateway is idle | about 1 h to script |
| 5 | **Slide fixes:** 01-hero, 13-customers, and a new handoff slide | Breaks the approved positioning | Tyler, or about 30 min |
| 6 | **Record after wave 2** | Cost page labels change (Costs, Potential savings, footnotes) | Running now |
| 7 | Professional voice | Training at ElevenLabs | 2–6 h |
| 8 | **Training sequence check:** a seeded, finished run with a good replay (loss curve and snapshots), the New run wizard reaching Start, an adapter that can be turned on in Serving, and a canary to it that the gateway shows | Not yet checked end to end on the local stack | about 1 h |

## Decided (Tyler, 2026-10-17)

- **Optimize's data:** use the simulated "Acme" traffic as it is; don't drive Loan Origination's agents for it.
- **The app's own UI:** skip it.
- **Streaming:** leave it out of the narration for now.
- **Length:** the longer cut, about 9:00 in all.
- **Must include:** training a small model, replaying the training, and serving it on self-hosted inference
  (4.4–4.6).

## Still open

1. Are slides 1–5 of the Akka Intro right, with 6 and 7 kept for Q&A?
2. Training on the local stack is simulated: the stub trainer finishes a run at once. 4.4 therefore shows the run
   starting, and 4.5 replays a seeded, finished run. Is that acceptable, or do you want the live run page to show the
   loss moving? That would need the stub trainer to report steps over a minute or two (about 1 h).

---

## Appendix: key routes and pre-roll

**Routes**

| Moment | Route |
|---|---|
| Specs | `/build?view=specs` |
| Docs | `/build?view=code` |
| Exit conditions | `/build?view=exit` |
| Tests | `/test?view=integration` |
| Workflow replay | `/activity/replay/workflow/loan-origination/underwriting/{applicationId}` |
| Trace | `/activity/traces/{traceId}` |
| Playground | `/inference/playground/loan-origination/support-answer-judge` |
| Human event | `/human/events/{eventId}` |
| Controls | `/controls?view=controls` |
| Evidence | `/evidence?view=compliance`, `/evidence/verdicts/{id}` |
| Gateway | `/inference?view=gateway&window=1m` |
| Costs | `/cost?view=spend` |
| Change | `/cost/changes/{id}` |
| New training run | `/training/runs/new` |
| Run page | `/training/runs/{runId}` |
| Training replay | `/activity/replay/training/{runId}` |
| Serving and Routing | `/inference?view=serving`, `/inference?view=routing` |

**The docs' diagrams:**
1. Entity diagram
2. Interaction diagram, "Underwriting one loan application"
3. Component graph
4. Notices and contests
5. Email delivery
6. Read models
7. Loan application lifecycle
8. Adverse-action notice lifecycle

They are static SVG in `<details>` sections, each 980 px wide.

**Pre-roll**
1. Start the trace ledger (:9096).
2. Run Loan Origination with `LOAN_MODEL_PROVIDER=local-gateway`.
3. Run `node scripts/drive-oversight.mjs` (in `samples/loan-origination`).
4. Start traffic with `python stack.py traffic 20`, or `drive.py run --rate 30 --workers 32 --arms`, 15 minutes ahead.
5. Choose Demo mode and the dark theme, collapse the nav, and turn off reduced motion in the OS.
