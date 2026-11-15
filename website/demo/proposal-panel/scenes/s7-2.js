/* Scene 7.2: changing a commitment. The bundle compare on Verify › Controls, written as a financial
   statement: Current period (v2), Prior period (v1) and Increase (decrease), negatives in parentheses,
   n/m where a comparison has no meaning. The changed row glows as the raise is named; the two approvals
   appear; the cursor presses Sign v2 and the board's signer opens over the statement, both stamps land
   and the Rehearsal label shows; the rail then carries v2 in force with v1 staying on record. */
Film.register({
  id: '7.2',

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { change: at('change.'), raises: at('raises'), five: at('five'), six: at('six'), two: at('Two'), signed: at('signed'), version: at('version'), console: at('console'), exactly: at('exactly'), agreed: at('agreed') };
    const R = Mock.rectOf.bind(null, this.root);
    this.R = { sign: R(this.signBtn), btn: this.signer.sections.map((s) => R(s.btn)) };
  },

  render(root) {
    const M = Mock, B = Film.board;
    root.classList.add('s72');
    M.style('s72', `
      .s72 .cmp { box-sizing: border-box; left: 244px; top: 56px; width: 1045px; padding: 0 24px 10px; }
      .s72 .cmp .ttl { height: 48px; display: flex; align-items: center; gap: 14px; font: 600 18px var(--sans); }
      .s72 .cmp .ttl span { font: 500 14px var(--sans); color: var(--c-muted); }
      .s72 .cmp .ln { display: grid; grid-template-columns: minmax(0, 1fr) 150px 150px 170px; gap: 16px; align-items: center; height: 34px; border-top: 1px solid var(--c-line); --g: 0;
        font: 500 15px var(--sans); color: var(--c-text); font-variant-numeric: tabular-nums; }
      .s72 .cmp .ln > :not(:first-child) { text-align: right; }
      .s72 .cmp .ln.hd { height: 44px; border-top: 0; font: 600 11px/1.3 var(--sans); letter-spacing: .12em; text-transform: uppercase; color: var(--c-muted); align-items: end; padding-bottom: 8px; }
      .s72 .cmp .ln.hd i { display: block; font: 500 12px var(--sans); letter-spacing: 0; text-transform: none; color: var(--c-faint); font-style: normal; }
      .s72 .cmp .ln.on { color: color-mix(in srgb, var(--yellow) calc(var(--g) * 100%), var(--c-text)); background: color-mix(in srgb, var(--yellow) calc(var(--g) * 10%), transparent); margin: 0 -24px; padding: 0 24px; }
      .s72 .cmp .ln .nm { color: var(--c-muted); }
      .s72 .cmp .ln.on b { font-weight: 600; }
      .s72 .aut { box-sizing: border-box; left: 244px; top: 376px; width: 1045px; height: 112px; padding: 16px 24px; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 24px; }
      .s72 .aut .c { display: flex; flex-direction: column; gap: 7px; }
      .s72 .aut .c .who { font: 600 20px/1.1 var(--sans); letter-spacing: -.01em; }
      .s72 .aut .c .ln2 { font: 500 14px/1.3 var(--sans); color: var(--c-muted); }
      .s72 .aut .c .st { margin-top: 2px; transform-origin: 0 50%; }
      .s72 .aut .fp-chip { font-size: 11px; padding: 6px 9px; gap: 5px; } .s72 .aut .fp-chip svg { width: 11px; height: 11px; }
      .s72 .fb-head .sb { display: inline-flex; align-items: center; height: 32px; padding: 0 14px; border-radius: 8px; background: var(--c-gold-bg); color: var(--c-gold-text); box-shadow: inset 0 0 0 1px var(--c-gold-ring); font: 500 14px var(--sans); }
      .s72 .fb-head .meta { position: relative; }
      .s72 .fb-head .meta .sg { position: absolute; right: 0; top: 50%; transform: translateY(-50%); white-space: nowrap; }
      .s72 .fb-rail .it.ov { position: absolute; left: 0; right: 0; }
    `);
    this.frame = Film.console(root, { crumb: 'Verify › Controls', title: 'Controls', bundle: 'v1' });
    Film.note(root);
    const page = this.frame.page;
    page.style.height = '570px';
    this.foot = this.frame.bundle.parentNode;
    this.head = B.head(page, { chip: 'In force', meta: `<span class="sb" data-k="sb">Sign v2</span><span class="sg" data-k="sg">Signed today · Rehearsal</span>` });
    this.signBtn = this.head.meta.querySelector('.sb');
    this.signedLab = this.head.meta.querySelector('.sg');
    /* the rail: v2 draft over v1 in force; after signing, v2 in force over v1 on record (the overlays take the slots) */
    this.rail = B.rail(page, { x: 0, y: 0, w: 220, items: [
      { v: 'v2', chip: 'Draft', line: 'Ready to sign' }, { v: 'v1', chip: 'In force', line: 'Signed today · 6 commitments' },
      { v: 'v2', chip: 'In force', line: 'Signed today · 6 commitments' }, { v: 'v1', chip: 'Signed', line: 'Stays on record' }], on: 0 });
    [2, 3].forEach((i, k) => { const r = this.rail.items[i].root; r.classList.add('ov'); r.style.top = `${40 + k * 66}px`; });
    /* the statement: one line per setting of the bundle, v2 against v1 */
    const LINES = [
      ['Commitments in the bundle', '6', '6', '—'],
      ['Commitments bound to code', '6', '6', '—'],
      ['Score below which a review is held for approval', '<b>6</b>', '5', '<b>1</b>', true],
      ['Minimum review time for a held review', '10 s', '10 s', '—'],
      ['Decision when the timeout passes', 'Deny', 'Deny', '<span class="nm">n/m</span>'],
      ['Signatures required', '2', '2', '—'],
    ];
    this.cmp = M.mount(page, `<div class="fb fb-panel cmp"><div class="ttl">Bundle v2 compared with v1<span>line by line</span></div>
      <div class="ln hd"><span>Setting</span><span>Current period<i>v2</i></span><span>Prior period<i>v1</i></span><span>Increase (decrease)<i>v2 less v1</i></span></div>
      ${LINES.map(([k, a, b, d, on]) => `<div class="ln${on ? ' on' : ''}"${on ? ' data-k="row"' : ''}><span>${k}</span><span>${a}</span><span>${b}</span><span>${d}</span></div>`).join('')}</div>`);
    this.aut = M.mount(page, `<div class="fb fb-panel aut">
      <div class="c"><div class="fb-eb">Proposed by</div><div class="who">Control engineer</div><div class="ln2">The author of a change does not approve it.</div></div>
      <div class="c"><div class="fb-eb">Approved by</div><div class="who">Control owner</div><div class="st" data-k="a0">${Film.chip('Approved')}</div></div>
      <div class="c"><div class="fb-eb">Approved by</div><div class="who">Risk team</div><div class="st" data-k="a1">${Film.chip('Approved')}</div></div></div>`);
    /* the signer opens over the statement when Sign v2 is pressed */
    this.signer = B.signer(page, { x: 244, y: 56, w: 1045, h: 372 });
    this.cursor = M.cursor(root);
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K), S = this.signer, R = this.R;
    M.rise(this.frame.el, t, 0.0, { dy: 12 });
    M.rise(this.head.el, t, 0.2, { dy: 8 });
    M.rise(this.rail.el, t, 0.3, { dy: 8 });
    /* the statement: its lines rise; the changed line glows while the raise is named */
    const lines = [...this.cmp.root.querySelectorAll('.ln')];
    lines.forEach((l, i) => M.rise(l, t, 0.5 + i * 0.1, { dy: 6 }));
    this.cmp.row.style.setProperty('--g', Math.max(M.ramp(t, K.raises - 0.2, K.two - 0.2, 0.4, 0.6), M.p(t, K.exactly - 0.2, 0.6) * 0.8).toFixed(3));
    /* the two approvals */
    M.rise(this.aut.root, t, K.two - 0.2, { dy: 10 });
    [this.aut.a0, this.aut.a1].forEach((a, i) => {
      const p = M.p(t, K.two + 0.9 + i * 0.6, 0.4, 'outCubic');
      a.style.opacity = p.toFixed(3);
      a.style.transform = `scale(${(1.6 - 0.6 * p).toFixed(3)})`;
    });
    /* Sign v2: the signer opens, the stamps land, it closes when the comparison is spoken about */
    const press = K.signed - 0.4, s1 = press + 1.3, s2 = s1 + 1.3;
    const sheet = M.ramp(t, press + 0.2, K.console + 1.4, 0.6, 0.6);
    S.el.style.opacity = sheet.toFixed(3);
    S.el.style.transform = `translateY(${((1 - sheet) * 10).toFixed(2)}px)`;
    const under = 1 - 0.85 * sheet;
    this.cmp.root.style.opacity = under.toFixed(3);
    this.aut.root.style.opacity = (parseFloat(this.aut.root.style.opacity || 1) * under).toFixed(3);
    S.sections.forEach((s, i) => s.root.style.setProperty('--g', M.ramp(t, (i ? s1 : press) + 0.2, (i ? s2 : s1) + 0.2, 0.3, 0.4).toFixed(3)));
    S.stamp(0, M.prog(t, s1, 0.35));
    S.stamp(1, M.prog(t, s2, 0.35));
    S.rehearsal(M.p(t, s2 + 0.4, 0.5));
    /* signed: v2 in force in the rail, the header and the bottom bar as "version two" is said; v1 stays on record */
    const signed = M.p(t, Math.max(s2 + 0.6, K.version + 0.2), 0.6);
    [0, 1].forEach((i) => (this.rail.items[i].root.style.opacity = (1 - signed).toFixed(3)));
    [2, 3].forEach((i) => (this.rail.items[i].root.style.opacity = signed.toFixed(3)));
    this.rail.items[2].root.classList.toggle('on', signed > 0.5);
    this.head.chip.innerHTML = Film.chip('In force');
    this.signBtn.style.opacity = (1 - signed).toFixed(3);
    this.signedLab.style.opacity = signed.toFixed(3);
    this.foot.innerHTML = signed > 0.5 ? 'Bundle <b>v2</b> in force' : 'Bundle <b>v1</b> in force';
    this.cursor.at(t, [
      { t: press - 0.7, x: R.sign[0] - 160, y: R.sign[1] + 120 },
      { t: press, x: R.sign[0] + R.sign[2] / 2, y: R.sign[1] + R.sign[3] / 2, click: true, glide: 0.6 },
      { t: s1, x: R.btn[0][0] + R.btn[0][2] / 2, y: R.btn[0][1] + R.btn[0][3] / 2, click: true, glide: 0.9 },
      { t: s2, x: R.btn[1][0] + R.btn[1][2] / 2, y: R.btn[1][1] + R.btn[1][3] / 2, click: true, glide: 0.8 },
      { t: s2 + 1.2, x: R.btn[1][0] + 260, y: R.btn[1][1] - 60, hide: true },
    ]);
  },
});
