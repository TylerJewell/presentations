# Akka positioning brief for the demo video

Paths are relative to `C:\Users\tyler\competition`. Where sources disagree, this follows the 2026-10-13
canon in `_internal/docs-positioning-study/01-core-positioning.md` (*core study*).

---

## 1. Positioning in one paragraph

Akka (formerly Lightbend) sells one offering, **the Akka Agentic AI Platform**, to "regulated, global
enterprises running agentic AI in production" (`llms/llms.txt:22`). Its category is **"The Agentic Systems
Platform"** and its banner is **"Scale AI, Efficiently."** (`llms/llms.txt:3-4`). The argument is that
"the cost of intelligence is dropping up to 10x each year" while demand rises (Jevons Paradox), so
"execution efficiency decides which enterprises scale AI adoption". Akka "eliminates inefficiencies at the
smallest scale, so that they never compound at the largest" (`llms/llms.txt:8`). The mechanism is one
runtime: "Akka runs your entire agentic system in a single runtime that guarantees resilience and
scalability … A system that compiles on Akka is ready for production" (`llms/llms.txt:10`). Four solutions (SDK, Specify, Verify, Optimize) "share one
definition of an AI system, one runtime, one evidence record, and one governance model"
(`akka-ai/index.html`). **The one-line promise: "Scale AI, Efficiently."**, backed by "A platform that
guarantees resilience and scalability." (`akka-overview/index.html`).

## 2. The platform's parts

The platform explorer (`akka-overview/index.html`, `sales-presentation/slides/family-platform`) groups the
four solutions into three bands:

