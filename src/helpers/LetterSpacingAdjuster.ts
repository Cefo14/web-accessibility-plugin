import type { HTMLElementUpdater } from './HTMLElementUpdater';
import { getInitialComputedStyle } from './getInitialComputedStyle';
import { getCSSUnitValue } from './getCSSUnitValue';

export class LetterSpacingAdjuster implements HTMLElementUpdater {
  public update(element: HTMLElement, value: number): undefined {
    const originalValue = getInitialComputedStyle(element, 'letterSpacing');
    const parsedValue = originalValue === 'normal' ? 0 : getCSSUnitValue(originalValue);

    if (parsedValue === null) return;

    const step = (value - 100) / 10;
    const newValue = parsedValue + step;
    element.style.setProperty('letter-spacing', `${newValue}px`);
  }
}

export const letterSpacingAdjuster = Object.freeze(new LetterSpacingAdjuster());
