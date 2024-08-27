
import { TextElements } from '@/helpers/TextElements';
import { getOriginalPropertyValue } from '@/helpers/getOriginalPropertyValue';

import { useSteper } from './useSteper';
import { useDidUpdate } from './useDidUpdate';

const textElements = TextElements.instance;

const initial = { min: 0, max: 100, step: 10, initialValue: 0 }

export const useModifyFontWeight = () => {
  const {
    value,
    increment,
    decrement,
    reset,
  } = useSteper(initial);

  useDidUpdate(() => {
    const s = performance.now();
    textElements.elements.forEach((element) => {
      const originalValue = getOriginalPropertyValue(element, 'fontWeight');
      if (value <= 0) element.style.fontWeight = originalValue;
      else element.style.fontWeight = `${value * 10}`;
    });
    console.log(performance.now() - s);
  }, [value]);

  return {
    fontWeight: value,
    decrementFontWeight: decrement,
    incrementFontWeight: increment,
    resetFontWeight: reset
  };
};
