import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'sanitize.css';
import '@/styles/global.css';

import { ReactWebAccessibilityPlugin } from './ReactWebAccessibilityPlugin';

const root = createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
    <ReactWebAccessibilityPlugin />
  </StrictMode>
);
