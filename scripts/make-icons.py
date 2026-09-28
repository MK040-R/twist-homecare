"""Generate the favicon SVGs: the "twist" wordmark (and a single "t" for tiny sizes) in Eczar Bold on ink.

Letters are converted to outlines so the icon does not depend on any installed font.
Run: python3 scripts/make-icons.py && node scripts/make-brand-images.mjs
"""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.varLib import instancer

ROOT = Path(__file__).resolve().parent.parent
font = instancer.instantiateVariableFont(TTFont(ROOT / "fonts-src" / "Eczar-Variable.ttf"), {"wght": 700})
gs, cmap, hmtx = font.getGlyphSet(), font.getBestCmap(), font["hmtx"]
INK, CHALK = "#2D3370", "#F5F5F1"

def outline(text, tracking=-0.03):
    upm = font["head"].unitsPerEm
    x, parts, bounds = 0, [], None
    for ch in text:
        name = cmap[ord(ch)]
        pen = SVGPathPen(gs)
        gs[name].draw(pen)
        bp = BoundsPen(gs); gs[name].draw(bp)
        if bp.bounds:
            b = bp.bounds
            bb = (b[0] + x, b[1], b[2] + x, b[3])
            bounds = bb if bounds is None else (min(bounds[0], bb[0]), min(bounds[1], bb[1]), max(bounds[2], bb[2]), max(bounds[3], bb[3]))
        parts.append(f'<path transform="translate({x} 0)" d="{pen.getCommands()}"/>')
        x += hmtx[name][0] + tracking * upm
    return "".join(parts), bounds

def icon(text, size, pad_ratio, radius_ratio):
    paths, (x0, y0, x1, y1) = outline(text)
    w, h = x1 - x0, y1 - y0
    inner = size * (1 - 2 * pad_ratio)
    scale = inner / max(w, h)
    tx = (size - w * scale) / 2 - x0 * scale
    ty = (size + h * scale) / 2 + y0 * scale  # font y axis points up
    r = size * radius_ratio
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}" width="{size}" height="{size}">'
            f'<rect width="{size}" height="{size}" rx="{r:.1f}" fill="{INK}"/>'
            f'<g fill="{CHALK}" transform="translate({tx:.2f} {ty:.2f}) scale({scale:.5f} {-scale:.5f})">{paths}</g></svg>')

(ROOT / "public").mkdir(exist_ok=True)
(ROOT / "public" / "favicon.svg").write_text(icon("twist", 64, 0.1, 0.22))
(ROOT / "scripts" / "icon-t.svg").write_text(icon("t", 64, 0.16, 0.22))
(ROOT / "scripts" / "icon-full.svg").write_text(icon("twist", 180, 0.12, 0))
print("wrote favicon.svg, icon-t.svg, icon-full.svg")
