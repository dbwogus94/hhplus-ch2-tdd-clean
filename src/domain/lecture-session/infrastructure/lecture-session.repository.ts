import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import {
  BaseRepository,
  LectureSessionEntity,
  LectureSessionStatusCode,
  NotFoundException,
} from 'src/common';
import { EntityManager } from 'typeorm';

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
    const startDate = new Date(startedAt);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(startedAt);
    endDate.setHours(23, 59, 59, 999);

    const results = await this.createQueryBuilder('lectureSession')
      .innerJoinAndSelect('lectureSession.lecture', 'lecture')
      .where('lectureSession.startedAt >= :startDate', { startDate })
      .andWhere('lectureSession.startedAt <= :endDate', { endDate })
      .andWhere('lectureSession.status = :status', {
        status: LectureSessionStatusCode.AVAILABLE,
      })
      .getMany();
    return results;
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
