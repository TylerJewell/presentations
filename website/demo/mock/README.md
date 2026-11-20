# Demo mock: the playable animatic

A 1920×1080 HTML animatic of the demo film, built from [storyboard.md](storyboard.md). Every scene is a
pure function of time, so the mock can be played, scrubbed and later captured frame by frame. No audio.

## Run it

Open `index.html` from disk in Edge or Chrome (`file:///C:/Users/tyler/competition/website/demo/mock/index.html`).
No server, no build. The only network use is Google Fonts.

| Key | Does |
|---|---|
| Space | Play or pause |
| ← / → | Back or forward 5 s |
| [ / ] | Previous or next scene |
| Home | Back to the start |
| S | Speed 1× or 2× |
| ? | The key list |

- `index.html#t=95` opens at 1:35; `index.html#s=3.2` opens at scene 3.2.
- `index.html?capture=1` hides the controls and draws the full 1920×1080 stage from the page's top-left corner,
  at scale 1, whatever the window's size. Headless Edge: `msedge --headless=new --window-size=1920,1080
  --virtual-time-budget=5000 --screenshot=out.png "file:///…/index.html?capture=1#t=95"`.
- From a browser console or a capture script: `mock.seek(t)`, `mock.play()`, `mock.pause()`,
  `mock.time`, `mock.total`, `mock.scenes` (id, act, start, duration, span, card), `mock.sceneAt(t)`.

## Files

| File | What it is |
|---|---|
| `index.html` | Loads the fonts, the CSS, `lib/`, `player.js`, then `scenes/index.js` |
| `tokens.css` | Design tokens: the akka.io palette and type, the console's dark theme |
| `player.css` | Stage, caption, chapter card, controls, and the classes `lib/` draws with |
| `player.js` | The master clock, `registerScene`, the controls |
| `lib/core.js` | Easing, rise-in, count-up, line draw, flow rail, dot grid, AKKA mark, product cards, stub placeholder |
| `lib/caption.js` | The lower-third caption and the caption zones |
| `lib/camera.js` | The camera (zooms) and the live clock |
| `lib/cursor.js` | The synthetic cursor and the spotlight |
| `lib/console.js` | The console frame: browser chrome, breadcrumb, the console shell in its dark theme |
| `lib/controls-board.js` | `S3Board`: the Controls board scenes 3.2 to 3.4 draw on one act clock |
| `lib/experiments.js` | `ExpView`: the Experiments view scenes 4.3 to 4.5 drive on one demo clock |
| `scenes/index.js` | The act list (chapter cards) and the scene order; loads every scene file |
| `scenes/<id>.js` | One scene per file |

## How the player works

`frame(T)` is the only thing that changes the picture. For master time `T` it finds the scene, shows that
scene's root, calls `scene.at(t)` with the scene's local time, and sets the chapter card, the caption and
the fade through black from the same `T`. Playing only advances `T`. So:

- **Never** use CSS transitions, CSS animations, `setTimeout` or `requestAnimationFrame` in a scene. Compute
  every style from `t` in `at(t)`. State kept between calls must be derived purely from `t` (or cached
  geometry), never "what happened on the last frame": the viewer can seek backwards.
- Cuts fade through black: 0.4 s out and 0.4 s in, never more than 0.8 s of black.
- The first scene of each act (Acts 1 to 6) opens with a 2.6 s **chapter card** (black, Instrument Sans, a
  yellow kicker, the AKKA mark) taken from that scene's own duration. During the card the scene's `t` is
  negative; the scene proper runs from `t = 0` to `t = this.span` (its `duration` less the card).
- The player writes `begin`, `cardDur`, `span` and `root` onto each scene; a scene that defines one of them
  is refused at registration, so name the scene's own fields otherwise.
  Act 0 is the cold open and has no card. Cards are set in `MOCK_ACTS` in `scenes/index.js`.
- The running time is the sum of the scene durations (now 378 s); the player logs an error over 380 s.

## Writing a scene

Each scene is one file, `scenes/<id>.js`, that calls `registerScene` once. A builder edits only their own
scene file. The order lives in `MOCK_ORDER` in `scenes/index.js`; a new scene file must be listed there.

```js
registerScene({
  id: '3.2',                 // storyboard id; the file is scenes/3.2.js
  act: 3,                    // its act (chapter cards come from MOCK_ACTS)
  title: 'Console: the Controls board, in force',
  duration: 16,              // seconds, from the storyboard, including any chapter card
  captionZone: 'bottom-left',// 'bottom-left' (default) | 'bottom-right' | 'bottom'
  caption: 'Here is the system’s contract with its regulators: …',   // the narration, verbatim

  render(root) {             // once, at load: build the DOM into root (a 1920x1080 box)
    root.classList.add('s32');
    Mock.style('s32', `.s32 .row { … }`);         // the scene's own CSS, scoped under its class
    this.r = Mock.mount(root, `<div class="board"><div data-k="row1">…</div></div>`);
  },

  at(t) {                    // every frame: set the state for local time t (seconds; < 0 under a card)
    Mock.rise(this.r.row1, t, 0.4);
  },
});
```

Rules that keep scenes consistent:

- Children of `root` (and of a `Mock.world`) are `position: absolute`; place them in stage pixels.
- Prefix the scene's CSS classes with its own class (`.s32 …`). Use the tokens in `tokens.css`, never raw
  colours: one yellow, status colours only for status.
- Keep the caption zone empty (see below). Keep everything else above y = 820 when the zone is a bottom one.
- Copy is the storyboard's. Say "the small model" and "Agent SDK"; simulated figures carry a "Simulated" chip.

## Production rules, built in

### Captions are a designed lower third

The player draws the caption; a scene only gives `caption` and `captionZone`. The caption has an
eyebrow naming the act ("Govern", no number), a hairline divider, the line in Instrument Sans 26 px, and a
soft blurred backdrop with a scrim. Narration is split at sentence ends only (short sentences share a line of
up to 96 characters; a long sentence wraps, and one that would take four rows sets at 23 px on a wider
panel). Lines show one at a time, each for its share of the words, handing over with a short overlap. Under
a chapter card the caption waits for the card to go; it leaves with the scene.

`Mock.ZONES[zone]` is the rect the caption owns (bottom-left: x 0 to 932, y 836 to 1080). Lay the frame
out around it. `Mock.stageInfo.caption` holds the current zone and the panel's rect.

### Intelligent zooms: `Mock.camera`

Put the scene's content in a world layer and move it from `at(t)`:

```js
render(root) { this.world = Mock.world(root); this.frame = Mock.consoleFrame(this.world, { crumb: 'Verify › Controls' }); … }
at(t) {
  Mock.camera(this.world, t, [
    { t: 3.0, rect: [420, 560, 1100, 64] },                 // push in to the readiness row, 1.1 s eased
    { t: 7.5, rect: [1200, 300, 520, 200], caption: 'bottom-right' }, // the next subject; the caption moves aside
    { t: 11.0, rect: null, dur: 1.2 },                      // ease back out
  ]);
}
```

- A key starts a move at `t` (in-out cubic over `dur`, default 1.1 s; keep it 0.8 to 1.4 s) to a view that
  frames `rect` (stage px, unzoomed) inside the area the caption leaves free, at most `Mock.CAM_MAX` (1.8×),
  and never showing past the stage's edge. `rect: null` returns to the full frame.
- `caption: zone` carries the caption to that zone during the move and frames the subject around the new
  zone, so the caption never covers what is being discussed.
- One subject at a time: push in, hold, ease out.
- Text stays crisp because the world is laid out at full size and only transformed. Never set `will-change`
  inside a world. `Mock.consoleFrame` defaults to the full stage (1920×1080) at the recordings' 1.2 scale.
- When a scene zooms, put its cursor and spotlight inside the world so they move with it.

### Data is loaded and moving before the scene is seen

A console scene opens on a populated screen with its live parts already in motion. Build live parts on the
**live clock**, which has been running since long before the film started, never on `t` from zero:

```js
const flow = Mock.loop(t, 1.6);                             // 0..1 phase of a 1.6 s loop, mid-cycle at t = 0
const requests = Mock.ticker(t, 1_204_000, 38);             // a counter that has been ticking at 38 a second
const latency = 180 + 40 * Mock.wander(t, 0.4, 2);         // a smooth, deterministic wandering figure
Mock.march(dashPath, Mock.abs(t), 18);                      // marching dashes already moving
```

`Mock.abs(t)` is the live clock for the current scene (90 s of pre-roll plus the scene's start).
`Mock.noise(n)` is deterministic jitter. Data arrives under the viewer's eyes only when the arrival is the
point (a readiness row flipping, a span drawing on).

## Helpers (`window.Mock`)

All motion helpers take the scene's local `t` and write the element's state for that instant.

| Helper | Does |
|---|---|
| `prog(t, start, dur)` | 0..1 progress, linear |
| `p(t, start, dur, ease)` | eased progress; eases: `reveal` (akka.io `cubic-bezier(.16,1,.3,1)`), `glide`, `outCubic`, `inOutCubic`, `inCubic`, `css`, `linear` |
| `ramp(t, a, b, in, out)` | a 0→1→0 window, for glows and highlights |
| `wave(t, period)` | 0..1 oscillation |
| `rise(el, t, start, {dy, dur})` | the akka.io rise-in: opacity over .7 s, 22 px lift over .8 s |
| `riseOut(el, t, start, end)` | rise in, then fade out at `end` |
| `fade(el, t, start, dur, from, to)` | opacity only |
| `lineRise(el, t, start, dur)` | a hero line rising from under its baseline (`.ln-mask > .ln`) |
| `countUp(el, t, start, dur, from, to, fmt)` | ease-out cubic count-up; `fmt.int`, `fmt.money`, `fmt.pct` |
| `draw(svgShape, t, start, dur)` | stroke-dash line draw of any SVG path, line, rect or circle |
| `march(svgShape, t, speed)` | moving dashes on a dashed stroke |
| `rail(parent, {vertical, style})`, `railAt(el, t)`, `railGrow(el, t, start, dur)` | the yellow flow rail |
| `dotGrid(parent)` | the faint 48 px yellow dot grid |
| `markSVG(height, fill)` | the AKKA mark |
| `productCard(parent, Mock.PRODUCTS[i], {compact})`, `cardGlow(el, g)`, `cardDraw(el, t, start)` | the family diagram's cards |
| `cursor(parent).at(t, keys)` | keys `[{t, x, y, click?, glide?, hide?}]`: arrives at (x, y) at `t` after a .7 s glide; clicks ripple; fades out on a hide and back in when it moves again |
| `spotlight(parent).at(t, keys)` | keys `[{t, rect | null}]`: dims all but rect, moves in .5 s, stops above the caption |
| `consoleFrame(parent, {crumb, active, title, bundle, tabs, tab, status, rect, scale})` | the console frame; `tabs`/`tab` is the view switch beside the title, `status` an extra bottom-bar item; returns `{el, page, band, bandRight, tabs, status, bundle}` |
| `rectOf(world, el)` | an element's rect in unzoomed stage px, whatever the camera and window scale; final once the player has booted (after the fonts) |
| `.mk-chip.demo` | the shared purple Simulated chip (smaller inside the console frame) |
| `world(root)`, `camera(world, t, keys)`, `frameRect(rect, zone)` | zooms (above) |
| `abs(t)`, `loop(t, period)`, `ticker(t, base, rate)`, `wander(t, speed, seed)`, `noise(n)` | the live clock (above) |
| `mount(parent, html)` | appends HTML; returns `{root, …}` keyed by `data-k` |
| `html(str)`, `svg(tag, attrs)`, `set(el, styles)`, `style(id, css)` | DOM shorthands |
| `placeholder(root, scene)` | the stub's "scene to come" card |

## Design tokens (`tokens.css`)

- **Brand (akka.io):** pure black `#000`, text `#F1F1F1`, muted `#A6A6A6`, dim `#4E4E4E`, the one accent
  yellow `#FFCE4A`; status only: cyan `#00DBDD`, green `#72D35B`, red-orange `#FF5400`. Hairlines
  `rgba(241,241,241,.10)` / `.20`.
