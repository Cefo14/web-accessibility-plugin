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
  $name?: string;
}

const SwitchButtons = ({
  $min,
  $max,
  $now,
  $value,
  $onIncrement,
  $onDecrement,
  $name,
  className,
  ...props
}: SwitchButtonsProps) => (
  <div
    className={clsx(styles.root, className)}
    {...props}
  >
    <Button
      name={$name}
      type="button"
      className={clsx(styles.button)}
      onClick={$onDecrement}
      disabled={$now === $min}
      aria-label="Decrement value"
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
      aria-label="Increment value"
      value={$now}
    >
      <PlusIcon width={24} height={24} />
    </Button>
  </div>
);

export default memo(SwitchButtons);
