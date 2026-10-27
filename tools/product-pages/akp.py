"""Shared build steps for the product pages.

website/product-pages/ holds the reviewed source: every text block carries data-src/data-ref
review notes, and two headlines are still copy slots. publishable() turns a source page into the
page a visitor sees. scoped_body() turns that page into a body that can sit inside the live
akka.io theme: the content goes under .akp and every class gains an ak- prefix, so the theme's own
.row, table and tab styles cannot reach it.
"""
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SRC = ROOT / "website" / "product-pages"
TOOLS = Path(__file__).resolve().parent

PAGES = ["overview.html", "sdk.html", "specify.html", "verify.html", "optimize.html"]
META = {
    "overview.html": "We provide a platform for scaling AI, efficiently.",
    "sdk.html": "Akka SDK is the component model for building agentic systems.",
    "specify.html": "Akka Specify builds agentic systems from your specifications and releases only what meets your definition of done.",
    "verify.html": "Akka Verify applies any control to any AI system and guarantees its enforcement.",
    "optimize.html": "Akka Optimize puts each request on the best model for the task, including smaller models trained on your data.",
}
REVIEW_ATTR = re.compile(r'\s(?:data-src|data-ref|data-badge|data-d2-live|data-d2-new)="[^"]*"')
SLOT = r'<div class="slot h rv d1"><b>Tyler · headline</b>.*?</div>'
# Headlines for the two copy slots in the source pages, approved by Tyler.
DRAFTS = {
    "specify.html": '<h2 class="h2 wide rv d1">Test, evaluate and red-team <span class="accent">before release.</span></h2>',
    "optimize.html": '<h2 class="h2 wide rv d1">Prove every model change on <span class="accent">live traffic.</span></h2>',
}
FAVICON = '<link rel="icon" href="https://akka.io/favicon.ico" type="image/x-icon">'
FONTS = ('<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
         '<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=optional" rel="stylesheet">')


def publishable(name):
    """The source page with the review layer removed and the draft headlines in place."""
    s = (SRC / name).read_text(encoding="utf-8")
    if name == "sdk.html":
        i = s.index("<!-- 5 · Governance APIs in SDK 3.7.0 -->")
        j = s.index("<!-- 6 · The guarantee -->")
        s = s[:i] + s[j:]
    if name in DRAFTS:
        s = re.sub(SLOT, DRAFTS[name], s, count=1, flags=re.S)
    if 'class="slot' in s:
        raise SystemExit(f"{name}: a copy slot is still open")
    s = REVIEW_ATTR.sub("", s)
    s = s.replace(FAVICON, '<meta name="description" content="%s">\n%s' % (META[name], FAVICON), 1)
    for bad in ("Tyler", "DRAFT", "fact check", "mock"):
        if bad in s:
            raise SystemExit(f"{name}: review text {bad!r} left in the page")
    return s


def used_images(pages):
    found = set()
    for s in pages:
        found |= set(re.findall(r"img/([a-z0-9-]+\.webp)", s))
    return sorted(found)


def build_pro(out):
    """Write the standalone pages (their own header and footer) to out."""
    shutil.rmtree(out, ignore_errors=True)
    (out / "assets").mkdir(parents=True)
    (out / "img").mkdir()
    pages = {p: publishable(p) for p in PAGES}
    for p, s in pages.items():
        (out / p).write_text(s, encoding="utf-8")
    for f in used_images(pages.values()):
        shutil.copy2(SRC / "img" / f, out / "img" / f)
    shutil.copytree(SRC / "apps", out / "apps")
    shutil.copy2(SRC / "assets" / "site.css", out / "assets" / "site.css")
    js = (SRC / "assets" / "site.js").read_text(encoding="utf-8")
    i = js.index("  /* ---------- review layer ---------- */")
    j = js.index("  /* ---------- install chip copy ---------- */")
    js = REVIEW_ATTR.sub("", (js[:i] + js[j:]).replace('\\"', '"'))
    js = js.replace('href="home.html" aria-label="Akka home"', 'href="https://akka.io/" aria-label="Akka home"')
    js = js.replace("'</div><div class=\"fine\">Mock of proposed changes · 2026-10-26 · not published · <a href=\"index.html\">mock index</a></div>'",
                    "'</div><div class=\"fine\">©2026 Lightbend, Inc. dba Akka. All rights reserved.</div>'")
    js = js.replace("/* akka.io product pages mock: shared chrome, review layer and small behaviours. */",
                    "/* akka.io product pages: shared chrome and page behaviours. */")
    for bad in ("Mock of proposed", "rv-dock", "review"):
        if bad in js:
            raise SystemExit(f"site.js: review code {bad!r} left in")
    (out / "assets" / "site.js").write_text(js, encoding="utf-8")
    return pages


# ---------- scoping inside the live theme ----------

