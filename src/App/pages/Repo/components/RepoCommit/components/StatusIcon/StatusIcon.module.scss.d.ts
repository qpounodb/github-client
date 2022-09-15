export type Styles = {
  added: string;
  icon: string;
  modified: string;
  removed: string;
  renamed: string;
  unknown: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
