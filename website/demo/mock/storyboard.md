# Akka demo, 5-minute mock: storyboard

**What this is:** the plan for a playable HTML animatic (`demo/mock/index.html`): opening slides, the
platform's animations and mocked console scenes on one timeline of at most 5:00. No recording and no
voice. Narration shows as a caption and its time is estimated at 2.5 words a second. When the voice is
ready, the same lines become `narration.json`, and the console scenes become live recordings.

**Visual language:** the akka.io platform pages (`demo/research/akka-io/README.md`, code in
`C:\Users\tyler\competition\_internal\product-pages-pro\assets\site.{css,js}`): pure black, one yellow
`#FFCE4A`, Instrument Sans 700 tracked tight, Instrument Sans uppercase eyebrows (no rule beside them), a faint
48 px yellow dot grid, hairline cards, 0.8 s rise-in reveals, dashed flow rails, stroke-dash line draws,
count-ups. Status colours only for status: cyan `#00DBDD`, green `#72D35B`, red-orange `#FF5400`.

**Console scenes** are mocks in the console's own look (dark theme, the onramp mock kit
`docs/plans/gateway-onramp/onramp.css`, the Experiments mock `docs/plans/routing-experiments/experiments.html`,
the Controls board mock `docs/plans/workflow/board.html`), framed in a browser chrome with a breadcrumb.
A synthetic cursor glides and ripples on clicks. A spotlight dims everything but the subject.

**The idea:** one system, Loan Origination, and one loop that never stops. Every other demo shows
features. This one shows **a change travelling safely**: a spec becomes a system, a code change re-opens
its contract, a cheaper model earns its way into production through an experiment, and one evidence
record follows it the whole way. The promise lands at the end: **Scale AI, Efficiently.**

---

## Act 0 · Cold open (0:00–0:24)

**0.1 The pressure** (12 s)
- **Visual:** black. A count-up: the cost of intelligence falls "10×" a year while a demand curve draws on
  above it and keeps climbing. The two curves cross; the gap between them glows yellow.
- **Narration:** "The cost of intelligence falls ten times a year. Demand rises faster. The gap between
  them is where enterprises win or lose."

**0.2 Title** (12 s)
- **Visual:** dot grid fades in; hero type rises line by line, display size: "Scale AI," / "Efficiently."
  (yellow). AKKA mark lower left, eyebrow "THE AGENTIC AI PLATFORM".
- **Narration:** "The Akka Agentic AI Platform scales AI efficiently. Let's follow one system from
  specification to production."

## Act 1 · One platform (0:24–1:04)

**1.1 Four parts, one definition** (22 s)
- **Visual:** the family diagram. Four cards draw in on a spine: Specify (AI factories), SDK (agents),
  Verify (governance), Optimize (models). A yellow rail runs under all four labelled "one definition ·
  one runtime · one evidence record". Each card glows in turn as it's named.
- **Narration:** "The platform has four solutions: Akka Specify, the Akka SDK, Akka Verify and Akka
  Optimize. Specify builds systems from specifications. The Akka SDK runs them. Verify governs them.
  Optimize runs them on the right models. They share one definition of the system, one runtime and one
  evidence record."

**1.2 One binary** (18 s)
- **Visual:** the replica sequence: a single binary splits into replicas (Start), multiplies under load
  (Scale), one is struck with a red × and the others carry on (Recover). Counters tick: "99.9999%".
- **Narration:** "The whole system ships as one binary. It scales out under load and recovers on its own
  when a node fails, with no state lost."

## Act 2 · Build: from spec to proof (1:04–1:44)

**2.1 The shipping factory** (16 s)
- **Visual:** the Specify hero animation (site.js 196–312): named builds travel spec → build → gate →
  release; one fails an exit condition, BLOCKED in red-orange, loops back, then passes with ALL MET.
- **Narration:** "Our system is a loan origination assistant for a regulated lender. It started as a
  specification. A coding agent builds it with Akka Specify, and nothing ships until every condition in
  the spec is met."
- **Headline (draft):** "Nothing ships until every condition in the specification is met."

**2.2 Console: the conditions turn green** (24 s)
- **Visual (console mock, `Build › Stages`):** the spec's exit conditions as rows. The cursor runs the
  tests; rows flip from waiting to met one by one; the last, "A human decides every adverse action", turns
  green with its test name. A counter "17 of 17 met" → READY TO SHIP chip.
- **Narration:** "Every condition is checked by a test. When the last one passes, including that a human
  decides every adverse action, the system is ready to ship. The system is proven against its
  specification before it is deployed."
- **Headline (draft):** "Every condition is checked by a test."

## Act 3 · Govern: a contract that follows the code (1:44–3:02)

