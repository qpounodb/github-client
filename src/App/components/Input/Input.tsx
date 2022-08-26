import React from 'react';
import { classname } from '~/shared/utils';
import styles from './Input.module.scss';

type InputHTMLProps = React.InputHTMLAttributes<HTMLInputElement>;
type InputChangeHandler = React.ChangeEventHandler<HTMLInputElement>;

export type InputProps = Omit<InputHTMLProps, 'value' | 'onChange'> & {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
};

export const Input: React.FC<InputProps> = ({
  onChange,
  onSubmit,
  ...rest
}) => {
  const cls = classname(styles.input, rest.className);

  const handler: InputChangeHandler = (e) => onChange(e.target.value);

  const handleEnter: React.KeyboardEventHandler = (e) => {
    if (e.key !== 'Enter') return;
    onSubmit?.(rest.value);
  };

  return (
    <input
      {...rest}
      className={cls}
      type="text"
      onChange={handler}
      onKeyDown={handleEnter}
    />
  );
};
