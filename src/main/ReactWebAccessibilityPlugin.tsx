import { useCallback, memo } from 'react';
import clsx from 'clsx';

import { type ElementProps } from '@/types/ElementProps';

import { GLOBALS } from '@/constants/Globals';

import OpenMenuButton from '@/components/OpenMenuButton';
import Menu from '@/components/Menu';
import MenuHeader from '@/components/MenuHeader';
import MenuBody from '@/components/MenuBody';
// import AutoGrid from '@/components/AutoGrid';
// import TitleSection from '@/components/TitleSection';
// import MenuButton from '@/components/MenuButton';
// import AdjustButton from '@/components/AdjustButton';

import Heading from '@/components/Heading';
import SwitchButtons from '@/components/SwitchButtons';
import Text from '@/components/Text';
import SpaceBetween from '@/components/SpaceBetween';
import Switch from '@/components/Switch';
import Divider from '@/components/Divider';
import Slider from '@/components/Slider';
import Button from '@/components/Button';
import ButtonGroup from '@/components/ButtonGroup';

// import TitleIcon from '@/assets/title-svgrepo-com.svg?react';
// import LinkIcon from '@/assets/link-svgrepo-com.svg?react';
// import ColorFilterIcon from '@/assets/color-filter-svgrepo-com.svg?react';
// import ContrastIcon from '@/assets/contrast-svgrepo-com.svg?react';
// import SunIcon from '@/assets/sun-svgrepo-com.svg?react';
// import InvertColorsIcon from '@/assets/invert-color-svgrepo-com.svg?react';
// import RedSquareIcon from '@/assets/red-square-svgrepo-com.svg?react';
// import GreenSquareIcon from '@/assets/green-square-svgrepo-com.svg?react';
// import BlueSquareIcon from '@/assets/blue-square-svgrepo-com.svg?react';
// import PieChartTwotone50Icon from '@/assets/pie-chart-twotone-50-svgrepo-com.svg?react';
// import PieChartTwotone25Icon from '@/assets/pie-chart-twotone-25-svgrepo-com.svg?react';
// import CursorIcon from '@/assets/cursor-svgrepo-com.svg?react';
// import UnderLineIcon from '@/assets/underline-svgrepo-com.svg?react';

import { useOpen } from '@/hooks/useOpen';
import { useModifyFontSize } from '@/hooks/useModifyFontSize';
import { useHighlights } from '@/hooks/useHighlights';
import { useColorFilter } from '@/hooks/useColorFilter';
import { useModifyLetterSpacing } from '@/hooks/useModifyLetterSpacing';
import { useModifyLineHeight } from '@/hooks/useModifyLineHeight';
import { useModifyFontWeight } from '@/hooks/useModifyFontWeight';
// import { useTranslate } from '@/hooks/useTranslate';

type ReactWebAccessibilityPluginProps = Omit<ElementProps, 'children'>;

const OPEN_MENU_ID = 'open-menu-button';
const MENU_ID = 'open-menu-button';
const MENU_TITLE_ID = 'menu-title';

