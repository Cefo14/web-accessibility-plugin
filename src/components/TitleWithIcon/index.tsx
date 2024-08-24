import { type HTMLAttributes, memo } from 'react';
import clsx from 'clsx';

import * as styles from './styles.module.css';

interface TitleProps extends HTMLAttributes<HTMLHeadElement> {
  $as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const TitleWithIcon = ({ $as, className, children, ...props }: TitleProps) => {
  const Component = $as;
  return (
    <Component
      {...props}
      className={clsx(styles.root, className)}
    >
      { children }
    </Component>
  );
};

export default memo(TitleWithIcon);
