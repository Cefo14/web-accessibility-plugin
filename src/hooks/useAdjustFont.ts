/* eslint-disable no-param-reassign */
import { useCallback, useState } from 'react';

import { TextElements } from '@/helpers/TextElements';
import { getOriginalPropertyValue } from '@/helpers/getOriginalPropertyValue';
import { removeLetters } from '@/helpers/removeLetters';
import { toFixed } from '@/helpers/toFixed';

import { useDidUpdate } from './useDidUpdate';

const textElements = TextElements.instance;

const updateFontSize = (step: number) => {
  textElements.elements.forEach((element) => {
    const originalValue = getOriginalPropertyValue(element, 'fontSize');
    const parsedValue = parseFloat(removeLetters(originalValue));
    const newValue = parsedValue * (1 + step / 10);
    element.style.fontSize = `${toFixed(newValue, 2)}px`;
  });
};

const updateFontWeight = (step: number) => {
  textElements.elements.forEach((element) => {
    const originalValue = getOriginalPropertyValue(element, 'fontWeight');
    const parsedValue = parseFloat(removeLetters(originalValue));
    if (parsedValue >= 1000) element.style.fontWeight = '1000';
    else if (parsedValue <= 100) element.style.fontWeight = '100';
    else element.style.fontWeight = (parsedValue + (100 * step)).toString();
  });
};

const updateLetterSpacing = (step: number) => {
  textElements.elements.forEach((element) => {
    const originalValue = getOriginalPropertyValue(element, 'letterSpacing');
    const parsedValue = originalValue === 'normal' ? 1 : parseFloat(removeLetters(originalValue));
    const newValue = parsedValue + step;
    element.style.letterSpacing = `${newValue}px`;
  });
};

const updateLineHeight = (step: number) => {
  textElements.elements.forEach((element) => {
    const originalValue = getOriginalPropertyValue(element, 'lineHeight');
    const parsedValue = parseFloat(removeLetters(originalValue));
    const newValue = parsedValue * (1 + step / 10);
    element.style.lineHeight = `${toFixed(newValue, 2)}px`;
  });
};

export const useAdjustFont = () => {
  const [fontSizeStep, setFontSizeStep] = useState<number>(0);
  const [fontWeightStep, setFontWeightStep] = useState<number>(0);
  const [letterSpacingStep, setLetterSpacingStep] = useState<number>(0);
  const [lineHeightStep, setLineHeightStep] = useState<number>(0);

  const incrementFontSize = useCallback(() => {
    setFontSizeStep((step) => step + 1);
  }, []);

  const decrementFontSize = useCallback(() => {
    setFontSizeStep((step) => step - 1);
  }, []);

  useDidUpdate(() => {
    updateFontSize(fontSizeStep);
  }, [fontSizeStep]);

  const incrementFontWeight = useCallback(() => {
    setFontWeightStep((step) => step + 1);
  }, []);

  const decrementFontWeight = useCallback(() => {
    setFontWeightStep((step) => step - 1);
  }, []);

  useDidUpdate(() => {
    updateFontWeight(fontWeightStep);
  }, [fontWeightStep]);

  const incrementLetterSpacing = useCallback(() => {
    setLetterSpacingStep((step) => step + 1);
  }, []);

  const decrementLetterSpacing = useCallback(() => {
    setLetterSpacingStep((step) => step - 1);
  }, []);

  useDidUpdate(() => {
    updateLetterSpacing(letterSpacingStep);
  }, [letterSpacingStep]);

  const incrementLineHeight = useCallback(() => {
    setLineHeightStep((step) => step + 1);
  }, []);

  const decrementLineHeight = useCallback(() => {
    setLineHeightStep((step) => step - 1);
  }, []);

  useDidUpdate(() => {
    updateLineHeight(lineHeightStep);
  }, [lineHeightStep]);

  const resetAdjustFont = useCallback(() => {
    setFontSizeStep(0);
    setFontWeightStep(0);
    setLetterSpacingStep(0);
    setLineHeightStep(0);
  }, []);

  return {
    fontSizeStep,
    incrementFontSize,
    decrementFontSize,
    fontWeightStep,
    incrementFontWeight,
    decrementFontWeight,
    letterSpacingStep,
    incrementLetterSpacing,
    decrementLetterSpacing,
    lineHeightStep,
    incrementLineHeight,
    decrementLineHeight,
    resetAdjustFont,
  };
};
