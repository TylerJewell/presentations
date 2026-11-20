# Code-driven motion techniques for a studio-grade brand film (as of 2026-11-18)

Scope: a partial catalogue from one research pass of about 13 tool calls. Many areas in the brief were not covered and are listed under Gaps. Every claim below cites its source. Items marked UNVERIFIED are from a single third-party page or a snippet that did not confirm the claim.

Pipeline context: each scene is a pure function of time, rendered by Playwright on headless Chromium (Edge) at 1920x1080, 30 fps, piped to ffmpeg (libx264, yuv420p).

---

## 1. Motion blur in deterministic frame rendering

### Takeaway
Remotion's current recommended motion blur is `HtmlInCanvasMotionBlur`. It blends sub-frame samples, which fits a pure-function-of-time pipeline. It needs the HTML-in-canvas feature for preview, which is Chrome-only. The shutter model is the standard one: exposure = (shutterAngle / 360) / fps, and `samples` sets how many sub-frames are blended.

### Cited Findings
- Remotion recommends `<HtmlInCanvasMotionBlur>` as state-of-the-art. It needs `width` and `height` props and calls `useCurrentFrame()` in child components so each sample gets its own frame. Rendering works without extra configuration; client-side rendering needs HTML-in-canvas enabled. Preview needs HTML-in-canvas, which is Chrome-only; otherwise it falls back to unblurred content with a "Motion blur is not visible" indicator. Source: [Remotion motion blur guide](https://www.remotion.dev/docs/motion-blur-guide); also surfaced in [Remotion motion blur search result](https://www.remotion.dev/docs/motion-blur/).
- `shutterAngle` sets exposure; 360 degrees equals one frame. `samples` sets blended snapshots; more samples give smoother blur at higher render cost. Source: [Remotion motion blur guide](https://www.remotion.dev/docs/motion-blur-guide).
- The `motionBlur` prop on `TransitionSeries.Transition` exists from Remotion 4.0.545. Custom transition presentations must use HTML-in-canvas. Enter/exit style props cannot be combined with motion blur. Source: [Remotion motion blur guide](https://www.remotion.dev/docs/motion-blur-guide).
- `CameraMotionBlur` works without HTML-in-canvas but can distort colour and opacity; the guide does not recommend it. `Trail` repeats earlier positions rather than blending frames and is not true motion blur. Source: [Remotion motion blur guide](https://www.remotion.dev/docs/motion-blur-guide).

### Inferences
- For a code-driven pipeline that already renders frame by frame, sub-frame accumulation (N samples per output frame across the shutter interval) is the deterministic option. It costs N times the render time per frame. Remotion's implementation is one example; the same maths applies in a custom Playwright harness that averages N captures per frame. This inference is not from a source.

### Gaps
- No source found on the colour cost of averaging 8-bit frames (see section 4). Cost figures for N samples at 4K were not found.

---

## 2. Remotion (programmatic video, React)

### Takeaway
Remotion is the most active code-first video framework in the set. Its 2026 work centres on Studio interactivity, an effects library, an official agent-skills package, and the motion blur component above.

### Cited Findings
- Remotion 4.0.4xx releases added an effects library: contrast, duotone, glow, vignette and light-leak effects. Source: [Remotion v4.0.467 release notes](https://newreleases.io/project/github/remotion-dev/remotion/release/v4.0.467) and [v4.0.468](https://newreleases.io/project/github/remotion-dev/remotion/release/v4.0.468) (surfaced in search; the effects list is from the release-note snippet).
- v4.0.490 added a perceptual-scale output option to `interpolate()` and progressive pixelation. Source: [v4.0.490](https://newreleases.io/project/github/remotion-dev/remotion/release/v4.0.490).
- v4.0.504 revamped Studio, added trimmable Series on the timeline, and standardised toolbar controls. Source: [v4.0.504](https://newreleases.io/project/github/remotion-dev/remotion/release/v4.0.504).
- v4.0.440 added AV1 codec support in the renderer and fixed FPS drift when combining chunks. Source: [v4.0.440](https://newreleases.io/project/github/remotion-dev/remotion/release/v4.0.440).
- Official Agent Skills: install with `npx skills add remotion-dev/skills`, or choose them in `bun create video`. The umbrella skill is `/remotion-best-practices`; `/remotion-multimedia` covers browser multimedia with Mediabunny. The package works with Claude Code, Codex, Kimi Code and Cursor. Source: [Remotion AI skills docs](https://www.remotion.dev/docs/ai/skills).
- One third-party write-up says the package has 28 modular rule files, including guidance on Three.js and React Three Fiber content and Zod-schema parametrisation. UNVERIFIED (single third-party source). Source: [mer.vin write-up](https://mer.vin/2026/05/remotion-agent-skills-install-remotion-dev-skills-for-claude-code-and-cursor/).
- A third-party tracker says Agent Skills launched in January 2026. UNVERIFIED. Install counts differ across aggregators (126,000+ vs 40), so none are used here. Source: [AutoAE 2026 tracker](https://autoae.online/blog/remotion-updates-2026).
- `OffthreadVideo` extracts exact frames during rendering. Remotion now prefers `<Video>` from `@remotion/media`. `OffthreadVideo` is not supported in `@remotion/web-renderer`. Source: [Remotion OffthreadVideo docs](https://www.remotion.dev/docs/offthreadvideo).
- For three.js textures, `useVideoTexture()` works in preview; the three.js texture hook from OffthreadVideo only works during rendering. Source: [Remotion use-offthread-video-texture](https://www.remotion.dev/docs/use-offthread-video-texture).
- Many simultaneous `<Video>` tags can cause stutter in preview; `OffthreadVideo` is the recommended frame-accurate path for renders. Source: [Remotion flickering docs](https://www.remotion.dev/docs/flickering).

### Inferences
- The effects list (vignette, glow, duotone, light leak) covers several of the grade and camera-look items in the brief, but only as Remotion components. Their quality against a dedicated grade was not checked.

### Gaps
- Exact release dates for 4.0.4xx versions were not confirmed (newreleases.io pages carry no dates in the snippets). Current version number not confirmed; 4.0.545 is the latest version mentioned in any source.
- No public Remotion film made with motion blur plus grain plus grade was found.

---

## 3. Three.js, WebGPU and TSL

### Takeaway
WebGPURenderer is the production path in 2026. TSL (Three Shading Language) replaces hand-written GLSL. WebGPU code imports from `three/webgpu`. Three.js added a native Gaussian splat renderer for WebGPU in the r186 line, per one article that conflicts with itself on its date.

### Cited Findings
- Three.js r171 and later support WebGPU with minimal configuration; WebGPU projects import from `three/webgpu`; custom GLSL shaders must be rewritten in TSL. Source: [WebGPU + Three.js migration guide (utsubo, 2026)](https://www.utsubo.com/blog/webgpu-threejs-migration-guide) (third-party; not verified against the Three.js docs).
- r182 (December 2025) added 3D texture loading and bitwise operations to TSL and fixed WebGPU compute water. Source: [CGWORLD r182 note](https://cgworld.jp/flashnews/01-202512-Threejs-r182.html) (Japanese, secondary).
- r183 (February 2026, per a Cinevva article dated 2026-03-18) renamed PostProcessing to RenderPipeline for WebGPURenderer, added a TSL specification document, and added a clipSpace node. Source: [Cinevva r183 note](https://app.cinevva.com/news/2026-03-18-threejs-r183-render-pipeline) (secondary; verify against the official release page).
- A native `GaussianSplatMesh` (WebGPU/TSL NodeMaterial) was merged. The article says it is about 7 KB over base Three.js, uses GPU counting sort with 4096 bins by default, and re-sorts only after the camera passes a threshold. Limitations: SH0 colour only (no SH1 to SH3), no LOD, streaming, WASM or worker support. WebGL is handled only by a plain JavaScript fallback. Loaders: PLY, SPLAT, KSPLAT, SPZ, glTF `KHR_gaussian_splatting`. Source: [radiancefields.com](https://radiancefields.com/three.js-merges-a-native-gaussian-splat-renderer-for-webgpu-in-r186). The article's byline is "Aug 10, 2026" and its metadata is "Nov 18, 2026"; the body names r185 as current while the title says r186. UNVERIFIED pending the official Three.js release notes. CGWORLD also reports r186 with a native Gaussian splat renderer on WebGPU/TSL. Source: [CGWORLD r186 note](https://cgworld.jp/flashnews/01-202610-Threejs-r186.html).
- Codrops has 2026 WebGPU and scroll-driven pieces: a Shader.se write-up on a scroll-driven WebGPU pipeline with selective scene rendering and transitions (2026-05-19) and a Ben Paine tutorial on persistent WebGPU page transitions (2026-06-30). Source: [Codrops 2026-05-19 article](https://tympanus.net/codrops/2026/05/19/80s-business-tech-seamless-scene-transitions-inside-shader-ses-scroll-driven-webgpu-pipeline/); [Codrops archive](https://tympanus.net/codrops/2026/06/). The June post's content was not read.

### Inferences
- WebGPU's gain for film-style output is compute and post processing. Nothing found confirms that TSL post-processing is faster than the WebGL path for these effects.

### Gaps
- r180 release notes were not retrieved; the search returned no WebGPU/TSL detail for r180.
- No official source found for the pmndrs postprocessing effect list by version.

---

## 4. Post-processing: bloom, DoF, grain, halation, aberration, vignette, tone mapping

### Takeaway
The pmndrs `postprocessing` library (v6.39.x in the README pages surfaced) provides the effect list the brief names, including film grain (NoiseEffect) and bokeh depth of field (DepthOfFieldEffect). Halation and chromatic aberration as named effects were not confirmed in the search. Do not mix the three/addons EffectComposer with pmndrs EffectComposer.

### Cited Findings
- The pmndrs `postprocessing` README lists NoiseEffect (film grain) and DepthOfFieldEffect (bokeh). A Bloom demo is in the README index. Source: [postprocessing README 6.39.4](https://cdn.jsdelivr.net/npm/postprocessing@6.39.4/README.md); [6.39.6 README](https://cdn.jsdelivr.net/npm/postprocessing@6.39.6/README.md) (includes a Color Depth demo).
- The React wrapper `@react-three/postprocessing` provides declarative Bloom, Depth of Field, Noise and Vignette components. Source: [react-postprocessing docs](https://react-postprocessing.docs.pmnd.rs/introduction).
- Warning: do not mix the three/addons EffectComposer with pmndrs EffectComposer. Source: [skill page quoting the warning](https://skillselion.com/skills/openaec-foundation/three.js-claude-skill-package/threejs-impl-post-processing) (secondary).
- TSL post-processing docs exist for WebGPU. Source: [TSL post-processing doc](https://cdn.jsdelivr.net/npm/claude-code-skills@0.5.0/data/skills/webgpu-threejs-tsl/docs/post-processing.md) (third-party repackaging; not the Three.js site).

### Inferences
- Film grain and halation are the two items the brief most needs for dark gradients (section 5); grain is a deliberate dither, so it can be applied in the shader or as an overlay.

### Gaps
- Halation and chromatic aberration: no source found. Tone mapping in WebGPU pipelines (ACES, AgX) was not verified.
- No version history per effect was found.

---

## 5. Colour, bit depth and banding

### Takeaway
Dark gradients on pure black band in 8-bit H.264. The sources agree on three fixes: encode at 10-bit, add dither or grain before the encode, and avoid a denoise pass that removes grain. Dither added too early is removed by the lossy encoder, so the sources recommend adding it close to the final bitstream or raising bit depth.

### Cited Findings
- Encoding in 10-bit runs the codec's internal arithmetic at higher precision, so rounding contours appear on a finer grid. Source: [forasoft banding article](https://www.forasoft.com/learn/video-quality/articles-vqm/banding-gradient-steps) (secondary).
- A dither applied before lossy encoding can be quantised away and bands return; dither should be added as close to the final bitstream as possible, or bit depth raised. Source: [forasoft dithering glossary](https://www.forasoft.com/learn/video-encoding/glossary/terms/dithering) (secondary; the search snippet reports this without a full read).
- Film grain acts as natural dither. Denoising before encode can expose banding. Source: [VideoHelp thread](https://forum.videohelp.com/showthread.php?p=2475674) (user forum; anecdotal).
- One VideoHelp user reports H.264 at 4M showed grain but no banding, while H.265 showed banding on dark gradients. UNVERIFIED, single anecdote. Source: [VideoHelp thread](https://forum.videohelp.com/showthread.php?p=2690680).
- Topaz thread: if 8-bit must be kept, add a small amount of noise; the bit-depth reduction happens in the format filter. Source: [Topaz community](https://community.topazlabs.com/t/what-to-do-about-bit-depth/84906) (user forum).

### Inferences
- For this pipeline: render in 16-bit float or 10-bit where possible, add a per-frame deterministic grain (seeded by frame number, so re-renders match), and encode as libx264 High 10 (yuv420p10le) if the playback target accepts it. yuv420p 8-bit output is the likely cause of the current banding. The 10-bit playback support of target platforms was not checked.

### Gaps
- No source on Chromium wide-gamut or HDR capture (canvas colorSpace, `display-p3`, `rec2100-hlg`) through Playwright. Not searched.
- No source on ProRes 4444 or H.265 10-bit in ffmpeg for this use. Not searched.

---

## 6. Headless Chromium GPU capture on Windows (2026)

### Takeaway
The sources found point to headed Chrome in an interactive desktop session as the reliable route for WebGPU on Windows. Pure headless capture of WebGPU reportedly returns black frames on Windows. No official Playwright or Chromium document for this case was found.

### Cited Findings
- One WebGPU screenshot tool reports that on Windows, headless captures are black and recommends `--headed` on a logged-in desktop; the author calls it an upstream headless limitation with no known flag fix. Source: [agent-browser WebGPU guide](https://agent-browser.dev/webgpu) (third-party; unverified).
- Headless Chrome uses SwiftShader by default; `--enable-gpu` turns off that forced software path. Source: [Chromium GPU docs (server-side headless Linux)](https://chromium.googlesource.com/chromium/src.git/+show/main/docs/gpu/server-side-headless-linux-chrome-with-gpus.md) (Linux-focused).
- Linux-specific flags for hardware acceleration in new headless mode (Playwright 1.49+): `--use-angle=vulkan`, `--enable-features=Vulkan`, `--disable-vulkan-surface`, `--enable-unsafe-webgpu`. No Windows equivalent found. Source: [third-party guide]( https://vgpu.labs.vercel.dev/guides/agent-browser-webgpu ) (unverified).
- A GPU bridge project reports that a Windows service runs in Session 0 with no GPU desktop and hangs on WebGPU, and that the working setup runs in the interactive session on Chrome 148 with AMD RDNA-2. Source: [gpu-browser-bridge](https://awesome.ecosyste.ms/projects/github.com%2Fajmeese7%2Fgpu-browser-bridge) (unverified).
- WebGPU is available on Windows with Direct3D 12 in Chrome and Edge 113 and later. Source: [web.dev WebGPU support](https://web.dev/blog/webgpu-supported-major-browsers).

### Inferences
- The render harness should test WebGPU capture with a black-frame check on the first frame before rendering a full film. Nothing here confirms that headed Edge on Windows produces correct frames at 3840x2160 for the film pipeline.

### Gaps
- No direct test was run. No source confirms Edge-specific behaviour.

---

## 7. Other frameworks: Motion Canvas, Revideo, Theatre.js, GSAP, Rive, Lottie, Spline

### Takeaway
Revideo is a fork of Motion Canvas, built as a library for generating video with a TypeScript API. Motion Canvas is an editor-first, MIT-licensed tool for explainer vector animation. The version and release status of Theatre.js, GSAP and Rive in 2026 could not be confirmed from primary sources.

### Cited Findings
- Revideo is an open-source TypeScript framework for programmatic video templates with a render API. It is forked from Motion Canvas and largely shares its animation API. Source: [Revideo docs](https://docs.re.video/) and [Revideo animations doc](https://docs.re.video/designing-animations).
- Motion Canvas is MIT-licensed, uses a generator-based animation API, and has a live editor for audio sync. It is aimed at explainer vector animation. Source: [pkgpulse comparison 2026](https://www.pkgpulse.com/guides/remotion-vs-motion-canvas-vs-revideo-programmatic-video-2026) (secondary).
- One 2026 guide calls Revideo a fork of Remotion. This contradicts Revideo's own documentation, which says Motion Canvas. Treated as an error. Source: [AutoAE Revideo vs Remotion](https://autoae.online/blog/revideo-vs-remotion-2026).
- Theatre.js: one guide says it is approaching 1.0 and active development moved to a private repository; another glossary lists 0.7. Conflicting, unverified. Source: [brightcoding Theatre.js article](https://converter.brightcoding.dev/blog/theatrejs-why-pro-animators-ditch-css-for-this-secret-weapon) (unverified).
- GSAP: free under MIT since November 2024 after Webflow's acquisition (third-party roundups); GSAP 3.12 and 3.13 are both named. Source: [jisaku glossary](https://jisaku.com/glossary/animation-motion-12-gsap-3-12-framer-motion-2026) (unverified).
- Rive: Webflow Interactions can now drive Rive animations through GSAP and Rive view-model data binding. Source: [Webflow updates](https://webflow.com/updates/rive-interactions-gsap).
- dotLottie: LottieFiles reports dotLottie state machines approaching Rive's capability (March 2026), dotlottie-web renders on the GPU, and Figma prototypes export as interactive dotLottie (April 2026). Source: [LottieFiles blog](https://lottiefiles.com/blog/lottie-animations/lottiefiles-or-rive) (vendor blog; claims not independently verified).

### Gaps
- Spline, Motion Canvas 2026 release notes and Theatre.js release status: not verified from primary sources.

---

## Answers to the key questions

1. **Largest jump from web animation to film** (per practitioners): not established by this pass. The Codrops and Shader.se material shows scroll-driven WebGPU pipelines and scene transitions, but no practitioner statement ranking techniques was read. Gap.
2. **How Remotion/Motion Canvas/Theatre.js productions add motion blur, grain, DoF and grade**: Remotion has an official motion blur component (section 1) and an effects set (section 2). Grain and DoF are in pmndrs postprocessing (section 4). No production write-up was read. Pitfalls found: CameraMotionBlur colour error, Trail is not motion blur, OffthreadVideo not in web-renderer, and HTML-in-canvas is Chrome-only for preview.
3. **WebGPU in headless Chromium/Edge on Windows, 2026**: headed session is the reliable route per sources; pure headless WebGPU reportedly black on Windows. Section 6.
4. **New in 2026**: Remotion Agent Skills (official docs, dates unconfirmed); Three.js r183 RenderPipeline rename and TSL spec (secondary); native WebGPU Gaussian splats (secondary, date conflict); LottieFiles dotLottie GPU rendering (vendor).
5. **Public films made in code and what makers say**: not searched in this pass. Gap.

## Gaps (not covered in this pass)
- Lusion, Active Theory, Resn, Vercel, Linear, Stripe, GitHub film and motion write-ups.
- Product UI cinematography (3D tilt, parallax from screenshots, light sweeps on UI, cursor choreography).
- MSDF text, variable fonts, kinetic typography and per-glyph splitting.
- Procedural light, glass and refraction in shaders.
- Easing, spring and animation-principles sources (Disney principles in code).
- WebCodecs capture, virtual time and seeded randomness practice.
- Wide gamut and HDR capture through Chromium; ProRes and H.265 10-bit with ffmpeg.
- Lottie/Rive GPU details beyond the vendor blog.
- Halation and chromatic aberration as named effects.

## Next steps suggested
- Read the official Three.js release page for r180 to r186 to fix the splat release date.
- Read the Remotion AI skills page and the motion-blur guide in full for sample counts and cost.
- Run a one-frame WebGPU capture test on Windows Edge (headed) before committing to a WebGPU scene.
