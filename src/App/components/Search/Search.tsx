import React from 'react';
import { SearchButton } from '../Button';
import { Input } from '../Input';
import styles from './Search.module.scss';

export type SearchProps = {
  value: string;
  placeholder: string;
  loading?: boolean;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
};

export const Search: React.FC<SearchProps> = ({
  value,
  placeholder,
  loading = false,
  onChange,
  onSubmit,
}) => {
  const handleSubmit = () => onSubmit(value);

  return (
    <div className={styles.main}>
      <Input
        placeholder={placeholder}
        value={value}
        disabled={loading}
        onChange={onChange}
        onSubmit={handleSubmit}
      />
      <SearchButton onClick={handleSubmit} loading={loading} />
    </div>
  );
};