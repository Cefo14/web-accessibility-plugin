import { memo } from 'react';
import clsx from 'clsx';

import type { ElementProps } from '@/types/ElementProps';

import styles from './styles.module.css';

type ButtonGroupProps = ElementProps;

const ButtonGroup = ({ children, className, ...props }: ButtonGroupProps) => (
  <section
    {...props}
    className={clsx(styles.root, className)}
  >
    { children }
  </section>
);

export default memo(ButtonGroup);
