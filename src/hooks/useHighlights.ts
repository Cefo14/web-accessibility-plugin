import { useCallback, useState } from 'react';

import type { ChangeEventInput } from '@/types/ChangeEvent';
import highlightClassNames from '@/styles/highlights.module.css';

const HIGHLIGHT_ID = {
  highlightTitles: 'highlightTitles',
  highlightLinks: 'highlightLinks',
  highlightCursor: 'highlightCursor',
} as const;

const HIGHLIGHTS_CLASS_NAMES = {
  [HIGHLIGHT_ID.highlightTitles]: highlightClassNames.highlightTitle,
  [HIGHLIGHT_ID.highlightLinks]: highlightClassNames.highlightLink,
  [HIGHLIGHT_ID.highlightCursor]: highlightClassNames.highlightCursor,
} as const;

type HighlightsClassNames = keyof typeof HIGHLIGHTS_CLASS_NAMES;

export const useHighlights = () => {
  const [activeHighlights, setActiveHighlights] = useState<Set<string>>(new Set());

  const toggleActiveHighlight = useCallback((name: string) => {
    setActiveHighlights((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(name)) {
        newSet.delete(name);
        return newSet;
      }
      newSet.add(name);
      return newSet;
    });
  }, []);

  const emptyActiveHighlights = useCallback(() => {
    setActiveHighlights(new Set());
  }, []);

  const togglHighlight = useCallback((event: ChangeEventInput) => {
    const { name } = event.currentTarget;
    if (!(name in HIGHLIGHTS_CLASS_NAMES)) throw new Error(`invalid class name: ${name}`);
    const className: string = HIGHLIGHTS_CLASS_NAMES[name as HighlightsClassNames];
    document.body.classList.toggle(className);
    toggleActiveHighlight(name);
  }, [toggleActiveHighlight]);

  const isActiveHighlight = useCallback((name: string) => (
    activeHighlights.has(name)
  ), [activeHighlights]);

  const resetHighlights = useCallback(() => {
    document.body.classList.remove(...Array.from(activeHighlights));
    emptyActiveHighlights();
  }, [activeHighlights, emptyActiveHighlights]);

  return {
    id: HIGHLIGHT_ID,
    togglHighlight,
    isActiveHighlight,
    resetHighlights,
  };
};
