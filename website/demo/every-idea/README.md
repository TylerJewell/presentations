# How the Every idea films are made

This folder holds two narrated films, one of a minute and one of four minutes, and everything that produces them.
This document records the whole method, so that a colleague can produce a film of the same quality without having
watched these two being made. It covers the story, the picture, the code, the voice, the sound, the render and the
checks, and it gives the reason for each rule.

`../README.md` is the runbook for the recorded console demo, and `../storytelling.md` explains the demos to
colleagues. Both stay valid. This document covers the animated films in this folder.

| Read this | When |
|---|---|
| "The order of work" | Before starting a film |
| "The story" and "The picture" | While writing the storyboard |
| "The look" and "Drawing the product" | While designing any frame |
| "The code" to "The render" | While building |
| "Checks before anyone sees a cut" | Before every hand-over |
| "What review changed" | When a choice feels arbitrary |

## What the two films are

| | One-minute film | Four-minute film |
|---|---|---|
| Storyboard | `storyboard-1min.md` | `storyboard-4min.md` |
| Deck page | `index.html` | `four-minute.html` |
| Slide | `slides/every-idea.js`, 10 beats | `slides/every-idea-4min.js`, 32 beats |
| Length | 1:02 | 3:50 |
| Output | `film/out/every-idea-1min.mp4` | `film/out/every-idea-4min.mp4` |

Both are one continuous shot over a plain of light bulbs. Each bulb is one idea. The horizon is the Akka runtime.
A film is a deck on the engine in `../talk` and `../mock`: one slide, drawn as a function of time, captured frame
by frame from a headless browser.

## What a film needs installed

- **Node 20 or later.**
- **Playwright with Chromium.** `film/render.mjs` and `film/sound.mjs` load Playwright from
  `C:/Users/tyler/ai-console/kalix-console/apps/stories/package.json`. On another machine, change that
  `createRequire(...)` line in both files to any folder where `npm install playwright` has run.
- **ffmpeg and ffprobe** on the path.
- **Python 3 with Pillow**, for the tools in `film/tools`. On Windows run it as `py -3`.
- **An ElevenLabs key** in `ELEVENLABS_API_KEY`, and the narrator's voice in `ELEVENLABS_VOICE_ID`. `../README.md`
  says where these come from. A film can be built and reviewed with captions before any voice is recorded.
- **The fonts** are in `../talk/fonts`. Nothing is fetched from the network at render time.

## The order of work

Each step produces something a reviewer can judge. A step is not started until the one before it has been seen.

1. **Read the source.** The films tell one internal essay. Every claim in a film comes from that essay, the
   product documentation or the console.
2. **Write the film's one sentence, then the storyboard.** One spoken sentence to a beat, with the picture for
   each and the source of each claim.
3. **Settle the look on stills.** Draw the hard frames as still images before anything moves.
4. **Build the slide.** One file, a pure function of time.
5. **Look at a still of every beat.** Fix what overlaps, what is unclear and what is ugly.
6. **Record the voice.** One clip to a sentence.
7. **Time the picture to the voice.** Lists that are spoken word by word are matched to the recording, and the
   film's clock keeps motion even from one beat to the next.
8. **Write the score and the sounds.** Every sound is placed on the picture's own clock.
9. **Render, measure and look.** Run every check in "Checks before anyone sees a cut".
10. **Show it, take the notes, and change the rule as well as the frame.**

The longer film was built after the shorter one was approved. The shorter film fixed the shot, the look, the
marks and the sound, and the longer film reused all of them.

## The story

### The film starts from the company, and the product follows from it

The first plan for this work reordered a product page and audited its claims. It was rejected. The reviewer wanted
the company positioned as a whole, with the platform derived from that. The rule that came out of it: write what
the company makes possible first, then what the product is, then why only this product can do it.

### One sentence carries the film

Each film has one sentence that the whole film serves. Here it is the essay's: "Akka can turn any idea into a
system that is ready for production, and keeps it trustworthy once it runs." Write the sentence at the top of the
storyboard. A beat that does not serve it is cut.

### Every beat has one job and one spoken sentence

- A first outline had eight sections. The reviewer said it was too long for someone to grasp. The fix was one
  sentence to a beat, and three jobs a beat can have: the big picture, what Akka is, or a differentiator.
