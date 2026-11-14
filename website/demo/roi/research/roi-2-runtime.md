# ROI dimension 2: runtime efficiency (actor and event-driven model against Python, Node, Go)

Researched 2026-11-09. Pages were opened and read on that date unless marked otherwise. Classes: PUBLIC, INTERNAL, UNVERIFIED as defined in the brief.

## 1. Summary

1. Strongest defensible claim: Tubi (Fox) reports its personalization engine went from 150,000 cores to 22,000 after porting to Akka. That is 85.3% fewer cores. PUBLIC (akka.io/customer-stories/tubi, no named speaker, no date; akka.io/efficiency labels it "reported by each customer to Akka and not independently published"). It is a vendor-hosted, self-reported figure for one workload.
2. Second: Verizon "hardware footprint halved" with 7.5x orders per minute (1,600 to 12,000), 6s to 2.4s, TCO about 50% lower. PUBLIC (akka.io/customer-stories/verizon). The 12,000 figure is "in testing". No quote, no dates, no baseline unit counts.
3. Third: Akka's own sharding benchmark (Andrzej Ludwikowski, 2024-08-06) reached 1,000,000 req/s at 34 ms p99 on 25 x m5.8xlarge (800 vCPU) plus 8 PostgreSQL instances. PUBLIC and reproducible in design, but it measures an event-sourced IoT read/write workload with no LLM calls and compares Akka to nothing. It supports "Akka scales linearly on commodity instances"; it does not support "cheaper than Python".
4. No independent, reproducible benchmark of Akka against Python, Node or Go agent stacks exists that I could find. The "up to 90% cheaper than Python-based systems", "~80% less compute" and "10 trillion tokens per core per year versus 2 trillion" claims have no methodology on any page I opened. The 80% and 10T figures are not on the cited blog (go-slow-to-go-fast) at all. Treat all three as UNVERIFIED for on-screen use. "Up to 90%" is usable only as an Akka claim, labelled as such, and the akka.io/efficiency page states it with "No calculation, sample workload, or baseline".
5. Honest limit: in LLM-bound agent work most wall time is waiting on the model. One (conflicted) independent benchmark shows Python frameworks at roughly 4 requests per second against about 5 for Rust at 10 concurrent, because the model call dominates. Efficiency gains show up in memory per concurrent session, idle cost, and coordination overhead, not in per-request CPU time.
6. Weakest part of the story: no like-for-like measurement. Every customer figure compares a legacy system (Oracle, PHP, Python, statically provisioned capacity) against a redesigned Akka system, so language, architecture and sizing changed together.

## 2. Claims table

