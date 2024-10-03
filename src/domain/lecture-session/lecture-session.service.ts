import { Injectable } from '@nestjs/common';
import { LectureSessionRepositoryPort } from './infrastructure/lecture-session.repository';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import {
  GetLectureSessionsResponse,
  ReadLectureSessionsCommand,
  WriteReservationCommand,
} from './dto';
import {
  ConflictStatusException,
  InvalidParameterException,
  LectureSessionStatusCode,
  ReservationStatusCode,
} from 'src/common';
import { ReservationRepositoryPort } from '../reservation';

@Injectable()
export class LectureSessionService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private readonly lectureSessionRepo: LectureSessionRepositoryPort,
    private readonly reservationRepo: ReservationRepositoryPort,
  ) {}

  async getLectureSessions(
    command: ReadLectureSessionsCommand,
  ): Promise<GetLectureSessionsResponse[]> {
    if (!command.validate()) throw new InvalidParameterException();
    const result = await this.lectureSessionRepo.getManyAvailableByStartedAt(
      command.startedAt,
    );
    return GetLectureSessionsResponse.from(result);
  }

  /**
   * 1. 특강 세션이 있는지 확인
   * 2. 특강 세션이 신청가능 한 상태인지 확인
   * 3. 특강 세션에 유저가 이미 신청했는지 확인
   * 4. reservation에 신규 추가
   * 5. lectureSession 현재인원 +1, 정원에 도달했다면 상태 변경
   * @param command
   */
  async createReservation(command: WriteReservationCommand): Promise<void> {
    const { lectureSessionId, userId } = command;
    await this.dataSource.transaction(async (txManager) => {
      const txLectureSessionRepo =
        this.lectureSessionRepo.createTransactionRepo(txManager);
      const txReservationRepo =
        this.reservationRepo.createTransactionRepo(txManager);

      // 1. 특강 세션이 있는지 확인
      const lectureSession =
        await txLectureSessionRepo.getOneByPK(lectureSessionId);

      const { lecture, currentAttendee, status } = lectureSession;
      // 2. 특강 세션이 신청가능 한 상태인지 확인
      if (
        currentAttendee >= lecture.maxCapacity ||
        status !== LectureSessionStatusCode.AVAILABLE
      )
        throw new ConflictStatusException('특강 세션은 마감된 상태입니다.');

      // 3. 특강 세션에 유저가 이미 신청했는지 확인
      const reservation = await txReservationRepo.findOneByUnique({
        userId,
        lectureSessionId,
        status: ReservationStatusCode.REGISTER,
      });
      if (reservation)
        throw new ConflictStatusException('이미 특강 신청된 사용자 입니다.');

      // 4. reservation에 신규 추가
      await txReservationRepo.insertOne({ userId, lectureSessionId });

      // 5. lectureSession 현재인원 +1, 정원에 도달했다면 상태 변경
      const updateCurrentAttendee = currentAttendee + 1;
      await txLectureSessionRepo.updateOne(lectureSessionId, {
        currentAttendee: updateCurrentAttendee,
        status:
          updateCurrentAttendee >= lecture.maxCapacity
            ? LectureSessionStatusCode.DEADLINE // 마감
            : LectureSessionStatusCode.AVAILABLE,
      });
    });
  }
}