- **Type:** Instrument Sans 700 tracked tight for headings (display 216 px at -0.045em, H2 64 px at
  -0.03em); Instrument Sans 600 uppercase, tracked, for eyebrows, kickers, chips and labels, with no rule
  beside them. JetBrains Mono only for code, terminals, file paths, and ids, digests and trace ids as data.
- **Motion:** rise-in 0.8 s on the reveal curve with 0.08 s staggers; line draws 0.5 to 0.9 s ease-out;
  flow rails on an 8 px dash pitch.
- **Console (dark theme of `docs/plans/gateway-onramp/onramp.css`):** `--c-bg #0b0b0d`, `--c-surface
  #161619`, `--c-line rgba(236,236,241,.12)`, `--c-text #ececf1`, gold, red, amber, blue, green and violet
  with their `-bg` tints.

## Voice, headlines and sound

`index.html?voice=1` times the film to Tyler's narration. Without the flag, the film plays at its designed timing.
The film follows the method of the IdeAItion film ([../every-idea/README.md](../every-idea/README.md)): one clip to
a sentence, a headline in place of printed narration, dissolves in place of black, and a synthesised score.

- **Narration:** each scene's `caption` is its narration. `narration.json` holds the captions verbatim, in order,
  and `sentences/narration.json` holds them one sentence to a line (`2.1.3` is the third sentence of scene 2.1).
