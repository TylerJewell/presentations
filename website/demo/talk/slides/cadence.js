/* Weekly, monthly, yearly. One year across the stage: the system's changes as 52 yellow marks, the
   rules' as 12 white ones, the review as a single block. Then everything outside the review is shaded:
   the changes nobody signed off on. "The review happens once a year" is Tyler's framing, not a
   statistic, so nothing here carries a source. */
registerSlide({
  id: 'cadence',
  act: 'clocks',
  title: 'Weekly, monthly, yearly',
  beats: [
    { t: 2.4, say: "Here's the shape of the problem. Your system changes weekly." },
    { t: 4.4, say: "The rules change monthly. You just saw it: a deadline moved here, a law replaced there, a footnote that leaves out the very systems you're deploying." },
    { t: 6.4, say: "And the review happens once a year. A model validation, an audit, a policy refresh. A careful, expensive look at the system, at one moment in time." },
    { t: 9.2, say: "Look at everything between the review points. Fifty-one weeks of changes nobody signed off on, against rules that moved underneath them. An annual review is a photograph of a system that no longer exists. That's not a criticism of anyone here. It's what the old tools were built for: software that changed twice a year." },
  ],

  X0: 720, X1: 1770,
  ROWS: [360, 580, 800],
  REVIEW: 6,     /* the week of the review */

  render(root) {
    const M = Mock;
    root.classList.add('sl-cad');
    M.style('sl-cad', `
      .sl-cad .mo { top: 196px; font: 600 var(--t-label)/1 var(--sans); color: var(--ink-2); transform: translateX(-50%); }
      .sl-cad .row { left: 150px; width: 520px; }
      .sl-cad .row small { display: block; font: 500 34px/1.1 var(--sans); color: var(--ink-2); margin-bottom: 6px; }
      .sl-cad .row b { display: block; font: 700 96px/1 var(--sans); letter-spacing: -.04em; }
      .sl-cad .wk { width: 9px; height: 96px; margin-top: -48px; border-radius: 3px; background: var(--yellow); }
      .sl-cad .mn { width: 14px; height: 120px; margin-top: -60px; border-radius: 4px; background: var(--ink); }
      .sl-cad .rv { width: 44px; height: 150px; margin-top: -75px; margin-left: -22px; border-radius: 8px; background: var(--ink); box-shadow: 0 0 40px rgba(241,241,241,.35); }
      .sl-cad .rvl { font: 600 var(--t-label)/1 var(--sans); letter-spacing: .12em; text-transform: uppercase; color: var(--ink); width: 300px; text-align: center; white-space: nowrap; }
      .sl-cad .shade { border-radius: 14px; background: rgba(255,84,0,.13); box-shadow: inset 0 0 0 2px rgba(255,84,0,.5); }
      .sl-cad .gl { font: 700 52px/1.05 var(--sans); letter-spacing: -.02em; color: var(--red); white-space: nowrap; }
      .sl-cad .ph { top: 262px; width: 3px; height: 412px; margin-left: -1.5px; background: var(--yellow); box-shadow: 0 0 16px rgba(255,206,74,.8); }
      .sl-cad .base { height: 2px; background: rgba(241,241,241,.22); }
    `);
    M.dotGrid(root);
    this.eb = M.mount(root, `<div class="tk-top"><div class="tk-eb">One year</div></div>`).root;
    const wx = (w) => this.X0 + (w / 52) * (this.X1 - this.X0);
    this.wx = wx;
    this.mos = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, i) =>
      M.mount(root, `<div class="mo" style="left:${this.X0 + ((i + 0.5) / 12) * (this.X1 - this.X0)}px">${m}</div>`).root);
    const lab = [['Your system changes', 'Weekly', 'var(--yellow)'], ['The rules change', 'Monthly', 'var(--ink)'], ['The review happens', 'Yearly', 'var(--ink)']];
    this.labs = lab.map(([a, b, c], i) => M.mount(root, `<div class="row" style="top:${this.ROWS[i] - 70}px"><small>${a}</small><b style="color:${c}">${b}</b></div>`).root);
    this.bases = this.ROWS.map((y) => M.mount(root, `<div class="base" style="left:${this.X0}px;width:${this.X1 - this.X0}px;top:${y + 76}px"></div>`).root);
    this.shade = M.mount(root, `<div class="shade" style="left:${wx(this.REVIEW + 1) + 4}px;top:${this.ROWS[0] - 80}px;width:${this.X1 - wx(this.REVIEW + 1) + 8}px;height:${this.ROWS[1] - this.ROWS[0] + 160}px"></div>`).root;
    this.shade0 = M.mount(root, `<div class="shade" style="left:${this.X0 - 12}px;top:${this.ROWS[0] - 80}px;width:${wx(this.REVIEW) - this.X0 - 4}px;height:${this.ROWS[1] - this.ROWS[0] + 160}px"></div>`).root;
    this.wks = Array.from({ length: 52 }, (_, w) => M.mount(root, `<div class="wk" style="left:${wx(w + 0.5) - 4.5}px;top:${this.ROWS[0]}px"></div>`).root);
    this.mns = Array.from({ length: 12 }, (_, m) => M.mount(root, `<div class="mn" style="left:${this.X0 + ((m + 0.5) / 12) * (this.X1 - this.X0) - 7}px;top:${this.ROWS[1]}px"></div>`).root);
    this.rv = M.mount(root, `<div class="rv" style="left:${wx(this.REVIEW + 0.5)}px;top:${this.ROWS[2]}px"></div>`).root;
    this.rvl = M.mount(root, `<div class="rvl" style="left:${wx(this.REVIEW + 0.5) - 150}px;top:${this.ROWS[2] - 120}px">Review</div>`).root;
    this.gl = M.mount(root, `<div class="gl" style="left:${wx(this.REVIEW + 3)}px;top:${this.ROWS[2] - 30}px">Changes nobody<br>signed off on</div>`).root;
    this.ph = M.mount(root, `<div class="ph"></div>`).root;
  },

  at(t) {
    const M = Mock, Lv = M.abs(t);
    M.rise(this.eb, t, 0.1);
    this.mos.forEach((m, i) => M.fade(m, t, 0.2 + i * 0.03, 0.4));

    /* the year's changes, row by row */
    const rowAt = [0.3, 2.6, 4.6];
    this.labs.forEach((l, i) => M.rise(l, t, rowAt[i]));
    this.bases.forEach((b, i) => M.fade(b, t, rowAt[i] + 0.2, 0.5));
    const gap = M.p(t, 6.6, 1.0, 'inOutCubic');
    /* the playhead keeps sweeping the year once the gap is shown */
    const ph = M.loop(t, 9), phx = this.X0 + ph * (this.X1 - this.X0);
    this.wks.forEach((el, w) => {
      const a = M.prog(t, 0.7 + w * 0.026, 0.25);
      const out = w !== this.REVIEW;
      const hit = gap > 0.5 ? M.clamp(1 - Math.abs(phx - this.wx(w + 0.5)) / 40) : 0;
      el.style.opacity = (a * (1 - 0.35 * gap * (out ? 1 : 0))).toFixed(3);
      el.style.transform = `scaleY(${(M.p(t, 0.7 + w * 0.026, 0.4, 'outCubic') * (1 + 0.25 * hit)).toFixed(3)})`;
    });
    this.mns.forEach((el, m) => {
      el.style.opacity = M.prog(t, 2.9 + m * 0.09, 0.25) * (1 - 0.35 * gap);
      el.style.transform = `scaleY(${M.p(t, 2.9 + m * 0.09, 0.45, 'outCubic').toFixed(3)})`;
    });
    const rp = M.p(t, 5.0, 0.7, 'outCubic');
    this.rv.style.opacity = M.prog(t, 5.0, 0.3);
    this.rv.style.transform = `scale(${(0.4 + 0.6 * rp).toFixed(3)})`;
    M.rise(this.rvl, t, 5.4, { dy: 10 });

    /* everything outside the review */
    [this.shade, this.shade0].forEach((s) => { s.style.opacity = (gap * (0.85 + 0.15 * M.wave(Lv, 3))).toFixed(3); });
    this.shade.style.transformOrigin = '0 50%';
    this.shade.style.transform = `scaleX(${gap.toFixed(4)})`;
    M.rise(this.gl, t, 7.4);
    this.ph.style.left = phx.toFixed(1) + 'px';
    this.ph.style.opacity = (M.prog(t, 7.8, 0.6) * Math.min(1, 6 * ph, 6 * (1 - ph))).toFixed(3);
  },
});
