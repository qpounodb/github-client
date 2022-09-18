import React from 'react';

import { SquareButton } from '~components/button';
import { InputNumber } from '~components/input';
import { Color, Size } from '~constants';

import styles from './Pagination.module.scss';

export type PaginationProps = {
  onSubmit: (page: number) => void;
  page?: number;
  count: number;
  disabled?: boolean;
};

const Pagination: React.FC<PaginationProps> = ({
  onSubmit,
  page = 1,
  count,
  disabled = false,
}) => {
  const [input, setInput] = React.useState(page);

  React.useEffect(() => {
    setInput(page);
  }, [page]);

  if (count < 1) return null;

  const isFirst = page < 2;
  const isLast = page >= count;

  const decor = {
    color: Color.secondary,
    size: Size.m,
  };

  const onInput = (value: number) => {
    if (disabled) return;
    setInput(value);
  };

  const onPrev = () => {
    if (disabled || page < 2) return;
    onSubmit(page - 1);
  };

  const onNext = () => {
    if (disabled || page >= count) return;
    onSubmit(page + 1);
  };

  return (
    <div className={styles.root}>
      <SquareButton {...decor} onClick={onPrev} disabled={disabled || isFirst}>
        {isFirst ? '#' : '<'}
      </SquareButton>
      <div className={styles.root__counter}>
        <InputNumber
          value={input}
          min={1}
          max={count}
          onChange={onInput}
          onSubmit={onSubmit}
          className={styles.root__input}
          disabled={disabled}
        />
        {' / '}
        {count}
      </div>
      <SquareButton {...decor} onClick={onNext} disabled={disabled || isLast}>
        {isLast ? '#' : '>'}
      </SquareButton>
    </div>
  );
};

export default React.memo(Pagination);
