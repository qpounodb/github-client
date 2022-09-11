import { render, screen } from '@testing-library/react';
import { WithLoader } from '~/App/components/WithLoader';
import { Locators } from '~/__test__/constants';

describe('Тестирование компонента WithLoader', () => {
  test('При передаче loading=true отображается Loader', () => {
    const { rerender } = render(
      <WithLoader loading>
        <div>content</div>
      </WithLoader>
    );

    const loaderElement = screen.getByTestId(Locators.LOADER);

    expect(loaderElement.className).toContain('loading');

    rerender(
      <WithLoader loading={false}>
        <div>content</div>
      </WithLoader>
    );

    expect(loaderElement.className).not.toContain('loading');
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
