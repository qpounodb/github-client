import React from 'react';
import { classname } from '~/shared/utils';
import { Option } from '../types';
import styles from './Item.module.scss';

export type ItemProps = {
  option: Option;
  isSelected: boolean;
  onChange: (option: Option, isSelected: boolean) => void;
};

export const Item: React.FC<ItemProps> = ({ option, isSelected, onChange }) => {
  const handleClick = () => onChange(option, isSelected);

  return (
    <div
      className={classname(styles.root, isSelected && styles.root_selected)}
      onClick={handleClick}
    >
      {option.value}
    </div>
  );
};
