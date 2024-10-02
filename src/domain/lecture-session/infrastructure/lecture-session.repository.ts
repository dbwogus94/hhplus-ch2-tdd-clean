import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import {
  BaseRepository,
  LectureSessionEntity,
  LectureSessionStatusCode,
} from 'src/common';

export abstract class LectureSessionRepositoryPort extends BaseRepository<LectureSessionEntity> {
  abstract getAvailableOneByStartedAt(
    startedAt: Date,
  ): Promise<LectureSessionEntity[]>;
}

@Injectable()
export class LectureSessionRepository extends LectureSessionRepositoryPort {
  constructor(
    @InjectEntityManager()
    readonly manager: EntityManager,
  ) {
    super(LectureSessionEntity, manager);
  }

  async getAvailableOneByStartedAt(
    startedAt: Date,
  ): Promise<LectureSessionEntity[]> {
    return await this.find({
      where: { startedAt, status: LectureSessionStatusCode.AVAILABLE },
      relations: { lecture: true },
    });
  }
}
