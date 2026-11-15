"""Inlines logos/*.svg into lib/logos.js for scene 2.1: py -3 website/demo/roi/render/logos.py"""
import json
import pathlib
import re
d=pathlib.Path(__file__).resolve().parent.parent/"logos"; out={}
for p in sorted(d.glob("*.svg")):
    s=p.read_text(encoding="utf-8")
    s=re.sub(r"<\?xml.*?\?>","",s,flags=re.S); s=re.sub(r"<!--.*?-->","",s,flags=re.S)
    vb=re.search(r'viewBox="([^"]+)"',s).group(1).split()
    w,h=float(vb[2]),float(vb[3])
    s=re.sub(r'<svg([^>]*?)\s(width|height)="[^"]*"',r'<svg\1',s,count=1)
    s=re.sub(r'<svg([^>]*?)\s(width|height)="[^"]*"',r'<svg\1',s,count=1)
    # class names prefixed per logo so two inline SVGs never share a style rule
    s=s.replace("st0",p.stem+"-st0").replace("st1",p.stem+"-st1")
    out[p.stem]={"svg":re.sub(r"\s+"," ",s).strip(),"ratio":round(w/h,3)}
js="/* Customer logos for scene 2.1, inlined so they draw in the same frame as their card. Generated from logos/*.svg\n   (akka.io's own customer logo files) by render/logos.py. ratio is width over height. */\nwindow.ROI_LOGOS = "+json.dumps(out,indent=1)+";\n"
(d.parent/"lib"/"logos.js").write_text(js,encoding="utf-8")
print({k:v["ratio"] for k,v in out.items()})
