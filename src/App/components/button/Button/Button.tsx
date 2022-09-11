import { joinClassName } from '~/shared/utils';
import { GetClassName, InnerComponent, withButton } from '../withButton';
import styles from './Button.module.scss';

const getClassName: GetClassName = ({ loading, size }) => {
  return joinClassName(
    size && styles[`root_size-${size}`],
    loading && styles.root_loading
  );
};

const Default: InnerComponent = ({ loading, loader, children }) => {
  return (
    <>
      {loading && loader}
      {children}
    </>
  );
};

export const Button = withButton(getClassName, Default);
