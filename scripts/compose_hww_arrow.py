"""Compose light tiny bees into a loose direction formation (transparent)."""

from __future__ import annotations

import math
import random
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public" / "v8" / "bg-movement.png"
DST = ROOT / "public" / "v8" / "how-we-work-movement.png"

random.seed(19)


def extract_sprites(path: Path) -> list[Image.Image]:
    im = Image.open(path).convert("RGB")
    arr = np.array(im).astype(np.float32)
    r, g, b = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]
    lum = 0.299 * r + 0.587 * g + 0.114 * b
    is_lime = (g > 150) & (g > r + 20) & (g > b + 20)
    # Only ink strokes — paper stays fully transparent (no square tiles)
    mask = (lum < 150) & ~is_lime

    labeled, n = ndimage.label(mask)
    sprites: list[Image.Image] = []
    for i in range(1, n + 1):
        ys, xs = np.where(labeled == i)
        area = len(xs)
        if area < 35 or area > 1800:
            continue
        pad = 2
        x0, x1 = max(0, int(xs.min()) - pad), min(im.width, int(xs.max()) + pad + 1)
        y0, y1 = max(0, int(ys.min()) - pad), min(im.height, int(ys.max()) + pad + 1)
        bw, bh = x1 - x0, y1 - y0
        if bw < 10 or bh < 10 or bw > 80 or bh > 80:
            continue

        local = labeled[y0:y1, x0:x1] == i
        # Dilate slightly so wing tips aren't clipped, still no paper fill
        local = ndimage.binary_dilation(local, iterations=1)
        clum = lum[y0:y1, x0:x1]

        # Alpha strictly from ink darkness — nothing outside stroke
        ink = local & (clum < 175)
        # Soft edge on ink: darker = more opaque
        alpha = np.zeros_like(clum, dtype=np.float32)
        alpha[ink] = np.clip((175 - clum[ink]) / 130.0, 0, 1) * 255

        # Pure light / white stroke (reads on black)
        strength = np.clip((175 - clum) / 130.0, 0, 1)
        rgba = np.zeros((bh, bw, 4), dtype=np.float32)
        rgba[:, :, 0] = 235 + strength * 20
        rgba[:, :, 1] = 238 + strength * 17
        rgba[:, :, 2] = 245 + strength * 10
        rgba[:, :, 3] = alpha
        # Zero RGB where fully transparent (avoid premultiply fringe)
        rgba[alpha < 1, 0:3] = 0

        spr = Image.fromarray(rgba.astype(np.uint8), "RGBA")
        bbox = spr.getbbox()
        if not bbox:
            continue
        spr = spr.crop(bbox)
        # Reject leftover “tiles”: almost rectangular solid alpha
        a = np.array(spr)[:, :, 3]
        fill = (a > 20).mean()
        if fill > 0.72:
            continue
        sprites.append(spr)

    sprites.sort(key=lambda s: s.width * s.height, reverse=True)
    print(f"kept {len(sprites)} sprites")
    return sprites[:48]


def place(
    canvas: Image.Image,
    img: Image.Image,
    cx: float,
    cy: float,
    target_h: float,
    angle_deg: float,
    opacity: float,
) -> None:
    scale = target_h / max(1, img.height)
    nw = max(5, int(img.width * scale))
    nh = max(5, int(img.height * scale))
    resized = img.resize((nw, nh), Image.Resampling.LANCZOS)
    rotated = resized.rotate(angle_deg, expand=True, resample=Image.Resampling.BICUBIC)
    if opacity < 1:
        a = np.array(rotated)
        a[:, :, 3] = (a[:, :, 3].astype(np.float32) * opacity).astype(np.uint8)
        # clear rgb where transparent
        a[a[:, :, 3] < 2, 0:3] = 0
        rotated = Image.fromarray(a, "RGBA")
    x = int(cx - rotated.width / 2)
    y = int(cy - rotated.height / 2)
    if x >= canvas.width or y >= canvas.height or x + rotated.width < 0 or y + rotated.height < 0:
        return
    canvas.alpha_composite(rotated, (x, y))


