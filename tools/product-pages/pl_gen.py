"""Generate the three animated graphics for the SDK "since 2009" cards: actors, sharded state, streaming."""
import json, re, sys

from sd_lib import f, opacity, packet, shown, tint, wire, label, hcurve, line

W, H = 380, 200
G = {}
COLS = [8, 132, 256]          # node columns
NW = 116


def hidden(inner, T, windows, fade=.2):
    """Visible except inside the windows, so it stays on across the loop restart."""
    track = opacity(T, windows, fade)
    vals = re.search(r'values="([^"]+)"', track).group(1)
    inv = ';'.join(f(1 - float(v)) for v in vals.split(';'))
    return '<g>%s%s</g>' % (track.replace('values="%s"' % vals, 'values="%s"' % inv), inner)


def nodes(y0, y1, names=('NODE 1', 'NODE 2', 'NODE 3')):
    out = []
    for x, n in zip(COLS, names):
        out.append('<rect class="sd-sub" x="%d" y="%d" width="%d" height="%d" rx="9"/>' % (x, y0, NW, y1 - y0))
        out.append(label(x + 12, y0 + 18, n))
    return out


# Actors: messages cross the cluster; a node goes down, its actors move, then it rejoins.
T = 9.0
o = nodes(22, 178)
slot = lambda n, s: (COLS[n] + (30, 86, 58)[s], (88, 88, 142)[s])
actor = lambda xy: '<circle class="pl-a" cx="%d" cy="%d" r="11"/>' % xy
DOWN, UP = 3.4, 6.4
for n in range(3):
    for s in (0, 2):
        if n == 1:
            o.append(hidden(actor(slot(n, s)), T, [(DOWN, UP + 1.0)], fade=.25))
        else:
            o.append(actor(slot(n, s)))
moved = {(1, 0): (0, 1), (1, 2): (2, 1)}        # node 2's actors and the slot each moves to
for (n, s), (m, t) in moved.items():
    a, b = slot(n, s), slot(m, t)
    o.append(shown(actor(b), T, [(DOWN + .9, UP + 1.0)], fade=.2))
    o.append(packet(line(a[0], a[1], b[0], b[1]), T, DOWN + .2, DOWN + .9, 'y', 5))
    o.append(packet(line(b[0], b[1], a[0], a[1]), T, UP + .3, UP + 1.0, 'y', 5))
o.append(tint(COLS[1], 22, NW, 156, T, [(DOWN, UP)], 'r'))
o.append(shown(label(COLS[1] + 58, 194, 'NODE DOWN', 'r', 'middle'), T, [(DOWN, UP)]))
o.append(shown(label(COLS[1] + 58, 194, 'NODE REJOINS', 'g', 'middle'), T, [(UP, T - .3)]))
msgs = [(slot(0, 0), slot(1, 0)), (slot(1, 2), slot(2, 2)), (slot(2, 0), slot(0, 2))]
for k, (a, b) in enumerate(msgs):
    for t in (.3 + k * .9, UP + 1.2 + k * .4):
        if t + .6 < T:
            o.append(packet(hcurve(a[0], a[1], b[0], b[1]), T, t, t + .6, '', 3.4))
o.append(packet(hcurve(*slot(0, 1), *slot(2, 1)), T, DOWN + 1.2, DOWN + 1.8, '', 3.4))
o.append(packet(hcurve(*slot(2, 1), *slot(0, 2)), T, DOWN + 2.1, DOWN + 2.7, '', 3.4))
G['actors'] = o

