/* From governing the model to governing the system. The camera opens close on a model and its model card,
   pulls back to the system around it, controls attach at the joints, and the model is swapped while the
   controls keep holding. */
registerSlide({
  id: 'system',
  act: 'shape',
  title: 'From the model to the system',
  beats: [
    { t: 1.8, say: "The third shift is from governing the model to governing the system. Much of today's effort goes into model cards, benchmarks and bias tests." },
    { t: 4.4, say: "The model is one part. Around it are prompts, tools, data, workflows, other agents and people, and next month the model may come from another vendor." },
    { t: 7.0, say: "The risk lives in what the system does with the model's answer, so the controls go at its joints. Mask ID numbers on the way in. Score every recommendation. Hold a transfer for a second approval. Have a person sign every adverse decision." },
    { t: 9.4, say: "Now swap the model. The controls still hold, because they belong to the system, and the system is what customers and regulators meet." },
  ],

  NODES: {
    customer: { x: 290, y: 680, k: 'Channel', n: 'Applicant' },
    prompt: { x: 860, y: 410, k: 'Prompt', n: 'Instructions' },
    agent: { x: 860, y: 680, k: 'Agent', n: 'Loan assistant', hot: true },
    data: { x: 430, y: 930, k: 'Data', n: 'Applicant record' },
    model: { x: 1400, y: 430, k: 'Model', n: 'Model A', model: true },
    tools: { x: 1400, y: 930, k: 'Tools', n: 'Funds transfer' },
    person: { x: 1680, y: 680, k: 'Person', n: 'Underwriter' },
  },
  EDGES: [['customer', 'agent'], ['prompt', 'agent'], ['data', 'agent'], ['agent', 'model'], ['agent', 'tools'], ['agent', 'person']],
  CONTROLS: [
    { at: [600, 812], type: 'Sanitizer', n: 'Masks ID numbers' },
    { at: [1135, 545], type: 'Evaluation', n: 'Scores every recommendation' },
    { at: [1135, 822], type: 'Guardrail', n: 'Second approval for transfers' },
    { at: [1270, 683], type: 'Human', n: 'Signs adverse decisions' },
  ],

  render(root) {
    const M = Mock;
    root.classList.add('sl-sys');
    M.style('sl-sys', `
      .sl-sys svg.ed { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }
      .sl-sys .e { fill: none; stroke: rgba(241,241,241,.38); stroke-width: 3; }
      .sl-sys .d { fill: var(--yellow); }
      .sl-sys .nd { width: 304px; height: 104px; margin: -52px 0 0 -152px; padding: 18px 24px; display: flex; flex-direction: column; justify-content: center; gap: 8px; }
      .sl-sys .nd .k { font: 600 22px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; color: var(--ink-2); }
      .sl-sys .nd .n { position: relative; height: 34px; }
      .sl-sys .nd .n span { position: absolute; left: 0; top: 0; font: 700 32px/1.05 var(--sans); letter-spacing: -.015em; white-space: nowrap; }
      .sl-sys .nd.model .k { color: var(--yellow); }
      .sl-sys .mc { left: 1580px; top: 340px; width: 280px; padding: 22px 24px; display: flex; flex-direction: column; gap: 14px; }
      .sl-sys .mc .k { font: 600 22px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; color: var(--ink-2); }
      .sl-sys .mc .r { display: flex; justify-content: space-between; font: 500 26px/1.1 var(--sans); }
      .sl-sys .mc .r b { color: var(--green); font-weight: 600; }
      .sl-sys .cb { display: flex; align-items: center; gap: 14px; padding: 12px 18px 12px 14px; border-radius: 14px; background: #121215; box-shadow: inset 0 0 0 2px rgba(255,206,74,.6), 0 10px 30px rgba(0,0,0,.6); white-space: nowrap; }
      .sl-sys .cb svg { width: 40px; height: 40px; overflow: visible; flex: none; }
      .sl-sys .cb svg path { fill: none; stroke: var(--yellow); stroke-width: 3.5; stroke-linecap: round; stroke-linejoin: round; }
      .sl-sys .cb .t { font: 600 20px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; color: var(--yellow); }
      .sl-sys .cb .n { font: 600 25px/1.1 var(--sans); color: var(--ink); margin-top: 6px; }
      .sl-sys .cb .ok { margin-left: 8px; width: 30px; height: 30px; border-radius: 50%; background: rgba(114,211,91,.16); color: var(--green); font: 700 20px/30px var(--sans); text-align: center; }
      .sl-sys .swap { left: 1270px; top: 318px; }
    `);
    M.dotGrid(root);
    this.head = Talk.lines(root.appendChild(M.html('<div class="tk-top"></div>')), ['From the model', '<span class="tk-y">to the system.</span>']);
    const w = (this.world = M.world(root));
    const svg = (this.svg = M.html('<svg class="ed" viewBox="0 0 1920 1080"></svg>'));
    w.appendChild(svg);
    const N = this.NODES;
    this.edges = this.EDGES.map(([a, b]) => {
      const A = N[a], B = N[b];
      const mx = (A.x + B.x) / 2;
      const d = `M${A.x},${A.y} C${mx},${A.y} ${mx},${B.y} ${B.x},${B.y}`;
      const p = M.svg('path', { class: 'e', d }, svg);
      const dots = [0, 1].map(() => M.svg('circle', { class: 'd', r: 5 }, svg));
      return { p, dots, a, b };
    });
    this.nodes = {};
    for (const [id, n] of Object.entries(N)) {
      const el = M.html(`<div class="nd tk-card${n.hot || n.model ? ' hot' : ''}${n.model ? ' model' : ''}" style="left:${n.x}px;top:${n.y}px"><div class="k">${n.k}</div><div class="n"><span>${n.n}</span>${n.model ? '<span class="b2">Model B</span>' : ''}</div></div>`);
      w.appendChild(el);
      this.nodes[id] = el;
    }
    this.mc = M.mount(w, `<div class="mc tk-card"><div class="k">Model card</div>
      <div class="r"><span>Benchmarks</span><b>✓</b></div><div class="r"><span>Bias tests</span><b>✓</b></div><div class="r"><span>Evaluations</span><b>✓</b></div></div>`).root;
    this.cbs = this.CONTROLS.map((c) => {
      const el = M.html(`<div class="cb"><svg viewBox="0 0 64 64">${Talk.GLYPH[c.type].map((p) => `<path d="${p}"/>`).join('')}</svg><div><div class="t">${c.type}</div><div class="n">${c.n}</div></div><span class="ok">✓</span></div>`);
      w.appendChild(el);
      return el;
    });
    this.swap = M.mount(w, `<div class="swap tk-chip y">Model replaced</div>`).root;
  },

  at(t) {
    const M = Mock, L = M.abs(t);
    if (!this.cpos) {
      this.cpos = this.CONTROLS.map((c) => c.at);
    }
    Talk.linesAt(this.head, t, 0.1);
    this.head.el.parentNode.style.opacity = 1;

    /* close on the model and its card, then pull back to the whole system */
    Talk.camera(this.world, t, [{ t: 0, rect: [1250, 330, 620, 270], dur: 0, max: 1.6 }, { t: 2.0, rect: null, dur: 1.5 }]);
    const reveal = (id) => (id === 'model' ? 0.2 : 2.3 + 0.12 * Object.keys(this.NODES).indexOf(id));
    for (const [id, el] of Object.entries(this.nodes)) M.rise(el, t, reveal(id), { dy: 14 });
    M.rise(this.mc, t, 0.5, { dy: 14 });
    this.mc.style.opacity *= 1 - 0.75 * M.prog(t, 3.0, 0.6);
    this.edges.forEach((e, i) => {
      M.draw(e.p, t, 2.6 + i * 0.1, 0.7);
      const on = M.prog(t, 3.4, 0.4);
      e.dots.forEach((d, k) => {
        const u = (L * 0.32 + k / 2 + i * 0.21) % 1, len = e.p._len || e.p.getTotalLength();
        const q = e.p.getPointAtLength(len * u);
        d.setAttribute('cx', q.x.toFixed(1)); d.setAttribute('cy', q.y.toFixed(1));
        d.style.opacity = (on * Math.min(1, 5 * u, 5 * (1 - u))).toFixed(3);
      });
    });

    /* controls at the joints */
    this.cbs.forEach((el, i) => {
      const [x, y] = this.cpos[i];
      el.style.left = x + 'px'; el.style.top = y + 'px';
      const a = M.p(t, 4.7 + i * 0.4, 0.6);
      el.style.opacity = M.ease.css(M.prog(t, 4.7 + i * 0.4, 0.4));
      el.style.transform = `translate(-50%, -50%) scale(${(0.9 + 0.1 * a).toFixed(3)})`;
      el.querySelector('svg').querySelectorAll('path').forEach((p, k) => M.draw(p, t, 4.9 + i * 0.4 + k * 0.06, 0.5));
      const ok = el.querySelector('.ok');
      const pulse = t >= 8.4 ? M.ramp(t, 8.4 + i * 0.15, 9.3 + i * 0.15, 0.2, 0.5) : 0;
      ok.style.opacity = (M.prog(t, 7.6, 0.4) * (0.85 + 0.15 * M.wave(L + i, 1.6))).toFixed(3);
      ok.style.transform = `scale(${(1 + 0.25 * pulse).toFixed(3)})`;
      el.style.boxShadow = `inset 0 0 0 2px rgba(255,206,74,.6), 0 0 ${(30 * pulse).toFixed(1)}px rgba(114,211,91,${(0.5 * pulse).toFixed(3)})`;
    });

    /* the model is replaced; the controls hold */
    const sw = M.p(t, 7.4, 0.7, 'inOutCubic');
    const m = this.nodes.model, [a, b] = m.querySelectorAll('.n span');
    a.style.opacity = 1 - sw; a.style.transform = `translateY(${(-24 * sw).toFixed(1)}px)`;
    b.style.opacity = sw; b.style.transform = `translateY(${(24 * (1 - sw)).toFixed(1)}px)`;
    m.style.boxShadow = `0 0 ${(70 * M.ramp(t, 7.3, 8.6, 0.3, 0.8)).toFixed(1)}px -10px rgba(255,206,74,.9)`;
    M.rise(this.swap, t, 7.6, { dy: 10 });
  },
});
