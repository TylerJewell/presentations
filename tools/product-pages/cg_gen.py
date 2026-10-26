"""Generate the component-model architecture graph (SVG + captions) for the overview #build section."""
import html, sys

SDK = len(sys.argv) > 3 and sys.argv[3] == 'sdk'

W, H = 1300, 556
NW, NH = 176, 54          # component node size
OW, OH = 150, 50          # outside node size
SVC = (205, 78, 921, 462)  # service boundary x, y, w, h
RT = (225, 494, 881, 28)   # runtime bar

# id: (cx, cy, group, sub-label, name)
N = {
    'mcp':      (320, 160, 'con', 'TOOLS', 'MCP endpoint'),
    'http':     (320, 268, 'con', 'JSON', 'HTTP endpoint'),
    'grpc':     (320, 430, 'con', 'PROTOBUF', 'gRPC endpoint'),
    'agent':    (555, 160, 'beh', 'SESSION MEMORY', 'Agent'),
    'workflow': (555, 276, 'beh', 'MULTI-STEP', 'Workflow'),
    'timer':    (555, 366, 'con', 'AT LEAST ONCE', 'Timed action'),
    'view':     (555, 452, 'st', 'ACROSS ENTITIES', 'View'),
    'auto':     (790, 160, 'beh', 'DURABLE PROCESS', 'Autonomous agent'),
    'es':       (790, 250, 'st', 'EVENT JOURNAL', 'Event sourced entity'),
    'kv':       (790, 350, 'st', 'CURRENT VALUE', 'Key value entity'),
    'consumer': (1020, 300, 'con', 'EVENT STREAM', 'Consumer'),
}
O = {
    'mcpc':    (100, 160, 'MCP clients'),
    'clients': (100, 349, 'Clients'),
    'broker':  (1218, 300, 'Message broker'),
}
MODELS = (470, 12, 405, 40, 'AI models')   # x, y, w, h

L = lambda n: N[n][0] - NW / 2
R = lambda n: N[n][0] + NW / 2
T = lambda n: N[n][1] - NH / 2
B = lambda n: N[n][1] + NH / 2


def s_curve(x1, y1, x2, y2):
    dx = (x2 - x1) / 2
    return 'M%g %g C%g %g %g %g %g %g' % (x1, y1, x1 + dx, y1, x2 - dx, y2, x2, y2)


def spine(y_from, _unused, x_end_left=None, y_end=None, x_end_right=None):
    """Orthogonal route out of an entity's right side, down/up the stream spine at x=896."""
    x, r = 896, 12
    p = 'M%g %g H%g Q%g %g %g %g ' % (R('es'), y_from, x - r, x, y_from, x, y_from + (r if y_end > y_from else -r))
    p += 'V%g Q%g %g ' % (y_end - (r if y_end > y_from else -r), x, y_end)
    if x_end_left is not None:
        p += '%g %g H%g' % (x - r, y_end, x_end_left)
    else:
        p += '%g %g H%g' % (x + r, y_end, x_end_right)
    return p


