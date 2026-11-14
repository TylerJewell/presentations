# Akka total cost: storyline v2

Replaces the five-savings structure of `storyboard.md`. The audience is an executive who owns the AI budget. The film makes one claim, proves it with every customer result, asks how, answers one cost area at a time in the order a bill is read, closes on the claim, and ends on the AKKA mark with the call to action. No dollar figures and no totals. Customer results appear in their own units, with no source or date on screen; `figures.json` keeps the sources for the record. A cost area is never called a line, on screen or in narration.

Running time: 5:40 at the captions-only pace (340 s). The talk track is 827 words, written for the voice at about 2.9 words a second with 0.7 s between sentences and a 1.0 s tail (`film/pacing.config.json`), which estimates to about 5:27 voiced. Each scene's duration is that estimate rounded up, or the time its animation or a held slide needs.

This document matches what is built in `scenes/`. The scene ids are the file names.

## The claim

The fully loaded cost of an AI system on Akka is a fraction of the cost on a hyperscaler stack or an assembled open-source stack. Fully loaded means infrastructure, licences, integration and people. The claim carries no ratio or percentage (Tyler, 2026-11-09). The film states the claim and the definition and moves on; there is no signposting.

## Why this order

An executive hears the claim, sees that it has held in practice, asks "how", and gets the answer in the order costs show up: how the vendor charges, what hardware it runs on, how efficiently the code uses that hardware, how many layers share it, how memory is kept, what it takes to integrate, then model spend, then the cost of the people. The three Specify scenes come last among the arguments because people are the largest area in a fully loaded cost.

## Scenes

A strip of the four cost areas stands at the foot of every argument scene (Infrastructure, Licences, Integration, People), and the area the scene is about is lit. Model spend is its own area, outside the four, and lights none. Word counts are the narration's.

**1.1 The claim (14 s, 32 words).** Black. The claim in large type with "a fraction" in yellow, then the four cost areas in a row, each named as it is spoken and left unlit.
- "The fully loaded cost of an AI system on Akka is a fraction of the cost on a hyperscaler or an assembled open-source stack. Fully loaded means infrastructure, licences, integration and people."

**2.1 This has worked in practice (51 s, 127 words).** One card per customer, appearing as the narration reaches each; earlier cards stay and the grid re-lays itself as it fills (two columns to four cards, three to six, four beyond). Every card has the same form: the customer's name on one line, then one value per line with the first value large. Order: Fox, Verizon, Manulife, Swiggy, Dojo, a major bank, a top-three Asia-Pacific bank, Akka as its own customer. The narration names the customer and the result only. The cards are data in `scenes/2.1.js`.
- "This has worked in practice. Fox: cores from one hundred fifty thousand to twenty-two thousand, about forty percent lower cost per session, three times the velocity. Verizon: infrastructure and cloud costs down seventy percent. Manulife: three hundred percent more concurrency, ninety-nine point nine eight percent fewer errors, eighty percent better latency. Swiggy: P99 latency from one hundred forty-four to seventy-one milliseconds, at over five thousand predictions a second. Dojo: recent college graduates delivered a regulated AI system in weeks. A major bank: decades-old core payments modernized in months. A top-three Asia-Pacific bank: two regions, recovery time from eight hours to five minutes. Akka: cost per token down seventy-three percent in six months, and each engineer from one service to four point three in a year."

**2.2 The question (5 s, 6 words).** Black. One line at the centre, nothing else.
- "How did Akka achieve these results?"

**3.1 How the vendor charges (17 s, 42 words). Licences.** Two curves drawn against a year: the consumption curve rises, a tick on it for every request, token and trace; the Akka curve is flat. A year-end note under each, without amounts.
- "Hyperscalers charge for consumption: every request, token and trace adds to the bill, so cost grows with success and is hard to forecast. Akka charges a flat annual fee, known in advance, and extra use adds only the hardware it runs on."

**4.1 What it runs on (26 s, 65 words). Infrastructure.** Two stacks. Hyperscaler: compute, storage and network priced near cost; six metered managed services above them (agent runtime per vCPU-hour, memory per GB and retrieval, gateway per tool call, observability per GB ingested, evaluations per token, policy per decision), priced with a margin, where most of the bill is. Akka: the whole stack in one box (inference, AI controls, model routing, SLM training, agent execution, memory and state, workflows, messaging, gateway, governance, observability, evaluation), each lit as it is named, on the same lowest layer, and only that layer bought.
- "Akka runs the whole stack on the lowest-priced hardware: compute, storage and network. Inference, AI controls, model routing, small language model training, agent execution, memory, workflows, messaging, gateway, governance, observability and evaluation all run there. Hyperscalers take their margin above that layer, on metered managed services: agent runtime, memory, gateway, observability, evaluation and policy, each billed by the unit. That is most of the bill."

