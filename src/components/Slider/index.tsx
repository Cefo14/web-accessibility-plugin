import { type InputHTMLAttributes, memo, useId } from 'react';
import clsx from 'clsx';
import Text from '../Text';

import styles from './styles.module.css';

interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  $label?: string;
}

const Slider = ({ $label, className, ...props }: SliderProps) => {
  const id = useId();
  const currentId = props.id ?? id;

  return (
    <div>
      {
        $label && (
          <label htmlFor={currentId}>
            <Text $size="sm" $as="span">
              {$label}
            </Text>
          </label>
        )
      }
      <input
        {...props}
        type="range"
        id={currentId}
        className={clsx(styles.slider, className)}
      />
    </div>
  );
};

export default memo(Slider);
