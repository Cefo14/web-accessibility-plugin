
import { TextElements } from '@/helpers/TextElements';
import { getOriginalPropertyValue } from '@/helpers/getOriginalPropertyValue';

import { useSteper } from './useSteper';
import { useDidUpdate } from './useDidUpdate';
import { toFixed } from '@/helpers/toFixed';
import { removeLetters } from '@/helpers/removeLetters';

const textElements = TextElements.instance;

const initial = { min: 50, max: 200, step: 10, initialValue: 100 }

export const useModifyLineHeight = () => {
  const {
    value,
    increment,
    decrement,
    reset,
  } = useSteper(initial);

  useDidUpdate(() => {
    textElements.elements.forEach((element) => {
      const originalValue = getOriginalPropertyValue(element, 'lineHeight');
      const parsedValue = parseFloat(removeLetters(originalValue));
      const newValue = parsedValue * value / 100;
      element.style.lineHeight = `${toFixed(newValue, 2)}px`;
    });
  }, [value]);

  return {
    lineHeightPercentage: value,
    decrementLineHeightPercentage: decrement,
    incrementLineHeightPercentage: increment,
    resetLineHeight: reset
  };
};
