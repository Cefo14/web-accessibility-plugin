import { memo } from 'react';
import clsx from 'clsx';

import { type ElementProps } from '@/types/ElementProps';
import { type OnClickButton } from '@/types/OnClickButton';

import MinusIcon from '@/assets/minus-svgrepo-com.svg?react';
import PlusIcon from '@/assets/plus-svgrepo-com.svg?react';

import styles from './styles.module.css';

interface AdjustValueProps extends ElementProps {
  $onDecrement?: OnClickButton;
  $onIncrement?: OnClickButton;
  $value?: number;
}

/**
 * @deprecated Use `AdjustButton` instead of this component
 */
const AdjustValue = ({
  $onDecrement,
  $onIncrement,
  $value = 0,
  className,
  ...props
}: AdjustValueProps) => (
  <div
    {...props}
    className={clsx(styles.root, className)}
  >
    <button
      type="button"
      className={styles.button}
      aria-label="decrement font size"
      onClick={$onDecrement}
    >
      <MinusIcon width={32} height={32} />
    </button>
    <strong className={styles.value}>
      { `${$value}%` }
    </strong>
    <button
      type="button"
      className={styles.button}
      aria-label="increment font size"
      onClick={$onIncrement}
    >
      <PlusIcon width={32} height={32} />
    </button>
  </div>
);

export default memo(AdjustValue);
