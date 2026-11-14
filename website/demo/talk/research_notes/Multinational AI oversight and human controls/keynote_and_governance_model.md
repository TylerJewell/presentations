# The governance keynote and the governance model behind it

Read-only study, 2026-10-31. It records what the keynote says today and what the product supports
for jurisdictions, policies and human controls. It is the starting point for two additions: one
organization overseeing AI centrally across about ten countries, and the many kinds of human
oversight control.

Scene numbers follow `demo/talk/script.md` (29 scenes). The table in `demo/talk/README.md` is out of
date. It lists 28 slides, 4,118 words and 29:26, and it has no row for scene 3, so from scene 3 on
its numbers are one lower than the script's.

## 1. The keynote

**What it is.** A keynote with click-advanced slides: 35 minutes at an AI governance conference on
2 Nov 2026, for about 75 governance and risk officers. It runs on the film's engine (`demo/mock/lib`,
read-only). The current script is 4,447 words and plans 31:47 (`script.md:6`), which leaves about
3 minutes for questions, not 5.

**The spine.** AI systems change weekly, the rules change monthly, and review happens once a year.
So governance must become controls: "defined once, enforced on every request, decided by people when
it matters, and proved every day" (scene 28). The talk closes on a test for any platform: "Show me the
controls. Show me the verdicts. And show me the person who decided." One EU loan origination assistant
carries the proof.

| Act | Scenes | Planned |
|---|---|---|
| Opening | 1 | 0:42 |
| Two clocks | 2–6 | 8:47 |
| Governance changes shape | 7–11 | 4:39 |
| Principles (seven) | 12–20 | 9:42 |
| How it comes together | 21–27 | 7:09 |
| Close and questions | 28–29 | 0:47 |

### Scenes (visual · point)

1. **Title:** the hero line over two faint, moving clocks · an argument, not a tour.
2. **Two clocks:** a yellow curve compounds while a white stepped line splits · the job lives in the gap between them.
3. **What the rules actually ask for:** a rail of the five kinds, and a card per law with its verbatim text, citation, date and practice · five real controls from five jurisdictions.
4. **The rules moved this year:** calendar lanes (EU, Colorado, US banking, OSFI) whose deadlines move, break and are cut, then a field of state bills · the rules change monthly.
5. **The systems keep compounding:** the METR staircase, OSWorld, incidents · the systems change weekly.
6. **Weekly, monthly, yearly:** 52 marks, 12 marks and one review block · an annual review photographs a system that no longer exists.
7. **Governance changes shape:** section card, three shifts.
8. **From documents to controls:** policy sentences become typed controls, among them "Customer data must not leave its region".
9. **From audits to evidence on every request:** sampled audits, and NYC LL144's 1 issue found against at least 17.
10. **From the model to the system:** controls attach at the system's joints, and they hold when the model is swapped.
11. **A posture, proved:** one library, three systems taking 4, 12 and 24 controls · "Not a policy per project. One library."
12. **Principles:** section card. The marker above each principle reads "Principle n".
13. **The law, as controls:** jurisdiction chips, one paragraph becoming one control, a wall of 1,718 cells, the 406 effective in 2026.
14. **Five kinds of control** (principle 1): bars to scale · Gate 1,399; Sanitizer 123, Evaluation 86, Guardrail 72 and Human 38 govern at run time.
15. **Three sources** (2): regulation, corporate policy and the system's team in one bundle, each row tagged with its source.
16. **Managed like software** (3): bundle v1 → v3 (12 → 34 → 51 controls) as authority grows · signed, any past version provable.
17. **Every control leaves a verdict** (4): a trace waterfall with rows Upheld, Breached and Inconclusive.
18. **Drift is a change in verdicts** (5): a 12-week grid including "Data stays in region" · a verdict changed, which is a fact.
19. **Every agent, honestly** (6): controls in the runtime, then a gateway for other agents, and the gateway's limits.
20. **A person decides** (7): a live measure crosses its owner's limit, the system holds as preset, and a named person decides.
21–23. **Section card; One platform** (Specify, Agent SDK, AI gateway, Verify, Optimize on one rail); **Stitched together** (six tools, gaps marked "Control written again" and "Evidence lost").
24. **The Controls board:** the Adopt→In force loop, readiness, controls bound to file and line, live evidence · "its contract with its regulators".
25. **A change arrives:** a PR adds `String religion`; Code in sync turns red; the Amend path opens; an evaluation and a human control (an underwriter within 4 h) are added; v4 is signed and v3 kept.
26. **The evidence record:** an applicant in Germany; the evaluation is Breached, the human control Held, and the underwriter overrides within 4 h.
27. **A person decides the rollout:** a smaller-model experiment where Region · DE crosses the quality limit, only DE goes back, DE is retrained, and a person promotes.
28–29. **Closing; Questions.**

