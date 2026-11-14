/* The deck: slides of click-advanced beats, built on the film's engine (../mock/lib).

   Each slide is a pure function of its own time t, exactly like a film scene: render(root) builds it
   once, at(t) sets every style for the instant t. A slide's beats are hold times on that timeline. A
   click plays t from the current hold to the next at real speed and stops there; going back jumps to
   the previous hold. Live parts (counters, rails, verdict streams) run on Mock's live clock, which this
   engine ties to the wall clock, so they keep moving while a beat holds.

   Modes (query string):
     (none)       the show: full window, letterboxed 1920x1080, keys and clicks advance
     presenter=1  the presenter view (lib/presenter.js), synced with the show over BroadcastChannel
     still=1      a thumbnail frame for the presenter view; it shows the hold it is sent by postMessage
     capture=1    the stage at 1:1 from the top-left corner, on a virtual clock, for the render script
     print=1      every beat's hold frame, one 1920x1080 page each, for a PDF backup */
(function () {
  const M = window.Mock;
  const W = 1920, H = 1080;
  const Q = new URLSearchParams(location.search);
  const MODE = Q.get('presenter') === '1' ? 'presenter' : Q.get('print') === '1' ? 'print' : Q.get('still') === '1' ? 'still' : 'show';
  const VIRTUAL = Q.get('capture') === '1' || MODE === 'print';
  const FADE_OUT = 0.32, FADE_IN = 0.5, CROSS = 0.8, DIP = 0.35;
  const WPM = 140;
  const CHANNEL = 'akka-talk';

  const defs = [];
  window.registerSlide = function (def) {
    for (const k of ['id', 'act', 'title', 'beats', 'render', 'at'])
      if (def[k] == null) throw new Error(`slide ${def.id || '?'}: missing "${k}"`);
    if (!def.beats.length) throw new Error(`slide ${def.id}: needs at least one beat`);
    let prev = -1;
    def.beats.forEach((b, i) => {
      if (!(b.t >= 0) || b.t < prev) throw new Error(`slide ${def.id}: beat ${i} hold ${b.t} is not after ${prev}`);
      prev = b.t;
    });
    defs.push(def);
  };

  /* ---------- the spoken script and its timing (shared with the presenter view and script.md) ---------- */
  const sayOf = (b) => (typeof b.say === 'function' ? b.say(window.TRENDS || {}) : b.say || '');
  const words = (s) => (s.trim() ? s.trim().split(/\s+/).length : 0);
  /** Planned seconds for a beat: the words at 140 a minute, never less than its animation plus a breath. */
  function plan(s, i) {
    const anim = s.beats[i].t - (i ? s.beats[i - 1].t : 0);
    return Math.max((words(sayOf(s.beats[i])) * 60) / WPM, anim + 1);
  }

  let slides = [];
  function order() {
    const want = window.TALK_ORDER || [];
    const byId = new Map(defs.map((s) => [s.id, s]));
    const out = [];
    want.forEach((id) => { if (byId.has(id)) { out.push(byId.get(id)); byId.delete(id); } else console.warn(`slide ${id} is in TALK_ORDER but was not registered`); });
    byId.forEach((s) => { console.warn(`slide ${s.id} is registered but not in TALK_ORDER; appended`); out.push(s); });
    return out;
  }
  function outline() {
    return slides.map((s, i) => ({
      index: i, id: s.id, act: s.act, title: s.title,
      beats: s.beats.map((b, k) => ({ t: b.t, label: b.label || '', say: sayOf(b), words: words(sayOf(b)), plan: plan(s, k) })),
    }));
  }

  /* ---------- state ---------- */
  let stage, black, blank, jump;
  let cur = 0, beat = 0;
  let anim = null;      /* { from, to, t0, dur } on the clock */
  let trans = null;     /* { kind, prev, t0 } */
  let dip = null;       /* { t0 } a short fade from black after a jump */
  let pinned = null;    /* a fixed t, for the render script's mid-beat frames */
  let blankOn = false, blankT0 = -10;
  let vclock = 0;
  const clock = () => (VIRTUAL ? vclock : performance.now() / 1000);
  const holdOf = (i, b) => slides[i].beats[b].t;
  const last = (i) => slides[i].beats.length - 1;

  function build() {
    slides = order();
    stage = document.getElementById('stage');
    slides.forEach((s, i) => {
      const root = document.createElement('div');
      root.className = 'scene';
      root.dataset.slide = s.id;
      stage.appendChild(root);
      s.root = root;
      s.index = i;
      try { s.render(root); } catch (e) { root.textContent = `slide ${s.id} failed to render: ${e.message}`; console.error(e); }
    });
    black = M.html('<div id="black"></div>');
    blank = M.html('<div id="blank"></div>');
    jump = M.html('<div id="jump"></div>');
    stage.append(black, blank, jump);
  }

  /* draw one slide at time t; the live clock reads the wall clock (or the virtual one) */
  function draw(s, t, opacity = 1, z = 1) {
    const live = VIRTUAL ? 400 + vclock : clock();
    /* M.abs(t) = PREROLL + begin + t, so with begin = live - t it reads PREROLL + live whatever t is */
    M.stageInfo.scene = { id: s.id, begin: live - t, cardDur: 0, captionZone: 'bottom-left' };
    s.root.style.opacity = opacity < 1 ? opacity.toFixed(3) : '';
    s.root.style.zIndex = z;
    try { s.at(t); } catch (e) { console.error(`slide ${s.id} at(${t.toFixed(2)}):`, e); }
  }

  let shown = new Set();
  function frame() {
    const now = clock();
    let t;
    if (pinned != null) t = pinned;
    else if (anim) {
      const p = anim.dur > 0 ? M.clamp((now - anim.t0) / anim.dur) : 1;
      t = M.lerp(anim.from, anim.to, p);
      if (p >= 1) { anim = null; changed(); }
    } else t = holdOf(cur, beat);

    const vis = [];
    let blk = 0;
    if (trans) {
      const e = now - trans.t0;
      const prev = slides[trans.prev];
      if (trans.kind === 'cross') {
        const p = M.ease.inOutCubic(M.clamp(e / CROSS));
        vis.push([prev, holdOf(trans.prev, last(trans.prev)), 1, 1], [slides[cur], t, p, 2]);
        if (e >= CROSS) trans = null;
      } else {
        if (e < FADE_OUT) { vis.push([prev, holdOf(trans.prev, last(trans.prev)), 1, 1]); blk = M.ease.inOutCubic(e / FADE_OUT); }
        else { vis.push([slides[cur], t, 1, 1]); blk = 1 - M.ease.inOutCubic(M.clamp((e - FADE_OUT) / FADE_IN)); }
        if (e >= FADE_OUT + FADE_IN) trans = null;
      }
    }
    if (!vis.length) vis.push([slides[cur], t, 1, 1]);
    if (dip) { const d = 1 - M.clamp((now - dip.t0) / DIP); blk = Math.max(blk, M.ease.inOutCubic(d)); if (d <= 0) dip = null; }

    const next = new Set(vis.map((v) => v[0]));
    shown.forEach((s) => { if (!next.has(s)) s.root.classList.remove('on'); });
    vis.forEach(([s, tt, o, z]) => { s.root.classList.add('on'); draw(s, tt, o, z); });
    shown = next;
    black.style.opacity = blk.toFixed(3);
    const bp = M.clamp((now - blankT0) / 0.3);
    blank.style.opacity = (blankOn ? bp : 1 - bp).toFixed(3);
    return t;
  }

  /* ---------- navigation ---------- */
  function startAnim(from, to, delay = 0) {
    anim = to > from ? { from, to, t0: clock() + delay, dur: to - from } : null;
  }
  function next() {
    pinned = null;
    if (anim || trans) { /* a click during an animation completes it */
      anim = null; trans = null; changed(); return;
    }
    if (beat < last(cur)) { startAnim(holdOf(cur, beat), holdOf(cur, beat + 1)); beat++; changed(); }
    else if (cur < slides.length - 1) enterSlide(cur + 1);
  }
  function enterSlide(i, kind) {
    const k = kind || slides[i].transition || 'black';
    trans = { kind: k, prev: cur, t0: clock() };
    cur = i; beat = 0;
    startAnim(0, holdOf(i, 0), k === 'black' ? FADE_OUT : 0);
    changed();
  }
  function snap(i, b, withDip = true) {
    pinned = null;
    const moved = i !== cur;
    cur = M.clamp(i, 0, slides.length - 1); beat = M.clamp(b, 0, last(cur));
    anim = null; trans = null;
    if (moved && withDip) dip = { t0: clock() };
    changed();
  }
  function prev() {
    if (beat > 0) snap(cur, beat - 1);
    else if (cur > 0) snap(cur - 1, last(cur - 1));
    else snap(0, 0);
  }
  function goto(i, b = 0, animate = true) {
    if (i < 0 || i >= slides.length) return;
    if (animate && b === 0 && i !== cur) { pinned = null; anim = null; enterSlide(i); }
    else snap(i, b);
  }
  function toggleBlank() { blankOn = !blankOn; blankT0 = clock(); changed(); }

  /* ---------- sync: the show broadcasts its state; the presenter view sends commands ---------- */
  const bc = 'BroadcastChannel' in window ? new BroadcastChannel(CHANNEL) : null;
  const seen = new Set();
  function send(msg) {
    msg.nonce = Math.random().toString(36).slice(2);
    if (bc) bc.postMessage(msg);
    try { localStorage.setItem(CHANNEL, JSON.stringify(msg)); } catch (e) { /* storage blocked: BroadcastChannel only */ }
  }
  function onMsg(fn) {
    const h = (m) => { if (!m || seen.has(m.nonce)) return; seen.add(m.nonce); fn(m); };
    if (bc) bc.onmessage = (e) => h(e.data);
    addEventListener('storage', (e) => { if (e.key === CHANNEL && e.newValue) { try { h(JSON.parse(e.newValue)); } catch (x) { /* ignore */ } } });
  }
  const stateMsg = () => ({ type: 'state', cur, beat, id: slides[cur] && slides[cur].id, animating: !!(anim || trans), blank: blankOn, at: Date.now() });

  /* ---------- the slide strip: a clickable outline along the bottom, for the presenter only ----------
     Hidden while presenting; it appears while the mouse is at the bottom edge, or stays up after G until G or
     Escape. It sits outside the stage, so it never appears in captures, prints or the presenter's thumbnails. */
  let nav = null, navPinned = false, navHide = 0;
  function buildNav() {
    const acts = window.TALK_ACTS || {};
    nav = M.html('<nav id="nav"></nav>');
    let act = null, group = null;
    slides.forEach((s, i) => {
      if (s.act !== act) {
        act = s.act;
        group = M.html(`<div class="grp"><div class="act">${(acts[act] && acts[act].name) || act}</div><div class="items"></div></div>`);
        nav.appendChild(group);
      }
      const b = M.html(`<button type="button" data-i="${i}" title="${s.title}">${s.title}</button>`);
      b.addEventListener('click', (e) => { e.stopPropagation(); goto(i); if (!navPinned) setNav(false); });
      group.querySelector('.items').appendChild(b);
    });
    document.body.appendChild(nav);
    addEventListener('mousemove', (e) => {
      if (navPinned || document.body.classList.contains('notes')) return;
      if (e.clientY > innerHeight - 40) { clearTimeout(navHide); setNav(true); }
      else if (nav.classList.contains('on') && !nav.contains(e.target)) { clearTimeout(navHide); navHide = setTimeout(() => setNav(false), 600); }
    });
  }
  function setNav(on) {
    if (!nav) return;
    nav.classList.toggle('on', on);
  }
  function markNav() {
    if (!nav) return;
    nav.querySelectorAll('button').forEach((b) => b.classList.toggle('cur', +b.dataset.i === cur));
  }

  /* ---------- the notes panel and the click counter, for presenting from one screen ----------
     Ctrl+Enter slides the talk track in from the right and the slide shrinks to fit beside it. The counter in the
     slide's bottom-right corner has one dot per click on this slide: grey for played, yellow for this one,
     hollow for those still to come, so the last dot lit means the next click moves to the next slide. Both sit
     outside the stage, so neither appears in captures, prints or the presenter's thumbnails. */
  let notes = null, counter = null, notesKey = '';
  function buildNotes() {
    notes = M.html('<aside id="notes"><div class="where" data-k="where"></div><div class="say" data-k="say"></div><div class="nx" data-k="nx"></div><nav class="toc"></nav></aside>');
    /* the contents: every slide by act, as in the slide strip; a click jumps there */
    const acts = window.TALK_ACTS || {}, toc = notes.querySelector('.toc');
    let act = null;
    slides.forEach((s, i) => {
      if (s.act !== act) { act = s.act; toc.appendChild(M.html(`<div class="act">${(acts[act] && acts[act].name) || act}</div>`)); }
      const b = M.html(`<button type="button" data-i="${i}"><span>${i + 1}</span>${s.title}</button>`);
      b.addEventListener('click', () => goto(i));
      toc.appendChild(b);
    });
    document.body.appendChild(notes);
    counter = M.html('<div id="clicks"></div>');
    document.getElementById('viewport').appendChild(counter);
    fit();
  }
  function toggleNotes() {
    document.body.classList.toggle('notes');
    fit();
  }
  function markNotes() {
    if (!notes) return;
    const key = `${cur}.${beat}.${blankOn}`;
    if (key === notesKey) return;
    notesKey = key;
    const s = slides[cur], n = s.beats.length;
    counter.innerHTML = s.beats.map((_, k) => `<i class="${k < beat ? 'done' : k === beat ? 'cur' : ''}"></i>`).join('');
    counter.style.opacity = blankOn ? 0 : '';
    notes.querySelector('.where').textContent = `${cur + 1}. ${s.title}${n > 1 ? `, click ${beat + 1} of ${n}` : ''}`;
    notes.querySelector('.say').textContent = sayOf(s.beats[beat]);
    const after = beat < n - 1 ? sayOf(s.beats[beat + 1]) : null, nextSlide = slides[cur + 1];
    notes.querySelector('.nx').innerHTML = after != null
      ? `<b>Next click</b>${after.replace(/</g, '&lt;')}`
      : nextSlide ? `<b>Next slide</b>${nextSlide.title.replace(/</g, '&lt;')}` : '<b>Last slide</b>';
    const toc = notes.querySelector('.toc');
    toc.querySelectorAll('button').forEach((b) => b.classList.toggle('cur', +b.dataset.i === cur));
    const on = toc.querySelector('button.cur');
    if (on && (on.offsetTop < toc.scrollTop || on.offsetTop + on.offsetHeight > toc.scrollTop + toc.clientHeight))
      toc.scrollTop = on.offsetTop - toc.clientHeight / 3;
  }

  function changed() {
    if (MODE !== 'show') return;
    markNav();
    send(stateMsg());
    try { history.replaceState(null, '', `#s=${slides[cur].id}&b=${beat}`); } catch (e) { /* file:// may refuse */ }
  }

  /* ---------- keys ---------- */
  let digits = '', digitT = 0;
  function showJump() { jump.textContent = digits; jump.style.opacity = digits ? 1 : 0; }
  /* A press within 250 ms of the last advance is a double click or a clicker's bounce, not a second step. */
  let stepAt = -1e9;
  function step(fn) { const now = performance.now(); if (now - stepAt < 250) return; stepAt = now; fn(); }
  function keys() {
    /* the click that brings the window back into focus is not an advance */
    let focusAt = -1e9;
    addEventListener('focus', () => { focusAt = performance.now(); });
    addEventListener('keydown', (e) => {
      const k = e.key;
      if (e.repeat) { e.preventDefault(); return; }
      if (k === 'Enter' && (e.ctrlKey || e.metaKey)) { toggleNotes(); e.preventDefault(); return; }
      if (/^[0-9]$/.test(k)) { digits = (performance.now() - digitT > 2500 ? '' : digits) + k; digitT = performance.now(); showJump(); e.preventDefault(); return; }
      if (k === 'Enter' && digits) { goto(parseInt(digits, 10) - 1); digits = ''; showJump(); e.preventDefault(); return; }
      if (['ArrowRight', 'PageDown', ' ', 'Enter', 'ArrowDown', 'n', 'N'].includes(k)) step(next);
      else if (['ArrowLeft', 'PageUp', 'Backspace', 'ArrowUp', 'p', 'P'].includes(k)) step(prev);
      else if (k === 'Home') snap(0, 0);
      else if (k === 'End') snap(slides.length - 1, last(slides.length - 1));
      else if (k === 'b' || k === 'B' || k === '.' || k === 'w' || k === 'W') toggleBlank();
      else if (k === 'f' || k === 'F' || k === 'F5') { const d = document.documentElement; if (!document.fullscreenElement) d.requestFullscreen && d.requestFullscreen(); else document.exitFullscreen(); }
      else if (k === 'g' || k === 'G') { navPinned = !navPinned; setNav(navPinned); }
      else if (k === 'Escape') { digits = ''; showJump(); navPinned = false; setNav(false); return; }
      else return;
      e.preventDefault();
    });
    addEventListener('mousedown', (e) => {
      if ((nav && nav.contains(e.target)) || (notes && notes.contains(e.target))) return;
      if (performance.now() - focusAt < 400) return;
      if (e.button === 0) step(next); else if (e.button === 2) step(prev);
    });
    addEventListener('contextmenu', (e) => e.preventDefault());
    let idle = 0;
    const wake = () => { document.body.classList.remove('idle'); clearTimeout(idle); idle = setTimeout(() => document.body.classList.add('idle'), 1500); };
    addEventListener('mousemove', wake);
    wake();
  }

  function fit() {
    if (VIRTUAL) return;
    const vp = document.getElementById('viewport');
    const s = Math.min(vp.clientWidth / W, vp.clientHeight / H);
    stage.style.transform = `translate(${(-W * s) / 2}px, ${(-H * s) / 2}px) scale(${s})`;
    if (counter) {
      counter.style.right = `${(vp.clientWidth - W * s) / 2 + 22 * s}px`;
      counter.style.bottom = `${(vp.clientHeight - H * s) / 2 + 20 * s}px`;
    }
  }

  function startAt() {
    const h = new URLSearchParams(location.hash.slice(1));
    const id = h.get('s'), b = parseInt(h.get('b') || '0', 10);
    const i = slides.findIndex((s) => s.id === id);
    return i >= 0 ? [i, b] : [0, 0];
  }

  /* ---------- print: clone each hold frame into its own page ---------- */
  function printAll() {
    document.documentElement.classList.add('print');
    const out = document.createElement('div');
    slides.forEach((s, i) => s.beats.forEach((_, b) => {
      snap(i, b, false);
      frame();
      const page = document.createElement('div');
      page.className = 'pp';
      page.appendChild(s.root.cloneNode(true));
      out.appendChild(page);
    }));
    document.body.appendChild(out);
    window.deck.printed = true;
  }

  function loop() { frame(); markNotes(); requestAnimationFrame(loop); }

  function boot() {
    M.stageInfo = { width: W, height: H, capture: VIRTUAL, caption: null };
    document.body.classList.add(MODE);
    document.documentElement.classList.toggle('capture', VIRTUAL);
    if (MODE === 'presenter') {
      slides = order();
      window.TalkPresenter.boot({ outline: outline(), send, onMsg, acts: window.TALK_ACTS || {} });
      return;
    }
    build();
    fit();
    addEventListener('resize', fit);
    const [i, b] = MODE === 'show' ? startAt() : [0, 0];
    snap(i, b, false);
    window.deck = {
      mode: MODE, get cur() { return cur; }, get beat() { return beat; },
      outline, next, prev, goto, snap: (i2, b2) => { snap(i2, b2, false); frame(); },
      /** a frame between hold b-1 (or 0) and hold b of slide i, at fraction f */
      peek(i2, b2, f) { snap(i2, b2, false); const a = b2 ? holdOf(i2, b2 - 1) : 0; pinned = M.lerp(a, holdOf(i2, b2), f); frame(); },
      /** advance the virtual clock (capture mode) and draw */
      tick(dt) { vclock += dt; return frame(); },
      frame,
    };
    if (MODE === 'print') { printAll(); return; }
    if (MODE === 'show') {
      buildNav();
      buildNotes();
      keys();
      onMsg((m) => {
        if (m.type === 'hello') send(stateMsg());
        else if (m.type === 'cmd') {
          if (m.cmd === 'next') step(next); else if (m.cmd === 'prev') step(prev); else if (m.cmd === 'blank') toggleBlank();
          else if (m.cmd === 'goto') goto(m.cur, m.beat || 0, m.animate !== false);
        }
      });
      changed();
    }
    if (MODE === 'still') {
      addEventListener('message', (e) => { const m = e.data || {}; if (m.type === 'still') snap(m.cur, m.beat, false); });
      parent.postMessage({ type: 'still-ready', name: Q.get('name') }, '*');
    }
    requestAnimationFrame(loop);
  }

  const ready = () => (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve());
  addEventListener('load', () => ready().then(boot));
})();
