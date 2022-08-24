import React from 'react';
import { Loader, LoaderSize } from '~/App/components/Loader';
import { classname } from '~/shared/utils';
import { BaseButton, BaseButtonProps } from './BaseButton';
import './Button.scss';

export type ButtonProps = { loading?: boolean } & BaseButtonProps;

export const Button: React.FC<ButtonProps> = ({
  className = '',
  loading = false,
  children,
  ...rest
}) => {
  const disabled = rest.disabled || loading;

  const cls = classname({
    button_loading: loading,
    [className]: className.length > 0,
  });

  return (
    <BaseButton {...rest} disabled={disabled} className={cls}>
      {loading && (
        <div>
          <Loader size={LoaderSize.s} className={'button__loader'} />
        </div>
      )}
      <div>{children}</div>
    </BaseButton>
  );
};
