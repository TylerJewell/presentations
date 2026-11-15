# The Proposal Review Panel film: the animatic

A 15-minute (900 s) deterministic HTML animatic of [storyboard.md](storyboard.md), built on the demo engine
by relative path: `../mock/lib` (core, cursor, console, caption, camera), `../mock/player.js` and
`../rbc/lib/seq.js`. Nothing is copied from the engine and nothing here is published; the output is local files.
Captions stand in for the voice until the narration is recorded.

## Run and render

- Open `index.html` from disk in Edge (`file:///C:/Users/tyler/competition/website/demo/proposal-panel/index.html`).
  Space plays, `[` / `]` step scenes, `#s=2.2` opens at a scene, `?` lists the keys. `?capture=1` draws the bare
  1920x1080 stage for capture.
- `node website/demo/proposal-panel/render/shots.mjs [--only=1.2,1.3] [--t=125,130]` writes a still into `review/` at
  the start of every caption line (a beat), at the middle of every beat, and at the scene's final hold:
  `review/<scene>_<n>.png`. It prints any console error the page logged. Look at every frame before handing a
  scene over; never assume.
- `node website/demo/proposal-panel/render/narration.mjs` rewrites `narration.json` from the timeline and reports any
  line that is long for its scene (seconds less 3, times 2.2 words a second).
- Voice and film rendering follow the main film: `node website/demo/sample/tts.mjs --dir=<this folder>` for the clips,
  then the film renderer pattern of `../rbc/film/render.mjs`.

## Files

| File | What it is |
|---|---|
| `scenes/index.js` | The timeline: `MOCK_ACTS` (chapter cards) and `FILM_SCENES`, every scene in order with its act, title, duration, rail question `q` and narration `say`. The only place scenes are listed. |
| `scenes/s<id>.js` | One scene per file, named by id with a dash (`s2-2.js` is scene 2.2). |
| `narration.json` | One line per scene, generated from the timeline. |
| `film.css` | The film's classes over the mock's tokens and player CSS. |
| `lib/film.js` | `Film`: the facts, `register`, `note`, `chip`, `bundleRow`, `persona`, `glow`, `app`, `console`. |
| `lib/rail.js` | `Film.Rail`: the chapter rail layer. |
| `lib/seq.js` | `Film.seq`: sequence diagrams with retry loops and restart bands. |
| `lib/control-line.js` | `Film.controlLine`: the control-point line with its travelling packet. |
| `lib/panel-flow.js` | `Film.panelFlow`: the proposal, four personas and synthesis with the work token. |
| `render/shots.mjs`, `render/narration.mjs` | The review stills and the narration file. |
| `review/` | The stills; look at them. |

## Adding or building a scene

A scene file holds only `render(root)` and `at(t)`; everything else comes from its row in the timeline.

```js
Film.register({
  id: '4.2',
  captionZone: 'bottom-left',          // optional: 'bottom-left' (default) | 'bottom-right' | 'bottom'
  timing() {                           // key moments on the caption's own clock, so highlights land on their words
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { deny: at('denies') };
  },
  render(root) { Mock.dotGrid(root); Film.note(root); this.r = Mock.mount(root, `…`); },
  at(t) { this.timing(); Mock.rise(this.r.h, t, 0.1); },
});
```

- Build only your scene file. Do not edit `scenes/index.js` (the row is there already), `film.css` or `lib/`;
  if a shared piece needs a change, say so rather than forking it. A scene's own CSS goes in `Mock.style(id, css)`
  scoped under the scene's root class (`.s42 …`).
- `at(t)` sets every style for instant `t` and nothing else: no transitions, animations, timers or state from the
  previous frame. Under a chapter card `t` is negative. The first scene of each act (1 to 7) carries a 2.6 s
  chapter card taken from its own duration.
- `Mock.captionAt(this, word)` is the time the caption reaches the first word starting with `word`; use a word
  that occurs once, or pass the index to start from. Call it from `at()` (via `timing()`), not from `render()`.
- Keep the caption zone empty (bottom-left: x 0 to 932, y 836 and below) and the rail strip (x 950 to 1880, y 996
  and below) empty. Everything else sits above y = 836. If a camera move carries the caption to the right, the
  rail steps aside on its own.
