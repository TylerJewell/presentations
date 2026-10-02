#!/usr/bin/env python3
"""Render a blog-technical post as Markdown for editing.

Prose comes across as Markdown. A figure drawn in SVG cannot, so each one
becomes a placeholder naming the figure and its caption; the HTML keeps the
drawing and the two are matched back up by that number.

    python tools/blog-technical/to_markdown.py <path-to-post.html> [out.md]
"""
import html
import re
import sys
from pathlib import Path

if sys.stdout.encoding and sys.stdout.encoding.lower() != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')


def text_of(frag):
    """Inline HTML to Markdown, tags stripped."""
    t = frag
    t = re.sub(r'<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)</a>', r'[\2](\1)', t)
    t = re.sub(r'</?(b|strong)>', '**', t)
    t = re.sub(r'</?(i|em)>', '*', t)
    t = re.sub(r'<code>([\s\S]*?)</code>', r'`\1`', t)
    t = re.sub(r'<br\s*/?>', '\n', t)
    t = re.sub(r'<[^>]+>', '', t)
    t = html.unescape(t)
    return re.sub(r'[ \t]+', ' ', t).strip()


def table_md(frag):
    rows = []
    for tr in re.findall(r'<tr[^>]*>([\s\S]*?)</tr>', frag):
        cells = [text_of(c) for c in re.findall(r'<t[dh][^>]*>([\s\S]*?)</t[dh]>', tr)]
        if cells:
            rows.append(cells)
    if not rows:
        return ''
    width = max(len(r) for r in rows)
    rows = [r + [''] * (width - len(r)) for r in rows]
    has_head = '<th' in frag
    out = []
    if has_head:
        out.append('| ' + ' | '.join(rows[0]) + ' |')
        out.append('|' + '---|' * width)
        body = rows[1:]
    else:
        out.append('|' + ' |' * width)
        out.append('|' + '---|' * width)
        body = rows
    out += ['| ' + ' | '.join(r) + ' |' for r in body]
    return '\n'.join(out)


def convert(src: Path) -> str:
    s = src.read_text(encoding='utf-8')
    art = re.search(r'<article>([\s\S]*)</article>', s).group(1)

    title = text_of(re.search(r'<h1[^>]*>([\s\S]*?)</h1>', art).group(1))
    stand = re.search(r'<p class="standfirst"[^>]*>([\s\S]*?)</p>', art)
    out = ['# ' + title, '']
    if stand:
        out += ['_' + text_of(stand.group(1)) + '_', '']

    body = art[re.search(r'</header>', art).end():]

    # Walk the block elements in document order.
    pattern = (r'<h([23])[^>]*>([\s\S]*?)</h\1>'
               r'|<figure class="(?:viz|tbl)"[\s\S]*?</figure>'
               r'|<div class="enote">([\s\S]*?)</div>'
               r'|<p(?: class="lede")?>([\s\S]*?)</p>'
               r'|<(ol|ul)>([\s\S]*?)</\5>')
    for m in re.finditer(pattern, body):
        chunk = m.group(0)
        if chunk.startswith('<h'):
            out += ['#' * (int(m.group(1))) + ' ' + text_of(m.group(2)), '']
        elif chunk.startswith('<figure'):
            num = re.search(r'viz-title">([^<]+)<', chunk)
            cap = re.search(r'<h5>([\s\S]*?)</h5>', chunk)
            label = text_of(num.group(1)) if num else 'Figure'
            out += ['> **[%s]** %s' % (label, text_of(cap.group(1)) if cap else ''), '']
            if '<table' in chunk:
                out += [table_md(chunk), '']
            else:
                out += ['> _Drawn in the HTML. Edit the caption here; the drawing stays put._', '']
            fc = re.search(r'<figcaption>([\s\S]*?)</figcaption>', chunk)
            if fc:
                out += ['_' + text_of(fc.group(1)) + '_', '']
        elif chunk.startswith('<div class="enote"'):
            inner = m.group(3)
            lead = re.search(r'<b>([\s\S]*?)</b>', inner)
            out.append('> **%s**' % text_of(lead.group(1)) if lead else '>')
            out.append('>')
            for li in re.findall(r'<li>([\s\S]*?)</li>', inner):
                out.append('> - ' + text_of(li))
            out.append('')
        elif chunk.startswith('<p'):
            out += [text_of(m.group(4)), '']
        else:
            marker = '1. ' if m.group(5) == 'ol' else '- '
            for li in re.findall(r'<li>([\s\S]*?)</li>', m.group(6)):
                out.append(marker + text_of(li))
            out.append('')

    return '\n'.join(out).replace('\n\n\n', '\n\n') + '\n'


if __name__ == '__main__':
    src = Path(sys.argv[1])
    dst = Path(sys.argv[2]) if len(sys.argv) > 2 else src.with_suffix('.md')
    dst.write_text(convert(src), encoding='utf-8')
    print(dst, dst.stat().st_size, 'bytes')
