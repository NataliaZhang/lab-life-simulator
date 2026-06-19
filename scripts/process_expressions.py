#!/usr/bin/env python3
"""
处理学生表情包 v2：将 2 行 × 4 列表情图分割为 8 张独立头像图。

算法：
  - 从图片四边像素自动检测背景色（不假设背景是纯白，兼容偏灰/偏黄）
  - 用色差（与背景的最大通道差）区分内容与背景
  - 用投影密度谷值定位格子边界，无需明显分隔线

用法：
  单张: python process_expressions.py <输入图片> [输出目录]
  批量: python process_expressions.py --all <temp目录> <输出根目录>
  调试: python process_expressions.py --debug <输入图片> [输出目录]
        (额外输出 _debug_splits.png，标注切割位置)

依赖：pip install Pillow numpy
"""

import sys
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw

# ── 参数 ───────────────────────────────────────────────────────────────────────

OUTPUT_SIZE      = 512
PADDING_RATIO    = 0.10   # 每边 10% padding，防圆形头像裁到头发
ROWS, COLS       = 2, 4   # 表情包格子行列数
BG_TOLERANCE     = 35     # 像素与背景色的最大通道差，超过即视为内容
BG_SAMPLE_WIDTH  = 15     # 从四边各取多少像素宽度来采样背景色

EXPRESSIONS = [
    "neutral", "happy", "surprised", "angry",
    "sad", "embarrassed", "smug", "special",
]


# ── 背景色检测 ────────────────────────────────────────────────────────────────

