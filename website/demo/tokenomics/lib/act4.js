/* Act4: the pieces scenes 4.1 and 4.2 share for the console views they mock inside Mock.consoleFrame, in the
   console's own look (Cost › Budgets, a budget's page, Cost › Prices). Everything is laid out in the console's
   logical px (the frame scales it 1.2x); the figures are the canon of sample-figures.md.
     Act4.css()                     the stylesheet, added once (prefix a4-)
     Act4.tile({ k, v, sub })       one figure card: label, value, detail lines
     Act4.grid({ cols, rows })      a DataGrid-like table; cols [{ h, w, r? }], rows [[cell html, …]]
     Act4.chip(text, tone)          a status chip: 'ok' | 'warn' | 'bad' | 'default'
     Act4.bar(pct)                  a used-share bar with its percentage
     Act4.demo()                    the purple "Applied by the demo" chip, console size
     Act4.lit(el, g)                sets --g (0..1), the yellow ring a highlighted card, row or cell shows */
window.Act4 = (function () {
  const M = Mock;

  function css() {
    M.style('a4', `
      .a4-page { position: relative; }
      .a4 .tk-chiptop .tk-chip { background: rgba(0, 0, 0, .8); }
      .a4-crumb { font-size: 13px; color: var(--c-muted); margin-bottom: 10px; }
      .a4-crumb b { color: var(--c-text); font-weight: 500; }
      .a4-btn { margin-left: auto; font-size: 12.5px; padding: 5px 11px; border-radius: 8px; background: var(--c-surface-2); box-shadow: inset 0 0 0 1px var(--c-line); color: var(--c-text); white-space: nowrap; }
      .a4-btn.y { background: var(--c-gold-bg); color: var(--c-gold-text); box-shadow: inset 0 0 0 1px var(--c-gold-ring); }
      .a4-tiles { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
      .a4-tile { --g: 0; position: relative; background: var(--c-surface); border-radius: 12px; padding: 14px 16px 16px;
        box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--yellow) calc(var(--g) * 90%), var(--c-line)), 0 0 calc(var(--g) * 34px) calc(var(--g) * -6px) rgba(255, 206, 74, .55); }
      .a4-tile .k { font-size: 13px; color: var(--c-muted); white-space: nowrap; }
      .a4-tile .v { margin-top: 8px; font: 600 27px/1 var(--sans); letter-spacing: -.02em; font-variant-numeric: tabular-nums; white-space: nowrap;
        color: color-mix(in srgb, var(--yellow) calc(var(--g) * 100%), var(--c-text)); }
      .a4-tile .s { margin-top: 9px; font-size: 12.5px; line-height: 1.45; color: var(--c-muted); }
      .a4-tile .s span { display: block; }
      .a4-note { margin-top: 8px; font-size: 11.5px; color: var(--c-faint); }
      .a4-h { display: flex; align-items: baseline; gap: 14px; margin: 16px 0 10px; font: 600 17px/1.2 var(--sans); letter-spacing: -.01em; }
      .a4-h .f { font-size: 13px; font-weight: 400; color: var(--c-muted); }
      .a4-h .f b { color: var(--c-text); font-weight: 500; }
      .a4-grid { background: var(--c-surface); border-radius: 12px; box-shadow: inset 0 0 0 1px var(--c-line); overflow: hidden; }
      .a4-gt { display: flex; align-items: center; gap: 12px; padding: 10px 16px 8px; font: 600 15px/1.2 var(--sans); }
      .a4-gt .n { font-size: 12.5px; font-weight: 400; color: var(--c-muted); }
      .a4-r { --g: 0; display: grid; align-items: center; min-height: 34px; padding: 0 16px; border-top: 1px solid var(--c-line); font-size: 13.5px; font-variant-numeric: tabular-nums; white-space: nowrap;
        background: color-mix(in srgb, var(--yellow) calc(var(--g) * 10%), transparent); box-shadow: inset 0 0 0 calc(var(--g) * 1px) color-mix(in srgb, var(--yellow) 85%, transparent); }
      .a4-r.h { min-height: 30px; border-top: 0; color: var(--c-faint); font-size: 12px; letter-spacing: .02em; }
      .a4-r > div { --g: 0; min-width: 0; overflow: hidden; text-overflow: ellipsis; padding-right: 10px; border-radius: 6px;
        color: color-mix(in srgb, var(--yellow) calc(var(--g) * 100%), currentColor); }
      .a4-r > div.r { text-align: right; }
      .a4-r > div.pl { padding-left: 16px; }
      .a4-r .m { color: var(--c-muted); }
      .a4-r .tok { font-family: var(--mono); font-size: 11.5px; background: var(--c-sunk); box-shadow: inset 0 0 0 1px var(--c-line); padding: 1px 6px; border-radius: 5px; }
      .a4-r .cmd { color: var(--c-blue); font-weight: 500; }
      .a4-bar { display: inline-flex; align-items: center; gap: 8px; }
      .a4-bar i { position: relative; display: inline-block; width: 60px; height: 6px; border-radius: 999px; background: var(--c-sunk); box-shadow: inset 0 0 0 1px var(--c-line); overflow: hidden; }
      .a4-bar i b { position: absolute; left: 0; top: 0; bottom: 0; background: var(--c-gold); }
      .a4-chip { display: inline-flex; align-items: center; gap: 6px; height: 22px; padding: 0 9px; border-radius: 6px; font-size: 12px; font-weight: 500; white-space: nowrap; }
      .a4-chip::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
      .a4-chip.ok { background: var(--c-green-bg); color: var(--c-green); }
      .a4-chip.warn { background: var(--c-amber-bg); color: var(--c-amber); }
      .a4-chip.bad { background: var(--c-red-bg); color: var(--c-red); }
      .a4-chip.default { background: var(--c-surface-2); color: var(--c-muted); }
      .a4-chip.blue { background: var(--c-blue-bg); color: var(--c-blue); }
      .a4-demo { display: inline-flex; align-items: center; margin-left: 10px; font: 600 10px/1 var(--sans); letter-spacing: .08em; text-transform: uppercase; padding: 4px 7px; border-radius: 999px;
        color: #b9a4ff; border: 1px solid rgba(167, 139, 250, .45); background: rgba(167, 139, 250, .10); vertical-align: middle; }
      .a4-facts { display: grid; grid-template-columns: 150px 1fr; row-gap: 0; font-size: 13.5px; }
      .a4-facts > div { padding: 8px 0; border-top: 1px solid var(--c-line); }
      .a4-facts > div:nth-child(-n+2) { border-top: 0; }
      .a4-facts .k { color: var(--c-muted); }
      .a4-chart { position: relative; background: var(--c-surface); border-radius: 12px; box-shadow: inset 0 0 0 1px var(--c-line); }
      .a4-chart svg { display: block; overflow: visible; }
      .a4-chart text { fill: var(--c-muted); font: 12px var(--sans); }
      .a4-chart .ax { stroke: var(--c-line); }
      .a4-chart .plan { stroke: var(--c-muted); stroke-width: 1.5; stroke-dasharray: 5 5; fill: none; }
      .a4-chart .act { stroke: var(--c-gold-text); stroke-width: 2.5; fill: none; }
      .a4-chart .proj { stroke: var(--c-gold-text); stroke-width: 2; stroke-dasharray: 7 5; fill: none; }
      .a4-chart .band { fill: rgba(201, 162, 39, .22); }
      .a4-chart .bud { stroke: var(--c-text); stroke-width: 1.5; }
      .a4-chart .thr { stroke: var(--c-muted); stroke-width: 1; stroke-dasharray: 3 5; }
      .a4-chart .now { stroke: var(--c-faint); stroke-width: 1; stroke-dasharray: 2 4; }
      .a4-chart .ro { fill: var(--c-red); }
      .a4-chart .ror { fill: none; stroke: var(--c-red); stroke-width: 2; }
      .a4-chart .rot { fill: var(--c-red); font: 600 14px var(--sans); }
    `);
  }

  const tile = ({ k, v, sub = [] }) => `<div class="a4-tile"><div class="k">${k}</div><div class="v" data-k="v">${v}</div><div class="s">${sub.map((s) => `<span>${s}</span>`).join('')}</div></div>`;

  function grid({ title, n, cols, rows }) {
    const tpl = cols.map((c) => c.w).join(' ');
    const row = (cells, h) => `<div class="a4-r${h ? ' h' : ''}" style="grid-template-columns:${tpl}">${cells.map((c, i) => `<div class="${cols[i].r ? 'r' : ''}${cols[i].pl ? ' pl' : ''}">${c}</div>`).join('')}</div>`;
    return `<div class="a4-grid">${title ? `<div class="a4-gt">${title}${n ? `<span class="n">${n}</span>` : ''}</div>` : ''}${row(cols.map((c) => c.h), true)}${rows.map((r) => row(r)).join('')}</div>`;
  }

  const chip = (text, tone = 'default') => `<span class="a4-chip ${tone}">${text}</span>`;
  const bar = (pct) => `<span class="a4-bar">${pct.toFixed(1)}%<i><b style="width:${Math.min(100, pct)}%"></b></i></span>`;
  const demo = () => `<span class="a4-demo">Applied by the demo</span>`;
  const lit = (el, g) => el.style.setProperty('--g', M.clamp(g).toFixed(3));

  return { css, tile, grid, chip, bar, demo, lit };
})();
