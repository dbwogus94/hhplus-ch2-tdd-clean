import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';

import { BaseEntity } from './base.entity';
import { ReservationStatus } from './code';
import { LectureSession } from './lecture-session.entity';
import { User } from './user.entity';

@Entity('reservation')
@Unique(['lectureSessionId', 'userId', 'status'])
export class Reservation extends BaseEntity {
  @Column('int', { comment: '신청자 FK' })
  userId: number; // 명시적 FK

  @Column('int', { comment: '신청(예약) 상태' })
  status: string; // 명시적 FK

  @Column('int', { comment: '특강 세션 FK' })
  lectureSessionId: number; // 명시적 FK

  /* ======================= 연관관계 ======================= */
  @ManyToOne(() => LectureSession, (session) => session.reservations)
  @JoinColumn({
    name: 'lectureSessionId',
    foreignKeyConstraintName: 'fk_reservation_lecture_session',
  })
  lectureSession: LectureSession;

  @ManyToOne(() => User, (user) => user.reservations)
  @JoinColumn({
    name: 'userId',
    foreignKeyConstraintName: 'fk_reservation_user',
  })
  user: User;

  @ManyToOne(() => ReservationStatus, (status) => status.code)
  @JoinColumn({
    name: 'status',
    foreignKeyConstraintName: 'fk_reservation_status',
  })
  rservationStatus: ReservationStatus;
}
