import { Logo, LogoKts } from '~assets/icons';

import { LinkProps } from '../components';

type Config = {
  school: LinkProps;
  student: LinkProps;
};

export const config: Config = {
  school: {
    url: 'https://metaclass.kts.studio/beginner_react',
    title: 'KTS Beginner React Course',
    Logo: LogoKts,
  },
  student: {
    url: 'https://github.com/qpounodb/github-client',
    text: 'qpounodb',
    Logo: Logo,
  },
};