**5.1 How well the code uses the hardware (29 s, 69 words). Infrastructure.** A note on interpreted languages while the first sentence is read, then the runtime animation: sixty-four sessions as actors on a grid with four of sixteen cores busy; the kinds of actor listed as they are named; the actors regroup into four nodes that own key ranges; a node leaves and its actors settle on the other three while the last sentence is read, and the finished state holds before the cut.
- "Interpreted languages carry a memory overhead for every session, and their concurrency models limit how many run on a node. Akka runs each session as a small actor, so one node holds many waiting sessions. Sessions, agents, evaluations, guardrails, workflows, endpoints, data queries and timers all run as actors. A cluster spreads them by key and rebalances when a node leaves. No state is lost, and the sessions continue."

**6.1 Layers that share one runtime (19 s, 51 words). Infrastructure.** Left: five separately assembled frameworks, each a box with the part in use filled and the headroom hatched. Right: everything that runs as an actor inside one Akka runtime with one fill and no hatched space.
- "Assembled frameworks are allocated and managed separately, each keeping its own headroom, which is paid for and unused. In Akka, everything that runs as an actor shares one compute model: agents, evaluations, guardrails, workflows, endpoints, data queries and timers draw on one pool, so capacity goes to whichever part needs it."

**6.2 Memory (20 s, 50 words). Infrastructure.** Left: an entity whose changes append to a journal, its state cached in memory, and a recovery arrow from the journal to the cache. Right: two regions, both active, replicating both ways; "Short" recovery time and recovery point; "Low single-digit ms" reads and writes. The word is always "journal". The measured recovery figures are in 2.1 only.
- "Akka’s memory uses event-sourced entities: every change is recorded in a journal, and all data is cached in memory. A system recovers from the journal, runs active in two regions at once with a short recovery time and recovery point, and reads and writes AI memory in low single-digit milliseconds."

**7.1 Integration (23 s, 56 words). Integration.** Left: ten separate products as the layers of a cake, each its own colour, wired together by a dense bundle labelled integration work. Right: one slice through the whole cake, every layer in one piece and already joined; training, agent execution and memory light as they are named. Beside it the nine licence types not retained, each lit as it is named.
- "Hyperscalers sell these functions as separate products, each its own layer, and the customer pays to wire them together. Akka ships the whole stack as one piece, already joined, including training, agent execution and memory. No licences to retain for event streaming, a cache, messaging, workflow orchestration, a gateway, AI governance, observability, evaluation or red teaming."

**8.1 Model spend (33 s, 83 words).** Cost per token drawn falling over six months, landing on Akka's own 73% (the one number on the screen). Beside it the six things that move cost per token; under both, the avoidable cost the console finds; then the two rules. No tokenomics sample figures.
- "Model spend is its own cost area. Cost per token moves with volume, model mix, prompt size, cache use, response size and price. The console finds avoidable cost: prompts that skip the cache, failed attempts, duplicate requests, reasoning above the median, unused tool definitions, answers longer than needed. A cheaper model is proposed only when it meets the owner’s quality bar, and the ledger keeps the estimated saving beside what was measured. Over six months, Akka’s own cost per token fell seventy-three percent."

**9.1 Specify: who can take part (24 s, 58 words). People.** Left: requirements in the form they already exist in (hand drawing, spreadsheet, issue list, broad description), each lit as named, with rails into one specification at the centre (what the system is for; architecture, exit conditions, definition of done). Right: engineers, ML engineers, product managers, analysts and executives, each lit as named, with rails into the same specification. Under it the tie to the People cost.
- "Specify accepts requirements as they already exist: hand drawings, spreadsheets, issue lists and broad descriptions. Engineers, ML engineers, product managers, analysts and executives all take part in writing the specification. The people who know the business contribute to the system directly. Each requirement is captured by whoever holds it, so fewer handoffs sit between the business and the engineer."

**9.2 Specify: built the same way, read the same way (25 s, 64 words). People.** Three specifications (what it is for; architecture, exit conditions, definition of done), each with its generated system; the three systems are the same four layers in the same order. The purpose line lights in each specification as "written" is spoken; an engineer arrives at one system and reads its specification.
- "Specify builds every system on a standard architecture from a specification that holds its purpose, exit conditions and definition of done. Every system is built the same way, so it can be read the same way, and what it is for is written in the specification. An engineer who has never seen a system finds its purpose in the specification, not in the code."

