# Presenter brief: governing the Proposal Review Panel (internal)

Internal. Not for the audience. Do not put any of this in the film, the slides, the speaker notes or a handout.
Field engineers (the first is Alan, an Akka solutions architect in EMEA) give the demo to a customer's risk and
safety officers. The step-by-step is [RUNBOOK.md](RUNBOOK.md); the film is [storyboard.md](storyboard.md).

## The argument in one line

A person who is accountable for an AI system can see which controls act before, beside and after the model, who
decides when the system cannot, and one record of all of it.

## Spine

Five questions, asked in the order a governance reviewer asks them, answered about one proposal travelling through
one system: what have we promised (a bundle, which works like a control register); is the promise signed; are we
keeping it (before the model, beside the model, the verdicts); who decides when the system cannot (people); what
would an auditor see (the record).

## Timing

| Act | Film (15:00) | Live (about 20:00) | Cut (8:00) |
|---|---|---|---|
| 0 Opening | 0:47 | 1:00 | 0:47 |
| 1 The system | 1:50 | 2:30 (submit Managed Services) | 0:52 (1.1 and 1.4) |
| 2 Why a system needs controls | 1:20 | 2:00 | skipped |
| 3 Promised and signed | 2:10 | 2:00 (sample system's Controls page) | 1:05 (3.1 and 3.3) |
| 4 Before the model | 2:30 | 4:00 (injection, card number, trace) | 1:35 (4.1 to 4.3) |
| 5 Beside the model | 2:13 | 2:30 | skipped |
| 6 Who decides | 2:32 | 4:00 (weak proposal, decision) | 1:40 (6.1 to 6.4) |
| 7 What an auditor sees | 1:09 | 1:30 | skipped |
| 8 Close | 0:29 | 0:30 | 0:29 |

The cut's scenes add to 6:28 of film; the remaining time is the presenter's pauses and one question. The live
version assumes the panel is running and the pre-roll is done; it leaves about 90 seconds of slack for a first
question. Act 3 and the console's Human and Evidence pages are not available for the panel itself today (see open
items), so the live Act 3 uses the sample lending system, or the film's scene 3.1 to 3.5.

## What is real and what is illustrative

