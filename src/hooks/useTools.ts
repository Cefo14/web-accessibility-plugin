import { useCallback, useState } from 'react';

import type { Mirror } from '@/types/Mirror';
import { hasOwnProperty } from '@/helpers/hasOwnProperty';
import { InvalidPropError } from '@/errors/InvalidPropError';

import styles from '@/styles/tools.module.css';

type ToolClassName = 'highlightTitles' | 'highlightLinks' | 'hideImages' | 'stopAnimations';

const TOOL_CLASS_NAMES: Mirror<ToolClassName> = {
  highlightTitles: 'highlightTitles',
  highlightLinks: 'highlightLinks',
  hideImages: 'hideImages',
  stopAnimations: 'stopAnimations',
} as const;

const CLASS_NAMES: Record<ToolClassName, string> = {
  highlightTitles: styles.highlightTitles,
  highlightLinks: styles.highlightLinks,
  hideImages: styles.hideImages,
  stopAnimations: styles.stopAnimations,
} as const;

export type Tools = typeof TOOL_CLASS_NAMES;

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
    tools: TOOL_CLASS_NAMES,
    toggleTool,
    isToolActive,
    resetTools,
  };
};
