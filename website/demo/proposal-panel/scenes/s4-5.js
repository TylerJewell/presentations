/* Scene 4.5: a card number in a proposal. Three panels of the same paragraph: the proposal as written,
   what the model receives, and what the log keeps. In the first the personal data lights as each kind is
   named; in the other two each token contracts into its mask (CREDIT_CARD, EMAIL, PHONE, IBAN) while the
   narration reaches the model and then the logs. */
Film.register({
  id: '4.5',

  PARTS: [
    'Billing contact: Maria Lund, ', ['maria.lund@nordvik.example', 'EMAIL'], ', ', ['+44 20 7946 0123', 'PHONE'],
    '. The deposit can be paid by card ', ['4532 0151 1283 0366', 'CREDIT_CARD'], ' or by transfer to IBAN ', ['GB29 NWBK 6016 1331 9268 19', 'IBAN'], '.',
  ],

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { CREDIT_CARD: at('card'), EMAIL: at('emails'), PHONE: at('phone'), IBAN: at('IBANs'), model: at('before'), logs: at('again'), reads: at('reads'), holds: at('holds') };
    /* each masked token's two widths, measured once with the fonts in place */
    [this.p2, this.p3].forEach((p) => p.tks.forEach((tk) => {
      tk.el.style.width = ''; tk.m.style.position = 'static'; tk.m.style.display = 'none';
      tk.wo = tk.el.offsetWidth;
      tk.o.style.display = 'none'; tk.m.style.display = '';
      tk.wm = tk.el.offsetWidth;
      tk.o.style.display = ''; tk.m.style.position = ''; tk.m.style.display = '';
    }));
  },

  render(root) {
    const M = Mock;
    root.classList.add('s45');
    M.style('s45', `
      .s45 .head { left: var(--gutter); top: 70px; width: 1600px; }
      .s45 .head .fp-h { font-size: 56px; }
      .s45 .pn { top: 300px; width: 500px; height: 400px; padding: 26px 28px 24px; }
      .s45 .pn .tx { margin-top: 18px; font: 500 25px/1.5 var(--sans); color: var(--white); text-wrap: pretty; }
      .s45 .pn .ft { margin-top: auto; font: 500 20px/1.35 var(--sans); color: var(--soft-grey); }
      .s45 .hl { --g: 0; border-radius: 4px; padding: 1px 2px; box-decoration-break: clone; -webkit-box-decoration-break: clone;
        background: rgba(255, 206, 74, calc(var(--g) * .2)); color: color-mix(in srgb, var(--yellow) calc(var(--g) * 100%), var(--white)); }
      .s45 .tk { display: inline-block; position: relative; vertical-align: baseline; white-space: nowrap; clip-path: inset(0); line-height: 1.5; }
      .s45 .tk .o { display: inline-block; }
      .s45 .tk .m { position: absolute; left: 0; top: 0; display: inline-block; font: 500 21px/1.78 var(--mono); color: var(--white); background: rgba(241, 241, 241, .06); border: 1px solid var(--hair-hi); border-radius: 5px; padding: 0 6px; box-sizing: border-box; }
    `);
    M.dotGrid(root);
    this.head = M.mount(root, `<div class="head"><div class="mk-eyebrow" data-k="eb">Sanitizer</div>
      <h2 class="fp-h" style="margin-top:18px" data-k="h">A sanitizer masks personal data before the model and the log see it.</h2></div>`);
    const plain = this.PARTS.map((p) => (typeof p === 'string' ? p : `<span class="hl" data-m="${p[1]}">${p[0]}</span>`)).join('');
    const masked = this.PARTS.map((p) => (typeof p === 'string' ? p : `<span class="tk" data-m="${p[1]}"><span class="o">${p[0]}</span><span class="m">[${p[1]}]</span></span>`)).join('');
    const panel = (x, eb, body, ft) => {
      const r = M.mount(root, `<div class="fp-card pn" style="left:${x}px"><div class="eb">${eb}</div><div class="tx">${body}</div><div class="ft">${ft}</div></div>`);
      r.hls = [...r.root.querySelectorAll('.hl')];
      r.tks = [...r.root.querySelectorAll('.tk')].map((el) => ({ el, o: el.querySelector('.o'), m: el.querySelector('.m'), kind: el.dataset.m }));
      return r;
    };
    this.p1 = panel(160, 'The proposal', plain, 'Four kinds of personal data are in the text.');
    this.p2 = panel(710, 'What the model receives', masked, 'The masks are applied before the model call.');
    this.p3 = panel(1260, 'What the log keeps', masked, 'The masks are applied again before the log is written.');
  },

  /* a token contracts from its original width to its mask's over `dur` seconds from `start` */
  morph(p, t, start) {
    p.tks.forEach((tk, i) => {
      const q = Mock.p(t, start + i * 0.22, 0.9, 'inOutCubic');
      tk.el.style.width = Mock.lerp(tk.wo, tk.wm, q).toFixed(1) + 'px';
      tk.o.style.opacity = (1 - Mock.prog(t, start + i * 0.22 + 0.25, 0.4)).toFixed(3);
      tk.m.style.opacity = Mock.prog(t, start + i * 0.22 + 0.3, 0.45).toFixed(3);
    });
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K);
    M.rise(this.head.eb, t, 0.0, { dy: 10 });
    M.rise(this.head.h, t, 0.1);
    [this.p1, this.p2, this.p3].forEach((p, i) => M.rise(p.root, t, 0.5 + i * 0.15));
    /* the original lights each kind of data as it is named, and keeps a soft light afterwards */
    this.p1.hls.forEach((el) => {
      const a = K[el.dataset.m];
      el.style.setProperty('--g', Math.max(M.ramp(t, a - 0.1, a + 1.6, 0.3, 0.6), 0.45 * M.p(t, a + 1.2, 0.6)).toFixed(3));
    });
    this.morph(this.p2, t, K.model + 0.3);
    this.morph(this.p3, t, K.logs + 0.3);
    Film.glow(this.p1.root, M.ramp(t, K.CREDIT_CARD - 0.3, K.model - 0.2, 0.5, 0.6) * 0.7);
    Film.glow(this.p2.root, Math.max(M.ramp(t, K.model - 0.1, K.logs - 0.2, 0.5, 0.6), M.ramp(t, K.reads - 0.2, K.holds - 0.2, 0.4, 0.5)) * 0.7);
    Film.glow(this.p3.root, Math.max(M.ramp(t, K.logs - 0.1, K.reads - 0.3, 0.5, 0.6), M.ramp(t, K.holds - 0.2, this.span + 1, 0.4, 0.5)) * 0.7);
  },
});
