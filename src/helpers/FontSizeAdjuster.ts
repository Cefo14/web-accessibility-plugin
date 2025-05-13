import type { CSSUpdater } from './CSSUpdater';
import { getInitialComputedStyle } from './getInitialComputedStyle';
import { getCSSUnitValue } from './getCSSUnitValue';
import { toFixed } from './toFixed';

export class FontSizeAdjuster implements CSSUpdater {
  public readonly defaultValue: number = 100;

  public update(element: HTMLElement, value: number) : undefined {
    const originalValue = getInitialComputedStyle(element, 'fontSize');
    const parsedValue = getCSSUnitValue(originalValue);

    if (parsedValue === null) return;

    let newValue = parsedValue * (value / 100);
    newValue = toFixed(newValue, 2);

    element.style.setProperty('font-size', `${newValue}px`);
  }
}

export const fontSizeAdjuster = Object.freeze(new FontSizeAdjuster());