### Narration most relevant to jurisdictions and human control (verbatim)

- **3, click 6:** "And fifth, human authority. The EU AI Act, Article 14. The people overseeing a high-risk system must be able to interrupt it, and I'm quoting, through a 'stop' button or a similar procedure, so it comes to a halt in a safe state. The law asks for a stop button."
- **3, click 7:** "Five kinds of control, five jurisdictions. Every one of them is concrete enough to build, and to test. The trouble is the calendar around them. It won't sit still." (The five: NYC LL144 gate, HIPAA sanitizer, OSFI E-23 evaluation, Texas TRAIGA guardrail, EU AI Act 14(4)(e) human; `slides/in-their-words.js:27-43`.)
- **4, clicks 2 and 5:** "The best-known deadline in AI law slid 16 months, less than three months before it arrived." / "So you're not only tracking the legislatures. You're tracking the fight between them and Washington."
- **11, click 1:** "It starts with your risk appetite and your obligations, written once as controls, independent of any one system. Not a policy per project. One library."
- **13, click 2:** "Two hundred and forty-one frameworks, across thirty-eight jurisdictions. … The EU, the US federal agencies, sixteen US states, the UK, Canada, Singapore, Brazil, and on."
- **14, clicks 6–7:** "And human controls give a named person authority over a decision, or the power to halt the system. Thirty-eight." / "… And policy isn't a sixth kind. Policy decides which of the five apply, and where."
- **15, click 4:** "And when two sources pull in different directions, you see it, because they sit in the same bundle, not in three different binders."
- **20, click 3:** "Then a named person decides what happens next. The system can detect, contain and recommend. It doesn't get to excuse itself."
- **25, click 7:** "And a human control: any decision that evaluation flags waits for an underwriter, within four hours. That answers the AI Act's human oversight requirement."
- **26, click 3:** "… So the human control held it, and an underwriter overrode the rationale inside the four-hour limit. The machine caught it. A person decided."
- **27, clicks 4–5:** "The experiment holds, and only that region goes back to the original model. Everyone else carries on. The response is as narrow as the problem." / "Because the owner chose it in advance, with their name on it."

**Rules the talk follows** (`README.md`). Black ground, one yellow, Instrument Sans for every word
(monospace only for code and ids), no rule bars, no one-sided borders, and no numbering on screen; the
principle marker is the one exception (Tyler, 2026-10-28). Headlines are 72 px or more, body text
32 px, labels 24 px. No bank or customer is named, and Akka is named once, as the closing mark. Every
figure carries its source on its slide, and illustrative material is listed. The verdict words are
Upheld, Breached and Inconclusive. `demo/mock` is never modified.

## 2. Sibling presentations worth reusing

- **BAE film** (`demo/bae/storyboard.md`). The precedent for many nations.
  - Three nations approve each change in order (scene 3.4). "If any one rejects, the change stops
    there", and after a failure no approval is asked twice.
  - Models can be hosted in each nation's own environment. The canary runs "nation by nation", and
    Japan routes back while the others continue (5.3).
  - Spend rolls up "by capability, owner and nation" (6.3).
  - "National flags are not used; three small labels" name the nations (line 45).
- **RBC deck** (`demo/rbc/`). A deck in its own folder rendered by the talk engine. Its internal
  `BRIEF.md` holds the timing per speaker, watch-outs, "Where every figure comes from", and questions
  the docs do not answer. It has section cards and opens with "what we heard".
- **Mock film** (`demo/mock/storyboard.md`). The storyboard format: acts with time ranges, then for
  each scene a Visual, a Narration and a duration. It sets the production rules: designed captions,
  intelligent zooms, data already moving, no bars, one typeface, no numbering. `S3Board` and
  `ExpView` drive scenes 24–27.
- **Platform film** (`demo/README.md`). Its content rule: "every control type, including guardrails,
  sanitizers and humans, both executed and reviewed".

