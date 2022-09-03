import React from 'react';
import { classname } from '~/shared/utils';
import style from './CheckBox.module.scss';

type InputHTMLProps = React.InputHTMLAttributes<HTMLInputElement>;
type InputChangeHandler = React.ChangeEventHandler<HTMLInputElement>;

export type CheckBoxProps = Omit<InputHTMLProps, 'onChange'> & {
  onChange: (value: boolean) => void;
};

export const CheckBox: React.FC<CheckBoxProps> = ({ onChange, ...rest }) => {
  const handler: InputChangeHandler = (e) => onChange(e.currentTarget.checked);

  return (
    <input
      {...rest}
      type="checkbox"
      className={classname(style.root, rest.className)}
      onChange={handler}
    />
  );
};
