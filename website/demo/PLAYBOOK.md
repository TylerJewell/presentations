# Making a demo and a story with Claude Code

This playbook teaches a person to produce the kind of demo the Akka team ships: a live system that is already
moving when the viewer arrives, a storyboarded film or deck built from that system, and a narrated recording
that has been looked at frame by frame. It is written for a project that is not Akka. Each stage has a purpose,
a prompt to paste into Claude Code, and a check that tells you the stage is done.

The reference implementation is in this folder: `storytelling.md` explains what exists, `README.md` is the
recording runbook, `mock/`, `talk/`, `full/` and `rbc/` are working examples, and the method is also written
as the `akka-presentation` skill.

## How to use this

1. Work the stages in order. Each stage produces a file that the next stage reads.
2. Paste the prompt, replace every `<PLACEHOLDER>`, and answer Claude's questions about the audience.
3. Review the output of each stage yourself before starting the next. The storyboard review (stage 3) saves
   the most time of any step.
4. When you correct something, run the prompt in stage 11 so the correction becomes a rule.

Keep one folder per presentation, for example `demo/<name>/`, holding `sources/`, `brief.md`,
`storyboard.md`, `narration.json`, `BRIEF.md` (the presenter brief), `rules.md`, the scenes, and `out/`.

## The five ideas behind everything

1. **One spine.** One sentence carries the whole piece, such as "a change travelling safely through one
   system". Every scene serves it, and a scene that does not is removed.
2. **The real system is the stage.** A running system with moving data is more convincing than slides about
   it. Slides and mocks exist for ideas that cannot be shown live.
3. **Every scene is a function of time.** A scene draws once and then sets every style for any instant `t`.
   Any moment can then be played, scrubbed, printed or captured exactly.
4. **Every frame is looked at.** Frames are rendered to images and inspected for overlap, clipping and
   crowding, then fixed and rendered again until each one is clean.
5. **Every correction becomes a rule.** A correction written into a rules file holds for every later
   presentation. A correction that is only said aloud has to be given again.

---

## Stage 0. Ground Claude in the project

Purpose: Claude knows what the project is, who the demo is for and what may be shown.

```
I am going to make a demo and a story for <PROJECT>. Before anything is built:

1. Read <REPO PATH> and list what the system does, in plain sentences, from the code and docs rather than
   from the README alone.
2. Read everything in demo/<name>/sources/ (meeting notes, requirements, the audience's questions).
3. Write demo/<name>/brief.md with these sections:
   - Audience: who they are, what they already know, what they asked for.
   - Purpose: the one decision or understanding the viewer should leave with.
   - Format: live, recorded screen, animated film or deck; length; where it is shown.
   - May be shown: features, data, names.
   - Internal only: politics, competitors, other customers' names, pricing, roadmap dates.
   - Open questions: facts the docs do not answer.
Ask me only about audience, length, purpose, due date and live versus rendered. Decide everything else
from the sources and state the assumption you made.
```

Done when: the brief separates "may be shown" from "internal only", and every open question is either
answered or assigned to a person.

## Stage 1. Verify the claims

Purpose: nothing in the story is wrong. A demo that makes one false technical claim loses the room.

```
Open demo/<name>/brief.md. For every technical claim we expect to make, find the source in <DOCS PATH OR URL>
or in the code, and write demo/<name>/claims.md as a table: claim, source (file and line or URL), status
(confirmed, partly confirmed, not found). Rules:
- A figure from a managed or hosted setup never stands in for a self-hosted one.
- A laptop measurement is labelled as a laptop measurement.
- A claim with status "not found" is listed for me to decide on; do not soften it into the story.
```

Done when: every claim in the storyboard can point to a row in `claims.md`.

## Stage 2. Find the spine

Purpose: one idea for the whole piece.

```
Propose three candidate spines for this demo, each one sentence, each following one thing through the
system end to end (for example "a change travelling safely", "a customer request becoming a decision").
For each: the 6-10 scenes it implies, what it leaves out, and the strongest moment. Recommend one and say
why. Do not write the storyboard yet.
```

Done when: you can say the spine in one breath and name what it leaves out.

## Stage 3. Storyboard before code

Purpose: the story is reviewed on paper, where changes are cheap.

```
Write demo/<name>/storyboard.md for the spine "<SPINE>". Format for each scene:

### Scene N. <title as a complete sentence>
- Idea: one sentence. If it needs two ideas, make two scenes.
- Visual: what is on screen, what moves, what glows, in this scene.
- Words: the narration, written for the ear, about 2.5 words per second.
- Length: seconds, from the word count.

Rules:
- Show, do not list. A component list is not an architecture; show flows and sequences, what moves where.
- Explain every term in one plain sentence the first time it appears.
- When something was "built from a specification", show what the specification held.
- Every title, subtitle and bullet is a complete sentence. Labels, chips and table cells may be short.
- State what is. No selling words (fast, best, proves), no negative framing, no claim without a row in
  claims.md.
- Finish with a table of scenes, lengths and a running total, and flag any scene over 40 seconds.
Then stop and wait for my review.
```

