# Tokenomics in Akka: storyboard

**What this is:** Tyler wants an advanced, animated demo of about five minutes that covers all of the
console's tokenomics capabilities, connects them to the big picture, and has the polish of the other films
(the main mock film and the Proposal Review Panel film). The emphasis is on the questions an
executive asks and how the product itself answers each one. Tyler's voice and the audio transitions are part
of it.

- **Screens: hybrid.** The HTML animatic frames the opening, each executive question, the big picture and the
  close. The Cost screens are real console captures from demo mode, shown in the console's own browser frame,
  with the film's cursor, spotlight and camera moving over them. A screen with a known defect is drawn as a
  mock instead.
- **Voice: yes, Tyler Pro, but only after he approves the script.** No ElevenLabs call and no placeholder
  audio until then.
- **Audience: executives, customer-neutral.** No customer names in the shared file.

**Visual language:** pure black, one yellow `#FFCE4A`, Instrument Sans 700 tracked tight for titles; uppercase
eyebrows with no rule beside them; the faint 48 px yellow dot grid; hairline cards with even borders (never a
one-sided accent border); rise-in reveals, line draws, count-ups, dashed flow rails with moving work. Status
colours only for status: cyan `#00DBDD`, green `#72D35B`, red-orange `#FF5400`. Mono only for code and
identifiers. No chapter numbering. No rule bars beside words. Few, large elements per frame. The subject of the
current sentence glows; everything else steps back.

**The idea:** **Every question an executive asks about AI spend is answered inside the product.** Each scene
opens with the executive's question in large type, then the product answers it on a real screen. Cost is one
part of one loop: a change is specified, built, verified, then run on the right model, with one evidence record
behind every decision. The film opens on that pressure and closes back on the loop.

Why this works: the question is the unit of the film. An executive recognizes their own question, sees where it
is answered, and sees that the answer is not a new report but part of the same system that governs the change.

**Length:** target 4:56 plus chapter cards; narration at 2.2 words a second. Total about 296 s of scenes plus
four chapter cards of 2.6 s each. About 470 spoken words; the voice fills roughly two thirds of the film, and the
rest is picture, music and tails.

Figures are from the seeded fixtures and are placeholders until the screens are captured. Every number spoken
is checked against the captured screen before the voice is generated. Every console scene carries the chip
"Sample system and data".

---

## Opening (0:00 to 0:30)

**0.1 The pressure** (14 s)
- **Visual:** Black. The cost of intelligence falls ten times a year while a demand curve draws above it and
  keeps climbing. The gap glows yellow.
- **Narration:** "The cost of intelligence falls ten times a year. Demand rises faster. So executives keep
  asking the same questions about where the money goes."

**0.2 Seven questions** (16 s)
- **Visual:** Dot grid. The title rises: "Tokenomics" with "in Akka" on the second line in yellow (eyebrow "THE
  AGENTIC AI PLATFORM", AKKA mark lower left). Seven question cards fall into a row, each with a small icon of the
  screen that will answer it.
- **Narration:** "Those answers shouldn’t live in a spreadsheet someone builds later. In Akka they sit right
  next to the system. Here are seven questions, in the order a finance leader asks them."

## Chapter card 1: "What did we spend?" (2.6 s, whoosh)

**1.1 "What did we spend, and are we on plan?"** (20 s)
- **Visual:** Cost Overview capture. The four cards in turn: Cost to date, Projected cost at period end against
  the owner's budget, Realized savings, Potential savings. Spotlight and count-ups on each.
- **Narration:** "The Overview starts with four figures: cost to date, the projected cost at period end against
  the owner’s budget, realized savings, and potential savings. Click one, and you are in the analysis behind
  it."

**1.2 "Where did the money go?"** (20 s)
- **Visual:** Costs capture, grouped by use case, then the model-by-team matrix. The address bar shows the saved
  setup.
- **Narration:** "Costs breaks the same money down by use case, model, team, app, or any tag. The whole setup
  lives in the address, so a finance lead can bookmark it. And usage without a price is footnoted, never
  hidden."

**1.3 "What changed since the last period, and why?"** (30 s)
- **Visual:** Costs with Compare on: the statement table, then the bridge drawing as steps that add to the cent
  (volume, model mix, prompt size, cache use, response size, price). Camera pushes into the use case whose cost
  nearly tripled; its prompt share falls.
- **Narration:** "Compare two periods and it reads like a financial statement. Cost rose by one hundred four
  dollars and seventy cents, and the bridge shows why: volume, model mix, prompt size, cache use, response size
  and price. The pieces add up to the cent. And one use case, ticket triage, nearly tripled after a model
  change."

## Chapter card 2: "What can we save?" (2.6 s, whoosh)

**2.1 "What is avoidable?"** (22 s)
- **Visual:** Savings capture: the six kinds of avoidable cost, each current against prior period, then one
  opportunity row opening its facts tray (the refund agent's cache prefix, a saving range, quality risk none, the
  evidence).
- **Narration:** "Savings finds avoidable cost: prompts that skip the cache, failed attempts, duplicate
  requests, reasoning above the median, unused tool definitions, and answers that run long. Each opportunity
  shows a saving range, its quality risk, and the evidence behind it."

**2.2 "What would this traffic cost on another model?"** (20 s)
- **Visual:** The "Cost if served on another model" menu, then Prices: a proposed list previewed model by model
  as increase or (decrease).
- **Narration:** "Pick a model and the console prices the period’s real traffic on it. A new price list works
  the same way: you see the effect, model by model, before anything is published."

**2.3 "If we move, does quality hold?"** (32 s)
- **Visual:** A use case's frontier panel: the cost-against-pass-rate chart, the candidates table (Meets the bar,
  Below the bar, Not enough evidence), the quality-bar dialog (reference model, judge, tolerance, hard gates). A
  small tag shows the gate coming from Verify. The proposed change appears.
