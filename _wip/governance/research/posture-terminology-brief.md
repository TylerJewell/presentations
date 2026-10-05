# Is "posture" the right word? A terminology brief

**Question.** Slide 01 of the governance deck currently states the opening principle as:
"AI risk posture defined independently of the AI system itself, and then uniformly applied
with proper enforcement." Is "posture" the right formal abstraction for what an enterprise's
risk tolerance, regulatory duties, and internal policy add up to — and is "uniformly" the
right description of how it gets enforced?

## 1. How the market actually uses "posture"

In established security and risk usage, posture is the **current, measured state** of
exposure — not a predefined standard. SentinelOne's glossary is explicit: "risk posture is
the general measure of an organization's total risk exposure... how much risk it currently
is exposed to and how effectively it is managing that risk" [1]. IBM draws the same line
between posture (current state) and policy (the directive that shapes it) [2]. The thing an
enterprise defines independently of any one system — and then applies — is **policy**,
sitting on a board-owned **risk appetite**. That is now a regulatory expectation, not just
vocabulary: APRA, the FSB, and MAS require boards to "formally define their AI risk
appetite" [6], and Deloitte's financial-services outlook says AI risk should "flow into the
same risk appetite statements, limits, and issue management processes as operational, cyber,
and model risk" [7]. NIST's AI RMF uses "risk tolerance" for the same board-owned, org-specific
input, deliberately leaving each organization to set its own [5].

Separately, "AI posture" already names a distinct, mature product category — AI Security
Posture Management (AI-SPM) — sold by Palo Alto Prisma, Wiz, and SentinelOne, with its own
buyer's guide circulating among CISOs [3][4]. That's a reason to use "posture" precisely, not
a reason to avoid it: a technical buyer who hears it used loosely will reach for the AI-SPM
meaning and be confused when the deck means something else.

One more correction worth making regardless of the posture/policy question: Gartner's May
2026 release is titled "Applying Uniform Governance Across AI Agents Will Lead to Enterprise
AI Agent Failure" [8][9]. Its recommendation is **proportional governance** — enforcement
tiered to each agent's autonomy — not a single uniform rule. "Applied uniformly" is, as of
this release, naming the anti-pattern Gartner is warning enterprises away from.

## 2. How Akka already uses "posture" — and it's the correct meaning

Akka doesn't need to adopt new vocabulary here; it already has a settled, correct definition
that Slide 01 simply isn't using. From the canonical glossary
(`governance-explainability-canvas/specs/reference/glossary.md`):

> **Governance Posture** — The complete control stance of a governed system. Governance
> posture includes applicable controls, generated mechanisms, gates, evidence, gaps,
> exceptions, reviewers, and sign-off state. It is the answer to: "what is this system
> allowed to do, how is that enforced or measured, and how do we prove it?"
>
> **Governance Posture Package / GPP** — The signed auditor-facing record for a Governance
> Version.
>
> **Control vs. Policy** — Use Control for what must be true. Use Policy only for
> implementation code, enterprise policy source, or runtime/operator-facing policy behavior.

This matches the external research exactly: posture is an **output** — the enforced, provable
state — not something defined independently up front. Akka's own sales enablement for Verify
already uses it this way, in its four-step governance loop: "1. Define your risk. 2. Identify
your controls. 3. **Enforce your posture.** 4. **Improve your posture.**" [10]. Every other
hit for "posture" across `enablement/*.md` and the battlecards follows the same pattern —
something sealed, derived, or achieved, never something "defined independently." Slide 01 is
the one place in Akka's collateral that inverts this.

Practically, this means the fix is narrower than a deck-wide rename. Slide 01's headline
("Posture is defined once, enforced everywhere") has the causality backwards. Slides 02
("Postures have a lifecycle") and 03 ("Every posture reduces to five controls") are already
consistent with the glossary's definition and don't need to change.

## 3. Recommended point of view

