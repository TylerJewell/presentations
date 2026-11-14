// Packs the deck into one self-contained HTML file to send: every stylesheet, script, slide, font and the favicon
// inlined, so it opens from an email attachment or a download with no folder and no network.
//   node demo/talk/render/single.mjs [--out=<file>]   (default demo/talk/out/akka-ai-governance.html)
//   node demo/talk/render/single.mjs --deck=demo/talk-v2 --out=<file>   another deck built on this engine
// Paths in index.html and in slides/index.js resolve from the deck's folder, so a deck that loads this engine and
// some of its slides by relative path (../talk, ../mock) packs the same way.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const arg = (k) => process.argv.find((a) => a.startsWith(`--${k}=`))?.slice(k.length + 3);
const DECK = arg("deck") ? resolve(arg("deck")) : resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = resolve(arg("out") ?? join(DECK, "out", "akka-ai-governance.html"));
const read = (rel) => readFileSync(join(DECK, rel), "utf8");
const b64 = (rel) => readFileSync(join(DECK, rel)).toString("base64");
/* a script's text, safe inside an inline <script> */
const js = (src) => src.replace(/<\/script/gi, "<\\/script");

const html = read("index.html");
/* a stylesheet's text with its fonts inlined; font urls resolve from the stylesheet's own folder */
const css = (href) => read(href).replace(/url\((['"]?)([^'")]+\.woff2)\1\)/g, (_, q, f) => `url(data:font/woff2;base64,${b64(join(dirname(href), f))})`);

/* the slide registry without its loader, then each slide in order; a slide in the registry's V1 set loads from the
   first version's folder, as the loader does */
const index = read("slides/index.js");
const cut = index.indexOf("(function () {\n  const base");
if (cut < 0) throw new Error("slides/index.js: loader not found");
const [order, v1] = new Function("window", index.slice(0, cut) + "return [window.TALK_ORDER, typeof V1 === 'undefined' ? new Set() : V1];")({});
const slidePath = (id) => (v1.has(id) ? `slides/../../talk/slides/${id}.js` : `slides/${id}.js`);
const slides = js(index.slice(0, cut)) + order.map((id) => `\n/* ${slidePath(id)} */\n` + js(read(slidePath(id)))).join("\n");

let out = html
  .replace(/<link rel="icon" href="([^"]+)"[^>]*>/, (_, href) => `<link rel="icon" type="image/x-icon" href="data:image/x-icon;base64,${b64(href)}">`)
  .replace(/<link rel="stylesheet" href="([^"]+)">/g, (_, href) => `<style>\n${css(href)}\n</style>`)
  .replace(/<script src="slides\/index\.js"><\/script>/, () => `<script>\n${slides}\n</script>`)
  .replace(/<script src="([^"]+)"><\/script>/g, (_, src) => `<script>\n/* ${src} */\n${js(read(src))}\n</script>`);

const left = out.match(/<(link|script)[^>]+(href|src)="(?!data:)[^"]+"/g);
if (left) throw new Error("not inlined: " + left.join(", "));
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, out);
console.log(`${OUT}  ${(out.length / 1024 / 1024).toFixed(1)} MB, ${order.length} slides`);
