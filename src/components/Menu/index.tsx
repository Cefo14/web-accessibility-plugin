import { memo } from 'react';
import { clsx } from 'clsx';

import { type DivProps } from '@/types/DivProps';

import styles from './styles.module.css';

interface MenuProps extends DivProps {
  $isOpen?: boolean
}

const Menu = ({
  $isOpen = false,
  children,
  className,
  ...props
}: MenuProps) => (
  <article
    {...props}
    className={clsx(
      styles.root,
      { [styles.rootHidde]: !$isOpen },
      className,
    )}
    aria-hidden={!$isOpen}
  >
    { children }
  </article>
);

export default memo(Menu);