State it in the order it actually happens: a business already has a **risk appetite**,
regulatory duties, and internal **policy** — Akka doesn't introduce these. Those get
translated into **controls**, specified independent of any one AI system. Controls get
enforced — consistently, proportional to each agent's autonomy, not "uniformly." What results,
continuously measured and provable, is the **Governance Posture** — sealed as a **Governance
Posture Package** for audit. This is a correction grounded in Akka's own existing definitions,
not a new coinage, and it closes the gap between the opening slide and everything that follows
it (including Verify's own governance loop, which the deck's live demo already walks through).

## 4. Open strategic question — flagged, not resolved here

No existing Akka material combines "declarative" or "spec-driven" with "governance" into one
phrase, even though `Specify` ("spec-driven development and delivery of governed systems" —
`enablement/00-foundation.md`) and `Verify` are clearly two halves of one bet — and the
glossary places the `Specify` entry immediately after `Governance Posture`. Candidate phrases
("Specification-Driven Governance," "Declarative Governance") are worth considering as a
unifying frame, but this is a taxonomy decision that should go to Kevin Hoffman before it
appears in customer-facing material — it isn't resolved by this brief.

## 5. Internal terminology reference (for future decisions)

Captured here so future deck/positioning work doesn't have to re-derive it. Source for all
entries: `governance-explainability-canvas/specs/reference/glossary.md` unless noted.

| Term | Definition (condensed) | Relation to "posture" |
|---|---|---|
| **Risk appetite** | Not an Akka-defined term — the board-owned tolerance an enterprise sets externally, before Akka is involved. | Upstream input; Akka doesn't introduce it, only consumes it. |
| **Control** | "A required rule, obligation, or constraint... states what must be true, why it matters, where it is enforced, and what evidence proves it." May come from regulation, enterprise policy, risk decisions, or project requirements. | The unit that gets *defined independently* of any one AI system — this is what Slide 01's "defined once" claim should be about, not posture. |
| **Control Locus** | Where a control operates — runtime, human flow, build/CI, deployment, operations, evidence. | — |
| **Policy** (canonical distinction) | "Use Control for what must be true. Use Policy only when referring to implementation code, enterprise policy source, or runtime/operator-facing policy behavior. Avoid the combined term 'Control / Policy' in new docs." | Narrower than external usage's "policy" — internal docs should not use Policy as the deck's board-level abstraction. |
| **Evaluation vs. Guardrail** | "An Evaluation emits an observation. A Guardrail emits a decision." | Foundational distinction behind Slide 03's five control types. |
| **Governance Posture** | "The complete control stance of a governed system... the answer to: what is this system allowed to do, how is that enforced or measured, and how do we prove it?" | **The output**, not an input — this is the term Slide 01 should resolve *to*, not open with as something defined. |
| **Governance Version** | A specific, versioned governance record for an AI System Family; contains "the system definition, classification, Eval Matrix-derived posture, control coverage, attestations, sign-off state, lifecycle status, and evidence package." | Posture is explicitly listed as *derived*, alongside other captured/produced attributes. |
| **Governance Posture Package / GPP** | "The signed auditor-facing record for a Governance Version," capturing classification, system definition, posture, control coverage, attestations, exceptions, evidence links, sign-off provenance, corpus reference, dependency model, and deployment authorization state. | The sealed deliverable — the natural "payoff" moment in any narrative (deck, demo, or blog post) that opens on Controls. |
| **Specify** | "The generation surface that consumes both functional requirements and Eval Matrix definitions... generates both service artifacts and governance artifacts." (`00-foundation.md`: "spec-driven development and delivery of governed systems") | Sits immediately before Governance Posture in the glossary's own ordering — Specify generates the system; Verify produces and proves its posture. |
| **Five-step lifecycle naming** | Deck (`slides/02-lifecycle`) and the live console demo (`PRESENTER-RUNBOOK.md` §4.1) already agree: Classify/Define Risk → Derive/Identify Controls → Commit/Sign → Apply/Enforce → Observe/Measure. | Confirmed consistent — no fix needed; noted here so it stays that way. |

