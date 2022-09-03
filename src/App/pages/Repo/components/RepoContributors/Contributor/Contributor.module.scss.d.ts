export type Styles = {
  about: string;
  avatar: string;
  commits: string;
  login: string;
  name: string;
  root: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
