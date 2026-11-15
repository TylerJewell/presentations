/* Scene 3.4: analysis, where the sources disagree. Three columns side by side: tariff book, code, production.
   They agree on three rows; on the order of the two surcharges the tariff book and production disagree, and a
   red-orange line joins the two cells. The line resolves into a decision card, D3, signed by its owner, and the
   differences that remain are recorded. */
Fx.register({
  id: '3.4',

  COLS: ['Tariff book', 'Code', 'Production'],
  ROWS: [
    { l: 'Rate by weight and zone', c: ['Applied', 'Applied', 'Applied'] },
    { l: 'Fuel surcharge', c: ['Applied', 'Applied', 'Applied'] },
    { l: 'Remote-area surcharge', c: ['Applied', 'Applied', 'Applied'] },
    { l: 'Order of the surcharges', c: ['Remote area, then fuel', 'Fuel, then remote area', 'Fuel, then remote area'] },
  ],
  CX: [480, 790, 1100],   /* column lefts, 290 wide */
  RY: (i) => 340 + i * 88,

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { lines: at('lines'), here: at('Here,'), conflict: at('Each'), owner: at('owner'), recorded: at('remains') };
  },

  render(root) {
    root.classList.add('s34');
    Mock.style('s34', `
      .s34 .ch { top: 294px; width: 290px; }
      .s34 .rl { left: 160px; width: 300px; height: 72px; display: flex; align-items: center; font: 600 23px/1.2 var(--sans); color: var(--white); }
      .s34 .cell { --g: 0; width: 290px; height: 72px; border-radius: 10px; display: flex; align-items: center; padding: 0 18px; font: 500 21px/1.25 var(--sans);
        color: var(--soft-grey); border: 1px solid rgba(241, 241, 241, .12); background: rgba(255, 255, 255, .02); }
      .s34 .cell.diff { color: var(--white); }
      .s34 .cell.diff.hot { border-color: rgba(255, 84, 0, .7); background: rgba(255, 84, 0, .08); }
      .s34 .dec .nm { font-size: 28px; white-space: nowrap; }
      .s34 .dec .k { color: var(--yellow); }
      .s34 .rec { font: 500 22px/1.3 var(--sans); color: var(--soft-grey); }
    `);
    this.F = Fx.frame(root, { eyebrow: 'Discover', headline: 'Analysis lists every ambiguity and every conflict.', station: 0 });
    this.heads = this.COLS.map((c, i) => Mock.mount(root, `<div class="ch fx-side" style="left:${this.CX[i]}px">${c}</div>`).root);
    this.rows = this.ROWS.map((r, i) => ({
      l: Mock.mount(root, `<div class="rl" style="top:${this.RY(i)}px">${r.l}</div>`).root,
      c: r.c.map((v, j) => Mock.mount(root, `<div class="cell${i === 3 ? ' diff' : ''}" style="left:${this.CX[j]}px;top:${this.RY(i)}px">${v}</div>`).root),
    }));
    const y = this.RY(3) + 72;
    const S = Fx.svg(root, `<path data-k="join" class="red" d="M625 ${y} C625 ${y + 66} 1245 ${y + 66} 1245 ${y}"/>
      <path data-k="to" class="y" d="M1390 ${this.RY(3) + 36} C1405 ${this.RY(3) + 36} 1403 470 1415 470"/>`);
    this.join = S.k.join; this.to = S.k.to;
    this.dec = Fx.card(root, { x: 1415, y: 360, w: 345, h: 220, k: 'Decision D3', nm: 'The tariff book wins', tx: 'Signed by the tariff owner on 12 March' });
    this.dec.root.classList.add('dec');
    this.rec = Mock.mount(root, '<div class="rec" style="left:1415px;top:610px;width:345px">Every difference that remains is recorded with the change.</div>').root;
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K);
    this.F.at(t, { start: 0.1 });
    this.heads.forEach((h, i) => M.rise(h, t, 0.5 + i * 0.15, { dy: 10 }));
    /* the sources line up row by row */
    this.rows.forEach((r, i) => {
      const s = K.lines - 0.3 + i * 0.35;
      M.rise(r.l, t, s, { dy: 10 });
      r.c.forEach((c, j) => M.rise(c, t, s + 0.1 + j * 0.08, { dy: 10 }));
    });
    /* the two cells that disagree, joined in red-orange */
    const hot = M.prog(t, K.here + 0.6, 0.3) > 0;
    [0, 2].forEach((j) => this.rows[3].c[j].classList.toggle('hot', hot));
    M.draw(this.join, t, K.here + 0.8, 0.8);
    /* the conflict becomes a decision that an owner signs */
    M.draw(this.to, t, K.conflict, 0.5);
    M.rise(this.dec.root, t, K.conflict + 0.3);
    M.fade(this.dec.tx, t, K.owner + 0.2, 0.5);
    Fx.glow(this.dec.root, M.prog(t, K.owner, 0.6));
    M.rise(this.rec, t, K.recorded - 0.2, { dy: 10 });
  },
});
