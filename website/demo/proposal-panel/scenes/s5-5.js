/* Scene 5.5: verdicts on the console. Verify › Controls with the verdict panel for the fifth commitment,
   "Review quality is judged after every review": a row of ticks over the morning fills in green as each
   review is judged, the counts rise with it, one tick lands red when a review fails, a marker reads
   "Verdict changed", the Drift chip flags the row and the panel glows while it is spoken about. */
Film.register({
  id: '5.5',

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { each: at('Each'), here: at('Here'), all: at('all'), fails: at('fails'), changes: at('changes'), drift: at('drift'), flags: at('flags') };
  },

  render(root) {
    const M = Mock, B = Film.board;
    root.classList.add('s55');
    M.style('s55', `
      .s55 .vp { box-sizing: border-box; left: 244px; top: 56px; width: 1045px; height: 404px; --g: 0;
        box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--yellow) calc(var(--g) * 55%), var(--c-line)); }
      .s55 .vp > * { position: absolute; }
      .s55 .vp .fp-chip { font-size: 11px; padding: 6px 9px; gap: 5px; } .s55 .vp .fp-chip svg { width: 11px; height: 11px; }
      .s55 .fp-chip.drift { color: var(--yellow); border-color: rgba(255, 206, 74, .5); background: rgba(255, 206, 74, .08); }
      .s55 .ttl { left: 24px; top: 22px; right: 24px; display: flex; align-items: center; gap: 16px; }
      .s55 .ttl .n { font: 600 14px var(--sans); color: var(--c-faint); }
      .s55 .ttl .s { font: 500 22px/1.2 var(--sans); color: color-mix(in srgb, var(--yellow) calc(var(--g) * 100%), var(--c-text)); }
      .s55 .ttl .r { margin-left: auto; display: flex; align-items: center; gap: 8px; }
      .s55 .eb { left: 24px; top: 86px; }
      .s55 .counts { right: 24px; top: 74px; display: flex; gap: 28px; }
      .s55 .counts .c { display: flex; align-items: center; gap: 10px; }
      .s55 .counts .c b { font: 600 26px var(--sans); letter-spacing: -.02em; font-variant-numeric: tabular-nums; min-width: 32px; }
      .s55 .ticks i { transform-origin: 50% 100%; }
      .s55 .axis { left: 24px; top: 262px; width: 997px; height: 16px; }
      .s55 .axis span { position: absolute; transform: translateX(-50%); font: 500 12px var(--sans); color: var(--c-faint); font-variant-numeric: tabular-nums; }
      .s55 .vmark { top: 116px; width: 2px; height: 24px; background: var(--red); border-radius: 1px; transform-origin: 50% 100%; }
      .s55 .mlab { top: 112px; font: 500 14px/1 var(--sans); color: var(--red); white-space: nowrap; }
      .s55 .latest { left: 24px; top: 302px; right: 24px; display: flex; align-items: center; gap: 12px; font: 500 15px var(--sans); color: var(--c-muted); white-space: nowrap; }
      .s55 .latest code { font: 500 14px var(--mono); color: var(--c-text); }
      .s55 .latest b { color: var(--c-text); font-weight: 500; }
      .s55 .flag { left: 24px; top: 348px; right: 24px; display: flex; align-items: center; gap: 12px; font: 500 15px var(--sans); color: var(--c-text); white-space: nowrap; }
      .s55 .flag .fp-chip { font-size: 12px; padding: 7px 10px; } .s55 .flag .fp-chip svg { width: 12px; height: 12px; }
    `);
    this.frame = Film.console(root, { crumb: 'Verify › Controls', title: 'Controls', bundle: 'v1' });
    Film.note(root);
    const page = this.frame.page;
    page.style.height = '570px';
    this.head = B.head(page, { chip: 'In force', meta: 'Verdicts today' });
    this.rail = B.rail(page, { x: 0, y: 0, w: 220, items: [{ v: 'v1', chip: 'In force', line: 'Signed today · 6 commitments' }], on: 0 });
    const it = Film.BUNDLE[4];
    this.N = 42; /* one verdict every six minutes from 08:00; the last, at 12:06, is the breach */
    const tw = 997, step = tw / this.N;
    const hours = [0, 10, 20, 30, 40].map((k, i) => `<span style="left:${((k + 0.5) * step).toFixed(1)}px">${String(8 + i).padStart(2, '0')}:00</span>`).join('');
    const last = 24 + (this.N - 0.5) * step;
    this.p = M.mount(page, `<div class="fb fb-panel vp">
      <div class="ttl"><span class="n">5</span><span class="s">${it.s}</span><span class="r"><span data-k="drift">${Film.chip('Drift', { cls: 'drift' })}</span>${Film.chip(it.kind)}</span></div>
      <div class="fb-eb eb">Verdicts today</div>
      <div class="counts"><span class="c">${Film.chip('Upheld')}<b data-k="up">0</b></span><span class="c">${Film.chip('Breached')}<b data-k="br">0</b></span></div>
      <div class="axis">${hours}</div>
      <div class="vmark" data-k="mark" style="left:${(last - 1).toFixed(1)}px"></div>
      <div class="mlab" data-k="mlab" style="right:${(1045 - last + 12).toFixed(1)}px">Verdict changed · 12:06</div>
      <div class="latest" data-k="latest">${Film.chip('Breached')}<code>rev-3b18d05e</code><span>Product license renewal, 3 years</span><span>·</span><span>overall score <b>4.2</b></span></div>
      <div class="flag" data-k="flag">${Film.chip('Drift', { cls: 'drift' })}<span>The verdict for this commitment changed at 12:06.</span></div></div>`);
    this.ticks = B.ticks(this.p.root, { x: 24, y: 140, w: tw, n: this.N, h: 110 });
    this.ticks.el.classList.add('ticks');
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K), P = this.p, N = this.N;
    M.rise(this.frame.el, t, 0.0, { dy: 12 });
    M.rise(this.head.el, t, 0.2, { dy: 8 });
    M.rise(this.rail.el, t, 0.3, { dy: 8 });
    M.rise(P.root, t, 0.4, { dy: 10 });
    /* the morning's verdicts fill in, one tick per review, until "all morning" */
    const fill = M.prog(t, K.each + 0.4, Math.max(1, K.all - K.each - 0.4));
    const up = Math.floor(fill * (N - 1));
    const breach = M.p(t, K.fails + 0.2, 0.5, 'outCubic');
    const words = [];
    for (let k = 0; k < N; k++) words.push(k < up ? 'Upheld' : k === N - 1 && breach > 0 ? 'Breached' : null);
    this.ticks.set(words);
    this.ticks.ticks[N - 1].style.transform = `scaleY(${(breach > 0 ? 0.6 + 0.4 * breach : 1).toFixed(3)})`;
    if (P.up.textContent !== String(up)) P.up.textContent = String(up);
    const br = breach > 0 ? '1' : '0';
    if (P.br.textContent !== br) P.br.textContent = br;
    /* the sentence glows while the commitment is spoken about; the whole panel glows when it is flagged */
    const own = M.ramp(t, K.here - 0.2, K.fails + 0.4, 0.4, 0.6);
    const flagged = M.p(t, K.flags - 0.2, 0.6);
    P.root.style.setProperty('--g', Math.max(own, flagged).toFixed(3));
    /* the marker's stem grows up from the breached tick when the verdict changes; the panel makes room for each line */
    const mk = M.p(t, K.changes - 0.1, 0.4, 'outCubic');
    P.mark.style.transform = `scaleY(${mk.toFixed(3)})`;
    P.mark.style.opacity = mk > 0 ? 1 : 0;
    M.rise(P.mlab, t, K.changes + 0.1, { dy: 4 });
    P.root.style.height = `${(296 + 56 * M.p(t, K.fails + 0.3, 0.5) + 52 * M.p(t, K.drift - 0.2, 0.5)).toFixed(1)}px`;
    M.rise(P.latest, t, K.fails + 0.6, { dy: 6 });
    /* drift: the chip on the row and the line under the verdicts */
    M.rise(P.drift, t, K.drift - 0.1, { dy: 4, dur: 0.5 });
    M.rise(P.flag, t, K.drift + 0.1, { dy: 6 });
  },
});
