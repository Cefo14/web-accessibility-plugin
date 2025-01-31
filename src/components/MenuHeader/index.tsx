import { memo } from 'react';
import clsx from 'clsx';

import { type ElementProps } from '@/types/ElementProps';
import { type OnClickButton } from '@/types/OnClickButton';

import Heading from '../Heading';
import Button from '../Button';

import ResetIcon from '@/assets/reset-svgrepo-com.svg?react';
import CloseIcon from '@/assets/close-bold-svgrepo-com.svg?react';

import styles from './styles.module.css';

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
      <Button
        $variant="warning"
        type="button"
        className={styles.button}
        title="Reset settings"
        aria-label="Reset settings"
        onClick={$onReset}
      >
        <ResetIcon width={20} height={20} />
      </Button>
      <Button
        $variant="danger"
        type="button"
        className={styles.button}
        title="Close menu"
        aria-label="Close menu"
        onClick={$onClose}
      >
        <CloseIcon width={20} height={20} />
      </Button>
    </div>
  </header>
);

export default memo(MenuHeader);
