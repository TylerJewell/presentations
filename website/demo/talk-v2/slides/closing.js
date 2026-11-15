/* Closing: the argument in one sentence, a phrase to a line; then, in its place and in hero type sized
   so its longest line fits, the test for any platform. Both sit on the left gutter like the title, with
   Akka named once (the mark) below them. A slow band of light crosses the dot grid while it holds. */
registerSlide({
  id: 'closing',
  act: 'close',
  title: 'Closing',
  beats: [
    { t: 3.2, say: "To pull it together, your systems will keep changing every week, and the rules will keep moving underneath them, differently in every country. Governance has to become controls: defined once, enforced on every request, decided by people when it matters, and recorded every time." },
    { t: 7.0, say: "That's what we built Akka to do. Whatever platform you choose, including ours, here is the test I'd hold it to, in any country you operate in. Show me the controls. Show me the verdicts. And show me the person who decided, and why that person was allowed to decide." },
  ],

  render(root) {
    const M = Mock;
    root.classList.add('sl-close');
    M.style('sl-close', `
      .sl-close .hd { left: var(--gut); top: 196px; right: var(--gut); }
      .sl-close .hd .tk-hero { font-size: 118px; line-height: 1.04; }
      .sl-close .hd.ts .tk-hero { font-size: 104px; }
      .sl-close .mark { left: var(--gut); top: 884px; }
      .sl-close .glow { left: -600px; top: 0; width: 600px; height: 1080px; background: radial-gradient(closest-side, rgba(255,206,74,.09), rgba(255,206,74,0)); }
    `);
    M.dotGrid(root);
    this.glow = M.html('<div class="glow"></div>');
    root.appendChild(this.glow);
    this.h = Talk.lines(root.appendChild(M.html('<div class="hd"></div>')),
      ['Controls are defined once,', 'enforced on every request,', 'decided by people,', '<span class="tk-y">and recorded every time.</span>'], 'tk-hero');
    this.ts = Talk.lines(root.appendChild(M.html('<div class="hd ts"></div>')),
      ['Show me the controls.', 'Show me the verdicts.', 'Show me the person who decided,', '<span class="tk-y">and why they were allowed to.</span>'], 'tk-hero');
    this.mark = M.mount(root, `<div class="mark">${M.markSVG(40)}</div>`).root;
  },

  at(t) {
    const M = Mock;
    /* the argument, then the test rises in its place */
    Talk.linesAt(this.h, t, 0.2, 0.5, 1.1);
    const swap = M.p(t, 3.5, 0.6, 'inOutCubic');
    this.h.el.style.opacity = (1 - swap).toFixed(3);
    this.h.el.style.transform = swap ? `translateY(${(-16 * swap).toFixed(1)}px)` : 'none';
    Talk.linesAt(this.ts, t, 4.0, 0.45, 1.0);
    M.rise(this.mark, t, 2.4);
    this.glow.style.transform = `translateX(${(M.loop(t, 14) * 3100).toFixed(1)}px)`;
  },
});
