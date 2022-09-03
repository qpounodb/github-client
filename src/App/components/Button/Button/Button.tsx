import { joinClassName } from '~/shared/utils';
import { withButton } from '../withButton';
import styles from './Button.module.scss';

export const Button = withButton(
  ({ loading, size }) =>
    joinClassName(
      size && styles[`root_size-${size}`],
      loading && styles.root_loading
    ),
  ({ loading, loader, children }) => {
    return (
      <>
        {loading && loader}
        {children}
      </>
    );
  }
);
