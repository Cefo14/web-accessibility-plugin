/* eslint-disable react/button-has-type */

import { type ButtonHTMLAttributes, memo } from 'react';
import clsx from 'clsx';

import styles from './styles.module.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  className,
  children,
  type = 'button',
  ...props
}: ButtonProps) => (
  <button
    {...props}
    type={type}
    className={clsx(styles.button, className)}
  >
    {children}
  </button>
);

export default memo(Button);
