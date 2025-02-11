import { useCallback, memo, useMemo } from 'react';
import clsx from 'clsx';

import type { ElementProps } from '@/types/ElementProps';
import type { ChangeEventInput, ChangeEventSelect } from '@/types/ChangeEvent';
import type { MouseEventButton } from '@/types/MouseEvent';

import { GLOBALS } from '@/constants/Globals';

import OpenMenuButton from '@/components/OpenMenuButton';
import Menu from '@/components/Menu';
import MenuHeader from '@/components/MenuHeader';
import MenuBody from '@/components/MenuBody';
import Divider from '@/components/Divider';

import { useOpen } from '@/hooks/useOpen';
import { useColorFilter } from '@/hooks/useColorFilter';
import { useTools } from '@/hooks/useTools';
import { useAdjustFont } from '@/hooks/useAdjustFont';
import { useTranslate } from '@/hooks/useTranslate';

import FontSection from './FontSection';
import ColorFilterSection from './ColorFilterSection';
import ToolsSection from './ToolsSection';

import Heading from '@/components/Heading';
import Select from '@/components/Select';
import SpaceBetween from '@/components/SpaceBetween';

import { LanguageCodeTranslations } from '@/i18n';

type WebAccessibilityPluginProps = Omit<ElementProps, 'children'>;

const OPEN_MENU_ID = 'open-menu-button';
// const MENU_ID = 'open-menu-button';
const MENU_TITLE_ID = 'menu-title';

const WebAccessibilityPlugin = ({
  className,
  ...props
}: WebAccessibilityPluginProps) => {
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

  const {
    language,
    t,
    changeLanguage,
    resetLanguage,
  } = useTranslate();

  const onReset = useCallback(() => {
    resetTools();
    resetColorFilter();
    resetAdjustFont();
    resetLanguage();
  }, [
    resetTools,
    resetColorFilter,
    resetAdjustFont,
    resetLanguage,
  ]);

  const fontOptions = useMemo(() => (
    [{ value: '', label: '-' }].concat(safeFontFamilies.map((fontFamily) => ({
      value: fontFamily,
      label: fontFamily.replace(/'/g, ''),
    })))
  ), [safeFontFamilies]);

  const languageOptions = useMemo(() => (
    Object.entries(LanguageCodeTranslations).map(([value, label]) => ({
      value,
      label,
    }))
  ), []);

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

  const onChangeLanguage = useCallback((event: ChangeEventSelect) => {
    const { value } = event.target;
    changeLanguage(value);
  }, [changeLanguage]);

  return (
    <section
      id={GLOBALS.WAP_ID}
      className={clsx('WAP__root', className)}
      {...props}
    >
      <OpenMenuButton
        id={OPEN_MENU_ID}
        onClick={open}
      />
      <Menu
        $isOpen={isOpen}
        aria-labelledby={MENU_TITLE_ID}
        aria-modal="true"
        role="dialog"
      >
        <MenuHeader
          $onClose={close}
          $onReset={onReset}
          $titleId={MENU_TITLE_ID}
        />
        <MenuBody>
          <SpaceBetween>
            <Heading $size="sm" $as="h3">
              {t('menu.title')}
            </Heading>
            <Select
              $options={languageOptions}
              onChange={onChangeLanguage}
              value={language}
            />
          </SpaceBetween>
          <Divider />
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
};

export default memo(WebAccessibilityPlugin);
