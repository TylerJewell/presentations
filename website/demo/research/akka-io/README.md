# akka.io /platform: visual design language and animation inventory

Researched 2026-10-27. Sources:

- Live site (headless browser): https://akka.io/platform (redirects to /platform/overview), /platform/specify, /verify, /optimize, /sdk. The browser viewport is 754 px wide and full-page element screenshots do not trigger scroll reveals, so the screenshots are low value (see list at the end).
- Local source, which is exact: `C:\Users\tyler\competition\_internal\product-pages-pro\` (overview/specify/verify/optimize/sdk .html, `assets\site.css`, `assets\site.js`, `img\*.webp`, `apps\reliability.html`).
  Its section ids, H2s and titles match what akka.io serves today. Treat **`product-pages-pro` as the live site**.
- `C:\Users\tyler\competition\_internal\product-pages-live\` is a different, richer draft of the same pages (Specify/Optimize/Verify/overview with different copy and a separate set of @keyframes, including a scroll-pinned "pinned deck" layout). It is not what akka.io serves today. It is listed separately below as "draft" so its code can be reused. Its H2s differ, for example "We make the smallest things efficient", "Specifications and systems that never drift", "Own Your Intelligence", "AI, under control".

The paths below are relative to `C:\Users\tyler\competition\_internal\`. Abbreviations: `pro/` = `product-pages-pro/`, `draft/` = `product-pages-live/`.

## 1. Design tokens

Source: `pro/assets/site.css` lines 1-100; the draft uses the same palette with slight variants.

| Token | Value |
|---|---|
| Page background | `#000000` (pure black). Alternate panel `#0E0E11`, `--medium-black #141414`, ink-2 `#0A0A0C` |
| Body text | `#F1F1F1`. Muted `#A6A6A6` (soft-grey), dim `#4E4E4E` (medium-grey) |
| Accent (the only brand colour) | Akka yellow `#FFCE4A`. The draft's specify/optimize pages use `#F5C518`. |
| Secondary accents | cyan `#00DBDD` (links, hover, workflow nodes), green `#72D35B` (ok/live dot), red-orange `#FF5400` (fail/halt) |
| Hairlines | `rgba(241,241,241,.10)`, strong `.20`. Section divider `rgba(241,241,241,.05)` |
| Backdrop | Each slide has a faint yellow dot grid: radial dot `rgba(255,206,74,.045)`, 48 px pitch, masked top and bottom |
| Heading font | Instrument Sans 700, `letter-spacing:-0.03em`, `line-height:1.04`, `text-wrap:balance` |
| Hero display | `clamp(68px,12.5vw,168px)`, tracking -0.045em, line-height .95. The live h1 "Akka" computes to 94 px / -4.2 px at 754 px width |
| Body | Instrument Sans 400, 16/1.6. The draft also uses "Akka Sans" 400/600/700 |
| H2 (live computed) | 32 px / 700 / -0.96 px at 754 px width. Draft: `clamp(30px,4.4vw,58px)` |
| Mono | JetBrains Mono 500/600, for eyebrows, chips, terminal text, diagram labels, "Verify › Activity" breadcrumbs |
| Eyebrow | 11 px, 600, UPPERCASE, `letter-spacing:.24em` (draft: 3 px), yellow, preceded by a 28x2 px yellow rule. Mono variant is grey with yellow rule |
| Accent word | A yellow `<span class="accent">` inside white headlines: "technical and knowledge debt", "never drift", "any AI system" |
| Radii | cards 11-12 px, inner boxes 8-9 px, inputs 6-7 px, chips/pills 999 px, screenshots 10-12 px |
| Card | `1px solid hairline`, bg `rgba(255,255,255,.025)`, hover border `rgba(255,206,74,.5)` + `translateY(-2px)`. "Core/selected" card: yellow gradient `160deg rgba(255,206,74,.13)->.035`, border `.55`, glow `0 0 60px -22px rgba(255,206,74,.6)` |
| Layout | `--inner:1240px` (draft 1400), gutter `clamp(16px,6vw,96px)`, text measure 760 px, section padding `clamp(96px,11vh,136px)`; full-height slides `min-height:100dvh - 72px header` |
| Product names | **Not colour-coded per product.** "Akka Specify / Verify / Optimize / SDK" are white bold text; the page's own product name goes in the mono yellow eyebrow ("AKKA SPECIFY") and the final CTA. In the family diagram, the selected product card turns yellow (name `#FFCE4A`, yellow-glow card). Navigation items are plain text. |
| CTA | "Get started →", "Talk to Akka →", "Start the assessment →". Plus an install chip: `› install Akka from akka.ai  [Copy]` (mono, "In your AI harness:") |
| Motion defaults | Reveal: opacity 0 + `translateY(22px)` -> none, `.7s ease` / `.8s cubic-bezier(.16,1,.3,1)`, stagger delays .08/.16/.24 s (class `rv d1..d3`). Hero: `heroFade .7-.8s cubic-bezier(.16,1,.3,1)`, +0.10 s and +0.24 s stagger. Diagram strokes: ease-out, .5-.9 s |

