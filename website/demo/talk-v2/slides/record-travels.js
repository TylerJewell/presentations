/* The record stays; the verdict travels. A requirement the research draws, not a product screen. One
   decision's record sits inside the Germany boundary; it splits, the case stays in the country and the
   verdict crosses to the centre, leaving a pointer back to the evidence. The space the verdict leaves holds
   the record's retention, which steps through the periods the research found and settles on the longest
   that applies. Last, a note on China: reading the data from abroad counts as exporting it.
   Sources: report §2 ("Data, labor law, representatives and clocks" and "Evidence stays in-country while
   verdicts travel"). */
registerSlide({
  id: 'record-travels',
  act: 'org',
  title: 'The record stays; the verdict travels',
  beats: [
    { t: 2.4, say: "That shape puts one more demand on the platform. Take one decision, made in Germany. Its record holds two different things." },
    { t: 5.6, say: "The case stays in the country where it was decided: the prompt, the output and the applicant's data. What reaches the center is the verdict: which control, what it concluded, which role decided, and when, with a pointer back to the evidence." },
    { t: 10.4, say: "And each record keeps its own retention. The periods run from six months to ten years, so each record is kept for the longest period that applies to it." },
    { t: 11.8, say: "Where the evidence is read matters too. In China, a reviewer abroad who views the data counts as an export." },
  ],

  CASE: ['Prompt', 'Output', "Applicant's data"],
  VERDICT: ['Control', 'Conclusion', "Reviewer's role", 'Time', 'Pointer to the evidence'],
  /* the retention periods the research found, then the rule each record follows */
  KEEP: [
    { v: '6 months', w: 'EU AI Act, deployer logs' },
    { v: '3 years', w: 'Colorado' },
    { v: '5 years', w: 'Korea, draft oversight records' },
    { v: '10 years', w: 'EU AI Act, authorized representative' },
    { v: 'The longest that applies', w: 'Set on each record' },
  ],
  /* verdict card: where it starts inside Germany and where it lands in the centre */
  VX: 590, VX2: 1295, VY: 370,
  PTR_Y: 659,

  render(root) {
    const M = Mock;
    root.classList.add('sl-rec2');
    M.style('sl-rec2', `
      .sl-rec2 .bd { box-sizing: border-box; border: 2px dashed rgba(241,241,241,.34); border-radius: 28px; }
      .sl-rec2 .ch { font: 600 26px/1 var(--sans); letter-spacing: .12em; text-transform: uppercase; color: var(--ink-2);
        padding: 12px 18px; border-radius: 999px; box-shadow: inset 0 0 0 2px var(--line-2); background: #0B0B0E; }
      .sl-rec2 .fr { left: 170px; top: 350px; width: 890px; height: 390px; }
      .sl-rec2 .dv { left: 574px; top: 384px; width: 2px; height: 322px; background: var(--line-2); }
      .sl-rec2 .cd { top: 370px; height: 350px; box-sizing: border-box; padding: 30px 32px 0; border-radius: 18px; border: 2px solid transparent; }
      .sl-rec2 .k { font: 600 24px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; color: var(--ink-2); }
      .sl-rec2 .it { margin-top: 18px; font: 600 30px/1 var(--sans); color: var(--ink); display: flex; align-items: center; gap: 16px; white-space: nowrap; }
      .sl-rec2 .k + .it { margin-top: 26px; }
      .sl-rec2 .it i { flex: none; width: 10px; height: 10px; border-radius: 50%; background: var(--ink-2); }
      .sl-rec2 .vd .k { color: var(--yellow); }
      .sl-rec2 .vd .it i { background: var(--yellow); }
      .sl-rec2 .hub { left: 1270px; top: 290px; width: 500px; height: 500px; box-sizing: border-box; padding: 30px 26px 0; }
      .sl-rec2 .hub .k { color: var(--ink-2); }
      .sl-rec2 .kp { left: 612px; top: 380px; width: 430px; }
      .sl-rec2 .kp .v { position: absolute; left: 0; top: 40px; width: 430px; font: 700 56px/1.02 var(--sans); letter-spacing: -.03em; color: var(--ink); text-wrap: balance; }
      .sl-rec2 .kp .w { position: absolute; left: 0; width: 430px; font: 500 24px/1.2 var(--sans); color: var(--ink-2); }
      .sl-rec2 svg.pt { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; pointer-events: none; }
      .sl-rec2 .pt path { fill: none; stroke: rgba(255,206,74,.8); stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
      .sl-rec2 .pt path.d { stroke-dasharray: 9 9; }
      .sl-rec2 .cn { left: 150px; top: 826px; width: 930px; height: 104px; display: flex; align-items: center; gap: 24px; padding: 0 26px; }
      .sl-rec2 .cn .tx { font: 500 28px/1.2 var(--sans); color: var(--ink); white-space: nowrap; }
      .sl-rec2 .src { left: var(--gut); right: var(--gut); top: 978px; }
    `);
    M.dotGrid(root);
    this.head = Talk.lines(root.appendChild(M.html('<div class="tk-top"></div>')), ['The record stays; <span class="tk-y">the verdict travels.</span>']);
    this.de = M.mount(root, `<div class="bd" style="left:150px;top:250px;width:930px;height:540px"></div>`).root;
    this.deChip = M.mount(root, `<div class="ch" style="left:182px;top:274px">Germany</div>`).root;
    this.hub = M.mount(root, `<div class="hub tk-card"><div class="k">The center</div></div>`).root;
    this.rail = M.rail(root, { style: { left: '1092px', top: '544px', width: '166px' } });
    this.frame = M.mount(root, '<div class="fr tk-card"></div>').root;
    this.div = M.mount(root, '<div class="dv"></div>').root;
    const card = (cls, x, w, title, items) => M.mount(root, `<div class="cd ${cls}" style="left:${x}px;width:${w}px"><div class="k">${title}</div>
      ${items.map((s) => `<div class="it"><i></i>${s}</div>`).join('')}</div>`).root;
    this.cs = card('cs', 190, 370, 'The case', this.CASE);
    this.vd = card('vd', this.VX, 450, 'The verdict', this.VERDICT);
    this.kp = M.mount(root, `<div class="kp"><div class="k">Kept for</div>
      ${this.KEEP.map((k) => `<div class="v">${k.v}</div>`).join('')}${this.KEEP.map((k) => `<div class="w">${k.w}</div>`).join('')}</div>`).root;
    this.kv = [...this.kp.querySelectorAll('.v')];
    this.kw = [...this.kp.querySelectorAll('.w')];
    /* the pointer: from the verdict's last row in the centre back to the case, with an arrowhead at the case */
    this.svg = M.html('<svg class="pt" viewBox="0 0 1920 1080"><path class="d"/><path class="h"/></svg>');
    root.appendChild(this.svg);
    [this.ptr, this.ptrHead] = this.svg.querySelectorAll('path');
    this.ptrHead.setAttribute('d', `M${574},${this.PTR_Y - 10} L${564},${this.PTR_Y} L${574},${this.PTR_Y + 10}`);
    this.cn = M.mount(root, `<div class="cn bd"><div class="ch">China</div><div class="tx">Reading the data from abroad counts as exporting it.</div></div>`);
    this.cnChip = this.cn.root.querySelector('.ch');
    this.src = M.mount(root, `<div class="src tk-src"><i>The requirement this research draws; not a product screen.</i> Retention: EU AI Act Art. 26(6) (deployer logs, six months) and Art. 22
      (authorized representative, ten years); Colorado <span style="white-space:nowrap">SB 26-189</span> (three years); Korea's draft oversight records (five years). China: a reviewer abroad who views data stored in China makes an export (Hogan Lovells).</div>`).root;
  },

  at(t) {
    const M = Mock, B = this.beats.map((b) => b.t), L = M.abs(t);
    const split = B[0] + 0.15, keep = B[1] + 0.15, china = B[2] + 0.15;
    Talk.linesAt(this.head, t, 0.1);
    M.rise(this.de, t, 0.4, { dy: 0 });
    M.rise(this.deChip, t, 0.5, { dy: 10 });

    /* one record, then two cards: the frame and its divider fade as each half gains its own border */
    M.rise(this.frame, t, 0.8, { dy: 18 });
    M.rise(this.div, t, 0.8, { dy: 18 });
    const sep = M.p(t, split, 0.5, 'inOutCubic');
    if (t >= split) { this.frame.style.opacity = (1 - sep).toFixed(3); this.div.style.opacity = (1 - sep).toFixed(3); }
    [this.cs, this.vd].forEach((c) => {
      M.rise(c, t, 0.8, { dy: 18 });
      c.style.borderColor = sep > 0 ? `rgba(241,241,241,${(0.16 * sep).toFixed(3)})` : '';
      c.style.background = sep > 0 ? `rgba(11,11,14,${sep.toFixed(3)})` : '';
    });
    this.frame.style.borderColor = t < split ? `rgba(255,206,74,${(0.16 + 0.5 * M.p(t, 1.2, 0.6)).toFixed(3)})` : '';

    /* the verdict crosses to the centre along the rail */
    M.rise(this.hub, t, split + 0.1, { dy: 16 });
    M.railGrow(this.rail, t, split + 0.3, 0.6);
    M.railAt(this.rail, L);
    this.rail.style.opacity = (0.8 * M.p(t, split + 0.3, 0.3) * (1 - M.p(t, split + 2.2, 0.6))).toFixed(3);
    const go = M.ease.inOutCubic(M.prog(t, split + 0.7, 1.4));
    const vx = M.lerp(this.VX, this.VX2, go);
    if (go > 0) this.vd.style.transform = `translateX(${(vx - this.VX).toFixed(1)}px)`;
    const hot = M.p(t, split + 0.5, 0.5) * (1 - M.p(t, keep, 0.6, 'inOutCubic'));
    this.vd.style.borderColor = hot > 0.01 ? `rgba(255,206,74,${(0.16 + 0.54 * hot).toFixed(3)})` : this.vd.style.borderColor;
    this.vd.style.boxShadow = hot > 0.01 ? `0 0 60px -20px rgba(255,206,74,${(0.55 * hot).toFixed(3)})` : '';

    /* the pointer back to the evidence draws from the landed verdict to the case */
    const pp = M.p(t, split + 2.2, 0.7, 'outCubic');
    const x0 = this.VX2, x1 = M.lerp(x0, 566, pp);
    this.ptr.setAttribute('d', `M${x0},${this.PTR_Y} L${x1.toFixed(1)},${this.PTR_Y}`);
    this.ptr.style.opacity = pp > 0 ? '1' : '0';
    this.ptrHead.style.opacity = M.prog(t, split + 2.8, 0.2).toFixed(3);

    /* retention steps through the periods and settles on the rule */
    const n = this.KEEP.length;
    M.fade(this.kp.querySelector('.k'), t, keep + 0.1, 0.4);
    this.kv.forEach((el, i) => {
      const s = keep + 0.3 + i * 0.85, e = i < n - 1 ? s + 0.6 : null;
      M.riseOut(el, t, s, e, { dy: 16, outDur: 0.25, outDy: 10 });
      el.style.color = i === n - 1 ? 'var(--yellow)' : '';
    });
    this.kw.forEach((el, i) => {
      const s = keep + 0.35 + i * 0.85, e = i < n - 1 ? s + 0.55 : null;
      el.style.top = i === n - 1 ? '164px' : '108px';
      M.riseOut(el, t, s, e, { dy: 10, outDur: 0.25, outDy: 6 });
    });

    /* China, and the rest steps back */
    M.rise(this.cn.root, t, china + 0.1, { dy: 16 });
    const lit = M.p(t, china + 0.2, 0.6);
    this.cnChip.style.color = lit > 0.01 ? `rgba(255,206,74,${(0.55 + 0.45 * lit).toFixed(3)})` : '';
    this.cnChip.style.boxShadow = lit > 0.01 ? `inset 0 0 0 2px rgba(255,206,74,${(0.25 + 0.5 * lit).toFixed(3)}), 0 0 ${(34 * lit).toFixed(1)}px -8px rgba(255,206,74,.7)` : '';
    this.svg.style.opacity = '1';
    this.kp.style.opacity = '1';
    const back = 1 - 0.45 * M.p(t, china, 0.6, 'inOutCubic');
    [this.de, this.deChip, this.cs, this.vd, this.hub, this.kp, this.svg].forEach((el) => {
      if (t >= china) el.style.opacity = (+el.style.opacity || 1) * back;
    });
    M.fade(this.src, t, 1.0, 0.6);
  },
});
