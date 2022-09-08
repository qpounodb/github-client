import React from 'react';
import { IconSearch } from '~/App/assets/icons';
import { SquareButton } from '../Button';
import { Input } from '../Input';
import styles from './Search.module.scss';

export type SearchProps = {
  value: string;
  placeholder: string;
  loading?: boolean;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
};

const Search: React.FC<SearchProps> = ({
  value,
  placeholder,
  loading = false,
  onChange,
  onSubmit,
}) => {
  const handleSubmit = React.useCallback(
    () => onSubmit(value),
    [onSubmit, value]
  );

  return (
    <div className={styles.root}>
      <Input
        placeholder={placeholder}
        value={value}
        disabled={loading}
        onChange={onChange}
        onSubmit={handleSubmit}
      />
      <SquareButton onClick={handleSubmit} loading={loading}>
        <IconSearch className={styles.root__icon} />
      </SquareButton>
    </div>
  );
};

export default React.memo(Search);
