import React from 'react';
import { Loader } from '~/App/components/Loader';
import { Color, invert, Size } from '~/App/constants';
import { classname, Nullable } from '~/shared/utils';
import styles from './withButton.module.scss';

export type ButtonProps = {
  color?: Color;
  size?: Size;
  loading?: boolean;
};

type ButtonReactProps = React.PropsWithChildren<ButtonProps>;
type ButtonHTMLProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const withButton = (
  getClassName: (props: ButtonProps) => Nullable<string | boolean>,
  Component: React.FC<ButtonReactProps & { loader?: JSX.Element }>
): React.FC<ButtonReactProps & ButtonHTMLProps> => {
  return ({
    color = Color.primary,
    size = Size.l,
    loading = false,
    children,
    className: subClassName,
    ...rest
  }) => {
    const disabled = rest.disabled || loading;

    const loader = (
      <Loader
        loading={loading}
        size={Size.s}
        color={color && invert(color)}
        className={styles.root__loader}
      />
    );

    return (
      <button
        {...rest}
        disabled={disabled}
        className={classname(
          styles.root,
          styles[`root_${color}`],
          styles[`root_size-${size}`],
          loading && styles.root_loading,
          getClassName({ color, size, loading }),
          subClassName
        )}
      >
        <Component {...{ color, size, loading, loader }}>{children}</Component>
      </button>
    );
  };
};
