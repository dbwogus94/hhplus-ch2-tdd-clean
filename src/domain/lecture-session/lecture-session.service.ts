import { Injectable } from '@nestjs/common';
import { LectureSessionRepositoryPort } from './infrastructure/lecture-session.repository';

@Injectable()
export class LectureSessionService {
  constructor(
    private readonly lectureSessionRepo: LectureSessionRepositoryPort,
  ) {}
}
