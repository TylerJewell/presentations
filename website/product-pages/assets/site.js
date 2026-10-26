/* akka.io product pages mock: shared chrome, review layer and small behaviours. */
(function () {
  document.documentElement.classList.add('js');
  var page = document.body.getAttribute('data-page') || '';
  var LIVE = 'https://akka.io';

  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }

  /* ---------- header and mega menu ---------- */
  var pf = [
    ['overview', 'Overview', 'overview.html', null],
    ['sdk', 'Akka SDK', 'sdk.html', [['Components', 'sdk.html#components']]],
    ['specify', 'Akka Specify', 'specify.html', [['Build', 'specify.html#build'], ['Test', 'specify.html#test']]],
    ['verify', 'Akka Verify', 'verify.html', [['Controls', 'verify.html#controls'], ['Activity', 'verify.html#activity'], ['Human', 'verify.html#human'], ['Evidence', 'verify.html#evidence']]],
    ['optimize', 'Akka Optimize', 'optimize.html', [['Cost', 'optimize.html#cost'], ['Inference', 'optimize.html#inference'], ['Training', 'optimize.html#training']]]
  ];
  function pfList() {
    var h = '<ul class="pf-list">';
    pf.forEach(function (p) {
      h += '<li><a class="nm" href="' + p[2] + '">' + p[1] + '</a>';
      if (p[3]) h += '<span class="pg" data-src="console" data-ref="nav.ts page names">' + p[3].map(function (x) { return '<a href="' + x[1] + '">' + x[0] + '</a>'; }).join(' · ') + '</span>';
      h += '</li>';
    });
    h += '<li class="minor" data-src="dec" data-ref="D10 · labels for Tyler"><a class="nm" href="' + LIVE + '/platform/tour">Tour</a></li>';
    h += '<li class="minor" data-src="dec" data-ref="D10 · labels for Tyler"><a class="nm" href="' + LIVE + '/platform/capabilities">Capabilities</a></li>';
    return h + '</ul>';
  }
  var compare = [['AWS Bedrock AgentCore', 'aws-bedrock'], ['Azure AI Foundry', 'azure-ai-foundry'], ['CrewAI', 'crewai'], ['Databricks Mosaic AI', 'databricks'], ['Gemini Enterprise Agent Platform', 'google-gemini-enterprise'], ['LangChain', 'langchain'], ['LlamaIndex', 'llamaindex'], ['n8n', 'n8n'], ['NVIDIA', 'nvidia'], ['Orkes Conductor', 'orkes'], ['PydanticAI', 'pydantic-ai'], ['Salesforce Agentforce', 'salesforce-agentforce'], ['Temporal', 'temporal'], ['Vercel AI SDK', 'vercel-ai-sdk']];
  var customers = [['John Deere', 'john-deere'], ['Swiggy', 'swiggy'], ['Tubi', 'tubi'], ['Verizon', 'verizon'], ['Capital One', 'capital-one'], ['Walmart', 'walmart'], ['Doctolib', 'doctolib'], ['Norwegian Cruise Line', 'norwegian-cruise-line'], ['CERN', 'cern'], ['Renault', 'renault'], ['Amazon eero', 'eero']];
  function li(arr, fn) { return arr.map(function (x) { return '<li><a href="' + fn(x) + '">' + x[0] + '</a></li>'; }).join(''); }
  var chip = function (cls, lead) {
    return '<button class="ia ' + cls + '" type="button" data-copy="install Akka from akka.ai">' + (lead ? '<span class="lead-in">In your AI harness:</span> ' : '<span class="g">›</span> ') + '<span>install Akka from akka.ai</span><span class="cp">Copy</span></button>';
  };

  var hdr = document.createElement('header');
  hdr.className = 'hdr';
  hdr.innerHTML = '<a class="logo" href="home.html" aria-label="Akka home" data-src="fix" data-ref="logo links to / (was /old)"><img src="https://akka.io/hubfs/AKKA-2024/Images/akka_logo.svg" alt="Akka"></a>' +
    '<span class="sp"></span><a class="contact" href="' + LIVE + '/contact-us">Contact</a>' +
    '<button class="menu-btn" type="button" aria-expanded="false" aria-controls="mega"><span class="bars"></span>Menu</button>';
  var mega = document.createElement('div');
  mega.className = 'mega';
  mega.id = 'mega';
  mega.innerHTML = '<div class="cols">' +
    '<div><div class="group"><h6>Platform</h6>' + pfList() + '</div>' +
    '<div class="group"><h6>Compare</h6><ul class="link-list">' + li(compare, function (x) { return LIVE + '/compare/akka-vs-' + x[1]; }) + '</ul></div></div>' +
    '<div><div class="group"><h6>Customers</h6><a class="feature-story" href="' + LIVE + '/blog/manulife-selects-akka-to-operationalize-agentic-ai"><b>Manulife Selects Akka to Operationalize Agentic AI</b><span>Akka provides a global insurance leader a secure and scalable foundation to build high volume of trusted AI-powered applications.</span><em>Read the story</em></a>' +
    '<ul class="link-list">' + li(customers, function (x) { return LIVE + '/customer-stories/' + x[1]; }) + '<li><a href="' + LIVE + '/blog/news-akka-and-deloitte">Deloitte</a></li><li><a href="' + LIVE + '/customers">More customer stories →</a></li></ul></div></div>' +
    '<div><div class="group"><h6>Developers</h6><div style="margin-bottom:16px">' + chip('chip', true) + '</div><ul class="link-list one">' +
    '<li><a href="' + LIVE + '/install">Install Akka</a></li><li><a href="https://doc.akka.io">Documentation</a></li><li><a href="https://doc.akka.io/sdk/spec-driven-development.html">Spec-Driven Development</a></li><li><a href="https://doc.akka.io/getting-started/samples.html">AI Samples</a></li><li><a href="https://doc.akka.io/reference/release-notes.html">Release Notes</a></li><li><a href="https://support.akka.io/">Support</a></li><li><a href="https://akkademy.akka.io/learn">Free Training</a></li></ul></div>' +
    '<div class="group"><h6>Company</h6><ul class="link-list"><li><a href="' + LIVE + '/about-us">About</a></li><li><a href="' + LIVE + '/customers">Customer Stories</a></li><li><a href="' + LIVE + '/blog">Blog</a></li><li><a href="https://trust.akka.io/">Trust Center</a></li><li><a href="https://support.akka.io/">Support Portal</a></li><li><a href="https://console.akka.io/login">Platform Login</a></li><li><a href="' + LIVE + '/partners">Partners</a></li></ul></div></div>' +
    '</div>';
  document.body.insertBefore(mega, document.body.firstChild);
  document.body.insertBefore(hdr, document.body.firstChild);
  var mb = hdr.querySelector('.menu-btn');
  mb.addEventListener('click', function () {
    var open = mega.classList.toggle('open');
    mb.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { mega.classList.remove('open'); mb.setAttribute('aria-expanded', 'false'); } });

  /* ---------- footer ---------- */
  var ftr = document.createElement('footer');
  ftr.className = 'ftr';
  var industries = [['Financial Services', 'financial-services'], ['Telecommunications', 'telecommunications'], ['Retail & E-commerce', 'retail'], ['Manufacturing', 'manufacturing'], ['Media & Streaming', 'media'], ['Public Sector', 'public-sector']];
  ftr.innerHTML = '<div class="top"><img src="https://akka.io/hubfs/AKKA-2024/Images/akka_logo.svg" alt="Akka">' + chip('quiet', false) + '</div><div class="grid">' +
    '<div><h6>Platform</h6><ul>' + pf.map(function (p) { return '<li><a href="' + p[2] + '">' + p[1] + '</a></li>'; }).join('') + '<li><a href="' + LIVE + '/platform/tour">Tour</a></li><li><a href="' + LIVE + '/platform/capabilities">Capabilities</a></li></ul></div>' +
    '<div><h6>Industries</h6><ul>' + li(industries, function (x) { return LIVE + '/industries/' + x[1]; }) + '</ul></div>' +
    '<div><h6>Customers</h6><ul><li><a href="' + LIVE + '/blog/manulife-selects-akka-to-operationalize-agentic-ai">Manulife</a></li>' + li(customers.slice(0, 7), function (x) { return LIVE + '/customer-stories/' + x[1]; }) + '<li><a href="' + LIVE + '/customers">All customer stories →</a></li></ul></div>' +
    '<div><h6>Compare</h6><ul>' + li(compare.slice(0, 8), function (x) { return LIVE + '/compare/akka-vs-' + x[1]; }) + '</ul></div>' +
    '<div><h6>Developers</h6><ul><li><a href="https://doc.akka.io/getting-started/index.html">Getting Started</a></li><li><a href="https://doc.akka.io/sdk/spec-driven-development.html">Spec-Driven Development</a></li><li><a href="https://doc.akka.io/sdk/agents.html">Agents</a></li><li><a href="https://doc.akka.io/sdk/autonomous-agents.html">Autonomous Agents</a></li><li><a href="https://doc.akka.io/sdk/workflows.html">Workflows</a></li><li><a href="https://doc.akka.io/sdk/agents/guardrails.html">Guardrails & Evaluation</a></li></ul></div>' +
    '<div><h6>Company</h6><ul><li><a href="' + LIVE + '/about-us">About</a></li><li><a href="' + LIVE + '/blog">Blog</a></li><li><a href="https://trust.akka.io/">Trust Center</a></li><li><a href="' + LIVE + '/partners">Partners</a></li><li><a href="' + LIVE + '/contact-us">Contact</a></li><li><a href="https://console.akka.io/login">Platform Login</a></li></ul></div>' +
    '</div><div class="fine">Mock of proposed changes · 2026-10-26 · not published · <a href="index.html">mock index</a></div>';
  document.body.appendChild(ftr);

  /* ---------- review layer ---------- */
  var labels = { live: 'Live', canon: 'Canon', console: 'Console label', tour: 'Tour title', fix: 'Correction', 'new': 'New layout', dec: 'Decision' };
  function badges() {
    document.querySelectorAll('[data-src]').forEach(function (el) {
      var s = el.getAttribute('data-src'), r = el.getAttribute('data-ref');
      el.setAttribute('data-badge', (labels[s] || s) + (r ? ' · ' + r : ''));
    });
  }
  function setD2(mode) {
    document.querySelectorAll('[data-d2-live]').forEach(function (el) {
      el.textContent = mode === 'live' ? el.getAttribute('data-d2-live') : el.getAttribute('data-d2-new');
    });
  }
  var dock = document.createElement('div');
  dock.className = 'rv-dock';
  dock.innerHTML = '<div class="rv-panel"><h5>Review layer</h5><p>Every text block carries its source. Dashed boxes are copy slots for Tyler and show at all times.</p>' +
    '<div class="lg"><span class="b-live">Live</span><span>Text on akka.io today, moved or kept</span><span class="b-canon">Canon</span><span>Tyler's approved wording: the 2026-10-13 definitions and the 2026-10-26 platform sentence</span>' +
    '<span class="b-console">Console</span><span>Label from the console nav</span><span class="b-tour">Tour</span><span>Title from tour.js</span>' +
    '<span class="b-fix">Fix</span><span>Correction under a standing rule</span><span class="b-dec">Decision</span><span>Depends on a decision in the study</span><span class="b-new">New</span><span>New screen or layout, no new words</span></div>' +
    '<div class="row"><span>Show sources</span><button class="sw" role="switch" aria-checked="false" id="sw-rv"></button></div>' +
    '<div class="row"><span>D2 category: live wording</span><button class="sw" role="switch" aria-checked="false" id="sw-d2"></button></div></div>' +
    '<button type="button" id="rv-toggle"><i></i>Review</button>';
  document.body.appendChild(dock);
  var swRv = dock.querySelector('#sw-rv'), swD2 = dock.querySelector('#sw-d2');
  dock.querySelector('#rv-toggle').addEventListener('click', function () { dock.classList.toggle('open'); });
  function applyRv(on) { document.documentElement.classList.toggle('review', on); swRv.setAttribute('aria-checked', on ? 'true' : 'false'); store('mock-review', on ? '1' : '0'); }
  function applyD2(live) { setD2(live ? 'live' : 'new'); swD2.setAttribute('aria-checked', live ? 'true' : 'false'); store('mock-d2', live ? 'live' : 'new'); }
  swRv.addEventListener('click', function () { applyRv(swRv.getAttribute('aria-checked') !== 'true'); });
  swD2.addEventListener('click', function () { applyD2(swD2.getAttribute('aria-checked') !== 'true'); });
  badges();
  applyRv(store('mock-review') === '1' || /[?&]review/.test(location.search));
  applyD2(store('mock-d2') === 'live');

  /* ---------- install chip copy ---------- */
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-copy]');
    if (!b) return;
    var t = b.getAttribute('data-copy');
    var done = function () { b.classList.add('copied'); var cp = b.querySelector('.cp'); if (cp) { cp.textContent = 'Copied'; setTimeout(function () { cp.textContent = 'Copy'; b.classList.remove('copied'); }, 1600); } };
    if (navigator.clipboard) navigator.clipboard.writeText(t).then(done, done); else done();
  });

  /* ---------- tabs ---------- */
  document.querySelectorAll('[data-tabs]').forEach(function (group) {
    var btns = group.querySelectorAll('[role="tab"]');
    var scope = document.getElementById(group.getAttribute('data-tabs'));
    btns.forEach(function (b, i) {
      b.addEventListener('click', function () {
        btns.forEach(function (x) { x.setAttribute('aria-selected', 'false'); });
        b.setAttribute('aria-selected', 'true');
        scope.querySelectorAll(':scope > .tabpanel, :scope > figure').forEach(function (p, j) { p.classList.toggle('on', j === i); });
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

  /* ---------- rotating word ---------- */
  document.querySelectorAll('[data-words]').forEach(function (el) {
    var w = el.getAttribute('data-words').split('|'), i = 0;
    setInterval(function () { i = (i + 1) % w.length; el.textContent = w[i]; }, 2200);
  });

  /* ---------- spec to architecture: each spec part lights the components it produces ---------- */
  document.querySelectorAll('[data-xform]').forEach(function (x) {
    var keys = ['intro', 'entities', 'rules', 'views'], i = 0, paused = false;
    function show(k) { x.querySelectorAll('[data-k]').forEach(function (e) { e.classList.toggle('hot', e.getAttribute('data-k') === k); }); }
    show(keys[0]);
    setInterval(function () { if (paused || document.hidden) return; i = (i + 1) % keys.length; show(keys[i]); }, 2600);
    x.querySelectorAll('.xdoc [data-k]').forEach(function (e) {
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

  /* ---------- row links ---------- */
  document.querySelectorAll('tr.row-link').forEach(function (tr) {
    tr.addEventListener('click', function (e) { if (e.target.closest('a')) return; var a = tr.querySelector('a'); if (a) location.href = a.href; });
  });

  /* ---------- reveal ---------- */
  var els = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add('in'); }); }

  /* ---------- lightbox ---------- */
  var lb = document.createElement('div');
  lb.className = 'lb';
  lb.innerHTML = '<img alt="">';
  document.body.appendChild(lb);
  document.addEventListener('click', function (e) {
    var img = e.target.closest('.shot img');
    if (img) { lb.querySelector('img').src = img.currentSrc || img.src; lb.classList.add('on'); }
    else if (e.target.closest('.lb')) lb.classList.remove('on');
  });
})();
