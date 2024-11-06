/* eslint-disable jsx-a11y/aria-props */ // TODO: fix this

import { useCallback, memo } from 'react';
import clsx from 'clsx';

import { type ElementProps } from '@/types/ElementProps';

import { GLOBALS } from '@/constants/Globals';
import { ACCESSIBILITY_CLASS_NAMES_KEYS, ACCESSIBILITY_CLASS_NAMES } from '@/constants/AccessibilityClassNames';

import AccessibilityButton from '@/components/AccessibilityButton';
import Menu from '@/components/Menu';
import MenuHeader from '@/components/MenuHeader';
import MenuBody from '@/components/MenuBody';
import AutoGrid from '@/components/AutoGrid';
import TitleSection from '@/components/TitleSection';
import MenuButton from '@/components/MenuButton';
import AdjustButton from '@/components/AdjustButton';

import FontIcon from '@/assets/font-svgrepo-com.svg?react';
import TitleIcon from '@/assets/title-svgrepo-com.svg?react';
import LinkIcon from '@/assets/link-svgrepo-com.svg?react';
import ColorFilterIcon from '@/assets/color-filter-svgrepo-com.svg?react';
import ContrastIcon from '@/assets/contrast-svgrepo-com.svg?react';
import SunIcon from '@/assets/sun-svgrepo-com.svg?react';
import InvertColorsIcon from '@/assets/invert-color-svgrepo-com.svg?react';
import RedSquareIcon from '@/assets/red-square-svgrepo-com.svg?react';
import GreenSquareIcon from '@/assets/green-square-svgrepo-com.svg?react';
import BlueSquareIcon from '@/assets/blue-square-svgrepo-com.svg?react';
import PieChartTwotone50Icon from '@/assets/pie-chart-twotone-50-svgrepo-com.svg?react';
import PieChartTwotone25Icon from '@/assets/pie-chart-twotone-25-svgrepo-com.svg?react';
import CursorIcon from '@/assets/cursor-svgrepo-com.svg?react';
import UnderLineIcon from '@/assets/underline-svgrepo-com.svg?react';

import { useOpen } from '@/hooks/useOpen';
import { useModifyFontSize } from '@/hooks/useModifyFontSize';
import { useHighlights } from '@/hooks/useHighlights';
import { useColorFilter } from '@/hooks/useColorFilter';
import { useModifyLetterSpacing } from '@/hooks/useModifyLetterSpacing';
import { useModifyLineHeight } from '@/hooks/useModifyLineHeight';
import { useModifyFontWeight } from '@/hooks/useModifyFontWeight';
import { useTranslate } from '@/hooks/useTranslate';

type ReactWebAccessibilityPluginProps = Omit<ElementProps, 'children'>;

