"""Lays stills out on one sheet, in the order given, so a whole film can be looked at in one image.
    py -3 film/tools/sheet.py <out.png> <columns> <thumb width> <still.png> ...
Needs Pillow."""
import sys
from PIL import Image

out, cols, w = sys.argv[1], int(sys.argv[2]), int(sys.argv[3])
files = sys.argv[4:]
h = w * 9 // 16
rows = (len(files) + cols - 1) // cols
sheet = Image.new('RGB', (cols * w, rows * h), '#202020')
for i, f in enumerate(files):
    im = Image.open(f).convert('RGB').resize((w - 4, h - 4), Image.LANCZOS)
    sheet.paste(im, ((i % cols) * w + 2, (i // cols) * h + 2))
sheet.save(out)
