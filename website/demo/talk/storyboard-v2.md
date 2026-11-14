# Governing AI at the speed it changes, across countries: storyboard v2

**What this is:** the next version of the governance keynote (`demo/talk`, 29 scenes, planned 31:47). It adds
the two things the current talk leaves out: one organization overseeing AI centrally across about ten
countries, and the many kinds of human-oversight control. Nothing here is built yet. It is for review
before any slide changes. The facts come from the research report
[`reports/Multinational AI oversight and human controls.md`](reports/Multinational%20AI%20oversight%20and%20human%20controls.md)
and its notes in `research_notes/`.

**Two deliveries.** The talk on Monday 2 November is two days away and already full, so it takes only the
swaps at the end of this document. The full storyboard is for the next delivery.

**The spine.** The current talk argues that governance must become controls: defined once, enforced on
every request, and decided by people when it matters. Version 2 keeps that argument and adds one sentence
that the whole talk serves:

> **The library is central, and the person who decides is local.**

A multinational defines its controls, its oversight patterns, its inventory and its escalation thresholds
once, in the centre. The reviewer, the deployment gate and the raw evidence stay in each country. Ten
countries already agree on what that reviewer must be able to do; they disagree on everything around them.

**The through-line visual.** A ring of ten small country labels, with no flags, around the library. It
first appears when one decision fans out to ten countries (scene 2.1). It becomes the spokes of the
operating model (2.3), surrounds the library (3.4), and at the end only one label, Germany, lights while the
other nine carry on (5.5).

**The system.** The talk still follows one system, the Loan Origination Assistant, now shown as one
system of a lender that operates in ten countries. The system is real and runs in the demo. The lender and
its ten markets are illustrative.

**Status of each scene.** Every scene names what it rests on, so nothing on stage claims more than exists:

| Status | Meaning |
|---|---|
| Research | A sourced fact about the world. The source goes on the slide. |
| Built | The Akka console does this today. |
| Sample | The Loan Origination service does this today, and the console shows it. |
| Prototype | Only the separate akka/human library does this. On a slide it is labelled illustrative. |
| Requirement | What central oversight needs. Stated as a need, never shown as a product screen. |

**Unchanged from v1:** the visual language (black ground, one yellow, Instrument Sans, the dot grid, hairline
cards, status colours only for status, no rule bars, no one-sided borders, no numbering except the principle
marker), the sizes (headlines 72 px or more, body 32 px, labels 24 px), the language rules (complete
sentences, plain engineering statements, nothing that sells, nothing framed negatively), Akka named once on
the closing mark, no bank or customer named, and the verdict words Upheld, Breached and Inconclusive.

---

## Revision, 31 October: the setup as four problems

Tyler's direction after the first build: the setup (slides 2–16, 13:51) carried too much of the multi-country
story, and countries are one dimension of the governance problem, not the whole of it. The setup is now about
half as long and frames the problem through four lenses, so more of the talk's time goes to the principles.
**This section replaces Acts 1, 2 and 3 below**; Acts 4–6 stand, with the changes noted at the end.

**The spine of the setup:** four problems stand between the rules and your AI systems. Tyler speaks the
transition into the principles himself.

**S1 · Four problems** (0:30) · `four-problems`
- **Visual:** four cards rise one after another, each a sentence: *The rules change every month. Every country
  adds its own rules. Every control lands on an engineering backlog. The first test of a control is the audit.*
- **Headline:** Four problems stand between the rules and your AI systems.

**S2 · The rules change every month** (1:20) · `rules`, compressed · Research
- The calendar lanes, cut to the EU slip (16 months), Colorado repealed and replaced, and US bank guidance
  replaced (SR 26-2, which leaves agents out) with the supervisors who brought agents in. The bill-count field
  is cut. The last beat carries the old cadence slide in one line: *Your systems change every week, the rules
  every month, and the review comes once a year.*

**S3 · Every country adds its own rules** (1:15) · `ten-countries`, compressed · Research
- One declined credit application and the ring of ten requirements, in three clicks: the decision, the ten
  requirements (two groups), and the line *One decision, ten countries, ten different requirements.* The
  convergence beat, the hub and the record that travels are cut.