# Classes the page script toggles by name stay unprefixed.
KEEP = {"akp", "on", "in", "copied", "js", "hot"}


def _prefix_selector(sel):
    return re.sub(r"\.([A-Za-z][\w-]*)", lambda m: "." + (m.group(1) if m.group(1) in KEEP else "ak-" + m.group(1)), sel)


def prefix_classes(html):
    def cls(m):
        toks = [t if t in KEEP else "ak-" + t for t in m.group(2).split()]
        return "class=%s%s%s" % (m.group(1), " ".join(toks), m.group(1))
    return re.sub(r"class=([\"'])([^\"']*)\1", cls, html)


def _scope_sel(sel):
    sel = _prefix_selector(sel.strip())
    if not sel or sel.startswith("html.review"):
        return None
    if sel.startswith("html.js "):
        return "html.js .akp " + sel[len("html.js "):]
    if sel in (":root", "html", "body"):
        return ".akp"
    if sel == "*":
        return ".akp, .akp *"
    return ".akp " + sel


def _scope_block(css):
    out, i = [], 0
    while i < len(css):
        j = css.find("{", i)
        if j < 0:
            break
        head = css[i:j].strip()
        depth, k = 1, j + 1
        while depth:
            depth += {"{": 1, "}": -1}.get(css[k], 0)
            k += 1
        body = css[j + 1:k - 1]
        if head.startswith("@media"):
            out.append(head + "{" + _scope_block(body) + "}")
        elif head.startswith(("@keyframes", "@font-face")):
            out.append(head + "{" + body + "}")
        else:
            sels = [s for s in (_scope_sel(x) for x in head.split(",")) if s]
            if sels:
                out.append(", ".join(sels) + "{" + body + "}")
        i = k
    return "\n".join(out)


# Resets for what the live theme sets on bare elements and on its own class names.
THEME_RESETS = (
    "\n.akp{font:400 16px/1.6 var(--sans);background:var(--black);color:var(--white);padding-top:0}"
    "\n.akp main{padding-top:0}"
    "\n.akp h1,.akp h2,.akp h3,.akp h4,.akp p,.akp li,.akp td{font-family:var(--sans)}"
    "\n.akp h1,.akp h2,.akp h3,.akp h4{color:var(--white);text-transform:none}"
    "\n.akp .ak-slide.ak-full{min-height:calc(100vh - 78px)}"
    "\n.akp table,.akp tbody,.akp tr,.akp td,.akp th{background:transparent!important;box-shadow:none!important;border-left:0!important;border-right:0!important}"
    "\n.akp figure{margin:0;padding:0}\n.akp ul,.akp ol{margin:0;padding:0}\n.akp p{margin:0}"
    "\n.akp img{height:auto;max-width:100%}\n.akp pre{white-space:pre}"
    "\n.akp .ak-shots-3 .ak-shot img,.akp .ak-shots-2 .ak-shot img,.akp .ak-loop-cols .ak-shot img"
    "{aspect-ratio:16/10;object-fit:cover;object-position:top left;width:100%}"
    "\n.akp .ak-thin td.ak-go a{font:500 20px/1 var(--sans);color:var(--blue);letter-spacing:0}"
    "\n.akp .ak-thin td{border-bottom:1px solid var(--hair)!important;border-top:0!important}"
    "\n.akp .ak-thin tr:first-child td{border-top:1px solid var(--hair)!important}"
    "\n.akp .ak-thin tr.ak-row-link:hover td{background:linear-gradient(90deg,rgba(0,219,221,.06),transparent 70%)!important}\n"
    # The live footer shows its install box only on pages with no install button of their own;
    # the live product pages carry one, so the box is hidden on these URLs today.
    ".footer-2026-mega .footerInstall{display:none}\n"
)


def scoped_css():
    css = re.sub(r"/\*.*?\*/", "", (SRC / "assets" / "site.css").read_text(encoding="utf-8"), flags=re.S)
    return _scope_block(css) + THEME_RESETS


def embed_js():
    return (TOOLS / "akp_embed.js").read_text(encoding="utf-8")


def scoped_body(page, links, img_base, apps_base):
    """The page's <main>, with its page links mapped through links, its img/ and apps/ paths moved
    to img_base and apps_base, and its classes prefixed. Returns (main, <title>, description tag)."""
    main = page[page.index("<main>"):page.index("</main>") + len("</main>")]
    for f, url in links.items():
        main = re.sub(r'href="%s(#[^"]*)?"' % re.escape(f), lambda m: 'href="%s%s"' % (url, m.group(1) or ""), main)
    main = re.sub(r"(?<![/\w])apps/", apps_base, main)
    main = re.sub(r"(?<![/\w])img/", img_base, main)
    title = re.search(r"<title>.*?</title>", page, re.S).group(0)
    desc = re.search(r'<meta name="description" content="[^"]*">', page).group(0)
    return prefix_classes(main), title, desc
