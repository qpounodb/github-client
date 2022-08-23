import React, { useState } from 'react';
import { useHide } from '../../shared/hooks';
import { classname } from '../../shared/utils';
import { Input } from '../Input/Input';
import './MultiDropdown.scss';
import { MultiDropdownList } from './MultiDropdownList';
import { MultiDropdownProps } from './types';

export type { MultiDropdownProps, Option } from './types';

export const MultiDropdown: React.FC<MultiDropdownProps> = ({
  value: selected,
  disabled,
  pluralizeOptions,
  placeholder = '',
  ...rest
}) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [isHidden, setHide] = useState<boolean>(true);
  const hide = React.useCallback(() => setHide(true), [setHide]);
  const title = React.useMemo(
    () => pluralizeOptions(selected),
    [selected, pluralizeOptions]
  );

  useHide(ref, hide);

  const cls = classname({
    'multi-dropdown': true,
    'multi-dropdown_disabled': disabled,
  });

  const handleDropdown = () => disabled || setHide((state) => !state);

  return (
    <div className={cls} ref={ref}>
      <Input
        className="multi-dropdown__input"
        value={title}
        placeholder={placeholder}
        onClick={handleDropdown}
        onChange={() => {}}
        readOnly
        disabled={disabled}
      />
      {disabled || isHidden ? null : (
        <MultiDropdownList {...rest} selected={selected} />
      )}
    </div>
  );
};

export const MultiDropdownWrapper: React.FC<MultiDropdownProps> = ({
  value,
  onChange,
  ...rest
}) => {
  const [selected, setSelected] = React.useState(value);
  React.useEffect(() => setSelected(value), [value]);
  return <MultiDropdown {...rest} value={selected} onChange={setSelected} />;
};
