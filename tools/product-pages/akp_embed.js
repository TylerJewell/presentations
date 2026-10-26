/* Behaviours for the new product page content inside the live akka.io chrome. */
(function () {
  document.documentElement.classList.add('js');
  var root = document.querySelector('.akp');
  if (!root) return;

  document.addEventListener('click', function (e) {
    var b = e.target.closest('.akp [data-copy]');
    if (!b) return;
    var done = function () {
      b.classList.add('copied');
      var cp = b.querySelector('.ak-cp');
      if (cp) { cp.textContent = 'Copied'; setTimeout(function () { cp.textContent = 'Copy'; b.classList.remove('copied'); }, 1600); }
    };
    if (navigator.clipboard) navigator.clipboard.writeText(b.getAttribute('data-copy')).then(done, done); else done();
  });

  root.querySelectorAll('[data-tabs]').forEach(function (group) {
    var btns = group.querySelectorAll('[role="tab"]');
    var scope = document.getElementById(group.getAttribute('data-tabs'));
    btns.forEach(function (b, i) {
      b.addEventListener('click', function () {
        btns.forEach(function (x) { x.setAttribute('aria-selected', 'false'); });
        b.setAttribute('aria-selected', 'true');
        scope.querySelectorAll(':scope > .ak-tabpanel, :scope > figure').forEach(function (p, j) { p.classList.toggle('on', j === i); });
        group.dataset.touched = '1';
      });
    });
    if (group.hasAttribute('data-autoplay')) {
      var i = 0;
      setInterval(function () {
        if (group.dataset.touched || document.hidden) return;
        i = (i + 1) % btns.length;
        btns[i].click();
        delete group.dataset.touched;
      }, 6500);
    }
  });

  root.querySelectorAll('tr.ak-row-link').forEach(function (tr) {
    tr.addEventListener('click', function (e) {
      if (e.target.closest('a')) return;
      var a = tr.querySelector('a');
      if (a) location.href = a.href;
    });
  });

  var els = root.querySelectorAll('.ak-rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('in'); });
  }

  root.querySelectorAll('[data-xform]').forEach(function (x) {
    var keys = ['intro', 'entities', 'rules', 'views'], i = 0, paused = false;
    function show(k) { x.querySelectorAll('[data-k]').forEach(function (e) { e.classList.toggle('hot', e.getAttribute('data-k') === k); }); }
    show(keys[0]);
    setInterval(function () { if (paused || document.hidden) return; i = (i + 1) % keys.length; show(keys[i]); }, 2600);
    x.querySelectorAll('.ak-xdoc [data-k]').forEach(function (e) {
      e.addEventListener('mouseenter', function () { paused = true; show(e.getAttribute('data-k')); });
      e.addEventListener('mouseleave', function () { paused = false; });
    });
  });

  /* ---------- component graph: each component lights its connections and shows its description ---------- */
  document.querySelectorAll('[data-cg]').forEach(function (g) {
    var order = ['client', 'http', 'workflow', 'agent', 'auto', 'mcp', 'es', 'kv', 'view', 'consumer', 'timer', 'grpc'], i = 0, paused = false, pinned = false;
    var every = +g.getAttribute('data-cg-interval') || 4200;
    var edges = g.querySelectorAll('[data-e]');
    function focus(k) {
      var on = {};
      edges.forEach(function (e) {
        var hit = k === 'client' ? e.hasAttribute('data-cc') : (e.getAttribute('data-from') === k || e.getAttribute('data-to') === k);
        e.classList.toggle('hot', hit);
        if (hit) { on[e.getAttribute('data-from')] = 1; on[e.getAttribute('data-to')] = 1; }
        var l = g.querySelector('[data-le="' + e.getAttribute('data-e') + '"]');
        if (l) l.classList.toggle('hot', hit);
      });
      g.querySelectorAll('[data-n]').forEach(function (n) {
        var id = n.getAttribute('data-n');
        n.classList.toggle('hot', !!on[id] || id === k);
        if (id === k) n.setAttribute('data-focal', ''); else n.removeAttribute('data-focal');
      });
      g.querySelectorAll('[data-c]').forEach(function (c) { c.classList.toggle('on', c.getAttribute('data-c') === k); });
      g.setAttribute('data-focus', k);
    }
    focus(order[0]);
    setInterval(function () { if (paused || pinned || document.hidden) return; i = (i + 1) % order.length; focus(order[i]); }, every);
    g.querySelectorAll('[data-n]').forEach(function (n) {
      var k = n.getAttribute('data-n');
      if (!g.querySelector('[data-c="' + k + '"]')) return;
      n.addEventListener('mouseenter', function () { paused = true; i = order.indexOf(k); focus(k); });
      n.addEventListener('mouseleave', function () { paused = false; });
      /* where a node is not a link, clicking it keeps that component in view */
      if (!n.closest('a')) n.addEventListener('click', function () {
        pinned = true; i = order.indexOf(k); focus(k);
        var d = g.querySelector('[data-cx]'), r = d && d.getBoundingClientRect();
        if (r && (r.top > innerHeight - 160 || r.bottom < 80)) d.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    });
    var detail = g.querySelector('[data-cx]');
    if (detail) {
      detail.addEventListener('mouseenter', function () { paused = true; });
      detail.addEventListener('mouseleave', function () { paused = false; });
    }
  });

  /* ---------- embedded app: scaled to the column, launches agent teams the first time it is in view ---------- */
  document.querySelectorAll('[data-app-launch]').forEach(function (box) {
    var f = box.querySelector('iframe'), W = 1440, h = 900, ready = false, seen = false, sent = false;
    function fit() {
      var s = box.clientWidth / W;
      f.style.height = h + 'px';
      f.style.transform = 'scale(' + s + ')';
      box.style.height = Math.ceil(h * s) + 'px';
    }
    function go() {
      if (!ready || !seen || sent) return;
      sent = true;
      f.contentWindow.postMessage({ akkaApp: 'launch', n: +box.getAttribute('data-app-launch') }, '*');
    }
    window.addEventListener('message', function (e) {
      if (e.source !== f.contentWindow || !e.data || e.data.akkaApp !== 'height') return;
      h = e.data.h; ready = true; fit(); go();
    });
    if ('ResizeObserver' in window) new ResizeObserver(fit).observe(box); else window.addEventListener('resize', fit);
    fit();
    if (!('IntersectionObserver' in window)) { seen = true; return; }
    var io = new IntersectionObserver(function (es) {
      if (!es[0].isIntersecting) return;
      io.disconnect(); seen = true; go();
    }, { threshold: 0.35 });
    io.observe(box);
  });

  /* ---------- shipping factory: every frame is computed from the clock, so the line never drifts out of step ----------
     A build starts every SLOT seconds. Every fourth build fails one exit condition, returns to build and
     takes the next slot; the slot after a failure stays empty, so no station ever holds two builds. */
  document.querySelectorAll('[data-fx]').forEach(function (fx) {
    var SLOT = 3, FAIL_ROW = 4, Y = 396, X = { d: 125, b: 440, g: 750, r: 1090 };
    var NAMES = ['Loyalty', 'Claims', 'Onboarding', 'Payments', 'Support'];
    var layer = fx.querySelector('[data-fx-tokens]'), tpl = fx.querySelector('[data-fx-tpl]');
    var rows = fx.querySelectorAll('[data-gi]'), chips = fx.querySelectorAll('[data-ci]'), cons = fx.querySelectorAll('[data-cc]');
    var arts = fx.querySelectorAll('[data-ai]'), docs = fx.querySelectorAll('[data-fx-doc]'), rel = fx.querySelectorAll('[data-ri]');
    var prog = fx.querySelector('[data-fx-prog]'), pill = fx.querySelector('[data-fx-pill]'), bar = fx.querySelector('[data-fx-bar]');
    var ret = fx.querySelector('[data-fx-ret]'), count = fx.querySelector('[data-fx-count]'), toks = {};

    function kind(n) { var m = n % 4; return m === 2 ? 'fail' : m === 3 ? 'skip' : 'pass'; }
    function nonSkip(k) { return k < 0 ? 0 : (k + 1) - Math.floor((k + 1) / 4); }
    function label(n) { var v = nonSkip(n) - 1; return NAMES[v % NAMES.length] + ' v' + (Math.floor(v / NAMES.length) + 1); }
    function ease(p) { return p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2; }
    function lerp(a, b, p) { return a + (b - a) * ease(Math.max(0, Math.min(1, p))); }
    function relAt(n) { return SLOT * n + (kind(n) === 'fail' ? 10.0 : 6.4); }
    /* gate sessions: [start, end, row that fails or -1, verdict time] in seconds after the build starts */
    function gates(n) { return kind(n) === 'fail' ? [[4.2, 5.4, FAIL_ROW, 5.2], [7.8, 9.2, -1, 9.0]] : [[4.2, 5.6, -1, 5.4]]; }
    function builds(n) { return kind(n) === 'fail' ? [[2.0, 3.6], [6.4, 7.2]] : [[2.0, 3.6]]; }

    function where(n, r) {
      var f = kind(n) === 'fail', s = { x: X.d, y: Y, o: 1, st: '' };
      if (r < 0) return null;
      if (r < 1.2) { s.o = Math.min(1, r / .3); return s; }
      if (r < 2.0) { s.x = lerp(X.d, X.b, (r - 1.2) / .8); return s; }
      if (r < 3.6) { s.x = X.b; return s; }
      if (r < 4.2) { s.x = lerp(X.b, X.g, (r - 3.6) / .6); return s; }
      if (!f) {
        if (r < 5.6) { s.x = X.g; s.st = r >= 5.4 ? 'ok' : ''; return s; }
        if (r < 6.4) { s.x = lerp(X.g, X.r, (r - 5.6) / .8); s.st = 'ok'; return s; }
        if (r < 6.8) { s.x = X.r; s.st = 'ok'; s.o = 1 - (r - 6.4) / .4; return s; }
        return null;
      }
      if (r < 5.4) { s.x = X.g; s.st = r >= 5.1 ? 'bad' : ''; return s; }
      if (r < 6.4) {                       /* down, left, up along the return path */
        var p = ease((r - 5.4) / 1.0) * (50 + 310 + 50);
        s.st = 'bad';
        if (p < 50) { s.x = X.g; s.y = Y + p; } else if (p < 360) { s.x = X.g - (p - 50); s.y = Y + 50; } else { s.x = X.b; s.y = Y + 50 - (p - 360); }
        return s;
      }
      if (r < 7.2) { s.x = X.b; return s; }
      if (r < 7.8) { s.x = lerp(X.b, X.g, (r - 7.2) / .6); return s; }
      if (r < 9.2) { s.x = X.g; s.st = r >= 9.0 ? 'ok' : ''; return s; }
      if (r < 10.0) { s.x = lerp(X.g, X.r, (r - 9.2) / .8); s.st = 'ok'; return s; }
      if (r < 10.4) { s.x = X.r; s.st = 'ok'; s.o = 1 - (r - 10.0) / .4; return s; }
      return null;
    }

    function frame(t) {
      var now = Math.floor(t / SLOT), live = {}, gate = null, build = null, design = false, failing = false;
      for (var n = Math.max(0, now - 4); n <= now; n++) {
        if (kind(n) === 'skip') continue;
        var r = t - SLOT * n, s = where(n, r);
        gates(n).forEach(function (g) { if (r >= g[0] && r < g[1] + .9) gate = { r: r, g: g }; });
        builds(n).forEach(function (b) { if (r >= b[0] && r < b[1]) build = (r - b[0]) / (b[1] - b[0]); });
        if (r >= 0 && r < 1.2) design = true;
        if (kind(n) === 'fail' && r >= 5.4 && r < 6.4) failing = true;
        if (!s) continue;
        live[n] = 1;
        var el = toks[n];
        if (!el) {
          el = toks[n] = tpl.cloneNode(true);
          el.removeAttribute('data-fx-tpl'); el.style.display = '';
          el.querySelector('text').textContent = label(n);
          layer.appendChild(el);
        }
        el.setAttribute('transform', 'translate(' + s.x.toFixed(1) + ' ' + s.y.toFixed(1) + ')');
        el.style.opacity = s.o;
        el.setAttribute('data-s', s.st);
      }
      Object.keys(toks).forEach(function (k) { if (!live[k]) { layer.removeChild(toks[k]); delete toks[k]; } });

      docs.forEach(function (d) { d.classList.toggle('hot', design); });
      prog.setAttribute('width', build === null ? 0 : (196 * build).toFixed(1));
      arts.forEach(function (a, i) { a.classList.toggle('hot', build !== null && build >= i / 6); });
      ret.classList.toggle('hot', failing);

      var verdict = '';
      rows.forEach(function (row, i) {
        var st = '', mark = '';
        if (gate) {
          var g = gate.g, tick = g[0] + .1 + .2 * i, r = gate.r;
          if (r >= tick && (g[2] < 0 || i < g[2])) { st = 'ok'; mark = '✓'; }
          else if (r >= tick && i === g[2]) { st = 'bad'; mark = '×'; }
          else if (r >= tick - .2 && (g[2] < 0 || i <= g[2])) st = 'scan';
          chips[i].classList.toggle('hot', r >= tick - .2 && r < tick + .25 && (g[2] < 0 || i <= g[2]));
        } else chips[i].classList.remove('hot');
        row.setAttribute('data-s', st);
        row.lastElementChild.textContent = mark;
      });
      cons.forEach(function (c) { c.classList.toggle('hot', !!gate && gate.r < gate.g[1]); });
      if (gate) verdict = gate.r >= gate.g[3] ? (gate.g[2] < 0 ? 'ok' : 'bad') : 'run';
      pill.setAttribute('data-s', verdict);
      pill.textContent = verdict === 'ok' ? 'ALL MET' : verdict === 'bad' ? 'BLOCKED' : verdict === 'run' ? 'CHECKING' : '';
      bar.setAttribute('data-s', gate && verdict === 'ok' ? 'open' : '');

      var done = nonSkip(now - 5), last = [];
      for (var m = now; m >= Math.max(0, now - 4); m--) if (kind(m) !== 'skip' && relAt(m) <= t) done++;
      for (m = now; m >= 0 && last.length < 4; m--) if (kind(m) !== 'skip' && relAt(m) <= t) last.push(label(m));
      count.textContent = done;
      rel.forEach(function (row, i) {
        row.firstElementChild.textContent = last[i] ? '✓' : '';
        row.lastElementChild.textContent = last[i] || '';
        row.style.opacity = last[i] ? 1 - i * .2 : 0;
      });
    }

    var t0 = null, seed = 9;
    function loop(ts) {
      if (t0 === null) t0 = ts;
      frame(seed + (ts - t0) / 1000);
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  });

  /* ---------- Verify governance graphic: each control in turn reaches the systems it applies to and leaves a record ---------- */
  document.querySelectorAll('[data-vp]').forEach(function (vp) {
    var PHASE = 2.6;
    var MECH = ['Policies', 'Evaluations', 'Guardrails', 'Sanitizers', 'Human', 'Audit & attestation'];
    var SYS = ['Claims agent', 'Underwriting workflow', 'Support agent', 'Research agent'];
    var REG = ['EU AI Act', 'NIST AI RMF', 'EU AI Act', 'GDPR', 'EU AI Act', 'ISO/IEC 42001'];
    /* outcome per system for each control; systems built elsewhere are reached through their logs, so they never show an inline action */
    var OUT = [{ 0: 'ALLOWED', 2: 'REPORTED' }, { 0: 'GRADED', 1: 'GRADED', 2: 'GRADED', 3: 'GRADED' }, { 0: 'BLOCKED' },
               { 1: 'MASKED' }, { 0: 'ESCALATED' }, { 0: 'ATTESTED', 1: 'ATTESTED', 2: 'ATTESTED', 3: 'ATTESTED' }];
    var TONE = { ALLOWED: 'ok', GRADED: 'ok', ATTESTED: 'ok', REPORTED: 'info', MASKED: 'info', BLOCKED: 'bad', ESCALATED: 'warn' };
    var rows = vp.querySelectorAll('[data-mi]'), ins = vp.querySelectorAll('[data-mc]'), outs = vp.querySelectorAll('[data-sc]');
    var sys = vp.querySelectorAll('[data-si]'), ev = vp.querySelector('[data-ve]'), erows = vp.querySelectorAll('[data-ei]');

    function record(p) {
      var k = p % 6, who = Object.keys(OUT[k]), first = OUT[k][who[0]];
      return [MECH[k], who.length === 4 ? 'All systems' : who.map(function (i) { return SYS[i]; }).join(', '), first.toLowerCase(), REG[k]];
    }
    function frame(t) {
      var p = Math.floor(t / PHASE), k = p % 6, u = t - p * PHASE;
      rows.forEach(function (r, i) { r.classList.toggle('hot', i === k); });
      ins.forEach(function (c, i) { c.classList.toggle('hot', i === k); });
      outs.forEach(function (c, i) { c.classList.toggle('hot', u >= .4 && OUT[k][i] !== undefined); });
      sys.forEach(function (s, i) {
        var st = u >= .8 ? OUT[k][i] : undefined;
        s.setAttribute('data-s', st ? TONE[st] : '');
        s.lastElementChild.textContent = st || '';
      });
      ev.classList.toggle('hot', u >= 1.0 && u < 1.9);
      var shown = [];
      for (var q = u >= 1.2 ? p : p - 1; q >= 0 && shown.length < 3; q--) shown.push(record(q));
      erows.forEach(function (row, i) {
        var r = shown[i], cells = row.children;
        cells[0].textContent = r ? '✓' : '';
        for (var c = 0; c < 4; c++) cells[c + 1].textContent = r ? r[c] : '';
        row.style.opacity = r ? 1 - i * .28 : 0;
      });
    }
    var t0 = null;
    function loop(ts) { if (t0 === null) t0 = ts; frame(PHASE * 6 + (ts - t0) / 1000); requestAnimationFrame(loop); }
    requestAnimationFrame(loop);
  });

  var lb = document.createElement('div');
  lb.className = 'ak-lb';
  lb.innerHTML = '<img alt="">';
  root.appendChild(lb);
  document.addEventListener('click', function (e) {
    var img = e.target.closest('.akp .ak-shot img');
    if (img) { lb.querySelector('img').src = img.currentSrc || img.src; lb.classList.add('on'); }
    else if (e.target.closest('.akp .ak-lb')) lb.classList.remove('on');
  });
})();