export const ReactWebAccessibilityPlugin = memo(({
  className,
  ...props
}: ReactWebAccessibilityPluginProps) => {
  const { isOpen, open, close } = useOpen();

  const {
    min: minFontSizeValue,
    max: maxFontSizeValue,
    now: nowFontSizeValue,
    decrement: decrementFontSizePercentage,
    increment: incrementFontSizePercentage,
    reset: resetFontSize,
  } = useModifyFontSize();

  const {
    min: minLetterSpacingValue,
    max: maxLetterSpacingValue,
    now: nowLetterSpacingValue,
    decrement: decrementLetterSpacing,
    increment: incrementLetterSpacing,
    reset: resetLetterSpacing,
  } = useModifyLetterSpacing();

  const {
    min: minLineHeightValue,
    max: maxLineHeightValue,
    now: nowLineHeightValue,
    decrement: decrementLineHeightPercentage,
    increment: incrementLineHeightPercentage,
    reset: resetLineHeight,
  } = useModifyLineHeight();

  const {
    min: minFontWeightValue,
    max: maxFontWeightValue,
    now: nowFontWeightValue,
    decrement: decrementFontWeight,
    increment: incrementFontWeight,
    reset: resetFontWeight,
  } = useModifyFontWeight();

  const {
    id: highlightId,
    togglHighlight,
    isActiveHighlight,
    resetHighlights,
  } = useHighlights();

  const {
    actions,
    filters,
    onResetColorFilter,
    onChangeColorFilter,
    onChangeCustomColorFilter,
  } = useColorFilter();

  const reset = useCallback(() => {
    resetFontSize();
    resetLetterSpacing();
    resetLineHeight();
    resetFontWeight();
    resetHighlights();
    onResetColorFilter();
  }, [
    resetFontSize,
    resetLetterSpacing,
    resetLineHeight,
    resetFontWeight,
    resetHighlights,
    onResetColorFilter,
  ]);

  // const {
  //   t,
  // } = useTranslate();

  return (
    <section
      id={GLOBALS.ACCESSIBILITY_ID}
      className={clsx('Accessibility__root', className)}
      {...props}
    >
      <OpenMenuButton
        id={OPEN_MENU_ID}
        title="Abrir Menu"
        aria-label="Abrir Menu"
        aria-controls={MENU_ID}
        aria-hidden={isOpen}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        onClick={open}
      />
      <Menu
        $isOpen={isOpen}
        id={MENU_ID}
        aria-labelledby={MENU_TITLE_ID}
      >
        <MenuHeader
          $title="Accesibilidad"
          $onClose={close}
          $onReset={reset}
          $titleId={MENU_TITLE_ID}
          aria-label="header"
        />
        <MenuBody aria-label="body">

          <Heading $as="h3" $size="md">
            Ajustes de Texto
          </Heading>

          <SpaceBetween>
            <Text $size="sm" $as="span">
              Tamaño
            </Text>
            <SwitchButtons
              $min={minFontSizeValue}
              $max={maxFontSizeValue}
              $now={nowFontSizeValue}
              $value={`${nowFontSizeValue}x`}
              $onDecrement={decrementFontSizePercentage}
              $onIncrement={incrementFontSizePercentage}
            />
          </SpaceBetween>

          <SpaceBetween>
            <Text $size="sm" $as="span">
              Espaciado
            </Text>
            <SwitchButtons
              $min={minLetterSpacingValue}
              $max={maxLetterSpacingValue}
              $now={nowLetterSpacingValue}
              $value={`${nowLetterSpacingValue}x`}
              $onDecrement={decrementLetterSpacing}
              $onIncrement={incrementLetterSpacing}
            />
          </SpaceBetween>

          <SpaceBetween>
            <Text $size="sm" $as="span">
              Altura
            </Text>
            <SwitchButtons
              $min={minLineHeightValue}
              $max={maxLineHeightValue}
              $now={nowLineHeightValue}
              $value={`${nowLineHeightValue}x`}
              $onDecrement={decrementLineHeightPercentage}
              $onIncrement={incrementLineHeightPercentage}
            />
          </SpaceBetween>

          <SpaceBetween>
            <Text $size="sm" $as="span">
              Peso
            </Text>
            <SwitchButtons
              $min={minFontWeightValue}
              $max={maxFontWeightValue}
              $now={nowFontWeightValue}
              $value={`${nowFontWeightValue}x`}
              $onDecrement={decrementFontWeight}
              $onIncrement={incrementFontWeight}
            />
          </SpaceBetween>

          <SpaceBetween>
            <Text $size="sm" $as="span">
              Resaltar Titulos
            </Text>
            <Switch
              name={highlightId.highlightTitles}
              onChange={togglHighlight}
              checked={isActiveHighlight(highlightId.highlightTitles)}
              aria-label="Resaltar Titulos"
              $enterabled
            />
          </SpaceBetween>

          <SpaceBetween>
            <Text $size="sm" $as="span">
              Resaltar Enlaces
            </Text>
            <Switch
              name={highlightId.highlightLinks}
              onChange={togglHighlight}
              checked={isActiveHighlight(highlightId.highlightLinks)}
              aria-label="Resaltar Enlaces"
              $enterabled
            />
          </SpaceBetween>

          <Divider />

          <Heading $as="h3" $size="md">
            Filtros de Color
          </Heading>

          <SpaceBetween>
            <Text $size="sm" $as="span">
              Brillo
            </Text>
            <Slider
              name={actions.brightness}
              onChange={onChangeColorFilter}
              min={50}
              max={150}
              step={1}
              value={filters.brightness}
            />
          </SpaceBetween>

          <SpaceBetween>
            <Text $size="sm" $as="span">
              Contraste
            </Text>
            <Slider
              name={actions.contrast}
              onChange={onChangeColorFilter}
              min={20}
              max={180}
              step={1}
              value={filters.contrast}
            />
          </SpaceBetween>

          <SpaceBetween>
            <Text $size="sm" $as="span">
              Saturacion
            </Text>
            <Slider
              name={actions.saturate}
              onChange={onChangeColorFilter}
              min={20}
              max={180}
              step={1}
              value={filters.saturate}
            />
          </SpaceBetween>

          <SpaceBetween>
            <Text $size="sm" $as="span">
              Calor
            </Text>
            <Slider
              name={actions.sepia}
              onChange={onChangeColorFilter}
              min={0}
              max={100}
              step={1}
              value={filters.sepia}
            />
          </SpaceBetween>

          <SpaceBetween>
            <Text $size="sm" $as="span">
              Tonalidad
            </Text>
            <Slider
              name={actions.hue}
              onChange={onChangeColorFilter}
              min={0}
              max={360}
              step={1}
              value={filters.hue}
            />
          </SpaceBetween>

          <ButtonGroup>
            <Button
              type="button"
              name={actions.reset}
              onClick={onResetColorFilter}
            >
              Restablecer
            </Button>
            <Button
              type="button"
              name={actions.warm}
              onClick={onChangeCustomColorFilter}
            >
              Calido
            </Button>
            <Button
              type="button"
              name={actions.blue}
              onClick={onChangeCustomColorFilter}
            >
              Azul
            </Button>
            <Button
              type="button"
              name={actions.red}
              onClick={onChangeCustomColorFilter}
            >
              Rojo
            </Button>
            <Button
              type="button"
              name={actions.green}
              onClick={onChangeCustomColorFilter}
            >
              Verde
            </Button>
            <Button
              type="button"
              name={actions.monochrome}
              onClick={onChangeCustomColorFilter}
            >
              Monocromatico
            </Button>
          </ButtonGroup>

          <Divider />

          <Heading $as="h3" $size="md">
            Herramientas
          </Heading>

          <SpaceBetween>
            <Text $size="sm" $as="span">
              Resaltar cursor
            </Text>
            <Switch
              name={highlightId.highlightCursor}
              onChange={togglHighlight}
              checked={isActiveHighlight(highlightId.highlightCursor)}
              aria-label="Resaltar cursor"
              $enterabled
            />
          </SpaceBetween>

        </MenuBody>
      </Menu>
    </section>
  );
});
