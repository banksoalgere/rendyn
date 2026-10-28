"""Regenerate the committed font subsets with fonttools[woff] 4.67.0.

The original fonts remain available as CSS fallbacks for all other characters.
Run this script only when updating the source fonts; it is not a build dependency.
"""

from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont


fonts = Path(__file__).resolve().parent.parent / "public" / "fonts"
for name, suffix, characters in (
    ("dm-sans-latin", "basic", set(range(128)) | {0xA0, 0xA9, 0xB7} | set(range(0x2000, 0x2070))),
    ("geist-mono-latin", "shortcut", {0x20, 0x4B}),
):
    font = TTFont(fonts / f"{name}.woff2")
    options = subset.Options()
    options.flavor = "woff2"
    subsetter = subset.Subsetter(options=options)
    subsetter.populate(unicodes=characters)
    subsetter.subset(font)
    font.save(fonts / f"{name}-{suffix}.woff2")
