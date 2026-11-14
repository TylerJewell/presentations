/* Deck helpers on top of window.Mock (../mock/lib). Everything that moves takes the slide's time t and
   writes the state for that instant, as in the film: a slide is a pure function of t.

   Talk.camera frames a subject inside the whole stage. The deck has no caption, so unlike Mock.camera
   there is no caption zone to keep clear, and it may push in further (2.4x by default) because a
   console screen must be read from the back of the room. */
(function () {
  const M = window.Mock;
  const W = 1920, H = 1080;
  const T = (window.Talk = window.Talk || {});

  T.SAFE = [56, 56, W - 112, H - 112];
  T.CAM_MAX = 2.4;

  /** The view { s, x, y } that frames rect, at most max, never showing past the stage's edge. */
  T.frameRect = function (rect, pad = 36, max = T.CAM_MAX) {
    if (!rect) return { s: 1, x: 0, y: 0 };
    const [sx, sy, sw, sh] = T.SAFE;
    const [x, y, w, h] = rect;
    const s = M.clamp(Math.min(sw / (w + 2 * pad), sh / (h + 2 * pad)), 1, max);
    let tx = sx + sw / 2 - s * (x + w / 2), ty = sy + sh / 2 - s * (y + h / 2);
    tx = M.clamp(tx, W - W * s, 0);
    ty = M.clamp(ty, H - H * s, 0);
    return { s, x: tx, y: ty };
  };

  /**
   * keys: [{ t, rect: [x, y, w, h] | null, dur?: 1.1, max?, pad? }] in time order. At key.t the camera
   * eases (in-out cubic over dur) from wherever it is to the view framing key.rect; null is the full frame.
   */
  T.camera = function (el, t, keys) {
    let view = { s: 1, x: 0, y: 0 };
    for (const k of keys) {
      if (t < k.t) break;
      const target = T.frameRect(k.rect, k.pad ?? 36, k.max ?? T.CAM_MAX);
      const p = M.ease.inOutCubic(M.prog(t, k.t, k.dur ?? 1.1));
      view = { s: M.lerp(view.s, target.s, p), x: M.lerp(view.x, target.x, p), y: M.lerp(view.y, target.y, p) };
    }
    el.style.transformOrigin = '0 0';
    el.style.transform = view.s === 1 && !view.x && !view.y ? 'none' : `translate(${view.x.toFixed(2)}px, ${view.y.toFixed(2)}px) scale(${view.s.toFixed(4)})`;
    return view;
  };

  /** Text that changes only when it must (keeps layout work out of ambient frames). */
  T.txt = (el, s) => { if (el._t !== s) { el.textContent = s; el._t = s; } };
  T.htm = (el, s) => { if (el._h !== s) { el.innerHTML = s; el._h = s; } };

  /** A headline split into masked lines that rise in turn: T.lines(parent, ['Two', 'clocks.'], 'tk-h'). */
  T.lines = function (parent, lines, cls = 'tk-h') {
    const box = M.html(`<div class="${cls}">${lines.map((l) => `<div class="ln-mask"><div class="ln">${l}</div></div>`).join('')}</div>`);
    parent.appendChild(box);
    return { el: box, ln: [...box.querySelectorAll('.ln')] };
  };
  T.linesAt = function (h, t, start, gap = 0.12, dur = 1.0) {
    h.ln.forEach((l, i) => M.lineRise(l, t, start + i * gap, dur));
  };

  /** Smooth path through points [[x, y], ...] (Catmull-Rom as cubic Béziers). */
  T.smooth = function (pts, k = 0.5) {
    if (pts.length < 2) return '';
    let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
      const c1 = [p1[0] + ((p2[0] - p0[0]) * k) / 3, p1[1] + ((p2[1] - p0[1]) * k) / 3];
      const c2 = [p2[0] - ((p3[0] - p1[0]) * k) / 3, p2[1] - ((p3[1] - p1[1]) * k) / 3];
      d += ` C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
    }
    return d;
  };

  /**
   * A section card: the act's line in hero type on black, the dot grid, and a slow band of light that
   * crosses the grid while it holds. lines: ['Governance has to', '<span class="tk-y">change shape.</span>'].
   * Call T.cardAt(card, t) from at(t); the line has risen by t = 1.4.
   */
  T.card = function (root, lines) {
    M.style('tk-card-sec', `
      .tk-sec .glow { left: -600px; top: 0; width: 600px; height: 1080px; background: radial-gradient(closest-side, rgba(255,206,74,.10), rgba(255,206,74,0)); }
      .tk-sec .hd { left: var(--gut); top: 400px; right: var(--gut); }
      .tk-sec .hd .tk-hero { font-size: 140px; }
    `);
    root.classList.add('tk-sec');
    const grid = M.dotGrid(root);
    const glow = M.html('<div class="glow"></div>');
    root.appendChild(glow);
    const h = T.lines(root.appendChild(M.html('<div class="hd"></div>')), lines, 'tk-hero');
    return { grid, glow, h };
  };
  T.cardAt = function (c, t) {
    M.fade(c.grid, t, 0, 1.2);
    T.linesAt(c.h, t, 0.25, 0.14, 1.1);
    const u = M.loop(t, 14);
    c.glow.style.transform = `translateX(${(u * 3100).toFixed(1)}px)`;
  };

  /** A slide still to be built: its title and the beat it is on, so the deck runs end to end. */
  T.stub = function (def) {
    registerSlide(Object.assign({
      render(root) {
        M.dotGrid(root);
        this.r = M.mount(root, `<div class="tk-top"><div class="tk-eb">Slide to come</div><h2 class="tk-h">${def.title}</h2><p class="tk-m" data-k="b"></p></div>`);
      },
      at(t) {
        M.rise(this.r.root, t, 0);
        let k = 0;
        this.beats.forEach((b, i) => { if (t >= b.t - 1e-6) k = i; });
        T.txt(this.r.b, `Beat ${k + 1} of ${this.beats.length}`);
      },
    }, def));
  };

  /** The line glyphs for the five control types, in a 64x64 box, drawn with M.draw. */
  T.GLYPH = {
    Guardrail: ['M10 32h44', 'M32 10v44', 'M18 18l28 28'].slice(0, 0).concat(['M32 6l22 8v16c0 14-9 24-22 28-13-4-22-14-22-28V14z', 'M23 23l18 18', 'M41 23L23 41']),
    Evaluation: ['M8 50h48', 'M14 50V34', 'M26 50V22', 'M38 50V28', 'M50 50V12'],
    Human: ['M32 30a10 10 0 1 0 0-20a10 10 0 1 0 0 20z', 'M12 56c0-12 9-20 20-20s20 8 20 20'],
    Gate: ['M12 56V14', 'M52 56V14', 'M12 22h40', 'M12 34h40', 'M32 22v12'],
    Sanitizer: ['M8 20h48', 'M8 32h20', 'M36 32h20', 'M8 44h48', 'M28 26h8v12h-8z'],
  };
})();
