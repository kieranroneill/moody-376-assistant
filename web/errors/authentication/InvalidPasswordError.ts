// enums
import { ErrorCodeEnum } from '@/enums/common';

// errors
import BaseError from '../_base/BaseError';

export default class InvalidPasswordError extends BaseError {
  public readonly code: ErrorCodeEnum = ErrorCodeEnum.InvalidPasswordError;
  public readonly displayName: string = 'InvalidPasswordError';
}
