import React from 'react';

import { joinClassName } from '~/shared/utils';

import style from './CheckBox.module.scss';

type InputHTMLProps = React.InputHTMLAttributes<HTMLInputElement>;
type InputChangeHandler = React.ChangeEventHandler<HTMLInputElement>;

export type CheckBoxProps = Omit<InputHTMLProps, 'onChange'> & {
  onChange: (value: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({ onChange, ...rest }) => {
  const handler: InputChangeHandler = React.useCallback(
    (e) => onChange(e.currentTarget.checked),
    [onChange]
  );

  return (
    <input
      {...rest}
      type="checkbox"
      className={joinClassName(style.root, rest.className)}
      onChange={handler}
    />
  );
};

export default React.memo(CheckBox);
