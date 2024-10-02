import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import {
  GetLectureSessionsQuery,
  GetLectureSessionsResponse,
  PostLectureSessionRequest,
  ReadLectureSessionsCommand,
  WriteReservationCommand,
} from './dto';
import { LectureSessionService } from './lecture-session.service';

@Controller('/lecture-sessions')
export class LectureSessionController {
  constructor(private readonly lectureSessionService: LectureSessionService) {}

  @Get('/')
  @HttpCode(200)
  async getLectureSessions(
    @Query() query: GetLectureSessionsQuery,
  ): Promise<GetLectureSessionsResponse[]> {
    return await this.lectureSessionService.getLectureSessions(
      ReadLectureSessionsCommand.from({ startedAt: query.dateString }),
    );
  }

  @Post('/:id/reservations')
  @HttpCode(200)
  async postLectureSessionReservation(
    @Param('id', ParseIntPipe) lectureSessionId: number,
    @Body() postDto: PostLectureSessionRequest,
  ): Promise<void> {
    await this.lectureSessionService.createReservation(
      WriteReservationCommand.from({
        lectureSessionId,
        userId: postDto.userId,
      }),
    );
  }
}
