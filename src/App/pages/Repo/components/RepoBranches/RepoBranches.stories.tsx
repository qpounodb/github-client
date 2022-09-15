import { ComponentMeta, ComponentStory } from '@storybook/react';

import data from '~assets/data-examples/repo-branches.json';
import { normalizeRepoBranchCollection } from '~models/github';

import RepoBranchesComponent from './RepoBranches';

type Meta = ComponentMeta<typeof RepoBranchesComponent>;
type Story = ComponentStory<typeof RepoBranchesComponent>;

const meta: Meta = {
  title: 'Repo Page/RepoBranches',
  component: RepoBranchesComponent,
};

export default meta;

export const RepoBranches: Story = (args) => (
  <RepoBranchesComponent {...args} />
);
RepoBranches.args = {
  state: { data: normalizeRepoBranchCollection(data) },
};
