"""Generate the Verify governance graphic: corpus -> controls -> any AI system -> evidence."""
import html, sys

W, H = 1240, 534
MECH = [('Policies', 'allow, block, or report'), ('Evaluations', 'observe, grade, score'), ('Guardrails', 'act inline'),
        ('Sanitizers', 'redact, mask, reshape'), ('Human', 'Escalations, a human in the loop'), ('Audit & attestation', 'tamper-evident')]
SYS = [('Claims agent', 'ON AKKA'), ('Underwriting workflow', 'ON AKKA'), ('Support agent', 'BUILT ELSEWHERE'), ('Research agent', 'BUILT ELSEWHERE')]
REGS = ['EU AI Act', 'NIST AI RMF', 'ISO/IEC 42001', 'DORA', 'GDPR', 'SR 11-7']
A, B, C = (0, 300), (370, 830), (900, 1240)
TOP, BOT = 0, 392
ROW_Y = [62 + 54 * i for i in range(6)]       # top of each control row
CARD_Y = [62 + 82 * i for i in range(4)]      # top of each system card
HUB = (B[1], 222)

o = []
a = o.append
a('<div class="vp rv d2" data-vp data-src="new" data-ref="drawn 2026-10-26 · control names from the live #s3 diagram; corpus recount 241 / 1,718 (explainability origin/main f26b5ffa); regulation names from explainability/framework/regulations">')
a('  <div class="vp-scroll">')
a('  <svg class="vp-svg" viewBox="0 0 %d %d" role="img" aria-label="Your risk team applies controls from a corpus of regulations to AI systems built on Akka or elsewhere; every action is recorded as evidence">' % (W, H))

# corpus
a('    <rect class="vp-box" x="0.5" y="0.5" width="%d" height="%d" rx="14"/>' % (A[1] - 1, BOT - 1))
a('    <g class="vp-you" transform="translate(30 34)"><circle cx="0" cy="-7" r="5.5"/><path d="M-10 11 C-10 1 10 1 10 11 Z"/></g>')
a('    <text class="vp-h" x="52" y="40">YOUR RISK TEAM</text>')
a('    <text class="vp-n" x="24" y="118">241</text><text class="vp-nl" x="24" y="142">regulations and frameworks</text>')
a('    <text class="vp-n" x="24" y="200">1,718</text><text class="vp-nl" x="24" y="224">controls</text>')
x, y = 24, 254
for r in REGS:
    w = len(r) * 7.2 + 24
    if x + w > A[1] - 20:
        x, y = 24, y + 38
    a('    <g class="vp-reg"><rect x="%g" y="%d" width="%g" height="28" rx="14"/><text x="%g" y="%d" text-anchor="middle">%s</text></g>' % (x, y, w, x + w / 2, y + 18.5, html.escape(r)))
    x += w + 8

# controls plane
a('    <rect class="vp-box plane" x="%g" y="0.5" width="%d" height="%d" rx="14"/>' % (B[0] + .5, B[1] - B[0] - 1, BOT - 1))
a('    <text class="vp-h" x="%d" y="40">CONTROLS</text>' % (B[0] + 22))
for i, (n, d) in enumerate(MECH):
    y = ROW_Y[i]
    a('    <g class="vp-row" data-mi="%d"><rect x="%d" y="%d" width="%d" height="44" rx="9"/><text class="vp-mn" x="%d" y="%d">%s</text><text class="vp-md" x="%d" y="%d">%s</text></g>'
      % (i, B[0] + 16, y, B[1] - B[0] - 32, B[0] + 34, y + 27.5, html.escape(n), B[0] + 214, y + 27.5, html.escape(d)))
    a('    <path class="vp-in" data-mc="%d" d="M%d 212 C%d 212 %d %d %d %d"/>' % (i, A[1], A[1] + 40, B[0] - 30, y + 22, B[0] + 16, y + 22))

# systems
a('    <rect class="vp-box" x="%g" y="0.5" width="%d" height="%d" rx="14"/>' % (C[0] + .5, C[1] - C[0] - 1, BOT - 1))
a('    <text class="vp-h" x="%d" y="40">ANY AI SYSTEM</text>' % (C[0] + 22))
for i, (n, t) in enumerate(SYS):
    y = CARD_Y[i]
    a('    <path class="vp-out" data-sc="%d" d="M%d %d C%d %d %d %d %d %d"/>' % (i, HUB[0], HUB[1], HUB[0] + 40, HUB[1], C[0] - 20, y + 32, C[0] + 16, y + 32))
    a('    <g class="vp-sys" data-si="%d"><rect x="%d" y="%d" width="%d" height="64" rx="10"/><text class="vp-sn" x="%d" y="%d">%s</text><text class="vp-st%s" x="%d" y="%d">%s</text><circle class="vp-sd" cx="%d" cy="%d" r="4.5"/><text class="vp-ss" x="%d" y="%d" text-anchor="end"></text></g>'
      % (i, C[0] + 16, y, C[1] - C[0] - 32, C[0] + 34, y + 27, html.escape(n), ' akka' if t == 'ON AKKA' else '', C[0] + 34, y + 47, t,
         C[1] - 34, y + 32, C[1] - 46, y + 36))
a('    <circle class="vp-hub" cx="%d" cy="%d" r="5"/>' % HUB)

# evidence
a('    <path class="vp-ev" data-ve d="M%d %d V%d"/>' % ((C[0] + C[1]) // 2, BOT, 416))
a('    <rect class="vp-box ev" x="0.5" y="416" width="%d" height="%d" rx="14"/>' % (W - 1, H - 417))
a('    <text class="vp-h" x="24" y="445">EVIDENCE</text>')
for i in range(3):
    y = 470 + 22 * i
    a('    <g class="vp-erow" data-ei="%d"><text class="vp-ec" x="24" y="%d"></text><text class="vp-e1" x="46" y="%d"></text><text class="vp-e2" x="300" y="%d"></text><text class="vp-e3" x="560" y="%d"></text><text class="vp-e4" x="760" y="%d"></text></g>' % (i, y, y, y, y, y))
a('  </svg>')
a('  </div>')
a('</div>')
open(sys.argv[1], 'w', encoding='utf-8', newline='\n').write('\n'.join(o) + '\n')
print('ok')
