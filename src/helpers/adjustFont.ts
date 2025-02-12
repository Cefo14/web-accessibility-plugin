import { getInitialComputedStyle } from './getInitialComputedStyle';
import { removeLetters } from './removeLetters';
import { toFixed } from './toFixed';

export const updateFontSize = (element: HTMLElement, step: number) => {
  const originalValue = getInitialComputedStyle(element, 'fontSize');
  const parsedValue = parseFloat(removeLetters(originalValue));
  const newValue = parsedValue * (1 + step / 10);
  element.style.setProperty('font-size', `${toFixed(newValue, 2)}px`);
};

export const updateFontWeight = (element: HTMLElement, step: number) => {
  const originalValue = getInitialComputedStyle(element, 'fontWeight');
  const parsedValue = parseFloat(removeLetters(originalValue));
  let newValue: string;
  if (parsedValue >= 1000) newValue = '1000';
  else if (parsedValue <= 100) newValue = '100';
  else newValue = (parsedValue + (100 * step)).toString();
  element.style.setProperty('font-weight', newValue);
};

export const updateLetterSpacing = (element: HTMLElement, step: number) => {
  const originalValue = getInitialComputedStyle(element, 'letterSpacing');
  const parsedValue = originalValue === 'normal' ? 0 : parseFloat(removeLetters(originalValue));
  const newValue = parsedValue + step;
  element.style.setProperty('letter-spacing', `${newValue}px`);
};

export const updateLineHeight = (element: HTMLElement, step: number) => {
  const originalValue = getInitialComputedStyle(element, 'lineHeight');
  const parsedValue = parseFloat(removeLetters(originalValue));
  const newValue = parsedValue * (1 + step / 10);
  element.style.setProperty('line-height', `${toFixed(newValue, 2)}px`);
};

export const updateFontFamily = (element: HTMLElement, fontFamily?: string) => {
  const originalValue = getInitialComputedStyle(element, 'fontFamily');
  if (!fontFamily) element.style.setProperty('font-family', originalValue);
  else element.style.setProperty('font-family', fontFamily);
};
