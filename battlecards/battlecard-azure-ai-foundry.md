# Akka vs. Microsoft Foundry (formerly Azure AI Foundry)

**A comparison for teams building agentic AI**
**October 2026**

---

**Foundry Agent Service is a collection of Azure services you integrate and operate — not an integrated platform — and Foundry provides no automatic failover or disaster recovery for it.** Microsoft's own documentation states that Foundry has no automatic failover, that the Agent Service does not replicate state, and that the recovery point for agent state "can be total loss." The Akka Agentic AI Platform delivers agents, memory, streaming, APIs, and governance as one runtime that guarantees resilience and scalability, with a contractual 99.9999% availability SLA, sub-1-minute RTO, and zero-byte RPO.

| Stat | |
|------|--|
| **No failover** | Foundry provides no automatic failover or disaster recovery |
| **99.9999%** | Akka availability SLA, backed by indemnities |
| **5+ services** | Azure services to stitch together for a production agent (OpenAI, Cosmos DB, AI Search, Storage, gateway, monitor) |
| **Total loss** | Microsoft's documented recovery point for agent state on regional failure |

---

## At a Glance

| Dimension | Foundry | Akka |
|-----------|--------------------------------------|------|
| What it is | An agent service that orchestrates a set of separately provisioned Azure services | The Akka Agentic AI Platform — a platform that guarantees resilience and scalability, on one runtime |
| Scope | Agent runtime + bring-your-own Cosmos DB, AI Search, Storage, Key Vault, OpenAI, API Management, Monitor — you integrate and operate each | Agents, memory, streaming, APIs, orchestration, observability, and governance on one runtime |
| Availability SLA | None stated in Microsoft's Foundry HA/DR documentation; no automatic failover | **99.9999%** — entire platform, backed by indemnities |
| HA/DR | No automatic failover; no built-in DR; no active-active multi-region replication | **Active-active** HA/DR; sub-1-min RTO; zero-byte RPO |
| Recovery point | "Can be total loss"; cross-region state lost on failback | Zero-byte RPO; state fully preserved |
| Governance / EU AI Act | Guardrails at agent input, tool call, tool response, and output (preview) for Foundry Agent Service agents; Control Plane stop and block; Purview templates for EU AI Act, ISO/IEC 42001, ISO/IEC 23894, NIST AI RMF | Aspect-woven runtime enforcement + full pre-production governance |
| Portability | Azure identity, gateway, and data services; moving off means rebuilding | Any cloud, on-prem, or Akka cloud; portable specs; sovereign cloud |
| Cost model | Per-token / PTU on OpenAI + per-RU Cosmos + per-tier AI Search + gateway + per-GB logging | Shared compute; up to 90% lower infrastructure for the same workload; fixed annual fee |
| Certifications | Inherited Azure certifications + Purview templates | 19 standards — SOC 2 II + public SOC 3, ISO 27001/42001, HIPAA, PCI DSS, GDPR, NIS2, DORA, EU AI Act, NIST AI RMF |

---

## A Collection of Services to Integrate, Not a Platform

A production agent on Foundry is assembled from multiple, separately provisioned, separately billed Azure services. In the Agent Service Standard deployment mode, Microsoft's own setup documentation requires the customer to bring and operate an Azure Cosmos DB account (minimum 3,000 RU/s), an Azure AI Search resource, an Azure Storage account, and an Azure Key Vault — and a realistic production agent also needs Azure OpenAI, an API Management gateway, and Azure Monitor / Application Insights. ([Standard agent setup](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/standard-agent-setup))

| Azure service | Role in an agent | What the customer owns |
|---------------|------------------|------------------------|
| Azure OpenAI | Model inference | Per-token billing or PTU capacity reservation |
| Azure Cosmos DB | Agent state / thread memory | Per-RU billing; ≥3,000 RU/s; backup, replication, failover |
| Azure AI Search | Vector store / retrieval | Per-tier billing; index rebuild on recovery |
| Azure Storage | Uploaded files, attachments | Redundancy and failover configuration |
| Azure Key Vault | Secrets | RBAC and purge protection |
| Azure API Management | Generative AI gateway, load balancing, circuit breaker | Multi-region gateway deployment and policy |
| Azure Monitor / App Insights | Observability | Per-GB ingestion; multi-region instances |

Microsoft's documentation is explicit that the customer operates the durability of these stateful dependencies: "Microsoft and you jointly operate the Foundry Agent Service. Microsoft runs the control plane and capability host platform. You own the durability of stateful dependencies (Azure Cosmos DB, Azure AI Search, Azure Storage)." ([HA/DR for Foundry](https://learn.microsoft.com/en-us/azure/foundry/how-to/high-availability-resiliency)) The integration, the reliability, and the recovery across these seams are the customer's responsibility.