- The storyboard states each beat's job. A film that has to tell a big picture and also say what the product is
  alternates the jobs, and the storyboard's table shows the balance.
- One sentence to a beat also sets the rhythm. The picture changes when the sentence changes.

### Every line has a source, and a draft is marked as a draft

- A narration line is the source's own sentence wherever one exists. A sentence is changed only so that it stands
  alone when spoken, for example by naming its subject.
- A line that the writer invented is listed in the storyboard as a draft for the author to reword. So is every
  invented label on screen.
- The storyboard carries a table, "Basis for each claim", with one row for every claim in the film. A count comes
  from the console's own screen for the sample system. A capability comes from the documentation.
- A film is public. It names no customer.

### The opening is the largest idea in the film

The reviewer asked for an opening about every idea an enterprise has, and called an opening about a roadmap "a
narrow reflection of the bigger picture". The films open on one idea and reveal a plain of them. The roadmap
appears late in the longer film, as a measure.

### Words and length

- The one-minute film has 122 words in 10 sentences. The four-minute film has 469 words in 32 sentences. That is
  about two words a second across the whole film, with the pauses included.
- Before a voice exists, estimate a line at 2.6 words a second.
- A spoken list of three or more items takes a comma before its last item. Without it the voice runs the last two
  items together.
- A coined word is spoken as the reviewer says it is spoken. "ideAItion" is spoken as "ideation", and
  `SPOKEN` in `../sample/tts.mjs` makes the substitution while the captions keep the written form.

### The storyboard is the contract

Both storyboards have the same sections, and a new film should keep them: the spine, what each mark in the picture
means, the look, the sound, the beats, where each line comes from, the decisions the author made, the basis for
each claim, the wording that is still a draft, what is still to do, and the files the film is built from. The
storyboard is updated in the same sitting as the film, so the two always agree.

## The picture

### One continuous shot

Neither film cuts. The camera moves between a few poses, and type changes in the black sky. A single shot makes a
film read as one argument, and it removes every decision about transitions.

### A small set of marks, each with one meaning

The storyboard's table "What the picture means" lists every mark. The rules behind the table:

- **A mark means one thing for the whole film.** A bulb is an idea. Unlit is an idea nobody has built, white is
  an idea whose code AI has written, yellow is a system in production on Akka.
- **Yellow is rationed.** It appears once early, in the letters "AI", and then only on what Akka has made ready
  for production. The whole plain is yellow at the close.
- **The geometry carries the argument.** The horizon is the runtime, and it is drawn before any factory line.
  Lines that are parallel on the ground meet at one point on screen, so every idea's line ends at the same
  runtime. Six hairlines across the ground are six stations, and every line crosses all six.
- **A later film gives meaning to what an earlier film left unexplained.** The few bulbs lit white at the opening
  become the existing systems in the longer film.

### The picture has to explain itself

A colleague who saw the first cut said he did not understand "the purpose of all the datapoints". The first fix
was a key in the corner and a sentence, "Each light is an idea." Both were rejected: the key was distracting, and
the sentence forced the point. The reviewer's rule was that if a viewer cannot tell that a mark is an idea, the
picture does not work. The fix that held was to draw each idea as a light bulb.

- No legend, and no sentence on screen that explains the picture.
- A mark that needs explaining is redrawn as the thing it stands for.
- The first idea carries its name from the first second. A name on one mark teaches the viewer what the rest are.

### One idea is followed, then all of them

The film follows one named idea, Loan origination, from a lone bulb to a running system. Every other idea then
takes the same path at once. The single case makes the mechanism clear, and the plain makes the scale clear.

### Type in the sky

- One headline at a time, in the black above the horizon. A headline leaves before the next one rises.
- Every headline, caption and sentence on screen is a complete sentence. A label, a chip or a table cell may be
  short.
- The headline is a short form of the spoken sentence. It never adds a claim.
- No chapter numbers, and no rule beside a word.

## The look

These rules came from frames the reviewer rejected. The first style frames used soft glows, and he called them
"fuzzy or glowing in a cheap sort of rendering".

- **Every mark is sharp and at full colour.** A brighter light is a larger mark, never a more opaque one. Yellow
  at low opacity on black turns brown.
