import { memo } from 'react';
import clsx from 'clsx';

import { type DivProps } from '@/types/DivProps';
import { type OnClickButton } from '@/types/OnClickButton';

import { ReactComponent as ResetIcon } from '@/assets/reset-svgrepo-com.svg';
import { ReactComponent as CloseIcon } from '@/assets/close-bold-svgrepo-com.svg';

import * as styles from './styles.module.css';

interface MenuHeaderProps extends DivProps {
  $titleId?: string;
  $title?: string;
  $onClose?: OnClickButton,
  $onReset?: OnClickButton,
}

const MenuHeader = ({
  $titleId,
  $title,
  $onClose,
  $onReset,
  className,
  ...props
}: MenuHeaderProps) => (
  <header
    {...props}
    className={clsx(styles.root, className)}
  >
    <h2 id={$titleId} className={styles.title}>
      { $title }
    </h2>
    <div className={styles.actions}>
      <button
        type="button"
        className={styles.button}
        title="Reset settings"
        aria-label="Reset settings"
        onClick={$onReset}
      >
        <ResetIcon width={20} height={20} />
      </button>
      <button
        type="button"
        className={styles.button}
        title="Close menu"
        aria-label="Close menu"
        onClick={$onClose}
      >
        <CloseIcon width={20} height={20} />
      </button>
    </div>
  </header>
);

export default memo(MenuHeader);
