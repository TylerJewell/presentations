# ROI dimension 4: savings from Akka Optimize

Researched 2026-11-09. Classes: PUBLIC (opened and read), INTERNAL (Tyler must confirm before use), UNVERIFIED (do not use). All web pages below were fetched today; vendor pricing pages carry no publication date, so "fetched 2026-11-09" is the date.

## 1. Summary

1. Strongest defensible claim: list prices for the same vendor differ by up to 100x between tiers today (Anthropic Fable 5.1 $10 in / $50 out per million tokens against Haiku 5.5 $0.10 / $0.50; OpenAI gpt-6-astra $10 / $50 against gpt-6-luna $0.10 / $0.50). A swap is only worth what the cheaper model passes on the customer's own quality bar. PUBLIC.
2. Second: provider caching and batch discounts are published and exact. Cache reads bill at 0.1x input (0.05x on Opus 5.5 and Sonnet 5.5, 0.025x on Fable 5.1); OpenAI reads at 0.1x on GPT-5.6 and later; Google about 10% of input; batch is 50% at all three. PUBLIC.
3. Third: academic routing results exist with stated caveats. RouteLLM reports cost reductions of over 85% (MT Bench), 45% (MMLU), 35% (GSM8K) against GPT-4 only at 95% of GPT-4 quality; Hybrid LLM reports up to 40% fewer large-model calls at unchanged quality. PUBLIC.
4. A defensible modelled range for a $6M/year API spend is 14.5% to 40% ($0.87M to $2.41M a year), mid case 26%. It is MODELLED, not measured. Section 4.
5. Weakest part: there is no measured Akka Optimize customer result. No named customer has a published token or model-cost saving from Optimize. The Acme Support Platform figures in our tokenomics plan are fixtures (a fictional customer, stub models, seeded data). The "up to 80% lower token cost" claim is an INTERNAL calculation (40/60 input/output split), and the current akka.io Optimize and efficiency pages state no savings figure at all.
6. Second weakest: much of the console's savings machinery is grayed in production: quality on recorded traffic, rollouts, change records, quality bars and the frontier, budget amounts and enforcement, a gateway response cache, and the stored pricing basis for self-hosting. What ships today is spend reads, cost-only what-ifs, cache and reasoning estimates, burn and forecast, and price-list preview.

## 2. Claims table

