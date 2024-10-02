import { DataSource } from 'typeorm';
import { runOrm } from './run-orm';
import { User } from 'src/common/entity';

runOrm(async (dataSource: DataSource) => {
  const userRepo = dataSource.getRepository(User);
  // const qb = userRepo.createQueryBuilder('u').useTransaction(true);

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  await userRepo.insert({
    name: 'user1',
    email: 'user1@test.com',
    phone: '01011112222',
  });

  const test = async (label: string) => {
    const queryRunner = dataSource.createQueryRunner();
    const txManager = queryRunner.manager;
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const txUserRepo = txManager.getRepository(User);
      const user = await txUserRepo.findOneBy({ id: 1 });

      // 10초 인위적인 지연
      await sleep(10000);

      await txUserRepo.update(
        { id: user.id },
        { name: `${user.name}_${label}` },
      );

      await queryRunner.commitTransaction();
      return;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  };

  await test('two');

  // await Promise.all([await test('one'), await test('two')]);
});
