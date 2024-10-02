import { ApplicationException } from './application.exception';
import { ApplicationExceptionCode } from './exception-type';

export class NotFoundException extends ApplicationException {
  constructor() {
    super(ApplicationExceptionCode.INVALID_PARAMETER);
  }
}
