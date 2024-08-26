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
}

const AdjustButton = ({
  $onIncrement,
  $onDecrement,
  $value,
  children,
  className,
  ...props
}: AdjustButtonProps) => (
  <Card
    {...props}
    className={clsx(
      styles.root,
      className,
    )}
  >
    <div className={styles.buttonContainer}>
      <button type="button" className={styles.button} onClick={$onDecrement}>
        <MinusIcon />
      </button>
      <span>
        { $value }
      </span>
      <button type="button" className={styles.button} onClick={$onIncrement}>
        <PlusIcon />
      </button>
    </div>
    { children }
  </Card>
);

export default memo(AdjustButton);