- **Light effects are hairlines:** a ring, the front of a wave, the horizon, a factory line.
- **No glow, haze, blur disc or grain.**
- **Distance fades the plain to black.** Rows closer together than four pixels dim in proportion to their
  spacing, so far rows never merge into bright lines.
- **A bulb is drawn only where a bulb fits.** A bulb is drawn when its height fits between two rows of the plain,
  and a point of light is drawn further off. Named ideas are always bulbs.
- **Pure black, one yellow.** Black is `#000`. Yellow is `#FFCE4A`. Text is `#F1F1F1`, with `#CFCFCF` and
  `#A6A6A6` for secondary text. Green `#72D35B` and red-orange `#FF5400` appear only as status.
- **Instrument Sans throughout.** Mono is used only for a command or an identifier.
- **Sizes for a 1920 by 1080 frame:** the opening word 150 px, a headline 70 px on two lines, a sentence under
  the mark 40 to 58 px, text inside a card 19 to 26 px, a capital label 19 to 22 px with letter spacing of
  0.14 em. Text is 18 px or larger, except two capital labels inside the runtime band at 15 and 16 px.
- **A held frame is never dead.** Once the camera has left its first pose it sways eight units from side to side
  every twelve seconds, driven by the live clock.

### What a market scan added, and what was dropped

Before the look was set, a scan of current studio films was run (`reports/` and `research_notes/`). Its evidence
was thin. One finding held: none of the flagship films it found shows a real screenshot, and several abstract the
interface. That became "Drawing the product" below.

A look test (`look-test/`) then compared sub-frame motion blur, grain and supersampling against the plain render.
The reviewer could not tell the versions apart, and the blurred render took 33 minutes. All three were dropped.
Test an expensive technique on ten seconds before paying for it across a film.

## Drawing the product

The first cut put text cards beside the line, and the reviewer found them wordy. The second put miniature console
screenshots under the cards, and he said the screenshots did not work. He asked for "heavily rendered graphics
that reflect what our product does". The rules that hold now:

- **What the product does is drawn, never captured.** A drawing shows one mechanism: commands running, conditions
  passing, a replica failing and its work resuming, a receipt.
- **Every count and every name is the product's own.** The 47 requirements, 8 decisions, 365 tests and 40 exit
  conditions are read from the console's screens for the sample system. The components in the system drawing
  carry the sample's real names, and its arrows are the sample's real calls.
- **The commands are a panel, never a terminal.** The Akka Specify commands stand in a panel on the left, headed
  "Akka Specify commands" with "Run in your IDE or agent harness" under it. All five are visible from the start
  and dim until they run. A running command spins, a finished one takes a tick and one line of result.
- **One drawing at a time, large.** In the longer film the right side holds one drawing for the sentence being
  spoken. A new sentence replaces the drawing.
- **A drawing gives no ratio that was not measured.** A code card with four solid lines and nine empty ones was
  read as "AI writes four thirteenths of the code". It was replaced by the system standing inside the runtime's
  outline, with no line of code drawn.
- **A drawing shows the finished state the film claims.** The console capture lists four conditions with no check
  defined. The reviewer decided that the film shows 40 of 40. A gap between the product today and the film is a
  decision for the author, and the storyboard records it.
- **Components are shapes with names.** Agent, workflow, entity, view, consumer, timer and endpoint each have one
  shape. A system is a few shapes joined by hairlines. Three systems drawn from the same shapes in different
  arrangements show that each system is its own design.
- **A card is black, with a hairline border and even padding.** It has no coloured bar and no one-sided border.
  A card that changes content keeps its place and size.

## The code

### Files

| File | What it holds |
|---|---|
| `index.html`, `four-minute.html` | The deck page for each film |
| `slides/index.js`, `slides/index-4min.js` | The slide list for each page |
| `slides/every-idea.js`, `slides/every-idea-4min.js` | The one slide of each film: its beats and its whole timeline |
| `lib/plain.js` | The plain, drawn on a canvas: the ideas, the camera, the waves, the lines, the stations, the lights |
| `lib/panels.js` | The commands panel, and the one-minute film's verification panel |
| `lib/drawings.js` | The four-minute film's cards and the pictures inside the runtime band |
| `film/film.mjs` | The file names of each film, and the clock that maps film time to slide time; the scripts below take `--film=4min` |
| `film/render.mjs` | Captures the picture and writes the timeline |
| `film/voice.mjs` | Cuts each recorded line to its speech and measures it |
| `film/when.mjs` | Gives the slide time at which a mark appears as its word is spoken |
| `film/sound.mjs`, `film/synth.js` | Synthesise the sound and mix it with the voice |
| `film/score-1min.mjs`, `film/score-4min.mjs` | Each film's chords and designed sounds |
| `film/tools/` | Contact sheets, phrase timing and the search for stops |

