# ROI dimension 5: software an organization no longer needs to license or run because Akka includes it

Researched 2026-11-09. All "PUBLIC" prices were read on the vendor pages on that date. None of the pricing pages shows an effective date, so the date given is the date read. Page text was extracted by a fetch tool that summarises pages, so each number should be re-checked against the live page before it goes on screen.

## 1. Summary

1. The defensible claim is narrow: for a mid-size deployment, public list prices for the licences Akka can displace come to roughly $29k to $62k a year (section 4). That is small next to the people and infrastructure lines in the other four dimensions.
2. The licence line becomes large only at high volume or at enterprise list prices that are not published (Confluent dedicated, Kong Enterprise, Datadog, LiteLLM Enterprise, Arize Enterprise). At 10x the example volume the same arithmetic gives roughly $0.3M to $0.6M a year, with the caveat that several vendors stop publishing prices before that volume.
3. Strongest sourced statement of inclusion (PUBLIC, doc.akka.io data-and-knowledge page): "Akka's Entity components (Event Sourced Entities, Key Value Entities) are in-memory systems of durable record." and "There is no need for a separate cache like Redis."
4. Second: brokerless eventing between Akka services (PUBLIC, doc.akka.io consuming/producing page): "Akka provides brokerless at-least-once event delivery across Akka services", and a stream can be consumed "without the need to set up a message broker". This holds inside a project. The same page documents Kafka and Google Pub/Sub consumers and producers, so Kafka is not removed where a system talks to the outside world.
5. Third: one named customer replacement, Verizon "replaced a decade-old Oracle commerce platform with Akka" (PUBLIC, unattributed narrative on akka.io; it is an application platform, not a licence line, and the page gives no dollar figure).
6. Weakest part: no public customer statement was found that says "we removed product X and saved $Y in licences". The customer pages name no replaced products (Renault, Esdiac, Yields all checked). Any licence-savings figure in the film is a modelled estimate, not a customer measurement.
7. The internal TCO document (akka-tco-analysis.md) contains licence-adjacent dollar figures ($0.5M to $2M for eval/guardrail tooling over 3 years, 70 to 90% infrastructure) that are modelled, dated 2026-04-13, and labelled "Historical" in a later study. Do not use them as customer results.
8. Product claims to confirm with Tyler before use: that the gateway, Optimize, evalkit and redkit are shipped products that replace LiteLLM/Portkey/Langfuse-class tools. The public akka.io pages read (llms.txt, platform overview) do not use the word "replaces" anywhere and do not name a gateway as such.
9. Akka does not replace: a model provider, a vector database (documented as an integration), an identity provider, analytics warehouses, search engines (Elasticsearch/OpenSearch are integrations), or the Kafka a customer keeps for non-Akka systems.
10. Net of Akka's own fee the licence saving may be near zero at small scale: Akka's price is not public in a form this report could verify.

## 2. Claims table

