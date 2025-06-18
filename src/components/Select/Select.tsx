import type { SelectHTMLAttributes } from 'react';
import { memo } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

const Select = ({
  value,
  className,
  children,
  ...props
}: SelectProps) => (
  <select
    {...props}
    value={value}
    className={clsx(styles.root, className)}
  >
    {children}
  </select>
);

export default memo(Select);
