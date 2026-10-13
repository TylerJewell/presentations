#!/usr/bin/env python3
"""Publish website/guides.html and the 44 guide pages to HubSpot.

Each page becomes a full-page template under custom-templates/guides/ plus a
site-page pointing at it, the shape /efficiency already uses. The local files
carry only a <style> block and a bare body, so the port is: scope the CSS to
.guides-content, wrap the body, put the install line under the guide's
"On Akka." paragraph, and add the site header, footer and the reveal observer
the .rv class depends on.

    python tools/hubspot/port_guides.py                       # build every page into scratchpad/hs-out/guides/
    python tools/hubspot/port_guides.py --only guides.html    # build one page
    python tools/hubspot/port_guides.py --preview DIR         # also write standalone local previews to DIR
    python tools/hubspot/port_guides.py --push                # build, PUT the templates, publish the pages

--push refuses a page that still carries a data-tyler-slot placeholder. The token
comes from the gitignored scratchpad/.hs_env.
"""
import argparse
import html as _html
import json, os, re, subprocess, sys, time

import install_line

sys.stdout.reconfigure(encoding='utf-8')

ROOT = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..'))
WEB = os.path.join(ROOT, 'website')
OUT = os.path.join(ROOT, 'scratchpad', 'hs-out', 'guides')
API = 'https://api.hubapi.com'
SCOPE = 'guides-content'
ON_AKKA = '<div class="sources"><b>On Akka.</b>'

HEAD_LINKS = '''    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="{{ content.meta_description }}">
    <meta property="og:title" content="{{ content.html_title }}">
    <meta property="og:description" content="{{ content.meta_description }}">
    <meta property="og:url" content="{{ content.absolute_url }}">
    <meta property="og:image" content="https://akka.io/hubfs/website/social-share-images/akka-1200-628.jpg">
    <meta name="twitter:card" content="summary_large_image">
    <link rel="canonical" href="{{ content.absolute_url }}">
    <link rel="icon" href="https://akka.io/favicon.ico" type="image/x-icon">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://akka.io/hubfs/hub_generated/template_assets/1/180483679747/1773693185271/template_Plugin.min.css">
    <link rel="stylesheet" href="https://akka.io/hubfs/hub_generated/template_assets/1/177749484047/1773693184337/template_main.css">
    <link rel="stylesheet" href="https://akka.io/hubfs/hub_generated/template_assets/1/177749412157/1773693188708/template_theme-overrides.css">
    <link rel="stylesheet" href="https://akka.io/hubfs/hub_generated/template_assets/1/177760109709/1773693182105/template_Dev1.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
'''

FOOT = '''    </div>

''' + install_line.assets() + '''
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="https://akka.io/hubfs/hub_generated/template_assets/1/177749484049/1773693181011/template_main.min.js"></script>
    {% global_partial path="AKKA-2024/templates/partials/footer.html" %}
    <script>
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, {threshold:.12});
    document.querySelectorAll('.rv').forEach(function(el){ io.observe(el); });
    </script>
    {{ standard_footer_includes }}
  </body>
</html>
'''

# Selectors that address the page itself rather than an element inside it.
ROOT_SELECTORS = {'html', 'body', ':root'}


def scope_css(css, scope):
    """Prefix every rule's selectors with .scope.

    An at-rule with a block (@media, @supports) is recursed into; one without
    (@import, @charset) passes through. html/body/:root address the page, so
    they collapse onto the wrapper instead of nesting under it.

    Comments come out first: one sitting ahead of a selector is read as part of
    that selector, and a comma inside it splits the selector list.
    """
    css = re.sub(r'/\*.*?\*/', '', css, flags=re.S)
    out, i, n = [], 0, len(css)
    while i < n:
        at = css.find('@', i)
        brace = css.find('{', i)
        if brace < 0:
            out.append(css[i:])
            break
        if 0 <= at < brace:
            head = css[i:at]
            name = re.match(r'@([a-zA-Z-]+)', css[at:]).group(1)
            if name in ('media', 'supports', 'layer', 'container'):
                depth, j = 0, css.index('{', at)
                k = j
                while k < n:
                    if css[k] == '{':
                        depth += 1
                    elif css[k] == '}':
                        depth -= 1
                        if depth == 0:
                            break
                    k += 1
                out.append(head + css[at:j + 1] + scope_css(css[j + 1:k], scope) + '}')
                i = k + 1
                continue
            if name == 'keyframes' or name == 'font-face':
                depth, j = 0, css.index('{', at)
                k = j
                while k < n:
                    if css[k] == '{':
                        depth += 1
                    elif css[k] == '}':
                        depth -= 1
                        if depth == 0:
                            break
                    k += 1
                out.append(css[i:k + 1])
                i = k + 1
                continue
        close = css.find('}', brace)
        sel, body = css[i:brace].strip(), css[brace:close + 1]
        parts = []
        for s in sel.split(','):
            s = s.strip()
            if not s:
                continue
            new = '.%s' % scope if s in ROOT_SELECTORS else '.%s %s' % (scope, s)
            if new not in parts:   # html and body both collapse onto the wrapper
                parts.append(new)
        out.append('\n' + ', '.join(parts) + ' ' + body)
        i = close + 1
    return ''.join(out)


