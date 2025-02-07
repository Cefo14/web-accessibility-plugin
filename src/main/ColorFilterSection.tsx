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
  const isCustomFilterSelected = useCallback((filter: string) => (
    filtersState.customFilterSelected === filter
  ), [filtersState]);
  return (
    <section className={styles.section}>
      <Heading $as="h3" $size="md">
        Filtros de Color
      </Heading>

      <SpaceBetween>
        <Text $size="sm" $as="span">
          Brillo
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
          Contraste
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
          Saturacion
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
          Sepia
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
          HUE
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
          Calido
        </Button>
        <Button
          type="button"
          name={filters.blue}
          onClick={onSelectCustomColorFilter}
          $variant={isCustomFilterSelected(filters.blue) ? 'secondary' : undefined}
        >
          Azul
        </Button>
        <Button
          type="button"
          name={filters.red}
          onClick={onSelectCustomColorFilter}
          $variant={isCustomFilterSelected(filters.red) ? 'secondary' : undefined}
        >
          Rojo
        </Button>
        <Button
          type="button"
          name={filters.green}
          onClick={onSelectCustomColorFilter}
          $variant={isCustomFilterSelected(filters.green) ? 'secondary' : undefined}
        >
          Verde
        </Button>
        <Button
          type="button"
          name={filters.monochrome}
          onClick={onSelectCustomColorFilter}
          $variant={isCustomFilterSelected(filters.monochrome) ? 'secondary' : undefined}
        >
          Monocromatico
        </Button>
        <Button
          type="button"
          onClick={resetColorFilter}
          $variant="warning"
        >
          Restablecer
        </Button>
      </AutoGrid>
    </section>
  );
};

export default memo(ColorFilterSection);
