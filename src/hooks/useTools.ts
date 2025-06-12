import { useCallback, useState } from 'react';

import type { Mirror } from '@/types/Mirror';
import highlightClassNames from '@/styles/tools.module.css';
import { hasOwnProperty } from '@/helpers/hasOwnProperty';
import { InvalidPropError } from '@/errors/InvalidPropError';

type ToolClassName = 'highlightTitles' | 'highlightLinks' | 'highlightCursor' | 'hideImages';

const TOOL_CLASS_NAMES: Mirror<ToolClassName> = {
  highlightTitles: 'highlightTitles',
  highlightLinks: 'highlightLinks',
  highlightCursor: 'highlightCursor',
  hideImages: 'hideImages',
} as const;

const CLASS_NAMES: Record<ToolClassName, string> = {
  highlightTitles: highlightClassNames.highlightTitles,
  highlightLinks: highlightClassNames.highlightLinks,
  highlightCursor: highlightClassNames.highlightCursor,
  hideImages: highlightClassNames.hideImages,
} as const;

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
    if (!hasOwnProperty(CLASS_NAMES, name)) throw new InvalidPropError(`Invalid tool name "${name}"`);
    const className: string = CLASS_NAMES[name];
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
