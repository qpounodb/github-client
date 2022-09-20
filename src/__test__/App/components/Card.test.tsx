import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '~tests/__mocks__/matchMedia';

import { Card } from '~components/Card';
import { CARD_SUBTITLE, CARD_TITLE, Locators } from '~tests/constants';

describe('Тестирование компонента Card', () => {
  test('Пропсы title, subtitle передаются и отображаются', () => {
    render(<Card title={CARD_TITLE} subtitle={CARD_SUBTITLE} imageUrl="--" />);

    const title = screen.getByText(CARD_TITLE);
    const subtitle = screen.getByText(CARD_SUBTITLE);

    expect(title).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
  });

  test('Пропс title в виде элемента передается и отображается', () => {
    render(
      <Card
        title={<div data-testid={Locators.CARD_TITLE} />}
        subtitle={CARD_SUBTITLE}
        imageUrl="--"
      />
    );

    const title = screen.getByTestId(Locators.CARD_TITLE);

    expect(title).toBeInTheDocument();
  });

  test('Пропс subtitle в виде элемента передается и отображается', () => {
    render(
      <Card
        title={CARD_TITLE}
        subtitle={<div data-testid={Locators.CARD_SUBTITLE} />}
        imageUrl="--"
      />
    );

    const title = screen.getByTestId(Locators.CARD_SUBTITLE);

    expect(title).toBeInTheDocument();
  });

  test('Пропс image передаются корректно в картинку', () => {
    const testImageSrc = 'https://www.google.com/favicon.ico';
    render(
      <Card
        imageUrl={testImageSrc}
        title={CARD_TITLE}
        subtitle={CARD_SUBTITLE}
      />
    );

    const imageElement = screen.getByRole('img');

    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', testImageSrc);
  });

  test('Для изображения используется html-тег img', () => {
    const testImageSrc = 'https://www.google.com/favicon.ico';
    render(
      <Card
        imageUrl={testImageSrc}
        title={CARD_TITLE}
        subtitle={CARD_SUBTITLE}
      />
    );

    const imageElement = screen.getByAltText('avatar');
    expect(imageElement).toHaveAttribute('src', testImageSrc);
  });

  test('Пропс content передаются и отображается', () => {
    const { rerender } = render(
      <Card
        content={<div data-testid={Locators.CARD_CONTENT}>content</div>}
        imageUrl="-"
        title={CARD_TITLE}
        subtitle={CARD_SUBTITLE}
      />
    );

    const content = screen.getByTestId(Locators.CARD_CONTENT);
    expect(content).toBeInTheDocument();

    rerender(<Card imageUrl="-" title={CARD_TITLE} subtitle={CARD_SUBTITLE} />);
    expect(content).not.toBeInTheDocument();
  });

  test('При клике вызывается onClick, если передан', async () => {
    const user = userEvent.setup();
    const mockOnClick = jest.fn();

    render(
      <div data-testid={Locators.TEST_CONTAINER}>
        <Card
          onClick={mockOnClick}
          title={CARD_TITLE}
          subtitle={CARD_SUBTITLE}
          imageUrl="-"
        />
      </div>
    );

    const container = screen.getByTestId(Locators.TEST_CONTAINER);
    const cardElement = container.firstChild;

    expect(cardElement).toBeInTheDocument();

    await user.click(cardElement as Element);
    expect(mockOnClick).toBeCalledTimes(1);
  });
});
