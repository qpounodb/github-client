import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import PaginationComponent from './Pagination';

type Meta = ComponentMeta<typeof PaginationComponent>;
type Story = ComponentStory<typeof PaginationComponent>;

const meta: Meta = {
  title: 'Button/Pagination',
  component: PaginationComponent,
};

export default meta;

export const Pagination: Story = ({ page: init, ...rest }) => {
  const [page, setPage] = React.useState(init);
  return <PaginationComponent {...rest} page={page} onSubmit={setPage} />;
};

Pagination.args = {
  page: 1,
  count: 12,
};
