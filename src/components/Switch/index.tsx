/* eslint-disable jsx-a11y/label-has-associated-control */
import { type InputHTMLAttributes, type KeyboardEvent, memo } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

interface SiwtchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  $enterabled?: boolean;
}

const onEnter = (event: KeyboardEvent<HTMLInputElement>) => {
  if (event.key.toLowerCase() === 'enter') event.currentTarget.click();
};

const Switch = ({ $enterabled, className, ...props }: SiwtchProps) => (
  <div className={styles.root}>
    <input
      {...props}
      onKeyUp={$enterabled ? onEnter : props.onKeyUp}
      type="checkbox"
      className={clsx(styles.input, className)}
    />
    <span className={styles.slider} />
  </div>
);

export default memo(Switch);
