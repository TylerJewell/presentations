# Home stills: design brief (v3)

## Where they show
In the akka.io home page carousel (`http://127.0.0.1:8713/home-preview.html`, served from another project),
each still shows at about **769 x 431 CSS px**, beside the four offerings. The files are 2560x1440 (retina) and
1280x720.

## The benchmark
`out/4-active-active-1280.png`, the reliability tester captured at 1280 px at 2x. In the carousel it is sharp,
clean and easy to read, for three reasons:
- **Large type.** Its titles are about 22 px, its body text 15 to 16 px and its log 12 to 13 px mono, in a
  layout about 1140 px wide, so at 769 px the smallest text is still about 9 px and most of it 10 to 15 px.
- **Few things.** Two big region cards and the link between them, four team cards and one log. Every element
  is large and has room.
- **Real UI.** It is the product, not an illustration: real chrome, real chips, real data.

The v2 redraws (`x/v2/`) lay the console out at 1200 px with the console's own 12 to 13 px type and dense
tables, so in the carousel the text drops to about 7 to 8 px, and there is too much on screen.

## The rules for v3
- **Lay out at 800 x 450 CSS px**, scaled by 3.2 (`transform: scale(3.2)`, origin 0 0) inside the
  2560x1440 `#root`. At 769 px the still then shows almost at 1:1.
- **Type at console sizes for that frame:** body 14 to 16 px, titles 18 to 24 px, the smallest label 11 px
  (mono figures 12 px). Nothing smaller.
- **One subject per still, and about a third of the content of v2.** Choose the few rows, cards and nodes
  that tell the story; leave the rest out instead of dimming them. Empty space is allowed.
- **It must still look like a screenshot of the console:** its dark theme (`#0b0b0d` page, `#161619` cards,
  hairlines), its chips, tables and type (Instrument Sans, JetBrains Mono for code, ids and figures), with real
  labels and figures from the tour screenshots. A sliver of real chrome (a page title, a breadcrumb, a tab bar)
  is welcome when it helps it read as the product.
- **Highlights and callouts:** at most one yellow callout, only where it adds something, never over its
  subject. Stills 2, 3 and 4 have none. Prefer no dimming: with less content, the subject stands out on its
  own.
- **Check it the way it is seen:** downscale the 1280 capture to 769 px wide and compare it with active-active
  at the same size.