## 2. Animation inventory

None of the pages use video, canvas, WebGL, Lottie, Rive, GSAP, three.js or SMIL (`<animate>`). Everything is hand-written CSS plus vanilla JS driving inline SVG and DOM. The only embedded app is an iframe of `pro/apps/reliability.html?tab=hadr` (Resilience Tester). Product screenshots are static webp in `pro/img/` (e.g. `gateway-live-1440.webp`, `controls-1440.webp`, `human-halts-1044.webp`, `exp-shadow-1440.webp`, `evidence-regulation-1440.webp`, `tour-*-1280.webp`).

### Live site (pro/)

All JS is in `pro/assets/site.js`, all CSS in `pro/assets/site.css`.

| Page | Section | What it shows | How it moves | Built with | Local file / lines |
|---|---|---|---|---|---|
| all | every section | Content blocks rise into place as scrolled to | opacity 0->1, `translateY(22px)`->0, .7s ease / .8s `cubic-bezier(.16,1,.3,1)`, stagger .08 s steps; trigger: scroll (IntersectionObserver, rootMargin -8%, once) | CSS transition, class `rv`/`in` | site.js 361-367; site.css 751-753 |
| specify | hero (`[data-fx]`) | "Shipping factory" assembly line: spec doc -> Build -> Exit-condition gate (rows of checks) -> Release. Named builds (Loyalty v1, Claims, Onboarding, Payments, Support) move left to right as tokens. Every 4th build fails one exit condition (row turns red x, pill shows BLOCKED), returns to Build, is rebuilt, then passes (ALL MET). A release counter and "released" list tick up. | Continuous loop, one build every 3 s, tokens eased with cubic in-out (`ease(p)=4p^3` or `1-(-2p+2)^3/2`); station chips light, rows go scan -> ok/bad; progress bar width follows build; the return path dashes (`fxdash .6-.8s linear infinite`, stroke-dashoffset -16). Trigger: load, forever | Inline SVG, every frame computed from `requestAnimationFrame` clock; keyframe `fxdash` | site.js 196-312; site.css 357-392; markup `pro/specify.html` line 43 |
| specify | "Specifications and systems that never drift" (`[data-xform]`) | Dev spec on the left; its four parts (intro, entities, business rules, views) each light up the architecture components they produce | Cycles every 2.6 s; the active part and its target components get `.hot` (yellow fill `rgba(255,206,74,.10)`, 2.6 px yellow stroke); pauses on hover | JS class toggle on SVG | site.js 113-123; site.css ~457-462; also in `pro/overview.html` line 134 |
| specify | "Works with the toolchain" | SDLC tab panels (Policy, AI assistants, Repos, CI/CD, Security scanning, Deployment) | Tab click swaps panel: `fadein .3-.45s ease` (opacity + translateY 6 px) | CSS keyframe `fadein` | site.css 197-201, 241 |
| verify | hero (`[data-vp]`) | Governance graphic: six controls (Policies, Evaluations, Guardrails, Sanitizers, Human, Audit & attestation) each take a turn: the row lights, lines run to four systems (Claims agent, Underwriting workflow, Support agent, Research agent), each system shows a verdict tag (ALLOWED / GRADED / BLOCKED / MASKED / ESCALATED / ATTESTED, tones ok/info/bad/warn), and an evidence table adds a row (check mark, control, systems, verdict, regulation e.g. EU AI Act, NIST AI RMF, GDPR, ISO/IEC 42001) | 2.6 s per control, time-based phases: row lights at 0 s, lines at 0.4 s, verdicts at 0.8 s, evidence row at 1.2 s; evidence hub glows 1.0-1.9 s; the three latest evidence rows stack with opacity 1, .72, .44. Active links use `vpdash .7s linear infinite` (dash 3 6, yellow). Loop, trigger: load | Inline SVG + rAF clock; keyframe `vpdash` | site.js 314-354; site.css 650-651 |
| sdk, overview | Components graph (`[data-cg]`) | 12-node component graph (Component client, HTTP endpoints, Workflows, Agents, Autonomous agents, MCP, Event sourced entities, Key value entities, Views, Consumers, Timers, gRPC). Each node in turn is focal: its edges and neighbours light, flowing yellow dots run along edges, and a caption card for it fades in | Advances every 4.2 s (`data-cg-interval`), pauses on hover/click-pins; edges `cgflow 1.2s linear infinite` (dasharray 1 17, stroke-dashoffset -18, opacity .22 -> 1 when hot, round caps); caption `cgin .45s` (translateY 4 px) | Inline SVG, JS class toggle, keyframe `cgflow`, `cgin` | site.js 125-166; site.css 504-544 |
| sdk | Per-component mini diagrams (`.cx-stage` svg `.sd`) | One small node diagram per component (entity journal -> replay -> state, workflow fork/join, timer, etc.) | Revealed with `cgin .35s`, static after | Inline SVG | `pro/sdk.html` lines 99-135 |
| optimize | Experiments and cost bands (`[data-tabs]`, `data-autoplay`) | Product screenshots (Propose, Shadow, Canary, Rolled back) in a tab band | Auto-advances every 6.5 s, stops on user click; panel `fadein .45s` | JS setInterval + CSS keyframe | site.js 84-105; `pro/optimize.html` line 98 |
| overview, others | Headline word (`[data-words]`) | Rotating word swap | Every 2.2 s text swap, no transition | setInterval | site.js 107-111 |
| overview, specify, optimize, verify | Console screenshot tours (webp in `.shot`) | Real UI shots of the akka console (Verify › Controls, Human › Halts, Evidence by regulation, Optimize › Inference › Gateway · live, Training), with a mono breadcrumb caption | Static image, click opens lightbox (fade). Not animated | `<img>` | `pro/img/*.webp`; site.js 368-378 |
| overview | Resilience Tester | iframe of the live resilience demo ("Kill nodes, inject failures, watch Akka self-heal") | Runs inside the iframe | iframe `pro/apps/reliability.html?tab=hadr` | `pro/overview.html` |
| overview, sdk | "One binary" replicas diagram (`.pkg`) | Stack box (Agents and workflows, Controls, Model routing, Endpoints, Akka runtime) fans out via yellow curves into replica boxes with small squares (sessions); three steps Start / Scale / Recover (a replica turns red x, its yellow squares move to the others) | Static drawing (no keyframes); effect is told by the steps | HTML/CSS grid + SVG `.fan` paths | site.css 467-492; `pro/overview.html` ~192-196 |
| all | scroll cue | "Scroll" with a chevron that bobs | `bd 1.6s ease infinite`, 45 deg chevron translate 0->3 px | CSS keyframe | draft CSS |

