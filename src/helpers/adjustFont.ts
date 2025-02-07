import { removeLetters } from './removeLetters';
import { toFixed } from './toFixed';
import { camelCaseToKebabCase } from './camelCaseToKebabCase';

type Style = keyof Omit<CSSStyleDeclaration, 'length' | 'parentRule'>;

const getStyleValue = (element: HTMLElement, style: Style) => {
  const parsedStyle = style.toString();
  const dataAttr = `data-${parsedStyle.toLowerCase()}`;

  let originalValue = element.getAttribute(dataAttr);

  if (!originalValue) {
    originalValue = window
      .getComputedStyle(element)
      .getPropertyValue(camelCaseToKebabCase(parsedStyle));
    element.setAttribute(dataAttr, originalValue.toString());
  }

  return originalValue;
};

export const updateFontSize = (element: HTMLElement, step: number) => {
  const originalValue = getStyleValue(element, 'fontSize');
  const parsedValue = parseFloat(removeLetters(originalValue));
  const newValue = parsedValue * (1 + step / 10);
  element.style.setProperty('font-size', `${toFixed(newValue, 2)}px`);
};

export const updateFontWeight = (element: HTMLElement, step: number) => {
  const originalValue = getStyleValue(element, 'fontWeight');
  const parsedValue = parseFloat(removeLetters(originalValue));
  let newValue: string;
  if (parsedValue >= 1000) newValue = '1000';
  else if (parsedValue <= 100) newValue = '100';
  else newValue = (parsedValue + (100 * step)).toString();
  element.style.setProperty('font-weight', newValue);
};

export const updateLetterSpacing = (element: HTMLElement, step: number) => {
  const originalValue = getStyleValue(element, 'letterSpacing');
  const parsedValue = originalValue === 'normal' ? 0 : parseFloat(removeLetters(originalValue));
  const newValue = parsedValue + step;
  element.style.setProperty('letter-spacing', `${newValue}px`);
};

export const updateLineHeight = (element: HTMLElement, step: number) => {
  const originalValue = getStyleValue(element, 'lineHeight');
  const parsedValue = parseFloat(removeLetters(originalValue));
  const newValue = parsedValue * (1 + step / 10);
  element.style.setProperty('line-height', `${toFixed(newValue, 2)}px`);
};

export const updateFontFamily = (element: HTMLElement, fontFamily?: string) => {
  const originalValue = getStyleValue(element, 'fontFamily');
  if (!fontFamily) element.style.setProperty('font-family', originalValue);
  else element.style.setProperty('font-family', fontFamily);
};
