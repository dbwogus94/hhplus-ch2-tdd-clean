import { Module } from '@nestjs/common';
import {
  LectureSessionRepository,
  LectureSessionRepositoryPort,
} from './infrastructure';
import { LectureSessionController } from './lecture-session.controller';
import { LectureSessionService } from './lecture-session.service';
import { ReservationModule } from '../reservation';

@Module({
  imports: [ReservationModule],
  controllers: [LectureSessionController],
  providers: [
    LectureSessionService,
    {
      provide: LectureSessionRepositoryPort,
      useClass: LectureSessionRepository,
    },
  ],
})
export class LectureSessionModule {}
