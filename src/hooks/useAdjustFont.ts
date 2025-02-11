import { useCallback, useEffect, useState } from 'react';

import { TextElements } from '@/helpers/TextElements';
import {
  updateFontFamily,
  updateFontSize,
  updateFontWeight,
  updateLetterSpacing,
  updateLineHeight,
} from '@/helpers/adjustFont';

const FONT_PROPS = {
  size: 'size',
  weight: 'weight',
  letterSpacing: 'letterSpacing',
  lineHeight: 'lineHeight',
} as const;

export type FontProps = typeof FONT_PROPS;

const SAFE_FONT_FAMILIES = [
  'Arial',
  'OpenDyslexic',
  'serif',
  'sans-serif',
  'monospace',
] as const;

export const useAdjustFont = () => {
  const [fontSizeStep, setFontSizeStep] = useState<number>(0);
  const [fontWeightStep, setFontWeightStep] = useState<number>(0);
  const [letterSpacingStep, setLetterSpacingStep] = useState<number>(0);
  const [lineHeightStep, setLineHeightStep] = useState<number>(0);
  const [fontFamilySelected, setFontFamilySelected] = useState<string>('');

  const updateFontPropStep = useCallback((prop: string, step: number) => {
    TextElements.instance.elements.forEach((element) => {
      if (prop === FONT_PROPS.size) updateFontSize(element, step);
      else if (prop === FONT_PROPS.weight) updateFontWeight(element, step);
      else if (prop === FONT_PROPS.letterSpacing) updateLetterSpacing(element, step);
      else if (prop === FONT_PROPS.lineHeight) updateLineHeight(element, step);
    });

    if (prop === FONT_PROPS.size) setFontSizeStep(step);
    else if (prop === FONT_PROPS.weight) setFontWeightStep(step);
    else if (prop === FONT_PROPS.letterSpacing) setLetterSpacingStep(step);
    else if (prop === FONT_PROPS.lineHeight) setLineHeightStep(step);
  }, []);

  const incrementFontProp = useCallback((prop: string, step: number) => {
    if (!(prop in FONT_PROPS)) throw new Error('Invalid font prop');
    const nextStep = step + 1;
    updateFontPropStep(prop, nextStep);
  }, [updateFontPropStep]);

  const decrementFontProp = useCallback((prop: string, step: number) => {
    if (!(prop in FONT_PROPS)) throw new Error('Invalid font prop');
    const prevStep = step - 1;
    updateFontPropStep(prop, prevStep);
  }, [updateFontPropStep]);

  const changeFontFamily = useCallback((fontFamily: string) => {
    TextElements.instance.elements.forEach((element) => {
      updateFontFamily(element, fontFamily);
    });
    setFontFamilySelected(fontFamily);
  }, []);

  const resetAdjustFont = useCallback(() => {
    TextElements.instance.elements.forEach((element) => {
      updateFontSize(element, 0);
      updateFontWeight(element, 0);
      updateLetterSpacing(element, 0);
      updateLineHeight(element, 0);
      updateFontFamily(element, '');
    });
    setFontSizeStep(0);
    setFontWeightStep(0);
    setLetterSpacingStep(0);
    setLineHeightStep(0);
    setFontFamilySelected('');
  }, []);

  useEffect(() => {
    const onMutation = (elements: HTMLElement[]) => {
      elements.forEach((element) => {
        updateFontSize(element, fontSizeStep);
        updateFontWeight(element, fontWeightStep);
        updateLetterSpacing(element, letterSpacingStep);
        updateLineHeight(element, lineHeightStep);
        updateFontFamily(element, fontFamilySelected);
      });
    };
    TextElements.instance.subscribe(onMutation);
    return () => {
      TextElements.instance.unsubscribe(onMutation);
    };
  }, [fontFamilySelected, fontSizeStep, fontWeightStep, letterSpacingStep, lineHeightStep]);

  useEffect(() => {
    const STYLE_ID = 'WAP-open-dyslexic';
    const style = document.getElementById(STYLE_ID);

    if (style) return;

    const fragment = document.createDocumentFragment();

    const link = document.createElement('link');
    link.href = 'https://fonts.cdnfonts.com/css/opendyslexic';
    link.rel = 'stylesheet';
    link.id = STYLE_ID;

    fragment.append(link);

    const preloadBold = document.createElement('link');
    preloadBold.href = 'https://fonts.cdnfonts.com/s/19808/OpenDyslexic-Bold.woff';
    preloadBold.rel = 'preload';
    preloadBold.as = 'font';
    preloadBold.type = 'font/woff';
    preloadBold.crossOrigin = 'anonymous';

    fragment.append(preloadBold);

    const preloadRegular = document.createElement('link');
    preloadRegular.href = 'https://fonts.cdnfonts.com/s/19808/OpenDyslexic-Regular.woff';
    preloadRegular.rel = 'preload';
    preloadRegular.as = 'font';
    preloadRegular.type = 'font/woff';
    preloadRegular.crossOrigin = 'anonymous';

    fragment.append(preloadRegular);

    document.head.append(fragment);
  }, []);

  return {
    fontProps: FONT_PROPS,
    safeFontFamilies: SAFE_FONT_FAMILIES,
    incrementFontProp,
    decrementFontProp,
    updateFontFamily,
    changeFontFamily,
    resetAdjustFont,
    fontSizeStep,
    fontWeightStep,
    letterSpacingStep,
    lineHeightStep,
    fontFamilySelected,
  };
};
