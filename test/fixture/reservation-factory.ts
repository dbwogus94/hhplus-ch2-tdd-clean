import { ReservationEntity, ReservationStatusCode } from 'src/common';
import { LectureSessionFactory } from './lecture-session-factory';
import { UserFactory } from './user-factory';

export class ReservationFactory {
  static seq = 0;

  static create(
    options: { length: number } = { length: 1 },
  ): ReservationEntity[] {
    return Array.from({ length: options.length }).map(() => this.#create());
  }

  static #create(): ReservationEntity {
    const [user] = UserFactory.create({ length: 1 });
    const [lectureSession] = LectureSessionFactory.create({ length: 1 });

    return {
      id: ++this.seq,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: ReservationStatusCode.REGISTER,
      userId: user.id,
      user,
      lectureSessionId: lectureSession.id,
      lectureSession,
    };
  }
}
