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
    root.render(<App />);
  }
}

type WindowWithAccessibility = Window & typeof globalThis & { Accessibility: typeof Accessibility };
(window as WindowWithAccessibility).Accessibility = Accessibility;
