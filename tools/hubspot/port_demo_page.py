#!/usr/bin/env python3
"""Publish the demo film at akka.io/demo: the film from the home page's video band, playing muted on load.

website/demo/page.html is the page. It plays the MP4 and poster that port_home_video.py uploads, so a new
cut goes out with `port_home_video.py --video PATH --push` and then `--push` here, which moves the page to
the new upload. The page is a HubSpot site page on its own coded template.

    python tools/hubspot/port_demo_page.py --preview   # write scratchpad/hs-out/demo-page-preview.html
    python tools/hubspot/port_demo_page.py --push      # publish akka.io/demo and point the old share links at it

--push also deletes the akka.io/demo redirect to /request-a-demo when it exists (a redirect wins over a
page at the same path), and replaces the unlisted share pages from port_demo_mock.py with forwards to
akka.io/demo. The token comes from the gitignored scratchpad/.hs_env.
"""
import argparse
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from port_tour import _json_call, _curl, API, put_source, push_live  # noqa: E402
from port_home_video import FOLDER, VIDEO_NAME, video_version  # noqa: E402
import port_demo_mock  # noqa: E402

ROOT = Path(__file__).resolve().parents[2]
SRC = ROOT / "website" / "demo" / "page.html"
OUT = ROOT / "scratchpad" / "hs-out"
URL = "https://akka.io/demo"
VIDEO = f"https://akka.io/hubfs/website/{FOLDER}/{VIDEO_NAME}"
POSTER = f"https://akka.io/hubfs/website/{FOLDER}/akka-demo-poster.jpeg"
TEMPLATE = "custom-templates/demo-film.html"
PAGE = {"name": "Akka demo film", "slug": "demo", "htmlTitle": "Akka demo"}
REDIRECT_FROM = "http://akka.io/demo"
SHARE_PAGES = ("akka-demo.html", "akka-demo-mock-voiced.html")   # in port_demo_mock.FOLDER

ANNOTATION = """<!--
    templateType: page
    isAvailableForNewContent: false
    label: Akka demo film
-->
"""

FORWARD = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="robots" content="noindex, nofollow">
<meta http-equiv="refresh" content="0; url={url}">
<title>Akka demo</title>
<link rel="icon" href="https://akka.io/favicon.ico" type="image/x-icon">
<link rel="canonical" href="{url}">
</head>
<body>
<p>The Akka demo is at <a href="{url}">{url}</a>.</p>
<script>location.replace("{url}");</script>
</body>
</html>
"""


def render(video, hubspot):
    page = SRC.read_text(encoding="utf-8")
    for key, value in (("__VIDEO__", video), ("__POSTER__", POSTER)):
        if key not in page:
            sys.exit(f"page.html has no {key}")
        page = page.replace(key, value)
    if hubspot:
        for d in ("{{", "{%", "{#"):
            if d in page:
                sys.exit(f"page.html: HubL delimiter {d!r} in content")
        page = ANNOTATION + page.replace("<!-- hubspot:head -->", "{{ standard_header_includes }}") \
                                .replace("<!-- hubspot:foot -->", "{{ standard_footer_includes }}")
    return page


def publish(template_path):
    put_source(TEMPLATE, template_path)
    found = json.loads(_curl([API + "/cms/v3/pages/site-pages?limit=5&slug=" + PAGE["slug"]]))
    pid = next((p["id"] for p in found.get("results", []) if p["slug"] == PAGE["slug"]), None)
    body = dict(PAGE, templatePath=TEMPLATE, state="PUBLISHED", publishImmediately=True,
                language="en", subcategory="site_page")
    if pid:
        r = json.loads(_json_call("PATCH", "/cms/v3/pages/site-pages/" + pid, body))
    else:
        r = json.loads(_json_call("POST", "/cms/v3/pages/site-pages", body))
        pid = r.get("id")
    if not pid:
        sys.exit(f"page publish failed: {str(r)[:300]}")
    push_live(pid, URL)


def drop_redirect():
    after = None
    while True:
        r = json.loads(_curl([f"{API}/cms/v3/url-redirects?limit=100" + (f"&after={after}" if after else "")]))
        for x in r.get("results", []):
            if x["routePrefix"].rstrip("/") == REDIRECT_FROM:
                print(f"  deleting redirect {x['id']}: {x['routePrefix']} -> {x['destination']} ({x.get('redirectStyle')})")
                _json_call("DELETE", f"/cms/v3/url-redirects/{x['id']}", {})
                return
        after = r.get("paging", {}).get("next", {}).get("after")
        if not after:
            return


def forward_share_pages():
    page = OUT / "demo-forward.html"
    page.write_text(FORWARD.format(url=URL), encoding="utf-8")
    for name in SHARE_PAGES:
        port_demo_mock.upload(page, name)


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    mode = ap.add_mutually_exclusive_group(required=True)
    mode.add_argument("--preview", action="store_true")
    mode.add_argument("--push", action="store_true")
    a = ap.parse_args()
    OUT.mkdir(parents=True, exist_ok=True)
    if a.preview:
        out = OUT / "demo-page-preview.html"
        out.write_text(render(VIDEO, hubspot=False), encoding="utf-8")
        print("wrote", out)
    else:
        tpl = OUT / "demo-film.html"
        # The upload time in the query makes each new cut a new URL to the CDN.
        tpl.write_text(render(f"{VIDEO}?v={video_version()}", hubspot=True), encoding="utf-8")
        publish(tpl)
        drop_redirect()
        forward_share_pages()
