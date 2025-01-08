import { type InputHTMLAttributes, memo, useId } from 'react';

interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  $label?: string;
}

const Slider = ({ $label, ...props }: SliderProps) => {
  const id = useId();
  return (
    <div>
      <input
        {...props}
        type="range"
        id={props.id ?? id}
      />
      { $label && <label htmlFor={props.id ?? id}>{$label}</label>}
    </div>
  );
};

export default memo(Slider);
