"""Generate the SDK "If it compiles, it's production-ready" graphic: one system from laptop to production,
then each runtime guarantee plays out in turn with its chip lit."""
import html, json, re, sys

from sd_lib import f, opacity, packet, shown, tint, wire, label, hcurve, line

W, H = 1240, 420
T = 17.0
o = []


def hidden(inner, windows, fade=.25):
    track = opacity(T, windows, fade)
    vals = re.search(r'values="([^"]+)"', track).group(1)
    inv = ';'.join(f(1 - float(v)) for v in vals.split(';'))
    return '<g>%s%s</g>' % (track.replace('values="%s"' % vals, 'values="%s"' % inv), inner)


# scenes: (start, end) for each guarantee, in the order of the chips
GUAR = ['Clustering & sharding', 'In-memory durable state', 'Failover & replication', 'Active-active HA/DR', 'Elastic scale-to-zero', 'Durable execution']
SC = [(2.2, 4.6), (4.6, 7.0), (7.0, 9.4), (9.4, 11.8), (11.8, 14.2), (14.2, 16.6)]
END = T - .3

# laptop with the service you write
o.append('<rect class="gu-screen" x="0.5" y="40" width="300" height="214" rx="12"/>')
o.append('<path class="gu-base" d="M-6 256 H306 L292 272 H8 Z"/>')
o.append(label(18, 64, 'YOUR LAPTOP'))
o.append('<rect class="gu-svc" x="18" y="78" width="264" height="160" rx="10"/>')
o.append(label(32, 100, 'YOUR SERVICE', 'y'))
for i, t in enumerate(['Domain logic', 'Component behavior', 'Business rules']):
    o.append('<text class="gu-w" x="32" y="%d">%s</text>' % (128 + i * 26, t))
o.append('<rect class="gu-rt" x="30" y="206" width="240" height="22" rx="5"/><text class="sd-l y" x="150" y="221" text-anchor="middle">AKKA RUNTIME</text>')
o.append(shown('<g class="gu-ok"><rect x="96" y="290" width="108" height="26" rx="13"/><text x="150" y="307" text-anchor="middle">✓ COMPILES</text></g>', T, [(.3, END)]))

# the same system ships to production
ship = line(306, 150, 404, 150)
o.append(wire(ship))
o.append(label(355, 140, 'SAME SYSTEM', '', 'middle'))
o.append(packet(ship, T, 1.0, 1.7, '', 6))

REG = [('REGION A', 420), ('REGION B', 830)]
o.append('<rect class="gu-prod" x="404" y="20" width="836" height="300" rx="14"/>')
o.append(label(422, 44, 'PRODUCTION'))
link = 'M760 74 C790 48 860 48 890 74'
o.append(shown(wire(link, 'dash'), T, [(2.2, END)]))
o.append(shown(label(825, 44, 'REPLICATING', 'b', 'middle'), T, [SC[3]]))


def nx(r, j):
    return REG[r][1] + 14 + j * 125


region_b = []
for r, (name, rx) in enumerate(REG):
    grp = []
    grp.append('<rect class="gu-reg" x="%d" y="62" width="390" height="244" rx="12"/>' % rx)
    grp.append(label(rx + 14, 84, name))
    for j in range(3):
        x = nx(r, j)
        grp.append('<rect class="sd-sub" x="%d" y="96" width="112" height="196" rx="9"/>' % x)
        grp.append(label(x + 12, 114, 'NODE %d' % (j + 1)))
        grp.append(shown('<rect class="gu-mini" x="%d" y="124" width="88" height="22" rx="5"/><text class="gu-mt" x="%d" y="139" text-anchor="middle">Your service</text>' % (x + 12, x + 56), T, [(1.8, END)]))
    (region_b if r == 1 else o).extend(grp)

# 1 clustering and sharding: nodes mesh, shards spread
for r in (0, 1):
    mesh = [hcurve(nx(r, 0) + 112, 135, nx(r, 1), 135), hcurve(nx(r, 1) + 112, 135, nx(r, 2), 135)]
    tgt = o if r == 0 else region_b
    for d in mesh:
        tgt.append(shown(wire(d), T, [(SC[0][0], END)]))
        tgt.append(packet(d, T, SC[0][0] + .3, SC[0][0] + .9, '', 3.4))
        tgt.append(packet(d, T, SC[0][0] + 1.2, SC[0][0] + 1.8, '', 3.4))
shard = lambda x, y: '<rect class="gu-sh" x="%d" y="%d" width="24" height="24" rx="4"/>' % (x, y)
for r in (0, 1):
    tgt = o if r == 0 else region_b
    for j in range(3):
        for k in range(2):
            t = SC[0][0] + .5 + (j * 2 + k) * .15
            el = shard(nx(r, j) + 12 + k * 32, 160)
            if r == 0 and j == 1:      # node A2's shards leave during failover
                tgt.append(shown(el, T, [(t, SC[2][0] + .2), (SC[2][1] - .2, END)]))
            else:
                tgt.append(shown(el, T, [(t, END)]))

