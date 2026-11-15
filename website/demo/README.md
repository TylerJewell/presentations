# Recording a demo video

How the Akka platform demo (`demo/full`, about 8:20 at 1080p30 with Tyler's cloned voice) is produced,
and the rules that make it look and sound finished. A new video follows the same steps and rules; only
the scenes and the narration change.

| Folder | What it holds |
|---|---|
| `lib/stage.mjs` | The on-screen layer (caption, spotlight, cursor, curtain, fade) and the scene helpers |
| `full/` | The full demo: `narration.json`, `record.mjs`, `preroll.mjs`, `master.mjs`, `slides.html`, `script.md` |
| `full/audio/`, `full/durations.json` | Generated voice clips, cached by text and voice, and their lengths |
| `full/out/` | Captured frames, marks and the finished files (not committed) |
| `sample/` | The 30-second proof of concept, plus `tts.mjs` and `mux.mjs`, which the full demo also uses |

## Steps

1. **Write the narration first.** Put one line per scene in `full/narration.json`, then read it aloud
   against `voiceover-script.html`. The lines set the timing, because each scene is held until its
   line has been spoken.
2. **Generate the voice.** Run
   `node website/demo/sample/tts.mjs --dir=C:/Users/tyler/competition/website/demo/full`.
   - It needs `ELEVENLABS_API_KEY` and `ELEVENLABS_VOICE_ID`. Both are user environment variables, and
     the voice ID is Tyler's Professional voice.
   - Only changed lines are regenerated.
   - `--placeholder` uses the Windows voice to check timing without spending credits.
3. **Bring the stack up.** Start `optimize-local/stack.py restart`, the trace ledger (:9096) and Loan
   Origination (:9089), then `pnpm -F local dev` from `kalix-console` for :3000.
4. **Pre-roll.** Run `node website/demo/full/preroll.mjs --fresh-s1`. It checks every service, starts the
   busy gateway traffic, drives the oversight events, puts the console in Demo mode, raises a fresh S1
   event with SLA time left, and writes `full/ids.json`.
   - Record within the S1 event's SLA window, which the pre-roll prints.
   - `--wait` waits until 15 minutes of traffic have run.
5. **Probe.** Run `BASE=http://localhost:3000 node website/demo/full/record.mjs --probe`. It runs every scene
   without video, takes a screenshot per scene, and reports any step that fails.
   - Fix every failure before recording.
   - Use `--only=<scene>` to rerun a single scene.
6. **Record the master.** Run `BASE=http://localhost:3000 node website/demo/full/record.mjs --hq`.
   - It warms every route first.
   - It then captures frames over CDP at 1920×1080 into `out/frames`, with the marks in
     `out/marks-abs.json`.
7. **Master.** Run `node website/demo/full/master.mjs`. It writes three files into `out/`:
   - `akka-demo.mp4`: H.264 CRF 16 with AAC at 192k, the narration denoised, gated and levelled to
     −16 LUFS, with chapter markers;
   - `akka-demo-silent.mp4`;
   - `akka-demo.srt`.
8. **Check before handing over.** See the checks below. Then copy the three files to Downloads and
   open the MP4 in Edge.

Before recording, finish all UI work, such as table and footnote waves, so that labels don't change
after the video is cut.

## Picture rules

- **Frame:** a 1600×900 viewport at device scale 1.2, giving 1920×1080. Use the dark theme with the nav
  collapsed. Only the `--hq` CDP capture is production quality; the Playwright `recordVideo` path adds a
  grey border and is for drafts.
- **No jump cuts:** move between pages with `go()`, which fades to dark and fades back. Reload only
  when there is no page yet.
- **Never load in view:** `go()` keeps the fade down until four things are true:
  - the scene's ready selector is present;
  - no skeleton, spinner, progress bar or "Loading" text remains;
  - no rows or text have arrived for 0.7 s;
  - for live pages, which never stop changing, 8 s have passed.

  The narration starts only after the fade lifts. Give each scene a ready selector for the data it
  shows, not just `main`.
- **Never click under the caption:** `cursorTo` scrolls any target under the caption or the top bar
  onto the stage before the cursor moves to it.
- **No silence between lines:** a scene's actions fit inside its line. Slow work (an agent's reply,
  a review's minimum time) either starts before the line or is done in the warm-up; fixed sleeps are
  short and waits are for the thing itself.
- **No waiting under narration:** whatever a scene loads after `say()`, such as wizard steps or
  dialogs, is warmed in the warm pass first, so it opens at once.
- **Black is held for at most 0.8 s:** `master.mjs` shortens any longer black run, such as a slow load
  under the fade, and moves later narration up to match. The only long dark screens are the chapter
  cards and the end card.
- **The caption never covers the subject:** the caption has one fixed place, bottom left. `spot()`
  first scrolls the subject onto the stage between the top bar and the caption, and the spotlight
  stops above the caption.
- **Views that fill the frame,** like the big-screen gateway, use the compact caption at the bottom
  right.
- **Expanded rows** are revealed with `reveal()`, which scrolls every nested scroller so the row sits
  just under a table's sticky header.
- **The cursor** glides to a target and ripples on each click. Click by exact text, and wait for lists
  to load before clicking.
- **Chapter cards** use the Akka Intro deck's style: a black background, Instrument Sans, a yellow
  `#FFCE4A` kicker, the AKKA mark, and their line spoken over the card.
- **Display modes made for the video:**
  - the gateway's big screen at `/inference?view=gateway&screen=big`;
  - docs diagrams full frame at `/build?view=code&present=1&diagram=<n|slug>`.

## Sound rules

- **Voice:** ElevenLabs `eleven_multilingual_v2` with Tyler's Professional voice.
  - Settings: stability 0.5, similarity 0.85, style 0.2, speaker boost on.
  - Use `mp3_44100_128`; 192 kbps returns 403 on this plan.
- **Terms the voice reads unreliably are spelled out in what is sent** (`SPOKEN` in
  `sample/tts.mjs`; "SDK" is sent as "ess dee kay"). The captions keep the written form.
- **Each line is denoised and gated** in `master.mjs`. The cloned voice carries the room tone of its
  training recordings, about −55 dB under the pauses. Drop the cleanup once the voice is retrained on
  clean recordings.
- **Pacing:** each line starts as its scene starts, and the scene holds until the line ends plus an
  800 ms breath.
- **Volume:** the mix is levelled to −16 LUFS integrated with a −1.5 dBTP ceiling, and the audio is
  padded so the end card plays in full.
- **No breath at a voice entry or exit, and no clipped word endings (animated films with Tyler Pro).** Each clip
  opens with about 100 ms of intake noise and trails off for about a second after the last word; both read as a
  breath after a pause. Generate one clip per sentence (`sentences/narration.json`, then
  `sample/tts.mjs --dir=<film>/sentences`) and run the film's `film/assemble.mjs`. It cuts each clip from 45 ms
  before its first word's attack to 70 ms after its last word's decay (levels measured against the clip's loud
  speech: attack at peak −14 dB, decay at peak −40 dB, which keeps a closing /s/ or /z/), with a 20 ms fade in and a
  90 ms fade out, and joins the sentences with the pause in `film/pacing.config.json`, so a pause falls only between
  sentences. Copy `tokenomics/film/assemble.mjs` for a new film (`roi/film/assemble.mjs` is the same code); the
  whole-clip `pacing.mjs` and the copy in `proposal-panel` are older. Pause and tail are 2.8 s and 3.4 s in
  `tokenomics` and 0.7 s and 1.0 s in the denser `roi`. Do not use the renderer's `--roomtone` option: the added pink
  noise is audible as static. Check the result with `ebur128` (about −16.7 LUFS) and with `astats` over one-second
  windows (the quietest should sit at about −75 dBFS or lower).

## Content rules

- **Structure:**
  - an opening slide introducing Tyler, then Akka Intro slides 1–5, about 90 s in all;
  - then Build (Akka Specify), Run (Akka Agent SDK), Govern (Akka Verify), Optimize (Akka Optimize),
    and a close;
  - about 7:30–8:30 in all.
- **Must appear:**
  - the docs' interaction diagrams;
  - the live big-screen gateway;
  - Akka's runtime and components;
  - every control type, including guardrails, sanitizers and humans, both executed and reviewed;
  - training on proprietary datasets.
- **Training is shown, not run:** narrate that models train on your proprietary datasets, then play a
  finished run through its replay. Stop the New run wizard at Settings.
- **Naming:**
  - say "Agent SDK", never "the SDK";
  - call the trained model "the small model";
  - don't say "through the gateway" in the Loan Origination trace;
  - leave streaming out.
- **Data:** the simulated Acme traffic is used as it is. Don't drive Loan Origination's agents for
  volume, and don't show the app's own UI.
- **Wording on screen** follows the console's rules: money words from `system.md` §6a and the Activity
  title band.

## Checks before handing over

- **Length and chapters:** `ffprobe` the MP4. It should run about 8:20 and have six chapters.
- **Dark runs:** run
  `ffmpeg -i out/akka-demo-silent.mp4 -vf "blackdetect=d=1.2:pix_th=0.12" -an -f null -`.
  It should list only the chapter cards and the end card.
- **Loudness:** run `ffmpeg -i out/akka-demo.mp4 -vn -af ebur128 -f null -`. Integrated loudness
  should be between −16 and −17.5 LUFS.
- **Silences:** no gap between one line's end and the next line's start longer than 4.5 s outside a
  chapter card. List them with the snippet in the section "Measuring silences" below.
- **Watch it through once.** Look for a caption over its subject, a spinner or skeleton, a wrong label,
  and narration that runs past its scene.

## Measuring silences

```
node -e 'const fs=require("fs");const t=fs.readFileSync("demo/full/out/akka-demo.srt","utf8").trim().split(/
?

?
/).map(b=>b.split(/
?
/)[1].split(" --> ").map(x=>{const[h,m,r]=x.split(":");const[s,ms]=r.split(",");return +h*3600+ +m*60+ +s+ +ms/1000}));for(let i=0;i<t.length-1;i++){const g=t[i+1][0]-t[i][1];if(g>4.5)console.log((t[i][1]/60|0)+":"+String(Math.round(t[i][1]%60)).padStart(2,"0"),g.toFixed(1)+" s")}'
```
