# AI Governance Demo — Speaker Notes

One section per slide, in delivery order.

Each section carries:
- **Cue** — the visual/staging moment: what's on screen, when to tab-switch, when to click.
- **Script** — the exact words to say. This is a script, not a summary — read it or memorize
  it, don't paraphrase from bullet points live.
- **Land** — the key points this slide must land, for a presenter who wants to speak more
  freely than the script and still hit everything required.
- **Sources** — where the copy is drawn from, so a future rev can trace it.

> **Rewritten 2026-09-29** per direction to separate actual spoken words from meta-commentary.
> The previous revision mixed "what to say" with "why," "if this happens then," and
> production notes — none of that belongs in a script. Presenter mechanics (tab-switching,
> build status, fallbacks) now live in `PRESENTER-RUNBOOK.md` only.

---

## Slide 00 — Title

- **Cue**: title on screen; presenter introduces themselves.
- **Script**: "Good [morning/afternoon] — I'm Smitty, Field CTO Americas at Akka. What I want
  to walk you through today isn't a product tour. It's Akka's operating model for AI
  governance — the principles that explain how a risk and compliance posture gets defined,
  enforced, and proven, end to end. I'll pause for questions at the end so the arc holds
  together, but jump in anytime if something's unclear."
- **Land**: governance-first framing, not a feature tour; delivered in this order rather than
  the order a customer's own asks might arrive in; questions welcome anytime or held to the
  end, presenter's call.
- **Sources**: —

---

## Slide 01 — Posture is defined once, enforced everywhere.

- **Cue**: single principle statement lands.
- **Script**: "Every business already has risk tolerance, regulatory duties, and internal
  policy to answer to. That's not new, and Akka doesn't hand you a posture — you already have
  one. What's new is the surface it has to cover. Those decisions now have to translate across
  people, process, technology, and agentic AI systems that build and run themselves. The
  approach is three steps: decide what you're exposed to, define those decisions as controls
  independent of any one system, and enforce them uniformly — with enforcement that's verified
  and continuously improved, not a one-time audit."
- **Land**: posture already exists at the business level, Akka doesn't introduce it; controls
  are defined independent of the system they govern; enforcement is uniform, verified, and
  continuously improved — not a point-in-time check.
- **Sources**: Akka principle statement — "AI risk posture defined independently of the AI
  system itself, and then uniformly applied with proper enforcement."

---

## Slide 02 — Postures have a lifecycle

- **Cue**: categorization grid (Intent / Autonomy / Boundaries / Evidence) fades in first, then
  the arrows converge and the five-step lifecycle stack cascades in below it, last step
  looping back to the first. Presenter can trace both halves live with a finger/cursor.
- **Script**: "Before a system ships, four questions set its posture. Intent — what it's for,
  who's accountable. Autonomy — what it can decide on its own, when a human has to step in.
  Boundaries — who it can affect, what data and dependencies shape it. And evidence — what
  regulations govern it, what evidence it has to produce, who attests to it. Those
  four categories drive a lifecycle, and it runs continuously — it's not a one-time checklist.
  It starts with defining risk: what could this system do, and what is it exposed to. From
  there, you identify the controls that hold that risk down. Those controls get signed into a
  versioned, content-addressed bundle. That bundle is what gets enforced on the running
  system. From there, you measure whether the posture is holding — including control-triggered
  events, where a control firing feeds directly back into the design. You revise the
  specification, produce a new version, and the cycle continues. Every one of these five steps
  is quantifiable and traceable. Nothing here is a point-in-time audit. I'm not going to just
  describe this — let's watch it happen." *(cue Demo 1, `PRESENTER-RUNBOOK.md` §4.1 — the
  console walks Define Risk, Identify Controls, Sign, Enforce, and Measure by name before any
  later slide defines them.)*
- **Land**: continuous loop, step 7 feeds back into step 1, not a linear checklist; seven
  moves — define risk, specify controls, bundle & version, apply & enforce, monitor &
  measure, control-triggered events, iterate; quantifiable and traceable at every step; this
  slide hands off directly into Demo 1 — don't let it stand alone as a diagram.
