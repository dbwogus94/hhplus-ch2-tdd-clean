import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmDataSourceOptions } from './common';
import { DomainModule } from './domain/domain.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...typeOrmDataSourceOptions,
      // synchronize: true,
      // dropSchema: true,
      logging: true,
    }),
    DomainModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
