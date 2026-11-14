# Akka total cost: the film

A deterministic HTML film of 6:10 with Tyler's voice, built on the demo engine by relative path (`../mock/lib`,
`../mock/player.js`), the same way as `demo/tokenomics`. Nothing is copied from the engine. The finished film
plays at akka.io/roi, which `tools/hubspot/port_roi_page.py` publishes from `website/roi/page.html`. The captions and the voice read the same text. The finished files are named
`akka-total-roi`.

The film: the claim, one proof section with every customer result, the question "How did Akka achieve these
results?", the cost areas in the order a bill is read, then the claim again and a final slide with the mark and the call to action. No amount or
total appears anywhere, and a cost area is never called a line. `storyboard-v2.md` matches what is built; `storyboard.md` and `proposal.md` are
the earlier planning documents and describe content that is no longer in the film.

## Play it

Open `file:///C:/Users/tyler/ai-console/demo/roi/index.html` in Edge. Space plays, `[` / `]` step scenes,
`#s=2.1` opens at a scene, `?` lists the keys, `?capture=1` draws the bare 1920x1080 stage.

## Folder

| Path | What it holds |
|---|---|
| `scenes/index.js` | The timeline: id, title, duration and narration `say` for every scene. The only place scenes are listed. |
| `scenes/<id>.js` | One scene per file: 1.1 the claim; 2.1 the proof section (one card per customer, as data in `CARDS`, appearing in turn); 2.2 the question; 3.1 consumption pricing against a flat fee; 4.1 the whole stack on the lowest-priced layer; 5.1 the runtime mechanism; 6.1 shared compute against separate headroom; 6.2 memory (journal, cache, two active regions); 7.1 integration (cake and slice) and the licence types; 8.1 model spend; 9.1 who can take part in Specify; 9.2 and 9.3 Specify; 10.1 the claim again; 10.2 the final slide (the mark and the call to action). |
| `lib/roi.js` | `Roi`: register, the four cost areas, the shared frame (head and cost-area strip), rows, cards, tiles, steps. |
| `film.css` | The `ro-` classes over the mock's tokens and player CSS. |
| `figures.json` | Every figure shown or spoken, by scene, with its value, kind, source and date. Sources are for the record only; none is on screen. |
| `narration.json` | One line per scene, written from the timeline. |
| `sentences/narration.json` | One entry per sentence (`2.1.2`), the input to the voice step. |
| `render/shots.mjs` | Review stills into `review/`; look at every one. |
| `render/narration.mjs` | Writes the two narration files from the timeline. Text only. |
| `render/figures-check.mjs` | Fails on any spoken number that is not in `figures.json`. |
| `film/assemble.mjs`, `film/pacing.config.json` | Builds each scene’s clip from the sentence clips with breath conditioning, 0.7 s between sentences and a 1.0 s tail; writes `durations.json` and `pacing.js`. |
| `contact/` | The contact sheet of the review stills (six across). |

## Build steps

1. `node demo/roi/render/narration.mjs`, then `node demo/roi/render/figures-check.mjs`.
2. `node demo/roi/render/shots.mjs [--only=2.1]`; look at every still for overlaps, clipped text and anything
   under the caption.
3. Captions-only render: `node demo/mock/render/render.mjs --film=C:/Users/tyler/ai-console/demo/roi --name=akka-total-roi`
   writes `out/akka-total-roi.mp4` and `out/akka-total-roi.srt`. Frames are resumable, so delete `out/frames`
   after a scene change.
4. Contact sheet: an ffmpeg `tile` of `review/*.png` at 480 px wide, six across, into `contact/`.

## Adding a customer to the proof section

Add one entry to `CARDS` in `scenes/2.1.js` (`who` on one line, `key`, `lines` of [value, label] with the first
value shown large), add its sentence to the scene's `say` in `scenes/index.js` with `key` as the sentence's
first word, add its figures to `figures.json` under `2.1`, and run the figure check. Cards appear in CARDS
order as the narration reaches them; the grid lays out two columns to four cards, three to six, four beyond.

## Voice

`ELEVENLABS_VOICE_ID=Bnd74uonOEZYmdUm8SZs ELEVENLABS_OUTPUT_FORMAT=mp3_44100_192 node demo/sample/tts.mjs --dir=C:/Users/tyler/ai-console/demo/roi/sentences`
(`eleven_multilingual_v2`, one clip per sentence), then `node demo/roi/film/assemble.mjs`, then the render with
`--voice` (delete `out/frames` first), which writes `out/akka-total-roi.mp4`, the silent MP4 and the SRT. The checks
follow `demo/README.md`. `blackdetect` lists the sparse openings of 2.1, 2.2, 8.1 and 10.1, which hold a headline or
a row of tiles on black.
