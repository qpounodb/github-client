export const formatCount = (count: number): string =>
  count < 1000 ? String(count) : `${Math.round(count / 100) / 10}k`;

export const formatCode = (x: unknown): string => JSON.stringify(x, null, 4);
