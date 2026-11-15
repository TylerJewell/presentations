/* Scene 6.5: fourteen patterns. The pattern wall: fourteen cards in five families. Action approval glows
   first, each family as it is named, then Triage, Change authorization and Halt and restart in turn. */
(function () {
  if ((window.Film && Film.human) || document.querySelector('script[data-fp-human]')) return;
  const s = document.createElement('script');
  s.src = document.currentScript.src.replace(/scenes\/s6-\d\.js(\?.*)?$/, 'lib/human.js');
  s.async = false; s.dataset.fpHuman = '1';
  document.head.appendChild(s);
})();
Film.register({
  id: '6.5',

  FAMILIES: [
    { name: 'System authorization', patterns: ['Action approval', 'Change authorization', 'Exception', 'Outcome reconciliation', 'Override'] },
    { name: 'Domain decision', patterns: ['Decision review', 'Match and adjudication', 'Contest and appeal', 'Hand-off'] },
    { name: 'Feedback', patterns: ['Flag and feedback'] },
    { name: 'Monitoring', patterns: ['Triage', 'Attestation', 'Oversight quality'] },
    { name: 'Halt', patterns: ['Halt and restart'] },
  ],

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    const three = at('three');
    this.K = { one: at('Action'), fam: [at('authorizing'), at('deciding'), at('giving'), at('monitoring'), at('halting')], setting: at('setting'), three, more: [three + 0.2, three + 1.3, three + 2.4] };
  },

  render(root) {
    const M = Mock;
    root.classList.add('s65');
    M.style('s65', `
      .s65 .head { left: var(--gutter); top: 100px; }
      .s65 .fam { --g: 0; position: absolute; bottom: 760px; width: 300px; font: 600 20px/1.25 var(--sans); letter-spacing: .18em; text-transform: uppercase; color: color-mix(in srgb, var(--yellow) calc(var(--g) * 100%), var(--soft-grey)); }
      .s65 .pc { width: 300px; height: 64px; padding: 0 22px; justify-content: center; border-radius: 12px; }
      .s65 .pc .s { font: 600 23px/1.15 var(--sans); letter-spacing: -.01em; color: color-mix(in srgb, var(--yellow) calc(var(--g) * 100%), var(--white)); }
      .s65 .foot { left: var(--gutter); top: 762px; font: 500 22px/1.4 var(--sans); color: var(--soft-grey); }
    `);
    M.dotGrid(root);
    this.head = M.mount(root, `<div class="head"><h2 class="fp-h" data-k="h">Action approval is one of fourteen patterns.</h2></div>`);
    this.fams = []; this.cards = {};
    this.FAMILIES.forEach((f, i) => {
      const x = 160 + i * 330;
      this.fams.push(M.mount(root, `<div class="fam" style="left:${x}px">${f.name}</div>`).root);
      f.patterns.forEach((p, j) => {
        this.cards[p] = M.mount(root, `<div class="fp-card pc" style="left:${x}px;top:${340 + j * 76}px"><div class="s">${p}</div></div>`).root;
      });
    });
    this.foot = M.mount(root, `<div class="foot" data-k="f">The human library defines these patterns; this film uses four.</div>`);
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K);
    M.rise(this.head.h, t, 0.1);
    let n = 0;
    this.FAMILIES.forEach((f, i) => {
      M.rise(this.fams[i], t, 0.5 + i * 0.1, { dy: 10 });
      this.fams[i].style.setProperty('--g', M.ramp(t, K.fam[i] - 0.15, i < 4 ? K.fam[i + 1] : K.setting, 0.3, 0.4).toFixed(3));
      f.patterns.forEach((p) => { M.rise(this.cards[p], t, 0.7 + n * 0.07, { dy: 12 }); n++; });
    });
    const famGlow = (i) => M.ramp(t, K.fam[i] - 0.15, i < 4 ? K.fam[i + 1] : K.setting, 0.3, 0.4) * 0.45;
    const lit = {
      'Action approval': Math.max(M.ramp(t, K.one - 0.2, K.fam[0] - 0.2, 0.4, 0.5), famGlow(0)),
      'Triage': Math.max(M.ramp(t, K.more[0], this.span + 1, 0.35, 0.5), famGlow(3)),
      'Change authorization': Math.max(M.ramp(t, K.more[1], this.span + 1, 0.35, 0.5), famGlow(0)),
      'Halt and restart': Math.max(M.ramp(t, K.more[2], this.span + 1, 0.35, 0.5), famGlow(4)),
    };
    this.FAMILIES.forEach((f, i) => f.patterns.forEach((p) => Film.glow(this.cards[p], lit[p] ?? famGlow(i))));
    M.rise(this.foot.f, t, K.one + 2.0, { dy: 8 });
  },
});
