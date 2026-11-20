# Every idea: one-minute film storyboard

A narrated film of about one minute, built as a deck on the engine. The audience is a prospect's executive team.
The film tells the big picture, says what Akka is and states the differentiators. A review cut is built with the
voice recorded on Eleven v4 and the sound synthesised in the pipeline.

The five-minute film keeps this shot as its frame and opens beats 6 to 8 into a walk through the Loan Origination
system.

## The spine

**Every idea an enterprise has, becoming a software system it trusts in production.**

The film is one continuous shot over a plain of light bulbs. The plain is the house dot grid laid on the ground and
seen in perspective, with a light bulb at each point. Each bulb is one idea. The film follows one idea, Loan
origination, from a lone unlit bulb to a running system, and every other idea then takes the same path.

The word "ideation" stands above the plain from the first second. When AI arrives, the letters "AI" take the place
of its "a", in yellow, and the film closes on the same word.

The film's one sentence is Tyler's: **Akka can turn any idea into a system that is ready for production, and keeps
it trustworthy once it runs.**

## What the picture means

| Mark | Meaning |
|---|---|
| An unlit bulb, drawn in outline | An idea nobody has built |
| A bulb lit white | An idea whose code AI has written |
| A bulb lit yellow | A system in production on Akka |
| A dashed ring about an idea | A kind of trust the system still has to earn |
| The horizon line | The Akka runtime, drawn before any factory line |
| A line over the ground to the horizon | One idea's software factory |

Lines that are parallel on the ground meet at one point on screen. Every factory line therefore ends at the same
point on the runtime.

Yellow appears once in the first twenty seconds, in the letters "AI". Yellow then marks only what Akka has made
ready for production, and the whole plain is yellow at the close.

The first bulb carries a name from the first second, and four more ideas take a name as the plain comes up. The
names are the only labels on the plain.

## The look

- Every mark is sharp and at full colour. A brighter light is a larger mark, never a more opaque one, because
  yellow at low opacity on black turns brown.
- An idea is drawn as a light bulb wherever a bulb fits between two rows of the plain, and as a point of light
  further off. The five named ideas are always bulbs.
- Light effects are hairlines: rings, the front of a wave, the horizon, a factory line. The film has no glow, haze,
  blur or grain.
- Distance fades the plain to black, and rows closer than four pixels dim in proportion, so far rows never merge
  into bright lines.
- Type stands in the black above the horizon, one headline at a time.
- What the product does is drawn, never shown as a screenshot. Two panels stand beside the factory line: Akka
  Specify's commands running in turn on the left, and the exit conditions and the runtime's cluster on the right.
  Every count in a panel is the console's own for the Loan Origination system.

## The sound

Every sound is synthesised in the pipeline by `film/sound.mjs`. Each one is placed at a time on the slide's own
timeline, so a sound stays on its event when a line's length changes.

- **The score** is one chord for each part of the argument, in D major, with a quiet pulse from the promise on.
  The chord is open while ideas wait, gains its major third when AI arrives, moves to the relative minor for "AI
  writes code in minutes", lifts for the promise, holds on the fifth for "the runtime is known", and is the full
  home chord when every idea turns yellow.
- **Two notes** sound when "AI" takes the place of the "a". The same two notes return under the AKKA mark with a
  third that completes them.
- **Three notes** sound as the three rings open, and leave the chord open. The same three places sound the home
  chord when the rings close.
- **Each event has a sound:** a bell for the lone idea, air rising with the crane, a tick as each idea takes a
  name, bright air and a scatter of high notes with each wave, ticks as the code arrives, a tick when a command
  starts and two rising notes when it completes, a patter as the matrix fills, a low thud when the replica fails,
  a stamp for the receipt.
- **One silence** falls just before every idea turns yellow, and a low weight lands with the wave.
- **Levels:** the score steps back by 6 dB under each line. With the voice, the sound sits 13 dB under it and the
  mix is levelled to -16 LUFS. Without the voice, the sound alone is levelled to -20 LUFS.

## Running time and pace

