/* eslint-disable @typescript-eslint/no-useless-constructor */

import { CustomError } from './CustomError';

export class RenderError extends CustomError {
  constructor(message: string) {
    super(message);
  }
}
