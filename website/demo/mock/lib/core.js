/* Shared helpers for scenes. Every helper that moves something takes the scene's local time t (seconds)
   and writes the element's state for that instant, so a scene is a pure function of t and can be scrubbed
   or captured frame by frame. Nothing here starts a timer, a transition or a CSS animation. */
(function () {
  const M = (window.Mock = window.Mock || {});
  const SVGNS = 'http://www.w3.org/2000/svg';

  /* ---------- numbers ---------- */
  M.clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  M.lerp = (a, b, p) => a + (b - a) * p;
  /** 0 before start, 1 after start + dur, linear in between. */
  M.prog = (t, start, dur) => (dur <= 0 ? (t >= start ? 1 : 0) : M.clamp((t - start) / dur));

  /** A CSS cubic-bezier timing function as a function of progress. */
  M.bezier = function (x1, y1, x2, y2) {
    const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
    const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
    const sx = (s) => ((ax * s + bx) * s + cx) * s;
    const sy = (s) => ((ay * s + by) * s + cy) * s;
    const dx = (s) => (3 * ax * s + 2 * bx) * s + cx;
    return function (p) {
      if (p <= 0) return 0;
      if (p >= 1) return 1;
      let s = p;
      for (let i = 0; i < 8; i++) {
        const e = sx(s) - p, d = dx(s);
        if (Math.abs(e) < 1e-6 || Math.abs(d) < 1e-6) break;
        s -= e / d;
      }
      return sy(M.clamp(s));
    };
  };

  M.ease = {
    linear: (p) => p,
    outCubic: (p) => 1 - Math.pow(1 - p, 3),
    inCubic: (p) => p * p * p,
    inOutCubic: (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2),
    /* the akka.io reveal curve */
    reveal: M.bezier(0.16, 1, 0.3, 1),
    /* the console's glide curve */
    glide: M.bezier(0.4, 0, 0.2, 1),
    css: M.bezier(0.25, 0.1, 0.25, 1),
  };

  /** Eased progress: M.p(t, start, dur, 'reveal'). */
  M.p = (t, start, dur, ease = 'reveal') => M.ease[ease](M.prog(t, start, dur));

  /** A window: 0 before a, rises over `inDur` to 1, holds, falls over `outDur` to 0 at b. */
  M.ramp = function (t, a, b, inDur = 0.35, outDur = 0.35) {
    if (t <= a || t >= b) return 0;
    return M.ease.inOutCubic(Math.min(M.prog(t, a, inDur), 1 - M.prog(t, b - outDur, outDur)));
  };

  /** 0..1 oscillation, deterministic in t. */
  M.wave = (t, period = 2, phase = 0) => 0.5 - 0.5 * Math.cos(((t / period) + phase) * Math.PI * 2);

  M.fmt = {
    int: (n) => Math.round(n).toLocaleString('en-US'),
    fixed: (n, d) => n.toFixed(d),
    money: (n, d = 3) => '$' + n.toFixed(d),
    pct: (n, d = 0) => n.toFixed(d) + '%',
  };

  /* ---------- DOM ---------- */
  /** Parses an HTML string into its first element. */
  M.html = function (str) {
    const tpl = document.createElement('template');
    tpl.innerHTML = str.trim();
    return tpl.content.firstElementChild;
  };
  /** Appends HTML to a parent and returns a lookup of its [data-k] elements by key. */
  M.mount = function (parent, str) {
    const el = M.html(str);
    parent.appendChild(el);
    const refs = { root: el };
    if (el.dataset.k) refs[el.dataset.k] = el;
    el.querySelectorAll('[data-k]').forEach((n) => (refs[n.dataset.k] = n));
    return refs;
  };
  M.svg = function (tag, attrs = {}, parent) {
    const n = document.createElementNS(SVGNS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  };
  /** Adds a scene's own stylesheet once. Scope its selectors under the scene's root class. */
  M.style = function (id, css) {
    if (document.getElementById('css-' + id)) return;
    const st = document.createElement('style');
    st.id = 'css-' + id;
    st.textContent = css;
    document.head.appendChild(st);
  };
  M.set = function (el, styles) {
    for (const k in styles) {
      if (k.startsWith('--')) el.style.setProperty(k, styles[k]);
      else el.style[k] = styles[k];
    }
  };
  /**
   * The rect [x, y, w, h] of an element inside a world (or any full-stage layer), in unzoomed stage px,
   * whatever the camera and the window's scale are doing. The player boots after the web fonts load, so a
   * rect measured from a scene's at() is final and can be cached.
   */
  M.rectOf = function (world, el) {
    const keep = world.style.transform;
    world.style.transform = 'none';
    const wr = world.getBoundingClientRect(), k = wr.width / 1920, b = el.getBoundingClientRect();
    world.style.transform = keep;
    return [(b.left - wr.left) / k, (b.top - wr.top) / k, b.width / k, b.height / k];
  };

  /* ---------- motion ---------- */
  /** The akka.io rise-in: opacity 0 -> 1 over .7 s, translateY(dy) -> 0 over .8 s on the reveal curve. */
  M.rise = function (el, t, start, opts = {}) {
    const dy = opts.dy ?? 22, dur = opts.dur ?? 0.8, fade = opts.fade ?? 0.7;
    const o = M.ease.css(M.prog(t, start, fade));
    const y = (1 - M.p(t, start, dur)) * dy;
    el.style.opacity = o * (opts.opacity ?? 1);
    el.style.transform = y ? `translateY(${y.toFixed(2)}px)` : 'none';
    return o;
  };
  /** Rise-in at `start`, and fall out (fade, small lift) at `end` when given. */
  M.riseOut = function (el, t, start, end, opts = {}) {
    if (end == null || t < end) return M.rise(el, t, start, opts);
    const p = M.p(t, end, opts.outDur ?? 0.5, 'inOutCubic');
    el.style.opacity = 1 - p;
    el.style.transform = `translateY(${(-p * (opts.outDy ?? 12)).toFixed(2)}px)`;
    return 1 - p;
  };
  /** Opacity only. */
  M.fade = function (el, t, start, dur = 0.5, from = 0, to = 1) {
    const v = M.lerp(from, to, M.ease.css(M.prog(t, start, dur)));
    el.style.opacity = v;
    return v;
  };
  /** A masked line (an .ln-mask > .ln pair) rising from under its baseline. */
  M.lineRise = function (inner, t, start, dur = 1.0) {
    const p = M.p(t, start, dur);
    inner.style.transform = `translateY(${((1 - p) * 108).toFixed(2)}%)`;
    return p;
  };
  /** Count-up with ease-out cubic; fmt turns the value into text. */
  M.countUp = function (el, t, start, dur, from, to, fmt = M.fmt.int) {
    const v = M.lerp(from, to, M.ease.outCubic(M.prog(t, start, dur)));
    const s = fmt(v);
    if (el.textContent !== s) el.textContent = s;
    return v;
  };
  /** Stroke-dash draw of any SVG geometry element, from its start to its end. */
  M.draw = function (shape, t, start, dur = 0.9, ease = 'outCubic') {
    if (shape._len == null) shape._len = shape.getTotalLength ? shape.getTotalLength() : 1000;
    const L = shape._len, p = M.ease[ease](M.prog(t, start, dur));
    shape.style.strokeDasharray = `${L} ${L}`;
    shape.style.strokeDashoffset = (L * (1 - p)).toFixed(2);
    shape.style.opacity = p > 0 ? '' : 0;
    return p;
  };
  /** Marching dashes on an SVG stroke whose dasharray is set in CSS: offset moves `speed` px a second. */
  M.march = function (shape, t, speed = 16) {
    shape.style.strokeDashoffset = (-t * speed).toFixed(2);
  };

  /** A flow rail: yellow 45% dashes on an 8 px pitch, moving along the rail. vertical: true flows down. */
  M.rail = function (parent, opts = {}) {
    const el = document.createElement('div');
    el.className = 'mk-rail' + (opts.vertical ? ' v' : '');
    if (opts.style) M.set(el, opts.style);
    parent.appendChild(el);
    return el;
  };
  M.railAt = function (el, t, speed = 9) {
    const off = ((t * speed) % 8).toFixed(2) + 'px';
    el.style.backgroundPosition = el.classList.contains('v') ? `0 ${off}` : `${off} 0`;
  };
  /** Grows a rail along its length from 0 to its full size. */
  M.railGrow = function (el, t, start, dur = 0.9) {
    const p = M.p(t, start, dur, 'outCubic');
    el.style.clipPath = el.classList.contains('v') ? `inset(0 0 ${(1 - p) * 100}% 0)` : `inset(0 ${(1 - p) * 100}% 0 0)`;
    return p;
  };

  /** The faint yellow 48 px dot grid, masked top and bottom. */
  M.dotGrid = function (parent, opts = {}) {
    const el = document.createElement('div');
    el.className = 'mk-dotgrid' + (opts.full ? ' full' : '');
    parent.appendChild(el);
    return el;
  };

  /* ---------- brand ---------- */
  M.markSVG = function (height = 28, fill = '#F1F1F1') {
    const w = (height * 780) / 178;
    return `<svg class="mk-mark" width="${w.toFixed(1)}" height="${height}" viewBox="0 0 780 178" aria-label="Akka"><g fill="${fill}">` +
      '<polygon points="324.68 .12 259.49 72.63 259.49 0 216.25 0 216.25 177.95 259.49 177.95 259.49 105.33 324.68 177.83 381.64 177.83 301.75 88.98 381.64 .12"/>' +
      '<polygon points="516.96 .12 451.77 72.63 451.77 0 408.54 0 408.54 177.95 451.77 177.95 451.77 105.33 516.96 177.83 573.93 177.83 494.04 88.98 573.93 .12"/>' +
      '<path d="M114.05.12H81.39L0 177.83h45.97l11.1-25.74h82.39l11.1 25.74h45.97L115.14.12h-1.09zM72.88 115.44l25.39-58.88 25.39 58.88H72.88z"/>' +
      '<path d="M697.68.12h-33.75l-81.39 177.71h45.97l11.1-25.74h82.39l11.1 25.74h45.97L697.68.12zM655.41 115.44l25.39-58.88 25.39 58.88h-50.78z"/>' +
      '</g></svg>';
  };

  /** The four product cards of the family diagram, shared by the scenes that show the platform. */
  M.PRODUCTS = [
    { id: 'specify', name: 'Specify', kind: 'AI factories', line: 'Builds systems from specifications.' },
    { id: 'sdk', name: 'Agent SDK', kind: 'Agents', line: 'Runs them, as one binary.' },
    { id: 'verify', name: 'Verify', kind: 'Governance', line: 'Governs them with controls.' },
    { id: 'optimize', name: 'Optimize', kind: 'Models', line: 'Runs them on the right models.' },
  ];
  /** Line-drawn glyphs for the product cards, in a 64x64 box; each path draws with M.draw. */
  M.GLYPHS = {
    specify: ['M14 6h26l10 10v42H14z', 'M40 6v10h10', 'M22 28h20', 'M22 37h20', 'M22 46h12'],
    sdk: ['M32 8l20 12v24L32 56 12 44V20z', 'M32 32l20-12', 'M32 32L12 20', 'M32 32v24'],
    verify: ['M32 6l22 8v16c0 14-9 24-22 28-13-4-22-14-22-28V14z', 'M22 32l7 7 14-15'],
    optimize: ['M8 32h16', 'M24 32c10 0 10-18 22-18h10', 'M24 32h32', 'M24 32c10 0 10 18 22 18h10', 'M52 10l4 4-4 4', 'M52 28l4 4-4 4', 'M52 46l4 4-4 4'],
  };
  /** Builds one family card. Glow it with M.cardGlow; draw its glyph with M.cardDraw. */
  M.productCard = function (parent, prod, opts = {}) {
    const el = M.html(
      `<div class="mk-pcard${opts.compact ? ' compact' : ''}">
        <svg class="g" viewBox="0 0 64 64" aria-hidden="true">${(M.GLYPHS[prod.id] || []).map((d) => `<path d="${d}"/>`).join('')}</svg>
        <div class="kind">${prod.kind}</div>
        <div class="nm">${prod.name}</div>
        ${opts.compact ? '' : `<div class="ln">${prod.line}</div>`}
      </div>`
    );
    parent.appendChild(el);
    return el;
  };
  M.cardGlow = (el, g) => el.style.setProperty('--g', M.clamp(g).toFixed(3));
  M.cardDraw = function (el, t, start, dur = 1.1) {
    el.querySelectorAll('.g path').forEach((p, i) => M.draw(p, t, start + i * 0.12, dur));
  };

  /** The placeholder a stub scene shows until it is built. */
  M.placeholder = function (root, scene) {
    M.dotGrid(root);
    const r = M.mount(root, `
      <div class="mk-stub">
        <div class="mk-eyebrow mono" data-k="eb">Scene ${scene.id} &nbsp; ${scene.duration} s</div>
        <h2 class="mk-h2" data-k="h">${scene.title}</h2>
        <p class="mk-sub" data-k="s">Scene to come</p>
      </div>`);
    return {
      at(t) {
        M.rise(r.eb, t, 0.1);
        M.rise(r.h, t, 0.2);
        M.rise(r.s, t, 0.35);
      },
    };
  };
})();
