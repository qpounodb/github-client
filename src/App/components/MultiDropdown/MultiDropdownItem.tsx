import React from 'react';
import { classname } from '~/shared/utils';
import styles from './MultiDropdown.module.scss';
import { MultiDropdownItemProps } from './types';

export const MultiDropdownItem: React.FC<MultiDropdownItemProps> = ({
  option,
  isSelected,
  onChange,
}) => {
  const cls = classname(styles.item, isSelected && styles.item_selected);

  const handleClick = () => onChange(option, isSelected);

  return (
    <div className={cls} onClick={handleClick}>
      {option.value}
    </div>
  );
};
