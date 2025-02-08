import { memo } from 'react';
import clsx from 'clsx';

import { type ElementProps } from '@/types/ElementProps';
import { type OnClickButton } from '@/types/OnClickButton';

import ResetIcon from '@/assets/reset-svgrepo-com.svg?react';
import CloseIcon from '@/assets/close-bold-svgrepo-com.svg?react';

import { useTranslate } from '@/hooks/useTranslate';

import Heading from '../Heading';
import Button from '../Button';

import styles from './styles.module.css';

interface MenuHeaderProps extends ElementProps {
  $titleId?: string;
  $onClose?: OnClickButton,
  $onReset?: OnClickButton,
}

const MenuHeader = ({
  $titleId,
  $onClose,
  $onReset,
  className,
  ...props
}: MenuHeaderProps) => {
  const { t } = useTranslate();
  return (
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
        { t('menu.title') }
      </Heading>
      <div className={styles.actions}>
        <Button
          $variant="warning"
          type="button"
          className={styles.button}
          title={t('menu.reset')}
          aria-label={t('menu.reset')}
          onClick={$onReset}
        >
          <ResetIcon width={20} height={20} />
        </Button>
        <Button
          $variant="danger"
          type="button"
          className={styles.button}
          title={t('menu.close')}
          aria-label={t('menu.close')}
          onClick={$onClose}
        >
          <CloseIcon width={20} height={20} />
        </Button>
      </div>
    </header>
  );
};

export default memo(MenuHeader);
