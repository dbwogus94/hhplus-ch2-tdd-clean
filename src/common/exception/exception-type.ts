type ApplicationExceptionRecordValue = {
  /** 에러 메시지, 응답에도 사용된다. */
  message: string;

  /** http 에러 상태 코드 */
  state: number;
};
type ApplicationExceptionRecord = Record<
  ApplicationExceptionCode,
  ApplicationExceptionRecordValue
>;

export enum ApplicationExceptionCode {
  /** 유효하지 않은 파라미터 */
  INVALID_PARAMETER = 'INVALID_PARAMETER',
  /** 존재하지 않는 값 */
  NOT_FOUND = 'NOT_FOUND',
}

export const ApplicationExceptionRecord: ApplicationExceptionRecord = {
  [ApplicationExceptionCode.INVALID_PARAMETER]: {
    message: '잘못된 값을 사용하고 있습니다.',
    state: 400,
  },

  [ApplicationExceptionCode.NOT_FOUND]: {
    message: '자원이 존재하지 않습니다.',
    state: 400,
  },
} as const;
