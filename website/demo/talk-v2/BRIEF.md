# Presenter brief: the governance keynote, version 2

Internal. Not shown in the deck, its notes or its file. For Tyler, before Monday 2 November 2026: 35 minutes for
about 75 governance and risk officers, about 30 of talk and 5 of questions.

## The argument in one line

Four problems stand between the rules and your AI systems, and eight principles answer them. The setup (about
seven minutes) names the problems: the rules change every month, every country adds its own rules, every control
lands on an engineering backlog, and the first test of a control is the audit. "Each problem has an answer" hands
over to the principles, which carry most of the talk, and one real system shows them working.

## Timing

The script's planned times are in `script.md` (regenerate with `node website/demo/talk/render/script.mjs --deck=demo/talk-v2`).
The scripted talk runs well under the slot on purpose: the time is yours to spend on the principles. Two places
to watch:

- **Every country adds its own rules** runs long if every country is read aloud. Read four or five and let the
  rest show.
- **Human control comes in five flavors** carries the most words. If time is short, cut the agent-shift click to
  one sentence.

## What is real, what is illustrative

| On stage | What it rests on |
|---|---|
| The ten-country requirements, the fine, the sampled audit, the supervisors bringing agents into scope | Research, sourced on each slide |
| Thirteen components for six human controls in the sample loan service | The Loan Origination sample's README ("Human oversight") |
| The four answers (managed like software, one library, the platform enforces, a verdict on every request) | The principles that follow; controls applying by jurisdiction are built per system |
| The loan system's seven human patterns, and the minimum review time it enforces | Built in the Loan Origination sample, shown in the console's Human page |
| The fourteen-pattern vocabulary; the lapsed-training check in the evidence record | The akka/human prototype; labelled illustrative |
| Only Germany goes back in the experiment | Built (the experiment's region segment) |

## If they ask

- **"Does the platform put a country on every verdict, or roll compliance up by country?"** Not today. Controls
  apply by jurisdiction per system, and the run-time response can be narrowed to one country, as in the
  experiment. Scoping each decision, its verdict and its reviewer to a country is the next step, and the
  gateway already carries the attribute at run time.
- **"Is there a harmonised standard for human oversight?"** No. The first harmonised standard under the AI
  Act, EN 18286 on quality management, was cited on 14 October 2026; the human-oversight deliverable is a draft.
- **"Has anyone been fined under the AI Act?"** None reported as of October 2026. The enforcement so far has come
  through data protection law and labour courts.
- **"Does any law require two people to restart a halted system?"** No. Two people are required to confirm a
  remote biometric identification match (Art. 14(5)). A two-person restart is good practice, not law.
- **"Brazil requires human review?"** Its data protection law gives a right to review, but the clause requiring a
  person was vetoed, so the review may be automated. The AI bill (PL 2338) would add human review; it is waiting in
  the Chamber.
- **"Canada has an AI bill?"** No. Bill C-36 is privacy reform with explanation and human-review rights.
- **"Who is the fined company?"** Uber; the Dutch data protection authority fined it €824.99 million on 21 August
  2026, under appeal. Say it only if asked.

## Do not claim

Per-country scoping inside a bundle; a country on verdicts, events or reviewers; compliance rolled up by country or
across systems; corporate mandates or overlays; evidence kept in its region as product; an organization-wide halt;
the fourteen patterns as a console feature; rehearsal decisions as runtime evidence; any law requiring a
two-person restart; a harmonised standard on human oversight.

## Where every new figure comes from

The storyboard's table "Facts the new scenes use" (`../talk/storyboard-v2.md`) and the report's sections 1–3.
Before the talk, open the regulator's own release for the €824.99 million fine and the MAS text for the quoted
phrase; both are cited from secondary sources today.

## Known corrections outside the deck

The 2026-10 corpus still lists SR 11-7 and no SR 26-2, and 141 EU AI Act controls keep the old August 2026 date;
version 2 does not cite the "406 effective this year" figure for that reason. Both belong upstream in the corpus.
