import { memo } from 'react';
import clsx from 'clsx';

import { type ElementProps } from '@/types/ElementProps';

import styles from './styles.module.css';

const MenuBody = ({
  children,
  className,
  ...props
}: ElementProps) => (
  <section
    {...props}
    className={clsx(styles.root, className)}
  >
    { children }
  </section>
);

export default memo(MenuBody);
