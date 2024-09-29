/* eslint-disable no-param-reassign */

import { TextElements } from '@/helpers/TextElements';
import { getOriginalPropertyValue } from '@/helpers/getOriginalPropertyValue';

import { useSteper } from './useSteper';
import { useDidUpdate } from './useDidUpdate';
import { toFixed } from '@/helpers/toFixed';
import { removeLetters } from '@/helpers/removeLetters';

const textElements = TextElements.instance;

const initial = {
  min: -10, max: 10, step: 1, initialValue: 0,
};

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
      const newValue = parsedValue * (1 + value / 10);
      element.style.lineHeight = `${toFixed(newValue, 2)}px`;
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
