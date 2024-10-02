import { type MockProxy, mock } from 'jest-mock-extended';
import { EntityManager } from 'typeorm';

import { InvalidParameterException } from 'src/common';
import { ReadLectureSessionsCommand } from 'src/domain/lecture-session/dto';
import { LectureSessionRepositoryPort } from 'src/domain/lecture-session/infrastructure';
import { LectureSessionService } from 'src/domain/lecture-session/lecture-session.service';
import {
  LectureSessionFactory,
  StubIectureSessionRepository,
} from '../../fixture';

describe('LectureSessionService', () => {
  let manager: MockProxy<EntityManager>;
  let stubLectureSessionRepo: LectureSessionRepositoryPort;
  let service: LectureSessionService;
  const dummyList = LectureSessionFactory.createMany(10);

  beforeEach(() => {
    manager = mock<EntityManager>();
    stubLectureSessionRepo = new StubIectureSessionRepository(manager) //
      .setDummy(dummyList);
    service = new LectureSessionService(stubLectureSessionRepo);
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
      it('조회 날짜가 현재시간 보다 작다면 실패한다.', () => {
        // given
        const startedAt = new Date(Date.now() - 90000);
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
      it('조회 날짜가 현재시간 보다 크다면 성공한다.', async () => {
        // given
        const startedAt = new Date(Date.now() + 1);
        const success = dummyList;

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
   * 특정 유저의 포인트 충전/이용 내역을 조회합니다.
   * ### TC
   * 1. 성공
   * - 포인트 충전/이용 내역이을 응답한다.
   * - 포인트 충전/이용 내역이 없는 유저라면 빈 배열을 응답한다.
   * 2. 실패
   * - `userId`가 양수가 아니라면 실패한다.
   */
  // describe('createReservation', () => {
  //   describe('실패한다.', () => { });

  // describe('성공한다.', () => {
  //   it('`userId` 유효하면 포인트 히스토리 내역을 리턴한다.', async () => { });

  //   it('포인트 히스토리는 내역이 존재하지 않으면 빈배열을 응답한다.', async () => { });
  // });
});
