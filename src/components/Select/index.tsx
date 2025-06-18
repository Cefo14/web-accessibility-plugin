import SelectRoot from './Select';
import SelectOption from './SelectOption';

const Select = SelectRoot as typeof SelectRoot & {
  Option: typeof SelectOption;
};

Select.Option = SelectOption;

export default Select;
