import { useCallback, useState } from 'react';

import type { HTMLElementUpdater } from '@/helpers/HTMLElementUpdater';

export const useAdjustByStep = (
  updater: HTMLElementUpdater,
  initialValue: number = 0,
  step: number = 1,
) => {
  const [value, setValue] = useState<number>(initialValue);

  const increment = useCallback((elements: HTMLElement[]) => {
    setValue((prev) => {
      const next = prev + step;
      elements.forEach((element) => {
        updater.update(element, next);
      });
      return next;
    });
  }, [step, updater]);

  const decrement = useCallback((elements: HTMLElement[]) => {
    setValue((prev) => {
      const next = prev - step;
      elements.forEach((element) => {
        updater.update(element, next);
      });
      return next;
    });
  }, [step, updater]);

  const reset = useCallback(() => {
    setValue(initialValue);
  }, [initialValue]);

  return {
    value,
    increment,
    decrement,
    reset,
  };
};
