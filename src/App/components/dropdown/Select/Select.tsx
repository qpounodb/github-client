import React from 'react';

import { Dropdown } from '../Dropdown';
import { Option } from '../types';

export type SelectProps = {
  options: Option[];
  selected?: Option;
  placeholder?: string;
  onChange: (option: Option) => void;
  disabled?: boolean;
};

const Select: React.FC<SelectProps> = ({
  options,
  selected,
  placeholder,
  onChange,
  disabled,
}) => {
  const isSelected = React.useCallback(
    (option: Option) => option.key === selected?.key,
    [selected]
  );

  return (
    <Dropdown
      options={options}
      isSelected={isSelected}
      title={selected?.value}
      placeholder={placeholder}
      onChange={onChange}
      hideOnChange={true}
      disabled={disabled}
    />
  );
};

export default React.memo(Select);
