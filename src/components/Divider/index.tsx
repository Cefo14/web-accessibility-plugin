import { memo } from 'react';
import clsx from 'clsx';

import type { ElementProps } from '@/types/ElementProps';
import styles from './styles.module.css';

type DividerProps = Omit<ElementProps, 'children'>;

const Divider = ({ className, ...props }: DividerProps) => (
  <hr
    className={clsx(styles.root, className)}
    {...props}
  />
);

export default memo(Divider);
