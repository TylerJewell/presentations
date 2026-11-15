# Akka Optimize demo: script, draft 1

**The video:** 5:00 in total. Tyler's slides take 0:00–1:30; the live demo takes 1:30–5:00.
**Narration:** Tyler's Professional voice clone, in the first person.
**Captions:** a short headline, plus one line that says what to look at, while the voice carries the explanation.
**Data:** the Loan Origination Assistant demo system, for the seven days ended on the recording date.

Each scene below gives the narration (what Tyler's voice says), the caption (on screen), and the actions
(what the recording does). Time is set by the narration, so the timings are estimates. Edit anything:
the words, the order, or the scenes themselves.

---

## 0 · Slides (0:00–1:30), Tyler presents

Company and product overview. The last slide hands over: *"Let me show you what that looks like."*

---

## Chapter 1 · Now: what needs attention (1:30–2:00)

**1.1 Now**
- **Narration:** "This is the Akka console, open on one of our customers' agentic systems: a loan origination
  assistant. Before anything else, it tells me what needs my attention across the whole system: agents calling
  models directly, a budget at risk, conversations ending in errors."
- **Caption:** Now · Everything that needs attention, across the system
- **Actions:** open Now; highlight the attention list; hover the top row.

## Chapter 2 · Put the traffic on the gateway (2:00–2:40)

**2.1 Gateway coverage**
- **Narration:** "Optimize starts with one gateway for every model call. Coverage shows which agents use it, and
  which still call a model directly, so nothing escapes the cost and quality picture."
- **Caption:** Inference › Gateway · Which agents call models through the gateway
- **Actions:** Inference › Gateway; highlight the coverage table; sort by Direct.

**2.2 Connect**
- **Narration:** "Moving an agent onto the gateway is one configuration change. The console gives you the exact
  block for an Akka agent."
- **Caption:** Connect · One change puts an agent on the gateway
- **Actions:** click Connect on a "Last called directly" row; highlight the Akka agent code.

## Chapter 3 · Where the money went (2:40–3:40)

**3.1 Costs**
- **Narration:** "Now cost. This is what the AI system cost this week against last week, from every call through
  the gateway, laid out like a financial statement."
- **Caption:** Cost › Costs · This week against last, from every gateway call
- **Actions:** Cost › Costs; highlight the cards.

**3.2 Where the money went**
- **Narration:** "Every use case, prior period against current. I sort by the change to see what moved, and I can
  download the whole table as a spreadsheet for finance."
- **Caption:** Where the money went · Sort, filter, and download for finance
- **Actions:** highlight the table; sort by % Change; hover Download CSV.

**3.3 Open a use case**
- **Narration:** "Opening a use case shows which models drove it."
- **Caption:** Open a row · Its cost by model
- **Actions:** open the top row; highlight its breakdown by model.

**3.4 Footnotes**
- **Narration:** "And the figures are qualified the way an auditor would expect: what's preliminary, and what's
  excluded."
- **Caption:** Footnotes · What the figures leave out
- **Actions:** highlight the footnote bar; open the Preliminary note.

## Chapter 4 · Spend less without losing quality (3:40–4:20)

**4.1 Price on another model**
- **Narration:** "Here's where it pays for itself. I can price this week's traffic on a cheaper model and see the
  difference before I change anything."
- **Caption:** Cost if served on another model
- **Actions:** open Price on another model; choose frontier-mini; highlight the If column.

**4.2 Propose a change**
- **Narration:** "If it holds up, I propose it as a change. Optimize trials it against real traffic and checks
  quality before anything rolls out."
- **Caption:** Propose a change · Trialled and checked before it rolls out
- **Actions:** Preview as a change; highlight the cost and quality panels.

## Chapter 5 · Every agent run, end to end (4:20–4:45)

**5.1 Traces**
- **Narration:** "And when I need the detail, every agent run is here. Sorted by cost, the expensive ones come to
  the top, and each one shows the steps, the models, and what every call cost."
- **Caption:** Activity › Traces · Every run, end to end
- **Actions:** Activity › Traces; sort by Cost; open the top run; highlight the waterfall.

## Chapter 6 · Governed (4:45–5:00)

**6.1 Controls and evidence**
- **Narration:** "All of it governed: the controls in force, and the evidence that they hold. That's Akka Optimize."
- **Caption:** Controls and Evidence · What's in force, and the proof it holds
- **Actions:** Controls, then Evidence; highlight the verdicts; end card.

---

## Open questions for Tyler

1. Is the length right, at 5:00 with the demo at 3:30?
2. Is the audience right: platform leader first, with a CFO angle on cost?
3. Chapter 4 (price on another model, then propose a change) is the strongest "it pays for itself" moment. Should it
   come earlier, straight after Now?
4. Should anything be dropped to make room, e.g. Chapter 6, or Connect (2.2)?