## 3. The governance model in the product

**The corpus** (`samples/loan-origination/governance/corpus/2026-10/`; counts in `research/corpus.md`).
- **Size.** 241 frameworks, of which 158 are binding regulation or regulator guidance.
- **Reach.** 38 jurisdictions: the EU, US federal, 16 states and 20 other countries. 82 frameworks
  are not bound to a jurisdiction.
- **Controls.** 1,718, of which 1,639 carry the verbatim text.
- **What a control records.** Framework, article, paragraph, verbatim text, actor roles, risk tier,
  `effective_from`, its mechanisms (kind and flavour) and its applicability.
- **Applicability.** Predicates over survey facts. For example, `eu-ai-act.art14.4.e` applies when
  `jurisdictions includes_any [eu]`, the AI Act is declared, the actor is a provider or deployer, the
  risk is high and the stakes are consequential (`regulations/eu-ai-act/controls-ch03-high-risk.yaml`).
- **Frameworks registry.** `registries/frameworks.yaml` gives each framework its jurisdictions and
  sectors. Regulations are suggested when they intersect the system's.

**The risk survey is per system** (`governance/survey.yaml`).
- **Jurisdictions.** The question is "the first fact every regulation tests"
  (`survey-definition.yaml:1387`). Loan Origination answers eight: eu, uk, us-fed, us-ca, us-ny,
  japan, india and australia.
- **Related facts.** `data.residency`, `organization.local_representatives`, `supervisors` and
  `incidents.regulator_routes`, a free-text list in which "each route becomes an incident-routing row".
- **Jurisdictions as a gate.** Controls wait until required facts are answered: "Jurisdictions
  decides 18 of them" (`docs/plans/workflow/control-plan.html:52`).
- **Not read from code.** "A region is not a jurisdiction" (`docs/plans/bom.md:99`).

**Controls and their sources** (`governance/controls.yaml`).
- **Row kinds.** `derived` (corpus via the survey), `inherited` (corporate), `officer`/`authored`
  (custom) and `retired`. Each row has a mechanism, a sign-off and, for human rows, `human_config`.
- **Corporate today.** Only a row kind: three hand-written rows from `akka-corporate-baseline 2026-Q3`,
  with `governance/corporate/` empty (`docs/plans/corpus-lifecycle/plan.md` §0.6).
- **The company baseline is built** (companion `baseline`, `governance-baseline-url`). One package
  holds a corpus pin, survey presets (the test presets `jurisdictions: [eu]`), inherited rows and
  `required_facts`. A system adopts one, explicitly (`docs/plans/workflow.md` §4–7).
- **Corporate releases are designed, not built** (corpus-lifecycle §3).
  - A release approves corpus versions and carries mandates, which can be `waivable: false`, and a
    `required_by` date.
  - Corporate controls enter a draft "where its applicability matches the survey".
  - ADR-010 "rejects layered overlays"; each control has one owning namespace (§3.4).

**Exit conditions are a separate concept**: the build's definition of done, never mixed with
verdicts.
- The master list is compiled into the CLI (`internal/exitconditions/library.go`, 28 conditions).
- The org floor is `.akka/governance/policy.yaml`, fetched from `governance-policy-url`. It is
  managed, a project may only tighten it, and locked levels are never loosened (`resolve.go:89-93`).
- Each project's choices are in `.akka/exit-conditions.yaml`.
- This floor is the only built example of "central policy that local teams can only tighten".

**Bundles.**
- **Format.** OCI layouts, one chain per system id (`io.akka.gcc.system-id`), with Ed25519 JWS
  sign-offs and supersedes links.
- **Rules.** The newest bundle is in force. A bundle is never re-activated; going back means rolling
  forward a copy. Any two can be compared.

**Verdicts and drift.**
- Drift is any change between Upheld and Breached. Inconclusive is not drift.
- Only controls in a bundle have verdicts, and the default scope is the bundle in force.
- A verdict names its control, environment, time and conclusion. **It carries no jurisdiction or
  region.** Verdicts › By regulation rolls verdicts up per regulation (`docs/plans/verdicts.md:115-125`).

**Compliance** (`docs/plans/compliance.md`).
- It checks the bundle in force against verdicts from "every environment": production, pre-production
  and documents (Records). The environment that spoke last decides each control, with freshness set
  per environment.