| Item | Status | Source |
|---|---|---|
| The panel's behavior in Acts 1, 4 and 6 (completed review, blocked injection, held weak review, decision rules) | real; run on 2026-11-07 with the stub model | `RUNBOOK.md` outcomes; `ReviewWorkflow.java`, `application.conf`, `controls.yaml` on branch `human-action-approval` |
| Scores | stub model: 2.0 plus 1.08 for each of five topics the text covers; Managed Services 7.4, thin proposal 2.0, card-number scenario 5.2 | `optimize-local\README.md`, panel section; run on 2026-11-07 |
| The film's console scenes (Controls board, Activity trace, Human page, bundle compare, verdict ticks) | drawn mocks in the console's own look; every film scene carries "Illustrative system and data" | `storyboard.md`; reference frames in `docs\audit\gate\2026-11-06\` |
| The film's figures: 7.4 overall score, 14 out of range, toxicity 0.03 and 0.81, threshold change from 5 to 6, 94% retention | illustrative, except 7.4 and the threshold of 5.0, which the panel and stub produce | `storyboard.md` |
| Live console pages for the panel | the panel is listed as a system; its Controls and Human pages are empty (no governance folder) | see "Open items" and `RUNBOOK.md` |
| Signing | a mocked two-section signer on this computer; the console labels it a rehearsal | bundle workflow decisions, 2026-11-06 |
| The oversight library `io.akka.human` | built from a local checkout at commit `23a0167` (contract v3); not published | `README.md` of the panel |
| The overseers in the panel's branch | placeholder identities in `overseers.yaml`; role names only on screen | `overseers.yaml` |

## What the live panel does that the film shows, and what it does not

Does (verified on 2026-11-07):

- Reviews a proposal with four agents and a synthesis agent (Act 1).
- Denies an injection attempt before the model, ends the review BLOCKED with the reason, makes no model call, and
  raises a Triage event for the Security officer role (Act 4).
- Completes a review that holds card-number text (Act 4).
- Holds a weak review as AWAITING_APPROVAL, enforces a 10-second minimum review time, refuses the submitter as
  decider, and applies a rejection with the reviewer's reason (Act 6).

Does not (or not verified):

- Show the masked text of the card-number scenario: not verified (the review record shows only the first 150
  characters).
- Trigger the response guardrail, the jailbreak similarity guard, the classifier's threshold or a failing evaluator
  verdict with the stub model: not run.
- Show Controls, a signed bundle, verdicts, Human events or Evidence in the console for the panel: not available
  without a governance folder.
- Show Change authorization or Halt and restart: the panel runs two library patterns (Action approval and Triage);
  scenes 6.5 and 6.6 describe the library.
- Show the approval path (APPROVE): not verified.
- Decide in the console: the console's local reviewer holds other roles; use the terminal steps in the runbook.

## Questions risk officers are likely to ask

| Question | Short true answer |
|---|---|
| Does the guardrail stop every injection? | It stops what its rules match: a list of patterns, and a similarity check against known jailbreak examples. It is one preventive control among several, and the trace shows what it decided. |
| What happens to a blocked review? | It ends BLOCKED with a recorded reason, no retries and no score. A Security officer role gets a Triage event to resolve, dismiss or report; the workflow does not wait for it. |
| Is the response guardrail a repair? | No. When a reader's answer is out of range or incomplete, the review ends BLOCKED. Nothing corrects the answer. |
| Who can approve a held review? | A person holding the role `proposal-approver`. The submitter cannot, and a decision needs at least 10 seconds of review. An event nobody decides within a day is rejected. |
| Can approval be a reflex? | The minimum review time and a required rationale make a decision take time and carry a reason. They do not prove the reviewer read the report. |
| Where is the record? | In the review itself (status, scores, reason) and the oversight event with its decision. The console also keeps traces. The library's proof ledger is local on this computer. |
| Is the signing legally meaningful? | On this computer it is a rehearsal and the console says so. |
| Does this need Akka to run the model? | The panel calls a model through the gateway; the demo uses a stub with scripted answers, so scores reflect the text's topics, not model judgment. |
| What does the library cover? | Fourteen oversight patterns in five families. The panel uses two. The console shows the situations that controls raise; it does not provide fourteen separate screens. |
| Can we use our own controls? | Controls are assigned in configuration and the oversight controls in a controls file. Which of your policies map to which control is a conversation for the customer's risk team. |

## Do not claim

- The human library's fourteen patterns are not fourteen console features.
- Local signing is a rehearsal; it does not count as evidence.
- The response guardrail ends a review BLOCKED; it does not repair the answer.
- The panel's `io.akka.human` library is not published yet, and the pull request for the branch is not open.
- The overseers in the branch are placeholders; show roles, not names.
- The stub model's scores are not model judgments; do not present them as the panel's quality.
- Do not say the console shows the panel's bundle, verdicts or Evidence until the open items below are closed.
- Do not say the card number was masked on screen unless you opened the trace and saw it.
- The film's scenes are mocks with illustrative data.
- Do not name a customer, set a customer's dates, or discuss pricing or roadmap in the session.

## Open items

1. The panel has no root `governance` folder, so the console shows no bundle, Controls, scoped Human page or
   Evidence for it. Create it from the console's risk survey in the panel's repository, with rows for
   `release-weak-review` and `blocked-attempt-triage`. This was not done, because it edits the panel's repository.
2. The console's local reviewer needs the role `proposal-approver` (or the panel's overseer registry must list the
   console's reviewer) before a decision can be made on the Human page.
3. The Activity page rendered blank in a headless capture on 2026-11-07; open it in a normal browser and confirm that
   the panel's traces and the guardrail span show.
4. Verify the masked text of the card-number scenario in a trace, the response guardrail, the evaluator verdict and
   the APPROVE path.
5. The trace ledger (port 9096) must run for the console's Human and Activity pages; it is not part of
   `stack.py up`.
6. Decide whether the live Act 3 uses the sample lending system or the film's scenes; the runbook uses the sample
   system.
7. The panel's own README says the service runs "with mocked AI models (no API key needed)"; with no key it fails at the
   first model call, so the stub model is required for every live run.
8. Review identifiers persist in the local runtime; use a new identifier each run. How to clear the state was not
   verified (the library's development routes, `PANEL_HUMAN_DEV_ROUTES`, include a reset).
