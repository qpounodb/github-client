import React from 'react';

import { PropsWithClassName } from '~/shared/types';
import { joinClassName } from '~/shared/utils';

import { Option } from '../../Option';
import { Item } from '../Item';

import styles from './List.module.scss';

export type ListProps = PropsWithClassName<{
  options: Option[];
  isSelected: (option: Option) => boolean;
  onChange: (option: Option, isSelected: boolean) => void;
}>;

const List: React.FC<ListProps> = ({
  options,
  isSelected,
  onChange,
  className,
}) => {
  return (
    <div className={joinClassName(styles.root, className)}>
      {options.map((option) => (
        <Item
          key={option.key}
          option={option}
          isSelected={isSelected(option)}
          onChange={onChange}
        />
      ))}
    </div>
  );
};

export default React.memo(List);
