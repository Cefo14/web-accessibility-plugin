import type { OptionHTMLAttributes } from 'react';
import { memo } from 'react';

type SelectOptionProps = OptionHTMLAttributes<HTMLOptionElement>;

const SelectOption = ({ value, children }: SelectOptionProps) => (
  <option
    value={value}
  >
    {children}
  </option>
);

export default memo(SelectOption);
