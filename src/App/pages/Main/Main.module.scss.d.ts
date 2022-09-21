export type Styles = {
  root: string;
  root__section: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
