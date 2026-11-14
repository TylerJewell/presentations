/* Act2: the console-look pieces the Savings scenes (2.2, 2.3) draw their mocks with, inside a Mock.consoleFrame
   or a Tok.capture patch. Sizes are the console's logical px (a frame scales them by 1.2; a patch wraps its
   content in .a2-zoom). Nothing here moves: scenes set every opacity from t.
     Act2.css()                         adds the stylesheet once (class a2 on the scene root)
     Act2.grid({ cols, rows, total, style })   a DataGrid: cols [{ label, w, r (right), note }], rows of cell
                                        HTML (a cell may be { html, cls }), an optional total row; the rows
                                        carry data-k="row<i>" and the total data-k="total"
     Act2.chip(tone, text)              a status chip: ok | accent | warn | bad | demo
     Act2.btn(text, kind)               a button: '' secondary | 'primary' */
window.Act2 = (function () {
  const M = Mock;

  function css() {
    M.style('a2', `
      .a2 .mk-console .page { height: 560px; }
      .a2-zoom { transform: scale(1.1); transform-origin: 0 0; width: calc(100% / 1.1); }
      .a2 .sec { display: flex; align-items: center; gap: 10px; height: 34px; }
      .a2 .sec h3 { margin: 0; font: 600 17px/1 var(--sans); letter-spacing: -.01em; }
      .a2 .sec .ctl { margin-left: auto; display: flex; gap: 8px; align-items: center; }
      .a2 .btn { display: inline-flex; align-items: center; gap: 8px; height: 30px; padding: 0 12px; border-radius: 9px; white-space: nowrap;
        font: 500 13px/1 var(--sans); color: var(--c-text); background: var(--c-surface-2); box-shadow: inset 0 0 0 1px var(--c-line); }
      .a2 .btn .mu { color: var(--c-muted); }
      .a2 .btn .ar { font-size: 10px; color: var(--c-muted); }
      .a2 .btn.primary { background: var(--cyan); color: #0b0b0d; font-weight: 600; box-shadow: none; }
      .a2 .btn.link { background: none; box-shadow: none; color: var(--cyan); padding: 0 6px; }
      .a2 .panel { background: var(--c-surface); box-shadow: inset 0 0 0 1px var(--c-line); border-radius: 12px; padding: 14px 18px; }
      .a2 .panel .empty { color: var(--c-muted); font-size: 14px; }
      .a2 .menu { position: absolute; z-index: 5; min-width: 190px; padding: 6px; border-radius: 12px; background: #18181b;
        box-shadow: inset 0 0 0 1px var(--c-line), 0 18px 50px rgba(0,0,0,.6); }
      .a2 .menu .it { display: flex; align-items: center; height: 34px; padding: 0 12px; border-radius: 8px; font-size: 13.5px; }
      .a2 .menu .it.hot { background: var(--c-surface-2); }
      .a2 .sum { margin: 0; font-size: 13.5px; line-height: 1.5; color: var(--c-text); }
      .a2 .g { font-size: 13px; }
      .a2 .g .gr { display: grid; align-items: center; height: 32px; padding: 0 12px; border-bottom: 1px solid var(--c-line); white-space: nowrap; }
      .a2 .g .gh { height: 30px; color: var(--c-muted); font-size: 12px; border-radius: 8px 8px 0 0; background: var(--c-surface-2); }
      .a2 .g .gt { font-weight: 600; background: var(--c-surface-2); border-bottom: 0; border-radius: 0 0 8px 8px; }
      .a2 .g .r { text-align: right; }
      .a2 .g .n { font-family: var(--mono); font-size: 12.5px; font-variant-numeric: tabular-nums; }
      .a2 .g .mu { color: var(--c-muted); }
      .a2 .g .gt .n { font-weight: 600; }
      .a2 .g .cmd { color: var(--cyan); font-size: 12.5px; }
      .a2 .g .cmd span { margin-right: 12px; }
      .a2 .g .ck { color: var(--c-muted); margin-right: 8px; font-size: 11px; }
      .a2 .g sup { font-size: 8.5px; color: var(--c-muted); margin-left: 2px; }
      .a2 .notes { margin-top: 8px; font-size: 11.5px; color: var(--c-muted); }
      .a2 .notes sup { font-size: 8.5px; margin-right: 1px; }
      .a2 .notes i { font-style: normal; margin: 0 8px; opacity: .6; }
      .a2 .chip { display: inline-flex; align-items: center; height: 22px; padding: 0 9px; border-radius: 999px; font: 500 12px/1 var(--sans); white-space: nowrap; }
      .a2 .chip.ok { background: var(--c-green-bg); color: var(--c-green); }
      .a2 .chip.accent { background: var(--c-blue-bg); color: var(--c-blue); }
      .a2 .chip.warn { background: var(--c-amber-bg); color: var(--c-amber); }
      .a2 .chip.bad { background: var(--c-red-bg); color: var(--c-red); }
      .a2 .chip.demo { background: var(--c-violet-bg); color: #b9a4ff; }
      .a2 .chip.rec { background: var(--c-amber-bg); color: var(--c-amber); box-shadow: inset 0 0 0 1px rgba(251,191,36,.4); margin-left: 6px; }
      .a2 .dlg { position: absolute; border-radius: 14px; background: #18181b; box-shadow: inset 0 0 0 1px var(--c-line), 0 30px 80px rgba(0,0,0,.7); padding: 22px 26px; }
      .a2 .dlg h2 { margin: 0 0 12px; font: 600 18px/1.2 var(--sans); letter-spacing: -.01em; }
      .a2 .dlg .desc { margin: 0 0 16px; font-size: 13px; line-height: 1.5; color: var(--c-muted); }
      .a2 .dlg .foot { display: flex; justify-content: flex-end; gap: 10px; margin-top: 18px; }
      .a2 .scrim { position: absolute; inset: 0; background: rgba(0,0,0,.55); }
      .a2 .foot-links { position: absolute; right: 0; display: flex; gap: 22px; font-size: 14px; color: var(--cyan); }
      /* a cell's glow: --g 0..1 */
      .a2 .g .gl { --g: 0; border-radius: 6px; padding: 3px 6px; margin: -3px -6px; display: inline-block;
        background: rgba(255,206,74, calc(var(--g) * .16)); box-shadow: 0 0 calc(var(--g) * 26px) calc(var(--g) * -6px) rgba(255,206,74,.8);
        color: color-mix(in srgb, var(--yellow) calc(var(--g) * 100%), currentColor); }
    `);
  }

  /* pad: a left-aligned column after a right-aligned one keeps its distance */
  const padOf = (col) => (col.pad ? ' style="padding-left:16px"' : '');
  const cell = (c, col) => {
    const o = typeof c === 'string' ? { html: c } : c;
    return `<span class="${col.r ? 'r ' : ''}${o.cls || ''}"${padOf(col)}>${o.html}</span>`;
  };

  function grid({ cols, rows, total, style = '' }) {
    const tpl = cols.map((c) => c.w).join(' ');
    const head = `<div class="gr gh" style="grid-template-columns:${tpl}">${cols.map((c) => `<span class="${c.r ? 'r' : ''}"${padOf(c)}>${c.label}${c.note ? `<sup>${c.note}</sup>` : ''}</span>`).join('')}</div>`;
    const body = rows.map((r, i) => `<div class="gr" data-k="row${i}" style="grid-template-columns:${tpl}">${r.map((c, j) => cell(c, cols[j])).join('')}</div>`).join('');
    const tot = total ? `<div class="gr gt" data-k="total" style="grid-template-columns:${tpl}">${total.map((c, j) => cell(c, cols[j])).join('')}</div>` : '';
    return `<div class="g" style="${style}">${head}${body}${tot}</div>`;
  }

  const chip = (tone, text) => `<span class="chip ${tone}">${text}</span>`;
  const btn = (text, kind = '', k = '') => `<span class="btn ${kind}"${k ? ` data-k="${k}"` : ''}>${text}</span>`;

  return { css, grid, chip, btn };
})();
