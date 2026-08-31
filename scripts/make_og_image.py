#!/usr/bin/env python3
"""OGP画像 (public/og-image.png, 1200x630) を生成するスクリプト。

文言を変えたいときは下部の TEXT 定数を編集して以下を実行してください:
    python3 scripts/make_og_image.py
"""
from __future__ import annotations

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
# [重要] 団体名「学びの扉」はサイトのヒーロー見出しと同じ「明朝体」で組みます。
#   Web 側は Zen Old Mincho ですが、この生成環境には入っていないため、
#   最も近い和文明朝の Noto Serif CJK JP Black を使います。
#   ここをゴシック体に戻すと、SNS 共有時の第一印象がサイト本体とズレます。
SERIF_BLACK = "/usr/share/fonts/opentype/noto/NotoSerifCJK-Black.ttc"
SERIF_MED = "/usr/share/fonts/opentype/noto/NotoSerifCJK-Medium.ttc"

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


def brand_logo(max_w: int, max_h: int) -> Image.Image:
    """公式ロゴ（mntb）を読み込み、指定枠に「比率を保ったまま」収める。

    [重要] 縦横どちらか一方だけを伸縮させないでください。ロゴが歪みます。
      両軸に同じ倍率をかける（= 収まる側の倍率を採用する）方式です。
      これはファビコン生成と同じ考え方で、README の
      「アイコンの作り方」にも同じ規則を書いています。

    [重要] かつては削除済みの favicon.svg（扉のイラスト）を
      rsvg-convert でラスタライズしていました。その SVG は
      もう存在しないため、必ず実ロゴ画像を使います。

    [重要] 元画像は scripts/make_icons.py と同じ
      assets/brand/mntb-logo.png を使います（高解像度の原本）。
      ロゴを差し替えるときは、その1ファイルを更新すれば
      アイコンと OGP 画像の両方に反映されます。
    """
    src = Image.open(ROOT / "assets" / "brand" / "mntb-logo.png").convert("RGBA")
    alpha_box = src.split()[3].getbbox()
    if alpha_box:
        src = src.crop(alpha_box)  # 透明の余白を取り除いてから合わせる
    scale = min(max_w / src.width, max_h / src.height)
    return src.resize(
        (max(round(src.width * scale), 1), max(round(src.height * scale), 1)),
        Image.LANCZOS,
    )


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

    # ===== 公式ロゴ（白い角丸パネルの上に置く）=====
    # [重要] ロゴの文字色は青系なので、濃紺の背景に直接置くと沈んで読めません。
    #   白いパネルを敷いてから、比率を保ったまま中央に合成します。
    logo = brand_logo(max_w=248, max_h=88)
    pad_x, pad_y = 26, 22
    panel_w = logo.width + pad_x * 2
    panel_h = logo.height + pad_y * 2
    panel_x, panel_y = 90, 86
    d.rounded_rectangle(
        (panel_x, panel_y, panel_x + panel_w, panel_y + panel_h),
        radius=22, fill=(255, 255, 255),
    )
    img.paste(logo, (panel_x + pad_x, panel_y + pad_y), logo)
    d = ImageDraw.Draw(img)

    # ===== 団体名（ヒーロー見出しと同じ明朝体）=====
    text_x = panel_x + panel_w + 42
    d.text((text_x, 92), TITLE, font=font(SERIF_BLACK, 78), fill=(255, 255, 255))
    d.text((text_x + 4, 186), TITLE_EN, font=font(SANS_MED, 28), fill=SKY)

    # アクセントの罫線
    d.rounded_rectangle((90, 296, 330, 304), radius=4, fill=SKY)

    # タグライン・リード文（タグラインも明朝で見出しと揃える）
    d.text((90, 348), TAGLINE, font=font(SERIF_MED, 44), fill=(255, 255, 255))
    d.text((90, 430), LEAD, font=font(SANS_REG, 30), fill=(203, 225, 244))

    # フッター
    d.text((90, 522), FOOTER, font=font(SANS_MED, 26), fill=SKY)

    dest = PUBLIC / "og-image.png"
    img.convert("RGB").save(dest, "PNG", optimize=True)
    print(f"wrote {dest.relative_to(ROOT)} ({dest.stat().st_size:,} bytes)")


if __name__ == "__main__":
    main()
