#!/usr/bin/env python3
"""The install line: one button that copies "install Akka from akka.ai".

install-line/install-line.css and install-line/install-line.js are the only source. A page
built from this repo carries a copy of both between its install-line:start and
install-line:end markers, and this script rewrites that copy. The HubSpot module
"Install Line" carries them as module.css and module.js.

    python tools/hubspot/install_line.py              # rewrite the marked block in every page
    python tools/hubspot/install_line.py PAGE...      # rewrite it in the named pages only
    python tools/hubspot/install_line.py --check      # exit 1 when a page's block is stale
    python tools/hubspot/install_line.py --module     # build the module into scratchpad/hs-out/
    python tools/hubspot/install_line.py --push       # build the module and PUT it, draft + published

Build scripts import button() for the markup.
"""
import argparse
import json
import os
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SRC = Path(__file__).resolve().parent / "install-line"
OUT = ROOT / "scratchpad" / "hs-out" / "install-line.module"
MODULE = "AKKA-2024/modules/Install Line.module"
API = "https://api.hubapi.com"

TEXT = "install Akka from akka.ai"
SIZES = ("inline", "quiet", "chip", "panel", "mini")
FONT = ('<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;600'
        '&display=optional" rel="stylesheet">')
START = "<!-- install-line:start"
END = "<!-- install-line:end -->"


LEAD = "In your AI harness:"


def button(size="chip", lead=False):
    """lead=True names where the instruction goes in place of the prompt glyph."""
    if size not in SIZES:
        raise ValueError(f"size must be one of {SIZES}")
    cls = "akka-install" if size == "inline" else f"akka-install akka-install--{size}"
    start = '<span class="akka-install__g" aria-hidden="true">›</span>'
    if lead:
        cls += " akka-install--lead"
        start = f'<span class="akka-install__lead">{LEAD}</span>'
    return (f'<button type="button" class="{cls}">{start}'
            f'<span class="akka-install__s">{TEXT}</span>'
            '<span class="akka-install__cp" aria-live="polite">Copy</span></button>')


def assets():
    css = (SRC / "install-line.css").read_text(encoding="utf-8").strip()
    js = (SRC / "install-line.js").read_text(encoding="utf-8").strip()
    return (f"{START} (written by tools/hubspot/install_line.py; edit install-line/ instead) -->\n"
            f"{FONT}\n<style>\n{css}\n</style>\n<script>\n{js}\n</script>\n{END}")


def pages():
    out = subprocess.run(["git", "ls-files", "-co", "--exclude-standard", "*.html"],
                         cwd=ROOT, capture_output=True, text=True, check=True).stdout
    for rel in out.splitlines():
        # HubSpot fragments are build-all.py output: it rescopes the block's CSS from the
        # page it builds them from, so the page is the copy kept in sync.
        if "/hubspot/" in rel or "/generated/" in rel:
            continue
        p = ROOT / rel
        if p.exists() and START in p.read_text(encoding="utf-8"):
            yield p


def sync(check, only=()):
    block = assets()
    stale = []
    for p in ([Path(x).resolve() for x in only] or pages()):
        # Bytes in and out, so a page keeps its own line endings.
        s = p.read_bytes().decode("utf-8")
        nl_block = block.replace("\n", "\r\n") if "\r\n" in s else block
        a = s.index(START)
        b = s.index(END, a) + len(END)
        if s[a:b] == nl_block:
            continue
        stale.append(p.relative_to(ROOT))
        if not check:
            p.write_bytes((s[:a] + nl_block + s[b:]).encode("utf-8"))
    verb = "stale" if check else "rewrote"
    for p in stale:
        print(verb, p)
    if check and stale:
        sys.exit(1)


MODULE_HTML = """{{ require_css("https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;600&display=optional") }}
{% set cls = "akka-install" if module.size == "inline" else "akka-install akka-install--" ~ module.size %}
<button type="button" class="{{ cls }}{% if module.lead %} akka-install--lead{% endif %}">{% if module.lead %}<span class="akka-install__lead">In your AI harness:</span>{% else %}<span class="akka-install__g" aria-hidden="true">›</span>{% endif %}<span class="akka-install__s">install Akka from akka.ai</span><span class="akka-install__cp" aria-live="polite">Copy</span></button>
"""

MODULE_FIELDS = [{
    "name": "size", "label": "Size", "type": "choice", "display": "select", "required": True,
    "choices": [[s, s.capitalize()] for s in SIZES], "default": "chip",
}, {
    "name": "lead", "label": "Lead with \"In your AI harness:\"", "type": "boolean", "display": "toggle",
    "default": True,
}]

MODULE_META = {
    "global": False,
    "content_types": ["LANDING_PAGE", "SITE_PAGE", "BLOG_POST"],
    "host_template_types": ["PAGE", "BLOG_POST"],
    "label": "Install Line",
    "is_available_for_new_content": True,
}


def build_module():
    for d in ("{{", "{%", "{#"):
        for name in ("install-line.css", "install-line.js"):
            if d in (SRC / name).read_text(encoding="utf-8"):
                sys.exit(f"{name}: HubL delimiter {d!r} in content")
    OUT.mkdir(parents=True, exist_ok=True)
    files = {
        "module.html": MODULE_HTML,
        "module.css": (SRC / "install-line.css").read_text(encoding="utf-8"),
        "module.js": (SRC / "install-line.js").read_text(encoding="utf-8"),
        "fields.json": json.dumps(MODULE_FIELDS, indent=2),
        "meta.json": json.dumps(MODULE_META, indent=2),
    }
    for name, text in files.items():
        (OUT / name).write_text(text, encoding="utf-8")
    print("built", OUT)
    return files


def token():
    env = (ROOT / "scratchpad" / ".hs_env").read_text(encoding="utf-8")
    m = re.search(r"HUBSPOT_TOKEN=(\S+)", env)
    return m.group(1) if m else sys.exit("HUBSPOT_TOKEN not found in scratchpad/.hs_env")


def push_module():
    tok = token()
    for name in build_module():
        remote = f"{MODULE}/{name}".replace(" ", "%20")
        for env in ("draft", "published"):
            code = subprocess.run(
                ["curl", "-s", "-o", os.devnull, "-w", "%{http_code}", "-X", "PUT",
                 f"{API}/cms/v3/source-code/{env}/content/{remote}",
                 "-H", "Authorization: Bearer " + tok, "-F", f"file=@{OUT / name}"],
                capture_output=True, text=True).stdout.strip()
            if code not in ("200", "201"):
                sys.exit(f"PUT {name} ({env}) returned {code}")
        print("  put", name)


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--check", action="store_true")
    ap.add_argument("--module", action="store_true")
    ap.add_argument("--push", action="store_true")
    ap.add_argument("pages", nargs="*")
    a = ap.parse_args()
    if a.push:
        push_module()
    elif a.module:
        build_module()
    else:
        sync(a.check, a.pages)
