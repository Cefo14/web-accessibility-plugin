export interface CSSUpdater {
  readonly defaultValue: unknown;
  update(element: HTMLElement, value: string | number): undefined;
}
