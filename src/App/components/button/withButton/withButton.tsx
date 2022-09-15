import React from 'react';

import { Loader } from '~components/Loader';
import { Color, invert, Size } from '~constants';
import type { Nullable, PropsWithChildrenAndClassName } from '~types';
import { getDisplayName, joinClassName } from '~utils';

import styles from './withButton.module.scss';

export type ButtonProps = {
  color?: Color;
  size?: Size;
  loading?: boolean;
};

export type ButtonReactProps = PropsWithChildrenAndClassName<ButtonProps>;
export type ButtonHTMLProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonComponentProps = ButtonReactProps & ButtonHTMLProps;
export type InnerComponentProps = ButtonReactProps & { loader?: JSX.Element };

export type ButtonComponent = React.FC<ButtonComponentProps>;
export type InnerComponent = React.FC<InnerComponentProps>;
export type GetClassName = (props: ButtonProps) => Nullable<string | boolean>;

export const withButton = (
  getClassName: GetClassName,
  Inner: InnerComponent
): ButtonComponent => {
  const Button: ButtonComponent = ({
    color = Color.primary,
    size = Size.l,
    loading = false,
    children,
    className: subClassName,
    ...rest
  }: ButtonComponentProps) => {
    const loader = React.useMemo(
      () => (
        <Loader
          loading={loading}
          size={Size.s}
          color={color && invert(color)}
          className={styles.root__loader}
        />
      ),
      [color, loading]
    );

    return (
      <button
        {...rest}
        disabled={rest.disabled || loading}
        className={joinClassName(
          styles.root,
          styles[`root_${color}`],
          styles[`root_size-${size}`],
          loading && styles.root_loading,
          getClassName({ color, size, loading }),
          subClassName
        )}
      >
        <Inner {...{ color, size, loading, loader }}>{children}</Inner>
      </button>
    );
  };

  Button.displayName = getDisplayName('Button', Inner);
  return React.memo(Button);
};
