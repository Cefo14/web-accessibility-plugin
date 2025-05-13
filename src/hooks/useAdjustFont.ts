import { useCallback } from 'react';

import type { Mirror } from '@/types/Mirror';

import { TextElements } from '@/helpers/TextElements';
import { hasOwnProperty } from '@/helpers/hasOwnProperty';
import { fontSizeAdjuster } from '@/helpers/FontSizeAdjuster';
import { letterSpacingAdjuster } from '@/helpers/LetterSpacingAdjuster';
import { lineHeightAdjuster } from '@/helpers/LineHeightAdjuster';
import { type FontFamily, FONT_FAMILY, fontFamilyAdjuster } from '@/helpers/FontFamilyAdjuster';
import { type FontWeight, FONT_WEIGHT, fontWeightAdjuster } from '@/helpers/FontWeightAdjuster';

import { useExternalFonts } from './useExternalFonts';
import { useSteper } from '@/hooks/useSteper';
import { useOnChange } from './useOnChange';
import { useDidUpdate } from './useDidUpdate';

export type FontProps = 'size' | 'letterSpacing' | 'lineHeight';

export const FONT_PROPS: Mirror<FontProps> = {
  size: 'size',
  letterSpacing: 'letterSpacing',
  lineHeight: 'lineHeight',
} as const;

const STEP = 10;

export const useAdjustFont = () => {
  const {
    prev: prevFontSizeValue,
    value: fontSizeValue,
    increment: incrementFontSize,
    decrement: decrementFontSize,
    reset: resetFontSize,
  } = useSteper(fontSizeAdjuster.defaultValue, STEP);

  const {
    prev: prevLetterSpacingValue,
    value: letterSpacingValue,
    increment: incrementLetterSpacing,
    decrement: decrementLetterSpacing,
    reset: resetLetterSpacing,
  } = useSteper(letterSpacingAdjuster.defaultValue, STEP);

  const {
    prev: prevLineHeightValue,
    value: lineHeightValue,
    increment: incrementLineHeight,
    decrement: decrementLineHeight,
    reset: resetLineHeight,
  } = useSteper(lineHeightAdjuster.defaultValue, STEP);

  const {
    prev: prevFontFamilyValue,
    value: fontFamilyValue,
    change: updateFontFamily,
    reset: resetFontFamily,
  } = useOnChange<FontFamily>(fontFamilyAdjuster.defaultValue);

  const {
    prev: prevFontWeightValue,
    value: fontWeightValue,
    change: updateFontWeight,
    reset: resetFontWeight,
  } = useOnChange<FontWeight>(fontWeightAdjuster.defaultValue);

  useExternalFonts();

  const incrementFontProp = useCallback((prop: string) => {
    if (!hasOwnProperty(FONT_PROPS, prop)) throw new Error('Invalid font prop');

    if (prop === FONT_PROPS.size) incrementFontSize();
    else if (prop === FONT_PROPS.letterSpacing) incrementLetterSpacing();
    else if (prop === FONT_PROPS.lineHeight) incrementLineHeight();
  }, [incrementFontSize, incrementLetterSpacing, incrementLineHeight]);

  const decrementFontProp = useCallback((prop: string) => {
    if (!hasOwnProperty(FONT_PROPS, prop)) throw new Error('Invalid font prop');

    if (prop === FONT_PROPS.size) decrementFontSize();
    else if (prop === FONT_PROPS.letterSpacing) decrementLetterSpacing();
    else if (prop === FONT_PROPS.lineHeight) decrementLineHeight();
  }, [decrementFontSize, decrementLetterSpacing, decrementLineHeight]);

  const changeFontFamily = useCallback((value: string) => {
    if (!hasOwnProperty(FONT_FAMILY, value)) throw new Error('Invalid font family value');
    updateFontFamily(value);
  }, [updateFontFamily]);

  const changeFontweight = useCallback((value: string) => {
    if (!hasOwnProperty(FONT_WEIGHT, value)) throw new Error('Invalid font weight value');
    updateFontWeight(value);
  }, [updateFontWeight]);

  const resetAdjustFont = useCallback(() => {
    resetFontSize();
    resetLetterSpacing();
    resetLineHeight();
    resetFontFamily();
    resetFontWeight();
  }, [
    resetFontSize,
    resetLetterSpacing,
    resetLineHeight,
    resetFontFamily,
    resetFontWeight,
  ]);

  useDidUpdate(() => {
    TextElements.instance.elements.forEach((element) => {
      if (prevFontSizeValue !== fontSizeValue) {
        fontSizeAdjuster.update(element, fontSizeValue);
      }
      if (prevLetterSpacingValue !== letterSpacingValue) {
        letterSpacingAdjuster.update(element, letterSpacingValue);
      }

      if (prevLineHeightValue !== lineHeightValue) {
        lineHeightAdjuster.update(element, lineHeightValue);
      }

      if (prevFontFamilyValue !== fontFamilyValue) {
        fontFamilyAdjuster.update(element, fontFamilyValue);
      }

      if (prevFontWeightValue !== fontWeightValue) {
        fontWeightAdjuster.update(element, fontWeightValue);
      }
    });

    const onChangeElements = (elements: HTMLElement[]) => {
      elements.forEach((element) => {
        fontSizeAdjuster.update(element, fontSizeValue);
        fontWeightAdjuster.update(element, fontWeightValue);
        letterSpacingAdjuster.update(element, letterSpacingValue);
        lineHeightAdjuster.update(element, lineHeightValue);
        fontFamilyAdjuster.update(element, fontFamilyValue);
      });
    };
    TextElements.instance.subscribe(onChangeElements);
    return () => {
      TextElements.instance.unsubscribe(onChangeElements);
    };
  }, [
    fontFamilyValue,
    fontSizeValue,
    fontWeightValue,
    letterSpacingValue,
    lineHeightValue,
    prevFontFamilyValue,
    prevFontSizeValue,
    prevFontWeightValue,
    prevLetterSpacingValue,
    prevLineHeightValue,
  ]);

  return {
    incrementFontProp,
    decrementFontProp,
    resetAdjustFont,
    changeFontFamily,
    changeFontweight,
    fontSizeValue,
    letterSpacingValue,
    lineHeightValue,
    fontFamilyValue,
    fontWeightValue,
  };
};
