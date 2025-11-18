import type { Root } from 'react-dom/client';
import { createRoot } from 'react-dom/client';

import type { WebAccessibilityPluginConfig } from '@/types/WebAccessibilityPluginConfig';
import WebAccessibilityPluginComponent from '@/WebAccessibilityPlugin';
import { RenderError } from '@/errors/RenderError';

class WebAccessibilityPlugin {
  private root: Root;
  private config?: WebAccessibilityPluginConfig;

  constructor(container: HTMLElement, config?: WebAccessibilityPluginConfig) {
    if (!container) throw new RenderError('Container is required');
    this.root = createRoot(container);
    this.config = config;
  }

  render() {
    this.root.render(
      <WebAccessibilityPluginComponent config={this.config} />,
    );
  }

  destroy() {
    this.root.unmount();
  }
}

type CurrentWindow = Window & typeof globalThis;
interface NewWindowProp { WebAccessibilityPlugin: typeof WebAccessibilityPlugin }
(window as CurrentWindow & NewWindowProp).WebAccessibilityPlugin = WebAccessibilityPlugin;
