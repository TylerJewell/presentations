#!/usr/bin/env python3
"""Publish the content band at the foot of the akka.io home page.

website/home-content/bar.html holds the band between bar:start/bar:end: eight items in a framed
panel over the hero's animation. The items are the ITEMS list in that file; change the list and
re-run --push. A picture that is not already on akka.io sits in website/home-content/img and
is a public file in the file manager folder /website/home-content.

    python tools/hubspot/port_home_content.py --images   # upload the pictures in IMAGES
    python tools/hubspot/port_home_content.py --push     # PUT the module, set the home layout, publish home

--push places the band and orders the home page by port_tour.HOME_ORDER. The token comes from
the gitignored scratchpad/.hs_env.
"""
import argparse
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from port_tour import HOME_MODULES, put_source, home_layout  # noqa: E402
from port_home_video import folder_id, upload_file  # noqa: E402

ROOT = Path(__file__).resolve().parents[2]
SRC = ROOT / "website" / "home-content"
OUT = ROOT / "scratchpad" / "hs-out"
FOLDER = "home-content"
IMAGES = ["guides.jpg"]              # served as /hubfs/website/home-content/<stem>.jpeg
MODULE, LABEL = HOME_MODULES["widget_home_content_band"]

MODULE_HEADER = """<!-- Home content band: films, posts and guides in a framed panel over the hero's animation.
     Built by tools/hubspot/port_home_content.py from website/home-content/bar.html; edit that
     and re-run the port rather than editing this module. Every class is scoped under .hc. -->
"""


def build():
    text = (SRC / "bar.html").read_text(encoding="utf-8")
    block = text[text.index("<!-- bar:start"):text.index("<!-- bar:end -->")]
    block = block[block.index("-->") + 3:].strip() + "\n"
    for d in ("{{", "{%", "{#"):
        if d in block:
            sys.exit(f"bar.html: HubL delimiter {d!r} in the band")
    if "'img/" in block:
        sys.exit("bar.html: an item names a local picture; upload it and name its akka.io address")
    OUT.mkdir(parents=True, exist_ok=True)
    path = OUT / "home-content-band.module.html"
    path.write_text(MODULE_HEADER + block, encoding="utf-8")
    return path


def put_module(module_html):
    meta = {"global": False, "content_types": ["LANDING_PAGE", "SITE_PAGE"], "host_template_types": ["PAGE"],
            "label": LABEL, "is_available_for_new_content": True}
    files = {"meta.json": json.dumps(meta, indent=2), "fields.json": "[]", "module.css": "", "module.js": ""}
    for name, text in files.items():
        p = OUT / ("home-content-band." + name)
        p.write_text(text, encoding="utf-8")
        put_source(f"{MODULE}/{name}", p)
    put_source(f"{MODULE}/module.html", module_html)


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--images", action="store_true")
    ap.add_argument("--push", action="store_true")
    a = ap.parse_args()
    if a.images:
        fid = folder_id(FOLDER)
        for name in IMAGES:
            upload_file(SRC / "img" / name, Path(name).stem, fid)
    if a.push:
        put_module(build())
        home_layout()
