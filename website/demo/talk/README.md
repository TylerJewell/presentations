# Governing AI at the speed it changes: the keynote deck

A click-advanced keynote for Tyler Jewell: 35 minutes at an AI governance conference, about 30 of talk and 5 of
questions, for some 75 governance and risk officers on a projector. It runs on the animated product film's engine
(`../mock/lib`, loaded read-only) and its visual language.

## Open and present

1. Open `index.html` from disk in Edge: `file:///C:/Users/tyler/ai-console/demo/talk/index.html`.
   Press **F** (or F11) for full screen. The 1920x1080 stage scales to the screen and letterboxes on black.
2. On the second screen, open `index.html?presenter=1` in another Edge window. It connects to the show by
   itself ("Show connected" top right). The clicker works in either window.
3. Fonts are in `fonts/`, so the deck needs no network.

| Key | Does |
|---|---|
| Right, PageDown, Space, Enter, click | Play to the next beat and hold. A click during an animation finishes it. |
| Left, PageUp, Backspace, right-click | Jump back to the previous hold (no reverse animation) |
| Home / End | First slide / last hold |
| B or . (or W) | Blank the screen to black, and back |
| Mouse to the bottom edge, or G | The slide strip: every slide by act, click one to jump there. G keeps it up until G or Escape. It is outside the stage, so it never shows in captures or the PDF |
| Ctrl+Enter | The notes panel: the talk track for this click, a preview of the next, and the contents (every slide by act; click one to jump there), on the right, with the slide shrunk beside it. The bottom slide strip stays hidden while it is open. Ctrl+Enter again hides it |
| (always on) | The click counter, bottom-right of the slide: one dot per click on this slide, yellow for this one, hollow for those to come. When the last dot is yellow, the next click goes to the next slide. Outside the stage, so never in captures or the PDF |
| Digits, then Enter | Go to that slide (1-based, as numbered in the presenter view and the table below) |
| F or F5 | Full screen |

- The position is kept in the address (`#s=board&b=2`), so a reload comes back to the same beat.
- The presenter view shows the hold the show is heading to and the next one, the words for this beat, the clock,
  the time since the first click, ahead or behind against plan, and planned against actual time per act.
  **T** restarts its timer.

## Backup

- `out/akka-ai-governance.pdf`: every beat's hold frame, one page each. Rebuild with
  `node demo/talk/render/render.mjs` (or `--pdf-only`).
- `index.html?print=1` lays out the same frames in the browser (Ctrl+P, background graphics on).

## Rendering and the script

| Command | Does |
|---|---|
| `node demo/talk/render/render.mjs` | Screenshots every hold to `review/`, writes `review/contact.png`, exports the PDF |
| `node demo/talk/render/render.mjs --only=rules,board --mid --trans` | Just those slides, with mid-beat and transition frames |
| `node demo/talk/render/script.mjs` | Writes `script.md` from the slides and prints planned time per act |

The words live in each slide's beats (`slides/<id>.js`, `say`); `script.md` and the presenter view both read them.
Edit the slide, then rerun `script.mjs`.

## How it is built

| File | What it is |
|---|---|
| `index.html` | Fonts, the mock's tokens and classes, the libraries, then `slides/index.js` |
| `talk.css` | Deck type sizes for the room, chips, cards, print pages |
| `lib/deck.js` | The engine: slides, beats, clicks, transitions, sync, capture and print modes |
| `lib/presenter.js` | The presenter view |
| `lib/kit.js` | `Talk.camera` (zooms to 2.4x for console screens), headline lines, section cards, glyphs |
| `data/trends.js` | Act 1 figures and their sources |
| `slides/index.js` | Acts and slide order |
| `slides/<id>.js` | One slide: `registerSlide({ id, act, title, beats: [{ t, say }], render(root), at(t) })` |

A slide is a pure function of its time `t`, like a film scene. Each beat is a hold time; a click plays `t` from one
hold to the next at real speed. Live parts run on the mock's live clock, which the engine ties to the wall clock,
so screens keep moving while a beat holds. A slide may set `transition: 'cross'` to dissolve in instead of fading
through black.

## Slides and planned time

Planned time is the words at 140 a minute, or the beat's animation if longer: **4,118 words, 29:26 in total**,
leaving about 5 minutes for questions in a 35-minute slot. Each beat is one click.

| # | Slide | Beats | Planned |
|---|---|---|---|
| 1 | Title | 1 | 0:42 |
| | **Two clocks** | | **6:26** |
| 2 | Two clocks | 4 | 1:14 |
| 3 | The rules moved this year | 6 | 2:47 |
| 4 | The systems keep compounding | 5 | 1:35 |
| 5 | Weekly, monthly, yearly | 4 | 0:51 |
| | **Governance changes shape** | | **4:39** |
| 6 | Governance has to change shape (section card) | 1 | 0:17 |
| 7 | From documents to controls | 4 | 0:53 |
| 8 | From audits to evidence on every request | 4 | 1:16 |
| 9 | From the model to the system | 4 | 1:13 |
| 10 | A posture, proved | 4 | 1:00 |
| | **Principles** | | **9:42** |
| 11 | Seven principles (section card) | 1 | 0:17 |
| 12 | AI regulation worldwide, as controls (the corpus) | 5 | 1:30 |
| 13 | Every control is one of five kinds | 7 | 1:39 |
| 14 | Controls come from three places | 4 | 0:57 |
| 15 | Controls are managed like software | 4 | 1:03 |
| 16 | Every control leaves a verdict | 4 | 1:05 |
| 17 | Drift is a change in verdicts | 4 | 0:56 |
| 18 | Governance reaches every agent | 4 | 1:17 |
| 19 | When a limit breaks, a person decides | 4 | 0:56 |
| | **How it comes together** | | **7:09** |
| 20 | How it comes together (section card) | 1 | 0:20 |
| 21 | One platform, the whole lifecycle | 5 | 1:02 |
| 22 | Every gap is a gap in the evidence (stitched stack against one platform) | 3 | 0:51 |
| 23 | The Controls board | 7 | 1:17 |
| 24 | A change arrives | 9 | 1:35 |
| 25 | The evidence record | 5 | 0:57 |
| 26 | A person decides the rollout | 8 | 1:08 |
| | **Close** | | **0:47** |
| 27 | Closing | 2 | 0:39 |
| 28 | Questions | 1 | 0:08 |

