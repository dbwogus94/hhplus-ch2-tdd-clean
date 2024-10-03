import { Module } from '@nestjs/common';
import {
  ReservationRepository,
  ReservationRepositoryPort,
} from './infrastructure';

@Module({
  providers: [
    { provide: ReservationRepositoryPort, useClass: ReservationRepository },
  ],
  exports: [ReservationRepositoryPort],
})
export class ReservationModule {}
