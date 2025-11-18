import { createRoot } from 'react-dom/client';

import WebAccessibilityPlugin from '@/WebAccessibilityPlugin';
import { RenderError } from '@/errors/RenderError';

const rootElement = document.getElementById('root');

if (!rootElement) throw new RenderError('Root element not found');

const root = createRoot(rootElement);
root.render(
  <WebAccessibilityPlugin />,
);