| Claim | Number and unit | What it compares | Source | Date | Class | Confidence | Notes |
|---|---|---|---|---|---|---|---|
| Tubi cores | 150,000 to 22,000 cores (85.3% fewer) | Pre-port personalization engine vs Akka port | https://akka.io/customer-stories/tubi ; https://akka.io/efficiency (labels it Fox, "reported by each customer to Akka and not independently published") | undated; page footer 2026 | PUBLIC | medium | No named speaker. Baseline architecture not stated. Efficiency page says 30,000-title catalog; story page says "more than 300,000 movies and TV episodes": the two Akka pages disagree. |
| Tubi cost per session | 40% lower per personalized session | Akka vs statically provisioned capacity | https://akka.io/customer-stories/tubi | undated | PUBLIC | medium | Baseline is static provisioning, not another runtime. Local file efficiency-numbers.md quotes it verbatim; the live page fetch this session returned the 40% figure. |
| Tubi throughput | 5 billion tokens per second | Throughput, not savings | https://akka.io/customer-stories/tubi | undated | PUBLIC | medium | A capacity statement. Not a comparison. |
| Verizon hardware | footprint "halved"; TCO about 50% lower | Legacy Oracle-based platform vs Akka | https://akka.io/customer-stories/verizon | undated (Lightbend era) | PUBLIC | medium | No unit counts, no time period. |
| Verizon throughput | 1,600 to 12,000 orders per minute (7.5x); 6 s to 2.4 s | Same | same | undated | PUBLIC | medium | 12,000 is "in testing, with room to go further". Say "in testing". |
| Verizon memory | 20 GB reserved to under 500 MB JVM | Oracle vs Akka | Third-party mirror only (asiagrowthpartners.com, via efficiency-numbers.md) | undated | UNVERIFIED | low | Not on akka.io. I did not open the mirror. |
| Swiggy latency and compute | P99 144 ms to 71 ms; 5,000+ predictions per second on one model; "~50%" less compute per prediction; twice the requests on the same footprint | Before and after on order-assignment fan-out | https://akka.io/customer-stories/swiggy | undated | PUBLIC | medium | No test setup, hardware or sampling given. "22% fewer tokens" is not on the live page: INTERNAL, hold. |
| Esdiac | 65% lower infrastructure cost; 10x user base | Previous architecture (ceiling of about 5,000 customers) | https://akka.io/customer-stories/esdiac | undated | PUBLIC | low | Pre-Akka cost not stated; no method. akka.io/efficiency shows "baseline" with no absolute number. |
| Dream11 | 30% cloud cost reduction; 30,000 joins per second at 150 ms | Prior platform; tested peak | https://akka.io/customer-stories/dream11 | undated | PUBLIC | medium | Throughput is "tested, with headroom"; cost has no method. |
| Walmart | long-term web infrastructure cost fell 20-50%; about 40% of compute moved to commodity servers | Historic Lightbend-era | https://akka.io/customer-stories/walmart (read via efficiency-numbers.md, not re-opened) | historic | PUBLIC (second hand) | low | Dated; not an AI workload. |
| Manulife | up to 300% more concurrency; 30-50% faster processing, "same prompts, same accuracy" | After porting Python systems | https://akka.io/blog/go-slow-to-go-fast (Team Akka, 2026-05-15) | 2026-05-15 | PUBLIC | medium | The page says "so far"; it gives no method and no cost figure. Do not use 70% latency. |
| Forrester TEI | ROI 139%, NPV $5.05M, payback under 6 months; infrastructure cost savings are $1.3M of $8.67M benefits PV | Composite of 5 organizations (7 decision-makers) | Forrester TEI commissioned by Lightbend, https://content.lightbend.com/hubfs/collateral/report/lightbend_akka_platform_the_total_economic_impact.pdf (text extracted and read) | June 2021 | PUBLIC | medium | Pre-AI, Akka Platform (Lightbend), vendor-commissioned. Infrastructure efficiency of 50% is a Forrester assumption sourced from interviews (table D6), applied to an assumed infrastructure cost of 2% of application revenue. Infrastructure is 15% of the benefit PV. Quotes in section 3. |
| 99.9999% availability | contractual guarantee, credit of 10x the fees for the unavailable period | Akka Availability Guarantee Policy, version 1 | https://trust.akka.io/availability-guarantee (PDF read) | 2026-06-30 | PUBLIC | high for what it says | It is a contract term, not a measured result. Applies only to services in two or more Akka Regions with replication and HA/DR, deployed through Akka tooling (AAO in BYOC), with a performance and load test after major changes, an approved Application Readiness Checklist, and Akka access for monitoring. Excludes self-managed deployments. Credits are against future fees, not cash, and only for causes originating in Akka. 99.9999% is about 31.5 seconds of unavailability a year (arithmetic: 365.25 x 86,400 x 0.000001 = 31.6 s). No measured availability history is published that I found. |
| Sharding benchmark | 1,000,000 req/s, p99 34 ms; 500,000 req/s at 29 ms; 252,000 at 17 ms; 108,000 at 9 ms | Akka cluster scaling with Postgres (RDS) instances | https://akka.io/blog/benchmarking-database-sharding-in-akka (Andrzej Ludwikowski) | 2024-08-06 | PUBLIC | high for what it measures | Table in section 4. 75% read / 25% write, 500-byte events, Gatling, 20-minute hold. No LLM call. No comparison runtime. |
| "up to 90% cheaper to operate than Python-based systems" | up to 90% | "infrastructure required for the same agentic transaction volume, NOT list price" | INTERNAL: C:\Users\tyler\competition\_internal\akka-facts.md line 12. Public echo: Tyler Jewell, TechEdge AI interview 2025-07-29: "the shared allocation drives efficiency up to near 90%, nearly 3x improvement over open source Python runtimes." | 2025-07-29 | The quote is PUBLIC as a statement; the figure is UNVERIFIED as a measurement | low | akka.io/efficiency states it as "Claimed" with no workload or baseline. The "nearly 3x" in the same sentence does not equal 90% (90% lower cost is 10x, not 3x); the sentence is internally inconsistent and should not be quoted together. |
| "~80% less compute", "10 trillion tokens per core per year vs ~2 trillion" | 80%; 10T vs 2T tokens/core/year | Akka vs Python frameworks | INTERNAL: akka-facts.md line 13, cites akka.io/blog/go-slow-to-go-fast | n/a | UNVERIFIED | none | I fetched go-slow-to-go-fast (2026-05-15): neither figure appears. A web search for "10 trillion tokens" per core found nothing. Do not use. |
| "$1,400 for every core of Akka consumed" | $1,400 per core (assumed per year) | Infrastructure compute cost avoided | Tyler Jewell, TechEdge AI, 2025-07-29 | 2025-07-29 | PUBLIC as a statement, UNVERIFIED as a measurement | low | The interview does not give a unit period or basis. See section 4 for how it compares with cloud list prices. |
| 4 KB actors, 200M actors/core, 1M-node clusters, 4 ms reads, sub-10 ms writes | density figures | Akka claims | INTERNAL: akka-facts.md line 9 | 2026-07-03 | INTERNAL | low | Density, not savings. I found no primary page. An old QCon London slide deck says about 2.5 million actors per GB of heap, which is a different, much smaller figure. |
| Python framework memory and throughput | LangChain 4.26 rps, 5,706 MB peak, 64% CPU; LangGraph 2.70 rps, 5,570 MB, 39.7% CPU; PydanticAI 4.15 rps, 4,875 MB; LlamaIndex 4.04 rps, 4,860 MB; AutoAgents (Rust) 4.97 rps, 1,046 MB | 7 agent frameworks, 50 requests, 10 concurrent, real LLM calls, single tool | https://dev.to/saivishwak/benchmarking-ai-agent-frameworks-in-2026-autoagents-rust-vs-langchain-langgraph-llamaindex-338f (Sai Vishwak, posted Feb 2026) | 2026-02-18 | PUBLIC | low | The author builds AutoAgents (a Rust competitor), so it has a conflict of interest. Hardware unstated. Model named inconsistently. Single tool call only. No Akka, Node or Go-first framework except the Rust ones. Peak RSS of 5 GB includes loaded libraries and a parquet tool. It shows memory differs much more than throughput. |

