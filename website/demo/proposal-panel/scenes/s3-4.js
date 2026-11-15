/* Scene 3.4: two signatures. The signer with its two sections: the risk team signs the matrix of controls, the
   control owner signs the enterprise section. The cursor presses each button and a Signed stamp lands; the
   draft becomes v1 in the rail; the Rehearsal label appears when the narration says the signing is a rehearsal. */
Film.register({
  id: '3.4',

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { two: at('two'), risk: at('risk'), owner: at('owner'), rehearsal: at('rehearsal'), labels: at('labels') };
    const R = Mock.rectOf.bind(null, this.root);
    this.R = { btn: this.signer.sections.map((s) => R(s.btn)), reh: R(this.signer.reh) };
  },

  render(root) {
    const M = Mock, B = Film.board;
    root.classList.add('s34');
    this.frame = Film.console(root, { crumb: 'Verify › Controls', title: 'Controls' });
    Film.note(root);
    const page = this.frame.page;
    page.style.height = '570px';
    this.foot = this.frame.bundle.parentNode;
    this.head = B.head(page, { chip: 'Draft', meta: 'Sign v1 · two signatures' });
    this.rail = B.rail(page, { x: 0, y: 0, w: 220, items: [{ v: 'Draft', line: 'Ready to sign' }, { v: 'v1', chip: 'Signed', line: 'Rehearsal: signed on this computer' }], on: 0 });
    /* v1 sits over the draft's slot and takes its place when the second signature lands */
    Mock.set(this.rail.items[1].root, { position: 'absolute', top: '40px', left: '0', right: '0' });
    this.signer = B.signer(page, { x: 244, y: 56, w: 1045, h: 372 });
    this.cursor = M.cursor(root);
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K), S = this.signer, R = this.R;
    M.rise(this.frame.el, t, 0.0, { dy: 12 });
    M.rise(this.head.el, t, 0.2, { dy: 8 });
    M.rise(this.rail.el, t, 0.3, { dy: 8 });
    M.rise(S.el, t, 0.4, { dy: 10 });
    S.sections.forEach((s, i) => M.rise(s.root, t, 0.6 + i * 0.15, { dy: 8 }));
    /* each section glows while it is spoken about; its stamp lands on the click */
    const s1 = K.risk + 1.0, s2 = K.owner + 1.2;
    S.sections[0].root.style.setProperty('--g', M.ramp(t, K.risk - 0.3, K.owner - 0.2, 0.3, 0.5).toFixed(3));
    S.sections[1].root.style.setProperty('--g', M.ramp(t, K.owner - 0.3, K.rehearsal - 0.3, 0.3, 0.5).toFixed(3));
    S.stamp(0, M.prog(t, s1, 0.35));
    S.stamp(1, M.prog(t, s2, 0.35));
    /* signed: the draft becomes v1 in the rail, the header and the bottom bar */
    const signed = M.p(t, s2 + 0.6, 0.6);
    this.rail.items[0].root.style.opacity = (1 - signed).toFixed(3);
    this.rail.items[1].root.style.opacity = signed.toFixed(3);
    this.rail.items[1].root.classList.toggle('on', signed > 0.5);
    this.rail.el.style.height = signed > 0.5 ? '126px' : '';
    this.head.chip.innerHTML = Film.chip(signed > 0.5 ? 'Signed' : 'Draft');
    this.foot.innerHTML = signed > 0.5 ? 'Bundle <b>v1</b> signed' : 'Bundle <b>draft</b> in preparation';
    /* the rehearsal label, and the console's own labels where the answer rests on it */
    S.rehearsal(M.p(t, K.rehearsal - 0.1, 0.6));
    this.rail.items[1].line.style.opacity = M.prog(t, K.labels - 0.1, 0.5).toFixed(3);
    this.cursor.at(t, [
      { t: K.two + 0.6, x: R.btn[0][0] + 220, y: R.btn[0][1] - 120 },
      { t: s1, x: R.btn[0][0] + R.btn[0][2] / 2, y: R.btn[0][1] + R.btn[0][3] / 2, click: true, glide: 0.9 },
      { t: s2, x: R.btn[1][0] + R.btn[1][2] / 2, y: R.btn[1][1] + R.btn[1][3] / 2, click: true, glide: 0.9 },
      { t: s2 + 1.6, x: R.btn[1][0] + 260, y: R.btn[1][1] - 60, hide: true },
    ]);
  },
});
