
import { TextElements } from '@/helpers/TextElements';
import { getOriginalPropertyValue } from '@/helpers/getOriginalPropertyValue';
import { removeLetters } from '@/helpers/removeLetters';

import { useSteper } from './useSteper';
import { useDidUpdate } from './useDidUpdate';

const textElements = TextElements.instance;

const initial = { min: -10, max: 10, step: 1, initialValue: 0 }

export const useModifyLetterSpacing = () => {
  const {
    value,
    increment,
    decrement,
    reset,
  } = useSteper(initial);

  useDidUpdate(() => {
    textElements.elements.forEach((element) => {
      const originalValue = getOriginalPropertyValue(element, 'letterSpacing');
      const parsedValue = originalValue === 'normal' ? 1 : parseFloat(removeLetters(originalValue));
      const newValue = parsedValue + value;
      element.style.letterSpacing = `${newValue}px`;
    });
  }, [value]);

  return {
    min: initial.min,
    max: initial.max,
    now: value,
    increment,
    decrement,
    reset,
  };
};
