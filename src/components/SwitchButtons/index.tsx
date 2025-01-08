import { memo } from 'react';
import clsx from 'clsx';

import type { ElementProps } from '@/types/ElementProps';
import type { OnClickButton } from '@/types/OnClickButton';

import Text from '@/components/Text';
import Button from '@/components/Button';

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
}

const SwitchButtons = ({
  $min,
  $max,
  $now,
  $value,
  $onIncrement,
  $onDecrement,
  className,
  ...props
}: SwitchButtonsProps) => (
  <div
    className={clsx(styles.root, className)}
    {...props}
  >
    <Button
      type="button"
      className={clsx(styles.button)}
      onClick={$onDecrement}
      disabled={$now === $min}
      aria-label="Decrement value"
    >
      <MinusIcon width={24} height={24} />
    </Button>
    <Text $as="span" $size="sm" className={styles.value}>
      {$value}
    </Text>
    <Button
      type="button"
      className={clsx(styles.button)}
      onClick={$onIncrement}
      disabled={$now === $max}
      aria-label="Increment value"
    >
      <PlusIcon width={24} height={24} />
    </Button>
  </div>
);

export default memo(SwitchButtons);
