// The editable talk track: script.md beside the film holds every scene's narration, one sentence per line, and
// the pronunciations the voice step applies. --export writes script.md from scenes/index.js and the SPOKEN table
// in sample/tts.mjs; --apply writes the edited script.md back into both, then lists the sentences that changed,
// which are the only ones the voice step generates again (clips are cached by text).
//   node website/demo/roi/render/script.mjs --export
//   node website/demo/roi/render/script.mjs --apply
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const FILM = dirname(dirname(fileURLToPath(import.meta.url)));
const TIMELINE = join(FILM, "scenes", "index.js");
const TTS = join(FILM, "..", "sample", "tts.mjs");
const SCRIPT = join(FILM, "script.md");
const SAY = /(\{ id: '([^']+)', act: \d+,(?: roi: \[[^\]]*\],)? title: '((?:[^'\\]|\\.)*)', duration: ([\d.]+),\s*say: ')((?:[^'\\]|\\.)*)(')/g;
const TABLE = /const SPOKEN = \[([\s\S]*?)\];/;
const ENTRY = /\[\/\\b(.+?)\\b\/g, "([^"]*)"\]/g;

const unq = (s) => s.replace(/\\(.)/g, "$1");
const q = (s) => s.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
const split = (say) => say.split(/(?<=[.!?])\s+/);

function scenes(src) {
  return [...src.matchAll(SAY)].map((m) => ({ id: m[2], title: unq(m[3]), duration: m[4], say: unq(m[5]) }));
}

function spokenTable(src) {
  return [...TABLE.exec(src)[1].matchAll(ENTRY)].map((m) => [m[1].replace(/\\(.)/g, "$1"), m[2]]);
}

function exportScript() {
  const out = [
    "# Akka total cost: the talk track",
    "",
    "Edit the sentences under each scene. Each line is one sentence and one voice clip, and the captions show the",
    "same text. A scene heading starts with its id, which must stay as it is; the title and length are for",
    "reference. Numbers are written as they are spoken, and every spoken number must be in `figures.json`.",
    "",
    "## Pronunciations",
    "",
    "Each line is `- Written: how it is said`. The voice receives the spoken form and the caption keeps the written",
    "form. The match is the whole word and is case-sensitive. This list is shared by every film.",
    "",
    ...spokenTable(readFileSync(TTS, "utf8")).map(([w, s]) => `- ${w}: ${s}`),
    "",
  ];
  for (const s of scenes(readFileSync(TIMELINE, "utf8"))) {
    out.push(`## ${s.id} ${s.title} (${s.duration} s)`, "", ...split(s.say), "");
  }
  writeFileSync(SCRIPT, out.join("\n"));
  console.log(`wrote ${SCRIPT}`);
}

function readScript() {
  const text = readFileSync(SCRIPT, "utf8").replace(/\r/g, "");
  const said = {}, spoken = [];
  let at = null;
  for (const line of text.split("\n")) {
    const h = /^## (\S+)/.exec(line);
    if (h) { at = h[1]; if (at !== "Pronunciations") said[at] = []; continue; }
    if (at === "Pronunciations") {
      const p = /^- (.+?):\s*(.+)$/.exec(line);
      if (p) spoken.push([p[1].trim(), p[2].trim()]);
    } else if (at && line.trim()) said[at].push(line.trim());
  }
  return { said, spoken };
}

function applyScript() {
  const { said, spoken } = readScript();
  const src = readFileSync(TIMELINE, "utf8");
  const before = scenes(src);
  const missing = before.filter((s) => !said[s.id]).map((s) => s.id);
  const unknown = Object.keys(said).filter((id) => !before.some((s) => s.id === id));
  if (missing.length || unknown.length) {
    console.error(`script.md scene ids do not match the timeline: missing ${missing.join(", ") || "none"}, unknown ${unknown.join(", ") || "none"}`);
    process.exit(1);
  }
  writeFileSync(TIMELINE, src.replace(SAY, (all, head, id, t, d, say, tail) => head + q(said[id].join(" ")) + tail));

  const tts = readFileSync(TTS, "utf8");
  const esc = (w) => w.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");
  const table = spoken.map(([w, s]) => `[/\\b${esc(w)}\\b/g, ${JSON.stringify(s)}]`).join(", ");
  if (JSON.stringify(spokenTable(tts)) !== JSON.stringify(spoken)) writeFileSync(TTS, tts.replace(TABLE, `const SPOKEN = [${table}];`));

  for (const s of before) {
    const old = new Set(split(s.say));
    split(said[s.id].join(" ")).forEach((sent, k) => { if (!old.has(sent)) console.log(`changed ${s.id}.${k + 1}: ${sent}`); });
  }
  console.log(`applied ${SCRIPT}; ${spoken.length} pronunciations`);
}

if (process.argv.includes("--export")) exportScript();
else if (process.argv.includes("--apply")) applyScript();
else console.error("use --export or --apply");
