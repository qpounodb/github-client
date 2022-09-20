import React from 'react';

import { PaginationProps } from '../types';

export const usePagination = ({
  onSubmit,
  page,
  count,
  disabled,
  setInput,
}: Required<PaginationProps> & {
  setInput: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const onPrev = React.useCallback(() => {
    if (disabled || page < 2) return;
    onSubmit(page - 1);
  }, [disabled, onSubmit, page]);

  const onNext = React.useCallback(() => {
    if (disabled || page >= count) return;
    onSubmit(page + 1);
  }, [count, disabled, onSubmit, page]);

  const onFirst = React.useCallback(() => {
    if (disabled || page < 2) return;
    onSubmit(1);
  }, [disabled, onSubmit, page]);

  const onLast = React.useCallback(() => {
    if (disabled || page >= count) return;
    onSubmit(count);
  }, [count, disabled, onSubmit, page]);

  const onInputChange = React.useCallback(
    (value: string) => {
      if (disabled) return;
      setInput(value);
    },
    [disabled, setInput]
  );

  const onInputSubmit = React.useCallback(
    (value: string) => {
      const x = Number(value);

      if (disabled) return;

      if (x === page) {
        setInput(String(x));
        return;
      }

      if (x < 1) {
        if (page !== 1) {
          onSubmit(1);
        } else {
          setInput(String(1));
        }
        return;
      }

      if (x > count) {
        if (page !== count) {
          onSubmit(count);
        } else {
          setInput(String(count));
        }
        return;
      }

      onSubmit(x);
    },
    [count, disabled, onSubmit, page, setInput]
  );

  return { onPrev, onNext, onFirst, onLast, onInputChange, onInputSubmit };
};
