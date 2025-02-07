import { useCallback, useState } from 'react';

import highlightClassNames from '@/styles/tools.module.css';

const TOOL_CLASS_NAMES = {
  highlightTitles: 'highlightTitles',
  highlightLinks: 'highlightLinks',
  highlightCursor: 'highlightCursor',
  hideImages: 'hideImages',
} as const;

const CLASS_NAMES = {
  [TOOL_CLASS_NAMES.highlightTitles]: highlightClassNames.highlightTitle,
  [TOOL_CLASS_NAMES.highlightLinks]: highlightClassNames.highlightLink,
  [TOOL_CLASS_NAMES.highlightCursor]: highlightClassNames.highlightCursor,
  [TOOL_CLASS_NAMES.hideImages]: highlightClassNames.hideImages,
} as const;

type ClassNames = typeof CLASS_NAMES;

const TOOLS = {
  ...TOOL_CLASS_NAMES,
};

export type Tools = typeof TOOLS;

const EMPTY_ACTIVE_TOOLS = new Set<string>();

export const useTools = () => {
  const [activeTools, setActiveTools] = useState<Set<string>>(EMPTY_ACTIVE_TOOLS);

  const toggleToolState = useCallback((tool: string) => {
    const tools = new Set(activeTools);
    if (tools.has(tool)) tools.delete(tool);
    else tools.add(tool);
    setActiveTools(tools);
  }, [activeTools]);

  const toggleTool = useCallback((name: string) => {
    if (!(name in CLASS_NAMES)) throw new Error('Invalid Tool name');
    const className: string = CLASS_NAMES[name as keyof ClassNames];
    document.body.classList.toggle(className);
    toggleToolState(name);
  }, [toggleToolState]);

  const isToolActive = useCallback((name: string): boolean => (
    activeTools.has(name)
  ), [activeTools]);

  const resetTools = useCallback(() => {
    const classNames = Object.values(CLASS_NAMES);
    document.body.classList.remove(...classNames);
    setActiveTools(EMPTY_ACTIVE_TOOLS);
  }, []);

  return {
    tools: TOOLS,
    toggleTool,
    isToolActive,
    resetTools,
  };
};
