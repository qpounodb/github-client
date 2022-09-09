import React from 'react';
import { PropsWithClassName } from '~/shared/types';
import { joinClassName, not } from '~/shared/utils';
import { Option } from '../../Option';
import { Item } from '../Item';
import styles from './List.module.scss';

export type ListProps = PropsWithClassName<{
  options: Option[];
  selected: Option[];
  onChange: (selected: Option[]) => void;
}>;

const equalTo = (a: Option) => (b: Option) => a.key === b.key;

const List: React.FC<ListProps> = ({
  options,
  selected,
  onChange,
  className,
}) => {
  const selectedSet = React.useMemo(
    () => new Set(selected.map(({ key }) => key)),
    [selected]
  );

  const handleChange = React.useCallback(
    (option: Option, isSelected: boolean) => {
      const isChanged = equalTo(option);
      onChange(
        isSelected
          ? selected.filter(not(isChanged))
          : options.filter((o) => isChanged(o) || selectedSet.has(o.key))
      );
    },
    [onChange, options, selected, selectedSet]
  );

  return (
    <div className={joinClassName(styles.root, className)}>
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

export default React.memo(List);