# Akka total ROI: evidence and open items

Storyboard and script: `demo/roi/storyboard.md`. Research behind every figure: `demo/roi/research/`. Customer statements marked **Tyler** below were supplied by Tyler on 2026-11-09 and are not yet in a public source; they carry the label CUSTOMER-MEASURED in the film (Akka's own results are stated as a customer's) once Tyler confirms the source and date for the figures file.

## The five items (what is stated)

| # | Source of return | What it changes | How it is measured | Customer or Akka result | What it is worth for the reference estate |
|---|---|---|---|---|---|
| 1 | **Specify** | Design, build, test and release are specified and automated on a standard architecture. The specification holds what each system is for; Akka's context holds current best practice; Specify re-aligns every system built from a specification as best practice evolves, so knowledge stays with the system and technical debt does not accumulate | Delivery: engineer-hours and calendar time per service. Maintenance: services maintained per engineer | **Tyler:** Dojo, Britain's largest payments provider: recent college graduates delivered a regulated AI system in a few weeks. **Tyler:** a major bank has retained Akka to modernize core payments that are decades old, with delivery in a couple of months (scheduled). **Tyler (Akka as its own customer):** over the last year, the average Akka engineer went from maintaining 1 service to 4.3 at once | Delivery: 5 services a year, $354k to $707k by hand against $14k to $57k with Specify, or about $134k to $488k saved a service when human hardening takes four times longer: **$0.67M to $2.44M** (modelled). Maintenance: 20 services, one engineer each at $200,000 fully loaded; at 2 to 4.3 services an engineer, 10 to 15 engineers of capacity are freed: **$2.0M to $3.1M a year** (modelled; the 4.3 is Akka's result, the 2 is the low case) |
| 2 | **Runtime** | The actor and event-driven model keeps many waiting sessions on one node | Errors, concurrency and latency at a given load | **Tyler:** Manulife ported all of its Python AI systems: 99.98% fewer errors, 300% more concurrency, 80% better end-user latency | 1,000 vCPU at $0.04 a core-hour is $350,400 a year; 50% to 75% fewer cores (300% more concurrency is a quarter of the nodes): **$175k to $263k** (modelled) |
| 3 | **Cloud infrastructure** | The platform is deployed across the regions a system needs | Infrastructure and cloud cost; recovery time | **Tyler:** Verizon: 70% drop in infrastructure and cloud costs with Akka's platform. **Tyler:** a top-three Asia-Pacific bank deployed in two regions for high availability and disaster recovery; recovery time objective from 8 hours to 5 minutes | $1.5M a year of cloud services other than the item 2 compute; 50% to 70%: **$0.75M to $1.05M** (modelled; the $1.5M is an assumed input) |
| 4 | **Optimize** | Multi-model routing, decision-model integration and self-hosted small language models | Cost per token | **Tyler (Akka as its own customer):** Akka reduced its cost per token by 73% | $6M a year of model spend; 14.5% (the modelled low case) to 73% (measured at Akka): **$0.87M to $4.38M** |
| 5 | **Licences not needed** | Akka includes the event journal, a cache, messaging, workflows, a gateway, AI governance, observability, evaluation and red teaming | The list price of the tools each one covers | **Tyler:** no additional licences are needed to design, build, test, run and govern AI systems | Gateway, tracing and workflow tools at 3M requests, 3M traces and 30M actions a month: $29k to $62k a year at published list prices; evaluation and guardrail tooling: $0.5M to $2M over three years, from Akka's April 2026 TCO analysis (internal, modelled): **$0.20M to $0.73M a year** |

## Combined total (reference estate)

| Source | Low | High |
|---|---|---|
| 1a. Specify, delivery | $0.67M | $2.44M |
| 1b. Specify, maintenance | $2.00M | $3.07M |
| 2. Runtime | $0.18M | $0.26M |
| 3. Cloud infrastructure | $0.75M | $1.05M |
| 4. Optimize | $0.87M | $4.38M |
| 5. Licences | $0.20M | $0.73M |
| **Total** | **$4.67M** | **$11.93M** (stated as $4.7M to $11.9M) |

The low column is the sum of the low cases and the high column the sum of the high cases. The inputs are disjoint cost lines: delivery effort (5 new services a year), maintenance capacity (20 existing services), compute, other cloud services, model spend and licences. Maintenance capacity is engineers freed, valued at their loaded cost; it is capacity that can be redeployed or hires that are not made, not cash returned unless headcount changes.

## Things to confirm before recording (each affects a figure or a name)

1. **Manulife (item 2).** The figures supplied (99.98% fewer errors, 300% more concurrency, 80% better end-user latency) differ from the Manulife figures on Akka's public talk page (15 May 2026: 30 to 50% faster processing on the same prompts and accuracy, up to 300% more concurrency, no named speaker). The supplied numbers are used. For the figures file, each needs its source and date, and the film should not show the public page next to them. The 300% concurrency figure is on both.
2. **Verizon (item 3).** The 70% drop in infrastructure and cloud costs differs from what Akka's pages state (hardware halved, total cost of ownership about 50% lower, in testing, no named speaker). The supplied number is used; the range for the estate runs from 50% to 70% so the earlier published figure is inside it. The source and date for the 70% are needed.
3. **Akka's own 73% (item 4).** Cost per token down 73%: the period, the baseline, and which of the three levers (multi-model routing, decision-model integration, self-hosted small language models) account for what share. The estate range starts at 14.5% (the modelled low case) so the viewer sees both.
4. **Dojo.** Named on screen as supplied. Earlier internal notes said Dojo was not to appear in public material; this assumes that has changed. Confirm. The film states "recent college graduates" and leaves out any description of what they lacked.
5. **The major bank and the Asia-Pacific bank.** Neither is named. The Canadian bank is described only as "a major bank", with core payments that are decades old and delivery in a couple of months. Tyler: say it happened; it carries the same label as the other customer statements. The Asia-Pacific bank is "a top-three Asia-Pacific bank". Confirm that "top-three" and the two-region description are cleared.
6. **The $1.5M cloud-services input (item 3).** It is an assumption of the reference estate: the cloud bill other than the compute in item 2, so the two items do not overlap. Tyler sets the figure.
7. **Licence basis (item 5).** The $29k to $62k is published list prices (Confluent, Temporal, Redis, Kong, Portkey, Langfuse and Datadog pages read 2026-11-09). The evaluation and guardrail tooling figure ($0.5M to $2M over three years) is from `akka-tco-analysis.md` (2026-04-13), a modelled internal estimate; it needs confirming for use in a film. Governance and red-teaming tools have no public list prices.
8. **Item 1 inputs.** The human hours behind the Specify dollars are assumed (the ten ports measured agent hours only); the film shows the conservative case. A measured figure from one real modernization, such as Dojo's, would replace the assumption.

9. **1 to 4.3 services per engineer (item 1b).** The period (the last year), how a service is counted, what "maintaining" means (on call, changes, upgrades), and the headcount behind the average. The low case (2 services an engineer) is shown beside it so the range holds if the definition narrows.
10. **Best-practice re-alignment (item 1).** Stated as: Akka's context captures current best practice, and Specify re-aligns an existing system built from a specification as that practice evolves, with AI generating from the context. Engineering confirms the mechanism (what triggers it, what is regenerated, what review gate applies) before the voice is generated. The research found the pieces that exist today (the specification, plan, tasks and decisions log; converge and analyze, which find drift between the specification and the code; the conformance gates; the porting program) but not a page that describes automatic re-alignment.
11. **Estate inputs (item 1b).** 20 services in maintenance, one engineer each, and $200,000 fully loaded are assumptions Tyler sets.

## Figures that stay out

"Up to 90% lower infrastructure cost" and "70 to 90%" (no primary source and no method), Capital One 60%, John Deere "half", "~80% less compute", "10T tokens per core per year", the Tubi core and cost figures, and Manulife's "ported our Python agents… 50% latency, 300% concurrency" quote (not on the live page). None is used.

## Production sketch

The same engine and pipeline as "Tokenomics in Akka". Eight animatic scenes of large numbers, statement cards with the names as text, the reference-estate card and the combined table. About three hours to a captions-only draft once the script is approved.

## Answers, 2026-11-09

- Akka 73%: the last six months of this year. 4.3 services: the last year; a service is a product or system that previously required a team to manage.
- Manulife cleared (public interview). Verizon 70%: this year; citations need not be exact. Dojo may be named. The major bank is stated as delivered, not scheduled.
- Still unanswered, built as written: Asia-Pacific bank clearance, estate inputs, internal TCO licence figure, re-alignment and runtime-animation wording.
