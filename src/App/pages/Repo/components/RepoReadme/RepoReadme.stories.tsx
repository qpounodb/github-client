import { ComponentMeta, ComponentStory } from '@storybook/react';
import file from '~/App/assets/data-examples/repo-readme.json';
import { RepoReadme as RepoReadmeComponent } from './RepoReadme';

type Meta = ComponentMeta<typeof RepoReadmeComponent>;
type Story = ComponentStory<typeof RepoReadmeComponent>;

const meta: Meta = {
  title: 'Repo Page/RepoReadme',
  component: RepoReadmeComponent,
};

export default meta;

export const RepoReadme: Story = (args) => <RepoReadmeComponent {...args} />;
RepoReadme.args = { file };
