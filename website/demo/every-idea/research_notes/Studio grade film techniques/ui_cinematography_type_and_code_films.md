# UI cinematography, kinetic typography, and films made in code (as of 2026-11-18)

Scope: three parts. Part 1 is product-UI cinematography. Part 2 is kinetic typography. Part 3 is films made in code. Each claim carries a source URL. Items marked UNVERIFIED were not confirmed in a fetched primary page. Items marked OLDER are dated before 2025.

Method note: 16 tool calls. Several primary pages refused or returned no content (Remotion showcase cards, Remotion README showcase list, Jitter, Cavalry, Rive, Spline, Motion Canvas, Theatre.js vendor pages were searched but not fetched). Most of the vendor-tool claims below rest on search snippets or third-party comparison pages, which is a weaker basis than the vendor's own page.

---

## Key Question 1: Which UI-cinematography techniques do product-video specialists name as the ones that make a screen recording look like a film?

### Takeaway
Specialists name a short set of moves: a camera that moves in 3D over a flat UI (tilt, orbit, lens control), zoom that lands on one element, cursor treatment with click feedback, motion blur on fast moves, shadows and a backdrop, and device framing. Specialist writing on "film look" adds easing, restrained blur, and grain/grade as a final layer, in that order.

### Cited Findings
- Screen recordings are flat, so depth has to be simulated. A vendor (FocuSee) describes automating "zoom and pan" on a flat plane, and its auto 3D motion depends on mouse-click actions during recording. Vendor claim, not independently checked. [FocuSee 3D camera effect](https://focusee.imobie.com/edit-video/3d-camera-effect.htm)
- Faux-3D presets in one tool group into moods: cinematic presets use "slow parallax, depth-of-field blur, anamorphic lens flares," while SaaS presets use "subtle 3D tilt, soft shadows, gradient backgrounds." Vendor marketing, UNVERIFIED as a method. [Mock Magic presets tutorial](https://aiindigo.com/tutorials/getting-started-with-mock-magic-video-presets-turn-screenshots-into-cinematic-pr)
- One guide suggests pitching the UI plane back 30 to 50 degrees, so the far edge recedes. Framer's tilt control range is -45 to +45 degrees. Both are secondary sources. [Framer tilt component](https://www.framer.com/community/marketplace/components/i3AW7CmqSykGQMvjeWc2/)
- Screen Studio's named effects: "Classic zoom," "Loupe zoom," "Automatic zoom," "Manual zoom," "Smooth cursor," "Click effects," "Edit cursor style," "Motion blur" (described as optics-based), a Background tab, "Shadow & inset," and device-frame wrapping. Platform: macOS only ("made for Mac and nothing else"). [Screen Studio](https://screen.studio/) (fetched; page undated)
- Rotato's named features: 30+ 3D device mockups, "DSLR-level virtual camera lens control," jumping between camera positions without animating, customizable "3D reflections," transparent backgrounds, "Shadow Styles," a 3D animation timeline, and a "Presentation Mode." Platform: Mac (macOS 11+) and a web public beta; no Windows. Pricing: "free until you're ready to pay" per the page. [Rotato](https://www.rotato.app/) (fetched; page undated)
- Screenhance's comparison article (published 13 May 2026, updated 11 Sept 2026, per its byline) names these techniques: hardware turns, floating arcs, device framing, cursor treatment, guided zooms, and 3D lighting. It does not name blur, glass, or reflections as techniques. [Screenhance, Animated App Demos in 2026](https://screenhance.com/blog/animated-app-demos-2026) (fetched; the article is a competitor's comparison, so treat its characterisations with caution)
- Emil Kowalski (product UI engineer) advises: use a `0.97` scale on `:active` for instant feedback; do not animate from `scale(0)`; keep UI animation under 300 ms; scale popovers from their trigger (`transform-origin`); and use a small `filter: blur()` when easing and duration alone do not bridge a state change. These are UI-interaction rules, not film rules. [Emil Kowalski, 7 practical animation tips](https://emilkowal.ski/ui/7-practical-animation-tips) (fetched; undated, prior to 2026 per content)
- Film-look checklist for CG (search snippet): 24 fps, motion blur, depth-of-field blur, film grain. Source quality is mixed. [Search result, film-look CG checklist](https://www.creativebloq.com/computer-arts/50-motion-graphics-tips-12089189) (snippet only; the listed link is a general motion-tips page, not the checklist itself; UNVERIFIED as cited)
- A finishing grade (colour, vignette, grain) is described as the cheapest step from "clean" to "cinematic"; grain should stay off text and at low opacity. Advice from blog and course pages. [Search results, motion tips roundup](https://www.creativebloq.com/computer-arts/50-motion-graphics-tips-12089189) (snippet only; UNVERIFIED)
- Motion-blur caution: blur can make slow moves look mushy, and thin lines and small icons can flicker. [Search results, motion blur guidance](https://www.provideocoalition.com/tool-tip-tuesday-for-adobe-premiere-pro-better-looking-movement-with-ease-in-motion-blur/) (snippet only; UNVERIFIED)

### Inferences
- The specialists' vocabulary is camera-first: the move is a virtual camera acting on a flat plane. This is what a browser pipeline has to reproduce.
- Screen Studio and Rotato solve different problems. Screen Studio post-processes a recording (zoom, cursor, blur). Rotato places a device or UI in a 3D scene with a camera. A browser pipeline that uses real 3840x2160 screenshots sits closer to the Rotato model for the hero moves and to the Screen Studio model for the zoom-to-element moves.
- Many of the named effects are shadow, reflection, and blur work on a 2D plane. They are reproducible in CSS and WebGL. Real parallax, depth of field, and reflections need a layered or 3D construction (see Part 1 mapping below).

### Browser-pipeline mapping (Part 1, inference from the sources above; not verified against each technique's implementation)

| Technique | Named by | Browser route | Deterministic per-frame? |
|---|---|---|---|
| 3D tilt, orbit | Rotato, Screenhance, Framer | CSS `transform: perspective() rotateX() rotateY()` on the screenshot element, value = pure function of t | Yes. Set transforms from t each frame; no CSS transitions or animations. |
| Parallax layers | Mock Magic presets | Separate DOM or PNG layers at different translate depths (screenshot cut into layers, or a rebuilt layered DOM) | Yes, if layers are pre-cut assets |
| Macro zoom to one element | Screen Studio (automatic/loupe zoom), FocuSee | CSS `transform: scale()` plus `transform-origin` at the element's coordinates, eased by a pure function | Yes |
| Cursor and click feedback | Screen Studio (smooth cursor, click effects) | Cursor as a DOM element positioned by a keyframe path; click ring as a function of time since click | Yes |
| Light sweep, glass, reflections | Rotato (3D reflections) | Gradient overlay with `background-position` from t; or WebGL plane with a reflection shader | Gradient: yes. `backdrop-filter`: UNVERIFIED for deterministic capture; test. |
| Screen-space glow | (not named in sources) | CSS `filter: drop-shadow` or a blurred duplicate layer | Yes, but expensive at 1920x1080 per frame; UNVERIFIED cost |
| Depth of field / rack focus | Mock Magic cinematic presets | CSS `filter: blur(n)` per layer, n = function of depth and focus t | Yes per layer. Real DOF across a single flat screenshot is a simulation. |
| Motion blur | Screen Studio, CG film-look checklist | Not native in CSS. Accumulate N sub-frame renders per output frame. | Yes if sub-frames are rendered at fixed sub-times. (First-pass topic; not re-researched here.) |
| WebGL plane textured with screenshot | (community practice) | Three.js plane with the 3840x2160 PNG as texture, camera orbit as function of t | Yes if `renderer.render` is called once per frame at a fixed t and the texture is loaded before capture. |
| Layered DOM rebuilt from real UI | Jitter (keyframed layers), Rive (state-machine UI) | Rebuild each UI element as its own DOM node from the product's component data, animate individually | Yes. Rive and Spline are real-time runtimes; deterministic stepping needs the runtime's clock controlled. UNVERIFIED. |

### Gaps
- No primary Screen Studio, Rotato, or Jitter page on how their effects are implemented. The vendors' feature lists do not say how shadows, reflections, or DOF are computed.
- No public source names "light sweep" or "macro zoom that lands on one element" as a specialist term in a 2026 breakdown. These are described only by the tools' feature names.
- Screen Studio pricing conflicts across sources. The fetched page says $9/mo yearly and $29/mo monthly. A search snippet said "$89 one-time." The fetched page is treated as authoritative for the date fetched, but it has no date. [Screen Studio](https://screen.studio/) vs. [Animated App Demos, Screenhance](https://screenhance.com/blog/animated-app-demos-2026)
- Rotato platform conflicts: Screenhance says the web public beta is current. The Rotato homepage also says web beta, so the two agree on that point.

---

## Key Question 2: How do Screen Studio, Rotato, Jitter, Cavalry, Rive, and Spline present UI, and which effects can a browser pipeline reproduce?

### Takeaway
Each tool presents UI differently. Screen Studio treats the UI as a recording to be zoomed and cursor-treated. Rotato treats the UI as a 3D device object with a virtual lens. Jitter animates imported layers with keyframes. Cavalry is a procedural vector tool. Rive is a state-machine runtime for interactive UI. Spline is a 3D web scene tool. A browser pipeline reproduces the 2D and 3D-plane effects directly (tilt, zoom, cursor, blur, shadow). Real-time runtimes (Rive, Spline) need their clocks controlled before frame capture.

### Cited Findings
- Tool split, as summarised by a comparison article: Screen Studio for recordings, Jitter for 2D UI and graphics, Rotato for 3D device views, Cavalry for rule-based motion design. [Screenhance, Animated App Demos in 2026](https://screenhance.com/blog/animated-app-demos-2026) (fetched; competitor article)
- Jitter: keyframed motion design for imported layers, with custom timing and easing. Comparison pages give a price of $24/month and a free tier; these are third-party, UNVERIFIED. A search snippet also says Jitter added AI-assisted motion paths and responsive resizing in 2026; UNVERIFIED. [Screenhance](https://screenhance.com/blog/animated-app-demos-2026); [Search result, Jitter comparison](https://preview.findailist.com/tools/jitter) (snippet only)
- Cavalry: procedural and data-driven. LottieFiles says it is free for individuals with all features since April 2026, and exports MP4, GIF, and Lottie. Art of Style Frame calls it a fit for "animated product demos, hero motion on landing pages." Both are secondary. [LottieFiles, Best Motion Design Tools in 2026](https://lottiefiles.com/blog/design-guides-and-tips/best-motion-design-tools-ranked-by-use-case); [Art of Style Frame](https://artofstyleframe.com/blog/motion-design-tools-for-ui-designers/)
- Rive: LottieFiles rates it for stateful UI animation, with .riv, WebGL, and iOS/Android output, driven by state machines. [LottieFiles](https://lottiefiles.com/blog/design-guides-and-tips/best-motion-design-tools-ranked-by-use-case)
- Spline: LottieFiles places it in 3D web scenes with WebGL output and a free tier with paid plans. Toolradar says the free plan adds a watermark to web exports. [LottieFiles](https://lottiefiles.com/blog/design-guides-and-tips/best-motion-design-tools-ranked-by-use-case); [Toolradar, Rive vs Spline](https://toolradar.com/compare/rive-vs-spline) (snippet; UNVERIFIED)
- Practitioner pattern: a Contra case study uses Rive for UI animations and Spline for a 3D product viewer. Freelancer portfolio; not authoritative. [Contra, Rive and 3D model project](https://contra.com/p/QWBFvemk-wizytowkico-rive-animations-and-3-d-models) (snippet only)
- Cavalry, Rive, and Spline have no fetched vendor pages in this pass. The School of Motion "Motion Mondays" piece (5 Jan 2026) covers Cavalry and Spline features; not fetched. [School of Motion, Motion Mondays 5 Jan 2026](https://schoolofmotion.com/blog/motion-mondays-january-5-2026)

### Inferences
- Reproducible in a browser pipeline, deterministically: tilt, orbit, zoom, cursor paths, click rings, shadow and gradient light sweeps, a textured WebGL plane, keyframed layer motion (Jitter-style), and procedural vector motion when the procedure is a function of t (Cavalry-style, reimplemented in code).
- Real-time only, unless the runtime's clock is controlled: Rive and Spline state machines and 3D scenes. Treat these as assets to be rendered offline, not as live components, or verify stepping.

### Gaps
- No vendor documentation for Jitter, Cavalry, Rive, or Spline was fetched. Their 2026 feature claims are UNVERIFIED.
- Price and tier data for all six tools are third-party and not checked against vendor pricing pages.

---

## Key Question 3: Which typography moves are named as current in 2026, and which are named as overused?

### Takeaway
Kinetic type is named as a current trend in 2026 roundups. None of the sources reviewed names kinetic typography as overused. The critique that appears is narrower: motion that delays meaning, motion that costs performance on mobile, and static "fake" kinetic type as a cheap substitute for video. The "overused" lists found name yellow hues, AI caricatures, and retro nostalgia, not kinetic type.

### Cited Findings
- Roundups list kinetic typography among the top 2026 design trends. One says it runs across web, apps, and video, and reacts to scrolling, hovering, or audio. Secondary blog sources. [Font Trend, LoungeLizard](https://www.loungelizard.com/blog/font-trend/) (snippet); [Digital Silk, kinetic typography](https://www.digitalsilk.com/web-design/web-trends/kinetic-typography/) (snippet)
- Digital Silk argues motion helps only when it clarifies meaning, and hurts when it delays it. It says kinetic type competes with performance budgets, especially on mobile. Snippet; UNVERIFIED in full. [Digital Silk](https://www.digitalsilk.com/web-design/web-trends/kinetic-typography/)
- Autoae's FAQ calls kinetic type the most-cited motion trend, partly because short-form video is watched muted. Vendor blog; UNVERIFIED. [Autoae, motion graphics trends 2026](https://autoae.online/blog/motion-graphics-trends-2026) (snippet)
- Static kinetic typography (still images that fake motion) is described as a go-to technique for stopping the scroll without large video files. Blog; UNVERIFIED. [Slashpage, kinetic typography](https://slashpage.com/brand-community/943zqpmqxv4pg2wnvy87.md) (snippet)
- Creative Boom's "trends creatives are so over in 2026" is cited for the overused yellow hue, AI caricatures, and Y2K/retro nostalgia. Kinetic typography was not confirmed on that list. Note the Accent Yellow of this brand film sits in the list's "overused yellow" category; relevant to the brief. [Creative Boom](https://creativeboom.com/insight/10-trends-creatives-are-so-over-in-2026/) (snippet only; full article not fetched)
- Variable font axis animation: CSS `font-variation-settings` tweened through a custom property is the approach a GSAP forum thread and a CodePen example point toward. Neither shows axis animation directly. UNVERIFIED for axis animation at large size. [GSAP forum, SplitText with custom font](https://gsap.com/community/forums/topic/24283-split-text-using-custom-font/) (snippet); [CodePen, variable face example](https://codepen.io/mrnathan8/pen/EaawNBq) (snippet)
- GSAP SplitText is free since version 3.13.0 (per a search snippet). Fonts must load before splitting; the forum fix is `document.fonts.ready.then(...)` before the split. Revert the split when the animation completes. [GSAP forum](https://gsap.com/community/forums/topic/24283-split-text-using-custom-font/) (snippet; the version claim is UNVERIFIED against gsap.com)
- Troika-three-text is used in a June 2025 Codrops tutorial for responsive WebGL text. A troika issue proposes per-line and per-word animation, which suggests troika did not expose that granularity at the time of the issue (date not confirmed). Per-character MSDF animation is listed as done in the three-glyph library, per-line not done. [Codrops, responsive WebGL text (2025-06-05)](https://tympanus.net/codrops/2025/06/05/how-to-create-responsive-and-seo-friendly-webgl-text/) (snippet); [troika issue 102](https://www.github.com/protectwise/troika/issues/102) (snippet); [three-glyph README](https://unpkg.com/three-glyph@0.0.29/README.md) (snippet)
- Runtime MSDF generation from TTF is offered by three-msdf-text-utils, which includes a Reveal demo. [three-msdf-text-utils](https://cdn.jsdelivr.net/npm/three-msdf-text-utils@1.5.0/README.md) (snippet)

### Inferences
- An MSDF atlas is baked for one static font instance. Per-glyph changes to a variable-font axis (weight, width, optical size) likely require a separate atlas per axis value, or a shaping-based renderer. This is inferred from the atlas method, not from a source. UNVERIFIED.
- For deterministic frame capture, the DOM route (per-glyph `span`s, CSS `font-variation-settings`) is the simplest path. The WebGL route requires that all glyph geometry is ready before the first capture.
- Type reacting to sound is deterministic if the audio analysis (per-frame loudness or FFT bins) is precomputed offline from the track, and then driven as a function of t. This is an inference; no source was found for it.
- Text on 3D paths, type as image, and masks/reveals: no 2026 source was found for any of these. They are listed in the brief as named techniques but not confirmed here.

### Gaps
- No 2026 source names a specific kinetic-type move as overused. The fatigue argument found concerns motion for its own sake and performance cost.
- No source was found for variable-font axis tweening through GSAP, or for per-glyph axis changes in MSDF text.
- Text on 3D paths (CSS `offset-path`, SVG path, troika curve) was not searched.
- Optical-size behaviour at large sizes (`font-optical-sizing`, `opsz` axis) was not searched.

---

## Key Question 4: Which code-built films are public, and what do their makers say about easing, timing, motion blur, grain, and sound?

### Takeaway
The publicly named code-built films are few and mostly short. The best-documented is the Fireship "This video was made with code" piece (Remotion, 2022). Its maker's stated reasons are that a video is a function of images over time and that React describes changing UI well. Remotion's own showcase is curated and not taking submissions. The Motion Canvas examples repository includes "Smooth Parallax" and "One Year of Motion Canvas." Makers say little about grain or blur in the sources found.

### Cited Findings
- Fireship's Remotion video (YouTube ID deg8bOoziaE; dated March 2022, per a search summary; OLDER than 2025). Source code is public in a repo by William Candillon (wcandillon/remotion-fireship), per the Remotion README credit list. [Remotion README](https://github.com/remotion-dev/remotion) (fetched; the README credits the video, the fetch did not show the credit line directly. Search snippet also cites it; UNVERIFIED as a direct quote)
- Transcript summary of the Fireship video: "a video is just a function of images over time," and "React is a great tool for describing UIs that change over time." Spring easing is said to make the animation "even more realistic"; no measured quality gain is claimed. Transcript site, not Fireship's own page. [Rosetta transcript](https://rosetta.to/u/fireship/this-video-was-made-with-code-but-how) (fetched; caption-generated transcript that says it "may contain minor errors")
- The same transcript says nothing about transitions, motion blur, grain, or sound. [Rosetta transcript](https://rosetta.to/u/fireship/this-video-was-made-with-code-but-how) (fetched)
- Remotion's launch-video gallery entry (eight scenes, 1080x700, 30 fps, about 37 seconds) describes: spring fade and scale transitions (0.95 to 1 in, 1 to 0.95 out), staggered spring entrances, 3D camera motion (`rotateX` 20 degrees with slight `rotateY` oscillation), a word-by-word reveal, and background music at 40 percent volume with a 1-second fade in and 2-second fade out. The page does not mention motion blur or grain. [Remotion, launch video on X](https://www.remotion.dev/prompts/launch-video-on-x) (fetched; gallery entry written as a build prompt, maker not named)
- Remotion's showcase page: "Products, campaigns, launch videos, tutorials and creative tools made with Remotion." It is curated and states "We are not taking new showcase submissions right now." Cards were not visible in the fetched text. [Remotion showcase](https://www.remotion.dev/showcase) (fetched; no entries listed in the fetched text)
- Remotion's README and launch material describe "Make videos programmatically: leverage web technology and own your video as code." [Remotion README](https://github.com/remotion-dev/remotion) (fetched)
- Remotion is used in a BridgeMind merchandise launch video, attributed (in the source) to Claude Opus 5.5. Case study; UNVERIFIED. [Hermes AI case study, BridgeMind launch](https://hermes-ai.net/cases/video/case/bridgemind-launch/) (snippet)
- A Codex and Remotion launch-video how-to (GPT-5.4 named in the source). Tutorial; UNVERIFIED. [Aident, product launch video with Codex and Remotion](https://aident.ai/blog/create-product-launch-video-codex-remotion) (snippet)
- Motion Canvas: the official examples repository holds videos made with Motion Canvas, including "Smooth Parallax" and "One Year of Motion Canvas." Motion Canvas uses generator functions. [Motion Canvas examples](https://github.com/motion-canvas/examples/blob/master/README.md) (snippet; the README was not fetched)
- Theatre.js: no film showcase found. The README invites creators to share tutorials and video work, and shows drei.lu art as an example. The project is an animation library for web and 3D rather than a video-export tool. [Theatre.js](https://github.com/theatre-js/theatre) (snippet)

### Inferences
- The strongest public code-built film evidence in this pass is Remotion, through the Fireship piece and the gallery entries. Both are dated 2022 or undated and are marketing or tutorial sources. No 2026 Remotion film from a named studio was confirmed.
- No maker in the sources found identifies motion blur, grain, or sound as the largest jump. The Remotion gallery entry is the only one that describes sound, and that is a background-music spec, not a quality argument.

### Gaps
- No public maker statement on motion blur or film grain for a code-built film was found.
- The Remotion showcase cards were not retrieved. A list of named studio films made in Remotion, Motion Canvas, Theatre.js, Three.js, or React Three Fiber in 2026 is not in this pass. This needs a second pass on the Remotion showcase page and on Codrops and the Three.js forum.
- No Three.js, React Three Fiber, or custom-engine film was researched in this pass.

---

## Key Question 5: According to practitioners, which few changes give the largest perceived jump from web animation to studio film?

### Takeaway
Practitioners who write about this name a short list, and it is consistent across sources. Easing comes first. Motion blur on fast moves comes second. Depth through layering and camera follows. A restrained grade and grain come last, with grain kept off text. The sources do not rank these by measured effect. The ranking here is a synthesis, not a finding.

### Cited Findings
- Easing: "even a small amount of easing immediately improves the perceived quality of the motion." Ease-out for entering and exiting elements. Blog and course sources. [Search results, animation tips](https://www.creativelive.com/class/adobe-after-effects-fundamentals-philip-ebiner-fiverr/lessons/13-tips-to-make-your-animations-look-more-nautral-04-22) (snippet only; UNVERIFIED as a quote)
- Emil Kowalski: ease-out "accelerates at the beginning which gives the user a feeling of responsiveness"; avoid ease-in for exits. Duration under 300 ms for UI. [Emil Kowalski](https://emilkowal.ski/ui/7-practical-animation-tips) (fetched)
- Motion blur on fast moves only, since "the faster the animation, the more motion blur you get." Blur can make slow moves mushy. [Search results, motion blur tutorial](https://www.provideocoalition.com/tool-tip-tuesday-for-adobe-premiere-pro-better-looking-movement-with-ease-in-motion-blur/) (snippet only; UNVERIFIED)
- Smear frames: a deliberate smear frame adds perceived speed and weight during very fast motion, and differs from standard motion blur. Source quality mixed. [Search results, smear frames](https://cursa.app/en/page/polish-pass-overlap-secondary-motion-and-subtle-texture) (snippet only; UNVERIFIED)
- Grade and grain as the last step. A finishing grade is the "cheapest jump from clean to cinematic." Keep grain low-opacity and off text. Fix motion first, then depth, light, texture last. [Search results, motion and polish sources](https://cursa.app/en/page/polish-pass-overlap-secondary-motion-and-subtle-texture) (snippet only; UNVERIFIED)
- Some sources in this set appear to be AI-generated or unverified. Treat the ranking as a synthesis.

### Inferences
- Ordered by how often the practitioners in this pass name them: (1) easing, (2) motion blur on fast moves, (3) depth through layers and camera, (4) grade and grain, last, low opacity, off text.
- For a deterministic pipeline, the first two are cheapest to implement: an easing function of t, and sub-frame accumulation for blur at 30 fps.
- The sources do not measure perceived quality. "Largest jump" is not established. Test with a side-by-side render.

### Gaps
- No source measures the perceived quality effect of any of these changes.
- No source ranks sound design against motion. Sound is absent from the practitioner sources in this pass.

---

## Open items for a second pass
1. Fetch the Remotion showcase cards (page is curated; list may need the docs resources page).
2. Fetch Motion Canvas examples README and Theatre.js showcase directly.
3. Fetch Codrops and Three.js forum entries on text, glyph, and variable-font animation.
4. Fetch School of Motion and Motion Design School written breakdowns on product-UI motion for 2026 dates.
5. Verify Jitter, Cavalry, Rive, and Spline feature and pricing claims on the vendor pages.
6. Test `backdrop-filter`, `font-variation-settings` tween, and troika per-glyph under Playwright frame capture.
