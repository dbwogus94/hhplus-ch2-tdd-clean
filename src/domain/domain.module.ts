import { Module } from '@nestjs/common';

import { LectureSessionModule } from './lecture-session/lecture-session.module';

@Module({
  imports: [LectureSessionModule],
})
export class DomainModule {}
