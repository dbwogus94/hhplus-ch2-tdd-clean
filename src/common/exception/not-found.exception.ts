import { ApplicationException } from './application.exception';
import { ApplicationExceptionCode } from './exception-type';

export class NotFoundException extends ApplicationException {
  constructor(message?: string) {
    super(ApplicationExceptionCode.NOT_FOUND);
    this.message = message;
  }
}
