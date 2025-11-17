import { describe, it, expect } from 'vitest';
import { ColorFilterStringBuilder } from './ColorFilterStringBuilder';

describe('ColorFilterStringBuilder', () => {
  const builder = new ColorFilterStringBuilder();

  describe('buildFilter', () => {
    it('should build a filter string with percentage unit', () => {
      // Given
      const name = 'brightness';
      const value = 120;
      const unit = '%' as const;

      // When
      const result = builder.buildFilter(name, value, unit);

      // Then
      expect(result).toBe('brightness(120%)');
    });

    it('should build a filter string with degree unit', () => {
      // Given
      const name = 'hue-rotate';
      const value = 180;
      const unit = 'deg' as const;

      // When
      const result = builder.buildFilter(name, value, unit);

      // Then
      expect(result).toBe('hue-rotate(180deg)');
    });

    it('should handle zero values', () => {
      // Given
      const name = 'contrast';
      const value = 0;
      const unit = '%' as const;

      // When
      const result = builder.buildFilter(name, value, unit);

      // Then
      expect(result).toBe('contrast(0%)');
    });

    it('should handle negative values', () => {
      // Given
      const name = 'hue-rotate';
      const value = -90;
      const unit = 'deg' as const;

      // When
      const result = builder.buildFilter(name, value, unit);

      // Then
      expect(result).toBe('hue-rotate(-90deg)');
    });

    it('should handle different filter names', () => {
      // Given
      const filterNames = ['brightness', 'contrast', 'saturate', 'sepia', 'hue-rotate'];

      // When & Then
      filterNames.forEach((name) => {
        const result = builder.buildFilter(name, 100, '%');
        expect(result).toBe(`${name}(100%)`);
      });
    });
  });

  describe('updateFilterString', () => {
    describe('when filter does not exist in current string', () => {
      it('should append the filter to empty string', () => {
        // Given
        const currentFilter = '';
        const name = 'brightness';
        const value = 120;
        const unit = '%' as const;

        // When
        const result = builder.updateFilterString(currentFilter, name, value, unit);

        // Then
        expect(result).toBe('brightness(120%)');
      });

      it('should append the filter to existing filters', () => {
        // Given
        const currentFilter = 'contrast(110%)';
        const name = 'brightness';
        const value = 120;
        const unit = '%' as const;

        // When
        const result = builder.updateFilterString(currentFilter, name, value, unit);

        // Then
        expect(result).toBe('contrast(110%) brightness(120%)');
      });

      it('should append multiple different filters', () => {
        // Given
        const currentFilter = 'brightness(120%)';
        
        // When
        let result = builder.updateFilterString(currentFilter, 'contrast', 110, '%');
        result = builder.updateFilterString(result, 'saturate', 90, '%');

        // Then
        expect(result).toBe('brightness(120%) contrast(110%) saturate(90%)');
      });
    });

    describe('when filter exists in current string', () => {
      it('should replace existing filter with same name', () => {
        // Given
        const currentFilter = 'brightness(120%)';
        const name = 'brightness';
        const value = 150;
        const unit = '%' as const;

        // When
        const result = builder.updateFilterString(currentFilter, name, value, unit);

        // Then
        expect(result).toBe('brightness(150%)');
      });

      it('should replace the correct filter among multiple filters', () => {
        // Given
        const currentFilter = 'brightness(120%) contrast(110%) saturate(90%)';
        const name = 'contrast';
        const value = 130;
        const unit = '%' as const;

        // When
        const result = builder.updateFilterString(currentFilter, name, value, unit);

        // Then
        expect(result).toBe('brightness(120%) contrast(130%) saturate(90%)');
      });

      it('should replace filter at the beginning', () => {
        // Given
        const currentFilter = 'brightness(120%) contrast(110%)';
        const name = 'brightness';
        const value = 100;
        const unit = '%' as const;

        // When
        const result = builder.updateFilterString(currentFilter, name, value, unit);

        // Then
        expect(result).toBe('brightness(100%) contrast(110%)');
      });

      it('should replace filter at the end', () => {
        // Given
        const currentFilter = 'brightness(120%) contrast(110%)';
        const name = 'contrast';
        const value = 95;
        const unit = '%' as const;

        // When
        const result = builder.updateFilterString(currentFilter, name, value, unit);

        // Then
        expect(result).toBe('brightness(120%) contrast(95%)');
      });

      it('should replace filter in the middle', () => {
        // Given
        const currentFilter = 'brightness(120%) contrast(110%) saturate(90%)';
        const name = 'contrast';
        const value = 105;
        const unit = '%' as const;

        // When
        const result = builder.updateFilterString(currentFilter, name, value, unit);

        // Then
        expect(result).toBe('brightness(120%) contrast(105%) saturate(90%)');
      });
    });

    describe('when dealing with hue-rotate (degree unit)', () => {
      it('should append hue-rotate with degree unit', () => {
        // Given
        const currentFilter = 'brightness(120%)';
        const name = 'hue-rotate';
        const value = 180;
        const unit = 'deg' as const;

        // When
        const result = builder.updateFilterString(currentFilter, name, value, unit);

        // Then
        expect(result).toBe('brightness(120%) hue-rotate(180deg)');
      });

      it('should replace existing hue-rotate', () => {
        // Given
        const currentFilter = 'brightness(120%) hue-rotate(180deg)';
        const name = 'hue-rotate';
        const value = 90;
        const unit = 'deg' as const;

        // When
        const result = builder.updateFilterString(currentFilter, name, value, unit);

        // Then
        expect(result).toBe('brightness(120%) hue-rotate(90deg)');
      });

      it('should handle negative hue-rotate values', () => {
        // Given
        const currentFilter = 'brightness(120%)';
        const name = 'hue-rotate';
        const value = -90;
        const unit = 'deg' as const;

        // When
        const result = builder.updateFilterString(currentFilter, name, value, unit);

        // Then
        expect(result).toBe('brightness(120%) hue-rotate(-90deg)');
      });

      it('should replace negative hue-rotate with positive', () => {
        // Given
        const currentFilter = 'hue-rotate(-90deg)';
        const name = 'hue-rotate';
        const value = 180;
        const unit = 'deg' as const;

        // When
        const result = builder.updateFilterString(currentFilter, name, value, unit);

        // Then
        expect(result).toBe('hue-rotate(180deg)');
      });
    });

    describe('when dealing with edge cases', () => {
      it('should handle zero values correctly', () => {
        // Given
        const currentFilter = 'brightness(120%)';
        const name = 'contrast';
        const value = 0;
        const unit = '%' as const;

        // When
        const result = builder.updateFilterString(currentFilter, name, value, unit);

        // Then
        expect(result).toBe('brightness(120%) contrast(0%)');
      });

      it('should replace with zero values', () => {
        // Given
        const currentFilter = 'brightness(120%)';
        const name = 'brightness';
        const value = 0;
        const unit = '%' as const;

        // When
        const result = builder.updateFilterString(currentFilter, name, value, unit);

        // Then
        expect(result).toBe('brightness(0%)');
      });

      it('should handle very large values', () => {
        // Given
        const currentFilter = '';
        const name = 'brightness';
        const value = 500;
        const unit = '%' as const;

        // When
        const result = builder.updateFilterString(currentFilter, name, value, unit);

        // Then
        expect(result).toBe('brightness(500%)');
      });

      it('should not confuse similar filter names', () => {
        // Given - 'sepia' contains 'sep'
        const currentFilter = 'sepia(50%)';
        const name = 'sepia';
        const value = 100;
        const unit = '%' as const;

        // When
        const result = builder.updateFilterString(currentFilter, name, value, unit);

        // Then
        expect(result).toBe('sepia(100%)');
      });

      it('should handle all filters in a complex string', () => {
        // Given
        const currentFilter = 'brightness(120%) contrast(110%) saturate(90%) sepia(50%) hue-rotate(180deg)';
        
        // When - Update each filter
        let result = builder.updateFilterString(currentFilter, 'brightness', 100, '%');
        result = builder.updateFilterString(result, 'contrast', 100, '%');
        result = builder.updateFilterString(result, 'saturate', 100, '%');
        result = builder.updateFilterString(result, 'sepia', 0, '%');
        result = builder.updateFilterString(result, 'hue-rotate', 0, 'deg');

        // Then
        expect(result).toBe('brightness(100%) contrast(100%) saturate(100%) sepia(0%) hue-rotate(0deg)');
      });
    });
  });
});