- **"Every environment" means lifecycle stages, not countries.** Remote environments are CLI logins.
- **It is asked per system.**

**Human controls.**
- **Flavours.** The corpus has one kind with five flavours, across its 38 human controls:

  | Flavour | Controls |
  |---|---|
  | domain-decision | 19 |
  | halt | 10 |
  | monitoring | 5 |
  | system-authorization | 2 |
  | feedback | 2 |

- **What the local console knows.** Those five flavours, five subject kinds, and the modes HITL, HOTL
  and HALT (`features/human/schemas.ts:33`, `policies/HumanConfigForm.tsx:278-302`).
- **What a human control records** (`human_config`): trigger, routing roles, SINGLE or TWO_PERSON
  review, independence, owner, SLA, timeout behaviour and default, escalation chain, allowed actions,
  standing approvals, rationale, minimum review time, an AI recommendation, a strength per
  environment (prevent, warn or record), and shadow.
- **The demonstration set.** Loan Origination's S1–S7 cover system authorization, monitoring, two
  approvals for a model change, a two-person halt, and flagged replies (`samples/loan-origination/README.md`).
- **The fourteen patterns are not in the console.** They live in the separate `akka/human` prototype
  (`C:\Users\tyler\human`, 0.1.0-SNAPSHOT; tour on 9164) and in explainability's
  `human-patterns.yaml`, not in the pinned corpus.
  - Families: system authorization (action approval, change authorization, exception, outcome
    reconciliation, override); domain decision (decision review, match, contest and appeal, hand-off);
    feedback (flag); monitoring (triage, attestation, oversight quality); halt and restart
    (`human/docs/01-patterns.md`).
  - Four patterns have no corpus control.
- **The 38 human controls come from 26 frameworks** (my count from the 2026-10 snapshot).
  - Human review of an automated decision: Brazil, China NFRA (4), Colorado, Montana, Mexico, Peru,
    the UAE CBUAE (2), HKMA (2), UK ICO and GDPR Art. 22.
  - Halts: EU AI Act 14(4)(e) and 5(3), EIOPA, MiFID II, UK MoD and NATO.
  - This variety is the raw material for "human oversight differs by country".
- **The overseer registry** (`human/spec/fixtures/overseers.yaml`) records roles, reporting line,
  attestations (`eu-ai-act-oversight`, with an expiry) and `qualified`. **It records no location or
  jurisdiction.**

## 4. Direct answers

**Can one organization hold a central policy and apply different requirements per country or
deployment region?** Per system, partly. Per deployment region, no.
- **Applicability is a union per system.** The system's `jurisdictions` answer gives one bundle
  holding every country's applicable controls, and each applies wherever the system runs.
- **No scoping inside a system.** No control is scoped to a request's or a deployment's country, and
  verdicts and Compliance have no country dimension.
- **No organization-wide view.** I found no view that rolls compliance up across systems.
- **Central policy today.**
  - A baseline: an organization could publish one per region, but a system pins only one, and nothing
    composes them.
  - Corporate mandates are designed, not built.
  - Overlays are rejected (ADR-010).
- **Where region does exist at run time, it sits outside governance.**
  - Entity replication filters "for regulatory reasons" (`akka-context/sdk/event-sourced-entities.html.md:338`).
  - Gateway header routes ("DE route", scene 26).
  - Optimize experiment segments on `x-region`, which can keep a breaching segment on the baseline
    (`docs/plans/routing-experiments/contract.md`; scene 27).
  - Control strength varies by environment, not region.
- **The workaround** is one system per country deployment, which gives up the single view.

**Where does human sit among the five, and which patterns does the console know?**
- **In the keynote.** Human is the fifth and smallest kind, about 2% of controls.
  - It is introduced as "human authority", through the stop button (scene 3, halt), and defined as
    "authority over a decision, or the power to halt" (scene 14).
  - Act 4 shows one human control, a decision review answering AI Act 14 (scenes 25–26).
  - Principle 7 (scene 20) and scene 27 show a person deciding after an Optimize limit breaks. That
    is change authorization drawn as an experiment, not as a human control.
- **In the console.** It knows the five flavours and the Human page (Waiting, Answered, Standing,
  Halts, Officers), not the fourteen patterns.

## 5. Where the keynote already sets up a multi-jurisdiction story

