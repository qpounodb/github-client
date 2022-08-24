import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button, ButtonColor } from '~/App/components/Button';
import { BUTTON_TEXT, Locators } from '~/__test__/constants';

describe('Тестирование компонента Button', () => {
  test('Текстовый children пробрасывается корректно', () => {
    render(<Button data-testid={Locators.BUTTON}>{BUTTON_TEXT}</Button>);

    const buttonElement = screen.getByTestId(Locators.BUTTON);

    expect(buttonElement).toHaveTextContent(BUTTON_TEXT);
  });

  test('Компонент Button использует html-тег button', () => {
    render(<Button data-testid={Locators.BUTTON}>{BUTTON_TEXT}</Button>);

    const buttonElement = screen.getByTestId(Locators.BUTTON);

    expect(buttonElement.tagName).toBe('BUTTON');
  });

  test('Элемент children пробрасывается корректно', () => {
    render(
      <Button data-testid={Locators.BUTTON}>
        <span data-testid={Locators.BUTTON_CHILDREN}>{BUTTON_TEXT}</span>
      </Button>
    );

    const buttonElement = screen.getByTestId(Locators.BUTTON);
    const innerElement = screen.getByTestId(Locators.BUTTON_CHILDREN);

    expect(buttonElement).toContainElement(innerElement);
  });

  test('При передаче loading=true внутри кнопки отображается компонент Loader', () => {
    const { rerender } = render(
      <Button loading data-testid={Locators.BUTTON}>
        {BUTTON_TEXT}
      </Button>
    );

    const buttonElement = screen.getByTestId(Locators.BUTTON);
    const loader = screen.getByTestId(Locators.LOADER);

    expect(buttonElement).toContainElement(loader);

    rerender(<Button data-testid={Locators.BUTTON}>{BUTTON_TEXT}</Button>);
    expect(buttonElement).not.toContainElement(loader);
  });

  test('При передаче loading=true кнопка задизейбленная', () => {
    const { rerender } = render(
      <Button data-testid={Locators.BUTTON} loading>
        {BUTTON_TEXT}
      </Button>
    );

    const buttonElement = screen.getByTestId(Locators.BUTTON);

    expect(buttonElement).toBeDisabled();

    rerender(<Button data-testid={Locators.BUTTON}>{BUTTON_TEXT}</Button>);
    expect(buttonElement).not.toBeDisabled();
  });

  test('При передаче loading=true при клике на кнопку onClick не вызывается', () => {
    const mockOnClick = jest.fn();
    render(
      <Button data-testid={Locators.BUTTON} onClick={mockOnClick} loading>
        {BUTTON_TEXT}
      </Button>
    );

    const buttonElement = screen.getByTestId(Locators.BUTTON);
    userEvent.click(buttonElement);

    expect(mockOnClick).not.toBeCalled();
  });

  test('При передаче loading=true добавляется аттрибут disabled', () => {
    const { rerender } = render(
      <Button data-testid={Locators.BUTTON} loading>
        {BUTTON_TEXT}
      </Button>
    );

    const buttonElement = screen.getByTestId(Locators.BUTTON);

    expect(buttonElement).toHaveAttribute('disabled');

    rerender(<Button data-testid={Locators.BUTTON}>{BUTTON_TEXT}</Button>);

    expect(buttonElement).not.toHaveAttribute('disabled');
  });

  test('Переданный onClick вызывается при клике', () => {
    const mockOnClick = jest.fn();
    render(
      <Button onClick={mockOnClick} data-testid={Locators.BUTTON}>
        {BUTTON_TEXT}
      </Button>
    );

    const buttonElement = screen.getByTestId(Locators.BUTTON);
    userEvent.click(buttonElement);

    expect(mockOnClick).toBeCalledTimes(1);
  });

  test('Пропс color участвует в формировании класса на кнопке', () => {
    const { rerender } = render(
      <Button color={ButtonColor.primary} data-testid={Locators.BUTTON}>
        {BUTTON_TEXT}
      </Button>
    );

    const buttonElement = screen.getByTestId(Locators.BUTTON);

    expect(buttonElement.className).toContain(ButtonColor.primary);
    expect(buttonElement.className).not.toContain(ButtonColor.secondary);

    rerender(
      <Button color={ButtonColor.secondary} data-testid={Locators.BUTTON}>
        {BUTTON_TEXT}
      </Button>
    );

    expect(buttonElement.className).toContain(ButtonColor.secondary);
    expect(buttonElement.className).not.toContain(ButtonColor.primary);
  });

  test('Цвет кнопки по умолчанию - ButtonColor.primary', () => {
    render(<Button data-testid={Locators.BUTTON}>{BUTTON_TEXT}</Button>);

    const buttonElement = screen.getByTestId(Locators.BUTTON);

    expect(buttonElement.className).toContain(ButtonColor.primary);
    expect(buttonElement.className).not.toContain(ButtonColor.secondary);
  });

  test('При disabled=true не вызывается onClick', () => {
    const mockOnClick = jest.fn();
    const { rerender } = render(
      <Button data-testid={Locators.BUTTON} onClick={mockOnClick} disabled>
        {BUTTON_TEXT}
      </Button>
    );

    const buttonElement = screen.getByTestId(Locators.BUTTON);
    userEvent.click(buttonElement);

    expect(mockOnClick).not.toBeCalled();

    rerender(
      <Button data-testid={Locators.BUTTON} onClick={mockOnClick}>
        {BUTTON_TEXT}
      </Button>
    );
    userEvent.click(buttonElement);

    expect(mockOnClick).toBeCalledTimes(1);
  });

  test('При disabled=true проставляется атрибут disabled=true у кнопки', () => {
    const { rerender } = render(
      <Button data-testid={Locators.BUTTON} disabled>
        {BUTTON_TEXT}
      </Button>
    );

    const buttonElement = screen.getByTestId(Locators.BUTTON);

    expect(buttonElement).toBeDisabled();

    rerender(<Button data-testid={Locators.BUTTON}>{BUTTON_TEXT}</Button>);

    expect(buttonElement).not.toBeDisabled();
  });

  test('Можно передать дополнительный className, не влияющий на остальные классы кнопки', () => {
    const testClassName = 'test-class';
    render(
      <Button className={testClassName} data-testid={Locators.BUTTON} disabled>
        {BUTTON_TEXT}
      </Button>
    );

    const buttonElement = screen.getByTestId(Locators.BUTTON);

    expect(buttonElement).toHaveClass(testClassName);
  });

  test('Пробрасываются все пропсы, которые принимает нативная кнопка', () => {
    const onHover = jest.fn();
    const onUnHover = jest.fn();
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const id = 'BUTTON_ID';
    const name = 'BUTTON_NAME';
    const width = '132px';

    render(
      <Button
        onMouseOver={onHover}
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseOut={onUnHover}
        id={id}
        name={name}
        style={{ width }}
        data-testid={Locators.BUTTON}
      >
        {BUTTON_TEXT}
      </Button>
    );

    const buttonElement = screen.getByTestId(Locators.BUTTON);

    userEvent.hover(buttonElement);
    expect(onHover).toBeCalledTimes(1);

    userEvent.unhover(buttonElement);
    expect(onUnHover).toBeCalledTimes(1);

    userEvent.tab();
    expect(onFocus).toBeCalledTimes(1);

    userEvent.tab();
    expect(onBlur).toBeCalledTimes(1);

    expect(buttonElement).toHaveAttribute('id', id);
    expect(buttonElement).toHaveAttribute('name', name);
    expect(buttonElement).toHaveStyle({ width });
  });
});