**S4 · Every control lands on an engineering backlog** (1:15) · `backlog`, new · Sample, illustrative
- **Visual:** one rule card ("A person reviews a flagged credit decision before it takes effect, within four
  hours.") splits into work in each agent it touches: a pause in the workflow, a queue, a screen for the
  reviewer, a record of the decision. The same work repeats in every agent; the backlog grows as rules change.
- **Fact:** to apply six human controls, the Loan Origination sample needed thirteen components of its own
  (README, "Human oversight").
- **Narration (draft):** "Most controls aren't settings. A human-review rule means a developer adds a pause, a
  queue, a screen for the reviewer and a record of what they decided, in every agent the rule touches. Our own
  sample loan service needed thirteen components to apply six human controls. Then the rule changes, and the
  work starts again."

**S5 · The first test of a control is the audit** (1:20) · `untested`, new · Research
- **Visual:** a control's life on a line: written, deployed, months of requests, then an audit that samples a
  few. The audit finds one issue where there were at least seventeen (NYC Local Law 144, from v1's audits
  slide). Then one card: €824.99 million for decisions about people that no person assessed (a ride-hailing
  platform; Dutch data protection authority, 21 August 2026, under appeal).
- **Narration (draft):** "And none of it can be tested until it's needed. A control is written, deployed, and
  first checked when an auditor samples a few requests, months later. This year a regulator fined a ride-hailing
  platform eight hundred and twenty-five million euros for decisions that no person assessed: oversight that
  existed only on paper."

**S6 · (cut)** Tyler speaks the transition into the principles himself; the setup ends on S5.

**Elsewhere:** the title loses the ten-country subtitle and ring (new subtitle: *Four problems stand in the way,
and eight principles answer them.*); the closing loses its ring; the experiment keeps "Germany goes back"; the
principles keep their content. Cut from the deck: clocks, in-their-words, capability, cadence, org-card,
fined, hub, record-travels, shape-card, documents, audits, system, one-library.

**Time:** setup about 5:40 (was 13:51); talk about 22:30, leaving the rest of the 35 minutes for the principles and
questions.

---

## Time

| Act | v1 | v2 | Where the time comes from |
|---|---|---|---|
| Opening | 0:42 | 0:40 | |
| Two clocks and ten countries | 8:47 | 6:00 | Scenes 2, 3, 5 and 6 tightened |
| One organization, ten countries (new) | — | 4:30 | |
| Governance changes shape | 4:39 | 3:20 | Section card merged; scenes 9 and 10 tightened |
| Principles | 9:42 | 9:30 | Principle 7 recast; one new principle |
| How it comes together | 7:09 | 5:35 | "Stitched together" folded into "One platform" |
| Close | 0:47 | 0:50 | |
| **Talk** | **31:47** | **30:25** | |

The slot is 35 minutes, so v2 leaves about 4:35 for questions. Narration is planned at 140 words a minute,
as in v1.

---

## Act 0 · Opening (0:00–0:40)

**0.1 Title** (40 s) · Built
- **Visual:** as v1: the hero line over two faint, moving clocks. A third element joins at the end: the
  ring of ten country labels draws on faintly around them.
- **Title:** Governing AI at the speed it changes.
- **Subtitle:** One organization, ten countries, and a person who decides in each of them.
- **Narration (draft):** "This is an argument, not a tour. AI systems change every week, the rules change
  every month, and most organizations review them once a year. And most of you don't run one system in
  one country. You run many systems in many countries, and each country asks for something different. So
  let's talk about how one organization keeps one set of controls and still answers to ten regulators."

## Act 1 · Two clocks and ten countries (0:40–6:40)

**1.1 Two clocks** (1:00) · Research
- **Visual:** as v1 scene 2. The yellow curve compounds; the white stepped line of the rules splits into
  strands, now labelled with countries rather than left anonymous.
- **Narration:** v1 scene 2, tightened. Its line "more jurisdictions, and they don't line up" stays: it
  sets up Act 2.

**1.2 What the rules actually ask for** (1:50) · Research
- **Visual:** as v1 scene 3: the five kinds and one card per law (where, citation, when, verbatim text,
  practice). The human card stays EU AI Act Art. 14(4)(e), dated 2 December 2027.
- **Narration:** v1 scene 3, tightened.

**1.3 The rules moved this year** (1:50) · Research
- **Visual:** the calendar lanes of v1 scene 4, updated. The EU's high-risk date moves to 2 December 2027.
  Colorado's act is repealed and its replacement starts on 1 January 2027. A new lane, **Agents**, shows
  three supervisors bringing AI agents into scope in 2026, Australia in April and Singapore and Hong Kong in
  October, while the US bank guidance issued in April (SR 26-2) leaves them out.
- **Narration (draft):** "The best-known deadline in AI law slid sixteen months. Colorado repealed its own
  act and passed a new one. And this year three bank supervisors, in Australia, Singapore and Hong Kong,
  wrote AI agents into their expectations, while the US bank guidance issued the same spring left agents
  out. The calendar doesn't only move. It moves differently in every country."
- **Source:** APRA letter 30 Apr 2026; MAS Guidelines 7 Oct 2026; HKMA 15 Oct 2026; SR 26-2 17 Apr 2026;
  Regulation (EU) 2026/1744; Colorado SB 26-189 (report §1 and the corrections table).

**1.4 The systems keep compounding** (0:40) · Research
- As v1 scene 5, cut to its strongest figure.

**1.5 Weekly, monthly, yearly** (0:40) · Research
- As v1 scene 6.

## Act 2 · One organization, ten countries (6:40–11:10)

**2.0 Section card** (10 s)
- **Title:** One organization answers to ten countries.

**2.1 One decision, ten countries** (1:40) · Research
- **Visual:** one card in the centre: a declined credit application, with the AI's recommendation beside
  it. The ring of ten labels draws on around it. Each label lights in turn with its requirement in five
  words or fewer, and a status chip where the rule is not yet in force:

  | Country | Requirement on the slide | Chip |
  |---|---|---|
  | Germany | Contest, and an explanation | |
  | France | Works council before rollout | |
  | United Kingdom | Intervention and contest | |
  | United States | Appeal with authority to change | From 2027 |
  | Canada | Observations to a reviewer | Quebec |
  | Brazil | Review, possibly by machine | |
  | South Korea | Refusal, and an assigned overseer | |
  | China | Refusal; the data stays | |
  | Singapore | Group framework, local expectations | From Oct 2027 |
  | Vietnam | Oversight, and 72-hour incidents | |

  On the last beat the ten requirements dim, and one sentence forms in the centre: *a person who
  understands the output and can change the decision.*
- **Narration (draft):** "Here is one decision: an AI-assisted credit decline. Watch what ten countries ask
  for. Germany: the right to contest, and an explanation. France: the works council is consulted before the
  tool is rolled out, and courts have suspended pilots that skipped it. The UK: intervention and contest.
  The United States, from next year: an appeal to someone with the authority to change the outcome. Brazil:
  a review, which the law allows a machine to perform. Korea and China: the right to refuse, and in China
  the data stays in China. Ten different lists. And yet, read them closely, and they describe the same
  person: someone who understands the output and can change the decision. Countries agree on the
  reviewer. They disagree on everything around the reviewer: whether it must be a person, who may refuse,
  where the evidence may be read, and how long it is kept."
- **Source:** report §1, the ten-market table. Every cell cites its primary source or is marked search
  summary there.

**2.2 Oversight on paper is what gets fined** (0:45) · Research
- **Visual:** three cards, one at a time. A fine of €824.99 million for drivers deactivated with no human
  assessment (Dutch data protection authority, 21 August 2026, under appeal). French courts suspending AI
  rollouts, pilots included, until the works council was consulted. And a count: zero verified fines under
  the AI Act so far.
- **Narration (draft):** "The enforcement so far hasn't come from the AI Act. It has come through the
  person. The largest penalty this year was for decisions about people that no person assessed. The
  injunctions came from labour courts, about who was consulted. Oversight that exists only on paper is
  what gets fined."
- **Decision for Tyler:** whether to name the company. The deck names no bank or customer; this company is
  neither. The alternative is "a ride-hailing platform".

**2.3 Centralize the library, localize the person** (1:10) · Research
- **Visual:** the ring becomes spokes around a hub. The hub card holds four things: the control library,
  the oversight patterns, the inventory of systems and agents, and the thresholds that send a case
  upward. Each spoke holds three: the reviewer, the deployment gate and the raw evidence. Cases move as
  dots along the spokes: most are decided in the country, and the few above a threshold travel to the hub.
  One quotation settles on the hub: Singapore's supervisor lets a local bank "leverage their group's AI
  risk management frameworks" if it meets the local expectations.
- **Narration (draft):** "The organizations that publish how they do this all arrive at the same shape. The
  centre owns the library, the patterns, the inventory and the thresholds. Each country owns the person who
  decides, the gate before deployment, and the raw evidence. What travels to the centre is decided by
  materiality, not by applying the strictest rule everywhere. And regulators have started to write this
  down: as of this October, Singapore's supervisor lets a local bank lean on its group's framework, as
  long as it meets the local expectations."
- **Source:** report §2 (MAS Guidelines 7 Oct 2026; EU AI Act Art. 17(4) and 26(5)–(6) for financial
  institutions; MAS thematic review on tiering). Firms in the report are described by structure only.

**2.4 The record stays; the verdict travels** (0:45) · Requirement
- **Visual:** one decision in the Germany spoke. Its record splits in two. The case itself (the prompt, the
  output, the applicant's data) stays inside the country. A verdict card travels to the hub: the control,
  the conclusion, the reviewer's role, the time and a pointer back to the evidence. A retention label on the
  record steps through 6 months, 3 years, 5 years and 10 years and settles on the longest that applies. A
  small note on the China spoke: reading the data from abroad counts as exporting it.
- **Narration (draft):** "That shape puts one more demand on the platform. The case stays in the country
  where it was decided. What reaches the centre is the verdict: which control, what happened, which role
  decided, and when, with a pointer back to the evidence. Each record keeps its own retention, set to the
  longest period that applies to it."
- **On the slide:** a source note saying this is the requirement the research draws, not a product screen.
- **Do not show as product:** today's verdicts do not carry a country (report §4).

## Act 3 · Governance changes shape (11:10–14:30)

**3.1 From documents to controls** (0:45) · Built. As v1 scene 8 (the section card merges into it).
**3.2 From audits to evidence on every request** (0:55) · Built. As v1 scene 9, tightened.
**3.3 From the model to the system** (0:50) · Built. As v1 scene 10, tightened.

**3.4 One library covers every country you operate in** (0:50) · Built
- **Visual:** v1 scene 11's library and three systems taking 4, 12 and 24 controls, now with the ring of
  ten labels around the library. When a system lights, the labels of the countries it serves light with
  it, and the controls those countries require join its bundle.
- **Narration (draft):** "It starts with your obligations, written once as controls, independent of any one
  system. Each system takes on the controls that match what it does and where it operates. Not a policy
  per country. One library."
- **Built:** applicability by jurisdiction from each system's risk survey, across 241 frameworks and 38
  jurisdictions in the pinned corpus.
- **Decision for Tyler:** v1's title "A posture, proved" conflicts with the rule against "prove". Proposed
  title: "One library covers every country you operate in."

## Act 4 · Principles (14:30–24:00)

**4.0 The law, as controls** (1:00) · Built
- As v1 scene 13, with the jurisdiction chips. Its count of controls "effective this year" is recounted
  first (see the corrections below) or dropped.

**Principle 1 · Five kinds of control** (1:20) · Built
- As v1 scene 14, with the human kind widened to the five flavors in one sentence.
- **Narration change:** "And human controls name the person who authorizes, decides, triages, answers
  feedback or stops the system. Thirty-eight of them." (Recount against the corpus in force before the
  talk; see corrections.)

**Principle 2 · Human control comes in five flavors** (1:30) · Built (flavors), Sample (the system's
controls), Prototype (the full list of fourteen patterns, as vocabulary)
- **Visual:** five columns, named by who decides:
  - **Authorization**: a person allows what the system may do.
  - **Decision**: a person makes or reviews a decision about someone.
  - **Monitoring**: a person answers a signal while the work goes on.
  - **Feedback**: anyone flags an output, and a person decides what to do with it.
  - **Halt**: a person stops a capability, and restarting takes a second decision.

  Under each column, its patterns appear as small cards (action approval, change authorization,
  exception, override; decision review, contest and appeal, match, hand-off; triage, attestation,
  oversight quality; flag and feedback; halt and restart). One legal anchor sits under four of the
  columns: Art. 14(4)(d) override, GDPR Art. 22(3) contest, Art. 14(4)(a) monitoring and Art. 14(4)(e)
  halt. Then the Loan Origination system's own controls light on the cards they implement: deadline
  extensions (action approval), held notices (decision review), contests (appeal), referral drift and
  guardrail bursts (triage), rushed reviews (oversight quality), the assessment halt (halt and restart)
  and flagged replies (feedback). Model changes (change authorization) stay unlit: the trace ledger
  simulates that control.
- **Last click, the agent shift:** an arrow lifts the person from the single action to the bounds around
  it: a standing approval for 30 days, a plan, a mandate, a tier of authority. Over it, one sentence: the
  person moves from approving each action to approving the policy.
- **Narration (draft):** "Human control isn't one thing. It comes in five flavors, by who decides. A person
  authorizes what the system may do. A person makes or reviews a decision about someone. A person answers
  a signal while the work carries on. Anyone flags an output, and a person decides what to do with it. And
  a person stops the system, and restarting it takes a second decision. Under those five sit the patterns
  the laws actually describe: approval, review, appeal, triage, halt. Our one loan system already runs
  seven of them. And agents are moving the person up a level. When an agent takes a thousand actions a
  day, the person stops approving each action and starts approving the bounds: a standing approval, a
  plan, a mandate. The law hasn't caught up with that: approving an agent's action, the pattern agent
  products use most, has no binding rule for private companies yet."
- **Source:** report §3 (pattern table: contest and appeal binding in at least seven regimes; action
  approval with no binding anchor for private deployments; China's three tiers of agent authority;
  Singapore's agentic framework); the Loan Origination README, "Human oversight" (S1–S7, held notices,
  contests). The fourteen-pattern vocabulary is from akka/human and is listed on the slide as
  illustrative.

**Principle 3 · Three sources** (0:50) · Built
- As v1 scene 15. One click is added: two country rows that pull in different directions sit in the same
  bundle, each tagged with its source.

**Principle 4 · Managed like software** (0:50) · Built. As v1 scene 16, tightened.
**Principle 5 · Every control leaves a verdict** (0:55) · Built. As v1 scene 17.
**Principle 6 · Drift is a change in verdicts** (0:45) · Built. As v1 scene 18.

**Principle 7 · Every agent, honestly** (1:05) · Built (the directory), Research (the registers)
- **Visual:** v1 scene 19, then the console's Agents directory: Akka agents and the other agents seen at the
  gateway, with their type, autonomous ones included, and their tools. Beside it, four supervisors now ask
  for a register of agents: Australia's inventory of AI tools, Singapore's inventory, Dubai's register of
  use cases, and Hong Kong's proposed register of material agents.
- **Narration change:** adds "Supervisors in four markets now ask for that list by name."
- **Do not show as product:** an owner or a jurisdiction on each agent. The directory has neither field
  today.

**Principle 8 · Oversight is measured, not assumed** (1:15) · Sample, Research
- **Visual:** this replaces v1 principle 7 and keeps its grammar: a live measure crosses a limit its owner
  set in advance, the system holds as set, and a named person decides. The measure is the reviewers. A
  week of underwriting reviews draws on as bars of review time. An 8-second line crosses them, and more
  than one in ten falls under it. The control raises the case to the risk officer, who sets a minimum
  review time. From then on, a decision made sooner is refused.
- Before it, three figures in turn: people accept 93% of an AI agent's permission prompts; across 106
  experiments, people working with AI did worse than the better of the two alone; and Singapore now asks
  firms to track override rates and response times.
- **Narration (draft):** "Putting a person in the loop isn't oversight. People accept ninety-three percent
  of the permission prompts an agent shows them. Across a hundred and six experiments, people working with
  AI did worse than the better of the two alone. So the newest guidance measures the reviewers. Our loan
  system does: when more than one review in ten takes under eight seconds, faster than anyone can read the
  case, the risk officer gets it. The officer sets a minimum review time, and from then on a decision
  made sooner is refused. The system can measure its own oversight. It doesn't get to assume it."
- **Source:** Anthropic Engineering (93%); Vaccaro, Almaatouq and Malone (g = −0.23); Singapore Model AI
  Governance Framework for Agentic AI v1.5 (20 May 2026); Loan Origination S3 (`custom-5a1e00000003`).

## Act 5 · How it comes together (24:00–29:35)

**5.0 Section card** (15 s)

**5.1 One platform, the whole lifecycle** (0:45) · Built
- v1 scene 22. Its last click carries v1 scene 23's point in one sentence: the controls are written once,
  not again in every tool.

**5.2 The Controls board** (1:00) · Built. As v1 scene 24.

**5.3 A change arrives** (1:20) · Built
- As v1 scene 25. The human control the Amend path adds is named by its pattern: "a decision the
  evaluation flags is held for review before it takes effect: an underwriter, within four hours."

**5.4 The evidence record** (1:10) · Built, Prototype (the competence check)
- **Visual:** v1 scene 26: an applicant in Germany; the evaluation Breached; the review control Held. One
  new beat: the first reviewer can see the case but cannot decide it, because their EU AI Act oversight
  training has lapsed. A qualified underwriter amends the decision within four hours. The record names the
  person, the role, the review time and the rationale, and is marked as a rehearsal.
- **Narration change:** "…so the review control held it. The first underwriter could see the case but
  couldn't decide it: their oversight training had lapsed. A qualified underwriter amended the decision
  inside the four-hour limit. The machine caught it. A person decided, and the record shows why that person
  was allowed to."
- **Fix from v1:** "overrode the rationale" becomes "amended the decision". Under the pattern taxonomy, a
  held decision is reviewed and amended, not overridden.
- **Label:** the competence check is shown from the akka/human prototype and listed as illustrative.

**5.5 Only Germany goes back** (1:05) · Built
- **Visual:** v1 scene 27 with the ring of ten labels. The experiment's Germany segment crosses its
  quality limit; the Germany label lights alone and its traffic returns to the original model, while the
  other nine carry on. Germany is retrained, and a named person promotes the change.
- **Narration:** v1 scene 27, with one closing line: "The response is as narrow as the problem: one
  country, not ten."

## Act 6 · Close (29:35–30:25)

**6.1 Closing** (40 s)
- **Narration (draft):** "So here is the test for any platform, in any country you operate in. Show me the
  controls. Show me the verdicts. And show me the person who decided, and why that person was allowed to
  decide."
- **Visual:** the ring of ten labels around the library; the closing mark.

**6.2 Questions** (10 s)

---

## Facts the new scenes use

| Figure | Scene | Source | Confidence |
|---|---|---|---|
| Ten-market requirements for one credit decline | 2.1 | Report §1 table | Primary for most cells; Quebec and France marked there |
| €824.99m fine, 21 Aug 2026, under appeal | 2.2 | Pearl Cohen; open the regulator's own release before the slide | Secondary |
| French courts suspended rollouts, pilots included | 2.2 | CMS (Nanterre, Créteil) | Secondary |
| No verified AI Act fine | 2.2 | Vorplabs tracker, Oct 2026 | Search summary; restate as "none reported" |
| MAS: a local bank may "leverage their group's AI risk management frameworks" | 2.3 | Allen & Gledhill on the MAS Guidelines of 7 Oct 2026; quote MAS itself | Secondary; check the MAS text |
| Retention from 6 months to 10 years | 2.4 | AI Act Art. 26(6) and Art. 22; CAC labelling Measures; Colorado; Korea draft | Mixed; listed in report §2 |
| China counts remote viewing from abroad as an export | 2.4 | Hogan Lovells | Secondary |
| Agents brought into scope: APRA 30 Apr, MAS 7 Oct, HKMA 15 Oct 2026; SR 26-2 excludes agentic AI | 1.3 | Primary sources in report §5 | Primary |
| Contest and appeal binding in at least seven regimes; action approval has no binding anchor for private deployments | P2 | Report §3 table | Primary for most rows |
| 93% of permission prompts accepted | P8 | Anthropic Engineering | Primary (vendor) |
| Human-AI teams worse than the better alone, g = −0.23, 106 experiments | P8 | Vaccaro, Almaatouq and Malone | Primary (peer-reviewed) |
| Singapore asks for override rates and response times | P8 | Singapore agentic framework v1.5, 20 May 2026 | Secondary; open the IMDA text |
| The loan system runs seven patterns (S1–S4, S6, S7, held notices, contests; S5 is simulated) | P2 | Loan Origination README "Human oversight" and "Feature 002" | Sample |
| Rushed reviews: more than 10% under 8 s over 7 days; minimum review time refuses earlier decisions | P8 | Loan Origination S3 and `MinimumReviewTimeEntity` | Sample |

## Do not claim

From the report, for every slide and every answer in questions:
- Per-country scoping inside a bundle, or a country on a verdict, an event or a reviewer.
- Compliance rolled up by country or across systems.
- Corporate mandates, overlays, or "strictest wins".
- Evidence kept in its region, or retention per record, as product.
- An organization-wide halt (a halt works within one service).
- The fourteen patterns as a console feature, or rehearsal decisions as runtime evidence.
- That any law requires a two-person restart, or that a harmonised standard on human oversight exists.
- That Brazil's data protection law requires a person to do the review, that Canada has an AI bill before
  Parliament, that Australia has mandatory AI guardrails, or that the Council of Europe convention is in
  force.

## Corrections before either delivery

- The 2026-10 corpus still holds SR 11-7 and no SR 26-2, which contradicts scene 4.
- 141 EU AI Act controls still carry `effective_from: 2026-08-02`, Art. 14(4)(e) among them, while scene 3
  dates that article to 2 December 2027. Scene 13's "406 effective in 2026" counts them; recount or drop it.
- "Thirty-eight" human controls matches the pinned Verify; recount against the corpus the talk shows.
- The slide table in `README.md` has 28 rows and no scene 3; regenerate it.
- "A posture, proved" and "proved every day" conflict with the rule against "prove".

## Monday, 2 November: swaps only

The script is planned at 31:47 for a 35-minute slot, so Monday takes only changes that replace material.
In order of value:

1. **Scene 26, the evidence record** (no time). "An underwriter overrode the rationale inside the four-hour
   limit" becomes "an underwriter amended the decision inside the four-hour limit".
2. **Scene 14, five kinds** (no time). The human sentence widens: "And human controls name the person who
   authorizes, decides, triages, answers feedback or stops the system."
3. **Scene 4, the rules moved** (about 10 s). Add the agents lane: Australia, Singapore and Hong Kong
   brought agents into scope this year, while US bank guidance left them out.
4. **Scene 13** (no time). Recount "406" against the corrected corpus, or drop the figure.
5. **Optional: one decision, ten countries** (1:40). It replaces scene 23, "Stitched together" (0:51), and
   takes the rest from scene 4. It gives Monday's audience the multinational argument without the rest of
   Act 2.

## Decisions for Tyler

1. **Which delivery:** Monday swaps only, the full v2 for the next delivery, or both.
2. **"Prove":** keep or retitle "A posture, proved" and "proved every day" (chosen: "One library covers every
   country you operate in").
3. **Naming the company fined in scene 2.2,** or "a ride-hailing platform".
4. **The ten countries.** The table above gives the sharpest contrast. The Loan Origination survey answers
   eight different jurisdictions today (EU, UK, US federal, California, New York, Japan, India, Australia).
   Answering the ten in its survey would make scene 3.4 product-true for all ten. Check first that the
   pinned corpus covers each one, Vietnam especially.
5. **Prototype material on stage:** whether the competence check in scene 5.4 and the fourteen-pattern
   vocabulary may appear, labelled illustrative, or whether v2 shows only what the console and the sample
   do.
6. **Organization-wide views as direction:** v2 states the requirement in scene 2.4 and never shows it as
   a screen. If you want the talk to say what comes next, it belongs in questions, not on a slide.

## Production notes

- Build on `demo/talk/lib` over `demo/mock/lib`, as v1. New components: the ring of ten labels (one
  function of `t`, reused by 0.1, 2.1, 2.3, 3.4 and 5.5), the hub and spokes with cases travelling as dots
  (`Mock.rail` with moving work), the record that splits in 2.4, and the five-column flavor board in
  principle 2.
- Country labels are text chips in Instrument Sans 24 px, never flags; the one being spoken about glows.
- Scene 2.1 has ten beats. Each label holds about eight seconds; the final convergence holds the longest.
- Render every beat and its midpoint, and look at each frame before handing over.
