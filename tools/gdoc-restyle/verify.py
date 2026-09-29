#!/usr/bin/env python3
"""Compare a restyled Google Doc against its source, from two Drive exports.

    python tools/gdoc-restyle/verify.py <source-export> <restyled-export> [--pdf <restyled-pdf-export> --png-dir <dir>]

Exports are the raw HTML/PDF or the JSON files the Drive connector saves.
Prints the words that appear in only one of the two documents, then the fonts,
weights and sizes the restyled document uses. With --pdf, writes one PNG per page.
"""
import argparse
import base64
import html
import json
import re
import sys
from collections import Counter

if sys.stdout.encoding and sys.stdout.encoding.lower() != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')


def load(path, binary=False):
    raw = open(path, 'rb').read()
    if raw.lstrip().startswith(b'{'):
        data = base64.b64decode(json.loads(raw)['content'])
    else:
        data = raw
    return data if binary else data.decode('utf-8')


def words(doc):
    body = doc[doc.find('<body'):]
    return re.findall(r'\S+', html.unescape(re.sub(r'<[^>]+>', ' ', body)))


if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('source')
    ap.add_argument('restyled')
    ap.add_argument('--pdf')
    ap.add_argument('--png-dir', default='.')
    args = ap.parse_args()

    src, new = load(args.source), load(args.restyled)
    ws, wn = Counter(words(src)), Counter(words(new))
    print('words: source', sum(ws.values()), 'restyled', sum(wn.values()))
    print('only in source:  ', sorted((ws - wn).items()))
    print('only in restyled:', sorted((wn - ws).items()))
    print('fonts  ', Counter(re.findall(r'font-family:&quot;([^&]+)&quot;', new)).most_common())
    print('weights', Counter(re.findall(r'font-weight:(\d+)', new)).most_common())
    print('sizes  ', Counter(re.findall(r'font-size:([\d.]+pt)', new)).most_common())

    if args.pdf:
        import fitz
        pdf = fitz.open(stream=load(args.pdf, binary=True), filetype='pdf')
        print('pdf fonts', sorted({f[3].split('+')[-1] for page in pdf for f in page.get_fonts()}))
        for i, page in enumerate(pdf):
            page.get_pixmap(dpi=70).save(f'{args.png_dir}/page-{i + 1:02d}.png')
        print(f'{pdf.page_count} pages rendered to {args.png_dir}')
