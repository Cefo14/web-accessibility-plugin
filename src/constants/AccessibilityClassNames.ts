import highlightClassNames from '@/styles/highlights.module.css';
import filterStyles from '@/styles/filter.module.css';

const HIGHLIGHTS_NAMES = {
  highlightTitles: highlightClassNames.highlightTitle,
  highlightLinks: highlightClassNames.highlightLink,
  highlightCursor: highlightClassNames.highlightCursor,
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
  ...HIGHLIGHTS_NAMES,
  ...FILTER_CLASS_NAMES,
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
