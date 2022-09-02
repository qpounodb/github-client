import React from 'react';
import { classname, not, PropsWithClassName } from '~/shared/utils';
import { Item } from '../Item';
import { Option } from '../types';
import styles from './List.module.scss';

export type ListProps = PropsWithClassName<{
  options: Option[];
  selected: Option[];
  onChange: (selected: Option[]) => void;
}>;

const equalTo = (a: Option) => (b: Option) => a.key === b.key;

export const List: React.FC<ListProps> = ({
  options,
  selected,
  onChange,
  className,
}) => {
  const selectedSet = React.useMemo(
    () => new Set(selected.map(({ key }) => key)),
    [selected]
  );

  const handleChange = (option: Option, isSelected: boolean) => {
    const isChanged = equalTo(option);
    onChange(
      isSelected
        ? selected.filter(not(isChanged))
        : options.filter((o) => isChanged(o) || selectedSet.has(o.key))
    );
  };

  return (
    <div className={classname(styles.root, className)}>
      {options.map((option) => (
        <Item
          key={option.key}
          option={option}
          isSelected={selectedSet.has(option.key)}
          onChange={handleChange}
        />
      ))}
    </div>
  );
};