def main() -> None:
    sprites = extract_sprites(SRC)
    if len(sprites) < 8:
        raise SystemExit(f"Not enough sprites: {len(sprites)}")

    W, H = 1600, 900
    canvas = Image.new("RGBA", (W, H), (0, 0, 0, 0))

    dir_deg = -22
    dir_rad = math.radians(dir_deg)

    def along(t: float, x0: float, y0: float, length: float) -> tuple[float, float]:
        x = x0 + math.cos(dir_rad) * length * t
        y = y0 + math.sin(dir_rad) * length * t
        perp = dir_rad + math.pi / 2
        bend = math.sin(t * math.pi) * 28
        return x + math.cos(perp) * bend, y + math.sin(perp) * bend

    def bee() -> Image.Image:
        return random.choice(sprites)

    # Loose scatter (left / mid-left)
    for _ in range(55):
        x = random.uniform(50, 620)
        y = random.uniform(120, 780)
        # thinner toward right of scatter zone so it blends into flow
        dens = 0.35 + 0.65 * max(0.0, (620 - x) / 570)
        if random.random() > dens:
            continue
        ang = dir_deg + random.uniform(-90, 90) * (0.4 + dens * 0.5)
        place(canvas, bee(), x, y, random.uniform(12, 20), ang, random.uniform(0.35, 0.7))

    # Soft flow / loose shaft — NOT a tight packed arrow
    x0, y0 = 480, 580
    length = 780
    for i in range(90):
        t = i / 89
        x, y = along(t, x0, y0, length)
        # wide, organic jitter — reads as direction, not a drawn arrow
        spread = 55 + (1 - t) * 70
        px = x + random.gauss(0, spread * 0.45)
        py = y + random.gauss(0, spread * 0.55)
        # occasional outliers
        if random.random() < 0.12:
            px += random.uniform(-80, 80)
            py += random.uniform(-90, 90)
        place(
            canvas,
            bee(),
            px,
            py,
            random.uniform(11, 18),
            dir_deg + random.uniform(-25, 25) * (1 - 0.4 * t),
            random.uniform(0.4, 0.85),
        )

    # Soft wedge suggestion at tip (sparse, imperfect)
    tip_x, tip_y = along(1.0, x0, y0, length)
    tip_x += math.cos(dir_rad) * 20
    tip_y += math.sin(dir_rad) * 20
    head_len = 200
    half_w = 140
    perp = dir_rad + math.pi / 2

    for wing in (-1.0, 1.0):
        for _ in range(28):
            u = random.uniform(0.05, 1.0)
            v = random.uniform(0.0, 1.0) ** 0.7
            # pull away from perfect edges
            u += random.gauss(0, 0.06)
            v = min(1.0, max(0.0, v + random.gauss(0, 0.12)))
            sx = tip_x + math.cos(dir_rad) * (-head_len * u) + math.cos(perp) * (wing * half_w * u * v)
            sy = tip_y + math.sin(dir_rad) * (-head_len * u) + math.sin(perp) * (wing * half_w * u * v)
            sx += random.gauss(0, 10)
            sy += random.gauss(0, 10)
            place(
                canvas,
                bee(),
                sx,
                sy,
                random.uniform(11, 17),
                dir_deg + random.uniform(-18, 18),
                random.uniform(0.4, 0.8),
            )

    # A few strays past the tip / around
    for _ in range(18):
        place(
            canvas,
            bee(),
            tip_x + random.gauss(0, 90),
            tip_y + random.gauss(0, 80),
            random.uniform(10, 16),
            dir_deg + random.uniform(-40, 40),
            random.uniform(0.3, 0.6),
        )

    canvas.save(DST, optimize=True)
    a = np.array(canvas)[:, :, 3]
    print(f"saved {DST}")
    print(f"transparent={round(float((a == 0).mean()) * 100, 1)}%")
    # sanity: sample opaque pixels should be light
    opaque = np.array(canvas)[a > 180]
    if len(opaque):
        print("mean RGB opaque", opaque[:, :3].mean(axis=0).round(1))


if __name__ == "__main__":
    main()
