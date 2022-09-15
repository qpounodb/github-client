import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { Locators } from '~/__test__/constants';
import { Input, InputProps } from '~/App/components/input';

const WrappedInput: React.FC<Pick<InputProps, 'onChange'>> = ({ onChange }) => {
  const [value, setValue] = React.useState('');

  const handleChange = (value: string): void => {
    setValue(value);
    onChange?.(value);
  };

  return (
    <Input value={value} onChange={handleChange} data-testid={Locators.INPUT} />
  );
};

describe('Тестирование компонента Input', () => {
  test('Значение в инпуте зависит от пропса value', () => {
    const { rerender } = render(
      <Input value="п" data-testid={Locators.INPUT} />
    );

    const inputElement = screen.getByTestId(Locators.INPUT);

    expect(inputElement).toHaveValue('п');

    rerender(<Input value="пр" data-testid={Locators.INPUT} />);
    expect(inputElement).toHaveValue('пр');

    rerender(<Input value="при" data-testid={Locators.INPUT} />);
    expect(inputElement).toHaveValue('при');

    rerender(<Input value="прив" data-testid={Locators.INPUT} />);
    expect(inputElement).toHaveValue('прив');
  });

  test('При вводе значений в input вызывается onChange, принимающий новое значение', async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();

    render(<WrappedInput onChange={mockOnChange} />);

    await user.tab();
    await user.keyboard('d');
    expect(mockOnChange).toBeCalledWith('d');

    await user.keyboard('i');
    expect(mockOnChange).toBeCalledWith('di');

    await user.keyboard('v');
    expect(mockOnChange).toBeCalledWith('div');
  });

  test('Компонент Input использует нативный тег input с типом text', () => {
    render(<Input value="" data-testid={Locators.INPUT} />);

    const inputElement = screen.getByTestId(Locators.INPUT);

    expect(inputElement.tagName).toBe('INPUT');
    expect(inputElement).toHaveAttribute('type', 'text');
  });

  test('При disabled=true добавляется аттрибут disabled', () => {
    const { rerender } = render(
      <Input value="" data-testid={Locators.INPUT} disabled />
    );

    const inputElement = screen.getByTestId(Locators.INPUT);

    expect(inputElement).toBeDisabled();

    rerender(<Input value="" data-testid={Locators.INPUT} />);

    expect(inputElement).toBeEnabled();
  });

  test('При передаче disabled=true во время попытки ввода не вызывается onChange', async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();

    render(
      <Input
        value=""
        onChange={mockOnChange}
        data-testid={Locators.INPUT}
        disabled
      />
    );

    const inputElement = screen.getByTestId(Locators.INPUT);

    await user.type(inputElement, 'some_text');
    expect(mockOnChange).not.toBeCalled();
  });

  test('Можно передать дополнительный className, не влияющий на остальные классы инпута', () => {
    const testClassName = 'test-class';
    render(
      <Input
        value=""
        data-testid={Locators.INPUT}
        disabled
        className={testClassName}
      />
    );

    const inputElement = screen.getByTestId(Locators.INPUT);

    expect(inputElement).toHaveClass(testClassName);
  });

  test('При disabled=true атрибут value передается корректно', () => {
    const testValue = 'some_value';
    render(<Input value={testValue} data-testid={Locators.INPUT} disabled />);

    const inputElement = screen.getByTestId(Locators.INPUT);

    expect(inputElement).toHaveValue(testValue);
    expect(inputElement).toHaveValue(testValue);
  });

  test('Пробрасываются все пропсы, которые принимает нативный инпут', async () => {
    const user = userEvent.setup();
    const onHover = jest.fn();
    const onUnHover = jest.fn();
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const id = 'INPUT_ID';
    const name = 'INPUT_NAME';
    const width = '132px';

    render(
      <Input
        value=""
        onMouseOver={onHover}
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseOut={onUnHover}
        id={id}
        data-testid={Locators.INPUT}
        name={name}
        style={{ width }}
        readOnly
      />
    );

    const buttonElement = screen.getByTestId(Locators.INPUT);

    await user.hover(buttonElement);
    expect(onHover).toBeCalledTimes(1);

    await user.unhover(buttonElement);
    expect(onUnHover).toBeCalledTimes(1);

    await user.tab();
    expect(onFocus).toBeCalledTimes(1);

    await user.tab();
    expect(onBlur).toBeCalledTimes(1);

    expect(buttonElement).toHaveAttribute('id', id);
    expect(buttonElement).toHaveAttribute('name', name);
    expect(buttonElement).toHaveAttribute('readonly');
    expect(buttonElement).toHaveStyle({ width });
  });
});