Done when: you have read every scene aloud and each one makes one point.

## Stage 4. Make the system a stage

Purpose: every screen opens populated and live. Skip this stage only for a deck with no live system.

```
Make <SYSTEM> demo-ready. Read how it starts and what data it needs, then build demo/<name>/preroll.mjs
that:
1. Checks every service and port and fails with a clear message naming the one that is down.
2. Starts realistic traffic or events so charts and tables are moving before the viewer arrives.
3. Raises one fresh event with time left on any deadline, and prints how long the window lasts.
4. Switches the product into its demo mode where seeded data is labelled as seeded.
5. Writes the identifiers the recorder needs to demo/<name>/ids.json.
Everything it creates is labelled so a viewer can tell real data from seeded data. It must be safe to run
twice. Do not call any paid model or external API; use scripted, stubbed or recorded output.
```

Done when: running the pre-roll and opening each planned screen shows data and no skeleton.

## Stage 5. Build the scenes on the engine

Purpose: scenes that can be rendered at any instant.

```
Build the scenes in demo/<name>/ from storyboard.md. Reuse the engine from <ENGINE PATH> by relative import;
do not copy it. For each scene:
- render(root) runs once and builds the elements.
- at(t) sets every style for the instant t. No state carries between frames, so the scene scrubs, prints
  and captures at any time.
- beats are { t, say } so the narration and the picture share one clock.
Visual language: <PALETTE, FONT, SIZES>. Few, large elements per frame, about nine cards at most; the subject
of the current sentence glows and the rest steps back; motion carries meaning (work travels the connector
being spoken about). Sizes are for a projector: headlines 64-84 px, body 26-36 px, labels 20-26 px on a
1920x1080 stage with 150 px gutters.
Build scene 1 and 2 first and stop for review.
```

Done when: scenes 1 and 2 are approved. The remaining scenes follow the same pattern and can be built in
parallel by separate agents, each in its own git worktree.

## Stage 6. Render and look at every frame

Purpose: nothing ships unseen.

```
Render every beat and the middle of every beat to PNG and a PDF with <RENDER COMMAND>. Open the PNGs one by
one. For each frame list what you see wrong: overlaps, text under lines, cards on titles, anything clipped,
crowded or too small to read on a phone. Fix the scene, render again, and repeat until a full pass finds
nothing. Report the number of frames inspected and the number of fixes. Never mark a frame clean that you
did not open.
```

Done when: you have opened a contact sheet yourself. Run the phone check for any page that goes to a person.

## Stage 7. Write the narration

Purpose: words written for the ear, one line per scene.

```
Write demo/<name>/narration.json with one entry per beat: { id, text, spoken }.
- text is the written caption; spoken is what is sent to the voice. Spell out any term a voice misreads
  ("SDK" becomes "ess dee kay" in spoken, and stays "SDK" in text).
- One idea per line, short sentences, about 2.5 words per second.
- Complete plain sentences. No selling, no hype, no quips, no negative framing.
- Read each line against its scene and cut every word the picture already says.
Then print the total spoken time per scene next to the storyboard length and flag any difference over 15%.
```

Done when: you have read the whole script aloud once without stumbling.

## Stage 8. Voice

Purpose: a finished sound.

```
Generate the voice for demo/<name>/narration.json with <TTS TOOL AND COMMAND>. Cache each clip by text and
voice so only changed lines are regenerated. Use --placeholder first to check timing without spending
credits. For each name or term the voice misreads, generate two or three spellings in context and let me
choose; pin the chosen take as the cached clip. Do not use my model API keys for anything except this call.
Condition each clip: cut at the speech (about 45 ms before the first attack, 70 ms after the last decay),
short fades, then insert the pause. Do not add room tone.
```

Done when: you have listened to every clip. A clip with a breath at its start or end is conditioned again.

## Stage 9. Record or render the film

Purpose: one repeatable command produces the finished file.

For a recording of the live system:

```
Write demo/<name>/record.mjs that drives <SYSTEM> scene by scene with Playwright.
- A 1600x900 viewport at device scale 1.2 gives 1920x1080. Capture frames over CDP; the built-in
  recordVideo path adds a border and is for drafts only.
- Move between pages with a go() helper that fades to dark and back. It holds the fade until: the scene's
  ready selector is present; no skeleton, spinner or "Loading" text remains; nothing new has arrived for
  0.7 s; and, for live pages that never stop changing, 8 s have passed. Narration starts after the fade lifts.
- Give each scene a ready selector for the data it shows.
- The caption has one fixed place and never covers the subject. Scroll a target onto the stage before the
  cursor moves to it.
- A scene's actions fit inside its narration line. Slow work starts earlier or is done in a warm-up pass.
- Add --probe (run every scene without video, one screenshot per scene, report every failing step) and
  --only=<scene>.
Run the probe and fix every failure before recording.
```

