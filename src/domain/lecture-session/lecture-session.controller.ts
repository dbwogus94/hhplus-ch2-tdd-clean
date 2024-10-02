import {
  Body,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { LectureSessionService } from './lecture-session.service';

@Controller('/lecture-sessions')
export class LectureSessionController {
  constructor(private readonly lectureSession: LectureSessionService) {}

  @Get('/')
  @HttpCode(200)
  async getLectureSessions(@Query() query: unknown) {
    console.log(query);
    throw new NotFoundException('미구현 API');
  }

  @Post('/:id/reservations')
  @HttpCode(200)
  async postLectureSessionReservations(
    @Param('id', ParseIntPipe) lectureSessionId: number,
    @Body() postDto: unknown,
  ): Promise<void> {
    console.log(lectureSessionId, postDto);
    throw new NotFoundException('미구현 API');
  }
}
