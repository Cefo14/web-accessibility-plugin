import { useCallback, memo } from 'react';
import clsx from 'clsx';

import type { ElementProps } from '@/types/ElementProps';
import type { ChangeEventInput, ChangeEventSelect } from '@/types/ChangeEvent';
import type { MouseEventButton } from '@/types/MouseEvent';

import { GLOBALS } from '@/constants/Globals';

import OpenMenuButton from '@/components/OpenMenuButton';
import Menu from '@/components/Menu';
import Divider from '@/components/Divider';
import Heading from '@/components/Heading';
import Select from '@/components/Select';
import SpaceBetween from '@/components/SpaceBetween';

import { useOpen } from '@/hooks/useOpen';
import { useColorFilter } from '@/hooks/useColorFilter';
import { useTools } from '@/hooks/useTools';
import { FONT_PROPS, useAdjustFont } from '@/hooks/useAdjustFont';

import { LanguageCodeTranslations, useI18n } from '@/i18n';

import FontSection from './FontSection';
import ColorFilterSection from './ColorFilterSection';
import ToolsSection from './ToolsSection';

type WebAccessibilityPluginProps = Omit<ElementProps, 'children'>;

const OPEN_MENU_ID = 'open-menu-button';
const MENU_TITLE_ID = 'menu-title';

const WebAccessibilityPlugin = ({
  className,
  ...props
}: WebAccessibilityPluginProps) => {
  const { isOpen, open, close } = useOpen();

  const {
    fontSizeValue,
    letterSpacingValue,
    lineHeightValue,
    fontFamilySelected,
    fontWeightSelected,
    incrementFontProp,
    decrementFontProp,
    changeFontFamily,
    changeFontweight,
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
  } = useI18n();

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

  const onIncrementFontProp = useCallback((event: MouseEventButton) => {
    const { name } = event.currentTarget;
    incrementFontProp(name);
  }, [incrementFontProp]);

  const onDecrementFontProp = useCallback((event: MouseEventButton) => {
    const { name } = event.currentTarget;
    decrementFontProp(name);
  }, [decrementFontProp]);

  const onChangeFontFamily = useCallback((event: ChangeEventSelect) => {
    changeFontFamily(event.target.value);
  }, [changeFontFamily]);

  const onChangeFontWeight = useCallback((event: ChangeEventSelect) => {
    changeFontweight(event.target.value);
  }, [changeFontweight]);

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
        <Menu.Header
          $onClose={close}
          $onReset={onReset}
          $titleId={MENU_TITLE_ID}
        />
        <Menu.Body>
          <section>
            <SpaceBetween>
              <Heading $size="md" $as="h3">
                {t('menu.language')}
              </Heading>
              <Select
                onChange={onChangeLanguage}
                value={language}
              >
                {
                  Object.entries(LanguageCodeTranslations).map(([key, value]) => (
                    <Select.Option key={key} value={key}>
                      {value}
                    </Select.Option>
                  ))
                }
              </Select>
            </SpaceBetween>
          </section>

          <Divider />

          <FontSection
            fontProps={FONT_PROPS}
            fontSizeStep={fontSizeValue}
            letterSpacingStep={letterSpacingValue}
            lineHeightStep={lineHeightValue}
            fontFamilySelected={fontFamilySelected}
            fontWeightSelected={fontWeightSelected}
            onIncrementFontProp={onIncrementFontProp}
            onDecrementFontProp={onDecrementFontProp}
            onChangeFontFamily={onChangeFontFamily}
            onChangeFontWeight={onChangeFontWeight}
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
        </Menu.Body>
      </Menu>
    </section>
  );
};

export default memo(WebAccessibilityPlugin);
