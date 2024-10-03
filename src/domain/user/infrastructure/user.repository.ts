import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

import { BaseRepository, UserEntity } from 'src/common';

export abstract class UserRepositoryPort extends BaseRepository<UserEntity> {}

@Injectable()
export class UserRepository extends UserRepositoryPort {
  constructor(
    @InjectEntityManager()
    readonly manager: EntityManager,
  ) {
    super(UserEntity, manager);
  }
}
