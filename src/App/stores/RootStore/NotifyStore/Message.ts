import { Level } from './Level';

export type Message = {
  id: number;
  level: Level;
  text: string;
  time: Date;
};
