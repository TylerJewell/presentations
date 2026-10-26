"""Generate the SDK component diagrams: one animated SVG per component, 560x340, looping with SMIL."""
import html, json, sys

from sd_lib import *

D = {}

# 1 Component client: calls reach targets on any node of the cluster
T = 6.4
o = []
o.append(node(14, 143, 120, 54, 'con', 'ENDPOINT', 'HTTP endpoint'))
o.append(node(168, 143, 150, 54, 'beh', 'TYPE-SAFE HANDLE', 'Component client'))
o.append('<rect class="sd-box" x="352" y="14" width="194" height="312" rx="12"/>')
o.append(label(366, 36, 'CLUSTER'))
nodes = [('NODE 1', ['Workflow', 'View']), ('NODE 2', ['Entity', 'Agent']), ('NODE 3', ['Entity', 'Timer'])]
ny = [48, 140, 232]
for (nm, chips), y in zip(nodes, ny):
    o.append('<rect class="sd-sub" x="364" y="%d" width="170" height="80" rx="9"/>' % y)
    o.append(label(376, y + 20, nm))
    o.append(chip(376, y + 38, 70, chips[0]))
    o.append(chip(452, y + 38, 70, chips[1]))
o.append(wire(line(134, 170, 168, 170)))
targets = {}
for y in ny:
    d = hcurve(318, 170, 364, y + 40)
    o.append(wire(d))
    targets[y] = d
call = line(134, 170, 168, 170)
o.append(packet(call, T, .2, .7))
o.append(packet(targets[140], T, .8, 1.5))
o.append(tint(376, 178, 70, 24, T, [(1.5, 2.3)], 'y', 6))
o.append(packet(rev(targets[140]), T, 2.0, 2.6, 'g'))
o.append(packet(rev(call), T, 2.7, 3.1, 'g'))
o.append(packet(call, T, 3.4, 3.9))
o.append(packet(targets[48], T, 4.0, 4.7))
o.append(tint(376, 86, 70, 24, T, [(4.7, 5.5)], 'y', 6))
o.append(packet(rev(targets[48]), T, 5.2, 5.8, 'g'))
o.append(packet(rev(call), T, 5.8, 6.2, 'g'))
o.append(label(449, 318, 'LOCATION TRANSPARENT', 'y', 'middle'))
D['client'] = o

# 2 Agents: the model asks for a tool, and every turn lands in session memory
T = 7.2
o = []
o.append(node(14, 96, 110, 54, 'out', '', 'Request'))
o.append(node(176, 96, 150, 54, 'beh', 'AGENT', 'Agent'))
o.append(node(400, 96, 146, 54, 'out', '', 'AI model'))
o.append(node(400, 14, 146, 54, 'con', 'FUNCTION TOOL', 'Tool'))
o.append('<rect class="sd-box" x="176" y="184" width="226" height="138" rx="11"/>')
o.append(label(190, 206, 'SESSION MEMORY', 'y'))
o.append(node(14, 250, 110, 54, 'beh', 'AGENT', 'Other agent'))
req = line(124, 123, 176, 123)
mod = line(326, 123, 400, 123)
tool = hcurve(326, 108, 400, 41)
mem = line(124, 277, 176, 277)
for d in (req, mod, tool):
    o.append(wire(d))
o.append(wire(mem, 'dash'))
o.append(label(150, 268, 'SHARED', '', 'middle'))
mem_lines = ['Request', 'Model asks for a tool', 'Tool result', 'Answer']
times = [.8, 2.5, 3.9, 5.5]
for i, (t, tx) in enumerate(zip(times, mem_lines)):
    y = 232 + i * 22
    o.append(shown('<rect class="sd-mline" x="190" y="%d" width="6" height="6" rx="1.5"/><text class="sd-m" x="204" y="%d">%s</text>' % (y - 7, y, tx), T, [(t, T - .4)]))
