import { useCallback, useState } from 'react';

import type { ChangeEventInput } from '@/types/ChangeEvent';
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

const TOOL_NAMES = {
  ...TOOL_CLASS_NAMES,
};

type ClassNames = keyof typeof CLASS_NAMES;

const EMPTY_ACTIVE_TOOLS = new Set<string>();

export const useTools = () => {
  const [activeTools, setActiveTools] = useState<Set<string>>(EMPTY_ACTIVE_TOOLS);

  const toggleActiveTools = useCallback((toolName: string) => {
    const tools = new Set(activeTools);
    if (tools.has(toolName)) tools.delete(toolName);
    else tools.add(toolName);
    setActiveTools(tools);
  }, [activeTools]);

  const toggleTool = useCallback((event: ChangeEventInput) => {
    const { name } = event.currentTarget;
    if (name in CLASS_NAMES) {
      const className: string = CLASS_NAMES[name as ClassNames];
      document.body.classList.toggle(className);
    }
    toggleActiveTools(name);
  }, [toggleActiveTools]);

  const isToolActive = useCallback((name: string): boolean => (
    activeTools.has(name)
  ), [activeTools]);

  const resetTools = useCallback(() => {
    const classNames = Object.values(CLASS_NAMES);
    document.body.classList.remove(...classNames);
    setActiveTools(EMPTY_ACTIVE_TOOLS);
  }, []);

  return {
    toolNames: TOOL_NAMES,
    toggleTool,
    isToolActive,
    resetTools,
  };
};
