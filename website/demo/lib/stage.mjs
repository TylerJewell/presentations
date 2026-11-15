// The recording's on-screen layer: a caption, a spotlight, a cursor and a full-screen curtain, installed on
// every page of a Playwright context, plus the helpers that drive them and time scenes to their narration.
import { existsSync, readFileSync } from "node:fs";

// ---------- the overlay: caption, spotlight and cursor, installed on every page ----------
export const OVERLAY = () => {
  const css = `
  #demo-cursor{position:fixed;left:960px;top:540px;width:26px;height:26px;z-index:2147483647;pointer-events:none;
    transition:left .7s cubic-bezier(.4,0,.2,1),top .7s cubic-bezier(.4,0,.2,1);filter:drop-shadow(0 2px 4px rgba(0,0,0,.6))}
  #demo-ripple{position:fixed;width:44px;height:44px;margin:-22px 0 0 -22px;border-radius:50%;border:2px solid rgb(40,215,229);
    z-index:2147483646;pointer-events:none;opacity:0}
  #demo-ripple.go{animation:demoRipple .55s ease-out}
  @keyframes demoRipple{0%{opacity:.9;transform:scale(.3)}100%{opacity:0;transform:scale(1.4)}}
  #demo-spot{position:fixed;z-index:2147483640;pointer-events:none;border-radius:8px;opacity:0;
    box-shadow:0 0 0 2px rgb(40,215,229),0 0 0 9999px rgba(4,6,10,.6);
    transition:left .5s ease,top .5s ease,width .5s ease,height .5s ease,opacity .35s ease}
  #demo-cap{position:fixed;left:64px;bottom:72px;max-width:820px;z-index:2147483645;pointer-events:none;
    background:rgba(12,13,16,.92);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.08);border-radius:12px;
    padding:18px 24px 20px;font-family:"Instrument Sans Variable","Instrument Sans",system-ui,sans-serif;
    opacity:0;transform:translateY(12px);transition:opacity .4s ease,transform .4s ease;box-shadow:0 12px 40px rgba(0,0,0,.45)}
  #demo-cap.on{opacity:1;transform:none}
  #demo-fade{position:fixed;inset:0;background:#07080a;z-index:2147483646;pointer-events:none;opacity:0;transition:opacity .26s ease}
  #demo-cap.compact{left:auto;right:40px;bottom:44px;max-width:520px;padding:12px 18px 14px}
  #demo-cap.compact .tx{font-size:18px}
  #demo-cap .eb{font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:rgb(40,215,229);font-weight:600;margin-bottom:6px}
  #demo-cap .tx{font-size:24px;line-height:1.35;color:#f4f3ef;font-weight:500}
  #demo-step{position:fixed;right:40px;top:76px;z-index:2147483645;pointer-events:none;font:600 13px "Instrument Sans Variable",system-ui;
    color:rgba(255,255,255,.75);background:rgba(12,13,16,.8);border-radius:20px;padding:6px 12px;opacity:0;transition:opacity .4s}`;
  const install = () => {
    if (document.getElementById("demo-cursor")) return;
    const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
    const c = document.createElement("div"); c.id = "demo-cursor";
    c.innerHTML = '<svg viewBox="0 0 24 24" width="26" height="26"><path d="M4 2l15 9-6.5 1.5L9.5 19z" fill="#fff" stroke="#111" stroke-width="1.2" stroke-linejoin="round"/></svg>';
    const r = document.createElement("div"); r.id = "demo-ripple";
    const s = document.createElement("div"); s.id = "demo-spot";
    const cap = document.createElement("div"); cap.id = "demo-cap"; cap.innerHTML = '<div class="eb"></div><div class="tx"></div>';
    const step = document.createElement("div"); step.id = "demo-step";
    const fade = document.createElement("div"); fade.id = "demo-fade";
    document.body.append(s, cap, step, fade, r, c);
    const last = sessionStorage.getItem("demo-cursor");
    if (last) { const [x, y] = last.split(","); c.style.transition = "none"; c.style.left = x + "px"; c.style.top = y + "px"; c.offsetWidth; c.style.transition = ""; }
  };
  // A full-screen card that covers the page while it loads: set through window.name, which survives a
  // navigation, so it is up before the console paints.
  // Runs before the root element exists on a navigation, so the early work waits for it.
  const whenRoot = (fn) => {
    if (document.documentElement) return fn();
    new MutationObserver((_, o) => { if (document.documentElement) { o.disconnect(); fn(); } }).observe(document, { childList: true });
  };
  const curtain = () => {
    let html; try { html = JSON.parse(window.name || "{}").curtain; } catch { html = undefined; }
    if (!html || document.getElementById("demo-curtain")) return;
    const f = document.createElement("iframe"); f.id = "demo-curtain"; f.srcdoc = html;
    Object.assign(f.style, { position: "fixed", inset: "0", width: "100vw", height: "100vh", border: "0", zIndex: "2147483647", background: "#07080a", transition: "opacity .6s ease" });
    (document.body || document.documentElement).appendChild(f);
  };
  whenRoot(() => { document.documentElement.style.background = "#07080a"; curtain(); });
  document.addEventListener("DOMContentLoaded", curtain);
  window.__demo = {
    curtain(html) { window.name = JSON.stringify({ curtain: html }); document.getElementById("demo-curtain")?.remove(); curtain(); },
    lift() { window.name = ""; const f = document.getElementById("demo-curtain"); if (f) { f.style.opacity = "0"; setTimeout(() => f.remove(), 700); } },
    install,
    // A compact caption sits small at the bottom right, for a view that fills the frame and can't scroll.
    caption(eyebrow, text, compact = false) { install(); const cap = document.getElementById("demo-cap");
      cap.classList.remove("on"); setTimeout(() => { cap.classList.toggle("compact", compact); cap.querySelector(".eb").textContent = eyebrow; cap.querySelector(".tx").textContent = text; cap.classList.add("on"); }, 180); },
    hideCaption() { document.getElementById("demo-cap")?.classList.remove("on"); },
    step(t) { install(); const s = document.getElementById("demo-step"); s.textContent = t; s.style.opacity = t ? 1 : 0; },
    spot(sel, pad = 8) { install(); const el = typeof sel === "string" ? document.querySelector(sel) : sel; const s = document.getElementById("demo-spot");
      if (!el) { s.style.opacity = 0; return; } const b = el.getBoundingClientRect();
      // The spotlight stops above the caption, so the caption sits on the dimmed page, never on what is shown.
      const cap = document.getElementById("demo-cap");
      const floor = cap && cap.classList.contains("on") ? innerHeight - cap.offsetHeight - 72 - 16 : innerHeight - 8;
      const top = Math.max(b.top - pad, 8), bottom = Math.min(b.bottom + pad, floor);
      Object.assign(s.style, { left: b.left - pad + "px", top: top + "px", width: b.width + pad * 2 + "px", height: Math.max(0, bottom - top) + "px", opacity: 1 }); },
    // Scrolls every scroller around an element so the element sits at the top of the screen, just under a
    // table's sticky header row when it is inside one.
    reveal(el, top = 64) {
      el.scrollIntoView({ block: "start", behavior: "smooth" });
      setTimeout(() => {
        const head = el.closest("table")?.querySelector("thead");
        const by = el.getBoundingClientRect().top - Math.max(top, head ? head.getBoundingClientRect().bottom : 0);
        let sc = el.parentElement;
        while (sc && !(/(auto|scroll)/.test(getComputedStyle(sc).overflowY) && sc.scrollHeight > sc.clientHeight)) sc = sc.parentElement;
        (sc ?? document.scrollingElement).scrollBy({ top: by, behavior: "smooth" });
      }, 650);
    },
    // The cursor hides with the page, so a faded screen is pure black and master.mjs can shorten it.
    fade(on) { install(); document.getElementById("demo-fade").style.opacity = on ? "1" : "0"; document.getElementById("demo-cursor").style.opacity = on ? "0" : "1"; },
    unspot() { const s = document.getElementById("demo-spot"); if (s) s.style.opacity = 0; },
    move(x, y) { install(); const c = document.getElementById("demo-cursor"); c.style.left = x + "px"; c.style.top = y + "px"; sessionStorage.setItem("demo-cursor", x + "," + y); },
    ripple(x, y) { const r = document.getElementById("demo-ripple"); r.style.left = x + "px"; r.style.top = y + "px"; r.classList.remove("go"); r.offsetWidth; r.classList.add("go"); },
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", install); else install();
};


/** Seconds of narration per line: the generated audio's where it exists, else an estimate from its words. */
export function narrationSeconds(narrationPath, durationsPath, wordsPerSecond = 2.9) {
  const lines = JSON.parse(readFileSync(narrationPath, "utf8"));
  const audio = existsSync(durationsPath) ? JSON.parse(readFileSync(durationsPath, "utf8")) : {};
  return Object.fromEntries(Object.entries(lines).map(([id, text]) =>
    [id, audio[id]?.seconds ?? text.split(/\s+/).length / wordsPerSecond + 0.4]));
}

/**
 * The helpers a scene uses, bound to one page. say() starts a narration line and finish() holds the scene
 * until that line ends; marks records where each line starts in the video, for the audio mix.
 */
export function stage(p, seconds) {
  const sleep = (ms) => p.waitForTimeout(ms);
  const t0 = Date.now(); const marks = {}; const at = {}; let endsAt = 0;
  const say = (id) => {
    if (!(id in seconds)) throw new Error(`no narration line "${id}"`);
    marks[id] = Date.now() - t0; at[id] = Date.now(); endsAt = Date.now() + seconds[id] * 1000 + 250;
  };
  // A breath after each line before the next action: what makes a walkthrough feel unhurried.
  const finish = () => sleep(Math.max(0, endsAt - Date.now()) + 800);
  async function cursorTo(locator) {
    // A target under the caption, or under the top bar, is scrolled onto the stage first, so a click is never hidden.
    const hidden = await locator.evaluate((el) => {
      const b = el.getBoundingClientRect();
      const cap = document.getElementById("demo-cap");
      const floor = cap && cap.classList.contains("on") ? innerHeight - cap.offsetHeight - 72 - 16 : innerHeight - 8;
      return b.bottom > floor || b.top < 64;
    }).catch(() => false);
    if (hidden) {
      const h = await locator.elementHandle();
      await p.evaluate(([el, t]) => window.__demo.reveal(el, t), [h, 80]);
      await sleep(1500);
    }
    const b = await locator.boundingBox();
    const x = Math.round(b.x + Math.min(b.width / 2, 60)), y = Math.round(b.y + b.height / 2);
    await p.evaluate(([x, y]) => window.__demo.move(x, y), [x, y]);
    await sleep(750);
    return { x, y };
  }
  async function click(locator) {
    const { x, y } = await cursorTo(locator);
    await p.evaluate(([x, y]) => window.__demo.ripple(x, y), [x, y]);
    await locator.click();
  }
  const caption = (eb, tx, compact = false) => p.evaluate(([a, b, c]) => window.__demo.caption(a, b, c), [eb, tx, compact]);
  const hideCaption = () => p.evaluate(() => window.__demo.hideCaption());
  const reveal = async (locator, top) => {
    const h = await locator.elementHandle();
    await p.evaluate(([el, t]) => window.__demo.reveal(el, t), [h, top ?? 64]);
    await sleep(1500);
  };
  // The stage is the screen between the console's top bar and the caption. Whatever is highlighted is first
  // scrolled onto it, so the caption keeps one place and never covers the subject.
  const STAGE_TOP = 64;
  const spot = async (locator, pad = 8) => {
    if (!(await locator.count())) { console.warn("no element to spotlight:", String(locator)); return; }
    const h = await locator.elementHandle({ timeout: 5000 });
    const off = await p.evaluate(([el, top]) => {
      const b = el.getBoundingClientRect();
      const cap = document.getElementById("demo-cap");
      const floor = innerHeight - (cap ? cap.offsetHeight : 120) - 72 - 16;
      return b.top < top || b.bottom > floor;
    }, [h, STAGE_TOP]);
    if (off) await reveal(locator, STAGE_TOP + 16);
    await p.evaluate(([el, d]) => window.__demo.spot(el, d), [h, pad]);
  };
  const unspot = () => p.evaluate(() => window.__demo.unspot());
  const curtain = (html) => p.evaluate((h) => window.__demo.curtain(h), html);
  const lift = async () => { await p.evaluate(() => { window.__demo.install(); window.__demo.lift(); }); await sleep(700); };
  /** Moves inside the app without a reload, through a quick fade to dark and back, so pages never jump-cut. */
  const route = async (path) => {
    await p.evaluate(() => window.__demo.fade(true)).catch(() => {});
    await sleep(280);
    await p.evaluate((u) => { history.pushState({}, "", u); dispatchEvent(new PopStateEvent("popstate")); }, path);
  };
  /** Lifts the fade once the new page is ready. */
  const reveal_ = () => p.evaluate(() => window.__demo.fade(false)).catch(() => {});
  return { sleep, say, finish, marks, at, cursorTo, click, caption, hideCaption, reveal, spot, unspot, curtain, lift, route, unfade: reveal_ };
}
