/* The control-point line: a process line a packet of text travels along, past numbered control points,
   with the model as a box on the line and an authorization control on a branch below it.

   const cl = Film.controlLine(root, { x0, x1, y, points: [{ id, x, n, kind, name, sub }], model: { x, label }, auth: { x, kind, name, sub } });
   cl.packet(p)        places the packet at fraction p of the line (hidden outside 0..1)
   cl.lit(id, g)       glows a point's label (0..1); ids include 'model' and 'auth'
   cl.show(id, o)      a point's label opacity (0..1), for rising labels in as they are named
   cl.mark(id, word)   a status chip under a point (Film.chip words), or null to clear
   cl.x(id)            a point's x, for scenes that move the packet to it */
(function () {
  const M = Mock;
  const PERSON = '<svg viewBox="0 0 44 44" width="44" height="44"><circle class="person" cx="22" cy="14" r="8"/><path class="person" d="M6 42 C6 28 38 28 38 42"/></svg>';

  Film.controlLine = function (parent, spec) {
    const { x0, x1, y } = spec;
    const root = M.html('<div class="fp-cl" style="left:0;top:0;width:1920px;height:1080px"></div>');
    parent.appendChild(root);
    const svg = M.html('<svg viewBox="0 0 1920 1080"></svg>');
    root.appendChild(svg);
    const base = M.svg('line', { class: 'base', x1: x0, x2: x1, y1: y, y2: y }, svg);
    const pts = {};
    const label = (p, top, extra = '') => M.mount(root, `<div class="pt${extra}" style="left:${p.x}px;top:${top}px" data-k="root">
        <div class="k">${p.kind}</div><div class="n">${p.name}</div>${p.sub ? `<div class="s">${p.sub}</div>` : ''}</div>`).root;
    spec.points.forEach((p) => {
      const ring = M.svg('circle', { class: 'ring', cx: p.x, cy: y, r: 18 }, svg);
      const num = M.svg('text', { class: 'num', x: p.x, y: y + 6.5, 'text-anchor': 'middle' }, svg);
      num.textContent = p.n ?? '';
      const lb = label(p, y - 146);
      const mark = M.html(`<div class="mark" style="left:${p.x}px;top:${y + 36}px"></div>`);
      root.appendChild(mark);
      pts[p.id] = { x: p.x, ring, num, lb, mark, word: null };
    });
    let model = null;
    if (spec.model) {
      const m = spec.model, w = 190, h = 72;
      const box = M.svg('rect', { class: 'model', x: m.x - w / 2, y: y - h / 2, width: w, height: h, rx: 12 }, svg);
      const txt = M.svg('text', { class: 'mt', x: m.x, y: y + 9, 'text-anchor': 'middle' }, svg);
      txt.textContent = m.label || 'The model';
      const mark = M.html(`<div class="mark" style="left:${m.x}px;top:${y + 48}px"></div>`);
      root.appendChild(mark);
      model = { x: m.x, box, txt, mark, word: null, lb: null };
      pts.model = model;
    }
    if (spec.auth) {
      const a = spec.auth, by = y + 190;
      const br = M.svg('line', { class: 'branch', x1: a.x, x2: a.x, y1: y + 20, y2: by - 30 }, svg);
      const who = M.html(`<div class="who" style="left:${a.x}px;top:${by - 30}px">${PERSON}</div>`);
      root.appendChild(who);
      const lb = label(a, by + 22);
      const mark = M.html(`<div class="mark" style="left:${a.x + 150}px;top:${by - 10}px"></div>`);
      root.appendChild(mark);
      pts.auth = { x: a.x, br, who, lb, mark, word: null };
    }
    const packet = M.html('<div class="packet"><i></i><i></i></div>');
    root.appendChild(packet);

    return {
      el: root, svg, base, pts,
      x: (id) => pts[id].x,
      packet(p) {
        const on = p >= 0 && p <= 1;
        packet.style.opacity = on ? 1 : 0;
        if (on) packet.style.transform = `translate(${(x0 + p * (x1 - x0)).toFixed(1)}px, ${y}px)`;
      },
      lit(id, g) {
        const o = pts[id]; if (!o) return;
        g = M.clamp(g);
        if (o.lb) o.lb.style.setProperty('--g', g.toFixed(3));
        if (o.ring) { o.ring.style.stroke = `rgba(${g > 0 ? '255,206,74' : '241,241,241'},${(0.5 + 0.5 * g).toFixed(2)})`; o.ring.style.filter = g > 0.01 ? `drop-shadow(0 0 ${(10 * g).toFixed(1)}px rgba(255,206,74,.8))` : ''; }
        if (o.box) { o.box.style.stroke = `rgba(${g > 0 ? '255,206,74' : '241,241,241'},${(0.35 + 0.65 * g).toFixed(2)})`; o.box.style.filter = g > 0.01 ? `drop-shadow(0 0 ${(12 * g).toFixed(1)}px rgba(255,206,74,.7))` : ''; }
        if (o.who) o.who.style.filter = g > 0.01 ? `drop-shadow(0 0 ${(10 * g).toFixed(1)}px rgba(255,206,74,.8))` : '';
      },
      show(id, o) {
        const p = pts[id]; if (!p) return;
        if (p.lb) p.lb.style.opacity = M.clamp(o).toFixed(3);
        if (p.ring) { p.ring.style.opacity = M.clamp(o).toFixed(3); p.num.style.opacity = M.clamp(o).toFixed(3); }
        if (p.box) { p.box.style.opacity = M.clamp(o).toFixed(3); p.txt.style.opacity = M.clamp(o).toFixed(3); }
        if (p.br) { p.br.style.opacity = M.clamp(o).toFixed(3); p.who.style.opacity = M.clamp(o).toFixed(3); }
      },
      mark(id, word) {
        const p = pts[id]; if (!p || p.word === word) return;
        p.word = word;
        p.mark.innerHTML = word ? Film.chip(word) : '';
      },
    };
  };
})();
