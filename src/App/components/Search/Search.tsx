import React from 'react';

import { IconSearch } from '~assets/icons';
import { SquareButton } from '~components/button';
import { Input } from '~components/input';

import styles from './Search.module.scss';

export type SearchProps = {
  value?: string;
  placeholder: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
};

const Search: React.FC<SearchProps> = ({
  value = '',
  placeholder,
  disabled = false,
  onChange,
  onSubmit,
}) => {
  const handleSubmit = React.useCallback(
    () => !disabled && onSubmit(value),
    [disabled, onSubmit, value]
  );

  return (
    <div className={styles.root}>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onSubmit={handleSubmit}
      />
      <SquareButton onClick={handleSubmit} disabled={disabled}>
        <IconSearch className={styles.root__icon} />
      </SquareButton>
    </div>
  );
};

export default React.memo(Search);