o.append(packet(req, T, .2, .7))
o.append(packet(mod, T, 1.0, 1.5))
o.append(packet(rev(mod), T, 2.0, 2.45))
o.append(packet(tool, T, 2.6, 3.1))
o.append(tint(400, 14, 146, 54, T, [(3.1, 3.5)], 'w'))
o.append(packet(rev(tool), T, 3.4, 3.85, 'g'))
o.append(packet(mod, T, 4.1, 4.6))
o.append(packet(rev(mod), T, 5.0, 5.45))
o.append(packet(rev(req), T, 5.7, 6.2, 'g'))
D['agent'] = o

# 3 Autonomous agents: a decision loop that survives a restart, then delegates
T = 10.4
o = []
o.append('<g class="sd-n k-con"><rect x="14" y="20" width="140" height="92" rx="9"/><text class="sd-k" x="26" y="39">TYPED TASK</text>'
         '<text class="sd-t" x="26" y="58">Task</text><text class="sd-m" x="26" y="80">Instructions</text><text class="sd-m" x="26" y="98">Result schema</text></g>')
o.append(node(200, 20, 130, 54, 'beh', 'DECISION LOOP', 'Model'))
o.append(node(200, 150, 130, 54, 'con', '', 'Tool'))
o.append(node(410, 14, 136, 50, 'beh', '', 'Specialist'))
o.append(node(410, 82, 136, 50, 'beh', '', 'Peer'))
o.append(node(410, 150, 136, 54, 'con', '', 'Result'))
o.append('<rect class="sd-box" x="14" y="240" width="532" height="84" rx="11"/>')
o.append(label(28, 262, 'AGENT AND TASK STATE', 'y'))
task = hcurve(154, 66, 200, 47)
down = 'M232 74 C200 100 200 130 232 150'
up = 'M298 150 C330 130 330 100 298 74'
dele = hcurve(330, 40, 410, 39)
hand = hcurve(330, 52, 410, 107)
res = hcurve(330, 60, 410, 177)
for d in (task, down, up, dele, hand, res):
    o.append(wire(d))
o.append(label(265, 118, 'UNTIL DONE', '', 'middle'))
o.append(label(370, 32, 'DELEGATE', '', 'middle'))
o.append(label(370, 96, 'HAND OFF', '', 'middle'))
o.append(packet(task, T, .2, .7))
loops = [(1.0, 2.4), (2.6, 4.0), (6.2, 7.6)]
for k, (a, b) in enumerate(loops):
    m = (a + b) / 2
    o.append(packet(down, T, a, m - .1))
    o.append(packet(up, T, m + .1, b))
    x = 32 + k * 34
    o.append(shown('<rect class="sd-ck" x="%d" y="276" width="26" height="30" rx="4"/>' % x, T, [(b, T - .3)]))
o.append(tint(190, 12, 150, 200, T, [(4.5, 5.6)], 'r', 12))
o.append(shown('<text class="sd-l r" x="265" y="232" text-anchor="middle">RESTART</text>', T, [(4.5, 5.6)]))
o.append(shown('<text class="sd-l g" x="265" y="232" text-anchor="middle">RESUMED FROM STATE</text>', T, [(5.8, 7.0)]))
o.append(shown('<text class="sd-m" x="150" y="296">Work survives crashes and restarts</text>', T, [(5.8, T - .3)]))
o.append(packet(dele, T, 7.8, 8.3))
o.append(packet(rev(dele), T, 8.5, 9.0, 'g'))
o.append(packet(res, T, 9.2, 9.8, 'g'))
o.append(tint(410, 150, 136, 54, T, [(9.8, 10.3)], 'g'))
D['auto'] = o

# 4 Workflows: a run that completes, then a run that rolls back when a step fails
T = 12.0
o = []
steps = {'start': (10, 162, 66), 'validate': (88, 162, 72), 'reserve': (172, 162, 72), 'charge': (270, 92, 76), 'notify': (270, 162, 76),
         'ship': (270, 232, 76), 'aggregate': (370, 162, 88), 'complete': (472, 162, 78)}
