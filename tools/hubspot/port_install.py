#!/usr/bin/env python3
"""Publish akka.io/install from website/install.html.

website/install.html holds the page between its install:start/install:end markers. Its
harness list is generated from the playbook table in akka-ai/llms.txt. The page carries the
install line component (tools/hubspot/install_line.py).

    python tools/hubspot/port_install.py            # regenerate the harness list, build into scratchpad/hs-out/
    python tools/hubspot/port_install.py --check    # exit 1 when the harness list is stale
    python tools/hubspot/port_install.py --push     # PUT the template, point the page at it, publish

The page has its own template. The blog-preview wrapper carries noindex,nofollow and is
for previews of published posts only.
"""
import argparse
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import install_line  # noqa: E402
from port_tour import SHELL, _json_call, _curl, API, put_source, push_live  # noqa: E402

ROOT = Path(__file__).resolve().parents[2]
SRC = ROOT / "website" / "install.html"
PLAYBOOK = ROOT / "akka-ai" / "llms.txt"
OUT = ROOT / "scratchpad" / "hs-out"

PAGE_ID = "222019977884"
TEMPLATE = "custom-templates/install.html"
PAGE = {
    "label": "Install Akka",
    "title": "Install Akka",
    "description": "Install Akka into any AI harness: paste “install Akka from akka.ai” "
                   "and your harness handles the rest.",
}

# Playbook harness name -> (name on the page, link). A playbook row missing here stops the
# build, so a harness added to akka.ai cannot be left off the page by accident.
HARNESSES = {
    "Claude Code": ("Claude Code", "https://claude.com/product/claude-code"),
    "Antigravity (`agy`)": ("Antigravity", "https://antigravity.google/"),
    "Gemini CLI": ("Gemini CLI", "https://github.com/google-gemini/gemini-cli"),
    "Codex CLI": ("Codex CLI", "https://github.com/openai/codex"),
    "Cursor": ("Cursor", "https://cursor.com/"),
    "VS Code + GitHub Copilot": ("GitHub Copilot in VS Code", "https://github.com/features/copilot"),
    "Visual Studio 2022/2026 + Copilot": ("GitHub Copilot in Visual Studio",
                                          "https://visualstudio.microsoft.com/github-copilot/"),
    "Roo Code": ("Roo Code", "https://roocode.com/"),
    "Trae": ("Trae", "https://www.trae.ai/"),
    "Factory (Droid)": ("Factory", "https://factory.com/"),
    "Cognition Devin": ("Devin", "https://devin.ai/"),
    "JetBrains Junie": ("Junie", "https://junie.jetbrains.com/"),
    "GitHub Copilot coding agent": ("GitHub Copilot coding agent",
                                    "https://docs.github.com/en/copilot/concepts/agents/cloud-agent"),
    "Google Jules": ("Jules", "https://jules.google/"),
    "Warp": ("Warp", "https://www.warp.dev/"),
    "Zed": ("Zed", "https://zed.dev/"),
    "Claude Tag (Slack)": ("Claude Tag", "https://claude.com/product/tag"),
    "Claude.ai chat with Projects": ("Claude.ai", "https://claude.ai/"),
    "Aider": ("Aider", "https://aider.chat/"),
    "Sourcegraph Cody": ("Cody", "https://sourcegraph.com/cody"),
}
# Rows that name a group or a catch-all get the agent-neutral fallback, so they stay off
# the "Tested with" list.
NOT_LISTED = {
    "Cline, Kilo Code, Replit Agent, Copilot in JetBrains / Xcode / Neovim",
    "Any harness not listed",
}


def playbook_harnesses():
    text = PLAYBOOK.read_text(encoding="utf-8")
    table = text[text.index("| Harness | Path | Install target |"):]
    names = []
    for line in table.splitlines()[2:]:
        if not line.startswith("|"):
            break
        names.append(line.split("|")[1].strip())
    unknown = [n for n in names if n not in HARNESSES and n not in NOT_LISTED]
    if unknown:
        sys.exit(f"playbook harnesses with no entry in HARNESSES: {unknown}")
    gone = [n for n in HARNESSES if n not in names]
    if gone:
        sys.exit(f"HARNESSES lists rows the playbook no longer has: {gone}")
    return sorted((HARNESSES[n] for n in names if n in HARNESSES), key=lambda h: h[0].casefold())


def harness_html():
    links = [f'<a href="{url}">{name}</a>' for name, url in playbook_harnesses()]
    return ", ".join(links[:-1]) + ", and " + links[-1]


def fill(text, name, html):
    a, b = f"<!-- {name}:start -->", f"<!-- {name}:end -->"
    i = text.index(a) + len(a)
    return text[:i] + html + text[text.index(b, i):]


def regenerate(check):
    s = SRC.read_bytes().decode("utf-8")
    new = fill(s, "harnesses", harness_html())
    if check:
        if new != s:
            sys.exit(f"{SRC.relative_to(ROOT)}: the harness list is stale")
        return
    if new != s:
        SRC.write_bytes(new.encode("utf-8"))
        print("regenerated the harness list in", SRC.relative_to(ROOT))
    install_line.sync(False, [SRC])


JSON_LD = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Akka",
    "applicationCategory": "DeveloperApplication",
    "url": "https://akka.io/install",
    "installUrl": "https://akka.ai/",
    "publisher": {"@type": "Organization", "name": "Akka", "url": "https://akka.io/"},
}


def build():
    s = SRC.read_text(encoding="utf-8")
    body = s[s.index("<!-- install:start"):s.index("<!-- install:end -->")]
    body = ('<script type="application/ld+json">' + json.dumps(JSON_LD, ensure_ascii=False)
            + "</script>\n" + body)
    for d in ("{{", "{%", "{#"):
        if d in body:
            sys.exit(f"install page: HubL delimiter {d!r} in content")
    OUT.mkdir(parents=True, exist_ok=True)
    tpl = OUT / "install.html"
    tpl.write_text(SHELL.format(body=body, **PAGE), encoding="utf-8")
    print("built", tpl)
    return tpl, body


def page_draft_matches_live():
    # push-live publishes the whole draft, so an unpublished edit made in HubSpot would go
    # live with this one. Stop instead.
    live = json.loads(_curl([f"{API}/cms/v3/pages/site-pages/{PAGE_ID}"]))
    draft = json.loads(_curl([f"{API}/cms/v3/pages/site-pages/{PAGE_ID}/draft"]))
    keys = ("widgets", "layoutSections", "htmlTitle", "metaDescription", "templatePath")
    differ = [k for k in keys if live.get(k) != draft.get(k)]
    if differ:
        sys.exit(f"/install has unpublished draft changes in {differ}; publish or discard them first")


def push(tpl, body):
    if "data-tyler-slot" in body:
        sys.exit("website/install.html still has copy slots for Tyler; fill them before publishing")
    page_draft_matches_live()
    put_source(TEMPLATE, tpl)
    r = json.loads(_json_call("PATCH", f"/cms/v3/pages/site-pages/{PAGE_ID}", {
        "templatePath": TEMPLATE, "htmlTitle": PAGE["title"],
        "metaDescription": PAGE["description"]}))
    if r.get("templatePath") != TEMPLATE:
        sys.exit(f"page update failed: {str(r)[:300]}")
    push_live(PAGE_ID, "https://akka.io/install")


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--check", action="store_true")
    ap.add_argument("--push", action="store_true")
    a = ap.parse_args()
    regenerate(a.check)
    if not a.check:
        tpl, body = build()
        if a.push:
            push(tpl, body)
