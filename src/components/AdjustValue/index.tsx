import { memo } from 'react';
import clsx from 'clsx';

import { type DivProps } from '@/types/DivProps';
import { type OnClickButton } from '@/types/OnClickButton';

import { ReactComponent as MinusIcon } from '@/assets/minus-svgrepo-com.svg';
import { ReactComponent as PlusIcon } from '@/assets/plus-svgrepo-com.svg';

import * as styles from './styles.module.css';

interface AdjustValueProps extends DivProps {
  $onDecrement?: OnClickButton;
  $onIncrement?: OnClickButton;
  $value?: number;
}

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