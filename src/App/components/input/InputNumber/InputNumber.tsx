import React from 'react';

import { Size } from '~constants';
import { joinClassName } from '~utils';

import { Input, InputProps } from '../Input';

import styles from './InputNumber.module.scss';

export type InputNumberProps = Omit<
  InputProps,
  'value' | 'onChange' | 'onSubmit'
> & {
  value?: number;
  onChange?: (value: number) => void;
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
    (value: string) => onChange?.(Number(value)),
    [onChange]
  );

  const handlerSubmit = React.useCallback(
    (value: string) => onSubmit?.(Number(value)),
    [onSubmit]
  );

  return (
    <Input
      {...rest}
      size={size}
      className={joinClassName(styles.root, rest.className)}
      type="number"
      value={value}
      onChange={handlerChange}
      onSubmit={handlerSubmit}
    />
  );
};

export default React.memo(InputNumber);
