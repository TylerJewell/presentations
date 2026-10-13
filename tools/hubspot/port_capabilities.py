#!/usr/bin/env python3
"""Publish capabilities/index.html as akka.io/platform/capabilities.

The page is a self-contained reference that scrolls naturally, so the port is minimal: the
inline <style> is scoped to .capabilities-content, and the style and body go into one
partial, custom-templates/partials/capabilities-body.html, which the page's template
(custom-templates/akka-capabilities-wrapper.html) includes between the site header and
footer.

    python tools/hubspot/port_capabilities.py              # build into scratchpad/hs-out/
    python tools/hubspot/port_capabilities.py --push       # build, PUT the partial to draft + published
    python tools/hubspot/port_capabilities.py --push-live  # also set the page title and description, and re-render

A partial change does not reliably re-render the page, so --push-live writes the page's
title and description and pushes the page live. The token comes from the gitignored
scratchpad/.hs_env.
"""
import argparse
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from port_tour import _json_call, _curl, API, put_source, push_live  # noqa: E402
import json  # noqa: E402

ROOT = Path(__file__).resolve().parents[2]
SRC = ROOT / "capabilities" / "index.html"
OUT = ROOT / "scratchpad" / "hs-out" / "capabilities-body.html"
PARTIAL = "custom-templates/partials/capabilities-body.html"
SCOPE = "capabilities-content"
PAGE_ID = "218338735533"
PAGE = {
    "htmlTitle": "Akka Agentic AI Platform Capabilities Reference",
    "metaDescription": "This reference itemizes the capabilities of the Akka Agentic AI Platform across Akka SDK, "
                       "Akka Specify, Akka Verify and Akka Optimize.",
}
HUBL_HEADER = '<!--\n  templateType: "none"\n  isAvailableForNewContent: false\n-->\n'


def scope_selector(sel, scope):
    scoped = []
    for p in [p.strip() for p in sel.split(",") if p.strip()]:
        if p == "*":
            scoped.append(f".{scope} *")
        elif p.startswith(("html", "body")):
            scoped.append(re.sub(r"^(html|body)", f".{scope}", p))
        elif p.startswith(":root"):
            scoped.append(re.sub(r"^:root", f".{scope}", p))
        else:
            scoped.append(f".{scope} {p}")
    return ", ".join(scoped)


def scope_css(css, scope):
    """Prefix every selector with .<scope> so the page's styles stay inside it.

    The rules inside @media and @supports are scoped too; @keyframes and @font-face pass
    through. html, body and :root map to the scope itself, and * to its descendants.
    """
    css = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
    out, i = [], 0
    while True:
        open_at = css.find("{", i)
        if open_at < 0:
            return "".join(out)
        sel = css[i:open_at].strip()
        depth, j = 1, open_at + 1
        while depth:
            depth += {"{": 1, "}": -1}.get(css[j], 0)
            j += 1
        inner = css[open_at + 1:j - 1]
        if sel.startswith(("@media", "@supports")):
            out.append(f"{sel} {{\n{scope_css(inner, scope)}}}\n")
        elif sel.startswith("@"):
            out.append(f"{sel} {{{inner}}}\n")
        else:
            out.append(f"{scope_selector(sel, scope)} {{{inner}}}\n")
        i = j


def build():
    src = SRC.read_bytes().decode("utf-8").replace("\r\n", "\n")
    css = re.search(r"<style[^>]*>(.*?)</style>", src, re.S).group(1)
    body = re.search(r"<body[^>]*>(.*?)</body>", src, re.S).group(1).strip()
    out = (HUBL_HEADER + "<style>\n" + scope_css(css, SCOPE).strip() + "\n</style>\n"
           + f'<div class="{SCOPE}">\n' + body + "\n</div>\n")
    for d in ("{{", "{%", "{#"):
        if d in out[len(HUBL_HEADER):]:
            sys.exit(f"capabilities: HubL delimiter {d!r} in content")
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_bytes(out.encode("utf-8"))
    print("built", OUT, f"({len(out)} bytes)")
    return out


def page_draft_matches_live():
    # push-live publishes the whole draft, so an unpublished edit made in HubSpot would go
    # live with this one. Stop instead.
    live = json.loads(_curl([f"{API}/cms/v3/pages/site-pages/{PAGE_ID}"]))
    draft = json.loads(_curl([f"{API}/cms/v3/pages/site-pages/{PAGE_ID}/draft"]))
    keys = ("widgets", "layoutSections", "htmlTitle", "metaDescription", "templatePath")
    differ = [k for k in keys if live.get(k) != draft.get(k)]
    if differ:
        sys.exit(f"/platform/capabilities has unpublished draft changes in {differ}; publish or discard them first")


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--push", action="store_true")
    ap.add_argument("--push-live", action="store_true")
    a = ap.parse_args()
    out = build()
    if a.push or a.push_live:
        if "data-tyler-slot" in out:
            sys.exit("capabilities/index.html still has copy slots for Tyler; fill them before publishing")
        if a.push_live:
            page_draft_matches_live()
        put_source(PARTIAL, OUT)
    if a.push_live:
        r = json.loads(_json_call("PATCH", f"/cms/v3/pages/site-pages/{PAGE_ID}", PAGE))
        if r.get("htmlTitle") != PAGE["htmlTitle"]:
            sys.exit(f"page update failed: {str(r)[:300]}")
        push_live(PAGE_ID, "https://akka.io/platform/capabilities")