# id: (path, from, to, component-client call, label, label x, label y, arrow)
Y = lambda n: N[n][1]
OR = O['mcpc'][0] + OW / 2          # right edge of the left outside nodes
OL = O['broker'][0] - OW / 2        # left edge of the broker
MB = MODELS[1] + MODELS[3] + 2      # just under the models pill
E = [
    ('e1', 'M%g %g H%g' % (OR, Y('mcp'), L('mcp') - 2), 'mcpc', 'mcp', 0, None),
    ('e2', s_curve(OR, O['clients'][1], L('http') - 2, Y('http')), 'clients', 'http', 0, None),
    ('e3', s_curve(OR, O['clients'][1], L('grpc') - 2, Y('grpc')), 'clients', 'grpc', 0, None),
    ('e4', 'M%g %g H%g' % (R('mcp'), Y('mcp'), L('agent') - 2), 'mcp', 'agent', 1, ('tools', 437, Y('mcp') - 9)),
    ('e5', s_curve(R('http'), Y('http'), L('workflow') - 2, Y('workflow')), 'http', 'workflow', 1, ('call', 437, Y('http') - 9)),
    ('e6', s_curve(R('grpc'), Y('grpc'), L('view') - 2, Y('view')), 'grpc', 'view', 1, ('read', 437, Y('view') + 14)),
    ('e7', 'M555 %g V%g' % (T('workflow'), B('agent') + 2), 'workflow', 'agent', 1, ('step', 579, (T('workflow') + B('agent')) / 2 + 4)),
    ('e8', 'M555 %g V%g' % (T('timer'), B('workflow') + 2), 'timer', 'workflow', 1, None),
    ('e9', 'M%g %g H%g' % (L('auto'), Y('auto'), R('agent') + 2), 'auto', 'agent', 1, ('delegate', 673, Y('auto') - 9)),
    ('e10', 'M555 %g V%g' % (T('agent'), MB), 'agent', 'models', 0, None),
    ('e11', 'M790 %g V%g' % (T('auto'), MB), 'auto', 'models', 0, None),
    ('e12', s_curve(R('workflow'), Y('workflow'), L('es') - 2, Y('es')), 'workflow', 'es', 1, None),
    ('e13', s_curve(R('workflow'), Y('workflow'), L('kv') - 2, Y('kv')), 'workflow', 'kv', 1, None),
    ('e14', spine(Y('es'), None, R('view') + 2, Y('view')), 'es', 'view', 0, ('events · state changes', 770, Y('view') - 9)),
    ('e15', spine(Y('kv'), None, R('view') + 2, Y('view')), 'kv', 'view', 0, None),
    ('e16', spine(Y('es'), None, None, Y('consumer'), L('consumer') - 2), 'es', 'consumer', 0, None),
    ('e17', spine(Y('kv'), None, None, Y('consumer'), L('consumer') - 2), 'kv', 'consumer', 0, None),
    ('e18', 'M%g %g H%g' % (R('consumer'), Y('consumer') - 7, OL - 2), 'consumer', 'broker', 0, ('topics', (R('consumer') + OL) / 2, Y('consumer') - 22)),
    ('e19', 'M%g %g H%g' % (OL, Y('consumer') + 7, R('consumer') + 2), 'broker', 'consumer', 0, None),
]

CAPS = [
    ('client', 'Component client', 'The component client is how one component calls another. Calls are location transparent, so the target can run on any node in the cluster and the runtime routes to it.'),
    ('http', 'HTTP endpoints', 'An endpoint is how a service is exposed to the outside world. HTTP endpoints accept and return JSON by default.'),
    ('workflow', 'Workflows', 'Workflows run long-running, multi-step business processes while you write only the domain logic. They provide durability and consistency, and can call other components and services.'),
    ('agent', 'Agents', 'An agent interacts with an AI model to perform a specific task. It keeps contextual history in session memory, which can be shared with other agents working toward the same goal.'),
    ('auto', 'Autonomous agents', 'An agent can delegate to specialists, hand off to peers, or lead a team sharing a task list, so multi-agent systems are assembled from focused agents without writing orchestration code.'),
    ('mcp', 'MCP endpoints', 'MCP endpoints expose a service to MCP clients, including LLM desktop applications and agents running on other services. What you expose becomes tools the model can call on its own behalf.'),
    ('es', 'Event sourced entities', 'Instead of storing the current state, these persist every event that led to it, written to a journal with ACID semantics.'),
    ('kv', 'Key value entities', 'These persist state as a single current value, keyed by id. Akka guarantees exactly one instance of each entity across the whole cluster, so commands are handled one at a time with no concurrency to reason about.'),
    ('view', 'Views', 'Views let you read across many entities, or find an entity by something other than its id. Each view is built for a specific access pattern and updates as the underlying entity state changes.'),
    ('consumer', 'Consumers', 'Consumers read a stream of events, from an entity\'s journal, from key value state changes, or from a message broker topic. They also produce events outward, which is how an Akka service interacts with systems beyond it.'),
    ('timer', 'Timed actions', 'Timers schedule a call to run later, which is useful for checking whether something completed after the fact. They are stored by the runtime and guaranteed to run at least once: if the call fails, the timer reschedules itself until it succeeds.'),
    ('grpc', 'gRPC endpoints', 'Binary serialization and protobuf\'s forward and backward compatibility make service-to-service calls fast and safe to evolve without breaking existing clients.'),
]

