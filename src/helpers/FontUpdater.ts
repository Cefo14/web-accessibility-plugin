import type { StyleUpdater } from './StyleUpdater';

export interface FontUpdater extends StyleUpdater<string | number> {
  readonly defaultValue: unknown;
}
