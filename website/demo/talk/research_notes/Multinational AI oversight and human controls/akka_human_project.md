# akka/human: briefing for the governance keynote

Read-only study of `C:\Users\tyler\human` (origin `github.com/TylerJewell/human`), 2026-10-31. Nothing was built
or run; "built" claims come from the repository's docs, code and tests.

## 1. What the project is

Human oversight for Akka services as one engine, one HTTP contract and one set of console components
(`README.md`). Its claim: every situation where a service must stop and let a person decide reduces to
**fourteen recurring patterns**, defined as data in Verify (schema v2.8), and "a pattern is data, not code".
Status: "a working prototype, version 0.1.0-SNAPSHOT"; missing SDK and runtime behaviour is built as stand-ins
behind the interfaces the real versions would have (`docs/05-repository.md`).

- **Library (`java/`)**: `human-api` (what a workflow, agent or endpoint calls; plug-in interfaces in `api/spi/`),
  `human-engine` (plain-Java state machine, settings resolution, routing, independence, verdicts, quality
  figures), `human-akka` (event entity, queue view, deadline timers, halt entity, standing decisions, the
  `/oversight/*` endpoint), `human-runtime-local` (stand-ins: proof ledger, tool-call approval guardrail, halt
  guardrails, suspend/resume with the person recorded), `human-testkit`, `human-conformance` (HTTP suite for any
  `/oversight/*`).
- **human-companion (`cli/`, Go, 9167)**: plays the akka CLI companion. Discovers services from
  `~/.akka/human/services/*.json`, merges their events, stamps the chosen person on every write as a rehearsal,
  forwards writes to the owning service, serves the console, runs conformance.
