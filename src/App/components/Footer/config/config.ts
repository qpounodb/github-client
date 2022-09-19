import { Logo, LogoKts } from '~assets/icons';
import { ExternalLinkProps } from '~components/ExternalLink';

type Props = ExternalLinkProps & { text?: string; Logo: SvgComponent };

type Config = {
  school: Props;
  student: Props;
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