## 3. Customer and analyst evidence (verbatim)

I found no named person quoted with a cost, core or resource figure on any customer page I opened (Tubi, Verizon, Swiggy, Esdiac, Dream11). The only named quote on those pages has no figure. Statements with numbers are narrative text on akka.io, not attributed to a speaker.

Page text with figures (class PUBLIC, unattributed):
- Tubi, https://akka.io/customer-stories/tubi: "150k → 22k" and, in the body, "150,000 cores to 22,000"; "40% lower cost per personalized session"; "5 billion tokens per second". The earlier local note quotes the sentence "Porting the personalization engine to Akka shrank it from 150,000 cores to 22,000" (efficiency-numbers.md, checked 2026-10-27). My fetch returned the figures, not that exact sentence, so confirm the sentence on the page before putting it in quotation marks on screen.
- Verizon, https://akka.io/customer-stories/verizon: "hardware footprint" "halved"; 1,600 to 12,000 orders per minute; "in testing, with room to go further."
- Dream11, https://akka.io/customer-stories/dream11, Mahesh Jadhav, Software Architect: "Akka could deliver the scalability and resiliency required to handle our current number of participants and expected growth," (the page fragment as returned; it contains no number).

Forrester TEI, June 2021, commissioned by Lightbend (read from the PDF text). Interviewees are identified by role only:
- Cloud platform manager, consumer electronics: "Without Akka Platform, our database spend would have been two to three times higher."
- IT director, insurance: "In certain areas of our business, we have been able to reduce the prior use of nine different databases into just one database."
- Business unit head, financial services: "With Akka Platform, I'm doing the same work at half the cost." (This compares with an outsourced managed-services company, not with another runtime.)
- Senior director of engineering, energy: "Switching to Akka Platform has allowed us to gradually reduce our infrastructure cost — mainly AWS [Amazon Web Services] spend — at a 10% annual rate."
- CTO, entertainment: "[We saved] 10 times in server compute power requirement by using Akka Platform, which resulted in cost avoidance on database spend that we would have needed if we did not have a Akka Platform subscription."
- CTO, entertainment: "By moving from our prior environment of PHP and Python to Akka Platform, we immediately realized much more efficient run times and savings in compute time. Once Akka Platform was implemented, the result was immediate." This is the only third-party statement I found that names a Python baseline, and it is a 2021 PHP/Python system, not an LLM-agent stack.
Class: PUBLIC. Not named; no permission needed to quote by role, but the study is vendor-commissioned and five organizations strong.