out = []
a = out.append
a('<div class="cg rv d2" data-src="live" data-ref="sdk · #s2 component tabs: names and sub-labels from the live descriptions; graph drawn new">')
a('  <svg class="cg-svg" viewBox="0 0 %d %d" role="img" aria-label="Akka SDK components and how they connect">' % (W, H))
a('    <defs><marker id="cga" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="cg-mk"/></marker></defs>')
a('    <rect class="cg-svc" x="%g" y="%g" width="%g" height="%g" rx="18"/>' % SVC)
a('    <text class="cg-svcl" x="%g" y="%g">YOUR SERVICE</text>' % (SVC[0] + 22, SVC[1] + 26))
a('    <rect class="cg-rt" x="%g" y="%g" width="%g" height="%g" rx="7"/>' % RT)
a('    <text class="cg-rtl" x="%g" y="%g" text-anchor="middle">AKKA RUNTIME</text>' % (RT[0] + RT[2] / 2, RT[1] + RT[3] / 2 + 4))
x, y, w, h, t = MODELS
a('    <g class="cg-o" data-n="models"><rect x="%g" y="%g" width="%g" height="%g" rx="22"/><text x="%g" y="%g" text-anchor="middle">%s</text></g>' % (x, y, w, h, x + w / 2, y + h / 2 + 5, t))
for k, (cx, cy, t) in O.items():
    a('    <g class="cg-o" data-n="%s"><rect x="%g" y="%g" width="%g" height="%g" rx="10"/><text x="%g" y="%g" text-anchor="middle">%s</text></g>' % (k, cx - OW / 2, cy - OH / 2, OW, OH, cx, cy + 5, t))
a('    <g class="cg-edges">')
for eid, d, f, to, cc, lab in E:
    a('      <g class="cg-e" data-e="%s" data-from="%s" data-to="%s"%s><path class="cg-b" d="%s" marker-end="url(#cga)"/><path class="cg-f" d="%s"/></g>'
      % (eid, f, to, ' data-cc="1"' if cc else '', d, d))
a('    </g>')
for eid, d, f, to, cc, lab in E:
    if lab:
        a('    <text class="cg-el" data-le="%s" x="%g" y="%g" text-anchor="middle">%s</text>' % (eid, lab[1], lab[2], html.escape(lab[0])))
for k, (cx, cy, g, sub, name) in N.items():
    x0, y0 = cx - NW / 2, cy - NH / 2
    n = '<g class="cg-n g-%s" data-n="%s"><rect x="%g" y="%g" width="%d" height="%d" rx="10"/><text class="cg-k" x="%g" y="%g">%s</text><text class="cg-t" x="%g" y="%g">%s</text></g>' % (
        g, k, x0, y0, NW, NH, x0 + 14, y0 + 20, sub, x0 + 14, y0 + 40, name)
    # On the SDK page the graph selects a component in place; elsewhere a node links to the SDK page.
    a('    ' + (n if SDK else '<a href="sdk.html#components">%s</a>' % n))
a('  </svg>')
a('</div>')
caps = ['<div class="cg-caps" aria-live="polite" data-src="live" data-ref="sdk · #s2 component tab descriptions">']
for i, (k, t, p) in enumerate(CAPS):
    caps.append('  <div class="cg-cap%s" data-c="%s"><div class="cg-cn">%s</div><p>%s</p></div>' % (' on' if i == 0 else '', k, t, html.escape(p, quote=False)))
caps.append('</div>')
open(sys.argv[2], 'w', encoding='utf-8', newline='\n').write('\n'.join(caps) + '\n')
sys.stdout.reconfigure(encoding='utf-8')
open(sys.argv[1], 'w', encoding='utf-8', newline='\n').write('\n'.join(out) + '\n')
print('nodes', len(N), 'edges', len(E), 'captions', len(CAPS))
