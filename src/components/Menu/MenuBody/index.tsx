import { memo } from 'react';
import clsx from 'clsx';

import { type ElementProps } from '@/types/ElementProps';

import styles from './styles.module.css';

const MenuBody = ({
  children,
  className,
  ...props
}: ElementProps) => (
  <main
    {...props}
    className={clsx(styles.root, className)}
  >
    { children }
  </main>
);

export default memo(MenuBody);
