import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Pagination as PaginationComponent } from './Pagination';

type Meta = ComponentMeta<typeof PaginationComponent>;
type Story = ComponentStory<typeof PaginationComponent>;

const meta: Meta = {
  title: 'Button/Pagination',
  component: PaginationComponent,
};

export default meta;

export const Pagination: Story = (args) => <PaginationComponent {...args} />;
Pagination.args = {
  page: 1,
  count: 12,
};
