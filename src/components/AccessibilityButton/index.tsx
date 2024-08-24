import { memo } from 'react';
import clsx from 'clsx';

import { type ButtonProps } from '@/types/ButtonProps';

import { ReactComponent as AccessibilityIcon } from '@/assets/accessibility-svgrepo-com.svg';

import * as styles from './styles.module.css';

type AccessibilityButtonProps = ButtonProps;

const AccessibilityButton = ({ onClick, className, ...props }: AccessibilityButtonProps) => (
  <button
    {...props}
    type="button"
    className={clsx(styles.root, className)}
    onClick={onClick}
  >
    <AccessibilityIcon fill="white" width={32} height={32} />
  </button>
);
export default memo(AccessibilityButton);