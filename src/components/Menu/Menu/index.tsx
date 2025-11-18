import { memo } from 'react';
import { clsx } from 'clsx';

import type { ElementProps } from '@/types/ElementProps';
import { useFocusTrap } from '@/hooks/useFocusTrap';

import styles from './styles.module.css';

interface MenuProps extends ElementProps {
  $isOpen?: boolean
}

const Menu = ({
  $isOpen = false,
  children,
  className,
  ...props
}: MenuProps) => {
  const focusTrapRef = useFocusTrap($isOpen);

  return (
    <article
      {...props}
      ref={focusTrapRef}
      className={clsx(
        styles.root,
        { [styles.rootHidde]: !$isOpen },
        className,
      )}
    >
      { children }
    </article>
  );
};

export default memo(Menu);
