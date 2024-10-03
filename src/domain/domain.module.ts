import { Module } from '@nestjs/common';

import { LectureSessionModule } from './lecture-session/lecture-session.module';
import { UserModule } from './user/user.module';
import { ReservationModule } from './reservation/reservation.module';

@Module({
  imports: [LectureSessionModule, UserModule, ReservationModule],
})
export class DomainModule {}
