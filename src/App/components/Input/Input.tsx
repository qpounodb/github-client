import React from 'react';
import { joinClassName } from '~/shared/utils';
import styles from './Input.module.scss';

type InputHTMLProps = React.InputHTMLAttributes<HTMLInputElement>;
type InputChangeHandler = React.ChangeEventHandler<HTMLInputElement>;

export enum InputSize {
  s = 's',
  m = 'm',
  l = 'l',
}

export type InputProps = Omit<
  InputHTMLProps,
  'value' | 'onChange' | 'onSubmit' | 'size'
> & {
  value: string;
  size?: InputSize;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
};

export const Input: React.FC<InputProps> = ({
  onChange,
  onSubmit,
  type = 'text',
  size = InputSize.l,
  ...rest
}) => {
  const cls = joinClassName(
    styles.main,
    styles[`size_${size}`],
    rest.className
  );

  const handler: InputChangeHandler = (e) => onChange(e.target.value);

  const handleEnter: React.KeyboardEventHandler = (e) => {
    if (e.key !== 'Enter') return;
    onSubmit?.(rest.value);
  };

  return (
    <input
      {...rest}
      className={cls}
      type={type}
      onChange={handler}
      onKeyDown={handleEnter}
    />
  );
};