def detect_background(arr: np.ndarray) -> np.ndarray:
    """
    从图片四周边缘采样，用中位数估计背景色 [R, G, B]。
    不假设背景是白色，兼容偏灰、偏黄、偏暖等各种色调。
    """
    h, w = arr.shape[:2]
    sw = min(BG_SAMPLE_WIDTH, h // 6, w // 6)

    border = np.concatenate([
        arr[:sw,  :,   :3].reshape(-1, 3),   # 上边
        arr[-sw:, :,   :3].reshape(-1, 3),   # 下边
        arr[:,  :sw,  :3].reshape(-1, 3),    # 左边
        arr[:, -sw:,  :3].reshape(-1, 3),    # 右边
    ])
    return np.median(border, axis=0)   # shape: (3,)


def content_mask(arr: np.ndarray, bg: np.ndarray) -> np.ndarray:
    """
    返回布尔矩阵：True 表示该像素是内容（与背景色有明显色差）。
    用最大通道差衡量，对各种颜色的背景都有效。
    """
    diff = np.abs(arr[:, :, :3].astype(np.int16) - bg.astype(np.int16))
    return diff.max(axis=2) > BG_TOLERANCE


# ── 基础工具 ──────────────────────────────────────────────────────────────────

def to_rgb_white(img: Image.Image) -> Image.Image:
    """转换为 RGB，透明像素替换为白色。"""
    if img.mode in ('RGBA', 'LA'):
        bg = Image.new('RGB', img.size, (255, 255, 255))
        bg.paste(img.convert('RGB'), mask=img.split()[-1])
        return bg
    if img.mode == 'P':
        return to_rgb_white(img.convert('RGBA'))
    return img.convert('RGB')


def smooth1d(profile: np.ndarray, window: int) -> np.ndarray:
    """滑动平均平滑。"""
    kernel = np.ones(window) / window
    return np.convolve(profile, kernel, mode='same')


# ── 外边白边裁剪 ───────────────────────────────────────────────────────────────

def crop_outer_border(img: Image.Image, bg: np.ndarray) -> Image.Image:
    """根据自动检测的背景色，裁掉四周多余的背景边缘。"""
    arr = np.array(img)
    mask = content_mask(arr, bg)
    rows = np.where(mask.any(axis=1))[0]
    cols = np.where(mask.any(axis=0))[0]
    if len(rows) == 0 or len(cols) == 0:
        return img
    return img.crop((cols[0], rows[0], cols[-1] + 1, rows[-1] + 1))


# ── 分割点检测 ────────────────────────────────────────────────────────────────

def find_section_minima(profile: np.ndarray, n_splits: int) -> list[int]:
    """
    在密度投影剖面中，为每个切割点在其预期位置附近找局部最小值。

    将剖面分成 n_splits+1 段，在每段的分界处搜索密度最低点，
    即表情图案之间的空白区域。无需明显分隔线也能定位。
    """
    size = len(profile)
    smooth_w = max(3, size // 20)
    smoothed = smooth1d(profile, smooth_w)

    splits = []
    section_size = size / (n_splits + 1)

    for k in range(1, n_splits + 1):
        center = int(section_size * k)
        half_w = max(5, int(section_size * 0.35))
        lo = max(1, center - half_w)
        hi = min(size - 1, center + half_w)
        local_min = lo + int(np.argmin(smoothed[lo:hi]))
        splits.append(local_min)

    return splits


def split_sheet(img: Image.Image, bg: np.ndarray) -> tuple[list[Image.Image], list[int], list[int]]:
    """将表情包分割为 ROWS×COLS 格，返回 (cells, h_splits, v_splits)。"""
    arr = np.array(img)
    h, w = arr.shape[:2]
    mask = content_mask(arr, bg)

    row_density = mask.mean(axis=1).astype(float)   # 每行内容密度
    col_density = mask.mean(axis=0).astype(float)   # 每列内容密度

    h_splits = find_section_minima(row_density, ROWS - 1)
    v_splits = find_section_minima(col_density, COLS - 1)

    row_bounds = [0] + h_splits + [h]
    col_bounds  = [0] + v_splits + [w]

    cells = []
    for r in range(ROWS):
        for c in range(COLS):
            cell = img.crop((
                col_bounds[c],
                row_bounds[r],
                col_bounds[c + 1],
                row_bounds[r + 1],
            ))
            cells.append(cell)

    return cells, h_splits, v_splits


# ── 格子内文字去除 ─────────────────────────────────────────────────────────────

def trim_text_from_bottom(img: Image.Image, bg: np.ndarray) -> Image.Image:
    """
    尝试去除格子底部的文字标签（如"开心""愤怒"等）。

    判断：在内容区下方 60% 处寻找空白带，若空白带以下的内容
    不超过总内容高度的 20%，认为是文字并截除。不确定时原样返回。
    """
    arr = np.array(img)
    _, w = arr.shape[:2]
    mask = content_mask(arr, bg)
    row_density = mask.mean(axis=1)

    content_rows = np.where(row_density > 0.005)[0]
    if len(content_rows) < 5:
        return img

    top       = content_rows[0]
    bottom    = content_rows[-1]
    content_h = bottom - top + 1

    search_from = top + int(content_h * 0.60)
    smoothed    = smooth1d(row_density, max(2, content_h // 20))

    gap_start = None
    in_gap = False
    potential = 0
    for row in range(search_from, bottom + 1):
        if smoothed[row] < 0.008:
            if not in_gap:
                potential = row
                in_gap = True
        else:
            if in_gap:
                in_gap = False
                if row - potential >= max(2, int(content_h * 0.02)):
                    gap_start = potential
                    break

    if gap_start is None:
        return img

    below_h = bottom - gap_start
    if below_h <= content_h * 0.20:
        trimmed = img.crop((0, 0, w, gap_start))
        if trimmed.height > 20:
            return trimmed

    return img


# ── 单格 → 头像 ───────────────────────────────────────────────────────────────

def make_avatar(cell: Image.Image, bg: np.ndarray) -> Image.Image:
    """
    将单格表情处理成 OUTPUT_SIZE × OUTPUT_SIZE 的头像：
    去文字 → 裁背景边 → 补正方形 → 加 padding → 缩放
    """
    # 去文字
    cell = trim_text_from_bottom(cell, bg)

    # 裁背景边
    arr = np.array(cell)
    mask = content_mask(arr, bg)
    rows = np.where(mask.any(axis=1))[0]
    cols = np.where(mask.any(axis=0))[0]

    if len(rows) == 0 or len(cols) == 0:
        return cell.convert("RGBA").resize((OUTPUT_SIZE, OUTPUT_SIZE), Image.LANCZOS)

    cropped = cell.crop((cols[0], rows[0], cols[-1] + 1, rows[-1] + 1))
    cw, ch = cropped.size

    # 补正方形（背景色填充，而不是强制白色）
    bg_color = tuple(int(v) for v in bg) + (255,)
    side   = max(cw, ch)
    square = Image.new("RGBA", (side, side), bg_color)
    square.paste(cropped.convert("RGBA"), ((side - cw) // 2, (side - ch) // 2))

    # 缩小内容留 padding
    content_size = int(OUTPUT_SIZE * (1 - 2 * PADDING_RATIO))
    content = square.resize((content_size, content_size), Image.LANCZOS)

    # 粘到最终画布（同背景色）
    final = Image.new("RGBA", (OUTPUT_SIZE, OUTPUT_SIZE), bg_color)
    pad = (OUTPUT_SIZE - content_size) // 2
    final.paste(content, (pad, pad), content)

    return final


# ── 调试可视化 ────────────────────────────────────────────────────────────────

def save_debug(sheet: Image.Image, h_splits: list[int], v_splits: list[int],
               output_dir: Path, stem: str) -> None:
    debug = sheet.convert("RGB").copy()
    draw  = ImageDraw.Draw(debug)
    w, h  = debug.size
    for y in h_splits:
        draw.line([(0, y), (w, y)], fill=(255, 0, 0), width=3)
    for x in v_splits:
        draw.line([(x, 0), (x, h)], fill=(0, 0, 255), width=3)
    path = output_dir / f"{stem}_debug_splits.png"
    debug.save(path)
    print(f"  [调试] 切割线 → {path}  (红=行切, 蓝=列切)")


# ── 主流程 ────────────────────────────────────────────────────────────────────

def process_file(input_path: Path, output_dir: Path, debug: bool = False) -> bool:
    print(f"\n[处理] {input_path.name}")

    try:
        raw = Image.open(input_path)
    except Exception as e:
        print(f"  ✗ 无法打开: {e}")
        return False

    output_dir.mkdir(parents=True, exist_ok=True)

    try:
        img = to_rgb_white(raw)
        arr = np.array(img)

        # 自动检测背景色
        bg = detect_background(arr)
        print(f"  背景色: RGB({bg[0]:.0f}, {bg[1]:.0f}, {bg[2]:.0f})")

        # 裁掉整张图的背景边缘
        sheet = crop_outer_border(img, bg)

        # 分割为 8 格
        cells, h_splits, v_splits = split_sheet(sheet, bg)
        assert len(cells) == 8

        if debug:
            save_debug(sheet, h_splits, v_splits, output_dir, input_path.stem)

        for name, cell in zip(EXPRESSIONS, cells):
            avatar = make_avatar(cell, bg)
            out_path = output_dir / f"{name}.png"
            avatar.save(out_path, "PNG")
            print(f"  → {out_path}")

        print(f"  ✓ 完成")
        return True

    except Exception as e:
        print(f"  ⚠ 失败（{e}），等分 fallback")
        try:
            img  = to_rgb_white(raw)
            arr  = np.array(img)
            bg   = detect_background(arr)
            w, h = img.size
            cw, ch = w // COLS, h // ROWS
            for i, name in enumerate(EXPRESSIONS):
                r, c = divmod(i, COLS)
                cell   = img.crop((c * cw, r * ch, (c + 1) * cw, (r + 1) * ch))
                avatar = make_avatar(cell, bg)
                avatar.save(output_dir / f"{name}.png", "PNG")
                print(f"  → {output_dir / name}.png (fallback)")
            print(f"  ✓ 完成（fallback）")
            return True
        except Exception as e2:
            print(f"  ✗ fallback 失败: {e2}")
            return False


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)

    if sys.argv[1] == "--all":
        if len(sys.argv) < 4:
            print("用法: python process_expressions.py --all <temp目录> <输出根目录>")
            sys.exit(1)
        temp_dir = Path(sys.argv[2])
        out_base = Path(sys.argv[3])
        images = sorted(p for p in temp_dir.iterdir()
                        if p.suffix.lower() in {".png", ".jpg", ".jpeg"})
        if not images:
            print(f"未找到图片: {temp_dir}")
            sys.exit(1)
        print(f"找到 {len(images)} 张图片...")
        ok = fail = 0
        for p in images:
            if process_file(p, out_base / p.stem):
                ok += 1
            else:
                fail += 1
        print(f"\n完成：{ok} 成功，{fail} 失败")
        print("请将各 UUID 子目录重命名为对应学生 ID（如 lin_xiaojuan/）")

    elif sys.argv[1] == "--debug":
        if len(sys.argv) < 3:
            print("用法: python process_expressions.py --debug <输入图片> [输出目录]")
            sys.exit(1)
        input_path = Path(sys.argv[2])
        out_dir    = Path(sys.argv[3]) if len(sys.argv) > 3 else Path("assets/img/students/expressions")
        process_file(input_path, out_dir, debug=True)

    else:
        input_path = Path(sys.argv[1])
        out_dir    = Path(sys.argv[2]) if len(sys.argv) > 2 else Path("assets/img/students/expressions")
        process_file(input_path, out_dir)


if __name__ == "__main__":
    main()
