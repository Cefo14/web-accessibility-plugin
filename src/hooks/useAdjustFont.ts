import { useCallback, useEffect, useState } from 'react';

import type { MouseEventButton } from '@/types/MouseEvent';

import { TextElements } from '@/helpers/TextElements';
import {
  updateFontSize,
  updateFontWeight,
  updateLetterSpacing,
  updateLineHeight,
} from '@/helpers/adjustFont';

import { useDidUpdate } from './useDidUpdate';

const textElements = TextElements.instance;

const FONT_PROPS = {
  size: 'size',
  weight: 'weight',
  letterSpacing: 'letterSpacing',
  lineHeight: 'lineHeight',
} as const;

const DEFAULT_STATE = 0;

type FontProps = keyof typeof FONT_PROPS;

export const useAdjustFont = () => {
  const [fontSizeStep, setFontSizeStep] = useState<number>(DEFAULT_STATE);
  const [fontWeightStep, setFontWeightStep] = useState<number>(DEFAULT_STATE);
  const [letterSpacingStep, setLetterSpacingStep] = useState<number>(DEFAULT_STATE);
  const [lineHeightStep, setLineHeightStep] = useState<number>(DEFAULT_STATE);

  const incrementFontProp = useCallback((event: MouseEventButton) => {
    const prop = event.currentTarget.name as FontProps;
    const increment = (step: number) => step + 1;

    if (prop === FONT_PROPS.size) {
      setFontSizeStep(increment);
    }

    else if (prop === FONT_PROPS.weight) {
      setFontWeightStep(increment);
    }

    else if (prop === FONT_PROPS.letterSpacing) {
      setLetterSpacingStep(increment);
    }

    else if (prop === FONT_PROPS.lineHeight) {
      setLineHeightStep(increment);
    }
  }, []);

  const decrementFontProp = useCallback((event: MouseEventButton) => {
    const prop = event.currentTarget.name as FontProps;
    const decrement = (step: number) => step - 1;

    if (prop === FONT_PROPS.size) {
      setFontSizeStep(decrement);
    }
    else if (prop === FONT_PROPS.weight) {
      setFontWeightStep(decrement);
    }
    else if (prop === FONT_PROPS.letterSpacing) {
      setLetterSpacingStep(decrement);
    }
    else if (prop === FONT_PROPS.lineHeight) {
      setLineHeightStep(decrement);
    }
  }, []);

  const resetAdjustFont = useCallback(() => {
    setFontSizeStep(DEFAULT_STATE);
    setFontWeightStep(DEFAULT_STATE);
    setLetterSpacingStep(DEFAULT_STATE);
    setLineHeightStep(DEFAULT_STATE);
  }, []);

  useDidUpdate(() => {
    updateFontSize(textElements.elements, fontSizeStep);
  }, [fontSizeStep]);

  useDidUpdate(() => {
    updateFontWeight(textElements.elements, fontWeightStep);
  }, [fontWeightStep]);

  useDidUpdate(() => {
    updateLetterSpacing(textElements.elements, letterSpacingStep);
  }, [letterSpacingStep]);

  useDidUpdate(() => {
    updateLineHeight(textElements.elements, lineHeightStep);
  }, [lineHeightStep]);

  useEffect(() => {
    const onMutation = (elements: HTMLElement[]) => {
      updateFontSize(elements, fontSizeStep);
      updateFontWeight(elements, fontWeightStep);
      updateLetterSpacing(elements, letterSpacingStep);
      updateLineHeight(elements, lineHeightStep);
    };
    TextElements.instance.subscribe(onMutation);
    return () => {
      TextElements.instance.unsubscribe(onMutation);
    };
  }, [fontSizeStep, fontWeightStep, letterSpacingStep, lineHeightStep]);

  return {
    fontProps: FONT_PROPS,
    incrementFontProp,
    decrementFontProp,
    fontSizeStep,
    fontWeightStep,
    letterSpacingStep,
    lineHeightStep,
    resetAdjustFont,
  };
};
