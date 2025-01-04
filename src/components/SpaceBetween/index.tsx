import { memo } from 'react';
import clsx from 'clsx';
import type { ElementProps } from '@/types/ElementProps';

import styles from './styles.module.css';

const SpaceBetween = ({
  children,
  className,
  ...props
} :ElementProps) => (
  <div
    className={clsx(styles.root, className)}
    {...props}
  >
    { children }
  </div>
);

export default memo(SpaceBetween);
