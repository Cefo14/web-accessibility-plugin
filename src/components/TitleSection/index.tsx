import { type HTMLAttributes, memo } from 'react';
import clsx from 'clsx';

import styles from './styles.module.css';

interface TitleSectionProps extends HTMLAttributes<HTMLHeadElement> {
  $as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const TitleSection = ({
  $as, className, children, ...props
}: TitleSectionProps) => {
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

export default memo(TitleSection);