- **One clip to a sentence:** `sentences/audio` holds a clip for each sentence, recorded with Tyler's Professional
  voice `Bnd74uonOEZYmdUm8SZs` on `eleven_v4` at `mp3_44100_192`. `film/assemble.mjs` cuts each clip to its speech
  and joins a scene's sentences with the pause in `film/pacing.config.json` (0.7 s). It writes `audio/paced/<scene>.wav`,
  `durations.json` and `pacing.js`.
- **Timing:** a line starts 0.35 s after its scene begins, and the scene ends 1.0 s after its line (`tail` in
  `film/pacing.config.json`). The scene's designed animation plays faster or slower to fill that length.
  `Mock.captionAt` follows the paced clip, so a highlight lands on its word. The clip lengths reach the player
  through `voice.js`, which `render.mjs --voice` writes from `durations.json`.
- **Headlines:** `window.MOCK_FILM = { dissolve: 0.5, headlines: true }` in `scenes/index.js` turns both on for this
  film; the other films that load this player keep printed narration and fades through black. A scene's `headline`
  is one complete sentence, shown in the lower third for the whole scene. A scene with its own title on screen has
  no `headline` and no lower third. The narration is not drawn; it goes to the caption file a sentence at a time.
- **Dissolves:** each scene dissolves in over the last frame of the scene before it, in 0.5 s. No act has a chapter
  card (`card: false` in `MOCK_ACTS`). The film is black only at its start and its end.
