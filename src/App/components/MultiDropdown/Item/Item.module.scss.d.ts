export type Styles = {
  root: string;
  root_selected: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