The engine is shared and is not copied: `../mock/lib/core.js` (helpers), `../talk/lib/kit.js` (headlines),
`../talk/lib/deck.js` and `presenter.js` (the deck), with the styles in `../mock/tokens.css`, `../mock/player.css`
and `../talk/talk.css`.

### A slide is a pure function of time

```js
registerSlide({
  id: 'every-idea',
  beats: [{ t: 5.5, say: 'Every enterprise has more ideas than it can build.' }, ...],
  render(root) { /* build every element once */ },
  at(t) { /* set every style for the instant t */ },
});
```

- `render` builds the elements once. `at(t)` sets every style from `t` alone and keeps no state between frames.
  Any instant can then be drawn on its own, which is what makes stills, scrubbing and frame capture possible.
- A beat's `t` is the last moment of its animation on the slide's clock. `say` is its spoken sentence. The
  renderer, the voice script and the captions all read the sentences from the slide, so they cannot drift apart.
- One slide holds the whole film. A second slide would mean a cut.

### The idioms inside `at(t)`

```js
const span = (a, b) => M.clamp((t - a) / (b - a));          // 0 before a, 1 after b
const out3 = M.ease.outCubic, io = M.ease.inOutCubic;       // an element arriving; a move from rest to rest
const shown = (a, b, c, d) => out3(span(a, b)) * (1 - span(c, d));   // in over a..b, out over c..d
const live = M.abs ? M.abs(t) : t;                          // real time, which keeps running during a hold
```

- Every animation is `span` with an ease on it. An arriving element uses `outCubic`. A camera move or a morph
  uses `inOutCubic`, or a smootherstep for the long moves.
- An element rises 18 px as it fades in. A headline's lines rise 0.14 s apart.
- A sequence is a stagger: item `i` runs on `progress * n - i`.
- A stroke draws itself with `pathLength="1"`, a dash array of 1 and a dash offset of `1 - progress`.
- Motion that must not stop during a hold reads `live`: the sway, a spinner, the dashes of a stream.

### Things that cost time once

- **A slide has no layout until it is shown.** `offsetWidth` is 0 inside `render`. The opening word is measured on
  the first call to `at`.
- **Direct children of a scene are absolutely placed.** A nested element needs its own `position`.
- **A style on a group replaces its `transform` attribute.** Wrap a transformed shape in a plain group and
  animate the wrapper.
- **Cross-fade two things by overlapping their fades.** The "a" and the "AI" in the opening word overlap, so the
  middle of the word is never empty.
- **Names on the ground are placed from the canvas.** `Plain.draw` returns the screen position of each named idea
  and each station, and the slide places its labels from those positions.
- **A label over the plain has a black ground.** Without it the bulbs show through the text.
- **Seed every random number.** A frame must come out the same on every render.

### The plain and its camera

- The ground is a grid with 60 units between ideas. The focal length is 1400 px. The camera is described by its
  distance, its elevation, the ground point it looks at, a sideways `x` and a forward `z`.
- The poses are named in the slide: `CLOSE`, `WIDE`, `NEAR`, `TRAVEL` and `HIGH`. `WIDE`, `TRAVEL` and `HIGH` all
  put the horizon a third of the way down the frame, at 343 px, so the sky keeps the same room for type.
- A move between poses blends distance geometrically and the rest linearly.
- A wave is a radius on the ground. A mark behind the front has changed state, and a mark at the front flashes.
- A marked idea given `brief: true` stands out as a named idea only while its name shows. The four-minute film
  names fifteen ideas this way in its opening, and they are ordinary ideas for the rest of the film.
- The grid is built for the widest camera the film uses. Give `Plain.create` that camera's position.
- A high camera needs a longer fade distance. The slide passes `fog` with the camera.

### One film's files beside another's

