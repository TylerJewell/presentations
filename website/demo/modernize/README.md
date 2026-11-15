# Modernizing with Akka Specify: the film

A deterministic HTML film of about nine and a half minutes, built from `storyboard.md` on the demo engine by relative path
(`../mock/lib`, `../mock/player.js`), the same way as `../roi` and `../tokenomics`. Nothing is copied from the
engine. It opens with what a software factory is, what makes its output production-ready and the two ways a factory starts
(1.1 to 1.6),
follows one illustrative system, a freight-rating engine, through its own factory's five stations (Discover, Decide,
Specify, Build, Release) until its twin runs in pre-production (2.1 to 8.1), shows many projects' factories running at
once in a loop (8.2), then widens to every idea on an organization's roadmap (9.1 to 9.4). Every project is its own
factory; the organization's exit conditions apply to all of them. The figures are round illustrative values from the storyboard. The narration is the owner's script, `script.md`, applied
word for word; `scenes/index.js` carries the same text. From 3.1 on,
most scenes also show the Akka console's own screen for their step, captured from Akka's loan-origination sample. The narrated film is rendered with Tyler Pro's voice.

## Play it

Open `index.html` in Edge. Space plays, `[` / `]` step scenes, `#s=3.2` opens at a scene, `?` lists the keys,
`?capture=1` draws the bare 1920x1080 stage.

## Folder

