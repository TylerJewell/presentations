/* The two panels beside the factory line. The commands panel shows Akka Specify's major commands running in
   turn, each with a small drawing of what the command produces. The verification panel shows every exit
   condition as one cell of a matrix, and a cluster of replicas that loses one and gains one. Both are plain
   functions of the state the slide passes in. */
(function () {
  const M = window.Mock;
  const NS = 'http://www.w3.org/2000/svg';
  const clamp01 = (x) => Math.min(1, Math.max(0, x));
  const lerp = (a, b, k) => a + (b - a) * k;
  const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  // A stroke with pathLength 1 draws from nothing to whole as u goes from 0 to 1.
  const drawn = (el, u) => { el.style.strokeDashoffset = (1 - clamp01(u)).toFixed(4); };

  M.style('ei-panels', `
    .ei-panel { box-sizing: border-box; height: 512px; background: #000; border: 1px solid var(--line); border-radius: 14px; padding: 22px 28px 18px; }
    .ei-panel .ph { display: flex; justify-content: space-between; align-items: baseline; white-space: nowrap; }
    .ei-panel .ph b { font: 600 20px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; color: var(--ink-2); }
    .ei-panel .ph span { font: 500 18px/1 var(--sans); color: var(--ink-3); }
    .ei-cmd .ph { flex-direction: column; align-items: flex-start; gap: 8px; }
    .ei-panel svg { display: block; overflow: visible; }
    .ei-panel svg [pathLength] { stroke-dasharray: 1; }
    .ei-cmd .row { display: grid; grid-template-columns: 38px 1fr 120px; align-items: center; margin-top: 14px; padding-top: 14px; border-top: 1px solid var(--line-2); }
    .ei-cmd code { display: block; font: 500 24px/1.1 var(--mono); color: var(--ink); }
    .ei-cmd em { display: block; margin-top: 7px; font: 500 20px/1.15 var(--sans); font-style: normal; color: var(--ink-2); white-space: nowrap; }
    .ei-cmd .sg .ring { fill: none; stroke: var(--ink-3); stroke-width: 1.5; }
    .ei-cmd .sg .spin { fill: none; stroke: var(--yellow); stroke-width: 2; stroke-linecap: round; transform-origin: 12px 12px; }
    .ei-cmd .sg .tick { fill: none; stroke: var(--green); stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .ei-cmd .art { stroke: var(--ink); stroke-width: 1.5; fill: none; stroke-linecap: round; stroke-linejoin: round; }
    .ei-cmd .art .dim { stroke: var(--ink-3); }
    .ei-cmd .art .solid { fill: var(--ink); stroke: none; }
    .ei-cmd .art .y { stroke: var(--yellow); }
    .ei-ver .cnt { font: 700 26px/1 var(--sans); letter-spacing: -.01em; color: var(--ink) !important; }
    .ei-ver .mx { margin-top: 16px; }
    .ei-ver .lg { display: flex; gap: 28px; margin-top: 10px; padding-bottom: 20px; border-bottom: 1px solid var(--line-2); font: 500 19px/1 var(--sans); color: var(--ink-2); }
    .ei-ver .lg span { display: flex; align-items: center; gap: 9px; }
    .ei-ver .lg i { width: 12px; height: 12px; border-radius: 50%; }
    .ei-ver .ph2 { margin-top: 20px; }
    .ei-ver .ph2 b { color: var(--yellow); }
    .ei-ver .ph2 span { display: flex; gap: 22px; font: 600 18px/1 var(--sans); letter-spacing: .12em; text-transform: uppercase; }
    .ei-ver .node { fill: none; stroke: var(--ink-3); stroke-width: 1.5; }
    .ei-ver .sess { fill: var(--ink); }
  `);

  /* ---------- Akka Specify commands ---------- */
  // Each command's drawing is 120 x 44 and draws itself for a progress p from 0 to 1.
  const line = (x1, y1, x2, y2, cls = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" pathLength="1" class="${cls}"/>`;
  const GRAPH = { n: [[10, 22], [46, 8], [46, 36], [84, 22], [112, 22]], e: [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4]] };
  const COMMANDS = [
    { cmd: '/akka:specify', sum: '47 requirements, 8 decisions',
      svg: [112, 84, 100, 58].map((w, i) => line(4, 7 + 10 * i, 4 + w, 7 + 10 * i)).join(''),
      draw: (g, p) => [...g.children].forEach((l, i) => drawn(l, p * 4 - i)) },
    { cmd: '/akka:plan', sum: 'Composed from Akka components',
      svg: GRAPH.e.map(([a, b]) => line(...GRAPH.n[a], ...GRAPH.n[b], 'dim')).join('') + GRAPH.n.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="0" class="solid"/>`).join(''),
      draw: (g, p) => [...g.children].forEach((c, i) => (i < 5 ? drawn(c, p * 6 - i - 0.6) : c.setAttribute('r', (4.5 * clamp01(p * 6 - (i - 5))).toFixed(2)))) },
    { cmd: '/akka:implement', sum: '365 tests pass',
      svg: '<rect x="2" y="16" width="116" height="12" rx="6" class="dim"/><rect x="5" y="19" width="0" height="6" rx="3" class="solid"/>',
      draw: (g, p) => g.children[1].setAttribute('width', (110 * clamp01(p)).toFixed(1)) },
    { cmd: '/akka:conform', sum: '40 of 40 exit conditions',
      svg: [0, 1, 2, 3, 4].map((i) => `<circle cx="${14 + 23 * i}" cy="22" r="6" class="dim"/>`).join(''),
      draw: (g, p) => [...g.children].forEach((c, i) => { const on = p >= (i + 1) / 5; c.style.fill = on ? 'var(--green)' : 'none'; c.style.stroke = on ? 'var(--green)' : ''; }) },
    { cmd: '/akka:ship', sum: 'Receipt written',
      svg: '<path d="M40 4H80V40l-5-4l-5 4l-5-4l-5 4l-5-4l-5 4l-5-4l-5 4Z" pathLength="1" class="y"/>' + line(48, 14, 72, 14, 'y') + line(48, 23, 66, 23, 'y'),
      draw: (g, p) => { drawn(g.children[0], p * 1.6); drawn(g.children[1], p * 3 - 1.4); drawn(g.children[2], p * 3 - 1.8); } },
  ];

  function commands(root) {
    const el = M.html(`<div class="ei-panel ei-cmd"><div class="ph"><b>Akka Specify commands</b><span>Run in your IDE or agent harness</span></div>${
      COMMANDS.map((c) => `<div class="row"><svg class="sg" width="24" height="24" viewBox="0 0 24 24"><circle class="ring" cx="12" cy="12" r="9"/><path class="spin" d="M12 3a9 9 0 0 1 9 9"/><path class="tick" d="M7.5 12.5l3 3l6-6.5" pathLength="1"/></svg><div><code>${c.cmd}</code><em>${c.sum}</em></div><svg class="art" width="120" height="44" viewBox="0 0 120 44">${c.svg}</svg></div>`).join('')}</div>`);
    root.appendChild(el);
    const rows = [...el.querySelectorAll('.row')].map((r) => ({ r, ring: r.querySelector('.ring'), spin: r.querySelector('.spin'), tick: r.querySelector('.tick'), sum: r.querySelector('em'), art: r.querySelector('.art') }));
    /** steps: one { progress, done } per command, each 0..1; spin is the spinner's angle in turns. A command
        that has not started is shown dim, so the whole sequence is on screen from the start. */
    function set(steps, spin) {
      rows.forEach((row, i) => {
        const s = steps[i], running = s.progress > 0 && s.done <= 0;
        row.r.style.opacity = running || s.done > 0 ? 1 : 0.4;
        row.spin.style.opacity = running ? 1 : 0;
        row.spin.style.transform = `rotate(${((spin * 360) % 360).toFixed(1)}deg)`;
        row.ring.style.stroke = s.done > 0 ? 'var(--green)' : '';
        drawn(row.tick, s.done);
        row.sum.style.opacity = s.done;
        COMMANDS[i].draw(row.art, s.progress);
      });
    }
    return { el, set };
  }

  /* ---------- Exit conditions and the runtime ---------- */
  const COLS = 10, CELLS = 40, RUNTIME = [0, 1, 2];          // the first three cells are the runtime's
  const ORDER = Array.from({ length: CELLS }, (_, i) => i).filter((i) => !RUNTIME.includes(i))
    .sort((a, b) => (a % COLS) + 1.5 * Math.floor(a / COLS) - ((b % COLS) + 1.5 * Math.floor(b / COLS)));
  // Replicas stand in four places; a session sits in one of nine slots inside its replica.
  const slot = (node, s) => [69 + 137 * node + ((s % 3) - 1) * 30, 63 + (Math.floor(s / 3) - 1) * 26];

  function verify(root) {
    const cells = Array.from({ length: CELLS }, (_, i) => `<circle cx="${27.5 + 55 * (i % COLS)}" cy="${25 + 50 * Math.floor(i / COLS)}" r="10" fill="none" stroke="#A6A6A6" stroke-width="1.5"/>`).join('');
    const nodes = [0, 1, 2, 3].map((k) => `<rect class="node" x="${6 + 137 * k}" y="8" width="126" height="110" rx="12" pathLength="1"/>`).join('');
    const el = M.html(`<div class="ei-panel ei-ver"><div class="ph"><b>Exit conditions</b><span class="cnt"></span></div>
      <svg class="mx" width="550" height="200" viewBox="0 0 550 200">${cells}</svg>
      <div class="lg"><span><i style="background:var(--yellow)"></i>Guaranteed by the runtime</span><span><i style="background:var(--green)"></i>Passed by an auditor</span></div>
      <div class="ph ph2"><b>Akka runtime</b><span><em>Resilience</em><em>Scale</em></span></div>
      <svg class="cl" width="550" height="126" viewBox="0 0 550 126">${nodes}${'<circle class="sess" r="5"/>'.repeat(18)}</svg></div>`);
    root.appendChild(el);
    const cnt = el.querySelector('.cnt'), cell = [...el.querySelectorAll('.mx circle')];
    const node = [...el.querySelectorAll('.node')], sess = [...el.querySelectorAll('.sess')];
    const tabs = [...el.querySelectorAll('.ph2 em')], cluster = el.querySelector('.cl'), head2 = el.querySelector('.ph2');
    tabs.forEach((t) => { t.style.fontStyle = 'normal'; });

    /** st: cells 0..1 (the matrix appearing), runtime [u, u, u], pass 0..1 (the sweep over the other 37),
        cluster 0..1 (appearing), fail, move, join, share: 0..1 each, in that order in time. */
    function set(st) {
      let met = 0;
      cell.forEach((c, i) => {
        const k = RUNTIME.indexOf(i);
        // The other cells pass in a diagonal sweep: each starts when the sweep reaches its rank and takes 0.15 of it.
        const u = k >= 0 ? st.runtime[k] : clamp01((st.pass - (0.85 * ORDER.indexOf(i)) / ORDER.length) / 0.15);
        const shown = clamp01(st.cells * 3 - (2 * i) / CELLS);
        const col = k >= 0 ? '#FFCE4A' : '#72D35B';
        if (u >= 0.5) met++;
        c.style.opacity = shown;
        c.setAttribute('r', (10 * (1 + 0.3 * Math.sin(Math.PI * clamp01(u)))).toFixed(2));
        c.setAttribute('fill', u >= 0.5 ? col : 'none');
        c.setAttribute('stroke', u >= 0.5 ? col : '#A6A6A6');
      });
      cnt.textContent = `${met} of ${CELLS}`;

      // A replica fails and its sessions resume on its neighbours; a new replica joins and takes its share.
      head2.style.opacity = cluster.style.opacity = st.cluster;
      node.forEach((n, k) => {
        drawn(n, k === 3 ? st.join * 1.2 : st.cluster * 1.4 - 0.1 * k);
        n.style.stroke = k === 1 && st.fail > 0 ? '#FF5400' : '';
        n.style.strokeDasharray = k === 1 && st.fail > 0.5 ? '0.03 0.02' : '';
        n.style.opacity = k === 1 ? lerp(1, 0.55, st.fail) : 1;
      });
      sess.forEach((d, i) => {
        const home = Math.floor(i / 6), s = i % 6;
        let p = slot(home, s);
        if (home === 1) {
          const to = s < 3 ? 0 : 2, a = ease(clamp01(st.move * 1.4 - 0.08 * s)), b = ease(clamp01(st.share * 1.4 - 0.08 * s));
          const mid = slot(to, 6 + (s % 3)), end = slot(3, s);
          p = [lerp(lerp(p[0], mid[0], a), end[0], b), lerp(lerp(p[1], mid[1], a), end[1], b)];
        }
        d.setAttribute('cx', p[0].toFixed(1)); d.setAttribute('cy', p[1].toFixed(1));
        d.style.opacity = clamp01(st.cluster * 2 - 0.6);
      });
      tabs[0].style.color = st.move > 0.5 ? 'var(--ink)' : 'var(--ink-3)';
      tabs[1].style.color = st.share > 0.5 ? 'var(--ink)' : 'var(--ink-3)';
    }
    return { el, set };
  }

  window.Panels = { commands, verify };
})();
