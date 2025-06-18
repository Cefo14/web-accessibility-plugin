import { createRoot } from 'react-dom/client';

import WebAccessibilityPlugin from '@/WebAccessibilityPlugin';

const root = createRoot(document.getElementById('root')!);
root.render(
  <WebAccessibilityPlugin />,
);