SH = 36
for k, (x, y, w) in steps.items():
    o.append(node(x, y - SH / 2, w, SH, 'beh' if k != 'complete' else 'con', '', k.capitalize()))
o.append('<rect class="sd-par" x="260" y="60" width="96" height="208" rx="10"/>')
o.append(label(308, 52, 'PARALLEL', '', 'middle'))
o.append(label(127, 130, 'SERIAL', '', 'middle'))
e = {}
e['sv'] = line(76, 162, 88, 162)
e['vr'] = line(160, 162, 172, 162)
for k in ('charge', 'notify', 'ship'):
    e['r' + k] = hcurve(244, 162, 270, steps[k][1])
    e[k + 'a'] = hcurve(346, steps[k][1], 370, 162)
e['ac'] = line(458, 162, 472, 162)
for d in e.values():
    o.append(wire(d))
seq = [('sv', .3, .6), ('vr', .9, 1.2), ('rcharge', 1.6, 2.1), ('rnotify', 1.6, 2.1), ('rship', 1.6, 2.1),
       ('chargea', 2.6, 3.1), ('notifya', 2.6, 3.1), ('shipa', 2.6, 3.1), ('ac', 3.5, 3.8)]
for k, a, b in seq:
    o.append(packet(e[k], T, a, b))
o.append(tint(472, 144, 78, 36, T, [(3.8, 5.6)], 'g'))
o.append(shown('<text class="sd-l g" x="280" y="310" text-anchor="middle">COMPLETE</text>', T, [(3.8, 5.6)]))
seq2 = [('sv', 6.3, 6.6), ('vr', 6.9, 7.2), ('rcharge', 7.6, 8.1), ('rnotify', 7.6, 8.1), ('rship', 7.6, 8.1)]
for k, a, b in seq2:
    o.append(packet(e[k], T, a, b))
o.append(tint(270, 74, 76, 36, T, [(8.1, 10.8)], 'r'))
o.append(packet(rev(e['rcharge']), T, 8.6, 9.2, 'r'))
o.append(packet(rev(e['rnotify']), T, 8.6, 9.2, 'r'))
o.append(packet(rev(e['rship']), T, 8.6, 9.2, 'r'))
o.append(tint(172, 144, 72, 36, T, [(9.2, 10.8)], 'r'))
o.append(packet(rev(e['vr']), T, 9.6, 9.9, 'r'))
o.append(tint(88, 144, 72, 36, T, [(9.9, 10.8)], 'r'))
o.append(shown('<text class="sd-l r" x="280" y="310" text-anchor="middle">A STEP FAILED · ROLLED BACK</text>', T, [(8.4, 11.2)]))
D['workflow'] = o

# 5 Event sourced entities: every event is journaled, and state is rebuilt by replay
T = 10.0
o = []
o.append(node(14, 20, 120, 54, 'out', '', 'Commands'))
o.append(node(196, 20, 168, 54, 'st', 'EVENT SOURCED', 'Entity'))
o.append('<rect class="sd-box" x="14" y="118" width="532" height="64" rx="11"/>')
o.append(label(28, 140, 'JOURNAL', 'b'))
o.append(node(196, 232, 168, 90, 'st', 'STATE', ''))
cmd = line(134, 47, 196, 47)
o.append(wire(cmd))
o.append(wire(line(280, 74, 280, 118)))
o.append(wire(line(280, 182, 280, 232), 'dash'))
for i in range(4):
    t = 1.0 + i * .9
    o.append(packet(cmd, T, t - .7, t - .25))
    o.append(packet(line(280, 74, 280, 118), T, t - .2, t))
    x = 110 + i * 64
    o.append(shown('<g class="sd-ev"><rect x="%d" y="150" width="54" height="22" rx="5"/><text x="%d" y="165" text-anchor="middle">e%d</text></g>' % (x, x + 27, i + 1), T, [(t, T - .3)]))
    o.append(shown('<rect class="sd-bar" x="212" y="%d" width="%d" height="8" rx="2"/>' % (270 + i * 12, 60 + i * 26), T, [(t + .1, 5.0), (6.0 + i * .7 + .45, T - .3)]))
