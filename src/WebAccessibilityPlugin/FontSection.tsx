import { memo } from 'react';

import type { MouseEventButton } from '@/types/MouseEvent';
import type { ChangeEventSelect } from '@/types/ChangeEvent';

import Heading from '@/components/Heading';
import SwitchButtons from '@/components/SwitchButtons';
import Text from '@/components/Text';
import SpaceBetween from '@/components/SpaceBetween';
import Select from '@/components/Select';

import { FONT_FAMILY } from '@/helpers/FontFamilyAdjuster';
import { FONT_WEIGHT } from '@/helpers/FontWeightAdjuster';

import type { FONT_PROPS } from '@/hooks/useAdjustFont';
import { useI18n } from '@/i18n';

import styles from './styles.module.css';

interface FontSectionProps {
  fontProps: typeof FONT_PROPS;
  fontSizeStep: number;
  letterSpacingStep: number;
  lineHeightStep: number;
  fontFamilyValue: string;
  fontWeightValue: string;
  onIncrementFontProp: (event: MouseEventButton) => void;
  onDecrementFontProp: (event: MouseEventButton) => void;
  onChangeFontFamily: (event: ChangeEventSelect) => void;
  onChangeFontWeight: (event: ChangeEventSelect) => void;
}

const FontSection = ({
  fontProps,
  fontSizeStep,
  letterSpacingStep,
  lineHeightStep,
  fontFamilyValue,
  fontWeightValue,
  onIncrementFontProp,
  onDecrementFontProp,
  onChangeFontFamily,
  onChangeFontWeight,
}: Readonly<FontSectionProps>) => {
  const { t } = useI18n();

  return (
    <section className={styles.section}>
      <Heading $as="h3" $size="md">
        {t('section.font.title')}
      </Heading>

      <SpaceBetween>
        <Text $size="sm" $as="span">
          {t('section.font.size')}
        </Text>
        <SwitchButtons
          $min={10}
          $max={200}
          $now={fontSizeStep}
          $value={`${fontSizeStep}%`}
          $onDecrement={onDecrementFontProp}
          $onIncrement={onIncrementFontProp}
          $name={fontProps.size}
        />
      </SpaceBetween>

      <SpaceBetween>
        <Text $size="sm" $as="span">
          {t('section.font.letterSpacing')}
        </Text>
        <SwitchButtons
          $min={10}
          $max={200}
          $now={letterSpacingStep}
          $value={`${letterSpacingStep}%`}
          $onDecrement={onDecrementFontProp}
          $onIncrement={onIncrementFontProp}
          $name={fontProps.letterSpacing}
        />
      </SpaceBetween>

      <SpaceBetween>
        <Text $size="sm" $as="span">
          {t('section.font.lineHeight')}
        </Text>
        <SwitchButtons
          $min={10}
          $max={200}
          $now={lineHeightStep}
          $value={`${lineHeightStep}%`}
          $onDecrement={onDecrementFontProp}
          $onIncrement={onIncrementFontProp}
          $name={fontProps.lineHeight}
        />
      </SpaceBetween>

      <SpaceBetween>
        <Text $size="sm" $as="span">
          {t('section.font.fontWeight')}
        </Text>
        <Select
          value={fontWeightValue}
          onChange={onChangeFontWeight}
        >
          {
            Object.values(FONT_WEIGHT).map((value) => (
              <Select.Option key={value} value={value}>
                {value}
              </Select.Option>
            ))
          }
        </Select>
      </SpaceBetween>

      <SpaceBetween>
        <Text $size="sm" $as="span">
          {t('section.font.fontFamily')}
        </Text>
        <Select
          value={fontFamilyValue}
          onChange={onChangeFontFamily}
        >
          {
            Object.values(FONT_FAMILY).map((value) => (
              <Select.Option key={value} value={value}>
                {value.replace(/'/g, '')}
              </Select.Option>
            ))
          }
        </Select>
      </SpaceBetween>
    </section>
  );
};
export default memo(FontSection);
