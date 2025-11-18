/**
 * Color configuration for a single color family
 * Each color family has base, light, dark variants and text color
 */
export interface ColorFamily {
  light: string;
  base: string;
  dark: string;
  text: string;
}

/**
 * Complete theme color configuration
 * 
 * - primary: Main background/surface colors (required)
 * - secondary: Brand/accent colors (required)
 * - info: Interactive/action colors (optional - defaults to blue)
 * - warning: Caution/alert colors (optional - defaults to yellow)
 * - danger: Error/destructive colors (optional - defaults to red)
 */
export interface ThemeColors {
  primary: ColorFamily;
  secondary: ColorFamily;
  info?: ColorFamily;
  warning?: ColorFamily;
  danger?: ColorFamily;
}

/**
 * Configuration options for WebAccessibilityPlugin
 */
export interface WebAccessibilityPluginConfig {
  colors?: Partial<ThemeColors>;
}
