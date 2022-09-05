import React from 'react';
import { joinClassName } from '~/shared/utils';
import { Option } from '../types';
import styles from './Item.module.scss';

export type ItemProps = {
  option: Option;
  isSelected: boolean;
  onChange: (option: Option, isSelected: boolean) => void;
};

export const Item: React.FC<ItemProps> = React.memo(
  ({ option, isSelected, onChange }) => {
    const handleClick = React.useCallback(
      () => onChange(option, isSelected),
      [isSelected, onChange, option]
    );

    return (
      <div
        className={joinClassName(
          styles.root,
          isSelected && styles.root_selected
        )}
        onClick={handleClick}
      >
        {option.value}
      </div>
    );
  }
);
