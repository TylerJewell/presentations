"""Regenerate the three akka.ai deliverables from source.

CSS system matches Akka's blog template (see ~/competitive/blog-technical/
for the canonical stylesheet this is adapted from). Palette / typography
/ measure all follow that reference so the akka.ai pages read as a
sibling to akka.io/blog rather than a bespoke look.

Sources
-------
- ../akka-ai-playbook.md  ->  index.html and llms.txt
- ../../akka-ai-marketplace/skills/setup/SKILL.md  ->  setup.html

Run: python3 build.py
"""
from __future__ import annotations
import pathlib
import re
import shutil
import markdown

HERE = pathlib.Path(__file__).parent
# llms.txt is the source of truth for the playbook. index.html is
# regenerated from it. There is no separate .md source.
PLAYBOOK_MD = HERE / "llms.txt"
SKILL_MD = HERE.parent.parent / "akka-ai-marketplace" / "skills" / "setup" / "SKILL.md"

# CSS lifted and lightly adapted from ~/competitive/blog-technical/*.html.
# Key adaptations for a documentation page (vs. editorial post):
#   - Markdown H2/H3 shifted visually: H2 gets the big "body h3" display
#     heading (with border) since our top-level sections are structural;
#     H3 gets a smaller display treatment.
#   - No byline / standfirst / drop-cap / pullquote — those are editorial.
#   - Reader banner replaces "standfirst" so a human landing here
#     understands the page is written for their AI.
BLOG_CSS = """
:root {
  --paper:#141414; --paper-2:#1c1c1e; --plate:#232326; --code:#0b0b0c;
  --ink:#dcdcd6; --body:#b8b8b3; --mute:#7c7c79; --faint:#4e4e4c;
  --rule:rgba(255,255,255,0.10); --rule-hi:rgba(255,255,255,0.17);
  --accent:#ffce4a; --link:#00dbdd; --accent-2:#e9b426;
  --teal:#6bc9ce; --good:#7fd9a0; --bad:#f09090;
  --display:'Instrument Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;
  --text:'Roboto',-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;
  --mono:'Roboto Mono',ui-monospace,'SF Mono',Menlo,Consolas,monospace;
}
*{box-sizing:border-box;margin:0;padding:0}
html{-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
body{background:var(--paper);color:var(--body);font-family:var(--text);font-size:18px;line-height:1.55;font-weight:400}
a{color:var(--link);text-decoration:none;text-underline-offset:4px}
a:hover{text-decoration:underline}
.body p a,.body li a{color:var(--link);font-weight:inherit}
.body p a:hover,.body li a:hover{text-decoration:underline}

.progress{position:fixed;top:0;left:0;height:2px;background:var(--accent);width:0;z-index:100;transition:width 0.05s linear}

.colophon{border-bottom:1px solid var(--rule);padding:18px 28px;display:flex;align-items:baseline;gap:14px;font-family:var(--display);font-size:11.5px;color:var(--mute);text-transform:uppercase;letter-spacing:0.16em}
.colophon .brand{font-weight:800;color:var(--ink);font-size:14.5px;letter-spacing:0;text-transform:none}
.colophon .sep{color:var(--faint)}
.colophon .r{margin-left:auto}
.colophon a{color:inherit}
.colophon a:hover{color:var(--ink);text-decoration:none}

.col{--gutter:clamp(20px,5vw,28px);max-width:calc(640px + var(--gutter)*2);margin:0 auto;padding:0 var(--gutter)}
.wide{max-width:940px;margin:0 auto;padding:0 clamp(20px,4vw,28px)}

.hero{padding:76px 0 32px}
.kicker{font-family:var(--display);font-size:12px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:var(--accent);margin-bottom:24px;display:flex;align-items:center;gap:12px}
.kicker::before{content:'';width:28px;height:2px;background:var(--accent)}
h1.title{font-family:var(--display);font-size:clamp(36px,5vw,48px);line-height:1.08;letter-spacing:-0.022em;font-weight:600;color:var(--ink);margin-bottom:24px;text-wrap:balance}
.standfirst{font-family:var(--text);font-size:clamp(19px,2vw,22px);line-height:1.5;color:var(--body);font-weight:300;margin-bottom:40px;max-width:620px;text-wrap:pretty}
.standfirst code{font-family:var(--mono);font-size:0.88em;color:var(--ink);background:var(--paper-2);padding:2px 6px;border-radius:3px}

.body{padding:0}
article > .body:first-of-type{padding-top:44px}
article > .body:last-of-type{padding-bottom:100px}
.body p{margin-bottom:20px;font-family:var(--text);font-size:18px;line-height:1.55;color:var(--body);hanging-punctuation:first}

/* Markdown H2 -> big display heading (top-level section).
   Matches the blog's `h2+h3` "big" pattern rather than the smaller
   kicker used for editorial section markers, since the playbook's
   H2s are structural install-step headings, not editorial sections. */
.body h2{font-family:var(--display);font-size:28px;line-height:1.22;font-weight:700;color:var(--ink);margin:56px 0 22px;text-wrap:balance;letter-spacing:-0.012em;padding-bottom:14px;border-bottom:1px solid var(--rule)}
.body h2:first-child{margin-top:0}
/* Markdown H3 -> the blog's plain h3 style (no border, ink color) */
.body h3{font-family:var(--display);font-size:20px;line-height:1.25;font-weight:700;color:var(--ink);margin:32px 0 12px;letter-spacing:-0.008em;text-wrap:balance}
/* Markdown H4 -> uppercase small caps micro-heading */
.body h4{font-family:var(--display);font-size:11.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.18em;color:var(--mute);margin:28px 0 10px}

.body strong{font-weight:600;color:var(--ink)}
.body em{font-style:italic;color:var(--ink)}

.body code{font-family:var(--mono);font-size:0.86em;color:var(--ink);background:var(--paper-2);padding:2px 6px;border-radius:3px}
.body pre{margin:32px 0;padding:24px 28px;background:var(--code);border-top:1px solid var(--rule);border-bottom:1px solid var(--rule);overflow-x:auto;font-family:var(--mono);font-size:13.5px;line-height:1.65;color:var(--body);scrollbar-color:var(--accent) var(--code);scrollbar-width:thin}
.body pre code{background:transparent;padding:0;color:inherit;font-size:inherit}
.body pre::-webkit-scrollbar{background:var(--paper-2);height:6px;width:6px}
.body pre::-webkit-scrollbar-thumb{background:rgba(255,206,74,0.5);border-radius:0}
.body pre::-webkit-scrollbar-thumb:hover{background:var(--accent)}
.body pre::-webkit-scrollbar-track{background:transparent}

.body ul,.body ol{margin:0 0 20px 24px;padding-left:16px}
.body ul{list-style:disc outside}
.body ol{list-style:decimal outside}
.body li{margin-bottom:12px;font-family:var(--text);font-size:18px;line-height:1.45;color:var(--body);padding-left:4px}
.body li::marker{color:var(--accent)}
.body p + ul,.body p + ol{margin-top:-8px}
.body li > ul,.body li > ol{margin-top:8px;margin-bottom:8px}

/* Blockquote — Akka blog style. NO box. Horizontal rules top and
   bottom only; centered display type; optional <cite> below in
   uppercase small caps. */
.body blockquote{border-top:1px solid var(--rule-hi);border-bottom:1px solid var(--rule-hi);color:var(--ink);font-family:var(--display);font-size:28px;font-weight:400;letter-spacing:-0.014em;line-height:1.32;margin:52px auto;max-width:720px;padding:36px 0;text-align:center;text-wrap:balance}
.body blockquote p{font-family:inherit;font-size:inherit;font-weight:400;margin:0}
.body blockquote cite{color:var(--mute);display:block;font-family:var(--display);font-size:11.5px;font-style:normal;font-weight:700;letter-spacing:0.18em;margin-top:20px;text-transform:uppercase}

/* Documentation table — subordinate to blog's rtbl, kept simple */
.body table{width:100%;margin:36px 0;border-collapse:collapse;font-family:var(--text);font-size:15px;line-height:1.5;color:var(--body)}
.body thead th{padding:12px 16px;font-family:var(--display);font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:var(--mute);text-align:left;border-bottom:1px solid var(--ink);vertical-align:bottom;line-height:1.25}
.body tbody td{padding:12px 16px;border-bottom:1px solid var(--rule);color:var(--body);vertical-align:top;font-size:15px}
.body tbody td code{font-size:13px}

.body hr{border:0;border-top:1px solid var(--rule-hi);margin:44px 0}

/* Reader banner — .enote pattern from the blog: border-top +
   border-bottom, no box, no left border, no background. Yellow
   uppercase small-caps <b> label. */
.enote{border-top:1px solid var(--rule-hi);border-bottom:1px solid var(--rule-hi);color:var(--body);font-family:var(--text);font-size:17px;line-height:1.55;margin:36px auto;max-width:720px;padding:22px 0}
.enote b{color:var(--accent);display:block;font-family:var(--display);font-size:11px;font-weight:700;letter-spacing:0.18em;margin-bottom:10px;text-transform:uppercase}
.enote code{font-family:var(--mono);font-size:0.9em;color:var(--ink);background:var(--paper-2);padding:2px 6px;border-radius:3px}
.enote a{color:var(--link)}

.foot{border-top:1px solid var(--rule);padding:24px 28px;font-family:var(--display);font-size:11.5px;color:var(--mute);text-transform:uppercase;letter-spacing:0.16em}
.foot a{color:inherit}
.foot a:hover{color:var(--ink);text-decoration:none}
.foot .sep{color:var(--faint);margin:0 8px}
"""

