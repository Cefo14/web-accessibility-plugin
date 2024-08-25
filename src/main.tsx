import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'sanitize.css';
import './styles.css';

import App from './Accessibility';

class Accessibility {
  render(container: HTMLElement) {
    if (!container) {
      throw new Error('Container is required');
    }
    const root = createRoot(container);
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  }
}

type WindowWithAccessibility = Window & typeof globalThis & { Accessibility: typeof Accessibility };
(window as WindowWithAccessibility).Accessibility = Accessibility;
