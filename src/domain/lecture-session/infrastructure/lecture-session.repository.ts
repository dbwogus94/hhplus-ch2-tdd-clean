import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, MoreThan } from 'typeorm';
import {
  BaseRepository,
  LectureSessionEntity,
  LectureSessionStatusCode,
} from 'src/common';

export abstract class LectureSessionRepositoryPort extends BaseRepository<LectureSessionEntity> {
  /** 접수가능한 특강 세션을 날짜 별로 조회한다. */
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
      where: {
        startedAt: MoreThan(startedAt),
        status: LectureSessionStatusCode.AVAILABLE,
      },
      relations: { lecture: true },
    });
  }
}
