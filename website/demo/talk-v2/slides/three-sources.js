/* Three sources. Regulation, corporate policy and the system's own team each feed controls into one
   bundle; once in force, every row is enforced the same way and keeps the tag of where it came from.
   Last, the bundle scrolls to two rows that pull in different directions, each tagged with its law. */
registerSlide({
  id: 'three-sources',
  act: 'principles',
  title: 'Three sources',
  beats: [
    { t: 2.4, say: "Third principle: controls come from three sources, and regulation is the first." },
    { t: 4.6, say: "The second is your own corporate policy: no agent approves a refund over five hundred dollars without review." },
    { t: 6.8, say: "The third is the system's own team, for a risk only they can see: this underwriting agent never sees an applicant's ID number." },
    { t: 9.2, say: "Once they're in force, every control is enforced the same way, whether it came from a team or a regulation, and each one traces back to its source." },
    { t: 12.0, say: "Two laws can pull in different directions. The UK allows an automated credit decline, with safeguards. The EU requires that a person can intervene. Both sit in the same bundle, each tagged with its law." },
  ],

  SRC: [
    { k: 'Regulation', body: '<span class="chips"><b>EU AI Act</b><b>GDPR</b><b>Fair lending</b></span>', rows: [['Oversight while it runs', 'EU AI Act'], ['Personal data minimized', 'GDPR']] },
    { k: 'Corporate policy', body: '“No agent approves a refund over $500 without review.”', rows: [['Refunds over $500 reviewed', 'Policy']] },
    { k: 'The system’s team', body: '“This underwriting agent never sees an applicant’s ID number.”', rows: [['No ID number to the agent', 'Team']] },
  ],
  /* two rows further down the same bundle, from laws that pull apart */
  PULL: [['Automated decline, with safeguards', 'UK GDPR'], ['Human intervention required', 'GDPR']],
  /* the bundle's rows scroll inside this window (stage px) */
  LIST: [1124, 456, 612, 432], ROW: 106,
  PULL_AT: 9.6,

  render(root) {
    Act3.mark(root, 3);
    const M = Mock, [lx, ly, lw, lh] = this.LIST;
    root.classList.add('sl-src', 'a3');
    M.style('sl-src', `
      .sl-src .sc { left: 150px; width: 660px; height: 196px; padding: 30px 34px; }
      .sl-src .sc .k { font: 600 25px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; color: var(--yellow); }
      .sl-src .sc .b { margin-top: 20px; font: 500 33px/1.28 var(--sans); color: var(--ink); }
      .sl-src .chips { display: flex; gap: 14px; }
      .sl-src .chips b { font: 600 27px/1 var(--sans); padding: 13px 18px; border-radius: 999px; box-shadow: inset 0 0 0 2px var(--line); }
      .sl-src svg.lk { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }
      .sl-src .lk path { fill: none; stroke: rgba(255,206,74,.5); stroke-width: 3; }
      .sl-src .lk circle { fill: var(--yellow); }
      .sl-src .bd { left: 1090px; top: 300px; width: 680px; height: 600px; padding: 32px 34px; }
      .sl-src .bd .k { font: 600 25px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; color: var(--ink-2); display: flex; align-items: center; gap: 14px; }
      .sl-src .bd .k i { width: 12px; height: 12px; border-radius: 50%; background: var(--green); }
      .sl-src .bd .t { margin-top: 14px; font: 700 46px/1.05 var(--sans); letter-spacing: -.02em; }
      .sl-src .ls { left: ${lx}px; top: ${ly}px; width: ${lw}px; height: ${lh}px; overflow: hidden; }
      .sl-src .ls .in { position: absolute; left: 0; top: 0; width: ${lw}px; }
      .sl-src .rw { position: absolute; left: 0; width: ${lw}px; height: 96px; border-top: 2px solid var(--line-2); display: grid; grid-template-columns: 136px minmax(0,1fr) 44px; align-items: center; column-gap: 16px; }
      .sl-src .rw .n { font: 600 30px/1.15 var(--sans); color: var(--ink); white-space: nowrap; }
      .sl-src .rw.pl .n { white-space: normal; font-size: 28px; text-wrap: balance; }
      .sl-src .rw .tg { font: 600 22px/1 var(--sans); letter-spacing: .04em; padding: 10px 12px; border-radius: 8px; color: var(--ink-2); box-shadow: inset 0 0 0 2px var(--line); white-space: nowrap; justify-self: start; }
      .sl-src .rw.pl .tg { color: var(--yellow); box-shadow: inset 0 0 0 2px rgba(255,206,74,.65); }
      .sl-src .rw .ck { width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font: 700 26px/1 var(--sans); color: var(--green); box-shadow: inset 0 0 0 2px rgba(114,211,91,.6); background: rgba(114,211,91,.12); }
      .sl-src .same { left: 1090px; top: 934px; width: 680px; text-align: center; font: 700 36px/1 var(--sans); color: var(--yellow); }
      .sl-src svg.br { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }
      .sl-src .br path { fill: none; stroke: var(--yellow); stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; }
      .sl-src .pull { left: 820px; width: 250px; text-align: right; font: 700 32px/1.15 var(--sans); color: var(--yellow); }
    `);
    M.dotGrid(root);
    this.head = Talk.lines(root.appendChild(M.html('<div class="tk-top"></div>')), ['Controls come from <span class="tk-y">three places.</span>']);
    this.lk = M.html('<svg class="lk" viewBox="0 0 1920 1080"></svg>');
    root.appendChild(this.lk);
    this.bd = M.mount(root, `<div class="bd tk-card"><div class="k"><i data-k="lv"></i>In force</div><div class="t">One bundle</div></div>`);
    this.ls = M.html('<div class="ls"><div class="in"></div></div>');
    root.appendChild(this.ls);
    this.in = this.ls.firstChild;
    let ry = 14;
    const row = (n, tg, cls = '') => {
      const r = M.html(`<div class="rw${cls}" style="top:${ry}px"><span class="tg">${tg}</span><span class="n">${n}</span><span class="ck">✓</span></div>`);
      this.in.appendChild(r);
      const o = { el: r, y: ly + ry, chip: r.querySelector('.ck') };
      ry += this.ROW;
      return o;
    };
    this.src = this.SRC.map((d, i) => {
      const y = 300 + i * 222;
      const el = M.html(`<div class="sc tk-card" style="top:${y}px"><div class="k">${d.k}</div><div class="b">${d.body}</div></div>`);
      root.appendChild(el);
      const rows = d.rows.map(([n, tg]) => row(n, tg));
      const p = M.svg('path', { d: `M810,${y + 98} C960,${y + 98} 950,${rows[0].y + 48} 1090,${rows[0].y + 48}` }, this.lk);
      const dots = [0, 1, 2].map(() => M.svg('circle', { r: 6 }, this.lk));
      return { el, rows, p, dots };
    });
    this.pull = this.PULL.map(([n, tg]) => row(n, tg, ' pl'));
    /* once scrolled, the two rows sit at the bottom of the window; the bracket and its words sit to their left */
    const top = this.pull[0].y - 2 * this.ROW + 8, bot = this.pull[1].y - 2 * this.ROW + 88;
    this.br = M.html(`<svg class="br" viewBox="0 0 1920 1080"><path d="M1102,${top} h-14 V${bot} h14"/></svg>`);
    root.appendChild(this.br);
    this.brp = this.br.querySelector('path');
    this.pl = M.mount(root, `<div class="pull" style="top:${((top + bot) / 2 - 37).toFixed(0)}px">They pull in different directions.</div>`).root;
    this.same = M.mount(root, `<div class="same">Enforced the same way</div>`).root;
    this.note = M.mount(root, `<div class="src tk-src">UK GDPR Arts. 22A–22D, in force 5 Feb 2026: solely automated decisions allowed with safeguards. GDPR Art. 22: a prohibition with exceptions, and the right to human intervention.</div>`).root;
  },

  /** the scene time each source arrives */
  arrive(i) { return [0.8, 2.6, 4.8][i]; },

  at(t) {
    const M = Mock, L = M.abs(t);
    Talk.linesAt(this.head, t, 0.1);
    M.rise(this.bd.root, t, 0.4);
    this.bd.lv.style.opacity = (0.45 + 0.55 * M.wave(L, 1.4)).toFixed(3);
    const conv = 7.0, P = this.PULL_AT;
    /* the pull: the sources step back and the bundle scrolls two rows down */
    const back = M.p(t, P, 0.6, 'inOutCubic');
    const scroll = M.p(t, P + 0.2, 0.9, 'inOutCubic');
    this.in.style.transform = `translateY(${(-2 * this.ROW * scroll).toFixed(1)}px)`;
    this.lk.style.opacity = (1 - back).toFixed(3);
    this.src.forEach((s, i) => {
      const a = this.arrive(i);
      M.rise(s.el, t, a, { opacity: 1 - 0.7 * back });
      M.draw(s.p, t, a + 0.5, 0.7);
      const on = M.prog(t, a + 1.1, 0.3);
      s.dots.forEach((d, k) => {
        const u = (L * 0.5 + k / 3 + i * 0.21) % 1;
        const len = s.p._len || s.p.getTotalLength();
        const pt = s.p.getPointAtLength(u * len);
        d.setAttribute('cx', pt.x.toFixed(1)); d.setAttribute('cy', pt.y.toFixed(1));
        d.style.opacity = (on * Math.min(1, 5 * u, 5 * (1 - u))).toFixed(3);
      });
      s.rows.forEach((r, k) => {
        M.rise(r.el, t, a + 1.0 + k * 0.2, { dy: 14 });
        r.chip.style.opacity = M.p(t, conv + 0.2 * (i + k), 0.4).toFixed(3);
        r.chip.style.transform = `scale(${(1 + 0.12 * M.ramp(t, conv + 0.2 * (i + k), conv + 0.2 * (i + k) + 0.8, 0.15, 0.5)).toFixed(3)})`;
      });
    });
    this.pull.forEach((r, k) => {
      r.el.style.opacity = M.ease.css(M.prog(t, P + 0.4 + k * 0.15, 0.6)).toFixed(3);
      r.chip.style.opacity = M.p(t, P + 1.0 + k * 0.15, 0.4).toFixed(3);
    });
    M.draw(this.brp, t, P + 1.1, 0.6);
    M.rise(this.pl, t, P + 1.3, { dy: 10 });
    M.rise(this.same, t, conv + 1.0, { dy: 12 });
    M.fade(this.note, t, P + 1.3, 0.6);
  },
});
