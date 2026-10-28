#!/usr/bin/env python3
"""Publish the demo video band on the akka.io home page.

website/home-video/band.html holds the band between band:start/band:end: the demo film playing
muted and dimmed as a backdrop, a play button that opens it with sound, and a pause control.
The MP4 and its poster frame are public files in the file manager folder /website/home-video.

    python tools/hubspot/port_home_video.py --video PATH   # upload the MP4 and a poster frame from it
    python tools/hubspot/port_home_video.py --push         # PUT the module, set the band order, publish home

--push places the band and orders the home page's first section by port_tour.HOME_ORDER. The
module's video URL carries the MP4's upload time, so a new upload is a new URL to the CDN. The
token comes from the gitignored scratchpad/.hs_env.
"""
import argparse
import json
import subprocess
import sys
import time
from datetime import datetime
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from port_tour import (_json_call, _curl, API, IMG_FOLDER_PARENT, HOME_PAGE_ID, HOME_ORDER,  # noqa: E402
                       put_source, push_live, home_draft_matches_live, rerender_home)

ROOT = Path(__file__).resolve().parents[2]
SRC = ROOT / "website" / "home-video" / "band.html"
OUT = ROOT / "scratchpad" / "hs-out"
FOLDER = "home-video"
VIDEO_NAME = "akka-demo.mp4"
POSTER_NAME = "akka-demo-poster"
POSTER_AT = 24                       # seconds into the film: the integrated platform frame
MODULE = "AKKA-2024/modules/Home Video Band.module"
WIDGET = "widget_home_video_band"

MODULE_HEADER = """<!-- Home video band: the demo film as a muted backdrop with a play button that opens it with
     sound. Built by tools/hubspot/port_home_video.py from website/home-video/band.html; edit that
     and re-run the port rather than editing this module. Every class is scoped under #hv-band. -->
"""

MODULE_META = {
    "global": False,
    "content_types": ["LANDING_PAGE", "SITE_PAGE"],
    "host_template_types": ["PAGE"],
    "label": "Home Video Band",
    "is_available_for_new_content": True,
}


def folder_id():
    found = json.loads(_curl([f"{API}/files/v3/folders/search?path=/website/{FOLDER}&limit=5"]))
    fid = next((f["id"] for f in found.get("results", []) if f.get("path") == "/website/" + FOLDER), None)
    if not fid:
        r = json.loads(_json_call("POST", "/files/v3/folders", {"name": FOLDER, "parentFolderId": IMG_FOLDER_PARENT}))
        fid = r.get("id") or sys.exit(f"folder create failed: {r}")
    return fid


def upload_file(path, name, fid):
    opts = json.dumps({"access": "PUBLIC_INDEXABLE", "overwrite": True})
    r = json.loads(_curl(["-X", "POST", API + "/files/v3/files", "-F", f"file=@{path}", "-F", f"folderId={fid}",
                          "-F", f"fileName={name}", "-F", f"options={opts}"]))
    if not r.get("url"):
        sys.exit(f"upload failed for {path}: {str(r)[:300]}")
    print("  uploaded", r["url"])


def upload(video):
    OUT.mkdir(parents=True, exist_ok=True)
    poster = OUT / (POSTER_NAME + ".jpg")
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", str(POSTER_AT), "-i", str(video), "-frames:v", "1",
                    "-q:v", "3", str(poster)], check=True)
    fid = folder_id()
    # The served content type follows the stored name: an MP4 keeps the extension it is given,
    # and the file manager adds one to an image (.jpeg for a JPEG).
    upload_file(video, VIDEO_NAME, fid)
    upload_file(poster, POSTER_NAME, fid)


def video_version():
    found = json.loads(_curl([f"{API}/files/v3/files/search?path=/website/{FOLDER}&limit=50"]))
    f = next((f for f in found.get("results", []) if f.get("path") == f"/website/{FOLDER}/{VIDEO_NAME}"), None)
    if not f:
        sys.exit(f"/website/{FOLDER}/{VIDEO_NAME} is not uploaded; run --video first")
    return int(datetime.fromisoformat(f["updatedAt"].replace("Z", "+00:00")).timestamp())


