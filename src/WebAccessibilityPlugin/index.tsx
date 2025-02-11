import { I18nProvider } from '@/i18n';
import WebAccessibilityPlugin from './WebAccessibilityPlugin';

const WebAccessibilityPluginWrapper = () => (
  <I18nProvider>
    <WebAccessibilityPlugin />
  </I18nProvider>
);

export default WebAccessibilityPluginWrapper;
