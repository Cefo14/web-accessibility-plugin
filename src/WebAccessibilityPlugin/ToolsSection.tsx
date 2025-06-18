import { memo } from 'react';

import type { ChangeEventInput } from '@/types/ChangeEvent';

import Heading from '@/components/Heading';
import Switch from '@/components/Switch';
import Text from '@/components/Text';
import SpaceBetween from '@/components/SpaceBetween';

import type { Tools } from '@/hooks/useTools';
import { useI18n } from '@/i18n';

import styles from './styles.module.css';

type ToolsSectionProps = {
  tools: Tools;
  onToggleTool: (event: ChangeEventInput) => void;
  isToolActive: (name: string) => boolean;
};

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
        <Text $size="sm" $as="span">
          {t('section.tools.highlightTitles')}
        </Text>
        <Switch
          name={tools.highlightTitles}
          onChange={onToggleTool}
          checked={isToolActive(tools.highlightTitles)}
          $enterabled
        />
      </SpaceBetween>

      <SpaceBetween>
        <Text $size="sm" $as="span">
          {t('section.tools.highlightLinks')}
        </Text>
        <Switch
          name={tools.highlightLinks}
          onChange={onToggleTool}
          checked={isToolActive(tools.highlightLinks)}
          $enterabled
        />
      </SpaceBetween>

      <SpaceBetween>
        <Text $size="sm" $as="span">
          {t('section.tools.highlightCursor')}
        </Text>
        <Switch
          name={tools.highlightCursor}
          onChange={onToggleTool}
          checked={isToolActive(tools.highlightCursor)}
          aria-label="Resaltar cursor"
          $enterabled
        />
      </SpaceBetween>

      <SpaceBetween>
        <Text $size="sm" $as="span">
          {t('section.tools.hideImages')}
        </Text>
        <Switch
          name={tools.hideImages}
          onChange={onToggleTool}
          checked={isToolActive(tools.hideImages)}
          aria-label="Resaltar cursor"
          $enterabled
        />
      </SpaceBetween>
    </section>
  );
};

export default memo(ToolsSection);