Executive statements:
- Tyler Jewell, Akka CEO, TechEdge AI, 2025-07-29, https://techedgeai.com/the-future-of-enterprise-architecture-is-neither-centralized-nor-static-its-agentic-adaptive-and-decentralized/ : "...the shared allocation drives efficiency up to near 90%, nearly 3x improvement over open source Python runtimes." and "...which can lower infrastructure compute costs by $1,400 for every core of Akka consumed." PUBLIC as quotes; both numbers are claims without a method. Tyler's own words, so he can restate or retire them.
- Manulife, https://akka.io/blog/go-slow-to-go-fast : results "so far" of 30-50% faster processing ("same prompts, same accuracy") and up to 300% more concurrency are attributed on the page to Manulife's deployment; the page quote from Jodie Wallis, Global CAIO, is about regulation ("Well, then we're out of business."), not efficiency.

## 4. Worked example

### 4.1 What is measured, by whom

| Number | Measured or stated by | Scale it holds at |
|---|---|---|
| 85.3% fewer cores (150,000 to 22,000) | Tubi, as relayed on akka.io | One personalization workload at 5 billion tokens per second. Do not apply to a smaller or non-streaming workload. |
| about 50% less compute per prediction; 2x requests on the same footprint | Swiggy, relayed on akka.io | An order-assignment fan-out workload of 5,000+ predictions/s on one model. |
| Hardware halved | Verizon, relayed on akka.io | An order-management system, Oracle baseline. |
| 65% lower infrastructure cost; 30% lower cloud cost | Esdiac; Dream11, relayed on akka.io | No absolute baselines. |
| 50% infrastructure efficiency (assumption) | Forrester, from five interviews, 2021 | Composite at $20M revenue per application. A modelling input, not a measurement. |
| 1,000,000 req/s at 34 ms p99 on 800 Akka vCPU | Akka, 2024 | Event-sourced IoT workload, no LLM. About 1,250 req/s per vCPU including coordination with the database (1,000,000 / 800). |

The measured customer range for compute or infrastructure reduction is 30% (Dream11 cost) to 85% (Tubi cores), with Swiggy and Verizon at about 50%. That range, not 90%, is what the sources support.

### 4.2 Formula

Annual compute saving = baseline cores x hours per year x price per core-hour x reduction fraction

Hours per year = 8,760. Price per core-hour is an input I did not measure: take $0.04 as an illustrative on-demand vCPU rate and test $0.02 to $0.08 (reserved to premium regions). This is an assumption stated here, not a sourced price; Tyler or the team should replace it with the customer's actual rate (the cloud price dimension is covered in other reports).

### 4.3 Example A: Tubi's own scale (measured reduction, assumed price)

