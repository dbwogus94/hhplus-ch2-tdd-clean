import { ReservationEntity } from 'src/common';
import { ReservationRepositoryPort } from 'src/domain/reservation';
import { EntityManager } from 'typeorm';

export class StubReservationRepository extends ReservationRepositoryPort {
  private mem: ReservationEntity[] = [];

  constructor(readonly manager: EntityManager) {
    super(ReservationEntity, manager);
  }

  async getReservationsWithLectureSession(
    userId: number,
  ): Promise<ReservationEntity[]> {
    return this.mem.filter((r) => r.userId === userId);
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
