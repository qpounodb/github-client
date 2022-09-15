import { ComponentMeta, ComponentStory } from '@storybook/react';

import data from '~/App/assets/data-examples/repo-contributors.json';
import { normalizeRepoContributorCollection } from '~/App/models/github';

import RepoContributorsComponent from './RepoContributors';

type Meta = ComponentMeta<typeof RepoContributorsComponent>;
type Story = ComponentStory<typeof RepoContributorsComponent>;

const meta: Meta = {
  title: 'Repo Page/RepoContributors',
  component: RepoContributorsComponent,
};

export default meta;

export const RepoContributors: Story = (args) => (
  <RepoContributorsComponent {...args} />
);
RepoContributors.args = {
  state: { data: normalizeRepoContributorCollection(data) },
};
