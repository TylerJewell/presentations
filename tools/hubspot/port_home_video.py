#!/usr/bin/env python3
"""Publish the two film bands on the akka.io home page.

website/home-video/band.html holds one band between band:start/band:end: a film playing muted
and dimmed as a backdrop, a title, a play button that opens the film with sound, and a pause
control. The file is the About Akka band as written; the IdeAItion band is the same block with
its own section id, title, film, poster and length. Each film and its poster frame are public
files in the file manager folder /website/home-video.

    python tools/hubspot/port_home_video.py --video PATH               # upload the About Akka film and a poster frame from it
    python tools/hubspot/port_home_video.py --video PATH --band idea   # the same for the IdeAItion film
    python tools/hubspot/port_home_video.py --push                     # PUT both modules, set the home layout, publish home

--push places the bands and orders the home page by port_tour.HOME_ORDER. A module's video URL
carries the MP4's upload time, so a new upload is a new URL to the CDN. The token comes from the
gitignored scratchpad/.hs_env.
"""
import argparse
import json
import subprocess
import sys
from datetime import datetime
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from port_tour import (_json_call, _curl, API, IMG_FOLDER_PARENT, HOME_MODULES,  # noqa: E402
                       put_source, home_layout)

ROOT = Path(__file__).resolve().parents[2]
SRC = ROOT / "website" / "home-video" / "band.html"
OUT = ROOT / "scratchpad" / "hs-out"
FOLDER = "home-video"

# Each band: its widget on the home page, its film and poster in the file manager, the second
# of the film the poster is taken from, and the text of band.html it replaces.
BANDS = {
    "demo": {
        "widget": "widget_home_video_band", "video": "akka-demo.mp4", "poster": "akka-demo-poster",
        "poster_at": 24,                 # the integrated platform frame
        "swaps": [],
    },
    "idea": {
        "widget": "widget_home_idea_band", "video": "akka-ideaition.mp4", "poster": "akka-ideaition-poster",
        "poster_at": 6.8,                # the field of ideas
        "swaps": [
            ("hv-band", "hv-idea"),
            (">About Akka<", ">Ide<span>AI</span>tion<"),
            ("akka-demo-poster", "akka-ideaition-poster"),
            ("akka-demo.mp4", "akka-ideaition.mp4"),
            ("Play the Akka demo video with sound, 4 minutes 59 seconds", "Play the IdeAItion film with sound, 3 minutes 50 seconds"),
            ('aria-label="Akka demo video"', 'aria-label="IdeAItion film"'),
            (">4:59<", ">3:50<"),
        ],
    },
}

MODULE_HEADER = """<!-- {label}: a film as a muted backdrop with a title and a play button that opens it with
     sound. Built by tools/hubspot/port_home_video.py from website/home-video/band.html; edit that
     and re-run the port rather than editing this module. Every class is scoped under the section's id. -->
"""


def folder_id(folder=FOLDER):
    found = json.loads(_curl([f"{API}/files/v3/folders/search?path=/website/{folder}&limit=5"]))
    fid = next((f["id"] for f in found.get("results", []) if f.get("path") == "/website/" + folder), None)
    if not fid:
        r = json.loads(_json_call("POST", "/files/v3/folders", {"name": folder, "parentFolderId": IMG_FOLDER_PARENT}))
        fid = r.get("id") or sys.exit(f"folder create failed: {r}")
    return fid


def upload_file(path, name, fid):
    opts = json.dumps({"access": "PUBLIC_INDEXABLE", "overwrite": True})
    r = json.loads(_curl(["-X", "POST", API + "/files/v3/files", "-F", f"file=@{path}", "-F", f"folderId={fid}",
                          "-F", f"fileName={name}", "-F", f"options={opts}"]))
    if not r.get("url"):
        sys.exit(f"upload failed for {path}: {str(r)[:300]}")
    print("  uploaded", r["url"])


def upload(video, band):
    OUT.mkdir(parents=True, exist_ok=True)
    poster = OUT / (band["poster"] + ".jpg")
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", str(band["poster_at"]), "-i", str(video), "-frames:v", "1",
                    "-q:v", "3", str(poster)], check=True)
    fid = folder_id()
    # The served content type follows the stored name: an MP4 keeps the extension it is given,
    # and the file manager adds one to an image (.jpeg for a JPEG).
    upload_file(video, band["video"], fid)
    upload_file(poster, band["poster"], fid)


def video_version(name):
    found = json.loads(_curl([f"{API}/files/v3/files/search?path=/website/{FOLDER}&limit=50"]))
    f = next((f for f in found.get("results", []) if f.get("path") == f"/website/{FOLDER}/{name}"), None)
    if not f:
        sys.exit(f"/website/{FOLDER}/{name} is not uploaded; run --video first")
    return int(datetime.fromisoformat(f["updatedAt"].replace("Z", "+00:00")).timestamp())


def band_block(key):
    """The band's HTML: the block of band.html with the band's own text in place of the About Akka band's."""
    text = SRC.read_text(encoding="utf-8")
    block = text[text.index("<!-- band:start"):text.index("<!-- band:end -->")]
    block = block[block.index("-->") + 3:].strip() + "\n"
    for old, new in BANDS[key]["swaps"]:
        if old not in block:
            sys.exit(f"band.html: {old!r} is not in the band")
        block = block.replace(old, new)
    return block


def build(key):
    band = BANDS[key]
    block = band_block(key)
    for d in ("{{", "{%", "{#"):
        if d in block:
            sys.exit(f"band.html: HubL delimiter {d!r} in the band")
    src = f'https://akka.io/hubfs/website/{FOLDER}/{band["video"]}"'
    if block.count(src) != 1:
        sys.exit(f"band.html: expected one data-src of {src}")
    block = block.replace(src, src[:-1] + f'?v={video_version(band["video"])}"')
    OUT.mkdir(parents=True, exist_ok=True)
    path = OUT / f"home-{key}-band.module.html"
    path.write_text(MODULE_HEADER.format(label=HOME_MODULES[band["widget"]][1]) + block, encoding="utf-8")
    return path


def put_module(key, module_html):
    module, label = HOME_MODULES[BANDS[key]["widget"]]
    meta = {"global": False, "content_types": ["LANDING_PAGE", "SITE_PAGE"], "host_template_types": ["PAGE"],
            "label": label, "is_available_for_new_content": True}
    files = {"meta.json": json.dumps(meta, indent=2), "fields.json": "[]", "module.css": "", "module.js": ""}
    for name, text in files.items():
        p = OUT / f"home-{key}-band.{name}"
        p.write_text(text, encoding="utf-8")
        put_source(f"{module}/{name}", p)
    put_source(f"{module}/module.html", module_html)


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--video", type=Path)
    ap.add_argument("--band", choices=sorted(BANDS), default="demo")
    ap.add_argument("--push", action="store_true")
    a = ap.parse_args()
    if a.video:
        upload(a.video, BANDS[a.band])
    if a.push:
        for key in BANDS:
            put_module(key, build(key))
        home_layout()
