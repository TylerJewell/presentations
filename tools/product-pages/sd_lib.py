"""Drawing helpers shared by the SDK diagram generators: SVG primitives animated with SMIL."""
import html

W, H = 560, 340


def f(x):
    return ('%.4f' % x).rstrip('0').rstrip('.') or '0'


def opacity(T, windows, fade=.2, base=0):
    """An opacity track that is 1 inside each (t0, t1) window, with short fades."""
    pts = [(0.0, base)]
    for a, b in windows:
        a, b = max(a, 0.0), min(b, T)
        pts += [(a, base), (min(a + fade, b), 1), (b, 1), (min(b + fade, T), base)]
    pts.append((T, base))
    out, last = [], -1.0
    for t, v in sorted(pts, key=lambda p: p[0]):
        t = max(t, last + 1e-4) if out else t
        last = t
        out.append((min(t, T), v))
    out[-1] = (T, out[-1][1])
    kt = ';'.join(f(t / T) for t, _ in out)
    vals = ';'.join(f(v) for _, v in out)
    return '<animate attributeName="opacity" dur="%ss" repeatCount="indefinite" keyTimes="%s" values="%s"/>' % (f(T), kt, vals)


def packet(d, T, t0, t1, cls='', r=4.2):
    return ('<circle class="sd-pk%s" r="%s" opacity="0"><animateMotion dur="%ss" repeatCount="indefinite" path="%s" '
            'keyPoints="0;0;1;1" keyTimes="0;%s;%s;1" calcMode="linear"/>%s</circle>'
            % ((' ' + cls) if cls else '', f(r), f(T), d, f(t0 / T), f(t1 / T), opacity(T, [(t0, t1)], fade=.06)))


def shown(inner, T, windows, fade=.2):
    """Wrap SVG content so it is visible only inside the windows."""
    return '<g opacity="0">%s%s</g>' % (opacity(T, windows, fade), inner)


def node(x, y, w, h, kind, sub, name, extra=''):
    if sub:
        return ('<g class="sd-n k-%s"%s><rect x="%s" y="%s" width="%s" height="%s" rx="9"/><text class="sd-k" x="%s" y="%s">%s</text>'
                '<text class="sd-t" x="%s" y="%s">%s</text></g>' % (kind, extra, f(x), f(y), f(w), f(h), f(x + 12), f(y + 19), sub, f(x + 12), f(y + 38), html.escape(name)))
    return ('<g class="sd-n k-%s"%s><rect x="%s" y="%s" width="%s" height="%s" rx="9"/><text class="sd-t" x="%s" y="%s" text-anchor="middle">%s</text></g>'
            % (kind, extra, f(x), f(y), f(w), f(h), f(x + w / 2), f(y + h / 2 + 5), html.escape(name)))


def tint(x, y, w, h, T, windows, cls='y', rx=9):
    return shown('<rect class="sd-tint %s" x="%s" y="%s" width="%s" height="%s" rx="%s"/>' % (cls, f(x), f(y), f(w), f(h), f(rx)), T, windows)


def wire(d, cls=''):
    return '<path class="sd-w%s" d="%s"/>' % ((' ' + cls) if cls else '', d)


def label(x, y, text, cls='', anchor='start'):
    return '<text class="sd-l%s" x="%s" y="%s" text-anchor="%s">%s</text>' % ((' ' + cls) if cls else '', f(x), f(y), anchor, html.escape(text))


def chip(x, y, w, text, cls=''):
    return '<g class="sd-c%s"><rect x="%s" y="%s" width="%s" height="24" rx="6"/><text x="%s" y="%s" text-anchor="middle">%s</text></g>' % (
        (' ' + cls) if cls else '', f(x), f(y), f(w), f(x + w / 2), f(y + 16.5), html.escape(text))


def hcurve(x1, y1, x2, y2):
    dx = (x2 - x1) / 2
    return 'M%s %s C%s %s %s %s %s %s' % (f(x1), f(y1), f(x1 + dx), f(y1), f(x2 - dx), f(y2), f(x2), f(y2))


def rev(d):
    """Reverse a two-point line or curve built by hcurve or 'Mx y Lx y'."""
    n = [float(v) for v in d.replace('M', ' ').replace('C', ' ').replace('L', ' ').split()]
    if len(n) == 4:
        return 'M%s %s L%s %s' % (f(n[2]), f(n[3]), f(n[0]), f(n[1]))
    return 'M%s %s C%s %s %s %s %s %s' % (f(n[6]), f(n[7]), f(n[4]), f(n[5]), f(n[2]), f(n[3]), f(n[0]), f(n[1]))


def line(x1, y1, x2, y2):
    return 'M%s %s L%s %s' % (f(x1), f(y1), f(x2), f(y2))
