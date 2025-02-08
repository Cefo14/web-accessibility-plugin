import { memo } from 'react';

import type { MouseEventButton } from '@/types/MouseEvent';
import type { ChangeEventSelect } from '@/types/ChangeEvent';

import Heading from '@/components/Heading';
import SwitchButtons from '@/components/SwitchButtons';
import Text from '@/components/Text';
import SpaceBetween from '@/components/SpaceBetween';
import Select, { type SelectOption } from '@/components/Select';

import type { FontProps } from '@/hooks/useAdjustFont';
import { useTranslate } from '@/hooks/useTranslate';

import styles from './styles.module.css';

type FontSectionProps = {
  fontProps: FontProps;
  fontOptions: SelectOption[];
  fontSizeStep: number;
  fontWeightStep: number;
  letterSpacingStep: number;
  lineHeightStep: number;
  fontFamilySelected: string;
  onIncrementFontProp: (event: MouseEventButton) => void;
  onDecrementFontProp: (event: MouseEventButton) => void;
  onChangeFontFamily: (event: ChangeEventSelect) => void;
};

const FontSection = ({
  fontProps,
  fontOptions,
  fontSizeStep,
  fontWeightStep,
  letterSpacingStep,
  lineHeightStep,
  fontFamilySelected,
  onIncrementFontProp,
  onDecrementFontProp,
  onChangeFontFamily,
}: FontSectionProps) => {
  const { t } = useTranslate();
  return (
    <section className={styles.section}>
      <Heading $as="h3" $size="md">
        {t('section.font.title')}
      </Heading>

      <SpaceBetween>
        <Text $size="sm" $as="span">
          {t('section.font.fontFamily')}
        </Text>
        <SwitchButtons
          $min={-10}
          $max={10}
          $now={fontSizeStep}
          $value={`${fontSizeStep}x`}
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
          $min={-10}
          $max={10}
          $now={letterSpacingStep}
          $value={`${letterSpacingStep}x`}
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
          $min={-10}
          $max={10}
          $now={lineHeightStep}
          $value={`${lineHeightStep}x`}
          $onDecrement={onDecrementFontProp}
          $onIncrement={onIncrementFontProp}
          $name={fontProps.lineHeight}
        />
      </SpaceBetween>

      <SpaceBetween>
        <Text $size="sm" $as="span">
          {t('section.font.fontWeight')}
        </Text>
        <SwitchButtons
          $min={-10}
          $max={10}
          $now={fontWeightStep}
          $value={`${fontWeightStep}x`}
          $onDecrement={onDecrementFontProp}
          $onIncrement={onIncrementFontProp}
          $name={fontProps.weight}
        />
      </SpaceBetween>

      <SpaceBetween>
        <Text $size="sm" $as="span">
          {t('section.font.fontFamily')}
        </Text>
        <Select
          $options={fontOptions}
          value={fontFamilySelected}
          onChange={onChangeFontFamily}
        />
      </SpaceBetween>
    </section>
  );
};
export default memo(FontSection);
