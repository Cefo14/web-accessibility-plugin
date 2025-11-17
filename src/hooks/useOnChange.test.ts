import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useOnChange } from './useOnChange';

describe('useOnChange', () => {
  describe('when hook is initialized', () => {
    it('should return initial value', () => {
      // Given
      const initialValue = 'initial';

      // When
      const { result } = renderHook(() => useOnChange<string>(initialValue));

      // Then
      expect(result.current.value).toBe('initial');
    });

    it('should return undefined as previous value on initial render', () => {
      // Given
      const initialValue = 'test';

      // When
      const { result } = renderHook(() => useOnChange<string>(initialValue));

      // Then
      expect(result.current.prev).toBeUndefined();
    });

    it('should provide change, reset and value properties', () => {
      // Given
      const initialValue = 'value';

      // When
      const { result } = renderHook(() => useOnChange<string>(initialValue));

      // Then
      expect(result.current).toHaveProperty('value');
      expect(result.current).toHaveProperty('prev');
      expect(result.current).toHaveProperty('change');
      expect(result.current).toHaveProperty('reset');
    });
  });

  describe('when change is called', () => {
    it('should update value correctly', () => {
      // Given
      const { result } = renderHook(() => useOnChange<string>('initial'));

      // When
      act(() => {
        result.current.change('updated');
      });

      // Then
      expect(result.current.value).toBe('updated');
    });

    it('should track previous value after change', () => {
      // Given
      const { result } = renderHook(() => useOnChange<string>('first'));

      // When
      act(() => {
        result.current.change('second');
      });

      // Then
      expect(result.current.prev).toBe('first');
      expect(result.current.value).toBe('second');
    });

    it('should handle multiple consecutive changes', () => {
      // Given
      const { result } = renderHook(() => useOnChange<string>('start'));

      // When
      act(() => {
        result.current.change('middle');
      });

      const prevAfterFirst = result.current.prev;

      act(() => {
        result.current.change('end');
      });

      // Then
      expect(prevAfterFirst).toBe('start');
      expect(result.current.prev).toBe('middle');
      expect(result.current.value).toBe('end');
    });
  });

  describe('when reset is called', () => {
    it('should reset value to initial value', () => {
      // Given
      const initialValue = 'initial';
      const { result } = renderHook(() => useOnChange<string>(initialValue));

      act(() => {
        result.current.change('changed');
      });

      // When
      act(() => {
        result.current.reset();
      });

      // Then
      expect(result.current.value).toBe('initial');
    });

    it('should track previous value when reset is called', () => {
      // Given
      const { result } = renderHook(() => useOnChange<string>('original'));

      act(() => {
        result.current.change('modified');
      });

      // When
      act(() => {
        result.current.reset();
      });

      // Then
      expect(result.current.prev).toBe('modified');
      expect(result.current.value).toBe('original');
    });

    it('should reset multiple times correctly', () => {
      // Given
      const { result } = renderHook(() => useOnChange<string>('default'));

      act(() => {
        result.current.change('temp1');
      });

      act(() => {
        result.current.reset();
      });

      act(() => {
        result.current.change('temp2');
      });

      // When
      act(() => {
        result.current.reset();
      });

      // Then
      expect(result.current.value).toBe('default');
    });
  });

  describe('when using type parameter', () => {
    it('should work with union types', () => {
      // Given
      type Status = 'idle' | 'loading' | 'success' | 'error';
      const { result } = renderHook(() => useOnChange<Status>('idle'));

      // When
      act(() => {
        result.current.change('loading');
      });

      // Then
      expect(result.current.value).toBe('loading');
      expect(result.current.prev).toBe('idle');
    });

    it('should maintain type safety for string literals', () => {
      // Given
      type FontFamily = '-' | 'Arial' | 'serif';
      const { result } = renderHook(() => useOnChange<FontFamily>('-'));

      // When
      act(() => {
        result.current.change('Arial');
      });

      act(() => {
        result.current.change('serif');
      });

      // Then
      expect(result.current.value).toBe('serif');
      expect(result.current.prev).toBe('Arial');
    });
  });
});
