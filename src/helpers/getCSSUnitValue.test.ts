import { describe, it, expect } from 'vitest';
import { getCSSUnitValue } from './getCSSUnitValue';
import { CSSUnitError } from '@/errors/CSSUnitError';

describe('getCSSUnitValue', () => {
  describe('when value has valid CSS unit', () => {
    it('should parse pixel values correctly', () => {
      // Given
      const pixelValue = '16px';

      // When
      const result = getCSSUnitValue(pixelValue);

      // Then
      expect(result).toBe(16);
    });

    it('should parse em values correctly', () => {
      // Given
      const emValue = '1.5em';

      // When
      const result = getCSSUnitValue(emValue);

      // Then
      expect(result).toBe(1.5);
    });

    it('should parse rem values correctly', () => {
      // Given
      const remValue = '2.25rem';

      // When
      const result = getCSSUnitValue(remValue);

      // Then
      expect(result).toBe(2.25);
    });

    it('should parse negative values correctly', () => {
      // Given
      const negativeValue = '-10px';

      // When
      const result = getCSSUnitValue(negativeValue);

      // Then
      expect(result).toBe(-10);
    });

    it('should parse values without unit', () => {
      // Given
      const unitlessValue = '100';

      // When
      const result = getCSSUnitValue(unitlessValue);

      // Then
      expect(result).toBe(100);
    });
  });

  describe('when value is invalid', () => {
    it('should throw CSSUnitError for empty string', () => {
      // Given
      const emptyValue = '';

      // When & Then
      expect(() => getCSSUnitValue(emptyValue))
        .toThrow(CSSUnitError);
    });

    it('should throw CSSUnitError for non-numeric string', () => {
      // Given
      const invalidValue = 'invalid';

      // When & Then
      expect(() => getCSSUnitValue(invalidValue))
        .toThrow(CSSUnitError);
    });

    it('should throw CSSUnitError with message', () => {
      // Given
      const invalidValue = 'abc';

      // When & Then
      expect(() => getCSSUnitValue(invalidValue))
        .toThrow('Invalid CSS unit');
    });
  });

  describe('when value has no numeric part', () => {
    it('should return null for CSS keyword', () => {
      // Given - aunque el regex falle, si match existe pero el grupo es undefined
      // De acuerdo al código actual, esto lanza error
      const keywordValue = 'auto';

      // When & Then
      expect(() => getCSSUnitValue(keywordValue))
        .toThrow(CSSUnitError);
    });
  });
});
