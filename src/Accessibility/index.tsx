import { useCallback, memo } from 'react';

import { GLOBALS } from '@/constants/Globals';
import { ACCESSIBILITY_CLASS_NAMES_KEYS, ACCESSIBILITY_CLASS_NAMES } from '@/constants/AccessibilityClassNames';

import AccessibilityButton from '@/components/AccessibilityButton';
import Menu from '@/components/Menu';
import MenuHeader from '@/components/MenuHeader';
import MenuBody from '@/components/MenuBody';
import Card from '@/components/Card';
import AutoGrid from '@/components/AutoGrid';
import TitleWithIcon from '@/components/TitleWithIcon';
import MenuButton from '@/components/MenuButton';
import AdjustButton from '@/components/AdjustButton';

import FontIcon from '@/assets/font-svgrepo-com.svg?react';
import FontSizeIcon from '@/assets/font-size-svgrepo-com.svg?react';
import TitleIcon from '@/assets/title-svgrepo-com.svg?react';
import LinkIcon from '@/assets/link-svgrepo-com.svg?react';
import LetterSpacingIcon from '@/assets/letter-spacing-svgrepo-com.svg?react';
import LineHeightIcon from '@/assets/line-height-svgrepo-com.svg?react';
import BoldIcon from '@/assets/bold-svgrepo-com.svg?react';
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

const OPEN_MENU_ID =  'open-menu-button';
const MODAL_ID =  'open-menu-button';
const MODAL_TITLE_ID =  'menu-title';

