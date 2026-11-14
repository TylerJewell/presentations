/* Tok: the shared pieces of the tokenomics film. Every piece is built once in render(root) and set for an
   instant t in at(t); nothing keeps state between frames, so the film scrubs and captures exactly.
   The classes live in ../film.css (prefix tk-). Stage px are the 1920x1080 stage.

   Registration
     Tok.register(def)          Fills act, title, duration, caption (the `say` line) and q (the question)
                                from the scene's row in scenes/index.js, then registers it. A scene file
                                holds only id, optional captionZone, render(root), at(t) and its own helpers.
     Tok.stub(id, opts)         The placeholder scene an act agent replaces: the question, then an empty
                                capture frame that names the scene. opts: { crumb }.
     Tok.SEVEN                  The seven questions of 0.2 and 5.2: [{ q, screen, icon }], in order.
     Tok.seven(parent, opts)    Seven question cards in a row. opts: { y, h }. Returns [{ root, q, screen }].

   The question: the executive's question in large type, then a small label once the answer is on screen
     const q = Tok.question(root, { text, start = 0.1, back = 2.4 });   back: null keeps it large
     q.at(t)                    Rises in over 0.8 s from `start`; from `back` it shrinks over 0.9 s to a
                                one-line label at the top left (y 30 to 80) and stays there.
     q.big, q.label             The two elements, for a scene that needs to dim or glow them.

   A console capture: a captured PNG in the console's browser chrome (Mock.consoleFrame)
     const c = Tok.capture(root, {
       states: [{ image: 'captures/cost-overview.png', url: 'localhost:9889/cost?…' }, …]   or image: '…',
       crumb: 'Optimize › Cost', active, title,      passed to Mock.consoleFrame for the chrome
       rect: [160, 100, 1600, 944],                  the frame on the stage; the image fills it below the chrome
       imageSize: [1920, 1080],                      the PNG's pixels (1600x900 at device scale 1.2)
       chip: 'sample' | 'illustrative' | 'demo' | false,   the chip at the top right (default 'sample')
     });
     c.at(t, {
       enter: 2.4,                                   the frame rises in from here (default 0)
       show: [{ t, state }],                         which state is on screen; each change cross-fades 0.6 s
       cam: [{ t, rect, dur?, caption? }],           Mock.camera keys
       cursor: [{ t, x, y, click?, glide?, hide? }], Mock.cursor keys
       spot: [{ t, rect | null }],                   Mock.spotlight keys
     })                                              returns the camera view
     Every x, y and rect given to c.at is in the capture's own pixels (the PNG, 1920x1080), so a position is
     read straight off the image. c.map(rect) and c.pt(x, y) convert to stage px for anything else.
     c.patch(rect, html, { bg })  An element over the image at a capture-pixel rect, inside the camera's
                                world, for a count-up or a highlight drawn on the screen; bg defaults to the
                                console surface. Its content is laid out in stage px.
     c.world, c.frame, c.chip   The camera layer, the Mock.consoleFrame result and the chip element.
     A missing image draws a dim placeholder naming its path, so a scene plays before its capture exists.

   The cost bridge: a waterfall from one period's cost to the next
     const b = Tok.bridge(root, { x, y, w, h, from: { label, value }, steps: [{ label, value }], to: { label, value } });
     b.at(t, { start = 0, step = 0.55, glow = [] })   The first bar rises at start, each step draws from the
                                level before it every `step` seconds with its value counting up, and the
                                total counts up last. glow[i] (0..1) lights column i (0 is `from`).
     b.cols                     [{ root, bar, val, lbl }] per column, from, the steps, to.
     The steps must sum from `from` to `to` to the cent; a mismatch is logged as an error at load.

   Chips
     Tok.chip(kind, { text, big })   HTML. 'sample' "Sample system and data" and 'illustrative' "Illustrative"
                                are the grey qualifier chip; 'demo' "Applied by the demo" is the purple chip for
                                an action the demo simulates.

   The loop: Specify, Agent SDK, Verify, Optimize on one rail (the family diagram of the main film)
     const L = Tok.loop(root, { y = 250, h = 380, rail = 700 });
     L.at(t, { start = 0, glow = [0, 0, 0, 0], words = [0, 0, 0], travel = null })
                                Cards rise and draw from `start`; glow[i] lights card i; words[k] lights the
                                rail's phrase k (one definition, one runtime, one evidence record); travel
                                (0..1) carries a change along the rail from Specify to Optimize.
     L.tags(i, labels)          Adds a row of small labels inside card i; returns their elements to rise.
     L.cards, L.cx              The card elements and their centre x.

   Money
     Tok.money(v, d = 2)        "$104.70"; a negative value in parentheses, "($3.10)".
     Tok.glow(el, g)            Sets --g (0..1) on any tk- card or column. */
