/* Scene 3.2: each promise points at code. The same board; typed target chips appear on every row, the
   row about injection glows and opens to show the guardrail linked by a dashed rail to the four persona
   agents it protects, and the header counts the rows bound to code when the link is spoken about. */
Film.register({
  id: '3.2',

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { tied: at('tied'), injection: at('injection'), changes: at('changes'), linked: at('linked') };
    this.R = { row: Mock.rectOf(this.root, this.rows.rows[0].root) };
  },

  render(root) {
    const M = Mock, B = Film.board;
    root.classList.add('s32');
    M.style('s32', `.s32 .det .mk-rail { position: relative; width: 48px; height: 2px; }`);
    this.frame = Film.console(root, { crumb: 'Verify › Controls', title: 'Controls' });
    Film.note(root);
    const page = this.frame.page;
    page.style.height = '570px';
    this.frame.bundle.parentNode.innerHTML = 'Bundle <b>draft</b> in preparation';
    this.head = B.head(page, { chip: 'Draft', meta: `<span data-k="bound">${Film.chip('Bound')} 6 of 6 rows bound to code</span>` });
    this.bound = this.head.meta.firstElementChild;
    this.rail = B.rail(page, { x: 0, y: 0, w: 220, items: [{ v: 'Draft', line: '6 commitments, in preparation' }], on: 0 });
    this.rows = B.rows(page, { x: 244, y: 56 });
    this.rows.detail(0, `<span class="mk-rail"></span><span>Protects</span>${B.AGENTS.map(([k, n]) => B.typed(k, n)).join('')}`);
    this.rl = this.rows.rows[0].det.querySelector('.mk-rail');
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K), rows = this.rows;
    M.rise(this.frame.el, t, 0.0, { dy: 12 });
    M.rise(this.head.el, t, 0.2, { dy: 8 });
    M.rise(this.rail.el, t, 0.3, { dy: 8 });
    rows.rows.forEach((r, i) => M.rise(r.root, t, 0.3 + i * 0.08, { dy: 8 }));
    /* the chips appear on every row as the tie is named */
    rows.targets(M.p(t, K.tied - 0.3, 0.8));
    /* the injection row glows and opens on its agents */
    rows.expand(0, M.p(t, K.injection - 0.2, 0.9, 'inOutCubic'));
    rows.glow(0, M.ramp(t, K.injection - 0.3, K.linked + 2.5, 0.4, 0.8));
    M.railAt(this.rl, t);
    /* the count of rows bound to code answers "linked" */
    this.bound.style.opacity = M.prog(t, K.linked - 0.2, 0.5).toFixed(3);
  },
});