- **Define & Govern**: Specify ("specs · generation · modernization") and Verify ("evaluations ·
  guardrails · policies · evidence").
- **Build & Run**: the SDK.
- **Models & Compute**: Optimize ("SLMs · training · grading · routing").

Each solution removes one named cost (`website/efficiency.html`).

### Akka SDK and the runtime ("Build & Run")

- **Problem.** Otherwise you assemble a framework, orchestration engine, broker, memory store, scheduler,
  API framework, database and cache (`akka-sdk/index.html`).
- **Claim.** "Akka SDK is the component model for building agentic systems. The platform's runtime
  guarantees the resilience and scalability of everything built with it."
- **Terms.** "Agents and workflows carry behaviour. Entities and views carry durable state. Endpoints,
  timers and consumers connect the system to everything outside it."
  - "State is durable by default and replayable from its event journal, so an agent that fails mid-task
    resumes from where it stopped." Orchestration is native ("without writing orchestration code");
    streaming runs "with backpressure … without an external broker".
- **Proof.** "99.9999% availability with sub-1 minute RTO and zero-byte RPO … backed by indemnities"
  (`llms/llms.txt:40`); 4 ms reads, 10 ms writes, 200M actors/core, 1M-node clusters
  (`akka-sdk/index.html`); "100 K+ Production deployments · 2 B+ People rely on Akka daily · 52 Financial
  services firms in production" (`akka-overview/index.html`).
- **Caution.** No cost claim with the SDK as subject (*core study*); "up to 90%" belongs to the
  platform's shared compute.

### Akka Specify ("Define & Govern")

- **Problem.** Rework. "20–40% engineering capacity lost to rework caused by earlier architectural
  choices" (`website/efficiency.html`).
- **Claim.** "Akka Specify is spec-driven development tooling that builds an agentic system from
  plain-language specifications and checks every change against them." Supporting lines:
  - "Specifications carry the exit conditions the system must meet. Any change that drifts from them is
    blocked before it merges."
  - "Specify runs inside the repos, CI, and AI harnesses your teams already use." (`akka-overview/index.html`)
- **Tagline.** "Software that stays free of technical and knowledge debt." The internal "guarantees …
  free of … debt" version needs legal sign-off (`akka-specify-modernization-positioning.md:177`).
- **Terms.**
  - "exit conditions", "definition of done", `/akka:specify`, `/akka:status` ("READY_TO_SHIP"),
    `/akka:conform`, `/akka:ship`, "AI harness". The plugin adds 22 commands (`llms/llms-master.txt:156`).
- **Proof.**
  - Dojo: "merchant onboarding in production in weeks, built by college graduates". **Not for public use**
    (see §5).
  - Coho AI: "got to market 75% faster" (`case-studies/coho-ai.md`).

### Akka Verify ("Define & Govern")

- **Problem.** Governance effort: "When evaluation, guardrails, and governance are separate systems, you
  lack a uniform way to see what your agents are doing, stop them, and answer for their actions"
  (`akka-verify/index.html`, tagline "AI, under control.").
- **Claim.** "Akka Verify is runtime-native evaluation, enforcement, evidence and governance for agents
  built on Akka or elsewhere." Evaluate ("Is it good?"), Enforce ("Will it stay in bounds?"), Govern ("Can
  you answer for it?").
- **Terms.**
  - "Policies allow, block, or report. Evaluations grade and score every response. Guardrails act inline,
    sanitizers redact and mask, and Human escalations put a person in the loop."
  - "Every run leaves a durable evidence record you can hand to an auditor, mapped against a corpus of
    227 regulations and frameworks."
  - Loop: "Define your risk → Identify your controls → Enforce your posture → Improve your posture"
    (`llms/llms-master.txt:216-221`).
  - Console vocabulary (decision D3): **signed bundles, verdicts**, and five control mechanisms
    (**guardrail, sanitizer, human, eval, gate**). Say **Human** for human review (HITL is retired) and
    **adversarial testing**, not red teaming.
- **Proof.** Manulife "rolled Akka out to 2,000 developers in 6 countries under central risk control".
  Corpus: 227 regulations and frameworks, 1,354 controls, 830 penalty-bearing (D4); re-read live from the
  corpus before recording.

### Akka Optimize ("Models & Compute")

- **Problem.** Token spend. "AI apps' share of revenue spent on COGS" is 30–40%, against 10–15% for SaaS
  (`website/efficiency.html`).
- **Claim.** "Akka Optimize routes traffic to the best open-weight model and trains smaller ones on your
  data. Optimize reads evaluated production traffic to find work a smaller model can take, then trains,
  proves, and promotes it. The measure is **cost per verified task**. Quality is held to the evidence
  Verify already collects, so cost falls without behaviour drifting." (`akka-overview/index.html`)
- **Terms.** Tagline "Own Your Intelligence."; loop **Observe · Route · Train · Serve**; "Model leverage /
  Data sovereignty / Cost governance"; the "90-day Optimization Assessment: Install, Observe, Witness"
  (`slides/opt-00`, `opt-03`, `opt-08`).
- **Proof.** Swiggy "cut prediction latency from 144ms to 71ms at 22% fewer tokens". The opt-02 economics
  ($60M baseline, 81% saved) rest on "assumed" inputs: a model, not a customer result.

### How the parts relate

The canon is "one Platform, four Solutions" sharing "one runtime, one evidence record, and one governance
model". It does not name a single specify → build → verify → run → optimize lifecycle. These loops do
exist:

- **Two lifecycles, one platform** (`slides/06-specifications`): Build and Govern specs meet in Specify →
  "One certified AI service" → Verify loops back.
- **The record is the connective tissue**: "The loop runs on the same interaction record that Akka Verify
  uses for governance, so cost and compliance read the same record" (`llms/llms-master.txt:192`).
- **Cross-deck spine**: "Specify builds the system from intent and keeps it modern. Optimize runs it at a
  governed cost. The platform guarantees resilience and scale under both." (`akka-specify-modernization-positioning.md:185`)
- **The console**: "System, Ask, Build, Controls, Activity, Human, Evidence and Cost" (`llms/llms.txt:53`);
  the website tour groups 55 steps as Platform, Specify, Verify, Optimize (`website/console-tour/tour.js`).

A video can therefore run **build (Specify) → run (Platform) → govern (Verify) → optimize (Optimize)**,
with one record underneath, and stay inside the canon.

## 3. Differentiators against the field

These seven recur across `battlecards/*.md` and `comparisons/compare-*.html`.

1. **Platform vs. framework.** "LangChain is a framework. Akka is a platform." (also CrewAI, LlamaIndex,
   PydanticAI, Vercel): "With a framework you assemble the parts and operate the result — availability,
   durable state, governance, and the pager are yours."
2. **One pre-integrated runtime.** "Akka gives you the agents, durable state, streaming, APIs, and
   governance as one pre-integrated runtime … a system that compiles is ready for production."
   Hyperscalers are framed as "a collection of services the customer must integrate, not an integrated
   platform" (Bedrock, Azure AI Foundry, Gemini Enterprise).
3. **Six-nines SLA Akka owns.** "a contractual 99.9999% availability SLA on the running system", "backed
   by indemnities", "~31-second yearly budget". Rivals: LangChain ~44 h, Bedrock ~8.8 h, Temporal
   ~52 min a year; Azure Agent Service and CrewAI have no SLA.
4. **Durable in-memory state.** "4 ms reads, sub-10 ms writes. Durability is a runtime property, not a
   database round-trip." Rivals: LangGraph up to ~150 ms, Temporal ~200 ms.
5. **Enforce, not observe.** "Risk teams define policies independently; the runtime enforces them on every
   action … with no developer code, into tamper-evident storage." The authoring guide calls it "Akka's strongest
   differentiator".
6. **Up to 90% less infrastructure at a fixed annual fee**, against rivals' meters (per trace, per
   action, per run, Flex Credits, DBUs), plus "Akka Optimize keeps improving the models on your own
   production traffic, so cost per task keeps falling."
