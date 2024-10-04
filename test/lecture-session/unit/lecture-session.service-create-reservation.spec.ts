import { type MockProxy, mock } from 'jest-mock-extended';
import { DataSource } from 'typeorm';

import {
  ConflictStatusException,
  LectureSessionStatusCode,
  NotFoundException,
} from 'src/common';
import { WriteReservationCommand } from 'src/domain/lecture-session/dto';
import { LectureSessionRepositoryPort } from 'src/domain/lecture-session/infrastructure';
import { LectureSessionService } from 'src/domain/lecture-session/lecture-session.service';
import { ReservationRepositoryPort } from 'src/domain/reservation';
import { LectureSessionFactory, ReservationFactory } from 'test/fixture';

describe('LectureSessionService', () => {
  let mockLectureSessionRepo: MockProxy<LectureSessionRepositoryPort>;
  let mockReservationRepo: MockProxy<ReservationRepositoryPort>;
  let service: LectureSessionService;
  let mockDataSource: MockProxy<DataSource>;

  beforeEach(() => {
    mockDataSource = mock<DataSource>();
    mockLectureSessionRepo = mock<LectureSessionRepositoryPort>();
    mockReservationRepo = mock<ReservationRepositoryPort>();

    service = new LectureSessionService(
      mockDataSource,
      mockLectureSessionRepo,
      mockReservationRepo,
    );
  });

  describe('createReservation', () => {
    describe('실패한다.', () => {
      it('특강 세션이 없다면 실패한다.', async () => {
        // given
        const userId = 1;
        const lectureSessionId = 1;
        const success = NotFoundException;

        mockDataSource.transaction.mockImplementation(async (cb) =>
          cb(mockDataSource),
        );
        mockLectureSessionRepo.createTransactionRepo.mockReturnValue(
          mockLectureSessionRepo,
        );
        mockLectureSessionRepo.getOneByPK.mockRejectedValue(
          new NotFoundException(),
        );

        // when
        const result = service.createReservation(
          WriteReservationCommand.from({ userId, lectureSessionId }),
        );

        // then
        await expect(result).rejects.toThrow(success);
      });

      it('특강 세션이 신청가능 한 상태가 아니면 실패한다.', async () => {
        // given
        const userId = 1;
        const lectureSessionId = 1;
        const success = ConflictStatusException;
        const message = '특강 세션은 마감된 상태입니다.';

        const [lectureSession] = LectureSessionFactory.create();
        lectureSession.status = LectureSessionStatusCode.DEADLINE;

        mockDataSource.transaction.mockImplementation(async (cb) =>
          cb(mockDataSource),
        );
        mockLectureSessionRepo.createTransactionRepo.mockReturnValue(
          mockLectureSessionRepo,
        );
        mockLectureSessionRepo.getOneByPK.mockResolvedValueOnce(lectureSession);

        // when
        const result = service.createReservation(
          WriteReservationCommand.from({ userId, lectureSessionId }),
        );

        // then
        await expect(result).rejects.toBeInstanceOf(success);
        await expect(result).rejects.toThrow(message);
      });

      it('특강 세션에 유저가 이미 신청했다면 실패한다.', async () => {
        // given
        const userId = 1;
        const lectureSessionId = 1;
        const success = ConflictStatusException;
        const message = '이미 특강 신청된 사용자 입니다.';

        const [lectureSession] = LectureSessionFactory.create();
        const [reservation] = ReservationFactory.create();
        reservation.userId = userId;

        mockDataSource.transaction.mockImplementation(async (cb) =>
          cb(mockDataSource),
        );
        mockLectureSessionRepo.createTransactionRepo.mockReturnValue(
          mockLectureSessionRepo,
        );
        mockReservationRepo.createTransactionRepo.mockReturnValue(
          mockReservationRepo,
        );
        mockLectureSessionRepo.getOneByPK.mockResolvedValueOnce(lectureSession);
        mockReservationRepo.findOneByUnique.mockResolvedValueOnce(reservation);

        // when
        const result = service.createReservation(
          WriteReservationCommand.from({ userId, lectureSessionId }),
        );

        // then
        await expect(result).rejects.toBeInstanceOf(success);
        await expect(result).rejects.toThrow(message);
      });
    });

    describe('성공한다.', () => {
      it('특강 신청에 성공한다.', async () => {
        // given
        const userId = 1;
        const lectureSessionId = 1;

        const [lectureSession] = LectureSessionFactory.create();
        lectureSession.currentAttendee = 29;
        lectureSession.lecture.maxCapacity = 31;

        mockDataSource.transaction.mockImplementation(async (cb) =>
          cb(mockDataSource),
        );
        mockLectureSessionRepo.createTransactionRepo.mockReturnValue(
          mockLectureSessionRepo,
        );
        mockReservationRepo.createTransactionRepo.mockReturnValue(
          mockReservationRepo,
        );
        mockLectureSessionRepo.getOneByPK.mockResolvedValueOnce(lectureSession);
        mockReservationRepo.findOneByUnique.mockResolvedValueOnce(null);
        mockReservationRepo.insertOne.mockResolvedValueOnce(1);
        mockLectureSessionRepo.updateOne.mockResolvedValueOnce(
          lectureSessionId,
        );

        // when
        await service.createReservation(
          WriteReservationCommand.from({ userId, lectureSessionId }),
        );

        // then
        expect(mockReservationRepo.insertOne).toHaveBeenCalledWith({
          userId,
          lectureSessionId,
        });
        expect(mockLectureSessionRepo.updateOne).toHaveBeenCalledWith(
          lectureSessionId,
          {
            currentAttendee: 30,
            status: LectureSessionStatusCode.AVAILABLE,
          },
        );
      });

      it('특강 신청에 완료시 정원에 도달하면 마감상태가 된다.', async () => {
        // given
        const userId = 1;
        const lectureSessionId = 1;
        const [lectureSession] = LectureSessionFactory.create();
        lectureSession.currentAttendee = 29;
        lectureSession.lecture.maxCapacity = 30;

        mockDataSource.transaction.mockImplementation(async (cb) =>
          cb(mockDataSource),
        );
        mockLectureSessionRepo.createTransactionRepo.mockReturnValue(
          mockLectureSessionRepo,
        );
        mockReservationRepo.createTransactionRepo.mockReturnValue(
          mockReservationRepo,
        );
        mockLectureSessionRepo.getOneByPK.mockResolvedValueOnce(lectureSession);
        mockReservationRepo.findOneByUnique.mockResolvedValueOnce(null);
        mockReservationRepo.insertOne.mockResolvedValueOnce(1);
        mockLectureSessionRepo.updateOne.mockResolvedValueOnce(
          lectureSessionId,
        );

        // when
        await service.createReservation(
          WriteReservationCommand.from({ userId, lectureSessionId }),
        );

        // then
        expect(mockReservationRepo.insertOne).toHaveBeenCalledWith({
          userId,
          lectureSessionId,
        });
        expect(mockLectureSessionRepo.updateOne).toHaveBeenCalledWith(
          lectureSessionId,
          {
            currentAttendee: 30,
            status: LectureSessionStatusCode.DEADLINE,
          },
        );
      });
    });
  });
});
