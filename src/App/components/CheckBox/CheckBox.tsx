import React from 'react';
import { classname } from '~/shared/utils';
import style from './CheckBox.module.scss';

type InputHTMLProps = React.InputHTMLAttributes<HTMLInputElement>;
type InputChangeHandler = React.ChangeEventHandler<HTMLInputElement>;

export type CheckBoxProps = Omit<InputHTMLProps, 'onChange'> & {
  onChange: (value: boolean) => void;
};

export const CheckBox: React.FC<CheckBoxProps> = ({ onChange, ...rest }) => {
  const cls = classname(style.checkbox, rest.className);

  const handler: InputChangeHandler = (e) => onChange(e.currentTarget.checked);

  return <input {...rest} className={cls} type="checkbox" onChange={handler} />;
};
