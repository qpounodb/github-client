import React from 'react';

import { Size } from '~/App/constants';
import { joinClassName } from '~/shared/utils';

import { Input, InputProps } from '../Input';

import styles from './InputNumber.module.scss';

export type InputNumberProps = Omit<
  InputProps,
  'value' | 'onChange' | 'onSubmit'
> & {
  value: number;
  onChange: (value: number) => void;
  onSubmit?: (value: number) => void;
};

const InputNumber: React.FC<InputNumberProps> = ({
  value,
  onChange,
  onSubmit,
  size = Size.l,
  ...rest
}) => {
  const handlerChange = React.useCallback(
    (value: string) => {
      onChange(Number(value));
    },
    [onChange]
  );

  const handlerSubmit = React.useCallback(
    (value: string) => {
      if (!onSubmit) return;
      const x = Number(value);
      const min = Number(rest.min);
      const max = Number(rest.max);

      if (!isNaN(min) && min > x) {
        onSubmit(min);
        return;
      }
      if (!isNaN(max) && max < x) {
        onSubmit(max);
        return;
      }
      onSubmit(x);
    },
    [onSubmit, rest.max, rest.min]
  );

  return (
    <Input
      {...rest}
      size={size}
      className={joinClassName(
        styles.root,
        styles[`root_size-${size}`],
        rest.className
      )}
      type="number"
      value={String(value)}
      onChange={handlerChange}
      onSubmit={handlerSubmit}
    />
  );
};

export default React.memo(InputNumber);