o.append(shown('<text class="sd-l r" x="380" y="262">RESTART</text>', T, [(5.0, 5.8)]))
o.append(shown('<text class="sd-l y" x="380" y="262">REPLAY</text>', T, [(5.9, 8.8)]))
for i in range(4):
    x = 110 + i * 64 + 27
    o.append(packet(hcurve(x, 172, 280, 232), T, 6.0 + i * .7, 6.0 + i * .7 + .45))
o.append(shown('<text class="sd-m" x="380" y="284">State rebuilt from</text><text class="sd-m" x="380" y="302">its own events</text>', T, [(8.9, T - .3)]))
o.append(label(532, 140, 'COMPLETE HISTORY', '', 'end'))
D['es'] = o

# 6 Key value entities: one instance in the cluster, one command at a time
T = 7.0
o = []
for i, y in enumerate((50, 140, 230)):
    o.append(node(14, y, 100, 44, 'out', '', 'Request'))
o.append('<rect class="sd-box" x="148" y="132" width="160" height="60" rx="10"/>')
o.append(label(228, 124, 'ONE COMMAND AT A TIME', '', 'middle'))
o.append('<rect class="sd-box" x="338" y="14" width="208" height="312" rx="12"/>')
o.append(label(352, 36, 'CLUSTER'))
for k, y in enumerate((48, 140, 232)):
    o.append('<rect class="sd-sub" x="350" y="%d" width="184" height="80" rx="9"/>' % y)
    o.append(label(362, y + 20, 'NODE %d' % (k + 1)))
o.append(node(362, 166, 160, 48, 'st', 'SINGLE CURRENT VALUE', 'Key value entity'))
o.append(label(442, 318, 'EXACTLY ONE INSTANCE', 'b', 'middle'))
ins = [hcurve(114, y + 22, 160, 162) for y in (50, 140, 230)]
for d in ins:
    o.append(wire(d))
q = line(308, 162, 362, 190)
o.append(wire(q))
slots = [270, 240, 210]
for i, d in enumerate(ins):
    o.append(packet(d, T, .2 + i * .15, .8 + i * .15))
for i in range(3):
    # each request waits in the queue, then is handled in turn
    o.append(shown('<circle class="sd-pk" cx="%d" cy="162" r="5"/>' % slots[i], T, [(.95 + i * .15, 1.3 + i * 1.3)], fade=.1))
    o.append(packet(q, T, 1.3 + i * 1.3, 1.75 + i * 1.3))
    o.append(tint(362, 166, 160, 48, T, [(1.75 + i * 1.3, 2.3 + i * 1.3)], 'b'))
D['kv'] = o

# 7 Views: entity changes stream into a view, and a query reads across them
T = 7.6
o = []
for i, y in enumerate((30, 136, 242)):
    o.append(node(14, y, 130, 54, 'st', 'ENTITY', 'Entity %s' % 'ABC'[i]))
o.append('<g class="sd-n k-st"><rect x="214" y="56" width="200" height="226" rx="10"/><text class="sd-k" x="228" y="78">VIEW</text></g>')
rows = []
for i in range(4):
    y = 96 + i * 44
    o.append('<rect class="sd-row" x="228" y="%d" width="172" height="32" rx="6"/><rect class="sd-ln" x="240" y="%d" width="%d" height="5" rx="2"/><rect class="sd-ln d" x="330" y="%d" width="%d" height="5" rx="2"/>' % (y, y + 14, (56, 72, 48, 64)[i], y + 14, (44, 30, 52, 38)[i]))
    rows.append(y)
