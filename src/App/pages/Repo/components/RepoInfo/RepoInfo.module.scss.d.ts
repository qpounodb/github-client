export type Styles = {
  about: string;
  date: string;
  lang: string;
  link: string;
  main: string;
  name: string;
  owner: string;
  repo: string;
  stats: string;
  topics: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