- **Consoles (`console/`)**: `human-kit` (React components, ten subject views, decision panel, hooks, CSS tokens),
  `human-elements` (web components), `apps/console` ("a standalone version of the Akka console's Human
  section"), `apps/playground` (5181).
- **Samples**: `samples/patterns` (9164: one control per pattern, plus the pattern tour); `samples/contextlayer`
  (9165: contextlayer's seventeen human controls, with Decisions, Links and Cases screens);
  `samples/loan-origination` (9166: ai-console's loan controls S1 to S7 plus domain reviews, with an underwriting
  desk; agents are deterministic stand-ins).
- **spec/**: `CONTRACT.md` (oversight contract v2, extending ai-console `docs/handoff/contracts/human.md`),
  `oversight.schema.json`, 27 examples, fixtures (`controls-patterns.yaml`, `overseers.yaml`), and `spec/verify/`
  pinned at Verify `641097fa`.
- **docs/**: `01-patterns` to `09-build`, and `research/study.md` (206 person-related controls studied).

## 2. Taxonomy: five flavors, fourteen patterns

**Terminology correction.** The five names in the brief (domain decision, system authorization, monitoring,
feedback, halt) are **flavors**, from Verify ADR-016. "A flavor says who decides and how tightly the person is
coupled to the system. A pattern says what situation they decide" (`docs/01-patterns.md`). There are **fourteen
patterns**. The README groups them into five "families" named after the flavors, but the mapping is many-to-many
(`spec/verify/human-patterns.yaml`, `flavors:` per pattern). A control declares one flavor and one pattern; the
engine refuses a pattern that does not run under its flavor (`java/human-engine/.../Settings.java`).

| Flavor | In the tour's words (`samples/patterns/ui/src/tour/patterns.ts`) | Patterns under it |
|---|---|---|
| `human-system-authorization` | "A person authorizes what the system may do: an action, a change, an exception or a correction." | action approval, change authorization, exception, outcome reconciliation, override |
| `human-domain-decision` | "A person makes or reviews a decision about someone, or takes over from the system." | action approval, decision review, exception, match, reconciliation, contest, override, triage, hand-off, attestation |
| `human-feedback` | "Anyone can say an output is wrong, and a person decides what to do with it." | flag and feedback, attestation |
| `human-monitoring` | "A person answers a signal or a schedule while the work carries on." | triage, attestation, oversight quality |
| `human-halt` | "A person stops a capability at once, and restarting it takes a second decision." | halt and restart |

Two more axes: the **mode**, from whether work waits: "In the loop" (HITL), "On the loop" (HOTL), "Over the loop"
(HALT) (`console/packages/human-kit/src/words.ts`); and the **hook**: a workflow pauses, an apply handler acts, a
person starts it, a monitor raises it, a halt check guards it. **Not patterns:** low model confidence is a
trigger; "a reviewer who never answers" is a policy every pattern has; naming competent overseers belongs in the
overseer registry. Only `human` controls carry a pattern; a person reviewing an eval's finding is a second, human
control.

### The fourteen

Definitions quoted from `spec/verify/human-patterns.yaml`. Controls: `pt-00NN` in
`spec/fixtures/controls-patterns.yaml`, `clNNNN` in `samples/contextlayer/.../governance/controls.yaml`, S1 to S7
and `…08`–`…10` in `samples/loan-origination/.../governance/controls.yaml`.

| # | Pattern | Definition | Waits? | Decisions (labels) | If nobody answers | Shown by |
|---|---|---|---|---|---|---|
| 1 | Action approval | "An agent or playbook wants to take an action with an effect. Someone other than whoever, or whatever, asked approves it first." | Yes | Approve, Deny, Edit then approve, Ask for more, Escalate | Default DENY | pt-0001 (pay > 1,000 EUR; ai-system-owner with `eu-ai-act-oversight` training; 30 min then head of operations; 10 s minimum review); cl0003; loan S1 (judge-agent recommendation) |
| 2 | Decision review before effect | "An automated decision about a person… is held until a qualified person inside the domain reviews it." | Yes | Confirm, Do not issue, Amend, Ask for more, Escalate | Escalate ("no silent default") | pt-0002 (GDPR Art 22(3); 4 h; two checks: gives the reason, says how to appeal); loan `…08` held notices (4 h, then standard letter), `…09` underwriting |
| 3 | Change authorization | "A release, stage change, connector, policy, model or new use case needs approval from someone other than its author, at a level set by its risk." | Yes | Approve the change, Reject, Request changes | Escalate; bars proposer and builder | pt-0003 (SOC 2 CC8.1, two approvers); loan S5, template review; eight contextlayer controls |
| 4 | Exception or waiver | "A rule is set aside for a stated time. A second line, sometimes an outside authority, grants it with an expiry." | Yes | Grant until expiry, Refuse | Default DENY | pt-0004 (compliance lead); cl0047 (at most 365 days) |
| 5 | Match and adjudication | "The system cannot tell whether two records are one thing… A reviewer who did not load the records decides." | Yes | Same, Different, Relabel | Stays unmatched | pt-0005 (EU AI Act Art 14(5)); cl0004 Link Review |
| 6 | Outcome reconciliation | "An action was sent but its result is unknown… nothing retries it automatically." | Yes, retries | It happened, It did not happen, Retry | Escalate | pt-0006; cl0044 |
| 7 | Contest and appeal | "The person affected by a decision asks for a human review… a reviewer who is free to overturn it decides." | No | Uphold, Modify, Overturn, Ask for more | Escalate; bars first decider and their reporting line | pt-0007 (Colorado SB26-189); loan `…10` (within 30 days) |
| 8 | Override with justification | "A person disregards, replaces or reverses a system output, and records why." | No; decided at once | Override, Disregard, Reverse | n/a | pt-0008 (EU AI Act Art 14(4)(d)) only |
| 9 | Flag and feedback | "Someone marks an output as wrong… A triager accepts it as an evaluation case or dismisses it." | No | Accept as an eval case, Dismiss | Ages out | pt-0009; loan S7 |
| 10 | Triage | "A monitor, watcher or anomaly detector finds something… sometimes against a regulatory clock." | No | Resolve, Dismiss, Report | Escalate | pt-0010 (referral share < 20%); loan S2, S4; cl0045, cl0046 |
| 11 | Hand-off to a person | "A user asks for a person, a crisis signal appears, or a step fails. The person on duty takes the conversation or run over." | Yes | Take over, Return to the agent, Close | Escalate to a fallback | pt-0011 (5 min) only |
| 12 | Halt and restart | "Something must stop now. One authorised person halts; restarting needs two reviewers once the safe-state checks pass." | The system | Halt, Approve restart, Keep halted | Stays halted | pt-0012 (EU AI Act Art 14(4)(e)); loan S6; cl0011 + cl0012 |
| 13 | Scheduled attestation | "On a cadence, an owner, a board or an independent validator attests that a control, model or framework is still fit… the evidence goes stale." | No | Attest, Attest with findings, Refuse to attest | Control goes stale | pt-0013 (SR 11-7, quarterly) only |
| 14 | Oversight quality | "Review times, approval rates and override rates across many decisions show the oversight is not working. The control's accountable owner acts." | No | Reset, Retrain, Reassign | Escalate; signal stays raised | pt-0014 (> 20% of approvals under minimum review in 7 days); loan S3 |

**Common mechanics** (`docs/02-spec.md`, `spec/CONTRACT.md`, `java/human-engine/.../Rules.java`):

- **Lifecycle:** raised, claimed, decided, applied, kept as a verdict and a proof record. "A decision is a
  record, not an action: the subject's owner applies it and reports that it did."
- **What the person sees:** one page per event: pattern, control, service, state, deadline ring; the question in
  one sentence with checks; a subject view by kind (action, behaviour, change, system, output, records, appeal,
  exception, conversation, attestation); a decision panel with only the allowed decisions, a reason box, "1 of 2
  votes", the minimum-review countdown, any AI recommendation; the history (`docs/04-console.md`).
- **Decision clock:** a deadline (`sla_target`), at risk at 75%, claims lapse after 30 minutes, an optional
  minimum review time (refused, or recorded as breached under `WARN`), late decisions accepted but breached, one
  extension of up to seven days. Deadlines run from the event journal, so "a missed deadline acts on its own".
- **Timeouts:** `RAISE_TIMEOUT`, `RESUME_WITH_DEFAULT` (usually DENY), `ESCALATE` (next queue; at the last queue,
  breached "missed-deadline"), `ABANDON`.
- **Votes and writes:** `SINGLE`, `TWO_PERSON`, `N_OF_M`, `CONSENSUS` (split vote settles DENY); escalate, send
  back and resubmit, ask for more, recuse, withdraw, extend, reopen (accountable owner only).
- **Standing decisions:** `APPROVE_FOR_PATTERN` / `DENY_FOR_PATTERN` settle later matching raises for 30 days
  unless revoked, recorded as `standing:<id>`.

## 3. How a control is declared and configured

- **No annotations.** A control is YAML: `id`, `name`, `corpus_ref` (the Verify corpus control it implements,
  e.g. `gdpr-art22.art22.3`), `flavor`, `human_config`, plus `halt_config` for halts. `YamlCatalog` reads it from
  the classpath; its identity is the file's SHA-256. The SPI says "read from its signed bundle or a YAML file"; no
  signature is checked in this repo.
- **Code names the control:** `human.raise(Patterns.actionApproval("…").control("pt-0001")…)` then `thenPause`
  (`docs/03-server.md`). One raise names exactly one control.
- **Wiring:** each service builds `HumanPlugins` in its setup class (`java/human-api/.../spi/HumanPlugins.java`):
  catalog, overseer directory, resumers, apply handlers, halt scopes (safe-state checks), access policy, proof
  ledger, clock, and `environment` ("local, pre-production or production; selects each control's strength").
- **`human_config`** (`spec/verify/human-config.schema.json`): what (pattern, subject kind, trigger detector and
  monitor threshold), who (roles, groups, attestations, review mode, independence, accountable owner), when
  (deadline, at-risk point, claim time, minimum review, late decisions), if nobody (timeout behaviour, default,
  escalation chain of queues with roles and `after`), how (allowed decisions, sticky modes, rationale, AI
  recommendation), afterwards (proof event), where (`shadow`; `strength` per environment: prevent, warn, record).
- **Precedence, three layers only:** the control, then the pattern's defaults, then shared defaults
  (`Settings.resolve`). "A corpus control states only what its source text requires… Roles, deadlines and
  escalation queues are a deployment's to fill in." The deployment does that by writing its bundle.

| Concept | Modelled? | How |
|---|---|---|
| Reviewer roles | Yes | `routing.roles`, per-queue roles; overseer roles |
| Competence | Yes | Overseer attestations with completion and expiry, checked on the day; `qualified` flag with a reason (`Qualification.java`) |
| Authority | Yes | Overseer `authority`: decisions allowed on listed control ids |
| Separation of duties | Yes | Independence `proposer`, `builder`, `first-reviewer`, `first-reviewer-line` (walks `reports_to`); two-person votes; recusal. No "one approver of each role" |
| Escalation chain | Yes, per control | Ordered queues with roles and delays |
| Environment | Yes | `strength` and `shadow`; events record their environment |
| Jurisdiction, country, region | **No** | Only indirectly, through `corpus_ref` |
| Tenant, legal entity, business unit | **No** | One catalog and one registry per service |
| Central policy with local overrides | **No** | No layer above the bundle |
| Language, locale, time zone | **No** | English labels; `en-US`/`en-GB` numbers; UTC throughout |
| Notifications, IdP roles | **No** | Platform asks; the registry file stands in |

## 4. Evidence

- **Proof records** (`java/human-engine/.../Proofs.java`; NDJSON at `GET /oversight/proof`; a local ledger
  entity standing in for runtime request 10). `HumanOversightDecisionRecordedV2`: event, control, pattern,
  subject kind, reviewer and roles, decision, sticky scope, `decided_at`, subject ref, rationale, review duration,
  every vote, late, verdict, source, catalog digest. A timeout records `system:timeout`. `HaltExercised`
  (exerciser, scope, target, affected calls, reason, time) and `HaltLifted` (who lifted, each safe-state check,
  time) are separate records.
- **Verdicts** judge the oversight, not the AI: "A reviewer who denies an unsafe action has made the control
  work." `upheld`; `breached` (fail-open timeout, no authority or qualification, under minimum review, late,
  missed deadline, two-person rule broken); `inconclusive` (abandoned, withdrawn, fail-closed timeout); `error`.
- **Source:** runtime, simulated, rehearsal. "Only `runtime` counts as evidence." The companion and service
  screens stamp every write as a rehearsal, so demo decisions take effect "but never count as evidence".
- **Quality figures** are computed once on the server (`Figures.java`): review times, approval and override
  rates, agreement with the AI, per reviewer and week.

**Connection to ai-console.** The library uses Verify v2.8 vocabulary unchanged (`human_config`, the V2 decision
record, verdict sources), which is what ai-console's Verify views read. None of the ai-console changes are made:
"each one has a standalone equivalent here" (`docs/06-changes-elsewhere.md`). Planned: ai-console's Human page
(`kalix-console/apps/local-console/src/features/human/`) moves onto `human-kit`; `HumanConfigForm.tsx` stops
writing `flavor: custom-human`; the akka CLI companion's `internal/companion/human/` (about 4,700 lines of Go)
passes `pattern` through; CLI ask 8 writes `human_config` into signed bundles. Bundles connect through the
catalog digest on every event and proof record. **Exit conditions are not referenced anywhere in akka/human.**
**No ai-console doc mentions "akka/human" or "human-companion"** (grep of `C:\Users\tyler\ai-console`, excluding
`node_modules`). The related ai-console material is `docs/plans/human.md` (Verify › Human, built on simulated
trace-ledger history), `docs/handoff/contracts/human.md` (contract v1) and `docs/research/human-oversight-market.md`.
The memory note (`memory/human-oversight.md`) puts the page at Verify › Human on main and the top-level **Human**
page on unified-console, aimed at AI system managers, with domain decisions "shown read-only, not designed for".
akka/human makes domain decisions first-class, decided in the product's own screens.

**The pattern tour** (http://localhost:9164/, `samples/patterns/ui`). Each pattern runs live in four steps: "what
happens, who decides, what changes, what is kept", with the real code cut from the repository beside each step.
Action approval shows one control reached three ways: workflow step, agent task, guarded tool call. The last step
is always: "The verdict and the proof record keep who decided, when, how long they looked and why."

## 5. Vocabulary

- **Structure:** control, human control, mechanism, flavor, pattern, `human_config`, `halt_config`, subject,
  subject kind, trigger, catalog or bundle, catalog digest.
- **People:** person; reviewer (on the wire); overseer, overseer registry; qualified; attestation (training held,
  **and** pattern 13: keep them apart); authority; accountable owner; proposer; builder; first reviewer; reporting
  line; appellant; "Acting as". Roles: ai-system-owner, model-risk-owner, safety-officer, oversight-officer,
  compliance-lead, appeals-officer, case-reviewer, duty-officer, data-steward, feedback-triager; loan adds
  underwriter, senior-underwriter, head-of-credit, underwriting-counsel, adverse-action-reviewer.
- **Work:** event, question, checks, raise, claim, decide, vote, review mode, independence, recuse, escalate,
  escalation chain, queue, send back, apply, standing decision, halt, restart, safe-state check, AI recommendation.
- **Time:** deadline, at risk, overdue, decision clock, minimum review time.
- **Afterwards:** verdict (upheld, breached, inconclusive, error), source, proof record, proof ledger, rehearsal,
  oversight quality. **Modes:** in, on and over the loop.

## 6. Built versus planned

**Built** (`docs/07-plan.md`: all six phases "Done"; five commits, `727c283` to `223ea8d`, 2026-10-29/30): the
engine for all fourteen patterns; the component library; the stand-ins; the conformance suite ("three services
pass with no failures"); the kit, playground and console; contextlayer with "no hand-written human-event code";
loan-origination on the library; the companion; the pattern tour. No TODOs in the code.

**Stand-ins:** the proof ledger (runtime 10); the person recorded on suspend/resume (runtime 11); halts **within
one service only** (runtime 14); a registration file for pending-decision discovery (runtime 15); the registry
file for IdP roles (platform 2). Tool-call approval denies with "awaiting approval" and the workflow retries; it
"was tested by calling the guardrail directly, not inside a model's tool loop" (`docs/08-discussion.md`).

**Not built:** Slack and email links (described in `docs/04-console.md`, no code); production inbox and
retention; adoption in ai-console, the CLI and contextlayer itself. The registry says oversight quality "can block
new high-risk decisions"; I found no code that blocks. A halt on a control with a minimum review time answers 409
(loan README, "Library notes"). The repo pins Verify `641097fa` (38 human controls); the merged follow-up #33 added
eighteen human controls, so the live count is likely higher.

## 7. What the storyboard can show truthfully

Screenshots exist in `docs/images/` (`tour.png`, `tour-pattern.png`, `console-queue.png`, `contextlayer-link.png`,
`desk.png`, `playground.png`).

1. **Taxonomy:** five flavors by who decides, fourteen patterns by situation, one lifecycle, one set of settings
   (tour overview; `docs/01-patterns.md`).
2. **An approval with a decision clock:** the agent asks to pay 4,200 EUR; the workflow pauses; Tyler Jewell
   claims it; the ring counts ten seconds; approve; payment out; verdict and proof shown, control YAML beside it.
3. **Separation of duties:** K. Osei proposes model m-5 for 10% of traffic; two model risk owners, neither
   proposer nor builder, approve. On the desk, a contest names the first decider and their line as barred.
4. **Competence:** acting as K. Osei, the event is visible but cannot be decided ("EU AI Act oversight training
   expired"); the Overseers view lists lapsed qualifications.
5. **Stop button, governed restart:** S. Patel halts `eligibility-assessment`; calls answer 503; restart needs two
   other safety officers and a passing safe-state check; `HaltExercised` and `HaltLifted` on record.
6. **One queue across systems:** the console at 9167 merges three services, most urgent first, filtered by
   service, pattern, deadline or "what you may act on".
7. **Deciding inside the product:** a held adverse-action notice that named a protected characteristic; counsel
   releases, amends or sends the standard letter within four hours. contextlayer Links: both loaders barred.
8. **Watching the watchers:** over 20% of a week's approvals under the minimum review time goes to the
   accountable owner.
9. **The record:** one V2 decision line (reviewer, roles, rationale, review duration, votes, verdict, source,
   digest), honestly marked `rehearsal`.
10. **One catalog, many sources:** `controls-patterns.yaml` holds controls from the EU AI Act, GDPR, Colorado,
    SOC 2, NIST AI RMF, SR 11-7 and FINOS, each traced by `corpus_ref`.

**Checks on `demo/talk/script.md`:** scene 26's "an underwriter overrode the rationale inside the four-hour limit"
does not match akka/human. There, the four-hour control is the held-notice review, decided by an adverse-action
reviewer or counsel, and the decision is "Amend" (EDIT), not an override; underwriting review takes two days. If
the scene comes from ai-console's own loan sample, check against that sample. The script's "Thirty-eight" human
controls matches the pinned Verify, which may not match Verify main.

## 8. Gaps for a multi-jurisdiction story

- **Jurisdiction as data:** no country, region or legal entity on controls, events, subjects, overseers or
  queues. Routing "German applicants to reviewers qualified in Germany" needs separate control ids, roles,
  groups or attestations per country.
- **Central policy with local overrides:** no group-wide bundle plus local stricter settings, no "strictest
  wins", no record of which layer set a value.
- **One decision under several regimes:** a raise names one control; satisfying GDPR Art 22, EU AI Act Art 14 and
  a local law at once needs one control with the strictest settings or several events.
- **Organization structure:** one catalog and registry per service; the companion acts as one local reviewer; no
  regional oversight teams; no IdP roles.
- **Escalation across the organization:** chains are per control; there is no local-to-regional-to-central route
  across services; a group-wide halt needs runtime request 14.
- **Language and time:** English only, UTC dates (attestation validity is checked on the UTC day); no translated
  notices, working hours, calendars or time zones.
- **Regulatory clocks and reporting:** no incident-report clocks or authority notification; quality and verdicts
  slice by service only, not by country.
- **Where the record lives:** a local ledger and NDJSON export; no residency, retention or legal hold; demo
  verdicts are rehearsals, so no runtime evidence from a deployed system.
- **Competence per jurisdiction:** attestations are free ids with expiry (fixtures use only
  `eu-ai-act-oversight`); per-country training can be named, but nothing ties it to a jurisdiction.
