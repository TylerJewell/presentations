# Akka total ROI: storyboard (2:30)

**What this is:** the plan for an animated film of 2:30 that states Akka's total return. It walks through five sources of return in one fixed pattern and ends on a combined total. It makes no argument: each item says what it changes, how it is measured, and what that is worth. Specify is told in two beats, delivery and maintenance, because spec-driven delivery changes the cost of keeping a system, not only the speed of building it. Runtime is drawn as a mechanism in four animated beats, because the reduction in infrastructure cost comes from how the runtime works. Built on the same engine and pipeline as "Tokenomics in Akka" (the animatic player, the shared library, Tyler Pro, the sentence-level voice with breath conditioning). Figures, sources and open items: `demo/roi/proposal.md` and `demo/roi/research/`.

**Visual language:** the akka.io look used in the other films: pure black, one yellow `#FFCE4A`, Instrument Sans 700 tracked tight, uppercase eyebrows with no rule beside them, the faint 48 px dot grid, hairline cards with even borders, rise-in reveals, count-ups, line draws, dashed flow rails with moving work. Status colours only for status. Few, large elements per frame; one idea per scene.

**The idea:** one pattern, five times. Every item has the same three rows, in the same place, so the viewer learns the layout once:

| Row | Says |
|---|---|
| **What it changes** | the mechanism, one sentence |
| **How it is measured** | the unit, and what a customer recorded; Akka is its own customer |
| **What it is worth** | the saving, as a range, in the reference estate |

The spoken line carries what it changes, the result and the worth; the measure sits in the second row on screen. A small label beside each figure names its kind: **CUSTOMER-MEASURED**, **PUBLISHED**, **MODELLED** or **ILLUSTRATION** (a drawing of a mechanism, with no measured values). Modelled figures show their inputs.

**The reference estate** is one card, shown at the start and used by every item, so the figures add. The inputs do not overlap:

| Input | Value |
|---|---|
| Services delivered or modernized a year | 5, each about 21,000 lines |
| Services in maintenance | 20, today one engineer each, at $200,000 a year fully loaded |
| Compute on Python, JavaScript or Go services | 1,000 vCPU at $0.04 a core-hour |
| Cloud services other than that compute (storage, networking, managed services, resilience) | $1,500,000 a year |
| Annual model spend | $6,000,000 |
| Monthly volume for the licensed tools | 3M gateway requests, 3M traces, 30M workflow actions |

**Voice and timing:** Tyler Pro, one clip per sentence, each conditioned to remove the breath at entry and exit. The pause between sentences is 1.2 s and the tail after each line is 1.5 s. Narration is about 290 words.

**Naming:** Dojo, Manulife and Verizon are named as text on statement cards, with no logos. The Canadian bank and the Asia-Pacific bank are not named and are described only as below.

**Timeline:** 7 + 40 + 30 + 22 + 18 + 13 + 13 + 6 = 149 s.

---

## Scene 0 · Overview (0:00–0:07)

**0.1 The estate** (7 s)
- **Visual:** black. The title rises: "Akka total return", with "five sources" in yellow. Five unfilled bars sit at the foot. The reference-estate card fades in at the right; each of its inputs counts up to its value.
- **Narration:** "Akka's return comes from five sources. Each one is shown by what it changes, how it is measured, and what it saves."

## Scene 1 · Specify (0:07–0:47)

**1.1 Delivery** (13 s)
- **Visual:** the three-row layout draws in, "Specify" at the top left, the first foot bar lit. Row one: four steps on one rail, specify, build, test, release. Row two, "how it is measured": "engineer-hours and calendar time per service", then two statement cards. The first: "Dojo, Britain's largest payments provider: recent college graduates delivered a regulated AI system in a few weeks." (CUSTOMER-MEASURED). The second: "A major bank: retained Akka to modernize core payments that are decades old. Delivery in a couple of months." (CUSTOMER-MEASURED; stated as delivered). Row three: "5 services a year" and a bar that fills to "$0.67M to $2.44M" (MODELLED), with the inputs shown: "$354k to $707k by hand against $14k to $57k with Specify; human hardening four times longer in the low case."
- **Narration:** "Specify. It specifies, builds, tests and releases services on a standard architecture. At Dojo, Britain's largest payments provider, recent college graduates delivered a regulated AI system in a few weeks."

