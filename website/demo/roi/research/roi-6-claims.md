# ROI claims check: one tenth cost, margin on upper layers, language overhead, headroom, flat fee

Researched 2026-11-09. Classes: PUBLIC (page opened and read, URL given), INTERNAL (Tyler must confirm), UNVERIFIED (must not be used). Quotes come from the page text returned by the fetch tool, which limits quotations to short passages; where a figure is a paraphrase it is marked. No model calls were made. Nothing outside this file was changed.

## 1. Summary

1. Reference comparison (section 4): AWS's own published AgentCore example workload (1M agent sessions a month, 10 minutes each, 90% I/O wait) costs about $8,640 a month on AgentCore at list prices (runtime $6,703 from AWS's own example, plus $1,934 of memory, gateway, identity and observability meters I assumed). The same CPU demand on self-run Python workers on EC2 at list prices costs about $4,640 (1.9 times cheaper than AgentCore, not 10). Akka with a zero fee, on the same hardware, is about 1.8 times cheaper than AgentCore.
2. The "one tenth, fully loaded" claim is not supported by any public price. On this workload the compute alone, at 100% utilization on a 3-year reservation, is $384 a month. That is a floor of 22 times below AgentCore, so ten times is not arithmetically excluded on infrastructure. A fee that keeps the Akka total at or below $864 a month is the condition, and the only public Akka list price I found (a 2024-era FAQ) gives $14,000 a month for the same workload, 1.7 times more than AgentCore.
3. Akka's current price is not public. The pages I could read state "Akka charges a fixed, annual fee without metering." and "Akka bills on platform tier and service cores." The akka.io/pricing page returned HTTP 404 to me. The flat annual fee is stated by Akka but no figure, unit or tier is public. An older public FAQ prices by Akka Hour (consumption), so Akka's public material conflicts with itself.
4. Margin on upper layers: AgentCore runtime is priced at 2.5 times the on-demand price of the same vCPU and memory as an EC2 m7i.xlarge ($0.509 against $0.202 an hour), but it bills only active CPU. Tracing is not where the money is at list price: observability was 1.3% of the AgentCore bill at 200 KB of telemetry a session, and becomes material only if full prompts are logged (5 MB a session is $2,500 a month on CloudWatch ingestion alone). A price above compute is not a margin; no service-level margin is public.
5. Language overhead: no named public benchmark I could read shows Python using more memory per session than the JVM. The two named benchmarks (Kolaczkowski 2023, hez2010 2024) report charts the fetch tool could not read; the one sentence about Python says it "was not able to complete the benchmark in time in the 1M case", and Java also failed that case. PEP 703 supports a concurrency limit for threads (the GIL). Memory overhead remains Tyler's statement plus the Manulife result.
6. Headroom: Cast AI reports average Kubernetes CPU utilization of 10% (2025 report, 2024 data) and 8% (2026 report, 2025 data), memory 23% and 20%. That is cluster-wide waste, not waste caused by separately allocated frameworks. No public figure isolates the latter; keep that claim qualitative.
7. Strongest defensible statements: AWS's CPU-only-when-active billing against 2.5 times the instance price; Cast AI's utilization figures; Flexera's 29% wasted spend (from roi-3).
8. Weakest: the one tenth number. The film can say the lines are added and that a shared runtime removes idle and per-session memory charges; it cannot show 10 times from public prices.
9. Could not be supported: ten times fully loaded; high margin on tracing; a per-layer headroom figure; Python versus JVM per-session memory from a named source; Akka's flat fee as a published number; Google Agent Engine and Azure Container Apps list prices (pages did not load them).
10. Needed from Tyler: Akka's current per-service-core or annual fee for a comparable region, and Akka's measured service-core count for the reference workload.

## 2. Claims table

