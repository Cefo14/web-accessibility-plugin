import type { Mirror } from '@/types/Mirror';
import { getInitialComputedStyle } from './getInitialComputedStyle';
import type { HTMLElementUpdater } from './HTMLElementUpdater';

const DEFAULT = '-' as const;
type Default = typeof DEFAULT;

export type FontWeight = Default | 'normal' | 'bold' | 'lighter';

export const FONT_WEIGHT: Mirror<FontWeight> = {
  [DEFAULT]: DEFAULT,
  lighter: 'lighter',
  normal: 'normal',
  bold: 'bold',
};

export class FontWeightAdjuster implements HTMLElementUpdater {
  public readonly default: Default;

  constructor() {
    this.default = DEFAULT;
  }

  public update(element: HTMLElement, fontWeight: FontWeight) : undefined {
    const originalValue = getInitialComputedStyle(element, 'fontWeight');
    const value = fontWeight === this.default ? originalValue : fontWeight;
    element.style.setProperty('font-weight', value);
  }
}

export const fontWeightAdjuster = new FontWeightAdjuster();
