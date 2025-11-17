import { describe, it, expect } from 'vitest';
import { FontSizeCalculator } from './FontSizeCalculator';

describe('FontSizeCalculator', () => {
  const calculator = new FontSizeCalculator();

  describe('when percentage is at default (100%)', () => {
    it('should return the original value unchanged', () => {
      // Given
      const originalPixels = 16;
      const percentage = 100;

      // When
      const result = calculator.calculate(originalPixels, percentage);

      // Then
      expect(result).toBe(16);
    });

    it('should return the original value for any original size', () => {
      // Given
      const testCases = [10, 12, 14, 16, 18, 20, 24, 32, 48];

      // When & Then
      testCases.forEach((original) => {
        expect(calculator.calculate(original, 100)).toBe(original);
      });
    });
  });

  describe('when percentage is greater than 100', () => {
    it('should scale up the font size correctly', () => {
      // Given
      const originalPixels = 16;
      const percentage = 150;

      // When
      const result = calculator.calculate(originalPixels, percentage);

      // Then
      expect(result).toBe(24);
    });

    it('should handle 200% scaling', () => {
      // Given
      const originalPixels = 16;
      const percentage = 200;

      // When
      const result = calculator.calculate(originalPixels, percentage);

      // Then
      expect(result).toBe(32);
    });

    it('should truncate to 2 decimal places', () => {
      // Given
      const originalPixels = 16;
      const percentage = 133;

      // When
      const result = calculator.calculate(originalPixels, percentage);

      // Then
      expect(result).toBe(21.28);
    });
  });

  describe('when percentage is less than 100', () => {
    it('should scale down the font size correctly', () => {
      // Given
      const originalPixels = 16;
      const percentage = 50;

      // When
      const result = calculator.calculate(originalPixels, percentage);

      // Then
      expect(result).toBe(8);
    });

    it('should handle 75% scaling', () => {
      // Given
      const originalPixels = 20;
      const percentage = 75;

      // When
      const result = calculator.calculate(originalPixels, percentage);

      // Then
      expect(result).toBe(15);
    });

    it('should truncate to 2 decimal places for small percentages', () => {
      // Given
      const originalPixels = 16;
      const percentage = 87;

      // When
      const result = calculator.calculate(originalPixels, percentage);

      // Then
      expect(result).toBe(13.92);
    });
  });

  describe('when percentage is 0', () => {
    it('should return 0', () => {
      // Given
      const originalPixels = 16;
      const percentage = 0;

      // When
      const result = calculator.calculate(originalPixels, percentage);

      // Then
      expect(result).toBe(0);
    });
  });

  describe('when dealing with decimal original values', () => {
    it('should handle decimal original pixels correctly', () => {
      // Given
      const originalPixels = 16.5;
      const percentage = 150;

      // When
      const result = calculator.calculate(originalPixels, percentage);

      // Then
      expect(result).toBe(24.75);
    });

    it('should truncate complex decimal results', () => {
      // Given
      const originalPixels = 15.7;
      const percentage = 137;

      // When
      const result = calculator.calculate(originalPixels, percentage);

      // Then
      expect(result).toBe(21.50);
    });
  });

  describe('when dealing with edge cases', () => {
    it('should handle very small original values', () => {
      // Given
      const originalPixels = 0.5;
      const percentage = 200;

      // When
      const result = calculator.calculate(originalPixels, percentage);

      // Then
      expect(result).toBe(1);
    });

    it('should handle very large percentages', () => {
      // Given
      const originalPixels = 16;
      const percentage = 500;

      // When
      const result = calculator.calculate(originalPixels, percentage);

      // Then
      expect(result).toBe(80);
    });

    it('should handle negative percentages (edge case)', () => {
      // Given
      const originalPixels = 16;
      const percentage = -50;

      // When
      const result = calculator.calculate(originalPixels, percentage);

      // Then
      expect(result).toBe(-8);
    });
  });
});
