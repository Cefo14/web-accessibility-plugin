export interface StyleUpdater<V = unknown> {
  update(element: HTMLElement, value: V): void;
}
