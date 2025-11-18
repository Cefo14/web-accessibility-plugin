import { StrictMode } from 'react';

import '@/styles/tokens.css';
import '@/styles/global.css';

import { I18nProvider } from '@/i18n';
import ErrorBoundary from '@/components/ErrorBoundary';

import WebAccessibilityPlugin from './WebAccessibilityPlugin';

const WebAccessibilityPluginWrapper = () => (
  <StrictMode>
    <ErrorBoundary>
      <I18nProvider>
        <WebAccessibilityPlugin />
      </I18nProvider>
    </ErrorBoundary>
  </StrictMode>
);

export default WebAccessibilityPluginWrapper;
