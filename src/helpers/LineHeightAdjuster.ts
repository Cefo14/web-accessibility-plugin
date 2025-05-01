import type { HTMLElementUpdater } from './HTMLElementUpdater';
import { getInitialComputedStyle } from './getInitialComputedStyle';
import { getCSSUnitValue } from './getCSSUnitValue';
import { toFixed } from './toFixed';

export class LineHeightAdjuster implements HTMLElementUpdater {
  public update(element: HTMLElement, step: number): undefined {
    const originalValue = getInitialComputedStyle(element, 'lineHeight');
    const parsedValue = getCSSUnitValue(originalValue);

    if (parsedValue === null) return;

    const newValue = parsedValue * (step / 100);
    element.style.setProperty('line-height', `${toFixed(newValue, 2)}px`);
  }
}

export const lineHeightAdjuster = Object.freeze(new LineHeightAdjuster());
