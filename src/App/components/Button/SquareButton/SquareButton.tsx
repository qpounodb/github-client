import { classname } from '~/shared/utils';
import { withButton } from '../withButton';
import styles from './SquareButton.module.scss';

export const SquareButton = withButton(
  ({ size }) => classname(styles.root, size && styles[`root_size-${size}`]),
  ({ loading, loader, children }) => {
    return <>{loading ? loader : children}</>;
  }
);