| # | Claim | Number and unit | Compares | Source | Date | Class | Confidence | Notes |
|---|---|---|---|---|---|---|---|---|
| 1 | Anthropic price spread | Fable 5.1 $10 / $50; Opus 5.5 $4 / $20; Sonnet 5.5 $2 / $10; Haiku 5.5 $0.10 / $0.50 per MTok (Haiku 5.5 $0.50 / $2.50 over 100k-token prompts) | Tiers of one vendor | https://platform.claude.com/docs/en/about-claude/pricing | fetched 2026-11-09 | PUBLIC | high | List price, no enterprise discount. |
| 2 | Anthropic cache | Write 1.25x (5 min), 2x (1 hour); read 0.1x; 0.05x on Opus 5.5 and Sonnet 5.5; 0.025x on Fable 5.1 and Mythos 5.1; minimum 512 to 4,096 tokens by model; default lifetime 5 minutes | Cached against uncached input | https://platform.claude.com/docs/en/build-with-claude/prompt-caching | fetched 2026-11-09 | PUBLIC | high | Writes cost more than plain input, so a prefix read fewer than about once per write loses money. |
| 3 | Anthropic batch | 50% off input and output | Batch against standard | pricing page above | 2026-11-09 | PUBLIC | high | Asynchronous only. Stacks with cache multipliers. |
| 4 | OpenAI price spread | gpt-6-astra $10 / $50; gpt-6.1-sol $2 / $10; gpt-6.1-terra $1 / $5; gpt-6-luna $0.10 / $0.50; gpt-5-nano $0.05 / $0.40 per MTok | Tiers | https://developers.openai.com/api/docs/pricing | 2026-11-09 | PUBLIC | high | Standard tier, short context (up to 272K). |
| 5 | OpenAI cache and batch | Cached input "discounted up to 95%"; reads 0.1x on GPT-5.6 and later, half that on GPT-6.1 Sol and Terra; minimum 1,024 tokens; batch 50% | Cached against uncached | https://developers.openai.com/api/docs/guides/prompt-caching ; pricing page | 2026-11-09 | PUBLIC | high | |
| 6 | Google cache and batch | Cached input about 10% of input (Gemini 3.8 Flash $0.75 in, $0.075 cached); batch "50% cost reduction"; some models add a storage fee | Cached against uncached | https://aistudio.google.com/docs/pricing | 2026-11-09 | PUBLIC | high | Gemini 4 Argon input is $2.00 through Nov 30, 2026 and $4.00 from Dec 1, 2026; Gemini 3.8 Flash $0.75 through Dec 31, 2026 and $1.50 from Jan 1, 2027. List prices rise as well as fall. |
| 7 | RouteLLM | Over 85% (MT Bench), 45% (MMLU), 35% (GSM8K) cost reduction vs GPT-4 only, at 95% of GPT-4 performance | Router between GPT-4 Turbo and Mixtral 8x7B against GPT-4 alone | https://www.lmsys.org/blog/2024-07-01-routellm/ ; https://arxiv.org/abs/2406.18665 (Ong, Almahairi, Wu, Chiang, Wu, Gonzalez, Kadous, Stoica; v1 2024-06-26, v4 2025-02-23) | 2024 | PUBLIC | medium | Caveats in the post: headline compares with GPT-4 alone, per-benchmark figures with a random-routing baseline; Mixtral cost treated as negligible; MMLU Arena-only routers near random; two-model routing only; 1:1 input to output ratio. |
| 8 | FrugalGPT | Match best single LLM (GPT-4) with up to 98% cost reduction, or +4% accuracy at the same cost | Cascade against GPT-4 | https://arxiv.org/abs/2305.05176 (Chen, Zaharia, Zou) | 2023-05-09 | PUBLIC | medium | 2023 prices and models; the price gap between tiers was different. Per-dataset results. |
| 9 | Hybrid LLM | Up to 40% fewer calls to the large model, quality unchanged | Query-difficulty router | https://arxiv.org/abs/2404.14618 | 2024 | PUBLIC | medium | Abstract only read. Reduction is in calls, not dollars. |
| 10 | Price decline | About 280x fall in cost of GPT-3.5-level performance, about $20 to $0.07 per MTok, Nov 2022 to Oct 2024 | A fixed capability threshold (64.8% MMLU) | Secondary coverage of Stanford AI Index 2025 (Tom's Hardware, VentureBeat); primary report not opened | 2025-04 | PUBLIC (secondary) | medium | Open the Stanford HAI report before using. It measures a fixed capability, not a frontier model. |
| 11 | AI waste survey | "Organizations estimate 26% of all AI spend is wasted." 700 engineering leaders and FinOps practitioners; US, UK, France, Germany | Respondent self-estimate | https://www.harness.io/resources/state-of-ai-in-finops-2026 | page body 2026-07-29; metadata 2026-10-09 (conflict) | PUBLIC | low | Vendor survey, self-reported, no methodology beyond sample. Also "52% of organizations lack a clear, dedicated AI cost owner" and "leaving over a quarter of all AI spend unaccounted for and unexplained". |
| 12 | Cloud waste | 29% wasted cloud spend, first rise in five years, tied to AI workloads; 750+ respondents | Cloud overall, not AI | https://www.flexera.com/about-us/press-center/flexera-finds-cloud-value-is-rising-while-ai-waste-grows | 2026-03-18 | PUBLIC | medium | No AI-only waste figure. |
| 13 | FinOps scope | 98% of FinOps teams now manage AI spend, against 31% two years ago; 1,192 respondents, $83B+ cloud spend | | Search summary of State of FinOps 2026; primary not opened | 2026 | PUBLIC (secondary) | low | |
| 14 | Optimize "up to 80% lower token cost" | up to 80% | Distillation to smaller specialized models | C:\Users\tyler\competition\_internal\ (via demo\research\efficiency-numbers.md section 2); ai-console\nexus\docs\research-notes.md line 38 | 2026-07 | INTERNAL | low | "Calculated from a 40/60 input/output split" (efficiency-numbers.md). Not a customer result. Not on the current akka.io Optimize page as I read it. Do not set beside Swiggy 22%. |
| 15 | Swiggy "22% fewer tokens" | 22% | | Internal positioning study citing unpublished page | | INTERNAL | low | Absent from the live Swiggy page. Hold. |
| 16 | Optimize targeting assumptions | About 40% of spend SLM-addressable; about 60% median token reduction; 24% effective; fleet floor about $25-30K/month LLM spend to break even, about $75-100K/month compelling; about $5K/month platform infrastructure | Illustrative | C:\Users\tyler\ai-console\nexus\docs\targeting-algorithm.md lines 236-250 | 2026-07 | INTERNAL | low | The document says "illustrative, let the customer substitute their own". Below the floor it says to tell the customer to wait. |
| 17 | Self-hosted rate model on akka.io | Baseline $0.09 in / $0.62 out per MTok for a 30-50B open-weight model; half for small, twice for large; B200 at $16.11 per GPU-hour, 40% utilization; platform margin 50% at or below 5T tokens/year; platform floor $100,000/year; SLM training "about 75% cost reduction on the eligible slice, using 40% of prior input and 60% of prior output tokens"; prompt cache saving = prefix hit rate x (1 - 12.07%); sticky sessions 70% cached-prefix share | A calculator's assumptions | https://akka.io/sovereign | fetched 2026-11-09 | PUBLIC | medium | The page states "This estimate is a planning aid; it is not a quotation". All modelled, none measured. Quoting this page's own floor ($100,000/year) matters for break-even. |
| 18 | Optimize page | "See what every AI call costs, attribute it to an owner, and route each task to the cheapest capable model under your budgets." "Every promotion comes with a before-and-after benchmark, measured by your own evaluations on your own traffic and saved to the audit record." No savings figure | | https://akka.io/platform/optimize | fetched 2026-11-09 | PUBLIC | high | Third-party results shown there (SK Telecom 0.80 vs 0.77 / 0.76; AT&T 51% vs 29% preference) concern quality of tuned small models for other vendors' customers (the tuned-model work is Adaptive ML's, per ai-console\nexus\docs\research-notes.md), not Akka results. |
| 19 | akka.io efficiency page | "Optimize reads evaluated production traffic to find work a smaller model can take, then trains, proves, and promotes it." Customer figures "reported by each customer to Akka and not independently published"; the 90% figure "assumes a hyperscaler stack billed per service" | | https://akka.io/efficiency | 2026-11-09 | PUBLIC | high | Useful disclosure for objections. |
| 20 | LoRA Land | 25 of 27 Mistral-7B adapters match or beat GPT-4; under $8 each to fine-tune; 310-model report: 4-bit LoRA models beat GPT-4 by 10 points on average | Narrow-task fine-tunes against GPT-4 | https://predibase.com/blog/lora-land-fine-tuned-open-source-llms-that-outperform-gpt-4 ; arXiv 2405.00732 | 2024-02 / 2024-04 | PUBLIC (vendor) | low | Vendor-published, no independent replication found. Counts inconsistent (25 vs 27). Predibase was acquired by Rubrik (ai-console\nexus\docs\research-notes.md). |
| 21 | Acme example, ticket-triage swap | frontier-large to frontier-mini: $151.73/day to $23.61-$28.88/day, "a decrease of 81.0% to 84.4%" (seven days to 2026-10-10); sql-report $9.60 to $1.51-$1.90 per 1,000 requests | One use case, catalog v3 prices (frontier-large $2.40 in / $12.00 out; frontier-mini $0.40 / $1.60) | C:\Users\tyler\ai-console\docs\plans\tokenomics\epic-3-trusted-savings.md lines 347-361; epic-4-frontier.md lines 171-182 | 2026-10 | INTERNAL (fixture) | n/a | Fictional customer, design mock, seeded data. Must never be shown as a result. |
| 22 | Acme self-hosting | oss-mini (one H100 at $4.33/hour, $3,161/month) costs $1,653/month more than frontier-mini at 2.6B tokens/month; break-even 5.4B tokens/month (4.4B-6.8B); at 8.4B movable tokens it saves $3,219/month | | epic-6-self-hosted.md lines 74, 164-171 | 2026-10 | INTERNAL (fixture) | n/a | Shows the honest shape: self-hosting loses below break-even volume. |
| 23 | Ramp Router | "reduced the company's internal LLM costs by 30%" attributed to CTO Rahul Sengottuvelu | A comparable router, internal use | https://ramp.com/blog/best-llm-gateways | 2026-08-28 | PUBLIC (paraphrase) | low | The page paraphrases; no verbatim quote. Vendor describing its own product. Not Akka. |

## 3. Customer and analyst evidence

Verbatim statements about AI cost reduction from named customers using Akka Optimize: none found. The competition folder says the same: "No SLM-distillation case study exists yet" (ai-console\nexus\docs\research-notes.md line 46, INTERNAL) and no token-saving figure is public and attributable (ai-console\demo\research\efficiency-numbers.md section 3).

What does exist:

| Statement (verbatim unless noted) | Speaker / org | Source | Date | Class | Use |
|---|---|---|---|---|---|
| "Organizations estimate 26% of all AI spend is wasted." | Harness report text, no named speaker | https://www.harness.io/resources/state-of-ai-in-finops-2026 | 2026 | PUBLIC | Problem framing only; vendor survey, self-estimate. |
| "Based on insights from 700 engineering leaders and practitioners in FinOps." | same | same | 2026 | PUBLIC | Sample statement. |
| "80% of organizations report AI spend increasing in the past six months." | same | same | 2026 | PUBLIC | |
| "See what every AI call costs, attribute it to an owner, and route each task to the cheapest capable model under your budgets." | Akka | https://akka.io/platform/optimize | 2026 | PUBLIC (Akka's own words) | A product statement, not a customer one. |
| "This estimate is a planning aid; it is not a quotation and it commits neither Akka nor any provider." | Akka | https://akka.io/sovereign | 2026 | PUBLIC | Disclosure to show beside any calculator figure. |
| Router "reduced the company's internal LLM costs by 30%" | Paraphrase of Rahul Sengottuvelu, CTO, Ramp | https://ramp.com/blog/best-llm-gateways | 2026-08-28 | PUBLIC, paraphrase only | Comparable-gateway evidence; not a quote. |
| "Porting the personalization engine to Akka shrank it from 150,000 cores to 22,000" and roughly 40% lower cost per personalized session | Unattributed akka.io text, Fox / Tubi | https://akka.io/customer-stories/tubi | 2026 | PUBLIC | Runtime efficiency (dimension 2), not Optimize. Fetched again today: no speaker, no date, no mention of Optimize. |
| Manulife: Akka lists Manulife as customer; press release 2026-03-10 quotes Jodie Wallis on trust, no cost figure | | https://akka.io/blog/manulife-selects-akka-to-operationalize-agentic-ai (per ai-console\demo\research\economics-sovereign.md) | 2026-03-10 | PUBLIC, not re-opened by me | Contains no savings figure. Manulife has a separate multi-year Adaptive ML deal (research-notes.md), which is not an Akka result. |

Gap stated plainly: there is no customer quote on Optimize savings, so on-screen proof has to be the product measuring the customer's own traffic, labelled as modelled or as a demonstration.

## 4. Worked example

Everything in this section is MODELLED. Nothing is measured on a customer.

Spend profile (stated assumption, chosen to clear the INTERNAL fleet floor of about $25-30K/month by a wide margin): an enterprise with $500,000/month, $6.0M/year in model API spend across several agent systems, all at list price, mostly mid-to-high tier models, no gateway cache.

Levers, applied in sequence so they do not double count. Waste is removed first; routing is then applied only to the spend that remains.

Formula: total saving = 1 - (1 - w) x (1 - a x s)
- w = share of spend recovered from avoidable cost (cache misses, failed or discarded attempts, duplicates, reasoning above the median, oversized context)
- a = share of the remaining spend on use cases where a cheaper model passes the customer's quality bar
- s = saving on that slice when it moves to the cheaper model

| Input | Low | Mid | High | Basis |
|---|---|---|---|---|
| w | 5% | 8% | 12% | Assumption. Harness 26% (self-reported, includes unexplained spend) is an upper bound on what is wasted; the portion fixable without a quality change is a fraction. Caching lever is bounded by published read rates: a prefix that is 80% of input, hit 90% of the time, at 0.1x reads saves 0.8 x 0.9 x 0.9 = 64.8% of that group's input cost before write premiums (1.25x on Anthropic). |
| a | 20% | 30% | 40% | Assumption. INTERNAL targeting document uses about 40% of spend as addressable. |
| s | 50% | 65% | 80% | Assumption. A one-tier move on Anthropic list prices: Opus 5.5 to Sonnet 5.5 is 50% lower ($4 to $2 input, $20 to $10 output); Sonnet 5.5 to Haiku 5.5 is 95% lower. RouteLLM's 35-85% and the Acme fixture's 81-84% are consistent with the range but are not evidence for this customer. |

Result:

| | Low | Mid | High |
|---|---|---|---|
| a x s | 10.0% | 19.5% | 32.0% |
| Total saving = 1 - (1-w)(1-a x s) | 1 - 0.95 x 0.90 = 14.5% | 1 - 0.92 x 0.805 = 25.9% | 1 - 0.88 x 0.68 = 40.2% |
| Per year on $6.0M | $0.87M | $1.55M | $2.41M |
| Per month on $500K | $72.5K | $129.5K | $201K |

Cross-check: the INTERNAL targeting document arrives at about 24% with 40% addressable and 60% reduction, inside this range.

Not counted:
- Self-hosted open-weight models: set to zero. In our own Acme fixture, self-hosting costs more than the hosted small model below 5.4B tokens a month (range 4.4B-6.8B) and the akka.io calculator carries a platform floor of $100,000 a year. It adds saving only for stable, high-volume slices, and it overlaps with `s`.
- Batch (50% off at all three providers): applies only to work that can wait; overlaps with the routing slice and is not counted.
- Budgets and forecasts: they cap and expose spend. They create no saving on their own and are not given a number.
- Price-list what-if: it shows what a different price list or a rate change would do to the same traffic. It informs a negotiation or provider choice. No figure is claimed.

Where this holds: spend at or above about $25-30K a month (INTERNAL floor), with traffic that is recorded and gradeable. It does not apply to a workload with no recorded quality evaluation.

Where it should be measured instead: run Optimize's spend reads and recorded-traffic previews on the customer's gateway (released: spend get, compare, series, captures download, price-list preview) and replace w, a and s with measured values. That turns this section from modelled to measured.

## 5. Objections and answers

1. "Savings from cheaper models come with lower quality." Answer: the product's design is that a change is a proposal until the customer's own evaluations pass it on recorded traffic (akka.io: "measured by your own evaluations on your own traffic"). Honest limit: in the shipped software quality on recorded traffic is not available (asks N-36, N-37, N-38, N-58 in docs\plans\tokenomics\plan.md); only cost-only previews run in production. The quality-gated flow exists as a demo.
2. "Prices fall anyway, so your saving disappears." Answer: percentage gaps between tiers persist (about 20x between flagship and small tiers within one vendor today), so the saving as a share is stable while the absolute dollars shrink with the price level. The 280x decline is for a fixed capability level, over 2022-2024. Prices also rise: Gemini 4 Argon input goes from $2.00 to $4.00 on 2026-12-01, which weakens the "it will keep falling" premise. Neither direction is a reason to omit the number; state the date of prices used.
3. "The savings double count." Answer: yes if added. Levers here compound on the remainder (Section 4 formula), and caching and batch discounts overlap with a model swap because the cheaper model's cache and batch rates apply to a smaller base.
4. "Your numbers are fixtures." Answer: correct for the Acme data (a fictional customer on stub models). It is the design mock. The film must label it demonstration or modelled and must not call it a result.
5. "Routing papers use old models." Answer: RouteLLM used GPT-4 Turbo and Mixtral; FrugalGPT is from 2023; both predate the current price spreads. They show that the mechanism works under stated conditions; they do not predict a particular customer's saving. The Hybrid LLM paper reports calls, not dollars.
6. "Self-hosting is not cheaper." Answer: agreed below break-even volume; the console's worksheet computes break-even from entered figures and says so. The akka.io rates ($0.09 / $0.62 per MTok) are derived modelled rates, not invoices.
7. "26% waste is a survey self-estimate." Answer: yes. Use it only to frame the problem, never as the Optimize saving.
8. "Optimize has no customer proof." No evidence answers this. See Gaps.

## 6. Gaps and limits

What Optimize cannot do yet in production (docs\plans\release\assessment.md and gray-list.json, assessed 2026-11-09; released: akka-cli 3.0.81, nexus 0.10.1):
- Released and usable: spend get, compare and series by any combination of model, use case, system, route and tag; price-catalog read and publish; rulesets; captures download; training; budgets as burn and forecast only; Efficiency's cache-share and tokens-per-request views; what-if and price-list preview.
- Grayed: attempts, duplicates, percentiles and prompt composition (N-29, N-31, N-32, N-53, N-54); change records, trials, rollouts, stop rules, realized quality (N-16, N-17, N-36 to N-40, N-57, N-58); quality bar and frontier (N-51); stored budgets, threshold actions, enforcement (N-35, N-41, N-42, N-49, N-60); stored pricing basis and starter prices (N-43, N-63); routing outcomes per use case (N-24, N-29, N-30, N-50, N-55).
- No gateway response cache exists (N-53). The gateway's default chain records no spend until configured (docs\research\manulife-gateway-cost-gaps-2026-10-16.md).
- PRODUCTS.md in the nexus repository lists rollout, prove and promote, shadow and canary, drift watch and governance stages as "not built"; the nexus README describes the console there as a "prototype over synthetic data". Check current status before saying the loop is closed.
- `docs\plans\tokenomics\plan.md` section 3 requires estimates to be ranges with the basis named; the product also labels production estimates as upper bounds only where a benchmark is used.

What Tyler or the team must supply or confirm:
- A named customer, with permission, whose Optimize spend reads show real avoidable cost or a routed model swap. Without one the film can only show a mechanism and a modelled range.
- Confirmation of the "up to 80%" claim and its status; the current akka.io pages no longer show it.
- Whether the Swiggy 22% fewer tokens may be used (INTERNAL, absent from the live page).
- Whether the akka.io calculator figures (rates, 75% SLM reduction) may be cited on screen as "Akka planning estimate".
- Primary check of the Stanford AI Index figure and the State of FinOps 2026 report.

What to measure next:
- Run the released spend and price-list reads on a design-partner gateway for 30 days; report cache-read share, tokens per request, and one model-swap preview as cost-only, ranges with basis named.
- Run one recorded-traffic comparison with the customer's evaluators to get a quality-passing swap rate (the a and s inputs).

## 7. Suggested on-screen proof

1. Published price strip, one vendor, dated: Fable 5.1 $10 / $50; Sonnet 5.5 $2 / $10; Haiku 5.5 $0.10 / $0.50 per million tokens, with "list prices, fetched 2026-11-09" and the source URL.
2. Cache rate card: "Cache reads cost 0.1x input (0.05x on Sonnet 5.5)" with the provider page.
3. The worked-example waterfall (Section 4): $6.0M, waste recovered, routing applied, $0.87M to $2.41M saved, labelled "Modelled. Inputs are assumptions."
4. A console screen from Cost (Spend, Efficiency, Budgets, Prices) with a visible "Demonstration data, fictional customer" tag if it shows Acme numbers; never as a customer result.
5. The break-even chart from the self-hosted epic, showing the cost line above the hosted line below 5.4B tokens per month, to show the product tells the truth where self-hosting loses.
6. A quote card that is Akka's own sentence, attributed to Akka: "Every promotion comes with a before-and-after benchmark, measured by your own evaluations on your own traffic and saved to the audit record." (akka.io/platform/optimize).

## Six-line summary

1. Public, dated, exact: tier price spreads (about 100x between flagship and small), cache reads at 0.1x input or less, batch at 50%.
2. Public academic routing evidence exists (RouteLLM 35-85%, FrugalGPT up to 98%, Hybrid LLM up to 40% fewer large calls) with benchmark-specific caveats.
3. Modelled example: 14.5% to 40% (mid 26%) on $6M a year, $0.87M to $2.41M, formula and inputs in Section 4.
4. No measured Optimize customer saving and no verbatim customer quote exist; Acme figures are fixtures; "up to 80%" is an internal calculation.
5. Quality-gated rollouts, budgets with enforcement, response cache and stored self-hosting basis are grayed in production per the 2026-11-09 assessment.
6. Gap to close: a design-partner measurement using the released spend and price-list reads, with the customer's permission to name it.
