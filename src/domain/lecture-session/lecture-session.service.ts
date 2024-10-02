import { Injectable } from '@nestjs/common';
import { LectureSessionRepositoryPort } from './infrastructure/lecture-session.repository';
import {
  GetLectureSessionsResponse,
  ReadLectureSessionsCommand,
  WriteReservationCommand,
} from './dto';
import { InvalidParameterException } from 'src/common';

@Injectable()
export class LectureSessionService {
  constructor(
    private readonly lectureSessionRepo: LectureSessionRepositoryPort,
  ) {}

  async getLectureSessions(
    command: ReadLectureSessionsCommand,
  ): Promise<GetLectureSessionsResponse[]> {
    if (!command.validate()) throw new InvalidParameterException();
    const result = await this.lectureSessionRepo.getAvailableOneByStartedAt(
      command.startedAt,
    );
    return GetLectureSessionsResponse.from(result);
  }

  async createReservation(command: WriteReservationCommand) {
    return;
  }
}
