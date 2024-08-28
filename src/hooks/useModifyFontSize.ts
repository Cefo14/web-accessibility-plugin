
import { TextElements } from '@/helpers/TextElements';
import { getOriginalPropertyValue } from '@/helpers/getOriginalPropertyValue';
import { removeLetters } from '@/helpers/removeLetters';
import { toFixed } from '@/helpers/toFixed';

import { useSteper } from './useSteper';
import { useDidUpdate } from './useDidUpdate';

const textElements = TextElements.instance;

const initial = { min: 50, max: 200, step: 10, initialValue: 100 }

export const useModifyFontSize = () => {
  const {
    value,
    stepIndex,
    increment,
    decrement,
    reset,
  } = useSteper(initial);

  useDidUpdate(() => {
    textElements.elements.forEach((element) => {
      const originalValue = getOriginalPropertyValue(element, 'fontSize');
      const parsedValue = parseFloat(removeLetters(originalValue));
      const newValue = parsedValue * value / 100;
      element.style.fontSize = `${toFixed(newValue, 2)}px`;
    });
  }, [value]);

  return {
    fontSizePercentage: value,
    fontSizeStep: stepIndex,
    decrementFontSizePercentage: decrement,
    incrementFontSizePercentage: increment,
    resetFontSize: reset
  };
};
