import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Loader, LoaderSize } from '~/App/components/Loader';
import { Locators } from '~/__test__/constants';

describe('Тестирование компонента Loader', () => {
  test('По умолчанию рендерится в один html-элемент (возможны потомки)', () => {
    const { container } = render(<Loader />);
    expect(container.childElementCount).toBe(1);
  });

  test('При передаче loading=false не рендерится ни один html-элемент', () => {
    const { container } = render(<Loader loading={false} />);
    expect(container).toBeEmptyDOMElement();
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
    expect(loader.className).toContain('size_m');
  });

  test('При изменении size изменяется и className', () => {
    const { rerender } = render(<Loader />);
    const loader = screen.getByTestId(Locators.LOADER);
    expect(loader.className).toContain('size_m');

    rerender(<Loader size={LoaderSize.s} />);
    expect(loader.className).toContain('size_s');
  });
});
