import React from 'react';

import { joinClassName } from '~utils';

import { Input, InputProps } from '../Input';

import styles from './InputNumber.module.scss';

export type InputNumberProps = InputProps;

const InputNumber: React.FC<InputNumberProps> = (props) => {
  return (
    <Input
      {...props}
      className={joinClassName(styles.root, props.className)}
      type="number"
    />
  );
};

export default React.memo(InputNumber);