# Sharded state: writes land in the journal; a lost node's shards replay onto the others.
T = 9.0
o = nodes(22, 128)
shard = lambda n, r, name: '<g class="pl-sh"><rect x="%d" y="%d" width="44" height="26" rx="5"/><text x="%d" y="%d" text-anchor="middle">%s</text></g>' % (
    COLS[n] + (12, 60)[r % 2], (48, 90)[r // 2], COLS[n] + (12, 60)[r % 2] + 22, (48, 90)[r // 2] + 17, name)
o.append('<rect class="sd-box" x="8" y="146" width="364" height="44" rx="9"/>')
o.append(label(20, 172, 'EVENT JOURNAL', 'b'))
DOWN, UP = 4.0, 6.8
names = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6']
for n in range(3):
    for r in (0, 1):
        nm = names[n * 2 + r]
        o.append(shard(n, r, nm) if n < 2 else hidden(shard(n, r, nm), T, [(DOWN, UP + .9)]))
o.append(tint(COLS[2], 22, NW, 106, T, [(DOWN, UP)], 'r'))
o.append(shown(label(COLS[2] + 58, 122, 'NODE DOWN', 'r', 'middle'), T, [(DOWN, UP)]))
for k, n in enumerate((0, 1)):            # S5 and S6 replay onto nodes 1 and 2
    c = (COLS[n] + 12 + 22, 90 + 13)
    o.append(packet(line(130 + k * 60, 160, c[0], c[1]), T, DOWN + .7 + k * .3, DOWN + 1.3 + k * .3, 'b', 4))
    o.append(shown(shard(n, 2, names[4 + k]), T, [(DOWN + 1.3 + k * .3, UP + .9)], fade=.2))
    o.append(packet(line(c[0], c[1], COLS[2] + (12, 60)[k] + 22, 61), T, UP + .2, UP + .9, 'b', 4))
o.append(shown(label(190, 140, 'REPLAYED FROM THE JOURNAL', 'b', 'middle'), T, [(DOWN + .6, UP)]))
for i in range(12):
    t = .4 + i * .65
    src = (COLS[i % 2] + 34, 74)
    x = 132 + i * 19
    if not (DOWN <= t <= UP and i % 3 == 2):
        o.append(packet(line(src[0], src[1], x + 3, 160), T, t - .45, t, '', 3))
    o.append(shown('<rect class="pl-tk" x="%d" y="161" width="6" height="16" rx="1.5"/>' % x, T, [(t, T - .3)], fade=.1))
G['shards'] = o

# Streaming: the sink slows, demand flows back upstream, the buffer fills without overflowing.
T = 9.0
st = [('Source', 8), ('Stage', 145), ('Sink', 282)]
o = []
for n, x in st:
    o.append('<g class="sd-n k-con"><rect x="%d" y="64" width="90" height="52" rx="9"/><text class="sd-t" x="%d" y="95" text-anchor="middle">%s</text></g>' % (x, x + 45, n))
fw = [line(98, 90, 145, 90), line(235, 90, 282, 90)]
dm = [line(282, 46, 235, 46), line(145, 46, 98, 46)]
for d in fw:
    o.append(wire(d))
for d in dm:
    o.append(wire(d, 'dash'))
o.append(label(190, 36, 'DEMAND', 'b', 'middle'))
SLOW0, SLOW1 = 3.0, 6.4
for i in range(4):
    o.append('<rect class="pl-slot" x="%d" y="128" width="16" height="12" rx="2"/>' % (157 + i * 18))
o.append(label(190, 158, 'BUFFER', '', 'middle'))
for i, t in enumerate((3.5, 4.4, 5.3)):
    o.append(shown('<rect class="pl-fill" x="%d" y="128" width="16" height="12" rx="2"/>' % (157 + i * 18), T, [(t, 6.8 + i * .3)], fade=.15))
t = .1
while t < T - .7:
    slow = SLOW0 <= t < SLOW1
    o.append(packet(fw[0], T, t, t + (.7 if slow else .45), '', 3.6))
    t += 1.0 if slow else .38
t = .3
while t < T - .9:
    slow = SLOW0 <= t < SLOW1
    o.append(packet(fw[1], T, t, t + (.9 if slow else .45), '', 3.6))
    t += 1.2 if slow else .38
for k in range(3):
    t = SLOW0 + .4 + k * 1.0
    o.append(packet(dm[0], T, t, t + .45, 'b', 3.2))
    o.append(packet(dm[1], T, t + .5, t + .95, 'b', 3.2))
o.append(shown(label(327, 136, 'SLOWS DOWN', 'y', 'middle'), T, [(SLOW0, SLOW1)]))
o.append(shown(label(190, 186, 'BACKPRESSURE', 'b', 'middle'), T, [(SLOW0 + .3, SLOW1 + .3)]))
o.append(shown(label(190, 186, 'NO EXTERNAL BROKER', '', 'middle'), T, [(0, SLOW0), (SLOW1 + .6, T)]))
G['stream'] = o

out = {k: '<svg class="sd pl" viewBox="0 0 %d %d" aria-hidden="true">%s</svg>' % (W, H, ''.join(v)) for k, v in G.items()}
json.dump(out, open(sys.argv[1], 'w', encoding='utf-8'))
print('graphics', len(out))
