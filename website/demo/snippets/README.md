# Akka in 90 seconds: the snippet series

A series of short films, each about one area of the platform, made to the same standard as the 5-minute
film (`demo/mock`). Each one stands alone, so it can be sent, embedded on a product page or played at a
booth without the others.

## The format

Every snippet has the same four parts, and is never longer than 90 seconds.

| Part | Length | What it does |
|---|---|---|
| Where it lives | about 12 s | The platform as a whole (the family diagram from the film), then a push into the part that owns this area. The part opens into its capabilities, and the featured one lights. |
| The problem | about 10 s | One picture of the problem this area solves, in the buyer's terms. |
| The tour | 50 to 60 s | The area in the console, as one continuous screen, in three or four beats. Each beat shows one thing the area does that a buyer would pay for. |
| The close | about 8 s | One line of value, the area's name, and the end card. |

Rules shared by the series:

- **One area per film.** Other parts of the platform appear only in "Where it lives".
- **The same opening.** "Where it lives" is one shared scene (`lib/setup.js`), configured with the part and the
  capability. Every snippet opens the same way and differs only in where the camera lands.
- **The same system.** Every snippet uses the film's system, Loan Origination, and its figures, so the
  series and the film never contradict each other.
- **No chapter cards.** A 90-second film has no time for them; the caption's eyebrow names the part.
- **Narration of about 190 words**, at the film's pace (2.5 words a second), with a breath after each line.
- **The film's visual language and rules** (`demo/mock/storyboard.md` "Visual language", `demo/README.md`
  quality rules): pure black, one yellow, Instrument Sans, status colours only for status, no rule bars beside
  words, no mono titles, no chapter numbering.
- **Voice and sound** follow `demo/mock/README.md` "Voice" once a storyboard is approved: the Tyler Pro voice
  on eleven_multilingual_v2, the tapered line endings, the music bed and the effects.

## How a snippet is built

Each snippet is a folder here with its own `index.html`, `scenes/` and `storyboard.md`. It runs on the
film's player and libraries (`../../mock/player.js`, `../../mock/lib/`), read-only, plus `../lib/` for what the
series shares. Open `index.html` from disk: Space plays, the arrow keys seek, and `#s=<scene>` starts at a
scene.

## Voicing and rendering a snippet

From `C:\Users\tyler\ai-console`, with `ELEVENLABS_API_KEY` set:

1. `node website/demo/mock/render/narration.mjs --film=demo/snippets/<name>` writes the snippet's `narration.json` from its
   captions.
2. `ELEVENLABS_VOICE_ID=Bnd74uonOEZYmdUm8SZs ELEVENLABS_MODEL_ID=eleven_multilingual_v2 ELEVENLABS_OUTPUT_FORMAT=mp3_44100_192
   node website/demo/sample/tts.mjs --dir=demo/snippets/<name>` writes `audio/` and `durations.json`.
3. `node website/demo/mock/render/render.mjs --voice --film=demo/snippets/<name> --name=akka-<name>` writes `voice.js`, then
   `out/akka-<name>.mp4`, `-silent.mp4` and `.srt`, mixed exactly as the main film (the same music bed and effects
   from `demo/mock/sound/`).

## The series

| Snippet | Part | State |
|---|---|---|
| [Experiments](experiments/storyboard.md) | Optimize | Storyboard and mock, for review |
| Controls board | Verify | Proposed |
| AI-BOM | Verify | Proposed |
| Evidence record | Verify | Proposed |
| AI gateway | Optimize | Proposed |
| Specify, spec to proof | Specify | Proposed |
| One binary: scale and recover | Agent SDK | Proposed |
