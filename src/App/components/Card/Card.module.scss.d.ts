export type Styles = {
  hidden: string;
  root: string;
  root__avatar: string;
  root__item: string;
  root__main: string;
  root__placeholder: string;
  root__side: string;
  root__title: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