- Baseline 150,000 cores, after 22,000 cores, so 128,000 fewer.
- At $0.04: 128,000 x 8,760 x 0.04 = $44.9M a year. At $0.02: $22.4M. At $0.08: $89.7M.
- This is the avoided compute only. It excludes the cost of Akka, the memory/storage mix, and any one-off porting cost. It holds only for a workload like Tubi's; no other customer has the same baseline.

### 4.4 Example B: a generic LLM-agent service (all inputs are assumptions)

- Baseline: 1,000 vCPU running Python-based agent services. Annual cost at $0.04: 1,000 x 8,760 x 0.04 = $350,400.
- Reduction range from the customer evidence: 30% (low), 50% (middle: Swiggy, Verizon), 85% (Tubi, high).
- Annual saving: $105,120 (30%), $175,200 (50%), $297,840 (85%).
- Cross-check against Tyler's $1,400 per core: 1,000 x $1,400 = $1.4M a year of "avoided" cost. That implies about $0.16 per core-hour, four times the $0.04 vCPU rate used above, which means the $1,400 figure must include memory, storage and network or assume a different price basis. Because it has no stated basis it should not be put next to Example B.
- "Up to 90%" would give $315,360 on this baseline. It is the upper bound of an Akka claim, not a measured result.
- Net of the Akka fee: the fee is outside this dimension. A CFO will deduct it, and if the fee is a flat annual amount then the net saving is positive only when the saving exceeds the fee.

### 4.5 Why the saving is less than the headline for LLM-bound work

Little's law: concurrent in-flight sessions = arrival rate x time in system. At 200 requests per second and 20 seconds per model call, 4,000 sessions are waiting at any moment. CPU time per session is milliseconds; the sessions mostly hold memory and a connection. The saving therefore comes from memory per waiting session, idle cores, and avoiding duplicated state stores, rather than from faster code. I found no published figure for Akka memory per waiting agent session. The Python numbers I found are UNVERIFIED (a markaicode.com post gave about 13.4 MB per session without checkpointing and 38.3 MB with; the site's numbers conflict with each other). Measuring this on the Akka SDK is the single most useful new data point (section 6).

## 5. Objections and answers

1. "The 150,000 to 22,000 is a rewrite, not a runtime effect." Strongest objection. A new architecture on any stack would shrink a legacy fleet. Answer: none in the sources. Tubi's page does not say what the baseline was. Say "after porting to Akka" and do not say "Akka is 85% more efficient than X".
2. "Most agent time is the LLM call, so runtime efficiency is irrelevant." Partly right. The independent benchmark shows throughput within about 2x across Python and Rust frameworks when the model dominates (2.7 to 4.97 rps), and a 5x difference in memory (about 5 GB against about 1 GB). Answer: the gain is in memory per concurrent session and fleet size at high concurrency, which matches Tubi's scale. For a few hundred requests per hour there is little to save.
3. "Python async (FastAPI, asyncio) and Node already handle waiting well." True for I/O wait. The differences claimed for Akka are in state handling (event-sourced entities, sharded in-memory state), backpressured streaming, and one runtime for state, streaming and orchestration rather than separate services. No measurement compares these with an asyncio design. I found none.
4. "Go is as efficient on memory and CPU." Probably true on raw efficiency, and no source compares Akka with Go. Go has no built-in clustering, sharded entity state or replicated event journal, so the comparison is a build-it-yourself question, not a benchmark question. The claim to make is the integrated runtime, not that the JVM is faster than Go.
5. "The JVM has a large baseline footprint and slow start." The Verizon mirror number (under 500 MB JVM) is UNVERIFIED. Cold start and idle memory of an Akka SDK service were not measured by anyone I found.
6. "90% is marketing." Akka's own page says it is "Claimed", with no baseline. Answer: use the measured range (30-85%) and name who measured it.
7. "Six nines is a contract term, not evidence." Correct. The policy conditions (two regions, replication, readiness checklist, load test, Akka monitoring access) limit it, and the remedy is a credit of 10x fees for the period, against future fees only. Say "contractually guaranteed under these conditions" and never "measured".
8. "TechEmpower shows Java and Go ahead of Python and Node by large factors." True in general, but it measures raw HTTP, JSON and database throughput on a fixed rig without LLM calls, and Akka SDK is not in the cited results. I could not extract a language-level table, so I make no TechEmpower claim.
9. "Forrester is vendor-paid and from 2021." Yes. The study itself says it was commissioned by Lightbend. Its 50% infrastructure efficiency is a modelling assumption taken from interviews, and infrastructure is $1.3M of $8.67M benefits.

