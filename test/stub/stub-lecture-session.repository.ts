import { LectureSessionEntity, LectureSessionStatusCode } from 'src/common';
import { LectureSessionRepositoryPort } from 'src/domain/lecture-session/infrastructure';
import { EntityManager } from 'typeorm';

export class StubIectureSessionRepository extends LectureSessionRepositoryPort {
  private mem: LectureSessionEntity[] = [];

  constructor(readonly manager: EntityManager) {
    super(LectureSessionEntity, manager);
  }

  async getManyAvailableByStartedAt(
    startedAt: Date,
  ): Promise<LectureSessionEntity[]> {
    return this.mem.filter((l) => l.startedAt > startedAt);
  }

  async getOneByPK(lectureSessionId: number): Promise<LectureSessionEntity> {
    throw new Error('Method not implemented.');
  }

  async updateOne(
    lectureSessionId: number,
    body: { currentAttendee?: number; status?: LectureSessionStatusCode },
  ): Promise<number> {
    throw new Error('Method not implemented.');
  }

  setDummy(entity: LectureSessionEntity): this;
  setDummy(entity: LectureSessionEntity[]): this;
  setDummy(entity: LectureSessionEntity | LectureSessionEntity[]) {
    if (Array.isArray(entity)) {
      this.mem = [...entity];
    } else {
      this.mem.push(entity);
    }
    return this;
  }
}
