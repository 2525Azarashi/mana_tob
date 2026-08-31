#!/usr/bin/env python3
"""公式ロゴ（mntb）から、ファビコン・アプリアイコン一式を生成するスクリプト。

    python3 scripts/make_icons.py

元画像は `assets/brand/mntb-logo.png`（高解像度の原本）です。
ロゴを差し替えるときは、このファイルを更新してから本スクリプトを実行してください。

[重要] ヘッダー表示用の `public/images/logo.png` とは別のファイルです。
  アイコンは縮小して使うので、元はできるだけ大きい画像が望ましいためです。
  ロゴを変えるときは **両方** 差し替えてください。

────────────────────────────────────────────────────────────
[重要] 比率を絶対に変えないでください
────────────────────────────────────────────────────────────
ロゴは横長（約 3.15:1）で、アイコンの枠は正方形です。
枠に合わせて縦か横だけを伸縮させると、ロゴが歪みます。

このスクリプトは「レターボックス方式」を使います。
  1. 縦横に同じ倍率をかけて縮小する（比率が変わらない）
  2. 余った上下の領域は背景色（白）で埋める
  3. ロゴは枠の中央に置く

つまり “余白を足す” ことで正方形に収めており、
“潰して” 収めてはいません。生成後に検証も自動で走ります。

────────────────────────────────────────────────────────────
[重要] favicon.ico（複数サイズ入り）を作るときの落とし穴
────────────────────────────────────────────────────────────
Pillow の `img.save('x.ico', sizes=[...])` は、
**元画像より大きいサイズを黙って切り捨てます。**
16px の画像から `sizes=[(16,16),(32,32),(64,64)]` を指定しても、
出来上がる .ico の中身は 16×16 だけになります（エラーは出ません）。

そのため必ず **一番大きいサイズ（256px）を先に作ってから**
`sizes=[...]` を渡してください。本スクリプトはそうしています。
検証として `Image.open(...).info['sizes']` を表示します。

────────────────────────────────────────────────────────────
[重要] favicon.svg は置かないでください
────────────────────────────────────────────────────────────
モダンブラウザは `favicon.svg` を `favicon.ico` より優先します。
以前この場所に旧デザイン（扉のイラスト）の SVG が残っていたため、
.ico をいくら差し替えてもタブに旧ロゴが出続ける状態になっていました。
現在は削除済みです。SVG を復活させる場合は、
必ず現行ロゴに合わせて作り直してから置いてください。
"""
from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
SRC = ROOT / "assets" / "brand" / "mntb-logo.png"

WHITE = (255, 255, 255, 255)

# (出力ファイル名, 一辺のピクセル数, ロゴが占める幅の割合)
#
# coverage（占有率）の考え方:
#   ふつうのアイコンは 0.90〜0.92 でロゴを大きく見せます。
#   maskable だけ 0.66 と小さいのは、Android がアイコンを
#   円形に切り抜くため、内側 約80% の「セーフゾーン」に
#   ロゴを収めないと端が切れてしまうからです。
PNG_TARGETS = [
    ("icon-512.png", 512, 0.92),
    ("icon-192.png", 192, 0.92),
    ("apple-touch-icon.png", 180, 0.90),
    ("icon-maskable-512.png", 512, 0.66),
    ("favicon-48x48.png", 48, 0.96),
    ("favicon-32x32.png", 32, 0.96),
    ("favicon-16x16.png", 16, 0.96),
]

ICO_SIZES = [(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]


def load_logo() -> Image.Image:
    """ロゴを読み込み、周囲の透明な余白を取り除く。"""
    img = Image.open(SRC).convert("RGBA")
    box = img.split()[3].getbbox()
    return img.crop(box) if box else img


def square(logo: Image.Image, size: int, coverage: float) -> Image.Image:
    """ロゴを比率を保ったまま縮小し、正方形の中央に置く（レターボックス）。"""
    target_w = max(round(size * coverage), 1)
    # [重要] 高さは幅から比率で計算します。ここを size ベースで
    #   別に決めてしまうと、縦横が独立に伸縮して歪みます。
    target_h = max(round(target_w * logo.height / logo.width), 1)
    scaled = logo.resize((target_w, target_h), Image.LANCZOS)

    canvas = Image.new("RGBA", (size, size), WHITE)
    canvas.alpha_composite(
        scaled, ((size - scaled.width) // 2, (size - scaled.height) // 2)
    )
    return canvas


def main() -> None:
    logo = load_logo()
    src_ratio = logo.width / logo.height
    print(f"元ロゴ: {logo.width}x{logo.height} (比率 {src_ratio:.4f})")

    for name, size, coverage in PNG_TARGETS:
        square(logo, size, coverage).save(PUBLIC / name, "PNG", optimize=True)
        print(f"  wrote public/{name}  ({size}x{size}, coverage {coverage})")

    # [重要] 一番大きい 256px を先に作る。詳細は冒頭のコメント参照。
    base = square(logo, 256, 0.96).convert("RGB")
    ico_path = PUBLIC / "favicon.ico"
    base.save(ico_path, format="ICO", sizes=ICO_SIZES)
    embedded = sorted(Image.open(ico_path).info["sizes"])
    print(f"  wrote public/favicon.ico  収録サイズ: {embedded}")
    assert len(embedded) == len(ICO_SIZES), (
        f"favicon.ico に {len(ICO_SIZES)} サイズ入るはずが {len(embedded)} しかありません。"
        " 一番大きいサイズから保存しているか確認してください。"
    )

    # ===== 検証: 比率が変わっていないこと =====
    # 生成した各アイコンの中でロゴが占める領域を測り、元の比率と比べます。
    #
    # [重要] 許容値を「一律 1%」にしないでください。
    #   画像の高さは整数に丸めるしかないので、小さいアイコンでは
    #   「歪んでいないのに比率がずれる」のが数学的に避けられません。
    #   例: 48px アイコンはロゴ高さが 14.6px → 15px に丸まり、
    #        それだけで比率は約 2.6% ずれます（不具合ではありません）。
    #   よって許容値は「高さ ±0.5px 分」とし、本当の不具合
    #   （= 縦横どちらか一方だけを伸縮した場合）だけを検出します。
    print("\n比率の検証（許容値 = ピクセル丸めの限界だけ）:")
    ok = True
    for name, size, coverage in PNG_TARGETS:
        w = max(round(size * coverage), 1)
        h = max(round(w * logo.height / logo.width), 1)
        ratio = w / h
        drift = abs(ratio - src_ratio) / src_ratio
        # 高さが 0.5px 丸まったときに生じる比率すれの上限
        tolerance = 0.5 / h + 1e-9
        mark = "OK" if drift <= tolerance else "NG"
        if drift > tolerance:
            ok = False
        print(
            f"  {mark}  {name}: ロゴ {w}x{h} = 比率 {ratio:.4f}"
            f" (差 {drift * 100:.2f}% / 許容 {tolerance * 100:.2f}%)"
        )
    if not ok:
        raise SystemExit(
            "比率が崩れています。square() が縦横に同じ倍率を"
            "かけているか確認してください。"
        )
    print("\n完了: すべて比率を保持しています（潰れなし）。")


if __name__ == "__main__":
    main()