| | |
|---|---|
| Length | 1:02 as rendered |
| Talk track | 122 words in ten sentences, recorded one clip to a sentence |
| Pauses | A line starts 0.35 s into its beat, and the beat ends 1.0 s after the line |
| Beat durations | The animation, or the line with its pauses, whichever is longer |

## Beats

Each beat carries one spoken sentence. The time is the hold on the slide's own timeline.

### Beat 1. Every enterprise has more ideas than it can build. (hold 5.5 s)

- **Job:** the big picture.
- **Visual:** black, one unlit bulb named "Loan origination" with a hairline ring pulsing from it, and the word
  "ideation" above it. The camera cranes up and back. The bulb is one of a plain of unlit bulbs that runs to the
  horizon. A few bulbs are lit white. Four more ideas take a ring and a name: Fraud monitoring, Claims processing,
  Payments ledger, Customer loyalty.

### Beat 2. Put AI inside ideation, and every idea can become a software system. (hold 9.3 s)

- **Job:** the big picture.
- **Visual:** in the word, the letters "AI" take the place of the "a", in yellow, and the rest of the word makes
  room. At the same moment a hairline circle spreads over the ground from the first idea, and each bulb lights
  white as the circle passes. The names leave.

### Beat 3. AI writes code in minutes. (hold 11.9 s)

- **Job:** the big picture.
- **Visual:** the word leaves and the camera pushes in on Loan origination. A card, "Generated code", rises beside
  the idea, and its lines fill at once.

### Beat 4. An enterprise needs a system it trusts in production. (hold 15.1 s)

- **Job:** the big picture.
- **Visual:** three dashed rings grow about the idea on the ground and stop short of closing. A name stands in the
  gap of each ring: Reviewed, Resilient, Governed.

### Beat 5. Akka is an AI platform that turns any idea into a system that is ready for production, and keeps it trustworthy once it runs. (hold 22.6 s)

- **Job:** what Akka is.
- **Visual:** the camera returns to the wide view. The eyebrow "The Akka Agentic AI Platform" and the sentence rise
  in the black, with "any idea" in yellow. The horizon then draws as a yellow hairline from the centre outward,
  named "Akka runtime" with "Since 2009".

### Beat 6. Only Akka combines the path from an idea to a specification, the pipeline that builds and checks the system, and the runtime the system is built for. (hold 32.2 s)

- **Job:** a differentiator.
- **Visual:** the headline "Only Akka combines the specification, the pipeline and the runtime." A yellow line
  leaves the idea and runs over the ground to the horizon in three parts, each drawn as it is named. A panel
  stands on each side of the line.
  - Left, "Akka Specify commands": five commands, each with a small drawing of what it produces. Three run and
    complete in this beat, each leaving one result: `/akka:specify`, 47 requirements and 8 decisions;
    `/akka:plan`, composed from Akka components; `/akka:implement`, 365 tests pass. `/akka:conform` starts to run.
  - Right, "Exit conditions": a matrix of 40 open cells, one for each condition, and under it the Akka runtime
    as three replicas holding sessions.

### Beat 7. Because the runtime is known before any code is generated, AI writes less, and reviewers review less. (hold 38.2 s)

- **Job:** a differentiator.
- **Visual:** the headline "The runtime is known before any code is generated." A pulse of light runs along the
  horizon. In the matrix, the three conditions guaranteed by the runtime fill yellow while the other 37 are still
  open. In the cluster, one replica fails and its sessions resume on the other two, and then a new replica joins
  and takes its share. "Resilience" and "Scale" light as each happens.

### Beat 8. Every release carries a receipt. (hold 41.2 s)

- **Job:** a differentiator.
- **Visual:** the other 37 cells fill green in a sweep and the count reaches 40 of 40. `/akka:conform` completes
  and `/akka:ship` runs. The three rings close and turn yellow, and the idea turns yellow. A receipt rises under
  the idea: "Ready to ship", with "Verified", "Open" and "Waivers". A point of light runs up the factory line to
  the horizon.

### Beat 9. Every idea gets its own software factory. (hold 45.4 s)

- **Job:** the big picture.
- **Visual:** the cards leave. The headline is the sentence. A line runs from every column of ideas over the
  ground, and all the lines meet at one point on the horizon. A yellow circle spreads from the first idea, and
  every bulb turns yellow as the circle passes.

