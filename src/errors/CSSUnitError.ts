/* eslint-disable @typescript-eslint/no-useless-constructor */

import { CustomError } from './CustomError';

export class CSSUnitError extends CustomError {
  constructor(message: string) {
    super(message);
  }
}
