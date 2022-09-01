export type Styles = {
  about: string;
  avatar: string;
  commits: string;
  login: string;
  main: string;
  name: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
