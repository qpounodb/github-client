export type Styles = {
  root: string;
  section: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
