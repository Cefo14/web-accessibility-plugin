import { toFixed } from './toFixed';

export class FontSizeCalculator {
  readonly defaultPercentage = 100;

  calculate(originalPixels: number, percentage: number): number {
    if (percentage === this.defaultPercentage) {
      return originalPixels;
    }

    const scaledValue = originalPixels * (percentage / 100);
    return toFixed(scaledValue, 2);
  }
}

export const fontSizeCalculator = Object.freeze(new FontSizeCalculator());
