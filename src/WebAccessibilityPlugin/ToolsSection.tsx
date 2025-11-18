import { memo } from 'react';

import type { ChangeEventInput } from '@/types/ChangeEvent';

import Heading from '@/components/Heading';
import Switch from '@/components/Switch';
import Text from '@/components/Text';
import SpaceBetween from '@/components/SpaceBetween';

import type { Tools } from '@/hooks/useTools';
import { useI18n } from '@/i18n';

import styles from './styles.module.css';

interface ToolsSectionProps {
  tools: Tools;
  onToggleTool: (event: ChangeEventInput) => void;
  isToolActive: (name: string) => boolean;
}

const ToolsSection = ({
  tools,
  onToggleTool,
  isToolActive,
}: ToolsSectionProps) => {
  const { t } = useI18n();
  return (
    <section className={styles.section}>
      <Heading $as="h3" $size="md">
        {t('section.tools.title')}
      </Heading>

      <SpaceBetween>
        <Text $size="sm" $as="span" id="highlight-titles-label">
          {t('section.tools.highlightTitles')}
        </Text>
        <Switch
          name={tools.highlightTitles}
          onChange={onToggleTool}
          checked={isToolActive(tools.highlightTitles)}
          aria-labelledby="highlight-titles-label"
          $enterabled
        />
      </SpaceBetween>

      <SpaceBetween>
        <Text $size="sm" $as="span" id="highlight-links-label">
          {t('section.tools.highlightLinks')}
        </Text>
        <Switch
          name={tools.highlightLinks}
          onChange={onToggleTool}
          checked={isToolActive(tools.highlightLinks)}
          aria-labelledby="highlight-links-label"
          $enterabled
        />
      </SpaceBetween>

      <SpaceBetween>
        <Text $size="sm" $as="span" id="hide-images-label">
          {t('section.tools.hideImages')}
        </Text>
        <Switch
          name={tools.hideImages}
          onChange={onToggleTool}
          checked={isToolActive(tools.hideImages)}
          aria-labelledby="hide-images-label"
          $enterabled
        />
      </SpaceBetween>

      <SpaceBetween>
        <Text $size="sm" $as="span" id="stop-animations-label">
          {t('section.tools.stopAnimations')}
        </Text>
        <Switch
          name={tools.stopAnimations}
          onChange={onToggleTool}
          checked={isToolActive(tools.stopAnimations)}
          aria-labelledby="stop-animations-label"
          $enterabled
        />
      </SpaceBetween>
    </section>
  );
};

export default memo(ToolsSection);
