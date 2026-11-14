/* ExpTour: the snippet's Experiments view, scenes E3 to E6. It is the film's ExpView (mock/lib/experiments.js)
   with what the film's scenes start after added on top: the technique catalogue and the Propose panel in the
   stage panel, the limits board filling as the template's defaults land, a ring per segment on every axis,
   the decision statement with Favorable and Unfavorable, and the record. Each scene builds its own copy
   in render() and drives it from at() with ExpTour.set(view, state, t). */
window.ExpTour = (function () {
  const M = Mock, X = ExpView;
  const SEGS = ['US', 'UK', 'DE', 'FR'];
  const pos = (v, [lo, hi]) => M.clamp((v - lo) / (hi - lo)) * 100;
  const txt = (el, s) => { if (el.textContent !== s) el.textContent = s; };
  const vis = (el, o) => {
    el.style.opacity = o.toFixed(3);
    el.style.visibility = o > 0.001 ? 'visible' : 'hidden';
  };

  /* the catalogue, by family: Ready techniques ship now, Next ones are on the way (docs/plans/routing-experiments/backlog.md) */
  const FAMILIES = [
    [['Models', [['Swap model', 'frontier-mini, priced'], ['Smaller model', 'underwrite-4b, trained 10-12'], ['Self-hosted open-weight model']]]],
    [['Steps', [['Add a decisioning model']]], ['Agents', [['Planner and worker routing']]]],
    [['Routing rules', [['Route on a header', 'x-region seen'], ['Trial balloon']]]],
  ];
  const LIMIT_IN = [['Quality', 'at least', '(3.0%)'], ['Cost per call', 'at most', '(40.0%)'], ['Latency p95', 'at most', '150 ms'], ['Errors', 'at most', '0.5 pt']];
  const BREACH = ['Roll back automatically', 'Keep serving as configured', 'Breaching segments to baseline', 'All traffic to baseline'];
  /* the meta line under the title, once the breach choice is made */
  const META = 'underwriting, <span class="tok">frontier-large</span> to <span class="tok">underwrite-4b</span>, judge underwriting-quality v3, breaching segments to baseline on a crossed limit, exp-142';
  /* the record: stage, dates, calls, cost, and the verdict as [chip word, tone] and its note */
  const RECORD = [
    ['Propose', '10-14', '–', '–', null, 'Limits and choices set'],
    ['Evaluate', 'Skipped', '–', '–', null, ''],
    ['Shadow', '10-15 to 10-18', '2,000', '$8.40', ['Within', 'ok'], ''],
    ['Canary', '10-18 to 10-22', '11,620', '$9.20', ['Limit crossed', 'warn'], '10-19, Region · DE'],
    ['Decide', '10-22', '–', '–', ['Promoted', 'ok'], 'by T. Jewell'],
    ['Watch', '10-22 to 11-05', '–', '–', null, 'Day 1 of 14'],
  ];

  function css() {
    M.style('sxe', `
      .sxe .track .worst { display: none; }
      .sxe .track .sg { position: absolute; top: 50%; width: 11px; height: 11px; margin: -5.5px 0 0 -5.5px; border-radius: 999px; box-shadow: inset 0 0 0 1.6px var(--c-muted); }
      .sxe .track .sg.out { box-shadow: inset 0 0 0 2.5px #ff5400, 0 0 10px rgba(255,84,0,.6); }
      .sxe .track .sg b { position: absolute; left: 50%; bottom: 15px; transform: translateX(-50%); font: 600 10.5px var(--sans); color: #ff7a3d; opacity: 0; white-space: nowrap; }
      .sxe .track .sg.out b { opacity: 1; }
      .sxe .track .zone, .sxe .track .limit { transform-origin: 0 50%; }
      .s4x.sxe .legend i.worst { width: 9px; height: 9px; box-shadow: inset 0 0 0 1.6px var(--c-muted); }
      .sxe .loop .node.optional circle.c { stroke: var(--c-faint); stroke-dasharray: 4 4; }
      .sxe .loop .node.optional .n { fill: var(--c-muted); }

      .sxe .xcat, .sxe .xprop { position: absolute; left: 16px; right: 16px; }
      .sxe .xcat, .sxe .xprop { top: 52px; height: 272px; }
      .sxe .xcat { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; align-items: start; }
      .sxe .xcat .col { display: grid; gap: 10px; }
      .sxe .fam { background: var(--c-sunk); box-shadow: inset 0 0 0 1px var(--c-line); border-radius: 12px; overflow: hidden; }
      .sxe .fam .h { height: 30px; padding: 0 14px; display: flex; align-items: center; font-size: 11.5px; color: var(--c-faint); letter-spacing: .06em; text-transform: uppercase; border-bottom: 1px solid var(--c-line); }
      .sxe .tech { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 8px; align-items: center; height: 38px; padding: 0 14px; border-bottom: 1px solid var(--c-line); font-size: 13.5px; }
      .sxe .tech:last-child { border-bottom: 0; }
      .sxe .tech .m { display: block; color: var(--c-muted); font-size: 11.5px; line-height: 1.2; }
      .sxe .tech.next { color: var(--c-muted); }
      .sxe .tech.next .chip { color: var(--c-faint); }
      .sxe .tech .chip { height: 20px; font-size: 11.5px; }

      .sxe .xprop { display: grid; grid-template-columns: 292px 318px minmax(0, 1fr); gap: 22px; align-items: start; }
      .sxe .kv { display: grid; grid-template-columns: 82px minmax(0, 1fr); align-items: center; height: 28px; border-bottom: 1px solid var(--c-line); font-size: 13px; white-space: nowrap; }
      .sxe .kv .k { color: var(--c-muted); }
      .sxe .crit { display: grid; grid-template-columns: minmax(0, 1fr) 62px 92px; gap: 10px; align-items: center; height: 31px; font-size: 13px; }
      .sxe .crit .sub { color: var(--c-muted); }
      .sxe .in { position: relative; display: flex; align-items: center; justify-content: flex-end; height: 26px; padding: 0 9px; border-radius: 7px; background: var(--c-sunk); box-shadow: inset 0 0 0 1px var(--c-line); font-variant-numeric: tabular-nums; }
      .sxe .bud { display: grid; grid-template-columns: 92px minmax(0, 1fr); gap: 14px; align-items: center; height: 31px; font-size: 13px; }
      .sxe .bud .pj { color: var(--c-muted); white-space: nowrap; }
      .sxe .bud .pj b { color: var(--c-text); font-weight: 500; font-variant-numeric: tabular-nums; margin-left: 6px; }
      .sxe .xprop .opt { height: 34px; margin-top: 5px; }
      .sxe .xprop .opt:first-of-type { margin-top: 0; }
      .sxe .pbtns { position: absolute; right: 16px; top: 13px; display: flex; gap: 8px; }

      .s4x.sxe .dec .gr { grid-template-columns: minmax(0, 1fr) 70px 76px 68px 82px 58px 70px; gap: 8px; }
      .sxe .dec .fu { color: var(--c-muted); font-size: 12px; }

      .sxe .xrec { position: absolute; left: 16px; top: 52px; width: calc(100% - 452px); }
      .s4x.sxe .xrec .gr { grid-template-columns: 78px 124px 62px 60px minmax(0, 1fr); gap: 10px; height: 26px; }
      .sxe .xrec .gr.t { color: var(--c-muted); }
      .sxe .xrec .gr.t b { color: var(--c-text); font-weight: 500; }
      .sxe .xrec .vd { display: flex; align-items: center; gap: 8px; white-space: nowrap; color: var(--c-muted); }
      .sxe .xrec .vd .chip { height: 20px; font-size: 11.5px; }
    `);
  }

  function build(root) {
    css();
    root.classList.add('s4x', 'sxe');
    const view = X.build(root);
    const v = view.v, rt = v.root;

    /* the header, the rail's selected row and the meta line change as the experiment is made */
    view.h2 = rt.querySelector('.xhd h2');
    view.kind = rt.querySelector('.xhd .chip.idle');
    view.meta = rt.querySelector('.xmeta');
    view.railT = rt.querySelector('.xrail .r.on .t');
    view.railK = rt.querySelector('.xrail .r.on .m > span:last-child');
    view.xhd = rt.querySelector('.xhd');

    /* a ring per segment on every axis */
    view.lims.forEach((r) => {
      r.zone = r.el.querySelector('.zone');
      r.limit = r.el.querySelector('.limit');
      r.small = r.el.querySelector('.k small');
      r.sg = SEGS.map((s) => { const e = M.html(`<span class="sg"><b>${s}</b></span>`); r.dot.before(e); return e; });
    });
    const leg = v.board.querySelectorAll('.legend > span');
    leg[2].lastChild.textContent = 'Each segment';
    view.legProj = leg[3];
    view.meter = v.used.parentElement;
    view.proj = view.meter.querySelector('.proj');

    /* the decision statement, with Favorable and Unfavorable beside each change */
    const row = (m, b, c, d, fu, l) => `<div class="gr"><span>${m}</span><span class="r">${b}</span><span class="r">${c}</span><span class="r">${d}</span><span class="fu">${fu}</span><span class="r sub">${l}</span><span><span class="chip st ok">Within</span></span></div>`;
    v.Ldec.innerHTML = '<div class="gr h"><span>Measure</span><span class="r">Baseline</span><span class="r">Candidate</span><span class="r">Change</span><span></span><span class="r">Limit</span><span>Result</span></div>' +
      row('Quality score', '0.912', '0.901', '(1.2%)', 'Unfavorable', '(3.0%)') +
      row('Cost per call', '$0.031', '$0.009', '(71.0%)', 'Favorable', '(40.0%)') +
      row('Latency p95', '2,140 ms', '1,480 ms', '(660 ms)', 'Favorable', '150 ms') +
      row('Errors', '0.4%', '0.5%', '0.1 pt', 'Unfavorable', '0.5 pt');

    /* the breach card names the options in the words they were chosen in */
    v.dcard.querySelectorAll('.opt').forEach((o) => o.remove());
    const owner = v.dcard.querySelector('.owner');
    BREACH.forEach((b, i) => owner.before(M.html(i === 2
      ? `<div class="opt on"><span class="rd"></span><span>${b}<small>Region · DE on the frontier model</small></span><span class="chip st warn">In effect</span></div>`
      : `<div class="opt"><span class="rd"></span><span>${b}</span></div>`)));
    v.optOn = v.dcard.querySelector('.opt.on');

    /* the result card reads as a statement line */
    v.cu.querySelector('.pct span').textContent = 'Favorable';

    /* the catalogue, the Propose panel and the record sit in the stage panel beside ExpView's panes */
    const fam = ([name, items]) => `<div class="fam"><div class="h">${name}</div>${items.map(([n, m]) =>
      `<div class="tech${m ? '' : ' next'}" data-n="${n}"${n === 'Smaller model' ? ' data-k="tSmall"' : ''}><span>${n}${m ? `<span class="m">${m}</span>` : ''}</span><span class="chip ${m ? 'ok' : 'idle'}">${m ? 'Ready' : 'Next'}</span></div>`).join('')}</div>`;
    const a = M.mount(v.stage, `<div class="xcat" data-k="cat">${FAMILIES.map((c) => `<div class="col">${c.map(fam).join('')}</div>`).join('')}</div>`);
    const p = M.mount(v.stage, `
      <div class="xprop" data-k="prop">
        <div>
          <p class="sub-hd">Change</p>
          <div class="kv"><span class="k">Use case</span><span>underwriting</span></div>
          <div class="kv"><span class="k">Baseline</span><span><span class="tok">frontier-large</span></span></div>
          <div class="kv"><span class="k">Candidate</span><span><span class="tok">underwrite-4b</span></span></div>
          <div class="kv"><span class="k">Segments</span><span>Region · US, UK, DE, FR</span></div>
        </div>
        <div>
          <p class="sub-hd">Limits</p>
          ${LIMIT_IN.map(([n, s]) => `<div class="crit"><span>${n}</span><span class="sub">${s}</span><span class="in"><span class="iv"></span></span></div>`).join('')}
          <p class="sub-hd" style="margin-top:12px">Budget</p>
          <div class="bud"><span class="in" data-k="bud"><span class="iv" data-k="budv"></span></span><span class="pj" data-k="pj">Projected<b>$21.60</b></span></div>
        </div>
        <div>
          <p class="sub-hd">When a limit is crossed</p>
          ${BREACH.map((b) => `<div class="opt"><span class="rd"></span><span>${b}</span></div>`).join('')}
        </div>
      </div>`);
    const pb = M.mount(v.stage, `<span class="pbtns" data-k="pbtns"><span class="btn">Run evaluation</span><span class="btn primary" data-k="bShadow">Start shadow</span></span>`);
    const rc = M.mount(v.stage, `
      <div class="xrec" data-k="rec">
        <div class="gr h"><span>Stage</span><span>Dates</span><span class="r">Calls</span><span class="r">Cost</span><span>Verdict</span></div>
        ${RECORD.map(([s, d, n, c, vd, note]) => `<div class="gr"><span>${s}</span><span class="sub">${d}</span><span class="r">${n}</span><span class="r">${c}</span><span class="vd">${vd ? `<span class="chip st ${vd[1]}">${vd[0]}</span>` : ''}${note}</span></div>`).join('')}
        <div class="gr t"><span>Total</span><span></span><span class="r"><b>13,620</b></span><span class="r"><b>$17.60</b></span><span></span></div>
      </div>`);
    Object.assign(view, {
      cat: a.cat, tSmall: a.tSmall,
      techs: Object.fromEntries([...a.cat.querySelectorAll('.tech')].map((e) => [e.dataset.n, e])), prop: p.prop, pbtns: pb.pbtns, bShadow: pb.bShadow, bud: p.bud, budv: p.budv, pj: p.pj, rec: rc.rec,
      crit: [...p.prop.querySelectorAll('.crit')].map((el) => ({ el, in: el.querySelector('.in'), iv: el.querySelector('.iv') })),
      popts: [...p.prop.querySelectorAll('.opt')],
      cand: p.prop.querySelectorAll('.kv')[2],
    });
    return view;
  }

  /** Stage rects of the parts the tour's cursor and camera use, measured once like ExpView.measure. */
  function measure(view) {
    if (view.tr) return view.tr;
    const rc = X.measure(view);
    const r = (el) => M.rectOf(view.world, el);
    const ctr = (el) => { const [x, y, w, h] = r(el); return [x + w / 2, y + h / 2]; };
    const hd = r(view.xhd);
    /* measured where the panes rest, whatever rise they are in */
    const keep = [view.cat.style.transform, view.prop.style.transform];
    view.cat.style.transform = view.prop.style.transform = 'none';
    view.tr = Object.assign({}, rc, {
      heroH: [rc.hero[0], hd[1] - 4, rc.hero[2], rc.hero[1] + rc.hero[3] - hd[1] + 4],
      catBlock: ((c, st) => [c[0], st[1], c[2], c[1] + c[3] - st[1]])(r(view.cat), rc.stage),
      tSmall: ctr(view.tSmall), breach: ctr(view.popts[2]), bud: ctr(view.bud), bShadow: ctr(view.bShadow),
    });
    [view.cat.style.transform, view.prop.style.transform] = keep;
    return view.tr;
  }

  /** The demo clock: hours from 10-18 00:00 to "MM-DD HH:MM". */
  function clock(h) {
    const d = new Date(Date.UTC(2026, 9, 18) + Math.round(h * 60) * 60000);
    const p = (n) => String(n).padStart(2, '0');
    return `${p(d.getUTCMonth() + 1)}-${p(d.getUTCDate())} ${p(d.getUTCHours())}:${p(d.getUTCMinutes())}`;
  }

  /** Types `s` into an element: the first round(p * length) characters. */
  const type = (el, s, p) => txt(el, s.slice(0, Math.round(M.clamp(p) * s.length)));

  /**
   * ExpView's state, plus:
   *   h: the demo clock in hours from 10-18 00:00
   *   head: { title, kind: bool, meta: html }, rail: [title, kind]
   *   setup: { lim: [0..1 x4], budget: 0..1, proj: 0..1 } while the experiment is proposed: the board shows the
   *     limits landing and nothing measured
   *   dotVis: 0..1 for the overall dots; rings: [[quality, cost, p95, errors] per segment] and ringVis 0..1
   *   cat, prop, rec: opacity of the catalogue, the Propose panel and the record
   *   lit: { technique: 0..1 } as each is named
   *   pick: 0..1 hover on Smaller model, picked: bool; form: { cand, lim: [x4], breach: 0..1, budget, proj, start }
   */
  function set(view, st, t) {
    const v = X.set(view, st, t);
    txt(view.br.clk, clock(st.h));

    if (st.head) {
      txt(view.h2, st.head.title);
      view.kind.style.display = st.head.kind ? '' : 'none';
      if (view.meta.dataset.s !== st.head.meta) { view.meta.dataset.s = st.head.meta; view.meta.innerHTML = st.head.meta; }
    }
    if (st.rail) { txt(view.railT, st.rail[0]); txt(view.railK, st.rail[1]); }

    /* the limits board: while proposed, each limit lands as its band and line, and nothing is measured */
    const su = st.setup;
    X.LIMITS.forEach((l, i) => {
      const r = view.lims[i], p = su ? M.p(M.clamp(su.lim[i]), 0, 1, 'outCubic') : 1;
      r.zone.style.transformOrigin = l.side === 'min' ? '0 50%' : '100% 50%';
      r.zone.style.transform = p < 1 ? `scaleX(${p.toFixed(3)})` : 'none';
      r.limit.style.opacity = su ? (0.55 * M.clamp(su.lim[i] * 3)).toFixed(3) : '';
      r.small.style.opacity = su ? M.clamp(su.lim[i] * 2).toFixed(3) : '';
      r.dot.style.opacity = su ? 0 : st.dotVis == null ? '' : st.dotVis.toFixed(3);
      if (su) txt(r.v, '–');
      r.chip.style.visibility = su ? 'hidden' : '';
      const rings = st.rings;
      r.sg.forEach((e, k) => {
        if (!rings) { e.style.opacity = 0; return; }
        const val = rings[k][i];
        e.style.opacity = (st.ringVis ?? 1).toFixed(3);
        e.style.left = pos(val, l.span).toFixed(2) + '%';
        e.classList.toggle('out', l.side === 'min' ? val < l.limit : val > l.limit);
      });
    });
    if (su) {
      txt(v.n, 'Not run');
      v.used.style.width = '0%';
      view.proj.style.width = (54 * M.p(M.clamp(su.proj), 0, 1, 'outCubic')).toFixed(2) + '%';
      txt(v.spend, su.budget > 0 ? '$0.00 of $40 budget' : 'No budget');
      v.spend.style.opacity = su.budget > 0 ? M.lerp(0.4, 1, M.clamp(su.budget)).toFixed(3) : 0.5;
      view.legProj.style.opacity = M.clamp(su.proj).toFixed(3);
    } else {
      view.proj.style.width = '54%';
      v.spend.style.opacity = '';
      view.legProj.style.opacity = '';
    }

    /* the catalogue */
    vis(view.cat, st.cat || 0);
    view.cat.style.transform = st.cat < 1 ? `translateY(${((1 - st.cat) * 8).toFixed(1)}px)` : 'none';
    /* a technique lights as it is named; Smaller model stays lit once picked */
    for (const n in view.techs) {
      const e = view.techs[n], l = n === 'Smaller model' && st.picked ? 1 : M.clamp(((st.lit || {})[n] || 0) + (n === 'Smaller model' ? 0.5 * (st.pick || 0) : 0));
      e.style.background = l > 0 ? `rgba(201,162,39,${(0.16 * l).toFixed(3)})` : '';
      e.style.boxShadow = l > 0 ? `inset 0 0 0 1px rgba(201,162,39,${(0.45 * l).toFixed(3)})` : '';
      if (e.classList.contains('next')) e.style.color = l > 0 ? `color-mix(in srgb, var(--c-text) ${(100 * l).toFixed(0)}%, var(--c-muted))` : '';
    }

    /* the Propose panel */
    const pr = st.prop || 0, f = st.form;
    vis(view.prop, pr);
    vis(view.pbtns, pr);
    view.prop.style.transform = pr < 1 ? `translateY(${((1 - pr) * 8).toFixed(1)}px)` : 'none';
    if (f) {
      view.cand.style.background = `rgba(201,162,39,${(0.16 * (f.cand || 0)).toFixed(3)})`;
      view.crit.forEach((c, i) => {
        type(c.iv, LIMIT_IN[i][2], f.lim[i] * 1.6);
        const g = M.ramp(f.lim[i], 0.001, 1, 0.15, 0.5);
        c.in.style.boxShadow = g > 0 ? `inset 0 0 0 1px var(--c-gold-ring), 0 0 ${(12 * g).toFixed(1)}px rgba(201,162,39,${(0.35 * g).toFixed(3)})` : '';
      });
      view.popts.forEach((o, i) => o.classList.toggle('on', i === 2 && f.breach >= 1));
      view.popts[2].style.background = f.breach > 0 && f.breach < 1 ? `rgba(201,162,39,${(0.08 * f.breach).toFixed(3)})` : '';
      type(view.budv, '$40', f.budget * 1.4);
      const gb = M.ramp(f.budget, 0.001, 1, 0.15, 0.5);
      view.bud.style.boxShadow = gb > 0 ? `inset 0 0 0 1px var(--c-gold-ring), 0 0 ${(12 * gb).toFixed(1)}px rgba(201,162,39,${(0.35 * gb).toFixed(3)})` : '';
      view.pj.style.opacity = M.clamp(f.proj).toFixed(3);
      view.bShadow.style.opacity = M.lerp(0.4, 1, M.clamp(f.start)).toFixed(3);
    }

    vis(view.rec, st.rec || 0);
    view.rec.style.transform = (st.rec || 0) < 1 ? `translateY(${((1 - (st.rec || 0)) * 14).toFixed(1)}px)` : 'none';
    return v;
  }

  /**
   * The decision, scene E6, at its time t: k holds its beats { RESUME, DECIDE, PROMOTE, COUNT, REC }. E7 opens
   * on the same view at E6's end, so the two frames either side of the cut match.
   */
  function decide(view, t, k) {
    const resumed = t >= k.RESUME, decide = t >= k.DECIDE, promoted = t >= k.PROMOTE;
    const still = 1 - M.p(t, k.DECIDE - 0.3, 0.6);
    const w = (s, sp = 0.5) => (M.wander(t, sp, s) - 0.5) * still;

    const deQ = M.lerp(-3.45 + 0.08 * w(13), -2.0 + 0.2 * w(3), M.p(t, 0.1, 0.9, 'inOutCubic'));
    const segQ = [-0.3 + 0.15 * w(1), -1.6 + 0.15 * w(2), deQ, -0.8 + 0.15 * w(4)];
    const all = { quality: -1.2 + 0.25 * w(5), cost: -71 + 0.6 * w(6), p95: -660 + 30 * w(7), errors: 0.1 + 0.06 * w(8) };
    const canN = Math.round(11240 + 320 * Math.min(t, k.DECIDE) / k.DECIDE + 60 * M.prog(t, k.DECIDE - 0.2, 0.2));
    const dOut = M.p(t, k.DECIDE, 0.25, 'inOutCubic'), dIn = M.p(t, k.DECIDE + 0.22, 0.35, 'inOutCubic');
    const rOut = M.p(t, k.REC, 0.25, 'inOutCubic'), rIn = M.p(t, k.REC + 0.22, 0.45, 'inOutCubic');

    let status = ['Continuing', 'warn'];
    if (promoted) status = ['Promoted', 'ok'];
    else if (decide) status = ['Decide', 'info'];
    else if (resumed) status = ['Canary', 'info'];

    const st = {
      x: 0,
      h: 99.6 + 2 * (t - k.PROMOTE),
      status,
      hbtn: promoted ? ['Close now', 'Roll back to v12'] : ['Pause', 'Roll back'],
      head: { title: 'Smaller model for underwriting', kind: true, meta: META },
      rail: ['Smaller model for underwriting', 'Smaller model'],
      stages: {
        propose: 'done', evaluate: 'optional', shadow: 'done',
        canary: decide ? 'done' : resumed ? 'now' : 'held',
        decide: promoted ? 'done' : decide ? 'now' : 'idle',
        watch: promoted ? 'now' : 'idle',
      },
      notes: {
        evaluate: 'Skipped',
        canary: decide ? '✓' : resumed ? '50%' : 'Continuing',
        decide: promoted ? 'Promoted' : decide ? 'Yours' : '',
        watch: promoted ? 'Day 1 of 14' : '',
      },
      center: promoted ? ['100%', 'served', 'closes 11-05'] : decide ? ['50%', 'served', 'Your decision'] : resumed ? ['50%', 'served', 'Day 4'] : ['50%', 'continuing', 'DE on baseline'],
      attention: !resumed,
      board: {
        n: promoted ? 'All traffic in scope, day 1' : `Canary, n = ${M.fmt.int(canN)}`,
        v: all,
        w: { quality: deQ },
        spend: M.lerp(17.4, 17.6, M.prog(t, 0, k.DECIDE)),
      },
      rings: rings(t, segQ, all, still),
      segs: segQ.map((q, i) => ({
        q,
        calls: canN * X.SEG_SHARE[i],
        served: i === 2 && !resumed ? 'Frontier model' : 'Small model 50%',
        tint: i === 2 ? 1 - M.prog(t, 0.4, 0.5) : 0,
        ring: i === 2 ? 1 - M.prog(t, 0.4, 0.5) : 0,
        badge: i === 2 ? M.prog(t, 0.05, 0.35) : 0,
      })),
      panes: {
        Lsegs: 1 - dOut, Ldec: dIn * (1 - rOut),
        Rdec: 1 - M.p(t, k.DECIDE - 0.4, 0.4, 'inOutCubic'),
        Rpro: M.p(t, k.DECIDE, 0.5, 'inOutCubic') * (1 - M.p(t, k.PROMOTE + 0.3, 0.4, 'inOutCubic')),
        Rres: M.p(t, k.PROMOTE + 0.72, 0.4, 'inOutCubic'),
      },
      stageTitle: promoted ? 'Promoted to all traffic, route v13' : decide ? 'Result, 10-18 to 10-22' : t >= 0.5 ? 'Region · DE back within your limit' : 'Quality in Region · DE is outside your limit',
      stageRight: promoted ? 'Watch · day 1 of 14' : decide ? 'Every limit within' : 'Region · DE retrained, underwrite-4b r2',
      share: 50,
      rec: rIn,
    };
    const v = set(view, st, t);
    ramp(view, 360, tour.E4.steps());

    /* the count-down: cost per call, the frontier model's to the small model's */
    M.countUp(v.cuv, t, k.COUNT, 1.8, 0.031, 0.009, (n) => '$' + n.toFixed(3));
    M.countUp(v.cup, t, k.COUNT, 1.8, 0, 71, (n) => (n < 0.5 ? '0%' : `(${Math.round(n)}%)`));
    M.rise(v.ev, t, k.REC + 0.5, { dy: 12 });
    v.evb.textContent = `route v13 · ${clock(99.6)} · bundle v4 · sig 9c1e…4a7f`;
    v.cu.style.boxShadow = `inset 0 0 0 1px var(--c-gold-ring), 0 0 ${(26 * M.ramp(t, k.COUNT + 1.4, k.COUNT + 3.4, 0.3, 1.0)).toFixed(1)}px rgba(201,162,39,.35)`;
    return v;
  }

  /** Shadow: the quality chart draws with the clock, the small model tracking the frontier model (as scene 4.3). */
  function shadowChart(view, t, now) {
    let db = '', dc = '';
    for (let k = 0; k <= 60 * now; k++) {
      const px = 40 + k * 10, tt = (k - 60) * 0.35;
      db += (k ? 'L' : 'M') + px + ' ' + (22 + 6 * (M.wander(t + tt, 1.4, 11) - 0.5)).toFixed(1);
      dc += (k ? 'L' : 'M') + px + ' ' + (32 + 9 * (M.wander(t + tt, 1.4, 12) - 0.5)).toFixed(1);
    }
    view.v.qb.setAttribute('d', db);
    view.v.qcd.setAttribute('d', dc);
  }

  /** Shadow copies of live requests, newest first, sliding in (as scene 4.3). */
  function shadowRows(view, t) {
    const rate = 1.6, abs = M.abs(t) * rate, top = Math.floor(abs), fr = abs - top;
    view.rowEls.forEach((el, k) => {
      const id = top - k, s = M.noise(id);
      const fq = 0.88 + 0.08 * M.noise(id + 0.5), cq = fq - 0.035 + 0.05 * M.noise(id + 0.7);
      el.style.top = ((k - 1 + M.ease.outCubic(fr)) * 26).toFixed(1) + 'px';
      el.style.opacity = k === 0 ? M.ease.css(fr).toFixed(3) : k === 8 ? 0 : 1;
      txt(el.children[0], 'c-' + (40000 + id * 7).toString(16));
      txt(el.children[1], ['US', 'US', 'UK', 'DE', 'US', 'FR', 'UK', 'US', 'DE', 'US'][Math.floor(s * 10)]);
      txt(el.children[3], fq.toFixed(2));
      txt(el.children[4], cq.toFixed(2));
    });
  }

  /** The canary's actual ramp, as an SVG path to x end, stepping up at each [x, share]. */
  function ramp(view, xe, steps) {
    const yAt = (s) => (90 - s * 1.6).toFixed(1);
    let d = `M30,${yAt(10)}`;
    steps.forEach(([x, s]) => { if (x < xe) d += ` H${x.toFixed(1)} V${yAt(s)}`; });
    d += ` H${xe.toFixed(1)}`;
    view.v.act.setAttribute('d', d);
    view.v.area.setAttribute('d', d + ' V90 H30 Z');
  }

  /**
   * Each segment's values on the four axes, around the overall ones: quality from the scene, the others a
   * steady offset per segment that wanders a little
   * and stops as `still` falls to 0.
   */
  function rings(t, segQ, all, still = 1) {
    const w = (s) => (M.wander(t, 0.5, s) - 0.5) * still;
    const off = [[4, -90, -0.12], [-3.5, 45, 0.07], [7.5, 110, 0.16], [-7, -40, -0.22]];
    return segQ.map((q, k) => [q, all.cost + off[k][0] + 0.4 * w(20 + k), all.p95 + off[k][1] + 20 * w(30 + k), all.errors + off[k][2] + 0.03 * w(40 + k)]);
  }

  /* the tour's scenes by id, so E7 can open on E6's last frame */
  const tour = {};

  return { META, tour, build, measure, set, clock, decide, shadowChart, shadowRows, ramp, rings, SEG_SHARE: X.SEG_SHARE };
})();
