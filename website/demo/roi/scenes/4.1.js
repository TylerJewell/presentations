/* Scene 4.1: what it runs on. Two stacks. The hyperscaler stack: compute, storage and network at the bottom, priced
   near cost; metered managed services above (agent runtime, memory, gateway, observability, evaluation, policy), each billed by a unit, carrying the margin, with
   a bracket that marks the extra cost per request. The Akka stack: the whole stack, eleven functions in one box, on the same
   lowest layer, and only that layer bought. */
Roi.register({
  id: '4.1',

  LOW: ['Compute', 'Storage', 'Network'],
  MANAGED: [['Agent runtime', 'per vCPU-hour'], ['Memory', 'per GB and retrieval'], ['Gateway', 'per tool call'], ['Observability', 'per GB ingested'], ['Evaluations', 'per token'], ['Policy', 'per decision']],
  STACK: [['Inference', 'inference,'], ['AI controls', 'AI'], ['Model routing', 'model'], ['SLM training', 'small'], ['Agent execution', 'agent'], ['Memory and state', 'memory,'],
    ['Workflows', 'workflows,'], ['Messaging', 'messaging,'], ['Governance', 'governance,'], ['Observability', 'observability'], ['Evaluation', 'evaluations']],

  timing() {
    if (this.K) return;
    const at = (w) => Mock.captionAt(this, w);
    this.K = { whole: at('stack'), basic: at('compute,'), stack: this.STACK.map(([, w]) => at(w)), margin: at('margin'), such: at('managed'), bill: at('designed') };
  },

  render(root) {
    root.classList.add('r41');
    Mock.style('r41', `
      .r41 .ro-head { width: 1300px; }
      .r41 .side { top: 290px; }
      .r41 .ro-box { height: 74px; }
      .r41 .ro-box.low { font-size: 19px; }
      .r41 .ro-box.mg { height: 62px; flex-direction: column; gap: 2px; font-size: 20px; }
      .r41 .ro-box.mg .u { font: 500 15px var(--sans); color: var(--soft-grey); }
      .r41 .all { left: 1080px; top: 340px; width: 680px; height: 180px; border-radius: 12px; border: 1px solid rgba(255,206,74,.45); background: rgba(255,206,74,.03); }
      .r41 .all .ro-box { position: absolute; width: 155px; height: 46px; font-size: 16px; padding: 0 8px; }
      .r41 .brk { left: 0; top: 0; width: 1920px; height: 1080px; overflow: visible; pointer-events: none; }
      .r41 .brk path { fill: none; stroke: var(--white); stroke-width: 2; }
      .r41 .brk text { font: 600 20px var(--sans); fill: var(--white); }
      .r41 .brk text.y { fill: var(--yellow); }
      .r41 .brk text.s { font: 500 18px var(--sans); fill: var(--soft-grey); }
    `);
    const M = Mock;
    this.F = Roi.frame(root, { eyebrow: 'Infrastructure', headline: 'The whole stack runs on the lowest-priced layer.', lit: 0 });
    this.sideL = M.mount(root, '<div class="side ro-side" style="left:160px">Hyperscaler stack</div>').root;
    this.sideR = M.mount(root, '<div class="side ro-side" style="left:1080px">Akka, the whole stack</div>').root;
    /* left stack: six metered managed boxes in a 2x3 block (y 340..544), three low boxes in a row (y 560) */
    this.managed = this.MANAGED.map(([text, unit], i) => M.html(`<div class="ro-box mg" style="left:${160 + (i % 2) * 330}px;top:${340 + Math.floor(i / 2) * 70}px;width:310px">${text}<span class="u">${unit}</span></div>`));
    this.lowL = this.LOW.map((text, i) => M.html(`<div class="ro-box low dim" style="left:${160 + i * 220}px;top:560px;width:200px">${text}</div>`));
    /* right stack: the eleven functions in one box over the same three low boxes */
    this.all = M.html('<div class="all"></div>');
    this.stack = this.STACK.map(([text], i) => M.html(`<div class="ro-box" style="left:${15 + (i % 4) * 165}px;top:${14 + Math.floor(i / 4) * 56}px">${text}</div>`));
    this.stack.forEach((el) => this.all.appendChild(el));
    this.lowR = this.LOW.map((text, i) => M.html(`<div class="ro-box low dim" style="left:${1080 + i * 220}px;top:560px;width:200px">${text}</div>`));
    [...this.managed, ...this.lowL, this.all, ...this.lowR].forEach((el) => root.appendChild(el));
    this.svg = M.html(`<svg class="brk" viewBox="0 0 1920 1080">
      <path data-k="b1" d="M830 340 h22 v202 h-22"/><text data-k="t1" x="868" y="432">Priced with a margin</text><text class="s" data-k="t1b" x="868" y="458">more per request</text>
      <path data-k="b2" d="M830 560 h22 v74 h-22"/><text class="s" data-k="t2" x="868" y="604">Priced near cost</text>
      <path data-k="b3" d="M1770 560 h22 v74 h-22"/><text class="y" data-k="t3" x="1806" y="604">Bought</text>
    </svg>`);
    root.appendChild(this.svg);
    this.b = ['b1', 'b2', 'b3'].map((k) => this.svg.querySelector(`[data-k=${k}]`));
    this.tx = ['t1', 't1b', 't2', 't3'].map((k) => this.svg.querySelector(`[data-k=${k}]`));
  },

  at(t) {
    const M = Mock, K = (this.timing(), this.K);
    this.F.at(t, { start: 0.1 });
    M.rise(this.sideL, t, 0.5, { dy: 10 }); M.rise(this.sideR, t, 0.7, { dy: 10 });
    /* the low layers of both stacks rise first; the Akka ones light as "basic compute, storage and network" is spoken */
    [...this.lowL, ...this.lowR].forEach((el, i) => { M.rise(el, t, 0.8 + (i % 3) * 0.1); Roi.glow(el, i >= 3 ? M.ramp(t, K.basic - 0.1 + (i - 3) * 0.3, K.margin, 0.3, 0.5) : 0); });
    M.rise(this.all, t, K.whole - 0.3);
    /* the functions light in turn as each is named, then hold at a low glow */
    this.stack.forEach((el, i) => { M.rise(el, t, K.whole - 0.1 + i * 0.05, { dy: 6 }); Roi.glow(el, Math.max(M.ramp(t, K.stack[i] - 0.1, K.stack[i] + 1.2, 0.2, 0.5), 0.4 * M.prog(t, K.stack[K.stack.length - 1] + 0.8, 0.6))); });
    M.draw(this.b[2], t, K.basic, 0.5); this.tx[3].style.opacity = M.prog(t, K.basic + 0.3, 0.4).toFixed(3);
    M.draw(this.b[1], t, K.basic + 0.4, 0.5); this.tx[2].style.opacity = M.prog(t, K.basic + 0.7, 0.4).toFixed(3);
    /* the managed services rise as the margin is named; the bracket and its note as the bill is named */
    this.managed.forEach((el, i) => { M.rise(el, t, K.margin - 0.3 + i * 0.12); Roi.glow(el, 0.35 * M.ramp(t, K.such + i * 0.2, K.bill + 4, 0.3, 0.8)); });
    M.draw(this.b[0], t, K.margin + 0.3, 0.5);
    this.tx[0].style.opacity = M.prog(t, K.margin + 0.6, 0.4).toFixed(3);
    this.tx[1].style.opacity = M.prog(t, K.bill, 0.4).toFixed(3);
  },
});
