# akka.io pages built from this repo

akka.io is a HubSpot site. This table lists every akka.io page this repo produces, the file the page is
built from, and the command that publishes it. The HubSpot token for every command is in the gitignored
`scratchpad/.hs_env`. `tools/auditors/hubspot-ready/PUBLISHING.md` holds the HubSpot API details and the
rendering faults each port works around.

Every URL in the tables returned HTTP 200 on 2026-11-14.

## Pages with a publish script

| URL | Source | Publish |
|---|---|---|
| `/` (home page edits only) | `website/home-video/band.html` (both film bands), `website/console-tour/home-band.html`, `website/home-content/bar.html` | `port_home_video.py --push`, `port_tour.py --push`, `port_home_content.py --push`, `port_home.py --push` |
| `/platform/overview`, `/platform/sdk`, `/platform/specify`, `/platform/verify`, `/platform/optimize` | `website/product-pages/` through `tools/product-pages/akp.py` | `port_product_pages.py --live --push` |
| `/platform/capabilities` | `capabilities/index.html` | `port_capabilities.py --push-live` |
| `/platform/tour` | `website/console-tour/` | `port_tour.py --push` |
| `/install` | `website/install.html` | `port_install.py --push` |
| `/guides` and the 44 pages under it | `website/guides.html`, `website/guides-*.html` | `port_guides.py --push` |
| `/calculator`, `/sovereign` | `physical.html` and `sovereign.html` in the `~/calculator` working tree | `port_calculator.py --push` |
| `/demo` | `website/demo/page.html`; the film is uploaded by `port_home_video.py --video` | `port_demo_page.py --push` |
| `/roi` | `website/roi/page.html`; the film is `website/demo/roi/out/akka-total-roi.mp4` | `port_roi_page.py --video PATH`, then `--push` |
| Technical blog posts | `blog-technical/posts/<slug>.html` | `tools/blog-technical/port.py <slug>` |
| Site header and footer | `tools/hubspot/chrome/` | `port_chrome.py --push` |
| Install button on every page | `tools/hubspot/install-line/` | `install_line.py --push` |
| 301 redirects for retired paths | the table in `redirects.py` | `redirects.py --push` |

Scripts without a directory are in `tools/hubspot/`. Run them with `py -3`.

## Pages without a publish script

The live templates for these pages were edited in HubSpot by one-off scripts in the gitignored
`scratchpad/`. The repo file is the approved text, but no command rebuilds the live page from it, and the
two have drifted apart before.

| URL | Source |
|---|---|
| `/compare/akka-vs-<name>` | `comparisons/compare-<name>.html` |
| `/customer-stories/<customer>` | `case-studies/<customer>.html`, with HubSpot exports in `case-studies/hubspot/` |
| `/industries`, `/industries/<industry>` | `website/index.html`, `website/industry-<industry>.html` |
| `/efficiency` | `website/efficiency.html` |
| `/blog` posts other than the technical posts | HubSpot only; see `PUBLISHING.md` section 3 |
| `/llms.txt`, `/llms-full.txt` | `llms/`; see the llms section of `PUBLISHING.md` |

## Pages whose sources are kept out of git

`/bae` and `/rbc` are unlisted pages for named customers. Their pages and publish scripts are in the
gitignored `_internal/bae/` and `_internal/rbc/`.

## Retired

The `/platform/<deck>` pages served the sales decks through `tools/hubspot/port_deck.py` until
2026-10-27, when the product pages replaced them. The branch `platform-pages-archive` holds those pages
and their templates as published on that date.
