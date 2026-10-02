"""Write home-preview.html: the live akka.io home page with the tour band added and the bands reordered.

Usage: python home-preview.py   (then serve this folder and open /home-preview.html)

Root-relative URLs in the fetched page are pointed back at akka.io so its assets load from a
local server. The band block comes from home-band.html between its band:start/band:end markers.
"""
import pathlib
import re
import urllib.request

HERE = pathlib.Path(__file__).parent

# Bands of the home page's first section, in preview order, keyed by HubSpot module id.
# The four tiles and the buttons sit in later sections and keep their place after these.
ORDER = [
    "widget_1775678949913",   # hero
    "TOUR",                   # tour band, from home-band.html
    "widget_1775684903151",   # Manulife
    "widget_1775685280475",   # Deloitte
    "widget_1775685349763",   # Dojo
    "widget_home_cost_band",  # AI Spend calculator
    "widget_1775685236442",   # Swiggy
    "widget_1775685320626",   # John Deere
    "widget_1775685145617",   # Tubi
]

req = urllib.request.Request("https://akka.io/", headers={"User-Agent": "Mozilla/5.0"})
home = urllib.request.urlopen(req).read().decode("utf-8")
home = re.sub(r'((?:src|href|action)=")/(?!/)', r"\1https://akka.io/", home)
home = re.sub(r"url\((['\"]?)/(?!/)", r"url(\1https://akka.io/", home)

band = (HERE / "home-band.html").read_text(encoding="utf-8")
tour = ('<div class="row-fluid-wrapper dnd-row"><div class="row-fluid">'
        '<div class="span12 widget-span dnd-module">\n'
        + band[band.index("<!-- band:start"):band.index("<!-- band:end -->")]
        + '</div></div></div>\n')

rows = []
for m in re.finditer(r'<div class="row-fluid-wrapper row-depth-1 row-number-\d+ dnd-row">', home):
    end = home.index("<!--end row-wrapper -->", m.start()) + len("<!--end row-wrapper -->")
    module = re.search(r'id="hs_cos_wrapper_(widget_[^"]+)"', home[m.start():end]).group(1)
    # The published band is replaced by the local one, so it takes the TOUR slot.
    if module == "widget_home_tour_band":
        module = "TOUR"
    if module in ORDER:
        rows.append((m.start(), end, module))

found = {r[2] for r in rows}
missing = [k for k in ORDER if k != "TOUR" and k not in found]
if missing:
    raise SystemExit("home page no longer has modules: " + ", ".join(missing))
for (_, end, _), (start, _, _) in zip(rows, rows[1:]):
    if home[end:start].strip():
        raise SystemExit("the reordered bands are no longer adjacent on the home page")

blocks = {module: home[start:end] for start, end, module in rows}
blocks["TOUR"] = tour
reordered = "\n\n".join(blocks[k] for k in ORDER)
out = home[:rows[0][0]] + reordered + home[rows[-1][1]:]
(HERE / "home-preview.html").write_text(out, encoding="utf-8")
print("wrote", HERE / "home-preview.html")
