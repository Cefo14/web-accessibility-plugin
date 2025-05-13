import type { Mirror } from '@/types/Mirror';
import { getInitialComputedStyle } from './getInitialComputedStyle';
import type { CSSUpdater } from './CSSUpdater';

const DEFAULT = '-' as const;
type Default = typeof DEFAULT;

export type FontWeight = Default | 'normal' | 'bold' | 'lighter';

export const FONT_WEIGHT: Mirror<FontWeight> = {
  [DEFAULT]: DEFAULT,
  lighter: 'lighter',
  normal: 'normal',
  bold: 'bold',
};

export class FontWeightAdjuster implements CSSUpdater {
  public readonly defaultValue = DEFAULT;

  public update(element: HTMLElement, fontWeight: FontWeight) : undefined {
    const originalValue = getInitialComputedStyle(element, 'fontWeight');
    const value = fontWeight === this.defaultValue ? originalValue : fontWeight;
    element.style.setProperty('font-weight', value);
  }
}

export const fontWeightAdjuster = Object.freeze(new FontWeightAdjuster());
