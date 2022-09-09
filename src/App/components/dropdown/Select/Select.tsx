import React, { useState } from 'react';
import { Input } from '~/App/components/input';
import { useHide } from '~/shared/hooks';
import { Option } from '../Option';
import { List } from './List';
import styles from './Select.module.scss';

export type SelectProps = {
  options: Option[];
  selected: number | string | null;
  onChange: (key: number | string) => void;
  disabled?: boolean;
  placeholder?: string;
};

const Select: React.FC<SelectProps> = ({
  options,
  selected,
  disabled,
  placeholder = '',
  onChange,
}) => {
  const ref = React.useRef<HTMLDivElement | null>(null);

  const [isHidden, setHide] = useState<boolean>(true);

  const hide = React.useCallback(() => setHide(true), [setHide]);

  const title = React.useMemo(
    () => options.find((o) => o.key === selected)?.value,
    [options, selected]
  );

  useHide(ref, hide);

  const handleDropdown = React.useCallback(
    () => disabled || setHide((state) => !state),
    [disabled]
  );

  const handleChange = React.useCallback(
    (key: number | string) => {
      hide();
      onChange(key);
    },
    [hide, onChange]
  );

  return (
    <div className={styles.root} ref={ref}>
      <Input
        className={styles.root__input}
        value={title ?? ''}
        placeholder={placeholder}
        onClick={handleDropdown}
        onChange={() => {}}
        readOnly
        disabled={disabled}
      />
      {disabled || isHidden ? null : (
        <List
          className={styles.root__list}
          options={options}
          selected={selected}
          onChange={handleChange}
        />
      )}
    </div>
  );
};

export default React.memo(Select);
