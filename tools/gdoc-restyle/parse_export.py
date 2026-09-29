#!/usr/bin/env python3
"""Read a Google Docs HTML export into a block list for build_docx.py.

The input is either the raw HTML or the JSON file the Drive connector saves when
an export is too large to return inline ({"content": <base64 HTML>, ...}).

    python tools/gdoc-restyle/parse_export.py <export.html|export.json> <blocks.json>

Blocks are headings, paragraphs, lists and tables. Runs keep bold and italic.
A paragraph with a highlighted span is marked "hl"; table rows keep the source
fill as "head" (#e8e8e8) or "total" (#f0f0f0).
"""
import base64
import json
import re
import sys

from bs4 import BeautifulSoup, NavigableString, Tag

if sys.stdout.encoding and sys.stdout.encoding.lower() != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

ROW_FILL = {'#e8e8e8': 'head', '#f0f0f0': 'total'}


def load_html(path):
    raw = open(path, encoding='utf-8').read()
    if raw.lstrip().startswith('{'):
        content = json.loads(raw)['content']
        try:
            return base64.b64decode(content).decode('utf-8')
        except ValueError:
            return content
    return raw


def style_of(node):
    return node.get('style', '') if isinstance(node, Tag) else ''


def runs_of(el):
    """Flatten an element into [{t, b, i}] runs, merging neighbours with equal formatting."""
    runs = []

    def walk(node, bold, ital):
        if isinstance(node, NavigableString):
            if str(node):
                runs.append({'t': str(node), 'b': bold, 'i': ital})
            return
        st = style_of(node)
        b = bold or 'font-weight:700' in st or node.name in ('b', 'strong')
        i = ital or 'font-style:italic' in st or node.name in ('i', 'em')
        if node.name == 'br':
            runs.append({'t': '\n', 'b': b, 'i': i})
            return
        for ch in node.children:
            walk(ch, b, i)

    walk(el, False, False)
    merged = []
    for r in runs:
        r['t'] = r['t'].replace(' ', ' ')
        if merged and merged[-1]['b'] == r['b'] and merged[-1]['i'] == r['i']:
            merged[-1]['t'] += r['t']
        else:
            merged.append(r)
    if merged:
        merged[0]['t'] = merged[0]['t'].lstrip()
        merged[-1]['t'] = merged[-1]['t'].rstrip()
    return [r for r in merged if r['t']]


def text_of(runs):
    return ''.join(r['t'] for r in runs)


def highlighted(el):
    fills = re.findall(r'background-color:(#[0-9a-fA-F]{6})', str(el))
    return any(f.lower() != '#ffffff' for f in fills)


def parse(html):
    body = BeautifulSoup(html, 'html.parser').body
    blocks = []
    for el in body.children:
        if not isinstance(el, Tag):
            continue
        if el.name in ('h1', 'h2', 'h3'):
            blocks.append({'k': 'h', 'lvl': int(el.name[1]), 'text': text_of(runs_of(el))})
        elif el.name == 'p':
            runs = runs_of(el)
            if text_of(runs).strip():
                blocks.append({'k': 'p', 'runs': runs, 'hl': highlighted(el)})
        elif el.name in ('ul', 'ol'):
            m = re.search(r'lst-kix_\w+-(\d)', ' '.join(el.get('class', [])))
            lvl = int(m.group(1)) if m else 0
            items = [{'runs': runs_of(li), 'lvl': lvl} for li in el.find_all('li', recursive=False)]
            # Docs writes each nesting level as its own <ul>; consecutive lists of one kind are one list
            if blocks and blocks[-1]['k'] == 'list' and blocks[-1]['ordered'] == (el.name == 'ol'):
                blocks[-1]['items'].extend(items)
            else:
                blocks.append({'k': 'list', 'ordered': el.name == 'ol', 'items': items})
        elif el.name == 'table':
            rows = []
            for tr in el.find_all('tr'):
                cells, kinds = [], set()
                for td in tr.find_all('td', recursive=False):
                    fill = re.search(r'background-color:(#[0-9a-fA-F]{6})', style_of(td))
                    kinds.add(ROW_FILL.get(fill.group(1).lower() if fill else None, 'body'))
                    paras = [runs_of(p) for p in td.find_all('p')] or [runs_of(td)]
                    cells.append({'paras': paras})
                kind = 'head' if 'head' in kinds else 'total' if 'total' in kinds else 'body'
                rows.append({'kind': kind, 'cells': cells})
            blocks.append({'k': 'table', 'rows': rows})
    return blocks


def summary(blocks):
    for b in blocks:
        if b['k'] == 'h':
            print(f"H{b['lvl']}  {b['text']}")
        elif b['k'] == 'p':
            t = text_of(b['runs'])
            print(f"  P{'*' if b['hl'] else ' '} {t[:90]}{'...' if len(t) > 90 else ''}")
        elif b['k'] == 'list':
            print(f"  {'OL' if b['ordered'] else 'UL'} {len(b['items'])} items")
        else:
            kinds = ''.join(r['kind'][0] for r in b['rows'])
            print(f"  T  {len(b['rows'])} rows [{kinds}]  {[text_of(c['paras'][0]) for c in b['rows'][0]['cells']]}")


if __name__ == '__main__':
    blocks = parse(load_html(sys.argv[1]))
    json.dump(blocks, open(sys.argv[2], 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    summary(blocks)
