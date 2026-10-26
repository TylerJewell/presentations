"""Generate the Specify shipping-factory graphic (SVG) for the Specify page #build section."""
import html, sys

W, H = 1240, 552
CATS = ['Functional', 'Security & compliance', 'Reliability', 'Performance', 'Agentic AI safety', 'Documentation & training']
ST = {'design': (0, 250), 'build': (320, 560), 'gate': (630, 870), 'rel': (940, 1240)}
SY0, SY1 = 164, 436        # station top and bottom
DOCK_Y = 396
GATE_X = [662 + i * 34 for i in range(6)]

o = []
a = o.append
a('<div class="fx rv d2" data-fx data-src="new" data-ref="drawn 2026-10-26 · labels from the live Specify page (spec diagram, toolchain catalog 1,210, policy categories)">')
a('  <div class="fx-scroll">')
a('  <svg class="fx-svg" viewBox="0 0 %d %d" role="img" aria-label="Builds of several systems move through design, build, exit conditions and release; a build that fails a condition returns to build">' % (W, H))

# definition of done rail
a('    <rect class="fx-rail" x="0.5" y="0.5" width="%d" height="92" rx="14"/>' % (W - 1))
a('    <g class="fx-you" transform="translate(30 46)"><circle cx="0" cy="-8" r="6"/><path d="M-11 12 C-11 1 11 1 11 12 Z"/></g>')
a('    <text class="fx-railh" x="56" y="41">YOUR DEFINITION OF DONE</text>')
a('    <text class="fx-railn" x="56" y="62">CATALOG · 1,210 EXIT CONDITIONS</text>')
widths = [len(c) * 7.1 + 26 for c in CATS]
x = W - 18 - sum(widths) - 10 * (len(CATS) - 1)
cx = []
for i, (c, w) in enumerate(zip(CATS, widths)):
    a('    <g class="fx-chip" data-ci="%d"><rect x="%g" y="29" width="%g" height="34" rx="17"/><text x="%g" y="51" text-anchor="middle">%s</text></g>'
      % (i, x, w, x + w / 2, html.escape(c)))
    cx.append(x + w / 2)
    x += w + 10
for i in range(6):
    a('    <path class="fx-con" data-cc="%d" d="M%g 63 C%g 128 %g 110 %g %d"/>' % (i, cx[i], cx[i], GATE_X[i], GATE_X[i], SY0))

# stations
for k, (x0, x1) in ST.items():
    a('    <rect class="fx-st" x="%g" y="%d" width="%g" height="%d" rx="14"/>' % (x0 + .5, SY0, x1 - x0 - 1, SY1 - SY0))
a('    <text class="fx-h" x="22" y="194">DESIGN</text>')
a('    <g class="fx-doc" data-fx-doc><rect x="22" y="210" width="206" height="58" rx="9"/><text class="fx-dt" x="36" y="232">DEV SPEC</text><text class="fx-dd" x="36" y="253">Goals · requirements · knowledge</text></g>')
a('    <g class="fx-doc" data-fx-doc><rect x="22" y="278" width="206" height="58" rx="9"/><text class="fx-dt" x="36" y="300">EVAL MATRIX</text><text class="fx-dd" x="36" y="321">Risk · operations · improvement</text></g>')

a('    <text class="fx-h" x="342" y="194">BUILD</text>')
ARTS = ['Services', 'Workflows', 'APIs', 'UI', 'Tests', 'Docs']
for i, t in enumerate(ARTS):
    ax, ay = 342 + (i % 2) * 102, 210 + (i // 2) * 34
    a('    <g class="fx-art" data-ai="%d"><rect x="%d" y="%d" width="94" height="26" rx="6"/><text x="%d" y="%d" text-anchor="middle">%s</text></g>' % (i, ax, ay, ax + 47, ay + 17.5, t))
a('    <rect class="fx-pt" x="342" y="322" width="196" height="4" rx="2"/><rect class="fx-pf" data-fx-prog x="342" y="322" width="0" height="4" rx="2"/>')

a('    <text class="fx-h" x="652" y="194">EXIT CONDITIONS</text>')
a('    <text class="fx-pill" data-fx-pill x="848" y="194" text-anchor="end"></text>')
for i, c in enumerate(CATS):
    y = 222 + i * 20
    a('    <g class="fx-row" data-gi="%d"><circle class="fx-dot" cx="658" cy="%d" r="4"/><text x="672" y="%d">%s</text><text class="fx-rs" x="848" y="%d" text-anchor="end"></text></g>' % (i, y - 4, y, html.escape(c), y))
a('    <rect class="fx-bar" data-fx-bar x="866" y="%d" width="8" height="44" rx="3"/>' % (DOCK_Y - 22))

a('    <text class="fx-h" x="962" y="194">RELEASED</text>')
a('    <text class="fx-count" data-fx-count x="1218" y="200" text-anchor="end">0</text>')
for i in range(4):
    y = 236 + i * 28
    a('    <g class="fx-rel" data-ri="%d"><text class="fx-ck" x="962" y="%d"></text><text class="fx-rn" x="984" y="%d"></text></g>' % (i, y, y))

# track, docks, return path
a('    <line class="fx-track" x1="175" y1="%d" x2="1040" y2="%d"/>' % (DOCK_Y, DOCK_Y))
for dx in (125, 440, 750, 1090):
    a('    <rect class="fx-dock" x="%d" y="%d" width="104" height="34" rx="8"/>' % (dx - 52, DOCK_Y - 17))
a('    <path class="fx-ret" data-fx-ret d="M750 %d V466 H440 V%d"/>' % (DOCK_Y + 17, DOCK_Y + 17))
a('    <text class="fx-retl" x="595" y="458" text-anchor="middle">BACK TO BUILD</text>')

# tokens are cloned from this template by the page script
a('    <g data-fx-tokens></g>')
a('    <g class="fx-tok" data-fx-tpl style="display:none"><rect x="-52" y="-15" width="104" height="30" rx="7"/><text y="4" text-anchor="middle"></text></g>')

# who does the work
a('    <path class="fx-br you" d="M1 494 V504 H249 V494"/><text class="fx-bl you" x="125" y="530" text-anchor="middle">YOU</text>')
a('    <path class="fx-br" d="M321 494 V504 H1239 V494"/><text class="fx-bl" x="780" y="530" text-anchor="middle">UNATTENDED</text>')
a('  </svg>')
a('  </div>')
a('</div>')
open(sys.argv[1], 'w', encoding='utf-8', newline='\n').write('\n'.join(o) + '\n')
print('chips end at', round(x - 10), 'of', W)
