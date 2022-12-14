import React from 'react';

import { joinClassName } from '~utils';

import { Option } from '../../../types';

import styles from './Item.module.scss';

export type ItemProps = {
  option: Option;
  isSelected: boolean;
  onChange: (option: Option, isSelected: boolean) => void;
};

const Item: React.FC<ItemProps> = ({ option, isSelected, onChange }) => {
  const handleClick = React.useCallback(
    () => onChange(option, isSelected),
    [isSelected, onChange, option]
  );

  return (
    <div
      className={joinClassName(styles.root, isSelected && styles.root_selected)}
      onClick={handleClick}
    >
      {option.value}
    </div>
  );
};

export default React.memo(Item);
