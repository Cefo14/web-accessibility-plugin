import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'sanitize.css';
import '@/styles/global.css';

import { ReactWebAccessibilityPlugin } from './ReactWebAccessibilityPlugin';

class Accessibility {
  private container: HTMLElement;

  constructor(container: HTMLElement) {
    if (!container) throw new Error('Container is required');
    this.container = container;
  }

  render() {
    const root = createRoot(this.container);
    root.render(
      <StrictMode>
        <ReactWebAccessibilityPlugin />
      </StrictMode>,
    );
  }
}

type WindowWithAccessibility = Window & typeof globalThis & { Accessibility: typeof Accessibility };
(window as WindowWithAccessibility).Accessibility = Accessibility;
