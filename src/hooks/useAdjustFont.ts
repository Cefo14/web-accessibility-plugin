import { useCallback, useEffect } from 'react';

import type { Mirror } from '@/types/Mirror';

import { TextElements } from '@/helpers/TextElements';
import { hasOwnProperty } from '@/helpers/hasOwnProperty';
import { fontSizeAdjuster } from '@/helpers/FontSizeAdjuster';
import { letterSpacingAdjuster } from '@/helpers/LetterSpacingAdjuster';
import { lineHeightAdjuster } from '@/helpers/LineHeightAdjuster';
import { fontFamilyAdjuster } from '@/helpers/FontFamilyAdjuster';
import { fontWeightAdjuster } from '@/helpers/FontWeightAdjuster';

import { useAdjustFontFamily } from './useAdjustFontFamily';
import { useAdjustFontWeight } from './useAdjustFontWeight';
import { useAdjustByStep } from './useAdjustByStep';

export type FontProps = 'size' | 'letterSpacing' | 'lineHeight';

export const FONT_PROPS: Mirror<FontProps> = {
  size: 'size',
  letterSpacing: 'letterSpacing',
  lineHeight: 'lineHeight',
} as const;

const INITIAL_VALUE = 100;
const STEP = 10;

export const useAdjustFont = () => {
  const {
    value: fontSizeValue,
    increment: incrementFontSize,
    decrement: decrementFontSize,
    reset: resetFontSize,
  } = useAdjustByStep(fontSizeAdjuster, INITIAL_VALUE, STEP);

  const {
    value: letterSpacingValue,
    increment: incrementLetterSpacing,
    decrement: decrementLetterSpacing,
    reset: resetLetterSpacing,
  } = useAdjustByStep(letterSpacingAdjuster, INITIAL_VALUE, STEP);

  const {
    value: lineHeightValue,
    increment: incrementLineHeight,
    decrement: decrementLineHeight,
    reset: resetLineHeight,
  } = useAdjustByStep(lineHeightAdjuster, INITIAL_VALUE, STEP);

  const {
    selected: fontFamilySelected,
    update: updateFontFamily,
    reset: resetFontFamilySelected,
  } = useAdjustFontFamily();

  const {
    selected: fontWeightSelected,
    update: updateFontWeight,
    reset: resetFontWeightSelected,
  } = useAdjustFontWeight();

  const incrementFontProp = useCallback((prop: string) => {
    if (!hasOwnProperty(FONT_PROPS, prop)) throw new Error('Invalid font prop');

    const textElements = TextElements.instance.elements;

    if (prop === FONT_PROPS.size) incrementFontSize(textElements);
    else if (prop === FONT_PROPS.letterSpacing) incrementLetterSpacing(textElements);
    else if (prop === FONT_PROPS.lineHeight) incrementLineHeight(textElements);
  }, [incrementFontSize, incrementLetterSpacing, incrementLineHeight]);

  const decrementFontProp = useCallback((prop: string) => {
    if (!hasOwnProperty(FONT_PROPS, prop)) throw new Error('Invalid font prop');

    const textElements = TextElements.instance.elements;

    if (prop === FONT_PROPS.size) decrementFontSize(textElements);
    else if (prop === FONT_PROPS.letterSpacing) decrementLetterSpacing(textElements);
    else if (prop === FONT_PROPS.lineHeight) decrementLineHeight(textElements);
  }, [decrementFontSize, decrementLetterSpacing, decrementLineHeight]);

  const changeFontFamily = useCallback((fontFamily: string) => {
    const textElements = TextElements.instance.elements;
    updateFontFamily(textElements, fontFamily);
  }, [updateFontFamily]);

  const changeFontweight = useCallback((fontWeight: string) => {
    const textElements = TextElements.instance.elements;
    updateFontWeight(textElements, fontWeight);
  }, [updateFontWeight]);

  const resetAdjustFont = useCallback(() => {
    TextElements.instance.elements.forEach((element) => {
      fontSizeAdjuster.update(element, INITIAL_VALUE);
      letterSpacingAdjuster.update(element, INITIAL_VALUE);
      lineHeightAdjuster.update(element, INITIAL_VALUE);
      fontWeightAdjuster.update(element, fontWeightAdjuster.default);
      fontFamilyAdjuster.update(element, fontFamilyAdjuster.default);
    });
    resetFontSize();
    resetLetterSpacing();
    resetLineHeight();
    resetFontFamilySelected();
    resetFontWeightSelected();
  }, [
    resetFontSize,
    resetLetterSpacing,
    resetLineHeight,
    resetFontFamilySelected,
    resetFontWeightSelected,
  ]);

  useEffect(() => {
    const onChangeElements = (elements: HTMLElement[]) => {
      elements.forEach((element) => {
        fontSizeAdjuster.update(element, fontSizeValue);
        fontWeightAdjuster.update(element, fontWeightSelected);
        letterSpacingAdjuster.update(element, letterSpacingValue);
        lineHeightAdjuster.update(element, lineHeightValue);
        fontFamilyAdjuster.update(element, fontFamilySelected);
      });
    };
    TextElements.instance.subscribe(onChangeElements);
    return () => {
      TextElements.instance.unsubscribe(onChangeElements);
    };
  }, [fontSizeValue, letterSpacingValue, lineHeightValue, fontFamilySelected, fontWeightSelected]);

  return {
    incrementFontProp,
    decrementFontProp,
    resetAdjustFont,
    changeFontFamily,
    changeFontweight,
    fontSizeValue,
    letterSpacingValue,
    lineHeightValue,
    fontFamilySelected,
    fontWeightSelected,
  };
};
