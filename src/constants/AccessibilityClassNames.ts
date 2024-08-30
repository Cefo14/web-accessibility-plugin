import fontStyles from '@/Accessibility/font.module.css';
import filterStyles from '@/Accessibility/filter.module.css';

const FONT_CLASS_NAMES = {
  highlightTitles: fontStyles.highlightTitle,
  highlightLinks: fontStyles.highlightLink,
  incrementLetterSpacing: fontStyles.incrementLetterSpacing,
  incrementLineHeight: fontStyles.incrementLineHeight,
  incrementFontWeight: fontStyles.incrementFontWeight
} as const;

const FILTER_CLASS_NAMES = {
  hightContrast: filterStyles.hightContrast,
  hightSaturation: filterStyles.hightSaturation,
  invertColors: filterStyles.invertColors,
  protanopia: filterStyles.protanopia,
  deuteranopia: filterStyles.deuteranopia,
  tritanopia: filterStyles.tritanopia,
  achromatopsia: filterStyles.achromatopsia,
  achromatomaly: filterStyles.achromatomaly
} as const;

export const ACCESSIBILITY_CLASS_NAMES = {
  ...FONT_CLASS_NAMES,
  ...FILTER_CLASS_NAMES
} as const;

export const ACCESSIBILITY_CLASS_NAMES_KEYS = Object
  .keys(ACCESSIBILITY_CLASS_NAMES)
  .reduce((acc, key) => ({
    ...acc,
    [key]: key
  }), {} as Record<keyof typeof ACCESSIBILITY_CLASS_NAMES, string>);

export type AccessibilityClassNamesType = typeof ACCESSIBILITY_CLASS_NAMES;

export type AccessibilityClassNamesKeys = keyof typeof ACCESSIBILITY_CLASS_NAMES;

export type AccessibilityClassNamesValues = AccessibilityClassNamesType[AccessibilityClassNamesKeys];
