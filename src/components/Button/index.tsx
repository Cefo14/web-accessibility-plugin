/* eslint-disable react/button-has-type */

import { type ButtonHTMLAttributes, memo } from 'react';
import clsx from 'clsx';

import styles from './styles.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  $variant?: 'secondary' | 'info' | 'warning' | 'danger';
}

const Button = ({
  $variant,
  className,
  children,
  type = 'button',
  ...props
}: ButtonProps) => (
  <button
    {...props}
    type={type}
    className={clsx(
      styles.button,
      {
        [styles['button--secondary']]: $variant === 'secondary',
        [styles['button--info']]: $variant === 'info',
        [styles['button--warning']]: $variant === 'warning',
        [styles['button--danger']]: $variant === 'danger',
      },
      className,
    )}
  >
    {children}
  </button>
);

export default memo(Button);