- Console scenes: `Film.console(root, { crumb: 'Verify › Controls' })` for the local console (the panel is the
  system) and `Film.app(root, { tab })` for the panel's own dashboard; both sit in browser chrome at
  `[40, 36, 1840, 940]`. Put `Film.note(root)` on every console scene and the title card. Use
  `Mock.cursor(root).at(t, keys)` and `Mock.spotlight(root).at(t, keys)`; put them inside a `Mock.world` when the
  scene zooms. Console words: a plain title, at most one summary sentence, then the data.
- The placeholder files in Acts 3 to 8 are the stubs to replace.

## Shared components

- `Film.register(def)`: fills `act`, `title`, `duration`, `caption`, `q` from the timeline and wraps `at` so the
  rail is drawn after the scene.
- `Film.note(parent)`: the "Illustrative system and data" note, top right.
- `Film.chip(word, { big })`: HTML for a status chip, one tone and one icon per word (`Upheld`, `Breached`,
  `Denied`, `Blocked`, `Held`, `In force`, `Signed`, `Rehearsal`, `Draft`, …; unknown words are grey).
- `Film.bundleRow(parent, { sentence, chips, x, y, w })`: one commitment as a sentence with chips; returns
  `{ root, s, chips }`; glow with `Film.glow(root, g)`.
- `Film.persona(parent, p, { x, y })`: a persona card from `Film.PERSONAS`; `refs.ans` is the answer row.
- `Film.glow(el, g)`: sets `--g` (0..1) on any card.
- `Film.app(parent, { rect, tab, url })` and `Film.console(parent, opts)`: see above; both return `{ el, page, … }`.
- `Film.Rail`: `GEO`, `itemX(i)`, `item(i, cls)` for scenes that draw the rail themselves (0.2, 8.1); a scene row
  with `rail: false` hides the shared rail.
- `Film.seq(root, { x0, x1, top, headH, row, keyAt, lanes, rows })`: `rows` are Seq messages
  (`{ from, to, label, at, reply?, write? }`, `from === to` draws a loop), `{ band: 'text', at }` bands and
  `{ gap: true }` empty rows. `Seq.TYPES.agent` exists. Call `.at(t)`.
- `Film.controlLine(parent, { x0, x1, y, points, model, auth })`: `.packet(p)`, `.lit(id, g)`, `.show(id, o)`,
  `.mark(id, word)`, `.x(id)`; ids are the points' ids plus `model` and `auth`.
- `Film.panelFlow(parent, { y })`: `.at(t, { cards, visit: [t, t, t, t], dwell, synth })`; refs `proposal`,
  `personas`, `synth`, `score`, `results`.
- The facts: `Film.SYSTEM`, `Film.PERSONAS`, `Film.REVIEW`, `Film.BUNDLE`, `Film.QUESTIONS`. Use them, so no two
  scenes disagree.

## The Controls board (`lib/board.js`)

`Film.board` draws the console's Controls board inside a `Film.console` page (set the page to 570 px high; the
parts are laid out in the console's logical px, x 0 to 1289). Scenes 3.1 to 3.5 draw it; 5.5, 6.1 and 7.2 reuse
the parts. `index.html` does not list the file yet, so `scenes/s3-1.js` loads it; add
`<script src="lib/board.js"></script>` after `panel-flow.js` and that loader steps aside.

- `Film.board.head(page, { chip, meta })`: the system's name, its bundle's state and one line of facts.
- `Film.board.rail(page, { x, y, w, items: [{ v, line, chip?, ghost? }], on })`: the rail of versions; `select(i)`, `show(i, o)`.
- `Film.board.rows(page, { x, y, w, items = Film.BUNDLE, h, gap, mark })`: the six commitments as sentences with a
  kind chip and typed target chips; `glow(i, g)`, `show(i, o)`, `targets(o)`, `detail(i, html)` + `expand(i, p)`
  opens a row (6.1), `mark(item)` puts HTML at a row's right end (7.2).
- `Film.board.ring(page, { x, y, size })`: Prepare / Sign / In force; `set({ phase, steps, pulse, version, line })`, `node(i)`.
- `Film.board.steps(page, { x, y, w })`: Adopt / Describe / Plan / Decide; `set(done, now)`.
- `Film.board.ready(page, { x, y, w, h })`: the readiness rows; `set(i, { p, value, chip })`.
- `Film.board.signer(page, { x, y, w, h })`: the two sections; `stamp(i, p)`, `rehearsal(o)`.
- `Film.board.ticks(page, { x, y, w, n, h })`: the verdict-tick row; `set(['Upheld', 'Breached', null, …])` (5.5).
- `Film.board.typed(kind, name)`, `Film.board.TARGETS[id]`, `Film.board.AGENTS`: the typed target chips and the facts behind them.