_TOKEN = []


def token():
    if not _TOKEN:
        env = open(os.path.join(ROOT, 'scratchpad', '.hs_env'), encoding='utf-8').read()
        m = re.search(r'HUBSPOT_TOKEN=(\S+)', env)
        if not m:
            sys.exit('HUBSPOT_TOKEN not found in scratchpad/.hs_env')
        _TOKEN.append(m.group(1))
    return _TOKEN[0]


def _curl(args):
    r = subprocess.run(['curl', '-s', '-H', 'Authorization: Bearer ' + token()] + args,
                       capture_output=True)
    return r.stdout.decode('utf-8', errors='strict') if r.stdout else ''


def get(path):
    return _curl([API + path])


def _json_call(method, path, body):
    # Bodies go through a file: page labels carry em dashes, and a shell-quoted body
    # holding one comes back 400.
    p = os.path.join(ROOT, 'scratchpad', '.hs_body.json')
    with open(p, 'w', encoding='utf-8') as f:
        json.dump(body, f, ensure_ascii=True)
    try:
        return _curl(['-X', method, '-H', 'Content-Type: application/json',
                      '--data-binary', '@' + p, API + path])
    finally:
        os.remove(p)


def put_source(path, local_file):
    codes = []
    for stage in ('draft', 'published'):
        r = subprocess.run(['curl', '-s', '-o', os.devnull, '-w', '%{http_code}', '-X', 'PUT',
                            '-H', 'Authorization: Bearer ' + token(), '-F', 'file=@' + local_file,
                            API + '/cms/v3/source-code/%s/content/%s' % (stage, path)],
                           capture_output=True, text=True)
        codes.append(r.stdout.strip())
    return '/'.join(codes)


def add_install_line(local, html):
    """Put the quiet install line directly under the guide's "On Akka." paragraph."""
    if local == 'guides.html':
        return html
    if html.count(ON_AKKA) != 1:
        sys.exit('%s: expected one "On Akka." paragraph' % local)
    at = html.index('</div>', html.index(ON_AKKA)) + len('</div>')
    line = '\n    <div style="margin-top:14px">%s</div>' % install_line.button('quiet', lead=True)
    return html[:at] + line + html[at:]


def preview(local, out_dir):
    """The local source with the install line and its assets, for review from disk."""
    src = add_install_line(local, open(os.path.join(WEB, local), encoding='utf-8').read())
    if src.count('</body>') != 1:
        sys.exit('%s: expected one </body>' % local)
    src = src.replace('</body>', install_line.assets() + '\n</body>')
    with open(os.path.join(out_dir, local), 'w', encoding='utf-8', newline='') as f:
        f.write(src)


def build(local):
    src = open(os.path.join(WEB, local), encoding='utf-8').read()
    title = re.search(r'<title>(.*?)</title>', src, re.S).group(1).strip()
    desc = re.search(r'<meta name="description" content="([^"]*)"', src).group(1)
    css = re.search(r'<style>(.*?)</style>', src, re.S).group(1)
    body = add_install_line(local, re.search(r'<body[^>]*>(.*)</body>', src, re.S).group(1))
    slug = 'guides' if local == 'guides.html' else 'guides/' + local[7:-5]
    tmpl = (
        '<!--\n    templateType: page\n    isAvailableForNewContent: false\n'
        # Quoted: the annotation block is parsed as YAML and titles carry colons.
        '    label: "%s"\n-->\n' % title.split(' | ')[0][:70].replace('"', "'")
        + '<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8">\n'
        + '    <title>%s</title>\n' % title
        + HEAD_LINKS
        + '    {{ standard_header_includes }}\n'
        + '    <script type="application/ld+json">%s</script>\n' % json.dumps(
            schema(local, title, desc, body), ensure_ascii=False)
        + '    <style>' + scope_css(css, SCOPE) + '\n</style>\n  </head>\n  <body>\n'
        + '    {% global_partial path="AKKA-2024/templates/partials/header-april.html" %}\n\n'
        + '    <div class="%s">\n' % SCOPE + body.strip() + '\n'
        + FOOT)
    return slug, title, desc, tmpl