## 6. Gaps

- A like-for-like measurement. The most valuable new evidence: the same agent workflow (LLM call stubbed with a fixed delay, since live model keys must not be used) on the Akka SDK, FastAPI/asyncio with LangGraph, and Node, measuring memory per waiting session, sessions per core at p99, cold start, and cost at 1,000 and 100,000 concurrent sessions. Use deterministic counts and CPU time.
- Source for "~80% less compute", "10 trillion tokens per core" and "up to 90%": Tyler or Akka engineering must supply the original measurement or retire the claims.
- Tubi: baseline architecture, workload, date, and whether the speaker can be named. Same for Verizon (unit counts), Swiggy (hardware and test setup), Esdiac and Dream11 (baselines).
- Confirm exact Tubi sentence on the live page before quoting.
- Price per core-hour for the customer in question.
- Akka SDK concurrency model: I could not retrieve a doc.akka.io page that states the threading model, virtual-thread use or backpressure behaviour for agents (the architecture-model page does not mention them). The brief asks why the model matters for LLM-bound workloads; the supported statement is limited to that waiting is cheap on any non-blocking or virtual-thread runtime. Akka engineering must supply the SDK's actual threading model before it is described on screen.
- The Akka performance benchmark pages (akka.io/akka-performance-benchmark and the demo post) returned 404 when fetched, although a search snippet quoted headline TPS results (1,000K TPS at 34 ms, 1,400K TPS at 11 ms). I could not confirm those, so I do not use them.
- Measured availability history for AAO to back six nines.
- Customer permission to name Tubi/Fox, Verizon, Swiggy, Esdiac, Dream11 in a film beyond what akka.io already publishes.

## 7. Suggested on-screen proof

1. A single bar pair: "150,000 cores" to "22,000 cores", captioned "Tubi (Fox), as reported on akka.io. Customer-reported."
2. A small row of customer-reported reductions with their baselines named: Tubi cores 85%, Esdiac infrastructure cost 65%, Verizon hardware 50%, Swiggy compute per prediction about 50%, Dream11 cloud cost 30%. Label "range 30 to 85%".
3. The scaling chart from the 2024 sharding benchmark (108,000 to 1,000,000 req/s as Postgres instances go from 1 to 8). Caption it as scaling on commodity instances, not as a comparison.
4. A timeline of one in-flight agent session: 20 seconds of waiting, a few milliseconds of CPU. Supports the "waiting is cheap" point and is arithmetic, not a benchmark.
5. The contract line: "99.9999% availability guarantee, two or more regions, credit of 10 times fees" from the policy dated 2026-06-30.
6. Do not show: "up to 90%", "80% less compute", "10 trillion tokens per core", "$1,400 per core" unless Tyler confirms a method.

## Summary lines

1. Defensible: Tubi 150,000 to 22,000 cores (customer-reported), Verizon hardware halved (in testing for throughput), Akka's 1M req/s scaling benchmark (no comparator).
2. No independent or reproducible Akka-versus-Python/Node/Go benchmark exists; "up to 90%", "~80%" and "10T tokens per core" have no method, and the last two are not on the blog they cite.
3. Supported savings range from customers: 30% to 85%; Forrester's 2021 composite assumes 50%.
4. Worked example: 1,000 vCPU at $0.04 per core-hour saves $105k to $298k a year (30-85%); Tubi's scale at the same price is about $45M, an assumption-priced figure.
5. Biggest limit: LLM-bound workloads are dominated by the model wait; the gain is memory per waiting session and fleet size at high concurrency.
6. Next step: build a stubbed-LLM like-for-like test and get Akka engineering to supply the SDK threading model and the source of the 80% and 10T claims.
