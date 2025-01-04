import { memo } from 'react';
import clsx from 'clsx';

import { type ButtonProps } from '@/types/ButtonProps';

import AccessibilityIcon from '@/assets/accessibility-svgrepo-com.svg?react';

import styles from './styles.module.css';

type OpenMenuButtonProps = ButtonProps;

const OpenMenuButton = ({ onClick, className, ...props }: OpenMenuButtonProps) => (
  <button
    {...props}
    type="button"
    className={clsx(styles.root, className)}
    onClick={onClick}
  >
    <AccessibilityIcon fill="white" width={32} height={32} />
  </button>
);

export default memo(OpenMenuButton);
