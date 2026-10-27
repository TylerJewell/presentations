#!/usr/bin/env python3
"""Publish the product pages on akka.io, staged for review or at the live /platform URLs.

The pages come from website/product-pages/ through tools/product-pages/akp.py: the review
layer is removed and the content is scoped under .akp so it sits inside the site header and
footer. Each page gets its own template. Staged pages are published at
/preview/platform/<page> with a noindex tag, and links between them stay inside /preview/.
With --live, the existing /platform/<page> pages are switched to the new templates and keep
their page records; the templates they used before stay in HubSpot.

    python tools/hubspot/port_product_pages.py                   # build into scratchpad/hs-out/product-preview/
    python tools/hubspot/port_product_pages.py --assets          # upload the images and the reliability app
    python tools/hubspot/port_product_pages.py --push            # PUT the templates, publish the five pages
    python tools/hubspot/port_product_pages.py --live [--assets] [--push]   # the same, for /platform/<page>

The token comes from the gitignored scratchpad/.hs_env.
"""
import argparse
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "product-pages"))
from port_tour import _json_call, _curl, API, IMG_FOLDER_PARENT, put_source, push_live  # noqa: E402
import akp  # noqa: E402

ROOT = Path(__file__).resolve().parents[2]
MODES = {
    "preview": {"slug": "preview/platform/", "folder": "product-pages-preview", "tpl": "product-preview-",
                "label": "Product page preview - ", "access": "PUBLIC_NOT_INDEXABLE",
                "robots": '<meta name="robots" content="noindex, nofollow">'},
    "live": {"slug": "platform/", "folder": "product-pages", "tpl": "product-",
             "label": "Product page - ", "access": "PUBLIC_INDEXABLE", "robots": ""},
}
MODE = MODES["live" if "--live" in sys.argv else "preview"]
OUT = ROOT / "scratchpad" / "hs-out" / MODE["tpl"].rstrip("-")
FOLDER = MODE["folder"]
ASSET_BASE = f"https://akka.io/hubfs/website/{FOLDER}/"
SLUG = {p: MODE["slug"] + p[:-5] for p in akp.PAGES}
LINKS = {p: "/" + s for p, s in SLUG.items()}

SHELL = """<!--
    templateType: page
    isAvailableForNewContent: false
    label: {label}
-->
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    {title}
    {desc}
    {robots}
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="https://akka.io/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="https://akka.io/hubfs/hub_generated/template_assets/1/180483679747/1783700344298/template_Plugin.min.css">
    <link rel="stylesheet" href="https://akka.io/hubfs/hub_generated/template_assets/1/177749484047/1783700345343/template_main.css">
    <link rel="stylesheet" href="https://akka.io/hubfs/hub_generated/template_assets/1/177749412157/1785440087003/template_theme-overrides.css">
    <link rel="stylesheet" href="https://akka.io/hubfs/hub_generated/template_assets/1/177760109709/1783700345998/template_Dev1.min.css">
    {fonts}
    {{{{ standard_header_includes }}}}
    <style>
{css}
    </style>
  </head>
  <body>
    {{% global_partial path="AKKA-2024/templates/partials/header-april.html" %}}
<div class="akp">{main}</div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="https://akka.io/hubfs/hub_generated/template_assets/1/177749484049/1783700343576/template_main.min.js"></script>
    <script>
{js}
    </script>
    {{% global_partial path="AKKA-2024/templates/partials/footer.html" %}}
    {{{{ standard_footer_includes }}}}
  </body>
</html>
"""


def no_hubl(name, text):
    # The template is rendered as HubL; a stray delimiter in the content would be parsed.
    for d in ("{{", "{%", "{#"):
        if d in text:
            sys.exit(f"{name}: HubL delimiter {d!r} in content")


