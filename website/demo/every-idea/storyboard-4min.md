# Every idea: four-minute film storyboard

A narrated film of about four minutes for a prospect's executive team, built as a deck on the engine. The film is
Tyler's essay of 2026-11-18 told in the essay's own order, inside the shot the one-minute film established. The
one-minute film (`storyboard-1min.md`) covers the essay's thesis. This film opens each claim of the thesis into
what backs it.

A review cut is built, with the voice recorded on Eleven v4 and the sound synthesised in the pipeline. It runs
3:50.

## The spine

**Every idea an enterprise has, becoming a software system it trusts in production.**

The film is one continuous shot over the plain of light bulbs. Each bulb is one idea. The film follows Loan
origination along its factory line to the runtime, and then shows every other idea on the same path.

The film's one sentence is Tyler's: **Akka can turn any idea into a system that is ready for production, and keeps
it trustworthy once it runs.**

## How the four minutes divide

| Part | Essay section | Where the camera is | As rendered |
|---|---|---|---|
| Every idea | The closing sentence, and "Akka can turn any idea…" | Close on one bulb, then the wide plain | 0:39 |
| Delivery gets faster | "When you own all three parts, delivery gets faster" | Travelling along Loan origination's line | 1:04 |
| It stays trustworthy | "It then stays trustworthy after the build" | At the horizon, where the runtime line opens | 0:45 |
| The factory | "So what defines an AI factory" | The wide plain, from higher up | 0:50 |
| The measures | "Two ways to measure ROI" | The wide plain, from higher up | 0:16 |
| The close | Tyler's ask | The wide plain, every bulb yellow | 0:16 |

The parts total 3:50. A beat lasts as long as its recorded line with its pauses, or as long as its animation
where the animation is longer. A beat's animation plays at the pace that fills the beat, and the pace changes
gradually from one beat to the next, so the camera's travel neither stops nor changes speed in a step.

## What the picture means

The marks of the one-minute film keep their meaning. This film adds six.

| Mark | Meaning |
|---|---|
| A bulb lit white at the opening | An existing system: its code is written and it does not run on Akka |
| A hairline across the ground | A station that every idea's line crosses |
| A point of light on a factory line | Where that idea is on its way to production |
| A short bar left on a line at a station | The versioned record that station passed on |
| A person mark beside a waiting light | A decision on which a person is asked for clarification |
| The band that opens at the horizon | The Akka runtime, seen close |

Every factory line converges on one point of the horizon, so a hairline drawn across the ground crosses all of
them. The six stations are six such hairlines.

## The look

The look rules of the one-minute film hold: sharp marks at full colour, hairlines for light, no glow, haze, blur or
grain, and one headline at a time in the black above the horizon.

- **What the product does is drawn.** No console screenshot appears. Every count and every name in a drawing is
  the console's own for the Loan Origination system.
- **One drawing at a time, large.** Through "Delivery gets faster" the Akka Specify commands panel stays docked on
  the left and gathers each command as it completes. The right side holds one large drawing for the sentence being
  spoken.
- **The camera changes scale three times.** It travels low along the line, it stops at the horizon, and it rises
  over the whole plain. The dense far rows of the plain are covered by the runtime band for the part of the film
  where the camera is nearest to them.

## Beats

Each beat carries one spoken sentence. The headline is the text on screen.

### Every idea

Beats 1 to 5 follow the first six beats of the one-minute film. Beat 1 names twenty ideas where that film names
five, and beat 3 speaks that film's third and fourth sentences as one.

1. **Every enterprise has more ideas than it can build.** One unlit bulb named "Loan origination" and the word
   "ideation". The camera cranes up over a plain of unlit bulbs. A few are lit white. Nineteen more ideas take a name
   across the plain, so the frame holds twenty named ideas.
2. **Put AI inside ideation, and every idea can become a software system.** "AI" takes the place of the "a" in
   yellow, and a circle spreads over the ground lighting each bulb white.
3. **AI writes code in minutes, but an enterprise needs a system that is ready for production.** The camera
   pushes in. The "Generated code" card fills beside the idea. As the second half of the sentence is spoken, three
   dashed rings open about the idea: Reviewed, Resilient, Governed.
4. **Akka is an AI platform that turns any idea into a system that is ready for production, and keeps it
   trustworthy once it runs.** The wide view. The horizon draws as a yellow hairline named "Akka runtime", with
   "Since 2009".
5. **Only Akka combines the path from an idea to a specification, the pipeline that builds and checks the system,
   and the runtime the system is built for.** The factory line leaves the idea and runs to the horizon in three
   named parts.

### Delivery gets faster

The camera comes down to the ground and travels forward along the line. Bulbs pass on both sides.

