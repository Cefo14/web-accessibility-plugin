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
import { useTranslate } from '@/hooks/useTranslate';

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
    id: filterId,
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

  return (
    <section
      id={GLOBALS.ACCESSIBILITY_ID}
      className={clsx('Accessibility__root', className)}
      {...props}
    >
      <OpenMenuButton
        id={OPEN_MENU_ID}
        title={t('OPEN_MENU')}
        aria-label={t('OPEN_MENU')}
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
          $title={t('TITLE')}
          $onClose={close}
          $onReset={reset}
          $titleId={MENU_TITLE_ID}
          aria-label="header"
        />
        <MenuBody aria-label="body">

          <Heading $as="h2" $size="md">
            {t('TEXT_ADJUSTMENTS')}
          </Heading>

          <SpaceBetween>
            <Text $size="sm" $as="span">
              {t('TEXT_SIZE')}
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
              {t('TEXT_SPACE')}
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
              {t('TEXT_HEIGHT')}
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
              {t('TEXT_WEIGHT')}
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

          <Divider />

          <Heading $as="h2" $size="md">
            {t('HIGHLIGHTS')}
          </Heading>

          <SpaceBetween>
            <Text $size="sm" $as="span">
              {t('HIGHLIGHT_TITLES')}
            </Text>
            <Switch
              name={highlightId.highlightTitles}
              onChange={togglHighlight}
              checked={isActiveHighlight(highlightId.highlightTitles)}
              aria-label={t('HIGHLIGHT_TITLES')}
              $enterabled
            />
          </SpaceBetween>

          <SpaceBetween>
            <Text $size="sm" $as="span">
              {t('HIGHLIGHT_LINKS')}
            </Text>
            <Switch
              name={highlightId.highlightLinks}
              onChange={togglHighlight}
              checked={isActiveHighlight(highlightId.highlightLinks)}
              aria-label={t('HIGHLIGHT_LINKS')}
              $enterabled
            />
          </SpaceBetween>

          <SpaceBetween>
            <Text $size="sm" $as="span">
              {t('HIGHLIGHT_CURSOR')}
            </Text>
            <Switch
              name={highlightId.highlightCursor}
              onChange={togglHighlight}
              checked={isActiveHighlight(highlightId.highlightCursor)}
              aria-label={t('HIGHLIGHT_CURSOR')}
              $enterabled
            />
          </SpaceBetween>

          <Divider />

          <Heading $as="h2" $size="md">
            {t('COLOR_FILTERS')}
          </Heading>

          <SpaceBetween>
            <Text $size="sm" $as="span">
              {t('HIGH_CONTRAST')}
            </Text>
            <Switch
              name={filterId.hightContrast}
              onChange={toggleColorFilter}
              checked={isActiveColorFilter(filterId.hightContrast)}
              aria-label={t('HIGH_CONTRAST')}
              $enterabled
            />
          </SpaceBetween>

          <SpaceBetween>
            <Text $size="sm" $as="span">
              {t('HIGH_SATURATION')}
            </Text>
            <Switch
              name={filterId.hightSaturation}
              onChange={toggleColorFilter}
              checked={isActiveColorFilter(filterId.hightSaturation)}
              aria-label={t('HIGH_SATURATION')}
              $enterabled
            />
          </SpaceBetween>

          <SpaceBetween>
            <Text $size="sm" $as="span">
              {t('INVERT_COLORS')}
            </Text>
            <Switch
              name={filterId.invertColors}
              onChange={toggleColorFilter}
              checked={isActiveColorFilter(filterId.invertColors)}
              aria-label={t('INVERT_COLORS')}
              $enterabled
            />
          </SpaceBetween>

          <SpaceBetween>
            <Text $size="sm" $as="span">
              {/* {t('RED')} */}
              Filtro Rojo
            </Text>
            <Switch
              name={filterId.red}
              onChange={toggleColorFilter}
              checked={isActiveColorFilter(filterId.red)}
              aria-label="TODO"
              $enterabled
            />
          </SpaceBetween>

          <SpaceBetween>
            <Text $size="sm" $as="span">
              {/* {t('GREEN')} */}
              Filtro Verde
            </Text>
            <Switch
              name={filterId.green}
              onChange={toggleColorFilter}
              checked={isActiveColorFilter(filterId.green)}
              aria-label="TODO"
              $enterabled
            />
          </SpaceBetween>

          <SpaceBetween>
            <Text $size="sm" $as="span">
              {/* {t('BLUE')} */}
              Filtro Azul
            </Text>
            <Switch
              name={filterId.blue}
              onChange={toggleColorFilter}
              checked={isActiveColorFilter(filterId.blue)}
              aria-label="TODO"
              $enterabled
            />
          </SpaceBetween>
        </MenuBody>
      </Menu>
    </section>
  );
});
