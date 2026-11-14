/* How it comes together: the section card that opens the last act, and the helpers its console
   slides share (window.Act4). */
window.Act4 = {
  /** Scoped CSS for a console slide: a smaller cursor and ripple, since the camera magnifies the world. */
  consoleCss(cls) {
    Mock.style('a4-' + cls, `
      .${cls} .mk-cursor svg { width: 17px; height: 17px; }
      .${cls} .mk-ripple { left: -13px; top: -13px; width: 26px; height: 26px; border-width: 1.5px; }
    `);
  },
  /** The deck says Upheld where the board's own mock wrote Pass or Satisfied. Run after b.at(). */
  upheld(scope) {
    scope.querySelectorAll('.chip').forEach((c) => {
      const s = c.textContent;
      if (s === 'Pass' || s === 'Satisfied') c.textContent = 'Upheld';
    });
    /* the board's signature panel lists the versions as a chain; the talk claims only that old versions are kept */
    scope.querySelectorAll('.sg .f .k').forEach((k) => { if (k.textContent === 'Chain') k.textContent = 'Versions kept'; });
    const ch = scope.querySelector('[data-k="sgCh"]');
    if (ch && ch.textContent.includes('←')) ch.textContent = ch.textContent.split(' ← ').join(', ');
  },
  /** Piecewise-linear map through [[t, v], ...]: holds the ends. */
  map(t, pts) {
    if (t <= pts[0][0]) return pts[0][1];
    for (let i = 1; i < pts.length; i++) {
      const [t1, v1] = pts[i], [t0, v0] = pts[i - 1];
      if (t <= t1) return v0 + ((v1 - v0) * (t - t0)) / (t1 - t0);
    }
    return pts[pts.length - 1][1];
  },
};

registerSlide({
  id: 'together-card',
  act: 'together',
  title: 'How it comes together',
  beats: [
    { t: 1.6, say: "Principles are easy to agree with. Everybody in this room has signed up to a set of principles at some point. The question is what they look like on a real system, on an ordinary Tuesday. So let me show you, on that loan origination assistant." },
  ],
  render(root) { this.c = Talk.card(root, ['How it', '<span class="tk-y">comes together.</span>']); },
  at(t) { Talk.cardAt(this.c, t); },
});
