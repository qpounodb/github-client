import React from 'react';
import { ButtonColor, ButtonSize, SquareButton } from '../Button';
import styles from './Pagination.module.scss';

export type PaginationProps = {
  onPrev: () => void;
  onNext: () => void;
  page: number;
  count: number;
  loading?: boolean;
};

export const Pagination: React.FC<PaginationProps> = ({
  onPrev,
  onNext,
  page,
  count,
  loading = false,
}) => {
  const decor = {
    color: ButtonColor.secondary,
    size: ButtonSize.m,
    loading,
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
