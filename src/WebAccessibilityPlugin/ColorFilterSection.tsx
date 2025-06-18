import { memo, useCallback } from 'react';

import type { MouseEventButton } from '@/types/MouseEvent';
import type { ChangeEventInput } from '@/types/ChangeEvent';

import Heading from '@/components/Heading';
import Text from '@/components/Text';
import SpaceBetween from '@/components/SpaceBetween';
import Slider from '@/components/Slider';
import Button from '@/components/Button';
import AutoGrid from '@/components/AutoGrid';

import { COLOR_FILTERS } from '@/helpers/ColorFilterUpdater';
import { COLOR_FILTER_SETTING_NAMES } from '@/helpers/ColorFilterSettings';
import type { ColorFilterState } from '@/hooks/useColorFilter';

import { useI18n } from '@/i18n';

import styles from './styles.module.css';

type ColorFilterSectionProps = {
  state: ColorFilterState;
  onChangeColorFilter: (event: ChangeEventInput) => void;
  onSelectCustomColorFilter: (event: MouseEventButton) => void;
};

const ColorFilterSection = ({
  state,
  onChangeColorFilter,
  onSelectCustomColorFilter,
}: ColorFilterSectionProps) => {
  const { t } = useI18n();

  const isCustomFilterSelected = useCallback((filter: string) => (
    state.customFilterSelected === filter
  ), [state]);

  return (
    <section className={styles.section}>
      <Heading $as="h3" $size="md">
        {t('section.colorFilter.title')}
      </Heading>

      <SpaceBetween>
        <Text $size="sm" $as="span">
          {t('section.colorFilter.brightness')}
        </Text>
        <Slider
          name={COLOR_FILTERS.brightness}
          onChange={onChangeColorFilter}
          min={50}
          max={150}
          step={1}
          value={state.brightness}
        />
      </SpaceBetween>

      <SpaceBetween>
        <Text $size="sm" $as="span">
          {t('section.colorFilter.contrast')}
        </Text>
        <Slider
          name={COLOR_FILTERS.contrast}
          onChange={onChangeColorFilter}
          min={20}
          max={180}
          step={1}
          value={state.contrast}
        />
      </SpaceBetween>

      <SpaceBetween>
        <Text $size="sm" $as="span">
          {t('section.colorFilter.saturation')}
        </Text>
        <Slider
          name={COLOR_FILTERS.saturate}
          onChange={onChangeColorFilter}
          min={20}
          max={180}
          step={1}
          value={state.saturate}
        />
      </SpaceBetween>

      <SpaceBetween>
        <Text $size="sm" $as="span">
          {t('section.colorFilter.sepia')}
        </Text>
        <Slider
          name={COLOR_FILTERS.sepia}
          onChange={onChangeColorFilter}
          min={0}
          max={100}
          step={1}
          value={state.sepia}
        />
      </SpaceBetween>

      <SpaceBetween>
        <Text $size="sm" $as="span">
          {t('section.colorFilter.hue')}
        </Text>
        <Slider
          name={COLOR_FILTERS['hue-rotate']}
          onChange={onChangeColorFilter}
          min={0}
          max={360}
          step={1}
          value={state['hue-rotate']}
        />
      </SpaceBetween>

      <AutoGrid $gap="0.5em" $columnWidth="6em" $rows={2} $rowWidth="2rem">
        <Button
          type="button"
          name={COLOR_FILTER_SETTING_NAMES.warm}
          onClick={onSelectCustomColorFilter}
          $variant={isCustomFilterSelected(COLOR_FILTER_SETTING_NAMES.warm) ? 'secondary' : undefined}
        >
          {t('section.colorFilter.warm')}
        </Button>
        <Button
          type="button"
          name={COLOR_FILTER_SETTING_NAMES.blue}
          onClick={onSelectCustomColorFilter}
          $variant={isCustomFilterSelected(COLOR_FILTER_SETTING_NAMES.blue) ? 'secondary' : undefined}
        >
          {t('section.colorFilter.blue')}
        </Button>
        <Button
          type="button"
          name={COLOR_FILTER_SETTING_NAMES.red}
          onClick={onSelectCustomColorFilter}
          $variant={isCustomFilterSelected(COLOR_FILTER_SETTING_NAMES.red) ? 'secondary' : undefined}
        >
          {t('section.colorFilter.red')}
        </Button>
        <Button
          type="button"
          name={COLOR_FILTER_SETTING_NAMES.green}
          onClick={onSelectCustomColorFilter}
          $variant={isCustomFilterSelected(COLOR_FILTER_SETTING_NAMES.green) ? 'secondary' : undefined}
        >
          {t('section.colorFilter.green')}
        </Button>
        <Button
          type="button"
          name={COLOR_FILTER_SETTING_NAMES.monochrome}
          onClick={onSelectCustomColorFilter}
          $variant={isCustomFilterSelected(COLOR_FILTER_SETTING_NAMES.monochrome) ? 'secondary' : undefined}
        >
          {t('section.colorFilter.monochrome')}
        </Button>
        <Button
          type="button"
          name={COLOR_FILTER_SETTING_NAMES.base}
          onClick={onSelectCustomColorFilter}
          $variant="warning"
        >
          {t('section.colorFilter.reset')}
        </Button>
      </AutoGrid>
    </section>
  );
};

export default memo(ColorFilterSection);
