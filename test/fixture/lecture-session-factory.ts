import { faker } from '@faker-js/faker';
import { LectureSessionEntity, LectureSessionStatusCode } from 'src/common';

export class LectureSessionFactory {
  static seq = 0;

  static createMany(num: number): LectureSessionEntity[] {
    return Array.from({ length: num }).map(() => this.create());
  }

  static create(): LectureSessionEntity {
    // 5일 후부터 1년 이내의 미래 날짜 생성
    const refDate = new Date();
    refDate.setDate(refDate.getDate() + 5);
    const futureDate = faker.date.future({ years: 1, refDate });
    const lectureId = faker.number.int({ min: 1, max: 5 });

    return {
      id: ++LectureSessionFactory.seq,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: LectureSessionStatusCode.AVAILABLE,
      startedAt: futureDate,
      currentAttendee: 0,
      lectureId,
      lecture: {
        id: lectureId,
        createdAt: new Date(),
        updatedAt: new Date(),
        name: faker.person.jobTitle(),
        lecturerName: faker.person.fullName(),
        maxCapacity: 30,
      },
    };
  }
}
