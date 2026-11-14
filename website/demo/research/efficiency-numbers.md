# Efficiency and cost numbers: customers and Akka claims, by resource

Extends `economics-sovereign.md` (not repeated). CT = `C:\Users\tyler\competition`. Checked 2026-10-27. "Live" = fetched from akka.io on that date.

Method caveat: `CT/case-studies/*.md` are rewrites under `case-study-rules.md`, whose rule 6 (line 86) allows invented ROI figures stated as fact. Every customer figure below was therefore checked against the live akka.io story page where possible. Where the local rewrite and the live page disagree, the live page wins and the difference is noted.

## 1. Customer proof points

| Customer | Figure (verbatim) | Category | Source | Public? |
|---|---|---|---|---|
| Fox / Tubi | "Porting the personalization engine to Akka shrank it from 150,000 cores to 22,000" | CPU / compute | https://akka.io/customer-stories/tubi (live); `CT/case-studies/tubi.md:18,41` | Public, akka.io. Unattributed (no named speaker). |
| Fox / Tubi | "cutting the cost of each personalized session by roughly 40% versus statically provisioned capacity" | Overall cost | same | Public |
| Fox / Tubi | "5 billion tokens per second of real-time personalization" | Tokens (throughput, not savings) | same; `tubi.md:19,39`; customers page "5B/s tokens" | Public |
| Verizon | "7.5× more orders through half the hardware"; "The hardware footprint was halved"; "Total cost of ownership fell by half"; 1,600 to 12,000 orders/min; 6s to 2.4s | CPU / hardware, overall cost | https://akka.io/customer-stories/verizon (live); `verizon.md:15,43`. Live page states the 7.5x is from testing. No named quote. | Public. Original Lightbend case study: "Doubling Results with Half the Hardware" (mirror: asiagrowthpartners.com/case-study/verizon-wireless-enhances-performance-with-lightbend-reactive-platform-doubling-results-with-half-the-hardware/c26138; undated, mirror only). |
| Verizon (storage/memory, mirror only) | "legacy Oracle system required 20GB of reserved memory ... Akka platform only required a JVM footprint of under 500MB" | Memory (closest to storage) | WebSearch snippet of the mirror above; not on akka.io | Public but third-party mirror, undated, not verified against Lightbend original |
| Esdiac | "65% lower infrastructure cost, serving the same and growing call volume on a fraction of the previous footprint" | CPU / infra cost | https://akka.io/customer-stories/esdiac (live); `esdiac.md:18,41`. Bassirou Rabo (CTE) paraphrased only, no figure. | Public |
| Dream11 | "Cloud infrastructure costs reduced by 30%"; "Over 30,000 user joins per second at 150ms latency" | Overall cost, concurrency | https://akka.io/customer-stories/dream11 (live). Quote from Mahesh Jadhav has no figure. | Public |
| Walmart | "Long-term web infrastructure costs fell 20–50%"; "roughly 40% of compute cycles shifted from dedicated hardware to commodity servers"; 400,000 page views/hour | CPU / infra cost | https://akka.io/customer-stories/walmart (live); `walmart.md:18,39-41`. Simon Rodrigue: "was good for our bottom line" (no figure). Historic (Lightbend era). | Public |
| Swiggy | "P99 latency from 144ms to 71ms"; "5,000+ predictions per second on a single model"; "~50% less" compute per prediction | Latency, CPU | https://akka.io/customer-stories/swiggy (live) | Public. Live page has no token figure. |
| Swiggy | "144ms to 71ms at 22% fewer tokens" | Tokens | `CT/_internal/docs-positioning-study/01-core-positioning.md:112,314` citing unpublished `website/efficiency.html` | Internal-only. Not on the live Swiggy page. |
| John Deere | Local rewrite: infrastructure cost "½" (`john-deere.md:18,41`). Live page: "a fraction of the compute"; no number. | CPU / infra cost | https://akka.io/customer-stories/john-deere (live) | Public wording only. Do not use "half". |
| Capital One | "486 applications per minute, up from 100", 180-200 ms (`capital-one.md:9,19`); local scorecard "60% lower cost per decision" (`capital-one.md:18`) | Concurrency; cost | Customers page lists "~200 ms loan decisions" only. The 60% was not confirmed live. | Throughput public (Lightbend case material). 60% unverified: do not use. |
| Manulife | "up to 300% more concurrency"; "30–50% faster processing — same prompts, same accuracy" | Concurrency, latency | https://akka.io/blog/go-slow-to-go-fast (live, "May 15, 2026"). The overview-page quote "50% latency improvement and 300% concurrency improvement" (Jodie Wallis) is in `economics-sovereign.md` section 0. Live overview fetch returned no customer quote, so recheck. | Public. Blog gives no cost saving; it cites a forecast of "3% monthly AI cost growth". |
| Kodou | "cuts transformation costs by 90%"; "Under 10% of traditional consulting costs" | Overall cost (build, not run) | https://akka.io/customer-stories/kodou (live) | Public. Consulting cost, not infrastructure. |
| Yields | "cut model validation costs by up to 90%" (`yields.md:9,41`); customers page "up to 90% lower cost" | Overall cost (labour) | https://akka.io/customers | Public. Labour, not infrastructure. |
| DeductiveAI | "up to 90% faster RCA"; local scorecard "60% lower cost to operate" (`deductive-ai.md:18`) | Speed; cost | Customers page has the 90% only | 90% public; 60% unverified |
| Coho AI | "75% faster to market"; local "60% lower operating overhead" (`coho-ai.md:18`) | Speed; ops cost | Customers page has 75% only | 75% public; 60% unverified |
| Norwegian Cruise Line | Local: "45% lower run cost", "estimated 45%" (`norwegian.md:18,41`); customers page: "3x peak-season scale" | Overall cost | Not confirmed live | 45% unverified |
| Trust1Team | "3× development speed"; local "40% lower operational overhead" (`trust1team.md:18`) | Speed | Customers page | 3x public; 40% unverified |
| Eero | "on the order of pennies per managed home per month" (`eero.md:41`); "10M+ home networks" | Overall cost | Not checked live | Unverified |
| Lightbend / Forrester TEI | 139% ROI, payback under 6 months, "10x higher server compute power", 2-3x less database spend, five customers interviewed | CPU, storage/database, overall | WebSearch summary of https://content.lightbend.com/hubfs/collateral/report/lightbend_akka_platform_the_total_economic_impact.pdf. PDF text not readable by fetch (saved at `C:\Users\tyler\.claude\projects\C--Users-tyler-ai-console\21d56b9d-a3e0-4b22-b5fd-8e550fce5f82\tool-results\webfetch-1793119164154-vwlfxd.pdf`, name approximate). Undated, Lightbend-era, vendor-commissioned. | Public PDF, but unverified by me; read the PDF before use |