**3.1 The governance loop** (14 s)
- **Visual:** the Verify loop animation (site.js 314–354): six controls take turns (guardrail, sanitizer,
  evaluator, policy, human, audit); lines run out to systems and verdict tags pop: ALLOWED, BLOCKED,
  MASKED, ESCALATED; each adds an evidence row naming a regulation (EU AI Act, ECOA, GDPR).
- **Narration:** "Verify applies controls to any AI system: guardrails, sanitizers, evaluations,
  policies and people, and records every verdict as evidence against the regulations that apply."
- **Headline (draft):** "Verify applies controls to any AI system."

**3.2 Console: the Controls board, in force** (16 s)
- **Visual (console mock, `Verify › Controls`):** the one-view board. The lifecycle loop Adopt → Describe →
  Plan → Decide → Sign → In force across the top with "In force · v3" lit; the readiness board below with
  six green rows; the rail of contracts at left. Spotlight on "Bound to code": chips that name the agent,
  the guardrail and the prompt each control governs.
- **Narration:** "Here is the system's contract with its regulators: the controls it committed to,
  signed, and bound to the exact code that enforces them."
- **Headline (draft):** "The contract is bound to the code that enforces it."

**3.3 The code moves** (20 s)
- **Visual:** a code card slides in: a developer adds `String religion,` to the applicant record. The
  AI-BOM re-scans (a scan line sweeps the file). On the board, "Code in sync" flips red-orange, the
  **Amend** arc lights up with its trigger "code changed", and the readiness row lists "data types:
  financial, **religion** — confirm again".
- **Narration:** "Then the code changes. A developer adds a field the contract never covered. Akka reads
  the code, sees that the system now handles a protected characteristic, and re-opens the contract."
- **Headline (draft):** "The contract re-opens when the code changes."

**3.4 Decide and sign** (28 s)
- **Visual:** the cursor confirms the answer; two new controls derive from it and slide into the rows, each
  with its type chip and its bound target:
  - **Evaluation** · "Decisions don't rely on a protected characteristic": an evaluator judges every
    eligibility decision's rationale (bound to the eligibility assessor agent);
  - **Human** · "A flagged decision waits for an underwriter": any decision the evaluator fails is held for
    a person before it is issued (bound to the underwriting workflow, SLA 4 h).
  "Sign v4" — a seal stamps, the loop advances to In force · v4, Code in sync turns green. A small evidence
  ledger strip at the bottom adds "v4 signed · supersedes v3".
- **Narration:** "The owner confirms it, and the contract adds two controls: an evaluation that checks
  every decision doesn't rely on that characteristic, and a person who reviews any decision it flags.
  Version four is signed: immutable, chained to the one before, and verified against trusted keys."
- **Headline (draft):** "Version four of the contract is signed."

## Act 4 · Optimize: a cheaper model earns its way in (3:02–4:32)

**4.1 The gateway, live** (14 s)
- **Visual:** the big-screen gateway: callers on the left, flow rails (yellow dashes) through the router
  to models on the right; requests per second and cost per minute ticking. A pill: "Underwriting
  assistant · frontier model · $0.031 a call".
- **Narration:** "Every model call goes through Optimize's gateway. Here, the underwriting assistant
  sends every request to a frontier model."
- **Headline (draft):** "Every model call goes through the gateway."

**4.2 Observe → Route → Train → Serve** (14 s)
- **Visual:** the Optimize story: four stages rise in order; a loop arrow draws back; a gate card
  (quality ≥ baseline · tokens down ≥ 40%) blinks Ready. "A small model, trained on your data".
- **Narration:** "Optimize learns from that traffic, trains a small model on the lender's own data, and
  proposes it. The owner decides whether to try it."

**4.3 Console: the experiment** (22 s)
- **Visual (console mock, `Inference › Experiments`):** the one-view loop Propose → Evaluate → Shadow →
  Canary → Decide → Watch. A demo clock ("Simulated") speeds time. Shadow fills: the candidate answers
  copies of live requests, quality bar tracks the baseline. Canary starts: a weighted split slider moves
  90/10 → 75/25; the limits board shows each limit's live value inside its band.
- **Narration:** "So it becomes an experiment. The small model answers shadow copies of real requests,
  then takes a growing share of live traffic, while every limit the owner set is watched."
- **Headline (draft):** "A proposed model becomes an experiment."

**4.4 A limit is crossed** (22 s)
- **Visual:** one segment row, "Region · DE", ticks past its quality limit; the row flashes red-orange; the
  loop pauses at **On hold** — only DE goes back to the baseline (the others keep the candidate). A decision
  card: "Keep serving · DE to baseline · All to baseline · Roll back", chosen by the owner, with their name.