- **Sound:** `film/sound.mjs` synthesises the score with `../every-idea/film/synth.js`. The chord changes with each
  scene, a pulse runs from the title to the end card, and each designed sound is placed on the moment a word of the
  narration is spoken (`WORDS` in the script) or on a cursor click. Every sound stops for half a second before the
  end card. The sound sits 13 dB under the voice and the mix is levelled to −16 LUFS with a true peak of −1.8 dB.
  `sound/` holds the music bed and effects of the earlier cut, which other films' renders still use.
- **Spoken forms:** `SPOKEN` in `demo/sample/tts.mjs` holds the terms the voice reads unreliably. The caption file
  keeps the written form.

Re-running after a line changes:

1. Change the scene's `caption`, and any `Mock.captionAt` word the scene or `film/sound.mjs` keys to it. Run
   `node website/demo/mock/render/narration.mjs` to rewrite `narration.json`, and split it into
   `sentences/narration.json`.
2. Record the changed sentences. Clips are cached by text, voice and model, so only a changed sentence is recorded:
   `ELEVENLABS_VOICE_ID=Bnd74uonOEZYmdUm8SZs ELEVENLABS_MODEL_ID=eleven_v4 ELEVENLABS_OUTPUT_FORMAT=mp3_44100_192
   node website/demo/sample/tts.mjs --dir=C:/Users/tyler/competition/website/demo/mock/sentences`.
3. Run `node website/demo/mock/film/assemble.mjs`.
4. Run `node website/demo/mock/render/render.mjs --voice --no-mix --name=about-akka`. It writes `voice.js`, captures
   frames into `render/out/frames-voice` (cleared whenever the scene timing changes), and writes
   `about-akka-silent.mp4` with the act chapters and `about-akka.srt`.
5. Run `node website/demo/mock/film/sound.mjs --name=about-akka`. It writes `about-akka-sound.wav` and
   `about-akka.mp4`.
6. Run the checks in [../every-idea/README.md](../every-idea/README.md) "Checks before anyone sees a cut".

## Scene status

| Scene | State |
|---|---|
| 0.1 to 5.1 | Built and reviewed at 1920×1080 (see `review/`) |
| 6.1 Efficiency from actors (18 s) | Built: one core fills with actors, the cluster grows and rebalances, latency flat; a grey stack multiplies, idle headroom shaded |
| 6.2 Every interaction, cheaper (16 s) | Built: the interaction in cost slices, ×1 to ×1,000,000,000, the customer proof strip, "Up to 90% lower infrastructure cost" |
| 6.3 Forecastable AI (22 s) | Built: cost per interaction × volume, the metered bill with its surprise against the flat bill and its forecast, token spend in its band |
| 6.4 Sovereign, on any cloud (14 s) | Built: the platform drops into each provider frame; `PROVIDERS` at the top of the file (Alibaba Cloud awaits confirmation) |
| 6.5 End card (12 s) | Built (was 5.2) |
