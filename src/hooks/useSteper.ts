import { useCallback, useState } from 'react';
import { toFixed } from '@/helpers/toFixed';

interface UseSteperProps {
  min: number;
  max: number;
  step: number;
  initialValue: number;
  presition?: number
}

export const useSteper = ({
  min, max, step, initialValue, presition = 2,
}: UseSteperProps) => {
  const [value, setValue] = useState(initialValue);

  const decrement = useCallback(() => {
    let currentValue = value;
    if (currentValue <= min) currentValue = min;
    else currentValue -= step;
    setValue(toFixed(currentValue, presition));
  }, [min, step, value, presition]);

  const increment = useCallback(() => {
    let currentValue = value;
    if (currentValue >= max) currentValue = max;
    else currentValue += step;
    setValue(toFixed(currentValue, presition));
  }, [max, step, value, presition]);

  const reset = useCallback(() => {
    setValue(initialValue);
  }, [initialValue]);

  return {
    value,
    step: toFixed((value - initialValue) / step, 0),
    decrement,
    increment,
    reset,
  };
};
