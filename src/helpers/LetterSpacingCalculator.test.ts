import { describe, it, expect } from 'vitest';
import { LetterSpacingCalculator } from './LetterSpacingCalculator';

describe('LetterSpacingCalculator', () => {
  const calculator = new LetterSpacingCalculator();

  describe('when percentage is at default (100%)', () => {
    it('should return the original value unchanged', () => {
      // Given
      const originalPixels = 0;
      const percentage = 100;

      // When
      const result = calculator.calculate(originalPixels, percentage);

      // Then
      expect(result).toBe(0);
    });

    it('should return the original value for any original spacing', () => {
      // Given
      const testCases = [-2, -1, 0, 1, 2, 3.5, 5];

      // When & Then
      testCases.forEach((original) => {
        expect(calculator.calculate(original, 100)).toBe(original);
      });
    });
  });

  describe('when percentage is greater than 100', () => {
    it('should increase letter spacing by offset', () => {
      // Given
      const originalPixels = 0;
      const percentage = 110;

      // When
      const result = calculator.calculate(originalPixels, percentage);

      // Then
      // offset = (110 - 100) / 10 = 1
      expect(result).toBe(1);
    });

    it('should handle 150% correctly', () => {
      // Given
      const originalPixels = 0;
      const percentage = 150;

      // When
      const result = calculator.calculate(originalPixels, percentage);

      // Then
      // offset = (150 - 100) / 10 = 5
      expect(result).toBe(5);
    });

    it('should add offset to existing spacing', () => {
      // Given
      const originalPixels = 2;
      const percentage = 120;

      // When
      const result = calculator.calculate(originalPixels, percentage);

      // Then
      // offset = (120 - 100) / 10 = 2
      // result = 2 + 2 = 4
      expect(result).toBe(4);
    });

    it('should truncate to 2 decimal places', () => {
      // Given
      const originalPixels = 0;
      const percentage = 133;

      // When
      const result = calculator.calculate(originalPixels, percentage);

      // Then
      // offset = (133 - 100) / 10 = 3.3
      expect(result).toBe(3.3);
    });
  });

  describe('when percentage is less than 100', () => {
    it('should decrease letter spacing by negative offset', () => {
      // Given
      const originalPixels = 0;
      const percentage = 90;

      // When
      const result = calculator.calculate(originalPixels, percentage);

      // Then
      // offset = (90 - 100) / 10 = -1
      expect(result).toBe(-1);
    });

    it('should handle 50% correctly', () => {
      // Given
      const originalPixels = 0;
      const percentage = 50;

      // When
      const result = calculator.calculate(originalPixels, percentage);

      // Then
      // offset = (50 - 100) / 10 = -5
      expect(result).toBe(-5);
    });

    it('should subtract offset from existing spacing', () => {
      // Given
      const originalPixels = 5;
      const percentage = 80;

      // When
      const result = calculator.calculate(originalPixels, percentage);

      // Then
      // offset = (80 - 100) / 10 = -2
      // result = 5 + (-2) = 3
      expect(result).toBe(3);
    });

    it('should allow negative results', () => {
      // Given
      const originalPixels = 1;
      const percentage = 60;

      // When
      const result = calculator.calculate(originalPixels, percentage);

      // Then
      // offset = (60 - 100) / 10 = -4
      // result = 1 + (-4) = -3
      expect(result).toBe(-3);
    });
  });

  describe('when percentage is 0', () => {
    it('should calculate large negative offset', () => {
      // Given
      const originalPixels = 0;
      const percentage = 0;

      // When
      const result = calculator.calculate(originalPixels, percentage);

      // Then
      // offset = (0 - 100) / 10 = -10
      expect(result).toBe(-10);
    });
  });

  describe('when dealing with normal letter spacing (0px)', () => {
    it('should treat 0 as the baseline', () => {
      // Given
      const originalPixels = 0;
      const percentage = 110;

      // When
      const result = calculator.calculate(originalPixels, percentage);

      // Then
      expect(result).toBe(1);
    });

    it('should allow decreasing from normal', () => {
      // Given
      const originalPixels = 0;
      const percentage = 90;

      // When
      const result = calculator.calculate(originalPixels, percentage);

      // Then
      expect(result).toBe(-1);
    });
  });

  describe('when dealing with decimal values', () => {
    it('should handle decimal original pixels', () => {
      // Given
      const originalPixels = 1.5;
      const percentage = 120;

      // When
      const result = calculator.calculate(originalPixels, percentage);

      // Then
      // offset = (120 - 100) / 10 = 2
      // result = 1.5 + 2 = 3.5
      expect(result).toBe(3.5);
    });

    it('should truncate complex decimal results', () => {
      // Given
      const originalPixels = 2.3;
      const percentage = 117;

      // When
      const result = calculator.calculate(originalPixels, percentage);

      // Then
      // offset = (117 - 100) / 10 = 1.7
      // result = 2.3 + 1.7 = 4.0
      expect(result).toBe(4);
    });
  });

  describe('when dealing with edge cases', () => {
    it('should handle very large percentages', () => {
      // Given
      const originalPixels = 0;
      const percentage = 500;

      // When
      const result = calculator.calculate(originalPixels, percentage);

      // Then
      // offset = (500 - 100) / 10 = 40
      expect(result).toBe(40);
    });

    it('should handle negative percentages', () => {
      // Given
      const originalPixels = 0;
      const percentage = -100;

      // When
      const result = calculator.calculate(originalPixels, percentage);

      // Then
      // offset = (-100 - 100) / 10 = -20
      expect(result).toBe(-20);
    });

    it('should handle negative original values', () => {
      // Given
      const originalPixels = -2;
      const percentage = 110;

      // When
      const result = calculator.calculate(originalPixels, percentage);

      // Then
      // offset = (110 - 100) / 10 = 1
      // result = -2 + 1 = -1
      expect(result).toBe(-1);
    });
  });
});