`film/film.mjs` names every file a film reads and writes. A new film in this folder adds an entry there, a deck
page, a slide index, a slide and a score. The scripts then run on it with its `--film=` flag.

## Stills before motion

A full render of the longer film takes 35 to 70 minutes. A still takes two seconds.

```
node film/render.mjs --film=4min --stills=3,9.3,22.6,31.6
py -3 film/tools/sheet.py sheet.png 3 960 film/out/stills-4min/t3.png film/out/stills-4min/t9.3.png ...
```

- A new picture is drawn as a still and judged before it is animated.
- Before any full render, a still of every beat's hold and of the middle of every move is laid out on a sheet and
  looked at. Check for a label under a card, a word that wraps, two labels that touch, anything cut by the frame,
  and a card with a hole in it.
- After a change, only the moments it touched are rendered again.
- A person, or a model that can see images, has to look at the sheet. A render that exits without an error has
  shown nothing about the picture.

## The voice

- **One clip to a sentence.** `film/render.mjs --timeline` writes `film/voice/narration.json` from the slide, one
  line a beat. `../sample/tts.mjs --dir=<the voice folder>` records each line and caches it by its text, voice
  and model, so an unchanged line is never recorded twice.
- **The settings used here:** model `eleven_v4`, format `mp3_44100_192`, and the voice's own saved settings.
  One line was also recorded on `eleven_multilingual_v2` for comparison (`film/voice-v2`).
- **Each clip is cut to its speech.** The voice opens a clip on an intake and trails off after the last word.
  After a pause both sound like a breath. `film/voice.mjs` cuts from 45 ms before the first word's attack to
  70 ms after the last word's decay, with a 20 ms fade in and a 90 ms fade out. The attack is 14 dB under the
  clip's loud speech and the decay is 40 dB under it. The lower decay level keeps a closing "s".
- **No room tone is added.** It is audible as static.
- **A line shared by two films uses one take.** The longer film's voice folder was started with the shorter
  film's clips, renamed to the longer film's beat numbers.
- **The model service can stall.** On the day of the first recording the calls hung for an hour during a partial
  outage. Check the service's status page before debugging the script.

## Timing the picture to the voice

`film/render.mjs` builds a timeline with one segment a beat.

| Constant | Value | Meaning |
|---|---|---|
| `LEAD` | 0.35 s | The line starts this long after its beat begins |
| `TAIL` | 1.0 s | The beat ends this long after the line |
| `FADE` | 0.35 s | The film fades from black and to black |

A beat lasts as long as its animation plus 0.4 s, or as long as its line with the lead and the tail, whichever is
longer.

### Motion must never stop between two beats

In the first cut of the longer film, each beat's animation finished and the frame then held until the line ended.
During the hold the camera's forward travel stopped, for 0.4 to 1.0 seconds, at the end of every beat. The
reviewer saw one of them as "a weird momentary hesitation at 1:17".

- With `stretch: true` in `film/film.mjs`, a beat's animation plays at the pace that fills the whole beat. The
  slide's clock then never stops, and neither does anything that moves with it.
- The one-minute film keeps `stretch: false`. Its camera is still during every hold, so its holds are not seen.
- Write each beat's animation to be about as long as its line. A stretched beat then plays at 80 to 95% of its
  written pace. The slowest beat in the longer film plays at 48%, and it is only type rising.
- `py -3 film/tools/stops.py <film.mp4>` finds an abrupt halt in a finished file.

### The pace must never change in a step

The second cut had no stops, and the reviewer still saw the picture "jerking subtly, like it's moving from one
scene to the next". Two things caused it, and both sat on the beat boundaries.

- Each beat played at its own constant pace. The camera travels across nine beats, so its speed changed in a
  step at each boundary, by as much as a fifth.
- Each beat's frames were counted from the beat's own start, and a beat's length is not a whole number of
  frames. One frame at each boundary therefore advanced the slide's clock by up to half a frame too much or too
  little.

The film's clock is now one function, `clock` in `film/film.mjs`, and the renderer and the sound script both use
it.

- With `stretch: true`, slide time is one smooth rising curve through the beats' boundaries. Each beat still
  starts and ends where it did, so the voice is not moved. The pace at a boundary is a mean of the paces of the
  two beats it joins, and the pace eases from one to the other inside the beats.
