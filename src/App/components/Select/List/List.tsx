import React from 'react';
import { PropsWithClassName } from '~/shared/types';
import { isSome, joinClassName } from '~/shared/utils';
import { Item } from '../Item';
import { Option } from '../types';
import styles from './List.module.scss';

export type ListProps = PropsWithClassName<{
  options: Option[];
  selected: number | string | null;
  onChange: (key: number | string) => void;
}>;

const List: React.FC<ListProps> = ({
  options,
  selected,
  onChange,
  className,
}) => {
  return (
    <div className={joinClassName(styles.root, className)}>
      {options.map((option) => (
        <Item
          key={option.key}
          option={option}
          isSelected={isSome(selected) && selected === option.key}
          onChange={onChange}
        />
      ))}
    </div>
  );
};

export default React.memo(List);
