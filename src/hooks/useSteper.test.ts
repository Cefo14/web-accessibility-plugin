import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSteper } from './useSteper';

describe('useSteper', () => {
  describe('when hook is initialized', () => {
    it('should return initial value when provided', () => {
      // Given
      const initialValue = 100;

      // When
      const { result } = renderHook(() => useSteper(initialValue));

      // Then
      expect(result.current.value).toBe(100);
    });

    it('should default to 0 when no initial value provided', () => {
      // Given & When
      const { result } = renderHook(() => useSteper());

      // Then
      expect(result.current.value).toBe(0);
    });

    it('should return undefined as previous value on initial render', () => {
      // Given & When
      const { result } = renderHook(() => useSteper(50));

      // Then
      expect(result.current.prev).toBeUndefined();
    });

    it('should provide increment, decrement, reset methods', () => {
      // Given & When
      const { result } = renderHook(() => useSteper(10));

      // Then
      expect(result.current).toHaveProperty('increment');
      expect(result.current).toHaveProperty('decrement');
      expect(result.current).toHaveProperty('reset');
      expect(result.current).toHaveProperty('value');
      expect(result.current).toHaveProperty('prev');
    });
  });

  describe('when increment is called', () => {
    it('should increase value by default step of 1', () => {
      // Given
      const { result } = renderHook(() => useSteper(10));

      // When
      act(() => {
        result.current.increment();
      });

      // Then
      expect(result.current.value).toBe(11);
    });

    it('should increase value by custom step', () => {
      // Given
      const { result } = renderHook(() => useSteper(100, 10));

      // When
      act(() => {
        result.current.increment();
      });

      // Then
      expect(result.current.value).toBe(110);
    });

    it('should track previous value after increment', () => {
      // Given
      const { result } = renderHook(() => useSteper(50, 5));

      // When
      act(() => {
        result.current.increment();
      });

      // Then
      expect(result.current.prev).toBe(50);
      expect(result.current.value).toBe(55);
    });

    it('should handle multiple increments', () => {
      // Given
      const { result } = renderHook(() => useSteper(0, 10));

      // When
      act(() => {
        result.current.increment();
        result.current.increment();
        result.current.increment();
      });

      // Then
      expect(result.current.value).toBe(30);
    });
  });

  describe('when decrement is called', () => {
    it('should decrease value by default step of 1', () => {
      // Given
      const { result } = renderHook(() => useSteper(10));

      // When
      act(() => {
        result.current.decrement();
      });

      // Then
      expect(result.current.value).toBe(9);
    });

    it('should decrease value by custom step', () => {
      // Given
      const { result } = renderHook(() => useSteper(100, 10));

      // When
      act(() => {
        result.current.decrement();
      });

      // Then
      expect(result.current.value).toBe(90);
    });

    it('should track previous value after decrement', () => {
      // Given
      const { result } = renderHook(() => useSteper(50, 5));

      // When
      act(() => {
        result.current.decrement();
      });

      // Then
      expect(result.current.prev).toBe(50);
      expect(result.current.value).toBe(45);
    });

    it('should allow value to go negative', () => {
      // Given
      const { result } = renderHook(() => useSteper(5, 10));

      // When
      act(() => {
        result.current.decrement();
      });

      // Then
      expect(result.current.value).toBe(-5);
    });

    it('should handle multiple decrements', () => {
      // Given
      const { result } = renderHook(() => useSteper(100, 10));

      // When
      act(() => {
        result.current.decrement();
        result.current.decrement();
        result.current.decrement();
      });

      // Then
      expect(result.current.value).toBe(70);
    });
  });

  describe('when reset is called', () => {
    it('should reset value to initial value', () => {
      // Given
      const initialValue = 100;
      const { result } = renderHook(() => useSteper(initialValue, 10));

      act(() => {
        result.current.increment();
        result.current.increment();
      });

      // When
      act(() => {
        result.current.reset();
      });

      // Then
      expect(result.current.value).toBe(100);
    });

    it('should reset to 0 when no initial value was provided', () => {
      // Given
      const { result } = renderHook(() => useSteper());

      act(() => {
        result.current.increment();
        result.current.increment();
      });

      // When
      act(() => {
        result.current.reset();
      });

      // Then
      expect(result.current.value).toBe(0);
    });

    it('should track previous value when reset is called', () => {
      // Given
      const { result } = renderHook(() => useSteper(50, 10));

      act(() => {
        result.current.increment();
      });

      // When
      act(() => {
        result.current.reset();
      });

      // Then
      expect(result.current.prev).toBe(60);
      expect(result.current.value).toBe(50);
    });
  });

  describe('when combining increment and decrement', () => {
    it('should handle alternating increment and decrement', () => {
      // Given
      const { result } = renderHook(() => useSteper(100, 10));

      // When
      act(() => {
        result.current.increment();
      });
      const afterIncrement = result.current.value;

      act(() => {
        result.current.decrement();
      });
      const afterDecrement = result.current.value;

      // Then
      expect(afterIncrement).toBe(110);
      expect(afterDecrement).toBe(100);
    });

    it('should track previous values through mixed operations', () => {
      // Given
      const { result } = renderHook(() => useSteper(50, 5));

      // When
      act(() => {
        result.current.increment();
      });

      const prevAfterFirst = result.current.prev;

      act(() => {
        result.current.decrement();
      });

      const prevAfterSecond = result.current.prev;

      // Then
      expect(prevAfterFirst).toBe(50);
      expect(prevAfterSecond).toBe(55);
      expect(result.current.value).toBe(50);
    });
  });
});
