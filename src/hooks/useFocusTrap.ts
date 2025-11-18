import { useEffect, useRef } from 'react';

/**
 * Custom hook to trap focus within a modal/dialog element
 * Implements WCAG 2.1 guideline 2.4.3 (Focus Order)
 * 
 * Features:
 * - Traps focus within the container when active
 * - Restores focus to the previously focused element when closed
 * - Handles Tab and Shift+Tab navigation
 * - Scoped to the container to avoid conflicts with other modals
 * 
 * @param isActive - Whether the focus trap should be active
 * @returns ref - Ref to attach to the container element
 */
export const useFocusTrap = (isActive: boolean) => {
  const containerRef = useRef<HTMLElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive) return;

    const container = containerRef.current;
    if (!container) return;

    // Store the element that had focus before opening (if it's a valid element)
    const activeEl = document.activeElement as HTMLElement;
    if (activeEl && activeEl !== document.body) {
      previouslyFocusedElement.current = activeEl;
    }

    // Get all focusable elements within the container
    const getFocusableElements = (): HTMLElement[] => {
      if (!container) return [];

      const focusableSelectors = [
        'a[href]',
        'button:not([disabled])',
        'textarea:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
      ].join(', ');

      return Array.from(container.querySelectorAll(focusableSelectors));
    };

    // Focus the first focusable element that is not in the header
    // This allows the language selector to get focus first instead of header buttons
    const focusableElements = getFocusableElements();
    if (focusableElements.length > 0) {
      // Try to find first element that's not a header button (skip first 2 if they exist)
      const firstContentElement = focusableElements.find((el) => {
        const isHeaderButton = el.closest('header') !== null;
        return !isHeaderButton;
      });
      
      if (firstContentElement) {
        firstContentElement.focus();
      } else {
        // Fallback to first element if no content element found
        focusableElements[0].focus();
      }
    }

    // Handle Tab key to trap focus
    // Uses event capturing to intercept before other handlers
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          event.preventDefault();
          event.stopPropagation(); // Prevent other listeners from interfering
          lastElement.focus();
        }
      } else if (document.activeElement === lastElement) {
        // Tab
        event.preventDefault();
        event.stopPropagation(); // Prevent other listeners from interfering
        firstElement.focus();
      }
    };

    // Use capture phase to handle before other event listeners
    container.addEventListener('keydown', handleKeyDown, true);

    // Cleanup: restore focus when unmounting
    return () => {
      container.removeEventListener('keydown', handleKeyDown, true);
      
      // Restore focus to the previously focused element only if it still exists in DOM
      if (previouslyFocusedElement.current && document.body.contains(previouslyFocusedElement.current)) {
        // Use setTimeout to avoid focus conflicts during React re-renders
        setTimeout(() => {
          previouslyFocusedElement.current?.focus();
        }, 0);
      }
    };
  }, [isActive]);

  return containerRef;
};
