// Lays each narration clip at the moment its scene started in the recording, and renders the MP4.
//   node website/demo/sample/mux.mjs [--dir=<folder>] [--name=<video>]
// reads <folder>/out/<video>.webm, out/marks.json and durations.json; writes out/<video>.mp4 with the narration
// and out/<video>-silent.mp4 without it.
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const arg = (k) => process.argv.find((a) => a.startsWith(`--${k}=`))?.slice(k.length + 3);
const DIR = arg("dir") ?? "C:/Users/tyler/competition/website/demo/sample";
const NAME = arg("name") ?? "sample";
const OUT = join(DIR, "out");
const marks = JSON.parse(readFileSync(join(OUT, "marks.json"), "utf8"));
const durations = JSON.parse(readFileSync(join(DIR, "durations.json"), "utf8"));

const clips = Object.entries(marks).filter(([id]) => durations[id]);
const args = ["-y", "-loglevel", "error", "-i", join(OUT, `${NAME}.webm`)];
for (const [id] of clips) args.push("-i", durations[id].file);
const delays = clips.map(([, ms], i) => `[${i + 1}:a]adelay=${Math.round(ms)}|${Math.round(ms)}[a${i}]`);
const filter = `${delays.join(";")};${clips.map((_, i) => `[a${i}]`).join("")}amix=inputs=${clips.length}:normalize=0:dropout_transition=0[a]`;
args.push(
  "-filter_complex", filter,
  "-map", "0:v", "-map", "[a]",
  "-c:v", "libx264", "-preset", "slow", "-crf", "18", "-pix_fmt", "yuv420p", "-r", "30",
  "-c:a", "aac", "-b:a", "192k",
  "-movflags", "+faststart", "-shortest",
  join(OUT, `${NAME}.mp4`)
);
execFileSync("ffmpeg", args, { stdio: "inherit" });
execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", join(OUT, `${NAME}.webm`),
  "-c:v", "libx264", "-preset", "slow", "-crf", "18", "-pix_fmt", "yuv420p", "-r", "30", "-an",
  "-movflags", "+faststart", join(OUT, `${NAME}-silent.mp4`)], { stdio: "inherit" });
console.log("wrote", join(OUT, `${NAME}.mp4`), "and", join(OUT, `${NAME}-silent.mp4`));