- Every frame's slide time is taken from the film's start, never from a beat's start.
- `node film/render.mjs --timeline` prints the largest change of pace between two frames. The second cut's was
  58% of full pace. The curve's is 0.5%.
- Measure this from the clock and not from the finished file. Two searches of a finished file were written and
  thrown away. The first compared the amount of motion before and after each frame, reported 87 moments, and
  could not tell a boundary from a card rising or a row of bulbs passing. The second looked for single uneven
  frames, missed known jerks and reported the encoder's keyframes.
- A long line slows its beat, because the beat's animation is spread over the line. When a line is more than
  about one and a half times as long as its beat's animation, lengthen the animation or give the sentence two
  beats.
- Stills cannot show a stop or a step in pace, and neither can a contact sheet. Both faults reached the reviewer
  because only stills had been looked at. Run both checks on every cut of a film whose camera moves.

### A spoken list is matched to the recording

When the voice names things one by one, each thing appears as it is named: the nine runtime requirements, the six
stations, the four controls.

```
py -3 film/tools/phrases.py film/voice-4min/cut/b9.wav
0.02-2.57 3.10-3.72 3.91-4.61 4.81-5.64 5.86-7.22 7.32-7.89 8.14-8.98 9.19-9.74 9.86-10.22 10.34-10.61
```

- Each span is a phrase. A span's start is when its word begins. Two words spoken without a pause come out as one
  span, and it is divided by the words' lengths.
- A mark appears 0.15 s before its word. `node film/when.mjs --film=4min 9 3.10 3.91 4.81` prints the slide times
  for words that start 3.10, 3.91 and 4.81 seconds into beat 9's clip. It reads the timeline, so run
  `render.mjs --timeline` first.
- A line recorded anew changes the pace of its beat and of the beats beside it. Run `when.mjs` again for any
  list in those beats.
- The times are kept as an array in the slide (`WORD_T`, `STATION_T`), and the score repeats them so each word's
  note lands on it. A new recording of that line needs them measured again.

## The sound

The film has no sound studio. Every sound is synthesised by `film/synth.js` in a headless browser, offline, at
48 kHz in stereo, so the same script always gives the same samples.

### Sounds are placed on the picture's clock

A sound is placed with `at(t, type, options)`, where `t` is a time on the slide's clock. The timeline maps it
into the film. A sound therefore stays on its event when a line's length changes.

### The instruments

| Instrument | Used for |
|---|---|
| `pad` | The held chord of the score |
| `pluck` | The quiet pulse of the score |
| `bell` | An arrival: a word, a station, an idea reaching production |
| `mallet` | A small set of things that belong together: three rings, four controls |
| `tick` | A thing appearing: a name, a row, a command starting |
| `blip` | One of many quick things: a condition passing |
| `confirm` | Two rising notes: a command or a decision completing |
| `sweep` | Air: a camera move, a wave over the plain |
| `gliss` | A rising tone: a light running to the horizon |
| `tone` | A held pure tone: the horizon drawing, an open question |
| `sub` | Low weight: a replica failing, the horizon opening, every idea at once |
| `stamp` | The receipt |

All of them feed one reverb and one gentle compressor.

### How the score is written

- **One chord for each step of the argument.** The chord changes when the headline changes. Both films are in
  D major. The chord is open while ideas wait, takes its major third when AI arrives, goes to the relative minor
  for code alone, and is the full home chord when every idea turns yellow. The longer film moves to E minor while
  the camera is at the runtime and comes home when the camera rises.
- **A pulse from the promise on.** It plays the upper notes of the chord in force, three to a second, and it
  thins while the camera is at the runtime.
- **A motif returns.** Two notes sound when "AI" takes the place of the "a". The same two return under the mark
  with a third that completes them. Three notes sound as three rings open and leave the chord open, and the same
  three places sound the home chord when the work is verified.
- **A set of things takes a scale.** The nine requirements take nine rising notes, panned from left to right as
  the words stand on the horizon. The six stations take six notes, and a light sounds a station's note when it
  arrives there.
- **Every event on screen has a sound, and each is quiet.** The longer film has 928 sounds.
- **One silence.** Every sound stops for half a second before every idea turns yellow, and a low weight lands
  with the wave.

### Levels

