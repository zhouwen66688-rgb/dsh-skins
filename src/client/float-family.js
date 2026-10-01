/**
 * Float-window token families (local feature: 浮窗通透度 / 浮窗颜色).
 *
 * Floating surfaces (settings modal, menus, dialogs, elevation layers,
 * hover cards, the switcher pop) ride the dedicated floatOpacity knob plus
 * a floatColor tint choice, detached from the main panelOpacity curve so
 * 通透度=0 keeps the chat glassy while the floaters stay readable.
 *
 * The choice swaps only the RGB family; each token keeps its baked alpha so
 * the layer-1 < layer-2 < layer-3 "越浮越实" hierarchy is preserved.
 *   starry → the skin's own family (as shipped, = 出厂星空蓝)
 *   dark   → a shared neutral ink family applied in BOTH theme modes
 */

/** Neutral ink family keyed by the float tokens it overrides. */
export const FLOAT_INK = {
  "--dsw-alias-bg-layer-1": "22, 22, 30",
  "--dsw-alias-bg-layer-2": "28, 28, 38",
  "--dsw-alias-bg-layer-3": "35, 35, 46",
  "--dsw-alias-bg-overlay": "20, 20, 28",
};

/**
 * Resolve the RGB triple for one float token under the chosen tint.
 * Unknown / legacy choices fall back to the skin's own (starry) family.
 */
export function floatRgb(colorChoice, tokenKey, starryRgb) {
  if (colorChoice === "dark") return FLOAT_INK[tokenKey] ?? starryRgb;
  return starryRgb;
}

/**
 * 磨砂浮窗（Plan A，主人裁决）：给消费浮窗底色但宿主未接磨砂的浮层统一
 * 补 backdrop-filter（复用主题的 --dsw-menu-backdrop-filter），重叠处文字
 * 不再互相透底。钩子用 ADR-0006 的 class 后缀并集策略——哈希漂移与结构
 * 变化各有一支兜底；失效仅影响磨砂观感，token 填充不受影响：
 *   _preview → HoverCard 预览卡（"已编辑 N 个文件"弹层等）
 *   _dialog  → 模态对话框（Modal 原语）
 *   [data-shortcut-modal="settings"] → 设置面板（稳定宿主钩子）
 *   .dsh-skins-pop → 皮肤自带切换器弹层
 * 菜单/选择器等宿主面板本就消费 menu-backdrop-filter，无需处理。
 */
export function floatFrostCss(bodySelector) {
  const targets = '[class*="_preview"], [class$="_dialog"], [data-shortcut-modal="settings"], .dsh-skins-pop';
  return (
    `${bodySelector} ${targets}{-webkit-backdrop-filter:var(--dsw-menu-backdrop-filter);` +
    "backdrop-filter:var(--dsw-menu-backdrop-filter)}"
  );
}
