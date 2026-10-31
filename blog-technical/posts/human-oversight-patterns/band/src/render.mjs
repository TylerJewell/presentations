import { createRequire } from "node:module";
const require = createRequire("C:/Users/tyler/ai-console/kalix-console/apps/stories/package.json");
const { chromium } = require("playwright");
const D="C:/Users/tyler/competition/blog-technical/posts/human-oversight-patterns/band/";
let br; try{br=await chromium.launch({channel:"msedge"})}catch{br=await chromium.launch()}
const ctx=await br.newContext({viewport:{width:1792,height:592},deviceScaleFactor:2});
const p=await ctx.newPage();
await p.goto("file:///"+D+"src/band.html");await p.waitForTimeout(1200);
await p.screenshot({path:D+"src/band-full.png"});
await p.screenshot({path:D+"blog-band-human-oversight.jpg",type:"jpeg",quality:85});
await br.close();
