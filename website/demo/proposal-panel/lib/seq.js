/* Sequence diagrams for this film, over ../rbc/lib/seq.js. Film.seq(root, spec) takes Seq's spec with
   `rows` in place of `msgs`: a row is a Seq message ({ from, to, label, at, reply?, write? }; from === to
   draws a loop, used for a retry) or a band ({ band: 'The service restarts', at }) drawn across every lane
   at its row; { gap: true } leaves an empty row. The key reads "the workflow saves its state" and sits at keyAt: [x, y]. */
(function () {
  const M = Mock;
  M.style('fp-seq', `
    .sq .band { fill: rgba(241,241,241,.05); stroke: rgba(241,241,241,.35); stroke-width: 1.5; stroke-dasharray: 6 6; }
    .sq .band-l { font: 600 19px var(--sans); letter-spacing: .14em; text-transform: uppercase; fill: var(--white); paint-order: stroke; stroke: #000; stroke-width: 8px; stroke-linejoin: round; }
    .sq .hd .nm { font-size: 22px; }
    .sq .lb { font-size: 20px; }
  `);

  Film.seq = function (root, spec) {
    const first = spec.lanes[0].id;
    const msgs = spec.rows.map((r) => (r.band || r.gap ? { from: first, to: first, label: '', at: r.gap ? 1e9 : r.at, band: r.band } : r));
    const s = Seq.build(root, Object.assign({}, spec, { msgs }));
    s.key.innerHTML = '<span><b></b>the workflow saves its state</span><span><i></i>reply</span>';
    if (spec.keyAt) M.set(s.key, { left: spec.keyAt[0] + 'px', top: spec.keyAt[1] + 'px' });
    /* the same geometry Seq.build uses */
    const x0 = spec.x0 ?? 150, x1 = spec.x1 ?? 1770, top = spec.top ?? 270, headH = spec.headH ?? 100, row = spec.row ?? 44;
    const y0 = top + headH + 34;
    const bands = [];
    s.msgs.forEach((o, i) => {
      if (o.m.at >= 1e9) [o.path, o.head, o.lb, o.tok].forEach((el) => (el.style.display = 'none'));
      if (!o.m.band) return;
      [o.path, o.head, o.lb, o.tok].forEach((el) => (el.style.display = 'none'));
      const y = y0 + i * row + row * 0.55;
      const rect = M.svg('rect', { class: 'band', x: x0, y: y - row * 0.42, width: x1 - x0, height: row * 0.84, rx: 6 }, s.svg);
      const lb = M.svg('text', { class: 'band-l', x: (x0 + x1) / 2, y: y + 7, 'text-anchor': 'middle' }, s.svg);
      lb.textContent = o.m.band;
      bands.push({ at: o.m.at, rect, lb });
    });
    return {
      s, bands,
      at(t) {
        Seq.at(s, t);
        bands.forEach((b) => {
          const on = M.prog(t, b.at, 0.3), flash = M.ramp(t, b.at, b.at + 1.4, 0.15, 0.9);
          b.rect.style.opacity = on.toFixed(3);
          b.lb.style.opacity = on.toFixed(3);
          b.rect.style.fill = `rgba(241,241,241,${(0.05 + 0.18 * flash).toFixed(3)})`;
          b.rect.style.stroke = `rgba(241,241,241,${(0.35 + 0.65 * flash).toFixed(3)})`;
        });
      },
    };
  };
})();
