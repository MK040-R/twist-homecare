"""Subset the self-hosted fonts to Latin plus the few extra glyphs the site uses.

Run with `npm run fonts` after changing the glyph list. Needs `pip install fonttools brotli`.
Source files live in fonts-src/ (SIL Open Font License, see OFL-*.txt there).
"""
from pathlib import Path
from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "fonts-src"
OUT = ROOT / "public" / "fonts"
OUT.mkdir(parents=True, exist_ok=True)

# Basic Latin, Latin-1, general punctuation, plus rupee, trademark, minus, degree.
UNICODES = "U+0020-007E,U+00A0-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20B9,U+2122,U+2212"


def write(font: TTFont, name: str, wght_range=None) -> None:
    opts = subset.Options()
    opts.flavor = "woff2"
    opts.layout_features = ["kern", "liga", "calt", "tnum", "lnum", "pnum"]
    opts.name_IDs = ["*"]
    opts.notdef_outline = True
    sub = subset.Subsetter(options=opts)
    sub.populate(unicodes=subset.parse_unicodes(UNICODES))
    sub.subset(font)
    if wght_range:
        font = instancer.instantiateVariableFont(font, {"wght": wght_range})
    path = OUT / name
    font.flavor = "woff2"
    font.save(path)
    print(f"{name}: {path.stat().st_size / 1024:.1f} KB")


# Eczar: keep the variable weight axis, limited to 500-700 (the weights the site uses).
write(TTFont(SRC / "Eczar-Variable.ttf"), "eczar-var.woff2", wght_range=(500, 700))

# Mukta: static weights.
for weight, name in [(200, "ExtraLight"), (400, "Regular"), (500, "Medium"), (600, "SemiBold"), (700, "Bold")]:
    write(TTFont(SRC / f"Mukta-{name}.ttf"), f"mukta-{weight}.woff2")
