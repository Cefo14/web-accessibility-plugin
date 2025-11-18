import { memo } from 'react';
import clsx from 'clsx';

import type { ElementProps } from '@/types/ElementProps';
import type { OnClickButton } from '@/types/OnClickButton';

import Text from '@/components/Text';
import Button from '@/components/Button';

import { useI18n } from '@/i18n';

import MinusIcon from '@/assets/minus-svgrepo-com.svg?react';
import PlusIcon from '@/assets/plus-svgrepo-com.svg?react';

import styles from './styles.module.css';

interface SwitchButtonsProps extends ElementProps {
  $min?: number;
  $max?: number;
  $now?: number;
  $value?: number | string;
  $onDecrement?: OnClickButton;
  $onIncrement?: OnClickButton;
  $id?: string;
  $name?: string;
  $ariaLabelledBy?: string;
}

const SwitchButtons = ({
  $min,
  $max,
  $now,
  $value,
  $onIncrement,
  $onDecrement,
  $name,
  $ariaLabelledBy,
  className,
  ...props
}: SwitchButtonsProps) => {
  const { t } = useI18n();
  
  return (
    <div
      className={clsx(styles.root, className)}
      role="group"
      aria-labelledby={$ariaLabelledBy}
      {...props}
    >
      <Button
        name={$name}
        type="button"
        className={clsx(styles.button)}
        onClick={$onDecrement}
        disabled={$now === $min}
        aria-label={t('aria.decrement')}
        value={$now}
      >
        <MinusIcon width={24} height={24} />
      </Button>
      <Text $as="span" $size="sm" className={styles.value}>
        {$value}
      </Text>
      <Button
        name={$name}
        type="button"
        className={clsx(styles.button)}
        onClick={$onIncrement}
        disabled={$now === $max}
        aria-label={t('aria.increment')}
        value={$now}
      >
        <PlusIcon width={24} height={24} />
      </Button>
    </div>
  );
};

export default memo(SwitchButtons);
