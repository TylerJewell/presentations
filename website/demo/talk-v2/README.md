# Governing AI at the speed it changes: the keynote, version 2

Version 2 of the governance keynote (`../talk`). Its setup frames the governance challenge as four problems (the
rules change every month, every country adds its own rules, every control lands on an engineering backlog, and the
first test of a control is the audit), so most of the talk goes to eight principles, including the five flavors of
human control. It follows [`../talk/storyboard-v2.md`](../talk/storyboard-v2.md) and its "Revision, 31 October";
the facts come from [`../talk/reports/Multinational AI oversight and human controls.md`](../talk/reports/Multinational%20AI%20oversight%20and%20human%20controls.md).
The presenter brief is [`BRIEF.md`](BRIEF.md). Version 1 stays unchanged in `../talk` as the fallback.

## Open and present

Open `index.html` from disk in Edge: `file:///C:/Users/tyler/competition/website/demo/talk-v2/index.html`, and
`index.html?presenter=1` on the second screen. The keys are version 1's (`../talk/README.md`, "Open and present").
Present one version at a time: both decks sync over the same channel.

## How it is built

The deck runs on version 1's engine and loads it by relative path; nothing in `../talk` or `../mock` is copied.

| File | What it is |
|---|---|
| `index.html` | Version 1's fonts, CSS and engine (`../talk/lib`, `../mock/lib`), then this deck's data, ring and slides |
| `slides/index.js` | Acts and slide order. Slides in its `V1` set load unchanged from `../talk/slides`; the rest are this folder's |
| `slides/<id>.js` | This deck's slides: new ones, and version 1 slides it changes |
| `lib/ring.js` | `Talk.ring` / `Talk.ringAt`: the ring of ten country labels, used by "Every country adds its own rules" and the experiment |
| `data/countries.js` | The ten markets in ring order, each with its requirement for one credit decline, and the sources |

## Rendering and the script

From `C:\Users\tyler\ai-console`:

| Command | Does |
|---|---|
| `node website/demo/talk/render/render.mjs --deck=demo/talk-v2 --pdf=akka-ai-governance-v2.pdf` | Every hold to `review/`, the contact sheet and the PDF in `out/` |
| `node website/demo/talk/render/render.mjs --deck=demo/talk-v2 --only=hub,flavors --mid` | Just those slides, with mid-beat frames |
| `node website/demo/talk/render/script.mjs --deck=demo/talk-v2` | Writes `script.md` from the slides and prints planned time per act |
| `node website/demo/talk/render/single.mjs --deck=demo/talk-v2 --out=<file>.html` | Packs the whole deck (engine, slides, fonts, favicon) into one self-contained HTML file to copy or send |

## Decisions taken for this version (Tyler, 2026-10-31: "execute everything")

- The full version 2 is built; version 1 stays as the fallback for Monday.
- The setup is four problems in five slides (31 October revision); Tyler speaks the transition into the principles.
- No slide or line says "prove"; "A posture, proved" left with the setup it belonged to.
- The company fined for automated deactivations is described as "a ride-hailing platform", not named.
- The ten markets are the report's set; the Loan Origination survey is not changed.
- The competence check in the evidence record is shown from the akka/human prototype and labelled illustrative.
- Organization-wide views (a country on verdicts, roll-ups by country, evidence kept in its region) are not shown;
  the setup names the problems and the principles answer them.

## Rules this deck follows

Version 1's rules (`../talk/README.md`), plus: country labels are text, never flags; every scene's claim matches its
status in the storyboard (research, built, sample, prototype, requirement); illustrative material is listed in
the slide's source note.
