import { type HTMLAttributes, memo } from 'react';
import clsx from 'clsx';

import styles from './styles.module.css';

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  $as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  $size?: 'xxl' | 'xl' | 'lg' | 'md' | 'sm';
  $color?: 'primary' | 'secondary' | 'white';
}

const Heading = ({
  children,
  $as: Component = 'h3',
  $size = 'lg',
  $color = 'primary',
}: HeadingProps) => (
  <Component className={clsx(styles.noMargin, styles[$size], styles[$color])}>
    { children }
  </Component>
);

export default memo(Heading);
