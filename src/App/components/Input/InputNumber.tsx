import React from 'react';
import { joinClassName } from '~/shared/utils';
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
  value,
  onChange,
  onSubmit,
  size = InputSize.l,
  ...rest
}) => {
  const cls = joinClassName(
    styles.main,
    styles[`size_${size}`],
    rest.className
  );

  const handler = (value: string) => {
    const x = Number(value);
    const min = Number(rest.min);
    const max = Number(rest.max);

    if (!isNaN(min) && min > x) {
      onChange(min);
      return;
    }
    if (!isNaN(max) && max < x) {
      onChange(max);
      return;
    }
    onChange(x);
  };

  return (
    <Input
      {...rest}
      size={size}
      className={cls}
      type="number"
      value={String(value)}
      onChange={handler}
      onSubmit={(x) => onSubmit?.(Number(x))}
    />
  );
};