o.append(node(452, 142, 94, 54, 'con', '', 'Query'))
ent = [hcurve(144, y + 27, 214, rows[i] + 16) for i, y in enumerate((30, 136, 242))]
for d in ent:
    o.append(wire(d))
qd = line(452, 169, 414, 169)
o.append(wire(qd))
for i, d in enumerate(ent):
    t = .3 + i * .9
    o.append(packet(d, T, t, t + .6))
    o.append(tint(228, rows[i], 172, 32, T, [(t + .6, t + 1.2)], 'b', 6))
o.append(packet(qd, T, 3.4, 3.8))
o.append(tint(228, rows[1], 172, 32, T, [(3.9, 5.6)], 'y', 6))
o.append(tint(228, rows[2], 172, 32, T, [(3.9, 5.6)], 'y', 6))
o.append(packet(rev(qd), T, 4.5, 4.9, 'g'))
o.append(label(314, 310, 'ACROSS MANY ENTITIES', 'b', 'middle'))
D['view'] = o

# 8 HTTP endpoints: JSON in, a component call, JSON out
T = 6.4
o = []
o.append(node(14, 143, 110, 54, 'out', '', 'Client'))
o.append(node(190, 143, 150, 54, 'con', 'HTTP ENDPOINT', 'Your service'))
tg = [('Workflow', 'beh', 50), ('Entity', 'st', 143), ('View', 'st', 236)]
for n, k, y in tg:
    o.append(node(410, y, 136, 54, k, '', n))
c = line(124, 170, 190, 170)
o.append(wire(c))
tw = {}
for n, k, y in tg:
    tw[n] = hcurve(340, 170, 410, y + 27)
    o.append(wire(tw[n]))
o.append(packet(c, T, .2, .8))
o.append(shown('<text class="sd-l y" x="157" y="160" text-anchor="middle">JSON</text>', T, [(.2, .9)]))
o.append(packet(tw['Entity'], T, 1.0, 1.5))
o.append(packet(rev(tw['Entity']), T, 1.8, 2.3, 'g'))
o.append(packet(rev(c), T, 2.5, 3.1, 'g'))
o.append(shown('<text class="sd-l g" x="157" y="160" text-anchor="middle">JSON</text>', T, [(2.5, 3.2)]))
o.append(packet(c, T, 3.4, 4.0))
o.append(shown('<text class="sd-l y" x="157" y="160" text-anchor="middle">JSON</text>', T, [(3.4, 4.1)]))
o.append(packet(tw['View'], T, 4.1, 4.6))
o.append(packet(rev(tw['View']), T, 4.8, 5.3, 'g'))
o.append(packet(rev(c), T, 5.4, 6.0, 'g'))
o.append(shown('<text class="sd-l g" x="157" y="160" text-anchor="middle">JSON</text>', T, [(5.4, 6.1)]))
o.append(label(280, 320, 'ACCEPTS AND RETURNS JSON', '', 'middle'))
D['http'] = o

# 9 gRPC endpoints: a shared protobuf contract, binary on the wire, safe to evolve
T = 7.0
o = []
o.append('<g class="sd-n k-con"><rect x="200" y="14" width="160" height="84" rx="9"/><text class="sd-k" x="214" y="34">PROTOBUF CONTRACT</text>'
         '<rect class="sd-ln" x="214" y="48" width="120" height="5" rx="2"/><rect class="sd-ln" x="214" y="62" width="96" height="5" rx="2"/><rect class="sd-ln" x="214" y="76" width="108" height="5" rx="2"/></g>')
