#!/usr/bin/env python3
"""Report retired strings on akka.io pages, live or local.

    python tools/auditors/stale-strings/audit.py                  # the Wave 1 pages, live
    python tools/auditors/stale-strings/audit.py --wave 3         # also the strings Waves 2 and 3 retire
    python tools/auditors/stale-strings/audit.py PAGE...          # URLs or local files

Each pattern carries the wave that removes it; --wave N checks every pattern due by wave N.
Live fetches are spaced three seconds apart because akka.io's Cloudflare layer challenges
bursts, and a challenged page is reported as CHALLENGED, never as clean. Exit status is 1
when any page has a hit or could not be read.
"""
import argparse
import re
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

# (wave, label, regex[, hosts the pattern skips]). Plan §07 lists the strings; Wave 1 adds the
# install identifiers. akka.ai names the retired harnesses on purpose: the playbook tells an
# assistant they are unsupported.
PATTERNS = [
    (1, "old CLI install", r"akka code init"),
    (1, "old marketplace", r"claude-marketplace|akka-ai-marketplace"),
    (1, "old plugin id", r"akka-specify@|/akka-specify:"),
    (1, "retired harness", r"\bQodo\b|\bWindsurf\b", {"akka.ai"}),
    (1, "shell prompt on the instruction", r"\$\s*(?:</[^>]+>\s*)*install Akka from akka\.ai"),
    (1, "capitalised instruction", r"[“\"']Install Akka from akka\.ai"),
    (1, "link to retired page", r"href=\"(?:https://akka\.io)?/get-started/build"),
    (1, "CTA to own top", r"href=\"#s0\""),
    (1, "noindex", r"<meta name=\"robots\" content=\"noindex"),
    (2, "old pages", r"href=\"(?:https://akka\.io)?/old(?:-pricing)?[\"/]"),
    (2, "empty mailto", r"mailto:\""),
    (2, "old office", r"Lightbend offices"),
    (3, "old banner", r"Reliable AI for Every Industry"),
    (3, "offerings", r"four offerings"),
    (3, "short product name", r"Akka Platform\b"),
    (3, "corpus label", r"AI regulations"),
    (3, "pricing", r"Fixed price|\$\d[\d,]*(?:\.\d+)?\s*(?:/|per)\s*(?:month|hour|year)"),
    (3, "company age", r"\b\d{2}\+? years\b"),
    (3, "solutions on the platform", r"run on it|on its own|delivered through the platform"),
]

WAVE1 = [
    "https://akka.io/", "https://akka.io/install", "https://akka.io/platform/sdk",
    "https://akka.io/platform/verify", "https://akka.io/platform/specify",
    "https://akka.io/platform/optimize", "https://akka.io/platform/overview",
    "https://akka.io/platform/tour", "https://akka.io/guides",
    "https://akka.io/blog/introducing-akka-specify",
    "https://akka.io/blog/announcing-akkas-agentic-ai-release",
    "https://akka.io/blog/introducing-akkas-new-agent-component",
    "https://akka.io/llms.txt", "https://akka.ai/",
]
CHALLENGE = re.compile(r"Verifying you are human|Just a moment\.\.\.|cf-mitigated", re.I)


def read(page):
    if not page.startswith("http"):
        return Path(page).read_text(encoding="utf-8"), "local"
    req = urllib.request.Request(page, headers={"User-Agent": "Mozilla/5.0 (akka stale-string audit)"})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            body = r.read().decode("utf-8", errors="replace")
            status = f"{r.status} {r.geturl()}" if r.geturl() != page else str(r.status)
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", errors="replace")
        status = str(e.code)
    if CHALLENGE.search(body[:20000]) or status.startswith("429"):
        return None, "CHALLENGED " + status
    return body, status


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--wave", type=int, default=1)
    ap.add_argument("pages", nargs="*")
    a = ap.parse_args()
    sys.stdout.reconfigure(encoding="utf-8")
    pats = [(p[0], p[1], re.compile(p[2]), p[3] if len(p) > 3 else set()) for p in PATTERNS if p[0] <= a.wave]
    failed = False
    for i, page in enumerate(a.pages or WAVE1):
        if i and page.startswith("http"):
            time.sleep(3)
        body, status = read(page)
        if body is None:
            print(f"{page}\n  {status}")
            failed = True
            continue
        hits = []
        host = page.split("/")[2] if page.startswith("http") else ""
        for w, label, rx, skip in pats:
            if host in skip:
                continue
            for m in rx.finditer(body):
                line = body.count("\n", 0, m.start()) + 1
                hits.append(f"  wave {w}  {label}  line {line}: {m.group(0)[:80]!r}")
        print(f"{page}  [{status}]  {len(hits) or 'clean'}")
        for h in hits:
            print(h)
        failed |= bool(hits)
    sys.exit(1 if failed else 0)


if __name__ == "__main__":
    main()