6. **Because the runtime is known before any code is generated, AI writes less, and reviewers review less.**
   - Headline: "The runtime is known before any code is generated."
   - A pulse runs along the horizon. The commands panel docks on the left, and `/akka:specify` runs and completes
     with "47 requirements, 8 decisions".
7. **The design space is fixed before code is generated.**
   - Headline: "AI generates only from Akka components."
   - On the right, the Akka components stand in a row, each as its own shape: agent, workflow, entity, view,
     consumer, timed action, endpoint.
8. **AI generates only from Akka components, and each system is still its own design.**
   - `/akka:plan` runs. Copies of the shapes leave the row and join into the Loan Origination system, each with its
     real name: Loan application, Underwriting, Eligibility assessor, Applications by status, Notice preparation
     and Notice writer. The connections are the sample's own.
   - Two smaller systems assemble beside it from the same row, with different shapes in different arrangements,
     named Fraud monitoring and Claims processing.
9. **The hardest requirements are satisfied by the runtime: identity, durability, replication, failover, scaling,
    sharding, circuit breakers, caching, and backpressure.**
    - Headline: "The runtime satisfies the hardest requirements."
    - Each of the nine words lights on the horizon line as it is spoken. On the right, the Loan Origination system
      stands inside a yellow outline named "Akka runtime", with the sentence "Every component inherits these from
      the runtime." No line of code is drawn, so the picture gives no ratio of code written to code saved.
      `/akka:implement` completes with "365 tests pass".
10. **An enterprise's requirements are written as exit conditions.**
    - Headline: "Exit conditions define when a system is done."
    - The right side becomes the matrix of 40 open cells, at full size.
11. **A machine checks each condition wherever it can, and the human attestations are recorded alongside.**
    - `/akka:conform` runs. The cells fill in groups, and each group takes the console's own name and count: 3
      guaranteed by the runtime, 13 run a command, 12 read project files, and the rest by scanner, browser, probe
      and record. The cell that reads a review record carries a person mark. The four conditions the console
      lists as "No check defined" are drawn as passed, under "Other auditors", and the count reaches 40 of 40.
12. **The enterprise tightens the conditions where it needs to.**
    - One cell opens to its condition: `LOAN-HUMAN-DECIDES-ADVERSE`, "No application is declined by the system".
      The label "Set by the enterprise" stands on it.
13. **A conformance receipt states that the system is ready to ship.**
    - Headline: "Every release carries a receipt."
    - The count reaches 40 of 40. `/akka:ship` runs. The receipt rises at full size: "Ready to ship", with
      Verified, Open and Waivers. The idea's bulb turns yellow. The bulb is behind the camera at this beat, and
      it is yellow when the camera rises over the factory.
14. **The laptop runtime and the production runtime are the same, so the system goes to production as it was
    built.**
    - Headline: "The laptop runtime and the production runtime are the same."
    - The system stands inside the outline of a laptop, with "Akka runtime" under it. The outline opens into
      three replicas. The system and the words "Akka runtime" do not move.

### It stays trustworthy

The camera reaches the end of its travel. The horizon hairline parts into two hairlines, and a band opens between
them across the frame. The band is the runtime. The near rows of bulbs stay below it.

15. **The system stays trustworthy after the build.**
    - Headline: the sentence.
    - The band opens. The Loan Origination system runs inside it on three replicas.
16. **The security, identity, controls, and interaction model that applied at build time also apply in
    production.**
    - Headline: "The controls at build time apply in production."
    - The system is drawn twice in the band, under "Build" and "Production". The same four outlines sit on both,
      and a hairline joins each pair.
17. **Every change to a specification is documented with a machine-generated receipt of what was verified, what
    remains open, and any waivers.**
    - Headline: "Every change carries a receipt."
    - A row of changes to the specification runs along the band. A receipt falls from each change as it lands.
18. **The receipts are an evidence trail that a requirement a user asked for was implemented and verified.**
    - One requirement is picked out, and a hairline traces it through three marks: Asked, Implemented, Verified.
19. **Akka captures production traces, evaluations, and cost, and they feed the next improvement to the
    specification.**
    - Headline: "Production feeds the next specification."
    - Three streams of light leave the band, named Traces, Evaluations and Cost. They run back down the factory
      line toward the camera and arrive at the specification part of the line, which takes a new version.
20. **Akka systems run wherever you need them: in our cloud, in your datacenter, or in a sovereign cloud.**
    - Headline: "Akka systems run where you need them."
    - The band divides into three frames named Akka cloud, Your datacenter and Sovereign cloud. The same system
      runs in each.

### The factory

The band closes to the horizon hairline. The camera rises to a view higher than the one-minute film's wide view,
so the ground between the idea and the horizon has room.

21. **Every idea goes through the same stations: discovery, specify, plan, build, conform, and ship.**
    - Headline: "Every idea goes through the same stations."
    - Six hairlines draw across the ground, each named at the left edge as it is spoken. A line runs from every
      column of ideas to the horizon, and each line crosses the six.
