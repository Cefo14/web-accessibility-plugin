import type { ThemeColors, ColorFamily } from '@/types/WebAccessibilityPluginConfig';

/**
 * Applies a single color family to CSS custom properties
 * @param prefix - CSS variable prefix (e.g., 'primary', 'secondary')
 * @param colors - Color family configuration
 */
const applyColorFamily = (prefix: string, colors: ColorFamily): void => {
  const root = document.documentElement;
  
  if (colors.light) root.style.setProperty(`--wap-color-${prefix}-light`, colors.light);
  if (colors.base) root.style.setProperty(`--wap-color-${prefix}`, colors.base);
  if (colors.dark) root.style.setProperty(`--wap-color-${prefix}-dark`, colors.dark);
  if (colors.text) root.style.setProperty(`--wap-color-${prefix}-text`, colors.text);
};

/**
 * Applies theme colors to CSS custom properties in :root
 * Only updates the colors that are provided in the configuration
 * 
 * @param colors - Partial theme colors configuration
 */
export const applyThemeColors = (colors?: Partial<ThemeColors>): void => {
  if (!colors) return;

  if (colors.primary) applyColorFamily('primary', colors.primary);
  if (colors.secondary) applyColorFamily('secondary', colors.secondary);
  if (colors.info) applyColorFamily('info', colors.info);
  if (colors.warning) applyColorFamily('warning', colors.warning);
  if (colors.danger) applyColorFamily('danger', colors.danger);
};
