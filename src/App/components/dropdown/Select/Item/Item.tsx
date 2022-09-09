import React from 'react';
import { joinClassName } from '~/shared/utils';
import { Option } from '../../Option';
import styles from './Item.module.scss';

export type ItemProps = {
  option: Option;
  isSelected: boolean;
  onChange: (key: number | string, isSelected: boolean) => void;
};

const Item: React.FC<ItemProps> = ({ option, isSelected, onChange }) => {
  const handleClick = React.useCallback(
    () => onChange(option.key, isSelected),
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