- **Narration:** "In one region, German applications, quality drops below the line. Akka holds the
  experiment and sends just that region back to the frontier model. The owner chose that, in advance."
- **Headline (draft):** "One region goes back to the frontier model."

**4.5 Decide and watch** (18 s)
- **Visual:** the candidate is retrained for DE (one beat), the segment returns inside its band; Decide →
  **Promote**; Watch begins (14 days). A count-up lands: "Cost per call $0.031 → $0.009 · −71%". The evidence
  strip adds "Promoted · experiment exp-142 · owner T. Jewell".
- **Narration:** "Once it holds everywhere, the owner promotes it. The same answers, at less than a
  third of the cost, and every step of the decision is on the record."
- **Headline (draft):** "The owner promotes the small model."

## Act 5 · One evidence record (4:32–4:56)

**5.1 One evidence record** (24 s)
- **Visual, in three beats, ending on the rail:**
  1. **A conversation** (one German applicant, three turns): the applicant asks why their application is
     on hold; the support assistant explains an underwriter is reviewing it and when they'll hear; the
     applicant asks for more time to send a document, and the assistant confirms the new date.
  2. **Its trace**, opening beneath it as a waterfall: the endpoint → underwriting workflow → eligibility
     assessor agent → two tool calls (policy lookup, affordability) → model calls through the gateway (one
     to the small model, one routed to the frontier model for DE, each with tokens and cost) → the new
     **evaluation** control judging the decision's rationale (FAIL: "cites the applicant's religion", score
     0.21) → the new **human** control: the decision held, ESCALATED to an underwriter, who overrides the
     rationale and approves the referral (with their name and the 4 h SLA met). Spans draw on left to right
     like the site's line draws; the trace id and the interaction id sit at the top.
  3. **Its verdicts**: the evaluation (FAIL, caught), the human decision (upheld: timely, authorised,
     reasoned), the guardrail checks that passed, each a row naming its control id, the bundle in force (v4)
     and the regulation it evidences (EU AI Act Art. 14 human oversight, ECOA, GDPR Art. 9).
  Then pull back: the conversation, trace and verdicts fold into one evidence entry that drops onto the
  evidence rail under the four product cards, beside the three stories (spec → proof, code → contract v4,
  model → promoted); each event pulses along it.
- **Narration:** "And every conversation is captured end to end: what was said, every agent, tool and
  model call behind it, and every control that judged it, each verdict tied to the contract in force and
  the regulation it answers. The specification, the code change and the model change are in the same
  evidence record."

## Act 6 · Scale efficiently (4:56–6:18)

Claims follow `demo/research/economics-sovereign.md` (approved wording, with sources and cautions). No dollar
figures, no "fixed price", no claim that hyperscaler prices rise; tokens are not inside the fee, their
predictability comes from Optimize.

**6.1 Efficiency from actors** (18 s)
- **Visual:** a single core drawn as a lit tile; actors pour into it as tiny yellow points until it is a
  dense, calm field ("200M actors per core"), each point a conversation, agent or workflow holding its own
  state. Pull back: the tile replicates into a cluster as load rises, the points rebalance smoothly, and a
  read/write latency readout stays flat ("4 ms reads · sub-10 ms writes") while a throughput line climbs.
  Beside it, in grey, a conventional stack (framework, broker, cache, database, orchestrator, scheduler)
  multiplies in boxes as load rises, each provisioned for its peak with idle headroom shaded.
- **Narration:** "Every agent, workflow and conversation in Akka is an actor that holds its own state,
  millions to a core, with no broker, cache or orchestrator around it. As load grows it spreads across
  the cluster, and latency stays flat."

**6.2 Every interaction, cheaper** (16 s)
- **Visual:** one interaction dissected as a stack of thin slices (compute, memory, storage writes, network,
  tokens), the conventional stack's version beside Akka's: every slice fractionally thinner on Akka, the
  conventional one padded with provisioned-but-idle headroom. A multiplier steps ×1 → ×1,000,000 →
  ×1,000,000,000 and the small per-interaction gap opens into a wide area between two cost curves. A proof
  strip rises under it, each a before → after bar with its customer (akka.io customer stories): Fox/Tubi
  "150,000 cores → 22,000", Verizon "half the hardware · TCO down by half", Esdiac "65% lower infrastructure
  cost", Swiggy "~50% less compute per prediction", Manulife "up to 300% more concurrency". The strip resolves
  into "Up to 90% lower infrastructure cost".
- **Narration:** "So every token, transaction and interaction costs a little less on Akka than on stacks
  that provision for the peak and meter every call. At a billion interactions, a little becomes a lot:
  our customers run the same work on a fraction of the cores, hardware and cost."