### Draft (`draft/` = product-pages-live), reusable code with more motion

All are CSS inline in each html file's `<style>` blocks (extract with the scripts in the report). Triggers are IntersectionObserver adding `.visible` unless noted.

| Page | Section | What it shows | How it moves | Built with | File |
|---|---|---|---|---|---|
| overview | hero "Scale AI, Efficiently" | Economics slides: supply/demand log-scale charts, three constraint figures; stat tiles | Count-up numbers: ease-out cubic `1-(1-p)^3`, 1100 ms, once at 40% visible | rAF in JS | `draft/overview.html` JS ~240-252 |
| overview | Platform / "An integrated platform" (`#platform.revealed`) | Four-layer platform diagram (Define & Govern / Build & Run / Models & Compute) with Specify, Verify, SDK, Optimize cards; the core card pulses; flow wheels run on four traces | `corepulse 5.5s ease-in-out infinite` (glow 60->84 px, alpha .42->.68); `wheel .9s linear infinite` on stroke-dashoffset 0 -> -10 with delays 2.40/2.60/2.80/3.00 s per trace; rail `flow .9s linear infinite` (2x8 px yellow dashes, background-position 0->8 px) | CSS | `draft/overview.html` CSS (`.ocard--core`, `.fly-trace`, `.conn .rail`) |
| overview | SRE dot | Green status dot | `pulse 2s ease infinite` (opacity 1 -> .3) | CSS | same |
| specify | hero | Headline reveals line by line in masked lines | `.line-inner` rises with delays .55 / .68 / .81 s; yellow 56x3 px divider `fadeUp .5s ease` at 1.1 s; hero background `bgSlide` | CSS | `draft/specify.html` |
| specify | `.spec-flow` (Build and Govern tracks) | Two swim lanes (Build: PM, Dev, ML Eng, Data Eng, Biz Analyst, Citizen Dev; Govern: Risk, Security, Compliance, SRE, FinOps) merge via arrows into the Akka Specify hub, then outputs (Dev Spec / Eval Matrix, Exit conditions, Auditors) and the "Akka managed: one system, built and run" box; a feedback loop path draws back | `spec-rise .5s ease-out` (opacity + rise), staggered: labels .15/.30 s, inputs .30/.45 s, artifacts .65/.80 s; hub `spec-pop .5s ease-out .55s` (scale .96 -> 1); merge arrows `spec-draw .55s ease-out` (stroke-dashoffset to 0) at 1.0/1.05/1.45 s; arrowhead `spec-fade .15s` at 1.85 s; loop path `spec-loop-trace .9s ease-out` at 2.0 s, head at 2.85 s | SVG stroke-dash draw-on + CSS delays | `draft/specify.html`, `draft/verify.html` CSS (`.spec-flow.visible ...`) |
| specify | "Delivered in weeks" terminal | Terminal types `/akka:specify` etc. beside the spec.md card and generated architecture | Typewriter (per-character timers), 120/350/380 ms pauses between command and step; starts at 600 ms, pinned-scroll progress `(scrollY - top)/(height - viewport)` drives steps, resets on scroll back (run tokens invalidate in-flight typing) | JS setTimeout state machine, scroll listener | `draft/specify.html` JS 156-460 |
| specify, optimize | kiosk deck | Auto-advancing slides with a progress fill; tabs inside a slide advance every SLIDE_MS/6 | Default 30 s per slide (`?kiosk=N` seconds), tab step = slide/6, fill bar | JS | `draft/specify.html` ~763-845; `draft/optimize.html` ~435-517 |
| specify | SDLC tabs | Panel swap | `sdlcIn .3s ease` (opacity + 6 px rise) | CSS | `draft/specify.html` |
| specify | `s5blink` | Terminal cursor blink | CSS blink | CSS | `draft/specify.html` |
| verify, sdk | hero | Eyebrow, h1, tagline fade in | `heroFade` .7 s / .8 s `cubic-bezier(.16,1,.3,1)`, delays 0, .10, .24 s | CSS | `draft/verify.html`, `draft/sdk.html` |
| verify | stat tiles | 227 / 145 / 7% / 79% | `setInterval` 22 ms count-up, step = target/45 | JS | `draft/verify.html` JS ~110 |
| verify | Off Akka vs On Akka comparison list | Seven rows, each with Off vs On line | `in .3s ease` (rise 8 px) on active panel | CSS | `draft/verify.html` |
| optimize | `.ts1-chart-curve` | "AI spend as agent fleets grow" two curves (infra, tokens) draw on, then series labels fade | `ts1-draw .8s ease-out .15s` and `.9s .35s` (stroke-dashoffset to 0), `ts1-fade .25s` at 1.15 s | SVG stroke-dash | `draft/optimize.html` CSS |
| optimize | `.ts2-flow` loop (Observe, Route, Train, Serve) | Five stages appear in order and a loop path draws back with label "Continuous improvement" | `ts2-rise .5s ease-out` with delays .10/.24/.38/.52/.66 s; loop `ts2-trace .9s ease-out 1.1s`; head `ts2-fade` at 1.95 s; label `.4s` at 2.0 s | SVG + CSS | same |
| optimize | `.ts3-grade` gate | Incumbent vs candidate fan arrows into GATE (quality >= baseline, token drop >= target) then Promote | `ts3-draw .5s ease-out`, delays .35/.45/.55 s; head at .95 s | SVG | same |
| optimize | cost "cog" table | Scroll-scrubbed list: a sticky stage holds header; rows translate up with scroll | `translateY(-p*maxShift)`, p = (scrollY - top - 10% vh) / (1.35 x overflow); extra dwell 45% vh at end; hint "scroll to explore" fades after p > .02; cog dots `cog-bounce` (opacity .45 -> 1, rotate 45 deg + translate 2 px) | JS scroll handler (passive) | `draft/optimize.html` JS 188-215 |
| all draft pages | rails between layers | Yellow dashed vertical line flowing downward | `famflow .9s linear infinite` (background-position 0 -> 8 px; `linear-gradient(yellow 0 45%, transparent 45% 100%)`, size 100% x 8 px, opacity .55) | CSS | all `draft/*.html` |

