import type { FontUpdater } from './FontUpdater';
import { getInitialComputedStyle } from './getInitialComputedStyle';
import { getCSSUnitValue } from './getCSSUnitValue';
import { toFixed } from './toFixed';

export class FontSizeAdjuster implements FontUpdater {
  public readonly defaultValue: number = 100;

  public update(element: HTMLElement, value: number) : undefined {
    const originalValue = getInitialComputedStyle(element, 'fontSize');

    if (value === this.defaultValue) {
      element.style.setProperty('font-size', originalValue);
      return;
    }

    const parsedValue = getCSSUnitValue(originalValue);

    if (parsedValue === null) return;

    let newValue = parsedValue * (value / 100);
    newValue = toFixed(newValue, 2);

    element.style.setProperty('font-size', `${newValue}px`);
  }
}

export const fontSizeAdjuster = Object.freeze(new FontSizeAdjuster());
