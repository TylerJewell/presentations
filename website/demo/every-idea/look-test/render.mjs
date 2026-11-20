// Renders one variant of the look-test shot to out/<variant>.mp4 (C also writes out/C-10bit.mp4).
//   node render.mjs A|B|C [--frames=N] [--sub=4]
// A and B capture one JPEG per frame at 1920x1080 as the film renderer does. C captures PNG sub-frames at
// 2x, averages them in ffmpeg (180-degree shutter), downscales with Lanczos, adds grain and encodes twice.
import { createRequire } from "node:module";
import { spawn } from "node:child_process";
import { mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const require = createRequire("C:/Users/tyler/ai-console/kalix-console/apps/stories/package.json");
const { chromium } = require("playwright");

const DIR = dirname(fileURLToPath(import.meta.url));
const OUT = join(DIR, "out");
mkdirSync(OUT, { recursive: true });
const arg = (k) => process.argv.find((a) => a.startsWith(`--${k}=`))?.split("=")[1];
const VARIANT = process.argv[2];
if (!["A", "B", "C"].includes(VARIANT)) { console.error("usage: node render.mjs A|B|C [--frames=N] [--sub=4]"); process.exit(1); }
const FPS = 30, DURATION = 10;
const FRAMES = Number(arg("frames") ?? FPS * DURATION);
// Sub-frames averaged per output frame; a 180-degree shutter spans half of the 8 sub-frames in a frame interval.
const SUB = Number(arg("sub") ?? 4);
const SLOTS = 2 * SUB;

let browser;
try { browser = await chromium.launch(); } catch { browser = await chromium.launch({ channel: "msedge" }); }
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: VARIANT === "C" ? 2 : 1 });
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
await page.goto(pathToFileURL(join(DIR, "scene.html")).href + `?v=${VARIANT === "A" ? "A" : "B"}`);
await page.waitForFunction(() => window.ready, null, { timeout: 60000 });
await page.evaluate(() => window.ready);

const clip = { x: 0, y: 0, width: 1920, height: 1080 };
const x264 = ["-c:v", "libx264", "-preset", "slow"];
let args, shoot;
if (VARIANT === "C") {
  // Grain is added after the downscale; the 8-bit and 10-bit files come from the same filtered frames.
  // tmix output i averages inputs i-SUB+1..i, so the frame at slot SUB/2+SUB-1 of each interval closes the shutter window.
  const vf = `format=gbrp16le,tmix=frames=${SUB},select='eq(mod(n\\,${SLOTS})\\,${SUB / 2 + SUB - 1})',setpts=N/(${FPS}*TB),` +
    `scale=1920:1080:flags=lanczos,format=yuv420p10le,noise=alls=2:allf=t,split[a][b];[a]format=yuv420p[a8]`;
  args = ["-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(FPS * SLOTS), "-c:v", "png", "-i", "-",
    "-filter_complex", vf,
    "-map", "[a8]", ...x264, "-crf", "14", "-r", String(FPS), "-movflags", "+faststart", join(OUT, "C.mp4"),
    "-map", "[b]", ...x264, "-crf", "14", "-profile:v", "high10", "-pix_fmt", "yuv420p10le", "-r", String(FPS), "-movflags", "+faststart", join(OUT, "C-10bit.mp4")];
  shoot = () => page.screenshot({ type: "png", clip });
} else {
  args = ["-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(FPS), "-c:v", "mjpeg", "-i", "-",
    ...x264, "-crf", "16", "-pix_fmt", "yuv420p", "-r", String(FPS), "-movflags", "+faststart", join(OUT, `${VARIANT}.mp4`)];
  shoot = () => page.screenshot({ type: "jpeg", quality: 92, clip });
}
const ff = spawn("ffmpeg", args, { stdio: ["pipe", "inherit", "inherit"] });
const write = (buf) => new Promise((res) => (ff.stdin.write(buf) ? res() : ff.stdin.once("drain", res)));

const started = Date.now();
for (let f = 0; f < FRAMES; f++) {
  if (VARIANT === "C") {
    // Sub-frame j of a frame interval is sampled at its midpoint; the shutter averages slots SUB/2 .. SUB/2+SUB-1,
    // centred on the interval.
    for (let j = 0; j < SLOTS; j++) {
      await page.evaluate((t) => window.at(t), Math.min(DURATION, (f + (j + 0.5) / SLOTS) / FPS));
      await write(await shoot());
    }
  } else {
    await page.evaluate((t) => window.at(t), f / FPS);
    await write(await shoot());
  }
  if ((f + 1) % 30 === 0) console.log(`${(f + 1) / FPS} s of ${FRAMES / FPS} s, ${((Date.now() - started) / 1000).toFixed(0)} s elapsed`);
}
ff.stdin.end();
await new Promise((res) => ff.on("close", res));
await browser.close();
console.log(`${VARIANT}: ${FRAMES} frames in ${((Date.now() - started) / 1000).toFixed(1)} s`);
if (errors.length) console.error([...new Set(errors)].join("\n"));
