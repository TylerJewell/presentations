# How the Akka demos are made

The Akka demos tell their story with two tools. The local console is a real system that is already
running and already telling the story when a viewer arrives. The production pipeline turns a storyboard
into a deck, an animated film or a recorded demo, and every frame of it is rendered and inspected before
anyone sees it. This page describes both, what changed in October 2026, and where each piece lives.

## The console is the stage

A demo of the console shows a real system, not slides about one.

- **One system, followed end to end.** Loan Origination (`samples/loan-origination`, port 9089) runs on the
  local stack with its agents, its signed controls bundles and its human-oversight events. The trace
  ledger (`samples/trace-ledger`, 9096) holds its traces, and the Optimize services and gateway carry
  its traffic.
- **The data is moving before the viewer arrives.** The pre-roll (`demo/full/preroll.mjs`) checks every
  service, starts gateway traffic, drives the oversight events, puts the console in demo mode and raises
  a fresh S1 event with time left on its SLA, so every screen opens populated and live.
- **Demo mode and production mode are both true to what they show.** Demo mode carries seeded,
  labelled data. Production mode shows only shipped capabilities; a screen whose interfaces have not
  shipped stays in place, greyed, and lists what is missing.
- **Every screen follows one set of design rules.** A screen has a plain title, at most one summary
  sentence and then the data. Views carry the least information that lets a person act. Comparisons
  read like a company's financial statements (current and prior period, increase and decrease,
  parentheses). Every page's title band matches Verify › Activity, and every status is one chip with
  one tone.
- **A question becomes a screen.** A person asks in a plain sentence and the console answers with a
  rendered screen over the system's own data (the canvas and the `ask-console` skill), so a live
  conversation can follow wherever the audience takes it.

## The production pipeline

Every presentation follows the method in the `akka-presentation` skill
(`~/.claude/skills/akka-presentation/SKILL.md`), which was written on 30 October 2026 from the work below.

1. **Storyboard before code.** `storyboard.md` comes first and is reviewed before anything is built. It
   has one spine that the whole piece serves; in the main demo the spine is "a change travelling safely",
   one system followed end to end. Each scene has one idea, its visual, its spoken words (about 2.5 words a
   second) and its length. A scene that needs two ideas becomes two scenes.
2. **Every scene is a function of time.** A scene draws itself once and then sets every style for any
   instant `t`, with no state carried between frames. Any moment can be played, scrubbed, printed or
   captured exactly, which is what makes screenshots, animation and film rendering one process.
3. **Every frame is looked at.** Playwright drives headless Edge to render each beat, and the middle of
   each beat, to PNG and PDF (`demo/talk/render/render.mjs`). The frames are inspected for overlaps,
   clipped text and crowding, fixed, and rendered again until each one is clean. The keynote's review
   set alone is 130 frames.
4. **Film production is built into the engine.** The caption is a designed lower third that moves aside
   when the camera pushes in. The camera frames one subject at a time and eases back out. Live figures
   run on a clock that started before the scene, so the screen is already in motion. A synthetic cursor
   and a spotlight follow the narration, and console scenes are mocks drawn in the console's own look.
5. **One visual language.** The look is akka.io's: pure black, one yellow (`#FFCE4A`), Instrument Sans
   tracked tight, a faint dot grid and hairline cards. Status colours are used only for status, and type
   is sized for a projector (headlines 64–84 px, body 26–36 px at 1920×1080).
6. **Language rules.** Every title and line is a complete sentence and a plain engineering statement.
   Nothing sells, nothing is framed negatively, and a claim appears only when the evidence carries it.
7. **A finished sound.** Narration is generated in Tyler's professional voice clone, with a pronunciation
   table for the words it misreads. A music bed sits well under the voice and drops further under each
   line. The mix is levelled to −16 LUFS with captions, and checks reject long black frames and long
   silences before a film is handed over.
8. **Every correction becomes a rule.** Each correction Tyler made was written into a README, a memory
   note or the skill, so it holds for every later presentation instead of being re-explained.

## What changed in October 2026

| When | What was added |
|---|---|
| 17–19 October | The recorded demo (`demo/full`, about 8:20): Playwright drives the live console scene by scene, frames are captured at 1920×1080, the narration is generated in Tyler's voice and mastered with chapter markers and captions, and a runbook (`demo/README.md`) makes it repeatable. |
| 27–28 October | The storyboarded film (`demo/mock`): a five-minute animatic on one timeline, built from `storyboard.md`, with the time-pure scene engine, the camera, the caption and the cursor. The governance keynote (`demo/talk`, 29 scenes, about 32 minutes) is built on the same engine with a presenter view and a generated script. |
| 30 October | A customer briefing deck and its three-minute narrated film (`demo/rbc`) reuse the engine without copying it, and the method is written down as the `akka-presentation` skill. |

The recorded demo made the console look and sound finished. The step that followed changed how a
story is designed: it starts from one idea, builds every scene as code that can be rendered at any
instant, and puts every frame in front of a reviewer before it ships.

## What changed in November 2026

| When | What was added |
|---|---|
| 18–19 November | The Every idea films (`demo/every-idea`, one minute and four minutes): one continuous shot drawn on a canvas, a score and sounds synthesised in the pipeline, and a film clock that keeps motion even across beats. Two review notes led to the clock. The picture hesitated where a beat held on a still frame, and it jerked where two beats met at different speeds. `demo/every-idea/README.md` is the full method, written for a colleague to repeat. |

## Where everything lives

| What | Where |
|---|---|
| The method | `~/.claude/skills/akka-presentation/SKILL.md` |
| Recording the live console | `demo/README.md` (runbook), `demo/full/` (narration, pre-roll, recorder, master) |
| The animated film | `demo/mock/` (`storyboard.md`, `README.md` with the production rules, `lib/` engine) |
| The keynote | `demo/talk/` (`README.md`, `script.md`, `lib/deck.js`, `render/render.mjs`) |
| Interaction diagrams | `demo/rbc/lib/seq.js` |
| Voice | `demo/sample/tts.mjs` |
| Film rendering and mixing | `demo/rbc/film/render.mjs`, `demo/mock/render/render.mjs` |
| A film in one continuous shot | `demo/every-idea/` (`README.md` with the method, `film/film.mjs` with the clock) |
| The demo system | `samples/loan-origination`, `samples/trace-ledger`, `optimize-local/stack.py` |