**Open item, not yet settled**: no phrase currently unifies Specify (spec-driven generation)
and Verify (governance enforcement) the way "posture" alone can't — e.g. "Specification-Driven
Governance" or "Declarative Governance." Route to Kevin Hoffman before use in customer-facing
material.

## 6. Draft blog abstract (for Kevin review)

Smitty is considering a governance blog post building on this research. Draft abstract below
— written to be discussed with Kevin, not published as-is.

> **Working title: "Your risk posture isn't a policy. It's a proof."**
>
> Most enterprise AI governance material treats "posture" as something you write down once —
> a policy document translated into a checklist. That's backwards, and it's not how risk and
> security teams actually use the word: posture is the *current, measured state* of exposure,
> not the rule that governs it. The rule is policy, sitting on a risk appetite the business
> already owns. Regulators are formalizing this split — APRA, the FSB, and MAS now require
> boards to define an explicit AI risk appetite, and NIST's AI RMF treats risk tolerance the
> same way. Separately, Gartner's 2026 guidance warns that *uniform* governance across AI
> agents is itself a failure mode; enforcement has to be proportional to what each agent is
> allowed to do.
>
> Put together, this suggests a different operating model for agentic AI: define controls
> once, independent of any single system, from the risk appetite and regulatory duty the
> business already has. Enforce those controls consistently — proportional to autonomy, not
> uniformly. What results, continuously measured and provable, is the posture: not asserted,
> demonstrated. That's the shape of Akka's own governance loop, and it's the thesis behind
> treating governance as something generated and proven by a spec-driven system, not bolted on
> after the fact.

Open questions for Kevin: does this merit introducing a named frame (e.g.
"Specification-Driven Governance") connecting Specify and Verify, or does the post work better
leaving that unnamed for now and letting "spec-driven governed systems" carry it implicitly?

## Sources

1. [SentinelOne — What is Risk Posture?](https://www.sentinelone.com/cybersecurity-101/cybersecurity/risk-posture/)
2. [IBM — What is security posture?](https://ibm.com/think/topics/security-posture)
3. [Palo Alto Networks — What Is AI Security Posture Management (AI-SPM)?](https://www.paloaltonetworks.com/cyberpedia/ai-security-posture-management-aispm)
4. [CSO Online — AI-SPM buyer's guide](https://www.csoonline.com/article/3518733/ai-spm-buyers-guide-artificial-intelligence-security-posture-management-tools-compared.html)
5. [NIST AI RMF — Framing Risk (risk tolerance)](https://airc.nist.gov/airmf-resources/airmf/1-sec-risk/)
6. [APRA — Letter to Industry on AI](https://www.apra.gov.au/news-and-publications/apra-letter-industry-artificial-intelligence-ai)
7. [Deloitte UK — FS Regulatory Outlook: AI and data](https://www.deloitte.com/uk/en/Industries/financial-services/research/regulatory-outlook/artificial-intelligence-and-data.html)
8. [Gartner — Uniform Governance Across AI Agents Will Lead to Failure (May 2026)](https://www.gartner.com/en/newsroom/press-releases/2026-05-26-gartner-says-applying-uniform-governance-across-ai-agents-will-lead-to-enterprise-ai-agent-failure) — title and release confirmed via [9], direct fetch of the Gartner page returned 403
9. [CIO Dive — Enterprises risk agentic AI failure under 'one-size-fits-all' governance](https://www.ciodive.com/news/Enterprises-agentic-failure-uniform-governance/821153/)
10. `presentations/enablement/04-solution-akka-verify.md` — the governance loop and Governance Posture Package (internal, not public)
11. `governance-explainability-canvas/specs/reference/glossary.md` — Governance Posture, GPP, Control vs. Policy definitions (internal, not public)
