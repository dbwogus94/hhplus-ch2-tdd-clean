type ReadLectureSessionsCommandProp = {
  readonly startedAt: Date;
};

export class ReadLectureSessionsCommand {
  constructor(private readonly prop: ReadLectureSessionsCommandProp) {}

  get startedAt() {
    return this.prop.startedAt;
  }

  static from(
    prop: ReadLectureSessionsCommandProp,
  ): ReadLectureSessionsCommand {
    return new ReadLectureSessionsCommand(prop);
  }

  /**
   * `this.startedAt`가 현재시간보다 크다면 true를 리턴한다.
   * @returns
   */
  validate() {
    return this.prop.startedAt > new Date() ? true : false;
  }
}
