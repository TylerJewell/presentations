/* Every control leaves a verdict. One request's trace draws on (endpoint, workflow, agent, tools, model)
   with the controls in between; each control's verdict lands on its own row of the same record. */
registerSlide({
  id: 'verdicts',
  act: 'principles',
  title: 'Every control leaves a verdict',
  beats: [
    { t: 1.6, say: "Fourth: every time a control runs, it produces a verdict, and that verdict lives in the same record as the trace of what the system did." },
    { t: 4.2, say: "Here's one request. The workflow, the agent, its tool calls, its model call. And in between them, the controls. A loan application comes in, the workflow hands it to an agent, the agent looks up policy, checks affordability, and asks a model for a recommendation." },
    { t: 6.6, say: "Each control concludes. Upheld. Or breached: here the agent tried to move funds without a second approval, and the guardrail stopped it. And when a control can't tell, it says inconclusive, rather than guessing." },
    { t: 8.6, say: "Same record, written as it happens. Not a separate report that someone assembles later and asks you to trust. The evidence and the activity are the same thing. When someone asks how you know a control held last Tuesday, you don't reconstruct it. You look it up." },
  ],

  SPANS: [
    { k: 'Endpoint', n: 'POST /applications/app-58213', mono: true, d: 0, a: 0, b: 2.64 },
    { k: 'Workflow', n: 'Underwriting', d: 1, a: 0.02, b: 2.62 },
    { k: 'Sanitizer', n: 'ID number masked', d: 2, a: 0.05, b: 0.1, c: ['ok', 'Upheld'] },
    { k: 'Agent', n: 'Eligibility assessor', d: 2, a: 0.12, b: 1.9 },
    { k: 'Tool', n: 'Policy lookup', d: 3, a: 0.16, b: 0.42 },
    { k: 'Tool', n: 'Affordability check', d: 3, a: 0.45, b: 0.82 },
    { k: 'Model', n: 'Model call, via the gateway', d: 3, a: 0.86, b: 1.84 },
    { k: 'Guardrail', n: 'Transfer needs a second approval', d: 2, a: 1.92, b: 1.97, c: ['bad', 'Breached'] },
    { k: 'Evaluation', n: 'Income fully verified', d: 2, a: 2.0, b: 2.3, c: ['dim', 'Inconclusive'] },
    { k: 'Human', n: 'Underwriter signs off', d: 2, a: 2.33, b: 2.6, c: ['ok', 'Upheld'] },
  ],
  G: { kindX: 160, nameX: 352, barX: 1000, pxs: 190, rowY: 352, pitch: 57 },
  SWEEP: [1.8, 3.6], VERD: 4.5, ONE: 7.0,

  render(root) {
    Act3.mark(root, 4);
    const M = Mock, G = this.G;
    root.classList.add('sl-vd', 'a3');
    M.style('sl-vd', `
      .sl-vd .rec { left: 120px; top: 262px; width: 1680px; height: 676px; }
      .sl-vd .rhd { left: 160px; top: 290px; width: 1600px; display: flex; align-items: center; gap: 16px; }
      .sl-vd .rhd .k { font: 600 25px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; color: var(--ink-2); }
      .sl-vd .rhd .k.y { color: var(--yellow); }
      .sl-vd .rhd i { width: 12px; height: 12px; border-radius: 50%; background: var(--green); }
      .sl-vd .rhd .id { margin-left: auto; font: 500 24px/1 var(--mono); color: var(--ink-3); }
      .sl-vd .row { left: 140px; width: 1640px; height: 50px; border-radius: 10px; }
      .sl-vd .kd { font: 600 22px/50px var(--sans); letter-spacing: .1em; text-transform: uppercase; color: var(--ink-3); }
      .sl-vd .kd.ctl { color: var(--yellow); }
      .sl-vd .nm { font: 500 29px/50px var(--sans); color: var(--ink); white-space: nowrap; }
      .sl-vd .nm.mono { font: 500 25px/50px var(--mono); }
      .sl-vd .bar { height: 20px; border-radius: 4px; background: rgba(241,241,241,.42); }
      .sl-vd .bar.Agent { background: rgba(241,241,241,.62); } .sl-vd .bar.Model { background: rgba(241,241,241,.8); }
      .sl-vd .bar.ctl { background: var(--yellow); box-shadow: 0 0 16px rgba(255,206,74,.6); }
      .sl-vd .ph { width: 3px; background: var(--yellow); box-shadow: 0 0 14px rgba(255,206,74,.8); top: 340px; height: 580px; }
      .sl-vd .vc { left: 1532px; }
    `);
    M.dotGrid(root);
    this.head = Talk.lines(root.appendChild(M.html('<div class="tk-top"></div>')), ['Every control leaves <span class="tk-y">a verdict.</span>']);
    this.rec = M.html('<div class="rec tk-card"></div>');
    root.appendChild(this.rec);
    this.rhd = M.mount(root, `<div class="rhd"><i data-k="lv"></i><span class="k" data-k="k">One request</span><span class="id">trace 7f3a9c2e41d8</span></div>`);
    this.rows = this.SPANS.map((s, i) => {
      const y = G.rowY + i * G.pitch, ctl = !!s.c;
      const a = G.barX + s.a * G.pxs, w = Math.max(10, (s.b - s.a) * G.pxs);
      const row = M.html(`<div class="row" style="top:${y - 2}px"></div>`);
      const kd = M.html(`<div class="kd${ctl ? ' ctl' : ''}" style="left:${G.kindX}px;top:${y - 2}px">${s.k}</div>`);
      const nm = M.html(`<div class="nm${s.mono ? ' mono' : ''}" style="left:${G.nameX + s.d * 26}px;top:${y - 2}px">${s.n}</div>`);
      const bar = M.html(`<div class="bar ${ctl ? 'ctl' : s.k}" style="left:${a}px;top:${y + 13}px;width:${w}px"></div>`);
      const ch = ctl ? M.html(`<span class="tk-chip vc ${s.c[0]}" style="top:${y + 2}px">${s.c[1]}</span>`) : null;
      root.append(row, kd, nm, bar);
      if (ch) root.appendChild(ch);
      return { s, row, kd, nm, bar, ch, a, w, y, ctl };
    });
    this.ph = M.html('<div class="ph"></div>');
    root.appendChild(this.ph);
  },

  at(t) {
    const M = Mock, G = this.G, L = M.abs(t);
    Talk.linesAt(this.head, t, 0.1);
    M.rise(this.rec, t, 0.4, { dy: 14 });
    M.rise(this.rhd.root, t, 0.6, { dy: 10 });
    this.rhd.lv.style.opacity = (0.45 + 0.55 * M.wave(L, 1.4)).toFixed(3);

    /* the trace draws on behind a playhead */
    const [p0, p1] = this.SWEEP, end = G.barX + 2.64 * G.pxs;
    const phX = M.lerp(G.barX, end, M.ease.inOutCubic(M.prog(t, p0, p1 - p0)));
    M.set(this.ph, { left: phX.toFixed(1) + 'px', opacity: (t >= p0 && t < p1 + 0.4 ? 1 - M.prog(t, p1, 0.4) : 0).toFixed(3) });
    const one = M.p(t, this.ONE, 0.8);
    this.rows.forEach((r, i) => {
      const tIn = p0 + (r.s.a / 2.64) * (p1 - p0);
      const lab = M.prog(t, tIn - 0.15, 0.3);
      r.kd.style.opacity = lab; r.nm.style.opacity = lab;
      const w = M.clamp(phX - r.a, 0, r.w);
      r.bar.style.width = (t >= p0 && phX >= r.a ? Math.max(4, w) : 0).toFixed(1) + 'px';
      if (r.ch) {
        const ct = this.VERD + [0, 0, 0.0, 0, 0, 0, 0, 0.6, 1.2, 1.8][i];
        const p = M.prog(t, ct, 0.35);
        r.ch.style.opacity = p.toFixed(3);
        r.ch.style.transform = `scale(${(p < 1 ? 1.3 - 0.3 * M.ease.outCubic(p) : 1).toFixed(3)})`;
        const hl = M.ramp(t, ct, ct + (r.s.c[0] === 'bad' ? 3.4 : 1.6), 0.15, 0.8);
        const tone = r.s.c[0] === 'bad' ? '255,84,0' : r.s.c[0] === 'ok' ? '114,211,91' : '241,241,241';
        r.row.style.background = `rgba(${tone},${(0.12 * hl + 0.05 * one * (r.ctl ? 1 : 0)).toFixed(3)})`;
      } else r.row.style.background = '';
    });
    /* one record: the card is the evidence */
    this.rec.style.borderColor = one > 0 ? `color-mix(in srgb, rgba(255,206,74,.7) ${(100 * one).toFixed(0)}%, rgba(241,241,241,.16))` : '';
    this.rec.style.boxShadow = `0 0 ${(70 * one).toFixed(0)}px -20px rgba(255,206,74,${(0.6 * one).toFixed(3)})`;
    Talk.txt(this.rhd.k, t >= this.ONE ? 'One record: the trace and its verdicts' : 'One request');
    this.rhd.k.classList.toggle('y', t >= this.ONE);
  },
});