22. **Every station passes versioned records to the next.**
    - A point of light sets out on each named idea's line. Where a light crosses a station, a short bar stays on
      the line.
23. **Where a decision is ambiguous, a human is asked to provide the clarifications needed to eliminate the
    ambiguity, and the answers are recorded with the station's records.**
    - The light on Fraud monitoring's line waits at Specify with a person mark beside it. The mark takes a tick,
      a bar stays, and the light moves on.
24. **The organization sees its portfolio of ideas, and where each idea stands.**
    - Headline: "The portfolio shows where each idea stands."
    - A light is now on every line of the plain, each at its own station. Each named idea's label gains the name
      of its station.
25. **Akka can rebuild and replatform an existing system to functional and behavioral parity with the original
    system.**
    - Headline: "An existing system is rebuilt to parity with the original."
    - Four of the bulbs that were lit white at the opening are named "Existing system". A light sets out on each
      of their lines and stops at Discovery.
26. **Akka uses the existing system as a testbed and answer key.**
    - Each existing system's label gains the words "Answer key", one after another.
27. **Feedback, spend, and human judgement decide which idea goes next.**
    - Headline: "Feedback, spend and judgement decide which idea goes next."
    - Lights set out on the remaining lines in turn. One idea in the foreground takes a person mark and the name
      "On hold", and no light sets out on its line.

### The measures

28. **Roadmap compression is the number of projects planned for 2028 that you deliver in 2027.**
    - Headline: "Projects planned for 2028 are delivered in 2027."
    - Each named idea's label shows a year: 2027, 2028 or 2029. As each idea's light reaches the horizon its bulb
      turns yellow and its year becomes 2027.
29. **Legacy liability reduction is the saving from the technical debt, unsupported software, mainframes, and
    licenses you retire.**
    - Headline: "Legacy liabilities are retired."
    - The four existing systems take the names Technical debt, Unsupported software, Mainframe and Licenses. Each
      turns yellow as its light reaches the horizon.

### The close

30. **Every idea gets its own software factory.** A yellow circle spreads from the first idea, and every bulb on
    the plain turns yellow.
31. **Akka is the platform for enterprise ideAItion.** The AKKA mark and the sentence stand above the yellow plain.
32. **Contact us, and we will show you how we can deliver your idea in as little as a day.** The sentence takes
    the place of the closing line, with "akka.io" under it.

## The lines and where each comes from

The essay is the source of the narration. A line marked "essay" is the essay's sentence, or that sentence with its
subject changed so that it stands alone when spoken. Every other line is a draft for Tyler to reword.

| Beats | Source |
|---|---|
| 1 | The one-minute film |
| 3 | The one-minute film's third and fourth lines, joined into one sentence on 2026-11-19 |
| 2, 31 | Drafts built on Tyler's term "ideAItion" |
| 4, 5, 6 | Essay, as in the one-minute film |
| 7, 9, 15, 16, 17, 20, 21, 22 | Essay |
| 8 | Essay, joined to Tyler's decision that Akka constrains the parts and leaves the design open |
| 10, 11, 12, 13 | Essay, one sentence divided into four. Beat 13 says "conformance receipt", the documentation's name, where the essay says "printed receipt" |
| 14, 18, 19, 24, 28, 29 | Essay, reworded for the voice |
| 23 | Essay, with Tyler's wording of 2026-11-19 for what the human is asked to do |
| 25, 26 | Tyler's statement of 2026-11-19 on existing systems, one sentence to a beat |
| 27 | A draft from the essay's line on ideation governance |
| 30 | The modernize film, as in the one-minute film |
| 32 | Tyler's ask of 2026-11-18 |

The narration is 469 words in 32 sentences.

## Decisions Tyler made on 2026-11-18

- The film states that production traces, evaluations and cost feed the next improvement to the specification.
  Runtime observations are context for a specification improvement.
- What the product does stays drawn, as in the one-minute film.
- The ask: the prospect contacts Akka, and Akka shows how it can deliver the prospect's idea in as little as a day.
- The exit conditions show 40 of 40.
- No drawing may be read as a ratio of code written to code saved.

## Decisions Tyler made on 2026-11-19

- Where a decision is ambiguous, the film says that a human is asked to provide the clarifications needed to
  eliminate the ambiguity. "A person decides" is not used.
- The film states outright that Akka can rebuild and replatform an existing system to functional and behavioral
  parity with the original system, and that the existing system is the testbed and the answer key.
- After a colleague's review: "AI writes code in minutes" and the enterprise's need are one sentence joined by
  "but", because the first sentence alone was heard as dangling.
- After the same review: the receipt at ship is called a conformance receipt. "Printed" was heard as a sheet of
  paper and is not used.
