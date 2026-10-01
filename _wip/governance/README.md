# AI Governance Deck — Canonical Specification

This is the generic, customer-agnostic version of Akka's AI-governance narrative: ten
operating principles, told as one continuous story, bracketed by a title and close slide.
Customer-specific working copies live outside this repo, under
`~/akka/customers/<name>/deck/` — see [Customer decks](#customer-decks) below.

## Source of truth

The narrative here is not invented by this deck — it's a rendering of two upstream
sources, in this priority order when they conflict:

1. **Tyler Jewell's pinned 10-principle script in #governance** (Slack, `C0AASAK640K`,
   [permalink](https://typesafe.slack.com/archives/C0AASAK640K/p1790204420527749)) — the
   actual script this deck is built from, each principle mapped to one slide. Treat the
   **most recent** of Tyler's messages as authoritative where an earlier one disagrees;
   he revises this narrative in Slack before it reaches any spec or deck.
2. **The `governance-explainability` repo's canonical specs** (a separate, akka-org repo —
   paths below are repo-relative within it, not links from here) — the enforced, versioned
   product truth that the narrative must stay honest to. Key pointers:
   - `specs/README.md` — navigation index for every canonical spec; its "Canonical specs"
     table names the single owner of each concept.
   - `framework/schema/control.schema.yaml` — the enforced control-mechanism taxonomy
     (currently v2.6). This is machine-checked (`tools/auditors/10-mechanism-coverage/`),
     so it's the hardest source available for "what are the control types."
   - `specs/vision/evalmatrix.md` — the Eval Matrix model and mechanism list in narrative
     form.
   - `specs/platform/agentgateway-enforceable-controls.md` — the gateway/non-Akka-agent
     enforcement story (Principle 9).
   - `specs/vision/governance-workflow.md` — a four-page workflow narrative; useful for
     the "why," but dated 2026-06-13 and behind the schema on specifics (e.g. its
     lifecycle framing predates later detail) — don't treat it as more current than the
     schema or Tyler's Slack script.
   - Live console (`akka-console-ai-canvas`, Verify → Verdicts) — the source for the
     **verdict vocabulary** (Upheld / Breached / Inconclusive / Error). This vocabulary is
     product-UI terminology, not defined in any spec file or Slack message found so far;
     treat the running console as ground truth for it.

When the deck and a source disagree, the source wins — fix the deck, don't reinterpret
the source.

## The ten principles → slides

| # | Folder | Principle (Tyler's wording, condensed) |
|---|---|---|
| 1 | `01-posture` | Risk posture is defined independently of the system, then applied uniformly with enforcement. |
| 2 | `02-lifecycle` | Define your risk, identify your controls, sign those controls, enforce them, measure compliance. |
| 3 | `03-control-definition` | (Deck-added framing slide — "what is a control?" — sets up Principle 4's taxonomy. Not one of Tyler's ten; keep it only if it earns its place once 4 is corrected.) |
| 4 | `04-control-types` | Controls reduce to **five** types: guardrails, evals, humans, gates, sanitizers — not a sixth "policy" type. |
| 5 | `05-control-sources` | Controls are derived from: AI regulation, corporate standard, or written by an individual. |
| 6 | `06-controls-as-software` | Controls are managed like software — repos, CI/CD, version control, deploy/undeploy. |
| 7 | `07-trace-outcomes` | Control outcomes are traced with the same infrastructure as the AI system itself. |
| 8 | `08-three-environments` | Environments — documentation stores, pre-production (testing), production — aggregate into one compliance view. |
| 9 | *(no slide yet)* | Akka provides an AI gateway, agent runtime, and control runtime in the same environment — controls enforce on Akka agents **and** (mostly) non-Akka agents. |
| 10 | `09-drift` | Drift: comparing control outcomes for the same model/agent/system over time (stored outcomes, EvalKit/RedKit experimentation). |
| 11 | `10-tokenomics` | Token visibility across all models/agents enables cost governance — budgeting, chargeback, real-time optimization. |

Plus `00-title` and `zz-thankyou` bracketing the ten.

## Known gaps against the canonical source (flagged, not yet fixed)

These are tracked here rather than silently corrected, so the next slide-finalization
pass has a clear punch list:

- **Slide 04 is wrong.** It currently presents six types (Gate, Sanitizer, Evaluation,
  Guardrail, Human, **Policy**). Tyler's script and the schema both say **five** —
  Policy is not a type; the universe of controls, policies, and enforcement is covered by
  guardrails, evals, humans, gates, and sanitizers. Fix slide 04 (and its speaker notes)
  to five before this deck is considered final.
- **Principle 9 has no slide.** "Gateway + control runtime enforces on Akka and non-Akka
  agents" isn't represented anywhere in the current 12-slide build. At least one active
  customer engagement has an ask this principle directly answers, currently flagged as
  unlanded in that customer's own working folder (`~/akka/customers/<name>/`) after an
  earlier slide covering it was cut rather than redesigned. Adding this slide here fixes
  it everywhere a customer copy is seeded from this deck.
- **Slide 03 ("what is a control?") isn't one of Tyler's ten principles.** It's a
  deck-added framing slide. Worth a deliberate keep/cut decision once slide 04 is fixed —
  it may be redundant once 04 states the five types plainly, or it may still earn its
  place as a provability-first definition before the taxonomy slide.
- **Human-control sub-flavors are unresolved upstream.** A Slack thread
  ([permalink](https://typesafe.slack.com/archives/C0AASAK640K/p1789651125909609), same
  week as the 10-principle script) proposed five flavors for the `human` mechanism
  (decision / authorization / monitoring / feedback / halt), but ends without Tyler
  confirming that over an earlier three-form framing from a GitHub issue. Doesn't affect
  this deck today — "Human" is a single slide, not broken into flavors — but don't invent
  a flavor breakdown here without re-checking that thread first.

## Build

```
cd _wip/governance && python3 builder/build.py
```

Output lands at `generated/overview/index.html`. Pass `--mode`, `--presenter`, or `--out`
as documented in `builder/build.py`.

## Demo

See `PRESENTER-RUNBOOK.md` for desktop setup, console startup, and the slide-by-slide
walk with demo cues. `SPEAKER-NOTES.md` is the talk-track source of truth per slide.

## Customer decks

A customer-specific copy is a standalone seed of `builder/`, `shell/`, `slides/`, and
`assets/` from this deck, living at `~/akka/customers/<name>/deck/`, customized with that
customer's asks and numbers. See `~/akka/customers/<name>/CLAUDE.md` for the pattern. No
customer name, ask, or live tenant data belongs in this repo.
