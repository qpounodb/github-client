import { ComponentMeta, ComponentStory } from '@storybook/react';
import branches from '~/App/assets/data-examples/repo-branches.json';
import { RepoBranches as RepoBranchesComponent } from './RepoBranches';

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
RepoBranches.args = { branches };