## 3. Per-page sections and copy (live site = `pro/`)

### /platform (-> /platform/overview), title "Akka Agentic AI Platform — Scale AI, Efficiently"

- Hero: eyebrow "The Agentic AI Platform"; H1 "Akka"; sub "Scale AI, Efficiently."; cue "Scroll".
- #solutions: "An integrated platform." / "The platform uses smart shared abstractions to make every AI system as efficient as possible."
  - "Akka SDK is the component model for building agentic systems."
  - "Akka Specify builds agentic systems from your specifications and releases only what meets your definition of done."
  - "Akka Verify applies any control to any AI system and guarantees its enforcement."
  - "Akka Optimize puts each request on the best model for the task, including smaller models trained on your data."
- #build: "Create agentic systems from composable parts." Behaviour = Agents, Autonomous agents, Workflows; State = Event sourced entities, Key value entities, Views; Endpoints = HTTP, gRPC, MCP, Timed actions, Consumers. "Agents and workflows carry behaviour. Entities and views carry durable state. Endpoints, timers and consumers connect the system to everything outside it."
- #specify: "Specifications and systems that never drift." / "Akka Specify generates the system, audits it against your exit conditions, and blocks drift." Example spec: Customer Loyalty Service. Runs in Claude Code, Gemini CLI, Codex CLI, Cursor, VS Code + Copilot.
- #binary: "An entire AI system in one binary." / "Agents, controls and model routing compile with the Akka runtime into one service, and its replicas form a cluster without a service mesh." Steps: Start, Scale ("A new replica joins and takes its share."), Recover ("A replica fails and its sessions resume on the others.").
- #gateway: "Route to the best model, from any vendor." (screenshot "Optimize › Inference › Gateway · live"; links Inference, Experiments, Training).
- #governance: "Apply any control to any AI system." / "Risk teams govern every agentic system without waiting on its developers, and every control they apply is guaranteed to be enforced." 241 regulations and frameworks, 1,718 controls; Policies (allow, block, or report), Evaluations (observe, grade, score), Guardrails (act inline), Sanitizers (redact, mask, reshape), Human (escalations, a human in the loop), Audit & attestation (tamper-evident).
- #architecture: "A platform that guarantees resilience and scalability." / "Agents resume mid-workflow on a healthy node with memory intact. Memory replicates active-active across regions and reconciles when a region returns. Backpressure absorbs load, and rolling updates ship without downtime."
- #economics: "Efficiency decides which enterprises scale AI." Supply "The cost of intelligence is dropping about 10x each year."; Demand "Every capability release multiplies the AI use cases an enterprise can adopt."; Constraint "Early inefficiencies compound and stall AI adoption."
- #deploy: "Deploy into any cloud." Akka cloud / Your VPC / Your Kubernetes; Dedicated, Day 2 Ops, Business Continuity (+ Active-Active HA/DR), Sovereign Cloud (+ Sovereign Plane); "24/7 SRE Management & Monitoring".
- Close: "Scale AI, efficiently." / "In your AI harness: install Akka from akka.ai" / "Talk to Akka →".

