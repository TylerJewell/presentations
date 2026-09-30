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

## Slide 01 — Your posture already exists. Uniform enforcement doesn't.

- **Cue**: single principle statement lands.
- **Script**: "Every enterprise already has a risk and compliance posture — it lives with your
  business and legal teams, not with engineering. The hard part has never been defining that
  posture. It's applying it uniformly. Today, most organizations build the AI system first,
  and bolt on observability afterward to see whether the posture held. Akka inverts that
  order. The posture your business already owns becomes the specification — it defines how
  the system gets built, and how it operates, before a line of code exists."
- **Land**: posture already exists at the business level, Akka doesn't introduce it; the gap
  today is uniform enforcement, not definition; Akka uses posture as the specification, not
  an after-the-fact observation layer.
- **Sources**: enablement §2 opening; internal deck-flow review — "posture is set at the
  business level, applying it uniformly is the hard part."

---

## Slide 02 — Postures have a lifecycle

- **Cue**: 7-node cycle graphic animates; presenter can trace it live with a finger/cursor.
- **Script**: "This is a lifecycle, and it runs continuously — it's not a one-time checklist.
  It starts with defining risk: what could this system do, and what is it exposed to. From
  there, you specify the controls that hold that risk down. Those controls get bundled into a
  single versioned, signed package. That package is what gets applied and enforced on the
  running system. From there, you monitor and measure whether the posture is holding. When a
  control fires, that's a control-triggered event, and it feeds directly back into the
  design — you revise the specification, produce a new version, and the cycle continues.
  Every one of these seven steps is quantifiable and traceable. Nothing here is a
  point-in-time audit."
- **Land**: continuous loop, step 7 feeds back into step 1, not a linear checklist; seven
  moves — define risk, specify controls, bundle & version, apply & enforce, monitor &
  measure, control-triggered events, iterate; quantifiable and traceable at every step.
- **Sources**: lifecycle-graphic direction (define risk, specify controls, versioned package,
  apply & enforce, monitor & measure, control-triggered events, iterate). Named-step wording
  (Define Risk → Identify Controls → Sign Controls → Enforce → Measure) is the same five-move
  backbone, elaborated here into seven to make the loop and its two closing moves explicit.

---

## Slide 03 — What is a control?

- **Cue**: single definition statement, no demo.
- **Script**: "Before I show you the six mechanisms we use, I want to define the term
  precisely, because it gets used loosely everywhere else. A control is a discrete,
  enforceable answer to one specific risk or compliance requirement. It isn't a philosophy or
  a best practice — it's something that either holds or it doesn't, and that outcome can be
  proven. Every mechanism on the next slide exists to satisfy exactly one of these."
- **Land**: a control is one discrete, provable requirement; provable means it either holds
  or it doesn't; the six types on the next slide are mechanisms for satisfying a control, not
  a second definition of it.
