import type { HTMLElementUpdater } from './HTMLElementUpdater';
import { getInitialComputedStyle } from './getInitialComputedStyle';
import { getCSSUnitValue } from './getCSSUnitValue';
import { toFixed } from './toFixed';

export class FontSizeAdjuster implements HTMLElementUpdater {
  public update(element: HTMLElement, value: number) : undefined {
    const originalValue = getInitialComputedStyle(element, 'fontSize');
    const parsedValue = getCSSUnitValue(originalValue);

    if (parsedValue === null) return;

    const newValue = parsedValue * (value / 100);
    element.style.setProperty('font-size', `${toFixed(newValue, 2)}px`);
  }
}

export const fontSizeAdjuster = Object.freeze(new FontSizeAdjuster());