### /platform/specify, "Akka Specify — Spec-driven production AI"

- Hero: eyebrow "Akka Specify"; H1 "Software that stays free of technical and knowledge debt."
- #what: "Software, delivered." / "Akka Specify builds agentic systems from your specifications and releases only what meets your definition of done. Your specifications become checks that are verified continuously. Any change that drifts fails before it ships." Stats: UP 99.9999% availability / CLEAN "No debt as it ages" / TRUE "Specs match what runs".
- #build: "Specifications and systems that never drift."
- #weeks: "Delivered in weeks." Greenfield "From your specifications to a running system in weeks." Modernization "What the legacy code does becomes checks the modern system must pass." Verified parity "The rebuilt system reproduces the old behavior, and the checks prove it."
- #test: "Test, evaluate and red-team before release." (Integration / Evals / Adversarial).
- #toolchain: "Works with the toolchain you already have." "You define what done means, and what must never happen." "Choose from our catalog of 1,210 exit conditions." 18 families (Functional 80, Data integrity 99, Reliability 88, Security & compliance 101, ... Agentic AI safety 11). "It runs inside the assistant your developers already use." "It runs in the repo you already have." "It uses the pipeline you already run." "Your scanners stay your scanners." "Deploy where you already deploy."
- #factory: "Your software factory, modernized." Rewrites ("so it never needs a rewrite"), Turnover, Capacity, Partners, Portability ("rebuild the system anywhere, including off Akka").
- Close: "Modernize how you build software, and keep it modern."
- Draft-only proof: "5,000 onboardings / month" (Britain's largest payments provider), "2 months to parity" ($4B APAC bank, 10-year-old app budgeted for 3 years), "$2M per year removed" (North American grocer, SaaS replaced in 4 weeks).

### /platform/verify, "Akka Verify — Apply any control to any AI system"

- Hero: H1 "Apply any control to any AI system." / "Risk teams govern every agentic system without waiting on its developers, and every control they apply is guaranteed to be enforced." Tabs: Controls, Activity, Human, Evidence.
- #plane: "A working agent is a long way from a production-ready one." / "When evaluation, guardrails, and governance are separate systems, you lack a uniform way to see what your agents are doing, stop them, and answer for their actions."
- #why: "The cost of getting governance wrong." 91 of 241 regulations carry financial penalties; 7% EU AI Act maximum penalty; 79% of avoidable token spend.
- #controls: "Define policies based upon your risk profile." Adopt / Describe / Plan / Decide / Sign. "Verify › Controls".
- #activity: "Evaluation runs where the agent runs." Provenance "Every record and trace is immutable."; Fidelity "Akka evaluates what the agent did."; Actuation "Evaluation can act in time to stop a response."; Replay & counterfactual "Run tomorrow's guardrail against last quarter's real traffic."; Data residency "Govern the data without letting it leave."; Coverage & economics "Every interaction is evaluated."; Meta-audit "The evaluator is governed too."
- #human: "Something has to stop it when it goes wrong." Waiting / Answered / Standing / Halts / Officers.
- #evidence: "A record an auditor or regulator will accept." / "Every run leaves a durable evidence record you can hand to an auditor, mapped against a corpus of 241 regulations and frameworks."
- Close: "AI, under control." (draft: "Evaluate, enforce, and govern agents.")

### /platform/optimize, "Akka Optimize — Own Your Intelligence"

- Hero: H1 "Own Your Intelligence." / "Akka Optimize puts each request on the best model for the task, including smaller models trained on your data." Chips Observe, Route, Train, Serve.
- #opportunity: "The models to build your own intelligence are here." / "Open-weight models have reached frontier-level quality, and a comparable one follows every frontier release within a few months." Bars: content moderation (Gemma 3 4B tuned 0.80, Claude Sonnet 3.7 0.77, GPT-4o 0.76); enterprise RAG (tuned 8B 51%, leading closed model 29%, tie 20%).
- #engine: "One loop that keeps making your AI better." Observe "measure the work your agents do on live traffic"; Route "send each task to the model that fits it best"; Train "specialize models on your own data"; Serve "run them in your environment, with frontier fallback".
- #cost: "Full control over what your AI costs." (Costs, Efficiency, Budgets, Prices, Changes). "See what every AI call costs, attribute it to an owner, and route each task to the cheapest capable model under your budgets."
- #inference: "Route to the best model, from any vendor."
- #experiments: "Prove every model change on live traffic." Propose / Shadow ("Candidate runs alongside incumbent.") / Canary ("Gradual rollout by traffic share.") / Rolled back. "Quality stays protected: if a candidate ever slips, Akka returns to the proven model right away."
- #training: "Build intelligence from your own data." "Akka tunes an open-weight base (4-12B) with reinforcement learning against your interaction data, using your evaluations as the grader." GATE: quality >= baseline, token drop >= target -> Promote canary -> fleet. "Every promotion comes with a before-and-after benchmark, measured by your own evaluations on your own traffic and saved to the audit record."
- Close: "Own Your Intelligence." / "The 90-day Optimization Assessment" (draft: Install days 1-30, Observe 31-60, Witness 61-90).

### /platform/sdk, "Akka SDK — Everything an agentic system needs"

- Hero: eyebrow "Behavior · State · Endpoints"; H1 "Akka SDK"; "Akka SDK is the component model for building agentic systems."
- #intent: "An SDK that models entire AI systems." / "...so that an agent that fails mid-task resumes rather than restarts." "Otherwise you assemble" Agent framework, Orchestration engine, Message broker, Memory / vector store, Job scheduler, API framework, State database, Cache -> "Akka SDK: One programming model. Every component is a clustered microservice, so the infrastructure you would otherwise integrate is already built in."
- #components: "Create agentic systems from composable parts." (12 components, each with Java snippet).
- #architecture: "We've been building distributed systems since 2009." (draft says 2007). Three pillars: in-memory actor-based concurrency & clustering; stateful, durable & sharded data; real-time event-driven streaming with backpressure.
- #guarantee: "If it compiles, it's production-ready." / "You write the domain logic. Resilience and scalability are built into the runtime, so the system that runs on your laptop is the system that runs in production."
- #binary: "An entire AI system in one binary."
- Close: "Everything an agentic system needs." / "Behavior, state, and endpoints in one model."
- Draft-only: stats 4 KB actors, 200M actors/core, 1M node clusters, 4 ms reads, 10 ms writes, 1 min RTO, 0 B RPO; terminal demo "/akka:specify ... Inferring definition of done... 17 conditions ... NEEDS_INPUT -> 3 decisions to close ... READY_TO_SHIP".

Cross-page phrases worth reusing: "Scale AI, Efficiently."; "Own Your Intelligence."; "AI, under control."; "Apply any control to any AI system."; "Software that stays free of technical and knowledge debt."; "Specifications and systems that never drift."; "cost per verified task"; "Run tomorrow's guardrail against last quarter's real traffic."; "If it compiles, it's production-ready."

## 4. Screenshot files

Saved in `C:\Users\tyler\ai-console\demo\research\akka-io\`:

- `overview-fullpage-754w.png` (live /platform/overview, 754 px wide, scrolled through; later sections unrevealed)
- `specify-fullpage-754w.jpg` (live /platform/specify, mostly unrevealed)
- `verify-fullpage-754w-unrevealed.jpg` (live /platform/verify, hero only; the rest is unrevealed black)

Limitation: the headless viewport is 754 px and element screenshots did not trigger reveals (they came back black), so for visual reference use `pro/img/*.webp` (the real console shots Akka uses) and render the local html in a desktop browser. Visual structure is in the CSS and SVG listed above.
