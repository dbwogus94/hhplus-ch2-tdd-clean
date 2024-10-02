import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { LectureSessionStatusEntity } from './code';
import { LectureEntity } from './lecture.entity';
import { ReservationEntity } from './reservation.entity';

@Entity('lecture_session')
export class LectureSessionEntity extends BaseEntity {
  @Column('datetime', { comment: '특강날짜' })
  /** At이 붙는 컬럼은 시분초를 포함하는 datetime 형태의 날짜이다. */
  startedAt: Date;

  @Column('int', { comment: '특강 FK' })
  lectureId: number; // 명시적 FK

  @Column('varchar', { comment: '상태 코드' })
  status: string;

  @Column('int', { comment: '현재 인원' })
  currentAttendee: number;

  /* ======================= 연관관계 ======================= */
  @ManyToOne(() => LectureEntity, (lecture) => lecture.sessions)
  @JoinColumn({
    name: 'lectureId',
    foreignKeyConstraintName: 'fk_lecture_session_lecture',
  })
  lecture: LectureEntity;

  @OneToMany(
    () => ReservationEntity,
    (reservation) => reservation.lectureSession,
  )
  reservations: ReservationEntity[];

  @ManyToOne(
    () => LectureSessionStatusEntity,
    (status) => status.lectureSessions,
  )
  @JoinColumn({
    name: 'status',
    foreignKeyConstraintName: 'fk_lecture_session_status',
  })
  lectureSessionStatus: LectureSessionStatusEntity;
}
