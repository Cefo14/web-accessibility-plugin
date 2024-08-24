import { memo } from 'react';
import clsx from 'clsx';

import { type ButtonProps } from '@/types/ButtonProps';

import * as styles from './styles.module.css';

interface MenuButtonProps extends ButtonProps {
  $active?: boolean;
}

const MenuButton = ({ $active = false, children, className, ...props }: MenuButtonProps) => (
  <button
    {...props}
    className={clsx(
      styles.root,
      className,
      { [styles.rootActive]: $active }
    )}
  >
    { children }
  </button>
);

export default memo(MenuButton);
