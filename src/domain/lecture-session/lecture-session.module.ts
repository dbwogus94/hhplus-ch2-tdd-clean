import { Module } from '@nestjs/common';
import {
  LectureSessionRepository,
  LectureSessionRepositoryPort,
} from './infrastructure';
import { LectureSessionController } from './lecture-session.controller';
import { LectureSessionService } from './lecture-session.service';

@Module({
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
