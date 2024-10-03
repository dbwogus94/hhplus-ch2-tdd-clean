import { Injectable } from '@nestjs/common';
import { UserRepositoryPort } from './infrastructure';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepositoryPort) {}
}
