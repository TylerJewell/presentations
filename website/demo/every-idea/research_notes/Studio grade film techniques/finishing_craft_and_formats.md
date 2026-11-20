# Finishing craft and presentation formats for a studio-grade brand film

Research date: 2026-11-18. Scope: sound, edit, colour and typography, and live presentation formats, for a one-minute and a five-minute narrated film at 1920x1080, 30 fps, H.264 with AAC.

Source status labels used below:
- **Platform fact**: stated on a platform's own help page (fetched or quoted in a search result from that page).
- **Standard**: published loudness or audio standard, read through a secondary source.
- **Practitioner**: opinion or method from a studio, editor, colourist or vendor.
- **Unverified**: found only in a search snippet or a secondary blog, not checked against the primary document.
- **Older**: dated before 2025.

Research limits: this pass ran about 15 tool calls. It covered loudness, platform encoding, banding, grading, and two sound studios. It did not cover edit and pacing sources, typography, presentation tools (Figma Slides, Pitch, WebGL decks, scroll-driven pages), or budgets and timelines. Those areas are listed as gaps.

---

## Q1. Which practices do professional sound designers and editors name as highest in impact for a one-minute and a five-minute narrated film?

### Takeaway
The sourced evidence for ranked impact is thin. Two practices recur in what studio work shows: sound that replaces an expected sound with a designed one, and music and effects built as separate stems that can be balanced. Editing and pacing practice was not researched.

