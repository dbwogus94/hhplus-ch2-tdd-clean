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
   * `this.startedAt`이 YYYY-MM-DD 기준으로 오늘 날짜보다 크면 true를 리턴한다.
   * @returns {boolean}
   */
  validate(): boolean {
    const today = new Date();
    const todayString = this.formatDate(today);
    const startedAtString = this.formatDate(this.prop.startedAt);

    return startedAtString >= todayString;
  }

  /**
   * Date 객체를 'YYYY-MM-DD' 형식의 문자열로 변환한다.
   * @param {Date} date - 변환할 Date 객체
   * @returns {string} - 'YYYY-MM-DD' 형식의 문자열
   */
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
}