7. **Track record and portability.** "since 2007, 100,000+ deployments — the runtime behind systems two
   billion people use daily", set against rival GA dates (AgentCore Oct 2025). "Any cloud, on-prem, or
   sovereign — portable specs, BSL licensing."

Per-rival hero lines: Temporal, "Temporal runs your workflows; Akka runs your whole agentic system — and
guarantees it."; LangChain, "the fastest way to a prototype and the slowest way to production";
Agentforce, "Agentforce is agents inside Salesforce. Akka is an open platform." The authoring guide
(`_internal/compare-page-authoring-guide.md`) forbids implying Akka runs a rival's agents and pairs every
number with the rival's counterpart.

## 4. The intro deck, slide by slide

The overview deck is `sales-presentation/builder/slide-registry.json`, built to `generated/overview/`.

| # | Slide | Key line | Visual |
|---|---|---|---|
| 00 | title | "**Scale AI**, efficiently." / "AGENTIC SYSTEMS PLATFORM" | Logo, presenter |
| 01 | hero | "The runtime making the world's most complex systems **reliable.**" | Counters: 100K+, 2B+, 52, 19+ certifications |
| 02 | types | "The world's systems have relied on Akka for 18 years." | 8 use-case cards × 4 logos |
| 03 | taxonomy | "The agent landscape." | Human-driven vs always-on agents; governance vendor map |
| 04 | complexity | "**Agentic AI** amplifies production complexity." | Intent/Autonomy/Boundaries/Posture → component matrix |
| 05 | platform | "Akka **Agentic AI Platform**" / "Lowest TCO. Highest Velocity." | Platform image |
| 06 | specifications | "Two specifications. **One certified system.**" | Build + Govern specs → Specify → Verify loop |
| 07 | use cases | "**One platform.** Every AI use case." | 12 weeks / 5B tokens/s / 2,000 devs |
| 08 | framework | "**Akka delivers the system.** Frameworks and hyperscalers sell you parts…" | 4-row us-vs-them table |
| 09 | innovations | "Three **core innovations**" | Actors, sharded data, streaming, with stats |
| 10 | devzero | "Describe what you want. **Ship it in hours.**" | Animated terminal, spec, generated architecture |
| 11 | resilience | "Agentic AI that **heals itself when nodes fail.**" | Embedded Resilience Tester |
| 12 | governance | "AI regulations are **costly and imposing.**" | Problem cards + embedded governance console |
| 13 | customers | Customer spotlight | Carousel: Manulife, Tubi, Swiggy, John Deere, "Global Payments Processor" |
| 14 | packages | "One platform. **Any cloud.**" | Tier chart Sandbox → Sovereign |
| 15 | specify | "AI, **delivered.**" | UP / SAFE / SMART |
| 16 | closing | "**Scale AI**, efficiently." | Get started → |

