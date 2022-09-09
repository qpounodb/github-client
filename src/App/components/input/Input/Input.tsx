import React from 'react';
import { Size } from '~/App/constants';
import { joinClassName } from '~/shared/utils';
import styles from './Input.module.scss';

type InputHTMLProps = React.InputHTMLAttributes<HTMLInputElement>;
type InputChangeHandler = React.ChangeEventHandler<HTMLInputElement>;

export type InputProps = Omit<
  InputHTMLProps,
  'value' | 'onChange' | 'onSubmit' | 'size'
> & {
  value?: string | number;
  size?: Size;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
};

const Input: React.FC<InputProps> = ({
  onChange,
  onSubmit,
  type = 'text',
  size = Size.l,
  value = '',
  ...rest
}) => {
  const handler: InputChangeHandler = React.useCallback(
    (e) => onChange(e.target.value),
    [onChange]
  );

  const handleEnter: React.KeyboardEventHandler = React.useCallback(
    (e) => {
      if (e.key !== 'Enter') return;
      onSubmit?.(String(value));
    },
    [onSubmit, value]
  );

  return (
    <input
      {...rest}
      className={joinClassName(
        styles.root,
        styles[`root_size-${size}`],
        rest.className
      )}
      type={type}
      onChange={handler}
      onKeyDown={handleEnter}
    />
  );
};

export default React.memo(Input);