- **Claims:** customer figures in their live-page wording, attributed to the company; "Up to 90% lower
  infrastructure cost" is the platform's claim. No token, GPU or storage figures (none are public); the
  incremental efficiency is shown across all slices qualitatively.

**6.3 Forecastable AI** (22 s)
- **Visual:** the per-interaction cost from 6.2 (lower) multiplies by volume into a twelve-month chart. Left,
  a consumption bill: stacked meters (calls, tokens, functions, queues, storage, egress, six to eight bands)
  thickening with usage, a red-orange "surprise" marker on a spike month, "Provisioned for the peak. Metered on
  every call." Right, Akka: one flat bar per month, "Platform tier + service cores", a dashed forecast line it
  never leaves. Under it, the token spend from Act 4 sits inside a yellow forecast band with its budget line
  (Optimize). The two halves join under one title in display type: "Forecastable AI."
- **Narration:** "Then pair that efficiency with a flat fee. Akka is priced on a platform tier and
  service cores, not per call or per token, and Optimize keeps token spend inside its forecast. Each
  interaction costs less, and finance can plan one bill. That is forecastable AI."
- **Headline (draft):** "Finance can plan one bill."

**6.4 Sovereign, on any cloud** (14 s)
- **Visual:** a globe-free map of five provider tiles in a row (AWS, Microsoft Azure, Google Cloud,
  T-Systems, Alibaba Cloud), each drawn as a hairline region frame. The four product cards and the evidence
  rail from Act 1 lift as one unit and drop into each frame in turn; each frame lights with "Country-isolated
  data, networking and operations", "local SREs", "active-active". The last beat shows all five lit at once.
- **Narration:** "And for sovereign needs, the whole platform runs as a Sovereign Cloud:
  country-isolated data, networking and operations, in AWS, Azure, Google Cloud, T-Systems or Alibaba
  Cloud."
- **Claim to confirm before recording:** T-Systems and the three hyperscalers are in approved text; Alibaba
  Cloud appears only as a logo in the internal intro deck. Confirm Alibaba Cloud support is public.

**6.5 End card** (12 s)
- **Visual:** "Scale AI, Efficiently." in display type; the install chip "› install Akka from akka.ai [Copy]";
  AKKA mark.
- **Narration:** "Akka. Scale AI, efficiently."

---

**Running time:** 6:18. Acts: 0:24 · 0:40 · 0:40 · 1:18 · 1:30 · 0:24 · 1:22.

**Rules carried over from `demo/README.md`:** fades between scenes, never a loading state on screen, the
caption never covers its subject, chapter cards in the Intro deck style, "Agent SDK" never "the SDK" when
spoken, "the small model", money words from the console's §6a, and figures that are simulated say so.

---

## Production rules for the mock (Tyler, 2026-10-27)

- **Rendered professionally:** slides and console screens at the finish of a produced product film, not a
  wireframe. Real-looking, dense, credible data; pixel-tidy alignment; consistent spacing and type scale.
- **Captions are designed, not subtitles:** a lower-third built in the site's language — an eyebrow
  naming the act (e.g. "Govern"), the line in Instrument Sans at a calm size, a hairline rule,
  generous padding, a soft backdrop that separates it from busy screens. They enter and leave with motion,
  one line at a time when long, and never sit over anything the viewer needs. Each scene declares a caption
  zone (a corner or band it guarantees empty), and the frame's content is laid out around it.
- **Intelligent zooms:** camera moves on the console scenes — push in to the element being discussed
  (a readiness row, a limit crossing its band, a trace span, a verdict), hold, ease out. Zooms are smooth
  (eased, 0.8–1.4 s), at most one subject at a time, never so close that text blurs or the context is
  lost, and the caption moves with the zoom so it never covers the subject.
- **Data is loaded and moving before the scene is seen:** a console scene opens on a populated screen with
  its live elements already animating (traffic flowing, counters ticking, the clock running) — never an
  empty state, a skeleton or data arriving under the viewer's eyes, unless the arrival is the point being
  made (e.g. a readiness row flipping).
- **No bars beside words:** no short rule, dash or line set beside a label, eyebrow, kicker, caption or chip
  (the akka.io 28×2 eyebrow rule included). Hairline dividers between sections are fine.
- **One typeface for words:** titles, eyebrows, kickers, chapter cards, caption eyebrows, chips and labels are
  Instrument Sans. Monospace (JetBrains Mono) only where the content is literally code, a terminal, a file
  path, or an id, digest or trace id shown as data.
- **No numbering:** no chapter or scene numbers anywhere. A chapter card shows the act's name and its line
  ("Build" / "From spec to proof."), a caption eyebrow the act's name only ("Govern").
- **Captions split at sentences only:** every caption line starts a sentence; short sentences share a line,
  a long one wraps. The caption waits for a chapter card to go.
