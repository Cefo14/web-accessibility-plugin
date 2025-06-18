import { useCallback, useState } from 'react';
import { usePrevious } from './usePrevious';

export const useOnChange = <T extends string>(initialValue: T) => {
  const [value, setValue] = useState<T>(initialValue);
  const prev = usePrevious(value);

  const change = useCallback((newValue: T) => {
    setValue(newValue);
  }, []);

  const reset = useCallback(() => {
    setValue(initialValue);
  }, [initialValue]);

  return {
    prev,
    change,
    reset,
    value,
  };
};