- **Scene 2.** "More jurisdictions … they don't line up."
- **Scene 3.** Five kinds from five jurisdictions. Its card (where, citation, when, verbatim,
  practice) works as a country card.
- **Scene 4.** Lanes per jurisdiction, and states against Washington. Per-country lanes extend it.
- **Scenes 8 and 18.** Residency controls are already on screen.
- **Scene 11.** "One library … each system takes on the controls that match what it is allowed to
  do." Add "and where it operates", and this becomes the central oversight frame.
- **Scene 13.** 38 jurisdictions as chips.
- **Scene 14.** "Policy decides which of the five apply, and where." This is the exact hook:
  applicability by jurisdiction.
- **Scene 15.** Sources in conflict, seen in one bundle. Two countries in conflict is the same picture.
- **Scenes 16 and 25.** A country's law changing re-opens the contract and rolls forward a new version.
- **Scenes 26–27.** A German applicant, a DE route, DE held while "everyone else carries on". This is
  a per-country response that exists today.
- **Precedent.** The BAE three-nation approval is a ready visual grammar for country overseers.

## 6. What the keynote would have to add or change

**Missing from the story.**
- **The organization.** Every scene follows one EU system. Nothing shows an organization, its
  systems, a central team, or ten countries.
- **Human patterns.** Only halt and decision review appear. Action approval, change authorization,
  exception, contest and appeal, override, hand-off, attestation, oversight quality and the rest
  appear nowhere.
- **Principle 7 with a human control.** It is illustrated with an Optimize limit, so a pattern
  taxonomy needs its own scene or a re-cast of scene 20.

**Claims to label "illustrative" or "designed"**, or to build first.
- Per-country scoping inside a bundle, and country on verdicts.
- Organization-wide compliance.
- Corporate mandates.
- An overseer's jurisdiction.
- Regulator clocks per country.
- The fourteen patterns, which exist only in the prototype.
- Overlays must not be claimed.

**Corpus accuracy.**
- The 2026-10 corpus still holds `sr11-7` and no SR 26-2, which contradicts scene 4.
- 141 EU AI Act controls keep `effective_from: 2026-08-02`, 114 of them in Chapter III. One is
  Art. 14(4)(e), which scene 3 dates from 2 Dec 2027. The Omnibus is a separate framework,
  `eu-ai-omnibus`, with 9 controls.
- So scene 13's "406 … take effect this year" counts obligations that scene 4 says moved. Recount
  before reusing it.

**Housekeeping.**
- **Time.** The script already runs 2:21 over plan, so new scenes need cuts elsewhere.
- **README.** Regenerate the table.
- **Wording.** "A posture, proved" and "proved every day" sit uneasily with the 2026-10-30 rule
  against "prove" (`~/.claude/skills/akka-presentation/SKILL.md` §5). Ask Tyler.

## 7. Rules the evolved storyboard must keep

**Method.**
1. Storyboard first: one spine, one idea per scene, and a visual, narration and duration for each
   (140 words a minute).
2. Build on `demo/talk/lib` over `demo/mock/lib`. Scenes are pure functions of `t`, with beats
   `{ t, say }`. Never modify `demo/mock`. Words live in `slides/<id>.js`; `script.md` is regenerated.
3. Render and look at every beat. Keep a presenter brief.

**Visual.**

4. Black ground, one yellow `#FFCE4A`, the dot grid. Status colours only for status.
5. Instrument Sans for every word. Monospace only for code and ids.
6. No rule bars beside words, no one-sided borders, no numbering; the principle marker is the one
   exception.
7. Headlines 72 px or more, body 32 px, labels 24 px. Few, large elements; the current subject glows.
8. No national flags. Countries appear as small labels.

**Language.**

9. Every title and line is a complete sentence. Plain engineering statements, never selling, no
   negative framing. Never write "event store" or "design target".
10. No bank or customer is named, and Akka is named once. Countries may be named.
11. Every figure is sourced on its slide, illustrative material is listed, and the "Do not claim"
    list in `research/trends.md` is honoured.
12. The verdict words are Upheld, Breached and Inconclusive. Drift has no degrees. Bundles roll
    forward and are never re-activated.
13. A human decision is a named person's decision, kept in the same record. The system "can detect,
    contain and recommend. It doesn't get to excuse itself."
