import React from 'react';

import { IconPlay, IconSkip } from '~/App/assets/icons';
import { SquareButton } from '~components/button';
import { InputNumber } from '~components/input';
import { Color, Size } from '~constants';
import { joinClassName as join } from '~utils';

import { usePagination } from './hooks';
import s from './Pagination.module.scss';
import { PaginationProps } from './types';

const primary = { color: Color.primary, size: Size.m };

const Pagination: React.FC<PaginationProps> = ({
  onSubmit,
  page = 1,
  count,
  disabled = false,
}) => {
  const [input, setInput] = React.useState(page);

  const [isFirst, isLast] = React.useMemo(
    () => [page <= 1, page >= count],
    [count, page]
  );

  const { onPrev, onNext, onFirst, onLast, onInputChange, onInputSubmit } =
    usePagination({
      onSubmit,
      page,
      count,
      disabled,
      setInput,
    });

  React.useEffect(() => {
    setInput(page);
  }, [page]);

  if (count < 1) return null;

  return (
    <div className={s.root}>
      <SquareButton
        {...primary}
        onClick={onFirst}
        disabled={disabled || isFirst}
      >
        <IconSkip className={join(s.root__icon, s.root__icon_first)} />
      </SquareButton>
      <SquareButton
        {...primary}
        onClick={onPrev}
        disabled={disabled || isFirst}
      >
        <IconPlay className={join(s.root__icon, s.root__icon_prev)} />
      </SquareButton>
      <div className={s.root__counter}>
        <InputNumber
          value={input}
          min={1}
          max={count}
          onChange={onInputChange}
          onSubmit={onInputSubmit}
          className={s.root__input}
          disabled={disabled}
          size={Size.s}
        />
        {' / '}
        {count}
      </div>
      <SquareButton {...primary} onClick={onNext} disabled={disabled || isLast}>
        <IconPlay className={join(s.root__icon, s.root__icon_next)} />
      </SquareButton>
      <SquareButton {...primary} onClick={onLast} disabled={disabled || isLast}>
        <IconSkip className={join(s.root__icon, s.root__icon_last)} />
      </SquareButton>
    </div>
  );
};

export default React.memo(Pagination);
