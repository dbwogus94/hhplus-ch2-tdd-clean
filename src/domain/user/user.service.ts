import { Injectable } from '@nestjs/common';
import { ReservationRepositoryPort } from '../reservation';
import { GetLectureReservationsResponse } from './dto';
import { UserRepositoryPort } from './infrastructure';
import { NotFoundException } from 'src/common';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepositoryPort,
    private readonly reservationRepo: ReservationRepositoryPort,
  ) {}

  async getLectureReservations(
    userId: number,
  ): Promise<GetLectureReservationsResponse[]> {
    const existUser = await this.userRepo.existsBy({ id: userId });
    if (!existUser)
      throw new NotFoundException('userId에 해당하는 유저가 없습니다.');

    const reservations =
      await this.reservationRepo.getReservationsWithLectureSession(userId);
    return GetLectureReservationsResponse.from(reservations);
  }
}
