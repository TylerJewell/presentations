# Experiments in 90 seconds: storyboard

**What this is:** the first film in the snippet series ([../README.md](../README.md)), as a playable HTML
mock (`index.html`) with the narration shown as captions and no voice yet. It runs 89 seconds.

**The buyer:** the head of an AI platform team, or the owner of an AI system, who pays a frontier model's
price for every call and knows that most calls don't need it. Their fear isn't the cost. It is the change:
switching models is a bet on quality they can't see until customers do.

**The promise, in one line:** every model change earns its way into production, measured against limits you
set and decided by a person.

**What the buyer should remember:** one view carries a change from idea to production (the loop), your limits
never move (the board), a crossed limit is handled the way you chose in advance (the hold), and a person
promotes it (the decision).

**The system and its figures** are the film's, so the two never disagree:

| | |
|---|---|
| Experiment | Smaller model for underwriting, exp-142 |
| Change | frontier-large to underwrite-4b, judged by underwriting-quality v3 |
| Limits | Quality at least (3.0%), Cost per call at most (40.0%), Latency p95 at most 150 ms, Errors at most 0.5 pt |
| Segments | Region: US, UK, DE, FR |
| Breach choice | Breaching segments to baseline |
| Result | Cost per call $0.031 to $0.009, a (71%) change; quality (1.2%), within its limit |
| Budget | $40 |

---

## Where it lives (0:00–0:14)

**E1 One platform, one part** (14 s)
- **Visual:** the film's family diagram builds fast on the dot grid: Specify, Agent SDK, Verify, Optimize on
  the spine, with the shared rail under them. Each card glows as it's named. The camera pushes into Optimize,
  and the other three cards fall away into the dark. Optimize's card opens into its capabilities, a row of
  five tiles: Gateway, Models, Routing, Experiments, Playground. Experiments lights yellow and the other four dim.
  The tile grows until it fills the frame, and becomes the title: "Experiments."
- **Narration:** "Akka is one platform for agentic AI. Specify builds it, the Agent SDK runs it, Verify governs
  it, and Optimize runs it on the right models. Today, let's look at one part of Optimize: Experiments."

## The problem (0:14–0:26)

**E2 Every change is a bet** (12 s)
- **Visual:** a live traffic stream of calls flows left to right into "frontier-large", with a cost meter
  above it counting up fast. A smaller model, "underwrite-4b", slides in beside it, with a price a third of the
  size. Two paths fork from the stream:
  - "Don't switch": the stream stays on the frontier model, and the cost meter keeps climbing.
  - "Switch everything": the whole stream jumps to the small model, and a few calls turn red-orange as they
    land; a quality line dips below a dashed limit.
  Both paths dim. A third path draws between them in yellow, through a gate marked with the four limits. That
  path is the rest of the film.
- **Narration:** "Every model change is a bet. A cheaper model could cut your bill, or quietly hurt your
  customers. So most teams never switch, or switch blind."

## The tour (0:26–1:20)

The console scenes are one continuous screen: Optimize › Inference › Experiments, in the console's dark kit,
with the loop, the limits board and the stage panel. The demo clock compresses days into seconds and is marked
Simulated.

**E3 Pick a technique, set your limits** (18 s)
- **Visual:** the view with no experiment selected. The camera pushes in on the stage panel, which shows the
  technique catalogue grouped by family:
  - Models: Swap model (Ready, "frontier-mini, priced"), Smaller model (Ready, "underwrite-4b, trained 10-12"),
    Self-hosted open-weight model (Next).
  - Steps: Add a decisioning model (Next).
  - Agents: Planner and worker routing (Next).
  - Routing rules: Route on a header (Ready, "x-region seen"), Trial balloon (Next).

  Next techniques are set in muted text with a quiet "Next" chip: part of the offer, not yet available. Each
  technique lights as it is named: Smaller model, Self-hosted open-weight model, Add a decisioning model,
  Planner and worker routing, Trial balloon. On "Then" the cursor picks Smaller model, the camera eases out,
  and the panel becomes Propose: candidate underwrite-4b, scope underwriting. On "limits" the four limits fill
  the form and the board one by one, each axis drawing its shaded band, and the budget reads $40 with the
  projected cost beside it. On "crossed" the breach choice is picked, "Breaching segments to baseline".
