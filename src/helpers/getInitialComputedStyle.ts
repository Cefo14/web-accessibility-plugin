import { camelCaseToKebabCase } from './camelCaseToKebabCase';

type Style = keyof Omit<CSSStyleDeclaration, 'length' | 'parentRule'>;

export const getInitialComputedStyle = (element: HTMLElement, style: Style) => {
  const parsedStyle = style.toString();
  const dataAttr = `data-wap-${parsedStyle.toLowerCase()}`;

  const value = element.getAttribute(dataAttr);
  if (value) return value;

  const currentValue = window
    .getComputedStyle(element)
    .getPropertyValue(camelCaseToKebabCase(parsedStyle));
  element.setAttribute(dataAttr, currentValue.toString());

  return currentValue;
};