| Claim | Number | Source | Date | Class | Confidence | Notes |
|---|---|---|---|---|---|---|
| AgentCore Runtime v1 | $0.0895 per vCPU-hour; $0.00945 per GB-hour | https://aws.amazon.com/bedrock/agentcore/pricing/ | fetched 2026-11-09 | PUBLIC | high | |
| AgentCore Runtime v2 | $0.1276 per vCPU-hour and $0.0169 per GB-hour (consumption); $0.0997 and $0.0132 committed baseline "launching by October 2026" | same | same | PUBLIC | medium | The page text omits a dollar sign on one figure. |
| Runtime billing basis | "Billing is calculated per second, using actual CPU and memory consumption, with a 1-second minimum"; "CPU scales to zero during I/O wait (waiting for LLM responses, tool / API calls, or database queries)"; "128MB minimum memory billing" | same | same | PUBLIC | high | CPU is billed only while active; memory is billed at each level for the time it is held. |
| AWS example workload | "Processing 1M user requests monthly, each session runs for 10 minutes with 90% I/O wait time"; "Each agent session utilizes 1vCPU during active processing."; memory 1 GB, then 2 GB, peak 2.5 GB; total "1M sessions x $0.006703 = $6,703" | same | same | PUBLIC | high | Arithmetic checked: $0.002127 CPU + $0.004576 memory. |
| AgentCore Memory | Short-term ingestion "$1.00 per GB ingested (As of October 6, 2026)"; retrieval "$0.20 per GB retrieved"; storage "$0.10 per GB-month"; long-term storage "$0.75 per 1,000 records/month"; retrieval "$0.50 per 1,000 retrievals" | same | same | PUBLIC | medium | |
| AgentCore Gateway, Identity | Gateway "$0.005 per 1,000 invocations"; Identity "$0.010 per 1,000 token or API keys requested by the agent" | same | same | PUBLIC | high | |
| AgentCore Observability | "Charged as per Amazon CloudWatch pricing"; "You are charged for data ingestion and storage, queries to retrieve and analyze information" | same | same | PUBLIC | high | |
| CloudWatch Logs | "$0.50 per GB of ingested logs" (Example 18); "$0.03 per GB per month" storage (Example 16) | https://aws.amazon.com/cloudwatch/pricing/ | fetched 2026-11-09 | PUBLIC | medium | Rates are read from worked examples; the page says examples are "meant to be examples only". Re-read the tables. |
| X-Ray | $5.00 per million traces recorded; $0.50 per million retrieved or scanned | same | same | PUBLIC | medium | Derived from per-trace values in examples ($0.000005 and $0.0000005). |
| EC2 m7i.xlarge | 4 vCPU, 16 GiB; on-demand $0.202; 1-year reserved $0.133; 3-year reserved $0.091; spot $0.089 per hour, us-east-1 Linux | https://instances.vantage.sh/aws/ec2/m7i.xlarge | fetched 2026-11-09 | PUBLIC (third-party mirror of the AWS list) | medium | The page header says "$0.2016"; confirm on AWS before screen use. |
| EKS control plane | "$0.10 per cluster per hour" | https://aws.amazon.com/eks/pricing/ | fetched 2026-11-09 | PUBLIC | high | |
| LangSmith | Plus "$39 / seat per month"; "LangChain Standard Units. $1.00 / LSU"; "Runtime Compute 0.0675 LSU / vCPU-hr" (so $0.0675 per vCPU-hour); trace prices not listed on the page | https://www.langchain.com/pricing | fetched 2026-11-09 | PUBLIC | medium | Third-party tracing product, not a hyperscaler. Its compute rate is below AgentCore's. |
| Azure Foundry Agent Service | Foundry-native agents not charged for the agent layer; hosted agents per vCPU-hour and GiB-hour | https://azure.microsoft.com/en-us/pricing/details/foundry-agent-service/ | from roi-3 | PUBLIC | medium | Dollar amounts did not load. |
| Azure Container Apps | Free grant "first 180,000 vCPU-seconds, 360,000 GiB-seconds, and 2 million requests per subscription per month"; rates shown as "$- per second" | https://azure.microsoft.com/en-us/pricing/details/container-apps/ | fetched 2026-11-09 | PUBLIC | low | Rates did not load. |
| Google Agent Engine | $0.0864 per vCPU-hour and $0.0090 per GB-hour | akka.io/calculator (Akka's description of Google's price) | fetched 2026-11-09 | UNVERIFIED | low | The Google pricing page did not load rates. Do not quote. |
| Cast AI utilization, 2025 report | "average CPU utilization across Kubernetes clusters remains low at just 10%, down from 13% last year."; "Memory utilization is 23%" | https://cast.ai/press-release/new-kubernetes-cost-benchmark-report-reveals-persistent-cloud-waste/ | 2025-03-05 | PUBLIC | medium | 2,100+ organizations, calendar 2024, clusters of 50 CPUs or more, Cast AI customers (a vendor sample). |
| Cast AI utilization, 2026 report | "Average CPU utilization across clusters stood at just 8% in 2025"; "memory utilization was 20%"; "GPU utilization averaged just 5% across the clusters analyzed" | https://cast.ai/press-release/2026-state-of-kubernetes-optimization-report/ | 2026-04-21 | PUBLIC | medium | "tens of thousands of clusters"; the release is inconsistent about whether the unit is clusters or workloads. |
| Akka fixed fee | "Akka charges a fixed, annual fee without metering." and "One shared-compute runtime carries the same volume on up to 90% less infrastructure, at a fixed annual fee finance can forecast." | https://akka.io/compare/akka-vs-aws-bedrock | fetched 2026-11-09, page undated | PUBLIC (vendor claim) | medium | Marketing claim; no fee amount. |
| Akka billing basis | "Akka bills on platform tier and service cores." and it "charges for service cores", not platform cores (paraphrase of the second) | https://akka.io/guides/what-idle-agents-cost | fetched 2026-11-09, page undated | PUBLIC (vendor) | medium | Same page: "Akka scales elastically with scale-to-zero, so idle capacity costs nothing." |
| Akka older list price | "Pricing is based upon a per core-hour and cores are purchased in annual allotments."; "Serverless pricing starts at $.25 / Akka Hour"; "BYOC pricing is $750 / install / month plus $0.15 / Akka Hour where 1 Akka Hour is measured as 1 service-instance-hour."; "Self-Hosted pricing is $5,000 / install / month plus $0.15 / Akka Hour"; regions on "cloud clusters that cost ~$1,900 / month" with "nodes that provide 4 service-instance capacity costing ~$240 / month" | https://akka.io/blog/akka-3-frequently-asked-questions | undated; search tool called it about 504 days old (about mid-2025) | PUBLIC but possibly superseded | medium | This is consumption by the hour, which contradicts "without metering". |
| Akka licence floor | "All other subscriptions start at $0.25 per core hour." | https://akka.io/bsl-license-faq | fetched 2026-11-09 | PUBLIC | medium | Many subscriptions "include commercial Akka licenses for free". |
| Akka calculator | Fee components modelled per 5-trillion-token block ($100,000 first block, $15,000 floor, $50,000 annual minimum), $12,500 a year network and licence; "Akka charges no fee per agent execution on any provider."; "The Akka figure is the fee, which carries margin."; hyperscaler figures are "public list prices, US East, on-demand, with no enterprise discounts applied"; "is a planning aid" and "is not a quotation." | https://akka.io/calculator | fetched 2026-11-09 | PUBLIC (vendor model) | low | Token-based and built around self-hosted model serving; it cannot be mapped to the session workload here. |
| Python GIL | "The GIL is an obstacle to using multi-core CPUs from Python efficiently." and "prevents multiple threads from executing Python code at the same time." | https://peps.python.org/pep-0703/ | fetched 2026-11-09 | PUBLIC | high | Concurrency limit for threads, not for asyncio I/O. |
| Virtual threads | "we can easily have a great many active virtual threads, even millions, running in the same Java process." | https://docs.oracle.com/en/java/javase/21/core/virtual-threads.html | fetched 2026-11-09 | PUBLIC | high | No byte figure on the page. |
| Concurrent-task benchmark, 2023 | Task = wait 10 seconds; Python 3.10.6, OpenJDK 21-ea; Java platform threads "almost 250 MB of RAM" at 10,000 tasks; Python values not in text | https://pkolaczk.github.io/memory-consumption-of-async/ (Piotr Kolaczkowski) | 2023-05-21 | PUBLIC | low for Python | Charts not readable by the fetch tool. |
| Concurrent-task benchmark, 2024 | Python 3.13.0, OpenJDK 23.0.1; "Python faced performance issue and was not able to complete the benchmark in time in the 1M case." Java's native-image build also did not finish in 10 seconds at 1M | https://hez2010.github.io/async-runtimes-benchmarks-2024/take2.html | end of 2024 (no day) | PUBLIC | low | Memory values are in charts. |
| Akka actor footprint | About 2.5 million actors per GB of heap; roughly 350 bytes to 1 KB per actor by forum estimates | QCon London "high performance Akka" slides; discuss.akka.io posts (search results only, not opened) | undated | UNVERIFIED | low | Not official documentation. |
| Python worker memory | "roughly 80 to 200 MiB" per worker (guides) | search results only | 2025-2026 | UNVERIFIED | low | Blog estimates; the full interpreter is duplicated per worker process. |

