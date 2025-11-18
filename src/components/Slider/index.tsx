import { type InputHTMLAttributes, memo, useId } from 'react';
import clsx from 'clsx';

import styles from './styles.module.css';

type SliderProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>

const Slider = ({ className, ...props }: SliderProps) => {
  const id = useId();
  const currentId = props.id ?? id;
  const value = props.value ?? props.defaultValue ?? props.min ?? 0;
  const ariaLabel = props['aria-label'];
  return (
    <input
      {...props}
      type="range"
      id={currentId}
      className={clsx(styles.slider, className)}
      aria-label={ariaLabel}
      aria-valuemin={props.min ? Number(props.min) : undefined}
      aria-valuemax={props.max ? Number(props.max) : undefined}
      aria-valuenow={Number(value)}
      aria-valuetext={value.toString()}
    />
  );
};

export default memo(Slider);