- The score steps back 6 dB under each spoken line.
- With a voice, the sound sits 13 dB under it and the whole mix is levelled to -16 LUFS with a true peak of
  -1.8 dB, in two passes of `loudnorm`. Without a voice, the sound alone is levelled to -20 LUFS.
- The audio is AAC at 192 kbps and 48 kHz.

### A model cannot hear

Both films' sound was placed and levelled by measurement and by spectrogram. A measurement shows that a mix is
level and that nothing clips. It does not show that a sound is pleasant or that the voice sounds like its owner.
A person listens to every cut before it is shared, and the hand-over note says so.

## The render

```
node film/render.mjs [--film=4min]             the picture, a caption file and the timeline
node film/sound.mjs  [--film=4min]             the sound, mixed with the voice when it exists
node film/render.mjs [--film=4min] --final     the picture at twice the size, scaled down
```

- A review cut captures JPEG frames at 1920 by 1080 and encodes H.264 at CRF 16, 30 frames a second. The final
  cut captures PNG frames at 3840 by 2160 and scales them down with Lanczos, at CRF 14.
- The review cut is the cut that is published. The four-minute film's final cut took 90 minutes to render, and
  its frames differed from the review cut's by less than one brightness level in 255 per channel. The reviewer
  could not tell the two apart, so a final cut is rendered only when someone asks for one.
- Until a voice is recorded, each line shows as a caption for the time it is estimated to take.
- The one-minute film renders in about 7 minutes and the four-minute film in 35 to 70. Run a render in the
  background, and do not start one to check something a still can show.
- Git ignores the `audio` folders of recorded clips, the cut clips and everything in `film/out` except the
  narrated one-minute film, the four-minute film at web size (`every-idea-4min-web.mp4`, the file published to
  akka.io) and the caption files (`../.gitignore`).

## Changing a line after a cut exists

A reviewer who has seen a cut often asks for a line to say something else. The picture, the voice and the sound
all hang on the slide's clock, so the change is made in this order.

1. Change the sentence in the slide's `beats`. The storyboard gets the same sentence and its source.
2. When one sentence becomes two, add a beat. Every time after the new beat on the slide's clock moves later by
   the new beat's length, in the slide and in the score. Change them with a script that prints each number it
   moves, and read the list. When two sentences become one, the earlier beat is removed and the later beat keeps
   its hold, so no time on the slide's clock moves.
3. Run `node film/render.mjs --film=4min --timeline`. It writes the new lines to the voice folder's
   `narration.json`.
4. A recorded clip is named by its beat and by a hash of its text. After a beat is added or removed, rename the
   clips of the later beats to their new numbers, so that only the changed lines are recorded.
5. Record with the voice folder given as a full path in `--dir=`, because `film/voice.mjs` opens the clips at
   the paths the recorder wrote. Run `node film/voice.mjs --film=4min`, and run the timeline again so it has the
   new lengths.
6. Run `film/when.mjs` again for every spoken list. A line's new length changes the pace of the beats beside it.
7. Render stills of the changed beats and look at them, then render the film and run every check.

## Checks before anyone sees a cut

| Check | How | Pass |
|---|---|---|
| Every beat was looked at | Stills on a sheet, from the slide | Nothing overlaps, wraps, clips or is unexplained |
| The finished file was looked at | `ffmpeg -i film.mp4 -vf "fps=1/7,scale=960:-1" f%02d.png`, then a sheet | The frames match the stills |
| Length | `ffprobe -show_entries format=duration` | Matches the timeline |
| Loudness | `ffmpeg -i film.mp4 -af ebur128=peak=true -f null -` | -16 to -17.5 LUFS, peak under -1.5 dBFS |
| No dead air | `-af silencedetect=noise=-50dB:d=1.5` | No span reported |
| No stops | `py -3 film/tools/stops.py film.mp4` | Only the fade from black |
| No step in pace | The line `render.mjs` prints with the timeline | Under 1% of full pace between two frames |
| No black | `-vf blackdetect=d=1.0:pix_th=0.02` | Only the opening, which is one bulb on black |
| The lists land | `film/when.mjs`, as in "A spoken list is matched to the recording" | Each mark 0.15 s before its word |
| The other film still renders | A few of its stills, after any change to `lib/` | Unchanged |
| The storyboard agrees | Read it against the stills | Every beat, count and draft wording is current |

