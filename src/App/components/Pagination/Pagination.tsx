import React from 'react';
import { ButtonColor, ButtonSize, SquareButton } from '../Button';
import styles from './Pagination.module.scss';

export type PaginationProps = {
  onChange: (page: number) => void;
  page: number;
  count: number;
  loading?: boolean;
};

export const Pagination: React.FC<PaginationProps> = ({
  onChange,
  page,
  count,
  loading = false,
}) => {
  const decor = {
    color: ButtonColor.secondary,
    size: ButtonSize.m,
    loading,
  };

  const onPrev = () => {
    if (loading || page < 2) return;
    onChange(page - 1);
  };

  const onNext = () => {
    if (loading || page >= count) return;
    onChange(page + 1);
  };

  return (
    <div className={styles.main}>
      <SquareButton {...decor} onClick={onPrev} disabled={page < 2}>
        {'<'}
      </SquareButton>
      <div className={styles.counter}>{`${page} / ${count}`}</div>
      <SquareButton {...decor} onClick={onNext} disabled={page >= count}>
        {'>'}
      </SquareButton>
    </div>
  );
};
