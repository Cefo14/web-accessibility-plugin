import type { TranslationModel } from './TranslationModel';

// English translation
export const en: TranslationModel = {
  'menu.title': 'Accessibility',
  'menu.description': 'This is the accessibility menu for the application.',
  'menu.openMenu': 'Open Menu',
  'menu.reset': 'Reset',
  'menu.close': 'Close Menu',
  'menu.language': 'Language',

  'section.font.title': 'Font Settings',
  'section.font.size': 'Size',
  'section.font.letterSpacing': 'Letter Spacing',
  'section.font.lineHeight': 'Line Height',
  'section.font.fontWeight': 'Weight',
  'section.font.fontFamily': 'Font',

  'section.colorFilter.title': 'Color Filters',
  'section.colorFilter.brightness': 'Brightness',
  'section.colorFilter.contrast': 'Contrast',
  'section.colorFilter.saturation': 'Saturation',
  'section.colorFilter.sepia': 'Sepia',
  'section.colorFilter.hue': 'Hue',
  'section.colorFilter.warm': 'Warm',
  'section.colorFilter.blue': 'Blue',
  'section.colorFilter.red': 'Red',
  'section.colorFilter.green': 'Green',
  'section.colorFilter.monochrome': 'Monochrome',
  'section.colorFilter.reset': 'Reset',

  'section.tools.title': 'Tools',
  'section.tools.highlightTitles': 'Highlight Titles',
  'section.tools.highlightLinks': 'Highlight Links',
  'section.tools.hideImages': 'Hide Images',
  'section.tools.stopAnimations': 'Stop Animations',
} as const;
