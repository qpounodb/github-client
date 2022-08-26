import React from 'react';
import { classname } from '~/shared/utils';
import { Input, InputProps, InputSize } from './Input';
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
  onChange,
  onSubmit,
  size = InputSize.l,
  ...rest
}) => {
  const cls = classname(styles.main, styles[`size_${size}`], rest.className);

  const handler = (value: string) => onChange(Number(value));

  return (
    <Input
      {...rest}
      size={size}
      className={cls}
      type="number"
      value={''}
      onChange={handler}
      onSubmit={handler}
    />
  );
};
