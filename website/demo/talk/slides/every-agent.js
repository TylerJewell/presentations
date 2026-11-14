/* Every agent, honestly. Agents built on Akka carry their controls in the runtime. Agents built elsewhere
   call models and tools directly, until their calls are routed through a gateway where the same controls
   apply. Then the limits: an in-process call never crosses the gateway, and some controls (build-time
   checks, scheduled evaluations, sign-off inside a workflow) are outside any gateway. */
registerSlide({
  id: 'every-agent',
  act: 'principles',
  title: 'Every agent, honestly',
  beats: [
    { t: 2.2, say: "Sixth: governance has to reach every agent, not just the ones built on our platform. For agents that run on Akka, the controls run inside the runtime, right next to the agent. A control is part of how the agent runs, not a filter bolted on afterwards." },
    { t: 4.2, say: "But most of the agents a company runs aren't ours. They're bought, inherited, or built on something else, and they talk to models and tools directly. A vendor's agent inside a SaaS product. A copilot. A script a team wrote last year." },
    { t: 6.6, say: "For those, you route their model and tool calls through a gateway, and the same controls apply to that traffic, with verdicts in the same record." },
    { t: 9.2, say: "I want to be precise about the limit. A gateway sees what crosses it. It can't see a tool call that never leaves the agent's own process. It can't run a build-time check, a scheduled evaluation, or a human sign-off in the middle of a workflow. It reaches most controls, not all of them. Anyone who tells you their gateway governs everything is selling something." },
  ],

  AG: [{ n: 'Vendor agent', y: 318, to: 0 }, { n: 'Inherited agent', y: 508, to: 1 }, { n: 'Built elsewhere', y: 698, to: 1 }],
  TG: [{ n: 'Models', y: 360 }, { n: 'Tools', y: 640 }],
  GW: [1268, 300, 128, 560],

  render(root) {
    Act3.mark(root, 6);
    const M = Mock;
    root.classList.add('sl-ea', 'a3');
    M.style('sl-ea', `
      .sl-ea .ak { left: 150px; top: 300px; width: 560px; height: 560px; padding: 30px 32px; }
      .sl-ea .ak .k { font: 600 25px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; color: var(--yellow); }
      .sl-ea .ak .cap { position: absolute; left: 32px; right: 32px; bottom: 30px; font: 500 30px/1.25 var(--sans); color: var(--ink-2); }
      .sl-ea .aa { left: 210px; width: 440px; height: 128px; border-radius: 16px; display: flex; align-items: center; padding: 0 28px; gap: 16px;
        background: #121216; box-shadow: inset 0 0 0 2px rgba(255,206,74,.7), 0 0 0 10px rgba(255,206,74,.08), 0 0 0 12px rgba(255,206,74,.35); }
      .sl-ea .aa b { font: 700 32px/1.1 var(--sans); flex: 1; }
      .sl-ea .aa .g { display: flex; gap: 8px; }
      .sl-ea .aa .g svg { width: 30px; height: 30px; overflow: visible; }
      .sl-ea .aa .g path { fill: none; stroke: var(--yellow); stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; }
      .sl-ea .ag { left: 860px; width: 300px; height: 112px; padding: 0 24px; display: flex; align-items: center; border-radius: 16px; background: #121216; box-shadow: inset 0 0 0 2px var(--line); font: 700 31px/1.1 var(--sans); }
      .sl-ea .tg { left: 1520px; width: 250px; height: 130px; display: flex; align-items: center; justify-content: center; border-radius: 16px; background: #121216; box-shadow: inset 0 0 0 2px var(--line); font: 700 34px/1 var(--sans); }
      .sl-ea .gw { border-radius: 18px; background: linear-gradient(180deg, rgba(255,206,74,.16), rgba(255,206,74,.05)), #0e0e11; box-shadow: inset 0 0 0 3px rgba(255,206,74,.8), 0 0 60px -16px rgba(255,206,74,.7); }
      .sl-ea .gw .lab { position: absolute; left: 50%; top: -48px; transform: translateX(-50%); font: 700 30px/1 var(--sans); letter-spacing: .12em; text-transform: uppercase; color: var(--yellow); white-space: nowrap; }
      .sl-ea svg.ln { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }
      .sl-ea .ln .d { fill: none; stroke: rgba(241,241,241,.4); stroke-width: 3; stroke-dasharray: 8 8; }
      .sl-ea .ln .v { fill: none; stroke: rgba(255,206,74,.6); stroke-width: 3; }
      .sl-ea .ln .dot { fill: #f1f1f1; } .sl-ea .ln .vdot { fill: var(--yellow); }
      .sl-ea .ln .loop { fill: none; stroke: var(--red); stroke-width: 3.5; stroke-dasharray: 7 7; }
      .sl-ea .ok { width: 40px; height: 40px; margin: -20px 0 0 -20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font: 700 24px/1 var(--sans); color: var(--green); background: #0c1a0c; box-shadow: inset 0 0 0 2px var(--green); }
      .sl-ea .inv { font: 600 25px/1.15 var(--sans); color: var(--red); white-space: nowrap; }
      .sl-ea .most { left: 1192px; top: 880px; width: 280px; text-align: center; font: 700 28px/1.1 var(--sans); color: var(--yellow); }
      .sl-ea .out { left: 150px; top: 890px; display: flex; flex-wrap: wrap; align-items: center; gap: 14px 16px; width: 1040px; }
      .sl-ea .out .k { flex-basis: 100%; font: 600 24px/1 var(--sans); letter-spacing: .12em; text-transform: uppercase; color: var(--red); white-space: nowrap; }
    `);
    M.dotGrid(root);
    this.head = Talk.lines(root.appendChild(M.html('<div class="tk-top"></div>')), ['Governance reaches <span class="tk-y">every agent.</span>']);
    const gl = (k) => `<svg viewBox="0 0 64 64">${Talk.GLYPH[k].map((p) => `<path d="${p}"/>`).join('')}</svg>`;
    this.ak = M.mount(root, `<div class="ak tk-card"><div class="k">Built on Akka</div><div class="cap">Controls run in the runtime, next to the agent</div></div>`).root;
    this.aa = ['Loan assistant', 'Support agent'].map((n, i) => {
      const el = M.html(`<div class="aa" style="top:${396 + i * 180}px"><b>${n}</b><span class="g">${gl('Guardrail')}${gl('Sanitizer')}${gl('Human')}</span></div>`);
      root.appendChild(el);
      return el;
    });
    this.svg = M.html('<svg class="ln" viewBox="0 0 1920 1080"></svg>');
    root.appendChild(this.svg);
    const [gx, gy, gw, gh] = this.GW;
    this.gw = M.mount(root, `<div class="gw" style="left:${gx}px;top:${gy}px;width:${gw}px;height:${gh}px"><div class="lab">Gateway</div></div>`).root;
    this.ag = this.AG.map((a) => { const el = M.html(`<div class="ag" style="top:${a.y}px">${a.n}</div>`); root.appendChild(el); return el; });
    this.tg = this.TG.map((d) => { const el = M.html(`<div class="tg" style="top:${d.y}px">${d.n}</div>`); root.appendChild(el); return el; });
    this.links = this.AG.map((a, i) => {
      const ay = a.y + 56, ty = this.TG[a.to].y + 65, my = M.lerp(ay, ty, 0.5);
      const d = M.svg('path', { class: 'd', d: `M1160,${ay} C1340,${ay} 1340,${ty} 1520,${ty}` }, this.svg);
      const v1 = M.svg('path', { class: 'v', d: `M1160,${ay} L${gx},${ay}` }, this.svg);
      const v2 = M.svg('path', { class: 'v', d: `M${gx + gw},${ay} C${gx + gw + 60},${ay} ${1460},${ty} 1520,${ty}` }, this.svg);
      const dots = [0, 1].map(() => M.svg('circle', { r: 7 }, this.svg));
      const ok = M.html(`<div class="ok" style="left:${gx + gw / 2}px;top:${ay}px">✓</div>`);
      root.appendChild(ok);
      return { d, v1, v2, dots, ok, ay, ty, my, i };
    });
    /* the limit: a call that stays inside the agent's own process */
    const lx = 1214, ly = this.AG[2].y + 84;
    this.loop = M.svg('path', { class: 'loop', d: `M${lx - 46},${ly - 20} C${lx + 10},${ly - 40} ${lx + 40},${ly} ${lx + 20},${ly + 22} C${lx},${ly + 44} ${lx - 30},${ly + 30} ${lx - 46},${ly + 10}` }, this.svg);
    this.inv = M.mount(root, `<div class="inv" style="left:860px;top:${this.AG[2].y + 128}px">In-process call: not visible</div>`).root;
    this.most = M.mount(root, `<div class="most">Most controls,<br>not all</div>`).root;
    this.out = M.mount(root, `<div class="out"><span class="k">Outside any gateway</span><span class="tk-chip dim">Build-time checks</span><span class="tk-chip dim">Scheduled evaluations</span><span class="tk-chip dim">Sign-off mid-workflow</span></div>`).root;
  },

  at(t) {
    const M = Mock, L = M.abs(t);
    Talk.linesAt(this.head, t, 0.1);
    M.rise(this.ak, t, 0.4);
    this.aa.forEach((el, i) => {
      M.rise(el, t, 0.7 + i * 0.15);
      /* the runtime's controls pulse around each Akka agent */
      const w = M.wave(L + i * 0.8, 2.2);
      el.style.boxShadow = `inset 0 0 0 2px rgba(255,206,74,.7), 0 0 0 10px rgba(255,206,74,${(0.05 + 0.07 * w).toFixed(3)}), 0 0 0 12px rgba(255,206,74,${(0.25 + 0.3 * w).toFixed(3)})`;
    });
    const others = 2.4, gwIn = 4.6, lim = 7.0;
    this.ag.forEach((el, i) => M.rise(el, t, others + i * 0.12));
    this.tg.forEach((el, i) => M.rise(el, t, others + 0.3 + i * 0.12));
    const g = M.p(t, gwIn, 0.8);
    this.gw.style.opacity = M.ease.css(M.prog(t, gwIn, 0.6)).toFixed(3);
    this.gw.style.transform = `scaleY(${(0.6 + 0.4 * g).toFixed(3)})`;
    this.links.forEach((k) => {
      M.draw(k.d, t, others + 0.6 + k.i * 0.12, 0.6);
      k.d.style.strokeDasharray = '8 8';
      k.d.style.opacity = (M.prog(t, others + 0.6, 0.2) * (1 - M.prog(t, gwIn, 0.5))).toFixed(3);
      M.draw(k.v1, t, gwIn + 0.4, 0.4); M.draw(k.v2, t, gwIn + 0.7, 0.5);
      /* traffic: direct before the gateway, through it after; each call passing the gateway is checked */
      const via = t >= gwIn + 1.0;
      const on = via ? M.prog(t, gwIn + 1.0, 0.3) : M.prog(t, others + 1.1, 0.3) * (1 - M.prog(t, gwIn, 0.3));
      k.dots.forEach((d, j) => {
        const u = (L * 0.32 + j / 2 + k.i * 0.27) % 1;
        let pt;
        if (!via) { const len = k.d._len || k.d.getTotalLength(); pt = k.d.getPointAtLength(u * len); }
        else if (u < 0.45) { const len = k.v1._len || k.v1.getTotalLength(); pt = k.v1.getPointAtLength((u / 0.45) * len); }
        else if (u < 0.55) pt = { x: M.lerp(this.GW[0], this.GW[0] + this.GW[2], (u - 0.45) / 0.1), y: k.ay };
        else { const len = k.v2._len || k.v2.getTotalLength(); pt = k.v2.getPointAtLength(((u - 0.55) / 0.45) * len); }
        d.setAttribute('cx', pt.x.toFixed(1)); d.setAttribute('cy', pt.y.toFixed(1));
        d.setAttribute('class', via ? 'vdot' : 'dot');
        d.style.opacity = (on * Math.min(1, 6 * u, 6 * (1 - u))).toFixed(3);
      });
      /* a verdict ticks at the gateway as each call passes */
      const ph = (L * 0.32 + k.i * 0.27) % 0.5;
      const flash = via ? Math.max(0, 1 - Math.abs(ph - 0.05) / 0.08) : 0;
      k.ok.style.opacity = (g * (0.35 + 0.65 * flash) * M.prog(t, gwIn + 1.0, 0.3)).toFixed(3);
      k.ok.style.transform = `scale(${(0.9 + 0.25 * flash).toFixed(3)})`;
    });
    /* the limits */
    M.draw(this.loop, t, lim, 0.7);
    this.loop.style.strokeDasharray = '7 7';
    M.march(this.loop, L, 18);
    M.rise(this.inv, t, lim + 0.4, { dy: 10 });
    M.rise(this.most, t, lim + 0.9, { dy: 10 });
    M.rise(this.out, t, lim + 1.3, { dy: 10 });
  },
});
