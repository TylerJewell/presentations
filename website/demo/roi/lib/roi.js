/* Roi: the shared pieces of the total-cost film. Every piece is built once in render(root) and set for an
   instant t in at(t); nothing keeps state between frames, so the film scrubs and captures exactly.
   The classes live in ../film.css (prefix ro-). Stage px are the 1920x1080 stage.

   Registration
     Roi.register(def)            Fills act, title, duration and caption (the `say` line) from the scene's row in
                                  scenes/index.js, then registers it. A scene file holds only id, optional
                                  captionZone, render(root), at(t) and its own helpers.

   The cost areas
     Roi.LINES                    The four areas of a fully loaded cost. Model spend is its own area, outside them.

   The frame every argument scene shares: eyebrow and headline at the top, the cost-area strip at the bottom right
     const F = Roi.frame(root, { eyebrow, headline, lit });   lit: index into LINES this scene is about, 'all', or null
     F.at(t, { start = 0 })        Head rises from `start`; the strip fades in and its bar `lit` lights.
     F.head, F.h, F.bars           The elements.

   A row with a label at the gutter
     const R = Roi.row(root, { y, label, h });   returns { root, lab, body }: the body is 260 px to the right of
                                  the label (1340 px wide); content inside the body is absolute.
     R.at(t, start)                The label rises.

   Pieces
     Roi.card(parent, { x, y, w, h, who, text, soft, figs })
                                  A statement card: the name (`who`, bold), the statement, an optional soft second
                                  line, and figs [{ l }] whose numbers the scene writes each frame.
                                  Returns { root, who, text, soft, figs: [{ n, l }] }.
     Roi.tile(parent, { x, y, w, h, text })       A named tile, lit by Roi.glow.
     Roi.step(parent, { x, y, text })             A step on a flow rail, lit by Roi.glow.
     Roi.glow(el, g)               Sets --g (0..1) on any ro- element. */
window.Roi = (function () {
  const M = Mock;

  const LINES = ['Infrastructure', 'Licenses', 'Integration', 'People'];

  function row(id) {
    const r = (window.FILM_SCENES || []).find((s) => s.id === id);
    if (!r) throw new Error(`scene ${id} is not in the timeline (scenes/index.js)`);
    return r;
  }
  function register(def) {
    const r = row(def.id);
    def.act = r.act; def.title = r.title; def.duration = r.duration; def.caption = r.say;
    if (r.roi || def.roiItems) withBadge(def, r.roi);
    registerScene(def);
  }

  const glow = (el, g) => el.style.setProperty('--g', M.clamp(g).toFixed(3));

  /* The corner takeaway. Every scene with a `roi` in its timeline row (or roiItems() in its file) gets the same
     badge at the top right, in the band above the eyebrow: "Return", one green arrow and the outcome, with no figure. It rises as the scene's
     last sentence begins, the arrow travelling a short way in its own direction; a scene with several items swaps
     arrow and outcome in place at each item's time. */
  const ARROW = {
    down: '<path d="M28 12v30M16 31l12 12 12-12"/>',
    up: '<path d="M28 44V14M16 25l12-12 12 12"/>',
  };
  function lastSentenceAt(s) {
    const words = s.caption.split(/\s+/), sentences = s.caption.split(/(?<=[.!?])\s+/);
    const i = words.length - sentences[sentences.length - 1].split(/\s+/).length;
    return (M.wordTime(s, i, words.length) - (s.cardDur || 0)) / (s.warp || 1);
  }
  function withBadge(def, roi) {
    const render = def.render, at = def.at;
    def.render = function (root) {
      render.call(this, root);
      this.roiEl = M.mount(root, `<div class="ro-roi"><div class="lab">Return</div><div class="row" data-k="row"><svg class="ar" viewBox="0 0 56 56" data-k="ar"></svg><span class="tx" data-k="tx"></span></div></div>`);
    };
    def.at = function (t) {
      at.call(this, t);
      const items = this.roiItems ? this.roiItems() : [{ dir: roi[0], label: roi[1], t: lastSentenceAt(this) }];
      let k = -1;
      while (k + 1 < items.length && t >= items[k + 1].t) k++;
      const B = this.roiEl, it = items[Math.max(k, 0)];
      if (B.tx.textContent !== it.label) B.tx.textContent = it.label;
      if (B.dir !== it.dir) { B.ar.innerHTML = ARROW[it.dir]; B.dir = it.dir; }
      M.rise(B.root, t, items[0].t - 0.2, { dy: 12 });
      const p = M.ease.css(M.prog(t, it.t - 0.2, 0.7));
      B.row.style.opacity = k > 0 ? (0.15 + 0.85 * p).toFixed(3) : 1;
      B.ar.style.transform = `translateY(${((1 - p) * (it.dir === 'down' ? -10 : 10)).toFixed(2)}px)`;
    };
  }

  function frame(parent, { eyebrow, headline, lit = null }) {
    M.dotGrid(parent);
    const head = M.mount(parent, `<div class="ro-head"><div class="mk-eyebrow" data-k="eb">${eyebrow}</div><h2 class="ro-h" data-k="h">${headline}</h2></div>`);
    const foot = M.mount(parent, `<div class="ro-foot">${LINES.map((l) => `<div><i></i><span>${l}</span></div>`).join('')}</div>`).root;
    const bars = [...foot.children];
    return {
      head: head.root, h: head.h, bars,
      at(t, { start = 0 } = {}) {
        M.rise(head.eb, t, start);
        M.rise(head.h, t, start + 0.1);
        M.fade(foot, t, start + 0.4, 0.6);
        bars.forEach((b, i) => glow(b, lit === 'all' || i === lit ? M.prog(t, start + 0.7, 0.5) : 0));
      },
    };
  }

  function rowOf(parent, { y, label, h = 100 }) {
    const r = M.mount(parent, `<div class="ro-row" style="top:${y}px;height:${h}px"><div class="lab" data-k="lab">${label}</div><div class="body" data-k="body"></div></div>`);
    return { root: r.root, lab: r.lab, body: r.body, at(t, start = 0) { M.rise(r.lab, t, start, { dy: 10 }); } };
  }

  function card(parent, { x, y, w, h, who, text, soft, figs = [] }) {
    const r = M.mount(parent, `<div class="ro-card" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px">
      ${who ? `<div class="who" data-k="who">${who}</div>` : ''}
      ${text ? `<div class="tx" data-k="text">${text}</div>` : ''}
      ${soft ? `<div class="tx soft" data-k="soft">${soft}</div>` : ''}
      ${figs.length ? `<div class="figs">${figs.map((f, i) => `<div class="ro-fig"><div class="n" data-k="n${i}"></div><div class="l" data-k="l${i}">${f.l}</div></div>`).join('')}</div>` : ''}
    </div>`);
    return { root: r.root, who: r.who, text: r.text, soft: r.soft, figs: figs.map((_, i) => ({ n: r['n' + i], l: r['l' + i] })) };
  }

  const tile = (parent, { x, y, w, h, text }) => M.mount(parent, `<div class="ro-tile" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px">${text}</div>`).root;
  const step = (parent, { x, y, text }) => M.mount(parent, `<div class="ro-step" style="left:${x}px;top:${y}px">${text}</div>`).root;

  return { LINES, register, frame, row: rowOf, card, tile, step, glow };
})();
