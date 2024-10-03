import { Injectable } from '@nestjs/common';
import { ReservationRepositoryPort } from '../reservation';

@Injectable()
export class UserService {
  constructor(private readonly reservationRepo: ReservationRepositoryPort) {}
}
