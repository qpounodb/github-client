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

  const setPageLog = (x: number) => {
    setPage(x);
  };

  return <PaginationComponent {...props} page={page} onSubmit={setPageLog} />;
};

Pagination.args = {
  count: 12,
  disabled: false,
};
