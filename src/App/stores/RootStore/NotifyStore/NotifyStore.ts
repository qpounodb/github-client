import { action, computed, makeObservable, observable } from 'mobx';
import { toError } from '~/shared/utils';
import { Level } from './Level';
import { Message } from './Message';

type PrivateFields = '_queue' | '_enqueue' | '_dequeue';

export class NotifyStore {
  private _queue: Message[] = [];

  constructor() {
    makeObservable<NotifyStore, PrivateFields>(this, {
      _queue: observable,
      isEmpty: computed,
      getNext: action,
      _enqueue: action,
      _dequeue: action,
    });
  }

  get isEmpty(): boolean {
    return this._queue.length === 0;
  }

  getNext(): Message | null {
    if (this.isEmpty) return null;
    return this._dequeue();
  }

  _enqueue(level: Level, text: string): void {
    this._queue.push({ level, text, time: new Date() });
  }

  _dequeue(): Message | null {
    return this._queue.shift() ?? null;
  }

  error(err: unknown): void {
    const error = toError(err);
    this._enqueue(Level.error, error.message);
  }

  warn(text: string): void {
    this._enqueue(Level.warn, text);
  }

  info(text: string): void {
    this._enqueue(Level.info, text);
  }
}
