import React from 'react';
import { Input } from '~/App/components/input';
import { useHide } from '~/shared/hooks';
import { Option } from '../Option';
import styles from './Dropdown.module.scss';
import { List } from './List';

export type DropdownProps = {
  options: Option[];
  isSelected: (option: Option) => boolean;
  title?: string;
  placeholder?: string;
  onChange: (option: Option, isSelected: boolean) => void;
  hideOnChange?: boolean;
  disabled?: boolean;
};

const Dropdown: React.FC<DropdownProps> = ({
  options,
  isSelected,
  title,
  placeholder,
  onChange,
  hideOnChange = false,
  disabled,
}) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [isHidden, setHide] = React.useState<boolean>(true);

  const noop = React.useCallback(() => {}, []);

  useHide(
    ref,
    React.useCallback(() => setHide(true), [setHide])
  );

  const handleDropdown = React.useCallback(
    () => disabled || setHide((state) => !state),
    [disabled]
  );

  const handleChange = React.useCallback(
    (option: Option, isSelected: boolean) => {
      hideOnChange && setHide(true);
      onChange(option, isSelected);
    },
    [hideOnChange, onChange]
  );

  return (
    <div className={styles.root} ref={ref}>
      <Input
        className={styles.root__input}
        value={title}
        placeholder={placeholder}
        onClick={handleDropdown}
        readOnly
        onChange={noop}
        disabled={disabled}
      />
      {disabled || isHidden ? null : (
        <List
          className={styles.root__list}
          options={options}
          isSelected={isSelected}
          onChange={handleChange}
        />
      )}
    </div>
  );
};

export default React.memo(Dropdown);