def build():
    pages = {p: akp.publishable(p) for p in akp.PAGES}
    css, js = akp.scoped_css(), akp.embed_js()
    no_hubl("css", css)
    no_hubl("js", js)
    OUT.mkdir(parents=True, exist_ok=True)
    built = {}
    for name, page in pages.items():
        main, title, desc = akp.scoped_body(page, LINKS, ASSET_BASE, ASSET_BASE)
        no_hubl(name, main)
        # The label sits in the template's YAML header, so it carries no colon.
        tpl = SHELL.format(label=MODE["label"] + name[:-5], title=title, desc=desc, robots=MODE["robots"],
                           fonts=akp.FONTS, css=css, main=main, js=js)
        path = OUT / (MODE["tpl"] + name)
        path.write_text(tpl, encoding="utf-8")
        built[name] = (path, title)
    assets = [akp.SRC / "img" / f for f in akp.used_images(pages.values())] + [akp.SRC / "apps" / "reliability.html"]
    print("built", len(built), "templates in", OUT, "with", len(assets), "assets")
    return built, assets


def upload_assets(assets):
    found = json.loads(_curl([f"{API}/files/v3/folders/search?path=/website/{FOLDER}&limit=5"]))
    fid = next((f["id"] for f in found.get("results", []) if f.get("path") == "/website/" + FOLDER), None)
    if not fid:
        r = json.loads(_json_call("POST", "/files/v3/folders", {"name": FOLDER, "parentFolderId": IMG_FOLDER_PARENT}))
        fid = r.get("id") or sys.exit(f"folder create failed: {r}")
    opts = json.dumps({"access": MODE["access"], "overwrite": True})
    for f in assets:
        # The file manager adds the extension for images but stores an HTML file without one.
        name = f.name if f.suffix == ".html" else f.stem
        r = json.loads(_curl(["-X", "POST", API + "/files/v3/files", "-F", f"file=@{f}",
                              "-F", f"folderId={fid}", "-F", f"fileName={name}", "-F", f"options={opts}"]))
        if not r.get("url"):
            sys.exit(f"upload failed for {f.name}: {str(r)[:300]}")
    print(f"  uploaded {len(assets)} assets to /website/{FOLDER}")


def publish(name, tpl_path, title):
    template = "custom-templates/" + tpl_path.name
    put_source(template, tpl_path)
    slug = SLUG[name]
    found = json.loads(_curl([API + "/cms/v3/pages/site-pages?limit=5&slug=" + slug]))
    pid = next((p["id"] for p in found.get("results", []) if p["slug"] == slug), None)
    if MODE is MODES["live"]:
        # A live page keeps its record, name and slug; only its template and metadata change.
        if not pid:
            sys.exit(f"{name}: no live page at /{slug}")
        _json_call("PATCH", "/cms/v3/pages/site-pages/" + pid, {
            "templatePath": template, "htmlTitle": title[len("<title>"):-len("</title>")],
            "metaDescription": akp.META[name]})
        push_live(pid, "https://akka.io/" + slug)
        return
    body = {"name": "Preview · " + name[:-5], "slug": slug, "templatePath": template,
            "htmlTitle": title[len("<title>"):-len("</title>")], "metaDescription": akp.META[name],
            "state": "PUBLISHED", "publishImmediately": True, "language": "en", "subcategory": "site_page"}
    r = json.loads(_json_call("PATCH", "/cms/v3/pages/site-pages/" + pid, body) if pid
                   else _json_call("POST", "/cms/v3/pages/site-pages", body))
    pid = pid or r.get("id")
    if not pid:
        sys.exit(f"{name}: page publish failed: {str(r)[:300]}")
    push_live(pid, "https://akka.io/" + slug)


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--assets", action="store_true")
    ap.add_argument("--push", action="store_true")
    ap.add_argument("--live", action="store_true")
    a = ap.parse_args()
    built, assets = build()
    if a.assets:
        upload_assets(assets)
    if a.push:
        for name, (path, title) in built.items():
            publish(name, path, title)
