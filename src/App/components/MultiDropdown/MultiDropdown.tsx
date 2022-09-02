import React, { useState } from 'react';
import { Input } from '~/App/components/Input';
import { useHide } from '~/shared/hooks';
import { List } from './List';
import styles from './MultiDropdown.module.scss';
import { Option } from './types';

export type MultiDropdownProps = {
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, массив может быть пустым */
  selected: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (selected: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Преобразовать выбранные значения в строку. Отображается в дропдауне в качестве выбранного значения */
  pluralizeOptions: (value: Option[]) => string;
  /** Отображается в дропдауне когда ничего не выбранно */
  placeholder?: string;
};

export const MultiDropdown: React.FC<MultiDropdownProps> = ({
  selected,
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

  const handleDropdown = () => disabled || setHide((state) => !state);

  return (
    <div className={styles.main} ref={ref}>
      <Input
        className={styles.input}
        value={title}
        placeholder={placeholder}
        onClick={handleDropdown}
        onChange={() => {}}
        readOnly
        disabled={disabled}
      />
      {disabled || isHidden ? null : (
        <List {...rest} selected={selected} className={styles.list} />
      )}
    </div>
  );
};