**1.2 Maintenance** (27 s)
- **Visual:** the stage is one drawing in four short moves; the three-row layout returns for the last move. Everything is an ILLUSTRATION until the final move.
  - **The specification holds the knowledge (0:20–0:27).** One specification card at the centre, with findings, decisions and concepts listed in it; code, tests, documentation and the architecture drawn from it on four rails. Next to it, a second card, "Akka's context: current best practice".
  - **No one is the only owner (0:27–0:33).** A row of five engineer silhouettes beside five services. One silhouette fades; its service stays lit, and a new silhouette arrives and the service stays unchanged.
  - **Best practice changes, every system follows (0:33–0:40).** The best-practice card ticks to a new version. A pulse leaves it and passes through each service built from a specification; each service briefly outlines, regenerates and settles, with its tests passing. The label beside it: "Specify re-aligns systems as best practice evolves."
  - **One engineer, more services (0:40–0:47).** The silhouettes and services regroup: one engineer, one service, then one engineer carrying four and a bit, as the count steps "1" to "4.3" (CUSTOMER-MEASURED: "Akka, as its own customer: over the last year, the average engineer went from maintaining 1 service to 4.3 at once, where a service is a product or system that previously needed a team to manage"). Then the three-row layout: "20 services in maintenance, one engineer each at $200,000", and a bar filling to "$2.0M to $3.1M a year of engineering capacity" (MODELLED: 2 to 4.3 services an engineer, freeing 10 to 15 engineers), the formula shown.
- **Narration:** "The specification holds what each system is for, and Akka's context holds current best practice. When practice changes, Specify re-aligns every system built from its specification, and the knowledge stays with the system, not with one person. At Akka, an engineer went from maintaining one service to four point three. For twenty services, that is two to three million dollars of engineering capacity a year."

## Scene 2 · Runtime (0:47–1:17)

The animation is the point of this scene. It draws how the runtime works, in four beats, and ends on the cores it saves. Everything drawn is an ILLUSTRATION (a mechanism, with no measured values) until the last beat, where the numbers are the estate's inputs and the customer's results.

**2.1 An actor for each session** (0:47–0:55, 8 s)
- **Visual:** one large stage; the second foot bar lights. A grid of 64 small cubes, one for each session; each cube is an actor with its own state, drawn as a tiny stack inside it. Most cubes pulse softly, waiting on a model; a few flash bright in turn as they process a message. At the right, a meter shows "64 sessions" and "4 cores busy": four core icons lit out of sixteen. A new request arrives as a dot and lands in an idle cube without a new core lighting.

**2.2 A cluster of nodes** (0:55–1:02, 7 s)
- **Visual:** the cubes regroup into four rounded boxes in a ring, the nodes, joined by dashed rails with moving work between them. One node is struck with a red-orange cross; its cubes lift out as a stream of dots, travel along the rails and settle on the three other nodes within one beat. A caption beside it: "no state lost". This reuses the "Start, Scale, Recover" replica sequence from the main film (`demo/mock` scene 1.2).

**2.3 Sharding by key** (1:02–1:08, 6 s)
- **Visual:** each cube carries a key, drawn as a hue along a ring; the ring is divided into shards, each owned by one node. Traffic arrows thicken as load rises; a fifth node joins, and a few shards slide to it along curved paths while the per-node utilisation bars even out.

**2.4 The same traffic on fewer cores** (1:08–1:17, 9 s)
- **Visual:** the three-row layout returns. Row one: a column of eight core icons beside a yearly cost meter reading "$350,400" (1,000 vCPU at $0.04 a core-hour, MODELLED); the cores dim in pairs down to four and to two while the meter counts down to "$175,200" and "$87,600". Row two: a statement card, "Manulife ported all of its Python AI systems" (CUSTOMER-MEASURED), with three count-ups: "99.98% fewer errors", "300% more concurrency", "80% better end-user latency". Row three: the bar fills to "$175k to $263k a year" (MODELLED), "50% to 75% fewer cores".
- **Narration (whole scene):** "Runtime. Akka keeps each session as an actor, and a cluster spreads actors across nodes by key, moving them if a node leaves. Manulife ported all of its Python AI systems: errors fell ninety-nine point nine eight percent, concurrency rose three hundred percent, and latency improved eighty percent. At a thousand cores, that is one hundred seventy-five to two hundred sixty-three thousand dollars a year."

## Scene 3 · Cloud infrastructure (1:17–1:39)

**3.1 Cloud infrastructure** (22 s)
- **Visual:** the three-row layout, third bar lit. Row one: two regions on a map outline with one rail between them. Row two, "how it is measured": "infrastructure and cloud cost; recovery time", then two statement cards. "Verizon: a 70% drop in infrastructure and cloud costs with Akka's platform." (CUSTOMER-MEASURED). "A top-three Asia-Pacific bank: deployed in two regions for high availability and disaster recovery. Recovery time objective: 8 hours to 5 minutes." (CUSTOMER-MEASURED; the two numbers count down). Row three: "$1,500,000 a year of cloud services" and a bar filling to "$750k to $1.05M a year" (MODELLED), "50% to 70%".
- **Narration:** "Cloud infrastructure. Verizon reports a seventy percent drop in infrastructure and cloud costs, and a top-three Asia-Pacific bank cut recovery time from eight hours to five minutes. On one point five million dollars of cloud services, that is seven hundred fifty thousand to one point oh five million."

## Scene 4 · Optimize (1:39–1:57)