def build():
    text = SRC.read_text(encoding="utf-8")
    block = text[text.index("<!-- band:start"):text.index("<!-- band:end -->")]
    block = block[block.index("-->") + 3:].strip() + "\n"
    for d in ("{{", "{%", "{#"):
        if d in block:
            sys.exit(f"band.html: HubL delimiter {d!r} in the band")
    src = f'https://akka.io/hubfs/website/{FOLDER}/{VIDEO_NAME}"'
    if block.count(src) != 1:
        sys.exit(f"band.html: expected one data-src of {src}")
    block = block.replace(src, src[:-1] + f'?v={video_version()}"')
    OUT.mkdir(parents=True, exist_ok=True)
    path = OUT / "home-video-band.module.html"
    path.write_text(MODULE_HEADER + block, encoding="utf-8")
    return path


def put_module(module_html):
    files = {"meta.json": json.dumps(MODULE_META, indent=2), "fields.json": "[]", "module.css": "", "module.js": ""}
    for name, text in files.items():
        p = OUT / ("home-video-band." + name)
        p.write_text(text, encoding="utf-8")
        put_source(f"{MODULE}/{name}", p)
    put_source(f"{MODULE}/module.html", module_html)


def module_id():
    meta = json.loads(_curl([f"{API}/cms/v3/source-code/published/content/" + (MODULE + "/meta.json").replace(" ", "%20")]))
    if not meta.get("module_id"):
        sys.exit(f"{MODULE} has no module_id yet: {meta}")
    return meta["module_id"]


def place():
    """Add the band to the home page's first section, order its bands by HOME_ORDER, publish."""
    home_draft_matches_live()
    draft = json.loads(_curl([f"{API}/cms/v3/pages/site-pages/{HOME_PAGE_ID}/draft"]))
    cell = draft["layoutSections"]["dnd_area"]["rows"][0]["0"]
    names = [row["0"]["name"] for row in cell["rows"]]
    if names == HOME_ORDER:
        rerender_home()
        return
    backup = OUT / time.strftime(f"home-page-{HOME_PAGE_ID}-%Y%m%d-%H%M%S.json")
    backup.write_text(json.dumps(draft, indent=1, ensure_ascii=False), encoding="utf-8")
    print("  backed up the home page draft to", backup)
    by_name = {row["0"]["name"]: row for row in cell["rows"]}
    if WIDGET not in by_name:
        by_name[WIDGET] = {"0": {
            "cells": [], "cssClass": "", "cssId": "", "cssStyle": "", "label": "Home Video Band", "name": WIDGET,
            "params": {"css_class": "dnd-module", "module_id": module_id(), "schema_version": 2},
            "rowMetaData": [], "rows": [], "type": "custom_widget", "w": 12, "x": 0}}
    if set(by_name) != set(HOME_ORDER):
        sys.exit(f"home bands differ from HOME_ORDER: {sorted(set(by_name) ^ set(HOME_ORDER))}")
    cell["rows"] = [by_name[n] for n in HOME_ORDER]
    cell["rowMetaData"] = [{"cssClass": "dnd-row"} for _ in HOME_ORDER]
    r = json.loads(_json_call("PATCH", f"/cms/v3/pages/site-pages/{HOME_PAGE_ID}/draft",
                              {"layoutSections": draft["layoutSections"]}))
    got = [row["0"]["name"] for row in r["layoutSections"]["dnd_area"]["rows"][0]["0"]["rows"]]
    if got != HOME_ORDER:
        sys.exit(f"draft order is {got}")
    push_live(HOME_PAGE_ID, "home page")


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--video", type=Path)
    ap.add_argument("--push", action="store_true")
    a = ap.parse_args()
    if a.video:
        upload(a.video)
    if a.push:
        put_module(build())
        place()
