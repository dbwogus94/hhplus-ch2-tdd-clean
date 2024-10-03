import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, MoreThan } from 'typeorm';
import {
  BaseRepository,
  LectureSessionEntity,
  LectureSessionStatusCode,
  NotFoundException,
} from 'src/common';

type UpdateBody = Pick<
  Partial<LectureSessionEntity>,
  'currentAttendee' | 'status'
>;

export abstract class LectureSessionRepositoryPort extends BaseRepository<LectureSessionEntity> {
  /** 접수가능한 특강 세션을 날짜 별로 조회한다. */
  abstract getManyAvailableByStartedAt(
    startedAt: Date,
  ): Promise<LectureSessionEntity[]>;

  abstract getOneByPK(lectureSessionId: number): Promise<LectureSessionEntity>;
  abstract updateOne(
    lectureSessionId: number,
    body: UpdateBody,
  ): Promise<number>;
}

@Injectable()
export class LectureSessionRepository extends LectureSessionRepositoryPort {
  constructor(
    @InjectEntityManager()
    readonly manager: EntityManager,
  ) {
    super(LectureSessionEntity, manager);
  }

  override async getManyAvailableByStartedAt(
    startedAt: Date,
  ): Promise<LectureSessionEntity[]> {
    return await this.find({
      where: {
        // TODO: 해당날짜의 강의가 조회되게 변경
        startedAt: MoreThan(startedAt),
        status: LectureSessionStatusCode.AVAILABLE,
      },
    });
  }

  override async getOneByPK(
    lectureSessionId: number,
  ): Promise<LectureSessionEntity> {
    const lectureSession = await this.findOne({
      where: {
        id: lectureSessionId,
        // status: LectureSessionStatusCode.AVAILABLE,
      },
    });
    if (!lectureSession) throw new NotFoundException();
    return lectureSession;
  }

  override async updateOne(
    lectureSessionId: number,
    body: UpdateBody,
  ): Promise<number> {
    await this.update(lectureSessionId, { ...body });
    return lectureSessionId;
  }
}
