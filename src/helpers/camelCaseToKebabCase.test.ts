import { describe, it, expect } from 'vitest';
import { camelCaseToKebabCase } from './camelCaseToKebabCase';

describe('camelCaseToKebabCase', () => {
  describe('when text is in camelCase', () => {
    it('should convert fontSize to font-size', () => {
      // Given
      const camelCase = 'fontSize';

      // When
      const result = camelCaseToKebabCase(camelCase);

      // Then
      expect(result).toBe('font-size');
    });

    it('should convert backgroundColor to background-color', () => {
      // Given
      const camelCase = 'backgroundColor';

      // When
      const result = camelCaseToKebabCase(camelCase);

      // Then
      expect(result).toBe('background-color');
    });

    it('should convert letterSpacing to letter-spacing', () => {
      // Given
      const camelCase = 'letterSpacing';

      // When
      const result = camelCaseToKebabCase(camelCase);

      // Then
      expect(result).toBe('letter-spacing');
    });

    it('should handle multiple uppercase letters', () => {
      // Given
      const camelCase = 'borderTopLeftRadius';

      // When
      const result = camelCaseToKebabCase(camelCase);

      // Then
      expect(result).toBe('border-top-left-radius');
    });
  });

  describe('when text is already lowercase', () => {
    it('should return the same text', () => {
      // Given
      const lowercase = 'color';

      // When
      const result = camelCaseToKebabCase(lowercase);

      // Then
      expect(result).toBe('color');
    });

    it('should handle single character lowercase', () => {
      // Given
      const singleChar = 'a';

      // When
      const result = camelCaseToKebabCase(singleChar);

      // Then
      expect(result).toBe('a');
    });
  });

  describe('when text starts with uppercase', () => {
    it('should convert first letter to lowercase', () => {
      // Given
      const pascalCase = 'FontSize';

      // When
      const result = camelCaseToKebabCase(pascalCase);

      // Then
      expect(result).toBe('font-size');
    });

    it('should handle single uppercase letter', () => {
      // Given
      const singleUppercase = 'A';

      // When
      const result = camelCaseToKebabCase(singleUppercase);

      // Then
      expect(result).toBe('a');
    });
  });

  describe('when text is empty', () => {
    it('should return empty string', () => {
      // Given
      const emptyString = '';

      // When
      const result = camelCaseToKebabCase(emptyString);

      // Then
      expect(result).toBe('');
    });
  });

  describe('when text has consecutive uppercase letters', () => {
    it('should handle acronyms correctly', () => {
      // Given
      const withAcronym = 'HTMLElement';

      // When
      const result = camelCaseToKebabCase(withAcronym);

      // Then
      expect(result).toBe('h-t-m-l-element');
    });
  });
});
