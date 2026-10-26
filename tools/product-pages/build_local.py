#!/usr/bin/env python3
"""Build a local copy of akka.io for reviewing the product pages: the live home page, header, menu
and footer around the new product page content.

    python tools/product-pages/build_local.py            # build _internal/product-pages-local/
    python tools/product-pages/build_local.py --refresh  # fetch the live pages again first
    python tools/product-pages/serve_local.py            # serve it at http://localhost:8711

The live pages are kept in _internal/product-pages-live/. The standalone pages, with their own
header and footer, are written to _internal/product-pages-pro/ on the way.
"""
import argparse
import re
import shutil
import subprocess
from pathlib import Path

import akp

PRO = akp.ROOT / "_internal" / "product-pages-pro"
LIVE = akp.ROOT / "_internal" / "product-pages-live"
OUT = akp.ROOT / "_internal" / "product-pages-local"
LIVE_URLS = {"home.html": "https://akka.io/", "overview.html": "https://akka.io/platform/overview",
             "sdk.html": "https://akka.io/platform/sdk", "specify.html": "https://akka.io/platform/specify",
             "verify.html": "https://akka.io/platform/verify", "optimize.html": "https://akka.io/platform/optimize"}
LOCAL_PAGES = {p: "/platform/" + p[:-5] for p in akp.PAGES}
LOCAL = {"/"} | set(LOCAL_PAGES.values())
JQUERY = '<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>'


def fetch(refresh):
    LIVE.mkdir(parents=True, exist_ok=True)
    for name, url in LIVE_URLS.items():
        if refresh or not (LIVE / name).exists():
            html = subprocess.run(["curl", "-sL", url], capture_output=True, check=True).stdout
            (LIVE / name).write_bytes(html)


def fix_links(html):
    """Links to the six local pages stay local; every other akka.io link goes to the live site."""
    def rel(m):
        attr, q, url = m.group(1), m.group(2), m.group(3)
        if url.startswith("https://akka.io/old"):
            return "%s=%s/%s" % (attr, q, q)
        if url.startswith("https://akka.io"):
            path = url[len("https://akka.io"):] or "/"
        elif url.startswith("/akp/"):
            return m.group(0)
        elif url.startswith("/") and not url.startswith("//"):
            path = url
        else:
            return m.group(0)
        p = path.split("?")[0].split("#")[0].rstrip("/") or "/"
        frag = ("#" + path.split("#", 1)[1]) if "#" in path else ""
        if p in LOCAL:
            return "%s=%s%s%s%s" % (attr, q, p, frag, q)
        return "%s=%shttps://akka.io%s%s" % (attr, q, path, q)
    return re.sub(r"\b(href|src|action)=([\"'])([^\"']*)\2", rel, html)


def build():
    pages = akp.build_pro(PRO)
    shutil.rmtree(OUT, ignore_errors=True)
    (OUT / "akp").mkdir(parents=True)
    (OUT / "akp" / "akp.css").write_text(akp.scoped_css(), encoding="utf-8")
    (OUT / "akp" / "akp.js").write_text(akp.embed_js(), encoding="utf-8")
    shutil.copytree(PRO / "img", OUT / "akp" / "img")
    shutil.copytree(PRO / "apps", OUT / "akp" / "apps")
    (OUT / "index.html").write_text(fix_links((LIVE / "home.html").read_text(encoding="utf-8")), encoding="utf-8")
    for name, page in pages.items():
        live = (LIVE / name).read_text(encoding="utf-8")
        main, title, desc = akp.scoped_body(page, LOCAL_PAGES, "/akp/img/", "/akp/apps/")
        a = live.index("</header></div>") + len("</header></div>")
        b = live.index(JQUERY)
        out = live[:a] + '\n<div class="akp">' + main + '</div>\n<script src="/akp/akp.js"></script>\n' + live[b:]
        out = re.sub(r"<title>.*?</title>", lambda m: title, out, count=1, flags=re.S)
        out = re.sub(r'<meta name="description" content="[^"]*">', lambda m: desc, out, count=1)
        out = out.replace("</head>", akp.FONTS + '<link rel="stylesheet" href="/akp/akp.css">\n</head>', 1)
        out = fix_links(out)
        d = OUT / "platform" / name[:-5]
        d.mkdir(parents=True)
        (d / "index.html").write_text(out, encoding="utf-8")
    print("built", OUT)


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--refresh", action="store_true")
    a = ap.parse_args()
    fetch(a.refresh)
    build()
