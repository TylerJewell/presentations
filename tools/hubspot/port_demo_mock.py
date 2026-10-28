#!/usr/bin/env python3
"""Stage the demo-film animatic from ~/ai-console/demo/mock on akka.io at an unlisted URL.

The mock loads its stylesheets, its libraries and one file per scene. The file manager serves
one file per URL and may rename uploads, so the page is published as a single HTML file with
every stylesheet and script inlined in load order. The file is PUBLIC_NOT_INDEXABLE, in a
folder whose name carries a random token, and nothing on the site links to it.

The finished film is at akka.io/demo (port_demo_page.py), which also replaces this folder's earlier film
pages, akka-demo.html and akka-demo-mock-voiced.html, with forwards to it.

    python tools/hubspot/port_demo_mock.py           # build scratchpad/hs-out/demo-mock/
    python tools/hubspot/port_demo_mock.py --push    # build and upload, replacing the staged copy

The token comes from the gitignored scratchpad/.hs_env.
"""
import argparse
import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from port_tour import _json_call, _curl, API, IMG_FOLDER_PARENT  # noqa: E402

ROOT = Path(__file__).resolve().parents[2]
SRC = Path.home() / "ai-console" / "demo" / "mock"
OUT = ROOT / "scratchpad" / "hs-out" / "demo-mock"
FOLDER = "demo-film-d76ebf64"
NAME = "akka-demo-mock.html"
BASE = f"https://akka.io/hubfs/website/{FOLDER}/"


def read(rel):
    text = (SRC / rel).read_text(encoding="utf-8")
    if rel != "index.html" and "</script" in text.lower():
        sys.exit(f"{rel}: '</script' would end the inlined block early")
    return text


def scripts(rel):
    text = read(rel)
    if rel != "scenes/index.js":
        return [text]
    # The registry adds a script tag per scene, resolved against its own src. Inlined, it has
    # no src, so the loader is dropped and the scenes follow it in MOCK_ORDER.
    registry = text[:text.index("(function () {")]
    order = re.findall(r"'([\d.]+)'", re.search(r"MOCK_ORDER = \[(.*?)\];", registry, re.S)[1])
    return [registry] + [read(f"scenes/{sid}.js") for sid in order]


def build():
    html = read("index.html")
    html = re.sub(r'<link rel="stylesheet" href="([^":]+)">',
                  lambda m: "<style>\n" + read(m[1]) + "</style>", html)
    html = re.sub(r'<script src="([^":]+)"></script>',
                  lambda m: "\n".join(f"<script>\n{t}</script>" for t in scripts(m[1])), html)
    html = html.replace('<meta charset="utf-8">',
                        '<meta charset="utf-8">\n<meta name="robots" content="noindex, nofollow">', 1)
    OUT.mkdir(parents=True, exist_ok=True)
    path = OUT / NAME
    path.write_text(html, encoding="utf-8")
    print("built", path, f"({len(html):,} chars)")
    return path


def upload(path, name):
    found = json.loads(_curl([f"{API}/files/v3/folders/search?path=/website/{FOLDER}&limit=5"]))
    fid = next((f["id"] for f in found.get("results", []) if f.get("path") == "/website/" + FOLDER), None)
    if not fid:
        r = json.loads(_json_call("POST", "/files/v3/folders", {"name": FOLDER, "parentFolderId": IMG_FOLDER_PARENT}))
        fid = r.get("id") or sys.exit(f"folder create failed: {r}")
    opts = json.dumps({"access": "PUBLIC_NOT_INDEXABLE", "overwrite": True})
    r = json.loads(_curl(["-X", "POST", API + "/files/v3/files", "-F", f"file=@{path}",
                          "-F", f"folderId={fid}", "-F", f"fileName={name}", "-F", f"options={opts}"]))
    if not r.get("url"):
        sys.exit(f"upload failed for {path.name}: {str(r)[:300]}")
    print("uploaded:", r["url"])
    return r["url"].rsplit("/", 1)[1]


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--push", action="store_true")
    a = ap.parse_args()
    built = build()
    if a.push:
        print("share:   ", BASE + upload(built, NAME))
