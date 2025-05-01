import { useCallback, useEffect } from 'react';

import type { Mirror } from '@/types/Mirror';

import { TextElements } from '@/helpers/TextElements';
import { hasOwnProperty } from '@/helpers/hasOwnProperty';
import { fontSizeAdjuster } from '@/helpers/FontSizeAdjuster';
import { FontWeightAdjuster } from '@/helpers/FontWeightAdjuster';
import { LetterSpacingAdjuster } from '@/helpers/LetterSpacingAdjuster';
import { LineHeightAdjuster } from '@/helpers/LineHeightAdjuster';
import { FontFamilyAdjuster } from '@/helpers/FontFamilyAdjuster';

import { useAdjustFontFamily } from './useAdjustFontFamily';
import { useAdjustFontWeight } from './useAdjustFontWeight';
import { usePercentageAdjuster } from './usePercentageAdjuster';

export type FontProps = 'size' | 'letterSpacing' | 'lineHeight';

export const FONT_PROPS: Mirror<FontProps> = {
  size: 'size',
  letterSpacing: 'letterSpacing',
  lineHeight: 'lineHeight',
} as const;

const fontWeightAdjuster = new FontWeightAdjuster();
const letterSpacingAdjuster = new LetterSpacingAdjuster();
const lineHeightAdjuster = new LineHeightAdjuster();
const fontFamilyAdjuster = new FontFamilyAdjuster();

export const useAdjustFont = () => {
  const {
    value: fontSizeValue,
    increment: incrementFontSize,
    decrement: decrementFontSize,
    resetElement: resetFontSizeElement,
  } = usePercentageAdjuster(fontSizeAdjuster);

  const {
    value: letterSpacingValue,
    increment: incrementLetterSpacing,
    decrement: decrementLetterSpacing,
    resetElement: resetLetterSpacingElement,
  } = usePercentageAdjuster(letterSpacingAdjuster);

  const {
    value: lineHeightValue,
    increment: incrementLineHeight,
    decrement: decrementLineHeight,
    resetElement: resetLineHeightElement,
  } = usePercentageAdjuster(lineHeightAdjuster);

  const {
    selected: fontFamilySelected,
    update: updateFontFamily,
    resetElement: resetFontFamilyElment,
    resetSelected: resetFontFamilySelected,
  } = useAdjustFontFamily();

  const {
    selected: fontWeightSelected,
    update: updateFontWeight,
    resetElement: resetFontWeightElement,
    resetSelected: resetFontWeightSelected,
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
      resetFontSizeElement(element);
      resetFontWeightElement(element);
      resetLetterSpacingElement(element);
      resetLineHeightElement(element);
      resetFontFamilyElment(element);
    });
    resetFontFamilySelected();
    resetFontWeightSelected();
  }, [
    resetFontSizeElement,
    resetFontWeightElement,
    resetLetterSpacingElement,
    resetLineHeightElement,
    resetFontFamilyElment,
    resetFontFamilySelected,
    resetFontWeightSelected,
  ]);

  useEffect(() => {
    const onMutation = (elements: HTMLElement[]) => {
      elements.forEach((element) => {
        fontSizeAdjuster.update(element, fontSizeValue);
        fontWeightAdjuster.update(element, fontWeightSelected);
        letterSpacingAdjuster.update(element, letterSpacingValue);
        lineHeightAdjuster.update(element, lineHeightValue);
        fontFamilyAdjuster.update(element, fontFamilySelected);
      });
    };
    TextElements.instance.subscribe(onMutation);
    return () => {
      TextElements.instance.unsubscribe(onMutation);
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
