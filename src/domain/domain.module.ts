import { Module } from '@nestjs/common';

import { LectureSessionModule } from './lecture-session/lecture-session.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [LectureSessionModule, UserModule],
})
export class DomainModule {}