- **Sources**: `governance-explainability` `specs/reference/glossary.md` ("Control: a
  required rule, obligation, or constraint... states what must be true"); Sept 23 transcript.

---

## Slide 04 — Six building blocks, one job each

- **Cue**: hairline table, six rows, one example per row.
- **Script**: "There are six ways to satisfy a control, and every obligation you'll ever
  encounter reduces to one of them. A **Guardrail** blocks or passes an action at a runtime
  boundary — stopping a wire transfer, for example, if it lacks dual sign-off. An
  **Evaluation** measures and scores behavior, live or in test — scoring every response weekly
  for demographic-parity drift. **Human** means a named person holds authority over the
  decision — a loan officer approving an adverse-action notice before it goes out. A **Gate**
  turns a check into a build or release decision — blocking a deploy that doesn't have a
  current bias-audit attestation on file. A **Sanitizer** strips or masks content before it
  moves on — redacting an applicant's Social Security number before the model ever sees it.
  And **Policy** is an authored rule set that decides which controls apply in the first
  place — any agent touching EU personal data automatically inherits the EU AI Act control
  set. Six mechanisms. Combine them, and you can construct or enforce any part of the
  posture."
- **Land**: six mechanisms, each with one job — Guardrail, Evaluation, Human, Gate, Sanitizer,
  Policy; the point isn't the count, it's that these are the building blocks for the whole
  posture; one concrete example per type, grounded in what the platform does today.
- **Sources**: `governance-explainability` `specs/reference/glossary.md` (Guardrail,
  Evaluation, Human oversight, Gate definitions); console Verify → Controls → Corpus facet
  (`Type` breakdown by control count — illustrative distribution, re-pull live counts per
  engagement rather than presenting these as fixed).
- **Open question, not a blocker**: putting Policy in as a control type revisits an earlier
  framing of policy as "a boundary condition over a group of controls," not a control itself —
  and the underlying corpus/glossary spec (`Control vs. Policy` canonical distinction) treats
  Policy as authored code/selection rules, not a runtime enforcement mechanism alongside the
  other five. The example above (EU-data auto-inheritance) is written to fit *either* reading —
  confirm internally which framing is intended before this locks for a given engagement.

---

## Slide 05 — Controls come from three sources

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

## Slide 06 — Controls are managed like software

- **Cue**: four-row list — Bundle, Sign, Enforce, Release.
- **Script**: "Once controls are chosen, they don't stay abstract. First, they're bundled —
  every chosen control becomes one versioned package, pinned to the exact corpus snapshot it
  was derived from. Second, that bundle is signed — a named, accountable person attests that
  this exact set of controls is what the system runs under. Third, once signed, every control
  in that bundle is enforced continuously — not sampled, not audited quarterly, checked on
  every single request. And fourth, when requirements change, a new bundle is released, and it
  supersedes the old one — but the old bundle doesn't disappear. It stays signed, pinned to
  its corpus version, and provable, forever. That's why we treat controls like software:
  version control, a release process, and a permanent, auditable history, the same way you'd
  manage any other production artifact."
- **Land**: four moves — Bundle, Sign, Enforce continuously, Release (new bundle supersedes
  the old, old one stays provable); signing is accountable — a named person, a pinned corpus
  version; why it matters — traceability, lineage, proof, evidence; this is a literal software
  release process applied to controls, not just an analogy.
- **Sources**: `services/workbench-svc/.../BundleSigner.java:48-110` (canonicalization +
  SHA-256 digest + corpus_lock); `demo/governance/signed/` sample bundle; enablement §3 signed
  Eval Matrix.
- **Do NOT claim**: cryptographic attestation, RFC 3161 trusted timestamping, or a
  tamper-evident hash chain **for bundles** — today's signing anchors a digest, it doesn't
  cryptographically attest. (A hash chain does exist for runtime AUD events per
  `specs/corpus/aud-taxonomy.yaml:84-86` — a different story; don't conflate the two.)

---

## Slide 07 — Every control execution produces a verdict

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

## Slide 08 — Environments keep the lifecycle continuous

- **Cue**: three columns — Pre-production, Documents, Production.
- **Script**: "The lifecycle you just saw has to run somewhere before it runs in production,
  or every change becomes a live experiment on real customers. That's what these three
  environments are for. Pre-production is where a new bundle gets built and certified —
  evals, red-teaming — against traffic that mirrors production. Documents is a different kind
  of check entirely: it's not about runtime behavior at all, it's about whether a required
  attestation or signature is on file and still fresh. And production is where the certified
  bundle finally runs, continuously, enforcing every control on live traffic. The point isn't
  that there happen to be three environments — it's that this structure is what makes the
  lifecycle safe to keep iterating. Nothing new reaches production without already having
  been proven somewhere else first."
- **Land**: three environments — Pre-production, Documents, Production; this structure is
  what keeps the lifecycle continuous and safe to iterate, not just a taxonomy; Documents
  checks presence and freshness of an attestation, not runtime behavior; nothing reaches
  production without being certified first.
- **Sources**: console Verify → Verdicts `Environment` facet (values: Production,
  Pre-production, Documents — confirms this is the real product taxonomy, not an invented
  one); direction that environments exist to keep the lifecycle continuous — changes applied,
  tested, and certified before new versions are built.

---

## Slide 09 — Drift is a pattern change in the verdict ledger

- **Cue**: two-control, two-timepoint verdict comparison. No separate demo file — this is the
  same verdict ledger as Slide 07; if time allows, this can extend into a live Verdicts query
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
  drift detector — same ledger as Slide 07; Verdicts show *what* changed, Replay reconstructs
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

## Slide 10 — The AI gateway makes every token observable

- **Cue**: three columns — Govern, Optimize, Iterate — then **tab-switch to the live console,
  Optimize → Spend** (`PRESENTER-RUNBOOK.md` §4.4, FG3), ask Canvas a cost question.
- **Script**: "Every model call in this system passes through Akka's AI gateway, which means
  every token is observable — not estimated, measured. That serves two purposes. First,
  governance: you can see exactly which agents are calling which models, broken out by
  department and use case, so spend is never a surprise line item. Second — and this is the
  part people usually miss — efficiency. That same token data tells you how well an agentic
  system is managing its own usage: which calls are wasteful, where a cheaper model would do
  the same job, where caching would help. This isn't a separate reporting exercise. It's
  Optimize output feeding directly back into the lifecycle you saw earlier — you iterate on
  cost and performance the same way you'd iterate on a compliance finding. Let me show you
  live." *(tab-switch to Optimize → Spend; ask Canvas a cost question, e.g. "Which models are
  we paying for?")*
- **Land**: AI gateway makes every token observable, measured not estimated; two uses —
  governance (who's calling what) and efficiency (is it wasteful); Optimize output feeds back
  into the core lifecycle, cost/performance is something you iterate on, not just report.
- **Sources**: console Optimize → Spend page structure (spend by model / use case / env /
  team / caller; tokens by class — input, cache-read, cache-write, output, reasoning; cost
  per completed conversation); `enablement/03-solution-akka-optimize.md:62-71`.
- **Dependency**: a live query needs the `optimize-local` synthetic stack seeded with
  traffic. Seed it and confirm usage data is present before relying on a live number in the
  room; fall back to narrating the page structure otherwise.

---

## Slide zz — Thank you

- **Cue**: close.
- **Script**: "That's the operating model: posture, lifecycle, what a control is, six building
  blocks, three sources, controls as software, verdicts, environments, drift, and token
  visibility — one story, not ten separate answers. I'll take questions now."
- **Land**: none — recap and open the floor.
- **Sources**: —
