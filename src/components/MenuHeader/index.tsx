import { memo } from 'react';
import clsx from 'clsx';

import { type ElementProps } from '@/types/ElementProps';
import { type OnClickButton } from '@/types/OnClickButton';

import ResetIcon from '@/assets/reset-svgrepo-com.svg?react';
import CloseIcon from '@/assets/close-bold-svgrepo-com.svg?react';

import styles from './styles.module.css';
import Heading from '../Heading';

interface MenuHeaderProps extends ElementProps {
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
    <Heading
      id={$titleId}
      $as="h2"
      $size="lg"
      $color="secondary"
    >
      { $title }
    </Heading>
    <div className={styles.actions}>
      <button
        type="button"
        className={clsx(styles.button, styles.resetButton)}
        title="Reset settings"
        aria-label="Reset settings"
        onClick={$onReset}
      >
        <ResetIcon width={20} height={20} />
      </button>
      <button
        type="button"
        className={clsx(styles.button, styles.closeButton)}
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
