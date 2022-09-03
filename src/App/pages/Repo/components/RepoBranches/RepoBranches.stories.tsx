import { ComponentMeta, ComponentStory } from '@storybook/react';
import data from '~/App/assets/data-examples/repo-branches.json';
import { getDataState } from '~/shared/data-state';
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
RepoBranches.args = { state: getDataState(data) };
