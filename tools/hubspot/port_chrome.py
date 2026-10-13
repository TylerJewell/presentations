#!/usr/bin/env python3
"""Publish the akka.io header and footer: the Header 2026 Mega module, the Footer 2026 Mega
module and the footer partial.

Sources live in tools/hubspot/chrome/ under their HubSpot paths. The build copies them into
scratchpad/hs-out/chrome/ and appends the install line's CSS and JS (tools/hubspot/install-line/)
to the footer module. Every akka.io template renders the footer partial, and HubSpot loads module
CSS in <head>, so an install line anywhere on akka.io is styled before first paint and its page
needs the button markup only.

    python tools/hubspot/port_chrome.py           # build and validate into scratchpad/hs-out/chrome/
    python tools/hubspot/port_chrome.py --pull    # fetch the published files into scratchpad/hs-out/chrome-live/
                                                  # and list the ones that differ from the sources
    python tools/hubspot/port_chrome.py --push    # build, then PUT the header module, footer module
                                                  # and footer partial to draft + published

Run --pull before --push: the modules are also edited in the HubSpot design manager, and a push
overwrites any change made there. A module change does not reliably re-render a page; each page
shows the new header and footer after it is patched and pushed live (see rerender_home in
port_tour.py). The token comes from the gitignored scratchpad/.hs_env.
"""
import argparse
import json
import os
import re
import subprocess
import sys
import urllib.parse
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SRC = Path(__file__).resolve().parent / "chrome"
LINE = Path(__file__).resolve().parent / "install-line"
OUT = ROOT / "scratchpad" / "hs-out" / "chrome"
LIVE = ROOT / "scratchpad" / "hs-out" / "chrome-live"
API = "https://api.hubapi.com"

HEADER = "AKKA-2024/modules/Header 2026 Mega.module"
FOOTER = "AKKA-2024/modules/Footer 2026 Mega.module"
# module.html goes last: HubSpot rebuilds a module's CSS and JS bundle only when module.html
# changes, so it has to follow them.
MODULE_FILES = ("module.css", "module.js", "fields.json", "meta.json", "module.html")
PUSHED = ([f"{HEADER}/{n}" for n in MODULE_FILES] + [f"{FOOTER}/{n}" for n in MODULE_FILES]
          + ["AKKA-2024/templates/partials/footer.html"])
PULLED = PUSHED + ["AKKA-2024/templates/partials/header-april.html"]

APPENDED = {
    f"{FOOTER}/module.css": "install-line.css",
    f"{FOOTER}/module.js": "install-line.js",
}


def build():
    for rel in PUSHED:
        text = (SRC / rel).read_bytes().decode("utf-8")
        if rel.endswith(".json"):
            json.loads(text)
        for a, b in (("{%", "%}"), ("{{", "}}")):
            if text.count(a) != text.count(b):
                sys.exit(f"{rel}: unbalanced {a} {b}")
        if rel in APPENDED:
            extra = (LINE / APPENDED[rel]).read_text(encoding="utf-8")
            for d in ("{{", "{%", "{#"):
                if d in extra:
                    sys.exit(f"{APPENDED[rel]}: HubL delimiter {d!r} in content")
            text = (text.rstrip() + "\n\n/* Install line, from tools/hubspot/install-line/"
                    + APPENDED[rel] + " */\n" + extra)
        dest = OUT / rel
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_bytes(text.encode("utf-8"))
    print("built", len(PUSHED), "files into", OUT)


def token():
    env = (ROOT / "scratchpad" / ".hs_env").read_text(encoding="utf-8")
    m = re.search(r"HUBSPOT_TOKEN=(\S+)", env)
    return m.group(1) if m else sys.exit("HUBSPOT_TOKEN not found in scratchpad/.hs_env")


def pull():
    tok = token()
    differ = []
    for rel in PULLED:
        r = subprocess.run(["curl", "-s", "-w", "\n%{http_code}", "-H", "Authorization: Bearer " + tok,
                            f"{API}/cms/v3/source-code/published/content/{urllib.parse.quote(rel)}"],
                           capture_output=True)
        body, code = r.stdout.rsplit(b"\n", 1)
        if code != b"200":
            sys.exit(f"GET {rel} returned {code.decode()}")
        dest = LIVE / rel
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_bytes(body)
        if body != (SRC / rel).read_bytes():
            differ.append(rel)
    print("fetched", len(PULLED), "files into", LIVE)
    for rel in differ:
        print("  differs from source:", rel)


def push():
    tok = token()
    for rel in PUSHED:
        for env in ("draft", "published"):
            code = subprocess.run(
                ["curl", "-s", "-o", os.devnull, "-w", "%{http_code}", "-X", "PUT",
                 f"{API}/cms/v3/source-code/{env}/content/{urllib.parse.quote(rel)}",
                 "-H", "Authorization: Bearer " + tok, "-F", f"file=@{OUT / rel}"],
                capture_output=True, text=True).stdout.strip()
            if code not in ("200", "201"):
                sys.exit(f"PUT {rel} ({env}) returned {code}")
        print("  put", rel)


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--pull", action="store_true")
    ap.add_argument("--push", action="store_true")
    a = ap.parse_args()
    if a.pull:
        pull()
    else:
        build()
        if a.push:
            push()
