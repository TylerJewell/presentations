/* Scene 3.5: in force. The rail shows v1 in force; the main card holds the ring at In force with the bundle's
   facts. A ghosted v2 slot rises beside it with an arrow labelled "Changes roll forward" when a change is
   named, and v1's "stays on record" line appears when the earlier version is spoken about. */
Film.register({
  id: '3.5',

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { once: at('Once'), change: at('change'), earlier: at('earlier') };
  },

  render(root) {
    const M = Mock, B = Film.board;
    root.classList.add('s35');
    M.style('s35', `
      .s35 .v1 { left: 244px; top: 56px; width: 520px; height: 364px; }
      .s35 .v1 > *, .s35 .v2 > * { position: absolute; }
      .s35 .v1 .facts { left: 322px; top: 70px; width: 180px; display: flex; flex-direction: column; gap: 18px; }
      .s35 .facts .f { font: 500 14px/1.3 var(--sans); color: var(--c-muted); } .s35 .facts .f b { display: block; font: 500 17px/1.2 var(--sans); color: var(--c-text); margin-top: 3px; }
      .s35 .ttl { left: 22px; top: 18px; display: flex; align-items: center; gap: 12px; font: 600 20px var(--sans); }
      .s35 .ttl .fp-chip { font-size: 11px; padding: 6px 9px; gap: 5px; } .s35 .ttl .fp-chip svg { width: 11px; height: 11px; }
      .s35 .v2 { box-sizing: border-box; left: 900px; top: 158px; width: 389px; height: 160px; background: transparent; box-shadow: none; border: 1px dashed var(--c-line); border-radius: 12px; }
      .s35 .v2 .ttl { color: var(--c-muted); }
      .s35 .v2 .ln { left: 22px; top: 66px; right: 22px; font: 500 17px/1.4 var(--sans); color: var(--c-muted); }
      .s35 .arrow { left: 764px; top: 56px; width: 136px; height: 364px; overflow: visible; }
      .s35 .arrow path { fill: none; stroke: var(--yellow); stroke-width: 2; }
      .s35 .arrow .hd { fill: var(--yellow); stroke: none; }
      .s35 .alab { left: 764px; top: 252px; width: 136px; text-align: center; font: 500 12.5px/1.3 var(--sans); color: var(--yellow); white-space: nowrap; }
    `);
    this.frame = Film.console(root, { crumb: 'Verify › Controls', title: 'Controls', bundle: 'v1' });
    Film.note(root);
    const page = this.frame.page;
    page.style.height = '570px';
    this.head = B.head(page, { chip: 'In force', meta: 'Signed today · Rehearsal' });
    this.rail = B.rail(page, { x: 0, y: 0, w: 220, items: [{ v: 'v1', chip: 'In force', line: 'Signed today · 6 commitments' }, { v: 'v2', ghost: true, line: 'Changes roll forward' }], on: 0 });
    this.v1 = M.mount(page, `<div class="fb fb-panel v1"><div class="ttl">Bundle v1 ${Film.chip('In force')}</div>
      <div class="facts"><div class="f">Commitments<b>6, each bound to code</b></div><div class="f">Signed by<b>Risk team and control owner</b></div><div class="f">Rows<b>Cannot be edited</b></div><div class="f" data-k="rec">When replaced<b>Stays on record</b></div></div></div>`);
    this.ring = B.ring(this.v1.root, { x: 20, y: 60, size: 280 });
    this.v2 = M.mount(page, `<div class="fb v2"><div class="ttl">Bundle v2 ${Film.chip('Draft')}</div><div class="ln">A change is a new version that replaces v1.</div></div>`);
    this.arrow = M.mount(page, `<svg class="fb arrow" viewBox="0 0 136 364"><path d="M8,182 L118,182" data-k="p"/><path class="hd" d="M118,176 L130,182 L118,188 Z" data-k="h"/></svg>`);
    this.alab = M.mount(page, `<div class="fb alab">Changes roll forward.</div>`).root;
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K);
    M.rise(this.frame.el, t, 0.0, { dy: 12 });
    M.rise(this.head.el, t, 0.2, { dy: 8 });
    M.rise(this.rail.el, t, 0.3, { dy: 8 });
    M.rise(this.v1.root, t, 0.4, { dy: 10 });
    this.ring.set({ phase: 2, steps: 4, pulse: M.loop(t, 1.8), version: 'v1', line: 'in force' });
    /* the facts rise in turn; "stays on record" waits for the earlier version to be named */
    [...this.v1.root.querySelectorAll('.f')].forEach((f, i) => M.rise(f, t, i === 3 ? K.earlier - 0.1 : 0.7 + i * 0.15, { dy: 6 }));
    /* a change: the ghosted v2 rises with its arrow; the rail's ghost slot with it */
    const ch = K.change - 0.2;
    M.draw(this.arrow.p, t, ch, 0.7);
    this.arrow.h.style.opacity = M.prog(t, ch + 0.6, 0.2).toFixed(3);
    M.rise(this.alab, t, ch + 0.5, { dy: 6 });
    M.rise(this.v2.root, t, ch + 0.4, { dy: 10 });
    this.rail.show(1, M.prog(t, ch + 0.4, 0.5));
  },
});
