#!/usr/bin/env python3
"""Publish the ROI film at akka.io/roi, playing muted on load with a prompt that turns sound on.

website/roi/page.html is the page. The MP4 and its poster frame are public files in the file manager
folder /website/roi. The page is a HubSpot site page on its own coded template.

    python tools/hubspot/port_roi_page.py --video PATH   # upload the MP4 and a poster frame from it
    python tools/hubspot/port_roi_page.py --push         # PUT the template and publish akka.io/roi

The video URL carries the MP4's upload time, so a new cut is a new URL to the CDN. The token comes
from the gitignored scratchpad/.hs_env.
"""
import argparse
import json
import subprocess
import sys
from datetime import datetime
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from port_tour import _json_call, _curl, API, IMG_FOLDER_PARENT, put_source, push_live  # noqa: E402
from port_home_video import upload_file  # noqa: E402

ROOT = Path(__file__).resolve().parents[2]
SRC = ROOT / "website" / "roi" / "page.html"
OUT = ROOT / "scratchpad" / "hs-out"
FOLDER = "roi"
VIDEO_NAME = "akka-roi.mp4"
POSTER_NAME = "akka-roi-poster"
POSTER_AT = 4                        # seconds into the film: the opening headline
VIDEO = f"https://akka.io/hubfs/website/{FOLDER}/{VIDEO_NAME}"
POSTER = f"https://akka.io/hubfs/website/{FOLDER}/{POSTER_NAME}.jpeg"
URL = "https://akka.io/roi"
TEMPLATE = "custom-templates/roi-film.html"
PAGE = {"name": "Akka ROI film", "slug": "roi", "htmlTitle": "Akka ROI"}

ANNOTATION = """<!--
    templateType: page
    isAvailableForNewContent: false
    label: Akka ROI film
-->
"""


def folder_id():
    found = json.loads(_curl([f"{API}/files/v3/folders/search?path=/website/{FOLDER}&limit=5"]))
    fid = next((f["id"] for f in found.get("results", []) if f.get("path") == "/website/" + FOLDER), None)
    if not fid:
        r = json.loads(_json_call("POST", "/files/v3/folders", {"name": FOLDER, "parentFolderId": IMG_FOLDER_PARENT}))
        fid = r.get("id") or sys.exit(f"folder create failed: {r}")
    return fid


def upload(video):
    OUT.mkdir(parents=True, exist_ok=True)
    poster = OUT / (POSTER_NAME + ".jpg")
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", str(POSTER_AT), "-i", str(video), "-frames:v", "1",
                    "-q:v", "3", str(poster)], check=True)
    fid = folder_id()
    upload_file(video, VIDEO_NAME, fid)
    upload_file(poster, POSTER_NAME, fid)


def video_version():
    found = json.loads(_curl([f"{API}/files/v3/files/search?path=/website/{FOLDER}&limit=50"]))
    f = next((f for f in found.get("results", []) if f.get("path") == f"/website/{FOLDER}/{VIDEO_NAME}"), None)
    if not f:
        sys.exit(f"/website/{FOLDER}/{VIDEO_NAME} is not uploaded; run --video first")
    return int(datetime.fromisoformat(f["updatedAt"].replace("Z", "+00:00")).timestamp())


def render():
    page = SRC.read_text(encoding="utf-8")
    for key, value in (("__VIDEO__", f"{VIDEO}?v={video_version()}"), ("__POSTER__", POSTER)):
        if key not in page:
            sys.exit(f"page.html has no {key}")
        page = page.replace(key, value)
    for d in ("{{", "{%", "{#"):
        if d in page:
            sys.exit(f"page.html: HubL delimiter {d!r} in content")
    return ANNOTATION + page.replace("<!-- hubspot:head -->", "{{ standard_header_includes }}") \
                            .replace("<!-- hubspot:foot -->", "{{ standard_footer_includes }}")


def publish():
    OUT.mkdir(parents=True, exist_ok=True)
    tpl = OUT / "roi-film.html"
    tpl.write_text(render(), encoding="utf-8")
    put_source(TEMPLATE, tpl)
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


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--video", type=Path)
    ap.add_argument("--push", action="store_true")
    a = ap.parse_args()
    if a.video:
        upload(a.video)
    if a.push:
        publish()
