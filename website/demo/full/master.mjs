// Builds the production master from a `record.mjs --hq` capture:
//   out/akka-demo.mp4         1920x1080, 30 fps, H.264 + AAC, narration levelled to -16 LUFS, chapter markers
//   out/akka-demo-silent.mp4  the same picture without audio
//   out/akka-demo.srt         captions: each narration line at the moment it is spoken
// Run: node website/demo/full/master.mjs
import { execFileSync } from "node:child_process";
import { readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const DIR = "C:/Users/tyler/competition/website/demo/full";
const OUT = join(DIR, "out");
const FPS = 30;
const frames = JSON.parse(readFileSync(join(OUT, "frames.json"), "utf8"));
const at = JSON.parse(readFileSync(join(OUT, "marks-abs.json"), "utf8"));
const durations = JSON.parse(readFileSync(join(DIR, "durations.json"), "utf8"));
const narration = JSON.parse(readFileSync(join(DIR, "narration.json"), "utf8"));
const ff = (args) => execFileSync("ffmpeg", ["-y", "-loglevel", "error", ...args], { stdio: "inherit" });

// The browser paints only when something changes, so each frame is held until the next one; the result is
// resampled to a constant 30 fps.
// The master starts as the first slide appears, not while the first page is still loading.
const first = Math.min(...Object.values(at));
const start = Math.max(frames[0].t, first - 300);
while (frames.length > 1 && frames[1].t <= start) frames.shift();
frames[0] = { ...frames[0], t: start };
// A page that loads slowly under the fade leaves the screen black; a black run is held for at most BLACK_MS,
// and everything after it moves earlier by the time removed. A fully black frame encodes to under BLACK_BYTES.
const BLACK_MS = 800;
const BLACK_BYTES = 9500;
const cuts = [];
let black = 0;
const list = ["ffconcat version 1.0"];
frames.forEach((f, i) => {
  const next = frames[i + 1]?.t ?? f.t + 1000 / FPS;
  let hold = next - f.t;
  if (statSync(f.file).size < BLACK_BYTES) {
    const keep = Math.max(0, Math.min(hold, BLACK_MS - black));
    black += hold;
    if (keep < hold) cuts.push({ at: f.t, ms: hold - keep });
    hold = keep;
  } else black = 0;
  if (hold > 0) list.push(`file '${f.file.replace(/\\/g, "/")}'`, `duration ${(hold / 1000).toFixed(4)}`);
});
list.push(`file '${frames.at(-1).file.replace(/\\/g, "/")}'`);
writeFileSync(join(OUT, "frames.ffconcat"), list.join("\n"));
const shift = (t) => t - cuts.filter((c) => c.at < t).reduce((sum, c) => sum + c.ms, 0);
const length = (shift(frames.at(-1).t) - start) / 1000;

const silent = join(OUT, "akka-demo-silent.mp4");
ff(["-f", "concat", "-safe", "0", "-i", join(OUT, "frames.ffconcat"),
  "-vf", `fps=${FPS},scale=1920:1080:flags=lanczos,format=yuv420p`,
  "-c:v", "libx264", "-preset", "slow", "-crf", "16", "-tune", "film", "-movflags", "+faststart", silent]);

// Each line starts where its scene said it, measured from the first frame.
const lines = Object.entries(at).filter(([id]) => durations[id]).map(([id, ms]) => ({ id, from: (shift(ms) - start) / 1000 }));

// Chapters: where each part of the demo begins.
const chapterStarts = [["Slides", "opening"], ["Build · Akka Specify", "build-spec"], ["Run · Akka Agent SDK", "run-replay"],
  ["Govern · Akka Verify", "govern-human"], ["Optimize · Akka Optimize", "optimize-gateway"], ["Close", "close"]];
const marks = chapterStarts.filter(([, id]) => lines.some((l) => l.id === id))
  .map(([title, id]) => ({ title, from: Math.max(0, lines.find((l) => l.id === id).from - (id === "opening" ? 99 : 3)) }));
const meta = [";FFMETADATA1", "title=Akka: one AI system, from specification to optimized"];
marks.forEach((m, i) => {
  const end = marks[i + 1]?.from ?? length;
  meta.push("[CHAPTER]", "TIMEBASE=1/1000", `START=${Math.round(m.from * 1000)}`, `END=${Math.round(end * 1000)}`, `title=${m.title}`);
});
writeFileSync(join(OUT, "chapters.txt"), meta.join("\n"));

// Narration mixed at its moments, levelled to -16 LUFS with a -1.5 dBTP ceiling. Each line is denoised and gated
// first: the cloned voice carries the room tone of its training recordings, about -55 dB under the pauses.
const CLEAN = "afftdn=nr=18:nf=-50:tn=1,agate=threshold=0.004:ratio=3:attack=5:release=120";
const args = ["-i", silent];
lines.forEach((l) => args.push("-i", durations[l.id].file));
args.push("-i", join(OUT, "chapters.txt"));
const delays = lines.map((l, i) => `[${i + 1}:a]${CLEAN},adelay=${Math.round(l.from * 1000)}|${Math.round(l.from * 1000)}[a${i}]`);
const mix = `${delays.join(";")};${lines.map((_, i) => `[a${i}]`).join("")}amix=inputs=${lines.length}:normalize=0:dropout_transition=0,apad,loudnorm=I=-16:TP=-1.5:LRA=11[a]`;
ff([...args, "-filter_complex", mix, "-map", "0:v", "-map", "[a]", "-map_metadata", String(lines.length + 1),
  "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-movflags", "+faststart", "-shortest", join(OUT, "akka-demo.mp4")]);

// Captions: each line from when it starts until it ends (or the next begins).
const stamp = (s) => {
  const ms = Math.max(0, Math.round(s * 1000));
  const p = (n, w = 2) => String(n).padStart(w, "0");
  return `${p(Math.floor(ms / 3600000))}:${p(Math.floor(ms / 60000) % 60)}:${p(Math.floor(ms / 1000) % 60)},${p(ms % 1000, 3)}`;
};
const srt = lines.map((l, i) => {
  const end = Math.min(l.from + durations[l.id].seconds, lines[i + 1]?.from ?? Infinity);
  return `${i + 1}\n${stamp(l.from)} --> ${stamp(end)}\n${narration[l.id]}\n`;
});
writeFileSync(join(OUT, "akka-demo.srt"), srt.join("\n"));
console.log(`master: ${length.toFixed(1)} s, ${frames.length} frames, ${lines.length} lines, ${marks.length} chapters`);
