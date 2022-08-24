import React from 'react';
import { classname } from '~/shared/utils';
import styles from './BaseButton.module.scss';

export enum ButtonColor {
  primary = 'primary',
  secondary = 'secondary',
}

type ButtonColorProps = React.PropsWithChildren<{ color?: ButtonColor }>;
type ButtonHTMLProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export type BaseButtonProps = ButtonColorProps & ButtonHTMLProps;

export const BaseButton: React.FC<BaseButtonProps> = ({
  color = ButtonColor.primary,
  className = '',
  children,
  ...rest
}) => {
  const cls = classname(styles.button, styles[color], className);

  return (
    <button {...rest} className={cls}>
      {children}
    </button>
  );
};
