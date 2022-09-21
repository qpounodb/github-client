import {
  action,
  computed,
  IReactionDisposer,
  makeObservable,
  observable,
  reaction,
  runInAction,
} from 'mobx';

import { formatError } from '~utils';

import { Level } from './Level';
import type { Message } from './Message';

export type NotifyStoreConfig = {
  maxItems?: number;
  autoRemoveTimeout?: number;
};

const AUTO_REMOVE_TIMEOUT = 10;
const MAX_PRESERVED_MESSAGES = 0;

type PrivateFields =
  | '_messages'
  | '_removing'
  | '_enqueue'
  | '_dequeue'
  | '_needDequeue';

export class NotifyStore {
  private _id = 0;
  private _messages: Message[] = [];
  private _removing = false;
  private _config: Required<NotifyStoreConfig>;

  constructor({
    maxItems = MAX_PRESERVED_MESSAGES,
    autoRemoveTimeout = AUTO_REMOVE_TIMEOUT,
  }: NotifyStoreConfig = {}) {
    this._config = { maxItems, autoRemoveTimeout };

    makeObservable<NotifyStore, PrivateFields>(this, {
      _messages: observable.ref,
      _removing: observable,
      messages: computed,
      _needDequeue: computed,
      remove: action.bound,
      _enqueue: action.bound,
      _dequeue: action.bound,
    });

    this._init();
  }

  get messages(): Message[] {
    return this._messages.slice();
  }

  private get _needDequeue(): boolean {
    return !this._removing && this._messages.length > this._config.maxItems;
  }

  private _enqueue(level: Level, text: string): void {
    const message: Message = { id: this._id, level, text, time: new Date() };
    this._messages = [...this.messages, message];
    this._id += 1;
  }

  private _dequeue(): Message {
    const [message, ...rest] = this._messages;
    this._messages = rest;
    return message;
  }

  remove(id: number): void {
    this._messages = this._messages.filter((msg) => msg.id !== id);
  }

  error(err: unknown): void {
    this._enqueue(Level.error, formatError(err));
  }

  warn(text: string): void {
    this._enqueue(Level.warn, text);
  }

  info(text: string): void {
    this._enqueue(Level.info, text);
  }

  private _overflowReaction?: IReactionDisposer;

  _init(): void {
    this._overflowReaction = reaction(
      () => this._needDequeue,
      (needRemove) => {
        if (!needRemove) return;
        this._removing = true;
        setTimeout(
          () =>
            runInAction(() => {
              this._dequeue();
              this._removing = false;
            }),
          1000 * this._config.autoRemoveTimeout
        );
      }
    );
  }
}
