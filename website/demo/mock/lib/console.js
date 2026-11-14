/* The console frame: a browser window with a breadcrumb, holding the local console's shell (top bar,
   left nav, bottom bar) in its dark theme. Scenes fill `page` with their mock of one view.

   The console is laid out at its own logical size and scaled up (default 1.2), the way the recordings
   capture a 1600x900 viewport at device scale 1.2. */
(function () {
  const M = window.Mock;

  const NAV = [
    { items: ['Now', 'System'] },
    { group: 'Specify', items: ['Build', 'Test'] },
    { group: 'Verify', items: ['Controls', 'Activity', 'Human', 'Evidence'] },
    { group: 'Optimize', items: ['Cost', 'Inference', 'Training'] },
  ];

  /**
   * opts: { crumb: 'Verify › Controls', active: 'Controls', title: 'Controls', url, rect: [x, y, w, h] (default the full stage),
   *         scale: 1.2, system: 'loan-origination', env: 'Local', bundle: 'v3', band: true,
   *         tabs: ['Stages', 'Tasks'], tab: 'Stages' (the view switch beside the title),
   *         status: 'Nothing needs attention' (an extra bottom-bar item, HTML) }
   * Returns { el, page, band, bandRight, tabs, status, bundle, chrome } where page is the content area below
   * the title band, status is the extra bottom-bar item and bundle the bottom bar's bundle name.
   */
  M.consoleFrame = function (parent, opts = {}) {
    const [x, y, w, h] = opts.rect || [0, 0, 1920, 1080];
    const s = opts.scale ?? 1.2;
    const CH = 44; /* browser chrome height, in stage px */
    const lw = (w / s).toFixed(1), lh = ((h - CH) / s).toFixed(1);
    const crumb = opts.crumb || '';
    const active = opts.active || crumb.split('›').pop().trim();
    const url = opts.url || 'localhost:9889/' + crumb.toLowerCase().split('›').map((p) => p.trim().replace(/\s+/g, '-')).join('/');
    const nav = NAV.map((g) =>
      (g.group ? `<div class="grp">${g.group}</div>` : '') +
      g.items.map((i) => `<div class="it${i === active ? ' on' : ''}">${i}</div>`).join('')
    ).join('');
    const tabs = opts.tabs ? `<span class="tabs" data-k="tabs">${opts.tabs.map((n) => `<span${n === opts.tab ? ' class="on"' : ''}>${n}</span>`).join('')}</span>` : '';
    const r = M.mount(parent, `
      <div class="mk-browser" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px">
        <div class="chrome" data-k="chrome">
          <span class="dots"><i></i><i></i><i></i></span>
          <span class="crumb">${crumb.replace(/›/g, '<b>›</b>')}</span>
          <span class="url">${url}</span>
        </div>
        <div class="mk-console" style="width:${lw}px;height:${lh}px;transform:scale(${s})">
          <div class="top">
            <span class="mark">${M.markSVG(13, '#ececf1')}</span>
            <span class="sel"><b>SYSTEM</b>${opts.system || 'loan-origination'}</span>
            <span class="sel"><b>ENVIRONMENT</b>${opts.env || 'Local'}</span>
            <span class="right"><span class="ask">Ask</span><span class="ic">?</span></span>
          </div>
          <div class="frame">
            <div class="left">${nav}</div>
            <div class="main">
              ${opts.band === false ? '' : `<div class="band" data-k="band"><h1>${opts.title || active}</h1>${tabs}<span class="right" data-k="bandRight"></span></div>`}
              <div class="page" data-k="page"></div>
            </div>
          </div>
          <div class="bottom"><span><b>loan-origination</b> · 4 services running</span><span>Bundle <b data-k="bundle">${opts.bundle || 'v3'}</b> in force</span>${opts.status != null ? `<span data-k="status">${opts.status}</span>` : ''}<span class="sp"></span><span>SDK 3.7.0</span></div>
        </div>
      </div>`);
    return { el: r.root, page: r.page, band: r.band, bandRight: r.bandRight, tabs: r.tabs, status: r.status, bundle: r.bundle, chrome: r.chrome, scale: s };
  };
})();
