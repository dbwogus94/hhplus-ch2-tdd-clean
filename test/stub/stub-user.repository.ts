import { UserEntity } from 'src/common';
import { UserRepositoryPort } from 'src/domain/user/infrastructure';
import { EntityManager, FindOptionsWhere } from 'typeorm';

export class StubUserRepository extends UserRepositoryPort {
  private mem: UserEntity[] = [];

  constructor(readonly manager: EntityManager) {
    super(UserEntity, manager);
  }

  override async existsBy(
    where: FindOptionsWhere<UserEntity> | FindOptionsWhere<UserEntity>[],
  ): Promise<boolean> {
    if (Array.isArray(where)) {
      throw new Error(
        'StubUserRepository#existsBy 파라미터를 배열로 지원하지 않습니다.',
      );
    }
    return !!this.mem.find((m) => m.id === where.id);
  }

  setDummy(entity: UserEntity): this;
  setDummy(entity: UserEntity[]): this;
  setDummy(entity: UserEntity | UserEntity[]) {
    if (Array.isArray(entity)) {
      this.mem = [...entity];
    } else {
      this.mem.push(entity);
    }
    return this;
  }
}