| Claim | Number and unit | What it compares | Source | Date | Class | Confidence | Notes |
|---|---|---|---|---|---|---|---|
| Entities are durable in-memory stores; no separate cache like Redis needed | n/a | Akka entities vs Redis cache | https://doc.akka.io/sdk/integrations/data-and-knowledge.html | read 2026-11-09 | PUBLIC | high | Exact sentences quoted in section 3. A cache for non-Akka data is not covered. |
| Brokerless at-least-once event delivery across Akka services | n/a | Akka consumers vs a broker between Akka services | https://doc.akka.io/sdk/consuming-producing.html | 2026-11-09 | PUBLIC | high | Scope is "across Akka services" within a project. Kafka and Pub/Sub are documented integrations. |
| Events are stored in a journal; state rebuilt by replay; snapshots automatic | n/a | event sourcing without a separate event-store product | https://doc.akka.io/java/event-sourced-entities.html | 2026-11-09 | PUBLIC | high | The page does not say whether the user supplies the underlying store. Confirm what backs the journal in each deployment mode. |
| Views serve queries from their own read model, stored as JSON documents in deployed services | n/a | CQRS read model vs separate query database | https://doc.akka.io/sdk/views.html | 2026-11-09 | PUBLIC | medium | The page does not say whether an external database is required; locally H2 is used. |
| Multi-region replication is asynchronous with a primary region per instance | n/a | built-in replication | https://doc.akka.io/java/event-sourced-entities.html | 2026-11-09 | PUBLIC | medium | "Active-active" is a platform claim in other places; this page says primary region handles writes. |
| Akka Memory is session memory shared between agents | n/a | agent memory | https://akka.io/platform/overview | 2026-11-09 | PUBLIC | high | The July 2025 memory blog (Duncan Devore, 2025-07-09) does not claim to replace Redis or databases. |
| "Sub-10ms native agentic memory, where most vendors offer memory as a roughly 200ms add-on" | 10 ms vs 200 ms | Akka memory vs add-on memory | https://akka.io/llms.txt | 2026-11-09 | PUBLIC | medium | Vendor claim, no benchmark method published. |
| Guardrails, policies, LLM-as-judge, sanitizers embedded in the runtime | n/a | Akka vs separate guardrail products | https://akka.io/llms.txt | 2026-11-09 | PUBLIC | medium | Product statement; no price comparison published. |
| Verizon replaced a decade-old Oracle commerce platform with Akka | 1 platform | n/a | https://akka.io/customer-stories/verizon | page undated, footer 2026 | PUBLIC | medium | Unattributed narrative. No dollar figure. This is an application platform replacement. |
| Renault collapsed "five to six disconnected production systems into a single execution layer" | 5 to 6 systems | n/a | https://akka.io/customer-stories/renault | undated | PUBLIC | medium | Products not named. |
| Esdiac infrastructure costs 65% lower | 65% | before and after | https://akka.io/customer-stories/esdiac | undated | PUBLIC | medium | Infrastructure cost, not licence. Original software not named. |
| Yields: up to 90% lower model validation cost | up to 90% | automated vs manual validation | https://akka.io/customer-stories/yields | undated | PUBLIC | low for this dimension | A labour cost, not a licence cost. |
| Confluent Cloud Standard $0.75 per eCKU-hour, ingress/egress $0.035 to $0.050 per GB, storage $0.08 per GB-month, about $385/month starting cost at 70% utilization | see left | Kafka as a service | https://www.confluent.io/confluent-cloud/pricing/ | read 2026-11-09 | PUBLIC | medium | Dedicated clusters not priced publicly. Freight and Enterprise tiers also listed. |
| AWS MSK Serverless $0.75 per cluster-hour, data in $0.10/GB, out $0.05/GB, storage $0.10/GB-month; kafka.m5.large $0.21/hour | see left | Kafka on AWS | https://aws.amazon.com/msk/pricing/ | 2026-11-09 | PUBLIC | medium | us-east-1; $0.21 comes from a worked example on the page, not the table. |
| Temporal Cloud actions from $50 per million, down to $25 per million with volume; active storage $0.042/GB-hour; retained storage $0.00105/GB-hour; no base fee; Business support greater of $500/month or 10% of usage | see left | durable execution as a service | https://temporal.io/pricing ; internal research file lists docs.temporal.io/cloud/actions ($50/M first 5M, stepping to $25/M at 100 to 200M) | 2026-11-09 | PUBLIC | medium | Volume steps are slow: $25/M applies only at 100M or more per month per the internal research file, so the lower bound in section 4 is optimistic. |
| Redis Cloud Pro from $0.014/hour with a $200/month minimum; Essentials from $5/month | see left | managed cache | https://redis.io/pricing/ | 2026-11-09 | PUBLIC | medium | Larger plan prices not read. |
| Kong Konnect Plus from $25/month with 1M requests; $200/month per additional 1M requests; max 10M; 5 LLMs included, each extra $100/month; AI plugins add-on | see left | API and AI gateway | https://konghq.com/pricing | 2026-11-09 | PUBLIC | medium | Enterprise is custom. |
| Portkey Production $49/month, 100k logs included, $9 per additional 100k | see left | AI gateway | https://portkey.ai/pricing | 2026-11-09 | PUBLIC | medium | Table lists up to 3M requests; beyond that Enterprise. |
| LiteLLM Enterprise: no public dollar price; SSO/SCIM, audit logs, per-key guardrails, budgets are gated | n/a | AI gateway (open source plus enterprise licence) | https://docs.litellm.ai/docs/enterprise | 2026-11-09 | PUBLIC | high | "Pricing depends on deployment size." Free for open source core. |
| Langfuse Core $29/month, Pro $199/month, Enterprise $2,499/month; $8.00 per 100k units overage falling to $6.00 above 50M; self-host free | see left | LLM observability | https://langfuse.com/pricing | 2026-11-09 | PUBLIC | medium | Units are traces plus observations plus scores. |
| LangSmith Plus $39 per seat per month; trace 0.0075 LSU ($7.50 per 1,000 traces at 1 LSU = $1); deployment 0.0675 LSU per vCPU-hour | see left | LLM observability and agent deployment | https://www.langchain.com/pricing ; trace rate from internal research file langchain.md citing https://www.langchain.com/enterprise-pricing (2026-10-01) | 2026-11-09 | PUBLIC for seat price; trace rate read second-hand | medium | The pricing page I fetched did not list per-trace rates. |
| Datadog LLM Observability $3.50 per 10K LLM spans billed annually, $5 on demand; Pro from $160/month annual | see left | LLM observability | https://www.datadoghq.com/pricing/?product=llm-observability | 2026-11-09 | PUBLIC | medium | Read from the pricing page's later section. |
| Arize AX Pro $50/month for 50k spans; Enterprise custom | see left | LLM observability and evaluation | https://arize.com/pricing/ | 2026-11-09 | PUBLIC | medium | Overage not stated. |
| Shared compute lowers infrastructure cost "up to 90%" vs per-service cloud AI stacks, LangChain or Temporal | up to 90% | infrastructure, same workload | https://akka.io/llms.txt as cited in internal files; akka-facts.md line 12 | last verified 2026-07-03 | INTERNAL (the llms.txt page I fetched did not return this sentence) | low for this dimension | It is an infrastructure figure, not a licence figure. Qualifier required: infrastructure cost for the same agentic transaction volume, not list price. |
| 70 to 90% infrastructure, 2 to 4 SRE FTEs displaced, $0.5M to $2M eval tooling over 3 years | see left | modelled | C:\Users\tyler\competition\_internal\akka-tco-analysis.md | 2026-04-13 | INTERNAL / modelled | low | Never write "70 to 90%". Not customer results. Tyler must confirm before any use. |
| Akka hosted serverless "starting at $0.25 / Akka hour"; self-managed SDK "$5K / year, up to 16 cores" on an older page version | see left | Akka's own price | search snippets of https://akka.io/pricing (page returned 404 when fetched) | unknown | UNVERIFIED | low | Pages disagree with each other. Do not use. |

