export type Styles = {
  about: string;
  date: string;
  info: string;
  lang: string;
  link: string;
  name: string;
  owner: string;
  repo: string;
  root: string;
  stats: string;
  topics: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