def schema(local, title, desc, body):
    """Article plus breadcrumbs, and FAQPage where the page carries a Q&A block."""
    url = 'https://akka.io/' + ('guides' if local == 'guides.html' else 'guides/' + local[7:-5])
    graph = [{
        '@type': 'BreadcrumbList',
        'itemListElement': [
            {'@type': 'ListItem', 'position': 1, 'name': 'Akka', 'item': 'https://akka.io/'},
            {'@type': 'ListItem', 'position': 2, 'name': 'Guides', 'item': 'https://akka.io/guides'},
        ] + ([] if local == 'guides.html' else
             [{'@type': 'ListItem', 'position': 3, 'name': title.split(' | ')[0], 'item': url}]),
    }]
    if local != 'guides.html':
        graph.append({
            '@type': 'TechArticle', '@id': url, 'headline': title.split(' | ')[0],
            'description': desc, 'url': url, 'inLanguage': 'en',
            'publisher': {'@type': 'Organization', 'name': 'Akka', 'url': 'https://akka.io/'},
        })
    qa = []
    for m in re.finditer(r'<div class="q">\s*<h3>(.*?)</h3>(.*?)</div>', body, re.S):
        q = re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', '', m.group(1))).strip()
        a = re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', '', m.group(2))).strip()
        if q and a:
            qa.append({'@type': 'Question', 'name': _html.unescape(q),
                       'acceptedAnswer': {'@type': 'Answer', 'text': _html.unescape(a)}})
    if qa:
        graph.append({'@type': 'FAQPage', 'mainEntity': qa})
    return {'@context': 'https://schema.org', '@graph': graph}


def page_id(slug):
    d = json.loads(get('/cms/v3/pages/site-pages?limit=2&slug=' + slug))
    for p in d.get('results', []):
        if p['slug'] == slug:
            return p['id']
    return None


def publish(slug, title, desc, tmpl_path, label):
    pid = page_id(slug)
    body = {'name': label, 'slug': slug, 'templatePath': tmpl_path,
            'htmlTitle': title, 'metaDescription': desc[:300],
            'state': 'PUBLISHED', 'publishImmediately': True,
            'language': 'en', 'subcategory': 'site_page'}
    if pid:
        r = json.loads(_json_call('PATCH', '/cms/v3/pages/site-pages/%s' % pid, body))
    else:
        r = json.loads(_json_call('POST', '/cms/v3/pages/site-pages', body))
        pid = r.get('id')
    if not pid:
        return None, str(r)[:160]
    _json_call('POST', '/cms/v3/pages/site-pages/%s/draft/push-live' % pid, {})
    return pid, 'ok'


if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('--only')
    ap.add_argument('--preview', metavar='DIR')
    ap.add_argument('--push', action='store_true')
    a = ap.parse_args()

    files = ['guides.html'] + sorted(f for f in os.listdir(WEB)
                                     if f.startswith('guides-') and f.endswith('.html'))
    if a.only:
        files = [a.only]

    os.makedirs(OUT, exist_ok=True)
    built = []
    for local in files:
        slug, title, desc, tmpl = build(local)
        name = slug.replace('/', '-') + '.html'
        out = os.path.join(OUT, name)
        with open(out, 'w', encoding='utf-8', newline='') as f:
            f.write(tmpl)
        built.append((local, slug, title, desc, name, out))
        if a.preview:
            os.makedirs(a.preview, exist_ok=True)
            preview(local, a.preview)
    print('built %d templates in %s' % (len(built), OUT))

    if a.push:
        slotted = [b[0] for b in built if 'data-tyler-slot' in open(b[5], encoding='utf-8').read()]
        if slotted:
            sys.exit('copy slots still open in: ' + ', '.join(slotted))
        for local, slug, title, desc, name, out in built:
            tpath = 'custom-templates/guides/' + name
            codes = put_source(tpath, out)
            label = ('Guides hub' if local == 'guides.html'
                     else 'Guide — ' + title.split(' | ')[0])[:100]
            pid, status = publish(slug, title, desc, tpath, label)
            print('%-46s src=%-8s page=%-14s %s' % (slug[:44], codes, pid, status))
            time.sleep(0.25)
