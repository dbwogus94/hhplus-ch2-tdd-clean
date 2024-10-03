import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

import { BaseRepository, ReservationEntity } from 'src/common';

export abstract class ReservationRepositoryPort extends BaseRepository<ReservationEntity> {
  abstract getReservationsWithLectureSession(
    userId: number,
  ): Promise<ReservationEntity[]>;
}

@Injectable()
export class ReservationRepository extends ReservationRepositoryPort {
  constructor(
    @InjectEntityManager()
    readonly manager: EntityManager,
  ) {
    super(ReservationEntity, manager);
  }

  override async getReservationsWithLectureSession(
    userId: number,
  ): Promise<ReservationEntity[]> {
    const qb = this.createQueryBuilder('r');
    qb.innerJoinAndSelect('r.lectureSession', 'session');
    qb.innerJoinAndSelect('session.lecture', 'lceture');
    qb.where('r.userId = :userId', { userId });
    return qb.orderBy('r.id').getMany();
  }
}
