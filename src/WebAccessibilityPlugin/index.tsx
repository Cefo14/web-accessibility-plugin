import { StrictMode } from 'react';

import type { WebAccessibilityPluginConfig } from '@/types/WebAccessibilityPluginConfig';

import '@/styles/tokens.css';
import '@/styles/global.css';

import { I18nProvider } from '@/i18n';
import ErrorBoundary from '@/components/ErrorBoundary';

import WebAccessibilityPlugin from './WebAccessibilityPlugin';

interface WebAccessibilityPluginWrapperProps {
  config?: WebAccessibilityPluginConfig;
}

const WebAccessibilityPluginWrapper = ({ config }: WebAccessibilityPluginWrapperProps) => (
  <StrictMode>
    <ErrorBoundary>
      <I18nProvider>
        <WebAccessibilityPlugin config={config} />
      </I18nProvider>
    </ErrorBoundary>
  </StrictMode>
);

export default WebAccessibilityPluginWrapper;
