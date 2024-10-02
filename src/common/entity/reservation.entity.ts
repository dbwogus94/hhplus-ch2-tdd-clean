import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';

import { BaseEntity } from './base.entity';
import { LectureSessionEntity } from './lecture-session.entity';
import { User } from './user.entity';

@Entity('reservation')
@Unique(['lectureSessionId', 'userId', 'status'])
export class ReservationEntity extends BaseEntity {
  @Column('int', { comment: '신청자 FK' })
  userId: number; // 명시적 FK

  @Column('int', { comment: '신청(예약) 상태' })
  status: string; // 명시적 FK

  @Column('int', { comment: '특강 세션 FK' })
  @JoinColumn({
    name: 'status',
    foreignKeyConstraintName: 'fk_reservation_status',
  })
  lectureSessionId: number; // 명시적 FK

  /* ======================= 연관관계 ======================= */
  @ManyToOne(() => LectureSessionEntity, (session) => session.reservations)
  @JoinColumn({
    name: 'lectureSessionId',
    foreignKeyConstraintName: 'fk_reservation_lecture_session',
  })
  lectureSession: LectureSessionEntity;

  @ManyToOne(() => User, (user) => user.reservations)
  @JoinColumn({
    name: 'userId',
    foreignKeyConstraintName: 'fk_reservation_user',
  })
  user: User;

  // @ManyToOne(() => ReservationStatusEntity, (status) => status.code)
  // @JoinColumn({
  //   name: 'status',
  //   foreignKeyConstraintName: 'fk_reservation_status',
  // })
  // rservationStatus: ReservationStatusEntity;
}