The Optimize deck (`optimize-registry.json`) runs opt-00, 01, 03, 06, 05, 02, 04, 07, family-platform, 08;
its lines include "Route to the best model, from any vendor." and "One view of quality, cost, and what to
do next." The Specify
deck (sp-00–sp-07) still sells "AI, delivered." and "One fixed price", both retired by D2. The Gartner
deck tells an operating-model story ("Scaling AI starts with principles", golden paths); the dev deck is a
confidential R&D teaching deck and not a source for external lines.

**Best 90-second setup (5 slides) for the Optimize demo in `demo/full/script.md`:**

1. **00-title**: "Scale AI, efficiently." (5 s)
2. **01-hero**: the proof counters. Drop "19+ InfoSec certifications", which the audit flags as
   ambiguous. (15 s)
3. **family-platform**: "An integrated platform." The three bands and four solutions, with the Optimize
   box highlighted. (25 s)
4. **opt-01-problem**: "The models to build your own intelligence are here." A tuned 4B model beats
   frontier models; "up to 12× lower inference cost". (20 s)
5. **opt-03-product**: "One loop that keeps making your AI better." Observe · Route · Train · Serve,
   which hands over to the console. (25 s)

Whole-platform alternative: 00-title, 04-complexity, family-platform, 11-resilience, 13-customers.

## 5. Customers and proof safe to say

`_internal/akka-facts.md:38` gives the approved list: "Public customers (OK to cite): Manulife, Tubi,
Swiggy, John Deere, Verizon. **Dojo is NOT permitted in public-facing docs.**"

| Customer | Safe line |
|---|---|
| Manulife | "2,000 developers in 6 countries under central risk control". Quote: "We ported our Python agents to Akka and got a 50% latency improvement and 300% concurrency improvement." — Jodie Wallis, CAIO (`akka-overview/index.html`). Never "70% latency" (akka-facts). |
| Swiggy | "P99 prediction latency from 144ms to 71ms"; "22% fewer tokens" (efficiency page). |
| Verizon | "1,600 to 12,000 orders per minute", "6 seconds to 2.4". Drop "750%". |
| John Deere | "1,000+ sensors on every combine". |
| Tubi / Fox | Pick one name; hold "5B tokens/s" and "150k → 22k cores" until sourced (`04-proof-content.md`). CTO: "Akka has enabled Tubi to provide customer experiences unlike any other in the video-on-demand space." |
| Public case-study page | Capital One "486 applications per minute, up from 100, answered in 180–200 milliseconds"; CERN "2.5 million signals a day"; Doctolib quote "we are able to run our entire backend system with just two engineers"; Walmart "web conversion rose 20 percent". |

Heritage line: "in production since 2007, 100,000+ deployments, 2 billion daily users, 52 financial
services institutions."

**Do not use:**

- Dojo by name. Use "a global payments processor".
- The anonymized Asian bank and North American grocer, whose figures are unconfirmed.
- Fluree (unreleased).
- The "60% lower cost" scorecard cells, which the audit says are unsourced.
- Anything from `_internal/` or `dev-presentation/`, which are confidential.
- The sp-06 price ("$——").

