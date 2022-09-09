import React from 'react';
import { not } from '~/shared/utils';
import { Dropdown } from '../Dropdown';
import { Option } from '../Option';

export type MultiDropdownProps = {
  options: Option[];
  selected: Option[];
  getTitle: (selected: Option[]) => string;
  placeholder?: string;
  onChange: (selected: Option[]) => void;
  disabled?: boolean;
};

const equalTo = (a: Option) => (b: Option) => a.key === b.key;

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  options,
  selected,
  getTitle,
  placeholder,
  onChange,
  disabled,
}) => {
  const title = React.useMemo(() => getTitle(selected), [selected, getTitle]);

  const selectedSet = React.useMemo(
    () => new Set(selected.map(({ key }) => key)),
    [selected]
  );

  const isSelected = React.useCallback(
    (option: Option) => selectedSet.has(option.key),
    [selectedSet]
  );

  const handleChange = React.useCallback(
    (option: Option, wasSelected: boolean) => {
      const isChanged = equalTo(option);
      onChange(
        wasSelected ? selected.filter(not(isChanged)) : [...selected, option]
      );
    },
    [onChange, selected]
  );

  return (
    <Dropdown
      options={options}
      isSelected={isSelected}
      title={title}
      placeholder={placeholder}
      onChange={handleChange}
      hideOnChange={false}
      disabled={disabled}
    />
  );
};

export default React.memo(MultiDropdown);
