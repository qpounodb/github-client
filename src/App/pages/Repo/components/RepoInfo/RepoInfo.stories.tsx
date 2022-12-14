import { ComponentMeta, ComponentStory } from '@storybook/react';

import data from '~assets/data-examples/repo-info.json';
import { normalizeRepo } from '~models/github';

import RepoInfoComponent from './RepoInfo';

type Meta = ComponentMeta<typeof RepoInfoComponent>;
type Story = ComponentStory<typeof RepoInfoComponent>;

const meta: Meta = {
  title: 'Repo Page/RepoInfo',
  component: RepoInfoComponent,
};

export default meta;

export const RepoInfo: Story = (args) => <RepoInfoComponent {...args} />;
RepoInfo.args = { data: normalizeRepo(data) };
