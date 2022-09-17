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

export const Pagination: Story = (props) => {
  const [page, setPage] = React.useState(1);
  return <PaginationComponent {...props} page={page} onSubmit={setPage} />;
};

Pagination.args = {
  count: 12,
};
