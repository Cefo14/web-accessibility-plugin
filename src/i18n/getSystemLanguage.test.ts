import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { getSystemLanguage } from './getSystemLanguage';
import { LanguageCodes } from './i18n';

describe('getSystemLanguage', () => {
  let originalNavigator: Navigator;

  beforeEach(() => {
    // Given - Guardar navigator original
    originalNavigator = global.navigator;
  });

  afterEach(() => {
    // Restaurar navigator original
    Object.defineProperty(global, 'navigator', {
      value: originalNavigator,
      writable: true,
      configurable: true,
    });
  });

  describe('when browser language is supported', () => {
    it('should return English when navigator language is en-US', () => {
      // Given
      Object.defineProperty(global, 'navigator', {
        value: { language: 'en-US' },
        writable: true,
        configurable: true,
      });

      // When
      const result = getSystemLanguage();

      // Then
      expect(result).toBe(LanguageCodes.en);
    });

    it('should return Spanish when navigator language is es-ES', () => {
      // Given
      Object.defineProperty(global, 'navigator', {
        value: { language: 'es-ES' },
        writable: true,
        configurable: true,
      });

      // When
      const result = getSystemLanguage();

      // Then
      expect(result).toBe(LanguageCodes.es);
    });

    it('should return Chinese when navigator language is zh-CN', () => {
      // Given
      Object.defineProperty(global, 'navigator', {
        value: { language: 'zh-CN' },
        writable: true,
        configurable: true,
      });

      // When
      const result = getSystemLanguage();

      // Then
      expect(result).toBe(LanguageCodes.zh);
    });

    it('should handle language code without region', () => {
      // Given
      Object.defineProperty(global, 'navigator', {
        value: { language: 'en' },
        writable: true,
        configurable: true,
      });

      // When
      const result = getSystemLanguage();

      // Then
      expect(result).toBe(LanguageCodes.en);
    });
  });

  describe('when browser language is not supported', () => {
    it('should return default language for unsupported language', () => {
      // Given
      Object.defineProperty(global, 'navigator', {
        value: { language: 'fr-FR' },
        writable: true,
        configurable: true,
      });

      // When
      const result = getSystemLanguage();

      // Then
      expect(result).toBe(LanguageCodes.es);
    });

    it('should return default language for German', () => {
      // Given
      Object.defineProperty(global, 'navigator', {
        value: { language: 'de-DE' },
        writable: true,
        configurable: true,
      });

      // When
      const result = getSystemLanguage();

      // Then
      expect(result).toBe(LanguageCodes.es);
    });
  });

  describe('when navigator language is empty or invalid', () => {
    it('should return default language when language is empty string', () => {
      // Given
      Object.defineProperty(global, 'navigator', {
        value: { language: '' },
        writable: true,
        configurable: true,
      });

      // When
      const result = getSystemLanguage();

      // Then
      expect(result).toBe(LanguageCodes.es);
    });

    it('should return default language when language split returns empty', () => {
      // Given
      Object.defineProperty(global, 'navigator', {
        value: { language: '-' },
        writable: true,
        configurable: true,
      });

      // When
      const result = getSystemLanguage();

      // Then
      expect(result).toBe(LanguageCodes.es);
    });
  });
});