const OPEN_MENU_ID = 'open-menu-button';
const MODAL_ID = 'open-menu-button';
const MODAL_TITLE_ID = 'menu-title';

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
    togglHighlight,
    isActiveHighlight,
    resetHighlights,
  } = useHighlights();

  const {
    toggleColorFilter,
    isActiveColorFilter,
    resetColorFilter,
  } = useColorFilter();

  const reset = useCallback(() => {
    resetFontSize();
    resetLetterSpacing();
    resetLineHeight();
    resetFontWeight();
    resetHighlights();
    resetColorFilter();
  }, [
    resetFontSize,
    resetLetterSpacing,
    resetLineHeight,
    resetFontWeight,
    resetHighlights,
    resetColorFilter,
  ]);

  const {
    t,
  } = useTranslate();

  if (!isOpen) {
    return (
      <section
        id={GLOBALS.ACCESSIBILITY_ID}
        className={clsx('Accessibility__root', className)}
        {...props}
      >
        <AccessibilityButton
          id={OPEN_MENU_ID}
          title={t('OPEN_MENU')}
          aria-label={t('OPEN_MENU')}
          aria-controls={MODAL_ID}
          aria-hidden={isOpen}
          aria-expanded={isOpen}
          aria-haspopup="menu"
          onClick={open}
        />
      </section>
    );
  }

  return (
    <section
      id={GLOBALS.ACCESSIBILITY_ID}
      className={clsx('Accessibility__root', className)}
      {...props}
    >
      <Menu
        $isOpen={isOpen}
        id={MODAL_ID}
        aria-labelledby={MODAL_TITLE_ID}
      >
        <MenuHeader
          $title={t('TITLE')}
          $onClose={close}
          $onReset={reset}
          $titleId={MODAL_TITLE_ID}
          aria-label="header"
        />
        <MenuBody aria-label="body">
          <TitleSection $as="h5">
            <FontIcon />
            {t('TEXT_ADJUSTMENTS')}
          </TitleSection>

          <AutoGrid $gap="0.5em" $placeContent="center" $columnWidth="10em">
            <AdjustButton
              $min={minFontSizeValue}
              $max={maxFontSizeValue}
              $now={nowFontSizeValue}
              $value={`${nowFontSizeValue}x`}
              $id="font-size"
              $onDecrement={decrementFontSizePercentage}
              $onIncrement={incrementFontSizePercentage}
              aria-description="Adjust the text size."
            >
              {t('TEXT_SIZE')}
            </AdjustButton>

            <AdjustButton
              $min={minLetterSpacingValue}
              $max={maxLetterSpacingValue}
              $now={nowLetterSpacingValue}
              $value={`${nowLetterSpacingValue}x`}
              $id="letter-spacing"
              $onDecrement={decrementLetterSpacing}
              $onIncrement={incrementLetterSpacing}
              aria-description="Adjust the letter spacing."
            >
              {t('TEXT_SPACE')}
            </AdjustButton>

            <AdjustButton
              $min={minLineHeightValue}
              $max={maxLineHeightValue}
              $now={nowLineHeightValue}
              $value={`${nowLineHeightValue}x`}
              $id="text-height"
              $onDecrement={decrementLineHeightPercentage}
              $onIncrement={incrementLineHeightPercentage}
              aria-description="Adjust the line height."
            >
              {t('TEXT_HEIGHT')}
            </AdjustButton>

            <AdjustButton
              $min={minFontWeightValue}
              $max={maxFontWeightValue}
              $now={nowFontWeightValue}
              $value={`${nowFontWeightValue}x`}
              $id="text-weight"
              $onDecrement={decrementFontWeight}
              $onIncrement={incrementFontWeight}
              aria-description="Adjust the text weight."
            >
              {t('TEXT_WEIGHT')}
            </AdjustButton>
          </AutoGrid>

          <TitleSection $as="h5">
            <UnderLineIcon />
            {t('HIGHLIGHTS')}
          </TitleSection>

          <AutoGrid $gap="0.5em" $placeContent="center" $columnWidth="8em">
            <MenuButton
              name={ACCESSIBILITY_CLASS_NAMES_KEYS.highlightTitles}
              $active={isActiveHighlight(ACCESSIBILITY_CLASS_NAMES.highlightTitles)}
              onClick={togglHighlight}
            >
              <TitleIcon />
              {t('HIGHLIGHT_TITLES')}
            </MenuButton>

            <MenuButton
              name={ACCESSIBILITY_CLASS_NAMES_KEYS.highlightLinks}
              $active={isActiveHighlight(ACCESSIBILITY_CLASS_NAMES.highlightLinks)}
              onClick={togglHighlight}
            >
              <LinkIcon />
              {t('HIGHLIGHT_LINKS')}
            </MenuButton>

            <MenuButton
              name={ACCESSIBILITY_CLASS_NAMES_KEYS.highlightCursor}
              $active={isActiveHighlight(ACCESSIBILITY_CLASS_NAMES.highlightCursor)}
              onClick={togglHighlight}
            >
              <CursorIcon />
              {t('HIGHLIGHT_CURSOR')}
            </MenuButton>
          </AutoGrid>

          <TitleSection $as="h5">
            <ColorFilterIcon />
            {t('COLOR_FILTERS')}
          </TitleSection>

          <AutoGrid $gap="0.5em" $placeContent="center" $columnWidth="9em">
            <MenuButton
              name={ACCESSIBILITY_CLASS_NAMES_KEYS.hightContrast}
              $active={isActiveColorFilter(ACCESSIBILITY_CLASS_NAMES.hightContrast)}
              onClick={toggleColorFilter}
            >
              <ContrastIcon />
              {t('HIGH_CONTRAST')}
            </MenuButton>
            <MenuButton
              name={ACCESSIBILITY_CLASS_NAMES_KEYS.hightSaturation}
              $active={isActiveColorFilter(ACCESSIBILITY_CLASS_NAMES.hightSaturation)}
              onClick={toggleColorFilter}
            >
              <SunIcon />
              {t('HIGH_SATURATION')}
            </MenuButton>
            <MenuButton
              name={ACCESSIBILITY_CLASS_NAMES_KEYS.invertColors}
              $active={isActiveColorFilter(ACCESSIBILITY_CLASS_NAMES.invertColors)}
              onClick={toggleColorFilter}
            >
              <InvertColorsIcon />
              {t('INVERT_COLORS')}
            </MenuButton>
            <MenuButton
              name={ACCESSIBILITY_CLASS_NAMES_KEYS.protanopia}
              $active={isActiveColorFilter(ACCESSIBILITY_CLASS_NAMES.protanopia)}
              onClick={toggleColorFilter}
            >
              <RedSquareIcon />
              {t('PROTANOPIA')}
            </MenuButton>
            <MenuButton
              name={ACCESSIBILITY_CLASS_NAMES_KEYS.deuteranopia}
              $active={isActiveColorFilter(ACCESSIBILITY_CLASS_NAMES.deuteranopia)}
              onClick={toggleColorFilter}
            >
              <GreenSquareIcon />
              {t('DEUTERANOPIA')}
            </MenuButton>
            <MenuButton
              name={ACCESSIBILITY_CLASS_NAMES_KEYS.tritanopia}
              $active={isActiveColorFilter(ACCESSIBILITY_CLASS_NAMES.tritanopia)}
              onClick={toggleColorFilter}
            >
              <BlueSquareIcon />
              {t('TRITANOPIA')}
            </MenuButton>
            <MenuButton
              name={ACCESSIBILITY_CLASS_NAMES_KEYS.achromatopsia}
              $active={isActiveColorFilter(ACCESSIBILITY_CLASS_NAMES.achromatopsia)}
              onClick={toggleColorFilter}
            >
              <PieChartTwotone50Icon />
              {t('ACHROMATOPSIA')}
            </MenuButton>
            <MenuButton
              name={ACCESSIBILITY_CLASS_NAMES_KEYS.achromatomaly}
              $active={isActiveColorFilter(ACCESSIBILITY_CLASS_NAMES.achromatomaly)}
              onClick={toggleColorFilter}
            >
              <PieChartTwotone25Icon />
              {t('ACHROMATOMALY')}
            </MenuButton>
          </AutoGrid>
        </MenuBody>
      </Menu>
    </section>
  );
});
