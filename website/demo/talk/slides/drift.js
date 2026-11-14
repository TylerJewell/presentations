/* Drift is a change in verdicts. One system's controls, week by week: upheld, upheld, upheld, one
   inconclusive (not drift), then one verdict changes to breached. The camera goes to that cell and the
   change behind it: a model update the week before. */
registerSlide({
  id: 'drift',
  act: 'principles',
  title: 'Drift is a change in verdicts',
  beats: [
    { t: 2.6, say: "Fifth: drift is a change in verdicts over time. Here are one system's controls, week by week. Upheld, upheld, upheld." },
    { t: 4.0, say: "Nothing to see, which is the point. Quiet weeks are evidence too. And an inconclusive week isn't drift. It's a control saying it couldn't tell." },
    { t: 6.0, say: "Then one changes. A control that was upheld is now breached. That's drift. You don't need a separate drift detector, and you don't need to argue about degrees of drift. A verdict changed. Most monitoring gives you a score, a threshold and a debate. This gives you a fact." },
    { t: 8.6, say: "And because every verdict is tied to the request that produced it, you can go straight to what changed. Here, a model update the week before. That's the difference between knowing something changed and knowing why." },
  ],

  CTL: ['ID number masked', 'Transfers need two approvals', 'Adverse-action reasons given', 'No protected characteristic used', 'Underwriter signs off', 'Data stays in region'],
  WEEKS: 12, X0: 740, Y0: 330, CW: 76, RH: 88,
  FLIP: [3, 11], INC: [1, 6],

  render(root) {
    Act3.mark(root, 5);
    const M = Mock;
    root.classList.add('sl-dr', 'a3');
    M.style('sl-dr', `
      .sl-dr .w { left: 0; top: 0; width: 1920px; height: 1080px; }
      .sl-dr .w > * { position: absolute; }
      .sl-dr .lb { left: 150px; width: 620px; height: 64px; font: 600 30px/64px var(--sans); color: var(--ink); white-space: nowrap; }
      .sl-dr .wk { width: 64px; text-align: center; font: 600 24px/1 var(--sans); color: var(--ink-3); top: 284px; }
      .sl-dr .wk.cur { color: var(--yellow); }
      .sl-dr .c { width: 64px; height: 64px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font: 700 30px/1 var(--sans); }
      .sl-dr .c.ok { color: var(--green); background: rgba(114,211,91,.16); box-shadow: inset 0 0 0 2px rgba(114,211,91,.5); }
      .sl-dr .c.inc { color: var(--ink-2); background: rgba(241,241,241,.08); box-shadow: inset 0 0 0 2px rgba(241,241,241,.35); }
      .sl-dr .c.bad { color: var(--red); background: rgba(255,84,0,.22); box-shadow: inset 0 0 0 3px var(--red), 0 0 34px rgba(255,84,0,.55); }
      .sl-dr .leg { left: 150px; top: 880px; display: flex; gap: 40px; font: 600 25px/1 var(--sans); color: var(--ink-2); }
      .sl-dr .leg span { display: flex; align-items: center; gap: 12px; }
      .sl-dr .leg i { width: 26px; height: 26px; border-radius: 6px; }
      .sl-dr .tag { font: 700 26px/1 var(--sans); letter-spacing: .12em; text-transform: uppercase; padding: 12px 16px; border-radius: 999px; white-space: nowrap; background: #000; }
      .sl-dr .tag.bad { color: var(--red); box-shadow: inset 0 0 0 2px var(--red); }
      .sl-dr .tag.dim { color: var(--ink-2); box-shadow: inset 0 0 0 2px rgba(241,241,241,.4); font-size: 22px; }
      .sl-dr .why { width: 360px; padding: 20px 22px; }
      .sl-dr .why .k { font: 600 22px/1 var(--sans); letter-spacing: .12em; text-transform: uppercase; color: var(--yellow); }
      .sl-dr .why .t { margin-top: 12px; font: 600 28px/1.2 var(--sans); color: var(--ink); }
      .sl-dr .why .m { margin-top: 10px; font: 500 22px/1 var(--mono); color: var(--ink-3); }
      .sl-dr .lnk { width: 3px; background: var(--yellow); transform-origin: 50% 0; }
    `);
    M.dotGrid(root);
    this.w = M.html('<div class="w"></div>');
    root.appendChild(this.w);
    this.head = Talk.lines(this.w.appendChild(M.html('<div class="tk-top"></div>')), ['Drift is a change <span class="tk-y">in verdicts.</span>']);
    const cx = (k) => this.X0 + k * this.CW;
    this.wk = [];
    for (let k = 0; k < this.WEEKS; k++) {
      const el = M.html(`<div class="wk${k === this.WEEKS - 1 ? ' cur' : ''}" style="left:${cx(k)}px">${k === this.WEEKS - 1 ? 'Now' : 'W' + (31 + k)}</div>`);
      this.w.appendChild(el); this.wk.push(el);
    }
    this.lbs = []; this.cells = [];
    this.CTL.forEach((n, r) => {
      const y = this.Y0 + r * this.RH;
      const lb = M.html(`<div class="lb" style="top:${y}px">${n}</div>`);
      this.w.appendChild(lb); this.lbs.push(lb);
      const row = [];
      for (let k = 0; k < this.WEEKS; k++) {
        const c = M.html(`<div class="c ok" style="left:${cx(k)}px;top:${y}px">✓</div>`);
        this.w.appendChild(c); row.push(c);
      }
      this.cells.push(row);
    });
    const [fr, fk] = this.FLIP, [ir, ik] = this.INC;
    this.cells[ir][ik].className = 'c inc'; this.cells[ir][ik].textContent = '?';
    this.flipEl = this.cells[fr][fk];
    this.tagBad = M.html(`<div class="tag bad" style="left:${cx(fk) + 84}px;top:${this.Y0 + fr * this.RH + 6}px">Drift</div>`);
    this.why = M.mount(this.w, `<div class="why tk-card hot" style="left:${cx(fk - 1) - 330}px;top:${this.Y0 + 6 * this.RH - 6}px">
      <div class="k">The week before</div><div class="t">Model updated on the eligibility agent</div><div class="m">10-14 · req-58213 →</div></div>`).root;
    this.mark = M.html(`<div class="c" style="left:${cx(fk - 1)}px;top:${this.Y0 + fr * this.RH}px;box-shadow: inset 0 0 0 3px var(--yellow);background:transparent"></div>`);
    this.lnk = M.html(`<div class="lnk" style="left:${cx(fk - 1) + 30}px;top:${this.Y0 + fr * this.RH + 66}px;height:${(5 - fr) * this.RH + 16}px"></div>`);
    this.w.append(this.tagBad, this.mark, this.lnk);
    this.leg = M.mount(this.w, `<div class="leg"><span><i style="background:rgba(114,211,91,.4)"></i>Upheld</span><span><i style="background:rgba(255,84,0,.7)"></i>Breached</span><span><i style="background:rgba(241,241,241,.25)"></i>Inconclusive, which is not drift</span></div>`).root;
    this.tsrc = M.mount(this.w, `<div class="tk-src" style="left:150px;top:1012px">Illustrative verdicts for one system.</div>`).root;
  },

  at(t) {
    const M = Mock, L = M.abs(t);
    Talk.linesAt(this.head, t, 0.1);
    const [fr, fk] = this.FLIP, flip = 4.4, zoom = 6.6;
    this.lbs.forEach((l, r) => M.rise(l, t, 0.3 + r * 0.06, { dy: 10 }));
    this.wk.forEach((w, k) => M.fade(w, t, 0.5 + k * 0.05, 0.4));
    /* the weeks fill column by column */
    this.cells.forEach((row, r) => row.forEach((c, k) => {
      const at = 0.8 + k * 0.12 + r * 0.03;
      const p = M.prog(t, at, 0.35);
      const keep = r === this.FLIP[0] && k >= this.FLIP[1] - 1;
      c.style.opacity = (p * (keep ? 1 : 1 - 0.7 * M.p(t, 6.6, 0.8))).toFixed(3);
      c.style.transform = `scale(${(0.6 + 0.4 * M.ease.outCubic(p)).toFixed(3)})`;
    }));
    /* the latest week breathes, as live data does */
    this.cells.forEach((row) => { const c = row[this.WEEKS - 1]; if (c !== this.flipEl || t < flip) c.style.filter = `brightness(${(1 + 0.25 * M.wave(L, 1.6)).toFixed(3)})`; });
    /* one verdict changes */
    const isBad = t >= flip;
    if (isBad !== this._bad) { this.flipEl.className = 'c ' + (isBad ? 'bad' : 'ok'); this.flipEl.textContent = isBad ? '✕' : '✓'; this._bad = isBad; }
    if (isBad) this.flipEl.style.transform = `scale(${(1 + 0.25 * M.ramp(t, flip, flip + 0.9, 0.12, 0.6) + 0.04 * M.wave(L, 1.2)).toFixed(3)})`;
    M.rise(this.tagBad, t, flip + 0.4, { dy: 8 });
    this.lbs[fr].style.color = isBad ? `color-mix(in srgb, var(--red) ${(100 * M.p(t, flip, 0.5)).toFixed(0)}%, var(--ink))` : '';
    /* what changed: the week before */
    M.fade(this.mark, t, zoom + 0.8, 0.4);
    this.lnk.style.transform = `scaleY(${M.p(t, zoom + 0.9, 0.5, 'outCubic').toFixed(3)})`;
    M.rise(this.why, t, zoom + 1.0, { dy: 12 });
    M.rise(this.leg, t, 1.6, { dy: 8, opacity: 1 - M.p(t, zoom, 0.6) });
    M.fade(this.tsrc, t, 1.6, 0.5);
    const rx = this.X0 + (fk - 7) * this.CW - 40;
    Talk.camera(this.w, t, [{ t: zoom, rect: [rx, this.Y0 + (fr - 1) * this.RH - 20, 1820 - rx, (7 - fr) * this.RH + 200], dur: 1.2, max: 1.6 }]);
  },
});
