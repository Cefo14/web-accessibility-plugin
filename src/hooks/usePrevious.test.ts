import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { usePrevious } from './usePrevious';

describe('usePrevious', () => {
  describe('when hook is first rendered', () => {
    it('should return undefined for initial render', () => {
      // Given
      const initialValue = 'first';

      // When
      const { result } = renderHook(() => usePrevious(initialValue));

      // Then
      expect(result.current).toBeUndefined();
    });

    it('should return undefined for number initial value', () => {
      // Given
      const initialValue = 42;

      // When
      const { result } = renderHook(() => usePrevious(initialValue));

      // Then
      expect(result.current).toBeUndefined();
    });

    it('should return undefined for object initial value', () => {
      // Given
      const initialValue = { key: 'value' };

      // When
      const { result } = renderHook(() => usePrevious(initialValue));

      // Then
      expect(result.current).toBeUndefined();
    });
  });

  describe('when value changes', () => {
    it('should return previous string value after update', () => {
      // Given
      const { result, rerender } = renderHook(
        ({ value }) => usePrevious(value),
        { initialProps: { value: 'first' } },
      );

      // When
      rerender({ value: 'second' });

      // Then
      expect(result.current).toBe('first');
    });

    it('should return previous number value after update', () => {
      // Given
      const { result, rerender } = renderHook(
        ({ value }) => usePrevious(value),
        { initialProps: { value: 10 } },
      );

      // When
      rerender({ value: 20 });

      // Then
      expect(result.current).toBe(10);
    });

    it('should track multiple value changes correctly', () => {
      // Given
      const { result, rerender } = renderHook(
        ({ value }) => usePrevious(value),
        { initialProps: { value: 1 } },
      );

      // When - multiple updates
      rerender({ value: 2 });
      const afterFirst = result.current;

      rerender({ value: 3 });
      const afterSecond = result.current;

      rerender({ value: 4 });
      const afterThird = result.current;

      // Then
      expect(afterFirst).toBe(1);
      expect(afterSecond).toBe(2);
      expect(afterThird).toBe(3);
    });
  });

  describe('when value does not change', () => {
    it('should keep previous value if same value is passed', () => {
      // Given
      const { result, rerender } = renderHook(
        ({ value }) => usePrevious(value),
        { initialProps: { value: 'same' } },
      );

      // When
      rerender({ value: 'same' });

      // Then
      expect(result.current).toBeUndefined();
    });

    it('should handle object reference changes', () => {
      // Given
      const obj1 = { key: 'value' };
      const obj2 = { key: 'value' };

      const { result, rerender } = renderHook(
        ({ value }) => usePrevious(value),
        { initialProps: { value: obj1 } },
      );

      // When - different reference but same content
      rerender({ value: obj2 });

      // Then
      expect(result.current).toBe(obj1);
    });
  });

  describe('when value is boolean', () => {
    it('should track boolean changes from false to true', () => {
      // Given
      const { result, rerender } = renderHook(
        ({ value }) => usePrevious(value),
        { initialProps: { value: false } },
      );

      // When
      rerender({ value: true });

      // Then
      expect(result.current).toBe(false);
    });

    it('should track boolean changes from true to false', () => {
      // Given
      const { result, rerender } = renderHook(
        ({ value }) => usePrevious(value),
        { initialProps: { value: true } },
      );

      // When
      rerender({ value: false });

      // Then
      expect(result.current).toBe(true);
    });
  });
});
