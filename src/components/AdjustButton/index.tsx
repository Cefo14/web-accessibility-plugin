import { memo } from 'react';
import clsx from 'clsx';

import { DivProps } from '@/types/DivProps';
import type { OnClickButton } from '@/types/OnClickButton';

import MinusIcon from '@/assets/minus-svgrepo-com.svg?react';
import PlusIcon from '@/assets/plus-svgrepo-com.svg?react';

import styles from './styles.module.css';
import Card from '../Card';

interface AdjustButtonProps extends DivProps {
  $onDecrement?: OnClickButton;
  $onIncrement?: OnClickButton;
  $value?: number | string;
  $title?: string;
}

const AdjustButton = ({
  $onIncrement,
  $onDecrement,
  $value,
  $title,
  className,
  ...props
}: AdjustButtonProps) => (
  <Card className={clsx(styles.root, className)} {...props}>
    <div className={styles.actionContainer}>
      <button
        type="button"
        className={clsx(styles.button, styles.buttonMinus)}
        onClick={$onDecrement}
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
      >
        <PlusIcon width={24} height={24} />
      </button>
    </div>
    <h6 className={styles.title}>{$title}</h6>
  </Card>
);

export default memo(AdjustButton);
