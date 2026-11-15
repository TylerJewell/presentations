/* Scene 6.1: some actions need a person's approval. The Controls board again; the sixth commitment glows
   and opens while rows 1 to 5 step back. The open row carries the Action approval chip and a small card
   with the trigger, "Overall score below 5", and the three settings the control carries: the proposer
   may not approve, a minimum review time of 10 seconds, and a timeout that denies. */
Film.register({
  id: '6.1',

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { some: at('Some'), sixth: at('sixth'), weak: at('weak'), below: at('below'), until: at('until'), approves: at('approves') };
  },

  render(root) {
    const M = Mock, B = Film.board;
    root.classList.add('s61');
    this.H = 54; this.DET = 92; /* row height and the open row's extra height, in the console's px */
    M.style('s61', `
      .s61 .fb-row .det { align-items: stretch; }
      .s61 .card { flex: 1; box-sizing: border-box; height: 74px; margin-top: 2px; display: grid; grid-template-columns: auto 1fr 1fr 1fr 1fr; align-items: center; gap: 22px; padding: 0 18px;
        border-radius: 8px; background: var(--c-sunk); box-shadow: inset 0 0 0 1px var(--c-line); }
      .s61 .card .fp-chip { font-size: 11px; padding: 6px 9px; gap: 5px; } .s61 .card .fp-chip svg { width: 11px; height: 11px; }
      .s61 .card .c { display: flex; flex-direction: column; gap: 6px; --g: 0; }
      .s61 .card .c b { font: 600 10.5px/1 var(--sans); letter-spacing: .12em; text-transform: uppercase; color: var(--c-muted); }
      .s61 .card .c span { font: 500 16px/1.2 var(--sans); color: color-mix(in srgb, var(--yellow) calc(var(--g) * 100%), var(--c-text)); }
    `);
    this.frame = Film.console(root, { crumb: 'Verify › Controls', title: 'Controls', bundle: 'v1' });
    Film.note(root);
    const page = this.frame.page;
    page.style.height = '570px';
    this.head = B.head(page, { chip: 'In force', meta: '6 commitments · 1 needs a person' });
    this.rail = B.rail(page, { x: 0, y: 0, w: 220, items: [{ v: 'v1', chip: 'In force', line: 'Signed today · 6 commitments' }], on: 0 });
    this.rows = B.rows(page, { x: 244, y: 56, h: this.H, gap: 6 });
    this.rows.detail(5, `<div class="card">${Film.chip('Action approval')}
      <div class="c" data-k="trig"><b>Trigger</b><span>Overall score below 5</span></div>
      <div class="c" data-k="prop"><b>Proposer</b><span>May not approve</span></div>
      <div class="c" data-k="min"><b>Minimum review time</b><span>10 seconds</span></div>
      <div class="c" data-k="tout"><b>Timeout</b><span>Denies the release</span></div></div>`);
    const det = this.rows.rows[5].det;
    det.style.height = `${this.DET}px`;
    this.cells = ['trig', 'prop', 'min', 'tout'].map((k) => det.querySelector(`[data-k="${k}"]`));
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K), rows = this.rows, six = rows.rows[5];
    M.rise(this.frame.el, t, 0.0, { dy: 12 });
    M.rise(this.head.el, t, 0.2, { dy: 8 });
    M.rise(this.rail.el, t, 0.3, { dy: 8 });
    rows.targets(M.p(t, 0.9, 0.6));
    /* the sixth row glows and opens; rows 1 to 5 step back */
    const back = M.p(t, K.sixth - 0.3, 0.7);
    rows.rows.forEach((r, i) => {
      const o = M.rise(r.root, t, 0.3 + i * 0.08, { dy: 8 });
      if (i < 5) r.root.style.opacity = (o * (1 - 0.6 * back)).toFixed(3);
    });
    rows.glow(5, M.p(t, K.sixth - 0.3, 0.6));
    const open = M.p(t, K.sixth + 0.1, 0.9, 'inOutCubic');
    rows.expand(5, open);
    /* the open row takes the card's height, which is more than one line of chips */
    six.root.style.height = `${(this.H + open * this.DET).toFixed(2)}px`;
    /* the trigger is read at "below five"; the settings follow "until" */
    this.cells.forEach((c, i) => M.rise(c, t, i === 0 ? K.sixth + 0.6 : K.until + 0.2 + (i - 1) * 0.3, { dy: 6 }));
    this.cells[0].style.setProperty('--g', M.ramp(t, K.below - 0.2, K.until + 0.6, 0.35, 0.5).toFixed(3));
  },
});
