import { ApplicationException } from './application.exception';
import { ApplicationExceptionCode } from './exception-type';

export class InvalidParameterException extends ApplicationException {
  constructor() {
    super(ApplicationExceptionCode.INVALID_PARAMETER);
  }
}