**4.1 Optimize** (18 s)
- **Visual:** the three-row layout, fourth bar lit. Row one: a request flow with four marks on it, "multi-model routing", "decision models", "small language models, self-hosted", "priced per request". Row two, "how it is measured": "cost per token", then a statement card, "Akka, as its own customer: cost per token down 73%" (CUSTOMER-MEASURED), the 73% counting down on a bar. Row three: "$6,000,000 a year" and a bar filling to "$0.87M to $4.38M" (MODELLED), "14.5% to 73%", the low case labelled "modelled low case" and the high case "measured at Akka".
- **Narration:** "Optimize. It routes across models, integrates decision models, and runs small language models in-house. At Akka, cost per token fell seventy-three percent, which is eight hundred seventy thousand to four point four million dollars on six million of model spend."

## Scene 5 · Licences (1:57–2:10)

**5.1 Licences** (13 s)
- **Visual:** the three-row layout, fifth bar lit. Row one: tiles, event journal, cache, messaging, workflows, gateway, AI governance, observability, evaluation, red teaming, drawn inside one frame. Row two, "how it is measured": "the list price of the tools each one covers", with a short price strip (each product with its list price and the date it was read). Row three: a bar filling to "$0.20M to $0.73M a year" (MODELLED), the inputs shown: "list prices: $29k to $62k; evaluation and guardrail tooling: $0.5M to $2M over three years".
- **Narration:** "Licences. Akka includes governance, observability, evaluation and red teaming. For this estate, that is two hundred thousand to seven hundred thirty thousand dollars a year."

## Scene 6 · Total (2:10–2:23)

**6.1 Combined total** (13 s)
- **Visual:** the five foot bars rise into one table at the centre, one row per line with its low and high, in the order of the film (Specify appears as two lines, delivery and maintenance); each value counts up as its row appears. The sum row draws last: "$4.7M to $11.9M a year". A line under the table states the arithmetic: "Low column: the sum of the low cases. High column: the sum of the high cases. Delivery effort, maintenance capacity, compute, cloud services, model spend and licences are separate cost lines." The estate inputs sit at the right, each with a small slider handle drawn on it.
- **Narration:** "Total. For this estate, the five sources add up to four point seven to eleven point nine million dollars a year. Every input can be changed."

## Scene 7 · Close (2:23–2:29)

**7.1 The objective** (6 s)
- **Visual:** the table steps back and one line holds at the centre: "No additional licences to design, build, test, run or govern AI systems." The AKKA mark sits lower left.
- **Narration:** "No additional licences are needed to design, build, test, run or govern AI systems."

---

## Combined table

| Line | Low | High |
|---|---|---|
| Specify, delivery (5 services a year) | $0.67M | $2.44M |
| Specify, maintenance (20 services) | $2.00M | $3.07M |
| Runtime | $0.18M | $0.26M |
| Cloud infrastructure | $0.75M | $1.05M |
| Optimize | $0.87M | $4.38M |
| Licences | $0.20M | $0.73M |
| **Total** | **$4.67M** | **$11.93M** |

## How the maintenance animation is built

- The specification card, the engineer silhouettes, the service tiles and the best-practice card are shared parts. A service tile has a fixed identity across all four moves, so the viewer sees the same services re-aligned, not four pictures.
- The re-alignment pulse is one traveling highlight along a rail through every service; each tile outlines, flickers once as it regenerates, and returns to its settled state with a small check for its passing tests. It is drawn as a mechanism and labelled ILLUSTRATION.
- The count from 1 to 4.3 is the one measured value in the drawing (CUSTOMER-MEASURED: Akka is its own customer); the dollars are the estate model.

## Production notes

- **Scene types:** scenes 0, 3, 4, 5, 6 and 7 are the three-row animatic with no console footage. Scenes 1.2 and 2 are animations. The three-row layout, the label chips, the estate card and the combined table are shared pieces in one library (`lib/roi.js`).
- **Chapter cards:** none. The foot strip of five bars does the job a card would do.
- **Figures check:** a script compares every number in the narration with the figures file for the film, as in "Tokenomics in Akka", and blocks the voice step on a mismatch. Each figure carries its source, its date and its label in the file.
- **Voice:** one clip per sentence. Voice generation happens only after Tyler approves the script, and the voice id is passed per run.

## Open items before recording

See `demo/roi/proposal.md`. In short: the estate's $1.5M cloud-services input, the 20 services in maintenance and the $200,000 loaded cost are assumptions Tyler sets; the Manulife figures differ from the public Manulife page; the Verizon 70% and the Akka 73% need their source and date confirmed; the licence range uses Akka's April 2026 modelled evaluation and guardrail tooling figure; Answered 2026-11-09: Akka 73% is the last six months of this year; Verizon 70% is this year; Manulife and Dojo are cleared to name; the major-bank delivery is stated as having happened; a service is a product or system that previously needed a team. For Specify: the 1 to 4.3 services per engineer needs its period, how a service and "maintaining" are counted, and the headcount behind the average; and the best-practice re-alignment is stated as Tyler described it, so engineering confirms the wording. For the runtime animation: engineering confirms the mechanism wording before the voice is generated.
