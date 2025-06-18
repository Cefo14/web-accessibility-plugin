export class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = new.target.name;
    this.cause = 'WebAccessibilityPlugin';
    if (Error.captureStackTrace) Error.captureStackTrace(this, new.target);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
