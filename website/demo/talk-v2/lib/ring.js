/* The ring of ten country labels, the through-line of this version of the talk. Text labels only, never
   flags. Ten labels sit on an ellipse, clockwise from the top in the order of window.V2_COUNTRIES; each can
   carry a second line (its requirement) and a status chip.

     const ring = Talk.ring(root, { cx: 960, cy: 600, rx: 640, ry: 330, sub: true });
     Talk.ringAt(ring, t, { start: 0.6, on: (i) => 1, lit: (i) => i === k ? 1 : 0, dim: 0 });

   on(i) is how far label i has appeared (0..1, it rises in); lit(i) is how strongly it glows as the subject
   (0..1, yellow); dim (0..1) steps every label back. Like a slide, the ring is a pure function of t. */
(function () {
  const M = window.Mock;
  const T = (window.Talk = window.Talk || {});

  T.ring = function (parent, opts = {}) {
    const { cx = 960, cy = 600, rx = 640, ry = 330, sub = false, chips = true, countries = window.V2_COUNTRIES } = opts;
    M.style('tk-ring', `
      .tk-ring { left: 0; top: 0; width: 1920px; height: 1080px; pointer-events: none; }
      .tk-ring .rl { position: absolute; transform: translate(-50%, -50%); display: flex; flex-direction: column; align-items: center; gap: 10px; white-space: nowrap; }
      .tk-ring .rl .n { font: 600 26px/1 var(--sans); letter-spacing: .12em; text-transform: uppercase; color: var(--ink-2);
        padding: 12px 18px; border-radius: 999px; box-shadow: inset 0 0 0 2px var(--line-2); background: #0B0B0E; }
      .tk-ring .rl .s { font: 500 26px/1.15 var(--sans); color: var(--ink); text-align: center; }
      .tk-ring .rl .w { margin-top: 2px; }
    `);
    const root = M.html('<div class="tk-ring"></div>');
    parent.appendChild(root);
    const labels = countries.map((c, i) => {
      const a = -Math.PI / 2 + (i / countries.length) * Math.PI * 2;
      const x = cx + rx * Math.cos(a), y = cy + ry * Math.sin(a);
      const el = M.html(`<div class="rl" style="left:${x.toFixed(1)}px;top:${y.toFixed(1)}px">
        <div class="n">${c.name}</div>${sub ? `<div class="s">${c.req}</div>` : ''}${sub && chips && c.when ? `<span class="tk-chip dim w">${c.when}</span>` : ''}</div>`);
      root.appendChild(el);
      return { el, x, y, a, c, n: el.querySelector('.n'), s: el.querySelector('.s'), w: el.querySelector('.w') };
    });
    return { root, labels, cx, cy, rx, ry };
  };

  /** Sets every label for instant t. Options are functions of the label's index, or numbers. */
  T.ringAt = function (ring, t, opts = {}) {
    const val = (v, i, d) => (typeof v === 'function' ? v(i) : v ?? d);
    const start = opts.start ?? 0, gap = opts.gap ?? 0.06;
    ring.labels.forEach((l, i) => {
      const on = opts.on !== undefined ? val(opts.on, i, 1) : M.p(t, start + i * gap, 0.6);
      const lit = M.clamp(val(opts.lit, i, 0), 0, 1);
      const dim = M.clamp(val(opts.dim, i, 0), 0, 1);
      const subOn = M.clamp(val(opts.sub, i, 1), 0, 1);
      l.el.style.opacity = (on * (1 - 0.72 * dim * (1 - lit))).toFixed(3);
      l.el.style.transform = `translate(-50%, calc(-50% + ${((1 - on) * 14).toFixed(1)}px)) scale(${(1 + 0.06 * lit).toFixed(3)})`;
      l.n.style.color = lit > 0.01 ? `rgba(255,206,74,${(0.55 + 0.45 * lit).toFixed(3)})` : '';
      l.n.style.boxShadow = lit > 0.01
        ? `inset 0 0 0 2px rgba(255,206,74,${(0.25 + 0.5 * lit).toFixed(3)}), 0 0 ${(34 * lit).toFixed(1)}px -8px rgba(255,206,74,.7)`
        : '';
      if (l.s) l.s.style.opacity = subOn.toFixed(3);
      if (l.w) l.w.style.opacity = subOn.toFixed(3);
    });
  };
})();
