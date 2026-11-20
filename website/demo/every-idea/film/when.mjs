// Gives the slide times at which to place marks so that each appears as its word is spoken.
//   node website/demo/every-idea/film/when.mjs --film=4min 10 0.92 1.64 2.41
// The first number is the beat. The others are seconds into that beat's cut clip, where each word starts
// (tools/phrases.py lists the phrases of a clip). A mark is placed 0.15 s before its word. Reads the film's
// timeline, so run render.mjs --timeline first, and again after any line is recorded anew.
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FILM, clock } from "./film.mjs";

const { segs } = JSON.parse(readFileSync(join(dirname(fileURLToPath(import.meta.url)), "out", FILM.timeline), "utf8"));
const [beat, ...onsets] = process.argv.slice(2).filter((a) => !a.startsWith("--")).map(Number);
const { slideAt } = clock(segs, FILM.stretch);
console.log(onsets.map((o) => slideAt(segs[beat - 1].from + o - 0.15).toFixed(2)).join(", "));
