/* Five kinds of control. The corpus sorted by the kind of check each control needs, one kind per click,
   bars to scale: the gate (mostly documentation and attestation) dwarfs the four kinds that govern an
   agent while it runs. Figures: Akka regulation corpus, snapshot 2026-10 (research/corpus.md). */
registerSlide({
  id: 'five-types',
  act: 'principles',
  title: 'Five kinds of control',
  beats: [
    { t: 1.6, say: "Now sort every one of those controls by the kind of check it needs, and the first principle falls out. Every control is one of five kinds. That's not a theory. It's what you get when you sort seventeen hundred real obligations." },
    { t: 4.0, say: "Gates: a check that has to pass before something ships or carries on. Thirteen hundred and ninety-nine controls need one, and most of those are documentation and attestation. Write it down. Sign for it. Is the impact assessment on file? Has someone accountable signed it? Is the bias test current?" },
    { t: 5.4, say: "Sanitizers strip or mask data before it moves on, like an ID number removed before the model ever sees it. One hundred and twenty-three." },
    { t: 6.8, say: "Evaluations score behavior, live or in testing: performance, drift, fairness, incidents. Eighty-six." },
    { t: 8.2, say: "Guardrails allow or block an action at a boundary: what a model may say, which tools an agent may use. Seventy-two." },
    { t: 9.6, say: "And human controls give a named person authority over a decision, or the power to halt the system. Thirty-eight." },
    { t: 12.2, say: "So most of what the law asks for is evidence: documents and attestations, work your teams already know how to do. The smaller set, sanitizers, evaluations, guardrails and human authority, is where an agent's behavior is governed while it runs. That's where the old tools have nothing to offer. And policy isn't a sixth kind. Policy decides which of the five apply, and where." },
  ],

  TYPES: [
    { k: 'Gate', n: 1399, ex: 'Must pass before it ships or goes on', segs: [['Documentation', 1115], ['Attestation', 207], ['Test, configuration', 77]] },
    { k: 'Sanitizer', n: 123, ex: 'Masks data before it moves on' },
    { k: 'Evaluation', n: 86, ex: 'Scores behaviour, live or in testing' },
    { k: 'Guardrail', n: 72, ex: 'Allows or blocks an action' },
    { k: 'Human', n: 38, ex: 'A named person decides, or halts it' },
  ],
  X0: 780, BW: 760, Y0: 296, PITCH: 122,

  render(root) {
    Act3.mark(root, 1);
    const M = Mock;
    root.classList.add('sl-five', 'a3');
    M.style('sl-five', `
      .sl-five .w { left: 0; top: 0; width: 1920px; height: 1080px; }
      .sl-five .w > * { position: absolute; }
      .sl-five .row { left: 150px; width: 1620px; height: 104px; }
      .sl-five .row > * { position: absolute; }
      .sl-five .row svg { left: 0; top: 10px; width: 58px; height: 58px; overflow: visible; }
      .sl-five .row svg path { fill: none; stroke: var(--yellow); stroke-width: 3.2; stroke-linecap: round; stroke-linejoin: round; }
      .sl-five .row .nm { left: 84px; top: 4px; font: 700 44px/1 var(--sans); letter-spacing: -.02em; color: var(--ink); }
      .sl-five .row .ex { left: 84px; top: 60px; font: 500 27px/1.1 var(--sans); color: var(--ink-2); white-space: nowrap; }
      .sl-five .row .trk { left: ${780 - 150}px; top: 22px; width: 760px; height: 36px; border-radius: 6px; background: rgba(241,241,241,.06); }
      .sl-five .row .bar { left: ${780 - 150}px; top: 22px; height: 36px; display: flex; border-radius: 6px; overflow: hidden; transform-origin: 0 50%; }
      .sl-five .row .bar i { display: block; height: 100%; background: var(--yellow); }
      .sl-five .row .bar i + i { box-shadow: inset 3px 0 0 #000; }
      .sl-five .row .bar i.b { background: rgba(255,206,74,.66); } .sl-five .row .bar i.c { background: rgba(255,206,74,.40); }
      .sl-five .row .n { top: 12px; font: 700 54px/1 var(--sans); letter-spacing: -.03em; color: var(--ink); font-variant-numeric: tabular-nums; }
      .sl-five .row .sg { left: ${780 - 150}px; top: 70px; display: flex; gap: 30px; font: 600 25px/1 var(--sans); color: var(--ink-2); white-space: nowrap; }
      .sl-five .row .sg b { color: var(--ink); font-weight: 700; margin-left: 8px; }
      .sl-five .dot { width: 10px; height: 10px; margin: -5px 0 0 -5px; border-radius: 50%; background: var(--yellow); left: 0; top: 0; }
      .sl-five .box { border-radius: 22px; box-shadow: inset 0 0 0 3px rgba(255,206,74,.75), 0 0 80px -24px rgba(255,206,74,.6); background: rgba(255,206,74,.045); }
      .sl-five .lab { font: 600 25px/1 var(--sans); letter-spacing: .12em; text-transform: uppercase; padding: 12px 18px; border-radius: 999px; background: #000; white-space: nowrap; }
      .sl-five .lab.y { color: var(--yellow); box-shadow: inset 0 0 0 2px rgba(255,206,74,.75); }
      .sl-five .lab.g { color: var(--ink-2); box-shadow: inset 0 0 0 2px rgba(241,241,241,.4); }
      .sl-five .notes { left: var(--gut); top: 966px; }
    `);
    M.dotGrid(root);
    this.w = M.html('<div class="w"></div>');
    root.appendChild(this.w);
    this.head = Talk.lines(this.w.appendChild(M.html('<div class="tk-top"></div>')), ['Every control is one of <span class="tk-y">five kinds.</span>']);
    this.box = M.html(`<div class="box" style="left:126px;top:${this.Y0 + this.PITCH - 8}px;width:1668px;height:${4 * this.PITCH - 4}px"></div>`);
    this.w.appendChild(this.box);
    this.rows = this.TYPES.map((d, i) => {
      const y = this.Y0 + i * this.PITCH;
      const len = (d.n / 1399) * this.BW;
      const segs = d.segs ? d.segs.map(([, n], k) => `<i class="${'abc'[k]}" style="width:${((n / d.n) * 100).toFixed(2)}%"></i>`).join('') : '<i style="width:100%"></i>';
      const el = M.html(`<div class="row" style="top:${y}px"><svg viewBox="0 0 64 64">${Talk.GLYPH[d.k].map((p) => `<path d="${p}"/>`).join('')}</svg>
        <div class="nm">${d.k}</div><div class="ex">${d.ex}</div><div class="trk"></div><div class="bar" style="width:${len.toFixed(1)}px">${segs}</div>
        <div class="n" style="left:${(this.X0 - 150 + len + 24).toFixed(1)}px">0</div>
        ${d.segs ? `<div class="sg">${d.segs.map(([l, n]) => `<span>${l}<b>${Act3.int(n)}</b></span>`).join('')}</div>` : ''}</div>`);
      this.w.appendChild(el);
      const dots = [0, 1, 2, 3, 4, 5].slice(0, d.segs ? 6 : 2).map(() => { const o = M.html('<div class="dot"></div>'); this.w.appendChild(o); return o; });
      return { el, d, y, len, bar: el.querySelector('.bar'), n: el.querySelector('.n'), sg: el.querySelector('.sg'), paths: [...el.querySelectorAll('svg path')], dots };
    });
    this.labY = M.html(`<div class="lab y" style="left:1180px;top:${this.Y0 + 5 * this.PITCH - 36}px">Governs an agent while it runs</div>`);
    this.labG = M.html(`<div class="lab g" style="left:1564px;top:${this.Y0 - 52}px">Evidence</div>`);
    this.w.append(this.labY, this.labG);
    this.notes = M.mount(this.w, `<div class="notes"><div class="note">A control can need more than one kind. 19 flavours across the five.</div>
      <div class="tk-src" style="margin-top:8px">Source: Akka regulation corpus, snapshot 2026-10: controls carrying each kind.</div></div>`).root;
  },

  /** the scene time each row's bar grows */
  grow(i) { return i === 0 ? 1.9 : 4.2 + (i - 1) * 1.4; },

  at(t) {
    const M = Mock, L = M.abs(t);
    Talk.linesAt(this.head, t, 0.1);
    const land = 9.9;
    this.rows.forEach((r, i) => {
      const g = this.grow(i);
      M.rise(r.el, t, 0.35 + i * 0.08, { opacity: t < g ? 0.45 : 1 });
      r.paths.forEach((p, k) => M.draw(p, t, 0.5 + i * 0.08 + k * 0.06, 0.6));
      const p = M.p(t, g, i === 0 ? 1.4 : 0.8, 'outCubic');
      r.bar.style.transform = `scaleX(${p.toFixed(4)})`;
      M.countUp(r.n, t, g, i === 0 ? 1.4 : 0.8, 0, r.d.n, Act3.int);
      r.n.style.opacity = M.prog(t, g, 0.2).toFixed(3);
      if (r.sg) M.rise(r.sg, t, g + 1.0, { dy: 8 });
      /* the land: evidence settles back, the runtime four light */
      const dim = i === 0 ? 0.42 * M.p(t, land, 0.8) : 0;
      r.bar.style.opacity = (1 - dim).toFixed(3);
      /* controls streaming into each bar once it is shown */
      const on = M.prog(t, g + 0.4, 0.4);
      r.dots.forEach((o, k) => {
        const u = (L * (i === 0 ? 0.42 : 0.3) + k / r.dots.length + i * 0.13) % 1;
        const x = M.lerp(this.X0 - 70, this.X0 + r.len * p - 6, M.ease.inCubic(u));
        o.style.transform = `translate(${x.toFixed(1)}px, ${(r.y + 40).toFixed(1)}px)`;
        o.style.opacity = (on * Math.min(1, 5 * u, 6 * (1 - u)) * (1 - dim)).toFixed(3);
      });
    });
    const bp = M.p(t, land, 0.9);
    this.box.style.opacity = bp.toFixed(3);
    this.box.style.transform = `scale(${(1.02 - 0.02 * bp).toFixed(4)})`;
    M.rise(this.labY, t, land + 0.4, { dy: 10 });
    M.rise(this.labG, t, land + 0.6, { dy: 10 });
    M.fade(this.notes, t, 1.2, 0.6);

  },
});
