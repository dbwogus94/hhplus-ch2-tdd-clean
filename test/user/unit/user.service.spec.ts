import { type MockProxy, mock } from 'jest-mock-extended';
import { EntityManager } from 'typeorm';

import { NotFoundException } from 'src/common';
import { UserRepositoryPort } from 'src/domain/user/infrastructure';
import { ReservationRepositoryPort } from 'src/domain/reservation';
import { GetLectureReservationsResponse } from 'src/domain/user/dto';
import { UserService } from 'src/domain/user/user.service';
import { ReservationFactory } from '../../fixture';
import { StubReservationRepository, StubUserRepository } from '../../stub';

describe('UserSessionService', () => {
  let manager: MockProxy<EntityManager>;
  let stubUserRepo: UserRepositoryPort;
  let stubReservationRepo: ReservationRepositoryPort;
  let service: UserService;

  const reservationDummyList = ReservationFactory.create({ length: 5 });
  const userDummyList = reservationDummyList.map((r) => r.user);

  beforeEach(() => {
    manager = mock<EntityManager>();
    stubUserRepo = new StubUserRepository(manager) //
      .setDummy(userDummyList);
    stubReservationRepo = new StubReservationRepository(manager) //
      .setDummy(reservationDummyList);

    service = new UserService(stubUserRepo, stubReservationRepo);
  });

  /**
   * 유저가 신청한 특강 정보 리스트 조회합니다.
   * ### TC
   * 1. 성공
   * - 유저가 신청한 특강 정보 리스트를 조회에 성공한다.
   * 2. 실패
   * - userId 가 존재하지 않으면 실패한다.
   */
  describe('getLectureReservations', () => {
    describe('실패한다.', () => {
      it('userId 가 존재하지 않으면 실패한다.', () => {
        // given
        const userId = 10000;
        const success = NotFoundException;

        // when
        const result = service.getLectureReservations(userId);

        // then
        expect(result).rejects.toBeInstanceOf(success);
      });
    });

    describe('성공한다.', () => {
      it('유저가 신청한 특강 정보 리스트를 조회에 성공한다.', async () => {
        // given
        const userId = 1;
        const success = GetLectureReservationsResponse.from(
          reservationDummyList.filter((r) => r.userId === userId),
        );
        // when
        const result = await service.getLectureReservations(userId);

        // then
        expect(result.length).toBe(success.length);
      });
    });
  });
});
