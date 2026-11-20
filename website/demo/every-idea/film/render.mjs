// Renders a film from its deck: the one-minute film, or the four-minute film with --film=4min. A beat lasts as
// long as its animation or its spoken line, whichever is longer, and the film's clock (film.mjs) gives the
// slide time of every frame. Until the voice is recorded, a line's length is estimated from its word count
// and the line is shown as a caption.
//   node website/demo/every-idea/film/render.mjs                   review cut: 1x JPEG capture, captions on
//   node website/demo/every-idea/film/render.mjs --final           2x PNG capture scaled down, no captions
//   node website/demo/every-idea/film/render.mjs --stills=1,4.2    PNG stills at those slide times, no film
//   node website/demo/every-idea/film/render.mjs --timeline       writes out/timeline.json only
// writes out/<film>-silent.mp4, out/<film>.srt and the film's timeline, or its stills as t<time>.png.
// film/sound.mjs then adds the sound and writes out/<film>.mp4. film/film.mjs names each film's files.
import { createRequire } from "node:module";
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { FILM, clock } from "./film.mjs";

const require = createRequire("C:/Users/tyler/ai-console/kalix-console/apps/stories/package.json");
const { chromium } = require("playwright");

const DIR = dirname(fileURLToPath(import.meta.url));
const OUT = join(DIR, "out");
mkdirSync(join(OUT, FILM.stills), { recursive: true });
const arg = (k) => process.argv.find((a) => a.startsWith(`--${k}=`))?.split("=")[1];
const FINAL = process.argv.includes("--final");
const STILLS = arg("stills")?.split(",").map(Number);
const FPS = 30;
const LEAD = 0.35;     // the line starts this long after its beat begins
const TAIL = 1.0;      // and the beat ends this long after the line
const FADE = 0.35;     // the film fades from and to black over this long
const WORDS_PER_SECOND = 2.6;
const durations = existsSync(join(DIR, FILM.durations)) ? JSON.parse(readFileSync(join(DIR, FILM.durations), "utf8")) : {};

let browser;
try { browser = await chromium.launch(); } catch { browser = await chromium.launch({ channel: "msedge" }); }
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: FINAL ? 2 : 1 });
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
await page.goto(pathToFileURL(join(DIR, "..", FILM.page)).href + "?capture=1");
await page.waitForFunction(() => window.deck && window.deck.outline, null, { timeout: 60000 });
await page.evaluate(async () => { await document.fonts.load("700 80px 'Instrument Sans'"); await document.fonts.load("500 24px 'Instrument Sans'"); });
await page.addStyleTag({ content: `#clicks, #nav, #notes, #jump { display: none !important; }
  #cap { position: absolute; left: 0; right: 0; bottom: 30px; z-index: 30; text-align: center; pointer-events: none; }
  #cap span { display: inline-block; max-width: 1500px; padding: 10px 18px; background: #000; font: 500 26px/1.3 'Instrument Sans', sans-serif; color: #f4f3ef; }` });
await page.evaluate(() => { const c = document.createElement("div"); c.id = "cap"; c.innerHTML = "<span></span>"; c.style.opacity = "0"; document.getElementById("stage").appendChild(c); });
const beats = (await page.evaluate(() => window.deck.outline()))[0].beats;
const clip = { x: 0, y: 0, width: 1920, height: 1080 };
const show = (k, frac, dt, opacity, caption) => page.evaluate(([b, f, d, o, c]) => {
  window.deck.peek(0, b, f); window.deck.tick(d);
  document.getElementById("stage").style.opacity = String(o);
  const cap = document.getElementById("cap"); cap.style.opacity = c ? "1" : "0"; cap.firstChild.textContent = c || "";
}, [k, frac, dt, opacity, caption]);

if (STILLS) {
  for (const t of STILLS) {
    const k = Math.max(0, beats.findIndex((b) => t <= b.t + 1e-6)), from = k ? beats[k - 1].t : 0;
    await show(k < 0 ? beats.length - 1 : k, (t - from) / (beats[k].t - from), 0, 1, "");
    await page.screenshot({ type: "png", path: join(OUT, FILM.stills, `t${t}.png`), clip });
  }
  await browser.close();
  if (errors.length) console.error([...new Set(errors)].join("\n"));
  process.exit(0);
}

/* the timeline: one segment per beat, long enough for both its animation and its line. timeline.json gives
   the sound script each beat's place in the film and the span of slide time the beat plays (t0 to t1). */