## 6. Words to use and words to avoid

**Use:** "the Akka Agentic AI Platform", "The Agentic Systems Platform", "Scale AI, Efficiently.",
"guarantees resilience and scalability", "one runtime", "a system that compiles is ready for production",
"solutions" (for the four), "AI harness", "install Akka from akka.ai", "exit conditions", "regulations
and frameworks", "signed bundles", "verdicts", "guardrail, sanitizer, human, eval, gate", "Human",
"adversarial testing", "cost per verified task", "own your intelligence", "open-weight", "since 2007".

**Avoid:**

- **Retired names:** "Akka Platform"; "products", "offerings" or "ways to get started" for the four;
  "Token Shredder"; "HITL"; "red teaming"; "signed Eval Matrix", "Governance Posture Package" and binding
  classes G/H/W/P/E/B/K (retired by D3, though llms-master still uses them).
- **Claims:** "AI regulations" as the corpus label; "Akka's SDK"; a cost claim with the SDK as subject;
  "delivered", "fixed price", "operated by Akka" or FDE contrasts for Specify (D2); prices; year counts
  ("18 years", still on slide 02); "never goes down"; "coming soon"; the retired frames (Never Fail /
  Self-Governing / Self-Improving / For Every Team, the three advantages).
- **Voice:** antithesis ("not X but Y", "instead of", "rather than"), hype verbs (unlock, leverage,
  seamless, empower), emotion adjectives (powerful, robust, modern), "by design", "load-bearing", question
  headings, and absolutes where the truth is "limited".
- **Numbers:** one figure per claim. Infrastructure is "up to 90%", not "70–90%". Keep 80% tokens away
  from Swiggy's 22%, and do not mix 1.4M TPS with 10M TPS.

Sources: *core study* "Banned or retired terms"; `llms/positioning-audit-2026-08.md` §3–4;
`case-studies/case-study-rules.md`.

## 7. What the existing demo material shows

- **`demos/product-tour/index.html`.** A ten-tab gallery. Only **Console** is built, with five shots on an
  insurance scenario. Verify, Specify, Optimize and Runtime are "Not yet populated".
- **`demos/governance/governance-demo.html`.** An animated terminal: "Define risk. Identify controls.
  Enforce. Improve." The system is `loan-adjudication-assistant` (EU + UK, "auto-approve under €5000;
  human review above"). The script runs `akka ai survey` → a 12-control matrix → `akka ai scaffold` ("23 of 23 controls bound
  1:1") → drift scan, model swap, replay ("38,402 cases · 96.3% match") → fine-tune queue. Everything is shown in the CLI and generated code; there are no console screens.
- **`demos/governance/governance-specify.html`.** An interactive explainer with a working risk survey. Its
  payoff: "Akka Verify reconstructs an Eval Matrix from the controls the code actually enforces".
- **`demos/stack-diagram/`.** The overview's stack diagram, for a projector.
- **`_internal/console-demo-intro/index.html`.** Seven slides: "Safe, efficient AI needs four things."
  (factories, agents, governance, models) → "Today you integrate the AI parts." → "In Akka, AI constructs
  are shared." → "Build, run, govern and optimize AI." → "An entire AI system in one binary." → "Deploy
  AI systems to any cloud." → "Akka works with what you run."

**What this implies about the story Tyler has told:**

- The recurring scenario is **regulated financial services**: loan adjudication and insurance claims, with
  "Acme" as the company.
- Governance is the most developed story, told through the CLI; the framing moved from "reliable" to
  "build, run, govern and optimize".
- Never shown: Optimize, the console's Verify and Cost screens, the Human review flow, and a single app
  carried end to end.
- The Loan Origination demo system in `demo/full/script.md` continues the lending scenario and fills the
  Optimize gap. `console-demo-intro` slide 4 ("Build, run, govern and optimize AI") is the closest
  existing bridge from slides to console.
