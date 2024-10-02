import { sqliteDataSourceOptions } from 'src/common';
import { DataSource } from 'typeorm';

export const OrmDataSource = new DataSource({
  ...sqliteDataSourceOptions,
  migrations: [`${__dirname}/**/local/*{.ts,.js}`],
  migrationsTableName: 'migrations',
  logging: true,
});
