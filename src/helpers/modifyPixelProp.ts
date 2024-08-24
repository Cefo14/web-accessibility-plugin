import { camelCaseToKebabCase } from './camelCaseToKebabCase';
import { toFixed } from './toFixed';

type CSSByArgs = keyof Omit<CSSStyleDeclaration, 'length' | 'parentRule'>;

export const modifyPixelProp = (element: HTMLElement, prop: CSSByArgs, multiply = 1) => {
  const propByStr = prop.toString();
  const DATA_ATTR = `data-accessibility-original-${propByStr.toLowerCase()}`;

  if (multiply === 1) {
    element.style.removeProperty(camelCaseToKebabCase(propByStr));
    element.removeAttribute(DATA_ATTR);
    return element;
  }

  const originalAttrValue = element.getAttribute(DATA_ATTR) ?? '';
  let originalValue = parseFloat(originalAttrValue);

  if (Number.isNaN(originalValue)) {
    const styleValue = element.style[prop as never];
    let currentValue = (
      styleValue
        ? styleValue
        : window
          .getComputedStyle(element)
          .getPropertyValue(camelCaseToKebabCase(propByStr))
    );
    currentValue = currentValue.replace(/[A-Za-z]/, '');
    originalValue = parseFloat(currentValue);
    element.setAttribute(DATA_ATTR, originalValue.toString());
  }

  const newAttrValue = toFixed(originalValue * multiply, 2);
  element.style[prop as never] = `${newAttrValue}px`;

  return element;
};