The hand-over note says what was measured, what was looked at, and what nobody has heard or seen yet.

## What review changed

Each row is a note from a reviewer and the rule it became. A note is fixed everywhere it applies, and the rule is
written down the same day.

| The note | The rule |
|---|---|
| The first plan reordered a product page | Start from the company, and derive the product from it |
| Eight sections were too long to grasp | One sentence to a beat, and one job to a beat |
| The opening should be about every idea | Open on the largest idea, and place the narrow one late |
| The style frames glowed and looked cheap | Sharp marks, hairlines, no glow, haze, blur or grain |
| The viewer could not tell three test versions apart | Test an expensive technique briefly, and drop what is not seen |
| The text cards were wordy | A count or a drawing replaces a paragraph |
| The reference to the console made little impact | Show what the product does, with its own counts |
| The miniature screenshots did not work | Draw the product; never shrink a capture |
| The closing line was disliked | The author chooses the close, and candidates are listed in the storyboard |
| The coined word should arrive sooner | The film's own word stands on screen from the first second |
| A colleague did not understand the datapoints | Draw a mark as the thing it stands for |
| The key in the corner was distracting | No legend |
| "Each light is an idea." forced the point | No sentence that explains the picture |
| A drawing could be read as a ratio | Draw no proportion that was not measured |
| The console showed 36 of 40 | The author decides what a finished state shows, and the storyboard records it |
| The picture hesitated at 1:17 | Motion never stops between beats |
| The picture jerked subtly from one beat to the next | The pace never changes in a step, and frames are counted on one clock |
| "A person decides" sounded odd for an ambiguous decision | Say what the person is asked to do |
| The line on existing systems only implied the claim | State a claim outright, and give its means a sentence of its own |
| A short sentence was heard as dangling before the sentence it sets up | Two sentences that make one point are spoken as one sentence |
| The opening named five ideas under "more ideas than it can build" | The picture shows the quantity the line states |
| "A printed receipt" was heard as a sheet of paper | A thing takes the product's own name for it |

## Working on a film with an AI model

The two films were built in one long session with a coding model. What made that work:

- **Give it the source and the rules before the task.** The essay, the product facts, the language rules and this
  document were read first.
- **Ask for the storyboard and approve it before any code.** Decisions that belong to the author are asked as
  short questions with a recommendation, and the answers are written into the storyboard.
- **Ask for stills, and look at them.** The model renders a still, reads the image and fixes what it sees. The
  reviewer then sees a sheet. Most flaws in these films were caught on a sheet before a full render.
- **Have it say what it cannot judge.** It cannot hear. It reports levels and says the sound is unheard.
- **Ask for the motion checks by name.** A model looks at stills, and a still shows neither a stop nor a step
  in pace. Ask for the result of `stops.py` and for the pace line the renderer prints, on every cut.
- **Have it mark every invented word.** A draft line or label is listed for the author.
- **Keep the visual judgement in the main session.** A cheaper model can build a harness or a renderer. The
  session that designs a frame is the one that looks at it.
- **Spend renders carefully.** One full render of the longer film costs 35 to 70 minutes. Stills, a timeline run and
  the measuring tools answer most questions.
- **When a note comes back, change the rule.** The note goes into the storyboard, and into this document when it
  applies to every film.

## Starting a new film

1. Copy this folder's structure: a deck page, a slide index, a slide, a storyboard, and the `film` scripts.
2. Write the storyboard with the sections named in "The storyboard is the contract". Get it approved.
3. Decide the shot and the marks, and write "What the picture means". Draw the three hardest frames as stills.
4. Build the slide. Reuse `lib/plain.js` when the film is set on the plain, and write new drawings beside
   `lib/drawings.js`.
5. Render a still of every beat, lay them on a sheet and fix them.
6. Run `node film/render.mjs --timeline`, record the voice, and run `node film/voice.mjs`.
7. Measure any spoken list with `film/tools/phrases.py`, and set its times with `film/when.mjs`.
8. Write the score in its own module, one chord a headline and one sound an event.
9. Render the picture and the sound in the background. Run every check, the two motion checks among them.
10. Hand over the file with the measurements, the list of drafts, and a plain statement of what is unheard.