| Path | What it holds |
|---|---|
| `script.md` | The owner's narration script, one paragraph per scene. The narration source of truth. |
| `scenes/index.js` | The timeline: id, title, duration and narration `say` for every scene, the same text as `script.md`. The only place scenes are listed. |
| `scenes/<id>.js` | One scene per storyboard scene, 1.1 to 9.4. Each is a pure function of time: `render(root)` once, `at(t)` for any instant, with its motion keyed to the words of its narration. |
| `lib/factory.js` | `Fx`: registration, the five stations at the foot of every scene from 3.1 to 8.1, cards, tiles, station pills, the drawing layer and the packets that carry work along a path. |
| `film.css` | The `fx-` classes over the mock's tokens and player CSS. |
| `narration.json` | One line per scene, written from the timeline. |
| `durations.json` | Each scene's narration clip and its length, written by `film/assemble.mjs` (paths relative to this folder). Before the voice step it holds the designed seconds. |
| `pacing.js` | `window.MOCK_PACING`: the 1.2 s tail and each sentence's word range and time span, written by `film/assemble.mjs`. |
| `film/assemble.mjs`, `film/pacing.config.json` | Builds each scene's clip from its sentence clips with breath conditioning, 0.9 s between sentences and a 1.2 s tail. |
| `render/narration.mjs` | Writes `narration.json`, `durations.json` and `sentences/narration.json` (one entry per sentence, the voice step's input) from the timeline, and lists any scene whose narration needs longer than its designed duration at the storyboard's pace. Text only. |
| `render/shots.mjs` | Review stills of every beat into `review/`; `--contact` also tiles them into `review/contact.png`. |
| `screens/` | The captured console and documentation screens the scenes frame (listed below). Not yet tracked. |

`review/`, `sentences/`, `audio/` and `out/frames-voice/` are working files and are not tracked.

## The console screens

Each screen is a 1920x1080 page captured with Playwright at device scale 2 (3840x2160 PNG), in the console's dark
theme, from Akka's loan-origination sample. The console's bottom bar, which names a local folder, is hidden at
capture or left outside the crop. `Fx.screen` frames a screen in a hairline frame on black under a caption naming
its source and view, pans and zooms between two page regions over the sentence it serves, and outlines the part the
sentence is about. While it shows, a black backdrop covers the scene's own drawing.

| File | Source and view | Scene | Shown under |
|---|---|---|---|
| `changes-methods.png` | Console, Changes › Ideation methods and probes (methods table) | 3.1 | the first sentence; Research and Landscape outlined |
| `redesign-probes.png` | Specify redesign page (`changes-page.html`, dark theme), Changes › Probes | 3.3 | the last sentence; Read, Run and Diff outlined |
| `changes-spec.png` | Console, Changes › Spec (summary and user stories) | 5.1 | the last sentence; the summary's citations outlined |
| `changes-schedule.png` | Console, Changes › Plan and tasks › Schedule | 5.2 | the first sentence; the tasks-per-step row outlined |
| `docs-graph.png` | Generated documentation, component reference › Component graph | 6.1 | the last sentence; the agent outlined |
| `doc-graph.png`, `doc-entity.png`, `doc-lifecycle.png`, `doc-interaction.png`, `doc-sequence.png`, `doc-api.png` | Generated documentation: component graph, entity diagram (domain model), loan application lifecycle, interaction diagram, the sequence for raising and deciding a human event, and one endpoint's routes | 6.2 | the whole scene, as a labelled mosaic; each tile lifts as its kind is named |
| `design-overview.png` | Console, Design (the integration tests card: 365 of 365 passed) | 6.3 | the first sentence |
| `changes-exit.png` | Console, Changes › Exit conditions | 7.1 | the last sentence; How it is checked outlined |
| `changes-spec.png` | Console, Changes header timeline (the same capture as 5.1) | 7.2 | the last sentence; a pan from constitution to ship |

The documentation tiles are element captures of the expanded sections of the sample's `docs/index.html`, cropped to
each graphic's body. The sample's docs contain no calculation-pipeline diagram, so the mosaic has none. No console
screen shows run records or cost for the sample (Cost needs an Optimize environment; Changes › Runs and cost has no
build runs recorded), so 8.2 is drawn.

The probe catalogue comes from the Specify redesign page because the live console shows it greyed while its route is
not served by the shipped CLI.

## Build steps

1. `node website/demo/modernize/render/narration.mjs`.
2. `node website/demo/modernize/render/shots.mjs --contact [--only=3.2]`. Playwright is resolved from this folder, or from
   the package folder named in `PLAYWRIGHT_FROM`. Look at every still for overlaps, clipped text, text under
   lines and anything in the caption's corner, then at `review/contact.png`.

## The frame

- The caption owns the bottom-left corner (x below 932, y below 836). Nothing else is drawn there.
- From 3.1 to 8.1 the five stations sit at the bottom right; the lit station is the scene's, and the system's
  marker slides to it from the previous station. In 2.1 the rail is the subject and is drawn large; 9.2 and 9.3 draw
  the stations as their own line;
  the opening, 1.1 to 1.6, draws the factory as its own line, and 9.1 and 9.4 hold a single idea on black, so
  none of them carries the foot rail.
- Headlines are complete sentences taken from the narration. Card names, chips and labels are short.
- Status colours appear only as status: Observed (cyan), Confirmed, Met, Passed, Signed off and Active (green),
  and the one conflict in 3.4 (red-orange).

## Voice

Tyler Pro (`ELEVENLABS_VOICE_ID=Bnd74uonOEZYmdUm8SZs`), `eleven_multilingual_v2`, `mp3_44100_192`, no voice settings, no
denoise, one clip per sentence. Run from this folder:

1. `node render/narration.mjs` writes `sentences/narration.json`.
2. `node website/demo/sample/tts.mjs --dir=<this folder>/sentences` with the voice variables set.
3. `node film/assemble.mjs` cuts each clip at the speech and writes `audio/paced/`, `durations.json` and `pacing.js`.
4. `node ../mock/render/render.mjs --film=<this folder> --name=modernizing-with-akka-specify --voice` renders
   `out/modernizing-with-akka-specify.mp4`, the silent MP4 and the SRT, with the music bed ducked under the voice and
   the mix at -16 LUFS and -1.8 dBTP. Delete `out/frames-voice` after any change to a scene or a clip.
