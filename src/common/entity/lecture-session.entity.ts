import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { LectureSessionStatus } from './code';
import { Lecture } from './lecture.entity';
import { Reservation } from './reservation.entity';

@Entity('lecture_session')
export class LectureSession extends BaseEntity {
  @Column('date', { comment: '특강날짜' })
  date: Date;

  @Column('int', { comment: '특강 FK' })
  lectureId: number; // 명시적 FK

  @Column('varchar', { comment: '상태 코드' })
  status: string;

  @Column('int', { comment: '현재 인원' })
  currentAttendee: number;

  /* ======================= 연관관계 ======================= */
  @ManyToOne(() => Lecture, (lecture) => lecture.sessions)
  @JoinColumn({
    name: 'lectureId',
    foreignKeyConstraintName: 'fk_lecture_session_lecture',
  })
  lecture: Lecture;

  @OneToMany(() => Reservation, (reservation) => reservation.lectureSession)
  reservations: Reservation[];

  @ManyToOne(() => LectureSessionStatus, (status) => status.lectureSessions)
  @JoinColumn({
    name: 'status',
    foreignKeyConstraintName: 'fk_lecture_session_status',
  })
  lectureSessionStatus: LectureSessionStatus;
}
