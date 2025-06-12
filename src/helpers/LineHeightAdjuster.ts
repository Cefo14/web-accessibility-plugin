import type { FontUpdater } from './FontUpdater';
import { getInitialComputedStyle } from './getInitialComputedStyle';
import { getCSSUnitValue } from './getCSSUnitValue';
import { toFixed } from './toFixed';

export class LineHeightAdjuster implements FontUpdater {
  readonly defaultValue = 100;

  public update(element: HTMLElement, value: number): undefined {
    const originalValue = getInitialComputedStyle(element, 'lineHeight');

    if (value === this.defaultValue) {
      element.style.setProperty('line-height', originalValue);
      return;
    }

    const parsedValue = originalValue === 'normal' ? 20 : getCSSUnitValue(originalValue);

    if (parsedValue === null) return;

    let newValue = parsedValue * (value / 100);
    newValue = toFixed(newValue, 2);

    element.style.setProperty('line-height', `${newValue}px`);
  }
}

export const lineHeightAdjuster = Object.freeze(new LineHeightAdjuster());
