# ROI dimension 3: Akka against the hyperscalers

Researched 2026-11-09. Classes: PUBLIC (opened and read, URL and date), INTERNAL (local file, Tyler must confirm), UNVERIFIED (must not be used).

## 1. Summary

1. The most defensible hyperscaler-side facts are public and primary: the AWS segment earned $17.8 billion of operating income on $46.0 billion of sales in Q3 2026 (a 38.7% operating margin), and Flexera's 2026 State of the Cloud report puts estimated wasted IaaS and PaaS spend at 29%.
2. AgentCore Runtime is priced at $0.0895 per vCPU-hour plus $0.00945 per GB-hour (v1), which is 2.5 times the on-demand price of the same vCPU and memory as an EC2 m7i.xlarge ($0.202 per hour for 4 vCPU and 16 GiB). The ratio is computed from AWS's page and a mirror of AWS's EC2 price list.
3. 37signals is the only primary repatriation case with numbers: a cloud bill of $3,201,564 a year reduced to about $1.3 million. It is a move to owned hardware, not to Akka, so it supports the hyperscaler-margin argument and says nothing about Akka.
4. The weakest part of the story: the premise as briefed ("Akka installs a fully verticalized stack on the lowest-cost commodity hardware in the cloud, including storage, objects, compute and GPUs, for a flat fee") is not supported by any public Akka source I could open. Akka's own deployment overview says a region runs on "a managed Kubernetes cluster from the cloud provider", so Akka runs on the hyperscalers' instances (or on the customer's cluster) and does not describe commodity-hardware sourcing. Object storage and GPU specifics are absent from Akka's documentation. Internal files say Akka "is not model serving, inference, RL, or a GPU runtime" and "Do not claim GPU reduction."
5. The "flat fee" is real only in part. Internal sources say Akka charges per service core and that platform cores (about 20 to 25 per production region) are paid by the customer to its own cloud. Model tokens are not stated to be inside the fee. Public pricing aggregators also show a usage-metered Akka Serverless plan (starting at $0.25 per Akka hour, unverified).
6. Akka's public price for the licence is not published (custom per-core, per-region), so the worked example in section 4 is a break-even calculation: how much Akka may charge per service core before the hyperscaler stack is cheaper.
7. The hyperscaler is cheaper for spiky or low-duty workloads because AgentCore bills consumption; in the worked example it wins below roughly 55% duty before any Akka licence is added.
8. GPU price evidence is secondary, dated and inconsistent (AWS H100 between $3.93 and $6.88 per GPU-hour, Lambda $3.99, RunPod $2.69). It cannot support an Akka claim.

## 2. Claims table

| Claim | Number and unit | What it compares | Source | Date | Class | Confidence | Notes |
|---|---|---|---|---|---|---|---|
| AWS segment operating income | $17,773M on $45,984M sales = 38.7% operating margin | AWS segment, Q3 2026 vs $11,434M on $33,006M in Q3 2025 (34.6%) | https://ir.aboutamazon.com/news-release/news-release-details/2026/Amazon-com-Announces-Third-Quarter-Results/ | 2026-10-29 | PUBLIC | high | Operating margin, not gross margin; Amazon does not report segment gross margin. Margin is computed by me from the two reported figures. |
| Wasted cloud spend, 2026 | 29% of IaaS and PaaS spend | Survey respondents' own estimate; first increase in five years, attributed to AI workloads | https://www.flexera.com/about-us/press-center/flexera-finds-cloud-value-is-rising-while-ai-waste-grows | 2026-03-18 | PUBLIC | high | Self-reported by 750+ respondents. "Wasted" means respondents' estimate of spend that could be avoided, which is not all attributable to the provider. |
| Wasted cloud spend, 2025 | 27% | Same survey, prior year | Secondary only (spendark.com summary). Flexera's own 2025 release (2025-03-19) says only that estimated waste "is falling" | 2025-03 | UNVERIFIED for the 27% number | medium | The 2025 release was opened and has no percentage. |
| AgentCore Runtime v1 price | $0.0895 per vCPU-hour; $0.00945 per GB-hour | Consumption price of agent runtime | https://aws.amazon.com/bedrock/agentcore/pricing/ | fetched 2026-11-09 | PUBLIC | high | |
| AgentCore Runtime v2 price | $0.1276 per vCPU-hour, $0.0169 per GB-hour consumption; committed baseline $0.0997 and $0.0132 | Same, newer tier | same | fetched 2026-11-09 (page says baseline pricing launches "by October 2026") | PUBLIC | medium | Page text was summarised by the fetch tool; re-read the page before it goes on screen. |
| AgentCore other meters | Gateway $0.005 per 1,000 invocations; Identity $0.010 per 1,000 requests; Policy $0.000025 per request; Evaluations $0.0024 per 1,000 input tokens and $0.012 per 1,000 output tokens; Observability charged under CloudWatch pricing | Separate meters beside runtime | same | fetched 2026-11-09 | PUBLIC | medium | Memory per-GB rates change on 2026-10-06; unit wording on the page is ambiguous. |
| Premium of AgentCore compute over raw instance | 2.5x | 4 vCPU and 16 GiB: AgentCore v1 $0.509 per hour vs m7i.xlarge on-demand $0.202 per hour | AgentCore page above; https://instances.vantage.sh/aws/ec2/m7i.xlarge (mirror of AWS list) | 2026-11-09 | PUBLIC | medium | Computed: 4 x 0.0895 + 16 x 0.00945 = 0.509. AgentCore bills active use; an instance bills while it is on. |
| m7i.xlarge prices | On-demand $0.202; 1-year reserved $0.133; 3-year reserved $0.091; spot $0.089 per hour (us-east-1 Linux) | | https://instances.vantage.sh/aws/ec2/m7i.xlarge | 2026-11-09 | PUBLIC (third-party mirror) | medium | Confirm against the AWS price list before use. |
| Vertex AI Agent Engine runtime | About $0.0864 per vCPU-hour and $0.0090 per GB-hour after a December 2025 cut (Google's earlier page: $0.0994 and $0.0105) | | Secondary summaries; Google release notes confirm a cut. Primary page was too large to fetch | 2025-12 | UNVERIFIED | low | Do not quote until read on cloud.google.com/vertex-ai/pricing. |
| Azure Foundry Agent Service | No charge for Foundry-native (prompt and workflow) agents; hosted agents billed per vCPU-hour and GiB-hour; tools billed per unit; model tokens separate | | https://azure.microsoft.com/en-us/pricing/details/foundry-agent-service/ | fetched 2026-11-09 | PUBLIC | medium | Dollar amounts did not load on the page. The accurate statement is that the agent layer itself can be free and the cost sits in tokens, tools and hosted compute. |
| AWS egress | $0.09 per GB for the first 10 TB after 100 GB free; $0.01 per GB between availability zones | Internet egress and cross-AZ | Third-party pricing blogs dated 2026-04 to 2026-10 | 2026 | UNVERIFIED (primary tables did not load) | medium | AWS page confirms 100 GB free and tiering only. |
| Hetzner egress | EUR 1.00 per additional TB (EU and US); 20 TB included on EU CCX23 | Specialist cloud vs AWS | https://www.hetzner.com/cloud/general-purpose | fetched 2026-11-09 | PUBLIC | medium | The page text says "per hour" for the overage, which looks like a page error; read the page before use. |
| Hetzner CCX23 | EUR 86.49 per month for 4 dedicated vCPU, 16 GB, 160 GB NVMe | Commodity cloud equivalent of m7i.xlarge | same | 2026-11-09 | PUBLIC | medium | Excludes VAT. EUR price, no conversion applied. |
| H100 per GPU-hour | AWS P5 $3.93 to $6.88; AWS Capacity Blocks $5.97; CoreWeave $6.16; Lambda $3.99; RunPod $2.69 | Hyperscaler vs specialist | Aggregators (intuitionlabs.ai, spheron.network, spendark.com), dates 2026-02 to 2026-10 | 2026 | UNVERIFIED | low | Sources conflict by 75% on the AWS number alone. Not usable without a pull from each vendor's pricing page on one date. |
| 37signals cloud bill | $3,201,564 a year to about $1.3 million; hardware about $700,000 of Dell servers | Own hardware vs AWS | https://www.theregister.com/2024/10/21/37signals_aws_savings | 2024-10-21 | PUBLIC | high | Reported by the article; Hansson: "it's never fully apples-to-apples." |
| 37signals S3 exit | About $1.5M a year of S3 replaced by $1.5M of Pure Storage kit costing under $200,000 a year to run (Hansson's estimate) | | https://www.theregister.com/2025/05/09/37signals_cloud_repatriation_storage_savings (seen in search results only, not opened) | 2025-05-09 | UNVERIFIED for the figures | low | Estimate; excludes hardware refresh, staff and data-centre costs. |
| Akka "up to 90% lower infrastructure cost" | Up to 90% | Shared compute vs per-service cloud AI stacks, LangChain or Temporal | `C:\Users\tyler\competition\llms\llms-master.txt:93` and `_internal\akka-facts.md` (cited via `C:\Users\tyler\competition\website\demo\research\economics-sovereign.md`) | file dated 2026-10-27 | INTERNAL | medium | Infrastructure figure for the same transaction volume, "NOT list price". I did not open a live akka.io page that states it. Never write "70 to 90%"; the 70-90% in akka-tco-analysis.md is an illustrative worksheet. |
| Akka licence basis | Charged per service core; platform cores "part of the cloud infrastructure you provision"; production region about 20 to 25 platform cores; Sandbox about 5 | | `C:\Users\tyler\competition\battlecards\battlecard-service-tiers.md` (July 2026) | 2026-07 | INTERNAL | medium | This is the authoritative statement of what the fee does and does not cover. |
| Akka deployment model | Region runs on "a managed Kubernetes cluster from the cloud provider"; default service: 3 instances across availability zones, 2,560 MB RAM each; dedicated (Akka cloud), BYOC (AWS, Azure, GCP), BYOK8s | | https://doc.akka.io/deployment/technical-overview.html | fetched 2026-11-09 | PUBLIC | high | No mention of commodity hardware, object storage choice or GPUs. |
| Akka BYOC list price | Per-region monthly fee plus SDK licence; example region cloud cost about $1,900 per month; nodes with 4 service-instance capacity about $240 per month | | Search summary of https://akka.io/pricing (the page returned HTTP 404 to me) | unknown | UNVERIFIED | low | Obtain from Akka sales or Tyler. |
| Akka Serverless | From $0.25 per Akka hour | | https://apis.io/plans/akka/akka-plans-pricing/ (aggregator, itself says unverified) | 2026-05-05 | UNVERIFIED | low | Shows Akka has usage-metered options; do not call all Akka pricing flat. |
| Model serving | "an add-on to Akka Automated Operations ... not included in the base product" | | https://doc.akka.io/inference/serving/index.html (via search excerpt; page redirects) | 2026-11 | PUBLIC | medium | Model hardware is outside the base fee. |
| GPU | "Akka is not model serving, inference, RL, or a GPU runtime" | | `C:\Users\tyler\competition\battlecards\battlecard-nvidia.md:12,133` via `demo\research\efficiency-numbers.md:47` | 2026 | INTERNAL | high | Direct conflict with the briefed GPU story. |

## 3. Customer and analyst evidence

Verbatim statements I opened. Akka customer pages found carry no named-speaker cost quotes.

- Flexera, press release "Flexera Finds Cloud Value is Rising While AI Waste Grows", 2026-03-18, https://www.flexera.com/about-us/press-center/flexera-finds-cloud-value-is-rising-while-ai-waste-grows: "causing an increase in wasted cloud spend (29%) for the first time in five years". PUBLIC. Survey of "more than 750 cloud decision-makers and users".
- Flexera, press release, 2025-03-19, https://www.flexera.com/about-us/press-center/new-flexera-report-finds-84-percent-of-organizations-struggle-to-manage-cloud-spend: "While estimated wasted cloud spend is falling, the adoption of AI-related public cloud services is rising." Also "84% of respondents believe that managing cloud spend is the top cloud challenge for organizations today." PUBLIC.
- Amazon, Q3 2026 release, 2026-10-29: "AWS segment operating income was $17.8 billion, compared with $11.4 billion in third quarter 2025." and "AWS segment sales increased 39% year-over-year to $46.0 billion." PUBLIC.
- David Heinemeier Hansson, co-owner and CTO, 37signals, quoted in The Register, 2024-10-21: "it's never fully apples-to-apples." (the fetch tool returned this as quoted text; the Register's dollar figures are the reporter's, not Hansson's words). PUBLIC. Also: "This is gear we expect to use for the next five, maybe even seven years!" Not an Akka customer.
- Verizon Wireless, headline on casestudies.com (an aggregator of the vendor's old Lightbend-era study, undated): "cut total cost of ownership in half, while using half the hardware." No speaker. PUBLIC as a vendor-published statement; Lightbend-era, not agentic AI. Do not use as hyperscaler evidence.
- Esdiac "lowers infrastructure costs by 65%" and Dream11 "cut cloud infrastructure costs by 30%" (same aggregator): headlines only, no speaker, no baseline, no date. Vendor-published. Use is not supported for a hyperscaler comparison because neither page names the baseline.
- Walmart "Long-term web infrastructure costs fell 20-50%" and "roughly 40% of compute cycles shifted from dedicated hardware to commodity servers" are recorded in `C:\Users\tyler\competition\website\demo\research\efficiency-numbers.md:18` as Lightbend-era, historic. INTERNAL note of a public page; not re-opened by me.
- No customer statement was found, from any source, of a number for moving from a hyperscaler's agent stack to Akka. Fox "150,000 to 22,000 cores" and Capital One 60% are UNVERIFIED and are not to be used.

## 4. Worked example (break-even, not a quote)

Akka's licence price is not public, so the example finds the ceiling on Akka's licence at which the two stacks cost the same. Model tokens are identical on both sides and are excluded. Stack on each side runs the same agent code.

Workload (assumption, stated by me): an agent service needing 64 vCPU and 256 GiB of memory, 730 hours a month. One region, no HA/DR add-on.

AgentCore side (list prices, fetched 2026-11-09):
- v1: 64 x $0.0895 + 256 x $0.00945 = $5.728 + $2.419 = $8.147 per hour; x 730 = **$5,947 per month**.
- v2 consumption: 64 x $0.1276 + 256 x $0.0169 = $8.166 + $4.326 = $12.49 per hour; x 730 = **$9,118 per month**.
- Add-on meters at assumed 50M gateway calls and 10M identity requests a month: 50,000 x $0.005 = $250 and 10,000 x $0.010 = $100, so about **$350**. CloudWatch observability and memory are excluded because they are not priced on the page; the AgentCore side is therefore understated.

Akka side, compute only (the customer's cloud bill), on m7i.xlarge-equivalent instances (4 vCPU, 16 GiB; 16 instances for the service cores):
- Service cores on-demand: 16 x $0.202 x 730 = **$2,359 per month**. 3-year reserved at $0.091: **$1,063 per month**.
- Platform cores: 25 cores per production region (INTERNAL, battlecard-service-tiers.md) = 6.25 instances: on-demand $922 per month, 3-year reserved $415 per month.
- Total Akka-side infrastructure: **$3,281 per month** on-demand, **$1,478 per month** with 3-year reservations.

Result before any Akka licence or support:
| Case | AgentCore | Akka infrastructure | Difference per month |
|---|---|---|---|
| v1, 100% active, vs on-demand | $5,947 | $3,281 | $2,666 |
| v1, 100% active, vs 3-year reserved | $5,947 | $1,478 | $4,469 |
| v2, 100% active, vs 3-year reserved | $9,118 | $1,478 | $7,640 |
| v1, 40% active | $2,379 | $3,281 | AgentCore cheaper by $902 |

Break-even Akka licence: the difference divided by 64 service cores x 12 months. At $2,666 per month the ceiling is about **$500 per service core per year**; at $4,469, about $700; at $7,640, about $990. If Akka's per-core price is higher, the hyperscaler is cheaper at this workload. The price is custom and I do not have it; Tyler must supply it.

What Akka's costs include, per the internal tier guide: the service-core licence; 24/7 SRE and support at Day 2 Ops and above; TAM or FDE time (quarter-time at Day 2 Ops). The customer separately pays platform cores, service-core compute, and (for model serving) the add-on. "One fixed price covering the platform, the infrastructure, every inference and training token" applies only to Akka Specify engagements, and `economics-sovereign.md` lists "fixed price" as retired wording.

Range and what it depends on:
- Duty cycle: AgentCore bills active use. Akka on provisioned instances costs the same at any duty. Break-even duty before licence is $3,281 / $5,947 = 55% (v1, on-demand), 36% (v2).
- Commitments: AWS Savings Plans and enterprise discount programs reduce the hyperscaler side; the table above uses list prices on both sides and gives the Akka side the reserved discount. Applying a 3-year commitment to AgentCore is not shown because the page lists only a "committed baseline" for v2 (about 22% lower on vCPU).
- Density: if Akka needs fewer cores than the AgentCore runtime for the same agents (dimension 2), the Akka side shrinks. I made no such assumption.
- Hardware: swapping m7i.xlarge for Hetzner CCX23 (EUR 86.49 per month each, 16 x = EUR 1,384) lowers the compute line further but changes provider and requires Akka to be deployable there (BYOK8s on a non-hyperscaler cluster is not described in public docs).

The statement that can be made: for a steadily busy agent runtime, the hyperscaler's runtime meter costs 2.5 to 3.9 times the raw price of equivalent instances, so an Akka licence must be priced below that gap. The data does not support a percentage saving for Akka overall.

## 5. Objections and answers

1. "You run on AWS, Azure or GCP yourself, so you are not escaping hyperscaler margin." The public deployment overview confirms the managed Kubernetes cluster is the cloud provider's. Answer available: Akka avoids the service-layer meters (runtime premium, gateway, memory, evaluation), not the instance margin. Claiming commodity hardware is unsupported.
2. "Flat fee? Your own tier guide charges per service core and tells customers to expect platform-core cloud costs." Correct. Say "priced on tier and service cores, not per call or per token", as the internal wording recommends.
3. "Flexera's 29% is waste on all cloud, not a provider's margin." Correct; it is self-estimated avoidable spend. It supports "over-provisioning is common", not "AWS charges 29% too much".
4. "Operating margin of 38.7% is Amazon's profit, not your saving." Correct; it shows the pricing headroom only. It is not an Akka saving.
5. "Spiky workloads cost less on consumption." True in the example below 55% duty. Akka offers scale-to-zero on serverless/Starter per internal sources, which narrows this; not quantified.
6. "Enterprise discount programs cut those list prices." True; internal docs say the 70-90% range was measured against EA pricing but I found no supporting data. No public evidence of the size of EDP discounts was gathered.
7. "Tokens are the real cost." Correct; they are excluded here and are dimension 4.
8. "GPU savings?" No evidence. Akka says it is not a GPU runtime.

## 6. Gaps

- Tyler or Akka sales: the per-service-core price (or range), per-region BYOC fees, support inclusions, and whether Akka Serverless is metered. The akka.io/pricing page returned 404 to me.
- Tyler to confirm the "lowest-cost commodity hardware" statement: which clouds and instance classes Akka's own hosted regions run on, object storage used, and any GPU offering. Provide a measured deployment.
- A named customer with before-and-after cloud bills for a move from a hyperscaler agent stack to Akka, with permission. None found.
- Primary reads still needed: cloud.google.com Vertex pricing, aws.amazon.com EC2 and egress tables, Azure Foundry rates, CoreWeave and Lambda pricing pages, all pulled on one date.
- Gartner and FinOps Foundation figures were not retrieved; only Flexera is covered.
- Managed-service premiums for Kafka and Redis: I found no reliable like-for-like benchmark (one source even had MSK cheaper than EC2 for one customer). Treat as thin.
- Measure: run the same agent service on AgentCore and on Akka (BYOC on the same cloud) for a week and compare bills at 20%, 50% and 100% duty.

## 7. Suggested on-screen proof

- Large figure: "AWS segment operating margin, Q3 2026: 38.7%" with source line "Amazon Q3 2026 release, 29 Oct 2026."
- Line item: "Flexera 2026: 29% of cloud spend estimated wasted."
- A two-row price card: "AgentCore Runtime: $0.0895 per vCPU-hour + $0.00945 per GB-hour" next to "EC2 m7i.xlarge, 4 vCPU and 16 GiB: $0.202 per hour", with the 2.5x ratio and the date.
- The break-even bar chart from section 4 once Akka's per-core price is supplied.
- No GPU visual, no "commodity hardware" visual, and no customer logo-quote until the gaps above are closed.

## Six-line summary

1. Strongest public claims: AWS segment operating margin 38.7% (Q3 2026), Flexera waste 29% (March 2026), AgentCore runtime at 2.5x the raw instance price for the same vCPU and memory.
2. The brief's premise (commodity hardware, objects, GPUs, flat fee) is not supported publicly: Akka runs on the cloud provider's managed Kubernetes, charges per service core, and says it is not a GPU runtime.
3. Platform cores (about 20 to 25 per region) and model tokens are outside the Akka licence; the "fixed price" wording is retired.
4. The worked example is a break-even: Akka's licence must stay under about $500 to $990 per service core per year for a busy 64 vCPU runtime; the hyperscaler wins below about 55% duty.
5. Customer evidence: only 37signals (not an Akka customer); no verbatim Akka customer cost quote exists.
6. Needed from Tyler: Akka's per-core and BYOC prices, hosting facts, and a customer before-and-after bill.
