import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { BaseRepository, LectureEntity } from 'src/common';

export abstract class LectureSessionRepositoryPort extends BaseRepository<LectureEntity> {}

@Injectable()
export class LectureSessionRepository extends LectureSessionRepositoryPort {
  constructor(
    @InjectEntityManager()
    readonly manager: EntityManager,
  ) {
    super(LectureEntity, manager);
  }
}
