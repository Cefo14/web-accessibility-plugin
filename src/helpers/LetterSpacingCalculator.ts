import { toFixed } from './toFixed';

export class LetterSpacingCalculator {
  readonly defaultPercentage = 100;

  calculate(originalPixels: number, percentage: number): number {
    if (percentage === this.defaultPercentage) {
      return originalPixels;
    }

    const offset = (percentage - 100) / 10;
    const newValue = originalPixels + offset;
    return toFixed(newValue, 2);
  }
}

export const letterSpacingCalculator = Object.freeze(new LetterSpacingCalculator());
