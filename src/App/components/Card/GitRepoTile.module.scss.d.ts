export type Styles = {
  card: string;
  content: string;
  link: string;
  stars: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
