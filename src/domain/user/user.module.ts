import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ReservationModule } from '../reservation';

@Module({
  imports: [ReservationModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
