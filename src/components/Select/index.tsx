import { type HtmlHTMLAttributes, memo } from 'react';
import clsx from 'clsx';

import styles from './styles.module.css';

interface SelectProps extends Omit<HtmlHTMLAttributes<HTMLSelectElement>, 'children'> {
  $options: {
    value: string | number;
    label: string | number;
  }[];
  $value: string | number;
}

const Select = ({
  $options,
  $value,
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
          value={option.value}
          selected={$value === option.value}
        >
          {option.value}
        </option>
      ))
    }
  </select>
);

export default memo(Select);
