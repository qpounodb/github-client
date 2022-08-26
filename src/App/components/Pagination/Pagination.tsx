import React from 'react';
import { ButtonColor, ButtonSize, SquareButton } from '../Button';
import { InputNumber } from '../Input';
import styles from './Pagination.module.scss';

export type PaginationProps = {
  onSubmit: (page: number) => void;
  page: number;
  count: number;
  loading?: boolean;
};

export const Pagination: React.FC<PaginationProps> = ({
  onSubmit,
  page,
  count,
  loading = false,
}) => {
  const [input, setInput] = React.useState(page);

  React.useEffect(() => {
    setInput(page);
  }, [page]);

  if (count < 1) return null;

  const decor = {
    color: ButtonColor.secondary,
    size: ButtonSize.m,
    loading,
  };

  const onInput = (value: number) => {
    if (loading) return;
    setInput(value);
  };

  const onPrev = () => {
    if (loading || page < 2) return;
    onSubmit(page - 1);
  };

  const onNext = () => {
    if (loading || page >= count) return;
    onSubmit(page + 1);
  };

  return (
    <div className={styles.main}>
      <SquareButton {...decor} onClick={onPrev} disabled={page < 2}>
        {'<'}
      </SquareButton>
      <div className={styles.counter}>
        <InputNumber
          value={input}
          min={1}
          max={count}
          step={1}
          onChange={onInput}
          onSubmit={onSubmit}
          className={styles.input}
        />
        {' / '}
        {count}
      </div>
      <SquareButton {...decor} onClick={onNext} disabled={page >= count}>
        {'>'}
      </SquareButton>
    </div>
  );
};
