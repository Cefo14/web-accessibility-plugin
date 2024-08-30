import { toFixed } from '@/helpers/toFixed';
import { useCallback, useState } from 'react';

interface useSteperProps {
  min: number;
  max: number;
  step: number;
  initialValue: number;
  presition?: number
}

export const useSteper = ({ min, max, step, initialValue, presition = 2 }: useSteperProps) => {
  const [value, setValue] = useState(initialValue);

  const decrement = useCallback(() => {
    let currentValue = value;
    if (currentValue <= min) currentValue = min;
    else currentValue -= step;
    setValue(toFixed(currentValue, presition));
  }, [min, step, value]);

  const increment = useCallback(() => {
    let currentValue = value;
    if (currentValue >= max) currentValue = max;
    else currentValue += step;
    setValue(toFixed(currentValue, presition));
  }, [max, step, value]);

  const reset = useCallback(() => {
    setValue(initialValue);
  }, [initialValue]);

  return {
    value,
    step: toFixed((value - initialValue)/step, 0),
    decrement,
    increment,
    reset,
  };
};