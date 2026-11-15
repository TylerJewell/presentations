/* Oversight on paper is what gets fined. Three exhibits, one per click: a data protection fine for
   decisions no person assessed, labor courts suspending rollouts until the works council was consulted,
   and the count of AI Act fines. The card being spoken about glows; the ones before it step back. The
   company fined is described, not named. Sources: report §1, "Enforcement is coming through
   data-protection authorities and courts". */
registerSlide({
  id: 'fined',
  act: 'org',
  title: 'Oversight on paper is what gets fined',
  beats: [
    { t: 3.0, say: "So far, enforcement has come through the person, from data protection authorities and labor courts. In August, the Dutch data protection authority fined a ride-hailing platform eight hundred and twenty-five million euros, because drivers were deactivated with no human assessment. It is the second-largest GDPR fine ever, and it is under appeal." },
    { t: 4.8, say: "In France, the injunctions came from labor courts. They suspended AI rollouts, pilots included, until the works council had been consulted." },
    { t: 6.6, say: "Under the AI Act itself, the count of reported fines is still zero. Oversight that exists only on paper is what gets fined." },
  ],

  CARDS: [
    { k: 'Data protection', big: '€824.99<br>million', count: 824.99, line: 'A ride-hailing platform deactivated drivers with no human assessment.',
      meta: 'Dutch data protection authority', when: '21 Aug 2026', chip: 'Under appeal' },
    { k: 'Labor courts', big: 'Rollouts<br>suspended', line: 'French courts suspended AI rollouts, pilots included, until the works council was consulted.',
      meta: 'Courts in Nanterre and Créteil' },
    { k: 'AI Act fines', big: 'None<br>reported', line: 'Enforcement so far comes from data protection law and the labor courts.',
      meta: 'EU enforcement tracker', when: 'October 2026' },
  ],

  render(root) {
    const M = Mock;
    root.classList.add('sl-fine');
    M.style('sl-fine', `
      .sl-fine .cd { top: 330px; width: 513px; height: 600px; box-sizing: border-box; padding: 40px 40px 0; }
      .sl-fine .cd .k { font: 600 24px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; color: var(--ink-2); }
      .sl-fine .cd .big { margin-top: 26px; font: 700 76px/1 var(--sans); letter-spacing: -.035em; color: var(--ink); font-variant-numeric: tabular-nums; }
      .sl-fine .cd .ln2 { margin-top: 30px; font: 500 32px/1.28 var(--sans); color: var(--ink); text-wrap: pretty; }
      .sl-fine .cd .ft { position: absolute; left: 40px; right: 40px; bottom: 38px; display: flex; flex-direction: column; align-items: flex-start; gap: 10px; }
      .sl-fine .cd .rw { display: flex; align-items: center; gap: 18px; }
      .sl-fine .cd .mt { font: 500 24px/1.25 var(--sans); color: var(--ink-2); }
      .sl-fine .src { left: var(--gut); right: var(--gut); top: 990px; }
    `);
    M.dotGrid(root);
    this.head = Talk.lines(root.appendChild(M.html('<div class="tk-top"></div>')), ['Oversight on paper is <span class="tk-y">what gets fined.</span>']);
    this.cards = this.CARDS.map((c, i) => {
      const r = M.mount(root, `<div class="cd tk-card" style="left:${150 + i * 553}px"><div class="k">${c.k}</div>
        <div class="big" data-k="big">${c.big}</div><div class="ln2">${c.line}</div>
        <div class="ft"><div class="mt">${c.meta}</div>${c.when ? `<div class="rw"><span class="mt">${c.when}</span>${c.chip ? `<span class="tk-chip dim">${c.chip}</span>` : ''}</div>` : ''}</div></div>`);
      return r;
    });
    this.amt = this.cards[0].big;
    this.src = M.mount(root, `<div class="src tk-src">Dutch data protection authority, 21 Aug 2026, the second-largest GDPR fine, under appeal (Pearl Cohen).
      Works-council rulings in Nanterre and Créteil, one holding that a pilot needs consultation too (CMS). No verified AI Act fine as of Oct 2026 (Vorplabs EU enforcement tracker).</div>`).root;
  },

  at(t) {
    const M = Mock, B = this.beats.map((b) => b.t);
    /* card i rises just after the click that leaves hold i - 1; the first rises with the headline */
    const show = [0.7, B[0] + 0.15, B[1] + 0.15];
    Talk.linesAt(this.head, t, 0.1);
    this.cards.forEach((c, i) => {
      M.rise(c.root, t, show[i], { dy: 26 });
      const on = M.p(t, show[i], 0.6) * (1 - (i < 2 ? M.p(t, show[i + 1], 0.6, 'inOutCubic') : 0));
      if (t >= show[i]) c.root.style.opacity = (M.ease.css(M.prog(t, show[i], 0.7)) * (0.5 + 0.5 * on)).toFixed(3);
      c.root.style.borderColor = on > 0.01 ? `rgba(255,206,74,${(0.16 + 0.54 * on).toFixed(3)})` : '';
      c.root.style.boxShadow = on > 0.01 ? `0 0 60px -20px rgba(255,206,74,${(0.55 * on).toFixed(3)})` : '';
      c.big.style.color = on > 0.01 ? `rgba(255,206,74,${(0.3 + 0.7 * on).toFixed(3)})` : '';
    });
    M.countUp(this.amt.firstChild, t, show[0] + 0.2, 1.6, 0, 824.99, (v) => '€' + v.toFixed(2));
    M.fade(this.src, t, 1.2, 0.6);
  },
});