Not found: any customer-attributed figure for GPUs or storage in bytes. No named person is quoted with a cost or resource figure on any live story fetched (Verizon, Tubi, Esdiac, John Deere, Swiggy, Kodou, Dream11, Walmart).

## 2. Akka's own claims, by resource

| Resource | Claim | Where | Rules |
|---|---|---|---|
| CPU / compute | "4KB actors, 200M actors/core, 1M-node clusters" | `CT/_internal/akka-facts.md:9` | Density claim, not a savings claim |
| CPU / compute | "up to 90% cheaper to operate than Python-based systems" | `akka-facts.md:12` | Infrastructure required for the same agentic transaction volume, NOT list price. Drivers: actor concurrency, shared compute, micro-checkpointing. Use "up to 90%", never "70-90%". |
| CPU / compute | "up to 90% lower infrastructure cost than per-service cloud AI stacks, LangChain, or Temporal"; five mechanisms | `CT/llms/llms-master.txt:93,419` | Platform attribution, not SDK (`01-core-positioning.md:389,504-509`) |
| CPU / compute | "~80% less compute than Python-based frameworks" | `akka-facts.md:13` | Cites go-slow-to-go-fast. The live post, as fetched, did not show it (see gaps). |
| Tokens | "~10 trillion tokens / core / year vs ~2 trillion for comparable solutions" | `akka-facts.md:13` | Same source problem. Throughput per core, not a bill reduction. |
| Tokens | "up to 80% fewer tokens than foundry models" (Optimize distillation to smaller specialized models) | `llms-master.txt:168,440` | `01-core-positioning.md:312,334`: "calculated from a 40/60 input/output split", against Swiggy's measured 22%. State as "up to", calculated, and do not put 80% and 22% side by side (`01-core-positioning.md:657`). |
| Tokens | "up to 70% fewer tokens" (AdaptiveML) | `CT/_internal/akka-tco-analysis.md:91,205` | Retired name and retired number. Do not use. The TCO doc itself (line 330) says the 70% needs a public benchmark. |
| Tokens | "up to 12x lower inference cost" for a 4B model; Optimize deck "81% saved" | `01-core-positioning.md:334`; `CT/sales-presentation/generated/optimize/index.html:1823` | Sales deck figures, unpublished |
| GPU | None as a number. Model-tier savings are stated qualitatively: "smaller specialized models that cut token cost while raising accuracy" | `llms-master.txt:104`; `akka models` serves open-weight models on vLLM (`llms-master.txt:182`) | NVIDIA battlecard: "Akka is not model serving, inference, RL, or a GPU runtime" (`CT/battlecards/battlecard-nvidia.md:12,133`). Do not claim GPU reduction. NVIDIA AI Enterprise list "$4,500 per GPU per year" (`battlecard-nvidia.md:171`) is a competitor price, not an Akka saving. |
| Storage | "petabyte-scale, tamper-evident storage" of interaction logs (capacity, not saving); "4ms reads / sub-10ms writes" | `llms-master.txt:227`; `akka-facts.md:9` | No reduction claim exists |
| Overall | "The cost of intelligence is dropping about 10× each year"; "Efficiency decides which enterprises scale AI" | `CT/_internal/product-pages-pro/overview.html:261-266`; live overview confirmed | Thesis statement, safe |
| Overall | Fixed-fee pricing: billed on platform tier and service cores, not per call, per token or per service | `llms-master.txt:422` | Do not say tokens are inside the fee. No dollar figures. |
| Overall | TCO calculator: "$836K on Akka against $5.17M on AWS" vs "$1.67M against $8.09M" | `01-core-positioning.md:333` | Sources conflict. Do not use either. |

