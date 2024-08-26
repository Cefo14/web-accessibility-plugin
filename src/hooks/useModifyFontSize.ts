
import { TextElements } from '@/helpers/TextElements';
import { toFixed } from '@/helpers/toFixed';
import { getOriginalPropertyValue } from '@/helpers/getOriginalPropertyValue';

import { useSteper } from './useSteper';
import { useDidUpdate } from './useDidUpdate';

const textElements = TextElements.instance;

const initial = { min: 50, max: 200, step: 10, initialValue: 100 }

export const useModifyFontSize = () => {
  const {
    value,
    increment,
    decrement,
    reset,
  } = useSteper(initial);

  useDidUpdate(() => {
    console.log({ value });
    textElements.elements.forEach((element) => {
      const originalFontSizeValue = getOriginalPropertyValue(element, 'fontSize');
      const originalValue = parseFloat(originalFontSizeValue.replace(/[A-Za-z]/, ''));
      const newValue = originalValue * value / 100;
      element.style.fontSize = `${toFixed(newValue, 2)}px`;
    });
  }, [value]);

  return {
    fontSizePercentage: value,
    decrementFontSizePercentage: decrement,
    incrementFontSizePercentage: increment,
    resetFontSize: reset
  };
};
