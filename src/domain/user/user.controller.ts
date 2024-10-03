import {
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { GetLectureReservationsResponse } from './dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id/lecture-reservations')
  @HttpCode(200)
  async getLectureReservations(
    @Param('id', ParseIntPipe) userId: number,
  ): Promise<GetLectureReservationsResponse[]> {
    console.log(userId);
    throw new NotFoundException('미구현 API');
  }
}