For an animated film or a deck, ask for the renderer pattern in `rbc/film/render.mjs`: each beat animates,
its line starts 0.35 s in, the beat ends 2.2 s after the line, slides change through black, and the music bed
sits about 18 dB under the voice and ducks a further 18 dB under each line.

Done when: the probe is green and a draft has been watched through.

## Stage 10. Master and check

Purpose: measured, not guessed.

```
Master the film to demo/<name>/out/: MP4 (H.264 CRF 16, AAC 192k), a silent MP4 and an SRT. Level the audio
to -16 LUFS integrated with a -1.5 dBTP ceiling. Then run and report these checks:
1. ffprobe: length, and chapters if the film has them.
2. blackdetect (d=1.2): only title and end cards may be listed.
3. ebur128: integrated loudness between -16 and -17.5 LUFS.
4. Gaps between one line's end and the next line's start: none over 4.5 s outside a card.
5. A contact sheet of frames across the film, which I will review.
Do not tell me it is finished until all five are reported. Fix a failing check and run all five again.
```

Done when: you have watched the film through once, looking for a caption over its subject, a spinner or
skeleton, a wrong label, and narration that runs past its scene.

## Stage 11. Turn corrections into rules

Purpose: the next presentation starts better than this one.

```
I just corrected: "<THE CORRECTION IN MY WORDS>".
1. Fix it everywhere it applies in demo/<name>/, not only where I pointed.
2. Add one line to demo/<name>/rules.md under the matching heading (picture, sound, content, language),
   stating what is true and why, never the history of the mistake.
3. If the rule applies to every presentation, say so, and I will copy it into the shared playbook.
```

## Stage 12. Independent review

Purpose: a reader who did not make the film judges it.

```
Act as a reviewer who has not seen how this was made. Read demo/<name>/brief.md, claims.md, storyboard.md
and narration.json, and open the contact sheet. Report, ranked by severity:
- claims the evidence does not carry;
- anything from the "internal only" list that appears in the film, captions or speaker notes;
- scenes with more than one idea;
- sentences that sell or frame negatively;
- terms used before they were explained.
Do not edit anything. Report only.
```

---

## Rules that apply to every presentation

**Content**
- Separate what the audience may see from what is internal. Internal notes live in the presenter brief,
  never in the deck, its speaker notes or its file name.
- A claim appears only when a source carries it. Figures from one environment are never presented as
  figures from another.
- Never set a customer's dates. Offer milestones to target together and to discuss together.
- A customer-facing opening is personal: greet the named people, say what the team appreciates, then give
  the overview.

**Language**
- Every title, subtitle, panel sentence and bullet is a complete sentence. Labels, chips, table cells and
  figure captions may be short.
- Plain engineering statements. No selling words, no quips, no hype.
- Say what is, not what is absent. Describe people by what they are.
- A simple explanation is aimed at an intelligent layperson, never a child.
- Use the audience's spelling (Canadian or British where they use it).

**Picture**
- One yellow, one typeface, status colours only for status, mono only for code and identifiers.
- No one-sided accent borders, no rule bars beside words, no chapter numbering.
- Few, large elements per frame. The subject of the sentence glows.
- Never show a loading state. Fade through black and hold until the data is on screen.

**Sound**
- Narration is written for the ear and generated from a cached clip per line.
- The voice is conditioned at the speech boundaries; room tone is never added.
- The music bed is well under the voice and drops further under each line.

**Process**
- Storyboard before code. Probe before recording. Look before shipping.
- Work that is independent runs in parallel, each agent in its own git worktree, after a clean baseline.
- Keep model API keys out of the pipeline unless the owner asks for a live call.
- Deliver as a local file and report its path. Check an HTML deliverable at phone widths before sending it.

## What to change for a different project

| Keep as it is | Replace |
|---|---|
| The twelve stages and their order | The system, the pre-roll and the ready selectors |
| One spine, one idea per scene, 2.5 words per second | The spine, the audience and the claims |
| Scenes as functions of time | The visual language (palette, font, sizes) |
| Render and inspect every frame | The voice and the pronunciation table |
| The five mastering checks | The music bed |
| Corrections become rules | `rules.md`, which each team grows from its own corrections |

## Common failures

| Symptom | Cause | Fix |
|---|---|---|
| The film feels like a feature tour | No spine | Return to stage 2 and cut every scene that does not serve it |
| A scene feels crowded | Two ideas in one scene | Split it in the storyboard |
| A viewer sees a spinner | The fade lifted before the data arrived | Add a ready selector for the data itself |
| The caption covers the subject | The subject was not scrolled onto the stage | Scroll first, then move the cursor |
| Narration runs past its scene | Actions longer than the line | Warm slow work before the line starts |
| A breath is heard before a line | The clip was not cut at the speech | Condition the clip at its attack and decay |
| The same correction is given twice | It was not written down | Stage 11 |
