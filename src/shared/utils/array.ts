import { randomMax } from './random';

export const randomItem = <T extends unknown[]>(items: T): T[number] => {
  return items[randomMax(items.length - 1)];
};

export const shuffleItems = <T>(items: T[]): T[] => {
  const arr = items.slice();

  for (let i = items.length - 1; i > 0; i--) {
    const j = randomMax(i);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};
