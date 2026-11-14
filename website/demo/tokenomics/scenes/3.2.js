/* Scene 3.2: the ledger. The question, then the Savings page's ledger: the camera pushes into the grid as the
   estimate and realized columns are named, the four rows within their estimates light in turn, then the camera
   pushes to the one row short of its estimate, password-reset on support-slm-v1, its realized figure counts up
   beside its estimate and the spotlight closes on its status chip and the Keep it is offered.
   One real capture; nothing on it is changed. */
Tok.register({
  id: '3.2',

  /* the ledger rows, in the capture's pixels: [top, status] of each; the row is 30 px high */
  ROWS: { within: [[213, 'ticket-summary'], [276, 'order-status'], [307, 'refund-request'], [369, 'Price list v3']], short: 245 },

  timing() {
    if (this.K) return;
    const at = (w, f) => Mock.captionAt(this, w, f);
    this.K = { estimate: at('estimate'), measured: at('measured'), four: at('Four'), one: at('One'), says: at('says') };
  },

  render(root) {
    root.classList.add('t32');
    Mock.style('t32', `
      .t32 .tk-chiptop .tk-chip { background: rgba(0, 0, 0, .72); }
      .t32 .tk-patch { z-index: 5; }
      .t32 .tk-patch.row { border-radius: 6px; box-shadow: inset 0 0 0 1px rgba(255, 206, 74, .55); }
      .t32 .cu { display: flex; align-items: flex-start; justify-content: flex-end; height: 100%; padding: 4px 1px 0 0;
        font: 500 14px/1 var(--mono); color: var(--c-text); font-variant-numeric: tabular-nums; }
      .t32 .cu sup { font-size: 8px; line-height: 1; margin: -3px 0 0 1px; }
    `);
    Mock.dotGrid(root);
    this.c = Tok.capture(root, {
      image: 'captures/savings-ledger.png', url: 'localhost:9889/cost/savings#ledger', crumb: 'Optimize › Cost › Savings',
    });
    const c = this.c;
    /* the realized figure's count-up sits under the row glow, so the lit row covers it evenly */
    const real = c.patch([1306, 247, 118, 24], '<div class="cu"><span></span><sup>3</sup></div>', { bg: '#121215' });
    this.real = real.querySelector('span');
    this.realBox = real;
    this.within = this.ROWS.within.map(([y]) => c.patch([316, y, 1554, 30], '', { bg: 'rgba(255, 206, 74, .11)' }));
    this.short = c.patch([316, this.ROWS.short, 1554, 30], '', { bg: 'rgba(255, 206, 74, .11)' });
    [...this.within, this.short].forEach((el) => el.classList.add('row'));
    this.question = Tok.question(root, { text: this.q });
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K);
    this.question.at(t);
    const Y = this.ROWS.short;
    this.c.at(t, {
      enter: 2.2,
      cam: [
        { t: K.estimate - 0.2, rect: [298, 112, 1580, 300] },
        { t: K.one, rect: [298, Y - 40, 1580, 110], dur: 1.2 },
      ],
      spot: [
        { t: K.estimate + 0.6, rect: [1096, 120, 340, 282] },
        { t: K.four, rect: [1440, 120, 340, 282] },
        { t: K.one - 0.2, rect: null },
        { t: K.one + 0.9, rect: [316, Y - 2, 1554, 34] },
        { t: K.says, rect: [1440, Y, 340, 30] },
      ],
      cursor: [
        { t: K.measured + 0.6, x: 1380, y: 150 },
        { t: K.one + 1.3, x: 1370, y: Y + 15 },
        { t: K.says + 0.6, x: 1520, y: Y + 15 },
      ],
    });
    /* the four rows within estimate light one after another, then step back when the short row is named */
    this.within.forEach((el, i) => {
      el.style.opacity = M.ramp(t, K.four + 0.2 + i * 0.35, K.one + 0.3, 0.35, 0.4).toFixed(3);
    });
    M.fade(this.short, t, K.one + 0.6, 0.5);
    /* the realized figure counts up beside its estimate */
    const show = M.prog(t, K.one + 0.9, 0.2);
    this.realBox.style.opacity = show.toFixed(3);
    M.countUp(this.real, t, K.one + 1.0, 0.9, 0, 12.9, (v) => Tok.money(v));
  },
});
