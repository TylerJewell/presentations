// Turns narration.json into one audio clip per scene, and records each clip's length in durations.json.
//   node website/demo/sample/tts.mjs [--dir=<folder>]  ElevenLabs: ELEVENLABS_API_KEY and ELEVENLABS_VOICE_ID set
//   node website/demo/sample/tts.mjs --placeholder   Windows' built-in voice, to check timing without a key
// Clips are cached by text and voice, so an unchanged line is never generated twice.
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The folder holding narration.json; durations.json and audio/ are written beside it.
const DIR = process.argv.find((a) => a.startsWith("--dir="))?.slice(6) ?? "C:/Users/tyler/competition/website/demo/sample";
const AUDIO = join(DIR, "audio");
const placeholder = process.argv.includes("--placeholder");
const lines = JSON.parse(readFileSync(join(DIR, "narration.json"), "utf8"));
mkdirSync(AUDIO, { recursive: true });

const key = process.env.ELEVENLABS_API_KEY;
const voice = process.env.ELEVENLABS_VOICE_ID;
const model = process.env.ELEVENLABS_MODEL_ID ?? "eleven_multilingual_v2";
// 128 kbps is on every paid tier; 192 needs Creator.
const format = process.env.ELEVENLABS_OUTPUT_FORMAT ?? "mp3_44100_128";
if (!placeholder && (!key || !voice)) {
  console.error("Set ELEVENLABS_API_KEY and ELEVENLABS_VOICE_ID, or run with --placeholder.");
  process.exit(1);
}

const seconds = (file) =>
  Number(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", file]).toString().trim());

async function eleven(text, out) {
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice}?output_format=${format}`, {
    method: "POST",
    headers: { "xi-api-key": key, "Content-Type": "application/json", Accept: "audio/mpeg" },
    body: JSON.stringify({
      text,
      // no voice_settings: the voice's own saved settings apply, as on the ElevenLabs site
      model_id: model
    })
  });
  if (!res.ok) throw new Error(`ElevenLabs ${res.status}: ${await res.text()}`);
  writeFileSync(out, Buffer.from(await res.arrayBuffer()));
}

function windowsVoice(text, out) {
  const wav = out.replace(/\.mp3$/, ".wav");
  const ps = `Add-Type -AssemblyName System.Speech; $s = New-Object System.Speech.Synthesis.SpeechSynthesizer; ` +
    `$s.Rate = 0; $s.SetOutputToWaveFile('${wav.replace(/'/g, "''")}'); $s.Speak([Console]::In.ReadToEnd()); $s.Dispose()`;
  execFileSync("powershell", ["-NoProfile", "-Command", ps], { input: text });
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", wav, "-b:a", "192k", out]);
}

// How a term is spoken where the voice reads it unreliably; the captions keep the written form.
const SPOKEN = [[/\bT-Systems\b/g, "Tee Systems"], [/\bGCAP\b/g, "Gee-cap"], [/\brouting\b/g, "rout-ing"], [/\bRouting\b/g, "Rout-ing"],
  [/\bIlya\b/g, "Illya"], [/\bFilip\b/g, "Filleep"], [/\bIBANs\b/g, "eye-bans"], [/\bideAItion\b/g, "ideation"]];
const spoken = (text) => SPOKEN.reduce((t, [term, said]) => t.replace(term, said), text);

const durations = {};
for (const [id, written] of Object.entries(lines)) {
  const text = spoken(written);
  const tag = placeholder ? "windows" : `${voice}-${model}`;
  const hash = createHash("sha1").update(`${tag}\n${text}`).digest("hex").slice(0, 12);
  const file = join(AUDIO, `${id}-${hash}.mp3`);
  if (!existsSync(file)) {
    process.stdout.write(`generating ${id}… `);
    if (placeholder) windowsVoice(text, file); else await eleven(text, file);
    console.log("done");
  }
  durations[id] = { file, seconds: seconds(file) };
}
writeFileSync(join(DIR, "durations.json"), JSON.stringify(durations, null, 2));
console.log(Object.entries(durations).map(([id, d]) => `${id}: ${d.seconds.toFixed(1)} s`).join("\n"));