Combining rules: one figure per claim; "up to 90%" is infrastructure only and must not be mixed with Optimize token figures; no SDK as the subject of a cost verb; "Dojo" never in public material (`akka-facts.md:38`); "use 30-50%, NOT 70% latency" for Manulife (`akka-facts.md:14`).

## 3. Gaps, stated plainly

- Tokens: no public, attributable customer figure for tokens saved. Swiggy "22% fewer tokens" is internal-only and absent from the live page. "Up to 80% fewer" is a calculation, not a customer result. The 5B tokens/second is throughput. Public benchmark of token reduction does not exist (`akka-tco-analysis.md:330`).
- CPUs: covered. Best public: Fox 150,000 to 22,000 cores; Verizon half the hardware. Both are unattributed narrative on akka.io, no named speaker.
- GPUs: no approved or public number of any kind. Akka states it is not a GPU runtime.
- Storage: no approved or public reduction number. Only the Verizon 20GB to under 500MB memory figure on a third-party mirror, and the Forrester "2-3x less database spend" (unverified).
- "go-slow-to-go-fast" blog, live (May 15, 2026): shows Manulife 300% and 30-50%, but my fetch found no "10 trillion tokens per core" or "80% less compute". Open the post and confirm before using either on screen.
- Manulife "50% latency / 300% concurrency" quote: not found in the live overview fetch. Confirm it still appears.
- Several local scorecard figures (Capital One 60%, Coho 60%, DeductiveAI 60%, Norwegian 45%, Trust1Team 40%, John Deere half) are not on the live pages.
- `akka.io/akka-performance-benchmark` returned 404.

## 4. Safe on screen in a public video

Use the live-page wording and attribute to "akka.io customer story".

1. "Porting the personalization engine to Akka shrank it from 150,000 cores to 22,000." Fox (Tubi), akka.io/customer-stories/tubi.
2. "Roughly 40% lower cost per personalized session versus statically provisioned capacity." Fox (Tubi), same page.
3. "7.5× more orders through half the hardware; total cost of ownership fell by half." Verizon, akka.io/customer-stories/verizon. Add "in testing" for the 7.5x.
4. "65% lower infrastructure cost." Esdiac, akka.io/customer-stories/esdiac.
5. "Cloud infrastructure costs reduced by 30%." Dream11, akka.io/customer-stories/dream11.
6. "Long-term web infrastructure costs fell 20–50%." Walmart, akka.io/customer-stories/walmart. Historic.
7. "Up to 300% more concurrency and 30–50% faster processing." Manulife, akka.io/blog/go-slow-to-go-fast.
8. "The cost of intelligence is dropping about 10× each year." Akka, akka.io/platform/overview.
9. Akka claim: "up to 90% lower infrastructure cost" from shared compute, attributed to the Akka platform and worded as infrastructure for the same transaction volume.

Hold until verified or approved: Swiggy 22% fewer tokens, 80% fewer tokens, 10T tokens per core, 80% less compute, Forrester figures, John Deere "half", Capital One 60%, any GPU or storage number.
