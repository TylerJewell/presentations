/* Managed like software. One loan origination assistant gains judgment, then authority; its bundle grows
   12 → 34 → 51 controls, each version signed by a named owner. The versions it replaced stay signed and
   provable, so the bundle in force on any past date can be shown. */
registerSlide({
  id: 'software',
  act: 'principles',
  title: 'Managed like software',
  beats: [
    { t: 2.8, say: "Third: controls are managed like software. Take a loan origination assistant. At launch it only answers borrower questions, and the main risk is getting a disclosure wrong. Version one: twelve controls, in one bundle, signed by a named owner." },
    { t: 5.0, say: "Then it gains judgment. It starts recommending approve or decline, and fair lending becomes a real risk. Version two: thirty-four controls. Nothing about the old controls changed. The bundle grew because the system's authority grew." },
    { t: 7.2, say: "Then it gains authority. It can initiate the transfer of funds, so now you need dual control. Version three: fifty-one." },
    { t: 9.6, say: "Each version is signed, and each one it replaced is still there, still signed, still provable. If an examiner asks what governed a decision last March, you can show them the exact bundle that was in force that day. It's how you already treat code: you can always check out exactly what was running." },
  ],

  V: [
    { st: 'Launches', cap: 'Answers borrower questions', risk: 'Disclosure accuracy', n: 12, v: 'v1' },
    { st: 'Gains judgment', cap: 'Recommends approve or decline', risk: 'Fair lending', n: 34, v: 'v2' },
    { st: 'Gains authority', cap: 'Initiates the transfer of funds', risk: 'Dual control', n: 51, v: 'v3' },
  ],
  CX: [390, 960, 1530], BASE: 858, PITCH: 7,

  render(root) {
    Act3.mark(root, 3);
    const M = Mock;
    root.classList.add('sl-sw', 'a3');
    M.style('sl-sw', `
      .sl-sw .col { width: 600px; margin-left: -300px; top: 280px; text-align: center; }
      .sl-sw .col .st { font: 600 25px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; color: var(--yellow); }
      .sl-sw .col .cap { margin-top: 16px; font: 600 34px/1.15 var(--sans); color: var(--ink); }
      .sl-sw .col .rk { margin-top: 18px; display: inline-flex; font: 600 24px/1 var(--sans); color: var(--ink-2); padding: 11px 16px; border-radius: 999px; box-shadow: inset 0 0 0 2px var(--line); }
      .sl-sw .stk { width: 300px; margin-left: -150px; border-radius: 4px; transform-origin: 50% 100%;
        background: repeating-linear-gradient(0deg, var(--c) 0 5px, transparent 5px 7px); }
      .sl-sw .num { width: 500px; margin-left: -250px; top: 880px; text-align: center; }
      .sl-sw .num b { font: 700 80px/1 var(--sans); letter-spacing: -.04em; color: var(--ink); font-variant-numeric: tabular-nums; }
      .sl-sw .num span { display: block; margin-top: 8px; font: 600 25px/1 var(--sans); letter-spacing: .12em; text-transform: uppercase; color: var(--ink-2); }
      .sl-sw .seal { width: 92px; height: 92px; margin: -46px 0 0 -46px; border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center;
        box-shadow: inset 0 0 0 3px var(--yellow); background: #0b0b0e; font: 700 22px/1 var(--sans); color: var(--yellow); }
      .sl-sw .seal small { font: 600 13px/1 var(--sans); letter-spacing: .12em; margin-top: 4px; }
      .sl-sw .arr { height: 3px; background: rgba(241,241,241,.4); transform-origin: 0 50%; }
      .sl-sw .arr::after { content: ''; position: absolute; right: -2px; top: -7px; border: 8px solid transparent; border-left: 12px solid rgba(241,241,241,.6); border-right: 0; }
      .sl-sw .pv { width: 340px; margin-left: -170px; text-align: center; font: 600 24px/1 var(--sans); color: var(--ink-2); padding: 11px 0; border-radius: 999px; box-shadow: inset 0 0 0 2px rgba(241,241,241,.4); background: #000; }
      .sl-sw .q { width: 380px; margin-left: -190px; text-align: center; font: 700 26px/1 var(--sans); color: #000; background: var(--yellow); padding: 14px 0; border-radius: 999px; box-shadow: 0 0 50px -10px rgba(255,206,74,.8); }
      .sl-sw .band { width: 300px; margin-left: -150px; height: 40px; background: linear-gradient(0deg, rgba(255,255,255,0), rgba(255,255,255,.55), rgba(255,255,255,0)); mix-blend-mode: overlay; }
    `);
    M.dotGrid(root);
    this.head = Talk.lines(root.appendChild(M.html('<div class="tk-top"></div>')), ['Controls are managed <span class="tk-y">like software.</span>']);
    this.cols = this.V.map((d, i) => {
      const x = this.CX[i], h = d.n * this.PITCH - 2;
      const col = M.html(`<div class="col" style="left:${x}px"><div class="st">${d.st}</div><div class="cap">${d.cap}</div><div class="rk">Risk: ${d.risk}</div></div>`);
      const stk = M.html(`<div class="stk" style="left:${x}px;top:${this.BASE - h}px;height:${h}px"></div>`);
      const band = M.html(`<div class="band" style="left:${x}px"></div>`);
      const num = M.html(`<div class="num" style="left:${x}px"><b>0</b><span>controls · ${d.v}</span></div>`);
      const seal = M.html(`<div class="seal" style="left:${x + 196}px;top:${this.BASE - h + 10}px">✓<small>SIGNED</small></div>`);
      const pv = M.html(`<div class="pv" style="left:${x}px;top:${this.BASE - h - 66}px">Signed · provable</div>`);
      root.append(col, stk, band, num, seal, pv);
      let arr = null;
      if (i) { arr = M.html(`<div class="arr" style="left:${this.CX[i - 1] + 250}px;top:${this.BASE - 120}px;width:${this.CX[i] - this.CX[i - 1] - 500 + 40}px"></div>`); root.appendChild(arr); }
      return { d, col, stk, band, num: num.querySelector('b'), numEl: num, seal, pv, arr, h };
    });
    this.q = M.html(`<div class="q" style="left:${this.CX[1]}px;top:${this.BASE - this.cols[1].h - 140}px">In force on 14 March</div>`);
    root.appendChild(this.q);
  },

  /** the scene time each version arrives */
  arrive(i) { return [0.6, 3.0, 5.2][i]; },

  at(t) {
    const M = Mock, L = M.abs(t);
    Talk.linesAt(this.head, t, 0.1);
    const end = 7.6;
    this.cols.forEach((c, i) => {
      const a = this.arrive(i);
      M.rise(c.col, t, a);
      M.rise(c.numEl, t, a + 0.4, { dy: 10 });
      if (c.arr) { c.arr.style.transform = `scaleX(${M.p(t, a - 0.2, 0.6, 'outCubic').toFixed(3)})`; c.arr.style.opacity = M.prog(t, a - 0.2, 0.2).toFixed(3); }
      /* the stack grows from the previous version's size: the new controls are added on top */
      const prev = i ? this.V[i - 1].n : 0;
      const n = M.lerp(prev, c.d.n, M.p(t, a + 0.5, 1.0, 'inOutCubic'));
      const g = M.prog(t, a + 0.3, 0.3);
      c.stk.style.transform = `scaleY(${((n / c.d.n) * g).toFixed(4)})`;
      M.countUp(c.num, t, a + 0.5, 1.0, prev, c.d.n, (v) => String(Math.round(v)));
      const inForce = i === 2 ? true : t < this.arrive(i + 1) + 0.8;
      const sup = i < 2 ? M.p(t, this.arrive(i + 1) + 0.6, 0.6) : 0;
      c.stk.style.setProperty('--c', `color-mix(in srgb, rgba(241,241,241,.55) ${(sup * 100).toFixed(0)}%, var(--yellow))`);
      /* the seal stamps once the version is complete */
      const sp = M.prog(t, a + 1.6, 0.3);
      c.seal.style.opacity = Math.min(1, sp * 2).toFixed(3);
      c.seal.style.transform = `scale(${(sp < 1 ? 1.8 - 0.8 * M.ease.inCubic(sp) : 1).toFixed(3)})`;
      /* a verdict shimmer runs up whichever stack is in force */
      const u = (L * 0.6 + i * 0.3) % 1;
      c.band.style.top = (this.BASE - 20 - u * c.h).toFixed(1) + 'px';
      c.band.style.opacity = (inForce && t > a + 1.6 ? 0.9 * Math.min(1, 5 * u, 5 * (1 - u)) : 0).toFixed(3);
      /* the land: earlier versions stay signed and provable */
      if (i < 2) M.rise(c.pv, t, end + 0.3 + i * 0.2, { dy: 10 }); else c.pv.style.opacity = 0;
      c.col.style.opacity = Math.min(parseFloat(c.col.style.opacity || 1), 1 - 0.3 * sup).toFixed(3);
    });
    M.rise(this.q, t, end + 1.0, { dy: 14 });
    this.cols[1].stk.style.boxShadow = `0 0 0 ${(4 * M.p(t, end + 1.0, 0.5)).toFixed(1)}px rgba(255,206,74,.9)`;
  },
});