### Cited Findings
- Zelig Sound received credit for original sound design on Tesla Roadster – The Experience, where the brief was to express speed by replacing combustion engine noise. [Motion Awards 2025 listing](https://2025.motionawards.com/?p=4478) (Platform fact: a credit listing, not a stated method.)
- Zelig Sound handled both music and sound design on Nike Air Max DN8. The sound design was described as "hyper designed" with "freneticism" but "hyper controlled." [Motion Awards 2025 listing](https://2025.motionawards.com/?p=4458) (Practitioner: the credit text is the studio's brief summary.)
- Zelig's studio statement says everyone there is a composer and a sound designer. [Zelig Sound about page](https://www.zeligsound.com/about) (Practitioner; the snippet was not fetched in full.)
- A talk by Zelig's Matthew Wilcock and Aleah Morrison-Basu covers the process from animatic to final mix. [Nice Tuesdays talk, 2016](https://nicertuesdays.itsnicethat.com/talks/matthew-wilcock-and-aleah-morrison-basu-zelig-26-07-2016-london) (Older, 2016. Snippet only; the talk content was not read.)
- Film music is delivered in stems. Dialogue, music and effects are grouped (often labelled DX, MX, FX, or DME) so the sound editor can work in parallel. [ScreenSkills sound mixing module](https://www.screenskills.com/media/to0jlymy/screenskills-sound-mixing-word-format.docx); [Robin Hoffmann, mix delivery in stems](https://www.robin-hoffmann.com/?p=3971) (Practitioner; no date seen. Unverified in full.)
- An undipped music stem and an M&E (music and effects) stem are required for international delivery. [Robin Hoffmann](https://www.robin-hoffmann.com/?p=3971) (Practitioner. Unverified in full.)

### Inferences
- For a motion graphics film, the replaced-sound practice (Tesla example) and the stem discipline are the two practices with the most sourced support. Each applies directly to a pipeline that generates scenes in code, because the sound can be designed per action rather than laid in from a library.
- Stems matter here even without a broadcast delivery. Keeping voice, music and effects as separate files lets the mix be rebalanced after picture changes, which a code-rendered pipeline produces often.

### Gaps
- No ranked list of practices from a named sound designer for 60-second or 5-minute films was found. The request for an ordered ranking cannot be met from this pass.
- The Zelig breakdowns themselves were not read. The Motion Awards pages are credit listings.
- Stock-whoosh versus designed-sound practice, foley, silence, and sync points were not sourced from a practitioner.

---

## Q2. Which voice-over practices make a narration, including an AI voice clone, sound directed and produced?

### Takeaway
Vendor sources agree that a clone reflects its sample, that delivery needs explicit direction, and that pauses and breaths carry the rhythm. The sources are vendor blogs and were not checked against any producer's documents. The brief's current method, one sentence per clip joined by set pauses, is the element the sources most directly question.

### Cited Findings
- Most cloning failures come from noisy recordings or inconsistent delivery. A clone is only as good as its sample. [CapCut, AI voiceover editing](https://www.capcut.com/create/ai-voiceover-editing-pronunciation-pacing-emphasis); [Narrationbox, clone your voice](https://narrationbox.com/blog/how-to-clone-your-voice-in-6-minutes-2026) (Unverified; vendor blogs.)
- A voice trained on rushed or metronomic delivery loses the pauses that carry meaning in narration. [Narrationbox](https://narrationbox.com/blog/how-to-make-ai-voice-sound-less-robotic) (Practitioner; vendor blog.)
- One vendor states that breath cues are honoured when written into the script, and that a line break or period marks where the voice resets. [Narrationbox, AI voice sounding robotic](https://narrationbox.com/blog/how-to-make-ai-voice-sound-less-robotic) (Unverified: a model-specific claim from a vendor.)
- Stripping breaths, clicks and pitch drift can make a voice sound fake. [Respeecher, how to make AI voice sound human, 2026-04-14](https://www.respeecher.com/blog/how-to-make-ai-voice-sound-human) (Practitioner; the snippet is dated 14 April 2026 but the full text was not read.)
- A light room-tone bed under the voice grounds it against picture. [CapCut](https://www.capcut.com/create/ai-voiceover-editing-pronunciation-pacing-emphasis) (Practitioner; vendor blog.)
- A clone that performs well on narration can fail on conversational passages, so testing across passages is needed. [Narrationbox](https://narrationbox.com/blog/3-mistakes-to-avoid-while-using-ai-voice-for-youtube-2026) (Unverified; vendor blog.)

### Inferences
- The brief's method of one sentence per clip with set pauses produces the rhythm of a list. Pauses in narration are often tied to the picture change, not a fixed length. Cutting each clip at the speech and then setting pauses by hand gives control of timing, but the pauses are not derived from the sentence or the picture unless they are set that way. Vary the pause by the picture change, and keep at least one passage with breath-length gaps.
- Room tone and breath are the two elements that separate a produced voice from a flat one. The brief specifies no room tone. This is a gap in the current method.

### Gaps
- No source from a narration director or a voice-over producer was read in full. All voice sources are vendors.
- The consent, rights and platform policy for voice clones were not checked.
- No primary studio documentation on directing a voice clone was found.

---

## Q3. Which export and delivery settings preserve gradients on pure black on the major platforms in 2026?

### Takeaway
YouTube's upload page specifies H.264 High Profile at 4:2:0 for SDR, with bitrates for 1080p at 8 Mbps and 12 Mbps. For HDR it specifies higher bitrates and HEVC, AV1 or VP9, but this pass did not confirm the HDR codec rules from the fetched page. YouTube's page states that high-bit-depth wide-gamut content is converted to 8-bit BT.709 when no HDR transfer is present, and that full range is converted to limited range. Both conversions affect near-black gradients. Vimeo and LinkedIn figures conflict between sources and were not confirmed from their own pages.

### Cited Findings
- YouTube recommended upload settings (fetched 2026-11-18): MP4 with moov atom at front. H.264 High Profile, progressive, 2 B-frames, closed GOP of half the frame rate, CABAC, VBR, 4:2:0. Frame rate matches the source. [YouTube, recommended upload encoding settings](https://support.google.com/youtube/answer/1722171?hl=en) (Platform fact.)
- YouTube SDR bitrates, standard frame rate (24/25/30): 1080p 8 Mbps; 1440p 16 Mbps; 4K 35–45 Mbps. High frame rate (48/50/60): 1080p 12 Mbps. [YouTube](https://support.google.com/youtube/answer/1722171?hl=en) (Platform fact.)
- YouTube HDR bitrates, standard frame rate: 1080p 10 Mbps; 1440p 20 Mbps; 4K 44–56 Mbps. High frame rate: 1080p 15 Mbps. [YouTube](https://support.google.com/youtube/answer/1722171?hl=en) (Platform fact.)
- YouTube audio: AAC-LC, 48 kHz, 384 kbps stereo, 512 kbps 5.1. [YouTube](https://support.google.com/youtube/answer/1722171?hl=en) (Platform fact.)
- YouTube converts wide-gamut content that needs high bit depth to 8-bit BT.709 when no supported HDR transfer function is present, and converts full range to limited range. The page's stated purpose is to avoid banding. [YouTube](https://support.google.com/youtube/answer/1722171?hl=en) (Platform fact from the fetch summary; verify the exact wording on the live page.)
- YouTube HDR upload: Rec. 2020 with PQ or HLG transfer, 10-bit or 12-bit. HEVC, AV1 and VP9 Profile 2 are listed as suitable for HDR. [YouTube HDR help](https://support.google.com/youtube/answer/7126552) (Platform fact from search snippet; not fetched.)
- Vimeo's HandBrake guide recommends H.265 for HDR. Vimeo treats a file as HDR only at 10-bit or greater. [Vimeo help, HandBrake](https://help.vimeo.com/hc/en-us/articles/12426180666641); [Vimeo help, compression settings](https://help.vimeo.com/hc/en-us/articles/12426982098449-Video-compression-settings) (Platform fact from search snippets. Bitrate table not readable in snippet. Unverified.)
- Third-party guides give Vimeo 1080p H.264 targets of 10–20 Mbps, which conflicts with the Vimeo table as snippet-read. [Unil.ink, Vimeo specs 2026](https://app.unil.ink/blog/vimeo-video-specs-2026) (Unverified.)
- LinkedIn video: MP4 with H.264 and AAC is the common recommendation. 1920x1080 at 30 fps is the common recommendation. Bitrate guidance across third-party sources ranges from 5 to 20 Mbps. [Moonb, LinkedIn video specs 2026](https://www.moonb.io/blog/linkedin-video-specifications); [Quso, LinkedIn video specs 2026](https://quso.ai/blog/linkedin-video-specs) (Unverified. The official LinkedIn spec page did not appear in results.)
- Dithering inside the encoder (x264, x265, SVT-AV1) reduces banding, and dither applied before a lossy encode is removed by it. [Forasoft, dithering glossary](https://www.forasoft.com/learn/video-encoding/glossary/terms/dithering) (Practitioner; vendor glossary.)
- AV1 film grain synthesis removes grain before encoding, sends it as parameters and recreates it at decode. This masks gradient steps. [libsvtav1 article](https://libsvtav1.web.app/article/how-libsvtav1-prevents-color-banding-in-dark-scenes) (Practitioner; vendor blog.)

### Inferences
- YouTube's SDR path converts to limited range and 8-bit. A pure-black UI sits at the bottom of limited range and passes unchanged. Near-black gradients are the at-risk area, because they lie in the steps that 8-bit BT.709 can hold only coarsely. The fix is to add a grain or dither layer before the final encode, sized to be invisible at normal viewing, and to check the uploaded file rather than the master.
- A 10-bit master is the safe source for every platform. Each platform then makes its own 8-bit conversion, and the export should be checked on each one.
- For this project's 1080p H.264, the YouTube SDR row is the reference. Aim above 8 Mbps for the dark-gradient scenes, and use VBR with a cap, not CBR. The 8 Mbps figure is the platform's recommendation; the choice above it is an inference.
- The brief's H.264 choice is within YouTube's recommended path. The 10-bit HDR path is not needed for an SDR delivery, but a 10-bit intermediate still reduces banding before the 8-bit encode.

### Gaps
- Vimeo's and LinkedIn's bitrate tables were not confirmed. Do not cite the third-party figures as platform values.
- Exact YouTube behaviour for near-black values under the limited-range conversion was not verified. Test the uploaded file.
- No source measured how each platform treats dark gradients. The claim that the platforms "crush" them is not sourced here.

---

## Q4. Which keynotes and presentations from 2025 and 2026 are considered benchmarks, and why?

### Takeaway
No source sufficient to name a benchmark was found. The one 2026 event covered is Apple's 9 September 2026 event. Coverage of its opening film compares it to a 2012 film, and this comparison comes from low-reliability sites. The search did not find an independent critical review of keynote film craft in 2025 or 2026.

### Cited Findings
- Apple's 9 September 2026 event opening film is reported to echo the opening of Skyfall (2012) shot for shot. [iPhoneSoft, French, 2026-09-17](https://iphonesoft.fr/2026/09/17/apple-glisse-clins-oeil-james-bond-keynote-iphone-18-pro); [iThinkDifferent](https://www.ithinkdiff.com/apple-iphone-18-pro-event-film-james-bond-influence/) (Unverified; secondary and low-reliability sites. The comparison is the source's own judgement.)
- MacStories hosts a replay of the event keynote and product videos. [MacStories, replay page](https://macstories.net/news/apples-surprise-and-shine-event-replay-the-keynote-and-product-videos/) (Platform-side primary: the video links are the primary material.)
- Nofilmschool reports the WWDC26 keynote's immersive video updates. [No Film School, WWDC26](https://nofilmschool.com/apple-wwdc26) (Practitioner; not read in full.)
- A search result calls Apple Keynote an industry benchmark for presentation design. [findailist, Apple Keynote](https://www.findailist.com/tools/apple-keynote) (Unverified; SEO-style page, not used as a finding.)

### Inferences
- Apple's event films are the most visible 2026 keynote film work. The primary material is the video itself, and the review should be done by watching it, with the frame and sound noted.

### Gaps
- No benchmark list from a motion or film critic for 2025 or 2026 keynotes was found.
- No source on keynote decks built in Keynote, Figma Slides, Pitch, WebGL or scroll-driven tools was found. This is an open gap.
- The Apple film's sound and grade were not reviewed by any source.

---

## Q5. What does a professional sound design and music budget and timeline look like for a film of this length, and which specialist studios do this work?

### Takeaway
No budget or timeline source was found in this pass. Specialist studios named in the brief were identified through credits. Zelig Sound is the one studio with sourced credits in this pass. Its credit pages are for 2025 work.

### Cited Findings
- Zelig Sound credits: Tesla Roadster (Default Setting Studio for Tesla) and Nike Air Max DN8. [Motion Awards 2025](https://2025.motionawards.com/?p=4478); [Motion Awards 2025](https://2025.motionawards.com/?p=4458) (Platform-side credit listing.)
- Zelig Sound is credited with Amazon Prime Video's sonic logo, reported in a Shots.net article. [Shots.net, Aleah Morrison-Basu](https://shots.net/news/view/cutting-through-the-noise-aleah-morrison-basu) (Unverified: snippet only.)
- Hollywood-style film mixing uses 5.1 stems (DX, MX, FX) and a dub stage. [ScreenSkills](https://www.screenskills.com/media/to0jlymy/screenskills-sound-mixing-word-format.docx) (Practitioner; no budget figures given.)

### Inferences
- The brief's scale (1 minute and 5 minutes, one narrator, a music bed and effects) is small enough for one composer-sound designer to deliver as a single contract. This is an inference from the credit pattern, not a sourced rate.

### Gaps
- No budget or day-rate figure for motion graphics sound design was found.
- No timeline source for a 1-minute or 5-minute film was found.
- Studios beyond Zelig were not searched. The brief's other named studios (Antfood, Marmoset, Box of Toys Audio, Echoic, Sonosanctus) are unresearched.
- Editing and colour specialists were not searched.

---

## Cross-cutting findings

### Loudness target
- **Standard, older**: AES TD1004 (2015) gives a streaming target range of -16 to -20 LKFS. [Scribd copy of AES TD1004](https://www.scribd.com/document/440898812/AESTD1004-1-15-10-pdf) (Older, 2015. Secondary copy, unverified.)
- **Standard**: AES TD1008, dated September 2021, supersedes TD1004. Secondary sources give speech at -18 LUFS, music at -16 LUFS, and -1 dBTP ceiling. [Fora Soft, LUFS targets per platform 2026](https://www.forasoft.com/learn/audio-for-video/articles-audio/lufs-targets-per-platform-2026); [Telos Alliance, loudness for streaming](https://docs.telosalliance.com/docs/understanding-loudness-for-streaming-audio) (Standard via secondary. The AES PDF returned HTTP 403 on fetch. Unverified against the primary.)
- **Inference**: A narration-led film sits closer to the TD1008 speech figure (-18) than to the music figure (-16). The brief's -16 LUFS target is therefore a music-leaning choice. The -18 LUFS figure is the one a speech-led film matches. The decision is the producer's; this pass cannot settle it.
- **Unverified**: YouTube normalises to about -14 LUFS. This is a vendor claim. [Soundstripe, YouTube formats 2026](https://www.soundstripe.com/blogs/youtube-video-formats) (Unverified.)

### Practitioner tools for grading and grain
- Frame.io's grain piece (2023) covers when to use grain. The article's advice was not read. [Frame.io, How a Pro Colorist Uses Film Grain, 2023-08-14](https://blog.frame.io/2023/08/14/how-a-pro-colorist-uses-film-grain/) (Older, 2023.)
- Mixing Light covers emulating film halation in DaVinci Resolve. Most modern film stocks have an anti-halation backing, and halation still occurs. [Mixing Light, halation](https://mixinglight.com/color-tutorial/emulating-film-halation-in-davinci-resolve); [Mixing Light, film look and grain](https://mixinglight.com/color-grading-tutorials/creating-the-film-look-and-using-film-grain) (Practitioner; the halation tutorial was not read in full.)
- One production-workflow article advises grain low enough to read as film, not as an effect. [Dehancer order-of-operations guide](https://cdn-files.dehancer.com/01531b9d-c43e-4c08-9ca7-1d3250c53b09_Dehancer+Ae+Pr+Plugin+Quick+Guide.pdf) (Practitioner; vendor guide.)

---

## Summary of gaps for the next pass
- Sound: ranked practice lists from named designers; stock-whoosh versus designed sound; foley; music scored to picture; a voice-over direction source.
- Edit and pacing: shot length, cutting on the beat, holds, cold opens, title design. Not researched.
- Colour: the Frame.io grain article's advice; film emulation specifics; pure-black UI grading; a source on platform handling of dark gradients.
- Typography: kinetic type, optical sizing at large sizes, variable fonts, type as image. Not researched.
- Presentation formats: Figma Slides, Pitch, WebGL decks, scroll-driven pages, hybrid talk-over-render. Not researched.
- Budgets and timelines: none found. Studios beyond Zelig: not searched.
- Primary documents to fetch next: AES TD1008 (PDF returned 403, so retrieve via another route); Vimeo's compression page; LinkedIn's spec page; YouTube's HDR page.
