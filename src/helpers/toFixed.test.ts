import { describe, it, expect } from 'vitest';
import { toFixed } from './toFixed';

describe('toFixed', () => {
  describe('when number has no decimals', () => {
    it('should return the integer as is', () => {
      // Given
      const integerNumber = 42;

      // When
      const result = toFixed(integerNumber, 2);

      // Then
      expect(result).toBe(42);
    });

    it('should return integer when digits is 0', () => {
      // Given
      const number = 100;

      // When
      const result = toFixed(number, 0);

      // Then
      expect(result).toBe(100);
    });
  });

  describe('when number has decimals', () => {
    it('should truncate to specified digits without rounding', () => {
      // Given
      const numberWithDecimals = 3.14159;

      // When
      const result = toFixed(numberWithDecimals, 2);

      // Then
      expect(result).toBe(3.14);
    });

    it('should truncate to 1 decimal place', () => {
      // Given
      const number = 5.6789;

      // When
      const result = toFixed(number, 1);

      // Then
      expect(result).toBe(5.6);
    });

    it('should truncate to 0 decimals when digits is 0', () => {
      // Given
      const number = 9.999;

      // When
      const result = toFixed(number, 0);

      // Then
      expect(result).toBe(9);
    });

    it('should handle more decimal places than requested', () => {
      // Given
      const number = 1.23456789;

      // When
      const result = toFixed(number, 3);

      // Then
      expect(result).toBe(1.234);
    });

    it('should handle fewer decimal places than requested', () => {
      // Given
      const number = 2.5;

      // When
      const result = toFixed(number, 5);

      // Then
      expect(result).toBe(2.5);
    });
  });

  describe('when digits parameter is not provided', () => {
    it('should default to 0 decimals', () => {
      // Given
      const number = 7.89;

      // When
      const result = toFixed(number);

      // Then
      expect(result).toBe(7);
    });
  });

  describe('when number is negative', () => {
    it('should truncate negative numbers correctly', () => {
      // Given
      const negativeNumber = -3.14159;

      // When
      const result = toFixed(negativeNumber, 2);

      // Then
      expect(result).toBe(-3.14);
    });
  });

  describe('when number is zero', () => {
    it('should handle zero correctly', () => {
      // Given
      const zero = 0;

      // When
      const result = toFixed(zero, 2);

      // Then
      expect(result).toBe(0);
    });

    it('should handle zero with decimals', () => {
      // Given
      const zeroWithDecimals = 0.00001;

      // When
      const result = toFixed(zeroWithDecimals, 3);

      // Then
      expect(result).toBe(0);
    });
  });
});
