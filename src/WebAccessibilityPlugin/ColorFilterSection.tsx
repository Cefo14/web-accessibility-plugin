import { memo, useCallback } from 'react';

import type { MouseEventButton } from '@/types/MouseEvent';
import type { ChangeEventInput } from '@/types/ChangeEvent';

import Heading from '@/components/Heading';
import Text from '@/components/Text';
import SpaceBetween from '@/components/SpaceBetween';
import Slider from '@/components/Slider';
import Button from '@/components/Button';
import AutoGrid from '@/components/AutoGrid';

import type { ColorFilters, ColorFiltersState } from '@/hooks/useColorFilter';
import { useI18n } from '@/i18n';

import styles from './styles.module.css';

type ColorFilterSectionProps = {
  filters: ColorFilters;
  filtersState: ColorFiltersState;
  onChangeColorFilter: (event: ChangeEventInput) => void;
  onSelectCustomColorFilter: (event: MouseEventButton) => void;
  resetColorFilter: () => void;
};

const ColorFilterSection = ({
  filters,
  filtersState,
  onChangeColorFilter,
  onSelectCustomColorFilter,
  resetColorFilter,
}: ColorFilterSectionProps) => {
  const { t } = useI18n();

  const isCustomFilterSelected = useCallback((filter: string) => (
    filtersState.customFilterSelected === filter
  ), [filtersState]);

  return (
    <section className={styles.section}>
      <Heading $as="h3" $size="md">
        {t('section.colorFilter.blue')}
      </Heading>

      <SpaceBetween>
        <Text $size="sm" $as="span">
          {t('section.colorFilter.brightness')}
        </Text>
        <Slider
          name={filters.brightness}
          onChange={onChangeColorFilter}
          min={50}
          max={150}
          step={1}
          value={filtersState.brightness}
        />
      </SpaceBetween>

      <SpaceBetween>
        <Text $size="sm" $as="span">
          {t('section.colorFilter.contrast')}
        </Text>
        <Slider
          name={filters.contrast}
          onChange={onChangeColorFilter}
          min={20}
          max={180}
          step={1}
          value={filtersState.contrast}
        />
      </SpaceBetween>

      <SpaceBetween>
        <Text $size="sm" $as="span">
          {t('section.colorFilter.saturation')}
        </Text>
        <Slider
          name={filters.saturate}
          onChange={onChangeColorFilter}
          min={20}
          max={180}
          step={1}
          value={filtersState.saturate}
        />
      </SpaceBetween>

      <SpaceBetween>
        <Text $size="sm" $as="span">
          {t('section.colorFilter.sepia')}
        </Text>
        <Slider
          name={filters.sepia}
          onChange={onChangeColorFilter}
          min={0}
          max={100}
          step={1}
          value={filtersState.sepia}
        />
      </SpaceBetween>

      <SpaceBetween>
        <Text $size="sm" $as="span">
          {t('section.colorFilter.hue')}
        </Text>
        <Slider
          name={filters.hue}
          onChange={onChangeColorFilter}
          min={0}
          max={360}
          step={1}
          value={filtersState.hue}
        />
      </SpaceBetween>

      <AutoGrid $gap="0.5em" $columnWidth="6em" $rows={2} $rowWidth="2rem">
        <Button
          type="button"
          name={filters.warm}
          onClick={onSelectCustomColorFilter}
          $variant={isCustomFilterSelected(filters.warm) ? 'secondary' : undefined}
        >
          {t('section.colorFilter.warm')}
        </Button>
        <Button
          type="button"
          name={filters.blue}
          onClick={onSelectCustomColorFilter}
          $variant={isCustomFilterSelected(filters.blue) ? 'secondary' : undefined}
        >
          {t('section.colorFilter.blue')}
        </Button>
        <Button
          type="button"
          name={filters.red}
          onClick={onSelectCustomColorFilter}
          $variant={isCustomFilterSelected(filters.red) ? 'secondary' : undefined}
        >
          {t('section.colorFilter.red')}
        </Button>
        <Button
          type="button"
          name={filters.green}
          onClick={onSelectCustomColorFilter}
          $variant={isCustomFilterSelected(filters.green) ? 'secondary' : undefined}
        >
          {t('section.colorFilter.green')}
        </Button>
        <Button
          type="button"
          name={filters.monochrome}
          onClick={onSelectCustomColorFilter}
          $variant={isCustomFilterSelected(filters.monochrome) ? 'secondary' : undefined}
        >
          {t('section.colorFilter.monochrome')}
        </Button>
        <Button
          type="button"
          onClick={resetColorFilter}
          $variant="warning"
        >
          {t('section.colorFilter.reset')}
        </Button>
      </AutoGrid>
    </section>
  );
};

export default memo(ColorFilterSection);
