/* Title. The hero line rises; behind it, faint and always moving, the two clocks of the first act:
   a compounding yellow curve and a white stepped line that keeps splitting. */
registerSlide({
  id: 'title',
  act: 'open',
  title: 'Title',
  beats: [
    {
      t: 2.6,
      say: "Good morning. I'm Tyler Jewell, and I run Akka. We build a platform for building and running agentic AI systems, which means the governance question lands on our desk every single day, usually from people in jobs like yours. For the next half hour I want to give you an argument, not a product tour. It comes in four parts. Why the way we govern technology today is running out of time. How governance has to change shape. Seven principles that follow from that. And then what it looks like when it all works, on one real system.",
    },
  ],

  render(root) {
    const M = Mock;
    root.classList.add('sl-title');
    M.style('sl-title', `
      .sl-title svg.bg { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; }
      .sl-title .cap { fill: none; stroke: var(--yellow); stroke-width: 3; opacity: .34; }
      .sl-title .rule { fill: none; stroke: #f1f1f1; stroke-width: 2; opacity: .16; }
      .sl-title .mark { left: var(--gut); top: 108px; }
      .sl-title .hero { left: var(--gut); top: 330px; }
      .sl-title .hero .tk-hero { font-size: 156px; }
      .sl-title .who { left: var(--gut); top: 848px; display: flex; gap: 22px; align-items: baseline; }
      .sl-title .who b { font: 700 36px/1 var(--sans); letter-spacing: -.01em; color: var(--ink); }
      .sl-title .who span { font: 500 32px/1 var(--sans); color: var(--ink-2); }
    `);
    M.dotGrid(root);
    this.bg = M.html('<svg class="bg" viewBox="0 0 1920 1080"><path class="cap"/><g class="rules"></g></svg>');
    root.appendChild(this.bg);
    this.cap = this.bg.querySelector('.cap');
    this.rules = [0, 1, 2, 3, 4, 5].map(() => M.svg('path', { class: 'rule' }, this.bg.querySelector('.rules')));
    this.mark = M.mount(root, `<div class="mark">${M.markSVG(34)}</div>`).root;
    this.hero = Talk.lines(root.appendChild(M.html('<div class="hero"></div>')), ['Governing AI', 'at the speed', '<span class="tk-y">it changes.</span>'], 'tk-hero');
    this.who = M.mount(root, `<div class="who"><b>Tyler Jewell</b><span>CEO, Akka</span></div>`).root;
  },

  at(t) {
    const M = Mock;
    M.fade(this.mark, t, 0.1, 0.8);
    Talk.linesAt(this.hero, t, 0.2, 0.14, 1.1);
    M.rise(this.who, t, 1.2);
    M.fade(this.bg, t, 0, 1.6);

    /* the two clocks, drawn on the live clock so they creep on while the room settles */
    const L = M.abs(t), ph = (L / 40) % 1;
    const pts = [];
    for (let k = 0; k <= 60; k++) {
      const u = k / 60, x = 980 + u * 980;
      pts.push([x, 1000 - 40 * Math.pow(9, u * (0.9 + 0.1 * Math.sin(L / 9))) - 30 * u]);
    }
    this.cap.setAttribute('d', Talk.smooth(pts));
    this.cap.style.strokeDasharray = '2400 2400';
    this.cap.style.strokeDashoffset = (2400 * (1 - M.ease.outCubic(Math.min(1, 0.55 + 0.45 * ph)))).toFixed(1);
    this.rules.forEach((p, i) => {
      let d = 'M980 960', x = 980, y = 960;
      const split = 1100 + i * 110;
      for (let s = 0; s < 9; s++) {
        const nx = x + 110, ny = y - (x >= split ? 14 + 8 * i : 10);
        d += ` H${nx} V${ny}`;
        x = nx; y = ny;
      }
      p.setAttribute('d', d);
      p.style.opacity = (0.08 + 0.1 * M.wave(L + i * 1.7, 7)).toFixed(3);
    });
  },
});
