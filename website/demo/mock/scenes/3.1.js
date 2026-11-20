/* Scene 3.1: The governance loop. The akka.io Verify graphic (product-pages-pro/assets/site.js
   314-354), set for the loan system and driven by t: six controls take turns (guardrail, sanitizer,
   evaluation, policy, human, audit); each turn lights its row, runs lines out to the systems it applies
   to, pops a verdict tag on each, and drops an evidence row naming the regulation it answers. The
   evidence table and its counter are already running when the scene opens. */
registerScene({
  id: '3.1',
  act: 3,
  title: "The governance loop",
  duration: 14,
  headline: "Verify applies controls to any AI system.",
  caption: "Verify applies controls to any AI system: guardrails, sanitizers, evaluations, policies and people, and records every verdict as evidence against the regulations that apply.",

  MECH: [['Policies', 'allow, block, or report'], ['Evaluations', 'observe, grade, score'], ['Guardrails', 'act inline'],
    ['Sanitizers', 'redact, mask, reshape'], ['Human', 'escalations, a human in the loop'], ['Audit & attestation', 'tamper-evident']],
  SYS: [['Eligibility assessor', 'ON AKKA'], ['Underwriting workflow', 'ON AKKA'], ['Support agent', 'BUILT ELSEWHERE'], ['Fraud screening', 'BUILT ELSEWHERE']],
  /* per control: the verdict each system gets; systems built elsewhere are reached through their logs, so never act inline */
  OUT: [{ 0: 'ALLOWED', 2: 'REPORTED' }, { 0: 'GRADED', 1: 'GRADED', 2: 'GRADED', 3: 'GRADED' }, { 0: 'BLOCKED' },
    { 1: 'MASKED' }, { 1: 'ESCALATED' }, { 0: 'ATTESTED', 1: 'ATTESTED', 2: 'ATTESTED', 3: 'ATTESTED' }],
  REG: ['EU AI Act Art. 9', 'ECOA · Reg B', 'GDPR Art. 9', 'GDPR Art. 5', 'EU AI Act Art. 14', 'EU AI Act Art. 12'],
  /* the regulation pill each control's evidence lights */
  PILL: [0, 1, 2, 2, 0, 0],
  TONE: { ALLOWED: 'ok', GRADED: 'ok', ATTESTED: 'ok', REPORTED: 'info', MASKED: 'info', BLOCKED: 'bad', ESCALATED: 'warn' },
  /* the storyboard's order: guardrail, sanitizer, evaluation, policy, human, audit */
  ORDER: [2, 3, 1, 0, 4, 5],
  T0: 0.35, PHASE: 1.8,

  render(root) {
    root.classList.add('s31');
    Mock.style('s31', `
      .s31 .eb { left: 160px; top: 70px; }
      .s31 svg.vp { left: 160px; top: 124px; width: 1600px; height: 689px; overflow: visible; }
      .s31 .vp-box { fill: #0b0b0d; stroke: rgba(241,241,241,.14); stroke-width: 1.2; }
      .s31 .vp-box.plane { fill: rgba(255,206,74,.03); stroke: rgba(255,206,74,.35); }
      .s31 .vp-you { fill: var(--yellow); }
      .s31 .vp-h { font: 600 11px var(--sans); letter-spacing: .18em; fill: var(--yellow); }
      .s31 .vp-n { font: 700 44px var(--sans); letter-spacing: -.02em; fill: var(--yellow); }
      .s31 .vp-nl { font: 500 13.5px var(--sans); fill: var(--soft-grey); }
      .s31 .vp-reg rect { fill: none; stroke: rgba(241,241,241,.22); }
      .s31 .vp-reg .hl { fill: rgba(255,206,74,.14); stroke: var(--yellow); }
      .s31 .vp-reg text { font: 500 12px var(--sans); fill: var(--white); }
      .s31 .vp-row rect.b { fill: #0e0e10; stroke: rgba(241,241,241,.12); }
      .s31 .vp-row rect.hl { fill: rgba(255,206,74,.12); stroke: var(--yellow); }
      .s31 .vp-mn { font: 600 15px var(--sans); fill: var(--white); }
      .s31 .vp-md { font: 500 13px var(--sans); fill: var(--soft-grey); }
      .s31 .vp-in, .s31 .vp-out, .s31 .vp-ev { fill: none; stroke: rgba(241,241,241,.12); stroke-width: 1.3; }
      .s31 .hot { fill: none; stroke: var(--yellow); stroke-width: 1.5; stroke-dasharray: 3 6; }
      .s31 .vp-hub { fill: var(--yellow); }
      .s31 .vp-sys rect.b { fill: #0e0e10; stroke: rgba(241,241,241,.16); }
      .s31 .vp-sys rect.hl { fill: none; stroke-width: 1.4; }
      .s31 .vp-sn { font: 600 14.5px var(--sans); fill: var(--white); }
      .s31 .vp-st { font: 600 9.5px var(--sans); letter-spacing: .14em; fill: var(--soft-grey); }
      .s31 .vp-st.akka { fill: var(--yellow); }
      .s31 .vp-sd { fill: #333; }
      .s31 .vp-ss { font: 600 10.5px var(--sans); letter-spacing: .12em; }
      .s31 .vp-erow text { font: 500 12.5px var(--sans); fill: var(--white); }
      .s31 .vp-erow .c0 { fill: var(--green); }
      .s31 .vp-erow .c3 { fill: var(--soft-grey); }
      .s31 .vp-erow .c4 { fill: var(--yellow); }
      .s31 .vp-erow .c5 { fill: #5a5a5a; }
      .s31 .vp-cnt { font: 600 11px var(--sans); letter-spacing: .14em; fill: var(--soft-grey); }
      .s31 .vp-cnt tspan { fill: var(--white); }
    `);
    Mock.dotGrid(root);
    this.eb = Mock.mount(root, `<div class="mk-eyebrow eb">Akka Verify</div>`).root;

    const PILLS = [['EU AI Act', 24, 254, 88.8], ['ECOA', 120.8, 254, 52.8], ['GDPR', 181.6, 254, 52.8],
      ['NIST AI RMF', 24, 292, 103.2], ['ISO/IEC 42001', 135.2, 292, 117.6], ['SR 11-7', 24, 330, 74.4]];
    const rowY = (i) => 62 + i * 54, sysY = (i) => 62 + i * 82;
    const svg = `<svg class="vp" viewBox="0 0 1240 534"><defs><clipPath id="s31clip"><rect x="0" y="453" width="1240" height="76"/></clipPath></defs>
      <g data-k="g0">
        <rect class="vp-box" x="0.5" y="0.5" width="299" height="391" rx="14"/>
        <g class="vp-you" transform="translate(30 34)"><circle cx="0" cy="-7" r="5.5"/><path d="M-10 11 C-10 1 10 1 10 11 Z"/></g>
        <text class="vp-h" x="52" y="40">YOUR RISK TEAM</text>
        <text class="vp-n" x="24" y="118">241</text><text class="vp-nl" x="24" y="142">regulations and frameworks</text>
        <text class="vp-n" x="24" y="200">1,718</text><text class="vp-nl" x="24" y="224">controls</text>
        ${PILLS.map(([n, x, y, w]) => `<g class="vp-reg"><rect x="${x}" y="${y}" width="${w}" height="28" rx="14"/><rect class="hl" x="${x}" y="${y}" width="${w}" height="28" rx="14" opacity="0"/><text x="${x + w / 2}" y="${y + 18}" text-anchor="middle">${n}</text></g>`).join('')}
      </g>
      <g data-k="g1">
        <rect class="vp-box plane" x="370.5" y="0.5" width="459" height="391" rx="14"/>
        <text class="vp-h" x="392" y="40">CONTROLS</text>
        ${this.MECH.map(([n, d], i) => `<path class="vp-in" d="M300 212 C340 212 340 ${rowY(i) + 22} 386 ${rowY(i) + 22}"/><path class="hot in" d="M300 212 C340 212 340 ${rowY(i) + 22} 386 ${rowY(i) + 22}" opacity="0"/>
          <g class="vp-row"><rect class="b" x="386" y="${rowY(i)}" width="428" height="44" rx="9"/><rect class="hl" x="386" y="${rowY(i)}" width="428" height="44" rx="9" opacity="0"/>
          <text class="vp-mn" x="404" y="${rowY(i) + 27}">${n.replace('&', '&amp;')}</text><text class="vp-md" x="584" y="${rowY(i) + 27}">${d}</text></g>`).join('')}
      </g>
      <g data-k="g2">
        <rect class="vp-box" x="900.5" y="0.5" width="339" height="391" rx="14"/>
        <text class="vp-h" x="922" y="40">ANY AI SYSTEM</text>
        ${this.SYS.map(([n, k], i) => `<path class="vp-out" d="M830 222 C870 222 880 ${sysY(i) + 32} 916 ${sysY(i) + 32}"/><path class="hot out" d="M830 222 C870 222 880 ${sysY(i) + 32} 916 ${sysY(i) + 32}" opacity="0"/>
          <g class="vp-sys"><rect class="b" x="916" y="${sysY(i)}" width="308" height="64" rx="10"/><rect class="hl" x="916" y="${sysY(i)}" width="308" height="64" rx="10" opacity="0"/>
          <text class="vp-sn" x="934" y="${sysY(i) + 27}">${n}</text><text class="vp-st${k === 'ON AKKA' ? ' akka' : ''}" x="934" y="${sysY(i) + 47}">${k}</text>
          <circle class="vp-sd" cx="1206" cy="${sysY(i) + 32}" r="4.5"/><text class="vp-ss" x="1194" y="${sysY(i) + 36}" text-anchor="end"></text></g>`).join('')}
        <circle class="vp-hub" cx="830" cy="222" r="5"/>
      </g>
      <g data-k="g3">
        <path class="vp-ev" d="M1070 392 V416"/><path class="hot ev" d="M1070 392 V416" opacity="0"/>
        <rect class="vp-box" x="0.5" y="416" width="1239" height="117" rx="14"/>
        <text class="vp-h" x="24" y="445">EVIDENCE</text>
        <text class="vp-cnt" x="1216" y="445" text-anchor="end"><tspan data-k="cnt"></tspan> VERDICTS RECORDED</text>
        <g clip-path="url(#s31clip)"><g data-k="erows"></g></g>
      </g>
    </svg>`;
    this.r = Mock.mount(root, svg);
    const q = (s) => [...this.r.root.querySelectorAll(s)];
    this.rows = q('.vp-row rect.hl');
    this.ins = q('.hot.in');
    this.outs = q('.hot.out');
    this.ev = q('.hot.ev')[0];
    this.pills = q('.vp-reg rect.hl');
    this.sys = q('.vp-sys').map((g) => ({ hl: g.querySelector('rect.hl'), dot: g.querySelector('.vp-sd'), ss: g.querySelector('.vp-ss') }));
    /* four evidence rows: three in view, one sliding in above them */
    this.erows = [0, 1, 2, 3].map(() => {
      const g = Mock.svg('g', { class: 'vp-erow' }, this.r.erows);
      const xs = [24, 46, 250, 566, 706, 1216];
      const cells = xs.map((x, c) => { const tx = Mock.svg('text', { x, y: 0, class: 'c' + c }, g); if (c === 5) tx.setAttribute('text-anchor', 'end'); return tx; });
      return { g, cells };
    });
  },

  /* the evidence record of turn j (any integer; earlier cycles wrap) */
  record(j) {
    const k = this.ORDER[((j % 6) + 6) % 6], who = Object.keys(this.OUT[k]);
    const first = this.OUT[k][who[0]];
    const secs = 50140 + j * 2;
    const hh = `${Math.floor(secs / 3600)}:${String(Math.floor((secs % 3600) / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`;
    return ['✓', this.MECH[k][0], who.length === 4 ? 'All systems' : who.map((i) => this.SYS[i][0]).join(', '), first.toLowerCase(), this.REG[k], hh];
  },

  at(t) {
    const M = Mock, PH = this.PHASE;
    /* the graphic rises in by column */
    M.rise(this.eb, t, 0.0, { dy: 12 });
    ['g0', 'g1', 'g2', 'g3'].forEach((g, i) => {
      const el = this.r[g], o = M.ease.css(M.prog(t, 0.05 + i * 0.08, 0.7)), y = (1 - M.p(t, 0.05 + i * 0.08, 0.8)) * 18;
      el.setAttribute('opacity', o.toFixed(3));
      el.setAttribute('transform', `translate(0 ${y.toFixed(2)})`);
    });

    /* which turn: j counts from the first turn at T0; before it the previous cycle has just finished */
    const j = Math.min(5, Math.floor((t - this.T0) / PH)), u = t - this.T0 - j * PH;
    const live = j >= 0 && j <= 5;
    const k = live ? this.ORDER[j] : -1;
    const turn = (a, b) => (live ? M.ramp(u, a, b, 0.18, 0.3) : 0);
    const endHold = j === 5 ? 99 : PH - 0.05;

    this.rows.forEach((r, i) => r.setAttribute('opacity', i === k ? turn(-0.01, endHold).toFixed(3) : 0));
    this.ins.forEach((p, i) => { p.setAttribute('opacity', i === k ? turn(0.2, endHold).toFixed(3) : 0); M.march(p, M.abs(t), 26); });
    this.outs.forEach((p, i) => { p.setAttribute('opacity', live && this.OUT[k][i] ? turn(0.4, endHold).toFixed(3) : 0); M.march(p, M.abs(t), 26); });
    this.ev.setAttribute('opacity', live ? turn(0.85, 1.6).toFixed(3) : 0);
    M.march(this.ev, M.abs(t), 26);
    this.pills.forEach((p, i) => p.setAttribute('opacity', live && this.PILL[k] === i ? turn(1.0, endHold).toFixed(3) : 0));
    const COL = { ok: '#72D35B', bad: '#FF5400', warn: '#FFCE4A', info: '#F1F1F1' };
    this.sys.forEach((s, i) => {
      const st = live ? this.OUT[k][i] : undefined;
      const a = st ? turn(0.68, endHold) : 0;
      const c = st ? COL[this.TONE[st]] : '#333';
      s.hl.setAttribute('stroke', c); s.hl.setAttribute('opacity', a.toFixed(3));
      s.dot.style.fill = a > 0.5 ? c : '#333';
      s.ss.style.fill = c;
      if (s.ss._t !== (st || '')) { s.ss.textContent = st || ''; s.ss._t = st || ''; }
      s.ss.setAttribute('opacity', a.toFixed(3));
      s.ss.setAttribute('transform', `translate(0 ${((1 - M.p(u, 0.68, 0.4)) * 4).toFixed(2)})`);
    });

    /* the evidence rows: the newest record slides in on top, the oldest falls away */
    const last = live ? (u >= 1.0 ? j : j - 1) : -1;
    const since = live && last === j ? u - 1.0 : 9;
    const s = M.p(since, 0, 0.45, 'outCubic');
    this.erows.forEach((row, i) => {
      const rec = this.record(last - i);
      row.cells.forEach((c, n) => { if (c._t !== rec[n]) { c.textContent = rec[n]; c._t = rec[n]; } });
      const y = 470 + (i - 1 + s) * 22;
      row.g.setAttribute('transform', `translate(0 ${y.toFixed(2)})`);
      const op = i === 0 ? s : i === 3 ? 0.44 * (1 - s) : 1 - (i - 1 + s) * 0.28;
      row.g.setAttribute('opacity', Math.max(0, op).toFixed(3));
    });
    const cnt = M.fmt.int(M.ticker(t, 1284000, 38));
    if (this.r.cnt._t !== cnt) { this.r.cnt.textContent = cnt; this.r.cnt._t = cnt; }
  },
});
