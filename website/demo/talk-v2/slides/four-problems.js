/* Four problems stand between the rules and your AI systems. The headline holds alone; on the click the
   four problems rise one after another as they are said, the one being said glows and the ones before it
   step back, and at the hold all four stand even. Each sentence is the headline of one of the next four
   slides. */
registerSlide({
  id: 'four-problems',
  act: 'problems',
  title: 'Four problems stand between the rules and your AI systems',
  beats: [
    { t: 1.6, say: "Four problems stand between the rules and your AI systems. Each of the principles later in this talk answers one of them." },
    { t: 13.0, say: "The rules change every month. Every country adds its own rules. Every control lands on an engineering backlog. And the first test of a control is the audit. Let's take them one at a time, starting with the rules." },
  ],

  /* glyphs in a 64x64 box: a calendar, a globe, a stack of tickets, a magnifier */
  PROBLEMS: [
    { s: 'The rules change<br>every month.', g: ['M10 14h44v42H10z', 'M10 26h44', 'M22 8v12', 'M42 8v12', 'M20 38h24', 'M20 47h14'] },
    { s: 'Every country<br>adds its own rules.', g: ['M8 32a24 24 0 1 0 48 0a24 24 0 1 0 -48 0', 'M8 32h48', 'M32 8c-10 7-10 41 0 48', 'M32 8c10 7 10 41 0 48'] },
    { s: 'Every control lands on<br>an engineering backlog.', g: ['M12 10h40v12H12z', 'M12 27h40v12H12z', 'M12 44h40v12H12z'] },
    { s: 'The first test of a control<br>is the audit.', g: ['M8 28a18 18 0 1 0 36 0a18 18 0 1 0 -36 0', 'M39 39l17 17'] },
  ],
  /* each card rises as its sentence starts, paced to the spoken sentences of beat 2 */
  SHOW: [1.9, 4.2, 6.9, 9.9],

  render(root) {
    const M = Mock;
    root.classList.add('sl-4p');
    M.style('sl-4p', `
      .sl-4p .cd { width: 790px; height: 236px; box-sizing: border-box; padding: 0 32px 0 44px; display: grid;
        grid-template-columns: 64px minmax(0, 1fr); column-gap: 32px; align-items: center; }
      .sl-4p .cd svg { width: 64px; height: 64px; overflow: visible; }
      .sl-4p .cd svg path { fill: none; stroke: var(--yellow); stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
      .sl-4p .cd .s { font: 600 48px/1.14 var(--sans); letter-spacing: -.02em; color: var(--ink); white-space: nowrap; }
    `);
    M.dotGrid(root);
    this.head = Talk.lines(root.appendChild(M.html('<div class="tk-top"></div>')), ['Four problems stand between', '<span class="tk-y">the rules and your AI systems.</span>']);
    this.cards = this.PROBLEMS.map((p, i) => {
      const x = 150 + (i % 2) * 830, y = 380 + Math.floor(i / 2) * 272;
      const el = M.html(`<div class="cd tk-card" style="left:${x}px;top:${y}px"><svg viewBox="0 0 64 64" aria-hidden="true">${p.g.map((d) => `<path d="${d}"/>`).join('')}</svg><div class="s">${p.s}</div></div>`);
      root.appendChild(el);
      return { el, paths: [...el.querySelectorAll('path')] };
    });
  },

  at(t) {
    const M = Mock, S = this.SHOW;
    /* the glow settles before the hold, so all four stand even when the click ends */
    const end = this.beats[1].t - 0.9;
    Talk.linesAt(this.head, t, 0.1);
    this.cards.forEach((c, i) => {
      const next = i < S.length - 1 ? S[i + 1] : end;
      const a = M.rise(c.el, t, S[i], { dy: 26 });
      const on = M.p(t, S[i], 0.6) * (1 - M.p(t, next, 0.6, 'inOutCubic'));
      const back = i < S.length - 1 ? M.ease.css(M.prog(t, next, 0.6)) * (1 - M.ease.css(M.prog(t, end, 0.6))) : 0;
      c.el.style.opacity = (a * (1 - 0.5 * back)).toFixed(3);
      c.el.style.borderColor = on > 0.01 ? `rgba(255,206,74,${(0.16 + 0.54 * on).toFixed(3)})` : '';
      c.el.style.boxShadow = on > 0.01 ? `0 0 60px -20px rgba(255,206,74,${(0.55 * on).toFixed(3)})` : '';
      c.el.style.background = on > 0.01 ? `linear-gradient(160deg, rgba(255,206,74,${(0.10 * on).toFixed(3)}), rgba(255,206,74,${(0.02 * on).toFixed(3)})), #0B0B0E` : '';
      c.paths.forEach((p, k) => M.draw(p, t, S[i] + 0.2 + k * 0.08, 0.7));
    });
  },
});
