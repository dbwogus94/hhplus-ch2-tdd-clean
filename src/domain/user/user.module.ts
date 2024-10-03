import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ReservationModule } from '../reservation';
import { UserRepository, UserRepositoryPort } from './infrastructure';

@Module({
  imports: [ReservationModule],
  controllers: [UserController],
  providers: [
    UserService,
    { provide: UserRepositoryPort, useClass: UserRepository },
  ],
})
export class UserModule {}