## 3. Quotes

Short verbatim passages are in the claims table. Statements by named speakers: none were found for these claims. The Cast AI release quotes its CEO, Laurent Gil, calling overprovisioning "completely avoidable using automation" (2025-03-05, same URL as above); that is a vendor selling automation.

## 4. Worked reference comparison (part 1)

### Method and reference workload

The workload is AWS's own example from the AgentCore pricing page, chosen because it is a public definition that nobody on the Akka side wrote. Model tokens are excluded on all three sides, because the same model calls occur whichever runtime hosts the agent; Akka Optimize savings are excluded as a separate dimension.

Inputs from AWS's example: 1,000,000 sessions a month; 600 seconds each; 60 seconds active CPU at 1 vCPU; memory 1 GB for 300 s, 2 GB for 150 s, 2.5 GB for 150 s (975 GB-seconds a session). A 30-day month, 730 hours for instances.

Derived load: average concurrent sessions = 1,000,000 x 600 / 2,592,000 s = 231. Average busy vCPUs = 1,000,000 x 60 / 2,592,000 = 23.1.

My assumptions (each one changes the answer; no public source): peak-to-average factor 2.0 (Akka's calculator uses 1.7 for conversation and 2.8 for coding); 10 short-term memory events of 2 KB per session; 1 long-term record and 2 retrievals per session; 8 tool calls per session; 1 identity request per session; 200 KB of telemetry per session and 1 trace.

### Stack A: hyperscaler managed (AgentCore, list prices)

| Line | Arithmetic | $ a month |
|---|---|---|
| Runtime v2 (AWS's own example) | 1M x $0.006703 | 6,703 |
| Runtime v1 rates, for comparison | CPU 1M x 60 x 0.0895/3600 = 1,492; memory 1M x 975 x 0.00945/3600 = 2,559 | 4,051 |
| Short-term memory | 20 GB ingested x $1.00 + 5 GB retrieved x $0.20 + 20 GB-month x $0.10 | 23 |
| Long-term memory | 1M records x $0.75/1,000 + 2M retrievals x $0.50/1,000 | 1,750 (month 1; storage accumulates) |
| Gateway | 8M x $0.005/1,000 | 40 |
| Identity | 1M x $0.010/1,000 | 10 |
| Observability | 200 GB x $0.50 + 200 GB-month x $0.03 + 1M traces x $5/million | 111 |
| Total, v2 runtime | | 8,637 |
| Total, v1 runtime | | 5,985 |

Memory is the largest runtime line: $4,576 of the $6,703 (68%) is memory held per session in an isolated microVM.

Observability sensitivity (CloudWatch ingestion at $0.50 a GB): 200 KB a session is $100; 1 MB is $500; 5 MB, which is what logging full prompts and tool results might reach, is $2,500. The telemetry volume per session is an assumption and is the main uncertainty in that line.

### Stack B: assembled open-source stack on EC2 and EKS (list prices)

Python workers sharing nodes; any agent framework; self-hosted tracing.

- Peak busy vCPUs = 2.0 x 23.1 = 46.3. At a 40% target utilization (assumption; Cast AI's measured average is 8 to 10%) that is 116 vCPUs, or 29 m7i.xlarge nodes.
- Memory is not the constraint: 463 peak sessions x 0.1 GB (assumed resident size per session in a shared Python worker; unverified 50 to 200 MiB per worker from guides) is 46 GB against 464 GB available.
- Nodes: 29 x $0.202 x 730 = $4,276. EKS: $0.10 x 730 = $73. Two further nodes for self-hosted tracing: $295. Total $4,644 on demand. With 1-year reservations (29 + 2 nodes at $0.133): $3,083.
- Excluded, which favours stack B: state store (database, cache), load balancer, NAT and data transfer, backups, engineering time, support, and the integration work. Public prices for the managed database did not load.

### Stack C: Akka on the same cloud

Infrastructure: assume a shared pool reaches 60% utilization (assumption). 46.3 / 0.6 = 77 vCPUs, 20 nodes: 20 x $0.202 x 730 = $2,949 on demand ($1,329 with 3-year reservations).

Fee: Akka's current fee is not public. Using the only public price, the 2024-era FAQ for BYOC: $750 a month plus $0.15 per service-instance-hour, with a region cluster of about $1,900 a month. At 1 service instance per vCPU (77) the fee is 750 + 0.15 x 77 x 730 = $9,199; at 4 per node (80) it is $9,510. Total C = 2,949 + 1,900 + 9,510 = about $14,360 (or $14,050 at 77 instances).

### Result

| Comparison | Ratio | What it says |
|---|---|---|
| A (v2) / B on demand | 8,637 / 4,644 = 1.9 | Self-running the compute is about half the cost of the managed set, before the excluded items. |
| A (v2) / B 1-year reserved | 8,637 / 3,083 = 2.8 | |
| A (v2) / C using the 2024 Akka list | 8,637 / 14,360 = 0.6 | On the only public Akka price, Akka costs more. |
| A (v2) / C with the fee at zero | 8,637 / (2,949 + 1,900) = 1.8 | |
| A (v2) / compute only, 100% utilization, 3-year reserved | 8,637 / 384 = 22 | A floor, not a configuration anyone runs: 23.1 / 4 nodes x $0.091 x 730. |

What would make C one tenth of A: a total of $864 a month ($10,364 a year). The modelled infrastructure alone is $2,949 (on demand) or $1,329 (3-year), and even the 90%-utilization, 3-year case is $864 for 13 nodes with no fee and no platform cost. So one tenth of the AgentCore bill requires essentially no licence fee plus very high utilization on committed hardware. The fee at which Akka equals AgentCore (ratio 1) is $3,788 a month ($45,000 a year) with on-demand nodes.

### What this does and does not cover

- It covers only the agent runtime, state and tracing path at list prices, for a workload where 90% of session time is waiting. A workload with more active CPU narrows every ratio, because compute is the same on every stack.
- It does not include model tokens, integration and operating labour, support plans, enterprise discounts, data egress, or the resilience a multi-region deployment adds.
- The honest reading: on public prices the claimed ratio is not reached. The reachable claims are narrower. Against AgentCore the per-session memory and idle charges are what a shared runtime avoids; against an assembled stack the saving is integration and operations, which this model does not price.
- Akka's own "up to 90% less infrastructure" is a statement about infrastructure (the lines excluding the fee), not a fully loaded cost. In this model it is reachable on infrastructure alone: AgentCore runtime $6,703 against 13 nodes at 90% utilization on 3-year terms, $864, is 87% lower. That figure depends on commitments and a utilization that must be demonstrated.

### Objections

- "You chose AWS's workload." Yes; it is the only fully specified public workload. Another workload gives another ratio.
- "AgentCore bills only active CPU, so a reserved instance wastes idle time." Agreed: stack B pays for idle nodes by design (40% target). That is the point of the claim about utilization, and it is not free for Akka either (60% assumed).
- "Per-session microVM isolation is a feature." True; the memory line is partly the price of isolation, which a shared worker does not give.
- "Your Akka price is old." Yes. Replace section 4's fee with the current number; the sizing stays valid.

## 5. Hyperscaler upper layers against compute (part 2)

| Layer | Price | Against the compute | Ratio | Class |
|---|---|---|---|---|
| AgentCore Runtime v1 | $0.0895 per vCPU-hour + $0.00945 per GB-hour: 4 vCPU and 16 GiB = $0.509 an hour | m7i.xlarge on demand $0.202 | 2.5 times on demand; 5.6 times the 3-year reserved $0.091 | PUBLIC |
| AgentCore Runtime v2 | $0.1276 and $0.0169: 4 vCPU and 16 GiB = $0.781 | $0.202 | 3.9 times | PUBLIC |
| LangSmith deployment | 0.0675 LSU per vCPU-hour at $1.00 = $0.0675 per vCPU-hour | EC2 $0.0505 per vCPU-hour on demand | 1.3 times, before memory | PUBLIC |
| CloudWatch Logs behind tracing | $0.50 per GB ingested; $0.03 per GB-month stored | S3 Standard storage price did not load | Ingestion equals about 17 months of storage | PUBLIC |
| X-Ray | $5.00 per million traces | none identified | n/a | PUBLIC |

What this supports: the managed agent runtime is priced at a multiple of the compute it runs on, and the multiple rises between v1 and v2. What it does not support: that this multiple is margin. Billing only for active CPU means the effective price per unit of useful work can be below an instance running at 10% utilization; in the section 4 workload AgentCore at list is 1.9 times a self-run Python fleet, not 2.5. AWS does not publish service-level margin; the AWS segment's 38.7% operating margin (Q3 2026, from roi-3) is for the whole segment.

Tracing at list price is small relative to runtime unless payload logging is on. I found no public price comparing tracing with the storage and compute it uses beyond the CloudWatch lines above. The claim "high margin on tracing" has no public support.

Azure and Google: the Azure agent layer can be free ("No charge for Foundry-native agents", from roi-3), with cost in tokens, tools and hosted compute; Google and Azure compute rates did not load. Do not generalize AWS's multiple to the other two.

## 6. Language and runtime overhead (part 3)

Named, citable sources, in order of usefulness:

1. PEP 703, "Making the Global Interpreter Lock Optional in CPython" (https://peps.python.org/pep-0703/): "The GIL is an obstacle to using multi-core CPUs from Python efficiently." It also states multiprocessing "introduces overhead (due to serialization)" and that starting a thread takes about 100 microseconds while spawning a subprocess takes about 50 ms. PUBLIC. It supports a concurrency limit for threaded CPU-bound work; asyncio I/O workloads are not limited by the GIL in the same way, which is the objection an engineer will raise.
2. Oracle Java SE 21 documentation on virtual threads (https://docs.oracle.com/en/java/javase/21/core/virtual-threads.html): "we can easily have a great many active virtual threads, even millions, running in the same Java process." Also "Platform threads typically have a large thread stack ... but may be a limited resource." PUBLIC. No byte figure.
3. Kolaczkowski, "How Much Memory Do You Need to Run 1 Million Concurrent Tasks?" (2023-05-21) and the hez2010 2024 rerun, both of the same program in several runtimes. PUBLIC but the memory numbers are in charts that I could not read through the fetch tool; someone must open the pages and read the Python and Java bars. The 2024 conclusion names Python as unable to finish the 1M case, and says Java's native image also did not finish; so it does not isolate Python. Do not put these on screen until the chart values are read and checked.

Actor runtime density: about 2.5 million actors per GB of heap (QCon slides) and 350 bytes to 1 KB per actor (forum posts) are UNVERIFIED. The correct sentence for the film is Tyler's statement of the mechanism; the memory figure per session cannot be stated from a named source.

Objections: a Python worker's resident memory does not scale with its session count in asyncio; the comparison that matters is per session in a loaded service, and no public benchmark measures that for an agent. The only way to settle it is to run the same agent session on both runtimes and report resident memory at fixed concurrency (the Manulife result, if Tyler may name it, would be the substitute).

## 7. Headroom when frameworks are allocated separately (part 4)

Public evidence is general, not specific to frameworks:

- Cast AI (2025-03-05): 10% CPU, 23% memory average utilization in Kubernetes clusters (calendar 2024). Cast AI (2026-04-21): 8% CPU, 20% memory, 5% GPU (calendar 2025). Both PUBLIC, vendor sample, clusters likely to be managed manually.
- Flexera (2026-03-18): 29% of IaaS and PaaS spend estimated wasted (from roi-3, PUBLIC).

What they show: allocated compute is largely unused on average. What they do not show: that the cause is separate frameworks allocated separately, or that a shared runtime recovers the difference. No public source gives a headroom figure per layer. Akka's runtime documentation was not located in a form that gives one (the doc.akka.io concepts page I tried returned 404). The claim stays qualitative, with the Cast AI figures as context: "clusters average 8 to 10% CPU utilization" is quotable; "frameworks cause it" is not.

## 8. Akka public pricing: flat fee against consumption (part 5)

- Stated now: "Akka charges a fixed, annual fee without metering." (compare page) and "Akka bills on platform tier and service cores." (idle-agents guide). The calculator states "Akka charges no fee per agent execution on any provider."
- The units: service cores are the unit; platform cores are not charged (paraphrase). So the fee is flat per number of service cores for a term, not per request or token. It is flat against usage, but it grows with the core count, so it is not flat against cluster size. This answers the storyboard's open question: the fee is flat for usage and scales with cores.
- Published earlier: per core-hour with annual allotments (Akka 3 FAQ), $0.25 per Akka Hour serverless, $750 per install per month plus $0.15 per Akka Hour for BYOC. These are metered by the hour. The search result for akka.io/pricing showed a $10-a-month "Hobby" serverless plan and "Pay by contract" for SDK-based services (search snippet, page not readable; UNVERIFIED).
- Not public: any figure for a production annual fee per service core.
- Conflict to resolve before recording: the film cannot say "flat fee" and cite the Akka Hour list. Tyler should confirm which is current and whether the older pricing is retired.
- The sentence "Each of those metered services include the relevant compute, storage, and I/O infrastructure within their fees." on the compare page is a vendor claim about hyperscalers; AWS's own pages show separate Memory, Gateway and Observability meters, but Observability is billed under CloudWatch and the ingest-and-store lines are visible there.

## 9. Gaps

- Akka: current annual fee per service core (or per region) for a comparable production region, and whether the platform cores' cloud cost is excluded; Akka's measured service-core count for the AWS reference workload. With these, section 4 becomes a real answer.
- Chart values (Python and Java memory) from the two concurrent-task benchmark pages, or a measurement of the reference agent on both runtimes.
- Re-read the AWS CloudWatch, Google Agent Engine and Azure Container Apps rate tables in a browser; the fetch tool did not return them.
- Whether Manulife may be named for the memory and concurrency result.
- Measure next: resident memory per session at 231 and 462 concurrent sessions for the same agent in Python (asyncio) and on Akka.

## 10. On-screen proof that the sources support

- The AWS example as a three-line card: "1M sessions, 10 minutes, 90% I/O wait = $6,703 a month" with the memory share (68%) highlighted. Source: AWS pricing page.
- A bar of vCPU-hour plus GB-hour for 4 vCPU and 16 GiB: $0.509 against $0.202. Source: AWS and the EC2 list.
- "Average CPU utilization 8%, memory 20%" with the Cast AI release and date.
- Do not show a one-tenth ratio or a per-layer headroom figure.
