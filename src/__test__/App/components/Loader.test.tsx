import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { Loader } from '~components/Loader';
import styles from '~components/Loader/Loader.module.scss';
import { Size } from '~constants';
import { Locators } from '~tests/constants';

describe('Тестирование компонента Loader', () => {
  test('По умолчанию применяется класс loading', () => {
    render(<Loader />);
    const loader = screen.getByTestId(Locators.LOADER);
    expect(loader).toHaveClass(styles.root_loading);
  });

  test('При передаче loading=false не применяется класс loading', () => {
    render(<Loader loading={false} />);
    const loader = screen.getByTestId(Locators.LOADER);
    expect(loader).not.toHaveClass(styles.root_loading);
  });

  test('Переданный className добавляется в список классов лоадера', () => {
    const testClassName = 'test-class';
    render(<Loader className={testClassName} />);
    const loader = screen.getByTestId(Locators.LOADER);
    expect(loader).toHaveClass(testClassName);
  });

  test('По умолчанию LoaderSize.m', () => {
    render(<Loader />);
    const loader = screen.getByTestId(Locators.LOADER);
    expect(loader).toHaveClass(styles['root_size-m']);
  });

  test('При изменении size изменяется и className', () => {
    const { rerender } = render(<Loader />);
    const loader = screen.getByTestId(Locators.LOADER);
    expect(loader).toHaveClass(styles['root_size-m']);

    rerender(<Loader size={Size.s} />);
    expect(loader).toHaveClass(styles['root_size-s']);
  });
});