const VOICED = Object.keys(durations).length > 0;
const segs = [];
let at = 0;
beats.forEach((b, k) => {
  const t0 = k ? beats[k - 1].t : 0, anim = b.t - t0;
  const speech = durations[`b${k + 1}`]?.seconds ?? b.words / WORDS_PER_SECOND;
  const first = k === 0, last = k === beats.length - 1, fadeIn = first ? FADE : 0, fadeOut = last ? FADE : 0;
  const len = Math.max(anim + 0.4, LEAD + speech + TAIL) + fadeIn + fadeOut;
  segs.push({ k, start: at, fadeIn, fadeOut, t0, t1: b.t, anim, len, first, last, say: b.say, from: at + fadeIn + LEAD, to: at + fadeIn + LEAD + speech });
  at += len;
});
writeFileSync(join(OUT, FILM.timeline), JSON.stringify({ total: at, voiced: VOICED, segs }, null, 2));
// The lines the voice script reads, one clip a beat, taken from the deck so the two cannot drift apart.
mkdirSync(join(DIR, FILM.voice), { recursive: true });
writeFileSync(join(DIR, FILM.voice, "narration.json"), JSON.stringify(Object.fromEntries(beats.map((b, k) => [`b${k + 1}`, b.say])), null, 2));
// Every frame's slide time. The film's frames are counted on one clock from its start, so a beat boundary
// never lands between two frames. A step in pace from one frame to the next is seen as a jerk.
const { slideAt } = clock(segs, FILM.stretch);
const times = Array.from({ length: Math.round(at * FPS) }, (_, n) => slideAt(n / FPS));
const pace = times.slice(1).map((t, n) => (t - times[n]) * FPS);
const edge = Math.ceil(FADE * FPS) + 1;      // the film starts and ends at rest, under its fades
const step = Math.max(...pace.slice(edge + 1, -edge).map((p, n) => Math.abs(p - pace[edge + n])));
// A film that is not stretched holds at the end of each beat by design, so its pace is not reported.
console.log(`${segs.length} beats, ${at.toFixed(1)} s` + (FILM.stretch ? `; the pace changes by at most ${(100 * step).toFixed(1)}% of full pace between two frames` : ""));
if (process.argv.includes("--timeline")) { await browser.close(); process.exit(0); }

const srt = (s) => { const ms = Math.round(s * 1000), p = (n, w = 2) => String(n).padStart(w, "0");
  return `${p(Math.floor(ms / 3600000))}:${p(Math.floor(ms / 60000) % 60)}:${p(Math.floor(ms / 1000) % 60)},${p(ms % 1000, 3)}`; };
writeFileSync(join(OUT, `${FILM.name}.srt`), segs.map((s, i) => `${i + 1}\n${srt(s.from)} --> ${srt(s.to)}\n${s.say}\n`).join("\n"));

const scale = FINAL ? ["-vf", "scale=1920:1080:flags=lanczos"] : [];
const ff = spawn("ffmpeg", ["-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(FPS), "-c:v", FINAL ? "png" : "mjpeg", "-i", "-",
  ...scale, "-c:v", "libx264", "-preset", "slow", "-crf", FINAL ? "14" : "16", "-pix_fmt", "yuv420p", "-r", String(FPS), "-movflags", "+faststart",
  join(OUT, `${FILM.name}-silent.mp4`)], { stdio: ["pipe", "inherit", "inherit"] });
const write = (buf) => new Promise((res) => (ff.stdin.write(buf) ? res() : ff.stdin.once("drain", res)));

const started = Date.now();
for (let n = 0; n < times.length; n++) {
  const f = n / FPS, s = segs.findLast((x) => f >= x.start);
  const op = Math.max(0, Math.min(1, f / FADE, (at - f) / FADE));
  const caption = !FINAL && !VOICED && f >= s.from - 0.1 && f <= s.to + 0.4 ? s.say : "";
  await show(s.k, Math.min(1, Math.max(0, (times[n] - s.t0) / s.anim)), 1 / FPS, op, caption);
  await write(await page.screenshot(FINAL ? { type: "png", clip } : { type: "jpeg", quality: 92, clip }));
  if ((n + 1) % (FPS * 10) === 0) console.log(`${((n + 1) / FPS).toFixed(0)} s of ${at.toFixed(0)} s, ${((Date.now() - started) / 1000).toFixed(0)} s elapsed`);
}
ff.stdin.end();
await new Promise((res) => ff.on("close", res));
await browser.close();
console.log(`wrote out/${FILM.name}-silent.mp4 in ${((Date.now() - started) / 1000).toFixed(0)} s`);
if (errors.length) console.error([...new Set(errors)].join("\n"));
