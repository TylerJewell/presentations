import { createRequire } from "node:module";
const require = createRequire("C:/Users/tyler/ai-console/kalix-console/apps/stories/package.json");
const { chromium } = require("playwright");
const D="C:/Users/tyler/competition/blog-technical/posts/human-oversight-patterns/band/";
let br; try{br=await chromium.launch({channel:"msedge"})}catch{br=await chromium.launch()}
const p=await (await br.newContext({viewport:{width:1440,height:600}})).newPage();
await p.goto("file:///"+D+"src/preview.html");await p.waitForTimeout(1500);
const el=await p.locator(".bidx__band").first();
await el.screenshot({path:D+"preview-band.png"});
await br.close();