## 3. Customer and analyst evidence

What Akka includes, verbatim from primary documentation (class PUBLIC, read 2026-11-09):

- doc.akka.io/sdk/integrations/data-and-knowledge.html: "Akka's Entity components (Event Sourced Entities, Key Value Entities) are in-memory systems of durable record." / "All data is durable, immutable, and in-memory with sub-10ms access." / "There is no need for a separate cache like Redis." / "Your Entities are your cache — with persistence guarantees that Redis cannot provide." / "Use vector databases for semantic search and RAG workflows." (The fetch tool returned these as verbatim text; re-confirm on the live page.)
- doc.akka.io/sdk/consuming-producing.html: "Akka provides brokerless at-least-once event delivery across Akka services"; "Consume messages from topics of Google Cloud Pub/Sub or Apache Kafka."; "Produce messages to a Google Cloud Pub/Sub or Apache Kafka topic."
- doc.akka.io/java/event-sourced-entities.html: "Akka stores these events in a journal." / "To load an Entity, Akka reads the journal and replays events to compute the Entity's current state." / "Snapshots are stored and handled automatically by Akka without any specific code required." / "Replication is asynchronous."
- akka.io/llms.txt: "A real-time AI policy enforcement engine (guardrails, policies, LLM-as-judge, sanitizers) embedded in the runtime."; "A non-sampled, hash-chained interaction log"; "Shared compute for orchestration, agents, memory, streaming, APIs, governance, and model economics."
- akka.io/platform/overview: "Memory replicates active-active across regions and reconciles when a region returns."; "Continuous observability" with "OTEL, Prometheus & Splunk export."; "Route to the best model, from any vendor."; "Akka Optimize puts each request on the best model for the task, including smaller models trained on your data."
- Internal wording for pricing (INTERNAL, llms-master.txt line 417 as quoted in C:\Users\tyler\competition\website\demo\research\economics-sovereign.md): "There are no separate memory charges, no streaming charges, and no observability charges." Tyler must confirm this is live on a public page before it is shown.

