# gdoc-restyle

gdoc-restyle rebuilds a Google Doc in the AAO white paper style and uploads the result as a new Google Doc. The author's text is carried over word for word. The style tokens come from the AAO white paper print skin at `~/docs/docs/bin/whitepaper/print.css`.

The Drive connector can create, copy and export files. The connector cannot change formatting inside an existing Google Doc, so a restyle always produces a new document next to the original.

## Steps

1. Export the source doc as HTML with the Drive connector: `download_file_content` with `exportMimeType: text/html`. An export over the inline limit is saved to a JSON file, and every script here reads that file directly.
2. Run `python tools/gdoc-restyle/parse_export.py <export> blocks.json`. The script prints each heading, paragraph, list and table so the parse can be checked against the doc. `P*` marks a highlighted paragraph.
3. Run `python tools/gdoc-restyle/build_docx.py blocks.json out.docx --title "<Drive title>" --meta "Akka · September 2026"`. The build writes `out.docx` and `out.docx.b64`.
4. Upload with `create_file`, with `contentMimeType` set to `application/vnd.openxmlformats-officedocument.wordprocessingml.document` and `base64Content` set to the contents of `out.docx.b64`. Drive converts the upload to a Google Doc.
5. Export the new doc as HTML and as PDF. Run `python tools/gdoc-restyle/verify.py <source-export> <new-html-export> --pdf <new-pdf-export> --png-dir <dir>` and read the page images.

`verify.py` prints the words found in only one of the two documents. The expected differences are the cover lines, the footer, the dropped table-of-contents placeholder, and the typed hyphens that became bullets.

## Formatting the build applies

| Element | Treatment |
|---|---|
| Cover | Gradient brand bar. The part of the title before " — " is a teal Roboto Mono eyebrow, and the rest is the title in 42pt gold Instrument Sans. The `--meta` line sits below it. |
| Named styles | Normal is 10.5pt Instrument Sans. Heading 1 is 19pt at weight 500 with a grey rule below. Heading 2 is 13.5pt bold. Paragraphs added later in Docs take the same styles. |
| Tables | The header row is grey with a gold rule below. Hairline rules separate rows, and no vertical borders are drawn. Figure columns are right-aligned. Column widths follow the content. |
| Total rows | A row filled #f0f0f0 in the source, or bold in every cell, gets a dark rule above it. |
| Callouts | A highlighted paragraph ending in a colon, with the `- ` paragraphs after it, becomes a grey box with a gold bar and real bullets. A paragraph starting `Note:` becomes a grey box with a teal bar. |
| Notes | A paragraph set entirely in italic becomes a 9pt grey note. |
| Footer | Every page after the cover shows the title on the left and page n/N on the right in 7pt Roboto Mono. |

A `[Insert > Table of contents…]` placeholder paragraph is dropped. Docs inserts a native table of contents from the Insert menu.

## Google Docs conversion behaviour

- Docs reads the font name `Instrument Sans Medium` as Instrument Sans at weight 500. A .docx has no other way to carry a 500 weight.
- Docs ignores tab stops cleared on a paragraph and applies the tabs defined on its style. The python-docx template gives the Footer style a centre tab at 3.25 inches, so `build_docx.py` clears the tabs on the style itself.
- Docs ignores keep-with-next inside tables. A table can split across pages and leave its last row alone under a repeated header. Page breaks before those tables are the final edit, made once the text stops changing.
- Docs converts all-caps formatting into uppercase text.
- Column widths are estimated from character counts. A bold header word in a narrow column can still break mid-word in Docs, and dragging the column wider fixes it.
- Instrument Sans is not installed on this machine, so a local Word render substitutes a serif. The PDF export from Drive is the reference render.

## Upload size

The connector receives the file as a base64 string written into the tool call. Uploads of 24,440 and 24,456 base64 characters were rejected with "Request contains an invalid argument". Uploads of 23,580 and 22,008 characters converted. `build_docx.py` drops the template parts Docs does not read and the unused styles, which brings a ten-page document to about 22,000 characters. `build_docx.py` prints a warning above 23,000.