FONT_LINKS = (
    '<link rel="icon" href="https://akka.io/favicon.ico" type="image/x-icon">\n'
    '<link rel="preconnect" href="https://fonts.googleapis.com">\n'
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
    '<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Roboto:wght@300;400;500;700&family=Roboto+Mono:wght@400;500;600&display=swap" rel="stylesheet">'
)

HEAD_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title}</title>
<meta name="description" content="{description}">
{fonts}
<style>{css}</style>
</head>
<body>
<div class="progress" id="prog"></div>
<div class="colophon">
  <a class="brand" href="/">AKKA</a>
  <span class="sep">/</span>
  <span>{section}</span>
  <span class="r">{context}</span>
</div>
<article>
<header class="hero col">
  <div class="kicker">{kicker}</div>
  <h1 class="title">{h1}</h1>
"""

FOOTER = """
<script>
(function(){
  var p=document.getElementById('prog');
  if(!p) return;
  function update(){
    var h=document.documentElement,b=document.body;
    var st=h.scrollTop||b.scrollTop;
    var sh=(h.scrollHeight||b.scrollHeight)-h.clientHeight;
    p.style.width=(sh>0?(st/sh)*100:0)+'%';
  }
  window.addEventListener('scroll',update,{passive:true});
  update();
})();
</script>
</body>
</html>
"""


def render_markdown(md_text: str) -> str:
    return markdown.markdown(
        md_text,
        extensions=["extra", "sane_lists", "toc"],
        output_format="html5",
    )


def extract_h1_and_lede(md_text: str) -> tuple[str, str | None, str | None]:
    """Peel the first-level H1 and the first paragraph (the 'lede') out of
    the markdown so we can render them in the hero header. Returns
    (remaining_md, h1_text, lede_html)."""
    lines = md_text.splitlines()
    i = 0
    h1: str | None = None
    lede: str | None = None
    # Find first H1
    while i < len(lines):
        if lines[i].startswith("# "):
            h1 = lines[i][2:].strip()
            i += 1
            break
        i += 1
    # Skip blank lines
    while i < len(lines) and lines[i].strip() == "":
        i += 1
    # Optional italic single-paragraph lede: matches the playbook's opening
    # "*This is the content that ships at ...*" block.
    if i < len(lines) and lines[i].startswith("*") and lines[i].rstrip().endswith("*"):
        lede_lines = [lines[i]]
        i += 1
        while i < len(lines) and lines[i].strip() != "":
            lede_lines.append(lines[i])
            i += 1
        lede_md = " ".join(l.strip("* ").strip() for l in lede_lines)
        lede = lede_md
        # Skip trailing blank
        while i < len(lines) and lines[i].strip() == "":
            i += 1
    remaining = "\n".join(lines[i:])
    return remaining, h1, lede


def wrap_page(*, title: str, description: str, section: str, context: str,
              kicker: str, h1: str, standfirst_html: str | None, banner_html: str,
              body_html: str) -> str:
    head = HEAD_TEMPLATE.format(
        title=title, description=description, fonts=FONT_LINKS,
        css=BLOG_CSS, section=section, context=context,
        kicker=kicker, h1=h1,
    )
    parts = [head]
    if standfirst_html:
        parts.append(f'  <p class="standfirst">{standfirst_html}</p>\n')
    parts.append("</header>\n")
    parts.append(banner_html)
    parts.append('<div class="body col">\n')
    parts.append(body_html)
    parts.append("\n</div>\n</article>\n")
    parts.append(FOOTER)
    return "".join(parts)


def inline_code_html(md_fragment: str) -> str:
    """Very small inline-code renderer for the standfirst text."""
    return re.sub(r"`([^`]+)`", r"<code>\1</code>", md_fragment)


def build_index_html() -> None:
    md_text = PLAYBOOK_MD.read_text(encoding="utf-8")
    remaining, h1, lede = extract_h1_and_lede(md_text)
    body_html = render_markdown(remaining)
    standfirst = inline_code_html(lede) if lede else None
    banner = (
        '<div class="col">\n'
        '<div class="enote">\n'
        '<b>Written for your AI</b>\n'
        'This page is instructions for an AI coding assistant. Paste '
        '<code>install Akka from akka.ai</code> into your assistant and it '
        'will read this page and walk you through the install with a consent '
        'prompt at every step.\n'
        '</div>\n'
        '</div>\n'
    )
    out = wrap_page(
        title="Install Akka — akka.ai",
        description="Instructions for AI coding assistants to install Akka into any harness.",
        section="Install playbook",
        context="For AI coding assistants",
        kicker="AI install",
        h1=h1 or "Install Akka",
        standfirst_html=standfirst,
        banner_html=banner,
        body_html=body_html,
    )
    (HERE / "index.html").write_text(out, encoding="utf-8")


def build_llms_txt() -> None:
    """akka.ai/llms.txt IS the source. No-op — kept so the __main__ block
    below still reads left-to-right in surface order."""
    return


def build_setup_html() -> None:
    md_text = SKILL_MD.read_text(encoding="utf-8")
    if md_text.startswith("---"):
        parts = md_text.split("---", 2)
        if len(parts) >= 3:
            md_text = parts[2].lstrip("\n")
    body_html = render_markdown(md_text)
    banner = (
        '<div class="col">\n'
        '<div class="enote">\n'
        '<b>Read-only mirror</b>\n'
        'Canonical source: <code>skills/setup/SKILL.md</code> in '
        '<a href="https://github.com/akka/ai-marketplace/blob/stable/skills/setup/SKILL.md">akka/ai-marketplace</a> '
        'at the <code>@stable</code> tag. This page is aliased so an AI can '
        'preview the setup skill before installing the plugin.\n'
        '</div>\n'
        '</div>\n'
    )
    out = wrap_page(
        title="/akka:setup — akka.ai",
        description="Read-only mirror of the /akka:setup skill's SKILL.md, sourced from akka/ai-marketplace at the @stable tag.",
        section="Skill mirror",
        context="/akka:setup",
        kicker="Skill preview",
        h1="/akka:setup",
        standfirst_html=(
            'Set up a complete Akka SDK development environment from scratch. '
            'Installs Java, Maven, Akka CLI, configures tokens, scaffolds a '
            'project, and downloads context documentation. Idempotent — safe '
            'to rerun for repair or upgrade.'
        ),
        banner_html=banner,
        body_html=body_html,
    )
    (HERE / "setup.html").write_text(out, encoding="utf-8")


if __name__ == "__main__":
    build_index_html()
    build_llms_txt()
    build_setup_html()
    for p in ("index.html", "llms.txt", "setup.html"):
        f = HERE / p
        print(f"{p:<12} {f.stat().st_size:>7} bytes")
