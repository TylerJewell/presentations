# akka.io /platform pages, as published until October 2026

These are the five product pages that akka.io served at /platform/overview, /platform/sdk,
/platform/specify, /platform/verify and /platform/optimize before the rebuilt product pages
replaced them. They were captured from the live site on 2026-10-26.

Each folder holds:

- `index.html`: the rendered page, with every image, stylesheet, script and embedded demo hosted on
  akka.io saved under `assets/`, so it opens from disk. Fonts and a few libraries still load from
  their CDNs.
- `hubspot/`: the HubSpot template (`akka-<page>-wrapper.html`) and the three partials it includes
  (`<page>-styles.html`, `<page>-body.html`, `<page>-scripts.html`), as published.

`manifest.json` records each page's URL, HubSpot page id, template path and partials.

## Restoring a page on akka.io

The wrapper templates and partials were left in place in HubSpot under `custom-templates/`. To put
a page back, set its `templatePath` to the wrapper listed in `manifest.json` and push the page live:

    PATCH /cms/v3/pages/site-pages/<page id>/draft   {"templatePath": "custom-templates/akka-<page>-wrapper.html"}
    POST  /cms/v3/pages/site-pages/<page id>/draft/push-live

The deck sources these pages were ported from remain in `sales-presentation/` and are ported by
`tools/hubspot/port_deck.py`.
