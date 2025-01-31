import { type HTMLAttributes, memo } from 'react';
import clsx from 'clsx';

import styles from './styles.module.css';

interface TextProps extends HTMLAttributes<HTMLElement> {
  $as?: 'p' | 'span' | 'strong' | 'i' | 'small' | 'ins' | 'sub' | 'b' | 'mark' | 'del' | 'em' | 'sup';
  $size?: 'xxl' | 'xl' | 'lg' | 'md' | 'sm';
  $color?: 'primary' | 'secondary';
}

const Text = ({
  children,
  className,
  $as: Component = 'p',
  $size = 'lg',
  $color = 'primary',
  ...props
}: TextProps) => (
  <Component
    className={clsx(className, styles.noMargin, styles[$size], styles[$color])}
    {...props}
  >
    { children }
  </Component>
);

export default memo(Text);
