// Generates the term-in-context auditions into audio/spoken-tests/. Needs ELEVENLABS_API_KEY and ELEVENLABS_VOICE_ID.
//   node website/demo/proposal-panel/film/spoken-tests.mjs
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, "..", "audio", "spoken-tests");
mkdirSync(OUT, { recursive: true });
const lines = JSON.parse(readFileSync(join(HERE, "..", "narration.json"), "utf8"));
const { ELEVENLABS_API_KEY: key, ELEVENLABS_VOICE_ID: voice } = process.env;
const format = process.env.ELEVENLABS_OUTPUT_FORMAT ?? "mp3_44100_192";

// [file, scene whose sentence supplies the context, written term, spellings to try]
const tests = [
  ["iban", "4.5", "IBANs", ["IBANs", "eye-bans", "I-bans", "I B A Ns"]],
  ["akka", "3.1", "Akka", ["Akka", "Ah-kah", "Ak-ka"]],
  ["jailbreak", "4.4", "jailbreak", ["jailbreak", "jail-break"]],
  ["sanitizer", "4.5", "sanitizer", ["sanitizer", "sanitiser"]],
];
const sentence = (id, term) => lines[id].split(/(?<=[.?!])\s+/).find((s) => s.includes(term));
const rows = [];
for (const [name, id, term, spellings] of tests) {
  const base = sentence(id, term);
  for (const [i, sp] of spellings.entries()) {
    const file = `${name}-${i + 1}.mp3`;
    rows.push(`| ${name} | \`${file}\` | ${sp} | ${id} |`);
    if (existsSync(join(OUT, file))) continue;
    const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice}?output_format=${format}`, {
      method: "POST", headers: { "xi-api-key": key, "Content-Type": "application/json", Accept: "audio/mpeg" },
      body: JSON.stringify({ text: base.replace(term, sp), model_id: "eleven_multilingual_v2" })
    });
    if (!res.ok) throw new Error(`ElevenLabs ${res.status}: ${await res.text()}`);
    writeFileSync(join(OUT, file), Buffer.from(await res.arrayBuffer()));
    console.log(file);
  }
}
writeFileSync(join(OUT, "README.md"),
  "# Spelling auditions\n\nEach clip is the narration sentence from the scene with the term spelled as shown. " +
  "The first spelling of each term is the written form; the full pass uses `eye-bans` for IBANs and the written form for the rest.\n\n" +
  "| Term | Clip | Spelling sent to the voice | Scene |\n|---|---|---|---|\n" + rows.join("\n") + "\n");
