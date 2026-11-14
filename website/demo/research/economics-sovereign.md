# Research for the closing minute: efficiency economics, fixed-fee pricing, sovereign deployment

Paths are relative to `C:\Users\tyler\competition` (CT) unless absolute. Line numbers checked 2026-10-27.

## 0. Manulife / Reuters request: article not found

- No Reuters article found in the competition folder (grep "Reuters", "99.7") or on the web (two searches). The "99.7%" error-rate figure appears nowhere in the sources. Do not attribute it to Reuters and do not use it.
- What exists:
  - Quote on akka.io/platform/overview (and `akka-overview/index.html`, per the positioning brief): "We ported our Python agents to Akka and got a 50% latency improvement and 300% concurrency improvement." Attributed to Jodie Wallis, Chief AI Officer (CAIO), Manulife. The source is Akka's own page, not Reuters.
  - `_internal/akka-facts.md:20`: "Manulife: up to 300% more concurrency and 30-50% faster processing after porting Python-based systems to Akka (Source: akka.io/blog/go-slow-to-go-fast - use 30-50%, NOT 70% latency)". The facts file says 30-50% while the page quote says 50%. Use "50%" in her quoted words, "30-50%" if paraphrasing.
  - Press release, 2026-03-10, "Manulife Selects Akka to Operationalize Agentic AI within its Enterprise AI Platform" (https://akka.io/blog/manulife-selects-akka-to-operationalize-agentic-ai; also newswire.ca). Wallis, "Global Chief AI Officer for Manulife": "Our insurance and investment businesses are built on trust, and that same principle guides our approach to AI" (CT `blog-technical/posts/manulife-selects-akka-to-operationalize-agentic-ai.html:31`). It contains no concurrency or error figures.
- Safe attribution: "Jodie Wallis, Chief AI Officer, Manulife, on akka.io". If Reuters is wanted, the coordinator must supply the article; I could not verify that it exists.

## 1. Approved claims, verbatim

### Efficiency and concurrency
- "The cost of intelligence is dropping about 10x each year." (Supply) / "Every capability release multiplies the AI use cases an enterprise can adopt." (Demand) / "Early inefficiencies compound and stall AI adoption." (Constraint). `_internal/product-pages-pro/overview.html:261-266`; heading "Efficiency decides which enterprises scale AI." Confirmed live on akka.io/platform/overview.
- "Akka eliminates inefficiencies at the smallest scale, so that they never compound at the largest" (`llms/llms.txt:8`, via the positioning brief).
- 4 KB actors, "200M actors/core", "1M-node clusters"; "4ms reads / sub-10ms writes" durable in-memory state. `_internal/akka-facts.md:10`.
- "99.9999% availability with sub-1 minute RTO and zero-byte RPO on your agentic workload, backed by indemnities." `llms/llms.txt:31`; `akka-facts.md:6-7`.
- "~10 trillion tokens / core / year vs ~2 trillion for comparable solutions; ~80% less compute than Python-based frameworks" (cited source: akka.io/blog/go-slow-to-go-fast). `akka-facts.md:16`.
- "AI systems on Akka are up to 90% cheaper to operate than Python-based systems - a function of infrastructure required for the same agentic transaction volume, NOT list price. Drivers: actor concurrency, shared compute, micro-checkpointing." `akka-facts.md:15`.
- "Shared compute ... for up to 90% lower infrastructure cost than per-service cloud AI stacks, LangChain, or Temporal." `llms/llms-master.txt:93`; five mechanisms at `llms-master.txt:419` (shared compute, sub-10ms memory, scale-to-zero, no inter-service egress, built-in eval/guardrails/observability).
- Customer proof (public): Manulife above; Swiggy "P99 prediction latency from 144ms to 71ms at 22% fewer tokens"; Esdiac "65% lower infrastructure cost, 10x users" and Fox "150,000 to 22,000 cores; 40% lower cost per session" (core study `docs-positioning-study/01-core-positioning.md:313-315`; the brief says hold the Tubi/Fox core figures until sourced).

### Pricing model
- "Fixed-fee pricing - Akka is billed on platform tier and service cores, rather than per call, per token, or per service. Finance can forecast next year's bill." `llms/llms-master.txt:422`.
- "One invoice - One platform, one line item." Hyperscaler stacks "aggregate six to eight separately billed services ... that scale independently with usage." `llms-master.txt:423`.
- "No usage-cliff surprises - Built-in token tracking, memory compaction, and runtime guardrails stop bad spend before it lands on the invoice." `llms-master.txt:424`.
- "Shared compute: ... on one runtime (fixed annual fee; predictable, not consumption-metered)." `akka-facts.md:21`.
- What is included: "Orchestration, agents, memory, streaming, APIs, governance, and model economics all run on the same infrastructure. There are no separate memory charges, no streaming charges, and no observability charges." `llms-master.txt:417`. "Akka charges for service cores only, and platform cores are part of the cloud infrastructure you provision in your own environment." `llms-master.txt` tier text (about lines 466-470).
- Tokens: the fee covers the platform (service cores), not the model provider's per-token bill. What Akka says about tokens is that spend is trackable and reducible: token tracking built in; "Token spend is usually the single biggest line item"; Optimize's measure "cost per verified task"; "up to 70% fewer tokens" in the old TCO doc (`_internal/akka-tco-analysis.md:91`, uses the retired name AdaptiveML). Nothing found says inference or tokens are inside the fixed fee. Do not say they are.
- Finance angle: "CFO / VP Finance - ... Cares about TCO, spend predictability, and ROI timeline." `llms-master.txt:308`.

### Hyperscaler and consumption comparison
- "Cloud providers charge per service for each capability. Frameworks shift cost to your engineering team. SaaS agents bundle agent cost into vendor SKUs. Observability tools meter on ingestion." `llms-master.txt:413`.
- Typical stack: inference per token; orchestration per step; memory "per query plus storage, at 150 to 200ms latency"; streaming per throughput unit; gateway per call; logging per GB; guardrails per call; egress. "Enterprise Agreements reduce per-service rates, but they do not change the architecture, so you are still paying six to eight separate bills that compound with scale." `llms-master.txt:415`.
- Bedrock battlecard cost row: "Consumption-metered across the AgentCore services (per-vCPU-hour, per-request, per-token) plus separately billed model inference" versus "Shared compute; up to 90% lower infrastructure for the same workload, fixed annual fee." `battlecards/battlecard-aws-bedrock.md:31`.
- TCO dollar figures conflict: home page "5 trillion tokens a year at 80% accuracy: $836K on Akka against $5.17M on AWS"; repo `/efficiency` "$1.67M against $8.09M" for the same volume (`01-core-positioning.md:325,333`; the efficiency page is unpublished). Avoid both. `akka-tco-analysis.md` ranges (70-90% infra) are an illustrative worksheet dated 2026-04-13, labelled "Historical" in the core study, not customer results (`akka-tco-analysis.md:276`).
- "Hyperscaler prices keep rising": no source found. The sources support "consumption-metered, several meters, compounds with scale", not rising prices. Keep to that.

### Sovereign and deployment
- Name: **Sovereign Cloud**, a service tier; the overview page shows add-ons "+ Active-Active HA/DR" and "+ Sovereign Plane". `_internal/product-pages-pro/overview.html:281`; `akka-overview/index.html:1404`.
- Definition: "Country isolated data, networking, and operations." (`overview.html:281`). "A country-isolated configuration for regulatory and sovereign requirements, where traffic and data stay in-region, with local SREs and a private federation plane. Supported regions include China, the EU, Singapore, the UK, Japan, Australia, and more. Includes two dedicated TAM/FDEs." `llms/llms-master.txt` tier list (about lines 456-481).
- Unique-guarantee line: "Full-parity sovereign cloud deployment that preserves HA and DR, with data and network isolation and local support for China, Hong Kong, Singapore, North America, Canada, and the EU." `llms/llms.txt:36`.
- "Sovereign deployments for Europe, Canada, and China available." `akka-overview/index.html:1342`.
- Partners and clouds: "Akka runs across every major hyperscaler and on sovereign clouds including T-Systems and AllyCloud, for public, private, and country-isolated deployments from one platform." `llms/llms-master.txt:491`.
- "hyperscaler VPC (AWS/Azure/GCP), own Kubernetes, on-prem; sovereign cloud (country-isolated data/networking/ops, local SREs)". `akka-facts.md:32`.
- Operated by whom: Day 2 Ops is "continuously managed by us" (`overview.html:279`) with 24/7 SRE; Sovereign adds local SREs. Installed "into your VPC".
- "Runs on" logo row on the internal console-demo slide "Deploy AI systems to any cloud.": AWS, Microsoft Azure, Google Cloud, Alibaba Cloud, T-Systems. `_internal/console-demo-intro/index.html:220` (internal deck). Sub-line at line 213: "Akka Automated Operations runs on serverless, dedicated infrastructure, or within your own cloud account."
- Also: "BSL licensing on the runtime, so you can run, modify, and self-host", "portable specs".

## 2. Cautions and gaps

- **Alibaba Cloud**: appears only as a logo in the internal console-demo deck (line 220). No text claim anywhere (llms files, facts, overview page, tier copy). Unverified as a named install target; consistent with the China sovereign region but not stated.
- **T-Systems**: stated in text at `llms-master.txt:491` ("T-Systems and AllyCloud") plus the logo. Not on the live overview page.
- **AWS, Azure, GCP**: supported (`akka-facts.md:32`; logo row). The live overview page names none of them; it says "Akka installed into your VPC".
- **"Sovereign variant installs into those five clouds"**: no source combines the Sovereign tier with those five clouds. Sources say the tier is country-isolated with local SREs and a private federation plane, and separately that Akka runs on hyperscalers and sovereign clouds. Confirm before putting all five names under the word "sovereign". Air-gapped is not stated anywhere. Region lists conflict (`01-core-positioning.md:342`): China/HK/Singapore/North America/Canada/EU, China/EU/Singapore/UK/Japan/Australia, and Europe/Canada/China. Do not list regions on screen; say "country-isolated".
- **Prices and "fixed price"** are retired for Specify (D2, D6; `01-core-positioning.md:171,392`). "Fixed annual fee" remains in the facts file and battlecards for the platform, but the brief lists "fixed price" under avoid. Safest on-screen wording: "Priced on platform tier and service cores, not per call or per token. Finance can forecast next year's bill." No dollar figures.
- **SDK**: no cost-reduction verb with the SDK as subject (`01-core-positioning.md:389,504-509`). Attribute "up to 90%" to the platform's shared compute, and say "infrastructure", not total cost or token spend. Do not mix 90% with Optimize's 80%/22%/70% token figures. Use "up to 90%", not 70-90%.
- "Up to 90% cheaper than Python-based systems" is infrastructure for the same transaction volume, not list price (`akka-facts.md:15`).
- Avoid "no unexpected bills" and "never"; the approved version is "No usage-cliff surprises" with its mechanism (token tracking, guardrails).
- Voice: no antithesis ("not X but Y", "instead of", "rather than"), no hype verbs, no year counts (sources conflict: "18 years" vs "since 2009"; the brief says "since 2007").
- Manulife 300%/50% is vendor-published only.

## 3. Visuals already on the akka.io pages

Pages are in `C:\Users\tyler\competition\_internal\product-pages-pro\`; CSS `assets/site.css`, JS `assets/site.js`.
- **Supply / Demand / Constraint**: `overview.html:259-271` (section `#economics`). Three columns `.cols3` (`site.css:297-301`) with yellow mono labels, entering by the shared `.rv` reveal with `.d1/.d2` stagger, driven by an IntersectionObserver (`site.js:361-366`, adds class `in`). There is no cost-curve graphic on this section; a drawing curve (supply falling, demand rising, inefficiency compounding) would be new. Reusable idioms: dashed-line animation `fxdash` (`site.css:356-358`) and flowing dots `cgflow` (`site.css:504-505`).
- **Deploy into any cloud**: `overview.html:273-295` (`#deploy`): `.envs` pills "The Akka Cloud / Your VPC / Your Kubernetes", four `.tiers` cards (`site.css:303-307`; Sovereign card with green "+ Active-Active HA/DR / + Sovereign Plane" `.x` lines), and a `details.more` "24/7 SRE Management & Monitoring" list (live CVE patching, rolling updates, scale-to-zero "pay for what you use"). The tier chart for the platform deck is `akka-overview/index.html:1342-1404` (`pkg-*` classes, "Sovereign Plane" pill at 1404, `pkg-reveal` stagger).
- **Runs-on logo strip**: `_internal/console-demo-intro/index.html:220` (AWS, Azure, Google Cloud, Alibaba Cloud, T-Systems on one row), the ready-made visual for an "any cloud" beat.
- **Replica sequence** (Start, Scale, Recover): `overview.html:176-205` and `sdk.html:175-192`; CSS block "one binary, replicas" at `site.css:467-480` onward (`.bin`, `.fan` three-path fan-out SVG, `.step` rows with `.reps .r` replica boxes of `<i>` sessions, `.r.new` joining, `.r.dead` with a cross, `.mv` moving sessions). Lines: "Each replica owns a share of the agent sessions." / "A new replica joins and takes its share." / "A replica fails and its sessions resume on the others."
- Token-flow animation (`data-fx`, `site.js:199-300`, counter `[data-fx-count]`) and the rotating tickers (`site.js:98,110,118,148`) can be reused for an actors-per-core or cost counter.

## 4. Fifteen-line summary

1. Thesis (approved): cost of intelligence falls about 10x a year; demand multiplies; early inefficiencies compound. Efficiency decides who scales. (`overview.html:261-266`)
2. "Akka eliminates inefficiencies at the smallest scale, so that they never compound at the largest." (`llms.txt:8`)
3. 4 KB actors, 200M actors per core, 1M-node clusters; 4 ms reads, sub-10 ms writes. (`akka-facts.md:10`)
4. 99.9999% availability, sub-1-minute RTO, zero-byte RPO, backed by indemnities. (`llms.txt:31`)
5. Up to 90% lower infrastructure cost from shared compute and actor density (platform, not SDK; infrastructure, not tokens). (`llms-master.txt:93,419`)
6. About 10T tokens per core per year vs about 2T; about 80% less compute than Python frameworks. (`akka-facts.md:16`)
7. Manulife CAIO Jodie Wallis: "50% latency improvement and 300% concurrency improvement" after porting Python agents. Source is akka.io, not Reuters; no 99.7% found.
8. Fixed fee: billed on platform tier and service cores, not per call, per token or per service; "Finance can forecast next year's bill." (`llms-master.txt:422`)
9. One invoice vs six to eight separately metered bills that "compound with scale"; EAs cut rates, not architecture. (`llms-master.txt:415,423`)
10. "No usage-cliff surprises": token tracking, memory compaction and guardrails stop bad spend before it lands. (`llms-master.txt:424`)
11. Tokens are not stated to be inside the fee; the token lever is volume (Optimize, cost per verified task).
12. Sovereign Cloud tier: "Country isolated data, networking, and operations", local SREs, private federation plane, active-active HA/DR. (`overview.html:281`; `llms-master.txt`)
13. Cloud support: all hyperscalers plus sovereign clouds "T-Systems and AllyCloud" (`llms-master.txt:491`); AWS/Azure/GCP VPC (`akka-facts.md:32`).
14. Gaps: Alibaba Cloud is a logo only (`console-demo-intro/index.html:220`); no air-gapped claim; region lists conflict; "hyperscaler prices keep rising" is unsourced; the Reuters article and 99.7% were not found.
15. Cautions: no prices or "fixed price" as such, no SDK cost claim, one figure per claim (90%), no TCO dollar pairs (sources disagree).
