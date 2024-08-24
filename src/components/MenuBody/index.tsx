import { memo } from 'react';
import clsx from 'clsx';

import { type DivProps } from '@/types/DivProps';

import * as styles from './styles.module.css';

const MenuBody = ({
  children,
  className,
  ...props
}: DivProps) => (
  <section
    {...props}
    className={clsx(styles.root, className)}
  >
    { children }
  </section>
);

export default memo(MenuBody);
