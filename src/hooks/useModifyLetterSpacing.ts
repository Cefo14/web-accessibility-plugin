
import { TextElements } from '@/helpers/TextElements';
import { getOriginalPropertyValue } from '@/helpers/getOriginalPropertyValue';

import { useSteper } from './useSteper';
import { useDidUpdate } from './useDidUpdate';

const textElements = TextElements.instance;

const initial = { min: 0, max: 20, step: 2, initialValue: 0 }

export const useModifyLetterSpacing = () => {
  const {
    value,
    stepIndex,
    increment,
    decrement,
    reset,
  } = useSteper(initial);

  useDidUpdate(() => {
    textElements.elements.forEach((element) => {
      const originalValue = getOriginalPropertyValue(element, 'letterSpacing');
      if (value <= 0) element.style.letterSpacing = originalValue;
      else element.style.letterSpacing = `${value}px`;
    });
  }, [value]);

  return {
    letterSpacing: value,
    letterSpacingStep: stepIndex,
    decrementLetterSpacing: decrement,
    incrementLetterSpacing: increment,
    resetLetterSpacing: reset
  };
};
