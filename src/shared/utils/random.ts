export const randomRange: (min?: number) => (max: number) => number =
  (min = 0) =>
  (max) => {
    const x = Math.random();
    return Math.floor(min + x * (max - min + 1));
  };

export const randomMax = randomRange();
