import { camelCaseToKebabCase } from './camelCaseToKebabCase';

type CSSByArgs = keyof Omit<CSSStyleDeclaration, 'length' | 'parentRule'>;

export const getOriginalPropertyValue = (element: HTMLElement, prop: CSSByArgs) => {
  const propByStr = prop.toString();
  const DATA_ATTR = `data-accessibility-original-${propByStr.toLowerCase()}`;

  let originalValue = element.getAttribute(DATA_ATTR) ?? null;

  if (!originalValue) {
    const styleValue = element.style[prop as never];
    let currentValue = (
      styleValue
        ? styleValue
        : window
          .getComputedStyle(element)
          .getPropertyValue(camelCaseToKebabCase(propByStr))
    );
    currentValue = currentValue.replace(/[A-Za-z]/, '');
    originalValue = currentValue
    element.setAttribute(DATA_ATTR, originalValue.toString());
  }

  return originalValue;
};
