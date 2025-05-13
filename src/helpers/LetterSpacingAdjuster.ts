import type { CSSUpdater } from './CSSUpdater';
import { getInitialComputedStyle } from './getInitialComputedStyle';
import { getCSSUnitValue } from './getCSSUnitValue';
import { toFixed } from './toFixed';

export class LetterSpacingAdjuster implements CSSUpdater {
  readonly defaultValue = 100;

  public update(element: HTMLElement, value: number): undefined {
    const originalValue = getInitialComputedStyle(element, 'letterSpacing');
    const parsedValue = originalValue === 'normal' ? 0 : getCSSUnitValue(originalValue);

    if (parsedValue === null) return;

    let newValue = parsedValue + (value - 100) / 10;
    newValue = toFixed(newValue, 2);

    element.style.setProperty('letter-spacing', `${newValue}px`);
  }
}

export const letterSpacingAdjuster = Object.freeze(new LetterSpacingAdjuster());