const Accessibility = () => {
  const { isOpen, open, close } = useOpen();

  const {
    min: minFontSizeValue,
    max: maxFontSizeValue,
    now: nowFontSizeValue,
    decrement: decrementFontSizePercentage,
    increment: incrementFontSizePercentage,
    reset: resetFontSize
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
    resetHighlights
  } = useHighlights();

  const {
    toggleColorFilter,
    isActiveColorFilter,
    resetColorFilter
  } = useColorFilter();

  const reset = useCallback(() => {
    resetFontSize();
    resetLetterSpacing();
    resetLineHeight();
    resetFontWeight();
    resetHighlights();
    resetColorFilter();
  }, [resetFontSize, resetLetterSpacing, resetLineHeight, resetFontWeight, resetHighlights, resetColorFilter]);

  if(!isOpen) {
    return (
      <section id={GLOBALS.ACCESSIBILITY_ID} className="Accessibility__root">
        <AccessibilityButton
          id={OPEN_MENU_ID}
          title="Open Accessibility Menu"
          aria-label="Open Accessibility Menu"
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
    <section id={GLOBALS.ACCESSIBILITY_ID} className="Accessibility__root">
      <Menu
        $isOpen={isOpen}
        id={MODAL_ID}
        aria-labelledby={MODAL_TITLE_ID}
      >
        <MenuHeader
          $title="Accessibility Menu"
          $onClose={close}
          $onReset={reset}
          $titleId={MODAL_TITLE_ID}
          aria-label="header"
        />
        <MenuBody aria-label="body">
          <Card>
            <TitleWithIcon $as="h5">
              <FontIcon />
              Text Adjustments
            </TitleWithIcon>
          </Card>

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
              <FontSizeIcon width={24} height={24} />
              Text Size
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
              <LetterSpacingIcon width={24} height={24} />
              Text Space
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
              <LineHeightIcon width={24} height={24} />
              Text Height
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
              <BoldIcon width={24} height={24} />
              Text Weight
            </AdjustButton>
          </AutoGrid>

          <Card>
            <TitleWithIcon $as="h5">
              <UnderLineIcon />
              Highlights
            </TitleWithIcon>
          </Card>

          <AutoGrid $gap="0.5em" $placeContent="center" $columnWidth="8em">
            <MenuButton
              name={ACCESSIBILITY_CLASS_NAMES_KEYS.highlightTitles}
              $active={isActiveHighlight(ACCESSIBILITY_CLASS_NAMES.highlightTitles)}
              onClick={togglHighlight}
            >
              <TitleIcon />
              Highlight Title
            </MenuButton>

            <MenuButton
              name={ACCESSIBILITY_CLASS_NAMES_KEYS.highlightLinks}
              $active={isActiveHighlight(ACCESSIBILITY_CLASS_NAMES.highlightLinks)}
              onClick={togglHighlight}
            >
              <LinkIcon />
              Highlight Links
            </MenuButton>

            <MenuButton
              name={ACCESSIBILITY_CLASS_NAMES_KEYS.highlightCursor}
              $active={isActiveHighlight(ACCESSIBILITY_CLASS_NAMES.highlightCursor)}
              onClick={togglHighlight}
            >
              <CursorIcon />
              Highlight Cursor
            </MenuButton>
          </AutoGrid>

          <Card>
            <TitleWithIcon $as="h5">
              <ColorFilterIcon />
              Color Filters
            </TitleWithIcon>
          </Card>

          <AutoGrid $gap="0.5em" $placeContent="center" $columnWidth="9em">
            <MenuButton
              name={ACCESSIBILITY_CLASS_NAMES_KEYS.hightContrast}
              $active={isActiveColorFilter(ACCESSIBILITY_CLASS_NAMES.hightContrast)}
              onClick={toggleColorFilter}
            >
              <ContrastIcon />
              High Contrast
            </MenuButton>
            <MenuButton
              name={ACCESSIBILITY_CLASS_NAMES_KEYS.hightSaturation}
              $active={isActiveColorFilter(ACCESSIBILITY_CLASS_NAMES.hightSaturation)}
              onClick={toggleColorFilter}
            >
              <SunIcon />
              High Saturation
            </MenuButton>
            <MenuButton
              name={ACCESSIBILITY_CLASS_NAMES_KEYS.invertColors}
              $active={isActiveColorFilter(ACCESSIBILITY_CLASS_NAMES.invertColors)}
              onClick={toggleColorFilter}
            >
              <InvertColorsIcon />
              Invert Colors
            </MenuButton>
            <MenuButton
              name={ACCESSIBILITY_CLASS_NAMES_KEYS.protanopia}
              $active={isActiveColorFilter(ACCESSIBILITY_CLASS_NAMES.protanopia)}
              onClick={toggleColorFilter}
            >
              <RedSquareIcon />
              Protanopia
            </MenuButton>
            <MenuButton
              name={ACCESSIBILITY_CLASS_NAMES_KEYS.deuteranopia}
              $active={isActiveColorFilter(ACCESSIBILITY_CLASS_NAMES.deuteranopia)}
              onClick={toggleColorFilter}
            >
              <GreenSquareIcon />
              Deuteranopia
            </MenuButton>
            <MenuButton
              name={ACCESSIBILITY_CLASS_NAMES_KEYS.tritanopia}
              $active={isActiveColorFilter(ACCESSIBILITY_CLASS_NAMES.tritanopia)}
              onClick={toggleColorFilter}
            >
              <BlueSquareIcon />
              Tritanopia
            </MenuButton>
            <MenuButton
              name={ACCESSIBILITY_CLASS_NAMES_KEYS.achromatopsia}
              $active={isActiveColorFilter(ACCESSIBILITY_CLASS_NAMES.achromatopsia)}
              onClick={toggleColorFilter}
            >
              <PieChartTwotone50Icon />
              Achromatopsia
            </MenuButton>
            <MenuButton
              name={ACCESSIBILITY_CLASS_NAMES_KEYS.achromatomaly}
              $active={isActiveColorFilter(ACCESSIBILITY_CLASS_NAMES.achromatomaly)}
              onClick={toggleColorFilter}
            >
              <PieChartTwotone25Icon />
              Achromatomaly
            </MenuButton>
          </AutoGrid>
        </MenuBody>
      </Menu>
    </section>
  );
};

export default memo(Accessibility);
