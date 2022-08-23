import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Loader, LoaderSize } from '../components/Loader/Loader';

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
    const { container } = render(<Loader className={testClassName} />);
    expect(container.firstChild).toHaveClass(testClassName);
  });

  test('По умолчанию LoaderSize.m', () => {
    const testClassName = 'loader_size-m';
    const { container } = render(<Loader />);
    expect(container.firstChild).toHaveClass(testClassName);
  });

  test('При изменении size изменяется и className', () => {
    const { rerender, container } = render(<Loader />);
    expect(container.firstChild).toHaveClass('loader_size-m');

    rerender(<Loader size={LoaderSize.s} />);
    expect(container.firstChild).toHaveClass('loader_size-s');
  });
});
