/* Scene 6.4: Sovereign, on any cloud. The platform (the four product cards on their evidence rail) lifts
   as one unit and drops into each provider's region frame in turn; each frame lights with what the
   Sovereign Cloud gives it. Then all frames glow together, and each provider's wordmark brightens as the
   narration names it. Provider names are plain Instrument Sans wordmarks, never logos. */

/* The providers, in order: the wordmark shown, and the name the narration speaks. The caption is built
   from this list, so removing a provider changes the frame row and the narration together.
   Alibaba Cloud awaits confirmation that its support is public (demo/research/economics-sovereign.md §2). */
const PROVIDERS = [
  { name: 'AWS', spoken: 'AWS' },
  { name: 'Microsoft Azure', spoken: 'Azure' },
  { name: 'Google Cloud', spoken: 'Google Cloud' },
  { name: 'T-Systems', spoken: 'T-Systems' },
  { name: 'Alibaba Cloud', spoken: 'Alibaba Cloud' },
];

registerScene({
  id: '6.4',
  act: 6,
  title: 'Sovereign, on any cloud',
  duration: 14,
  caption: 'And for sovereign needs, the whole platform runs as a Sovereign Cloud: country-isolated data, networking and operations, in ' +
    PROVIDERS.slice(0, -1).map((p) => p.spoken).join(', ') + (PROVIDERS.length > 1 ? ' or ' : '') + PROVIDERS[PROVIDERS.length - 1].spoken + '.',

  /* the master unit, and the row of frames */
  U: { x: 520, y: 196, w: 880, h: 160 },
  F: { x: 160, w: 1600, gap: 24, y: 420, h: 340 },
  DROP0: 0.9, DROP_PITCH: 1.3, DROP_DUR: 1.0,
  ATTRS: ['Country-isolated data, networking and operations', 'Local SREs', 'Active-active'],

  render(root) {
    root.classList.add('s64');
    Mock.style('s64', `
      .s64 .h { left: var(--gutter); top: 80px; }
      .s64 .unit { width: 880px; height: 160px; transform-origin: 0 0; }
      .s64 .unit .cd { position: absolute; top: 0; width: 205px; height: 104px; padding: 16px 18px; border-radius: 12px;
        border: 1px solid rgba(255,206,74,.4); background: linear-gradient(160deg, rgba(255,206,74,.12), rgba(255,206,74,.03)), #0b0b0d; }
      .s64 .unit .cd svg { position: absolute; right: 16px; top: 16px; width: 34px; height: 34px; overflow: visible; }
      .s64 .unit .cd svg path { fill: none; stroke: var(--yellow); stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; }
      .s64 .unit .cd .k { position: absolute; left: 18px; bottom: 44px; font: 600 11px/1 var(--sans); letter-spacing: .16em; text-transform: uppercase; color: var(--soft-grey); }
      .s64 .unit .cd .n { position: absolute; left: 18px; bottom: 16px; font: 700 24px/1 var(--sans); letter-spacing: -.02em; color: var(--white); white-space: nowrap; }
      .s64 .unit .rl { position: absolute; left: 0; top: 128px; width: 880px; height: 3px; }
      .s64 .unit .rn { position: absolute; left: 0; top: 142px; width: 880px; text-align: center; font: 600 12px/1 var(--sans); letter-spacing: .18em; text-transform: uppercase; color: var(--yellow); }
      .s64 .ulab { left: 520px; top: 168px; width: 880px; text-align: center; font: 600 13px/1 var(--sans); letter-spacing: .2em; text-transform: uppercase; color: var(--soft-grey); }
      .s64 .fr { --g: 0; height: 340px; border-radius: 14px;
        border: 1px solid color-mix(in srgb, var(--yellow) calc(var(--g) * 60%), rgba(241,241,241,.14));
        background: linear-gradient(170deg, rgba(255,206,74,calc(var(--g) * .10)), rgba(255,206,74,0) 60%), rgba(255,255,255,.015);
        box-shadow: 0 0 calc(var(--g) * 60px) calc(var(--g) * -22px) rgba(255,206,74,.75); }
      .s64 .fr .wm { position: absolute; left: 22px; top: 24px; font: 600 28px/1 var(--sans); letter-spacing: -.02em; white-space: nowrap; }
      .s64 .fr .tier { position: absolute; left: 22px; top: 64px; font: 600 11.5px/1 var(--sans); letter-spacing: .16em; text-transform: uppercase; color: var(--medium-grey); }
      .s64 .fr .slot { position: absolute; left: 20px; top: 98px; height: 62px; border: 1px dashed rgba(241,241,241,.14); border-radius: 10px; }
      .s64 .fr .at { position: absolute; left: 22px; right: 18px; display: flex; gap: 10px; align-items: flex-start; font: 500 16px/1.32 var(--sans); color: var(--white); }
      .s64 .fr .at i { flex: none; width: 8px; height: 8px; margin-top: 7px; border-radius: 50%; background: var(--yellow); }
      .s64 .fr .at i.ok { background: var(--green); box-shadow: 0 0 10px rgba(114,211,91,.7); }
      .s64 .ring { height: 2px; background: linear-gradient(90deg, rgba(255,206,74,0), rgba(255,206,74,.8), rgba(255,206,74,0)); transform-origin: 50% 50%; }
    `);
    const world = (this.world = Mock.world(root));
    Mock.dotGrid(world);
    this.h = Mock.mount(world, `<h2 class="mk-h2 h">The platform is sovereign on <span class="accent">any cloud.</span></h2>`).root;
    this.ulab = Mock.mount(world, `<div class="ulab">The whole platform</div>`).root;

    const F = this.F, n = PROVIDERS.length, fw = (F.w - F.gap * (n - 1)) / n;
    this.fw = fw;
    this.scale = (fw - 40) / this.U.w;
    this.frames = PROVIDERS.map((p, i) => {
      const x = F.x + i * (fw + F.gap);
      const r = Mock.mount(world, `<div class="fr" style="left:${x}px;top:${F.y}px;width:${fw}px">
        <div class="wm" data-k="wm">${p.name}</div><div class="tier" data-k="tier">Sovereign Cloud</div>
        <div class="slot" data-k="slot" style="width:${fw - 40}px"></div>
        ${this.ATTRS.map((a, j) => `<div class="at" data-k="a${j}" style="top:${186 + [0, 64, 100][j]}px"><i class="${j === 2 ? 'ok' : ''}"></i><span>${a}</span></div>`).join('')}
      </div>`);
      return Object.assign({ x }, r);
    });
    this.ringEl = Mock.mount(world, `<div class="ring" style="left:${F.x}px;top:${F.y + F.h + 14}px;width:${F.w}px"></div>`).root;

    /* the master unit and one copy per frame, which travels down into it */
    this.master = this.unit(world);
    this.copies = PROVIDERS.map(() => this.unit(world));
  },

  /** Builds one platform unit: four cards on the evidence rail. */
  unit(parent) {
    const el = Mock.html(`<div class="unit">${Mock.PRODUCTS.map((p, i) => `<div class="cd" style="left:${i * 225}px">
      <svg viewBox="0 0 64 64">${(Mock.GLYPHS[p.id] || []).map((d) => `<path d="${d}"/>`).join('')}</svg>
      <span class="k">${p.kind}</span><span class="n">${p.name}</span></div>`).join('')}
      <div class="rl mk-rail"></div><div class="rn">One evidence record</div></div>`);
    parent.appendChild(el);
    return { el, rail: el.querySelector('.rl'), txt: el.querySelectorAll('.k, .n, .rn') };
  },

  at(t) {
    const M = Mock, U = this.U, F = this.F, abs = M.abs(t);
    const drop = (i) => this.DROP0 + i * this.DROP_PITCH;
    const all = drop(PROVIDERS.length - 1) + this.DROP_DUR + 0.5;

    /* the closing push keeps the headline (top 80) in frame with all five clouds */
    M.camera(this.world, t, [{ t: all, rect: [F.x, 56, F.w, F.y + F.h + 34 - 56], dur: 1.3 }]);
    M.rise(this.h, t, -0.3);
    M.fade(this.ulab, t, -0.1, 0.5);

    /* the master: already live, and lifting a little as each copy leaves it */
    const lifts = PROVIDERS.reduce((a, _, i) => Math.max(a, M.ramp(t, drop(i) - 0.15, drop(i) + 0.55, 0.15, 0.35)), 0);
    M.set(this.master.el, { transform: `translate(${U.x}px, ${(U.y - 10 * lifts).toFixed(1)}px)`, opacity: M.p(t, -0.4, 0.6).toFixed(3),
      filter: `drop-shadow(0 0 ${(26 * lifts).toFixed(1)}px rgba(255,206,74,.45))` });
    M.railAt(this.master.rail, abs, 10);

    /* each copy: lift, travel down, shrink into the frame's slot */
    this.copies.forEach((c, i) => {
      const fr = this.frames[i], s0 = drop(i);
      const p = M.ease.inOutCubic(M.prog(t, s0, this.DROP_DUR));
      const sx = fr.x + 20, sy = F.y + 98 + (62 - U.h * this.scale) / 2;
      const x = M.lerp(U.x, sx, p), y = M.lerp(U.y, sy, p) - Math.sin(Math.PI * Math.min(1, p * 1.6)) * 26 * (1 - p);
      const s = M.lerp(1, this.scale, p);
      M.set(c.el, { transform: `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) scale(${s.toFixed(4)})`, opacity: t >= s0 ? 1 : 0 });
      c.txt.forEach((e) => (e.style.opacity = (1 - M.prog(t, s0 + 0.2, 0.5)).toFixed(3)));
      M.railAt(c.rail, abs, 10);
    });

    /* frames: present from the start; each lights when its copy lands, then all glow together */
    const together = M.ramp(t, all, all + 2.4, 0.4, 0.9);
    this.frames.forEach((fr, i) => {
      const land = drop(i) + this.DROP_DUR;
      M.rise(fr.root, t, -0.3 + i * 0.06, { dy: 16 });
      const flash = M.ramp(t, land - 0.1, land + 1.2, 0.15, 0.8);
      fr.root.style.setProperty('--g', Math.min(1, 0.4 * M.p(t, land - 0.1, 0.4) + 0.6 * flash + 0.5 * together).toFixed(3));
      fr.slot.style.opacity = (1 - M.prog(t, land - 0.2, 0.3)).toFixed(3);
      this.ATTRS.forEach((_, j) => M.rise(fr['a' + j], t, land + 0.1 + j * 0.12, { dy: 10 }));
      /* the wordmark brightens as the narration names the provider */
      const said = M.captionAt(this, PROVIDERS[i].spoken.split(' ')[0]);
      const hi = M.ramp(t, said - 0.1, said + 1.1, 0.15, 0.6);
      fr.wm.style.color = `color-mix(in srgb, var(--yellow) ${(100 * hi).toFixed(0)}%, var(--white))`;
      fr.wm.style.textShadow = hi ? `0 0 ${(18 * hi).toFixed(1)}px rgba(255,206,74,.6)` : 'none';
    });
    this.ringEl.style.opacity = M.p(t, all, 0.6).toFixed(3);
    this.ringEl.style.transform = `scaleX(${M.p(t, all, 1.1, 'outCubic').toFixed(3)})`;
  },
});
