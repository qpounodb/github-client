import { render, screen } from '@testing-library/react';

import styles from '~components/Loader/Loader.module.scss';
import { WithLoader } from '~components/WithLoader';
import { Locators } from '~tests/constants';

describe('Тестирование компонента WithLoader', () => {
  test('При передаче loading=true отображается Loader', () => {
    const { rerender } = render(
      <WithLoader loading>
        <div>content</div>
      </WithLoader>
    );

    const loaderElement = screen.getByTestId(Locators.LOADER);

    expect(loaderElement).toHaveClass(styles.root_loading);

    rerender(
      <WithLoader loading={false}>
        <div>content</div>
      </WithLoader>
    );

    expect(loaderElement).not.toHaveClass(styles.root_loading);
  });

  test('Изменение children', () => {
    const { rerender } = render(
      <WithLoader loading={false}>
        <div data-testid="with-loader-old-content">old content</div>
      </WithLoader>
    );

    const contentEl = screen.getByTestId('with-loader-old-content');
    expect(contentEl).toBeVisible();

    rerender(
      <WithLoader loading={false}>
        <div data-testid="with-loader-new-content">content</div>
      </WithLoader>
    );

    const newContentEl = screen.getByTestId('with-loader-new-content');

    expect(newContentEl).toBeVisible();
  });
});
