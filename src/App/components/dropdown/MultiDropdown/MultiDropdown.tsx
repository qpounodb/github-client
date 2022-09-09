import React, { useState } from 'react';
import { Input } from '~/App/components/input';
import { useHide } from '~/shared/hooks';
import { Option } from '../Option';
import { List } from './List';
import styles from './MultiDropdown.module.scss';

export type MultiDropdownProps = {
  options: Option[];
  selected: Option[];
  onChange: (selected: Option[]) => void;
  disabled?: boolean;
  pluralizeOptions: (value: Option[]) => string;
  placeholder?: string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  selected,
  disabled,
  pluralizeOptions,
  placeholder = '',
  ...rest
}) => {
  const ref = React.useRef<HTMLDivElement | null>(null);

  const [isHidden, setHide] = useState<boolean>(true);

  const title = React.useMemo(
    () => pluralizeOptions(selected),
    [selected, pluralizeOptions]
  );

  const hide = React.useCallback(() => setHide(true), [setHide]);

  useHide(ref, hide);

  const handleDropdown = React.useCallback(
    () => disabled || setHide((state) => !state),
    [disabled]
  );

  return (
    <div className={styles.root} ref={ref}>
      <Input
        className={styles.root__input}
        value={title}
        placeholder={placeholder}
        onClick={handleDropdown}
        onChange={() => {}}
        readOnly
        disabled={disabled}
      />
      {disabled || isHidden ? null : (
        <List {...rest} selected={selected} className={styles.root__list} />
      )}
    </div>
  );
};

export default React.memo(MultiDropdown);
