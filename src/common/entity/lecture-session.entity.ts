import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Lecture } from './lecture.entity';
import { Reservation } from './reservation.entity';

@Entity('lecture_session')
@Index(['date', 'lectureId'])
export class LectureSession {
  @PrimaryGeneratedColumn()
  id: number;

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
}
