#!/usr/bin/env python3
"""Publish the home page's install placements.

    python tools/hubspot/port_home.py          # print the planned page edits
    python tools/hubspot/port_home.py --push   # edit and publish the page

--push points the closing strip's "Start Building" button at /install and adds the
SoftwareApplication JSON-LD to the page head. The token comes from the gitignored
scratchpad/.hs_env.
"""
import argparse
import json
import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from port_tour import _json_call, _curl, API, push_live  # noqa: E402

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "scratchpad" / "hs-out"

PAGE_ID = "210655290656"
LINKS = "widget_1775720891298"    # Home links: Platform Overview, Request a Demo, Start Building
START_BUILDING = "https://akka.io/install"

JSON_LD = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Akka",
    "applicationCategory": "DeveloperApplication",
    "url": "https://akka.io/",
    "installUrl": "https://akka.ai/",
    "publisher": {"@type": "Organization", "name": "Akka", "url": "https://akka.io/"},
}
LD_TAG = '<script type="application/ld+json">' + json.dumps(JSON_LD, ensure_ascii=False) + "</script>"


def find(node, name):
    if isinstance(node, dict):
        if node.get("name") == name:
            return node
        for v in node.values():
            hit = find(v, name)
            if hit:
                return hit
    elif isinstance(node, list):
        for v in node:
            hit = find(v, name)
            if hit:
                return hit


def edit(page):
    """Apply the placements to a page record in place and return what changed."""
    changes = []
    links = find(page["layoutSections"], LINKS)
    button = next(b for b in links["params"]["buttons"] if b["blabel"] == "Start Building")
    url = button["link"]["url"]
    if url.get("href") != START_BUILDING:
        changes.append(f"Start Building: {url.get('href') or url} -> {START_BUILDING}")
        button["link"]["url"] = {"href": START_BUILDING, "type": "EXTERNAL"}
    head = page.get("headHtml") or ""
    if '"installUrl"' not in head:
        page["headHtml"] = (head + "\n" + LD_TAG).strip()
        changes.append("headHtml: add SoftwareApplication JSON-LD")
    return changes


def draft_matches_live():
    # push-live publishes the whole draft, so an unpublished edit made in HubSpot would go
    # live with these. Stop instead.
    live = json.loads(_curl([f"{API}/cms/v3/pages/site-pages/{PAGE_ID}"]))
    draft = json.loads(_curl([f"{API}/cms/v3/pages/site-pages/{PAGE_ID}/draft"]))
    keys = ("layoutSections", "widgets", "widgetContainers", "htmlTitle", "metaDescription",
            "templatePath", "headHtml")
    differ = [k for k in keys if live.get(k) != draft.get(k)]
    if differ:
        sys.exit(f"home page has unpublished draft changes in {differ}; publish or discard them first")
    return draft


def push():
    draft = draft_matches_live()
    OUT.mkdir(parents=True, exist_ok=True)
    backup = OUT / time.strftime(f"home-page-{PAGE_ID}-%Y%m%d-%H%M%S.json")
    backup.write_text(json.dumps(draft, indent=1, ensure_ascii=False), encoding="utf-8")
    print("  backed up the home page draft to", backup)

    changes = edit(draft)
    if not changes:
        sys.exit("home page already carries these placements")
    body = {"layoutSections": draft["layoutSections"], "headHtml": draft["headHtml"]}
    r = json.loads(_json_call("PATCH", f"/cms/v3/pages/site-pages/{PAGE_ID}/draft", body))
    if find(r.get("layoutSections", {}), LINKS) is None:
        sys.exit(f"draft update failed: {str(r)[:300]}")
    for c in changes:
        print("  " + c)
    push_live(PAGE_ID, "home page")


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--push", action="store_true")
    a = ap.parse_args()
    if a.push:
        push()
    else:
        page = json.loads(_curl([f"{API}/cms/v3/pages/site-pages/{PAGE_ID}"]))
        for c in edit(page) or ["no changes"]:
            print("would change:", c)
