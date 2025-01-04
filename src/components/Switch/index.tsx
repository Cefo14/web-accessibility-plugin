/* eslint-disable jsx-a11y/label-has-associated-control */
import { type InputHTMLAttributes, memo } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type SiwtchProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

const Switch = ({ className, ...props }: SiwtchProps) => (
  <label className={styles.root}>
    <input
      {...props}
      type="checkbox"
      className={clsx(styles.input, className)}
    />
    <span className={styles.slider} />
  </label>
);

export default memo(Switch);
