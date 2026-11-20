/* The player: one deterministic master clock over every registered scene.

   frame(T) is the only thing that changes the picture. It finds the scene at master time T, shows its
   root, and calls scene.at(t) with the scene's local time, then sets the caption, the chapter card and
   the cut from the scene before from the same T. Play only advances T, so seeking, scrubbing and frame
   capture all show exactly what playback shows. */
(function () {
  const M = window.Mock;
  const W = 1920, H = 1080;
  const CARD = 2.6;   /* a chapter card's length, taken from the start of its act's first scene */
  const FADE = 0.4;   /* each half of a fade through black; a cut is never more than 0.8 s of black */
  /* A film may set window.MOCK_FILM (in its scenes/index.js): `dissolve` seconds makes each scene dissolve in
     over the last frame of the scene before it, with black only at the film's start and end; `headlines`
     is read by lib/caption.js. Without it every cut fades through black. */
  const film = () => window.MOCK_FILM || {};
  const MAX_TOTAL = window.MOCK_MAX_TOTAL || 380;
  /* Voice timing (?voice=1): each scene is fitted to its narration clip. The line starts LEAD after the
     card, and the scene lasts until the clip ends plus BREATH and EXIT, but never less than FLOOR of its
     designed duration, so the choreography does not rush. Where that floor would leave more than MAX_GAP
     of silence before the next line, the scene shortens further, down to FLOOR_MIN. The scene's designed
     animation plays proportionally faster or slower to fill its length. A scene then ends TAIL after its line,
     cutting the rest of its designed hold rather than speeding it up, so no silence outlasts the next card.
     voice.js (MOCK_VOICE: clip seconds
     by scene id) is written by render/render.mjs --voice from durations.json. */
  const LEAD = 0.35, BREATH = 0.8, EXIT = 0.4, FLOOR = 0.9, FLOOR_MIN = 0.8, MAX_GAP = 3.5;
  /* A film may set window.MOCK_PACING = { tail, cardTail } (pacing.js beside its index.html): a voiced scene then
     lasts exactly its card, LEAD, its clip and a tail of `tail` seconds, or `cardTail` when a chapter card follows.
     Without it the tail is 2.2 s everywhere. */
  const PACING = window.MOCK_PACING || {};
  const TAIL = PACING.tail != null ? PACING.tail : 2.2, CARD_TAIL = PACING.cardTail != null ? PACING.cardTail : TAIL;
  const VOICED = /[?&]voice=1/.test(location.search);
  if (VOICED) {
    const s = document.createElement('script');
    /* beside the page, so each film (the main film or a snippet) carries its own clip lengths */
    s.src = new URL('voice.js', location.href).href;
    s.async = false;
    s.onerror = () => console.error('voice.js failed to load; run render/render.mjs --voice to write it');
    document.head.appendChild(s);
  }

  const registered = [];
  /* The player writes these onto each scene; a scene that defines one of them would be overwritten. */
  const RESERVED = ['begin', 'cardDur', 'span', 'root', 'len', 'clip', 'warp'];
  window.registerScene = function (def) {
    for (const k of ['id', 'act', 'title', 'duration', 'caption', 'render', 'at'])
      if (def[k] == null) throw new Error(`scene ${def.id || '?'}: missing "${k}"`);
    for (const k of RESERVED)
      if (k in def) throw new Error(`scene ${def.id}: "${k}" is set by the player; rename the scene's own field`);
    registered.push(def);
  };

  let scenes = [], total = 0, T = 0, playing = false, speed = 1, cur = null, last = 0;
  let stage, black, card;

  function order() {
    const want = window.MOCK_ORDER || [];
    const byId = new Map(registered.map((s) => [s.id, s]));
    const out = [];
    want.forEach((id) => {
      if (byId.has(id)) { out.push(byId.get(id)); byId.delete(id); }
      else console.warn(`scene ${id} is in MOCK_ORDER but was not registered`);
    });
    byId.forEach((s) => { console.warn(`scene ${s.id} is registered but not in MOCK_ORDER; appended`); out.push(s); });
    return out;
  }

  function build() {
    scenes = order();
    const acts = window.MOCK_ACTS || {};
    const voice = VOICED ? window.MOCK_VOICE || {} : null;
    let t = 0, prevAct = null;
    scenes.forEach((s, i) => {
      s.begin = t;
      s.cardDur = s.act !== prevAct && acts[s.act] && acts[s.act].card ? CARD : 0;
      s.span = s.duration - s.cardDur;
      /* len is the scene's real length; warp is real seconds per designed second of the scene proper */
      s.clip = voice ? voice[s.id] : null;
      if (voice && s.clip == null) console.error(`scene ${s.id} has no voice clip`);
      if (s.clip != null) {
        /* the silence after this line, outside the next scene's card, is len - card - clip */
        const fit = s.cardDur + LEAD + s.clip + BREATH + EXIT, floor = FLOOR * s.duration;
        const quiet = i + 1 < scenes.length ? Math.max(FLOOR_MIN * s.duration, s.cardDur + s.clip + MAX_GAP) : floor;
        s.len = Math.max(fit, Math.min(floor, quiet));
      } else s.len = s.duration;
      const nx = scenes[i + 1], tail = nx && nx.act !== s.act && acts[nx.act] && acts[nx.act].card ? CARD_TAIL : TAIL;
      if (s.clip != null && nx && PACING.tail != null) s.len = s.cardDur + LEAD + s.clip + tail;
      s.warp = (s.len - s.cardDur) / s.span;
      if (s.clip != null && nx) s.len = Math.min(s.len, s.cardDur + LEAD + s.clip + tail);
      prevAct = s.act;
      t += s.len;
    });
    total = t;
    if (!voice && total > MAX_TOTAL) console.error(`running time ${total} s is over ${MAX_TOTAL} s`);

    stage = document.getElementById('stage');
    scenes.forEach((s) => {
      const root = document.createElement('div');
      root.className = 'scene';
      root.dataset.scene = s.id;
      stage.appendChild(root);
      s.root = root;
      try { s.render(root); } catch (e) { root.textContent = `scene ${s.id} failed to render: ${e.message}`; console.error(e); }
    });

    card = M.mount(stage, `
      <div id="card"><div class="mk-dotgrid" data-k="grid"></div>
        <span data-k="mark">${M.markSVG(30)}</span>
        <div class="body"><div class="kick" data-k="kick"><span data-k="kt"></span></div>
          <div class="ln-mask"><div class="ttl ln" data-k="ttl"></div></div></div></div>`);
    M.Caption.build(stage);
    black = M.html('<div id="black"></div>');
    stage.appendChild(black);
  }

  function sceneAt(t) {
    for (let i = scenes.length - 1; i >= 0; i--) if (t >= scenes[i].begin) return scenes[i];
    return scenes[0];
  }

  function enter(s) {
    cur = s;
    M.stageInfo.scene = s;
    const a = (window.MOCK_ACTS || {})[s.act];
    M.Caption.enter(s, a);
    if (s.cardDur && a) { card.kt.textContent = a.kicker; card.ttl.textContent = a.title; }
  }

  function frame(t) {
    T = M.clamp(t, 0, total);
    const s = sceneAt(Math.min(T, total - 1e-6));
    if (s !== cur) enter(s);
    const local = T - s.begin;

    /* chapter card */
    const onCard = local < s.cardDur;
    card.root.classList.toggle('on', onCard);
    if (onCard) {
      M.fade(card.grid, local, 0, 1.2);
      M.fade(card.mark, local, 0.5, 0.6);
      M.rise(card.kt, local, 0.35, { dy: 10 });
      M.lineRise(card.ttl, local, 0.45, 1.0);
    }

    /* In a film that dissolves, the scene before holds its last frame and dissolves out while this one
       dissolves in. It is drawn first, so anything the two share on the stage is left as this scene sets it. */
    const D = film().dissolve || 0, prev = D ? scenes[scenes.indexOf(s) - 1] : null;
    const k = prev ? M.clamp((local - s.cardDur) / D) : 1;
    scenes.forEach((x) => x.root.classList.toggle('on', x === s || (x === prev && k < 1)));
    if (prev && k < 1) {
      prev.root.style.opacity = (1 - k).toFixed(3);
      try { prev.at(prev.span); } catch (e) { console.error(`scene ${prev.id} at its end:`, e); }
    }
    if (D) s.root.style.opacity = k.toFixed(3);

    /* the scene; under a chapter card its t is negative */
    M.stageInfo.captionMove = null;
    const real = local - s.cardDur, st = real < 0 ? real : real / s.warp;
    try { s.at(st); } catch (e) { console.error(`scene ${s.id} at(${st.toFixed(2)}):`, e); }

    /* fade through black at each cut, including the cut from a chapter card to its scene; a film that
       dissolves is black only at its start and its end */
    const segA = onCard ? 0 : s.cardDur, segB = onCard ? s.cardDur : s.len;
    const a = D ? Math.max(1 - T / FADE, 1 - (total - T) / FADE) : Math.max(1 - (local - segA) / FADE, 1 - (segB - local) / FADE);
    black.style.opacity = M.clamp(a).toFixed(3);

    /* the caption arrives with the scene, shows its lines in turn, and follows any camera move */
    M.Caption.at(local, s);

    hud.update();
  }

  /* ---------- clock ---------- */
  function tick(now) {
    if (playing) {
      T += ((now - last) / 1000) * speed;
      if (T >= total) { T = total; playing = false; }
      frame(T);
    }
    last = now;
    requestAnimationFrame(tick);
  }
  const play = () => { if (T >= total) T = 0; playing = true; last = performance.now(); hud.update(); };
  const pause = () => { playing = false; hud.update(); };
  const toggle = () => (playing ? pause() : play());
  const seek = (t) => frame(t);

  function fit() {
    if (M.stageInfo.capture) return;
    const s = Math.min(innerWidth / W, innerHeight / H);
    stage.style.transform = `translate(${(-W * s) / 2}px, ${(-H * s) / 2}px) scale(${s})`;
  }

  /* ---------- controls ---------- */
  const fmt = (t) => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`;
  const hud = {
    update() {},
    build() {
      const acts = window.MOCK_ACTS || {};
      const r = M.mount(document.body, `
        <div id="hud">
          <div class="track" data-k="track"><div class="acts" data-k="acts"></div><div class="bar"></div><div class="fill" data-k="fill"></div>
            <div data-k="ticks"></div><div class="head" data-k="head"></div><div class="tip" data-k="tip"></div></div>
          <div class="row">
            <button class="play" data-k="play" title="Play / pause (Space)">▶</button>
            <span class="time" data-k="time"></span><span class="scn" data-k="scn"></span><span class="sp"></span>
            <button data-k="speed" title="Speed (S)">1×</button><button data-k="help" title="Keys (?)">?</button>
          </div>
        </div>`);
      const help = M.mount(document.body, `
        <div id="help"><div class="box"><h3>Keys</h3><table>
          <tr><td>Space</td><td>Play or pause</td></tr>
          <tr><td>← / →</td><td>Back or forward 5 s</td></tr>
          <tr><td>[ / ]</td><td>Previous or next scene</td></tr>
          <tr><td>Home</td><td>Back to the start</td></tr>
          <tr><td>S</td><td>Speed 1× or 2×</td></tr>
          <tr><td>?</td><td>Show or hide these keys</td></tr>
          <tr><td>#t=95 · #s=3.2</td><td>Open at a time or a scene</td></tr>
        </table></div></div>`);
      const pct = (t) => (100 * t) / total + '%';
      let prevAct = null;
      const actStarts = [];
      scenes.forEach((s) => {
        const tk = document.createElement('div');
        const first = s.act !== prevAct;
        tk.className = 'tick' + (first ? ' act' : '');
        tk.style.left = pct(s.begin);
        r.ticks.appendChild(tk);
        if (first) actStarts.push(s);
        prevAct = s.act;
      });
      actStarts.forEach((s, i) => {
        const end = i + 1 < actStarts.length ? actStarts[i + 1].begin : total;
        const a = acts[s.act] || { kicker: 'Act ' + s.act };
        const sp = document.createElement('span');
        sp.textContent = a.short || a.label || a.kicker;
        sp.style.left = pct(s.begin);
        sp.style.width = pct(end - s.begin);
        sp.dataset.act = s.act;
        r.acts.appendChild(sp);
      });
      const tAt = (e) => { const b = r.track.getBoundingClientRect(); return M.clamp((e.clientX - b.left) / b.width) * total; };
      let drag = false;
      r.track.addEventListener('pointerdown', (e) => { drag = true; r.track.setPointerCapture(e.pointerId); seek(tAt(e)); });
      r.track.addEventListener('pointermove', (e) => {
        const t = tAt(e), s = sceneAt(t);
        r.tip.style.display = 'block';
        r.tip.style.left = pct(t);
        r.tip.textContent = `${fmt(t)}  ${s.id} ${s.title}`;
        if (drag) seek(t);
      });
      r.track.addEventListener('pointerup', () => (drag = false));
      r.track.addEventListener('pointerleave', () => (r.tip.style.display = 'none'));
      r.play.onclick = toggle;
      const setSpeed = () => { speed = speed === 1 ? 2 : 1; r.speed.textContent = speed + '×'; };
      r.speed.onclick = setSpeed;
      const toggleHelp = () => help.root.classList.toggle('on');
      r.help.onclick = toggleHelp;
      help.root.onclick = toggleHelp;

      addEventListener('keydown', (e) => {
        const k = e.key;
        if (k === ' ') toggle();
        else if (k === 'ArrowLeft') seek(T - 5);
        else if (k === 'ArrowRight') seek(T + 5);
        else if (k === 'Home') seek(0);
        else if (k === '[') { const i = scenes.indexOf(sceneAt(T)); seek(T - sceneAt(T).begin > 1 ? sceneAt(T).begin : scenes[Math.max(0, i - 1)].begin); }
        else if (k === ']') { const i = scenes.indexOf(sceneAt(T)); if (i + 1 < scenes.length) seek(scenes[i + 1].begin); }
        else if (k === 's' || k === 'S') setSpeed();
        else if (k === '?') toggleHelp();
        else if (k === 'Escape') help.root.classList.remove('on');
        else return;
        e.preventDefault();
        wake();
      });

      let idleTimer = 0;
      function wake() {
        r.root.classList.remove('idle');
        document.body.classList.remove('idle');
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => { r.root.classList.add('idle'); document.body.classList.add('idle'); }, 2000);
      }
      addEventListener('mousemove', wake);
      wake();

      let lastAct = null;
      hud.update = () => {
        r.fill.style.width = pct(T);
        r.head.style.left = pct(T);
        r.play.textContent = playing ? '❚❚' : '▶';
        r.time.textContent = `${fmt(T)} / ${fmt(total)}`;
        const s = sceneAt(Math.min(T, total - 1e-6));
        r.scn.innerHTML = `<b>${s.id}</b>${s.title}`;
        if (s.act !== lastAct) {
          r.acts.querySelectorAll('span').forEach((sp) => sp.classList.toggle('on', sp.dataset.act == s.act));
          lastAct = s.act;
        }
      };
    },
  };

  function startAt() {
    const h = location.hash.slice(1);
    const m = /(?:^|&)t=([\d.]+)/.exec(h), n = /(?:^|&)s=([\w.]+)/.exec(h);
    if (m) return parseFloat(m[1]);
    if (n) { const s = scenes.find((x) => x.id === n[1]); if (s) return s.begin; }
    return 0;
  }

  function boot() {
    M.stageInfo = { width: W, height: H, capture: /[?&]capture=1/.test(location.search) };
    document.documentElement.classList.toggle('capture', M.stageInfo.capture);
    build();
    if (!M.stageInfo.capture) hud.build();
    fit();
    addEventListener('resize', fit);
    frame(startAt());
    requestAnimationFrame(tick);
    /* The handle a capture script or a builder's console uses. */
    window.mock = {
      get time() { return T; }, get playing() { return playing; },
      total, voiced: !!VOICED, scenes: scenes.map((s) => ({ id: s.id, act: s.act, title: s.title, start: s.begin, duration: s.len, designed: s.duration, span: s.span, card: s.cardDur, clip: s.clip, warp: s.warp })),
      seek, play, pause, toggle, frame: seek, sceneAt: (t) => sceneAt(t).id,
    };
  }

  const ready = () => (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve());
  addEventListener('load', () => ready().then(boot));
})();
