import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import {
  MultiDropdown,
  MultiDropdownProps,
  Option,
} from '~/App/components/MultiDropdown';
import { TEST_TITLE } from '~/__test__/constants';

const defaultOptions: Option[] = [
  { key: 'msk', value: 'Москва' },
  { key: 'spb', value: 'Санкт-Петербург' },
  { key: 'ekb', value: 'Екатеринбург' },
];

const defaultPluralizeOptions = (elements: Option[]) =>
  elements.map((el: Option) => el.key).join();

const defaultTitle = defaultPluralizeOptions(defaultOptions);

const WrappedDropdown: React.FC<
  Omit<MultiDropdownProps, 'value' | 'onChange'>
> = (props) => {
  const [value, setValue] = React.useState<Option[]>([]);
  return <MultiDropdown {...props} value={value} onChange={setValue} />;
};

describe('Тестирование компонента MultiDropdown', () => {
  test('Проверка отображения результата выполнения pluralizeOptions', () => {
    const pluralizeOptions = jest
      .fn()
      .mockImplementation(defaultPluralizeOptions);
    const { rerender } = render(
      <MultiDropdown
        onChange={() => {}}
        value={defaultOptions}
        options={defaultOptions}
        pluralizeOptions={pluralizeOptions}
      />
    );

    const dropdownElement = screen.getByDisplayValue(defaultTitle);

    expect(dropdownElement).toBeInTheDocument();
    expect(pluralizeOptions).toBeCalled();

    rerender(
      <MultiDropdown
        onChange={() => {}}
        value={[]}
        options={defaultOptions}
        pluralizeOptions={pluralizeOptions}
      />
    );

    expect(dropdownElement).toHaveTextContent('');
  });

  test('Проверка синхронизации значения value', () => {
    const mockOnChange = jest.fn();
    const { rerender } = render(
      <MultiDropdown
        onChange={mockOnChange}
        value={defaultOptions}
        options={defaultOptions}
        pluralizeOptions={defaultPluralizeOptions}
      />
    );

    const dropdownElement = screen.getByDisplayValue(defaultTitle);
    userEvent.click(dropdownElement);

    const firstOption = screen.getByText(defaultOptions[0].value);
    userEvent.click(firstOption);

    expect(mockOnChange).toBeCalledWith([defaultOptions[1], defaultOptions[2]]);

    rerender(
      <MultiDropdown
        onChange={mockOnChange}
        value={[]}
        options={defaultOptions}
        pluralizeOptions={defaultPluralizeOptions}
      />
    );

    userEvent.click(firstOption);
    expect(mockOnChange).toBeCalledWith([defaultOptions[0]]);
  });

  test('Проверка открытия/закрытия списка опций при клике', () => {
    render(
      <WrappedDropdown
        options={defaultOptions}
        pluralizeOptions={() => TEST_TITLE}
      />
    );

    const dropdownElement = screen.getByDisplayValue(TEST_TITLE);
    expect(dropdownElement).toBeInTheDocument();

    userEvent.click(dropdownElement);

    const firstOption = screen.getByText(defaultOptions[0].value);
    expect(firstOption).toBeInTheDocument();

    userEvent.click(dropdownElement);
    expect(firstOption).not.toBeInTheDocument();
  });

  test('Отображаются все переданные options', () => {
    render(
      <WrappedDropdown
        options={defaultOptions}
        pluralizeOptions={() => TEST_TITLE}
      />
    );

    const dropdownElement = screen.getByDisplayValue(TEST_TITLE);
    expect(dropdownElement).toBeInTheDocument();

    userEvent.click(dropdownElement);

    const firstOption = screen.getByText(defaultOptions[0].value);
    const secondOption = screen.getByText(defaultOptions[1].value);
    const thirdOption = screen.getByText(defaultOptions[2].value);

    expect(firstOption).toBeInTheDocument();
    expect(secondOption).toBeInTheDocument();
    expect(thirdOption).toBeInTheDocument();
  });

  test('При disabled=true не открывается список опций', () => {
    const { rerender } = render(
      <WrappedDropdown
        options={defaultOptions}
        pluralizeOptions={() => TEST_TITLE}
      />
    );

    const dropdownElement = screen.getByDisplayValue(TEST_TITLE);
    expect(dropdownElement).toBeInTheDocument();

    userEvent.click(dropdownElement);

    const firstOption = screen.getByText(defaultOptions[0].value);
    expect(firstOption).toBeInTheDocument();

    rerender(
      <WrappedDropdown
        options={defaultOptions}
        pluralizeOptions={() => TEST_TITLE}
        disabled
      />
    );

    expect(firstOption).not.toBeInTheDocument();

    userEvent.click(dropdownElement);
    expect(firstOption).not.toBeInTheDocument();
  });

  test('При клике на опцию вызывается onChange с добавленной опцией', () => {
    const mockOnChange = jest.fn();
    render(
      <MultiDropdown
        onChange={mockOnChange}
        value={[]}
        options={defaultOptions}
        pluralizeOptions={() => TEST_TITLE}
      />
    );

    const dropdownElement = screen.getByDisplayValue(TEST_TITLE);
    userEvent.click(dropdownElement);

    const firstOption = screen.getByText(defaultOptions[0].value);
    userEvent.click(firstOption);
    expect(mockOnChange).toBeCalledWith([defaultOptions[0]]);

    const secondOption = screen.getByText(defaultOptions[1].value);
    userEvent.click(secondOption);
    expect(mockOnChange).toBeCalledWith([defaultOptions[1]]);
  });

  test('При клике на уже выбранную опцию вызывается onChange без этой опции', () => {
    const mockOnChange = jest.fn();
    render(
      <MultiDropdown
        onChange={mockOnChange}
        value={defaultOptions}
        options={defaultOptions}
        pluralizeOptions={defaultPluralizeOptions}
      />
    );

    const dropdownElement = screen.getByDisplayValue(defaultTitle);
    userEvent.click(dropdownElement);

    const firstOption = screen.getByText(defaultOptions[0].value);
    userEvent.click(firstOption);

    expect(mockOnChange).toBeCalledWith([defaultOptions[1], defaultOptions[2]]);
  });

  test('Проверка перерендера при изменении options (key)', () => {
    const { rerender } = render(
      <MultiDropdown
        onChange={() => {}}
        value={[]}
        options={defaultOptions}
        pluralizeOptions={() => TEST_TITLE}
      />
    );

    const dropdownElement = screen.getByDisplayValue(TEST_TITLE);
    userEvent.click(dropdownElement);

    const firstOption = screen.getByText(defaultOptions[0].value);
    const secondOption = screen.getByText(defaultOptions[1].value);
    const thirdOption = screen.getByText(defaultOptions[2].value);

    expect(firstOption).toBeInTheDocument();
    expect(secondOption).toBeInTheDocument();
    expect(thirdOption).toBeInTheDocument();

    rerender(
      <MultiDropdown
        onChange={() => {}}
        value={[]}
        options={[defaultOptions[0], defaultOptions[2]]}
        pluralizeOptions={() => TEST_TITLE}
      />
    );

    expect(firstOption).toBeInTheDocument();
    expect(thirdOption).toBeInTheDocument();

    expect(secondOption).not.toBeInTheDocument();
  });
});
