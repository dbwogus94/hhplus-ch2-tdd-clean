import { Test, TestingModule } from '@nestjs/testing';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { execSync } from 'child_process';

import {
  ConflictStatusException,
  InvalidParameterException,
  LectureSessionStatusCode,
  ReservationStatusCode,
  typeOrmDataSourceOptions,
} from 'src/common';
import {
  ReadLectureSessionsCommand,
  WriteReservationCommand,
} from 'src/domain/lecture-session/dto';
import {
  LectureSessionRepository,
  LectureSessionRepositoryPort,
} from 'src/domain/lecture-session/infrastructure';
import { LectureSessionService } from 'src/domain/lecture-session/lecture-session.service';
import {
  ReservationRepository,
  ReservationRepositoryPort,
} from 'src/domain/reservation';
import { DataSource } from 'typeorm';

describe('LectureSessionService', () => {
  let service: LectureSessionService;
  let lectureSessionRepository: LectureSessionRepositoryPort;
  let reservationRepository: ReservationRepositoryPort;
  let dataSource: DataSource;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          ...typeOrmDataSourceOptions,
          // logging: true,
        }),
      ],
      providers: [
        LectureSessionService,
        {
          provide: LectureSessionRepositoryPort,
          useClass: LectureSessionRepository,
        },
        { provide: ReservationRepositoryPort, useClass: ReservationRepository },
      ],
    }).compile();

    service = module.get<LectureSessionService>(LectureSessionService);
    lectureSessionRepository = module.get<LectureSessionRepositoryPort>(
      LectureSessionRepositoryPort,
    );
    reservationRepository = module.get<ReservationRepositoryPort>(
      ReservationRepositoryPort,
    );

    // DataSource 객체 가져오기
    dataSource = module.get<DataSource>(getDataSourceToken());
  });

  beforeEach(() => {
    // 데이터베이스 초기화 및 마이그레이션 실행
    execSync('npm run db:drop', { stdio: 'inherit' });
    [1];
    execSync('npm run db:migrate:up', { stdio: 'inherit' });
    [2];
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  describe('getLectureSessions', () => {
    describe('실패한다.', () => {
      it('조회일이 어제라면 조회에 실패한다.', async () => {
        // Given
        const startedAt = new Date(Date.now() - 86400000); // 1일전
        const command = ReadLectureSessionsCommand.from({ startedAt });
        const success = InvalidParameterException;

        // Then
        const result = service.getLectureSessions(command);

        // When & Then
        expect(result).rejects.toBeInstanceOf(success);
      });
    });

    describe('성공한다.', () => {
      it('오늘자 수강 신청 가능한 강의는 15개가 조회된다.', async () => {
        // Given
        const startedAt = new Date();
        const success = 15;
        const command = ReadLectureSessionsCommand.from({ startedAt });

        // When
        const result = await service.getLectureSessions(command);

        // Then
        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(success);
      });
    });
  });

  describe('createReservation', () => {
    describe('실패한다.', () => {
      it('정원이 초과된 강의는 신청할 수 없다.', async () => {
        // Given
        const command = WriteReservationCommand.from({
          userId: 33,
          lectureSessionId: 1,
        });
        const success = ConflictStatusException;

        await service.createReservation(
          WriteReservationCommand.from({
            userId: 31,
            lectureSessionId: 1,
          }),
        );

        await service.createReservation(
          WriteReservationCommand.from({
            userId: 32,
            lectureSessionId: 1,
          }),
        );

        // when
        try {
          await service.createReservation(command);
        } catch (error) {
          // Then
          expect(error).toBeInstanceOf(success);
        }
      });

      it('유저는 동일한 특강세션에 중복 신청이 불가능하다.', async () => {
        const command = WriteReservationCommand.from({
          userId: 31,
          lectureSessionId: 1,
        });
        const success = ConflictStatusException;

        await service.createReservation(
          WriteReservationCommand.from({
            userId: 31,
            lectureSessionId: 1,
          }),
        );

        // when
        try {
          await service.createReservation(command);
        } catch (error) {
          // Then
          expect(error).toBeInstanceOf(success);
        }
      });
    });

    describe('성공한다.', () => {
      it('한명이 특강 신청을 하면 성공한다.', async () => {
        // Given
        const userId = 31;
        const lectureSessionId = 1;
        const command = WriteReservationCommand.from({
          userId,
          lectureSessionId,
        });
        const success = ReservationStatusCode.REGISTER;

        // When
        await service.createReservation(command);

        // Then
        const reservation = await reservationRepository.findOne({
          where: { userId, lectureSessionId },
        });
        expect(reservation).toBeDefined();
        expect(reservation.status).toBe(success);
      });
    });
  });

  describe('createReservation 동시성 테스트', () => {
    describe('성공한다.', () => {
      it('40개의 .', async () => {
        const userIds = Array.from({ length: 40 }, (_, i) => i + 1);
        const lectureSessionId = 15;
        const success = 30;
        const successStatus = LectureSessionStatusCode.DEADLINE;

        const commands = userIds.map((userId) =>
          WriteReservationCommand.from({
            userId,
            lectureSessionId,
          }),
        );

        // When
        await Promise.allSettled(
          commands.map(
            async (command) => await service.createReservation(command),
          ),
        );

        // Then
        const reservations = await reservationRepository.find({
          where: { lectureSessionId },
        });
        const lectureSession = await lectureSessionRepository.findOneBy({
          id: lectureSessionId,
        });
        expect(reservations.length).toBe(success);
        expect(lectureSession.status).toBe(successStatus);
      });
    });
  });
});