**9.3 Specify: the knowledge stays with the system (17 s, 37 words). People.** The specification and Akka's context above five services with their engineers. One engineer leaves and the service stays as it was; the context ticks to a new version and a pulse re-aligns every service; the engineers fold to one.
- "When a key engineer leaves, the knowledge stays with the system. Akka’s context holds current best practice, and Specify re-aligns existing systems as it changes, so technical debt does not build up. Fewer engineers maintain more systems."

**10.1 The claim, again (24 s, 59 words).** The seven mechanisms light in a row as each is named; the four cost areas from the opening return, all lit and joined by one rail; the claim is restated in the opening's words; the licence statement.
- "A flat fee, the lowest-priced hardware, an efficient runtime, shared compute, an integrated stack, lower model spend and spec-driven development add up. The fully loaded cost of an AI system on Akka is a fraction of the cost on a hyperscaler or an assembled open-source stack. No additional licences are needed to design, build, test, run or govern AI systems."

**10.2 The final slide (13 s, 27 words).** The AKKA mark, large and centred, and the call to action under it; nothing else. Held to be read. The contact route is left out, to be added.
- "Bring one AI system you run today, and we will compare its fully loaded cost on Akka against your current stack, covering infrastructure, licences, integration and people."

## Evidence status for each claim

| Claim | Basis today | Needs before recording |
|---|---|---|
| Fully loaded cost a fraction of a hyperscaler or open-source stack | Tyler's statement; no ratio is stated | A worked comparison that adds the areas (a reference system priced on a hyperscaler stack, an open-source stack and Akka). Research pending |
| Flat annual fee against consumption pricing | Tyler's statement of Akka's pricing | Confirm the fee is flat for the unit being compared (cluster size, not usage) |
| The whole stack on commodity hardware; hyperscalers carry margin on metered managed services | Tyler's statement; the billing units are typical of the category, not one vendor's price list | Public list prices of the managed agent runtime, memory, gateway, observability, evaluation and policy services against the compute they run on |
| Interpreted languages: memory overhead, limited concurrency | Tyler's statement | Public benchmarks for per-session memory and concurrency, one named source |
| Shared compute against separately allocated layers | Tyler's statement; Akka runtime documentation | A figure for typical headroom per layer, or the claim stays qualitative |
| Memory: journal, cache, active-active, low single-digit ms | Tyler's statement; Akka runtime documentation | Engineering confirmation of the latency statement as worded |
| Integration cost on hyperscalers | Tyler's statement | Qualitative is acceptable; no number stated |
| Model spend: drivers, avoidable cost, quality bar, ledger | Tyler's tokenomics design (`demo/tokenomics`) | Nothing further; no sample figures are shown |
| Specify: who can take part; requirements in their existing form | Tyler's description | Nothing further; no figures |
| Dojo, major bank, Manulife, Verizon, APAC bank, Akka 73% and 4.3 | Tyler, 2026-11-09; stated as the customers' own | Nothing further; public citations are not needed (Tyler, 2026-11-09) |
| Fox: 150,000 to 22,000 cores, about 40% lower cost per session, 3x velocity | `research/roi-7-proof.md`: akka.io customer story, Akka-authored, undated | Stated as the customer's own per Tyler's direction; the research note records that no Fox speaker is tied to the numbers |
| Swiggy: P99 144 ms to 71 ms, over 5,000 predictions a second on one model | `research/roi-7-proof.md`: Swiggy engineer's post, 2024-02-29 | Nothing further |
| Re-alignment to best practice | Tyler's description | Engineering confirmation of the mechanism |

## What changed from v1

- The film opens on the claim and names the cost areas first, with no signposting; it no longer opens with "five sources of return".
- The claim is stated without a ratio ("a fraction"), by Tyler's decision of 2026-11-09.
- The proof section follows the claim directly, then a one-line question ("How did Akka achieve these results?") leads into the argument.
- Added: flat fee against consumption, the whole stack on the lowest-priced hardware against metered managed services, language and memory overhead, shared compute for everything that runs as an actor, a memory scene, the cake-and-slice integration drawing, model spend with the tokenomics mechanics, and who can take part in Specify.
- Specify has three scenes: who can take part, built and read the same way, the knowledge stays with the system.
- Fox and Swiggy added as proof cards; cards appear one at a time in Tyler's order.
- The closing restates the claim with the cost areas lit and joined; a separate final slide holds the AKKA mark and the call to action.
- The talk track was tightened for the voice (about 2.9 words a second, 0.7 s sentence pauses, 1.0 s tails) by shortening sentences and removing repeats; every point stays.
- No dollar figures anywhere; the integration scene lists the licence types only.
