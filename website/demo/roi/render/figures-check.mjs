// Checks every number the narration speaks against the figures read off the captured screens.
//   node demo/tokenomics/render/figures-check.mjs [--list] [--figures=<path>]
// It reads each scene's `say` from scenes/index.js, finds every spoken number (digits, number words, money in
// dollars and cents, percentages, "a fifth", "tripled"), and looks for it among that scene's figures in
// figures.json, which the capture step writes as { "<scene id>": { "<label>": value } }. A value may
// be a number or the text shown on screen ("$104.70", "90.2%", "(3.10)", "2").
// Exact figures must match to the cent (money), to 0.05 (percentages) or exactly (counts); a number spoken with
// "about", "nearly" or as a fraction or multiple must be within 10%. Any narrated number absent from its
// scene's figures fails the check (exit 1), and the voice step waits until it passes.
// --list prints what was found in the narration without reading the figures file.
import { readFileSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const FILM = dirname(dirname(fileURLToPath(import.meta.url)));
const arg = (k, d) => process.argv.find((a) => a.startsWith(`--${k}=`))?.slice(k.length + 3) ?? d;
const LIST = process.argv.includes("--list");
const FIGURES = resolve(arg("figures", join(FILM, "figures.json")));

/* Numbers that describe the film or the screen's layout, not data on it, by the phrase that holds them. Each is
   printed as not checked. */
const STRUCTURAL = {};
/* Counts spoken as a lone "one", which the word reader takes for a determiner. */
const FORCED = {};

const UNITS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
const TENS = { twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90 };
const SCALES = { hundred: 100, thousand: 1e3, million: 1e6, billion: 1e9 };
const FRACTIONS = { half: 0.5, third: 1 / 3, quarter: 0.25, fifth: 0.2, sixth: 1 / 6, tenth: 0.1 };
const MULTIPLES = { doubled: 2, tripled: 3, quadrupled: 4, halved: 0.5 };
const APPROX = new Set(["about", "nearly", "almost", "roughly", "around", "approximately"]);
const isWord = (w) => w in TENS || UNITS.includes(w) || w in SCALES;
const val = (w) => (w in TENS ? TENS[w] : UNITS.indexOf(w));

/** The spoken numbers in one line: [{ phrase, kind: money|percent|count|ratio, value, approx }]. */
export function extract(say) {
  const toks = say.split(/\s+/).flatMap((raw) => {
    const w = raw.toLowerCase().replace(/[“”"'’]/g, "").replace(/[.,;:!?)]+$/, "").replace(/^\(/, "");
    return w.includes("-") && w.split("-").every(isWord) ? w.split("-").map((p, i, a) => ({ raw: i ? "" : raw, w: p, end: i === a.length - 1 && /[.!?]$/.test(raw) })) : [{ raw, w, end: /[.!?]$/.test(raw) }];
  });
  const out = [];
  let sentencePercent = false;
  for (let i = 0; i < toks.length; i++) {
    const t = toks[i], prev = toks[i - 1]?.w;
    const approx = APPROX.has(prev) || APPROX.has(toks[i - 2]?.w);
    let found = null;
    const digits = /^\$?\d[\d,]*(\.\d+)?%?$/.exec(t.w);
    if (digits) {
      const v = parseFloat(t.w.replace(/[$,%]/g, ""));
      found = { phrase: t.raw, kind: t.w.startsWith("$") ? "money" : t.w.endsWith("%") || toks[i + 1]?.w === "percent" ? "percent" : "count", value: v, approx, j: i };
    } else if (t.w in FRACTIONS && (prev === "a" || prev === "one")) {
      found = { phrase: `${prev} ${t.w}`, kind: "ratio", value: FRACTIONS[t.w], approx: true, j: i };
    } else if (t.w in MULTIPLES) {
      found = { phrase: (approx ? prev + " " : "") + t.w, kind: "ratio", value: MULTIPLES[t.w], approx: true, j: i };
    } else if (isWord(t.w)) {
      /* a run of number words, with "point" decimals and "and" after a hundred */
      let j = i, total = 0, cur = 0, dec = "", words = [];
      while (j < toks.length) {
        const w = toks[j].w;
        if (isWord(w) && !dec) {
          if (w in SCALES) { cur = (cur || 1) * SCALES[w]; if (SCALES[w] >= 1000) { total += cur; cur = 0; } }
          else cur += val(w);
        } else if (w === "point" && j + 1 < toks.length && UNITS.slice(0, 10).includes(toks[j + 1].w)) dec = ".";
        else if (dec && UNITS.slice(0, 10).includes(w)) dec += UNITS.indexOf(w);
        else if (w === "and" && toks[j - 1]?.w === "hundred" && isWord(toks[j + 1]?.w || "")) { /* one hundred and four */ }
        else break;
        words.push(toks[j].w);
        if (toks[j].end) { j++; break; }
        j++;
      }
      const v = parseFloat(String(total + cur) + (dec.length > 1 ? dec : ""));
      const next = toks[j]?.w;
      /* a lone "one" is a determiner ("one use case", "one loop") unless a unit follows it */
      const lone = words.length === 1 && words[0] === "one" && !["percent", "dollars", "dollar", "cents"].includes(next);
      if (!lone) {
        let kind = "count", value = v, phrase = words.join(" ");
        if (next === "percent") { kind = "percent"; phrase += " percent"; }
        else if (next === "dollars" || next === "dollar") {
          kind = "money"; phrase += " " + next;
          /* "... dollars and seventy cents" */
          if (toks[j + 1]?.w === "and" && isWord(toks[j + 2]?.w || "")) {
            let k = j + 2, c = 0;
            while (k < toks.length && isWord(toks[k].w)) c += val(toks[k++].w);
            if (toks[k]?.w === "cents") { value += c / 100; phrase += " and " + toks.slice(j + 2, k).map((x) => x.w).join(" ") + " cents"; j = k; }
          }
        } else if (next === "cents") { kind = "money"; value = v / 100; phrase += " cents"; }
        else if (dec.length > 1 && sentencePercent) kind = "percent";
        found = { phrase, kind, value, approx, j: j - 1 };
      }
      i = Math.max(i, j - 1);
    }
    if (found) {
      if (found.kind === "percent") sentencePercent = true;
      delete found.j;
      out.push(found);
    }
    if (t.end) sentencePercent = false;
  }
  return out;
}

/** A figure's value as { n, pct, money } from a number or the text shown on screen. */
function figure(v) {
  if (v && typeof v === "object") v = v.value;
  if (typeof v === "number") return { n: v, pct: false, money: false };
  const s = String(v).trim(), neg = /^\(.*\)$/.test(s) || s.startsWith("-");
  const n = parseFloat(s.replace(/[^\d.]/g, ""));
  return { n: neg ? -n : n, pct: s.includes("%"), money: s.includes("$") };
}

function matches(spoken, v) {
  const f = figure(v);
  if (Number.isNaN(f.n)) return false;
  const near = (a, b, tol) => Math.abs(a - b) <= tol;
  const cand = [Math.abs(f.n)];
  if (spoken.kind === "percent" || spoken.kind === "ratio") cand.push(Math.abs(f.n) * 100, Math.abs(f.n) / 100);
  return cand.some((n) => {
    if (spoken.approx) return near(n, spoken.value, 0.1 * Math.abs(spoken.value));
    if (spoken.kind === "money") return near(n, spoken.value, 0.005);
    if (spoken.kind === "percent") return near(n, spoken.value, 0.05);
    return n === spoken.value;
  });
}

const src = readFileSync(join(FILM, "scenes", "index.js"), "utf8");
const window = {};
new Function("window", src)(window);

let figures = null;
if (!LIST) {
  if (!existsSync(FIGURES)) {
    console.error(`${FIGURES} does not exist yet; the capture step writes it. Run with --list to see the narrated numbers.`);
    process.exit(2);
  }
  figures = JSON.parse(readFileSync(FIGURES, "utf8"));
}

let missing = 0, checked = 0;
for (const s of window.FILM_SCENES) {
  const found = extract(s.say);
  (FORCED[s.id] || []).forEach(([phrase, value]) => { if (s.say.includes(phrase)) found.push({ phrase, kind: "count", value, approx: false }); });
  if (!found.length) continue;
  console.log(`${s.id}`);
  for (const n of found) {
    const what = `  "${n.phrase}" ${n.kind} ${n.approx ? "≈" : "="} ${+n.value.toFixed(4)}`;
    if ((STRUCTURAL[s.id] || []).some((p) => s.say.toLowerCase().includes(p) && p.startsWith(n.phrase.toLowerCase() + " "))) { console.log(`${what}  not checked (describes the film, not the data)`); continue; }
    if (LIST) { console.log(what); continue; }
    checked++;
    const hit = Object.entries(figures[s.id] || {}).find(([, v]) => matches(n, v));
    if (hit) console.log(`${what}  matches ${hit[0]} (${hit[1] && typeof hit[1] === "object" ? hit[1].value : hit[1]})`);
    else { missing++; console.log(`${what}  MISSING from figures.json["${s.id}"]`); }
  }
}
if (LIST) process.exit(0);
console.log(missing ? `\n${missing} of ${checked} narrated numbers are not on the captured screens.` : `\nAll ${checked} narrated numbers match the captured screens.`);
process.exit(missing ? 1 : 0);
