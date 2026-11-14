# Human-oversight pattern controls for AI systems and agents: taxonomy, catalogue, evidence, sector and country flavors

Current to 31 October 2026. Each finding carries a status tag:
- **[LAW]**: binding legal text, or an official instrument binding on the bodies it covers (for example an OMB memo for US federal agencies).
- **[GUIDANCE]**: regulator or government guidance, voluntary frameworks and published standards.
- **[DRAFT]**: drafts, proposals and work in progress.
- **[VENDOR]**: product documentation, or what a lab or vendor says about itself.
- **[RESEARCH]**: peer-reviewed or academic work.
- **[FOUNDATIONAL]**: pre-2025 sources, used for definitions.

"Not re-fetched" means the content comes from the canonical source as I know it, and its text was not retrieved in this session. Verify those items before quoting them on a slide.

## 1. Established taxonomies and how standards define oversight

### Takeaway
There are three generations of vocabulary. First come the loop metaphors: in, on and over the loop, plus in-command (HLEG 2019, Singapore 2020). Next comes "meaningful human control", taken from weapons ethics. Last comes the EU AI Act's functional list of five capabilities (Art. 14(4)(a)–(e)), plus a two-person rule (14(5)). The Act does not name a loop model. It specifies what the overseer must be able to do. ISO/IEC standards mostly treat oversight as a control an organisation selects according to risk, not as a fixed requirement. The CEN-CENELEC harmonised standard that will define Article 14 in practice is still a draft, and its numbering is reported inconsistently.

### Cited Findings

