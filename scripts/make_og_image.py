#!/usr/bin/env python3
"""OGP画像 (public/og-image.png, 1200x630) を生成するスクリプト。

文言を変えたいときは下部の TEXT 定数を編集して以下を実行してください:
    python3 scripts/make_og_image.py
"""
from __future__ import annotations

import subprocess
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"

W, H = 1200, 630
BRAND = (10, 61, 98)
BRAND_LIGHT = (15, 78, 124)
ACCENT = (25, 118, 210)
SKY = (127, 212, 255)

SANS_BOLD = "/usr/share/fonts/opentype/noto/NotoSansCJK-Black.ttc"
SANS_MED = "/usr/share/fonts/opentype/noto/NotoSansCJK-Medium.ttc"
SANS_REG = "/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc"

TITLE = "学びの扉"
TITLE_EN = "Manabi-no-Tobira"
TAGLINE = "～私たちにできることを～"
LEAD = "高校生・受験生のための無料教材と学びの場をつくる学生団体"
FOOTER = "manatobi.jp　｜　学習アプリを開発・運営"


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    """CJK 対応フォントを読み込む（.ttc は JP フェイスを選択）。"""
    for index in (0, 1, 2, 3):
        try:
            f = ImageFont.truetype(path, size, index=index)
            if f.getbbox("マ")[2] > 0:
                return f
        except Exception:
            continue
    return ImageFont.load_default()


def vertical_gradient(size, top, bottom) -> Image.Image:
    w, h = size
    base = Image.new("RGB", (1, h))
    px = base.load()
    for y in range(h):
        t = y / max(h - 1, 1)
        px[0, y] = tuple(round(top[i] + (bottom[i] - top[i]) * t) for i in range(3))
    return base.resize((w, h), Image.BILINEAR)


def door_icon(box: int) -> Image.Image:
    """favicon.svg を透過 PNG としてラスタライズして流用する。"""
    out = PUBLIC / "og-icon-tmp.png"
    subprocess.run(
        ["rsvg-convert", "-w", str(box), "-h", str(box),
         str(PUBLIC / "favicon.svg"), "-o", str(out)],
        check=True,
    )
    img = Image.open(out).convert("RGBA")
    out.unlink(missing_ok=True)
    return img


def main() -> None:
    img = vertical_gradient((W, H), BRAND_LIGHT, BRAND).convert("RGBA")
    d = ImageDraw.Draw(img)

    # 右下の装飾円（ブランドのアクセント）
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse((W - 300, H - 300, W + 190, H + 190), fill=ACCENT + (60,))
    gd.ellipse((W - 190, H - 190, W + 150, H + 150), fill=SKY + (40,))
    img = Image.alpha_composite(img, glow)
    d = ImageDraw.Draw(img)

    # ロゴアイコン
    icon = door_icon(132)
    img.paste(icon, (90, 92), icon)

    # 団体名
    d.text((250, 104), TITLE, font=font(SANS_BOLD, 82), fill=(255, 255, 255))
    d.text((256, 196), TITLE_EN, font=font(SANS_MED, 30), fill=SKY)

    # アクセントの罫線
    d.rounded_rectangle((90, 288, 330, 296), radius=4, fill=SKY)

    # タグライン・リード文
    d.text((90, 340), TAGLINE, font=font(SANS_BOLD, 46), fill=(255, 255, 255))
    d.text((90, 424), LEAD, font=font(SANS_REG, 30), fill=(203, 225, 244))

    # フッター
    d.text((90, 520), FOOTER, font=font(SANS_MED, 26), fill=SKY)

    dest = PUBLIC / "og-image.png"
    img.convert("RGB").save(dest, "PNG", optimize=True)
    print(f"wrote {dest.relative_to(ROOT)} ({dest.stat().st_size:,} bytes)")


if __name__ == "__main__":
    main()
