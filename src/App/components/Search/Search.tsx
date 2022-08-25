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

  const handleEnter: React.KeyboardEventHandler = (e) => {
    if (e.key !== 'Enter') return;
    handleSubmit();
  };

  return (
    <div className={styles.main}>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={loading}
        onKeyDown={handleEnter}
      />
      <SearchButton onClick={handleSubmit} loading={loading} />
    </div>
  );
};
