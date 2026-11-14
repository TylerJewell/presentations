# Tokenomics in Akka: the film

A five-minute deterministic HTML animatic of [storyboard.md](storyboard.md), built on the demo engine by relative
path (`../mock/lib`, `../mock/player.js`). Nothing is copied from the engine and nothing is published. Captions
stand in for the voice until Tyler approves the script. The finished files are named `tokenomics-in-akka`.

## Play it

Open `file:///C:/Users/tyler/ai-console/demo/tokenomics/index.html` in Edge. Space plays, `[` / `]` step scenes,
`#s=2.3` opens at a scene, `?` lists the keys, `?capture=1` draws the bare 1920x1080 stage. The only network use
is the Google Fonts link; without it the page falls back to the system sans.

## Folder

| Path | What it holds |
|---|---|
| `scenes/index.js` | The timeline: `MOCK_ACTS` (chapter cards for Acts 1 to 4) and `FILM_SCENES` (id, act, title, duration including any card, question `q`, narration `say`). The only place scenes are listed. |
| `scenes/<id>.js` | One scene per file. 0.1, 0.2, 5.1 and 5.2 are built; the others are `Tok.stub` placeholders for the act agents. |
| `lib/tokenomics.js` | `Tok`: register, question, capture, bridge, chip, loop, the seven questions. Its API is at the top of the file. |
| `film.css` | The `tk-` classes over the mock's tokens and player CSS. |
| `captures/` | Console captures (PNG, 1600x900 at scale 1.2) and `figures.json`, written by the capture step. |
| `render/shots.mjs` | Review stills into `review/`: each caption line's start and middle, and the final hold. |
| `render/narration.mjs` | Writes `narration.json` from the timeline (text only). |
| `render/figures-check.mjs` | Checks every narrated number against `captures/figures.json`. |
| `review/` | The stills. Look at every one. |

## Build steps

1. Captures: each Cost page in demo mode at 1600x900, device scale 1.2, into `captures/`, with
   `captures/figures.json` as `{ "<scene id>": { "<label>": value } }` for every figure on screen.
2. Scenes: replace each stub with `Tok.register({ id, render(root), at(t) })`. Edit only your own scene files; ask
   for a change to `lib/` or `film.css` rather than forking it.
3. Stills: `node demo/tokenomics/render/shots.mjs [--only=1.1,1.2]`; look at every frame for overlaps, clipped
   text and anything under the caption.
4. Narration: `node demo/tokenomics/render/narration.mjs`, then
   `node demo/tokenomics/render/figures-check.mjs`. The check fails on any narrated number that is not among its
   scene's captured figures (`--list` shows what it reads from the narration). The voice step waits until it passes.

## Voice

The voice is generated only after Tyler approves the script. Pass the voice id on each run, because the user
variable still holds a deleted voice:
`ELEVENLABS_VOICE_ID=Bnd74uonOEZYmdUm8SZs ELEVENLABS_OUTPUT_FORMAT=mp3_44100_192 node demo/sample/tts.mjs --dir=C:/Users/tyler/ai-console/demo/tokenomics`
(`eleven_multilingual_v2`). The mix, the whoosh and stinger on the four chapter cards and the checks follow
`demo/mock/README.md` and `demo/README.md`.
