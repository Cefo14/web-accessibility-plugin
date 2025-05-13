import type { Mirror } from '@/types/Mirror';
import { getInitialComputedStyle } from './getInitialComputedStyle';
import type { CSSUpdater } from './CSSUpdater';

const DEFAULT = '-' as const;
type Default = typeof DEFAULT;

export type FontFamily = Default | 'Arial' | 'OpenDyslexic' | 'serif' | 'sans-serif' | 'monospace';

export const FONT_FAMILY: Mirror<FontFamily> = {
  [DEFAULT]: DEFAULT,
  OpenDyslexic: 'OpenDyslexic',
  Arial: 'Arial',
  monospace: 'monospace',
  serif: 'serif',
  'sans-serif': 'sans-serif',
};

export class FontFamilyAdjuster implements CSSUpdater {
  public readonly defaultValue: Default;

  constructor() {
    this.defaultValue = DEFAULT;
  }

  public update(element: HTMLElement, fontFamily: FontFamily) : undefined {
    const originalValue = getInitialComputedStyle(element, 'fontFamily');
    const value = fontFamily === this.defaultValue ? originalValue : fontFamily;
    element.style.setProperty('font-family', value);
  }
}

export const fontFamilyAdjuster = Object.freeze(new FontFamilyAdjuster());
