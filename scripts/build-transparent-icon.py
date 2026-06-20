"""Build transparent Sortorium icon PNG + SVG for favicon/metadata."""
from __future__ import annotations

import base64
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
BRAND = ROOT / "public" / "assets" / "img" / "brand"
SOURCE = BRAND / "sortorium-icon-source.png"
ICON_PNG = BRAND / "sortorium-icon.png"
ICON_SVG = BRAND / "sortorium-icon.svg"
FAVICON = ROOT / "public" / "favicon.png"

# Icon inset within the canvas — slightly smaller so the tab favicon doesn't feel oversized.
ICON_SCALE = 0.82


def remove_dark_background(img: Image.Image) -> Image.Image:
    rgba = img.convert("RGBA")
    pixels = rgba.load()
    w, h = rgba.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            lum = 0.299 * r + 0.587 * g + 0.114 * b
            if lum < 80 or (r < 90 and g < 90 and b < 90):
                pixels[x, y] = (r, g, b, 0)
    # trim transparent padding
    bbox = rgba.getbbox()
    return rgba.crop(bbox) if bbox else rgba


def fit_on_canvas(icon: Image.Image, canvas_size: int, scale: float = ICON_SCALE) -> Image.Image:
    canvas = Image.new("RGBA", (canvas_size, canvas_size), (0, 0, 0, 0))
    max_dim = max(1, int(canvas_size * scale))
    scaled = icon.copy()
    scaled.thumbnail((max_dim, max_dim), Image.Resampling.LANCZOS)
    x = (canvas_size - scaled.width) // 2
    y = (canvas_size - scaled.height) // 2
    canvas.paste(scaled, (x, y), scaled)
    return canvas


def main() -> None:
    icon = remove_dark_background(Image.open(SOURCE))

    for size in (512, 64, 32):
        fit_on_canvas(icon, size).save(BRAND / f"sortorium-icon-{size}.png")

    # Full-size export: square canvas with same inset ratio
    max_side = max(icon.size)
    canvas_side = max_side
    padded = fit_on_canvas(icon, canvas_side)
    padded.save(ICON_PNG)

    favicon = Image.open(BRAND / "sortorium-icon-32.png")
    favicon.save(FAVICON)

    png64 = BRAND / "sortorium-icon-64.png"
    b64 = base64.b64encode(png64.read_bytes()).decode("ascii")
    w, h = Image.open(png64).size
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" '
        f'viewBox="0 0 {w} {h}" fill="none">\n'
        f'  <image width="{w}" height="{h}" '
        f'href="data:image/png;base64,{b64}"/>\n'
        f"</svg>\n"
    )
    ICON_SVG.write_text(svg, encoding="utf-8")
    print(f"Wrote {ICON_PNG} ({padded.size}), {ICON_SVG}, {FAVICON}")


if __name__ == "__main__":
    main()
