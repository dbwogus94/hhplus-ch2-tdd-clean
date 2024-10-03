import { Controller, Get, HttpCode, Param, ParseIntPipe } from '@nestjs/common';
import { GetLectureReservationsResponse } from './dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id/lecture-reservations')
  @HttpCode(200)
  async getLectureReservations(
    @Param('id', ParseIntPipe) userId: number,
  ): Promise<GetLectureReservationsResponse[]> {
    return await this.userService.getLectureReservations(userId);
  }
}