o.append(node(14, 168, 184, 54, 'out', 'CLIENT', 'Existing client'))
o.append(node(362, 168, 184, 54, 'con', 'gRPC ENDPOINT', 'Your service'))
o.append(chip(156, 182, 34, 'v1'))
o.append(shown(chip(504, 182, 34, 'v1'), T, [(0, 3.5)]))
o.append(shown(chip(504, 182, 34, 'v2', 'y'), T, [(3.6, T)]))
o.append(wire(hcurve(240, 98, 106, 168), 'dash'))
o.append(wire(hcurve(320, 98, 454, 168), 'dash'))
fw = line(198, 188, 362, 188)
bw = line(362, 204, 198, 204)
o.append(wire(fw))
o.append(wire(bw))
o.append(label(280, 178, 'PROTOBUF · BINARY', '', 'middle'))
frame = '<rect class="sd-frame" x="-7" y="-4" width="14" height="8" rx="2"/>'
def fpacket(d, t0, t1, cls=''):
    return ('<g class="sd-fr%s" opacity="0"><animateMotion dur="%ss" repeatCount="indefinite" path="%s" keyPoints="0;0;1;1" keyTimes="0;%s;%s;1" calcMode="linear"/>%s%s</g>'
            % ((' ' + cls) if cls else '', f(T), d, f(t0 / T), f(t1 / T), opacity(T, [(t0, t1)], .06), frame))
for t in (.3, .6, .9):
    o.append(fpacket(fw, t, t + .9))
for t in (1.9, 2.2):
    o.append(fpacket(bw, t, t + .9, 'g'))
o.append(shown('<text class="sd-l y" x="454" y="250" text-anchor="middle">SERVICE UPGRADED</text>', T, [(3.6, 4.6)]))
for t in (4.4, 4.7, 5.0):
    o.append(fpacket(fw, t, t + .9))
o.append(fpacket(bw, 5.6, 6.5, 'g'))
o.append(label(280, 300, 'SAFE TO EVOLVE WITHOUT BREAKING EXISTING CLIENTS', 'g', 'middle'))
D['grpc'] = o

# 10 MCP endpoints: clients discover the tools a service exposes, then call them
T = 7.4
o = []
o.append(node(14, 60, 156, 54, 'out', 'MCP CLIENT', 'LLM desktop app'))
o.append(node(14, 214, 156, 54, 'out', 'MCP CLIENT', 'Agent elsewhere'))
o.append('<g class="sd-n k-con"><rect x="356" y="30" width="190" height="276" rx="11"/><text class="sd-k" x="370" y="52">MCP ENDPOINT</text><text class="sd-t" x="370" y="72">Your service</text></g>')
o.append(label(370, 104, 'EXPOSES TOOLS', 'y'))
tools = ['Account lookup', 'Start redemption', 'Search history']
ty = [118, 168, 218]
for t, y in zip(tools, ty):
    o.append('<rect class="sd-tool" x="370" y="%d" width="162" height="38" rx="7"/><text class="sd-m w" x="384" y="%d">%s</text>' % (y, y + 24, t))
a = hcurve(170, 87, 356, 160)
b = hcurve(170, 241, 356, 220)
o.append(wire(a))
o.append(wire(b))
o.append(packet(a, T, .3, .9))
for i, y in enumerate(ty):
    o.append(tint(370, y, 162, 38, T, [(1.0 + i * .15, 1.9)], 'y', 7))
o.append(packet(rev(a), T, 1.4, 2.0, 'w'))
o.append(shown('<text class="sd-l" x="250" y="96" text-anchor="middle">DISCOVER</text>', T, [(.3, 2.0)]))
o.append(packet(a, T, 2.6, 3.2))
o.append(tint(370, ty[1], 162, 38, T, [(3.2, 3.9)], 'y', 7))
o.append(packet(rev(a), T, 3.8, 4.4, 'g'))
o.append(shown('<text class="sd-l" x="250" y="96" text-anchor="middle">CALL A TOOL</text>', T, [(2.6, 4.4)]))
o.append(packet(b, T, 4.8, 5.4))
o.append(tint(370, ty[2], 162, 38, T, [(5.4, 6.1)], 'y', 7))
o.append(packet(rev(b), T, 6.0, 6.6, 'g'))
D['mcp'] = o

