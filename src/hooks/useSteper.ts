import { useCallback, useState } from 'react';
import { usePrevious } from './usePrevious';

export const useSteper = (
  initialValue: number = 0,
  step: number = 1,
) => {
  const [value, setValue] = useState<number>(initialValue);
  const prev = usePrevious(value);

  const increment = useCallback(() => {
    setValue((previous) => previous + step);
  }, [step]);

  const decrement = useCallback(() => {
    setValue((previous) => previous - step);
  }, [step]);

  const reset = useCallback(() => {
    setValue(initialValue);
  }, [initialValue]);

  return {
    prev,
    value,
    increment,
    decrement,
    reset,
  };
};
