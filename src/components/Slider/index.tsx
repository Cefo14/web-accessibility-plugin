import { type InputHTMLAttributes, memo, useId } from 'react';

interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  $label?: string;
}

const Slider = ({ $label, ...props }: SliderProps) => {
  const id = useId();
  const currentId = props.id ?? id;
  return (
    <div>
      <input
        {...props}
        type="range"
        id={currentId}
      />
      { $label && <label htmlFor={currentId}>{$label}</label>}
    </div>
  );
};

export default memo(Slider);