- **Sources**: lifecycle-graphic direction (define risk, specify controls, versioned package,
  apply & enforce, monitor & measure, control-triggered events, iterate). Named-step wording
  (Define Risk → Identify Controls → Sign Controls → Enforce → Measure) is the same five-move
  backbone, elaborated here into seven to make the loop and its two closing moves explicit.

---

## Slide 03 — Every posture reduces to five controls

- **Cue**: recap statement, then hairline table, five rows, one example per row — no new
  demo, this names what Demo 1 just showed before introducing the taxonomy.
- **Script**: "You just watched that whole loop run on a real system. Before I show you the
  five mechanisms behind it, I want to name precisely what you saw happen each time a
  control fired: a control is a discrete, enforceable answer to one specific risk or
  compliance requirement. It isn't a philosophy or a best practice — it's something that
  either holds or it doesn't, and that outcome can be proven. That's what the Sign and
  Enforce steps you just watched actually guarantee. There are five ways to satisfy a
  control, and every obligation you'll ever encounter reduces to one of them. A
  **Guardrail** blocks or passes an action at a runtime boundary — stopping a wire transfer,
  for example, if it lacks dual sign-off. An **Evaluation** measures and scores behavior,
  live or in test — scoring every response weekly for demographic-parity drift. **Human**
  means a named person holds authority over the decision — a loan officer approving an
  adverse-action notice before it goes out. A **Gate** turns a check into a build or release
  decision — blocking a deploy that doesn't have a current bias-audit attestation on file.
  And a **Sanitizer** strips or masks content before it moves on — redacting an applicant's
  Social Security number before the model ever sees it. Five mechanisms. Combine them, and
  you can construct or enforce any part of the posture."
- **Land**: a control is one discrete, provable requirement — provable means it either holds
  or it doesn't; this is a recap of Demo 1, not a cold definition — the audience has already
  seen a control defined, signed, and enforced before this slide names it; five mechanisms
  satisfy it, each with one job — Guardrail, Evaluation, Human, Gate, Sanitizer; the point
  isn't the count, it's that these are the building blocks for the whole posture; one
  concrete example per type, grounded in what the platform does today. Policy is not a
  sixth type — it's the authored rule set that decides which of the five apply (e.g. EU data
  auto-inheriting the EU AI Act control set).
- **Sources**: `governance-explainability` `specs/reference/glossary.md` ("Control: a
  required rule, obligation, or constraint... states what must be true"; Guardrail,
  Evaluation, Human oversight, Gate definitions); Sept 23 transcript; Tyler Jewell's pinned
  10-principle script, #governance (`C0AASAK640K/p1790204420527749`) — "there are only 5
  types of possible controls: guardrails, evals, humans, gates, and sanitizers"; console
  Verify → Controls → Corpus facet (`Type` breakdown by control count — illustrative
  distribution, re-pull live counts per engagement rather than presenting these as fixed).

---

## Slide 04 — Controls come from three sources

- **Cue**: three columns — regulatory badges, a corporate-policy example, a project-scoped
  example — plus the real corpus stat line.
- **Script**: "Controls come from three places. First, regulatory and legislative — derived
  automatically from law, regulator guidance, and industry standards already sitting in the
  corpus: the EU AI Act, SOC 2, GDPR, NIST's AI risk management framework, and more. Second,
  corporate policy — a rule your enterprise has already written down, like 'no agent approves
  a refund over 500 dollars without review.' And third, project-scoped — written by the team
  building this specific system, for a risk unique to it, like 'this underwriting agent may
  never see an applicant's Social Security number.' All three are enforced identically once
  they're in the bundle — where a control came from doesn't change how strictly it's applied.
  For one system alone, that can easily be a couple hundred applicable controls out of well
  over a thousand in the corpus, drawn from a few hundred regulations."
- **Land**: three sources — regulatory/legislative, corporate policy, project-scoped;
  enforced identically regardless of origin; illustrative scale — hundreds of applicable
  controls out of a much larger corpus, pulled from a broad regulatory base.