## Rules

- Visual: pure black, one yellow `#FFCE4A`, Instrument Sans 700 tracked tight, uppercase eyebrows with no rule
  beside them, the 48 px dot grid, hairline cards with even borders (never a one-sided accent border). Status
  colours only for status: cyan `#00DBDD`, green `#72D35B`, red-orange `#FF5400`. Mono only for code and ids.
  No chapter numbering on slides. Headlines 64 to 84 px, body 26 to 36 px, labels 20 to 26 px. Few large
  elements per frame; the subject of the current sentence glows.
- Language: every title and line is a complete sentence, a plain engineering statement; nothing sells, nothing
  is framed negatively; never "event store" or "design target"; American spelling. The audience is risk and
  safety officers: preventive, detective and authorization controls, control register, segregation of duties.
  Controls are never personified.
- The narration in the timeline is final. If a line cannot be heard in its scene's time, change it in the
  timeline and in `storyboard.md`, run `render/narration.mjs`, and say so in the handover.
- Data on screen is illustrative; every title and console scene carries the note.
- Nothing is published; nothing outside this folder is edited; no model or voice call is made from here.

## The Human page (`lib/human.js`)

`Film.human` draws the Human page and the human-control pieces for Act 6, and for any later scene that returns
to a person deciding. `index.html` does not list the file yet; each Act 6 scene file loads it itself (the loader
at the top of `s6-2.js` to `s6-6.js`), so adding `<script src="lib/human.js">` after `lib/film.js` is the only
change needed to make it a normal shared file.

- Facts: `Film.human.HELD` (the held review `rev-3b18d05e`, Action approval, `release-weak-review`, score 4.2,
  minimum review 10 s) and `Film.human.BLOCKED` (the Triage event for `rev-a90f42c1`).
- `Film.human.page(root, { tab })`: the page inside `Film.console` (crumb Verify › Human, Waiting | Answered):
  the four figures, the filter bar, the Waiting columns and one Answered row. Returns
  `{ frame, page, stats, count, queue }`; `count` is the badge on the Human nav item, `queue` the rows' container.
- `Film.human.row(queue, ev, { y })`: a Waiting row with the countdown ring, subject, status chip, pattern chip,
  control and reason; refs `ring`, `due`, `subject`, `status`, `pattern`, `reason`, `open`. `Film.human.ring(svg, p)`
  fills the ring; glow the row with `Film.glow(row.root, g)`.
- `Film.human.tray(page, ev, { x, y, w })`: the event tray over the right of the page, holding only what the event
  carries: the report's score against the threshold, the consensus risks and the control's check, the minimum
  review bar, Approve release and Reject with their effects as captions, the reason field and the independence line. Call
  `T.at({ open, review, chosen, reason })` from `at(t)`; refs `report`, `evidence`, `min`, `approve`, `reject`,
  `reasonBox`, `indep` take `Film.glow` (`indep` through `--g`).
- `Film.human.lifecycle(root, { x0, x1, y })`: the five steps raised, claimed, decided, applied, kept at stage
  size, with the person marker; `L.at(p)` places the marker at step `p` (fractions travel, below 0 hides it) and
  lights the steps reached; `L.base` is the line for `Mock.draw`, `L.steps[i]` the labels.

## Scene ownership

| Act | Scenes | Files |
|---|---|---|
| 0, 1, 2 | 0.1 to 2.3 | built: `s0-1` to `s2-3` |
| 3 | 3.1 to 3.5 | `s3-1.js` to `s3-5.js` (Controls board, chips and linked code, three-phase ring, signer, in force) |
| 4 | 4.1 to 4.5 | `s4-1.js` to `s4-5.js` (hostile proposal, guardrail denial, trace, similarity map, sanitizer) |
| 5 | 5.1 to 5.5 | `s5-1.js` to `s5-5.js` (flow with control points, response guardrail, dial, parallel lanes, verdicts) |
| 6 | 6.1 to 6.6 | `s6-1.js` to `s6-6.js` (Human page, decision tray, lifecycle rail, pattern wall, three patterns) |
| 7 | 7.1 to 7.2 | `s7-1.js`, `s7-2.js` (one record, bundle compare) |
| 8 | 8.1 to 8.2 | `s8-1.js`, `s8-2.js` (rail rises to centre, your system) |
