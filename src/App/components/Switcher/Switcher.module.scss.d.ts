export type Styles = {
  pulse: string;
  root: string;
  root__grid: string;
  root__grid_B: string;
  root__handle: string;
  root__label: string;
  root__label_A: string;
  root__label_B: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
