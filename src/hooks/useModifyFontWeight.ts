
import { TextElements } from '@/helpers/TextElements';
import { getOriginalPropertyValue } from '@/helpers/getOriginalPropertyValue';
import { removeLetters } from '@/helpers/removeLetters';

import { useSteper } from './useSteper';
import { useDidUpdate } from './useDidUpdate';

const textElements = TextElements.instance;

const initial = { min: -10, max: 10, step: 1, initialValue: 0 }

export const useModifyFontWeight = () => {
  const {
    value,
    increment,
    decrement,
    reset,
  } = useSteper(initial);

  useDidUpdate(() => {
    textElements.elements.forEach((element) => {
      const originalValue = getOriginalPropertyValue(element, 'fontWeight');
      const parsedValue = parseFloat(removeLetters(originalValue));
      if (parsedValue >= 1000) element.style.fontWeight = '1000';
      else if (parsedValue <= 100) element.style.fontWeight = '100';
      else element.style.fontWeight = (parsedValue + (100 * value)).toString();
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
