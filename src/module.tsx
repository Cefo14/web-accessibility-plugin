import type { Root } from 'react-dom/client';
import { createRoot } from 'react-dom/client';

import WebAccessibilityPluginComponent from '@/WebAccessibilityPlugin';
import { RenderError } from '@/errors/RenderError';

class WebAccessibilityPlugin {
  private root: Root;

  constructor(container: HTMLElement) {
    if (!container) throw new RenderError('Container is required');
    this.root = createRoot(container);
  }

  render() {
    this.root.render(
      <WebAccessibilityPluginComponent />,
    );
  }

  destroy() {
    this.root.unmount();
  }
}

type CurrentWindow = Window & typeof globalThis;
type NewWindowProp = { WebAccessibilityPlugin: typeof WebAccessibilityPlugin };
(window as CurrentWindow & NewWindowProp).WebAccessibilityPlugin = WebAccessibilityPlugin;
