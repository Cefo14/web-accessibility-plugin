import { useCallback, useState } from 'react';

import { type MouseEventButton } from '@/types/MouseEventButton';

import { ACCESSIBILITY_CLASS_NAMES, type AccessibilityClassNamesKeys } from '@/constants/AccessibilityClassNames';

export const useHighlights = () => {
  const [activeHighlights, setActiveHighlights] = useState<Set<string>>(new Set());

  const toggleActiveHighlight = useCallback((name: string) => {
    setActiveHighlights((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(name)){
        newSet.delete(name);
        return newSet;
      }
      newSet.add(name);
      return newSet;
    });
  } , []);

  const togglHighlight = useCallback((event: MouseEventButton) => {
    const { name } = event.currentTarget;
    if (!(name in ACCESSIBILITY_CLASS_NAMES)) throw new Error(`invalid class name: ${name}`);
    const className: string = ACCESSIBILITY_CLASS_NAMES[name as AccessibilityClassNamesKeys];
    document.body.classList.toggle(className);
    toggleActiveHighlight(className);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isActiveHighlight = (name: string) => activeHighlights.has(name);

  const resetHighlights = useCallback(() => {
    document.body.classList.remove(...Array.from(activeHighlights));
    setActiveHighlights(new Set());
  }, [activeHighlights]);

  return {
    togglHighlight,
    isActiveHighlight,
    resetHighlights
  };
};