### Beat 10. Akka is the platform for enterprise ideAItion. (hold 48.4 s)

- **Job:** what Akka is.
- **Visual:** the AKKA mark and the sentence stand in the black above the yellow plain, with "AI" in yellow.

## Running total

| Beat | Job | Words | Seconds as rendered |
|---|---|---|---|
| 1 | Big picture | 9 | 6.3 |
| 2 | Big picture | 12 | 6.4 |
| 3 | Big picture | 5 | 3.6 |
| 4 | Big picture | 9 | 4.8 |
| 5 | What Akka is | 24 | 9.4 |
| 6 | Differentiator | 27 | 10.4 |
| 7 | Differentiator | 17 | 7.9 |
| 8 | Differentiator | 5 | 3.4 |
| 9 | Big picture | 7 | 4.6 |
| 10 | What Akka is | 7 | 5.0 |
| Total | | 122 | 61.7 |

No beat runs over 40 seconds.

## Lines that are Tyler's to choose

Beats 2 and 10 are drafts. Other candidates for the close:

- "An enterprise's capacity to build is limited only by its capacity to decide."
- "Every idea your enterprise has can become a system it trusts in production."

## Still to do

- Listen to the voice and the sound and adjust them. It was placed and levelled by measurement and has not been heard.
- Render the final cut at twice the size and scale it down (`--final`).
- Draw the receipt from a real console capture once one exists.

## What the five-minute film adds

- The four solution names, each at the station where the solution does its work.
- The stations of a factory, walked on the Loan Origination system's console screens.
- The same runtime on a laptop and in production, and deployment in any cloud.
- Controls and evidence that continue after the build.
- Existing systems entering a factory, with the original as the answer key.
- Roadmap compression and legacy liability reduction as the measures.
- The ask.

## Basis for each claim

| Claim | Basis |
|---|---|
| With AI, every idea can become a software system | Tyler's essay of 2026-11-18, closing sentence |
| Akka turns any idea into a system that is ready for production, and keeps it trustworthy once it runs | Tyler's essay |
| Only Akka combines the three parts | Tyler's essay; the vendor research of 2026-11-17 |
| AI writes less and reviewers review less | Tyler's essay |
| 47 requirements, 8 decisions | The console's Changes screen, Spec tab, for the Loan Origination system (`modernize/screens/changes-spec.png`) |
| 365 tests pass | The console's Design screen: integration tests 365 of 365 (`modernize/screens/design-overview.png`) |
| 40 exit conditions, 3 guaranteed by the runtime | The console's Changes screen, exit conditions (`modernize/screens/changes-exit.png`). The capture shows the conditions before a run; the film shows them passing |
| A replica fails and its sessions resume on the others; a new replica joins and takes its share | The overview page on akka.io, "Replicas self-cluster" |
| Every release carries a receipt | The conformance receipt written at ship, `sdk/enforced-mode.html.md` in `akka-context` |
| Every idea gets its own factory | The modernize film storyboard, the spine |
| Akka is the platform for enterprise ideAItion | A draft built on Tyler's term of 2026-11-18 |
| Since 2009 | Approved company-age wording |

## Built from

- The deck: `index.html`, `slides/every-idea.js` (the one slide and its ten beats), `lib/plain.js` (the plain)
  and `lib/panels.js` (the commands panel and the verification panel).
- The engine: `../talk/lib/deck.js`, `../talk/lib/kit.js` and `../mock/lib/core.js`.
- The picture: `node film/render.mjs` writes `film/out/every-idea-1min-silent.mp4`, its captions and
  `timeline.json`; `--stills=<times>` writes single frames to `film/out/stills/`.
- The sound: `node film/sound.mjs` synthesises `film/out/sound.wav` from `film/score-1min.mjs` with `film/synth.js`, mixes in the voice when
  `film/durations.json` exists, and writes `film/out/every-idea-1min.mp4`.
- The voice: `../sample/tts.mjs --dir=every-idea/film/voice` records the lines, and `film/voice.mjs` cuts each
  to its speech and writes `film/durations.json`.
- The look test that led to the look is in `look-test/`, and the market scan is in `reports/`.
