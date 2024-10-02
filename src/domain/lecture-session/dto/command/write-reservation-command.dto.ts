type WriteReservationCommandProp = {
  readonly lectureSessionId: number;
  readonly userId: number;
};

export class WriteReservationCommand {
  constructor(private readonly prop: WriteReservationCommandProp) {}

  get lectureSessionId() {
    return this.prop.lectureSessionId;
  }

  get userId() {
    return this.prop.userId;
  }

  /** 여러개의 매개변수 */
  static from(prop: WriteReservationCommandProp) {
    return new WriteReservationCommand(prop);
  }
}
