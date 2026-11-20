"""Write home-preview.html: the live akka.io home page with the local sources of its bands.

Usage: py -3 preview.py   (then open home-preview.html from disk)

The two film bands come from ../home-video/band.html and the content band from bar.html, each
in place of the published module, so a change to a source can be seen in the page before it is
published. Root-relative URLs in the fetched page are pointed back at akka.io so its assets load.
"""
import pathlib
import re
import sys
import urllib.request

HERE = pathlib.Path(__file__).parent
sys.path.insert(0, str(HERE.parents[1] / "tools" / "hubspot"))
from port_home_video import BANDS, band_block  # noqa: E402


def block(path, start, end):
    text = path.read_text(encoding="utf-8")
    return text[text.index(start):text.index(end)]


# The content band and its review control. The cookie notice is hidden so it does not cover the control.
bar = (block(HERE / "bar.html", "<!-- bar:start", "<!-- bar:end -->")
       + "<style>#onetrust-consent-sdk{display:none !important}</style>\n"
       + block(HERE / "bar.html", "<!-- review:start", "<!-- review:end -->"))
local = {band["widget"]: band_block(key) for key, band in BANDS.items()}
local["widget_home_content_band"] = bar

req = urllib.request.Request("https://akka.io/", headers={"User-Agent": "Mozilla/5.0"})
home = urllib.request.urlopen(req).read().decode("utf-8")
home = re.sub(r'((?:src|href|action)=")/(?!/)', r"\1https://akka.io/", home)
home = re.sub(r"url\((['\"]?)/(?!/)", r"url(\1https://akka.io/", home)

# A module's markup runs from the end of its wrapper's opening tag to the wrapper's closing
# tag, which is the second </div> before the widget span's end marker.
for widget, html in local.items():
    opening = f'<div id="hs_cos_wrapper_{widget}"'
    if home.count(opening) != 1:
        raise SystemExit(f"home page has {home.count(opening)} of {widget}")
    start = home.index(">", home.index(opening)) + 1
    marker = home.index("<!--end widget-span -->", start)
    end = home.rindex("</div>", start, home.rindex("</div>", start, marker))
    home = home[:start] + html + home[end:]

(HERE / "home-preview.html").write_text(home, encoding="utf-8")
print("wrote", HERE / "home-preview.html")
