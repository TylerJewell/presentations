/* The presenter view (index.html?presenter=1), for the second screen. It follows the show over
   BroadcastChannel and sends it commands, so the clicker works in either window.

   It shows the hold the show is heading to and the next one (two ?still=1 frames), the words for this
   beat, the clock, the time since the first click, and planned against actual time per act. Press T to
   restart the timer. */
(function () {
  const P = (window.TalkPresenter = {});

  const css = `
    html, body { height: 100%; overflow: hidden; }
    body.presenter { background: #0a0a0c; color: #f1f1f1; font: 500 18px/1.4 var(--sans); }
    body.presenter #viewport { display: none; }
    .pv { position: fixed; inset: 0; display: grid; grid-template-columns: minmax(0, 1.55fr) minmax(0, 1fr); grid-template-rows: auto minmax(0, 1fr); gap: 18px; padding: 18px 22px; }
    .pv-top { grid-column: 1 / -1; display: flex; align-items: baseline; gap: 34px; }
    .pv-top .clock { font: 700 44px/1 var(--sans); letter-spacing: -.02em; font-variant-numeric: tabular-nums; }
    .pv-top .el { font: 700 44px/1 var(--sans); color: var(--yellow); font-variant-numeric: tabular-nums; letter-spacing: -.02em; }
    .pv-top .k { font: 600 13px/1 var(--sans); letter-spacing: .16em; text-transform: uppercase; color: #8d8d96; margin-right: 10px; }
    .pv-top .delta { font: 600 22px/1 var(--sans); font-variant-numeric: tabular-nums; }
    .pv-top .delta.ahead { color: var(--green); } .pv-top .delta.behind { color: var(--red); }
    .pv-top .sp { flex: 1; }
    .pv-top .where { font: 600 18px/1 var(--sans); color: #c9c9d0; }
    .pv-top .conn { font: 600 13px/1 var(--sans); letter-spacing: .1em; text-transform: uppercase; }
    .pv-top .conn.off { color: var(--red); } .pv-top .conn.on { color: var(--green); }
    .pv-l, .pv-r { min-height: 0; display: flex; flex-direction: column; gap: 14px; }
    .pv-fr { position: relative; width: 100%; aspect-ratio: 16 / 9; border-radius: 10px; overflow: hidden; background: #000; box-shadow: 0 0 0 1px rgba(241,241,241,.16); flex: none; }
    .pv-fr iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; pointer-events: none; }
    .pv-fr .tag { position: absolute; left: 10px; top: 10px; z-index: 2; font: 600 12px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; padding: 6px 8px; border-radius: 6px; background: rgba(0,0,0,.7); color: #d8d8de; }
    .pv-fr.anim .tag { color: var(--yellow); }
    .pv-say { flex: 1; min-height: 0; overflow: auto; padding: 4px 4px 4px 0; }
    .pv-say .ttl { font: 600 14px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; color: var(--yellow); margin-bottom: 10px; }
    .pv-say p { margin: 0; font: 500 30px/1.42 var(--sans); color: #f4f3ef; text-wrap: pretty; }
    .pv-next { font: 500 19px/1.4 var(--sans); color: #b8b8c0; }
    .pv-next b { display: block; font: 600 13px/1 var(--sans); letter-spacing: .14em; text-transform: uppercase; color: #8d8d96; margin-bottom: 6px; }
    .pv-acts { border-collapse: collapse; width: 100%; font: 500 16px/1.2 var(--sans); font-variant-numeric: tabular-nums; }
    .pv-acts td, .pv-acts th { padding: 7px 6px; border-top: 1px solid rgba(241,241,241,.12); text-align: right; }
    .pv-acts th { font: 600 12px/1 var(--sans); letter-spacing: .12em; text-transform: uppercase; color: #8d8d96; }
    .pv-acts td:first-child, .pv-acts th:first-child { text-align: left; }
    .pv-acts tr.on td { color: var(--yellow); }
    .pv-acts td.over { color: var(--red); }
    .pv-help { font: 500 13px/1.4 var(--sans); color: #77777f; }
  `;

  const fmt = (s) => { const n = Math.max(0, Math.round(Math.abs(s))); return `${Math.floor(n / 60)}:${String(n % 60).padStart(2, '0')}`; };

  P.boot = function ({ outline, send, onMsg, acts }) {
    const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    document.title = 'Presenter: ' + document.title;
    const flat = [];
    outline.forEach((s) => s.beats.forEach((b, k) => flat.push({ s, k, b })));
    const actKeys = [...new Set(outline.map((s) => s.act))];
    const planAct = {}; actKeys.forEach((a) => (planAct[a] = 0));
    flat.forEach((f) => (planAct[f.s.act] += f.b.plan));
    const total = flat.reduce((a, f) => a + f.b.plan, 0);
    const base = location.href.split('?')[0].split('#')[0];

    const root = Mock.mount(document.body, `
      <div class="pv">
        <div class="pv-top"><span><span class="k">Clock</span><span class="clock" data-k="clock"></span></span>
          <span><span class="k">Elapsed</span><span class="el" data-k="el">0:00</span></span>
          <span class="delta" data-k="delta"></span><span class="sp"></span>
          <span class="where" data-k="where"></span><span class="conn off" data-k="conn">Show not connected</span></div>
        <div class="pv-l">
          <div class="pv-fr" data-k="frA"><span class="tag" data-k="tagA">Now</span><iframe data-k="ifA" src="${base}?still=1&name=a"></iframe></div>
          <div class="pv-say"><div class="ttl" data-k="ttl"></div><p data-k="say"></p></div>
        </div>
        <div class="pv-r">
          <div class="pv-fr"><span class="tag">Next</span><iframe data-k="ifB" src="${base}?still=1&name=b"></iframe></div>
          <div class="pv-next" data-k="next"></div>
          <table class="pv-acts" data-k="acts"></table>
          <div class="pv-help">Right / PageDown / Space: next. Left / PageUp: back. B: blank the screen. T: restart the timer. Digits then Enter: go to that slide. Planned total ${fmt(total)}.</div>
        </div>
      </div>`);

    let state = { cur: 0, beat: 0 }, connected = false, t0 = null, lastAt = null;
    const spent = {}; actKeys.forEach((a) => (spent[a] = 0));
    const ready = { a: false, b: false };
    const flatIndex = () => flat.findIndex((f) => f.s.index === state.cur && f.k === state.beat);

    function post() {
      const i = flatIndex(), a = flat[i], b = flat[i + 1];
      if (ready.a && a) root.ifA.contentWindow.postMessage({ type: 'still', cur: a.s.index, beat: a.k }, '*');
      if (ready.b) root.ifB.contentWindow.postMessage(b ? { type: 'still', cur: b.s.index, beat: b.k } : { type: 'still', cur: a.s.index, beat: a.k }, '*');
    }
    addEventListener('message', (e) => { const m = e.data || {}; if (m.type === 'still-ready') { ready[m.name] = true; post(); } });

    function render() {
      const i = flatIndex(), f = flat[i] || flat[0], nx = flat[i + 1];
      root.ttl.textContent = `${f.s.title}${f.s.beats.length > 1 ? ` · beat ${f.k + 1} of ${f.s.beats.length}` : ''}`;
      root.say.textContent = f.b.say || '(no words for this beat)';
      root.where.textContent = `Slide ${f.s.index + 1} of ${outline.length}`;
      root.next.innerHTML = nx ? `<b>Next${nx.s !== f.s ? ' · ' + nx.s.title : ''}</b>${(nx.b.say || '').split(/(?<=[.!?])\s/)[0]}` : '<b>Next</b>End of the deck';
      root.frA.classList.toggle('anim', !!state.animating);
      root.tagA.textContent = state.blank ? 'Now · screen blank' : 'Now';
      post();
    }

    function tick() {
      const now = Date.now();
      root.clock.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const f = flat[flatIndex()] || flat[0];
      if (t0 != null && lastAt != null) { spent[f.s.act] += (now - lastAt) / 1000; }
      lastAt = now;
      const el = t0 == null ? 0 : (now - t0) / 1000;
      root.el.textContent = fmt(el);
      /* planned time to the start of this beat, against the time spent */
      const i = flatIndex();
      const planned = flat.slice(0, Math.max(0, i)).reduce((a, x) => a + x.b.plan, 0);
      if (t0 == null) { root.delta.textContent = ''; }
      else {
        const d = el - planned;
        root.delta.textContent = Math.abs(d) < 15 ? 'On time' : d > 0 ? `${fmt(d)} behind` : `${fmt(d)} ahead`;
        root.delta.className = 'delta ' + (Math.abs(d) < 15 ? '' : d > 0 ? 'behind' : 'ahead');
      }
      root.acts.innerHTML = `<tr><th>Act</th><th>Planned</th><th>Actual</th></tr>` + actKeys.map((a) =>
        `<tr class="${f.s.act === a ? 'on' : ''}"><td>${(acts[a] && acts[a].name) || a}</td><td>${fmt(planAct[a])}</td><td class="${spent[a] > planAct[a] + 15 ? 'over' : ''}">${fmt(spent[a])}</td></tr>`).join('') +
        `<tr><td>Total</td><td>${fmt(total)}</td><td>${fmt(Object.values(spent).reduce((x, y) => x + y, 0))}</td></tr>`;
      root.conn.textContent = connected ? 'Show connected' : 'Show not connected: open index.html';
      root.conn.className = 'conn ' + (connected ? 'on' : 'off');
    }

    onMsg((m) => {
      if (m.type !== 'state') return;
      connected = true;
      const moved = m.cur !== state.cur || m.beat !== state.beat;
      if (moved && t0 == null && (m.cur > 0 || m.beat > 0)) { t0 = Date.now(); lastAt = t0; }
      state = m;
      render();
    });
    addEventListener('keydown', (e) => {
      const k = e.key;
      if (e.repeat) { e.preventDefault(); return; }
      if (['ArrowRight', 'PageDown', ' ', 'ArrowDown', 'n'].includes(k)) send({ type: 'cmd', cmd: 'next' });
      else if (['ArrowLeft', 'PageUp', 'ArrowUp', 'p', 'Backspace'].includes(k)) send({ type: 'cmd', cmd: 'prev' });
      else if (k === 'b' || k === 'B' || k === '.') send({ type: 'cmd', cmd: 'blank' });
      else if (k === 't' || k === 'T') { t0 = Date.now(); lastAt = t0; actKeys.forEach((a) => (spent[a] = 0)); }
      else return;
      e.preventDefault();
    });
    let digits = '';
    addEventListener('keydown', (e) => {
      if (/^[0-9]$/.test(e.key)) digits += e.key;
      else if (e.key === 'Enter' && digits) { send({ type: 'cmd', cmd: 'goto', cur: parseInt(digits, 10) - 1, beat: 0 }); digits = ''; }
      else if (e.key === 'Escape') digits = '';
    });
    render();
    send({ type: 'hello' });
    setInterval(tick, 500);
    tick();
  };
})();