- **Narration:** "Experiments turns that bet into a measured rollout. Choose a technique: a smaller model, a
  self-hosted open-weight model, an added decisioning model, planner and worker routing, or a trial balloon.
  Then set your limits, and what happens if one is crossed."

**E4 Shadow, then canary** (12 s)
- **Visual:** the cursor goes from the breach choice to Start shadow. The loop's arcs light around the ring:
  Propose done, Evaluate dashed and labelled Skipped, then Shadow, and the camera pushes in on the stage panel. Graded shadow calls fill toward 2,000 while the dots on the limits board settle inside their bands.
  The cursor clicks Start canary. The split bar moves from 10% to 25% to 50%, the centre of the loop shows the
  share, and the segment rows US, UK, DE and FR fill with calls. Each segment's ring sits beside the overall
  dot on every axis.
- **Narration:** "It starts in shadow, with nothing at risk. Then a canary takes a growing share of live
  traffic, graded against your limits, region by region."

**E5 Germany routes back** (12 s)
- **Visual:** the DE ring on the Quality axis drifts left and crosses the dashed limit; the axis chip turns to
  Outside. The Canary node turns amber, and the status reads Continuing. In the stage panel the DE row flashes and
  its Served cell changes from underwrite-4b to frontier-large. The other three regions stay on the small model.
  The chosen breach option is highlighted with "In effect". Nothing else moves.
- **Narration:** "We can see that quality in Germany is starting to degrade. The rest of the experiment continues,
  with Germany's traffic routing back to the original model."

**E6 A person decides** (12 s)
- **Visual:** the small model is retrained for DE, and its ring returns inside the band. The loop reaches
  Decide, and the panel shows the statement: Baseline, Candidate, Change, Limit, Result for each axis, with
  Cost per call (71%) Favorable. The cursor clicks Promote to all traffic. The loop moves to Watch, the return
  arc to Propose turns gold, and the cost per call counts down from $0.031 to $0.009. The record takes the
  statement's place: each stage with its dates, calls, cost and verdict, "Promoted by T. Jewell", and the total.
- **Narration:** "A person decides. Promote it to all traffic, and Watch keeps guarding it. Every stage, every
  verdict and every dollar is on one record."

## The close (1:20–1:29)

**E7 Earned, not assumed** (9 s)
- **Visual:** the console falls back into the dark. Three figures rise, one at a time: "(71%) cost per call",
  "4 limits, watched throughout", "1 decision, by a person". They clear for the end card: "Akka Optimize",
  "Experiments" in display type, and the Akka mark with "Scale AI, efficiently."
- **Narration:** "Cheaper models, earned in production. Akka Optimize Experiments."

---

## Coverage

What the film shows of the capability, against the design ([philosophy.md](../../../docs/plans/routing-experiments/philosophy.md)):

| Capability | Where |
|---|---|
| One view, the loop as navigation | E3 to E6 |
| Techniques as a catalogue: three Ready (Swap model, Smaller model, Route on a header) and four named as Next (self-hosted open-weight model, decisioning model, planner and worker routing, trial balloon) | E3 |
| Limits set before going live, on four axes | E3 |
| The breach choice, made in advance | E3, E5 |
| Price before it runs: budget and projected cost | E3 |
| Evaluate is optional | E4 |
| Shadow, then canary | E4 |
| Segments on every axis | E4, E5 |
| Continuing, with breaching segments to baseline | E5 |
| A person decides; promotion | E6 |
| Watch, and the return arc to the next idea | E6 |
| One record for every stage | E6 |

Left out for length: Promote directly, the four ways Watch ends, and Experiments as the only place traffic
moves. Each could be a line in a longer cut.

## Narration

179 words in seven lines, at 2.5 words a second, is 72 seconds of speech in 89 seconds of film.
