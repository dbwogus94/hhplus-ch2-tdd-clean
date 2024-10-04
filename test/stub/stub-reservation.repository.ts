import { ReservationEntity, ReservationStatusCode } from 'src/common';
import { ReservationRepositoryPort } from 'src/domain/reservation';
import { EntityManager } from 'typeorm';

export class StubReservationRepository extends ReservationRepositoryPort {
  mem: ReservationEntity[] = [];

  constructor(readonly manager: EntityManager) {
    super(ReservationEntity, manager);
  }

  async getManyWithLectureSession(
    userId: number,
  ): Promise<ReservationEntity[]> {
    return this.mem.filter((r) => r.userId === userId);
  }

  async findOneByUnique(where: {
    userId: number;
    lectureSessionId: number;
    status: ReservationStatusCode;
  }): Promise<ReservationEntity> {
    throw new Error('Method not implemented.');
  }

  async insertOne(body: {
    userId: number;
    lectureSessionId: number;
    currentAttendee: number;
  }): Promise<number> {
    throw new Error('Method not implemented.');
  }

  setDummy(entity: ReservationEntity): this;
  setDummy(entity: ReservationEntity[]): this;
  setDummy(entity: ReservationEntity | ReservationEntity[]) {
    if (Array.isArray(entity)) {
      this.mem = [...entity];
    } else {
      this.mem.push(entity);
    }
    return this;
  }
}