# 11 Timed actions: fires later, fails, reschedules, succeeds
T = 9.0
o = []
o.append(node(14, 30, 150, 54, 'con', 'TIMED ACTION', 'Timer'))
o.append(node(396, 30, 150, 54, 'beh', 'CALL', 'Workflow'))
o.append(label(89, 104, 'STORED BY THE RUNTIME'))
o.append('<line class="sd-axis" x1="40" y1="250" x2="520" y2="250"/>')
for x, t in ((60, 't'), (300, 't + 24h')):
    o.append('<line class="sd-tick" x1="%d" y1="242" x2="%d" y2="258"/>' % (x, x))
    o.append(label(x, 280, t.upper(), '', 'middle'))
o.append(shown('<circle class="sd-pk" cx="60" cy="250" r="6"/>', T, [(.3, T - .3)]))
head = line(60, 250, 300, 250)
o.append(packet(head, T, .7, 2.6, 'w', 5))
o.append(shown('<text class="sd-l y" x="300" y="228" text-anchor="middle">FIRES</text>', T, [(2.6, 3.6)]))
call = hcurve(164, 57, 396, 57)
o.append(wire(call))
o.append(packet(call, T, 2.8, 3.4))
o.append(tint(396, 30, 150, 54, T, [(3.4, 4.3)], 'r'))
o.append(shown('<text class="sd-l r" x="471" y="104" text-anchor="middle">CALL FAILED</text>', T, [(3.4, 4.4)]))
o.append(shown('<text class="sd-l y" x="380" y="228" text-anchor="middle">RESCHEDULES</text>', T, [(4.1, 5.2)]))
o.append(packet(line(300, 250, 380, 250), T, 4.2, 5.0, 'w', 5))
o.append(shown('<line class="sd-tick" x1="380" y1="242" x2="380" y2="258"/>', T, [(4.2, T - .3)]))
o.append(packet(call, T, 5.1, 5.7))
o.append(tint(396, 30, 150, 54, T, [(5.7, 8.4)], 'g'))
o.append(shown('<text class="sd-l g" x="471" y="104" text-anchor="middle">SUCCEEDED</text>', T, [(5.7, 8.4)]))
o.append(shown('<text class="sd-l g" x="280" y="160" text-anchor="middle">RUNS AT LEAST ONCE</text>', T, [(5.9, 8.6)]))
D['timer'] = o

# 12 Consumers: event streams in, events out to systems beyond the service
T = 6.0
o = []
src = [('Entity journal', 'st', 30), ('Key value changes', 'st', 143), ('Broker topic', 'out', 256)]
for n, k, y in src:
    o.append(node(14, y, 160, 54, k, '', n))
o.append(node(240, 143, 140, 54, 'con', 'CONSUMER', 'Consumer'))
o.append(node(424, 143, 122, 54, 'out', '', 'Other systems'))
ins = [hcurve(174, y + 27, 240, 170) for _, _, y in src]
for d in ins:
    o.append(wire(d))
out = line(380, 170, 424, 170)
o.append(wire(out))
o.append(label(402, 136, 'EVENTS OUT', 'y', 'middle'))
k = 0
for rnd in range(2):
    for i, d in enumerate(ins):
        t = .2 + rnd * 2.7 + i * .45
        o.append(packet(d, T, t, t + .6))
        o.append(packet(out, T, t + .75, t + 1.1))
D['consumer'] = o

ORDER = ['client', 'agent', 'auto', 'workflow', 'es', 'kv', 'view', 'http', 'grpc', 'mcp', 'timer', 'consumer']
svgs = {}
for i, k in enumerate(ORDER):
    svgs[k] = ('<svg class="sd" viewBox="0 0 %d %d" role="img" aria-hidden="true">' % (W, H)) + ''.join(D[k]) + '</svg>'
json.dump(svgs, open(sys.argv[1], 'w', encoding='utf-8'))
print('diagrams', len(svgs), 'bytes', sum(len(v) for v in svgs.values()))
