import { useCallback, useState } from 'react';

interface useSteperProps {
  min: number;
  max: number;
  step: number;
  initialValue: number;
}

export const useSteper = ({ min, max, step, initialValue }: useSteperProps) => {
  const [value, setValue] = useState(initialValue);

  const decrement = useCallback(() => {
    let currentValue = value;
    if (currentValue <= min) currentValue = min;
    else currentValue -= step;
    setValue(currentValue);
  }, [min, step, value]);

  const increment = useCallback(() => {
    let currentValue = value;
    if (currentValue >= max) currentValue = max;
    else currentValue += step;
    setValue(currentValue);
  }, [max, step, value]);

  const reset = useCallback(() => {
    setValue(initialValue);
  }, [initialValue]);

  return {
    value,
    decrement,
    increment,
    reset,
  };
};