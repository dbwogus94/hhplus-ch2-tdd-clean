import { MigrationInterface, QueryRunner } from 'typeorm';

export class Seed1727860388005 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // user 데이터 추가
    // user 데이터 추가
    // user 데이터 추가
    await queryRunner.query(`
        INSERT INTO user (name, phone, email)
        VALUES
        ('김민준', '010-1234-5678', 'minjun.kim@example.com'),
        ('이서연', '010-2345-6789', 'seoyeon.lee@example.com'),
        ('박서준', '010-3456-7890', 'seojun.park@example.com'),
        ('최지우', '010-4567-8901', 'jiwoo.choi@example.com'),
        ('정예준', '010-5678-9012', 'yejun.jung@example.com'),
        ('강민서', '010-6789-0123', 'minseo.kang@example.com'),
        ('조하린', '010-7890-1234', 'harin.cho@example.com'),
        ('임도윤', '010-8901-2345', 'doyun.lim@example.com'),
        ('한시우', '010-9012-3456', 'siwoo.han@example.com'),
        ('오주원', '010-0123-4567', 'juwon.oh@example.com'),
        ('신예은', '010-1234-5678', 'yeeun.shin@example.com'),
        ('남현우', '010-2345-6789', 'hyunwoo.nam@example.com'),
        ('구은서', '010-3456-7890', 'eunseo.gu@example.com'),
        ('황지호', '010-4567-8901', 'jiho.hwang@example.com'),
        ('유준서', '010-5678-9012', 'junseo.yu@example.com'),
        ('노지후', '010-6789-0123', 'jihoo.noh@example.com'),
        ('민준우', '010-7890-1234', 'junwoo.min@example.com'),
        ('서연우', '010-8901-2345', 'yeonwoo.seo@example.com'),
        ('김하준', '010-9012-3456', 'hajun.kim@example.com'),
        ('이주하', '010-0123-4567', 'juha.lee@example.com'),
        ('박시은', '010-1234-5678', 'sieun.park@example.com'),
        ('최승원', '010-2345-6789', 'seungwon.choi@example.com'),
        ('정서윤', '010-3456-7890', 'seoyun.jung@example.com'),
        ('강예린', '010-4567-8901', 'yerin.kang@example.com'),
        ('조민재', '010-5678-9012', 'minjae.cho@example.com'),
        ('임서준', '010-6789-0123', 'seojun.lim@example.com'),
        ('한지안', '010-7890-1234', 'jian.han@example.com'),
        ('오서현', '010-8901-2345', 'seohyun.oh@example.com'),
        ('신은우', '010-9012-3456', 'eunwoo.shin@example.com'),
        ('남도현', '010-0123-4567', 'dohyun.nam@example.com'),
        ('김서진', '010-1234-5678', 'seojin.kim@example.com'),
        ('이지원', '010-2345-6789', 'jiwon.lee@example.com'),
        ('박준혁', '010-3456-7890', 'junhyuk.park@example.com'),
        ('최서윤', '010-4567-8901', 'seoyun.choi@example.com'),
        ('정민성', '010-5678-9012', 'minsung.jung@example.com'),
        ('강지훈', '010-6789-0123', 'jihun.kang@example.com'),
        ('조서영', '010-7890-1234', 'seoyoung.cho@example.com'),
        ('임지민', '010-8901-2345', 'jimin.lim@example.com'),
        ('한승준', '010-9012-3456', 'seungjun.han@example.com'),
        ('오현지', '010-0123-4567', 'hyunji.oh@example.com')
        ;
    `);

    // lecture 데이터 추가
    await queryRunner.query(`
        INSERT INTO lecture (name, lecturerName, maxCapacity)
        VALUES
          ('TDD 완벽정복', 'John Smith', 30),
          ('클린아키텍처의 무서움', 'Emily Johnson', 30),
          ('동시성은 무엇인가?', 'Michael Davis', 30),
          ('GPT보다 나은 개발자가 되는 방법', 'Sarah Wilson', 30),
          ('대용량 트래픽을 견디는 서버', 'David Thompson', 30)
        ;
      `);

    // lecture_session 데이터 추가
    const startedAt = new Date(Date.now() + 86400000);
    const startDate = startedAt.toISOString().slice(0, 10);
    await queryRunner.query(`
        INSERT INTO lecture_session (startedAt, lectureId, status, currentAttendee)
        VALUES
          ('${startDate} 09:00:00', 1, 'Available', 0),
          ('${startDate} 14:00:00', 1, 'Available', 0),
          ('${startDate} 10:30:00', 1, 'Available', 0),
          ('${startDate} 13:00:00', 2, 'Available', 0),
          ('${startDate} 16:30:00', 2, 'Available', 0),
          ('${startDate} 11:00:00', 3, 'Available', 0),
          ('${startDate} 14:30:00', 3, 'Available', 0),
          ('${startDate} 09:30:00', 3, 'Available', 0),
          ('${startDate} 13:30:00', 3, 'Available', 0),
          ('${startDate} 10:00:00', 4, 'Available', 0),
          ('${startDate} 15:00:00', 4, 'Available', 0),
          ('${startDate} 11:30:00', 5, 'Available', 0),
          ('${startDate} 14:00:00', 5, 'Available', 0),
          ('${startDate} 09:30:00', 5, 'Available', 0)
        ;
    `);

    // reservation 데이터 추가
    // reservation 데이터 추가
    const reservations = [];
    const lectureSessionAttendees = new Map();

    for (let i = 1; i <= 14; i++) {
      const count = Math.floor(Math.random() * 14) + 15;
      const userIds = new Set();

      while (userIds.size < count) {
        // 마지막 10명은 reservation에 추가하지 않음
        const userId = Math.floor(Math.random() * 30) + 1;
        if (!userIds.has(userId)) {
          userIds.add(userId);
          reservations.push(`(${userId}, 'Register', ${i})`);

          // lecture_session의 currentAttendee 값 업데이트
          if (lectureSessionAttendees.has(i)) {
            lectureSessionAttendees.set(i, lectureSessionAttendees.get(i) + 1);
          } else {
            lectureSessionAttendees.set(i, 1);
          }
        }
      }
    }

    await queryRunner.query(`
        INSERT INTO reservation (userId, status, lectureSessionId)
        VALUES
            ${reservations.join(',')}
        ;
    `);

    // lecture_session의 currentAttendee 값 업데이트
    for (const [lectureSessionId, currentAttendee] of lectureSessionAttendees) {
      await queryRunner.query(`
        UPDATE lecture_session
        SET currentAttendee = ${currentAttendee}
        WHERE id = ${lectureSessionId}
        ;
      `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM reservation;');
    await queryRunner.query('DELETE FROM lecture_session;');
    await queryRunner.query('DELETE FROM lecture;');
    await queryRunner.query('DELETE FROM user;');

    // 시퀀스 삭제로 초기화
    await queryRunner.query(
      "DELETE FROM sqlite_sequence WHERE name IN ('reservation', 'lecture_session', 'lecture', 'user');",
    );
  }
}
