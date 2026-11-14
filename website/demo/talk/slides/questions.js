/* Questions. A plain card held for the Q&A; behind it, faint and always moving, the contract's loop
   turning, so the screen never looks frozen while people ask. */
registerSlide({
  id: 'questions',
  act: 'close',
  title: 'Questions',
  beats: [
    { t: 1.8, say: "Thank you for your time this morning. I'd love to take your questions, and the harder the better." },
  ],

  render(root) {
    const M = Mock;
    root.classList.add('sl-qa');
    M.style('sl-qa', `
      .sl-qa .hd { left: var(--gut); top: 390px; }
      .sl-qa .who { left: var(--gut); top: 640px; display: flex; gap: 22px; align-items: baseline; }
      .sl-qa .who b { font: 700 36px/1 var(--sans); letter-spacing: -.01em; color: var(--ink); }
      .sl-qa .who span { font: 500 32px/1 var(--sans); color: var(--ink-2); }
      .sl-qa svg.lp { left: 1240px; top: 230px; width: 620px; height: 620px; overflow: visible; }
      .sl-qa .ring { fill: none; stroke: rgba(241,241,241,.12); stroke-width: 10; }
      .sl-qa .arc { fill: none; stroke: var(--yellow); stroke-width: 4; stroke-linecap: round; opacity: .85; }
      .sl-qa .nd { fill: #0B0B0E; stroke: rgba(241,241,241,.32); stroke-width: 2.5; }
      .sl-qa .nd.on { stroke: var(--yellow); fill: #221d0d; }
    `);
    M.dotGrid(root);
    this.h = Talk.lines(root.appendChild(M.html('<div class="hd"></div>')), ['Questions.'], 'tk-hero');
    this.who = M.mount(root, `<div class="who"><b>Tyler Jewell</b><span>CEO</span></div>`).root;
    const svg = (this.svg = M.html(`<svg class="lp" viewBox="0 0 620 620"><circle class="ring" cx="310" cy="310" r="240"/><path class="arc"/></svg>`));
    root.appendChild(svg);
    this.arc = svg.querySelector('.arc');
    this.nodes = [0, 1, 2, 3, 4, 5].map((i) => {
      const a = ((i * 60 - 90) * Math.PI) / 180;
      return M.svg('circle', { class: 'nd', cx: 310 + 240 * Math.cos(a), cy: 310 + 240 * Math.sin(a), r: 28 }, svg);
    });
  },

  at(t) {
    const M = Mock;
    Talk.linesAt(this.h, t, 0.15, 0.14, 1.1);
    M.rise(this.who, t, 0.7);
    M.fade(this.svg, t, 0.4, 1.2);
    /* the arc runs round the loop on the live clock; the stage it has reached lights */
    const ph = M.loop(t, 12);
    const pt = (d) => [310 + 240 * Math.cos((d * Math.PI) / 180), 310 + 240 * Math.sin((d * Math.PI) / 180)];
    const head = -90 + 360 * ph, tail = head - 110;
    const [x0, y0] = pt(tail), [x1, y1] = pt(head);
    this.arc.setAttribute('d', `M${x0.toFixed(1)},${y0.toFixed(1)} A240,240 0 0 1 ${x1.toFixed(1)},${y1.toFixed(1)}`);
    const k = Math.floor(((ph * 6) % 6 + 6) % 6);
    this.nodes.forEach((n, i) => n.setAttribute('class', 'nd' + (i === k ? ' on' : '')));
  },
});