window.Tok = (function () {
  const M = Mock;

  /* ---------- registration ---------- */
  function row(id) {
    const r = (window.FILM_SCENES || []).find((s) => s.id === id);
    if (!r) throw new Error(`scene ${id} is not in the timeline (scenes/index.js)`);
    return r;
  }
  function register(def) {
    const r = row(def.id);
    def.act = r.act; def.title = r.title; def.duration = r.duration; def.caption = r.say; def.q = r.q;
    registerScene(def);
  }

  const glow = (el, g) => el.style.setProperty('--g', M.clamp(g).toFixed(3));

  const money = (v, d = 2) => {
    const s = '$' + Math.abs(v).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
    return v < -1e-9 ? `(${s})` : s;
  };

  /* ---------- chips ---------- */
  const CHIP = {
    sample: ['Sample system and data', ''],
    illustrative: ['Illustrative', ''],
    demo: ['Applied by the demo', ' demo'],
  };
  function chip(kind, opts = {}) {
    const [text, cls] = CHIP[kind] || [kind, ''];
    return `<span class="tk-chip${cls}${opts.big ? ' big' : ''}">${opts.text || text}</span>`;
  }

  /* ---------- the question ---------- */
  const Q = { x: 160, top: 360, labelTop: 34, size: 84, labelSize: 30 };
  function question(parent, { text, start = 0.1, back = 2.4 }) {
    const r = M.mount(parent, `<div class="tk-q">
      <div class="big" data-k="big">${text}</div>
      <div class="label" data-k="label">${text}</div></div>`);
    return {
      big: r.big, label: r.label,
      at(t) {
        const o = M.rise(r.big, t, start);
        if (back == null || t < back) { r.label.style.opacity = 0; return; }
        const p = M.p(t, back, 0.9, 'inOutCubic');
        const s = M.lerp(1, Q.labelSize / Q.size, p);
        r.big.style.transform = `translate(0, ${((Q.labelTop - Q.top) * p).toFixed(1)}px) scale(${s.toFixed(4)})`;
        r.big.style.opacity = (o * (1 - M.prog(p, 0.45, 0.4))).toFixed(3);
        r.label.style.opacity = M.prog(p, 0.55, 0.45).toFixed(3);
      },
    };
  }

  /* ---------- the console capture ---------- */
  function capture(parent, opts = {}) {
    const rect = opts.rect || [160, 100, 1600, 944];
    const [IW, IH] = opts.imageSize || [1920, 1080];
    const CH = 44;
    const states = opts.states || [{ image: opts.image, url: opts.url }];
    const world = M.world(parent);
    const frame = M.consoleFrame(world, { crumb: opts.crumb || 'Optimize › Cost', active: opts.active, title: opts.title, url: states[0].url, rect, scale: opts.scale });
    const shell = frame.el.querySelector('.mk-console');
    if (shell) shell.remove();
    const urlEl = frame.el.querySelector('.chrome .url');
    const area = M.mount(frame.el, `<div class="tk-shot" style="height:${rect[3] - CH}px"></div>`).root;
    const imgs = states.map((s) => {
      const box = M.mount(area, `<div class="tk-img"><div class="miss"><b>Capture to come</b><span>${s.image || opts.title || ''}</span></div></div>`).root;
      if (s.image) {
        const im = document.createElement('img');
        im.alt = '';
        im.onerror = () => { im.remove(); box.classList.add('missing'); };
        im.src = s.image;
        box.appendChild(im);
      } else box.classList.add('missing');
      return box;
    });
    const kx = rect[2] / IW, ky = (rect[3] - CH) / IH;
    const pt = (x, y) => [rect[0] + x * kx, rect[1] + CH + y * ky];
    const map = (r) => (r ? [...pt(r[0], r[1]), r[2] * kx, r[3] * ky] : null);
    const cur = M.cursor(world), spot = M.spotlight(world);
    const chipEl = opts.chip === false ? null : M.mount(parent, `<div class="tk-chiptop">${chip(opts.chip || 'sample')}</div>`).root;

    return {
      world, frame, chip: chipEl, map, pt,
      patch(r, html, o = {}) {
        const [x, y, w, h] = map(r);
        const el = M.html(`<div class="tk-patch" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;background:${o.bg || 'var(--c-surface)'}">${html}</div>`);
        world.appendChild(el);
        return el;
      },
      at(t, k = {}) {
        M.rise(frame.el, t, k.enter || 0, { dy: 18 });
        if (chipEl) M.fade(chipEl, t, (k.enter || 0) + 0.3, 0.6);
        /* states: the newest key's state fades in over the one before it */
        const show = k.show || [{ t: -Infinity, state: 0 }];
        let i = -1;
        show.forEach((s, j) => { if (t >= s.t) i = j; });
        const now = i < 0 ? show[0].state : show[i].state;
        const prev = i > 0 ? show[i - 1].state : null;
        const p = i > 0 ? M.ease.css(M.prog(t, show[i].t, 0.6)) : 1;
        imgs.forEach((el, j) => {
          const o = j === now ? p : j === prev ? 1 : 0;
          el.style.opacity = o.toFixed(3);
          el.style.zIndex = j === now ? 2 : 1;
        });
        const url = (p < 0.5 && prev != null ? states[prev] : states[now]).url;
        if (url && urlEl.textContent !== url) urlEl.textContent = url;
        const conv = (keys, f) => (keys || []).map((x) => Object.assign({}, x, f(x)));
        const view = M.camera(world, t, conv(k.cam, (x) => ({ rect: map(x.rect) })));
        cur.at(t, conv(k.cursor, (x) => { const [sx, sy] = pt(x.x, x.y); return { x: sx, y: sy }; }));
        spot.at(t, conv(k.spot, (x) => ({ rect: map(x.rect) })));
        return view;
      },
    };
  }

  /* ---------- the cost bridge ---------- */
  function bridge(parent, { x, y, w, h, from, steps, to }) {
    let level = from.value;
    const runs = [from.value];
    steps.forEach((s) => { level += s.value; runs.push(level); });
    if (to && Math.abs(level - to.value) > 0.005) console.error(`Tok.bridge: the steps reach ${money(level)}, not ${money(to.value)}`);
    const end = to ? to.value : level;
    const hi = Math.max(...runs, end), loRun = Math.min(...runs, end);
    const lo = Math.max(0, loRun - 0.6 * (hi - loRun || hi));
    const PH = h - 120;                                            /* plot height; labels take the rest */
    const yOf = (v) => 56 + PH * (1 - (v - lo) / (hi - lo));
    const cols = [from, ...steps, to || { label: 'Total', value: end }];
    const n = cols.length, cw = w / n, bw = Math.min(110, cw * 0.62);
    const root = M.mount(parent, `<div class="tk-bridge" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px"></div>`).root;
    const svg = M.svg('svg', { class: 'links', viewBox: `0 0 ${w} ${h}`, width: w, height: h }, root);
    const out = cols.map((c, i) => {
      const kind = i === 0 || i === n - 1 ? 'total' : c.value < 0 ? 'down' : 'up';
      const a = i === 0 || i === n - 1 ? lo : runs[i - 1], b = i === 0 ? runs[0] : i === n - 1 ? end : runs[i];
      const top = yOf(Math.max(a, b)), bot = yOf(Math.min(a, b));
      const col = M.mount(root, `<div class="tk-col ${kind}" style="left:${i * cw}px;width:${cw}px">
        <div class="val" data-k="val" style="top:${top - 44}px"></div>
        <div class="bar" data-k="bar" style="left:${(cw - bw) / 2}px;width:${bw}px;top:${top}px;height:${Math.max(3, bot - top)}px"></div>
        <div class="lbl" data-k="lbl" style="top:${h - 56}px">${c.label}</div></div>`);
      if (i < n - 1) {
        const ly = yOf(i === 0 ? runs[0] : runs[i]);
        col.link = M.svg('line', { x1: i * cw + (cw + bw) / 2, x2: (i + 1) * cw + (cw - bw) / 2, y1: ly, y2: ly }, svg);
      }
      col.value = c.value; col.kind = kind; col.grow = b >= a ? 'up' : 'down';
      return col;
    });
    return {
      root, cols: out,
      at(t, { start = 0, step = 0.55, glow: g = [] } = {}) {
        out.forEach((c, i) => {
          const s = start + i * step;
          const p = M.p(t, s, 0.7, 'outCubic');
          c.root.style.opacity = M.prog(t, s - 0.05, 0.25).toFixed(3);
          c.bar.style.transformOrigin = c.grow === 'up' ? '50% 100%' : '50% 0';
          c.bar.style.transform = `scaleY(${Math.max(0.001, p).toFixed(3)})`;
          M.countUp(c.val, t, s, 0.7, 0, c.value, (v) => money(v));
          M.rise(c.lbl, t, s, { dy: 10 });
          if (c.link) M.draw(c.link, t, s + 0.5, 0.4);
          glow(c.root, g[i] || 0);
        });
      },
    };
  }

  /* ---------- the loop ---------- */
  function loop(parent, { y = 250, h = 380, rail = 700 } = {}) {
    const W = 360, G = 40, X0 = 180;
    const cx = M.PRODUCTS.map((_, i) => X0 + i * (W + G) + W / 2);
    const cards = M.PRODUCTS.map((p, i) => {
      const el = M.productCard(parent, p);
      el.classList.add('tk-pcard');
      M.set(el, { left: X0 + i * (W + G) + 'px', top: y + 'px', height: h + 'px' });
      return el;
    });
    const svg = M.html(`<svg class="tk-loopsvg" viewBox="0 0 1920 1080">${cx.map((x) => `<line class="cn" x1="${x}" x2="${x}" y1="${y + h}" y2="${rail}"/>`).join('')}</svg>`);
    parent.appendChild(svg);
    const cn = [...svg.querySelectorAll('.cn')];
    const railEl = M.rail(parent, { style: { left: X0 + 'px', width: 4 * W + 3 * G + 'px', top: rail - 1 + 'px', height: '3px' } });
    const words = M.mount(parent, `<div class="tk-words" style="top:${rail + 34}px"><span data-k="w0">One definition</span><i>·</i><span data-k="w1">one runtime</span><i>·</i><span data-k="w2">one evidence record</span></div>`);
    const packet = M.html('<div class="tk-packet"><i></i><i></i></div>');
    parent.appendChild(packet);
    return {
      cards, cx,
      tags(i, labels) {
        const r = M.html(`<div class="tk-tags">${labels.map((l) => `<span>${l}</span>`).join('')}</div>`);
        cards[i].appendChild(r);
        return [...r.children];
      },
      at(t, { start = 0, glow: g = [0, 0, 0, 0], words: wl = [0, 0, 0], travel = null } = {}) {
        cards.forEach((c, i) => {
          M.rise(c, t, start + 0.15 + i * 0.12);
          M.cardDraw(c, t, start + 0.45 + i * 0.12);
          M.cardGlow(c, g[i] || 0);
          M.draw(cn[i], t, start + 0.9 + i * 0.1, 0.5);
          cn[i].classList.toggle('hot', (g[i] || 0) > 0.5);
        });
        M.railGrow(railEl, t, start + 1.0, 1.2);
        M.railAt(railEl, M.abs(t), 10);
        M.rise(words.root, t, start + 1.6, { dy: 10 });
        [0, 1, 2].forEach((k) => words['w' + k].style.setProperty('--l', M.clamp(wl[k] || 0).toFixed(3)));
        if (travel == null) { packet.style.opacity = 0; return; }
        const px = M.lerp(cx[0], cx[3], M.clamp(travel));
        M.set(packet, { opacity: (M.prog(travel, 0, 0.04) * (1 - M.prog(travel, 0.97, 0.03))).toFixed(3), transform: `translate(${px.toFixed(1)}px, ${rail}px)` });
      },
    };
  }

  /* ---------- the seven questions ---------- */
  const ICON = {
    overview: ['M8 10h20v16H8z', 'M36 10h20v16H36z', 'M8 34h20v16H8z', 'M36 34h20v16H36z'],
    costs: ['M10 54V30', 'M22 54V18', 'M34 54V36', 'M46 54V24', 'M6 54h52'],
    compare: ['M8 52V28h8v24', 'M16 28h8v-8', 'M24 20h8v6', 'M32 26h8v-12', 'M40 14h8V52h8V14', 'M6 54h52'],
    savings: ['M10 16h28l16 16-16 16H10z', 'M24 32h10'],
    frontier: ['M8 54V8', 'M8 54h48', 'M14 46c10-4 18-14 24-24s10-12 14-12', 'M20 40h.1', 'M32 30h.1', 'M44 22h.1'],
    ledger: ['M10 12h44', 'M10 26h44', 'M10 40h44', 'M10 54h44', 'M44 19l3 3 6-6'],
    budgets: ['M8 50c4-14 14-26 24-26s20 12 24 26', 'M32 50l10-16', 'M6 54h52'],
  };
  const SEVEN = [
    { q: 'What did we spend?', screen: 'Overview', icon: 'overview' },
    { q: 'Where did the money go?', screen: 'Costs', icon: 'costs' },
    { q: 'What changed since the last period, and why?', screen: 'Compare', icon: 'compare' },
    { q: 'What is avoidable?', screen: 'Savings', icon: 'savings' },
    { q: 'If we move, does quality hold?', screen: 'Frontier', icon: 'frontier' },
    { q: 'Did the saving happen?', screen: 'Ledger', icon: 'ledger' },
    { q: 'Are we on plan?', screen: 'Budgets', icon: 'budgets' },
  ];
  function seven(parent, { y = 490, h = 310 } = {}) {
    const CW = 210, GAP = (1600 - 7 * CW) / 6;
    return SEVEN.map((s, i) => M.mount(parent, `<div class="tk-qcard" style="left:${160 + i * (CW + GAP)}px;top:${y}px;width:${CW}px;height:${h}px">
      <svg class="ic" viewBox="0 0 64 64">${ICON[s.icon].map((d) => `<path d="${d}"/>`).join('')}</svg>
      <b data-k="q">${s.q}</b><span class="scr" data-k="screen">${s.screen}</span></div>`));
  }

  /* ---------- the placeholder scene ---------- */
  function stub(id, { crumb = 'Optimize › Cost' } = {}) {
    register({
      id,
      render(root) {
        M.dotGrid(root);
        this.c = capture(root, { crumb, title: `${this.title}: scene to come` });
        this.question = question(root, { text: this.q });
      },
      at(t) {
        this.question.at(t);
        this.c.at(t, { enter: 2.6 });
      },
    });
  }

  return { register, stub, question, capture, bridge, chip, loop, seven, SEVEN, money, glow };
})();
