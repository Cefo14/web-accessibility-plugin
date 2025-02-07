import { useCallback, memo, useMemo } from 'react';
import clsx from 'clsx';

import { type ElementProps } from '@/types/ElementProps';
import type { ChangeEventInput, ChangeEventSelect } from '@/types/ChangeEvent';
import type { MouseEventButton } from '@/types/MouseEvent';

import { GLOBALS } from '@/constants/Globals';

import OpenMenuButton from '@/components/OpenMenuButton';
import Menu from '@/components/Menu';
import MenuHeader from '@/components/MenuHeader';
import MenuBody from '@/components/MenuBody';
// import AutoGrid from '@/components/AutoGrid';
// import TitleSection from '@/components/TitleSection';
// import MenuButton from '@/components/MenuButton';
// import AdjustButton from '@/components/AdjustButton';

// import Heading from '@/components/Heading';
// import SwitchButtons from '@/components/SwitchButtons';
// import Text from '@/components/Text';
// import SpaceBetween from '@/components/SpaceBetween';
// import Switch from '@/components/Switch';
import Divider from '@/components/Divider';
// import Slider from '@/components/Slider';
// import Button from '@/components/Button';
// import AutoGrid from '@/components/AutoGrid';
// import Select from '@/components/Select';
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
import FontSection from './FontSection';
import ColorFilterSection from './ColorFilterSection';
import ToolsSection from './ToolsSection';
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
    safeFontFamilies,
    fontSizeStep,
    fontWeightStep,
    letterSpacingStep,
    lineHeightStep,
    fontFamilySelected,
    incrementFontProp,
    decrementFontProp,
    changeFontFamily,
    resetAdjustFont,
  } = useAdjustFont();

  const {
    colorFilters,
    colorfiltersState,
    setColorFilter,
    selectCustomColorFilter,
    resetColorFilter,
  } = useColorFilter();

  const {
    tools,
    toggleTool,
    isToolActive,
    resetTools,
  } = useTools();

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

  const fontOptions = useMemo(() => (
    [{ value: '', label: '-' }].concat(safeFontFamilies.map((fontFamily) => ({
      value: fontFamily,
      label: fontFamily.replace(/'/g, ''),
    })))
  ), [safeFontFamilies]);

  const onIncrementFontProp = useCallback((event: MouseEventButton) => {
    const { name, value } = event.currentTarget;
    incrementFontProp(name, Number(value));
  }, [incrementFontProp]);

  const onDecrementFontProp = useCallback((event: MouseEventButton) => {
    const { name, value } = event.currentTarget;
    decrementFontProp(name, Number(value));
  }, [decrementFontProp]);

  const onChangeFontFamily = useCallback((event: ChangeEventSelect) => {
    changeFontFamily(event.target.value);
  }, [changeFontFamily]);

  const onChangeColorFilter = useCallback((event: ChangeEventInput) => {
    const { name, value } = event.currentTarget;
    setColorFilter(name, value);
  }, [setColorFilter]);

  const onSelectCustomColorFilter = useCallback((event: MouseEventButton) => {
    const { name } = event.currentTarget;
    selectCustomColorFilter(name);
  }, [selectCustomColorFilter]);

  const onToggleTool = useCallback((event: ChangeEventInput) => {
    const { name } = event.currentTarget;
    toggleTool(name);
  }, [toggleTool]);

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
          <FontSection
            fontProps={fontProps}
            fontOptions={fontOptions}
            fontSizeStep={fontSizeStep}
            fontWeightStep={fontWeightStep}
            letterSpacingStep={letterSpacingStep}
            lineHeightStep={lineHeightStep}
            fontFamilySelected={fontFamilySelected}
            onIncrementFontProp={onIncrementFontProp}
            onDecrementFontProp={onDecrementFontProp}
            onChangeFontFamily={onChangeFontFamily}
          />

          <Divider />

          <ColorFilterSection
            filters={colorFilters}
            filtersState={colorfiltersState}
            onChangeColorFilter={onChangeColorFilter}
            onSelectCustomColorFilter={onSelectCustomColorFilter}
            resetColorFilter={resetColorFilter}
          />

          <Divider />

          <ToolsSection
            tools={tools}
            onToggleTool={onToggleTool}
            isToolActive={isToolActive}
          />
        </MenuBody>
      </Menu>
    </section>
  );
});
