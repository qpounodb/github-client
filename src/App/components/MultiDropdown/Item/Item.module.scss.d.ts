export type Styles = {
  main: string;
  main_selected: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