Customer statements (all PUBLIC, none attributed to a named speaker unless stated, none about licences):

| Customer | Words on the page (verbatim) | Speaker | Class | What it supports |
|---|---|---|---|---|
| Verizon | "Verizon replaced a decade-old Oracle commerce platform with Akka"; "retire the annual parallel-site rebuild entirely" | none (Akka narrative) | PUBLIC, https://akka.io/customer-stories/verizon | A replaced platform. Oracle is named; whether this was a licence saving is not stated. |
| Renault | "collapsing five to six disconnected production systems into a single execution layer" | none | PUBLIC, https://akka.io/customer-stories/renault | Consolidation of systems, products not named. |
| Esdiac | "The Akka Agentic AI Platform handles clustering, resilience, durable in-memory state, and traffic steering, so the application does not have to." | none; Bassirou Rabo (CTE) is paraphrased, not quoted | PUBLIC, https://akka.io/customer-stories/esdiac | Runtime functions Akka performs. Headline figure 65% lower infrastructure cost. |
| Yields | "We wanted to represent everything on our platform as events, which Akka enabled us to do." | Sebastien Viguie, Co-founder and CISO, Yields | PUBLIC, https://akka.io/customer-stories/yields | Event model, not a licence removal. |

Classification of the customer evidence: consolidation of systems (Renault, Verizon); infrastructure reduction (Esdiac); none is a licence-removal statement. I searched the web for a customer who replaced Kafka, Temporal, Redis or Cassandra with Akka and found none. The Akka discussion forum answer found says it is "quite common to have both Akka and Kafka" in one solution (https://discuss.akka.io/t/use-cases-for-akka-vs-kafka/4206), which is a paraphrase from a search snippet and a caution against a blanket replacement claim.

Paraphrases only, not usable as quotes: Manulife (Jodie Wallis, Chief AI Officer) "50% latency improvement and 300% concurrency improvement" is recorded in economics-sovereign.md from the akka.io page and concerns Python porting (dimension 2), not licences.

UNVERIFIED and not to be used: Capital One 60%, Norwegian, Trust1Team, DeductiveAI, Coho cost claims; a "half" for John Deere.

## 4. A worked example

### Deployment stated

An AI system (agents calling models through a gateway) plus transactional services in one cloud. Inputs, all assumptions to be replaced with a customer's numbers:

- 3 million model requests a month through the gateway.
- 3 million traces or LLM spans a month to observability.
- 30 million workflow actions a month (about 10 durable steps per request).
- 1 Kafka cluster at modest throughput.
- 1 managed cache.
- Guardrails, evaluation and governance tooling: no public list price found (Credo AI, OneTrust-class GRC tools publish none that I read), so these are excluded from the arithmetic, which understates the saving.
- Excluded: databases for state and events (the cost there is hosting, which belongs to dimensions 2 and 3, not a licence), the model provider, identity.

### Before: monthly list price

| Category | Low case | High case | Formula and source |
|---|---|---|---|
| Event streaming | $385 | $1,215 | Confluent Standard, "about $385/month" starting cost. High: 2 eCKU x $0.75 x 730 h = $1,095, plus 2 TB x $0.04 = $80, plus 500 GB x $0.08 = $40, total $1,215. The 2 eCKU, 2 TB and 500 GB are assumptions. |
| Workflow engine | $1,250 | $2,000 | Temporal: 30M actions x $25 per M = $750 (low, optimistic) or x $50 per M = $1,500 (high); plus Business support $500 (greater of $500 or 10% of usage). Storage excluded. |
| Cache | $200 | $500 | Redis Pro minimum $200; $500 is an assumed larger plan. |
| API and AI gateway | $310 | $425 | Portkey Production: $49 + 29 x $9 = $310 for 3M requests. Kong Plus: $25 + 2 x $200 = $425 for 3M requests (1M included). Kong AI plugins are an add-on with no published price, so $425 is understated. |
| LLM observability and evaluation | $241 | $1,050 | Langfuse Core: $29 + (900k/100k x $8 = $72) + (2M/100k x $7 = $140) = $241. Datadog: 3M spans / 10K x $3.50 = $1,050. |
| Total per month | $2,386 | $5,190 | Sum of rows. |
| Total per year | $28,632 | $62,280 | x 12. |

LangSmith would sit above this range: at $7.50 per 1,000 traces (second-hand rate), 3M traces is $22,500 a month, which makes it the outlier; I left it out because I could not read the rate on the pricing page itself.

### After

Licence lines removed: those that Akka's included components replace, if the customer moves the corresponding workloads onto Akka. Per the sources, this is defensible for: the cache (entities are the cache), broker between Akka services, durable execution (Akka workflows), view/read-model store, agent memory, guardrails, interaction log and tracing. It is less defensible for the gateway and LLM observability and evaluation lines until Tyler confirms the shipped scope of the Akka gateway, Optimize, evalkit and redkit.

Scenario ranges for the saving (before-total minus remaining licences):

- Narrow (only cache, workflow, inter-service events replaced): low = 385 + 1,250 + 200 = $1,835 a month; high = 1,215 + 2,000 + 500 = $3,715 a month. Annual $22k to $45k.
- Full (adds gateway and observability): $2,386 to $5,190 a month, $29k to $62k a year.
- Subtract Akka's own fee. It is not verified here (see Gaps), so the net saving cannot be stated.

### Scaled up

Linear scaling to 10x volume gives about $0.29M to $0.62M a year, but this is not a customer measurement and the published tiers do not hold there: Kong Plus caps at 10M requests a month, Portkey's table stops at 3M, and Temporal's $25 per million applies only above roughly 100M actions a month. Past these points prices are negotiated, usually down. Treat the 10x figure as an upper illustration only.

### What must be true

1. The customer would otherwise pay for each category as a separate paid product (many run open-source Kafka, Redis, Langfuse or LiteLLM and pay no licence).
2. The workloads actually move onto Akka components, and the customer does not keep the old products.
3. Volumes are at or above the assumptions.
4. List prices apply (enterprise discounts reduce them).
5. Akka's fee is lower than the licences removed, or the licences are the smaller part of the reason to move.

## 5. Objections and answers

| Objection | Answer or status |
|---|---|
| "These are list prices. We have an enterprise agreement and pay 30 to 60% less." | No evidence in hand on discount depth. The example uses list prices stated as such. The saving could be half of that shown. No answer beyond sizing with the customer's invoices. |
| "We run Kafka and Redis ourselves; there is no licence." | True for open source. Then the saving is operating labour and hosting (dimensions 2 and 3), not licence. The film should say "licence or run", and name what each customer pays. |
| "Licences are a rounding error next to model tokens and people." | Section 4 supports this at mid-size scale: tens of thousands of dollars a year. The licence dimension is strongest as a count of things not to integrate, run, secure and reconcile, not as a dollar total. |
| "Akka still integrates with Kafka, Postgres, vector databases and Elasticsearch." | Correct and documented. Akka removes the broker between Akka services and the cache; it does not remove Kafka for outside systems or a vector database. |
| "Temporal's workflow model has features Akka workflows lack." | Not examined here. A feature-by-feature comparison against Temporal is in C:\Users\tyler\competition\_internal\comparison-research-2026-10\research\temporal.md; Tyler should confirm the claims before the film says Akka replaces Temporal. |
| "Observability and evaluation vendors serve non-Akka systems too." | Correct. Akka replaces them only for systems that run on Akka. The internal TCO document itself advises "Keep it for legacy systems if needed". |
| "Akka is itself a licence and a fee." | Correct. Akka's published price could not be verified, so net savings cannot be stated. |
| "Migration cost." | Section 6. No measured figure is available for a licence-driven migration. |

## 6. Gaps and honest limits

Must be supplied or confirmed by Tyler or the team:

1. Akka's own price for a comparable deployment (platform tier and service cores), in a form safe to show. The https://akka.io/pricing URL returned 404 on fetch; search snippets conflict ($0.25 per Akka hour; $5K per year up to 16 cores). Both are UNVERIFIED.
2. Which components are shipped and GA in which product (gateway, Optimize, evalkit, redkit, Verify), so each "replaces" statement is accurate. The public pages read do not contain the word "replaces".
3. What backs the event journal and view storage in each deployment mode (Akka-managed, customer VPC, on-prem), since the docs read do not say. If a customer provisions a database for the journal, the "event store database" replacement claim fails in that mode.
4. A named customer's permission and number: ideally one customer who can state which products they stopped paying for and the annual amount. None exists in the public record found.
5. Customer discount levels on the displaced products, from the customer's contracts.
6. Migration cost: no measured example. The ai-console programs (Graphiti port, BAE and RBC ports) are about code porting speed (dimension 1) and were not read for this report.

Limits to state plainly in any script: list prices are not what large customers pay; open-source versions of most of these products cost nothing to license; customers keep some of these products; licence saving is a small share of total cost at mid scale; the guardrail, GRC and AI-governance categories have no public prices to cite; Akka is not a vector database, model provider, identity provider, analytics warehouse or search engine (akka-facts.md lines 40 to 43 and the docs integration page).

## 7. Suggested on-screen proof

1. A two-column "before and after" stack card from section 4: five category rows with their public list prices and the total, with the line "list prices read 2026-11-09" and the assumptions on screen. Supported by the sources.
2. A quote card with the exact documentation sentence: "There is no need for a separate cache like Redis." with the doc.akka.io URL.
3. A quote card: "Akka provides brokerless at-least-once event delivery across Akka services."
4. A card with Verizon's sentence "Verizon replaced a decade-old Oracle commerce platform with Akka" (ask Verizon's permission and confirm the date of the page).
5. A "what stays" card (Kafka to outside systems, vector database, model provider, identity provider). This is supported and protects credibility.
6. Do not show a total dollar savings for the licence dimension unless Tyler supplies Akka's fee and a customer's real figures.

## Six-line summary

1. Public documentation supports that Akka entities replace a cache and that eventing between Akka services needs no broker; it does not use the word "replaces" for any product.
2. Public list prices for the licences Akka can displace total about $29k to $62k a year at 3M requests a month (arithmetic in section 4).
3. No customer statement about removing a licensed product was found; Verizon's Oracle commerce platform replacement is the only named replacement (unattributed, undated).
4. Gateway, evaluation and governance replacement claims need Tyler's confirmation of shipped scope; guardrail and GRC categories have no public prices.
5. Akka's own price is unverified, so a net licence saving cannot be stated.
6. Report path: C:\Users\tyler\AppData\Local\Temp\claude\5045db475381720c\de0581f4-30ec-48ec-8705-edfad9b0065b\scratchpad\roi-5-licences.md
