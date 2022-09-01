export type Styles = {
  lang: string;
  main: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
