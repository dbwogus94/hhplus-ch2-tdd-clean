import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

import {
  BaseRepository,
  ReservationEntity,
  ReservationStatusCode,
} from 'src/common';

type FindOneByUnique = {
  userId: number;
  lectureSessionId: number;
  status: ReservationStatusCode;
};
type InsertBody = Pick<ReservationEntity, 'userId' | 'lectureSessionId'>;

export abstract class ReservationRepositoryPort extends BaseRepository<ReservationEntity> {
  abstract getManyWithLectureSession(
    userId: number,
  ): Promise<ReservationEntity[]>;

  abstract findOneByUnique(where: FindOneByUnique): Promise<ReservationEntity>;
  abstract insertOne(body: InsertBody): Promise<number>;
}

@Injectable()
export class ReservationRepository extends ReservationRepositoryPort {
  constructor(
    @InjectEntityManager()
    readonly manager: EntityManager,
  ) {
    super(ReservationEntity, manager);
  }

  override async getManyWithLectureSession(
    userId: number,
  ): Promise<ReservationEntity[]> {
    const qb = this.createQueryBuilder('r');
    qb.innerJoinAndSelect('r.lectureSession', 'session');
    qb.innerJoinAndSelect('session.lecture', 'lceture');
    qb.where('r.userId = :userId', { userId });
    return await qb.orderBy('r.id').getMany();
  }

  override async findOneByUnique(
    where: FindOneByUnique,
  ): Promise<ReservationEntity> {
    const { userId, lectureSessionId, status } = where;
    const qb = this.createQueryBuilder('r');
    qb.where('r.userId = :userId', { userId });
    qb.andWhere('r.lectureSessionId = :lectureSessionId', { lectureSessionId });
    qb.andWhere('r.status = :status', { status });
    return await qb.getOne();
  }

  override async insertOne(body: InsertBody): Promise<number> {
    const { raw } = await this.insert({
      ...body,
      status: ReservationStatusCode.REGISTER,
    });
    return raw.insertId;
  }
}
