
import { TextElements } from '@/helpers/TextElements';
import { getOriginalPropertyValue } from '@/helpers/getOriginalPropertyValue';
import { removeLetters } from '@/helpers/removeLetters';
import { toFixed } from '@/helpers/toFixed';

import { useSteper } from './useSteper';
import { useDidUpdate } from './useDidUpdate';

const textElements = TextElements.instance;

const initial = { min: -10, max: 10, step: 1, initialValue: 0 }

export const useModifyFontSize = () => {
  const {
    value,
    increment,
    decrement,
    reset,
  } = useSteper(initial);

  useDidUpdate(() => {
    textElements.elements.forEach((element) => {
      const originalValue = getOriginalPropertyValue(element, 'fontSize');
      const parsedValue = parseFloat(removeLetters(originalValue));
      const newValue = parsedValue * (1 + value / 10);
      element.style.fontSize = `${toFixed(newValue, 2)}px`;
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
