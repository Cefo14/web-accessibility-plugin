import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'sanitize.css';
import '@/styles/global.css';

import { default as WebAccessibilityPluginComponent } from '@/WebAccessibilityPlugin';

class WebAccessibilityPlugin {
  private container: HTMLElement;

  constructor(container: HTMLElement) {
    if (!container) throw new Error('Container is required');
    this.container = container;
  }

  render() {
    const root = createRoot(this.container);
    root.render(
      <StrictMode>
        <WebAccessibilityPluginComponent />
      </StrictMode>,
    );
  }
}

type CurrentWindow = Window & typeof globalThis;
type NewWindowProp = { WebAccessibilityPlugin: typeof WebAccessibilityPlugin };
(window as CurrentWindow & NewWindowProp).WebAccessibilityPlugin = WebAccessibilityPlugin;
