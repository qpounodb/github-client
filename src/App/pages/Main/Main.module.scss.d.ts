export type Styles = {
  main: string;
  pagination: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
