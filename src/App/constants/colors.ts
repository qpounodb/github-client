export enum Color {
  primary = 'primary',
  secondary = 'secondary',
}

export const invert = (color: Color) => {
  switch (color) {
    case Color.primary:
      return Color.secondary;
    case Color.secondary:
      return Color.primary;
    default:
      return color;
  }
};
