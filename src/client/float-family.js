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
