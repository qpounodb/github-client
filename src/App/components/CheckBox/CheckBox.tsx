import React from 'react';

import { joinClassName } from '~utils';

import style from './CheckBox.module.scss';

type InputHTMLProps = React.InputHTMLAttributes<HTMLInputElement>;
type InputChangeHandler = React.ChangeEventHandler<HTMLInputElement>;

export type CheckBoxProps = Omit<InputHTMLProps, 'onChange'> & {
  label?: string;
  onChange: (value: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({
  label,
  onChange,
  disabled,
  ...rest
}) => {
  const refInput = React.useRef<HTMLInputElement | null>(null);

  const changeHandler: InputChangeHandler = React.useCallback(
    (e) => onChange(e.currentTarget.checked),
    [onChange]
  );

  return (
    <label
      className={joinClassName(
        style.root,
        disabled && style.root_disabled,
        rest.className
      )}
      onMouseDown={(e) => e.preventDefault()}
    >
      <input
        {...rest}
        ref={refInput}
        type="checkbox"
        className={joinClassName(style.root__checkbox)}
        disabled={disabled}
        onChange={changeHandler}
      />
      {label}
    </label>
  );
};

export default React.memo(CheckBox);
