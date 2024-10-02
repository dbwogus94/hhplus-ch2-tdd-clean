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
import {
  GetLectureSessionsQuery,
  GetLectureSessionsResponse,
  PostLectureSessionRequest,
} from './dto';

@Controller('/lecture-sessions')
export class LectureSessionController {
  constructor(private readonly lectureSession: LectureSessionService) {}

  @Get('/')
  @HttpCode(200)
  async getLectureSessions(
    @Query() query: GetLectureSessionsQuery,
  ): Promise<GetLectureSessionsResponse> {
    console.log(query);
    throw new NotFoundException('미구현 API');
  }

  @Post('/:id/reservations')
  @HttpCode(200)
  async postLectureSessionReservations(
    @Param('id', ParseIntPipe) lectureSessionId: number,
    @Body() postDto: PostLectureSessionRequest,
  ): Promise<void> {
    console.log(lectureSessionId, postDto);
    throw new NotFoundException('미구현 API');
  }
}