- After the same review: the opening names twenty ideas. Five did not show an enterprise with more ideas than it
  can build.

## The sound

The one-minute film's instruments and rules carry over: every sound is synthesised in the pipeline, placed on the
slide's own timeline and levelled by measurement.

- The score keeps D major for "Every idea", moves to a related key for "It stays trustworthy", and returns to
  D major when the camera rises over the factory.
- Each of the nine runtime words in beat 9 takes one note of a rising scale.
- Each station hairline in beat 21 takes one note, and the six notes are the scale the lights then play as they
  cross the stations.
- The pulse thins to every other note while the camera is at the runtime.
- The score and every sound were placed and levelled by measurement. Nobody has listened to them yet.

## Basis for each claim

| Claim | Basis |
|---|---|
| Beats 1 to 6 | `storyboard-1min.md`, "Basis for each claim" |
| AI generates only from Akka components | Tyler's essay |
| The Loan Origination system's components and their names | The sample's source: 5 agents, 4 workflows, 10 entities, 6 views, 7 consumers and 3 timed actions |
| Each system is its own design | Tyler's decision on the essay; the `akka-presentation` rule on designs |
| The nine requirements satisfied by the runtime | Tyler's essay; his decision that the list stands as written |
| 40 exit conditions and how each is checked | The console's Changes screen, exit conditions (`modernize/screens/changes-exit.png`) |
| `LOAN-HUMAN-DECIDES-ADVERSE` | The same screen |
| The enterprise tightens the conditions | Tyler's essay; `sdk/enforced-mode.html.md` in `akka-context` |
| The laptop runtime and the production runtime are the same | Tyler's essay |
| Build-time controls apply in production | Tyler's essay |
| A receipt for every change, and the evidence trail | Tyler's essay; the conformance receipt in `sdk/enforced-mode.html.md` |
| Production traces, evaluations and cost feed the next specification | Tyler's essay and his decision of 2026-11-18 |
| Akka cloud, the customer's datacenter, a sovereign cloud | Tyler's essay; doc.akka.io/deployment; the Sovereign Cloud tier on akka.io |
| The six stations, versioned records, human decisions, the portfolio | Tyler's essay |
| An existing system is rebuilt to functional and behavioral parity, with the existing system as testbed and answer key | Tyler's statement of 2026-11-19; the modernize film storyboard |
| Roadmap compression and legacy liability reduction | Tyler's essay |
| An idea delivered in as little as a day | Tyler's statement of 2026-11-18 |

## Wording that is a draft

- "Other auditors", the name of the four conditions the console lists as "No check defined".
- "Set by the enterprise", on `LOAN-HUMAN-DECIDES-ADVERSE`. The sample files this condition under its developer.
- "On hold", on the idea a person holds back.
- "Answer key", on each existing system's label in beat 26.
- The fifteen further idea names in beat 1: Dispute resolution, Customer onboarding, Service desk, Treasury
  forecasting, Policy underwriting, Mortgage servicing, Collections, Pricing engine, Regulatory reporting, Wealth
  advice, Trade settlement, Document intake, Credit scoring, Identity verification and Contract review.
- The receipt's rows: "Verified, 40 of 40 exit conditions", "Open, None" and "Waivers, None". The rows follow the
  documentation's account of a receipt. No real receipt was read.
- The headlines. Each is a short form of its beat's spoken sentence.

## Still to do

- Listen to the voice and the sound and adjust them.
- Render the final cut at twice the size and scale it down (`--final`).
- The times at which the nine runtime words and the six stations appear were measured from this recording
  (`WORD_T` and `STATION_T` in the slide, repeated in the score). A new recording of beat 9 or beat 21 needs
  them measured again, and `node film/when.mjs --film=4min` turns the measured word starts into slide times.

## Built from

- The deck: `four-minute.html`, `slides/every-idea-4min.js` (the one slide and its 32 beats), `lib/plain.js` (the
  plain, the stations and the lights), `lib/panels.js` (the commands panel) and `lib/drawings.js` (the cards
  beside the line and the pictures inside the runtime band).
- The picture: `node film/render.mjs --film=4min` writes `film/out/every-idea-4min-silent.mp4`, its captions and
  `timeline-4min.json`; `--stills=<times>` writes single frames to `film/out/stills-4min/`.
- The voice: `../sample/tts.mjs --dir=<full path of film/voice-4min>` records the lines, and
  `node film/voice.mjs --film=4min` cuts each to its speech and writes `film/durations-4min.json`. The lines the
  two films share use the one-minute film's takes.
- The sound: `node film/sound.mjs --film=4min` synthesises `film/out/sound-4min.wav` from `film/score-4min.mjs`,
  mixes in the voice and writes `film/out/every-idea-4min.mp4`.
