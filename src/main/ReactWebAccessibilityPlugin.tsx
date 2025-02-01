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
import AutoGrid from '@/components/AutoGrid';
import Select from '@/components/Select';
// import ButtonGroup from '@/components/ButtonGroup';

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
// import { useModifyFontSize } from '@/hooks/useModifyFontSize';
import { useColorFilter } from '@/hooks/useColorFilter';
// import { useModifyLetterSpacing } from '@/hooks/useModifyLetterSpacing';
// import { useModifyLineHeight } from '@/hooks/useModifyLineHeight';
// import { useModifyFontWeight } from '@/hooks/useModifyFontWeight';
import { useTools } from '@/hooks/useTools';
import { useAdjustFont } from '@/hooks/useAdjustFont';
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
    fontProps,
    incrementFontProp,
    decrementFontProp,
    fontSizeStep,
    fontWeightStep,
    letterSpacingStep,
    lineHeightStep,
    resetAdjustFont,
  } = useAdjustFont();

  const {
    toolNames,
    toggleTool,
    isToolActive,
    resetTools,
  } = useTools();

  const {
    actions,
    filters,
    resetColorFilter,
    changeColorFilter,
    toggleCustomColorFilter,
    isCustomFilterActive,
  } = useColorFilter();

  const reset = useCallback(() => {
    resetTools();
    resetColorFilter();
    resetAdjustFont();
  }, [
    resetTools,
    resetColorFilter,
    resetAdjustFont,
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
              $min={-10}
              $max={10}
              $now={fontSizeStep}
              $value={`${fontSizeStep}x`}
              $onDecrement={decrementFontProp}
              $onIncrement={incrementFontProp}
              $name={fontProps.size}
            />
          </SpaceBetween>

          <SpaceBetween>
            <Text $size="sm" $as="span">
              Espaciado
            </Text>
            <SwitchButtons
              $min={-10}
              $max={10}
              $now={letterSpacingStep}
              $value={`${letterSpacingStep}x`}
              $onDecrement={decrementFontProp}
              $onIncrement={incrementFontProp}
              $name={fontProps.letterSpacing}
            />
          </SpaceBetween>

          <SpaceBetween>
            <Text $size="sm" $as="span">
              Altura
            </Text>
            <SwitchButtons
              $min={-10}
              $max={10}
              $now={lineHeightStep}
              $value={`${lineHeightStep}x`}
              $onDecrement={decrementFontProp}
              $onIncrement={incrementFontProp}
              $name={fontProps.lineHeight}
            />
          </SpaceBetween>

          <SpaceBetween>
            <Text $size="sm" $as="span">
              Peso
            </Text>
            <SwitchButtons
              $min={-10}
              $max={10}
              $now={fontWeightStep}
              $value={`${fontWeightStep}x`}
              $onDecrement={decrementFontProp}
              $onIncrement={incrementFontProp}
              $name={fontProps.weight}
            />
          </SpaceBetween>

          <SpaceBetween>
            <Text $size="sm" $as="span">
              Fuente
            </Text>
            <Select
              $options={[{
                value: 'Arial',
                label: 'Arial',
              }]}
              $value=""
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
              onChange={changeColorFilter}
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
              onChange={changeColorFilter}
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
              onChange={changeColorFilter}
              min={20}
              max={180}
              step={1}
              value={filters.saturate}
            />
          </SpaceBetween>

          <SpaceBetween>
            <Text $size="sm" $as="span">
              Sepia
            </Text>
            <Slider
              name={actions.sepia}
              onChange={changeColorFilter}
              min={0}
              max={100}
              step={1}
              value={filters.sepia}
            />
          </SpaceBetween>

          <SpaceBetween>
            <Text $size="sm" $as="span">
              HUE
            </Text>
            <Slider
              name={actions.hue}
              onChange={changeColorFilter}
              min={0}
              max={360}
              step={1}
              value={filters.hue}
            />
          </SpaceBetween>

          <AutoGrid $gap="0.5em" $columnWidth="6em" $rows={2} $rowWidth="2rem">
            <Button
              type="button"
              name={actions.warm}
              onClick={toggleCustomColorFilter}
              $variant={isCustomFilterActive(actions.warm) ? 'secondary' : undefined}
            >
              Calido
            </Button>
            <Button
              type="button"
              name={actions.blue}
              onClick={toggleCustomColorFilter}
              $variant={isCustomFilterActive(actions.blue) ? 'secondary' : undefined}
            >
              Azul
            </Button>
            <Button
              type="button"
              name={actions.red}
              onClick={toggleCustomColorFilter}
              $variant={isCustomFilterActive(actions.red) ? 'secondary' : undefined}
            >
              Rojo
            </Button>
            <Button
              type="button"
              name={actions.green}
              onClick={toggleCustomColorFilter}
              $variant={isCustomFilterActive(actions.green) ? 'secondary' : undefined}
            >
              Verde
            </Button>
            <Button
              type="button"
              name={actions.monochrome}
              onClick={toggleCustomColorFilter}
              $variant={isCustomFilterActive(actions.monochrome) ? 'secondary' : undefined}
            >
              Monocromatico
            </Button>
            <Button
              type="button"
              name={actions.reset}
              onClick={resetColorFilter}
              $variant="warning"
            >
              Restablecer
            </Button>
          </AutoGrid>

          <Divider />

          <Heading $as="h3" $size="md">
            Herramientas
          </Heading>

          <SpaceBetween>
            <Text $size="sm" $as="span">
              Resaltar Titulos
            </Text>
            <Switch
              name={toolNames.highlightTitles}
              onChange={toggleTool}
              checked={isToolActive(toolNames.highlightTitles)}
              aria-label="Resaltar Titulos"
              $enterabled
            />
          </SpaceBetween>

          <SpaceBetween>
            <Text $size="sm" $as="span">
              Resaltar Enlaces
            </Text>
            <Switch
              name={toolNames.highlightLinks}
              onChange={toggleTool}
              checked={isToolActive(toolNames.highlightLinks)}
              aria-label="Resaltar Enlaces"
              $enterabled
            />
          </SpaceBetween>

          <SpaceBetween>
            <Text $size="sm" $as="span">
              Resaltar cursor
            </Text>
            <Switch
              name={toolNames.highlightCursor}
              onChange={toggleTool}
              checked={isToolActive(toolNames.highlightCursor)}
              aria-label="Resaltar cursor"
              $enterabled
            />
          </SpaceBetween>

          <SpaceBetween>
            <Text $size="sm" $as="span">
              Ocultar Imagenes
            </Text>
            <Switch
              name={toolNames.hideImages}
              onChange={toggleTool}
              checked={isToolActive(toolNames.hideImages)}
              aria-label="Resaltar cursor"
              $enterabled
            />
          </SpaceBetween>

        </MenuBody>
      </Menu>
    </section>
  );
});
