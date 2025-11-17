import type { FontUpdater } from './FontUpdater';
import { getInitialComputedStyle } from './getInitialComputedStyle';
import { getCSSUnitValue } from './getCSSUnitValue';
import { letterSpacingCalculator } from './LetterSpacingCalculator';

export class LetterSpacingAdjuster implements FontUpdater {
  readonly defaultValue = 100;

  public update(element: HTMLElement, value: number): undefined {
    const originalValue = getInitialComputedStyle(element, 'letterSpacing');

    if (value === this.defaultValue) {
      element.style.setProperty('letter-spacing', originalValue);
      return;
    }

    const parsedValue = originalValue === 'normal' ? 0 : getCSSUnitValue(originalValue);

    if (parsedValue === null) return;

    const newValue = letterSpacingCalculator.calculate(parsedValue, value);

    element.style.setProperty('letter-spacing', `${newValue}px`);
  }
}

export const letterSpacingAdjuster = Object.freeze(new LetterSpacingAdjuster());
