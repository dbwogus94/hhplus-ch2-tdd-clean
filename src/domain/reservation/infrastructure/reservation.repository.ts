import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

import { BaseRepository, ReservationEntity } from 'src/common';

export abstract class ReservationRepositoryPort extends BaseRepository<ReservationEntity> {}

@Injectable()
export class ReservationRepository extends ReservationRepositoryPort {
  constructor(
    @InjectEntityManager()
    readonly manager: EntityManager,
  ) {
    super(ReservationEntity, manager);
  }
}
