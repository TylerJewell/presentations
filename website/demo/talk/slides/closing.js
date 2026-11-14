/* Closing: the argument in one sentence, a phrase to a line, and Akka named once (the mark). A slow band
   of light crosses the dot grid while it holds. */
registerSlide({
  id: 'closing',
  act: 'close',
  title: 'Closing',
  beats: [
    { t: 3.2, say: "So let me pull it together. Your systems will keep changing every week, and the rules will keep moving underneath them. You can't review your way out of that once a year. Governance has to become controls: defined once, enforced on every request, decided by people when it matters, and proved every day." },
    { t: 4.6, say: "That's what we built Akka to do. And whatever platform you choose, including ours, it's the standard I'd ask you to hold it to. Show me the controls. Show me the verdicts. And show me the person who decided." },
  ],

  render(root) {
    const M = Mock;
    root.classList.add('sl-close');
    M.style('sl-close', `
      .sl-close .hd { left: var(--gut); top: 196px; right: var(--gut); }
      .sl-close .hd .tk-hero { font-size: 118px; line-height: 1.04; }
      .sl-close .mark { left: var(--gut); top: 884px; }
      .sl-close .glow { left: -600px; top: 0; width: 600px; height: 1080px; background: radial-gradient(closest-side, rgba(255,206,74,.09), rgba(255,206,74,0)); }
    `);
    M.dotGrid(root);
    this.glow = M.html('<div class="glow"></div>');
    root.appendChild(this.glow);
    this.h = Talk.lines(root.appendChild(M.html('<div class="hd"></div>')),
      ['Controls defined once,', 'enforced on every request,', 'decided by people,', '<span class="tk-y">proved every day.</span>'], 'tk-hero');
    this.mark = M.mount(root, `<div class="mark">${M.markSVG(40)}</div>`).root;
  },

  at(t) {
    const M = Mock;
    Talk.linesAt(this.h, t, 0.2, 0.5, 1.1);
    M.rise(this.mark, t, 3.4);
    this.glow.style.transform = `translateX(${(M.loop(t, 14) * 3100).toFixed(1)}px)`;
  },
});
