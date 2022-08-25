import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Search as SearchComponent } from './Search';

type Meta = ComponentMeta<typeof SearchComponent>;
type Story = ComponentStory<typeof SearchComponent>;

const meta: Meta = {
  title: 'Input/Search',
  component: SearchComponent,
};

export default meta;

export const Search: Story = (args) => <SearchComponent {...args} />;
Search.args = {
  placeholder: 'Введите название организации',
  loading: false,
};
