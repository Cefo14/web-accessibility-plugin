/* eslint-disable react/jsx-props-no-spreading */ // TODO: fix this
import { memo } from 'react';
import clsx from 'clsx';

import type { ElementProps } from '@/types/ElementProps';
import type { OnClickButton } from '@/types/OnClickButton';

import MinusIcon from '@/assets/minus-svgrepo-com.svg?react';
import PlusIcon from '@/assets/plus-svgrepo-com.svg?react';

import styles from './styles.module.css';

interface AdjustButtonProps extends ElementProps {
  $min?: number;
  $max?: number;
  $now?: number;
  $value?: number | string;
  $onDecrement?: OnClickButton;
  $onIncrement?: OnClickButton;
  $id?: string;
}

const AdjustButton = ({
  $min,
  $max,
  $now,
  $value,
  $id,
  $onIncrement,
  $onDecrement,
  className,
  children,
  ...props
}: AdjustButtonProps) => (
  <section
    className={clsx(styles.root, className)}
    aria-labelledby={$id}
    {...props}
  >
    <div className={styles.actionContainer}>
      <button
        type="button"
        className={clsx(styles.button, styles.buttonMinus)}
        onClick={$onDecrement}
        disabled={$now === $min}
        aria-label="Decrement value"
      >
        <MinusIcon width={24} height={24} />
      </button>
      <strong className={styles.value}>
        {$value}
      </strong>
      <button
        type="button"
        className={clsx(styles.button, styles.buttonPlus)}
        onClick={$onIncrement}
        disabled={$now === $max}
        aria-label="Increment value"
      >
        <PlusIcon width={24} height={24} />
      </button>
    </div>
    <h6 id={$id} className={styles.title}>
      {children}
    </h6>
  </section>
);

export default memo(AdjustButton);