- **Narration:** "For each use case, the frontier plots cost against pass rate. The owner sets the quality bar:
  a reference model, a judge, a tolerance, and hard gates that come from Verify. A cheaper model is only
  proposed when it clears the bar. Here the smaller model costs under a fifth as much and passes at ninety point
  two percent against ninety-one point six."

## Chapter card 3: "Decide, and prove it" (2.6 s, whoosh)

**3.1 "Who decides, and when does it stop?"** (24 s)
- **Visual:** The change page: the preview on recorded traffic, then the staged rollout bar, the stop rule set in
  advance, and Continue / Keep recording who and why.
- **Narration:** "A change is tried on recorded traffic first, then staged. The owner sets the stop rule in
  advance, so a failing rollout halts on its own, and nobody gets paged. Continue and Keep each record who
  decided, and why."

**3.2 "Did the saving happen?"** (18 s)
- **Visual:** The ledger: estimate range beside realized per day. Four rows landed within the estimate; one row fell short
  and its status says so.
- **Narration:** "The ledger keeps the estimate next to what was actually measured. Four changes landed within
  their estimates. One fell short, and the ledger says so."

## Chapter card 4: "Stay in control" (2.6 s, whoosh)

**4.1 "Are we on plan?"** (28 s)
- **Visual:** Budgets: owner, plan to date, variance, forecast range, the day it runs out; a budget's page with
  the burn-and-forecast band; the thresholds notify, reroute, block, with the demo chip on the actions.
- **Narration:** "Every budget has an owner, a plan to date, and a forecast with its range, and it names the day
  the money runs out. The owner sets the thresholds in advance: notify, reroute, or block."

**4.2 "Does self-hosting pay, and do the prices match?"** (18 s)
- **Visual:** A self-hosted model's Hosting section: assigned price, utilization, break-even; then the Prices
  cards with "Not costed".
- **Narration:** "If you host a model yourself, the worksheet gives you an assigned price, utilization, and
  break-even. And Prices shows what is in force and what is not costed, so every figure traces back to a price."

## Close (4:40 to 4:56)

**5.1 One loop** (14 s)
- **Visual:** The "change travelling safely" loop from the main film: Specify, Agent SDK, Verify, Optimize on one
  rail labelled "one definition, one runtime, one evidence record". The cost scenes light up on the Optimize card,
  the quality gate on Verify.
- **Narration:** "Cost is one part of one loop. A change is specified, built, verified, and run on the right
  model, with one evidence record behind it."

**5.2 Answers** (10 s)
- **Visual:** The seven questions return, each now with the name of its screen in yellow. Hero: "Scale AI,
  Efficiently." AKKA mark.
- **Narration:** "Seven questions, answered where the work happens."

---

## Honesty and wording rules (apply to every scene)

- Money wording: Cost = spent, Potential, Projected only for the budget forecast, Realized, "If", Avoidable cost,
  financial-statement comparisons with (parentheses). Never "waste", "burn rate" as a label, or provider invoices.
- No claim of enforcement in production. The console monitors burn and forecast from shipped data; actions are
  shown with the demo chip. Do not claim anything on the do-not-claim line of `demo/talk-v2/BRIEF.md`.
- No customer claims from `research/efficiency-numbers.md` (marked unverified), no "70 to 90%", no named
  customers.
- Describe people by what they are (the owner, the finance lead). Complete plain sentences, no selling, never
  "event store" or "design target".
- Fixture dates are October 2026 and today is November 2026: reseed and capture so the periods are consistent,
  and never film the pages with the known defects (budget-period mismatch on Overview and Budgets, mixed dollar
  precision on Overview, the 754 px overlap).
