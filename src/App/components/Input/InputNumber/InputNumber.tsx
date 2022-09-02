import React from 'react';
import { Size } from '~/App/constants';
import { classname } from '~/shared/utils';
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

export const InputNumber: React.FC<InputNumberProps> = ({
  value,
  onChange,
  onSubmit,
  size = Size.l,
  ...rest
}) => {
  const handlerChange = (value: string) => {
    onChange(Number(value));
  };

  const handlerSubmit = (value: string) => {
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
  };

  return (
    <Input
      {...rest}
      size={size}
      className={classname(
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
