/* Scene 6.6: triage, authorize, halt. Three cards in a row, one per pattern: a blocked attempt that a
   security officer reports; a guardrail threshold change with two approvals, neither from its author;
   a HALT stamp on the panel, the safe-state checks turning green, and two people approving the restart. */
(function () {
  if ((window.Film && Film.human) || document.querySelector('script[data-fp-human]')) return;
  const s = document.createElement('script');
  s.src = document.currentScript.src.replace(/scenes\/s6-\d\.js(\?.*)?$/, 'lib/human.js');
  s.async = false; s.dataset.fpHuman = '1';
  document.head.appendChild(s);
})();
Film.register({
  id: '6.6',

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { triage: at('blocked'), auth: at('change'), halt: at('And'), restart: at('approving'), checks: at('safety') };
  },

  render(root) {
    const M = Mock, B = Film.human.BLOCKED;
    root.classList.add('s66');
    M.style('s66', `
      .s66 .head { left: var(--gutter); top: 100px; }
      .s66 .pat { top: 270px; width: 500px; height: 560px; padding: 26px 30px 28px; }
      .s66 .pat .nm { font-size: 34px; }
      .s66 .pat .ev { margin-top: 20px; padding: 18px 20px; border-radius: 12px; border: 1px solid var(--hair); background: rgba(255, 255, 255, .02); display: flex; flex-direction: column; gap: 10px; }
      .s66 .pat .ev .t { display: flex; align-items: center; gap: 12px; font: 600 22px/1.2 var(--sans); }
      .s66 .pat .ev .t .mono { font: 500 19px/1 var(--mono); color: var(--soft-grey); }
      .s66 .pat .ev .s { font: 500 20px/1.35 var(--sans); color: var(--soft-grey); }
      .s66 .pat .who { margin-top: 16px; font: 500 21px/1.35 var(--sans); color: var(--soft-grey); }
      .s66 .pat .who b { color: var(--white); font-weight: 600; }
      .s66 .btns { margin-top: 14px; display: flex; gap: 10px; }
      .s66 .btn { --on: 0; height: 42px; padding: 0 18px; border-radius: 9px; display: inline-flex; align-items: center; font: 600 19px/1 var(--sans); white-space: nowrap;
        border: 1px solid color-mix(in srgb, var(--yellow) calc(var(--on) * 100%), var(--hair-hi)); color: color-mix(in srgb, #111 calc(var(--on) * 100%), var(--white));
        background: rgba(255, 206, 74, var(--on)); }
      .s66 .apps { margin-top: 12px; display: flex; flex-direction: column; gap: 8px; }
      .s66 .app { display: flex; align-items: center; gap: 14px; font: 500 21px/1.2 var(--sans); color: var(--soft-grey); }
      .s66 .app b { color: var(--white); font-weight: 600; min-width: 190px; }
      .s66 .app .fp-chip { margin-left: auto; }
      .s66 .outcome { margin-top: auto; display: flex; align-items: center; gap: 14px; }
      .s66 .stamp { position: absolute; right: 26px; top: 176px; width: 190px; padding: 8px 0; text-align: center; border: 5px solid var(--red); border-radius: 10px;
        font: 700 40px/1 var(--sans); letter-spacing: .08em; color: var(--red); transform: rotate(-6deg); }
      .s66 .checks { margin-top: 14px; display: flex; flex-direction: column; gap: 7px; }
      .s66 .chk { --ok: 0; display: flex; align-items: center; gap: 12px; font: 500 20px/1.2 var(--sans); color: color-mix(in srgb, var(--green) calc(var(--ok) * 100%), var(--soft-grey)); }
      .s66 .chk i { width: 20px; height: 20px; border-radius: 50%; border: 1.5px solid color-mix(in srgb, var(--green) calc(var(--ok) * 100%), var(--hair-hi)); background: rgba(114, 211, 91, calc(var(--ok) * .22)); flex: none; }
    `);
    M.dotGrid(root);
    this.head = M.mount(root, `<div class="head"><h2 class="fp-h" data-k="h">The same panel uses three more patterns.</h2></div>`);
    this.c = M.mount(root, `<div>
      <div class="fp-card pat" style="left:160px" data-k="c1"><div class="eb">Triage</div><div class="nm">A blocked attempt is looked at.</div>
        <div class="ev"><div class="t">${Film.chip('Blocked')}<span class="mono">${B.id}</span></div><div class="s">${B.reason}</div></div>
        <div class="who"><b>Security officer</b> resolves, disregards or reports it.</div>
        <div class="btns"><span class="btn" data-k="b1">Resolve</span><span class="btn" data-k="b2">Disregard</span><span class="btn" data-k="b3">Report</span></div>
        <div class="outcome" data-k="o1">${Film.chip('Reported', { big: true })}<span class="who" style="margin:0">The review did not wait for this.</span></div></div>
      <div class="fp-card pat" style="left:710px" data-k="c2"><div class="eb">Change authorization</div><div class="nm">A guardrail threshold changes.</div>
        <div class="ev"><div class="t">Jailbreak similarity threshold</div><div class="s">From 0.85 to 0.80, proposed by the <b style="color:var(--white);font-weight:600">Platform engineer</b>.</div></div>
        <div class="apps"><div class="app" data-k="a1"><b>Security officer</b>${Film.chip('Approved')}</div><div class="app" data-k="a2"><b>Senior reviewer</b>${Film.chip('Approved')}</div></div>
        <div class="who" data-k="w2">Two approvals, and the author is not one of them.</div>
        <div class="outcome" data-k="o2">${Film.chip('Applied', { big: true })}</div></div>
      <div class="fp-card pat" style="left:1260px" data-k="c3"><div class="eb">Halt and restart</div><div class="nm">The whole panel stops at once.</div>
        <div class="ev"><div class="t">${Film.SYSTEM.name}</div><div class="s">Five agents, running.</div></div>
        <div class="stamp" data-k="stamp">HALT</div>
        <div class="checks"><div class="chk" data-k="k1"><i></i>No review is in flight.</div><div class="chk" data-k="k2"><i></i>The queue is drained.</div><div class="chk" data-k="k3"><i></i>Guardrails are loaded.</div></div>
        <div class="apps"><div class="app" data-k="a3"><b>Security officer</b>${Film.chip('Approved')}</div><div class="app" data-k="a4"><b>Operations lead</b>${Film.chip('Approved')}</div></div>
        <div class="outcome" data-k="o3">${Film.chip('Restarted', { big: true })}</div></div></div>`);
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K), c = this.c;
    M.rise(this.head.h, t, 0.1);
    M.rise(c.c1, t, 0.5); M.rise(c.c2, t, 0.65); M.rise(c.c3, t, 0.8);
    Film.glow(c.c1, M.ramp(t, K.triage - 0.2, K.auth - 0.2, 0.4, 0.5));
    Film.glow(c.c2, M.ramp(t, K.auth - 0.2, K.halt - 0.2, 0.4, 0.5));
    Film.glow(c.c3, M.ramp(t, K.halt - 0.2, this.span + 1, 0.4, 0.5));
    /* triage: the officer chooses Report */
    c.b1.style.setProperty('--on', 0); c.b2.style.setProperty('--on', 0);
    c.b3.style.setProperty('--on', M.p(t, K.triage + 2.2, 0.3).toFixed(3));
    M.rise(c.o1, t, K.triage + 2.8, { dy: 8 });
    /* change authorization: two approvals land, then the change applies */
    M.rise(c.a1, t, K.auth + 1.0, { dy: 8 });
    M.rise(c.a2, t, K.auth + 1.9, { dy: 8 });
    M.rise(c.w2, t, K.auth + 2.6, { dy: 6 });
    M.rise(c.o2, t, K.auth + 3.6, { dy: 8 });
    /* halt: the stamp lands, the safe-state checks turn green, two people approve, the panel restarts */
    const sp = M.p(t, K.halt + 0.3, 0.35, 'outCubic');
    c.stamp.style.opacity = sp > 0 ? 1 : 0;
    c.stamp.style.transform = `rotate(-6deg) scale(${(1.8 - 0.8 * sp).toFixed(3)})`;
    [c.k1, c.k2, c.k3].forEach((k, i) => k.style.setProperty('--ok', M.p(t, K.restart - 1.4 + i * 0.4, 0.4).toFixed(3)));
    M.rise(c.a3, t, K.restart + 0.3, { dy: 8 });
    M.rise(c.a4, t, K.restart + 1.1, { dy: 8 });
    M.rise(c.o3, t, K.restart + 2.0, { dy: 8 });
  },
});