# 2 in-memory durable state: writes land in state, durable bars fill
for r in (0, 1):
    tgt = o if r == 0 else region_b
    for j in range(3):
        x = nx(r, j)
        tgt.append(packet(line(x + 56, 146, x + 24, 160), T, SC[1][0] + .2 + j * .3, SC[1][0] + .6 + j * .3, '', 3.2))
        tgt.append(shown('<rect class="gu-dur" x="%d" y="196" width="88" height="6" rx="2"/>' % (x + 12), T, [(SC[1][0] + .6 + j * .3, END)]))

# 3 failover and replication: node A2 drops, its shards move to A1 and A3, then it recovers
a2 = nx(0, 1)
o.append(tint(a2, 96, 112, 196, T, [(SC[2][0], SC[2][1] - .4)], 'r'))
o.append(shown(label(a2 + 56, 282, 'NODE DOWN', 'r', 'middle'), T, [(SC[2][0], SC[2][1] - .4)]))
for k, j in enumerate((0, 2)):
    src = (a2 + 24 + k * 32, 172)
    dst = (nx(0, j) + 88, 172)
    o.append(packet(line(src[0], src[1], dst[0], dst[1]), T, SC[2][0] + .3, SC[2][0] + .9, 'b', 4))
    o.append(shown(shard(dst[0] - 12, 160), T, [(SC[2][0] + .9, SC[2][1])]))

# 4 active-active HA/DR: both regions take writes and replicate to each other
for k in range(4):
    t = SC[3][0] + .2 + k * .55
    o.append(packet(link, T, t, t + .5, 'b', 4))
    o.append(packet('M890 74 C860 48 790 48 760 74', T, t + .25, t + .75, 'b', 4))

# 5 elastic scale-to-zero: region B empties at idle, then scales back when requests arrive
o.append(hidden('<g>%s</g>' % ''.join(region_b), [(SC[4][0] + .2, SC[4][1] - .6)]))
o.append(shown(label(1025, 190, 'SCALED TO ZERO', '', 'middle'), T, [(SC[4][0] + .5, SC[4][1] - .8)]))
for k in range(3):
    t = SC[4][1] - 1.2 + k * .15
    o.append(packet(line(1240, 150 + k * 20, 1180, 150 + k * 20), T, t, t + .45, 'w', 3.4))

# 6 durable execution: a workflow in node A1 survives a restart mid-step
a1 = nx(0, 0)
steps = [(a1 + 18 + k * 25, 252) for k in range(4)]
o.append(shown(wire(line(steps[0][0], 252, steps[3][0], 252)), T, [(SC[5][0], END)]))
for k, (x, y) in enumerate(steps):
    o.append(shown('<circle class="gu-step" cx="%d" cy="%d" r="6"/>' % (x, y), T, [(SC[5][0], END)]))
seg = lambda a, b: line(steps[a][0], 252, steps[b][0], 252)
o.append(packet(seg(0, 1), T, SC[5][0] + .2, SC[5][0] + .7, '', 4.4))
o.append(shown('<circle class="sd-pk" cx="%d" cy="252" r="4.4"/>' % steps[1][0], T, [(SC[5][0] + .7, SC[5][0] + 1.9)], fade=.05))
o.append(tint(a1, 96, 112, 196, T, [(SC[5][0] + .9, SC[5][0] + 1.5)], 'r'))
o.append(shown(label(a1 + 56, 282, 'RESTART', 'r', 'middle'), T, [(SC[5][0] + .9, SC[5][0] + 1.5)]))
o.append(shown(label(a1 + 56, 282, 'RESUMED', 'g', 'middle'), T, [(SC[5][0] + 1.6, END)]))
o.append(packet(seg(1, 3), T, SC[5][0] + 1.9, SC[5][0] + 2.3, 'g', 4.4))
o.append(shown('<circle class="gu-done" cx="%d" cy="252" r="6"/>' % steps[3][0], T, [(SC[5][0] + 2.3, END)]))

# the guarantees, lit in turn
cw, gap = 194, 15
x0 = (W - (6 * cw + 5 * gap)) / 2
for k, (g, (a, b)) in enumerate(zip(GUAR, SC)):
    x = x0 + k * (cw + gap)
    o.append('<g class="gu-chip"><rect x="%s" y="352" width="%d" height="40" rx="20"/><text x="%s" y="377" text-anchor="middle">%s</text></g>' % (f(x), cw, f(x + cw / 2), html.escape(g)))
    o.append(shown('<g class="gu-chip on"><rect x="%s" y="352" width="%d" height="40" rx="20"/><text x="%s" y="377" text-anchor="middle">%s</text></g>' % (f(x), cw, f(x + cw / 2), html.escape(g)), T, [(a, b)]))
o.append(label(620, 412, 'WHAT THE RUNTIME GUARANTEES', '', 'middle'))

svg = '<svg class="sd gu" viewBox="-8 0 %d %d" role="img" aria-label="The service you write on a laptop compiles and runs unchanged in production, where the runtime provides clustering, durable state, failover, active-active HA/DR, scale-to-zero and durable execution">%s</svg>' % (W + 16, H + 6, ''.join(o))
open(sys.argv[1], 'w', encoding='utf-8').write(svg)
print('bytes', len(svg))
