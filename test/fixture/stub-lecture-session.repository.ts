import { LectureSessionEntity } from 'src/common';
import { LectureSessionRepositoryPort } from 'src/domain/lecture-session/infrastructure';
import { EntityManager } from 'typeorm';

export class StubIectureSessionRepository extends LectureSessionRepositoryPort {
  private mem: LectureSessionEntity[] = [];

  constructor(readonly manager: EntityManager) {
    super(LectureSessionEntity, manager);
  }

  async getAvailableOneByStartedAt(
    startedAt: Date,
  ): Promise<LectureSessionEntity[]> {
    return this.mem.filter((l) => l.startedAt > startedAt);
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
