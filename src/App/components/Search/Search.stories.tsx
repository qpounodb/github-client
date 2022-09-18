import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import SearchComponent from './Search';

type Meta = ComponentMeta<typeof SearchComponent>;
type Story = ComponentStory<typeof SearchComponent>;

const meta: Meta = {
  title: 'Input/Search',
  component: SearchComponent,
};

export default meta;

export const Search: Story = (props) => {
  const [value, setValue] = React.useState<string | undefined>(undefined);
  return <SearchComponent {...props} value={value} onChange={setValue} />;
};

Search.args = {
  placeholder: 'Введите название организации',
  disabled: false,
};
