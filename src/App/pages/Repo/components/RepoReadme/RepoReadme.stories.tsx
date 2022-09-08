import { ComponentMeta, ComponentStory } from '@storybook/react';
import data from '~/App/assets/data-examples/repo-readme.json';
import { getDataState } from '~/shared/utils';
import RepoReadmeComponent from './RepoReadme';

type Meta = ComponentMeta<typeof RepoReadmeComponent>;
type Story = ComponentStory<typeof RepoReadmeComponent>;

const meta: Meta = {
  title: 'Repo Page/RepoReadme',
  component: RepoReadmeComponent,
};

export default meta;

export const RepoReadme: Story = (args) => <RepoReadmeComponent {...args} />;
RepoReadme.args = { state: getDataState(data) };
