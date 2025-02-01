import { camelCaseToKebabCase } from './camelCaseToKebabCase';

type CSSByArgs = keyof Omit<CSSStyleDeclaration, 'length' | 'parentRule'>;

export const getOriginalPropertyValue = (element: HTMLElement, prop: CSSByArgs) => {
  const propByStr = prop.toString();
  const DATA_ATTR = `data-${propByStr.toLowerCase()}`;

  let originalValue = element.getAttribute(DATA_ATTR) ?? null;

  if (!originalValue) {
    const styleValue = element.style[prop as never];
    originalValue = (
      styleValue || window
        .getComputedStyle(element)
        .getPropertyValue(camelCaseToKebabCase(propByStr))
    );
    element.setAttribute(DATA_ATTR, originalValue.toString());
  }

  return originalValue;
};