- **Sources**: console Verify → Controls → Corpus, `Source` facet breakdown (Corpus /
  Corporate policy / Custom) — pull live stats for the specific engagement rather than
  presenting these as fixed; origin question this slide answers ("can we add our own
  controls?") comes up routinely in customer conversations.

---

## Slide 05 — Controls are managed like software

- **Cue**: three-stop timeline — Launches / Gains judgment / Gains authority — each stop
  showing a growing bundle-size bar and a version/control-count label.
- **Script**: "Watch what happens as one system takes on more capability. The Loan
  Origination Assistant launches answering borrower questions only — the risk survey flags
  disclosure accuracy, and bundle v1 ships with 12 controls. It's bundled — those 12 controls
  become one versioned package, pinned to the corpus snapshot they were derived from — and
  signed, a named, accountable person attesting this is what the assistant runs under. Then
  the assistant gains judgment — it starts recommending approve or deny. That's a new risk,
  fair lending, and it's real the moment the capability ships. Bundle v2 carries 34 controls.
  Later it gains authority to initiate the wire transfer itself — dual-control risk, now real
  — and bundle v3 carries 51. Every version was enforced continuously while it was live — not
  sampled, every request — and every version it replaced doesn't disappear. v1 and v2 stay
  signed, pinned to their corpus snapshot, and provable, forever. That's why we treat controls
  like software: as the system grows, the bundle grows with it, and the full history survives
  the growth."
- **Land**: capability growth drives risk growth drives bundle growth — concrete example,
  Loan Origination Assistant, 12 &rarr; 34 &rarr; 51 controls as it gains judgment then
  authority; bundle = versioned package pinned to a corpus snapshot, signed by a named owner,
  applied discretely per system; enforced continuously, not sampled; a new version supersedes
  the old one, but the old one stays signed, pinned, and provable — nothing is erased; this is
  a literal software release process applied to controls, not just an analogy.
- **Sources**: `services/workbench-svc/.../BundleSigner.java:48-110` (canonicalization +
  SHA-256 digest + corpus_lock); `demo/governance/signed/` sample bundle; enablement §3 signed
  Eval Matrix.
- **Do NOT claim**: cryptographic attestation, RFC 3161 trusted timestamping, or a
  tamper-evident hash chain **for bundles** — today's signing anchors a digest, it doesn't
  cryptographically attest. (A hash chain does exist for runtime AUD events per
  `specs/corpus/aud-taxonomy.yaml:84-86` — a different story; don't conflate the two.)

---

## Slide 06 — Every control execution produces a verdict

- **Cue**: KPI tiles + mini table on screen, then **tab-switch to the live console, Canvas**
  (`PRESENTER-RUNBOOK.md` §4.2, FG1).
- **Script**: "Every time a control executes, it produces a verdict — upheld, breached,
  inconclusive, or error — and that verdict is written to the same tamper-evident log as the
  AI system's own execution trace. Nothing here is self-reported. Let me show you."
  *(tab-switch to Canvas)* "I'm going to ask the console, in plain language, what's true of
  this system right now." *(type or select: "Which controls apply to the Loan Origination
  Assistant, and did they hold this week?")* "That answer isn't a canned report — it's
  generated live, off the same verdict ledger an examiner would query. And because every
  verdict carries its control, its execution, and its evidence, I can go one level deeper on
  any single one and show exactly why it landed where it did."
- **Land**: verdict = the outcome of one control execution — Upheld, Breached, Inconclusive,
  or Error; same tamper-evident log as the AI system's own trace, nothing self-reported; the
  Canvas answer is generated live, not a canned report; one live policy violation must be
  visible on screen here, not described after the fact.
- **Sources**: console Verify → Verdicts (conclusion vocabulary Upheld / Breached /
  Inconclusive / Error; tile numbers on the slide are illustrative — re-pull live counts
  against the specific engagement's ledger before presenting).

---

## Slide 07 — Compliance is proven across every environment

- **Cue**: three columns — Documents, Pre-production, Production.
- **Script**: "Controls don't just run in one place. They execute in documentation stores,
  in pre-production for testing, and in production. Documents is a check that isn't about
  runtime behavior at all — it's whether a required attestation or signature is on file and
  still fresh. Pre-production is where a new bundle gets built and certified — evals,
  red-teaming — against traffic that mirrors production. And production is where the
  certified bundle finally runs, continuously, enforcing every control on live traffic. A
  system that's compliant can demonstrate that controls across all three environments are
  satisfying their requirements — Akka runs controls in each one and aggregates the results
  into a single, complete view of compliance. Only a certified bundle may move to
  production."
- **Land**: three environments — Documents, Pre-production, Production; compliance means all
  three are satisfying their requirements, not just production; Akka aggregates results
  across environments into one view; only certified bundles move to production.
- **Sources**: console Verify → Verdicts `Environment` facet (values: Production,
  Pre-production, Documents — confirms this is the real product taxonomy, not an invented
  one); direction that environments exist to keep the lifecycle continuous — changes applied,
  tested, and certified before new versions are built.

---

## Slide 08 — Drift is a pattern change in the verdict ledger

- **Cue**: console-styled card (same chrome as Slide 06) with the query stated at the top,
  then a two-control, two-timepoint verdict comparison. No separate demo file — this is the
  same verdict ledger as Slide 06; if time allows, this can extend into a live Verdicts query
  rather than pre-rendered rows.
- **Script**: "Drift starts with the same verdict ledger I just showed you — you don't need a
  separate drift detector. You query the same control-outcome history and compare it across
  time. Here's a real pattern: this PII-redaction guardrail held — upheld — on every
  execution for weeks. So did this storage-limitation gate. Today, the guardrail returned an
  error — the classifier scored outside its valid range and failed closed — and the storage
  gate came back inconclusive, because its retention schedule aged past its freshness window.
  That's the drift signal: not a new detector, just the same outcomes, compared over time. And
  because every verdict links back to a specific execution, Replay lets me reconstruct exactly
  what happened in that one session — not just that something changed, but why."
- **Land**: drift = comparing verdict conclusions for the same control over time; no separate
  drift detector — same ledger as Slide 06; Verdicts show *what* changed, Replay reconstructs
  *why*; real example — an Upheld streak interrupted by Error / Inconclusive verdicts.
- **Sources**: console Verify → Verdicts — grounding examples: a "PII redaction at model
  boundary" Guardrail verdict returning Error ("classifier returned a score outside 0 to
  1... failed closed") and a "Storage limitation" Gate verdict returning Inconclusive
  ("retention schedule is 410 days old, past its 365-day freshness window"). Console
  Verify → Replay (entity/session/workflow event playback) as the "why" mechanism.
- **Note**: this slide uses real console vocabulary (Upheld/Breached/Inconclusive/Error)
  rather than invented drift-state terms, to stay honest about what the platform actually
  reports.

---

## Slide 09 — Governance should apply everywhere

- **Cue**: three-row table — Built on Akka / Everything else / Live, not observed. No demo
  file; can extend into a narrated look at the Verify → Controls corpus facet if time allows.
- **Script**: "Everything so far has assumed the agent is one of ours — running inside Akka,
  with our control runtime already wired in. Most of the agents a bank actually runs aren't
  that. They're third-party, vendor, legacy — built on something else entirely, and you can't
  drop our runtime inside code you don't own. We don't think that should be a reason
  governance stops. That's what the AI gateway is for. Akka provides the gateway, the agent
  runtime, and the control runtime in the same environment — so route any agent's model or
  tool calls through our gateway, and the same controls enforce, whether or not that agent
  runs on Akka. For an agent we already run, the gateway doesn't add new
  capability — it turns what would be hand-written code into configuration. For an agent we
  don't run, it's the only place in the path where enforcement can happen at all. I want to be
  precise about the limit here too: this covers most controls, not all — anything that
  requires build-time attestation, a scheduled batch evaluation, or a human workflow step
  still can't be enforced in-path, by a gateway or anything else. The gateway governs what
  flows through it; it isn't the whole compliance program."
- **Land**: Akka = gateway + agent runtime + control runtime in one environment; for an
  owned Akka agent, the gateway is ergonomics (config instead of code); for any agent that
  *isn't* Akka's, routing its traffic through the gateway is the only in-path enforcement
  option there is; "most controls," not all — anything outside the request path (build-time,
  scheduled, human-workflow, storage) is out of reach for any gateway, honestly flagged, not
  silently dropped.
- **Sources**: Tyler Jewell's pinned 10-principle script, #governance
  (`C0AASAK640K/p1790204420527749`), Principle 9: "Since Akka provides a) an AI gateway, b)
  the agent's runtime, and the AI control runtime in the same environment, we are able to
  enforce controls to Akka agents and (most controls) to non-Akka agents"; Tyler's earlier
  framing in the same channel (`p1783707103545139`): "if you consider an Akka agent with an
  endpoint a type of gateway... it's possible for us to enforce policies on traffic that
  comes from a 3rd party agent heading to a 3rd party LLM"; `governance-explainability`
  `specs/platform/agentgateway-enforceable-controls.md` (verified against the live
  agentgateway schema/source, supersedes an earlier wrong "135 controls" claim) — for an
  agent you own, the gateway duplicates the 54 controls Akka already enforces and turns 115
  more from code into config; for an agent you don't own, the gateway reaches 198 of 210
  in-path-addressable controls while Akka reaches zero; 1,159 of 1,369 corpus controls
  (85%) sit outside any data plane's reach regardless of gateway or runtime.
- **Do NOT claim**: that the gateway enforces *every* control on a non-Akka agent (it's 198
  of 210 addressable, not all 1,369 in the corpus); that it inspects multimodal content
  (text-only — image/audio parts are dropped before any guardrail sees them, a gap shared
  with Akka's own guardrails); or that it sees in-process tool calls on an agent you don't
  own (a call that never crosses the wire is invisible to any gateway, by construction).
- **Ask landed**: this is the direct answer to "can you govern AI agents built outside your
  platform?" — see the customer-specific speaker-notes addendum for how this lands for a
  given engagement.

---

## Slide 10 — Observability turns spend into a feedback loop

- **Cue**: three columns — Observe, Scrutinize, Compare — then **tab-switch to the live
  console, Optimize → Spend** (`PRESENTER-RUNBOOK.md` §4.4, FG3), ask Canvas a cost question.
- **Script**: "Every model call in this system passes through Akka's AI gateway, which means
  every token is observable — not estimated, measured, broken out by team, use case, and
  system. That observability is what makes continuous optimization possible, and it works at
  two levels. First, every team can see its own agentic system's spend and get direct
  feedback on where it's wasteful — a call that's redundant, a model that's overpowered for
  the job, a place caching would help. That's chargeback done right: not a finance report
  that lands monthly, but something a team can act on. Second, the same data lets you
  continuously test and compare models against each other on cost and performance — not a
  one-time choice made at launch, but an ongoing comparison as models and prices change. Both
  feed back into the lifecycle the same way a compliance finding does — you tune the system,
  not just report on it. Let me show you live." *(tab-switch to Optimize → Spend; ask Canvas
  a cost question, e.g. "Which models are we paying for?")*
- **Land**: token observability is the capability that makes continuous optimization
  possible, not just a reporting feature; chargeback means each team scrutinizes its own
  system's usage and gets tuning feedback, not a monthly line item; the loop also includes
  continuously testing and comparing models on cost and performance, not a one-time launch
  decision; both feed back into the same lifecycle a compliance finding does.
- **Sources**: console Optimize → Spend page structure (spend by model / use case / env /
  team / caller; tokens by class — input, cache-read, cache-write, output, reasoning; cost
  per completed conversation); `enablement/03-solution-akka-optimize.md:62-71`.
- **Dependency**: a live query needs the `optimize-local` synthetic stack seeded with
  traffic. Seed it and confirm usage data is present before relying on a live number in the
  room; fall back to narrating the page structure otherwise.

---

## Slide zz — Thank you

- **Cue**: close.
- **Script**: "That's the operating model: posture, lifecycle, what a control is, five
  building blocks, three sources, controls as software, verdicts, environments, the gateway
  that governs any agent, drift, and token visibility — one story, not eleven separate
  answers. I'll take questions now."
- **Land**: none — recap and open the floor.
- **Sources**: —