## Facts and their sources

Every figure on a slide carries its source in small type on that slide. Act 1 figures live in `data/trends.js`.

| Figure | Source | Status |
|---|---|---|
| EU AI Act high-risk rules: 2 Aug 2026 → 2 Dec 2027 (Art. 6(2), Annex III); 2 Aug 2027 → 2 Aug 2028 (Art. 6(1), Annex I) | EUR-Lex: Regulation (EU) 2024/1689 Art. 113; Regulation (EU) 2026/1744 of 8 July 2026 (recitals and amended Art. 113). OJ date 24 Jul 2026 from the European Parliament legislative train | Primary (read in EUR-Lex for this deck) |
| Colorado: SB24-205 due 1 Feb 2026; SB25B-004 delayed to 30 Jun 2026; SB26-189 signed 14 May 2026, repeals and re-enacts, duties from 1 Jan 2027 | leg.colorado.gov bill pages | Primary (opened for this deck) |
| SR 26-2, 17 Apr 2026, replaces SR 11-7 (2011); footnote 3: generative and agentic AI "not within the scope of this guidance" | federalreserve.gov SR 26-2 and attachment | Primary |
| US state AI bills: 1,262 introduced and 227 enacted in 2025; 1,539 and 280 in 2026 to early October | NCSL, 21 Oct 2026 | Primary |
| Executive Order 14365, 11 Dec 2025: a task force to challenge state AI laws | Text of the order (American Presidency Project) | Primary |
| OSFI Guideline E-23 effective 1 May 2027; "model" includes AI | osfi-bsif.gc.ca | Primary |
| METR task length doubling: about every 7 months (2019–2025); about every 131 days for models since 2023. Chart drawn from those rates, with METR's caveat (software, ML and cybersecurity tasks) | METR, Mar 2025 and Jan 2026 | Primary |
| OSWorld agent success about 12% → about 66% in a year (people about 72%); documented AI incidents 233 (2024) → 362 (2025) | Stanford AI Index 2026 | Primary |
| New York City Local Law 144: the city found 1 issue in 32 companies; the State Comptroller's auditors found at least 17 | NYS Comptroller, Audit 2024-N-6, 2 Dec 2025 | Primary |
| Corpus: 241 frameworks, 38 jurisdictions, 1,718 controls (1,639 verbatim), 962 → 1,718 since June, 406 effective in 2026; Gate 1,399 (documentation 1,115, attestation 207), Sanitizer 123, Evaluation 86, Guardrail 72, Human 38, 19 flavours | Akka regulation corpus, snapshot 2026-10 (`research/corpus.md`) | Internal count |
| EU AI Act Article 14(1), quoted on the corpus slide | EUR-Lex, Regulation (EU) 2024/1689 | Checked verbatim |
| Loan assistant 12 → 34 → 51 controls | The earlier governance deck's example | Illustrative |

**"[Source pending]" items: none.** The pending marker is wired in (`status: 'pending'` in `data/trends.js` shows it
on the slide) but no figure currently uses it. "The review happens once a year" is Tyler's framing and carries no
source or number, by design: research found no sourced ratio of review frequency to model change.

Illustrative, not data: the live counters ("Ran 48,213 times today", "verdicts today"), the drift grid (labelled
"Illustrative verdicts for one system"), the Act 4 console screens (the film's simulated system), the "14 March"
date and ids on the software and person-decides slides, and the owner "T. Jewell" (as in the film).

## Decisions (Tyler, 2026-10-27)

- The talk is on Monday 2 Nov 2026; the "Now" line on the rules slide sits there (`slides/rules.js`).
- Colorado's attorney general rulemaking condition stays off the slide.
- The experiment screen keeps its cost-per-call row.
- Act 3's guardrail breach and Act 4's evaluation breach both stay.
- The Controls board's signature panel reads "Versions kept", not "Chain".
- Each principle slide carries a marker above its headline, seven marks with the current one lit and
  "Principle n" (`Act3.mark` in `slides/principles-card.js`), so the audience always knows which
  principle is on screen (2026-10-28).

## Open items

- **Corpus figures** are a count from the 2026-10 snapshot. Re-count if a newer snapshot lands before the talk.
- **Console legibility.** Two holds (the new-control rows on "A change arrives" and the trace overview on "The
  evidence record") sit at about 1.4x zoom, so the smallest console text is about 20 px, below the 24 px label
  rule. The subjects of those beats are larger, and each has a closer push-in on the next click.
- **Verdict words.** The deck uses Upheld / Breached / Inconclusive throughout, following the console and the
  verdict decisions; the film said Pass and Fail.

## Rules this deck follows

Black ground, one yellow, Instrument Sans for every word (monospace only for code and ids), no rule bars beside
words, no one-sided borders, no numbering on screen, headlines 72 px or more, body 32 px or more, labels 24 px or
more (source notes excepted). No bank or customer is named. Akka is named once on the closing slide (the mark); the platform slides name the products (Specify, Agent SDK, AI gateway, Verify, Optimize).
`demo/mock` is loaded read-only and was not modified.
