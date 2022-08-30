import { ComponentMeta, ComponentStory } from '@storybook/react';
import data from '~/App/assets/data-examples/repo-info.json';
import { getDataState } from '~/shared/utils';
import { RepoInfo as RepoInfoComponent } from './RepoInfo';

type Meta = ComponentMeta<typeof RepoInfoComponent>;
type Story = ComponentStory<typeof RepoInfoComponent>;

const meta: Meta = {
  title: 'Repo Page/RepoInfo',
  component: RepoInfoComponent,
};

export default meta;

export const RepoInfo: Story = (args) => <RepoInfoComponent {...args} />;
RepoInfo.args = { state: getDataState(data) };
