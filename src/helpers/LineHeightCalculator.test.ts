import { describe, it, expect } from 'vitest';
import { LineHeightCalculator } from './LineHeightCalculator';

describe('LineHeightCalculator', () => {
  const calculator = new LineHeightCalculator();

  describe('when percentage is at default (100%)', () => {
    it('should return the original value unchanged', () => {
      // Given
      const originalPixels = 20;
      const percentage = 100;

      // When
      const result = calculator.calculate(originalPixels, percentage);

      // Then
      expect(result).toBe(20);
    });

    it('should return the original value for any line height', () => {
      // Given
      const testCases = [16, 18, 20, 22, 24, 28, 32];

      // When & Then
      testCases.forEach((original) => {
        expect(calculator.calculate(original, 100)).toBe(original);
      });
    });
  });

  describe('when percentage is greater than 100', () => {
    it('should scale up the line height correctly', () => {
      // Given
      const originalPixels = 20;
      const percentage = 150;

      // When
      const result = calculator.calculate(originalPixels, percentage);

      // Then
      expect(result).toBe(30);
    });

    it('should handle 200% scaling', () => {
      // Given
      const originalPixels = 20;
      const percentage = 200;

      // When
      const result = calculator.calculate(originalPixels, percentage);

      // Then
      expect(result).toBe(40);
    });

    it('should truncate to 2 decimal places', () => {
      // Given
      const originalPixels = 20;
      const percentage = 133;

      // When
      const result = calculator.calculate(originalPixels, percentage);

      // Then
      expect(result).toBe(26.6);
    });
  });

  describe('when percentage is less than 100', () => {
    it('should scale down the line height correctly', () => {
      // Given
      const originalPixels = 20;
      const percentage = 50;

      // When
      const result = calculator.calculate(originalPixels, percentage);

      // Then
      expect(result).toBe(10);
    });

    it('should handle 75% scaling', () => {
      // Given
      const originalPixels = 24;
      const percentage = 75;

      // When
      const result = calculator.calculate(originalPixels, percentage);

      // Then
      expect(result).toBe(18);
    });

    it('should truncate to 2 decimal places for small percentages', () => {
      // Given
      const originalPixels = 20;
      const percentage = 87;

      // When
      const result = calculator.calculate(originalPixels, percentage);

      // Then
      expect(result).toBe(17.4);
    });
  });

  describe('when percentage is 0', () => {
    it('should return 0', () => {
      // Given
      const originalPixels = 20;
      const percentage = 0;

      // When
      const result = calculator.calculate(originalPixels, percentage);

      // Then
      expect(result).toBe(0);
    });
  });

  describe('when dealing with normal line height (20px default)', () => {
    it('should scale the default correctly at 110%', () => {
      // Given
      const originalPixels = 20;
      const percentage = 110;

      // When
      const result = calculator.calculate(originalPixels, percentage);

      // Then
      expect(result).toBe(22);
    });

    it('should scale the default correctly at 90%', () => {
      // Given
      const originalPixels = 20;
      const percentage = 90;

      // When
      const result = calculator.calculate(originalPixels, percentage);

      // Then
      expect(result).toBe(18);
    });
  });

  describe('when dealing with decimal original values', () => {
    it('should handle decimal original pixels correctly', () => {
      // Given
      const originalPixels = 22.5;
      const percentage = 150;

      // When
      const result = calculator.calculate(originalPixels, percentage);

      // Then
      expect(result).toBe(33.75);
    });

    it('should truncate complex decimal results', () => {
      // Given
      const originalPixels = 19.7;
      const percentage = 137;

      // When
      const result = calculator.calculate(originalPixels, percentage);

      // Then
      expect(result).toBe(26.98);
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
      const originalPixels = 20;
      const percentage = 500;

      // When
      const result = calculator.calculate(originalPixels, percentage);

      // Then
      expect(result).toBe(100);
    });

    it('should handle negative percentages (edge case)', () => {
      // Given
      const originalPixels = 20;
      const percentage = -50;

      // When
      const result = calculator.calculate(originalPixels, percentage);

      // Then
      expect(result).toBe(-10);
    });
  });
});