**HLEG loop taxonomy (2019) [FOUNDATIONAL / GUIDANCE]**
- The HLEG Ethics Guidelines for Trustworthy AI set out three governance mechanisms. HITL is "the capability for human intervention in every decision cycle of the system", which the guidelines say is in many cases "neither possible nor desirable". HOTL is "human intervention during the design cycle of the system and monitoring the system's operation". HIC is "the capability to oversee the overall activity of the AI system (including its broader economic, societal, legal and ethical impact) and the ability to decide when and how to use the system in any particular situation." — [HLEG Ethics Guidelines](https://digital-strategy.ec.europa.eu/en/library/ethics-guidelines-trustworthy-ai) (not re-fetched); the HOTL and HIC wording is confirmed as quoted in [TAILOR handbook, Human Agency and Oversight](https://prafra.github.io/jupyter-book-TAILOR-D3.2/Human_Agency_and_Oversight/Human_Agency_and_Oversight.html) and [arXiv 2408.12289](https://arxiv.org/pdf/2408.12289)
- The HLEG's HOTL covers design-time intervention plus monitoring. Later industry glossaries narrow HOTL to "a human monitors and can intervene or shut down" at run time. The two usages differ. — [concepts.dsebastien.net](https://concepts.dsebastien.net/concept/human-on-the-loop/); [modeldiplomat glossary](https://modeldiplomat.com/learn/glossary/human-on-the-loop)

**Singapore Model AI Governance Framework, 2nd ed. (2020): human-over-the-loop [FOUNDATIONAL / GUIDANCE]**
- It defines three decision-making models. In human-in-the-loop, the human keeps full control and the AI only recommends. In human-over-the-loop, the human monitors or supervises and can take over or adjust parameters while the system runs. In human-out-of-the-loop there is no human oversight of execution. A probability-severity-of-harm matrix guides the choice of model. — [WongPartnership LegisWatch](https://wongpartnership.com/upload/medias/KnowledgeInsight/document/9013/LegisWatch-IntroductionofaModelArtificialIntelligenceGovernanceFramework.pdf); [McCarthy Tétrault](https://www.mccarthy.ca/en/insights/blogs/techlex/singapore-model-ai-governance-framework-from-principles-to-governance)
- Example from the framework's compendium: DBS Bank used human-over-the-loop for suspicious-transaction (AML) detection. The model decides which transactions are suspicious, and humans can intervene. — [Computer Weekly](https://www.computerweekly.com/news/252477129/Singapore-updates-model-AI-governance-framework)
- One secondary source notes that the matrix has no explicit mapping to the three models. Vendor tables that map high risk to HITL, medium to over-the-loop and low to out-of-the-loop are simplifications. — [same search set; vendor mapping unverified](https://www.mccarthy.ca/en/insights/blogs/techlex/singapore-model-ai-governance-framework-from-principles-to-governance)

**Meaningful human control (MHC) [FOUNDATIONAL / RESEARCH]**
- MHC comes from the autonomous-weapons debate (Article 36, 2013). Its best-known philosophical form, Santoni de Sio and van den Hoven (2018), sets two conditions. *Tracking*: the system responds to the human reasons relevant to the situation. *Tracing*: the outcome can be traced to at least one human with the knowledge and capacity to answer for it. — [Santoni de Sio & van den Hoven, Frontiers in Robotics and AI 2018](https://www.frontiersin.org/articles/10.3389/frobt.2018.00015/full) (not re-fetched); applied to variable autonomy in [Frontiers in AI 2021](https://www.frontiersin.org/journals/artificial-intelligence/articles/10.3389/frai.2021.737072/epub)
- Singapore's 2026 agentic framework talks about "meaningful accountability" more than "meaningful human control". Covington's summary of v1.5 says the phrase "meaningful human control" does not appear in the post. — [Global Policy Watch (Covington), June 2026](https://www.globalpolicywatch.com/2026/06/singapore-updates-model-ai-governance-framework-for-agentic-ai/)

**EU AI Act Article 14: the five capabilities and the two-person rule [LAW]**
- Art. 14(1): high-risk systems must be designed, including with human-machine interface tools, so that natural persons can effectively oversee them during use. 14(2): the aim is to prevent or minimise risks to health, safety and fundamental rights. 14(3): measures must be "commensurate with the risks, level of autonomy and context of use". They are either (a) built in by the provider or (b) identified by the provider for the deployer to implement. — [Art. 14](https://artificialintelligenceact.eu/article/14/)
- Art. 14(4) lists what the assigned persons must be enabled to do:
  - (a) understand the system's capacities and limits, and monitor it, including for anomalies and unexpected performance;
  - (b) remain aware of automation bias, "the possible tendency of automatically relying or over-relying on the output", especially where the output informs a human decision;
  - (c) correctly interpret the output;
  - (d) decide not to use the system, or to disregard, override or reverse its output;
  - (e) intervene, or "interrupt the system through a 'stop' button or a similar procedure".

  — [Art. 14](https://artificialintelligenceact.eu/article/14/)
- Art. 14(5): for Annex III point 1(a) systems (remote biometric identification), no action or decision may be taken on an identification unless it is "separately verified and confirmed by at least two natural persons with the necessary competence", training and authority. The rule does not apply to law enforcement, migration, border control or asylum where Union or national law considers it disproportionate. — [Art. 14](https://artificialintelligenceact.eu/article/14/)
- Recital 73 adds "in-built operational constraints that cannot be overridden by the system itself", a system that responds to its human operator, and overseers with "the necessary competence, training and authority". Two-person checks can come from one or more entities and can be recorded automatically in logs. — [Recital 73](https://artificialintelligenceact.eu/recital/73/)
- Art. 26 places obligations on deployers. Oversight must be assigned to natural persons with "necessary competence, training and authority" and support (26(2)). Deployers must monitor the system and suspend use, informing the provider, where it presents a risk (26(5)). Logs must be kept "at least six months" (26(6)). Workers must be informed before use (26(7)), and so must persons subject to Annex III decisions (26(11)). — [Art. 26](https://artificialintelligenceact.eu/article/26/)
- Art. 12(3)(d) requires remote biometric identification logs to record the identity of the natural persons who verified the results under Art. 14(5). The two-person rule therefore leaves an evidentiary trail. — [Art. 12](https://artificialintelligenceact.eu/article/12/) (not re-fetched)
- **Timing after the Digital Omnibus [LAW]:** Arts. 14 and 26 apply from **2 December 2027** for Annex III systems and **2 August 2028** for Annex I (product) systems. — [Art. 14 page](https://artificialintelligenceact.eu/article/14/); [Art. 26 page](https://artificialintelligenceact.eu/article/26/). The Omnibus is reported as Regulation (EU) 2026/1744, published in the OJ on 24 July 2026 and in force on 27 July 2026. — [Mondaq](https://www.mondaq.com/eu-digital-omnibus-on-ai-enters-into-force/1825722); [Dansk Standard](https://www.ds.dk/en/news/2026/digital-omnibus-for-ai-approved). (Sources give slightly different dates for Council sign-off.)

**CEN-CENELEC JTC 21 harmonised standard on human oversight [DRAFT]**
- The sources conflict on which document carries human oversight:
  - The Serbian national adoption lists "AI trustworthiness framework – Part 1: Logging, transparency and human oversight" (from prEN 18229-1). — [ISS (Serbia)](https://iss.rs/en/project/show/iss:proj:110460)
  - Spain's AESIA also cites Part 1 under that title. — [AESIA guideline listing](https://aesia.digital.gob.es/storage/media/08-transparency-guideline.pdf)
  - CEN-level English listings name Part 1 only "Logging". — [StandICT](https://standict.eu/standards-repository/ai-trustworthiness-framework-part-1-logging-cencenelec-pren-18229-1); [Genorma](https://genorma.com/en/standards/pren-18229-1)
  - An advocacy post names "prEN 18229-3" as the human-oversight part. It says JTC 21 went beyond the standardisation request by adding reaction timeframes, interface design and deployer obligations, and that the draft requires oversight to be verified but leaves testing under realistic conditions optional. — [EA Forum post](https://forum.effectivealtruism.org/posts/XWrJv6LiGLBeHX99Y/europe-is-about-to-approve-human-oversight-of-ai-without) (fetch returned HTTP 429; claims seen only in search snippet)
- Dates also conflict. Genorma gives prEN 18229-1 publication as 28 May 2026 with voting closing 20 Aug 2026. A DIN listing shows a public enquiry from 7 Aug to 7 Oct 2026. — [Genorma](https://genorma.com/en/standards/pren-18229-1); [DIN](https://www.din.de/en/wdc-beuth:din21:404712503)
- TÜV says CEN/CENELEC aim to publish key standards by Q4 2026, with OJ citation coming only afterward. — [TÜV Consulting](https://consulting.tuv.com/aktuelles/ki-im-fokus/harmonisierte-normen-ai-act)

**ISO/IEC [GUIDANCE]**
- **ISO/IEC 42001:2023 Annex A** groups "use of AI systems" controls under A.9 (A.9.2 processes for responsible use, A.9.3 objectives, A.9.4 intended use). A study guide says no dedicated "human oversight" control exists. Oversight is selected as a risk or impact treatment. Other secondary sources label A.9.4 "Human oversight" or list A.9.2–A.9.12, so the numbering is disputed. — [ISMS.online A.9](https://isms.online/iso-42001/annex-a-controls/a-9-use-of-ai-systems); [open-exam-prep](https://open-exam-prep.com/study-guides/iso-42001-foundation/annex-a-use-supply-certification/controls-a9-use)
- **ISO/IEC TS 8200:2024**, controllability of automated AI systems (published April 2024), covers state observability and state transition, the control transfer process and its cost, reaction to uncertainty during control transfer, and verification and validation. It is the closest ISO text to "halt" and "takeover" mechanics. — [ISO 83012](https://www.iso.org/standard/83012.html); [IEC webstore](https://webstore.iec.ch/publication/94106)
- **ISO/IEC 22989:2022**: secondary glossaries say it supplies HITL, HOTL and HIC terminology. No source quoted the clause text. — [regulations.ai glossary](https://regulations.ai/glossary/human-on-the-loop); [SG Systems glossary](https://sgsystemsglobal.com/?p=21989)

### Inferences
- For a multi-country storyboard, the most portable definition is the AI Act's functional list (understand and monitor, awareness of automation bias, interpret, override or disregard, stop). It describes capabilities, not topology, so every loop model and every pattern below can be scored against it.
- "On the loop" means two different things: the HLEG's design-plus-monitoring sense and industry's run-time supervision sense. A deck should define it once, or avoid it.
- The two-person rule is the only place where the AI Act turns a capability into a count of people. Everything else is left to providers, deployers and the (draft) harmonised standard.

### Gaps
- Exact ISO/IEC 22989 clause text and numbering on human oversight and levels of automation. Not available without the paid standard.
- How ISO/IEC 42005:2025 (impact assessment) and 42006:2025 (certification bodies) treat oversight. No sources were retrieved, and they are not believed to define oversight patterns.
- Which prEN 18229 part carries human oversight, and its final requirements: reaction times, testing of oversight effectiveness. Official CEN-CENELEC drafts are paywalled and the sources conflict.
- AESIA's "06 human oversight guideline" (Spain) exists at aesia.digital.gob.es, but the fetched URL returned a placeholder page. Its content is unverified.

## 2. The pattern catalogue in practice

### Takeaway
About fifteen recurring patterns appear across law, standards and products. They differ on five axes:
1. **When** the person acts: before release, before the action, during the run, or after the decision.
2. **Who** acts: an operator, a second operator, an independent reviewer, the affected person, or an institution.
3. **Authority**: approve or deny, override, stop, or only advise.
4. **Whether the work waits.**
5. **What evidence it leaves.**

Law mostly mandates outcomes: a human makes the final decision, a human can review on appeal, the system can be stopped, oversight is assigned to competent people. Products supply the mechanisms: approval gates, permission modes, mandates, monitors.

### Cited Findings

#### P1. Pre-execution approval of an action, including step-up above a threshold
- **Mechanics:** the agent or workflow pauses before a tool call or action. The person sees the proposed action and its parameters and approves, denies or amends it. The decision is recorded and the run resumes.
- [VENDOR] In the OpenAI Agents SDK, `needs_approval` is either True or a per-call async function that receives the run context, the parsed parameters and the call ID, so the gate can be a threshold. Unapproved calls do not execute. The run returns "interruptions" and can resume later from a serialized RunState. Hosted MCP tools take `require_approval="always"`. — [OpenAI Agents SDK HITL (Python)](https://openai.github.io/openai-agents-python/human_in_the_loop); [JS guide](https://openai.github.io/openai-agents-js/guides/human-in-the-loop)
- [VENDOR] **Claude Code** classifies tools into read-only, Bash, file modification and web tiers, each with default approval. The prompt shows the action and offers Yes / "Yes, and don't ask again" / No, plus Esc to cancel and Tab to amend. Allow, ask and deny rules apply, with deny and ask taking precedence even over hook "allow" decisions. Permission modes are default (manual), `acceptEdits`, `plan`, `auto` (a classifier reviews actions in place of the human), `dontAsk` (auto-deny anything not pre-approved) and `bypassPermissions` (containers and VMs only). Admins can disable bypass and auto modes through managed settings. — [Claude Code permissions docs](https://code.claude.com/docs/en/permissions)
- [GUIDANCE / protocol] The **MCP tools spec** says there "SHOULD always be a human in the loop with the ability to deny tool invocations". Clients SHOULD show which tools are exposed, indicate invocations visibly and present confirmation prompts. They SHOULD "show tool inputs to the user before calling the server" and log tool usage for audit. They "MUST consider tool annotations to be untrusted unless they come from trusted servers". — [MCP spec 2025-11-25, Tools](https://modelcontextprotocol.io/specification/2025-11-25/server/tools)
- [GUIDANCE] Singapore's agentic framework (22 Jan 2026) asks organisations to define "significant checkpoints or action boundaries that require human approval", for example before payments, deletions or other irreversible or unusual actions. — [Allen & Gledhill](https://www.allenandgledhill.com/sg/publication/articles/32314/launches-new-model-ai-governance-framework-for-agentic-ai); [Bird & Bird](https://cm.twobirds.com/en/insights/2026/singapore/singapore-introduces-new-model-ai-governance-framework-for-agentic-ai)
- [GUIDANCE] For ASI09 (Human-Agent Trust Exploitation), the OWASP mitigations cited include explicit human confirmation for sensitive actions such as payments, credential sharing and code deployment. — [secondary: guptadeepak.com ASI09](https://guptadeepak.com/agent-security/threats/asi09/); [startupdefense](https://www.startupdefense.io/blog/owasp-top-10-agentic-ai-security-risks-2026)
- **Known failure: approval fatigue.** Anthropic reports that users accept 93% of manual permission prompts, and that approval fatigue sets in "where people stop paying close attention to what they're approving". — [Anthropic Engineering, Claude Code auto mode, 25 Mar 2026](https://www.anthropic.com/engineering/claude-code-auto-mode)
- **Known failure: persuasion.** ASI09 is the case where a manipulated agent talks the human into approving a harmful action. The approval gate becomes the attack surface. — [OWASP via guptadeepak.com](https://guptadeepak.com/agent-security/threats/asi09/)

#### P1a. Machine approver standing in for the human: classifier-gated autonomy (emerging 2026)
- [VENDOR] In Claude Code **auto mode**, a two-stage transcript classifier (Sonnet 4.6) reviews each action before it executes. Stage 1 is a fast filter told to "err on the side of blocking". Stage 2 reasons through only the flagged actions. The classifier is "reasoning-blind by design": it sees user messages and tool calls, and assistant prose and tool results are stripped out. It has more than 20 default block rules in four groups: destroying or exfiltrating data, degrading security posture, crossing trust boundaries, and bypassing review. — [Anthropic Engineering](https://www.anthropic.com/engineering/claude-code-auto-mode)
- Measured error rates for the full pipeline: 0.4% false-positive rate on 10,000 real actions, 17% false-negative rate on 52 real "overeager" actions, and 5.7% FNR on 1,000 synthetic exfiltration attempts. The session stops and escalates to the human after **3 consecutive or 20 total denials**. In headless mode the process terminates instead. Anthropic says auto mode is not a replacement for careful human review on high-stakes infrastructure. — [Anthropic Engineering](https://www.anthropic.com/engineering/claude-code-auto-mode)
- Secondary reports say auto mode became the default for Pro, Max and Team from 14 Aug 2026, and give a later 97% approval figure. Both are unverified against Anthropic primary text. — [Crypto Briefing](https://cryptobriefing.com/anthropic-claude-code-auto-mode-default/); [TechWyse](https://www.techwyse.com/news/platform-updates/anthropic-claude-code-auto-mode-default)

#### P1b. Plan-level approval: approve the strategy, not each step (emerging)
- [VENDOR] In Claude Code Plan Mode, the agent presents its full plan before acting, and the user reviews and edits it. Anthropic says this moves oversight from the step to the strategy. — [Anthropic, framework for safe and trustworthy agents](https://www.anthropic.com/news/our-framework-for-developing-safe-and-trustworthy-agents)
- An unverified secondary report says users reject 39% of plans but only 3% of individual permission requests. If true, plan review draws more real scrutiny than step review. — [TechWyse](https://www.techwyse.com/news/platform-updates/anthropic-claude-code-auto-mode-default)

#### P1c. Standing approval: approve a class of actions once
- [VENDOR] Claude Code's "Yes, and don't ask again" persists per repository and command (Bash), or until the session ends (edits). Allow rules can be checked in and shared across an organisation. — [Claude Code permissions](https://code.claude.com/docs/en/permissions)
- [VENDOR] OpenAI's SDK supports `on_approval` callbacks that decide automatically, so runs continue without pausing. — [OpenAI Agents SDK HITL](https://openai.github.io/openai-agents-python/human_in_the_loop)

#### P2. Delegated authority limits: scoped permissions, budgets and mandates
- **Mechanics:** a human sets bounds in advance: which tools, which data, spend limits, time windows. The agent acts freely inside them, and anything outside is denied or escalated. The evidence is the signed mandate or policy, plus the decisions taken under it.
- [VENDOR / protocol] In Google's **Agent Payments Protocol (AP2)**, Sept 2025, the user signs an *Intent Mandate* that records consent and rules such as price limits and timing. In human-present flows the user approves a *Cart Mandate* locking items and price in real time. In human-not-present flows the agent generates the cart under the pre-signed intent. A *Payment Mandate* tells networks the transaction is agent-initiated and whether the user was present. Sources disagree on who signs the cart mandate. — [Analytics Vidhya](https://www.analyticsvidhya.com/blog/2025/09/agent-payments-protocol-ap2/); [Descope](https://www.descope.com/learn/post/ap2)
- [VENDOR / RESEARCH] Google's three principles for secure agents: agents must have "well-defined human controllers", their "powers must be carefully limited", and their "actions and planning must be observable". Google recommends a hybrid defense-in-depth of deterministic controls plus reasoning-based defenses. — [Google Research, Díaz & Olive 2025](https://research.google/pubs/an-introduction-to-googles-approach-for-secure-ai-agents/)
- [GUIDANCE] Singapore v1.5 (20 May 2026) prefers "deterministic, structurally-enforced limits" for higher-risk actions, for example blocking a tool outright, with monitoring or human review added where those controls are weaker. — [Inside Global Tech](https://www.insideglobaltech.com/2026/06/18/singapore-updates-model-ai-governance-framework-for-agentic-ai/); [Global Policy Watch](https://www.globalpolicywatch.com/2026/06/singapore-updates-model-ai-governance-framework-for-agentic-ai/)
- [DRAFT / GUIDANCE] The NIST NCCoE concept paper "Accelerating the Adoption of Software and AI Agent Identity and Authorization" (reported 5 Feb 2026) proposes treating agents as identifiable enterprise entities under OAuth, OIDC, SPIFFE/SPIRE and SCIM. CAISI launched an AI Agent Standards Initiative on 17 Feb 2026. All of it is voluntary. — [Pillsbury](https://www.pillsburylaw.com/en/news-and-insights/nist-ai-agent-standards.html); [CSA research note](https://labs.cloudsecurityalliance.org/research/csa-research-note-nist-caisi-ai-agent-standards-compliance-2/)
- [VENDOR] Claude Code permission rules are "enforced by Claude Code, not by the model". Instructions in prompts do not change what is allowed. — [Claude Code permissions](https://code.claude.com/docs/en/permissions)

#### P3. Dual control / four-eyes / two-person verification
- [LAW] AI Act Art. 14(5): two competent persons must separately verify a remote biometric identification before any action. Recital 73 allows the checks to come from different entities and to be logged automatically. — [Art. 14](https://artificialintelligenceact.eu/article/14/); [Recital 73](https://artificialintelligenceact.eu/recital/73/)
- [LAW] OMB M-25-21: the AI impact assessment must include "results of independent review" by a reviewer in the agency "who has not been involved in the development", and "risk acceptance, supported by a signature from the individual accepting the risk". — [OMB M-25-21, 3 Apr 2025](https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-21-Accelerating-Federal-Use-of-AI-through-Innovation-Governance-and-Public-Trust.pdf)
- [RESEARCH] **AI as one of the four eyes:** in mammography screening, the MASAI randomised trial (Sweden) used AI to triage exams. Low-risk exams went to single reading and high-risk exams to double reading. Cancer detection was non-inferior, with about 44% less screen-reading workload. This is a hybrid of threshold escalation and four-eyes. — [Lång et al., Lancet Oncology 2023](https://doi.org/10.1016/S1470-2045(23)00298-X) (not re-fetched)
- **Failure mode:** the second reviewer may defer to the first, so the two checks stop being independent. Recital 73 says "separately". No source found specifies how disagreement between the two persons is resolved (see Gaps).

#### P4. Confidence- or risk-threshold escalation to a person
- **Mechanics:** the system decides routine cases and routes a case to a human when model confidence is low, risk is high, a policy fires or an anomaly score crosses a line. The evidence is the routing rule, the escalated queue and the human outcomes.
- [GUIDANCE] Singapore's framework backs checkpoints with "automated monitoring and pre-defined alert thresholds". Coverage also says automated real-time monitoring should escalate anomalous behaviour. — [Global Policy Watch](https://www.globalpolicywatch.com/2026/06/singapore-updates-model-ai-governance-framework-for-agentic-ai/); [Rajah & Tann](https://www.rajahtannasia.com/viewpoints/supporting-the-safe-adoption-of-agentic-ai-singapore-launches-new-model-governance-framework-for-agentic-ai/)
- [GUIDANCE] Partnership on AI, "Prioritizing Real-Time Failure Detection in AI Agents" (Sept 2025): automated monitors track agent behaviour as it unfolds, flag anomalies, and "either halt execution or escalate to human oversight". Its focus is autonomy levels 3–5. It says human oversight is increasingly hard to scale given the speed of agents. — [PAI](https://partnershiponai.org/resource/prioritizing-real-time-failure-detection-in-ai-agents/)
- [VENDOR] Claude Code auto mode escalates to the human after repeated classifier denials (3 consecutive or 20 total). — [Anthropic Engineering](https://www.anthropic.com/engineering/claude-code-auto-mode)
- **Failure mode:** the human sees only what the threshold routes. Errors the model makes confidently are never escalated. This is an inference from how the mechanism works, and no study quantifying it was found.

#### P5. Sampled or quality-assurance review
- [LAW] M-25-21 requires "testing and periodic human review of AI use cases, where feasible", designed to detect unforeseen circumstances, post-deployment changes and drift. — [OMB M-25-21 §4(b)(iii)](https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-21-Accelerating-Federal-Use-of-AI-through-Innovation-Governance-and-Public-Trust.pdf)
- [GUIDANCE] Singapore calls for auditing the effectiveness of human approvals, combined with automated monitoring. — [Fintech News SG](https://fintechnews.sg/125071/ai/singapore-agentic-ai-framework/)
- No law found mandates a sampling rate for AI outputs.

#### P6. Human decision with AI recommendation: the human makes the domain decision
- [LAW / directive] Canada's Directive on Automated Decision-Making, Appendix C: at Levels I–II "decisions may be rendered without direct human involvement". At Levels III–IV "decisions cannot be made without having specific human intervention points during the decision-making process; and the final decision must be made by a human." — [TBS Directive, text dated 2023-04-25, archived copy](https://www.biodiritto.org/ocmultibinary/download/4358/51093/6/44eee84d54f733c758c0d55b6c1be196/file/Directive+on+Automated+Decision-Making.pdf); [official page](https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32592) (the official site rejected automated fetch)
- [LAW] The **EU Platform Work Directive** (2024/2831) requires that decisions to restrict, suspend or terminate a platform worker's contract or account be "taken by a human being", with a right to human review and explanation (Art. 11). Transposition is due by 2 Dec 2026. — [Taylor Wessing](https://www.taylorwessing.com/en/insights-and-events/insights/2024/11/radar---eu-platform-work-directive-brings-in-new-protections-for-platform-professionals); [lexgo](https://www.lexgo.be/en/news-and-articles/13832-new-eu-directive-on-working-through-digital-labour-platforms); [EUR-Lex](https://eur-lex.europa.eu/eli/dir/2024/2831/oj/eng) (article numbering varies across secondary sources)
- [LAW] **California SB 1120** (2024, effective 1 Jan 2025): a licensed physician or qualified health professional must make medical-necessity determinations, and AI may not deny, delay or modify care on its own. — [SB 1120, leginfo.legislature.ca.gov](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB1120) (not re-fetched)
- [GUIDANCE / LAW] FDA non-device clinical decision support Criterion 4 (21st Century Cures Act) requires the software to enable the clinician to "independently review the basis for the recommendations". The January 2026 revised guidance moved its automation-bias discussion into Criterion 4. — [Cooley, 20 Jan 2026](https://www.cooley.com/news/insight/2026/2026-01-20-automation-bias-and-clinical-practice-fda-makes-incremental-updates-to-clinical-decision-support-software-guidance); [FDA CDS guidance](https://www.fda.gov/regulatory-information/search-fda-guidance-documents/clinical-decision-support-software)
- [GUIDANCE] The Spanish DPA (AEPD) says a decision is not "based solely" on automated processing if a human reviews it and takes account of other factors in making the final decision. — [AEPD blog](https://www.aepd.es/en/press-and-communication/blog/evaluating-human-intervention-in-automated-decisions)
- [GUIDANCE] EDPB/WP29 guidelines on automated decisions: human involvement must be "meaningful, rather than just a token gesture", carried out by someone with "the authority and competence to change the decision". — [WP251rev.01](https://ec.europa.eu/newsroom/article29/items/612053) (not re-fetched)
- [LAW, case law] CJEU *SCHUFA* (C-634/21, 7 Dec 2023): where a third party's credit score plays a determining role in the lender's decision, producing the score is itself an automated decision under GDPR Art. 22. A nominal human final decision does not take the system out of scope. — [CJEU C-634/21](https://curia.europa.eu/juris/liste.jsf?num=C-634/21) (not re-fetched)
- **Known failure: rubber-stamping and selective adherence.** See §4 (Kentucky and Virginia judges, Green 2022).

#### P7. Post-hoc review, contest and appeal by the affected person
- [LAW] **GDPR Art. 22(3):** where solely automated decisions are allowed on contract or consent grounds, the controller must ensure "at least the right to obtain human intervention on the part of the controller, to express his or her point of view and to contest the decision". — [GDPR Art. 22](https://gdpr-info.eu/art-22-gdpr/) (not re-fetched)
- [LAW] **UK DUAA 2025:** new Arts. 22A–22D replace Art. 22, in force 5 Feb 2026. Solely automated significant decisions are generally permitted with safeguards: notice and rights to make representations, obtain human intervention and contest. They stay restricted for special-category data. A decision is solely automated where there is "no genuine or meaningful human involvement". — [SI 2026/82](https://legislation.gov.uk/uksi/2026/82); [Bratby Law](https://bratby.law/data-use-and-access-act-2025-commencement/); [Wiggin](https://www.wiggin.co.uk/insight/key-provisions-of-the-data-use-and-access-act-2025-come-into-force/)
- [LAW] **Quebec Law 25** (private-sector Act s. 12.1, in force Sept 2023): the person must be informed of a decision based exclusively on automated processing. On request they must be told the personal information used, the reasons and principal factors, and their right to correction, and be given "the opportunity to submit observations to a member of the personnel ... who is in a position to review the decision". — [LégisQuébec P-39.1](https://www.legisquebec.gouv.qc.ca/en/document/cs/P-39.1) (not re-fetched)
- [LAW] **Korea PIPA Art. 37-2** (in force 15 Mar 2024): data subjects may request explanation or review of fully automated decisions that significantly affect rights or obligations, and may refuse such decisions. The refusal right is unavailable where they were clearly told in advance or consented. Credit decisions follow the Credit Information Act. — [Prighter, PIPA 37-2](https://prighter.com/resources/laws/korean-pipa/main/articles/article-37-2); [Baker McKenzie](https://resourcehub.bakermckenzie.com/en/resources/global-data-and-cyber-handbook/asia-pacific/south-korea/topics/artificial-intelligence-profiling-and-automated-decision-making); [Kim & Park 2024, HSSC](https://doaj.org/article/af3c78609bf4471bb723ecc12b66cb0a)
- [LAW] **US federal agencies (M-25-21 §4(b)(vi)):** individuals affected must have "access to a timely human review and a chance to appeal any negative impacts, when appropriate". Existing adverse-action appeal processes may be extended. — [OMB M-25-21](https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-21-Accelerating-Federal-Use-of-AI-through-Innovation-Governance-and-Public-Trust.pdf)
- [LAW] **California CPPA ADMT regulations** (finalized July/Sept 2025): consumers get a right to opt out of ADMT for significant decisions. The business need not offer it if it offers an appeal to a human reviewer who "know[s] how to interpret and use the output" and has "authority to overturn" the decision, and it must document reliance on that exception. — [Mondaq](https://www.mondaq.com/unitedstates/privacy-protection/1679926/automated-decision-making-under-the-microscope-cppa-finalizes-new-ccpa-rules); [NatLawReview](https://natlawreview.com/article/cppa-finalizes-ccpa-regulations-automated-decision-making-technology-risk). The ADMT compliance date was not confirmed in sources (believed to be 1 Jan 2027).
- [LAW] **Colorado:** the 2024 AI Act (SB 24-205) gave consumers a right to appeal adverse consequential decisions with human review "if technically feasible". It was **repealed and replaced by SB 26-189**, signed 14 May 2026 and effective 1 Jan 2027, which centres on ADMT notice and human review. A federal magistrate stayed enforcement on 27 Apr 2026 in an xAI challenge; whether the stay continues is unconfirmed. — [CBS News Colorado](https://www.cbsnews.com/colorado/news/ai-regulation-colorado-governor-signs-law/); [Mondaq](https://www.mondaq.com/unitedstates/new-technology/1792800/colorado-enacts-new-admt-law-replacing-colorado-ai-act); [SB 24-205 text](https://leg.colorado.gov/bills/sb24-205) (not re-fetched)
- [LAW] **China PIPL Art. 24:** individuals may request an explanation of, and refuse, decisions made solely by automated means that significantly affect their rights. — [DigiChina translation](https://digichina.stanford.edu/work/translation-personal-information-protection-law-of-the-peoples-republic-of-china-effective-nov-1-2021/) (not re-fetched)
- [LAW] **Brazil LGPD Art. 20** gives a right to request review of solely automated decisions. The requirement that the review be by a natural person was vetoed in 2019 (Law 13.853/2019), so the review need not be human. — [LGPD, Planalto](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm) (not re-fetched)
- [LAW] **EU DSA Art. 20(6):** decisions on internal complaints must be taken "under the supervision of appropriately qualified staff, and not solely on the basis of automated means". — [DSA, EUR-Lex 2022/2065](https://eur-lex.europa.eu/eli/reg/2022/2065/oj) (not re-fetched)
- [LAW] **EU AI Act Art. 86:** a right to an explanation of individual decisions taken on the basis of Annex III high-risk outputs. — [Art. 86](https://artificialintelligenceact.eu/article/86/) (not re-fetched)

#### P8. Continuous monitoring with intervention ("on/over the loop")
- [LAW] AI Act 14(4)(a) (monitor for anomalies) and 26(5) (monitor; suspend and inform on risk). — [Art. 14](https://artificialintelligenceact.eu/article/14/); [Art. 26](https://artificialintelligenceact.eu/article/26/)
- [LAW] M-25-21 §4(b)(iii): ongoing monitoring for performance and adverse impacts. §4(b)(v): "human oversight, intervention, and accountability suitable for high-impact use cases". — [OMB M-25-21](https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-21-Accelerating-Federal-Use-of-AI-through-Innovation-Governance-and-Public-Trust.pdf)
- [VENDOR] ChatGPT agent (2025) shipped a "watch mode" that required the user to supervise on certain sites, plus monitors that "stop it if anything looks suspicious" and a takeover mode for logins. One OpenAI help page now says ChatGPT agent is no longer available (replaced by "ChatGPT Work"), while another still describes it, so the sources conflict. — [OpenAI Help](https://help.openai.com/en/articles/11752874-chatgpt-agent); [Decrypt](https://decrypt.co/330714/openais-chatgpt-agent-launches-expanded-powers-elevated-risk)
- **Known failure: supervisory complacency** [FOUNDATIONAL]:
  - In the 2018 Uber ATG fatality in Tempe, the NTSB cited the safety operator's distraction and "automation complacency". — [NTSB HAR-19/03](https://www.ntsb.gov/investigations/AccidentReports/Reports/HAR1903.pdf) (not re-fetched)
  - NHTSA's Dec 2023 Tesla Autopilot recall (23V-838) concerned whether driver-engagement controls were sufficient. — [NHTSA](https://static.nhtsa.gov/odi/rcl/2023/RCLRPT-23V838-8276.PDF) (not re-fetched)

#### P9. Halt / stop / kill switch (and restart)
- [LAW] AI Act 14(4)(e) "'stop' button or a similar procedure". The full text speaks of bringing the system to a halt in a safe state. Recital 73 links this to deciding "when to step in or halt". — [Art. 14](https://artificialintelligenceact.eu/article/14/); [Recital 73](https://artificialintelligenceact.eu/recital/73/)
- [LAW] M-25-21: a non-compliant high-impact use case must be safely discontinued. "When practicable", AI functionality must have "an appropriate fail-safe that minimizes the risk of significant harm". Footnote 31 says an AI safety mechanism needing immediate automated action need not wait for human approval, though oversight still has to be defined. — [OMB M-25-21](https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-21-Accelerating-Federal-Use-of-AI-through-Innovation-Governance-and-Public-Trust.pdf)
- [GUIDANCE] ISO/IEC TS 8200 covers control transfer, its cost and how the system reacts to uncertainty during transfer. — [ISO 83012](https://www.iso.org/standard/83012.html)
- [VENDOR] OpenAI's 2023 practices for agentic systems include "interruptibility and maintaining control". — [OpenAI, Practices for Governing Agentic AI Systems (Dec 2023)](https://openai.com/index/practices-for-governing-agentic-ai-systems/) (fetch returned 403; not re-verified)
- [GUIDANCE] CSA announced an AICM annex on catastrophic risks, including "loss of human oversight". — [Campus Technology](https://campustechnology.com/articles/2026/05/06/cloud-security-alliance-expands-focus-on-governance-and-assurance-for-agentic-ai-systems.aspx)
- **Failure mode:** detection lag. PAI cites an internal Meta agent that exposed sensitive data for two hours before detection (reported secondhand). — [AI Weekly on PAI/Tech Policy Press](https://aiweekly.co/alerts/partnership-on-ai-agent-action-tools-hit-65-as-oversight-lags)

#### P10. Human feedback and correction loops
- [LAW] M-25-21 §4(b)(vii): "an option for end users and the public to submit feedback", used to inform decisions about the AI. — [OMB M-25-21](https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-21-Accelerating-Federal-Use-of-AI-through-Innovation-Governance-and-Public-Trust.pdf)
- [LAW] AI Act 14(4)(d): "reverse" the output. Correction rights for input data appear in Quebec s. 12.1 and in the repealed Colorado SB 24-205. — [Art. 14](https://artificialintelligenceact.eu/article/14/); [LégisQuébec](https://www.legisquebec.gouv.qc.ca/en/document/cs/P-39.1)
- [VENDOR] Claude Code lets the user "Tab to amend" a proposed command, which is correction at the point of approval. — [Claude Code permissions](https://code.claude.com/docs/en/permissions)

#### P11. Release sign-off and change approval
- [LAW] M-25-21 requires an AI impact assessment before deployment, an independent reviewer and a risk-acceptance signature. Pilots need CAIO certification and, when possible, opt-in and opt-out for affected people. A CAIO may waive minimum practices only by written, system-specific determination, re-certified annually, reported to OMB within 30 days, and not delegable. — [OMB M-25-21 §4(a)–(b)](https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-21-Accelerating-Federal-Use-of-AI-through-Innovation-Governance-and-Public-Trust.pdf)
- [GUIDANCE] Singapore v1.5: "define triggers for change review and categorize changes by risk", because small changes can cascade. — [Global Policy Watch](https://www.globalpolicywatch.com/2026/06/singapore-updates-model-ai-governance-framework-for-agentic-ai/)
- [GUIDANCE] Canada DADM peer review: none at Level I, at least one qualified expert at Levels II–III and at least two at Level IV, with the review or a plain-language summary published. — [DADM Appendix C (2023 text)](https://www.biodiritto.org/ocmultibinary/download/4358/51093/6/44eee84d54f733c758c0d55b6c1be196/file/Directive+on+Automated+Decision-Making.pdf)
- [GUIDANCE] FDA Predetermined Change Control Plans (final guidance Dec 2024) let manufacturers pre-authorise specified model changes. This is a change-approval pattern at regulator level. — [FDA PCCP guidance](https://www.fda.gov/regulatory-information/search-fda-guidance-documents/marketing-submission-recommendations-predetermined-change-control-plan-artificial-intelligence) (not re-fetched)

#### P12. Consent, confirmation or opt-out by the affected person
- [GUIDANCE / protocol] MCP elicitation has the server ask the *user* for input mid-task, with three outcomes: accept, decline, cancel. Clients MUST show which server is asking, give decline and cancel options, and let users review and modify form responses. Credentials and payments MUST go through URL mode, which needs explicit consent before navigating, shows the full URL, and keeps the data out of the client and the LLM. — [MCP spec 2025-11-25, Elicitation](https://modelcontextprotocol.io/specification/2025-11-25/client/elicitation)
- [VENDOR] At launch, ChatGPT agent stopped short of entering card details until the user approved, and paused for the user to take over at logins. — [OpenAI Help](https://help.openai.com/en/articles/11752874-chatgpt-agent); [Decrypt](https://decrypt.co/330714/openais-chatgpt-agent-launches-expanded-powers-elevated-risk)
- [LAW] Opt-out and refusal rights: CPPA ADMT opt-out (unless a human appeal is offered), Korea PIPA 37-2 refusal, China PIPL Art. 24 refusal, and M-25-21 pilot opt-in/out "when possible". — sources above

#### P13. Verification of identity-impacting outputs
- [LAW] AI Act 14(5) two-person verification, with Art. 12(3)(d) logging of who verified. — [Art. 14](https://artificialintelligenceact.eu/article/14/)
- [FOUNDATIONAL] Detroit's 2024 settlement over the Robert Williams wrongful arrest bars arrests based solely on facial-recognition leads or FRT-derived photo lineups. It is a case where a single human "check" failed. — [ACLU, Williams v. City of Detroit](https://www.aclu.org/cases/williams-v-city-of-detroit-face-recognition-false-arrest) (not re-fetched)

#### P14. Hand-off / takeover / path to a human
- [VENDOR] ChatGPT agent's takeover mode: no screenshots were captured while the user was in control. — [OpenAI Help](https://help.openai.com/en/articles/11752874-chatgpt-agent)
- [LAW] California AB 3030 (effective 2025): health providers' AI-generated patient communications must carry a disclaimer and instructions for reaching a human provider. — [AB 3030](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB3030) (not re-fetched)

#### P15. Red-team / adversarial review and institutional (ex-ante) oversight
- [LAW] M-25-21 requires pre-deployment testing that reflects real-world outcomes. Where source code, models or data are inaccessible, agencies must use alternatives such as querying the service. — [OMB M-25-21 §4(b)(i)](https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-21-Accelerating-Federal-Use-of-AI-through-Innovation-Governance-and-Public-Trust.pdf)
- [RESEARCH] Green proposes that agencies justify algorithm use, show empirically that any proposed human oversight works, and obtain democratic public review *before* adoption. This is oversight by an institution, not by an operator. — [Green, CLSR 2022, arXiv](https://arxiv.org/abs/2109.05067)

### Inferences
- Laws in different countries converge on two *outcome* patterns: a human makes the final call (Canada III–IV, Platform Work, California SB 1120), and a human hears the challenge (GDPR, UK, Quebec, Korea, M-25-21, CPPA, Colorado). They diverge on mechanics: who the human is, what authority they hold, whether the affected person can refuse, and whether the review must be human at all (Brazil: no).
- Agentic products have converged on pre-execution approval with a policy layer (allow, ask, deny), and in 2026 they are moving the routine approvals to a *machine* approver (classifier), reserving people for escalations and plans. This changes what "human oversight" means in agentic systems: the human authorises the policy and the classifier, and handles exceptions.
- "Delegated authority" (mandates, budgets, scoped permissions) is the agent-era equivalent of a delegation-of-authority matrix. Its human act happens before the run, not during it.

### Gaps
- No law or standard found that says how two verifiers' disagreement is resolved under AI Act 14(5) (tie-breaker or arbitration). The mammography double-reading arbitration analogy is clinical practice, not AI law.
- No primary source found for "human as tie-breaker" as a named AI-governance pattern.
- Text of the 2025 amendments, if any, to Canada's DADM after the 4th review. The text used here is dated 2023-04-25, and the official site blocked fetching.
- CPPA ADMT compliance date and Colorado SB 26-189's exact human-review language. The law-firm pages were blocked with 403.

## 3. Emerging agentic-AI oversight guidance, 2025–2026

### Takeaway
2026 brought the first government framework written for agents (Singapore, January; v1.5 in May). OWASP's agent-specific risk list names *human-agent trust exploitation* as its own risk. The first binding "assign human oversight" duty in Asia took effect: Korea's AI Framework Act Art. 34(1)4, from 22 Jan 2026. US federal guidance (M-25-21) is binding on agencies only. NIST and CSA work on agents is voluntary and still in progress. The labs publish permission modes, approval APIs and protocol-level "human in the loop SHOULDs" (MCP) rather than binding rules.

### Cited Findings
- [GUIDANCE] **Singapore Model AI Governance Framework for Agentic AI**: launched 22 Jan 2026 at WEF Davos by IMDA, non-binding. Its four dimensions:
  1. assess and bound risks upfront;
  2. make humans meaningfully accountable;
  3. implement technical controls and processes;
  4. enable end-user responsibility.

  — [Global Policy Watch](https://www.globalpolicywatch.com/2026/06/singapore-updates-model-ai-governance-framework-for-agentic-ai/); [MDDI press](https://www.mddi.gov.sg/newsroom/singapore-launches-new-model-ai-governance-framework-for-agentic-ai--/)
- [GUIDANCE] **Singapore v1.5** (20 May 2026):
  - adds case studies;
  - recommends tracking **human override rates and response times**, training reviewers on agentic failure modes, and ensuring reviewers have the expertise to evaluate agent actions;
  - treats **skill erosion** as a business-continuity risk (keep core capabilities trained);
  - prefers deterministic limits;
  - sets change-review triggers.

  — [IMDA factsheet (title and date only fetched)](https://www.imda.gov.sg/resources/press-releases-factsheets-and-speeches/factsheets/2026/updated-model-ai-governance-framework-for-agentic-ai); [Global Policy Watch](https://www.globalpolicywatch.com/2026/06/singapore-updates-model-ai-governance-framework-for-agentic-ai/); [Inside Global Tech](https://www.insideglobaltech.com/2026/06/18/singapore-updates-model-ai-governance-framework-for-agentic-ai/)
- [GUIDANCE] A reported v1.5 case study (Tencent): by default, file edits, shell commands, network requests and external tools need human approval. — [secondary search summary; Rajah & Tann](https://www.rajahtannasia.com/viewpoints/supporting-the-safe-adoption-of-agentic-ai-singapore-launches-new-model-governance-framework-for-agentic-ai/) (unverified against IMDA PDF)
- [GUIDANCE] **OWASP Top 10 for Agentic Applications 2026**: published 9 Dec 2025 by the OWASP GenAI Security Project, with more than 100 contributors. ASI01–ASI10 cover goal hijack, tool misuse, identity and privilege abuse, agentic supply chain, unexpected code execution, memory and context poisoning, insecure inter-agent communication, cascading failures, human-agent trust exploitation (ASI09) and rogue agents. — [OWASP GenAI](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/) (date); [AIGL summary](https://www.aigl.blog/owasp-top-10-for-agentic-applications-2026/) (names from secondary)
- [GUIDANCE] ASI09 mitigations cited secondarily: explicit confirmation for sensitive actions, plus showing confidence levels and source attribution for agent recommendations. — [startupdefense](https://www.startupdefense.io/blog/owasp-top-10-agentic-ai-security-risks-2026); [guptadeepak.com](https://guptadeepak.com/agent-security/threats/asi09/)
- [LAW] **Korea AI Framework Act** (Act No. 20676, enacted 21 Jan 2025, in force 22 Jan 2026), Art. 34(1): operators of high-impact AI must:
  1. draw up and run a risk management plan;
  2. prepare and carry out an explanation plan;
  3. run user protection plans;
  4. **"assign human management and oversight of high-impact artificial intelligence"**;
  5. keep documents that verify these measures.

  The Minister publishes details. Art. 35 says operators should endeavour to carry out fundamental-rights impact assessments. — [KLRI official English translation, law.go.kr](https://www.law.go.kr/LSW/eng/engLsInfoR.do?lsiSeq=268543)
- [DRAFT] A draft MSIT Business Responsibilities Notice sets five-year retention for documents evidencing human-oversight controls. One tracker reports a grace period of at least one year from 22 Jan 2026. — [Mondaq / Baker Botts](https://www.mondaq.com/new-technology/1694552/south-korean-ministry-of-science-and-ict-issues-package-of-regulations-to-supplement-ai-framework-act); [Baker Botts](https://ourtake.bakerbotts.com/post/102low8/south-korean-ministry-of-science-and-ict-issues-package-of-regulations-to-supplem)
- [LAW, agencies only] **OMB M-25-21** (3 Apr 2025): the high-impact definition does not depend on whether a human is in the loop ("A high-impact determination is possible whether there is or is not human oversight"). Minimum practices were to be documented within 365 days, otherwise use must be safely discontinued. — [OMB M-25-21](https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-21-Accelerating-Federal-Use-of-AI-through-Innovation-Governance-and-Public-Trust.pdf). One report says the whitehouse.gov page now 404s. — [Forkast](https://forkast.news/?p=130566) (the PDF URL above was retrievable on 31 Oct 2026)
- [GUIDANCE / DRAFT] **NIST**: CAISI AI Agent Standards Initiative (17 Feb 2026) and the NCCoE agent identity and authorization concept paper (Feb 2026). Both are voluntary. Neither addresses human-approval patterns directly in the sources found. — [Pillsbury](https://www.pillsburylaw.com/en/news-and-insights/nist-ai-agent-standards.html); [CSA note](https://labs.cloudsecurityalliance.org/research/csa-research-note-nist-caisi-ai-agent-standards-compliance-2/)
- [GUIDANCE] **CSA**: Agentic Trust Framework (Feb 2026; zero-trust for agents; maturity model for progressive autonomy) and the AICM (243 controls), with a catastrophic-risk annex covering loss of human oversight. — [CSA blog](https://cloudsecurityalliance.org/blog/2026/04/03/every-rsac-keynote-asked-the-same-five-questions-here-s-the-framework-that-answers-them); [The Journal](https://thejournal.com/articles/2026/05/06/cloud-security-alliance-expands-agentic-ai-governance-work.aspx). A CSA Labs note on Forrester's AEGIS says AEGIS requires human approval gates for irreversible or high-consequence actions. — [CSA Labs PDF](https://labs.cloudsecurityalliance.org/wp-content/uploads/2026/08/CSA_research_note_forrester_aegis_agentic_ai_controls_20260825-csa-styled.pdf). Some CSA Labs notes say they are AI-generated and not CSA-reviewed.
- [VENDOR] Akka publishes a CSA ATF self-attestation describing "configurable approval gates" above significance thresholds. It is a vendor self-claim. — [trust.akka.io/csa-atf](https://trust.akka.io/csa-atf)
- [GUIDANCE] **Partnership on AI** (Sept 2025): real-time failure detection as the scalable complement to human oversight, with standardized evaluations of detector reliability. — [PAI](https://partnershiponai.org/resource/prioritizing-real-time-failure-detection-in-ai-agents/)
- [GUIDANCE] **UK AISI**: the research agenda prioritises alignment and control, and its Challenge Fund backs controls "that allow humans to reliably monitor and intervene". In April 2026, AISI officials warned that agent autonomy is outpacing assurance. They said AISI pursues voluntary practices, not mandates. — [techUK](https://www.techuk.org/insights/news/the-uk-s-ai-security-institute-s-research-agenda); [MLex](https://www.mlex.com/mlex/articles/2536800). A reported Aug 2026 AISI incident (19 "unsanctioned actions" in cyber-range tests) is unverified. — [ThursdAI](https://thursdai.news/companies/uk-aisi)
- [VENDOR] **Anthropic**: its five agent principles include "keeping humans in control". Users set what an agent may do without asking, and Plan Mode moves oversight to the plan. — [Anthropic](https://www.anthropic.com/news/our-framework-for-developing-safe-and-trustworthy-agents). Claude Code permission modes and auto mode are covered in §2. — [docs](https://code.claude.com/docs/en/permissions); [engineering](https://www.anthropic.com/engineering/claude-code-auto-mode)
- [VENDOR] **OpenAI**: approval-gated tools with pause/resume in the Agents SDK. ChatGPT agent shipped confirmations, watch mode and takeover, and its current availability is disputed. — [Agents SDK](https://openai.github.io/openai-agents-python/human_in_the_loop); [Help](https://help.openai.com/en/articles/11752874-chatgpt-agent)
- [VENDOR] **Google**: well-defined human controllers, limited powers, observable actions and planning. AP2 adds signed mandates for human-present and human-not-present payments. — [Google Research](https://research.google/pubs/an-introduction-to-googles-approach-for-secure-ai-agents/); [Descope on AP2](https://www.descope.com/learn/post/ap2)
- [GUIDANCE / protocol] **MCP**: human in the loop SHOULD be able to deny tool calls, and elicitation handles user input and consent (§2 P1, P12). — [MCP tools](https://modelcontextprotocol.io/specification/2025-11-25/server/tools); [MCP elicitation](https://modelcontextprotocol.io/specification/2025-11-25/client/elicitation)

### Inferences
- Across Singapore, OWASP, Google and Anthropic, agentic guidance puts deterministic bounds first, monitoring second and human approval third, kept for irreversible or high-consequence actions. This inverts the older assumption that a human is the primary safeguard.
- Singapore v1.5's override-rate and response-time metrics are the first government text found that names *oversight-quality telemetry* as a control.
- Korea's Art. 34(1)4 is binding but unspecific ("assign human management and oversight"). In practice the MSIT notice and documentation duty will define it. For a multinational, Korea is a jurisdiction where the *existence and assignment* of a human overseer must be evidenced in documents.

### Gaps
- The full IMDA agentic framework PDF (v1.0 and v1.5) was not retrieved. Exact checkpoint wording and the case-study list are from secondary sources.
- The OWASP agentic Top 10 PDF was not retrieved. ASI names and mitigations are from secondary sources.
- The final MSIT notice text on "human management and supervision" was not found.
- No primary Google Gemini or Project Mariner confirmation-policy documentation was retrieved.
- UK AISI primary publications on agent oversight were not retrieved, and the 2026 items are from aggregators.

## 4. Evidence on whether oversight works, countermeasures, and how effectiveness is shown

### Takeaway
The evidence is strong that adding a human does not, on its own, make decisions better or safer. On average, people over-rely on AI, under-rely on it, or follow it selectively. In agent products, people approve more than nine in ten prompts. The countermeasures with some evidence are cognitive forcing, calibrated displays, plan-level review and fewer, better-chosen prompts. Regulators increasingly expect *proof* that oversight works: competence, training and authority records, verifier identities in logs, override rates and review times, retained documentation.

### Cited Findings
- [RESEARCH] **Green (2022):** across 41 policies requiring human oversight of government algorithms, evidence suggests people cannot perform the oversight functions expected of them. The policies then legitimise flawed algorithms, give "a false sense of security" and let agencies and vendors avoid accountability. Green proposes institutional oversight with empirical justification and democratic review before adoption. — [arXiv 2109.05067 / CLSR vol. 45](https://arxiv.org/abs/2109.05067)
- [RESEARCH] **Vaccaro, Almaatouq & Malone (2024):** a meta-analysis of 106 experiments and 370 effect sizes. On average, human-AI combinations performed *worse* than the best of humans or AI alone (Hedges' g = −0.23, 95% CI −0.39 to −0.07). Losses were concentrated in decision tasks and gains appeared in creative tasks. They were better than humans alone (augmentation), and heterogeneity was large. — [PMC11659167](https://pmc.ncbi.nlm.nih.gov/articles/PMC11659167/)
- [RESEARCH] **Sterz et al. (FAccT 2024):** an overseer is effective only with (1) causal power over the system and its effects, (2) suitable epistemic access, (3) self-control and (4) fitting intentions. The paper tests this against AI Act Art. 14. — [arXiv 2404.04059](https://arxiv.org/pdf/2404.04059)
- [RESEARCH] **Stevenson & Doleac:**
  - In Kentucky, release for low- and moderate-risk defendants was projected to rise 37 points if the tool were followed, but rose only 4 points (63% to 67%). The median judge overrules the tool's presumptive default about two times in three.
  - In Virginia, strict judges divert about 20% of low-risk offenders and lenient judges nearly 70%.
  - Judges deviated systematically, and there were no detectable gains in public safety or incarceration.

  — [ACS "Roadblock to Reform" 2018](https://www.acslaw.org/analysis/reports/roadblocktoreform/); [AEJ: Economic Policy 2024](https://ideas.repec.org/a/aea/aejpol/v16y2024i4p382-414.html)
- [RESEARCH] **Selective adherence:** human decision-makers can follow recommendations selectively, to the detriment of groups already likely to face discrimination. — [Pennsylvania study via search set](https://arxiv.org/html/2306.06573v1); see also Alon-Barkat & Busuioc, JPART 2023 [doi:10.1093/jopart/muac007](https://doi.org/10.1093/jopart/muac007) (not re-fetched)
- [VENDOR data] **Agent approvals:** 93% of Claude Code permission prompts are accepted. The classifier replacing them misses 17% of real overeager actions. — [Anthropic Engineering](https://www.anthropic.com/engineering/claude-code-auto-mode)
- [FOUNDATIONAL] **Moral crumple zone:** responsibility falls on the nearest human operator, who had little real control. — [Elish 2019, Engaging STS](https://estsjournal.org/index.php/ests/article/view/260) (not re-fetched)
- [FOUNDATIONAL] **Robodebt** (Australia): removing human review from automated debt-raising led to a Royal Commission. — [Royal Commission report, July 2023](https://robodebt.royalcommission.gov.au/publications/report) (not re-fetched)
- **Countermeasures:**
  - [RESEARCH] Cognitive forcing functions (asking for the user's judgment before showing the AI's, adding a delay, on-demand explanations) reduced over-reliance more than plain explanations, though users liked them less. — [Buçinca, Malaya & Gajos, CSCW 2021, arXiv 2102.09692](https://arxiv.org/abs/2102.09692) (not re-fetched)
  - [GUIDANCE] Track override rates and response times. Train reviewers on agentic failure modes. Ensure reviewer expertise. Maintain manual skills against erosion. — [Singapore v1.5 via Global Policy Watch](https://www.globalpolicywatch.com/2026/06/singapore-updates-model-ai-governance-framework-for-agentic-ai/)
  - [GUIDANCE] Display confidence levels and source attribution for agent recommendations (OWASP ASI09). — [startupdefense](https://www.startupdefense.io/blog/owasp-top-10-agentic-ai-security-risks-2026)
  - [VENDOR] Reduce prompt volume so that the prompts which remain matter (auto mode, sandboxing). Move review to plans. — [Anthropic Engineering](https://www.anthropic.com/engineering/claude-code-auto-mode); [Anthropic](https://www.anthropic.com/news/our-framework-for-developing-safe-and-trustworthy-agents)
  - [VENDOR / practitioner] Read a low override rate together with a short review time as the sign that a control has stopped operating. Zero overrides may indicate automation bias. These are practitioner heuristics, not validated thresholds. — [Kovrr](https://www.kovrr.com/blog-post/human-in-the-loop-how-to-tell-review-is-real)
- **How regulators expect effectiveness to be shown:**
  - [LAW] AI Act: overseers with competence, training, authority and support (Art. 26(2)). Logs kept at least six months (Art. 26(6)). Identities of the two verifiers logged for biometric identification (Art. 12(3)(d)). — [Art. 26](https://artificialintelligenceact.eu/article/26/); [Art. 12](https://artificialintelligenceact.eu/article/12/)
  - [LAW] M-25-21 requires "sufficient and periodic training, assessment, and oversight for operators", specific to the system. It also requires a documented impact assessment with independent review and a signed risk acceptance, documented practices reportable to OMB, and central tracking of waivers. — [OMB M-25-21](https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-21-Accelerating-Federal-Use-of-AI-through-Innovation-Governance-and-Public-Trust.pdf)
  - [LAW / directive] Canada DADM training: documentation at Level II, training courses completed at Level III, and recurring training plus "a means to verify that training has been completed" at Level IV. — [DADM Appendix C](https://www.biodiritto.org/ocmultibinary/download/4358/51093/6/44eee84d54f733c758c0d55b6c1be196/file/Directive+on+Automated+Decision-Making.pdf)
  - [LAW] CPPA: the human reviewer must be able to interpret the output and have authority to overturn, and reliance on the exception must be documented. — [Mondaq](https://www.mondaq.com/unitedstates/privacy-protection/1679926/automated-decision-making-under-the-microscope-cppa-finalizes-new-ccpa-rules)
  - [DRAFT] Korea: five-year retention of human-oversight documentation (draft notice). — [Mondaq](https://www.mondaq.com/new-technology/1694552/south-korean-ministry-of-science-and-ict-issues-package-of-regulations-to-supplement-ai-framework-act)
  - [GUIDANCE] UK and EU data-protection regulators: involvement must be meaningful, not token. The reviewer needs authority and competence to change the outcome. — [WP251rev.01](https://ec.europa.eu/newsroom/article29/items/612053) (not re-fetched); [UK SI 2026/82 / DUAA "genuine or meaningful"](https://legislation.gov.uk/uksi/2026/82)

### Inferences
- Regulators and frameworks are moving from "a human must be present" (1st generation) to "the human must be able, informed and authorised" (AI Act, CPPA, EDPB). A 3rd generation is now visible: "show us the oversight works" (Singapore's override and response-time metrics, Canada's training verification, the draft CEN verification clause). A system that records *oversight quality* — rates, times, reviewer qualifications, independence — will satisfy more jurisdictions than one that records only approvals.
- The agent-approval data (93% accepted) and the judicial-override data point to the same lesson. Routine approvals turn into rubber stamps. Discretionary overrides drift toward the overseer's own objectives. Controls should therefore be few, high-stakes and measured.

### Gaps
- No peer-reviewed 2025–2026 field study of override rates under AI Act Art. 14 was found. That obligation does not apply until December 2027.
- No study found that measures approval-gate effectiveness in production agent systems beyond vendor-reported rates.
- The "292 participants, human-in-the-loop increased automation uptake and lowered accuracy" study cited by Capgemini could not be identified or verified. — [Capgemini](https://www.capgemini.com/insights/expert-perspectives/human-in-the-loop/)
- De-Arteaga, Fogliato & Chouldechova (CHI 2020) on Allegheny call screeners overriding erroneous scores, and Albright's Kentucky racial-disparity findings, are relevant but were not retrieved in this session.

## 5. Sector-specific flavors

### Takeaway
Each sector already had a human-control idiom before AI. In medicine it is clinician independent review and FDA labeling. In banking it is effective challenge and model validation, now SR 26-2. Credit has adverse-action reasons, employment has bias audits and human decisions on dismissals, insurance has physician determination of medical necessity, and public administration has impact-tiered human final decisions. AI rules mostly attach to these idioms instead of inventing new ones.

### Cited Findings
- **Medical devices and clinical AI:**
  - [GUIDANCE] FDA's revised CDS guidance (6 Jan 2026, with a further 29 Jan 2026 revision reported) keeps Criterion 4, "independently review the basis", and moves the automation-bias discussion there. Single-recommendation tools can now be non-device CDS. Time-critical recommendations needing a response within about 24 hours remain device CDS. — [Cooley](https://www.cooley.com/news/insight/2026/2026-01-20-automation-bias-and-clinical-practice-fda-makes-incremental-updates-to-clinical-decision-support-software-guidance); [Covington](https://www.cov.com/news-and-insights/insights/2026/01/5-key-takeaways-from-fdas-revised-clinical-decision-support-cds-software-guidance); [FDA guidance PDF](https://www.fda.gov/media/109618/download)
  - [GUIDANCE] FDA PCCP final guidance (Dec 2024) pre-authorises planned AI model changes (see P11). — [FDA PCCP](https://www.fda.gov/regulatory-information/search-fda-guidance-documents/marketing-submission-recommendations-predetermined-change-control-plan-artificial-intelligence) (not re-fetched)
  - [LAW] EU AI Act: AI that is a safety component of a medical device falls under Annex I, so Art. 14 applies from 2 Aug 2028. — [Art. 14 page](https://artificialintelligenceact.eu/article/14/)
- **Banking and model risk:**
  - [GUIDANCE] SR 11-7 defined "effective challenge" as critical analysis by objective, informed parties who can identify model limitations and drive change. — [SR 11-7](https://www.federalreserve.gov/supervisionreg/srletters/sr1107.htm) (not re-fetched)
  - **SR 11-7 was superseded on 17 Apr 2026 by SR 26-2** (Fed, OCC and FDIC jointly), which also supersedes SR 21-8. It is risk-based and expected to matter most for organisations above $30bn in assets. OCC Bulletin 2026-13 is the companion. — [Federal Reserve SR 26-2](https://www.federalreserve.gov/supervisionreg/srletters/sr2602.htm)
  - Secondary sources say the guidance is non-binding ("non-compliance with this guidance will not result in supervisory criticism"), drops the annual validation cadence and leaves AI to separate treatment. Whether "effective challenge" survives was not confirmed. — [Domino](https://domino.ai/blog/what-changes-with-sr-26-2); [Elevate](https://elevateconsult.com/insights/sr-11-7-rescinded-model-risk-guidance-ai-gap)
- **Credit:**
  - [LAW] AI Act Annex III 5(b) (creditworthiness) is high-risk. SCHUFA treats credit scores as automated decisions. The EU Consumer Credit Directive 2023/2225 gives a right to human intervention in automated creditworthiness assessments (Art. 18; verify paragraph). — [CJEU C-634/21](https://curia.europa.eu/juris/liste.jsf?num=C-634/21); [CCD 2023/2225](https://eur-lex.europa.eu/eli/dir/2023/2225/oj) (not re-fetched)
  - [LAW] Korea PIPA 37-2 defers to the Credit Information Act Art. 36-2 for credit evaluation. — [Baker McKenzie](https://resourcehub.bakermckenzie.com/en/resources/global-data-and-cyber-handbook/asia-pacific/south-korea/topics/artificial-intelligence-profiling-and-automated-decision-making)
- **Employment:**
  - [LAW] The EU Platform Work Directive requires a human to decide account suspension or termination, and gives a right to human review (P6). — [Taylor Wessing](https://www.taylorwessing.com/en/insights-and-events/insights/2024/11/radar---eu-platform-work-directive-brings-in-new-protections-for-platform-professionals)
  - [LAW] AI Act Art. 26(7): workers must be informed before workplace deployment. — [Art. 26](https://artificialintelligenceact.eu/article/26/)
  - [LAW] NYC Local Law 144 (2023) requires annual independent bias audits and candidate notice for automated employment decision tools. It does not require human review. — [NYC DCWP AEDT](https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page) (not re-fetched)
  - [LAW] Colorado SB 26-189 (from 2027) covers ADMT notice and human review in employment, health care and housing. — [CBS News Colorado](https://www.cbsnews.com/colorado/news/ai-regulation-colorado-governor-signs-law/)
- **Insurance and health claims:**
  - [LAW] California SB 1120: a physician decides medical necessity. — [leginfo](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB1120) (not re-fetched)
  - [LAW] CPPA ADMT covers insurance and financial "significant decisions", with the human-appeal exception. — [Mondaq](https://www.mondaq.com/unitedstates/privacy-protection/1679926/automated-decision-making-under-the-microscope-cppa-finalizes-new-ccpa-rules)
  - [LAW] Ropes & Gray flags health-care-specific effects of SB 26-189 (page blocked). — [Ropes & Gray](https://www.ropesgray.com/en/insights/alerts/2026/05/colorado-scales-back-ai-law-with-targeted-implications-for-health-care)
- **Public sector:**
  - [LAW / directive] Canada DADM: impact Levels I–IV from an Algorithmic Impact Assessment. Levels III–IV require human intervention points and a human final decision, with peer review, notice, explanation and training scaled by level. The text is dated 2023-04-25. It applies to systems where an officer makes the final decision as well as to full automation. — [DADM text](https://www.biodiritto.org/ocmultibinary/download/4358/51093/6/44eee84d54f733c758c0d55b6c1be196/file/Directive+on+Automated+Decision-Making.pdf); [Guide on scope](https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/responsible-use-ai/guide-scope-directive-automated-decision-making.html)
  - [LAW, agencies only] US M-25-21: seven minimum practices for high-impact AI. — [OMB M-25-21](https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-21-Accelerating-Federal-Use-of-AI-through-Innovation-Governance-and-Public-Trust.pdf)
  - [GUIDANCE] The AML example DBS (Singapore) uses human-over-the-loop. — [Computer Weekly](https://www.computerweekly.com/news/252477129/Singapore-updates-model-AI-governance-framework)

### Inferences
- For the keynote's "same decision, different flavor by country" device, a consumer credit decline is the richest single case. It combines law and inference from the items above:
  - **EU:** AI Act Art. 14 oversight by the deployer from Dec 2027, an Art. 86 explanation, a CCD human-intervention right, and GDPR Art. 22 or SCHUFA.
  - **UK:** DUAA Art. 22C safeguards (representations, human intervention, contest).
  - **US federal banking:** SR 26-2 model risk (non-binding) and adverse-action reasons.
  - **California:** a CPPA opt-out *or* a human appeal with authority to overturn.
  - **Colorado:** SB 26-189 notice and human review from 2027.
  - **Quebec:** observations to staff able to review.
  - **Korea:** PIPA explanation and review (Credit Information Act for scoring) and AI Framework Act Art. 34 assigned human oversight if high-impact.
  - **China:** PIPL refusal and explanation.
  - **Brazil:** LGPD review, not necessarily by a human.
  - **Singapore:** voluntary MGF.

  Ten jurisdictions, at least six distinct human-control flavors for one AI output.
- Medical AI offers the contrast case. The human domain decision is built into the regulatory definition itself (FDA Criterion 4), so the oversight flavor is labelling and transparency to the clinician, not an approval queue.

### Gaps
- MAS (Singapore) FEAT and its AI risk-management guidelines, and Japan's AI Promotion Act and AI Guidelines for Business, were not researched.
- Whether CFPB adverse-action circulars on complex algorithms (2022-03, 2023-03) survived the 2025 guidance withdrawals is unverified.
- No primary text was retrieved for the EU CCD human-intervention paragraph or for SB 26-189.
- India, UAE and Saudi Arabia oversight rules were not covered.

## 6. Mapping the catalogue onto the five-pattern model (human domain decision, system authorization, monitoring, feedback, halt)

### Takeaway
All fifteen catalogue patterns fit one of the five families. The model fits easily because the project's own engine already splits the families into fourteen sub-patterns: action approval, change authorization, exception, outcome reconciliation and override under authorization; decision review, match and adjudication, contest and appeal, and hand-off under domain decision; triage, attestation and oversight quality under monitoring; flag and feedback; and halt and restart. Four kinds of control fit poorly as raised-and-decided events, because the human act happens *outside the run*:
- delegated-authority mandates and budgets, set in advance;
- consent, opt-out or refusal by the affected person;
- sampled QA review;
- institutional or ex-ante justification and red-team review.

Two modifiers cut across every family: the number and independence of people (four-eyes), and the substitution of a machine approver for a human approver.

### Cited Findings
- The project's own table: five families with 14 patterns. The README's descriptions:
  - **System authorization:** Action approval, Change authorization ("often two people, neither of them the author"), Exception ("sets a rule aside for a stated time"), Outcome reconciliation, Override.
  - **Domain decision:** Decision review, Match and adjudication ("whoever loaded them may not decide"), Contest and appeal ("never the first decider or anyone in their reporting line"), Hand-off.
  - **Feedback:** Flag and feedback.
  - **Monitoring:** Triage, Attestation, Oversight quality ("acts when review times or approval rates show the oversight is not working").
  - **Halt:** Halt and restart ("two others approve the restart, after safe-state checks").

  — local file `C:\Users\tyler\human\README.md` (lines 61–78)
- Catalogue → family mapping. The sources for each row are in §2.

| Catalogue pattern | Family in the five-pattern model | Sub-pattern | Fit |
|---|---|---|---|
| P1 Pre-execution approval / step-up | System authorization | Action approval | Direct |
| P1a Classifier approver (auto mode) | System authorization | Action approval with machine approver; humans authorise the policy and handle escalations | **Splits** authorization into "human approves policy" vs "human approves instance" |
| P1b Plan-level approval | System authorization | Action approval, at plan granularity | **Variant** |
| P1c Standing approval ("don't ask again") | System authorization | Exception / standing decision | Fits (README lists "Standing decisions" in the console) |
| P2 Delegated authority limits / mandates / budgets | System authorization (configuration time) | None exactly. The closest is Change authorization of a policy | **Fits none cleanly**: the human act is before the run, and the evidence is a signed mandate (AP2) or a permission policy |
| P3 Dual control / four-eyes / AI Act 14(5) | Cuts across (Change authorization, Match and adjudication, Halt restart) | Independence and count rules | **Modifier**, not a pattern |
| P4 Threshold escalation | Domain decision (Decision review) or Monitoring (Triage), depending on whether the case waits | Routing rule | **Variant**: a trigger in front of a pattern |
| P5 Sampled / QA review | Monitoring (Attestation / Oversight quality) | None exactly | **Fits none cleanly**: post-hoc, statistical, the work does not wait, and the unit is a sample, not an event |
| P6 Human decision with AI recommendation | Domain decision | Decision review | Direct (Canada III–IV, Platform Work, SB 1120) |
| P7 Contest and appeal by affected person | Domain decision | Contest and appeal | Direct. The requirement to be independent of the first decider is in both the project and the CPPA ("authority to overturn") |
| P8 Continuous monitoring with intervention | Monitoring | Triage | Direct |
| P9 Halt / kill switch | Halt | Halt and restart | Direct. The project adds two-person restart, which no law reviewed requires |
| P10 Feedback / correction | Feedback (Flag and feedback). Correction of a specific output is System authorization (Override) | Split | **Splits**: model-improvement feedback vs correcting one decision vs correcting input data (Quebec, Colorado) |
| P11 Release sign-off / change approval | System authorization | Change authorization | Direct (M-25-21 risk-acceptance signature, independent reviewer; FDA PCCP) |
| P12 Consent / confirmation / opt-out by the affected person | None. The affected person is not an overseer | n/a | **Fits none**: MCP elicitation, AP2 human-present cart, CPPA opt-out, PIPA refusal |
| P13 Identity-impacting verification | Domain decision (Match and adjudication) with a 2-person modifier | Match and adjudication | Direct |
| P14 Hand-off / takeover | Domain decision | Hand-off | Direct |
| P15 Red-team / institutional ex-ante review (Green) | None (pre-deployment assurance) | n/a | **Fits none**: the act is institutional and happens once per system |

- Supporting sources for the poorly fitting rows:
  - mandates — [AP2 via Descope](https://www.descope.com/learn/post/ap2); [Google secure agents](https://research.google/pubs/an-introduction-to-googles-approach-for-secure-ai-agents/)
  - sampling — [M-25-21 periodic human review](https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-21-Accelerating-Federal-Use-of-AI-through-Innovation-Governance-and-Public-Trust.pdf)
  - consent and opt-out — [MCP elicitation](https://modelcontextprotocol.io/specification/2025-11-25/client/elicitation); [CPPA](https://www.mondaq.com/unitedstates/privacy-protection/1679926/automated-decision-making-under-the-microscope-cppa-finalizes-new-ccpa-rules)
  - institutional — [Green](https://arxiv.org/abs/2109.05067)
  - machine approver — [Anthropic auto mode](https://www.anthropic.com/engineering/claude-code-auto-mode)
- AI Act Art. 14(4) capabilities → families:
  - (a) understand and monitor → Monitoring;
  - (b) automation-bias awareness → Monitoring / Oversight quality (and training);
  - (c) interpret → Domain decision (the reviewer's epistemic access);
  - (d) not use, disregard, override, reverse → System authorization (Override) and Domain decision;
  - (e) intervene, stop → Halt.

  14(5) is a modifier on Match and adjudication. — [Art. 14](https://artificialintelligenceact.eu/article/14/)

### Inferences
- **Flavors that split a family into distinct variants worth naming on stage:**
  1. **Authorization by instance vs by policy vs by plan.** A person approving one payment, a person approving the rule a classifier applies, and a person approving the agent's plan. Approval rates and attention differ sharply: 93% per-prompt acceptance (primary), with plan rejection reported far higher (unverified).
  2. **Domain decision before effect vs after effect.** Decision review (Canada III–IV, Platform Work) vs contest and appeal (GDPR, UK, Quebec, Korea, CPPA, M-25-21). Some laws let one substitute for the other: the CPPA's human-appeal exception replaces opt-out.
  3. **Feedback that improves the system vs feedback that corrects an individual's record.**
  4. **Monitoring of the system vs monitoring of the overseers** (Oversight quality). Singapore v1.5's override-rate and response-time metrics are the government text for the second.
- **Flavors that fit none of the five as event-driven patterns:** delegated authority and mandates (pre-authorised envelopes); consent, opt-out or refusal by the affected person; sampled QA; institutional ex-ante justification and red-team. Two options: model them as *preconditions or evidence* attached to the five, or add a sixth family, "Affected-person rights" (consent, opt-out, refusal, path to a human, appeal initiation), separate from the overseer's patterns.
- **Cross-cutting modifiers** to show as dials on every pattern, not as patterns:
  - number of people (1, 2, 2 independent);
  - independence (not the author, not in the reporting line);
  - competence, training and authority of the overseer (AI Act Art. 26(2), CPPA, DADM training levels);
  - who the approver is (human, classifier, policy);
  - whether the work waits;
  - the evidence retained (AI Act 6-month logs; Korea draft 5 years; Colorado 3 years, secondary).
- The project's two-person *restart* after a halt and its "never the first decider" rule for appeals go beyond any law reviewed. The closest legal analogues are AI Act 14(5) (two verifiers), M-25-21's independent reviewer, and the CPPA's authority-to-overturn requirement.

### Gaps
- No external taxonomy was found that uses the same five families, so the mapping is this researcher's construction from the project README and the sources above.
- Whether any jurisdiction requires two-person restart after an AI halt. None found.
- Whether "affected-person rights" should be modelled as oversight at all. Green and the AI Act treat oversight as an operator function, while GDPR, CPPA and PIPA treat these rights as data-subject rights. This is a design choice for the project, not a research finding.
