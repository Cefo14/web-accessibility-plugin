import type { CSSUpdater } from './CSSUpdater';
import { getInitialComputedStyle } from './getInitialComputedStyle';
import { getCSSUnitValue } from './getCSSUnitValue';
import { toFixed } from './toFixed';

export class LineHeightAdjuster implements CSSUpdater {
  readonly defaultValue = 100;

  public update(element: HTMLElement, value: number): undefined {
    const originalValue = getInitialComputedStyle(element, 'lineHeight');
    const parsedValue = getCSSUnitValue(originalValue);

    if (parsedValue === null) return;

    let newValue = parsedValue * (value / 100);
    newValue = toFixed(newValue, 2);

    element.style.setProperty('line-height', `${newValue}px`);
  }
}

export const lineHeightAdjuster = Object.freeze(new LineHeightAdjuster());
