import { memo } from 'react';

import type { ChangeEventInput } from '@/types/ChangeEvent';

import Heading from '@/components/Heading';
import Switch from '@/components/Switch';
import Text from '@/components/Text';
import SpaceBetween from '@/components/SpaceBetween';

import type { Tools } from '@/hooks/useTools';

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
}: ToolsSectionProps) => (
  <section className={styles.section}>
    <Heading $as="h3" $size="md">
      Herramientas
    </Heading>

    <SpaceBetween>
      <Text $size="sm" $as="span">
        Resaltar Titulos
      </Text>
      <Switch
        name={tools.highlightTitles}
        onChange={onToggleTool}
        checked={isToolActive(tools.highlightTitles)}
        aria-label="Resaltar Titulos"
        $enterabled
      />
    </SpaceBetween>

    <SpaceBetween>
      <Text $size="sm" $as="span">
        Resaltar Enlaces
      </Text>
      <Switch
        name={tools.highlightLinks}
        onChange={onToggleTool}
        checked={isToolActive(tools.highlightLinks)}
        aria-label="Resaltar Enlaces"
        $enterabled
      />
    </SpaceBetween>

    <SpaceBetween>
      <Text $size="sm" $as="span">
        Resaltar cursor
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
        Ocultar Imagenes
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

export default memo(ToolsSection);
