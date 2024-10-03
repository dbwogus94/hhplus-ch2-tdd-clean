import { mock } from 'jest-mock-extended';
import { DataSource, EntityManager } from 'typeorm';

import {
  ConflictStatusException,
  InvalidParameterException,
  NotFoundException,
} from 'src/common';
import {
  ReadLectureSessionsCommand,
  WriteReservationCommand,
} from 'src/domain/lecture-session/dto';
import { LectureSessionRepositoryPort } from 'src/domain/lecture-session/infrastructure';
import { LectureSessionService } from 'src/domain/lecture-session/lecture-session.service';
import { ReservationRepositoryPort } from 'src/domain/reservation';
import { LectureSessionFactory, ReservationFactory } from '../../fixture';
import {
  StubIectureSessionRepository,
  StubReservationRepository,
} from '../../stub';

describe('LectureSessionService', () => {
  let stubLectureSessionRepo: LectureSessionRepositoryPort;
  let stubReservationRepo: ReservationRepositoryPort;
  let service: LectureSessionService;
  const lectureSessionDummyList = LectureSessionFactory.create({ length: 10 });
  const reservationDummyList = ReservationFactory.create({ length: 10 });

  beforeEach(() => {
    const manager = mock<EntityManager>();
    const dataSource = mock<DataSource>();
    stubLectureSessionRepo = new StubIectureSessionRepository(manager) //
      .setDummy(lectureSessionDummyList);

    stubReservationRepo = new StubReservationRepository(manager) //
      .setDummy(reservationDummyList);

    service = new LectureSessionService(
      dataSource,
      stubLectureSessionRepo,
      stubReservationRepo,
    );
  });

  /**
   * 신청가능한 강의를 조회합니다.
   * ### TC
   * 1. 성공
   * - 유저의 현재 포인트를 조회한다.
   * 2. 실패
   * - 조회에 사용되는 날짜가 현재시간보다 작다면 실패한다.
   */
  describe('getLectureSessions', () => {
    describe('실패한다.', () => {
      it('조회 날짜가 오늘 날짜 보다 작다면 실패한다.', () => {
        // given
        const startedAt = new Date(Date.now() - 86400000); // 1일전
        const success = InvalidParameterException;

        // when
        const result = service.getLectureSessions(
          ReadLectureSessionsCommand.from({ startedAt }),
        );

        // then
        expect(result).rejects.toBeInstanceOf(success);
      });
    });

    describe('성공한다.', () => {
      it('조회 날짜가 오늘 날짜 보다 크다거나 같다면 성공한다.', async () => {
        // given
        const startedAt = new Date();
        const success = lectureSessionDummyList;

        // when
        const result = await service.getLectureSessions(
          ReadLectureSessionsCommand.from({ startedAt }),
        );

        // then
        expect(result.length).toBe(success.length);
      });
    });
  });

  /**
   * 강의 신청 API
   * ### TC
   * 1. 성공
   * - 특강 신청에 성공한다.
   * - 특강 신청에 완료시 정원에 도달하면 마감상태가 된다.
   * 2. 실패
   * - 특강 세션이 없다면 실패한다.
   * - 특강 세션이 신청가능 한 상태가 아니면 실패한다.
   * - 특강 세션에 유저가 이미 신청했다면 실패한다.
   */
  describe.skip('createReservation', () => {
    describe('실패한다.', () => {
      it('특강 세션이 없다면 실패한다.', () => {
        // given
        const userId = 1;
        const lectureSessionId = 1;
        const success = NotFoundException;

        // when
        const result = service.createReservation(
          WriteReservationCommand.from({ userId, lectureSessionId }),
        );

        // then
        expect(result).rejects.toBeInstanceOf(success);
      });

      it('특강 세션이 신청가능 한 상태가 아니면 실패한다.', async () => {
        // given
        const userId = 1;
        const lectureSessionId = 1;
        const success = ConflictStatusException;

        // when
        const result = service.createReservation(
          WriteReservationCommand.from({ userId, lectureSessionId }),
        );

        // then
        expect(result).rejects.toBeInstanceOf(success);
      });

      it('특강 세션에 유저가 이미 신청했다면 실패한다.', async () => {
        // given
        const userId = 1;
        const lectureSessionId = 1;
        const success = ConflictStatusException;

        // when
        const result = service.createReservation(
          WriteReservationCommand.from({ userId, lectureSessionId }),
        );

        // then
        expect(result).rejects.toBeInstanceOf(success);
      });
    });

    describe('성공한다.', () => {
      it('특강 신청에 성공한다.', async () => {
        // given
        const userId = 1;
        const lectureSessionId = 1;
        const success = {};

        // when
        const result = service.createReservation(
          WriteReservationCommand.from({ userId, lectureSessionId }),
        );

        // then
        expect(result).toBe(success);
      });

      it('특강 신청에 완료시 정원에 도달하면 마감상태가 된다.', async () => {
        // given
        const userId = 1;
        const lectureSessionId = 1;
        const success = {};

        // when
        const result = service.createReservation(
          WriteReservationCommand.from({ userId, lectureSessionId }),
        );

        // then
        expect(result).toBe(success);
      });
    });
  });
});
