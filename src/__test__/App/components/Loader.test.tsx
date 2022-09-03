import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Loader } from '~/App/components/Loader';
import { Size } from '~/App/constants';
import { Locators } from '~/__test__/constants';

describe('Тестирование компонента Loader', () => {
  test('По умолчанию применяется класс loading', () => {
    render(<Loader />);
    const loader = screen.getByTestId(Locators.LOADER);
    expect(loader.className).toContain('loading');
  });

  test('При передаче loading=false не применяется класс loading', () => {
    render(<Loader loading={false} />);
    const loader = screen.getByTestId(Locators.LOADER);
    expect(loader.className).not.toContain('loading');
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
    expect(loader.className).toContain('size-m');
  });

  test('При изменении size изменяется и className', () => {
    const { rerender } = render(<Loader />);
    const loader = screen.getByTestId(Locators.LOADER);
    expect(loader.className).toContain('size-m');

    rerender(<Loader size={Size.s} />);
    expect(loader.className).toContain('size-s');
  });
});
