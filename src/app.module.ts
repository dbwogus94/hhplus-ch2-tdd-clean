import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  ConvertExceptionInterceptor,
  typeOrmDataSourceOptions,
} from './common';
import { DomainModule } from './domain';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...typeOrmDataSourceOptions,

      logging: true,
    }),
    DomainModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ConvertExceptionInterceptor,
    },
  ],
})
export class AppModule {}
