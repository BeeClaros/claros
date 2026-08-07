"""Remove flat / checkerboard backgrounds from bee PNGs."""

from __future__ import annotations

from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter


def _neutral_background_mask(rgb: np.ndarray) -> np.ndarray:
    """Detect white, light-gray checkerboard, and near-black backdrop pixels."""
    r = rgb[..., 0].astype(np.int16)
    g = rgb[..., 1].astype(np.int16)
    b = rgb[..., 2].astype(np.int16)
    mx = np.maximum(np.maximum(r, g), b)
    mn = np.minimum(np.minimum(r, g), b)
    spread = mx - mn
    lum = (r + g + b) / 3.0

    # Checkerboard / white / light gray (low saturation, bright).
    light_neutral = (spread < 22) & (lum >= 178)

    # Near-black backdrop (low saturation, very dark) — not bee gold.
    dark_neutral = (spread < 18) & (mx < 40)

    return light_neutral | dark_neutral


def remove_background(path_in: Path, path_out: Path, *, feather: float = 1.0) -> None:
    img = Image.open(path_in).convert("RGBA")
    data = np.array(img, dtype=np.uint8)
    h, w = data.shape[:2]
    rgb = data[:, :, :3]

    is_bg = _neutral_background_mask(rgb)

    # Flood-fill from borders through connected background pixels.
    visited = np.zeros((h, w), dtype=bool)
    bg_mask = np.zeros((h, w), dtype=bool)
    q: deque[tuple[int, int]] = deque()

    for x in range(w):
        for y in (0, h - 1):
            if is_bg[y, x] and not visited[y, x]:
                visited[y, x] = True
                q.append((y, x))
    for y in range(h):
        for x in (0, w - 1):
            if is_bg[y, x] and not visited[y, x]:
                visited[y, x] = True
                q.append((y, x))

    while q:
        y, x = q.popleft()
        bg_mask[y, x] = True
        for dy, dx in ((-1, 0), (1, 0), (0, -1), (0, 1)):
            ny, nx = y + dy, x + dx
            if 0 <= ny < h and 0 <= nx < w and not visited[ny, nx] and is_bg[ny, nx]:
                visited[ny, nx] = True
                q.append((ny, nx))

    alpha = data[:, :, 3].astype(np.float32)
    alpha[bg_mask] = 0.0

    # Also punch out any remaining bright neutral pixels globally (checkerboard
    # islands that aren't edge-connected). Safe because bee gold/dark aren't neutral.
    alpha[is_bg & ~bg_mask] = 0.0

    edge = np.array(
        Image.fromarray((bg_mask * 255).astype(np.uint8), "L").filter(
            ImageFilter.GaussianBlur(radius=feather)
        ),
        dtype=np.float32,
    ) / 255.0
    alpha = np.clip(alpha * (1.0 - edge * 0.85), 0, 255)

    data[:, :, 3] = alpha.astype(np.uint8)
    out = Image.fromarray(data, "RGBA")

    bbox = out.getbbox()
    if bbox:
        out = out.crop(bbox)

    path_out.parent.mkdir(parents=True, exist_ok=True)
    out.save(path_out, optimize=True)

    a = np.array(out)[:, :, 3]
    print(
        f"Saved {path_out} ({out.size[0]}x{out.size[1]}) "
        f"transparent={round((a < 10).sum() / a.size * 100, 1)}%"
    )


def main() -> None:
    root = Path(__file__).resolve().parents[1]
    public = root / "public" / "v7"
    assets = Path.home() / ".cursor" / "projects" / "c-Users-franc-Enxame" / "assets"

    for dest, src_name in (
        ("bee-symbol.png", "bee-symbol-v2.png"),
        ("bee-hero.png", "bee-hero-v2.png"),
    ):
        src = assets / src_name
        if not src.exists():
            raise FileNotFoundError(src)
        dest_path = public / dest
        Image.open(src).save(dest_path)
        remove_background(dest_path, dest_path, feather=1.0)

    symbol = Image.open(public / "bee-symbol.png").convert("RGBA")
    symbol.resize((64, 64), Image.Resampling.LANCZOS).save(
        root / "app" / "v7" / "icon.png", optimize=True
    )
    print("Saved app/v7/icon.png")


if __name__ == "__main__":
    main()
