import { useCallback, useState } from 'react';

import type { HTMLElementUpdater } from '@/helpers/HTMLElementUpdater';

const INITIAL_VALUE = 100;
const STEP = 10;

export const usePercentageAdjuster = (
  updater: HTMLElementUpdater,
) => {
  const [value, setValue] = useState<number>(INITIAL_VALUE);

  const increment = useCallback((elements: HTMLElement[]) => {
    setValue((prev) => {
      const next = prev + STEP;
      elements.forEach((element) => {
        updater.update(element, next);
      });
      return next;
    });
  }, [updater]);

  const decrement = useCallback((elements: HTMLElement[]) => {
    setValue((prev) => {
      const next = prev - STEP;
      elements.forEach((element) => {
        updater.update(element, next);
      });
      return next;
    });
  }, [updater]);

  const resetElement = useCallback((element: HTMLElement) => {
    updater.update(element, INITIAL_VALUE);
  }, [updater]);

  return {
    value,
    increment,
    decrement,
    resetElement,
  };
};
