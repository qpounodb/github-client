import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Locators } from '~/__test__/constants';
import { CheckBox } from '~/App/components/CheckBox';

describe('Тестирование компонента CheckBox', () => {
  test('Значение чекбокса зависит от пропса checked', () => {
    const { rerender } = render(
      <CheckBox
        checked={true}
        onChange={() => null}
        data-testid={Locators.CHECKBOX}
      />
    );

    const checkBoxElement = screen.getByTestId(Locators.CHECKBOX);

    expect(checkBoxElement).toBeChecked();

    rerender(
      <CheckBox
        checked={false}
        onChange={() => null}
        data-testid={Locators.CHECKBOX}
      />
    );
    expect(checkBoxElement).not.toBeChecked();
  });

  test('При клике на чекбокс вызывается onChange со значением', async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();

    const { rerender } = render(
      <CheckBox
        checked={true}
        onChange={mockOnChange}
        data-testid={Locators.CHECKBOX}
      />
    );

    const checkBoxElement = screen.getByTestId(Locators.CHECKBOX);

    await user.click(checkBoxElement);
    expect(mockOnChange).toBeCalledWith(false);

    rerender(
      <CheckBox
        checked={false}
        onChange={mockOnChange}
        data-testid={Locators.CHECKBOX}
      />
    );

    await user.click(checkBoxElement);
    expect(mockOnChange).toBeCalledWith(true);
  });

  test('Компонент CheckBox использует html-тег input', () => {
    render(
      <CheckBox
        checked={true}
        onChange={() => null}
        data-testid={Locators.CHECKBOX}
      />
    );

    const inputElement = screen.getByTestId(Locators.CHECKBOX);

    expect(inputElement.tagName).toBe('INPUT');
    expect(inputElement).toHaveAttribute('type', 'checkbox');
  });

  test('При передаче disabled=true не вызывается onChange', async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();

    const { rerender } = render(
      <CheckBox
        disabled
        checked={true}
        onChange={mockOnChange}
        data-testid={Locators.CHECKBOX}
      />
    );

    const checkBoxElement = screen.getByTestId(Locators.CHECKBOX);

    await user.click(checkBoxElement);
    expect(mockOnChange).not.toBeCalled();

    rerender(
      <CheckBox
        checked={true}
        onChange={mockOnChange}
        data-testid={Locators.CHECKBOX}
      />
    );

    await user.click(checkBoxElement);
    expect(mockOnChange).toBeCalled();
  });

  test('При передаче disabled проставляется атрибут disabled на чекбоксе', () => {
    const { rerender } = render(
      <CheckBox
        disabled={true}
        checked={true}
        onChange={() => null}
        data-testid={Locators.CHECKBOX}
      />
    );

    const checkBoxElement = screen.getByTestId(Locators.CHECKBOX);
    expect(checkBoxElement).toBeDisabled();

    rerender(
      <CheckBox
        disabled={false}
        checked={true}
        onChange={() => null}
        data-testid={Locators.CHECKBOX}
      />
    );

    expect(checkBoxElement).toBeEnabled();
  });
});
