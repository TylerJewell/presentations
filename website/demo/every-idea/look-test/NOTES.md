# ideAItion look test

One 10 s, 30 fps, 1920x1080 silent shot in three looks. Outputs are in `out/`.

## Files

| File | Purpose |
|---|---|
| `scene.html` | Page both scenes run in; `?v=A` loads `a.js`, anything else loads `b.js`. Exposes `window.ready` and `window.at(t)`. |
| `shared.js` | Choreography constants (labels, timings), easings, seeded PRNG, wave and reveal functions. |
| `a.js` | Variant A: DOM dot grid, CSS scale transform. |
| `b.js` | Variants B and C: Canvas 2D, 3D points, perspective, depth of field, glow. |
| `render.mjs` | Capture and encode for A, B, C. |
| `stills.mjs` | Stills from the MP4s and `out/compare.png`. |
| `capture-check.html`, `capture-check.mjs` | WebGL2 / WebGPU capture check. |

## Re-running

Run from `look-test/`. `playwright` is the install under `ai-console/kalix-console/apps/stories`, as in the film renderers.

```
node render.mjs A            # out/A.mp4
node render.mjs B            # out/B.mp4
node render.mjs C            # out/C.mp4 and out/C-10bit.mp4
node render.mjs C --sub=2    # lighter C: 4 sub-frames per frame, average 2
node render.mjs C --frames=30  # first second only, for timing
node stills.mjs              # out/stills/*.png and out/compare.png, after all MP4s exist
node capture-check.mjs       # out/capture-check.png and the GPU strings
```

## Render times

| Variant | Time | Notes |
|---|---|---|
| A | 16.3 s | JPEG q92 capture at 1x, libx264 slow crf 16, as the review renderer does. |
| B | 21.4 s | Same capture and encode as A. |
| C | 1999 s (33 min) | 8 PNG sub-frames per output frame at 3840x2160 (2400 captures), 4 averaged. |

C: the timing of the first 30 output frames was 47.7 s, which projected to about 8 min. That
projection was wrong because the first second is nearly empty; a 4K PNG of the late frames takes about 1.3 s
and weighs about 3.7 MB, against 0.2 s and 0.1 MB at the start. The real run took 33 min, over the 25 min
threshold, and the reduced variant was not rerun. C therefore used the full spec: 8 sub-frames captured, 4
averaged (`--sub=4`). `--sub=2` is available and would take about 17 min.

## Variant C details

- Sub-frame j (0..7) of output frame n is sampled at t = (n + (j + 0.5) / 8) / 30. The shutter averages slots 2..5, a window of 4/8 of the interval (180 degrees) centred on the interval.
- ffmpeg: `format=gbrp16le, tmix=frames=4, select=eq(mod(n,8),5), setpts`, then Lanczos downscale from 3840x2160, then `format=yuv420p10le, noise=alls=2:allf=t`, then `split`.
- The 8-bit file converts the grained 10-bit frames to yuv420p; the 10-bit file is libx264 High 10 yuv420p10le. Both are crf 14, preset slow.
- `noise` runs at 10-bit input here and was accepted; grain level alls=2 is barely visible on black in the stills.

## Capture check

Headless Edge, launched as the renderers launch it (`chromium.launch()`, falling back to `channel: "msedge"`; Edge 151.0.7922.34), screenshot `out/capture-check.png`.

- WebGL2 canvas with a coloured triangle: the screenshot shows the full gradient triangle, not black.
- `UNMASKED_RENDERER_WEBGL`: `ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device (Subzero) (0x0000C0DE)), SwiftShader driver)`. This is software rendering.
- `navigator.gpu.requestAdapter()`: returns `null`. WebGPU scenes cannot be captured headless on this machine.
- WebGL scenes can be captured, but on SwiftShader (CPU).

## Things to know

- A.mp4 and B.mp4 are tagged `yuvj420p` (full range) because the JPEG pipe input carries full range, as in the existing renderer. C.mp4 is limited-range `yuv420p`. Players honour the tag; black is black in all three.
- Labels fade out between 6.8 s and 7.4 s (not in the brief), so they do not collide with the word. The five labelled points stay.
- A dark elliptical patch sits behind the word (a black radial gradient in A, a dimming of the points in B), released over 9 to 10 s so the lit field returns.
- The labels appear when their points enter the frame; at t = 3.5 s no label is visible yet in any variant, so that still shows only the field.
- All variants other than the first point reveal the rest of the field outward from the centre starting at 1.5 s; in B the field already exists in 3D from t = 0 but is dark.
- B and C at t = 1.0 s show a large white point with a wide glow; A shows a small hard dot. The opening point in B is also close to the camera, so its size is a lens effect, not a size set by hand.
- The 10-bit file was not played back in a player; it was only probed (High 10, yuv420p10le, 300 frames, 10.0 s).
- `out/stills/` are extracted from the MP4s, so they include compression, the shutter blur and grain.
