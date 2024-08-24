import { useCallback, useState } from 'react';

import { type MouseEventButton } from '@/types/MouseEventButton';

import { ACCESSIBILITY_CLASS_NAMES, type AccessibilityClassNamesKeys } from '@/constants/AccessibilityClassNames';

export const useFontAccessibility = () => {
  const [activeClassNames, setActiveClassNames] = useState<Set<string>>(new Set());

  const toggleActiveClassNames = useCallback((name: string) => {
    setActiveClassNames((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(name)){
        newSet.delete(name);
        return newSet;
      }
      newSet.add(name);
      return newSet;
    });
  } , []);

  const toggleFontClassName = useCallback((event: MouseEventButton) => {
    const { name } = event.currentTarget;
    if (!(name in ACCESSIBILITY_CLASS_NAMES)) throw new Error(`invalid class name: ${name}`);
    const className: string = ACCESSIBILITY_CLASS_NAMES[name as AccessibilityClassNamesKeys];
    document.body.classList.toggle(className);
    toggleActiveClassNames(className);
  }, []);

  const hasActiveFontClassName = (name: string) => activeClassNames.has(name);

  const resetFontClassNames = useCallback(() => {
    activeClassNames.forEach((className) => {
      document.body.classList.remove(className);
    });
    setActiveClassNames(new Set());
  }, [activeClassNames]);

  return {
    toggleFontClassName,
    hasActiveFontClassName,
    resetFontClassNames
  };
};