Akka delivers agents, durable memory (4ms reads / sub-10ms writes), real-time streaming, an HTTP/gRPC API layer, orchestration, observability, and governance on one runtime — provisioned once, operated as one system, under one SLA.

---

## Foundry Provides No Automatic Failover or Disaster Recovery

Microsoft's current documentation states this directly (HA/DR page updated September 2026; Agent Service DR page updated May 2026):

> "Foundry itself doesn't provide automatic failover or disaster recovery." ([HA/DR for Foundry](https://learn.microsoft.com/en-us/azure/foundry/how-to/high-availability-resiliency))

> "Agent Service doesn't provide built-in disaster recovery capabilities. It doesn't replicate state, create backups, or support point-in-time restore… The service doesn't have any supported method for active-active, multi-region replication." ([Agent Service disaster recovery](https://learn.microsoft.com/en-us/azure/foundry/how-to/agent-service-disaster-recovery))

> "The recovery point for stateful content can be total loss." ([Agent Service disaster recovery](https://learn.microsoft.com/en-us/azure/foundry/how-to/agent-service-disaster-recovery))

| Metric | Foundry Agent Service | Akka |
|--------|--------------------------------|------|
| Availability SLA | None stated in Microsoft's Foundry HA/DR documentation | **99.9999%** — contractual, backed by indemnities |
| HA/DR mode | Warm-standby reconstruction; no automatic failover | **Active-active**, automatic |
| RTO | "30 or more minutes per project" (reconstruction, not promotion) | **Sub-1 minute** |
| RPO | "Can be total loss" | **Zero byte** |
| Multi-region | "No supported method for active-active, multi-region replication" | Active-active across regions |
| State on failover | "Standby-region state is permanently lost" after failback | Fully preserved |

Microsoft documents that recovery on Azure is reconstruction, not failover: "Warm standby environments start mostly empty. Recovery is reconstruction, not promotion of a hot replica," and after a regional outage, recovered agents "have no access to prior threads," with "no state… transferable between regions." ([Agent Service platform outage recovery](https://learn.microsoft.com/en-us/azure/foundry/how-to/agent-service-platform-disaster-recovery))

Akka owns the SLA. With Foundry, the availability of the assembled agent is the customer's responsibility.

### Azure platform outages are a documented reality

- **Oct 29, 2025** — An Azure Front Door global configuration fault broke routing and authentication across Azure-fronted services for hours. ([Azure status history](https://azure.status.microsoft/en-us/status/history/))
- **May 29, 2026** — Azure OpenAI Service experienced a multi-region outage (failures, timeouts, and 5XX errors) with pronounced impact across Europe and Australia East; root cause was retry amplification from an upstream rollout that cascaded across regions. ([Azure status history](https://azure.status.microsoft/en-us/status/history/))

For an agent with no automatic failover and a documented "total loss" recovery point, a regional event is not a tail risk the customer can ignore.

---

## Cost: Many Meters vs. One Shared-Compute Fee

AI systems built on Akka are up to **90% cheaper to operate** than Python-based systems — a function of the infrastructure required to run the same agentic transaction volume, not list price. On Foundry, cost is the sum of independent meters across every service in §1: per-token or PTU-reserved Azure OpenAI, per-RU Cosmos DB (≥3,000 RU/s minimum), per-tier AI Search, gateway units, and per-GB log ingestion.

Provisioned-throughput (PTU) reservations on Azure OpenAI carry a substantial monthly floor; independent 2026 pricing analyses put a single minimum PTU reservation in the low thousands of dollars per month before any of the surrounding services are counted ([CloudZero](https://www.cloudzero.com/blog/azure-openai-pricing/), [OpsLyft](https://www.opslyft.com/blog/azure-openai-pricing)). Each meter scales independently with load, which makes the total bill difficult for finance to forecast.

Akka runs orchestration, agents, memory, streaming, APIs, observability, and governance on **shared compute** under a **fixed annual fee**. The efficiency is structural: actor-based concurrency delivers ~10 trillion tokens per core per year versus ~2 trillion for comparable solutions, and ~80% less compute than Python-based frameworks. Manulife reported up to **300% more concurrency** and **30–50% faster processing** after porting Python-based systems to Akka. ([akka.io/blog/go-slow-to-go-fast](https://akka.io/blog/go-slow-to-go-fast))

---

## Continuous AI Intelligence

Akka Optimize keeps improving the AI after it ships. It runs an evaluation loop on your own production traffic, grading live interactions and training smaller specialized models on your proprietary data, so the system keeps getting better as it runs. The loop delivers three results that compound over time:

- **Model leverage** — route each request to the best model from any vendor under your policies, and reserve frontier models for the requests that need them.
- **Data sovereignty** — the specialized models are trained on your proprietary data, owned by you, and run inside your own environment.
- **Cost governance** — full visibility and control of AI spend, with savings that compound as the loop keeps running.

The evaluations run continuously inside Akka and grade traffic from agents wherever they run, in Akka or in third-party harnesses.

---

## Governance and the EU AI Act: Assessment vs. Inline Enforcement

The penalties make governance a procurement gate, not a feature:

| Violation | Maximum fine |
|-----------|--------------|
| Prohibited AI practices (Art. 5) | EUR 35M or 7% of global annual turnover |
| High-risk obligations (Art. 9–15) | EUR 15M or 3% of global annual turnover |
| Supplying incorrect information | EUR 7.5M or 1.5% of global annual turnover |

Prohibited-practice penalties have been enforceable since February 2025 and high-risk obligations since August 2025; high-risk AI carries a 10-year logging-retention obligation (Art. 72).

Microsoft has invested in AI governance, and the current capability should be stated accurately. Microsoft Purview Compliance Manager now ingests regulations such as the EU AI Act, uses AI to extract controls, maps them to improvement actions, and syncs evaluation results from Foundry into Compliance Manager. ([Purview + Foundry](https://learn.microsoft.com/en-us/purview/ai-azure-foundry)) Foundry guardrails check an agent's input, tool calls, tool responses, and output and block content that breaks a control; guardrails for agents are in preview. ([Guardrails](https://learn.microsoft.com/en-us/azure/foundry/guardrails/guardrails-overview)) Foundry Control Plane lets an administrator stop a hosted agent or block requests to a registered agent. ([Control Plane](https://learn.microsoft.com/en-us/azure/foundry/control-plane/how-to-manage-agents))

Foundry guardrails apply only to agents built in Foundry Agent Service. Purview Compliance Manager has assessment templates for four AI regulations and frameworks: the EU AI Act, ISO/IEC 42001, ISO/IEC 23894, and NIST AI RMF.

| Requirement | Foundry approach | The gap |
|-------------|---------------------------|---------|
| Real-time policy enforcement | Foundry guardrails at input, tool call, tool response, and output (agent support in preview) | Covers agents built in Foundry Agent Service only |
| Decision explainability | Evaluations + Responsible AI dashboard | Post-hoc scoring, not an inline record of why a running decision was made |
| Immutable interaction log | Azure Monitor / Purview audit logs | Standard audit logs, not a hash-chained, purpose-built ledger |
| Human pause / override of a running agent | Control Plane stops hosted and published agents and blocks registered custom agents | Stopping an agent does not end runs already in progress |
| Authorization capture at execution time | Correlate Entra + RBAC + gateway logs | Reconstructed across 3+ log sources, not captured atomically |
| PII scrub with explainability | PII detection exists | No single atomic scrub-and-explain operation |
| Pre-deployment classification + sign-off | Compliance Manager templates and improvement actions; AI Red Teaming Agent pre-deployment scans | Self-assessment workflow, not a runtime-gating classification + multi-persona attestation engine |
| Sealed audit artifact | Assembled from reports | No single sealed, tamper-evident posture package emitted per deployment |

Akka's governance is **aspect-woven into the runtime**: inline guardrails, policies, LLMs-as-a-judge, and sanitizers execute within the agents; evidence is hash-chained and immutable; humans can pause, override, or nudge a running process; PII is scrubbed and explained atomically. Before a system ships, Akka classifies it against **241 regulations and frameworks and 1,718 controls (700 carrying financial penalties)** to derive the obligation set, routes change events to the right reviewers, and emits a sealed Governance Posture Package. **Akka Verify** proves conformance from the running system, not from a dashboard.

---

## Two Lifecycles, One Certified System

Building on Foundry means developers assembling agents against a set of Azure SDKs and portals. Administrators can define versioned guardrail policies in Foundry Control Plane, and those guardrails apply to agents built in Foundry Agent Service. Akka runs two independent lifecycles on one platform via **Akka Specify**:

```
BUILD LIFECYCLE                                          ONE CERTIFIED AI SERVICE
Functional contract                                      Built, governed, running
"Rank incoming ER patients by acuity                     - Agents, tools, orchestration,
 and route the top three to a clinician."                  memory, APIs, streaming, UI
Product · developers · ML · domain experts               - Guardrails, sanitizers,
v1.4 · versioned · tested                                  HITL/HOTL, evaluations, halts
                              --> Akka Specify -->        - Interaction, evidence,
GOVERN LIFECYCLE                  (AI-assisted              and causal logging
Safeguard contract                authoring:
"Block prohibited practices under                generates · tests · runs)
 EU AI Act Article 5; notify
 regulators within 24h of any incident."
Risk · security · compliance
v2.1 · versioned & tested independent of the build

Akka Verify ↻ validates the running system against both specs and fine-tunes the AI from production data.
```

The build lifecycle and the governance lifecycle are versioned and tested independently, by different audiences. Foundry has no equivalent governance authoring lifecycle that produces a certified, sealed system.

---

## Real-Time Streaming at Petabyte Scale

Foundry has no built-in streaming engine; real-time pipelines are provisioned separately (for example, Event Hubs or Service Bus) and operated by the customer. Akka's streaming is built into the runtime — continuous, backpressured, **petabyte-scale, in-memory**, with no external broker — powering both agent feedback loops and high-throughput data processing. It is the engine behind Tubi's real-time hyper-personalization at **5 billion tokens per second**.

---

## For the Buyer: A Recent, Renamed Product vs. an 18-Year Platform

Microsoft is a durable company; the question is the maturity of the **product**. The current Foundry Agent Service reached general availability in March 2026, after an earlier release at Build in May 2025, and the product is mid-rebrand from "Azure AI Foundry" to "Microsoft Foundry," with its RBAC roles renamed from "Azure AI User/Owner/Project Manager" to "Foundry User/Owner/Project Manager" as the change rolls out. ([HA/DR for Foundry](https://learn.microsoft.com/en-us/azure/foundry/how-to/high-availability-resiliency)) It is a young, evolving agent layer assembled over a set of Azure services, and Foundry provides no automatic failover or disaster recovery for it.

| Buyer concern | Foundry | Akka |
|---------------|------------------|------|
| Product maturity | GA March 2026 (first release May 2025); active rebrand (Azure AI Foundry → Microsoft Foundry) and RBAC rename in progress | since 2009; 100,000+ production deployments; 52 banks; 2B+ people reached daily |
| Scope of accountability | Customer integrates and operates Cosmos DB, AI Search, Storage, gateway, OpenAI; customer owns durability of stateful dependencies | One platform, one SLA, 24/7 SRE — Akka owns the running system |
| Risk transfer | Standard Azure terms | Availability and data-integrity guarantees backed by contractual indemnities |
| HA/DR | No automatic failover; "total loss" recovery point | Active-active; sub-1-min RTO; zero-byte RPO |
| Certifications | Inherited Azure certifications + Purview Compliance Manager templates | 19 standards (SOC 2 II + public SOC 3, ISO 27001/42001, HIPAA, PCI DSS, GDPR, NIS2, DORA, EU AI Act, NIST AI RMF); annual pen tests, SBOMs, 40+ policies (trust.akka.io) |
| Budget predictability | Several independent meters that scale with load | Fixed annual fee on shared compute |

The decision is scope and accountability: Foundry gives you an agent service to wire your Azure estate around; Akka gives you the integrated platform with the SLA on the whole thing.

---

## Customers Running Agentic and Real-Time Systems on Akka

- **Manulife** — selected Akka (March 2026) to operationalize agentic AI within its enterprise AI platform, citing the speed, predictability, and governance required in highly regulated environments, plus energy-efficient AI that requires less infrastructure. ([akka.io/blog/manulife-selects-akka-to-operationalize-agentic-ai](https://akka.io/blog/manulife-selects-akka-to-operationalize-agentic-ai))
- **Tubi** — 5 billion tokens/sec real-time hyper-personalization engine.
- **Swiggy** — 71ms order-assignment AI, ~50% latency reduction.
- **John Deere** — 1,000+ tractor sensors turned into real-time insight.
- **Verizon** — 750% order-processing capacity gain; 6s → 2.4s response.

---

## Common Questions

**We're already on Azure. Why add Akka?**
Akka deploys inside your Azure VPC. You keep your Azure infrastructure, your Entra ID, and your networking — Akka runs alongside them and adds the integrated runtime, the active-active HA/DR, the 99.9999% SLA, and governance for AI systems beyond those built in Foundry Agent Service.

**Won't Microsoft close the HA/DR gap soon?**
Microsoft's current documentation (updated May–September 2026) states that Foundry has no automatic failover, that the Agent Service has no built-in DR, and that the recovery point "can be total loss." Until that changes in the product, the availability of an assembled Foundry agent is the customer's responsibility. Akka delivers active-active HA/DR with a contractual SLA today.

**Doesn't Microsoft already cover the EU AI Act?**
Microsoft has assessment tooling and inline guardrails. Purview Compliance Manager has templates for the EU AI Act, ISO/IEC 42001, ISO/IEC 23894, and NIST AI RMF and syncs Foundry evaluation results. Foundry guardrails block content at agent tool calls (preview), for agents built in Foundry Agent Service only. The EU AI Act expects immutable records witnessed as they happen, human override of a running process, authorization capture at execution time, and pre-deployment classification that gates a release. Akka enforces these in the runtime and produces a sealed posture package.

**Isn't Foundry cheaper because we have an Enterprise Agreement?**
EA discounts apply to individual Azure services, but a production agent still meters across Azure OpenAI, Cosmos DB, AI Search, Storage, the gateway, and logging — each scaling independently. Akka's shared-compute model runs all of it on one runtime at a fixed annual fee, and is up to 90% cheaper to operate for the same agentic transaction volume.

---

## Sources

- **Foundry HA/DR — no automatic failover:** learn.microsoft.com/en-us/azure/foundry/how-to/high-availability-resiliency (updated 2026-09-21) — "Foundry itself doesn't provide automatic failover or disaster recovery"; joint-operation / customer owns durability of Cosmos DB, AI Search, Storage.
- **Foundry Agent Service disaster recovery:** learn.microsoft.com/en-us/azure/foundry/how-to/agent-service-disaster-recovery (updated 2026-05-12) — "doesn't replicate state, create backups, or support point-in-time restore… no supported method for active-active, multi-region replication"; "recovery point for stateful content can be total loss."
- **Foundry platform outage recovery:** learn.microsoft.com/en-us/azure/foundry/how-to/agent-service-platform-disaster-recovery (updated 2026-05-12) — RTO "30 or more minutes per project"; "Recovery is reconstruction, not promotion of a hot replica"; "Standby-region state is permanently lost."
- **Standard agent setup (required services):** learn.microsoft.com/en-us/azure/foundry/agents/concepts/standard-agent-setup — Cosmos DB (≥3,000 RU/s), AI Search, Storage, Key Vault required; plus Azure OpenAI, API Management gateway, Monitor.
- **Foundry Agent Service GA:** techcommunity.microsoft.com — Announcing General Availability of Azure AI Foundry Agent Service (Build, May 2025); devblogs.microsoft.com/foundry/foundry-agent-service-ga — Foundry Agent Service GA, March 16, 2026.
- **Purview + Foundry governance:** learn.microsoft.com/en-us/purview/ai-azure-foundry — Compliance Manager extracts EU AI Act controls, maps improvement actions, syncs Foundry evaluation results (assessment/mapping); learn.microsoft.com/en-us/azure/foundry/guardrails/guardrails-overview — agent guardrails at input, tool call, tool response, output (preview); learn.microsoft.com/en-us/azure/foundry/control-plane/how-to-manage-agents — start, stop, block agents; learn.microsoft.com/en-us/purview/compliance-manager-assessments — EU AI Act, ISO/IEC 23894, ISO/IEC 42001, NIST AI RMF templates.
- **Azure OpenAI / PTU pricing (third-party analyses):** cloudzero.com/blog/azure-openai-pricing, opslyft.com/blog/azure-openai-pricing — PTU minimum reservations and multi-meter cost.
- **Azure outages:** azure.status.microsoft/en-us/status/history — Oct 29, 2025 Azure Front Door global configuration fault; May 29, 2026 Azure OpenAI multi-region outage (Europe / Australia East).
- **Akka platform & performance:** akka.io/blog/go-slow-to-go-fast — Manulife up to 300% more concurrency, 30–50% faster; ~10T vs ~2T tokens/core; ~80% less compute than Python. 99.9999% availability, active-active HA/DR, sub-1-min RTO, zero-byte RPO (contractual indemnities); 241 regulations and frameworks / 1,718 controls / 699 with penalties; 100,000+ deployments / since 2009; profitable; Dell Technologies Capital.
- **Akka trust center:** trust.akka.io — 19 compliance standards; SOC 2 II + public SOC 3; annual pen tests, SBOMs, 40+ policies.
- **Manulife:** akka.io/blog/manulife-selects-akka-to-operationalize-agentic-ai (March 10, 2026).

---

*A comparison for teams building agentic AI. All Azure claims cite Microsoft's own documentation or Azure's status history; Akka figures per akka.io and trust.akka.io. October 2026.*
