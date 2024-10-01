import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// Note: 좋은 방법은 아니지만 typeorm의 불안정한 type 설정을 잡기위해 직접 import 한다.
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

export const sqliteDataSourceOptions: SqliteConnectionOptions = {
  type: 'sqlite',
  database: './sqlite/hhplus.db',
  busyErrorRetry: 5000, // 5초, SQLITE_BUSY 에러를 방지하기 위해 다음 요청이 대기할 시간 설정,
  busyTimeout: 5000, // 5초, 커넥션 타임아웃 설정
  enableWAL: false, // WAL 설정 활성화 유무
  entities: [`${__dirname}/../entity/**/*.entity{.ts,.js}`],
} as const;

export const typeOrmDataSourceOptions: TypeOrmModuleOptions = {
  ...sqliteDataSourceOptions,
};
