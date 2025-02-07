import { type SelectHTMLAttributes, memo } from 'react';
import clsx from 'clsx';

import styles from './styles.module.css';

export type SelectOption = {
  id?: string | number;
  value: string | number;
  label: string | number;
};

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  $options: SelectOption[];
}

const Select = ({
  $options,
  value,
  className,
  ...props
}: SelectProps) => (
  <select
    {...props}
    className={clsx(styles.root, className)}
  >
    {
      $options.map((option) => (
        <option
          key={option?.id ?? `${option.label}-${option.value}`}
          value={option.value}
          selected={value === option.value}
        >
          {option.label}
        </option>
      ))
    }
  </select>
);

export default memo(Select);
