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
import MoonIcon from '@/assets/moon-svgrepo-com.svg?react';
import RedSquareIcon from '@/assets/red-square-svgrepo-com.svg?react';
import GreenSquareIcon from '@/assets/green-square-svgrepo-com.svg?react';
import BlueSquareIcon from '@/assets/blue-square-svgrepo-com.svg?react';
import PieChartTwotone50Icon from '@/assets/pie-chart-twotone-50-svgrepo-com.svg?react';
import PieChartTwotone25Icon from '@/assets/pie-chart-twotone-25-svgrepo-com.svg?react';

import { useOpen } from '@/hooks/useOpen';
import { useModifyFontSize } from '@/hooks/useModifyFontSize';
import { useFont } from '@/hooks/useFont';
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
    toggleFontClassName,
    hasActiveFontClassName,
    resetFontClassNames
  } = useFont();

  const {
    fontSizePercentage,
    decrementFontSizePercentage,
    incrementFontSizePercentage,
    resetFontSize
  } = useModifyFontSize();

  const {
    letterSpacing,
    decrementLetterSpacing,
    incrementLetterSpacing,
    resetLetterSpacing,
  } = useModifyLetterSpacing();

  const {
    lineHeightPercentage,
    decrementLineHeightPercentage,
    incrementLineHeightPercentage,
    resetLineHeight,
  } = useModifyLineHeight();

  const {
    fontWeight,
    decrementFontWeight,
    incrementFontWeight,
    resetFontWeight,
  } = useModifyFontWeight();

  const {
    toggleColorFilter,
    isActiveColorFilter,
    resetColorFilter
  } = useColorFilter();

  const reset = useCallback(() => {
    resetFontSize();
    resetFontClassNames();
    resetColorFilter();
    resetLetterSpacing();
    resetLineHeight();
  }, [resetFontSize, resetFontClassNames, resetColorFilter, resetLetterSpacing, resetLineHeight, resetFontWeight]);

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
              Font Adjustments
            </TitleWithIcon>
          </Card>

          <AutoGrid $gap="0.5em" $placeContent="center" $columnWidth="10em">
            <AdjustButton
              $value={`${fontSizePercentage}%`}
              $onDecrement={decrementFontSizePercentage}
              $onIncrement={incrementFontSizePercentage}
              $title='Font Size'
            />

            <AdjustButton
              $value={letterSpacing}
              $onDecrement={decrementLetterSpacing}
              $onIncrement={incrementLetterSpacing}
              $title='Letter Spacing'
            />

            <AdjustButton
              $value={`${lineHeightPercentage}%`}
              $onDecrement={decrementLineHeightPercentage}
              $onIncrement={incrementLineHeightPercentage}
              $title='Line Height'
            />

            <AdjustButton
              $value={fontWeight}
              $onDecrement={decrementFontWeight}
              $onIncrement={incrementFontWeight}
              $title='Font Weight'
            />
          </AutoGrid>

          <Card>
            <TitleWithIcon $as="h5">
              <FontIcon />
              Highlight Text
            </TitleWithIcon>
          </Card>

          <AutoGrid $gap="0.5em" $placeContent="center" $columnWidth="10em">
            <MenuButton
              name={ACCESSIBILITY_CLASS_NAMES_KEYS.highlightTitles}
              $active={hasActiveFontClassName(ACCESSIBILITY_CLASS_NAMES.highlightTitles)}
              aria-checked={hasActiveFontClassName(ACCESSIBILITY_CLASS_NAMES.highlightTitles)}
              onClick={toggleFontClassName}
            >
              <TitleIcon />
              Highlight Title
            </MenuButton>

            <MenuButton
              name={ACCESSIBILITY_CLASS_NAMES_KEYS.highlightLinks}
              $active={hasActiveFontClassName(ACCESSIBILITY_CLASS_NAMES.highlightLinks)}
              aria-checked={hasActiveFontClassName(ACCESSIBILITY_CLASS_NAMES.highlightLinks)}
              onClick={toggleFontClassName}
            >
              <LinkIcon />
              Highlight Links
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
              aria-checked={isActiveColorFilter(ACCESSIBILITY_CLASS_NAMES.hightContrast)}
              onClick={toggleColorFilter}
            >
              <ContrastIcon />
              High Contrast
            </MenuButton>
            <MenuButton
              name={ACCESSIBILITY_CLASS_NAMES_KEYS.hightSaturation}
              $active={isActiveColorFilter(ACCESSIBILITY_CLASS_NAMES.hightSaturation)}
              aria-checked={isActiveColorFilter(ACCESSIBILITY_CLASS_NAMES.hightSaturation)}
              onClick={toggleColorFilter}
            >
              <SunIcon />
              High Saturation
            </MenuButton>
            <MenuButton
              name={ACCESSIBILITY_CLASS_NAMES_KEYS.darkMode}
              $active={isActiveColorFilter(ACCESSIBILITY_CLASS_NAMES.darkMode)}
              aria-checked={isActiveColorFilter(ACCESSIBILITY_CLASS_NAMES.darkMode)}
              onClick={toggleColorFilter}
            >
              <MoonIcon />
              Dark Mode
            </MenuButton>
            <MenuButton
              name={ACCESSIBILITY_CLASS_NAMES_KEYS.protanopia}
              $active={isActiveColorFilter(ACCESSIBILITY_CLASS_NAMES.protanopia)}
              aria-checked={isActiveColorFilter(ACCESSIBILITY_CLASS_NAMES.protanopia)}
              onClick={toggleColorFilter}
            >
              <RedSquareIcon />
              Protanopia
            </MenuButton>
            <MenuButton
              name={ACCESSIBILITY_CLASS_NAMES_KEYS.deuteranopia}
              $active={isActiveColorFilter(ACCESSIBILITY_CLASS_NAMES.deuteranopia)}
              aria-checked={isActiveColorFilter(ACCESSIBILITY_CLASS_NAMES.deuteranopia)}
              onClick={toggleColorFilter}
            >
              <GreenSquareIcon />
              Deuteranopia
            </MenuButton>
            <MenuButton
              name={ACCESSIBILITY_CLASS_NAMES_KEYS.tritanopia}
              $active={isActiveColorFilter(ACCESSIBILITY_CLASS_NAMES.tritanopia)}
              aria-checked={isActiveColorFilter(ACCESSIBILITY_CLASS_NAMES.tritanopia)}
              onClick={toggleColorFilter}
            >
              <BlueSquareIcon />
              Tritanopia
            </MenuButton>
            <MenuButton
              name={ACCESSIBILITY_CLASS_NAMES_KEYS.achromatopsia}
              $active={isActiveColorFilter(ACCESSIBILITY_CLASS_NAMES.achromatopsia)}
              aria-checked={isActiveColorFilter(ACCESSIBILITY_CLASS_NAMES.achromatopsia)}
              onClick={toggleColorFilter}
            >
              <PieChartTwotone50Icon />
              Achromatopsia
            </MenuButton>
            <MenuButton
              name={ACCESSIBILITY_CLASS_NAMES_KEYS.achromatomaly}
              $active={isActiveColorFilter(ACCESSIBILITY_CLASS_NAMES.achromatomaly)}
              aria-checked={isActiveColorFilter(ACCESSIBILITY_CLASS_NAMES.achromatomaly)}
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
