import { ComponentMeta, ComponentStory } from '@storybook/react';

import data from '~assets/data-examples/repo-readme.json';
import { normalizeRepoReadme } from '~models/github';

import RepoReadmeComponent from './RepoReadme';

type Meta = ComponentMeta<typeof RepoReadmeComponent>;
type Story = ComponentStory<typeof RepoReadmeComponent>;

const meta: Meta = {
  title: 'Repo Page/RepoReadme',
  component: RepoReadmeComponent,
};

export default meta;

export const RepoReadme: Story = (args) => <RepoReadmeComponent {...args} />;
RepoReadme.args = { state: { data: normalizeRepoReadme(data) } };
