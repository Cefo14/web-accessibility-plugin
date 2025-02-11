import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'sanitize.css';
import '@/styles/global.css';

import WebAccessibilityPlugin from './WebAccessibilityPlugin';

const root = createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
    <WebAccessibilityPlugin />
  </StrictMode>,
);
