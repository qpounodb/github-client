import React from 'react';

import { Option, Select } from '../dropdown';
import { OrderSwitcher } from '../OrderSwitcher';

import styles from './SortSelect.module.scss';

type Props = {
  options: Option[];
  selected?: Option;
  asc: boolean;
  onSortChange: (option: Option) => void;
  onOrderChange: (asc: boolean) => void;
  disabled?: boolean;
};

const SortSelect: React.FC<Props> = ({
  options,
  selected,
  asc,
  disabled,
  onSortChange,
  onOrderChange,
}) => {
  return (
    <div className={styles.root}>
      <Select
        options={options}
        selected={selected}
        placeholder="Set sort by..."
        onChange={onSortChange}
        disabled={disabled}
      />
      <div className={styles.root__order}>
        <OrderSwitcher asc={asc} onChange={onOrderChange} disabled={disabled} />
      </div>
    </div>
  );
};

export default React.memo(SortSelect);
