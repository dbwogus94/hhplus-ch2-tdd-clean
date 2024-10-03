import { Module } from '@nestjs/common';
import { UserRepository, UserRepositoryPort } from './infrastructure';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  exports: [UserRepositoryPort],
  controllers: [UserController],
  providers: [
    UserService,
    { provide: UserRepositoryPort, useClass: UserRepository },
  ],
})
export class UserModule {}
